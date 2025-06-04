import { z } from 'zod';
export declare enum MetricType {
    COUNTER = "counter",
    GAUGE = "gauge",
    HISTOGRAM = "histogram",
    PERCENTAGE = "percentage"
}
export declare enum TimeRange {
    HOUR = "1h",
    DAY = "1d",
    WEEK = "1w",
    MONTH = "1m",
    QUARTER = "3m",
    YEAR = "1y"
}
export declare const DataPointSchema: z.ZodObject<{
    timestamp: z.ZodDate;
    value: z.ZodNumber;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    value: number;
    timestamp: Date;
    metadata?: Record<string, any> | undefined;
}, {
    value: number;
    timestamp: Date;
    metadata?: Record<string, any> | undefined;
}>;
export type DataPoint = z.infer<typeof DataPointSchema>;
export declare const MetricSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    type: z.ZodNativeEnum<typeof MetricType>;
    unit: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    data: z.ZodArray<z.ZodObject<{
        timestamp: z.ZodDate;
        value: z.ZodNumber;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        value: number;
        timestamp: Date;
        metadata?: Record<string, any> | undefined;
    }, {
        value: number;
        timestamp: Date;
        metadata?: Record<string, any> | undefined;
    }>, "many">;
    target: z.ZodOptional<z.ZodNumber>;
    trend: z.ZodOptional<z.ZodObject<{
        direction: z.ZodEnum<["up", "down", "stable"]>;
        percentage: z.ZodNumber;
        period: z.ZodNativeEnum<typeof TimeRange>;
    }, "strip", z.ZodTypeAny, {
        percentage: number;
        direction: "up" | "down" | "stable";
        period: TimeRange;
    }, {
        percentage: number;
        direction: "up" | "down" | "stable";
        period: TimeRange;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: MetricType;
    data: {
        value: number;
        timestamp: Date;
        metadata?: Record<string, any> | undefined;
    }[];
    name: string;
    description?: string | undefined;
    target?: number | undefined;
    category?: string | undefined;
    unit?: string | undefined;
    trend?: {
        percentage: number;
        direction: "up" | "down" | "stable";
        period: TimeRange;
    } | undefined;
}, {
    id: string;
    type: MetricType;
    data: {
        value: number;
        timestamp: Date;
        metadata?: Record<string, any> | undefined;
    }[];
    name: string;
    description?: string | undefined;
    target?: number | undefined;
    category?: string | undefined;
    unit?: string | undefined;
    trend?: {
        percentage: number;
        direction: "up" | "down" | "stable";
        period: TimeRange;
    } | undefined;
}>;
export type Metric = z.infer<typeof MetricSchema>;
export declare const DashboardWidgetSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["chart", "metric", "table", "text"]>;
    title: z.ZodString;
    position: z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
        width: number;
        height: number;
    }, {
        x: number;
        y: number;
        width: number;
        height: number;
    }>;
    config: z.ZodObject<{
        chartType: z.ZodOptional<z.ZodEnum<["line", "bar", "pie", "area", "scatter"]>>;
        metrics: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        timeRange: z.ZodOptional<z.ZodNativeEnum<typeof TimeRange>>;
        filters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        aggregation: z.ZodOptional<z.ZodEnum<["sum", "avg", "min", "max", "count"]>>;
    }, "strip", z.ZodTypeAny, {
        metrics: string[];
        filters?: Record<string, any> | undefined;
        chartType?: "line" | "bar" | "pie" | "area" | "scatter" | undefined;
        timeRange?: TimeRange | undefined;
        aggregation?: "sum" | "avg" | "min" | "max" | "count" | undefined;
    }, {
        metrics?: string[] | undefined;
        filters?: Record<string, any> | undefined;
        chartType?: "line" | "bar" | "pie" | "area" | "scatter" | undefined;
        timeRange?: TimeRange | undefined;
        aggregation?: "sum" | "avg" | "min" | "max" | "count" | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "chart" | "metric" | "table" | "text";
    position: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    config: {
        metrics: string[];
        filters?: Record<string, any> | undefined;
        chartType?: "line" | "bar" | "pie" | "area" | "scatter" | undefined;
        timeRange?: TimeRange | undefined;
        aggregation?: "sum" | "avg" | "min" | "max" | "count" | undefined;
    };
    title: string;
}, {
    id: string;
    type: "chart" | "metric" | "table" | "text";
    position: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    config: {
        metrics?: string[] | undefined;
        filters?: Record<string, any> | undefined;
        chartType?: "line" | "bar" | "pie" | "area" | "scatter" | undefined;
        timeRange?: TimeRange | undefined;
        aggregation?: "sum" | "avg" | "min" | "max" | "count" | undefined;
    };
    title: string;
}>;
export type DashboardWidget = z.infer<typeof DashboardWidgetSchema>;
export declare const DashboardSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    organizationId: z.ZodString;
    createdBy: z.ZodString;
    widgets: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<["chart", "metric", "table", "text"]>;
        title: z.ZodString;
        position: z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
            width: number;
            height: number;
        }, {
            x: number;
            y: number;
            width: number;
            height: number;
        }>;
        config: z.ZodObject<{
            chartType: z.ZodOptional<z.ZodEnum<["line", "bar", "pie", "area", "scatter"]>>;
            metrics: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            timeRange: z.ZodOptional<z.ZodNativeEnum<typeof TimeRange>>;
            filters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
            aggregation: z.ZodOptional<z.ZodEnum<["sum", "avg", "min", "max", "count"]>>;
        }, "strip", z.ZodTypeAny, {
            metrics: string[];
            filters?: Record<string, any> | undefined;
            chartType?: "line" | "bar" | "pie" | "area" | "scatter" | undefined;
            timeRange?: TimeRange | undefined;
            aggregation?: "sum" | "avg" | "min" | "max" | "count" | undefined;
        }, {
            metrics?: string[] | undefined;
            filters?: Record<string, any> | undefined;
            chartType?: "line" | "bar" | "pie" | "area" | "scatter" | undefined;
            timeRange?: TimeRange | undefined;
            aggregation?: "sum" | "avg" | "min" | "max" | "count" | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        type: "chart" | "metric" | "table" | "text";
        position: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        config: {
            metrics: string[];
            filters?: Record<string, any> | undefined;
            chartType?: "line" | "bar" | "pie" | "area" | "scatter" | undefined;
            timeRange?: TimeRange | undefined;
            aggregation?: "sum" | "avg" | "min" | "max" | "count" | undefined;
        };
        title: string;
    }, {
        id: string;
        type: "chart" | "metric" | "table" | "text";
        position: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        config: {
            metrics?: string[] | undefined;
            filters?: Record<string, any> | undefined;
            chartType?: "line" | "bar" | "pie" | "area" | "scatter" | undefined;
            timeRange?: TimeRange | undefined;
            aggregation?: "sum" | "avg" | "min" | "max" | "count" | undefined;
        };
        title: string;
    }>, "many">;
    filters: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
    isPublic: z.ZodDefault<z.ZodBoolean>;
    sharedWith: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    refreshInterval: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    organizationId: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    createdBy: string;
    filters: Record<string, any>;
    widgets: {
        id: string;
        type: "chart" | "metric" | "table" | "text";
        position: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        config: {
            metrics: string[];
            filters?: Record<string, any> | undefined;
            chartType?: "line" | "bar" | "pie" | "area" | "scatter" | undefined;
            timeRange?: TimeRange | undefined;
            aggregation?: "sum" | "avg" | "min" | "max" | "count" | undefined;
        };
        title: string;
    }[];
    isPublic: boolean;
    sharedWith: string[];
    refreshInterval: number;
    description?: string | undefined;
}, {
    id: string;
    organizationId: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    createdBy: string;
    widgets: {
        id: string;
        type: "chart" | "metric" | "table" | "text";
        position: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        config: {
            metrics?: string[] | undefined;
            filters?: Record<string, any> | undefined;
            chartType?: "line" | "bar" | "pie" | "area" | "scatter" | undefined;
            timeRange?: TimeRange | undefined;
            aggregation?: "sum" | "avg" | "min" | "max" | "count" | undefined;
        };
        title: string;
    }[];
    description?: string | undefined;
    filters?: Record<string, any> | undefined;
    isPublic?: boolean | undefined;
    sharedWith?: string[] | undefined;
    refreshInterval?: number | undefined;
}>;
export type Dashboard = z.infer<typeof DashboardSchema>;
export declare const AnalyticsQuerySchema: z.ZodObject<{
    metrics: z.ZodArray<z.ZodString, "many">;
    dimensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    filters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    timeRange: z.ZodObject<{
        start: z.ZodDate;
        end: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        start: Date;
        end: Date;
    }, {
        start: Date;
        end: Date;
    }>;
    granularity: z.ZodDefault<z.ZodEnum<["minute", "hour", "day", "week", "month"]>>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    metrics: string[];
    timeRange: {
        start: Date;
        end: Date;
    };
    granularity: "minute" | "hour" | "day" | "week" | "month";
    limit: number;
    filters?: Record<string, any> | undefined;
    dimensions?: string[] | undefined;
}, {
    metrics: string[];
    timeRange: {
        start: Date;
        end: Date;
    };
    filters?: Record<string, any> | undefined;
    dimensions?: string[] | undefined;
    granularity?: "minute" | "hour" | "day" | "week" | "month" | undefined;
    limit?: number | undefined;
}>;
export type AnalyticsQuery = z.infer<typeof AnalyticsQuerySchema>;
export declare const AnalyticsResultSchema: z.ZodObject<{
    query: z.ZodObject<{
        metrics: z.ZodArray<z.ZodString, "many">;
        dimensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        filters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        timeRange: z.ZodObject<{
            start: z.ZodDate;
            end: z.ZodDate;
        }, "strip", z.ZodTypeAny, {
            start: Date;
            end: Date;
        }, {
            start: Date;
            end: Date;
        }>;
        granularity: z.ZodDefault<z.ZodEnum<["minute", "hour", "day", "week", "month"]>>;
        limit: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        metrics: string[];
        timeRange: {
            start: Date;
            end: Date;
        };
        granularity: "minute" | "hour" | "day" | "week" | "month";
        limit: number;
        filters?: Record<string, any> | undefined;
        dimensions?: string[] | undefined;
    }, {
        metrics: string[];
        timeRange: {
            start: Date;
            end: Date;
        };
        filters?: Record<string, any> | undefined;
        dimensions?: string[] | undefined;
        granularity?: "minute" | "hour" | "day" | "week" | "month" | undefined;
        limit?: number | undefined;
    }>;
    data: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodAny>, "many">;
    metadata: z.ZodObject<{
        totalRows: z.ZodNumber;
        executionTime: z.ZodNumber;
        cached: z.ZodBoolean;
        lastUpdated: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        totalRows: number;
        executionTime: number;
        cached: boolean;
        lastUpdated: Date;
    }, {
        totalRows: number;
        executionTime: number;
        cached: boolean;
        lastUpdated: Date;
    }>;
    error: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    data: Record<string, any>[];
    metadata: {
        totalRows: number;
        executionTime: number;
        cached: boolean;
        lastUpdated: Date;
    };
    query: {
        metrics: string[];
        timeRange: {
            start: Date;
            end: Date;
        };
        granularity: "minute" | "hour" | "day" | "week" | "month";
        limit: number;
        filters?: Record<string, any> | undefined;
        dimensions?: string[] | undefined;
    };
    error?: string | undefined;
}, {
    data: Record<string, any>[];
    metadata: {
        totalRows: number;
        executionTime: number;
        cached: boolean;
        lastUpdated: Date;
    };
    query: {
        metrics: string[];
        timeRange: {
            start: Date;
            end: Date;
        };
        filters?: Record<string, any> | undefined;
        dimensions?: string[] | undefined;
        granularity?: "minute" | "hour" | "day" | "week" | "month" | undefined;
        limit?: number | undefined;
    };
    error?: string | undefined;
}>;
export type AnalyticsResult = z.infer<typeof AnalyticsResultSchema>;
//# sourceMappingURL=analytics.d.ts.map