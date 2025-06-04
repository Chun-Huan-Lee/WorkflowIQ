import express, { Request, Response } from 'express';
import { z } from 'zod';
import { validateRequest } from '../middleware/validation';
import { authMiddleware } from '../middleware/auth';
import { logger } from '../utils/logger';
import { CreateWorkflowSchema, UpdateWorkflowSchema, PaginationSchema } from '@workflowiq/shared';

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

const workflowParamsSchema = z.object({
  id: z.string().uuid()
});

/**
 * @swagger
 * /api/workflows:
 *   get:
 *     summary: Get all workflows
 *     tags: [Workflows]
 */
router.get('/', validateRequest({ query: PaginationSchema }), async (req: Request, res: Response) => {
  try {
    const { page, limit, sortBy, sortOrder, search, filters } = req.query as any;
    const user = req.user as any;

    const skip = (page - 1) * limit;
    
    const where = {
      organizationId: user.organizationId,
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ]
      }),
      ...(filters?.status && { status: filters.status }),
      ...(filters?.tags && { 
        tags: { 
          hasSome: Array.isArray(filters.tags) ? filters.tags : [filters.tags] 
        } 
      })
    } as any;

    const [workflows, total] = await Promise.all([
      req.prisma.workflow.findMany({
        where,
        skip,
        take: limit,
        orderBy: sortBy ? { [sortBy]: sortOrder } : { updatedAt: 'desc' },
        include: {
          creator: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          },
          _count: {
            select: {
              executions: true
            }
          }
        }
      }),
      req.prisma.workflow.count({ where })
    ]);

    res.json({
      success: true,
      data: workflows,
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
    logger.error('Get workflows error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * @swagger
 * /api/workflows/{id}:
 *   get:
 *     summary: Get workflow by ID
 *     tags: [Workflows]
 */
router.get('/:id', validateRequest({ params: workflowParamsSchema }), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user as any;

    const workflow = await req.prisma.workflow.findFirst({
      where: { id, organizationId: user.organizationId },
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        executions: {
          orderBy: { startedAt: 'desc' },
          take: 10,
          include: {
            initiator: {
              select: {
                id: true,
                firstName: true,
                lastName: true
              }
            }
          }
        }
      }
    });

    if (!workflow) {
      return res.status(404).json({
        success: false,
        error: 'Workflow not found'
      });
    }

    res.json({
      success: true,
      data: workflow
    });

  } catch (error) {
    logger.error('Get workflow error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * @swagger
 * /api/workflows:
 *   post:
 *     summary: Create new workflow
 *     tags: [Workflows]
 */
router.post('/', validateRequest({ body: CreateWorkflowSchema }), async (req: Request, res: Response) => {
  try {
    const user = req.user as any;
    const workflowData = req.body;

    const workflow = await req.prisma.workflow.create({
      data: {
        ...workflowData,
        organizationId: user.organizationId,
        createdBy: user.id
      },
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      data: workflow
    });

  } catch (error) {
    logger.error('Create workflow error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * @swagger
 * /api/workflows/{id}:
 *   put:
 *     summary: Update workflow
 *     tags: [Workflows]
 */
router.put('/:id', 
  validateRequest({ 
    params: workflowParamsSchema, 
    body: UpdateWorkflowSchema 
  }), 
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = req.user as any;
      const updateData = req.body;

      const existingWorkflow = await req.prisma.workflow.findFirst({
        where: { id, organizationId: user.organizationId }
      });

      if (!existingWorkflow) {
        return res.status(404).json({
          success: false,
          error: 'Workflow not found'
        });
      }

      const updatedWorkflow = await req.prisma.workflow.update({
        where: { id },
        data: updateData,
        include: {
          creator: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          }
        }
      });

      res.json({
        success: true,
        data: updatedWorkflow
      });

    } catch (error) {
      logger.error('Update workflow error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
);

/**
 * @swagger
 * /api/workflows/{id}:
 *   delete:
 *     summary: Delete workflow
 *     tags: [Workflows]
 */
router.delete('/:id', validateRequest({ params: workflowParamsSchema }), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user as any;

    const workflow = await req.prisma.workflow.findFirst({
      where: { id, organizationId: user.organizationId }
    });

    if (!workflow) {
      return res.status(404).json({
        success: false,
        error: 'Workflow not found'
      });
    }

    await req.prisma.workflow.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Workflow deleted successfully'
    });

  } catch (error) {
    logger.error('Delete workflow error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router; 