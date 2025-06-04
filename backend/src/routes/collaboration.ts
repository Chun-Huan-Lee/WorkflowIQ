import express, { Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

/**
 * @swagger
 * /api/collaboration/cursors:
 *   get:
 *     summary: Get active cursors for real-time collaboration
 *     tags: [Collaboration]
 */
router.get('/cursors', async (req: Request, res: Response) => {
  try {
    const user = req.user as any;
    const { resourceId, resourceType } = req.query;

    // Get active cursors for the resource
    const cursors = await req.prisma.collaborationCursor.findMany({
      where: {
        resourceId: resourceId as string,
        resourceType: resourceType as string,
        organizationId: user.organizationId,
        updatedAt: {
          gte: new Date(Date.now() - 30000) // Last 30 seconds
        }
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: cursors
    });

  } catch (error) {
    logger.error('Get cursors error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * @swagger
 * /api/collaboration/comments:
 *   get:
 *     summary: Get comments for a resource
 *     tags: [Collaboration]
 */
router.get('/comments', async (req: Request, res: Response) => {
  try {
    const user = req.user as any;
    const { resourceId, resourceType } = req.query;

    const comments = await req.prisma.comment.findMany({
      where: {
        resourceId: resourceId as string,
        resourceType: resourceType as string,
        organizationId: user.organizationId
      },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        },
        replies: {
          include: {
            author: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: comments
    });

  } catch (error) {
    logger.error('Get comments error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * @swagger
 * /api/collaboration/comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Collaboration]
 */
router.post('/comments', async (req: Request, res: Response) => {
  try {
    const user = req.user as any;
    const { resourceId, resourceType, content, position, parentId } = req.body;

    const comment = await req.prisma.comment.create({
      data: {
        resourceId,
        resourceType,
        content,
        position,
        parentId,
        authorId: user.id,
        organizationId: user.organizationId
      },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      data: comment
    });

  } catch (error) {
    logger.error('Create comment error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router; 