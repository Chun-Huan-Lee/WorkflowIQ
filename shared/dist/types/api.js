"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeySchema = exports.WebhookEventSchema = exports.HttpStatus = exports.PaginationSchema = void 0;
const zod_1 = require("zod");
exports.PaginationSchema = zod_1.z.object({
    page: zod_1.z.number().min(1).default(1),
    limit: zod_1.z.number().min(1).max(100).default(20),
    sortBy: zod_1.z.string().optional(),
    sortOrder: zod_1.z.enum(['asc', 'desc']).default('desc'),
    search: zod_1.z.string().optional(),
    filters: zod_1.z.record(zod_1.z.any()).optional()
});
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["OK"] = 200] = "OK";
    HttpStatus[HttpStatus["CREATED"] = 201] = "CREATED";
    HttpStatus[HttpStatus["NO_CONTENT"] = 204] = "NO_CONTENT";
    HttpStatus[HttpStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatus[HttpStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpStatus[HttpStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpStatus[HttpStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatus[HttpStatus["CONFLICT"] = 409] = "CONFLICT";
    HttpStatus[HttpStatus["VALIDATION_ERROR"] = 422] = "VALIDATION_ERROR";
    HttpStatus[HttpStatus["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpStatus || (exports.HttpStatus = HttpStatus = {}));
exports.WebhookEventSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    type: zod_1.z.enum([
        'workflow.created',
        'workflow.updated',
        'workflow.deleted',
        'workflow.executed',
        'process.created',
        'process.updated',
        'process.optimized',
        'user.invited',
        'collaboration.started',
        'ai.task.completed'
    ]),
    data: zod_1.z.record(zod_1.z.any()),
    organizationId: zod_1.z.string().uuid(),
    timestamp: zod_1.z.date(),
    version: zod_1.z.string().default('1.0')
});
exports.ApiKeySchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    key: zod_1.z.string(),
    permissions: zod_1.z.array(zod_1.z.enum([
        'read:workflows',
        'write:workflows',
        'read:processes',
        'write:processes',
        'read:analytics',
        'execute:ai'
    ])),
    rateLimit: zod_1.z.object({
        requestsPerHour: zod_1.z.number().default(1000),
        requestsPerDay: zod_1.z.number().default(10000)
    }),
    organizationId: zod_1.z.string().uuid(),
    createdBy: zod_1.z.string().uuid(),
    lastUsed: zod_1.z.date().optional(),
    expiresAt: zod_1.z.date().optional(),
    isActive: zod_1.z.boolean().default(true),
    createdAt: zod_1.z.date()
});
//# sourceMappingURL=api.js.map