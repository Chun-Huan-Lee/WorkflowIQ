"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsResultSchema = exports.AnalyticsQuerySchema = exports.DashboardSchema = exports.DashboardWidgetSchema = exports.MetricSchema = exports.DataPointSchema = exports.TimeRange = exports.MetricType = void 0;
const zod_1 = require("zod");
var MetricType;
(function (MetricType) {
    MetricType["COUNTER"] = "counter";
    MetricType["GAUGE"] = "gauge";
    MetricType["HISTOGRAM"] = "histogram";
    MetricType["PERCENTAGE"] = "percentage";
})(MetricType || (exports.MetricType = MetricType = {}));
var TimeRange;
(function (TimeRange) {
    TimeRange["HOUR"] = "1h";
    TimeRange["DAY"] = "1d";
    TimeRange["WEEK"] = "1w";
    TimeRange["MONTH"] = "1m";
    TimeRange["QUARTER"] = "3m";
    TimeRange["YEAR"] = "1y";
})(TimeRange || (exports.TimeRange = TimeRange = {}));
exports.DataPointSchema = zod_1.z.object({
    timestamp: zod_1.z.date(),
    value: zod_1.z.number(),
    metadata: zod_1.z.record(zod_1.z.any()).optional()
});
exports.MetricSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    type: zod_1.z.nativeEnum(MetricType),
    unit: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    data: zod_1.z.array(exports.DataPointSchema),
    target: zod_1.z.number().optional(),
    trend: zod_1.z.object({
        direction: zod_1.z.enum(['up', 'down', 'stable']),
        percentage: zod_1.z.number(),
        period: zod_1.z.nativeEnum(TimeRange)
    }).optional()
});
exports.DashboardWidgetSchema = zod_1.z.object({
    id: zod_1.z.string(),
    type: zod_1.z.enum(['chart', 'metric', 'table', 'text']),
    title: zod_1.z.string(),
    position: zod_1.z.object({
        x: zod_1.z.number(),
        y: zod_1.z.number(),
        width: zod_1.z.number(),
        height: zod_1.z.number()
    }),
    config: zod_1.z.object({
        chartType: zod_1.z.enum(['line', 'bar', 'pie', 'area', 'scatter']).optional(),
        metrics: zod_1.z.array(zod_1.z.string()).default([]),
        timeRange: zod_1.z.nativeEnum(TimeRange).optional(),
        filters: zod_1.z.record(zod_1.z.any()).optional(),
        aggregation: zod_1.z.enum(['sum', 'avg', 'min', 'max', 'count']).optional()
    })
});
exports.DashboardSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    organizationId: zod_1.z.string().uuid(),
    createdBy: zod_1.z.string().uuid(),
    widgets: zod_1.z.array(exports.DashboardWidgetSchema),
    filters: zod_1.z.record(zod_1.z.any()).default({}),
    isPublic: zod_1.z.boolean().default(false),
    sharedWith: zod_1.z.array(zod_1.z.string().uuid()).default([]),
    refreshInterval: zod_1.z.number().default(300), // seconds
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date()
});
exports.AnalyticsQuerySchema = zod_1.z.object({
    metrics: zod_1.z.array(zod_1.z.string()),
    dimensions: zod_1.z.array(zod_1.z.string()).optional(),
    filters: zod_1.z.record(zod_1.z.any()).optional(),
    timeRange: zod_1.z.object({
        start: zod_1.z.date(),
        end: zod_1.z.date()
    }),
    granularity: zod_1.z.enum(['minute', 'hour', 'day', 'week', 'month']).default('hour'),
    limit: zod_1.z.number().min(1).max(10000).default(1000)
});
exports.AnalyticsResultSchema = zod_1.z.object({
    query: exports.AnalyticsQuerySchema,
    data: zod_1.z.array(zod_1.z.record(zod_1.z.any())),
    metadata: zod_1.z.object({
        totalRows: zod_1.z.number(),
        executionTime: zod_1.z.number(),
        cached: zod_1.z.boolean(),
        lastUpdated: zod_1.z.date()
    }),
    error: zod_1.z.string().optional()
});
//# sourceMappingURL=analytics.js.map