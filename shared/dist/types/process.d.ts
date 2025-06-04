import { z } from 'zod';
export declare enum ProcessStatus {
    DISCOVERED = "discovered",
    DOCUMENTED = "documented",
    OPTIMIZED = "optimized",
    DEPRECATED = "deprecated"
}
export declare enum ProcessComplexity {
    SIMPLE = "simple",
    MEDIUM = "medium",
    COMPLEX = "complex"
}
export declare const ProcessStepSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    estimatedTime: z.ZodOptional<z.ZodNumber>;
    actualTime: z.ZodOptional<z.ZodNumber>;
    owner: z.ZodOptional<z.ZodString>;
    systems: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    inputs: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    outputs: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    dependencies: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    order: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    systems: string[];
    inputs: string[];
    outputs: string[];
    dependencies: string[];
    order: number;
    description?: string | undefined;
    estimatedTime?: number | undefined;
    actualTime?: number | undefined;
    owner?: string | undefined;
}, {
    id: string;
    name: string;
    order: number;
    description?: string | undefined;
    estimatedTime?: number | undefined;
    actualTime?: number | undefined;
    owner?: string | undefined;
    systems?: string[] | undefined;
    inputs?: string[] | undefined;
    outputs?: string[] | undefined;
    dependencies?: string[] | undefined;
}>;
export type ProcessStep = z.infer<typeof ProcessStepSchema>;
export declare const ProcessMetricsSchema: z.ZodObject<{
    averageCompletionTime: z.ZodOptional<z.ZodNumber>;
    successRate: z.ZodOptional<z.ZodNumber>;
    costPerExecution: z.ZodOptional<z.ZodNumber>;
    volumePerMonth: z.ZodOptional<z.ZodNumber>;
    bottlenecks: z.ZodDefault<z.ZodArray<z.ZodObject<{
        stepId: z.ZodString;
        severity: z.ZodEnum<["low", "medium", "high"]>;
        description: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        description: string;
        stepId: string;
        severity: "low" | "medium" | "high";
    }, {
        description: string;
        stepId: string;
        severity: "low" | "medium" | "high";
    }>, "many">>;
    lastAnalyzed: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    bottlenecks: {
        description: string;
        stepId: string;
        severity: "low" | "medium" | "high";
    }[];
    averageCompletionTime?: number | undefined;
    successRate?: number | undefined;
    costPerExecution?: number | undefined;
    volumePerMonth?: number | undefined;
    lastAnalyzed?: Date | undefined;
}, {
    averageCompletionTime?: number | undefined;
    successRate?: number | undefined;
    costPerExecution?: number | undefined;
    volumePerMonth?: number | undefined;
    bottlenecks?: {
        description: string;
        stepId: string;
        severity: "low" | "medium" | "high";
    }[] | undefined;
    lastAnalyzed?: Date | undefined;
}>;
export type ProcessMetrics = z.infer<typeof ProcessMetricsSchema>;
export declare const BusinessProcessSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    organizationId: z.ZodString;
    department: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    status: z.ZodNativeEnum<typeof ProcessStatus>;
    complexity: z.ZodNativeEnum<typeof ProcessComplexity>;
    steps: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        estimatedTime: z.ZodOptional<z.ZodNumber>;
        actualTime: z.ZodOptional<z.ZodNumber>;
        owner: z.ZodOptional<z.ZodString>;
        systems: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        inputs: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        outputs: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        dependencies: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        order: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        systems: string[];
        inputs: string[];
        outputs: string[];
        dependencies: string[];
        order: number;
        description?: string | undefined;
        estimatedTime?: number | undefined;
        actualTime?: number | undefined;
        owner?: string | undefined;
    }, {
        id: string;
        name: string;
        order: number;
        description?: string | undefined;
        estimatedTime?: number | undefined;
        actualTime?: number | undefined;
        owner?: string | undefined;
        systems?: string[] | undefined;
        inputs?: string[] | undefined;
        outputs?: string[] | undefined;
        dependencies?: string[] | undefined;
    }>, "many">;
    metrics: z.ZodOptional<z.ZodObject<{
        averageCompletionTime: z.ZodOptional<z.ZodNumber>;
        successRate: z.ZodOptional<z.ZodNumber>;
        costPerExecution: z.ZodOptional<z.ZodNumber>;
        volumePerMonth: z.ZodOptional<z.ZodNumber>;
        bottlenecks: z.ZodDefault<z.ZodArray<z.ZodObject<{
            stepId: z.ZodString;
            severity: z.ZodEnum<["low", "medium", "high"]>;
            description: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            description: string;
            stepId: string;
            severity: "low" | "medium" | "high";
        }, {
            description: string;
            stepId: string;
            severity: "low" | "medium" | "high";
        }>, "many">>;
        lastAnalyzed: z.ZodOptional<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        bottlenecks: {
            description: string;
            stepId: string;
            severity: "low" | "medium" | "high";
        }[];
        averageCompletionTime?: number | undefined;
        successRate?: number | undefined;
        costPerExecution?: number | undefined;
        volumePerMonth?: number | undefined;
        lastAnalyzed?: Date | undefined;
    }, {
        averageCompletionTime?: number | undefined;
        successRate?: number | undefined;
        costPerExecution?: number | undefined;
        volumePerMonth?: number | undefined;
        bottlenecks?: {
            description: string;
            stepId: string;
            severity: "low" | "medium" | "high";
        }[] | undefined;
        lastAnalyzed?: Date | undefined;
    }>>;
    stakeholders: z.ZodDefault<z.ZodArray<z.ZodObject<{
        userId: z.ZodString;
        role: z.ZodEnum<["owner", "participant", "reviewer", "approver"]>;
    }, "strip", z.ZodTypeAny, {
        role: "owner" | "participant" | "reviewer" | "approver";
        userId: string;
    }, {
        role: "owner" | "participant" | "reviewer" | "approver";
        userId: string;
    }>, "many">>;
    documents: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        url: z.ZodString;
        type: z.ZodEnum<["document", "video", "image", "other"]>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        type: "document" | "video" | "image" | "other";
        name: string;
        url: string;
    }, {
        id: string;
        type: "document" | "video" | "image" | "other";
        name: string;
        url: string;
    }>, "many">>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    aiInsights: z.ZodOptional<z.ZodObject<{
        optimizationSuggestions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        automationOpportunities: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        riskAssessment: z.ZodOptional<z.ZodObject<{
            score: z.ZodNumber;
            factors: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            score: number;
            factors: string[];
        }, {
            score: number;
            factors: string[];
        }>>;
        lastAnalyzed: z.ZodOptional<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        optimizationSuggestions: string[];
        automationOpportunities: string[];
        lastAnalyzed?: Date | undefined;
        riskAssessment?: {
            score: number;
            factors: string[];
        } | undefined;
    }, {
        lastAnalyzed?: Date | undefined;
        optimizationSuggestions?: string[] | undefined;
        automationOpportunities?: string[] | undefined;
        riskAssessment?: {
            score: number;
            factors: string[];
        } | undefined;
    }>>;
    createdBy: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: ProcessStatus;
    organizationId: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    createdBy: string;
    tags: string[];
    complexity: ProcessComplexity;
    steps: {
        id: string;
        name: string;
        systems: string[];
        inputs: string[];
        outputs: string[];
        dependencies: string[];
        order: number;
        description?: string | undefined;
        estimatedTime?: number | undefined;
        actualTime?: number | undefined;
        owner?: string | undefined;
    }[];
    stakeholders: {
        role: "owner" | "participant" | "reviewer" | "approver";
        userId: string;
    }[];
    documents: {
        id: string;
        type: "document" | "video" | "image" | "other";
        name: string;
        url: string;
    }[];
    description?: string | undefined;
    category?: string | undefined;
    department?: string | undefined;
    metrics?: {
        bottlenecks: {
            description: string;
            stepId: string;
            severity: "low" | "medium" | "high";
        }[];
        averageCompletionTime?: number | undefined;
        successRate?: number | undefined;
        costPerExecution?: number | undefined;
        volumePerMonth?: number | undefined;
        lastAnalyzed?: Date | undefined;
    } | undefined;
    aiInsights?: {
        optimizationSuggestions: string[];
        automationOpportunities: string[];
        lastAnalyzed?: Date | undefined;
        riskAssessment?: {
            score: number;
            factors: string[];
        } | undefined;
    } | undefined;
}, {
    id: string;
    status: ProcessStatus;
    organizationId: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    createdBy: string;
    complexity: ProcessComplexity;
    steps: {
        id: string;
        name: string;
        order: number;
        description?: string | undefined;
        estimatedTime?: number | undefined;
        actualTime?: number | undefined;
        owner?: string | undefined;
        systems?: string[] | undefined;
        inputs?: string[] | undefined;
        outputs?: string[] | undefined;
        dependencies?: string[] | undefined;
    }[];
    description?: string | undefined;
    tags?: string[] | undefined;
    category?: string | undefined;
    department?: string | undefined;
    metrics?: {
        averageCompletionTime?: number | undefined;
        successRate?: number | undefined;
        costPerExecution?: number | undefined;
        volumePerMonth?: number | undefined;
        bottlenecks?: {
            description: string;
            stepId: string;
            severity: "low" | "medium" | "high";
        }[] | undefined;
        lastAnalyzed?: Date | undefined;
    } | undefined;
    stakeholders?: {
        role: "owner" | "participant" | "reviewer" | "approver";
        userId: string;
    }[] | undefined;
    documents?: {
        id: string;
        type: "document" | "video" | "image" | "other";
        name: string;
        url: string;
    }[] | undefined;
    aiInsights?: {
        lastAnalyzed?: Date | undefined;
        optimizationSuggestions?: string[] | undefined;
        automationOpportunities?: string[] | undefined;
        riskAssessment?: {
            score: number;
            factors: string[];
        } | undefined;
    } | undefined;
}>;
export type BusinessProcess = z.infer<typeof BusinessProcessSchema>;
export declare const CreateProcessSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    organizationId: z.ZodString;
    department: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    status: z.ZodNativeEnum<typeof ProcessStatus>;
    complexity: z.ZodNativeEnum<typeof ProcessComplexity>;
    steps: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        estimatedTime: z.ZodOptional<z.ZodNumber>;
        actualTime: z.ZodOptional<z.ZodNumber>;
        owner: z.ZodOptional<z.ZodString>;
        systems: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        inputs: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        outputs: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        dependencies: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        order: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        systems: string[];
        inputs: string[];
        outputs: string[];
        dependencies: string[];
        order: number;
        description?: string | undefined;
        estimatedTime?: number | undefined;
        actualTime?: number | undefined;
        owner?: string | undefined;
    }, {
        id: string;
        name: string;
        order: number;
        description?: string | undefined;
        estimatedTime?: number | undefined;
        actualTime?: number | undefined;
        owner?: string | undefined;
        systems?: string[] | undefined;
        inputs?: string[] | undefined;
        outputs?: string[] | undefined;
        dependencies?: string[] | undefined;
    }>, "many">;
    metrics: z.ZodOptional<z.ZodObject<{
        averageCompletionTime: z.ZodOptional<z.ZodNumber>;
        successRate: z.ZodOptional<z.ZodNumber>;
        costPerExecution: z.ZodOptional<z.ZodNumber>;
        volumePerMonth: z.ZodOptional<z.ZodNumber>;
        bottlenecks: z.ZodDefault<z.ZodArray<z.ZodObject<{
            stepId: z.ZodString;
            severity: z.ZodEnum<["low", "medium", "high"]>;
            description: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            description: string;
            stepId: string;
            severity: "low" | "medium" | "high";
        }, {
            description: string;
            stepId: string;
            severity: "low" | "medium" | "high";
        }>, "many">>;
        lastAnalyzed: z.ZodOptional<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        bottlenecks: {
            description: string;
            stepId: string;
            severity: "low" | "medium" | "high";
        }[];
        averageCompletionTime?: number | undefined;
        successRate?: number | undefined;
        costPerExecution?: number | undefined;
        volumePerMonth?: number | undefined;
        lastAnalyzed?: Date | undefined;
    }, {
        averageCompletionTime?: number | undefined;
        successRate?: number | undefined;
        costPerExecution?: number | undefined;
        volumePerMonth?: number | undefined;
        bottlenecks?: {
            description: string;
            stepId: string;
            severity: "low" | "medium" | "high";
        }[] | undefined;
        lastAnalyzed?: Date | undefined;
    }>>;
    stakeholders: z.ZodDefault<z.ZodArray<z.ZodObject<{
        userId: z.ZodString;
        role: z.ZodEnum<["owner", "participant", "reviewer", "approver"]>;
    }, "strip", z.ZodTypeAny, {
        role: "owner" | "participant" | "reviewer" | "approver";
        userId: string;
    }, {
        role: "owner" | "participant" | "reviewer" | "approver";
        userId: string;
    }>, "many">>;
    documents: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        url: z.ZodString;
        type: z.ZodEnum<["document", "video", "image", "other"]>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        type: "document" | "video" | "image" | "other";
        name: string;
        url: string;
    }, {
        id: string;
        type: "document" | "video" | "image" | "other";
        name: string;
        url: string;
    }>, "many">>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    aiInsights: z.ZodOptional<z.ZodObject<{
        optimizationSuggestions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        automationOpportunities: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        riskAssessment: z.ZodOptional<z.ZodObject<{
            score: z.ZodNumber;
            factors: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            score: number;
            factors: string[];
        }, {
            score: number;
            factors: string[];
        }>>;
        lastAnalyzed: z.ZodOptional<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        optimizationSuggestions: string[];
        automationOpportunities: string[];
        lastAnalyzed?: Date | undefined;
        riskAssessment?: {
            score: number;
            factors: string[];
        } | undefined;
    }, {
        lastAnalyzed?: Date | undefined;
        optimizationSuggestions?: string[] | undefined;
        automationOpportunities?: string[] | undefined;
        riskAssessment?: {
            score: number;
            factors: string[];
        } | undefined;
    }>>;
    createdBy: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "id" | "createdAt" | "updatedAt" | "aiInsights">, "strip", z.ZodTypeAny, {
    status: ProcessStatus;
    organizationId: string;
    name: string;
    createdBy: string;
    tags: string[];
    complexity: ProcessComplexity;
    steps: {
        id: string;
        name: string;
        systems: string[];
        inputs: string[];
        outputs: string[];
        dependencies: string[];
        order: number;
        description?: string | undefined;
        estimatedTime?: number | undefined;
        actualTime?: number | undefined;
        owner?: string | undefined;
    }[];
    stakeholders: {
        role: "owner" | "participant" | "reviewer" | "approver";
        userId: string;
    }[];
    documents: {
        id: string;
        type: "document" | "video" | "image" | "other";
        name: string;
        url: string;
    }[];
    description?: string | undefined;
    category?: string | undefined;
    department?: string | undefined;
    metrics?: {
        bottlenecks: {
            description: string;
            stepId: string;
            severity: "low" | "medium" | "high";
        }[];
        averageCompletionTime?: number | undefined;
        successRate?: number | undefined;
        costPerExecution?: number | undefined;
        volumePerMonth?: number | undefined;
        lastAnalyzed?: Date | undefined;
    } | undefined;
}, {
    status: ProcessStatus;
    organizationId: string;
    name: string;
    createdBy: string;
    complexity: ProcessComplexity;
    steps: {
        id: string;
        name: string;
        order: number;
        description?: string | undefined;
        estimatedTime?: number | undefined;
        actualTime?: number | undefined;
        owner?: string | undefined;
        systems?: string[] | undefined;
        inputs?: string[] | undefined;
        outputs?: string[] | undefined;
        dependencies?: string[] | undefined;
    }[];
    description?: string | undefined;
    tags?: string[] | undefined;
    category?: string | undefined;
    department?: string | undefined;
    metrics?: {
        averageCompletionTime?: number | undefined;
        successRate?: number | undefined;
        costPerExecution?: number | undefined;
        volumePerMonth?: number | undefined;
        bottlenecks?: {
            description: string;
            stepId: string;
            severity: "low" | "medium" | "high";
        }[] | undefined;
        lastAnalyzed?: Date | undefined;
    } | undefined;
    stakeholders?: {
        role: "owner" | "participant" | "reviewer" | "approver";
        userId: string;
    }[] | undefined;
    documents?: {
        id: string;
        type: "document" | "video" | "image" | "other";
        name: string;
        url: string;
    }[] | undefined;
}>;
export type CreateProcess = z.infer<typeof CreateProcessSchema>;
export declare const UpdateProcessSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodNativeEnum<typeof ProcessStatus>>;
    organizationId: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    name: z.ZodOptional<z.ZodString>;
    createdBy: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    category: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    complexity: z.ZodOptional<z.ZodNativeEnum<typeof ProcessComplexity>>;
    department: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    steps: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        estimatedTime: z.ZodOptional<z.ZodNumber>;
        actualTime: z.ZodOptional<z.ZodNumber>;
        owner: z.ZodOptional<z.ZodString>;
        systems: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        inputs: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        outputs: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        dependencies: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        order: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        systems: string[];
        inputs: string[];
        outputs: string[];
        dependencies: string[];
        order: number;
        description?: string | undefined;
        estimatedTime?: number | undefined;
        actualTime?: number | undefined;
        owner?: string | undefined;
    }, {
        id: string;
        name: string;
        order: number;
        description?: string | undefined;
        estimatedTime?: number | undefined;
        actualTime?: number | undefined;
        owner?: string | undefined;
        systems?: string[] | undefined;
        inputs?: string[] | undefined;
        outputs?: string[] | undefined;
        dependencies?: string[] | undefined;
    }>, "many">>;
    metrics: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        averageCompletionTime: z.ZodOptional<z.ZodNumber>;
        successRate: z.ZodOptional<z.ZodNumber>;
        costPerExecution: z.ZodOptional<z.ZodNumber>;
        volumePerMonth: z.ZodOptional<z.ZodNumber>;
        bottlenecks: z.ZodDefault<z.ZodArray<z.ZodObject<{
            stepId: z.ZodString;
            severity: z.ZodEnum<["low", "medium", "high"]>;
            description: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            description: string;
            stepId: string;
            severity: "low" | "medium" | "high";
        }, {
            description: string;
            stepId: string;
            severity: "low" | "medium" | "high";
        }>, "many">>;
        lastAnalyzed: z.ZodOptional<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        bottlenecks: {
            description: string;
            stepId: string;
            severity: "low" | "medium" | "high";
        }[];
        averageCompletionTime?: number | undefined;
        successRate?: number | undefined;
        costPerExecution?: number | undefined;
        volumePerMonth?: number | undefined;
        lastAnalyzed?: Date | undefined;
    }, {
        averageCompletionTime?: number | undefined;
        successRate?: number | undefined;
        costPerExecution?: number | undefined;
        volumePerMonth?: number | undefined;
        bottlenecks?: {
            description: string;
            stepId: string;
            severity: "low" | "medium" | "high";
        }[] | undefined;
        lastAnalyzed?: Date | undefined;
    }>>>;
    stakeholders: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodObject<{
        userId: z.ZodString;
        role: z.ZodEnum<["owner", "participant", "reviewer", "approver"]>;
    }, "strip", z.ZodTypeAny, {
        role: "owner" | "participant" | "reviewer" | "approver";
        userId: string;
    }, {
        role: "owner" | "participant" | "reviewer" | "approver";
        userId: string;
    }>, "many">>>;
    documents: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        url: z.ZodString;
        type: z.ZodEnum<["document", "video", "image", "other"]>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        type: "document" | "video" | "image" | "other";
        name: string;
        url: string;
    }, {
        id: string;
        type: "document" | "video" | "image" | "other";
        name: string;
        url: string;
    }>, "many">>>;
}, "strip", z.ZodTypeAny, {
    status?: ProcessStatus | undefined;
    organizationId?: string | undefined;
    description?: string | undefined;
    name?: string | undefined;
    createdBy?: string | undefined;
    tags?: string[] | undefined;
    category?: string | undefined;
    complexity?: ProcessComplexity | undefined;
    department?: string | undefined;
    steps?: {
        id: string;
        name: string;
        systems: string[];
        inputs: string[];
        outputs: string[];
        dependencies: string[];
        order: number;
        description?: string | undefined;
        estimatedTime?: number | undefined;
        actualTime?: number | undefined;
        owner?: string | undefined;
    }[] | undefined;
    metrics?: {
        bottlenecks: {
            description: string;
            stepId: string;
            severity: "low" | "medium" | "high";
        }[];
        averageCompletionTime?: number | undefined;
        successRate?: number | undefined;
        costPerExecution?: number | undefined;
        volumePerMonth?: number | undefined;
        lastAnalyzed?: Date | undefined;
    } | undefined;
    stakeholders?: {
        role: "owner" | "participant" | "reviewer" | "approver";
        userId: string;
    }[] | undefined;
    documents?: {
        id: string;
        type: "document" | "video" | "image" | "other";
        name: string;
        url: string;
    }[] | undefined;
}, {
    status?: ProcessStatus | undefined;
    organizationId?: string | undefined;
    description?: string | undefined;
    name?: string | undefined;
    createdBy?: string | undefined;
    tags?: string[] | undefined;
    category?: string | undefined;
    complexity?: ProcessComplexity | undefined;
    department?: string | undefined;
    steps?: {
        id: string;
        name: string;
        order: number;
        description?: string | undefined;
        estimatedTime?: number | undefined;
        actualTime?: number | undefined;
        owner?: string | undefined;
        systems?: string[] | undefined;
        inputs?: string[] | undefined;
        outputs?: string[] | undefined;
        dependencies?: string[] | undefined;
    }[] | undefined;
    metrics?: {
        averageCompletionTime?: number | undefined;
        successRate?: number | undefined;
        costPerExecution?: number | undefined;
        volumePerMonth?: number | undefined;
        bottlenecks?: {
            description: string;
            stepId: string;
            severity: "low" | "medium" | "high";
        }[] | undefined;
        lastAnalyzed?: Date | undefined;
    } | undefined;
    stakeholders?: {
        role: "owner" | "participant" | "reviewer" | "approver";
        userId: string;
    }[] | undefined;
    documents?: {
        id: string;
        type: "document" | "video" | "image" | "other";
        name: string;
        url: string;
    }[] | undefined;
}>;
export type UpdateProcess = z.infer<typeof UpdateProcessSchema>;
export declare const ProcessMiningConfigSchema: z.ZodObject<{
    dataSource: z.ZodEnum<["database", "csv", "api", "logs"]>;
    caseIdColumn: z.ZodString;
    activityColumn: z.ZodString;
    timestampColumn: z.ZodString;
    resourceColumn: z.ZodOptional<z.ZodString>;
    additionalColumns: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    filters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    dataSource: "logs" | "database" | "csv" | "api";
    caseIdColumn: string;
    activityColumn: string;
    timestampColumn: string;
    additionalColumns: string[];
    resourceColumn?: string | undefined;
    filters?: Record<string, any> | undefined;
}, {
    dataSource: "logs" | "database" | "csv" | "api";
    caseIdColumn: string;
    activityColumn: string;
    timestampColumn: string;
    resourceColumn?: string | undefined;
    additionalColumns?: string[] | undefined;
    filters?: Record<string, any> | undefined;
}>;
export type ProcessMiningConfig = z.infer<typeof ProcessMiningConfigSchema>;
export declare const ProcessMiningResultSchema: z.ZodObject<{
    id: z.ZodString;
    configId: z.ZodString;
    processId: z.ZodOptional<z.ZodString>;
    discoveredProcesses: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        frequency: z.ZodNumber;
        averageDuration: z.ZodNumber;
        variants: z.ZodArray<z.ZodObject<{
            path: z.ZodArray<z.ZodString, "many">;
            frequency: z.ZodNumber;
            duration: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            path: string[];
            frequency: number;
            duration: number;
        }, {
            path: string[];
            frequency: number;
            duration: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        name: string;
        frequency: number;
        averageDuration: number;
        variants: {
            path: string[];
            frequency: number;
            duration: number;
        }[];
    }, {
        name: string;
        frequency: number;
        averageDuration: number;
        variants: {
            path: string[];
            frequency: number;
            duration: number;
        }[];
    }>, "many">;
    insights: z.ZodObject<{
        totalCases: z.ZodNumber;
        uniqueActivities: z.ZodNumber;
        averageCaseDuration: z.ZodNumber;
        mostCommonPath: z.ZodArray<z.ZodString, "many">;
        deviations: z.ZodArray<z.ZodObject<{
            description: z.ZodString;
            frequency: z.ZodNumber;
            impact: z.ZodEnum<["low", "medium", "high"]>;
        }, "strip", z.ZodTypeAny, {
            description: string;
            frequency: number;
            impact: "low" | "medium" | "high";
        }, {
            description: string;
            frequency: number;
            impact: "low" | "medium" | "high";
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        totalCases: number;
        uniqueActivities: number;
        averageCaseDuration: number;
        mostCommonPath: string[];
        deviations: {
            description: string;
            frequency: number;
            impact: "low" | "medium" | "high";
        }[];
    }, {
        totalCases: number;
        uniqueActivities: number;
        averageCaseDuration: number;
        mostCommonPath: string[];
        deviations: {
            description: string;
            frequency: number;
            impact: "low" | "medium" | "high";
        }[];
    }>;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    configId: string;
    discoveredProcesses: {
        name: string;
        frequency: number;
        averageDuration: number;
        variants: {
            path: string[];
            frequency: number;
            duration: number;
        }[];
    }[];
    insights: {
        totalCases: number;
        uniqueActivities: number;
        averageCaseDuration: number;
        mostCommonPath: string[];
        deviations: {
            description: string;
            frequency: number;
            impact: "low" | "medium" | "high";
        }[];
    };
    processId?: string | undefined;
}, {
    id: string;
    createdAt: Date;
    configId: string;
    discoveredProcesses: {
        name: string;
        frequency: number;
        averageDuration: number;
        variants: {
            path: string[];
            frequency: number;
            duration: number;
        }[];
    }[];
    insights: {
        totalCases: number;
        uniqueActivities: number;
        averageCaseDuration: number;
        mostCommonPath: string[];
        deviations: {
            description: string;
            frequency: number;
            impact: "low" | "medium" | "high";
        }[];
    };
    processId?: string | undefined;
}>;
export type ProcessMiningResult = z.infer<typeof ProcessMiningResultSchema>;
//# sourceMappingURL=process.d.ts.map