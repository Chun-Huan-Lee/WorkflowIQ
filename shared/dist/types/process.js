"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessMiningResultSchema = exports.ProcessMiningConfigSchema = exports.UpdateProcessSchema = exports.CreateProcessSchema = exports.BusinessProcessSchema = exports.ProcessMetricsSchema = exports.ProcessStepSchema = exports.ProcessComplexity = exports.ProcessStatus = void 0;
const zod_1 = require("zod");
var ProcessStatus;
(function (ProcessStatus) {
    ProcessStatus["DISCOVERED"] = "discovered";
    ProcessStatus["DOCUMENTED"] = "documented";
    ProcessStatus["OPTIMIZED"] = "optimized";
    ProcessStatus["DEPRECATED"] = "deprecated";
})(ProcessStatus || (exports.ProcessStatus = ProcessStatus = {}));
var ProcessComplexity;
(function (ProcessComplexity) {
    ProcessComplexity["SIMPLE"] = "simple";
    ProcessComplexity["MEDIUM"] = "medium";
    ProcessComplexity["COMPLEX"] = "complex";
})(ProcessComplexity || (exports.ProcessComplexity = ProcessComplexity = {}));
exports.ProcessStepSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    estimatedTime: zod_1.z.number().optional(), // in minutes
    actualTime: zod_1.z.number().optional(),
    owner: zod_1.z.string().optional(),
    systems: zod_1.z.array(zod_1.z.string()).default([]),
    inputs: zod_1.z.array(zod_1.z.string()).default([]),
    outputs: zod_1.z.array(zod_1.z.string()).default([]),
    dependencies: zod_1.z.array(zod_1.z.string()).default([]),
    order: zod_1.z.number()
});
exports.ProcessMetricsSchema = zod_1.z.object({
    averageCompletionTime: zod_1.z.number().optional(),
    successRate: zod_1.z.number().min(0).max(100).optional(),
    costPerExecution: zod_1.z.number().optional(),
    volumePerMonth: zod_1.z.number().optional(),
    bottlenecks: zod_1.z.array(zod_1.z.object({
        stepId: zod_1.z.string(),
        severity: zod_1.z.enum(['low', 'medium', 'high']),
        description: zod_1.z.string()
    })).default([]),
    lastAnalyzed: zod_1.z.date().optional()
});
exports.BusinessProcessSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string().min(1),
    description: zod_1.z.string().optional(),
    organizationId: zod_1.z.string().uuid(),
    department: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    status: zod_1.z.nativeEnum(ProcessStatus),
    complexity: zod_1.z.nativeEnum(ProcessComplexity),
    steps: zod_1.z.array(exports.ProcessStepSchema),
    metrics: exports.ProcessMetricsSchema.optional(),
    stakeholders: zod_1.z.array(zod_1.z.object({
        userId: zod_1.z.string().uuid(),
        role: zod_1.z.enum(['owner', 'participant', 'reviewer', 'approver'])
    })).default([]),
    documents: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        url: zod_1.z.string(),
        type: zod_1.z.enum(['document', 'video', 'image', 'other'])
    })).default([]),
    tags: zod_1.z.array(zod_1.z.string()).default([]),
    aiInsights: zod_1.z.object({
        optimizationSuggestions: zod_1.z.array(zod_1.z.string()).default([]),
        automationOpportunities: zod_1.z.array(zod_1.z.string()).default([]),
        riskAssessment: zod_1.z.object({
            score: zod_1.z.number().min(0).max(100),
            factors: zod_1.z.array(zod_1.z.string())
        }).optional(),
        lastAnalyzed: zod_1.z.date().optional()
    }).optional(),
    createdBy: zod_1.z.string().uuid(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date()
});
exports.CreateProcessSchema = exports.BusinessProcessSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    aiInsights: true
});
exports.UpdateProcessSchema = exports.CreateProcessSchema.partial();
// Process Mining Types
exports.ProcessMiningConfigSchema = zod_1.z.object({
    dataSource: zod_1.z.enum(['database', 'csv', 'api', 'logs']),
    caseIdColumn: zod_1.z.string(),
    activityColumn: zod_1.z.string(),
    timestampColumn: zod_1.z.string(),
    resourceColumn: zod_1.z.string().optional(),
    additionalColumns: zod_1.z.array(zod_1.z.string()).default([]),
    filters: zod_1.z.record(zod_1.z.any()).optional()
});
exports.ProcessMiningResultSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    configId: zod_1.z.string().uuid(),
    processId: zod_1.z.string().uuid().optional(),
    discoveredProcesses: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        frequency: zod_1.z.number(),
        averageDuration: zod_1.z.number(),
        variants: zod_1.z.array(zod_1.z.object({
            path: zod_1.z.array(zod_1.z.string()),
            frequency: zod_1.z.number(),
            duration: zod_1.z.number()
        }))
    })),
    insights: zod_1.z.object({
        totalCases: zod_1.z.number(),
        uniqueActivities: zod_1.z.number(),
        averageCaseDuration: zod_1.z.number(),
        mostCommonPath: zod_1.z.array(zod_1.z.string()),
        deviations: zod_1.z.array(zod_1.z.object({
            description: zod_1.z.string(),
            frequency: zod_1.z.number(),
            impact: zod_1.z.enum(['low', 'medium', 'high'])
        }))
    }),
    createdAt: zod_1.z.date()
});
//# sourceMappingURL=process.js.map