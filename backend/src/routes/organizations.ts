import express, { Request, Response } from 'express';
import { requireRole } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = express.Router();

/**
 * @swagger
 * /api/organizations/current:
 *   get:
 *     summary: Get current user's organization
 *     tags: [Organizations]
 */
router.get('/current', async (req: Request, res: Response) => {
  try {
    const { organizationId } = req.user!;

    if (!organizationId) {
      return res.status(404).json({
        success: false,
        error: 'User is not associated with an organization'
      });
    }

    const organization = await req.prisma.organization.findUnique({
      where: { id: organizationId },
      include: {
        _count: {
          select: {
            users: true,
            workflows: true,
            processes: true,
            dashboards: true
          }
        }
      }
    });

    if (!organization) {
      return res.status(404).json({
        success: false,
        error: 'Organization not found'
      });
    }

    res.json({
      success: true,
      data: organization
    });

  } catch (error) {
    logger.error('Get organization error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * @swagger
 * /api/organizations/settings:
 *   put:
 *     summary: Update organization settings (admin only)
 *     tags: [Organizations]
 */
router.put('/settings', requireRole(['ADMIN']), async (req: Request, res: Response) => {
  try {
    const { organizationId } = req.user!;
    const { settings } = req.body;

    const updatedOrganization = await req.prisma.organization.update({
      where: { id: organizationId },
      data: { settings }
    });

    res.json({
      success: true,
      data: updatedOrganization
    });

  } catch (error) {
    logger.error('Update organization settings error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router; 