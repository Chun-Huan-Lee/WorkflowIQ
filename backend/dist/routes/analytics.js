"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = require("../utils/logger");
const router = express_1.default.Router();
/**
 * @swagger
 * /api/analytics/overview:
 *   get:
 *     summary: Get organization analytics overview
 *     tags: [Analytics]
 */
router.get('/overview', async (req, res) => {
    try {
        const { organizationId } = req.user;
        // Get overview metrics
        const [totalWorkflows, totalProcesses, totalUsers, activeWorkflows, recentActivity] = await Promise.all([
            req.prisma.workflow.count({ where: { organizationId } }),
            req.prisma.businessProcess.count({ where: { organizationId } }),
            req.prisma.user.count({ where: { organizationId } }),
            req.prisma.workflow.count({
                where: { organizationId, status: 'ACTIVE' }
            }),
            req.prisma.workflowExecution.findMany({
                where: {
                    workflow: { organizationId }
                },
                orderBy: { startedAt: 'desc' },
                take: 10,
                include: {
                    workflow: {
                        select: { name: true }
                    },
                    initiator: {
                        select: { firstName: true, lastName: true }
                    }
                }
            })
        ]);
        res.json({
            success: true,
            data: {
                metrics: {
                    totalWorkflows,
                    totalProcesses,
                    totalUsers,
                    activeWorkflows
                },
                recentActivity
            }
        });
    }
    catch (error) {
        logger_1.logger.error('Get analytics overview error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});
/**
 * @swagger
 * /api/analytics/workflows:
 *   get:
 *     summary: Get workflow analytics
 *     tags: [Analytics]
 */
router.get('/workflows', async (req, res) => {
    try {
        const { organizationId } = req.user;
        // Get workflow execution metrics
        const executions = await req.prisma.workflowExecution.findMany({
            where: {
                workflow: { organizationId }
            },
            include: {
                workflow: {
                    select: { name: true }
                }
            },
            orderBy: { startedAt: 'desc' },
            take: 100
        });
        // Calculate metrics
        const totalExecutions = executions.length;
        const completedExecutions = executions.filter((e) => e.status === 'COMPLETED').length;
        const failedExecutions = executions.filter((e) => e.status === 'FAILED').length;
        const successRate = totalExecutions > 0 ? (completedExecutions / totalExecutions) * 100 : 0;
        res.json({
            success: true,
            data: {
                totalExecutions,
                completedExecutions,
                failedExecutions,
                successRate,
                executions: executions.slice(0, 20) // Return recent 20
            }
        });
    }
    catch (error) {
        logger_1.logger.error('Get workflow analytics error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});
exports.default = router;
//# sourceMappingURL=analytics.js.map