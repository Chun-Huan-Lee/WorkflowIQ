import express, { Request, Response } from 'express';
import { z } from 'zod';
import { validateRequest } from '../middleware/validation';
import { logger } from '../utils/logger';
import { CreateProcessSchema, UpdateProcessSchema, PaginationSchema } from '@workflowiq/shared';

const router = express.Router();

const processParamsSchema = z.object({
  id: z.string().uuid()
});

/**
 * @swagger
 * /api/processes:
 *   get:
 *     summary: Get all business processes
 *     tags: [Processes]
 */
router.get('/', validateRequest({ query: PaginationSchema }), async (req: Request, res: Response) => {
  try {
    const { page, limit, sortBy, sortOrder, search, filters } = req.query as any;
    const { organizationId } = req.user!;

    const skip = (page - 1) * limit;
    
    const where = {
      organizationId,
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { department: { contains: search, mode: 'insensitive' } }
        ]
      }),
      ...(filters?.status && { status: filters.status }),
      ...(filters?.complexity && { complexity: filters.complexity }),
      ...(filters?.department && { department: filters.department })
    } as any;

    const [processes, total] = await Promise.all([
      req.prisma.businessProcess.findMany({
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
              comments: true
            }
          }
        }
      }),
      req.prisma.businessProcess.count({ where })
    ]);

    res.json({
      success: true,
      data: processes,
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
    logger.error('Get processes error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * @swagger
 * /api/processes/{id}:
 *   get:
 *     summary: Get process by ID
 *     tags: [Processes]
 */
router.get('/:id', validateRequest({ params: processParamsSchema }), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { organizationId } = req.user!;

    const process = await req.prisma.businessProcess.findFirst({
      where: { id, organizationId },
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        miningResults: {
          orderBy: { createdAt: 'desc' },
          take: 5
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!process) {
      return res.status(404).json({
        success: false,
        error: 'Process not found'
      });
    }

    res.json({
      success: true,
      data: process
    });

  } catch (error) {
    logger.error('Get process error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * @swagger
 * /api/processes:
 *   post:
 *     summary: Create new business process
 *     tags: [Processes]
 */
router.post('/', validateRequest({ body: CreateProcessSchema }), async (req: Request, res: Response) => {
  try {
    const { organizationId, id: createdBy } = req.user!;
    const processData = req.body;

    const process = await req.prisma.businessProcess.create({
      data: {
        ...processData,
        organizationId,
        createdBy
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
      data: process
    });

  } catch (error) {
    logger.error('Create process error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * @swagger
 * /api/processes/{id}:
 *   put:
 *     summary: Update business process
 *     tags: [Processes]
 */
router.put('/:id', 
  validateRequest({ 
    params: processParamsSchema, 
    body: UpdateProcessSchema 
  }), 
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { organizationId } = req.user!;
      const updateData = req.body;

      const existingProcess = await req.prisma.businessProcess.findFirst({
        where: { id, organizationId }
      });

      if (!existingProcess) {
        return res.status(404).json({
          success: false,
          error: 'Process not found'
        });
      }

      const updatedProcess = await req.prisma.businessProcess.update({
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
        data: updatedProcess
      });

    } catch (error) {
      logger.error('Update process error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
);

/**
 * @swagger
 * /api/processes/{id}:
 *   delete:
 *     summary: Delete business process
 *     tags: [Processes]
 */
router.delete('/:id', validateRequest({ params: processParamsSchema }), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { organizationId } = req.user!;

    const process = await req.prisma.businessProcess.findFirst({
      where: { id, organizationId }
    });

    if (!process) {
      return res.status(404).json({
        success: false,
        error: 'Process not found'
      });
    }

    await req.prisma.businessProcess.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Process deleted successfully'
    });

  } catch (error) {
    logger.error('Delete process error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router; 