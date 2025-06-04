import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '@workflowiq/shared';
import { logger } from '../utils/logger';
import { PrismaClient } from '@prisma/client';

export interface AuthenticatedRequest extends Request {
  user?: User;
  prisma: PrismaClient;
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const apiKey = req.headers['x-api-key'] as string;

    // Check for API key authentication
    if (apiKey) {
      const apiKeyRecord = await req.prisma.apiKey.findUnique({
        where: { key: apiKey, isActive: true },
        include: { organization: true, creator: true }
      });

      if (!apiKeyRecord || (apiKeyRecord.expiresAt && apiKeyRecord.expiresAt < new Date())) {
        return res.status(401).json({
          success: false,
          error: 'Invalid or expired API key'
        });
      }

      // Update last used timestamp
      await req.prisma.apiKey.update({
        where: { id: apiKeyRecord.id },
        data: { lastUsed: new Date() }
      });

      req.user = apiKeyRecord.creator as any;
      return next();
    }

    // Check for JWT token authentication
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Access token required'
      });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

    const user = await req.prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { organization: true }
    });

    if (!user || user.status !== 'ACTIVE') {
      return res.status(401).json({
        success: false,
        error: 'Invalid or inactive user'
      });
    }

    req.user = user as any;
    next();
  } catch (error) {
    logger.error('Auth middleware error:', error);
    return res.status(401).json({
      success: false,
      error: 'Invalid token'
    });
  }
};

// Export alias for backwards compatibility
export const authenticate = authMiddleware;

export const requireRole = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions'
      });
    }
    next();
  };
}; 