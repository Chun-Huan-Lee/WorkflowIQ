"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("./utils/logger");
const database_1 = require("./utils/database");
const auth_1 = require("./middleware/auth");
const handlers_1 = require("./websocket/handlers");
// Import routes
const auth_2 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const organizations_1 = __importDefault(require("./routes/organizations"));
const workflows_1 = __importDefault(require("./routes/workflows"));
const processes_1 = __importDefault(require("./routes/processes"));
const dashboards_1 = __importDefault(require("./routes/dashboards"));
const analytics_1 = __importDefault(require("./routes/analytics"));
const collaboration_1 = __importDefault(require("./routes/collaboration"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
const server = (0, http_1.createServer)(app);
exports.server = server;
// Initialize Socket.IO
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
exports.io = io;
// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'WorkflowIQ API',
            version: '1.0.0',
            description: 'AI-Powered Business Process Intelligence Platform API',
        },
        servers: [
            {
                url: process.env.API_URL || 'http://localhost:4000',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};
const specs = (0, swagger_jsdoc_1.default)(swaggerOptions);
// Middleware
app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// Logging middleware
app.use((0, morgan_1.default)('combined', {
    stream: {
        write: (message) => logger_1.logger.info(message.trim())
    }
}));
// Add Prisma to request object
app.use((req, res, next) => {
    req.prisma = database_1.prisma;
    next();
});
// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || '1.0.0'
    });
});
// API Documentation
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }'
}));
// Routes
app.use('/api/auth', auth_2.default);
app.use('/api/users', auth_1.authMiddleware, users_1.default);
app.use('/api/organizations', auth_1.authMiddleware, organizations_1.default);
app.use('/api/workflows', workflows_1.default); // Auth middleware applied in the route file
app.use('/api/processes', auth_1.authMiddleware, processes_1.default);
app.use('/api/dashboards', auth_1.authMiddleware, dashboards_1.default);
app.use('/api/analytics', auth_1.authMiddleware, analytics_1.default);
app.use('/api/collaboration', collaboration_1.default); // Auth middleware applied in the route file
// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found',
        path: req.originalUrl
    });
});
// Global error handler
app.use((err, req, res, next) => {
    logger_1.logger.error('Unhandled error:', err);
    res.status(err.status || 500).json({
        success: false,
        error: process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : err.message,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
});
// Setup WebSocket handlers
(0, handlers_1.setupWebSocketHandlers)(io);
const PORT = process.env.PORT || 4000;
// Graceful shutdown
const gracefulShutdown = async () => {
    logger_1.logger.info('Received shutdown signal, starting graceful shutdown...');
    server.close(() => {
        logger_1.logger.info('HTTP server closed');
    });
    await database_1.prisma.$disconnect();
    logger_1.logger.info('Database disconnected');
    process.exit(0);
};
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
// Start server
server.listen(PORT, () => {
    logger_1.logger.info(`🚀 WorkflowIQ Backend Server running on port ${PORT}`);
    logger_1.logger.info(`📚 API Documentation available at http://localhost:${PORT}/api-docs`);
    logger_1.logger.info(`🔄 WebSocket server initialized`);
    logger_1.logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
//# sourceMappingURL=server.js.map