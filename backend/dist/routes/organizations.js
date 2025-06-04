"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const logger_1 = require("../utils/logger");
const router = express_1.default.Router();
/**
 * @swagger
 * /api/organizations/current:
 *   get:
 *     summary: Get current user's organization
 *     tags: [Organizations]
 */
router.get('/current', async (req, res) => {
    try {
        const { organizationId } = req.user;
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
    }
    catch (error) {
        logger_1.logger.error('Get organization error:', error);
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
router.put('/settings', (0, auth_1.requireRole)(['ADMIN']), async (req, res) => {
    try {
        const { organizationId } = req.user;
        const { settings } = req.body;
        const updatedOrganization = await req.prisma.organization.update({
            where: { id: organizationId },
            data: { settings }
        });
        res.json({
            success: true,
            data: updatedOrganization
        });
    }
    catch (error) {
        logger_1.logger.error('Update organization settings error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});
exports.default = router;
//# sourceMappingURL=organizations.js.map