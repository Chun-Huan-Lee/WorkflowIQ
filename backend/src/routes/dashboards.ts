import express, { Request, Response } from 'express';
import { z } from 'zod';
import { validateRequest } from '../middleware/validation';
import { logger } from '../utils/logger';
import { PaginationSchema } from '@workflowiq/shared';

const router = express.Router();

const dashboardParamsSchema = z.object({
  id: z.string().uuid()
});

const createDashboardSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  widgets: z.array(z.any()).default([]),
  filters: z.record(z.any()).default({}),
  isPublic: z.boolean().default(false),
  refreshInterval: z.number().default(300)
});

/**
 * @swagger
 * /api/dashboards:
 *   get:
 *     summary: Get all dashboards
 *     tags: [Dashboards]
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
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ]
      })
    } as any;

    const [dashboards, total] = await Promise.all([
      req.prisma.dashboard.findMany({
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
          }
        }
      }),
      req.prisma.dashboard.count({ where })
    ]);

    res.json({
      success: true,
      data: dashboards,
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
    logger.error('Get dashboards error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * @swagger
 * /api/dashboards/{id}:
 *   get:
 *     summary: Get dashboard by ID
 *     tags: [Dashboards]
 */
router.get('/:id', validateRequest({ params: dashboardParamsSchema }), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { organizationId } = req.user!;

    const dashboard = await req.prisma.dashboard.findFirst({
      where: { id, organizationId },
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

    if (!dashboard) {
      return res.status(404).json({
        success: false,
        error: 'Dashboard not found'
      });
    }

    res.json({
      success: true,
      data: dashboard
    });

  } catch (error) {
    logger.error('Get dashboard error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * @swagger
 * /api/dashboards:
 *   post:
 *     summary: Create new dashboard
 *     tags: [Dashboards]
 */
router.post('/', validateRequest({ body: createDashboardSchema }), async (req: Request, res: Response) => {
  try {
    const { organizationId, id: createdBy } = req.user!;
    const dashboardData = req.body;

    const dashboard = await req.prisma.dashboard.create({
      data: {
        ...dashboardData,
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
      data: dashboard
    });

  } catch (error) {
    logger.error('Create dashboard error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router; 