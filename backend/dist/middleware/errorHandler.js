"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.notFound = exports.errorHandler = void 0;
const logger_1 = require("../utils/logger");
const shared_1 = require("@workflowiq/shared");
const errorHandler = (error, req, res, next) => {
    let statusCode = error.statusCode || shared_1.HttpStatus.INTERNAL_SERVER_ERROR;
    let message = error.message || 'Internal Server Error';
    // Log error
    logger_1.logger.error('Error occurred:', {
        error: error.message,
        stack: error.stack,
        url: req.url,
        method: req.method,
        ip: req.ip,
        userAgent: req.get('User-Agent')
    });
    // Prisma errors
    if (error.name === 'PrismaClientKnownRequestError') {
        statusCode = shared_1.HttpStatus.BAD_REQUEST;
        message = 'Database operation failed';
    }
    // Validation errors
    if (error.name === 'ValidationError') {
        statusCode = shared_1.HttpStatus.VALIDATION_ERROR;
        message = 'Validation failed';
    }
    // JWT errors
    if (error.name === 'JsonWebTokenError') {
        statusCode = shared_1.HttpStatus.UNAUTHORIZED;
        message = 'Invalid token';
    }
    if (error.name === 'TokenExpiredError') {
        statusCode = shared_1.HttpStatus.UNAUTHORIZED;
        message = 'Token expired';
    }
    // Don't leak error details in production
    if (process.env.NODE_ENV === 'production' && statusCode === shared_1.HttpStatus.INTERNAL_SERVER_ERROR) {
        message = 'Internal Server Error';
    }
    res.status(statusCode).json({
        success: false,
        error: message,
        statusCode,
        timestamp: new Date().toISOString(),
        path: req.url,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
};
exports.errorHandler = errorHandler;
const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    error.statusCode = shared_1.HttpStatus.NOT_FOUND;
    next(error);
};
exports.notFound = notFound;
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
exports.asyncHandler = asyncHandler;
//# sourceMappingURL=errorHandler.js.map