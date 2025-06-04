"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = exports.authenticate = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = require("../utils/logger");
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const apiKey = req.headers['x-api-key'];
        // Check for API key authentication
        if (apiKey) {
            const apiKeyRecord = await req.prisma.apiKey.findUnique({
                where: { key: apiKey, isActive: true },
                include: { organization: true, creator: true }
            });
            if (!apiKeyRecord || (apiKeyRecord.expiresAt && apiKeyRecord.expiresAt < new Date())) {
                return res.status(401).json({
                    success: false,
                    error: 'Invalid or expired API key'
                });
            }
            // Update last used timestamp
            await req.prisma.apiKey.update({
                where: { id: apiKeyRecord.id },
                data: { lastUsed: new Date() }
            });
            req.user = apiKeyRecord.creator;
            return next();
        }
        // Check for JWT token authentication
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                error: 'Access token required'
            });
        }
        const token = authHeader.substring(7);
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await req.prisma.user.findUnique({
            where: { id: decoded.userId },
            include: { organization: true }
        });
        if (!user || user.status !== 'ACTIVE') {
            return res.status(401).json({
                success: false,
                error: 'Invalid or inactive user'
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        logger_1.logger.error('Auth middleware error:', error);
        return res.status(401).json({
            success: false,
            error: 'Invalid token'
        });
    }
};
exports.authMiddleware = authMiddleware;
// Export alias for backwards compatibility
exports.authenticate = exports.authMiddleware;
const requireRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                error: 'Insufficient permissions'
            });
        }
        next();
    };
};
exports.requireRole = requireRole;
//# sourceMappingURL=auth.js.map