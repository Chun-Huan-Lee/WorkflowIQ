"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = exports.handleValidationErrors = void 0;
const express_validator_1 = require("express-validator");
const zod_1 = require("zod");
const logger_1 = require("../utils/logger");
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            error: 'Validation failed',
            details: errors.array()
        });
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            // Validate request body
            if (schema.body) {
                req.body = schema.body.parse(req.body);
            }
            // Validate query parameters
            if (schema.query) {
                req.query = schema.query.parse(req.query);
            }
            // Validate route parameters
            if (schema.params) {
                req.params = schema.params.parse(req.params);
            }
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                logger_1.logger.error('Validation error:', error.errors);
                return res.status(422).json({
                    success: false,
                    error: 'Validation failed',
                    details: error.errors.map(err => ({
                        field: err.path.join('.'),
                        message: err.message
                    }))
                });
            }
            logger_1.logger.error('Unexpected validation error:', error);
            return res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    };
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=validation.js.map