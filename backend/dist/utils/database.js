"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const logger_1 = require("./logger");
const createPrismaClient = () => {
    const client = new client_1.PrismaClient({
        log: [
            { level: 'query', emit: 'event' },
            { level: 'error', emit: 'event' },
            { level: 'info', emit: 'event' },
            { level: 'warn', emit: 'event' },
        ],
    });
    // Log database queries in development
    if (process.env.NODE_ENV === 'development') {
        client.$on('query', (e) => {
            logger_1.logger.debug('Database query:', {
                query: e.query,
                params: e.params,
                duration: e.duration,
            });
        });
    }
    client.$on('error', (e) => {
        logger_1.logger.error('Database error:', e);
    });
    return client;
};
// Prevent multiple instances during development hot reloads
exports.prisma = globalThis.__prisma ?? createPrismaClient();
if (process.env.NODE_ENV !== 'production') {
    globalThis.__prisma = exports.prisma;
}
// Graceful shutdown
process.on('SIGINT', async () => {
    logger_1.logger.info('Received SIGINT, disconnecting from database...');
    await exports.prisma.$disconnect();
    process.exit(0);
});
process.on('SIGTERM', async () => {
    logger_1.logger.info('Received SIGTERM, disconnecting from database...');
    await exports.prisma.$disconnect();
    process.exit(0);
});
exports.default = exports.prisma;
//# sourceMappingURL=database.js.map