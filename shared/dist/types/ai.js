"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemanticSearchResultSchema = exports.SemanticSearchRequestSchema = exports.EmbeddingSchema = exports.AIInsightSchema = exports.ProcessOptimizationRequestSchema = exports.ProcessDiscoveryRequestSchema = exports.AITaskSchema = exports.AIPromptSchema = exports.AITaskType = exports.AIProvider = void 0;
const zod_1 = require("zod");
var AIProvider;
(function (AIProvider) {
    AIProvider["OPENAI"] = "openai";
    AIProvider["ANTHROPIC"] = "anthropic";
    AIProvider["GEMINI"] = "gemini";
    AIProvider["CUSTOM"] = "custom";
})(AIProvider || (exports.AIProvider = AIProvider = {}));
var AITaskType;
(function (AITaskType) {
    AITaskType["PROCESS_DISCOVERY"] = "process_discovery";
    AITaskType["WORKFLOW_OPTIMIZATION"] = "workflow_optimization";
    AITaskType["DOCUMENT_ANALYSIS"] = "document_analysis";
    AITaskType["PATTERN_RECOGNITION"] = "pattern_recognition";
    AITaskType["ANOMALY_DETECTION"] = "anomaly_detection";
    AITaskType["PREDICTIVE_ANALYSIS"] = "predictive_analysis";
})(AITaskType || (exports.AITaskType = AITaskType = {}));
exports.AIPromptSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    template: zod_1.z.string(),
    variables: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        type: zod_1.z.enum(['string', 'number', 'boolean', 'array', 'object']),
        required: zod_1.z.boolean().default(false),
        description: zod_1.z.string().optional()
    })).default([]),
    taskType: zod_1.z.nativeEnum(AITaskType),
    provider: zod_1.z.nativeEnum(AIProvider),
    model: zod_1.z.string(),
    parameters: zod_1.z.object({
        temperature: zod_1.z.number().min(0).max(2).default(0.7),
        maxTokens: zod_1.z.number().min(1).max(100000).default(1000),
        topP: zod_1.z.number().min(0).max(1).default(1),
        frequencyPenalty: zod_1.z.number().min(-2).max(2).default(0),
        presencePenalty: zod_1.z.number().min(-2).max(2).default(0)
    }),
    createdBy: zod_1.z.string().uuid(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date()
});
exports.AITaskSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    type: zod_1.z.nativeEnum(AITaskType),
    status: zod_1.z.enum(['pending', 'running', 'completed', 'failed']),
    input: zod_1.z.record(zod_1.z.any()),
    output: zod_1.z.record(zod_1.z.any()).optional(),
    promptId: zod_1.z.string().uuid().optional(),
    provider: zod_1.z.nativeEnum(AIProvider),
    model: zod_1.z.string(),
    usage: zod_1.z.object({
        promptTokens: zod_1.z.number(),
        completionTokens: zod_1.z.number(),
        totalTokens: zod_1.z.number(),
        cost: zod_1.z.number().optional()
    }).optional(),
    error: zod_1.z.string().optional(),
    executionTime: zod_1.z.number().optional(), // in milliseconds
    createdBy: zod_1.z.string().uuid(),
    createdAt: zod_1.z.date(),
    completedAt: zod_1.z.date().optional()
});
exports.ProcessDiscoveryRequestSchema = zod_1.z.object({
    documentText: zod_1.z.string().optional(),
    documentUrl: zod_1.z.string().optional(),
    systemLogs: zod_1.z.array(zod_1.z.object({
        timestamp: zod_1.z.date(),
        user: zod_1.z.string(),
        action: zod_1.z.string(),
        system: zod_1.z.string(),
        details: zod_1.z.record(zod_1.z.any()).optional()
    })).optional(),
    context: zod_1.z.object({
        department: zod_1.z.string().optional(),
        processType: zod_1.z.string().optional(),
        industry: zod_1.z.string().optional()
    }).optional()
});
exports.ProcessOptimizationRequestSchema = zod_1.z.object({
    processId: zod_1.z.string().uuid(),
    currentMetrics: zod_1.z.object({
        averageTime: zod_1.z.number(),
        successRate: zod_1.z.number(),
        cost: zod_1.z.number().optional(),
        bottlenecks: zod_1.z.array(zod_1.z.string())
    }),
    goals: zod_1.z.array(zod_1.z.enum(['reduce_time', 'increase_quality', 'reduce_cost', 'improve_compliance'])),
    constraints: zod_1.z.array(zod_1.z.string()).default([])
});
exports.AIInsightSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    type: zod_1.z.enum(['optimization', 'anomaly', 'prediction', 'recommendation']),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    confidence: zod_1.z.number().min(0).max(1),
    impact: zod_1.z.enum(['low', 'medium', 'high']),
    category: zod_1.z.string(),
    data: zod_1.z.record(zod_1.z.any()),
    actionable: zod_1.z.boolean().default(false),
    actions: zod_1.z.array(zod_1.z.object({
        title: zod_1.z.string(),
        description: zod_1.z.string(),
        estimatedEffort: zod_1.z.enum(['low', 'medium', 'high']),
        expectedBenefit: zod_1.z.string()
    })).default([]),
    relatedResources: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string(),
        type: zod_1.z.enum(['workflow', 'process', 'document']),
        name: zod_1.z.string()
    })).default([]),
    generatedBy: zod_1.z.object({
        taskId: zod_1.z.string().uuid(),
        model: zod_1.z.string(),
        provider: zod_1.z.nativeEnum(AIProvider)
    }),
    createdAt: zod_1.z.date(),
    expiresAt: zod_1.z.date().optional()
});
exports.EmbeddingSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    resourceId: zod_1.z.string().uuid(),
    resourceType: zod_1.z.enum(['workflow', 'process', 'document', 'comment']),
    content: zod_1.z.string(),
    vector: zod_1.z.array(zod_1.z.number()),
    metadata: zod_1.z.record(zod_1.z.any()).default({}),
    createdAt: zod_1.z.date()
});
exports.SemanticSearchRequestSchema = zod_1.z.object({
    query: zod_1.z.string(),
    resourceTypes: zod_1.z.array(zod_1.z.enum(['workflow', 'process', 'document', 'comment'])).optional(),
    organizationId: zod_1.z.string().uuid(),
    limit: zod_1.z.number().min(1).max(100).default(10),
    threshold: zod_1.z.number().min(0).max(1).default(0.7)
});
exports.SemanticSearchResultSchema = zod_1.z.object({
    results: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string(),
        resourceId: zod_1.z.string(),
        resourceType: zod_1.z.enum(['workflow', 'process', 'document', 'comment']),
        title: zod_1.z.string(),
        content: zod_1.z.string(),
        score: zod_1.z.number(),
        metadata: zod_1.z.record(zod_1.z.any())
    })),
    query: zod_1.z.string(),
    executionTime: zod_1.z.number(),
    totalResults: zod_1.z.number()
});
//# sourceMappingURL=ai.js.map