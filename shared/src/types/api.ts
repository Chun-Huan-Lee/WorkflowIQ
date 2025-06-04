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

export const PaginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().optional(),
  filters: z.record(z.any()).optional()
});

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

export enum HttpStatus {
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

export const WebhookEventSchema = z.object({
  id: z.string().uuid(),
  type: z.enum([
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
  data: z.record(z.any()),
  organizationId: z.string().uuid(),
  timestamp: z.date(),
  version: z.string().default('1.0')
});

export type WebhookEvent = z.infer<typeof WebhookEventSchema>;

export const ApiKeySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  key: z.string(),
  permissions: z.array(z.enum([
    'read:workflows',
    'write:workflows',
    'read:processes',
    'write:processes',
    'read:analytics',
    'execute:ai'
  ])),
  rateLimit: z.object({
    requestsPerHour: z.number().default(1000),
    requestsPerDay: z.number().default(10000)
  }),
  organizationId: z.string().uuid(),
  createdBy: z.string().uuid(),
  lastUsed: z.date().optional(),
  expiresAt: z.date().optional(),
  isActive: z.boolean().default(true),
  createdAt: z.date()
});

export type ApiKey = z.infer<typeof ApiKeySchema>; 