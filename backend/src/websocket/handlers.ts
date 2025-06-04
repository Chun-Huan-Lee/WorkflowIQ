import { Server as SocketIOServer, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger';
import { prisma } from '../utils/database';

interface AuthenticatedSocket extends Socket {
  user?: any;
}

export const setupWebSocketHandlers = (io: SocketIOServer) => {
  // Authentication middleware for socket connections
  io.use(async (socket: AuthenticatedSocket, next) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error('Authentication token required'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
      
      const user = await prisma.user.findUnique({
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
    } catch (error) {
      logger.error('Socket authentication error:', error);
      next(new Error('Invalid authentication token'));
    }
  });

  io.on('connection', (socket: AuthenticatedSocket) => {
    logger.info(`User connected: ${socket.user?.id}`);

    // Join organization room
    socket.join(`org:${socket.user?.organizationId}`);

    // Handle joining specific resource rooms
    socket.on('join-resource', (data: { resourceType: string; resourceId: string }) => {
      const roomName = `${data.resourceType}:${data.resourceId}`;
      socket.join(roomName);
      logger.debug(`User ${socket.user?.id} joined room: ${roomName}`);
    });

    // Handle leaving specific resource rooms
    socket.on('leave-resource', (data: { resourceType: string; resourceId: string }) => {
      const roomName = `${data.resourceType}:${data.resourceId}`;
      socket.leave(roomName);
      logger.debug(`User ${socket.user?.id} left room: ${roomName}`);
    });

    // Handle cursor position updates
    socket.on('cursor-update', (data: {
      resourceType: string;
      resourceId: string;
      position: { x: number; y: number };
      elementId?: string;
    }) => {
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
    socket.on('text-change', (data: {
      resourceType: string;
      resourceId: string;
      operation: any;
      version: number;
    }) => {
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
    socket.on('comment-added', (data: {
      resourceType: string;
      resourceId: string;
      comment: any;
    }) => {
      const roomName = `${data.resourceType}:${data.resourceId}`;
      
      // Broadcast new comment to all users in the resource
      socket.to(roomName).emit('comment-added', {
        comment: data.comment,
        timestamp: new Date()
      });
    });

    // Handle workflow execution updates
    socket.on('workflow-execution-update', (data: {
      workflowId: string;
      executionId: string;
      status: string;
      currentStep?: string;
    }) => {
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
    socket.on('process-mining-update', (data: {
      processId: string;
      progress: number;
      stage: string;
    }) => {
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
      logger.info(`User disconnected: ${socket.user?.id}`);
      
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
      logger.error('Socket error:', error);
    });
  });

  logger.info('WebSocket handlers initialized');
}; 