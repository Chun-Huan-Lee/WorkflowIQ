import express, { Request, Response } from 'express';
import { z } from 'zod';
import { validateRequest } from '../middleware/validation';
import { requireRole } from '../middleware/auth';
import { logger } from '../utils/logger';
import { UpdateUserSchema, PaginationSchema } from '@workflowiq/shared';

const router = express.Router();

const userParamsSchema = z.object({
  id: z.string().uuid()
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users in organization
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', validateRequest({ query: PaginationSchema }), async (req: Request, res: Response) => {
  try {
    const { page, limit, sortBy, sortOrder, search } = req.query as any;
    const { organizationId } = req.user!;

    const skip = (page - 1) * limit;
    
    const where = {
      organizationId,
      ...(search && {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } }
        ]
      })
    } as any;

    const [users, total] = await Promise.all([
      req.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: sortBy ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          status: true,
          avatar: true,
          lastLoginAt: true,
          createdAt: true,
          updatedAt: true
        }
      }),
      req.prisma.user.count({ where })
    ]);

    res.json({
      success: true,
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrevious: page > 1
      }
    });

  } catch (error) {
    logger.error('Get users error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 */
router.get('/:id', validateRequest({ params: userParamsSchema }), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { organizationId } = req.user!;

    const user = await req.prisma.user.findFirst({
      where: { id, organizationId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        avatar: true,
        bio: true,
        timezone: true,
        preferences: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
        organization: {
          select: {
            id: true,
            name: true,
            plan: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });

  } catch (error) {
    logger.error('Get user error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user
 *     tags: [Users]
 */
router.put('/:id', 
  validateRequest({ 
    params: userParamsSchema, 
    body: UpdateUserSchema 
  }), 
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { organizationId, role: userRole } = req.user!;
      const updateData = req.body;

      // Check if user exists in same organization
      const existingUser = await req.prisma.user.findFirst({
        where: { id, organizationId }
      });

      if (!existingUser) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      // Check permissions - only admins can update other users' roles
      if (updateData.role && userRole !== 'admin' && id !== req.user!.id) {
        return res.status(403).json({
          success: false,
          error: 'Insufficient permissions to update role'
        });
      }

      const updatedUser = await req.prisma.user.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          status: true,
          avatar: true,
          bio: true,
          timezone: true,
          preferences: true,
          updatedAt: true
        }
      });

      res.json({
        success: true,
        data: updatedUser
      });

    } catch (error) {
      logger.error('Update user error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user (admin only)
 *     tags: [Users]
 */
router.delete('/:id', 
  requireRole(['ADMIN']),
  validateRequest({ params: userParamsSchema }),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { organizationId } = req.user!;

      // Prevent self-deletion
      if (id === req.user!.id) {
        return res.status(400).json({
          success: false,
          error: 'Cannot delete your own account'
        });
      }

      const user = await req.prisma.user.findFirst({
        where: { id, organizationId }
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      await req.prisma.user.delete({
        where: { id }
      });

      res.json({
        success: true,
        message: 'User deleted successfully'
      });

    } catch (error) {
      logger.error('Delete user error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
);

export default router; 