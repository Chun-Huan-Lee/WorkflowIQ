"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const logger_1 = require("../utils/logger");
const router = express_1.default.Router();
// Apply auth middleware to all routes
router.use(auth_1.authMiddleware);
/**
 * @swagger
 * /api/collaboration/cursors:
 *   get:
 *     summary: Get active cursors for real-time collaboration
 *     tags: [Collaboration]
 */
router.get('/cursors', async (req, res) => {
    try {
        const user = req.user;
        const { resourceId, resourceType } = req.query;
        // Get active cursors for the resource
        const cursors = await req.prisma.collaborationCursor.findMany({
            where: {
                resourceId: resourceId,
                resourceType: resourceType,
                organizationId: user.organizationId,
                updatedAt: {
                    gte: new Date(Date.now() - 30000) // Last 30 seconds
                }
            },
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        avatar: true
                    }
                }
            }
        });
        res.json({
            success: true,
            data: cursors
        });
    }
    catch (error) {
        logger_1.logger.error('Get cursors error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});
/**
 * @swagger
 * /api/collaboration/comments:
 *   get:
 *     summary: Get comments for a resource
 *     tags: [Collaboration]
 */
router.get('/comments', async (req, res) => {
    try {
        const user = req.user;
        const { resourceId, resourceType } = req.query;
        const comments = await req.prisma.comment.findMany({
            where: {
                resourceId: resourceId,
                resourceType: resourceType,
                organizationId: user.organizationId
            },
            include: {
                author: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        avatar: true
                    }
                },
                replies: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                avatar: true
                            }
                        }
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json({
            success: true,
            data: comments
        });
    }
    catch (error) {
        logger_1.logger.error('Get comments error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});
/**
 * @swagger
 * /api/collaboration/comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Collaboration]
 */
router.post('/comments', async (req, res) => {
    try {
        const user = req.user;
        const { resourceId, resourceType, content, position, parentId } = req.body;
        const comment = await req.prisma.comment.create({
            data: {
                resourceId,
                resourceType,
                content,
                position,
                parentId,
                authorId: user.id,
                organizationId: user.organizationId
            },
            include: {
                author: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        avatar: true
                    }
                }
            }
        });
        res.status(201).json({
            success: true,
            data: comment
        });
    }
    catch (error) {
        logger_1.logger.error('Create comment error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});
exports.default = router;
//# sourceMappingURL=collaboration.js.map