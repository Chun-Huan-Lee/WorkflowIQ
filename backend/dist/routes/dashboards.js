"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const validation_1 = require("../middleware/validation");
const logger_1 = require("../utils/logger");
const shared_1 = require("@workflowiq/shared");
const router = express_1.default.Router();
const dashboardParamsSchema = zod_1.z.object({
    id: zod_1.z.string().uuid()
});
const createDashboardSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string().optional(),
    widgets: zod_1.z.array(zod_1.z.any()).default([]),
    filters: zod_1.z.record(zod_1.z.any()).default({}),
    isPublic: zod_1.z.boolean().default(false),
    refreshInterval: zod_1.z.number().default(300)
});
/**
 * @swagger
 * /api/dashboards:
 *   get:
 *     summary: Get all dashboards
 *     tags: [Dashboards]
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
                    { name: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } }
                ]
            })
        };
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
    }
    catch (error) {
        logger_1.logger.error('Get dashboards error:', error);
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
router.get('/:id', (0, validation_1.validateRequest)({ params: dashboardParamsSchema }), async (req, res) => {
    try {
        const { id } = req.params;
        const { organizationId } = req.user;
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
    }
    catch (error) {
        logger_1.logger.error('Get dashboard error:', error);
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
router.post('/', (0, validation_1.validateRequest)({ body: createDashboardSchema }), async (req, res) => {
    try {
        const { organizationId, id: createdBy } = req.user;
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
    }
    catch (error) {
        logger_1.logger.error('Create dashboard error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});
exports.default = router;
//# sourceMappingURL=dashboards.js.map