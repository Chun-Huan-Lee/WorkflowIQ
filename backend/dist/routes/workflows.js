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
// Apply auth middleware to all routes
router.use(auth_1.authMiddleware);
const workflowParamsSchema = zod_1.z.object({
    id: zod_1.z.string().uuid()
});
/**
 * @swagger
 * /api/workflows:
 *   get:
 *     summary: Get all workflows
 *     tags: [Workflows]
 */
router.get('/', (0, validation_1.validateRequest)({ query: shared_1.PaginationSchema }), async (req, res) => {
    try {
        const { page, limit, sortBy, sortOrder, search, filters } = req.query;
        const user = req.user;
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
        };
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
    }
    catch (error) {
        logger_1.logger.error('Get workflows error:', error);
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
router.get('/:id', (0, validation_1.validateRequest)({ params: workflowParamsSchema }), async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
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
    }
    catch (error) {
        logger_1.logger.error('Get workflow error:', error);
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
router.post('/', (0, validation_1.validateRequest)({ body: shared_1.CreateWorkflowSchema }), async (req, res) => {
    try {
        const user = req.user;
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
    }
    catch (error) {
        logger_1.logger.error('Create workflow error:', error);
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
router.put('/:id', (0, validation_1.validateRequest)({
    params: workflowParamsSchema,
    body: shared_1.UpdateWorkflowSchema
}), async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
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
    }
    catch (error) {
        logger_1.logger.error('Update workflow error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});
/**
 * @swagger
 * /api/workflows/{id}:
 *   delete:
 *     summary: Delete workflow
 *     tags: [Workflows]
 */
router.delete('/:id', (0, validation_1.validateRequest)({ params: workflowParamsSchema }), async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
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
    }
    catch (error) {
        logger_1.logger.error('Delete workflow error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});
exports.default = router;
//# sourceMappingURL=workflows.js.map