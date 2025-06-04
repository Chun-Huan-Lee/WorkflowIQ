"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupWebSocketHandlers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = require("../utils/logger");
const database_1 = require("../utils/database");
const setupWebSocketHandlers = (io) => {
    // Authentication middleware for socket connections
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token;
            if (!token) {
                return next(new Error('Authentication token required'));
            }
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const user = await database_1.prisma.user.findUnique({
                where: { id: decoded.userId },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    organizationId: true
                }
            });
            if (!user) {
                return next(new Error('User not found'));
            }
            socket.user = user;
            next();
        }
        catch (error) {
            logger_1.logger.error('Socket authentication error:', error);
            next(new Error('Invalid authentication token'));
        }
    });
    io.on('connection', (socket) => {
        logger_1.logger.info(`User connected: ${socket.user?.id}`);
        // Join organization room
        socket.join(`org:${socket.user?.organizationId}`);
        // Handle joining specific resource rooms
        socket.on('join-resource', (data) => {
            const roomName = `${data.resourceType}:${data.resourceId}`;
            socket.join(roomName);
            logger_1.logger.debug(`User ${socket.user?.id} joined room: ${roomName}`);
        });
        // Handle leaving specific resource rooms
        socket.on('leave-resource', (data) => {
            const roomName = `${data.resourceType}:${data.resourceId}`;
            socket.leave(roomName);
            logger_1.logger.debug(`User ${socket.user?.id} left room: ${roomName}`);
        });
        // Handle cursor position updates
        socket.on('cursor-update', (data) => {
            const roomName = `${data.resourceType}:${data.resourceId}`;
            // Broadcast to other users in the same resource
            socket.to(roomName).emit('cursor-update', {
                userId: socket.user?.id,
                user: {
                    id: socket.user?.id,
                    firstName: socket.user?.firstName,
                    lastName: socket.user?.lastName
                },
                position: data.position,
                elementId: data.elementId,
                timestamp: new Date()
            });
        });
        // Handle real-time text changes (for collaborative editing)
        socket.on('text-change', (data) => {
            const roomName = `${data.resourceType}:${data.resourceId}`;
            // Broadcast the operation to other users
            socket.to(roomName).emit('text-change', {
                userId: socket.user?.id,
                operation: data.operation,
                version: data.version,
                timestamp: new Date()
            });
        });
        // Handle comments
        socket.on('comment-added', (data) => {
            const roomName = `${data.resourceType}:${data.resourceId}`;
            // Broadcast new comment to all users in the resource
            socket.to(roomName).emit('comment-added', {
                comment: data.comment,
                timestamp: new Date()
            });
        });
        // Handle workflow execution updates
        socket.on('workflow-execution-update', (data) => {
            const roomName = `workflow:${data.workflowId}`;
            // Broadcast execution status to all users watching the workflow
            io.to(roomName).emit('workflow-execution-update', {
                executionId: data.executionId,
                status: data.status,
                currentStep: data.currentStep,
                timestamp: new Date()
            });
        });
        // Handle process mining updates
        socket.on('process-mining-update', (data) => {
            const roomName = `process:${data.processId}`;
            // Broadcast mining progress to all users watching the process
            io.to(roomName).emit('process-mining-update', {
                processId: data.processId,
                progress: data.progress,
                stage: data.stage,
                timestamp: new Date()
            });
        });
        // Handle disconnection
        socket.on('disconnect', () => {
            logger_1.logger.info(`User disconnected: ${socket.user?.id}`);
            // Broadcast cursor removal to all rooms the user was in
            socket.rooms.forEach(room => {
                if (room !== socket.id) {
                    socket.to(room).emit('cursor-removed', {
                        userId: socket.user?.id
                    });
                }
            });
        });
        // Handle errors
        socket.on('error', (error) => {
            logger_1.logger.error('Socket error:', error);
        });
    });
    logger_1.logger.info('WebSocket handlers initialized');
};
exports.setupWebSocketHandlers = setupWebSocketHandlers;
//# sourceMappingURL=handlers.js.map