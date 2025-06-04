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
const processParamsSchema = zod_1.z.object({
    id: zod_1.z.string().uuid()
});
/**
 * @swagger
 * /api/processes:
 *   get:
 *     summary: Get all business processes
 *     tags: [Processes]
 */
router.get('/', (0, validation_1.validateRequest)({ query: shared_1.PaginationSchema }), async (req, res) => {
    try {
        const { page, limit, sortBy, sortOrder, search, filters } = req.query;
        const { organizationId } = req.user;
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
        };
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
    }
    catch (error) {
        logger_1.logger.error('Get processes error:', error);
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
router.get('/:id', (0, validation_1.validateRequest)({ params: processParamsSchema }), async (req, res) => {
    try {
        const { id } = req.params;
        const { organizationId } = req.user;
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
    }
    catch (error) {
        logger_1.logger.error('Get process error:', error);
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
router.post('/', (0, validation_1.validateRequest)({ body: shared_1.CreateProcessSchema }), async (req, res) => {
    try {
        const { organizationId, id: createdBy } = req.user;
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
    }
    catch (error) {
        logger_1.logger.error('Create process error:', error);
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
router.put('/:id', (0, validation_1.validateRequest)({
    params: processParamsSchema,
    body: shared_1.UpdateProcessSchema
}), async (req, res) => {
    try {
        const { id } = req.params;
        const { organizationId } = req.user;
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
    }
    catch (error) {
        logger_1.logger.error('Update process error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});
/**
 * @swagger
 * /api/processes/{id}:
 *   delete:
 *     summary: Delete business process
 *     tags: [Processes]
 */
router.delete('/:id', (0, validation_1.validateRequest)({ params: processParamsSchema }), async (req, res) => {
    try {
        const { id } = req.params;
        const { organizationId } = req.user;
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
    }
    catch (error) {
        logger_1.logger.error('Delete process error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});
exports.default = router;
//# sourceMappingURL=processes.js.map