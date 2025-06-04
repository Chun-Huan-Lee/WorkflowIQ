import { z } from 'zod';
export declare enum AIProvider {
    OPENAI = "openai",
    ANTHROPIC = "anthropic",
    GEMINI = "gemini",
    CUSTOM = "custom"
}
export declare enum AITaskType {
    PROCESS_DISCOVERY = "process_discovery",
    WORKFLOW_OPTIMIZATION = "workflow_optimization",
    DOCUMENT_ANALYSIS = "document_analysis",
    PATTERN_RECOGNITION = "pattern_recognition",
    ANOMALY_DETECTION = "anomaly_detection",
    PREDICTIVE_ANALYSIS = "predictive_analysis"
}
export declare const AIPromptSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    template: z.ZodString;
    variables: z.ZodDefault<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        type: z.ZodEnum<["string", "number", "boolean", "array", "object"]>;
        required: z.ZodDefault<z.ZodBoolean>;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "string" | "number" | "boolean" | "object" | "array";
        name: string;
        required: boolean;
        description?: string | undefined;
    }, {
        type: "string" | "number" | "boolean" | "object" | "array";
        name: string;
        description?: string | undefined;
        required?: boolean | undefined;
    }>, "many">>;
    taskType: z.ZodNativeEnum<typeof AITaskType>;
    provider: z.ZodNativeEnum<typeof AIProvider>;
    model: z.ZodString;
    parameters: z.ZodObject<{
        temperature: z.ZodDefault<z.ZodNumber>;
        maxTokens: z.ZodDefault<z.ZodNumber>;
        topP: z.ZodDefault<z.ZodNumber>;
        frequencyPenalty: z.ZodDefault<z.ZodNumber>;
        presencePenalty: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        temperature: number;
        maxTokens: number;
        topP: number;
        frequencyPenalty: number;
        presencePenalty: number;
    }, {
        temperature?: number | undefined;
        maxTokens?: number | undefined;
        topP?: number | undefined;
        frequencyPenalty?: number | undefined;
        presencePenalty?: number | undefined;
    }>;
    createdBy: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    createdBy: string;
    template: string;
    variables: {
        type: "string" | "number" | "boolean" | "object" | "array";
        name: string;
        required: boolean;
        description?: string | undefined;
    }[];
    taskType: AITaskType;
    provider: AIProvider;
    model: string;
    parameters: {
        temperature: number;
        maxTokens: number;
        topP: number;
        frequencyPenalty: number;
        presencePenalty: number;
    };
    description?: string | undefined;
}, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    createdBy: string;
    template: string;
    taskType: AITaskType;
    provider: AIProvider;
    model: string;
    parameters: {
        temperature?: number | undefined;
        maxTokens?: number | undefined;
        topP?: number | undefined;
        frequencyPenalty?: number | undefined;
        presencePenalty?: number | undefined;
    };
    description?: string | undefined;
    variables?: {
        type: "string" | "number" | "boolean" | "object" | "array";
        name: string;
        description?: string | undefined;
        required?: boolean | undefined;
    }[] | undefined;
}>;
export type AIPrompt = z.infer<typeof AIPromptSchema>;
export declare const AITaskSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodNativeEnum<typeof AITaskType>;
    status: z.ZodEnum<["pending", "running", "completed", "failed"]>;
    input: z.ZodRecord<z.ZodString, z.ZodAny>;
    output: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    promptId: z.ZodOptional<z.ZodString>;
    provider: z.ZodNativeEnum<typeof AIProvider>;
    model: z.ZodString;
    usage: z.ZodOptional<z.ZodObject<{
        promptTokens: z.ZodNumber;
        completionTokens: z.ZodNumber;
        totalTokens: z.ZodNumber;
        cost: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
        cost?: number | undefined;
    }, {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
        cost?: number | undefined;
    }>>;
    error: z.ZodOptional<z.ZodString>;
    executionTime: z.ZodOptional<z.ZodNumber>;
    createdBy: z.ZodString;
    createdAt: z.ZodDate;
    completedAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "pending" | "running" | "completed" | "failed";
    type: AITaskType;
    createdAt: Date;
    createdBy: string;
    provider: AIProvider;
    model: string;
    input: Record<string, any>;
    completedAt?: Date | undefined;
    error?: string | undefined;
    executionTime?: number | undefined;
    output?: Record<string, any> | undefined;
    promptId?: string | undefined;
    usage?: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
        cost?: number | undefined;
    } | undefined;
}, {
    id: string;
    status: "pending" | "running" | "completed" | "failed";
    type: AITaskType;
    createdAt: Date;
    createdBy: string;
    provider: AIProvider;
    model: string;
    input: Record<string, any>;
    completedAt?: Date | undefined;
    error?: string | undefined;
    executionTime?: number | undefined;
    output?: Record<string, any> | undefined;
    promptId?: string | undefined;
    usage?: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
        cost?: number | undefined;
    } | undefined;
}>;
export type AITask = z.infer<typeof AITaskSchema>;
export declare const ProcessDiscoveryRequestSchema: z.ZodObject<{
    documentText: z.ZodOptional<z.ZodString>;
    documentUrl: z.ZodOptional<z.ZodString>;
    systemLogs: z.ZodOptional<z.ZodArray<z.ZodObject<{
        timestamp: z.ZodDate;
        user: z.ZodString;
        action: z.ZodString;
        system: z.ZodString;
        details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        timestamp: Date;
        action: string;
        user: string;
        system: string;
        details?: Record<string, any> | undefined;
    }, {
        timestamp: Date;
        action: string;
        user: string;
        system: string;
        details?: Record<string, any> | undefined;
    }>, "many">>;
    context: z.ZodOptional<z.ZodObject<{
        department: z.ZodOptional<z.ZodString>;
        processType: z.ZodOptional<z.ZodString>;
        industry: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        department?: string | undefined;
        processType?: string | undefined;
        industry?: string | undefined;
    }, {
        department?: string | undefined;
        processType?: string | undefined;
        industry?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    documentText?: string | undefined;
    documentUrl?: string | undefined;
    systemLogs?: {
        timestamp: Date;
        action: string;
        user: string;
        system: string;
        details?: Record<string, any> | undefined;
    }[] | undefined;
    context?: {
        department?: string | undefined;
        processType?: string | undefined;
        industry?: string | undefined;
    } | undefined;
}, {
    documentText?: string | undefined;
    documentUrl?: string | undefined;
    systemLogs?: {
        timestamp: Date;
        action: string;
        user: string;
        system: string;
        details?: Record<string, any> | undefined;
    }[] | undefined;
    context?: {
        department?: string | undefined;
        processType?: string | undefined;
        industry?: string | undefined;
    } | undefined;
}>;
export type ProcessDiscoveryRequest = z.infer<typeof ProcessDiscoveryRequestSchema>;
export declare const ProcessOptimizationRequestSchema: z.ZodObject<{
    processId: z.ZodString;
    currentMetrics: z.ZodObject<{
        averageTime: z.ZodNumber;
        successRate: z.ZodNumber;
        cost: z.ZodOptional<z.ZodNumber>;
        bottlenecks: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        successRate: number;
        bottlenecks: string[];
        averageTime: number;
        cost?: number | undefined;
    }, {
        successRate: number;
        bottlenecks: string[];
        averageTime: number;
        cost?: number | undefined;
    }>;
    goals: z.ZodArray<z.ZodEnum<["reduce_time", "increase_quality", "reduce_cost", "improve_compliance"]>, "many">;
    constraints: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    processId: string;
    currentMetrics: {
        successRate: number;
        bottlenecks: string[];
        averageTime: number;
        cost?: number | undefined;
    };
    goals: ("reduce_time" | "increase_quality" | "reduce_cost" | "improve_compliance")[];
    constraints: string[];
}, {
    processId: string;
    currentMetrics: {
        successRate: number;
        bottlenecks: string[];
        averageTime: number;
        cost?: number | undefined;
    };
    goals: ("reduce_time" | "increase_quality" | "reduce_cost" | "improve_compliance")[];
    constraints?: string[] | undefined;
}>;
export type ProcessOptimizationRequest = z.infer<typeof ProcessOptimizationRequestSchema>;
export declare const AIInsightSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["optimization", "anomaly", "prediction", "recommendation"]>;
    title: z.ZodString;
    description: z.ZodString;
    confidence: z.ZodNumber;
    impact: z.ZodEnum<["low", "medium", "high"]>;
    category: z.ZodString;
    data: z.ZodRecord<z.ZodString, z.ZodAny>;
    actionable: z.ZodDefault<z.ZodBoolean>;
    actions: z.ZodDefault<z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        description: z.ZodString;
        estimatedEffort: z.ZodEnum<["low", "medium", "high"]>;
        expectedBenefit: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        description: string;
        title: string;
        estimatedEffort: "low" | "medium" | "high";
        expectedBenefit: string;
    }, {
        description: string;
        title: string;
        estimatedEffort: "low" | "medium" | "high";
        expectedBenefit: string;
    }>, "many">>;
    relatedResources: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<["workflow", "process", "document"]>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        type: "document" | "workflow" | "process";
        name: string;
    }, {
        id: string;
        type: "document" | "workflow" | "process";
        name: string;
    }>, "many">>;
    generatedBy: z.ZodObject<{
        taskId: z.ZodString;
        model: z.ZodString;
        provider: z.ZodNativeEnum<typeof AIProvider>;
    }, "strip", z.ZodTypeAny, {
        provider: AIProvider;
        model: string;
        taskId: string;
    }, {
        provider: AIProvider;
        model: string;
        taskId: string;
    }>;
    createdAt: z.ZodDate;
    expiresAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "optimization" | "anomaly" | "prediction" | "recommendation";
    createdAt: Date;
    description: string;
    data: Record<string, any>;
    category: string;
    impact: "low" | "medium" | "high";
    title: string;
    confidence: number;
    actionable: boolean;
    actions: {
        description: string;
        title: string;
        estimatedEffort: "low" | "medium" | "high";
        expectedBenefit: string;
    }[];
    relatedResources: {
        id: string;
        type: "document" | "workflow" | "process";
        name: string;
    }[];
    generatedBy: {
        provider: AIProvider;
        model: string;
        taskId: string;
    };
    expiresAt?: Date | undefined;
}, {
    id: string;
    type: "optimization" | "anomaly" | "prediction" | "recommendation";
    createdAt: Date;
    description: string;
    data: Record<string, any>;
    category: string;
    impact: "low" | "medium" | "high";
    title: string;
    confidence: number;
    generatedBy: {
        provider: AIProvider;
        model: string;
        taskId: string;
    };
    expiresAt?: Date | undefined;
    actionable?: boolean | undefined;
    actions?: {
        description: string;
        title: string;
        estimatedEffort: "low" | "medium" | "high";
        expectedBenefit: string;
    }[] | undefined;
    relatedResources?: {
        id: string;
        type: "document" | "workflow" | "process";
        name: string;
    }[] | undefined;
}>;
export type AIInsight = z.infer<typeof AIInsightSchema>;
export declare const EmbeddingSchema: z.ZodObject<{
    id: z.ZodString;
    resourceId: z.ZodString;
    resourceType: z.ZodEnum<["workflow", "process", "document", "comment"]>;
    content: z.ZodString;
    vector: z.ZodArray<z.ZodNumber, "many">;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    metadata: Record<string, any>;
    content: string;
    resourceId: string;
    resourceType: "document" | "workflow" | "process" | "comment";
    vector: number[];
}, {
    id: string;
    createdAt: Date;
    content: string;
    resourceId: string;
    resourceType: "document" | "workflow" | "process" | "comment";
    vector: number[];
    metadata?: Record<string, any> | undefined;
}>;
export type Embedding = z.infer<typeof EmbeddingSchema>;
export declare const SemanticSearchRequestSchema: z.ZodObject<{
    query: z.ZodString;
    resourceTypes: z.ZodOptional<z.ZodArray<z.ZodEnum<["workflow", "process", "document", "comment"]>, "many">>;
    organizationId: z.ZodString;
    limit: z.ZodDefault<z.ZodNumber>;
    threshold: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    organizationId: string;
    limit: number;
    query: string;
    threshold: number;
    resourceTypes?: ("document" | "workflow" | "process" | "comment")[] | undefined;
}, {
    organizationId: string;
    query: string;
    limit?: number | undefined;
    resourceTypes?: ("document" | "workflow" | "process" | "comment")[] | undefined;
    threshold?: number | undefined;
}>;
export type SemanticSearchRequest = z.infer<typeof SemanticSearchRequestSchema>;
export declare const SemanticSearchResultSchema: z.ZodObject<{
    results: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        resourceId: z.ZodString;
        resourceType: z.ZodEnum<["workflow", "process", "document", "comment"]>;
        title: z.ZodString;
        content: z.ZodString;
        score: z.ZodNumber;
        metadata: z.ZodRecord<z.ZodString, z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        metadata: Record<string, any>;
        score: number;
        title: string;
        content: string;
        resourceId: string;
        resourceType: "document" | "workflow" | "process" | "comment";
    }, {
        id: string;
        metadata: Record<string, any>;
        score: number;
        title: string;
        content: string;
        resourceId: string;
        resourceType: "document" | "workflow" | "process" | "comment";
    }>, "many">;
    query: z.ZodString;
    executionTime: z.ZodNumber;
    totalResults: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    query: string;
    executionTime: number;
    results: {
        id: string;
        metadata: Record<string, any>;
        score: number;
        title: string;
        content: string;
        resourceId: string;
        resourceType: "document" | "workflow" | "process" | "comment";
    }[];
    totalResults: number;
}, {
    query: string;
    executionTime: number;
    results: {
        id: string;
        metadata: Record<string, any>;
        score: number;
        title: string;
        content: string;
        resourceId: string;
        resourceType: "document" | "workflow" | "process" | "comment";
    }[];
    totalResults: number;
}>;
export type SemanticSearchResult = z.infer<typeof SemanticSearchResultSchema>;
//# sourceMappingURL=ai.d.ts.map