import { z } from 'zod';
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
    meta?: {
        total?: number;
        page?: number;
        limit?: number;
        hasNext?: boolean;
        hasPrevious?: boolean;
    };
}
export declare const PaginationSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    search: z.ZodOptional<z.ZodString>;
    filters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    page: number;
    sortOrder: "asc" | "desc";
    filters?: Record<string, any> | undefined;
    sortBy?: string | undefined;
    search?: string | undefined;
}, {
    filters?: Record<string, any> | undefined;
    limit?: number | undefined;
    page?: number | undefined;
    sortBy?: string | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
}>;
export type PaginationParams = z.infer<typeof PaginationSchema>;
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNext: boolean;
        hasPrevious: boolean;
    };
}
export declare enum HttpStatus {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    VALIDATION_ERROR = 422,
    INTERNAL_SERVER_ERROR = 500
}
export interface ErrorResponse {
    success: false;
    error: string;
    message?: string;
    details?: Record<string, any>;
    statusCode: number;
    timestamp: string;
    path: string;
}
export declare const WebhookEventSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["workflow.created", "workflow.updated", "workflow.deleted", "workflow.executed", "process.created", "process.updated", "process.optimized", "user.invited", "collaboration.started", "ai.task.completed"]>;
    data: z.ZodRecord<z.ZodString, z.ZodAny>;
    organizationId: z.ZodString;
    timestamp: z.ZodDate;
    version: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "workflow.created" | "workflow.updated" | "workflow.deleted" | "workflow.executed" | "process.created" | "process.updated" | "process.optimized" | "user.invited" | "collaboration.started" | "ai.task.completed";
    organizationId: string;
    data: Record<string, any>;
    version: string;
    timestamp: Date;
}, {
    id: string;
    type: "workflow.created" | "workflow.updated" | "workflow.deleted" | "workflow.executed" | "process.created" | "process.updated" | "process.optimized" | "user.invited" | "collaboration.started" | "ai.task.completed";
    organizationId: string;
    data: Record<string, any>;
    timestamp: Date;
    version?: string | undefined;
}>;
export type WebhookEvent = z.infer<typeof WebhookEventSchema>;
export declare const ApiKeySchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    key: z.ZodString;
    permissions: z.ZodArray<z.ZodEnum<["read:workflows", "write:workflows", "read:processes", "write:processes", "read:analytics", "execute:ai"]>, "many">;
    rateLimit: z.ZodObject<{
        requestsPerHour: z.ZodDefault<z.ZodNumber>;
        requestsPerDay: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        requestsPerHour: number;
        requestsPerDay: number;
    }, {
        requestsPerHour?: number | undefined;
        requestsPerDay?: number | undefined;
    }>;
    organizationId: z.ZodString;
    createdBy: z.ZodString;
    lastUsed: z.ZodOptional<z.ZodDate>;
    expiresAt: z.ZodOptional<z.ZodDate>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    organizationId: string;
    createdAt: Date;
    name: string;
    createdBy: string;
    permissions: ("read:workflows" | "write:workflows" | "read:processes" | "write:processes" | "read:analytics" | "execute:ai")[];
    key: string;
    rateLimit: {
        requestsPerHour: number;
        requestsPerDay: number;
    };
    isActive: boolean;
    expiresAt?: Date | undefined;
    lastUsed?: Date | undefined;
}, {
    id: string;
    organizationId: string;
    createdAt: Date;
    name: string;
    createdBy: string;
    permissions: ("read:workflows" | "write:workflows" | "read:processes" | "write:processes" | "read:analytics" | "execute:ai")[];
    key: string;
    rateLimit: {
        requestsPerHour?: number | undefined;
        requestsPerDay?: number | undefined;
    };
    expiresAt?: Date | undefined;
    lastUsed?: Date | undefined;
    isActive?: boolean | undefined;
}>;
export type ApiKey = z.infer<typeof ApiKeySchema>;
//# sourceMappingURL=api.d.ts.map