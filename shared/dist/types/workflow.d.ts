import { z } from 'zod';
export declare enum WorkflowStatus {
    DRAFT = "draft",
    ACTIVE = "active",
    PAUSED = "paused",
    ARCHIVED = "archived"
}
export declare enum NodeType {
    START = "start",
    END = "end",
    TASK = "task",
    DECISION = "decision",
    PARALLEL = "parallel",
    JOIN = "join",
    SUBPROCESS = "subprocess",
    TIMER = "timer",
    USER_INPUT = "user_input"
}
export declare enum ConnectionType {
    SEQUENCE = "sequence",
    CONDITIONAL = "conditional",
    DEFAULT = "default"
}
export declare const WorkflowNodeSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodNativeEnum<typeof NodeType>;
    label: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    position: z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>;
    data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    config: z.ZodOptional<z.ZodObject<{
        assignee: z.ZodOptional<z.ZodString>;
        estimatedDuration: z.ZodOptional<z.ZodNumber>;
        priority: z.ZodDefault<z.ZodEnum<["low", "medium", "high"]>>;
        automated: z.ZodDefault<z.ZodBoolean>;
        requiredApprovals: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        priority: "low" | "medium" | "high";
        automated: boolean;
        requiredApprovals: number;
        assignee?: string | undefined;
        estimatedDuration?: number | undefined;
    }, {
        assignee?: string | undefined;
        estimatedDuration?: number | undefined;
        priority?: "low" | "medium" | "high" | undefined;
        automated?: boolean | undefined;
        requiredApprovals?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: NodeType;
    label: string;
    position: {
        x: number;
        y: number;
    };
    description?: string | undefined;
    data?: Record<string, any> | undefined;
    config?: {
        priority: "low" | "medium" | "high";
        automated: boolean;
        requiredApprovals: number;
        assignee?: string | undefined;
        estimatedDuration?: number | undefined;
    } | undefined;
}, {
    id: string;
    type: NodeType;
    label: string;
    position: {
        x: number;
        y: number;
    };
    description?: string | undefined;
    data?: Record<string, any> | undefined;
    config?: {
        assignee?: string | undefined;
        estimatedDuration?: number | undefined;
        priority?: "low" | "medium" | "high" | undefined;
        automated?: boolean | undefined;
        requiredApprovals?: number | undefined;
    } | undefined;
}>;
export type WorkflowNode = z.infer<typeof WorkflowNodeSchema>;
export declare const WorkflowConnectionSchema: z.ZodObject<{
    id: z.ZodString;
    source: z.ZodString;
    target: z.ZodString;
    type: z.ZodNativeEnum<typeof ConnectionType>;
    label: z.ZodOptional<z.ZodString>;
    condition: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: ConnectionType;
    source: string;
    target: string;
    label?: string | undefined;
    condition?: string | undefined;
}, {
    id: string;
    type: ConnectionType;
    source: string;
    target: string;
    label?: string | undefined;
    condition?: string | undefined;
}>;
export type WorkflowConnection = z.infer<typeof WorkflowConnectionSchema>;
export declare const WorkflowSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    organizationId: z.ZodString;
    createdBy: z.ZodString;
    status: z.ZodNativeEnum<typeof WorkflowStatus>;
    version: z.ZodDefault<z.ZodNumber>;
    nodes: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodNativeEnum<typeof NodeType>;
        label: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        position: z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>;
        data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        config: z.ZodOptional<z.ZodObject<{
            assignee: z.ZodOptional<z.ZodString>;
            estimatedDuration: z.ZodOptional<z.ZodNumber>;
            priority: z.ZodDefault<z.ZodEnum<["low", "medium", "high"]>>;
            automated: z.ZodDefault<z.ZodBoolean>;
            requiredApprovals: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            priority: "low" | "medium" | "high";
            automated: boolean;
            requiredApprovals: number;
            assignee?: string | undefined;
            estimatedDuration?: number | undefined;
        }, {
            assignee?: string | undefined;
            estimatedDuration?: number | undefined;
            priority?: "low" | "medium" | "high" | undefined;
            automated?: boolean | undefined;
            requiredApprovals?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        type: NodeType;
        label: string;
        position: {
            x: number;
            y: number;
        };
        description?: string | undefined;
        data?: Record<string, any> | undefined;
        config?: {
            priority: "low" | "medium" | "high";
            automated: boolean;
            requiredApprovals: number;
            assignee?: string | undefined;
            estimatedDuration?: number | undefined;
        } | undefined;
    }, {
        id: string;
        type: NodeType;
        label: string;
        position: {
            x: number;
            y: number;
        };
        description?: string | undefined;
        data?: Record<string, any> | undefined;
        config?: {
            assignee?: string | undefined;
            estimatedDuration?: number | undefined;
            priority?: "low" | "medium" | "high" | undefined;
            automated?: boolean | undefined;
            requiredApprovals?: number | undefined;
        } | undefined;
    }>, "many">;
    connections: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        source: z.ZodString;
        target: z.ZodString;
        type: z.ZodNativeEnum<typeof ConnectionType>;
        label: z.ZodOptional<z.ZodString>;
        condition: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        type: ConnectionType;
        source: string;
        target: string;
        label?: string | undefined;
        condition?: string | undefined;
    }, {
        id: string;
        type: ConnectionType;
        source: string;
        target: string;
        label?: string | undefined;
        condition?: string | undefined;
    }>, "many">;
    metadata: z.ZodObject<{
        tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        category: z.ZodOptional<z.ZodString>;
        estimatedCompletionTime: z.ZodOptional<z.ZodNumber>;
        averageCompletionTime: z.ZodOptional<z.ZodNumber>;
        complexity: z.ZodDefault<z.ZodEnum<["simple", "medium", "complex"]>>;
    }, "strip", z.ZodTypeAny, {
        tags: string[];
        complexity: "medium" | "simple" | "complex";
        category?: string | undefined;
        estimatedCompletionTime?: number | undefined;
        averageCompletionTime?: number | undefined;
    }, {
        tags?: string[] | undefined;
        category?: string | undefined;
        estimatedCompletionTime?: number | undefined;
        averageCompletionTime?: number | undefined;
        complexity?: "medium" | "simple" | "complex" | undefined;
    }>;
    permissions: z.ZodObject<{
        canEdit: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        canView: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        canExecute: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        canEdit: string[];
        canView: string[];
        canExecute: string[];
    }, {
        canEdit?: string[] | undefined;
        canView?: string[] | undefined;
        canExecute?: string[] | undefined;
    }>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    publishedAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: WorkflowStatus;
    organizationId: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    createdBy: string;
    version: number;
    nodes: {
        id: string;
        type: NodeType;
        label: string;
        position: {
            x: number;
            y: number;
        };
        description?: string | undefined;
        data?: Record<string, any> | undefined;
        config?: {
            priority: "low" | "medium" | "high";
            automated: boolean;
            requiredApprovals: number;
            assignee?: string | undefined;
            estimatedDuration?: number | undefined;
        } | undefined;
    }[];
    connections: {
        id: string;
        type: ConnectionType;
        source: string;
        target: string;
        label?: string | undefined;
        condition?: string | undefined;
    }[];
    metadata: {
        tags: string[];
        complexity: "medium" | "simple" | "complex";
        category?: string | undefined;
        estimatedCompletionTime?: number | undefined;
        averageCompletionTime?: number | undefined;
    };
    permissions: {
        canEdit: string[];
        canView: string[];
        canExecute: string[];
    };
    description?: string | undefined;
    publishedAt?: Date | undefined;
}, {
    id: string;
    status: WorkflowStatus;
    organizationId: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    createdBy: string;
    nodes: {
        id: string;
        type: NodeType;
        label: string;
        position: {
            x: number;
            y: number;
        };
        description?: string | undefined;
        data?: Record<string, any> | undefined;
        config?: {
            assignee?: string | undefined;
            estimatedDuration?: number | undefined;
            priority?: "low" | "medium" | "high" | undefined;
            automated?: boolean | undefined;
            requiredApprovals?: number | undefined;
        } | undefined;
    }[];
    connections: {
        id: string;
        type: ConnectionType;
        source: string;
        target: string;
        label?: string | undefined;
        condition?: string | undefined;
    }[];
    metadata: {
        tags?: string[] | undefined;
        category?: string | undefined;
        estimatedCompletionTime?: number | undefined;
        averageCompletionTime?: number | undefined;
        complexity?: "medium" | "simple" | "complex" | undefined;
    };
    permissions: {
        canEdit?: string[] | undefined;
        canView?: string[] | undefined;
        canExecute?: string[] | undefined;
    };
    description?: string | undefined;
    version?: number | undefined;
    publishedAt?: Date | undefined;
}>;
export type Workflow = z.infer<typeof WorkflowSchema>;
export declare const CreateWorkflowSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    organizationId: z.ZodString;
    createdBy: z.ZodString;
    status: z.ZodNativeEnum<typeof WorkflowStatus>;
    version: z.ZodDefault<z.ZodNumber>;
    nodes: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodNativeEnum<typeof NodeType>;
        label: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        position: z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>;
        data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        config: z.ZodOptional<z.ZodObject<{
            assignee: z.ZodOptional<z.ZodString>;
            estimatedDuration: z.ZodOptional<z.ZodNumber>;
            priority: z.ZodDefault<z.ZodEnum<["low", "medium", "high"]>>;
            automated: z.ZodDefault<z.ZodBoolean>;
            requiredApprovals: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            priority: "low" | "medium" | "high";
            automated: boolean;
            requiredApprovals: number;
            assignee?: string | undefined;
            estimatedDuration?: number | undefined;
        }, {
            assignee?: string | undefined;
            estimatedDuration?: number | undefined;
            priority?: "low" | "medium" | "high" | undefined;
            automated?: boolean | undefined;
            requiredApprovals?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        type: NodeType;
        label: string;
        position: {
            x: number;
            y: number;
        };
        description?: string | undefined;
        data?: Record<string, any> | undefined;
        config?: {
            priority: "low" | "medium" | "high";
            automated: boolean;
            requiredApprovals: number;
            assignee?: string | undefined;
            estimatedDuration?: number | undefined;
        } | undefined;
    }, {
        id: string;
        type: NodeType;
        label: string;
        position: {
            x: number;
            y: number;
        };
        description?: string | undefined;
        data?: Record<string, any> | undefined;
        config?: {
            assignee?: string | undefined;
            estimatedDuration?: number | undefined;
            priority?: "low" | "medium" | "high" | undefined;
            automated?: boolean | undefined;
            requiredApprovals?: number | undefined;
        } | undefined;
    }>, "many">;
    connections: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        source: z.ZodString;
        target: z.ZodString;
        type: z.ZodNativeEnum<typeof ConnectionType>;
        label: z.ZodOptional<z.ZodString>;
        condition: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        type: ConnectionType;
        source: string;
        target: string;
        label?: string | undefined;
        condition?: string | undefined;
    }, {
        id: string;
        type: ConnectionType;
        source: string;
        target: string;
        label?: string | undefined;
        condition?: string | undefined;
    }>, "many">;
    metadata: z.ZodObject<{
        tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        category: z.ZodOptional<z.ZodString>;
        estimatedCompletionTime: z.ZodOptional<z.ZodNumber>;
        averageCompletionTime: z.ZodOptional<z.ZodNumber>;
        complexity: z.ZodDefault<z.ZodEnum<["simple", "medium", "complex"]>>;
    }, "strip", z.ZodTypeAny, {
        tags: string[];
        complexity: "medium" | "simple" | "complex";
        category?: string | undefined;
        estimatedCompletionTime?: number | undefined;
        averageCompletionTime?: number | undefined;
    }, {
        tags?: string[] | undefined;
        category?: string | undefined;
        estimatedCompletionTime?: number | undefined;
        averageCompletionTime?: number | undefined;
        complexity?: "medium" | "simple" | "complex" | undefined;
    }>;
    permissions: z.ZodObject<{
        canEdit: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        canView: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        canExecute: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        canEdit: string[];
        canView: string[];
        canExecute: string[];
    }, {
        canEdit?: string[] | undefined;
        canView?: string[] | undefined;
        canExecute?: string[] | undefined;
    }>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    publishedAt: z.ZodOptional<z.ZodDate>;
}, "id" | "createdAt" | "updatedAt" | "version" | "publishedAt">, "strip", z.ZodTypeAny, {
    status: WorkflowStatus;
    organizationId: string;
    name: string;
    createdBy: string;
    nodes: {
        id: string;
        type: NodeType;
        label: string;
        position: {
            x: number;
            y: number;
        };
        description?: string | undefined;
        data?: Record<string, any> | undefined;
        config?: {
            priority: "low" | "medium" | "high";
            automated: boolean;
            requiredApprovals: number;
            assignee?: string | undefined;
            estimatedDuration?: number | undefined;
        } | undefined;
    }[];
    connections: {
        id: string;
        type: ConnectionType;
        source: string;
        target: string;
        label?: string | undefined;
        condition?: string | undefined;
    }[];
    metadata: {
        tags: string[];
        complexity: "medium" | "simple" | "complex";
        category?: string | undefined;
        estimatedCompletionTime?: number | undefined;
        averageCompletionTime?: number | undefined;
    };
    permissions: {
        canEdit: string[];
        canView: string[];
        canExecute: string[];
    };
    description?: string | undefined;
}, {
    status: WorkflowStatus;
    organizationId: string;
    name: string;
    createdBy: string;
    nodes: {
        id: string;
        type: NodeType;
        label: string;
        position: {
            x: number;
            y: number;
        };
        description?: string | undefined;
        data?: Record<string, any> | undefined;
        config?: {
            assignee?: string | undefined;
            estimatedDuration?: number | undefined;
            priority?: "low" | "medium" | "high" | undefined;
            automated?: boolean | undefined;
            requiredApprovals?: number | undefined;
        } | undefined;
    }[];
    connections: {
        id: string;
        type: ConnectionType;
        source: string;
        target: string;
        label?: string | undefined;
        condition?: string | undefined;
    }[];
    metadata: {
        tags?: string[] | undefined;
        category?: string | undefined;
        estimatedCompletionTime?: number | undefined;
        averageCompletionTime?: number | undefined;
        complexity?: "medium" | "simple" | "complex" | undefined;
    };
    permissions: {
        canEdit?: string[] | undefined;
        canView?: string[] | undefined;
        canExecute?: string[] | undefined;
    };
    description?: string | undefined;
}>;
export type CreateWorkflow = z.infer<typeof CreateWorkflowSchema>;
export declare const UpdateWorkflowSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodNativeEnum<typeof WorkflowStatus>>;
    organizationId: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    name: z.ZodOptional<z.ZodString>;
    createdBy: z.ZodOptional<z.ZodString>;
    nodes: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodNativeEnum<typeof NodeType>;
        label: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        position: z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>;
        data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        config: z.ZodOptional<z.ZodObject<{
            assignee: z.ZodOptional<z.ZodString>;
            estimatedDuration: z.ZodOptional<z.ZodNumber>;
            priority: z.ZodDefault<z.ZodEnum<["low", "medium", "high"]>>;
            automated: z.ZodDefault<z.ZodBoolean>;
            requiredApprovals: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            priority: "low" | "medium" | "high";
            automated: boolean;
            requiredApprovals: number;
            assignee?: string | undefined;
            estimatedDuration?: number | undefined;
        }, {
            assignee?: string | undefined;
            estimatedDuration?: number | undefined;
            priority?: "low" | "medium" | "high" | undefined;
            automated?: boolean | undefined;
            requiredApprovals?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        type: NodeType;
        label: string;
        position: {
            x: number;
            y: number;
        };
        description?: string | undefined;
        data?: Record<string, any> | undefined;
        config?: {
            priority: "low" | "medium" | "high";
            automated: boolean;
            requiredApprovals: number;
            assignee?: string | undefined;
            estimatedDuration?: number | undefined;
        } | undefined;
    }, {
        id: string;
        type: NodeType;
        label: string;
        position: {
            x: number;
            y: number;
        };
        description?: string | undefined;
        data?: Record<string, any> | undefined;
        config?: {
            assignee?: string | undefined;
            estimatedDuration?: number | undefined;
            priority?: "low" | "medium" | "high" | undefined;
            automated?: boolean | undefined;
            requiredApprovals?: number | undefined;
        } | undefined;
    }>, "many">>;
    connections: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        source: z.ZodString;
        target: z.ZodString;
        type: z.ZodNativeEnum<typeof ConnectionType>;
        label: z.ZodOptional<z.ZodString>;
        condition: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        type: ConnectionType;
        source: string;
        target: string;
        label?: string | undefined;
        condition?: string | undefined;
    }, {
        id: string;
        type: ConnectionType;
        source: string;
        target: string;
        label?: string | undefined;
        condition?: string | undefined;
    }>, "many">>;
    metadata: z.ZodOptional<z.ZodObject<{
        tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        category: z.ZodOptional<z.ZodString>;
        estimatedCompletionTime: z.ZodOptional<z.ZodNumber>;
        averageCompletionTime: z.ZodOptional<z.ZodNumber>;
        complexity: z.ZodDefault<z.ZodEnum<["simple", "medium", "complex"]>>;
    }, "strip", z.ZodTypeAny, {
        tags: string[];
        complexity: "medium" | "simple" | "complex";
        category?: string | undefined;
        estimatedCompletionTime?: number | undefined;
        averageCompletionTime?: number | undefined;
    }, {
        tags?: string[] | undefined;
        category?: string | undefined;
        estimatedCompletionTime?: number | undefined;
        averageCompletionTime?: number | undefined;
        complexity?: "medium" | "simple" | "complex" | undefined;
    }>>;
    permissions: z.ZodOptional<z.ZodObject<{
        canEdit: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        canView: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        canExecute: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        canEdit: string[];
        canView: string[];
        canExecute: string[];
    }, {
        canEdit?: string[] | undefined;
        canView?: string[] | undefined;
        canExecute?: string[] | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    status?: WorkflowStatus | undefined;
    organizationId?: string | undefined;
    description?: string | undefined;
    name?: string | undefined;
    createdBy?: string | undefined;
    nodes?: {
        id: string;
        type: NodeType;
        label: string;
        position: {
            x: number;
            y: number;
        };
        description?: string | undefined;
        data?: Record<string, any> | undefined;
        config?: {
            priority: "low" | "medium" | "high";
            automated: boolean;
            requiredApprovals: number;
            assignee?: string | undefined;
            estimatedDuration?: number | undefined;
        } | undefined;
    }[] | undefined;
    connections?: {
        id: string;
        type: ConnectionType;
        source: string;
        target: string;
        label?: string | undefined;
        condition?: string | undefined;
    }[] | undefined;
    metadata?: {
        tags: string[];
        complexity: "medium" | "simple" | "complex";
        category?: string | undefined;
        estimatedCompletionTime?: number | undefined;
        averageCompletionTime?: number | undefined;
    } | undefined;
    permissions?: {
        canEdit: string[];
        canView: string[];
        canExecute: string[];
    } | undefined;
}, {
    status?: WorkflowStatus | undefined;
    organizationId?: string | undefined;
    description?: string | undefined;
    name?: string | undefined;
    createdBy?: string | undefined;
    nodes?: {
        id: string;
        type: NodeType;
        label: string;
        position: {
            x: number;
            y: number;
        };
        description?: string | undefined;
        data?: Record<string, any> | undefined;
        config?: {
            assignee?: string | undefined;
            estimatedDuration?: number | undefined;
            priority?: "low" | "medium" | "high" | undefined;
            automated?: boolean | undefined;
            requiredApprovals?: number | undefined;
        } | undefined;
    }[] | undefined;
    connections?: {
        id: string;
        type: ConnectionType;
        source: string;
        target: string;
        label?: string | undefined;
        condition?: string | undefined;
    }[] | undefined;
    metadata?: {
        tags?: string[] | undefined;
        category?: string | undefined;
        estimatedCompletionTime?: number | undefined;
        averageCompletionTime?: number | undefined;
        complexity?: "medium" | "simple" | "complex" | undefined;
    } | undefined;
    permissions?: {
        canEdit?: string[] | undefined;
        canView?: string[] | undefined;
        canExecute?: string[] | undefined;
    } | undefined;
}>;
export type UpdateWorkflow = z.infer<typeof UpdateWorkflowSchema>;
export declare enum ExecutionStatus {
    PENDING = "pending",
    RUNNING = "running",
    COMPLETED = "completed",
    FAILED = "failed",
    CANCELLED = "cancelled",
    PAUSED = "paused"
}
export declare const WorkflowExecutionSchema: z.ZodObject<{
    id: z.ZodString;
    workflowId: z.ZodString;
    initiatedBy: z.ZodString;
    status: z.ZodNativeEnum<typeof ExecutionStatus>;
    currentNode: z.ZodOptional<z.ZodString>;
    data: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
    logs: z.ZodDefault<z.ZodArray<z.ZodObject<{
        timestamp: z.ZodDate;
        nodeId: z.ZodString;
        action: z.ZodString;
        details: z.ZodOptional<z.ZodString>;
        userId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        timestamp: Date;
        nodeId: string;
        action: string;
        details?: string | undefined;
        userId?: string | undefined;
    }, {
        timestamp: Date;
        nodeId: string;
        action: string;
        details?: string | undefined;
        userId?: string | undefined;
    }>, "many">>;
    startedAt: z.ZodDate;
    completedAt: z.ZodOptional<z.ZodDate>;
    error: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: ExecutionStatus;
    data: Record<string, any>;
    workflowId: string;
    initiatedBy: string;
    logs: {
        timestamp: Date;
        nodeId: string;
        action: string;
        details?: string | undefined;
        userId?: string | undefined;
    }[];
    startedAt: Date;
    currentNode?: string | undefined;
    completedAt?: Date | undefined;
    error?: string | undefined;
}, {
    id: string;
    status: ExecutionStatus;
    workflowId: string;
    initiatedBy: string;
    startedAt: Date;
    data?: Record<string, any> | undefined;
    currentNode?: string | undefined;
    logs?: {
        timestamp: Date;
        nodeId: string;
        action: string;
        details?: string | undefined;
        userId?: string | undefined;
    }[] | undefined;
    completedAt?: Date | undefined;
    error?: string | undefined;
}>;
export type WorkflowExecution = z.infer<typeof WorkflowExecutionSchema>;
export declare const StartExecutionSchema: z.ZodObject<{
    workflowId: z.ZodString;
    data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    workflowId: string;
    data?: Record<string, any> | undefined;
}, {
    workflowId: string;
    data?: Record<string, any> | undefined;
}>;
export type StartExecution = z.infer<typeof StartExecutionSchema>;
//# sourceMappingURL=workflow.d.ts.map