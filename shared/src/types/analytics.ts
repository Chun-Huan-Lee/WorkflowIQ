import { z } from 'zod';

export enum MetricType {
  COUNTER = 'counter',
  GAUGE = 'gauge',
  HISTOGRAM = 'histogram',
  PERCENTAGE = 'percentage'
}

export enum TimeRange {
  HOUR = '1h',
  DAY = '1d',
  WEEK = '1w',
  MONTH = '1m',
  QUARTER = '3m',
  YEAR = '1y'
}

export const DataPointSchema = z.object({
  timestamp: z.date(),
  value: z.number(),
  metadata: z.record(z.any()).optional()
});

export type DataPoint = z.infer<typeof DataPointSchema>;

export const MetricSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.nativeEnum(MetricType),
  unit: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  data: z.array(DataPointSchema),
  target: z.number().optional(),
  trend: z.object({
    direction: z.enum(['up', 'down', 'stable']),
    percentage: z.number(),
    period: z.nativeEnum(TimeRange)
  }).optional()
});

export type Metric = z.infer<typeof MetricSchema>;

export const DashboardWidgetSchema = z.object({
  id: z.string(),
  type: z.enum(['chart', 'metric', 'table', 'text']),
  title: z.string(),
  position: z.object({
    x: z.number(),
    y: z.number(),
    width: z.number(),
    height: z.number()
  }),
  config: z.object({
    chartType: z.enum(['line', 'bar', 'pie', 'area', 'scatter']).optional(),
    metrics: z.array(z.string()).default([]),
    timeRange: z.nativeEnum(TimeRange).optional(),
    filters: z.record(z.any()).optional(),
    aggregation: z.enum(['sum', 'avg', 'min', 'max', 'count']).optional()
  })
});

export type DashboardWidget = z.infer<typeof DashboardWidgetSchema>;

export const DashboardSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
  organizationId: z.string().uuid(),
  createdBy: z.string().uuid(),
  widgets: z.array(DashboardWidgetSchema),
  filters: z.record(z.any()).default({}),
  isPublic: z.boolean().default(false),
  sharedWith: z.array(z.string().uuid()).default([]),
  refreshInterval: z.number().default(300), // seconds
  createdAt: z.date(),
  updatedAt: z.date()
});

export type Dashboard = z.infer<typeof DashboardSchema>;

export const AnalyticsQuerySchema = z.object({
  metrics: z.array(z.string()),
  dimensions: z.array(z.string()).optional(),
  filters: z.record(z.any()).optional(),
  timeRange: z.object({
    start: z.date(),
    end: z.date()
  }),
  granularity: z.enum(['minute', 'hour', 'day', 'week', 'month']).default('hour'),
  limit: z.number().min(1).max(10000).default(1000)
});

export type AnalyticsQuery = z.infer<typeof AnalyticsQuerySchema>;

export const AnalyticsResultSchema = z.object({
  query: AnalyticsQuerySchema,
  data: z.array(z.record(z.any())),
  metadata: z.object({
    totalRows: z.number(),
    executionTime: z.number(),
    cached: z.boolean(),
    lastUpdated: z.date()
  }),
  error: z.string().optional()
});

export type AnalyticsResult = z.infer<typeof AnalyticsResultSchema>; 