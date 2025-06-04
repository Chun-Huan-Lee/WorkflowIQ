import { PrismaClient } from '@prisma/client';
import { Server as SocketIOServer } from 'socket.io';
import Redis from 'ioredis';
import { User } from '@workflowiq/shared';

declare global {
  namespace Express {
    interface Request {
      user?: User;
      prisma: PrismaClient;
      redis: Redis;
      io: SocketIOServer;
    }
  }
} 