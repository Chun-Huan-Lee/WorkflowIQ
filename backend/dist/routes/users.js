"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const validation_1 = require("../middleware/validation");
const auth_1 = require("../middleware/auth");
const logger_1 = require("../utils/logger");
const shared_1 = require("@workflowiq/shared");
const router = express_1.default.Router();
const userParamsSchema = zod_1.z.object({
    id: zod_1.z.string().uuid()
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
router.get('/', (0, validation_1.validateRequest)({ query: shared_1.PaginationSchema }), async (req, res) => {
    try {
        const { page, limit, sortBy, sortOrder, search } = req.query;
        const { organizationId } = req.user;
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
        };
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
    }
    catch (error) {
        logger_1.logger.error('Get users error:', error);
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
router.get('/:id', (0, validation_1.validateRequest)({ params: userParamsSchema }), async (req, res) => {
    try {
        const { id } = req.params;
        const { organizationId } = req.user;
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
    }
    catch (error) {
        logger_1.logger.error('Get user error:', error);
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
router.put('/:id', (0, validation_1.validateRequest)({
    params: userParamsSchema,
    body: shared_1.UpdateUserSchema
}), async (req, res) => {
    try {
        const { id } = req.params;
        const { organizationId, role: userRole } = req.user;
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
        if (updateData.role && userRole !== 'admin' && id !== req.user.id) {
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
    }
    catch (error) {
        logger_1.logger.error('Update user error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user (admin only)
 *     tags: [Users]
 */
router.delete('/:id', (0, auth_1.requireRole)(['ADMIN']), (0, validation_1.validateRequest)({ params: userParamsSchema }), async (req, res) => {
    try {
        const { id } = req.params;
        const { organizationId } = req.user;
        // Prevent self-deletion
        if (id === req.user.id) {
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
    }
    catch (error) {
        logger_1.logger.error('Delete user error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});
exports.default = router;
//# sourceMappingURL=users.js.map