import { PrismaClient } from '@prisma/client';
import { logger } from './logger';

declare global {
  // Allow global `var` declarations
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

const createPrismaClient = () => {
  const client = new PrismaClient({
    log: [
      { level: 'query', emit: 'event' },
      { level: 'error', emit: 'event' },
      { level: 'info', emit: 'event' },
      { level: 'warn', emit: 'event' },
    ],
  });

  // Log database queries in development
  if (process.env.NODE_ENV === 'development') {
    client.$on('query', (e: any) => {
      logger.debug('Database query:', {
        query: e.query,
        params: e.params,
        duration: e.duration,
      });
    });
  }

  client.$on('error', (e: any) => {
    logger.error('Database error:', e);
  });

  return client;
};

// Prevent multiple instances during development hot reloads
export const prisma = globalThis.__prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma;
}

// Graceful shutdown
process.on('SIGINT', async () => {
  logger.info('Received SIGINT, disconnecting from database...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('Received SIGTERM, disconnecting from database...');
  await prisma.$disconnect();
  process.exit(0);
});

export default prisma; 