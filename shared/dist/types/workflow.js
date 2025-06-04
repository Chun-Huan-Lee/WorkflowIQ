"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartExecutionSchema = exports.WorkflowExecutionSchema = exports.ExecutionStatus = exports.UpdateWorkflowSchema = exports.CreateWorkflowSchema = exports.WorkflowSchema = exports.WorkflowConnectionSchema = exports.WorkflowNodeSchema = exports.ConnectionType = exports.NodeType = exports.WorkflowStatus = void 0;
const zod_1 = require("zod");
var WorkflowStatus;
(function (WorkflowStatus) {
    WorkflowStatus["DRAFT"] = "draft";
    WorkflowStatus["ACTIVE"] = "active";
    WorkflowStatus["PAUSED"] = "paused";
    WorkflowStatus["ARCHIVED"] = "archived";
})(WorkflowStatus || (exports.WorkflowStatus = WorkflowStatus = {}));
var NodeType;
(function (NodeType) {
    NodeType["START"] = "start";
    NodeType["END"] = "end";
    NodeType["TASK"] = "task";
    NodeType["DECISION"] = "decision";
    NodeType["PARALLEL"] = "parallel";
    NodeType["JOIN"] = "join";
    NodeType["SUBPROCESS"] = "subprocess";
    NodeType["TIMER"] = "timer";
    NodeType["USER_INPUT"] = "user_input";
})(NodeType || (exports.NodeType = NodeType = {}));
var ConnectionType;
(function (ConnectionType) {
    ConnectionType["SEQUENCE"] = "sequence";
    ConnectionType["CONDITIONAL"] = "conditional";
    ConnectionType["DEFAULT"] = "default";
})(ConnectionType || (exports.ConnectionType = ConnectionType = {}));
exports.WorkflowNodeSchema = zod_1.z.object({
    id: zod_1.z.string(),
    type: zod_1.z.nativeEnum(NodeType),
    label: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    position: zod_1.z.object({
        x: zod_1.z.number(),
        y: zod_1.z.number()
    }),
    data: zod_1.z.record(zod_1.z.any()).optional(),
    config: zod_1.z.object({
        assignee: zod_1.z.string().optional(),
        estimatedDuration: zod_1.z.number().optional(), // in minutes
        priority: zod_1.z.enum(['low', 'medium', 'high']).default('medium'),
        automated: zod_1.z.boolean().default(false),
        requiredApprovals: zod_1.z.number().default(0)
    }).optional()
});
exports.WorkflowConnectionSchema = zod_1.z.object({
    id: zod_1.z.string(),
    source: zod_1.z.string(),
    target: zod_1.z.string(),
    type: zod_1.z.nativeEnum(ConnectionType),
    label: zod_1.z.string().optional(),
    condition: zod_1.z.string().optional() // For conditional connections
});
exports.WorkflowSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string().min(1),
    description: zod_1.z.string().optional(),
    organizationId: zod_1.z.string().uuid(),
    createdBy: zod_1.z.string().uuid(),
    status: zod_1.z.nativeEnum(WorkflowStatus),
    version: zod_1.z.number().default(1),
    nodes: zod_1.z.array(exports.WorkflowNodeSchema),
    connections: zod_1.z.array(exports.WorkflowConnectionSchema),
    metadata: zod_1.z.object({
        tags: zod_1.z.array(zod_1.z.string()).default([]),
        category: zod_1.z.string().optional(),
        estimatedCompletionTime: zod_1.z.number().optional(),
        averageCompletionTime: zod_1.z.number().optional(),
        complexity: zod_1.z.enum(['simple', 'medium', 'complex']).default('medium')
    }),
    permissions: zod_1.z.object({
        canEdit: zod_1.z.array(zod_1.z.string().uuid()).default([]),
        canView: zod_1.z.array(zod_1.z.string().uuid()).default([]),
        canExecute: zod_1.z.array(zod_1.z.string().uuid()).default([])
    }),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    publishedAt: zod_1.z.date().optional()
});
exports.CreateWorkflowSchema = exports.WorkflowSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    publishedAt: true,
    version: true
});
exports.UpdateWorkflowSchema = exports.CreateWorkflowSchema.partial();
// Workflow execution types
var ExecutionStatus;
(function (ExecutionStatus) {
    ExecutionStatus["PENDING"] = "pending";
    ExecutionStatus["RUNNING"] = "running";
    ExecutionStatus["COMPLETED"] = "completed";
    ExecutionStatus["FAILED"] = "failed";
    ExecutionStatus["CANCELLED"] = "cancelled";
    ExecutionStatus["PAUSED"] = "paused";
})(ExecutionStatus || (exports.ExecutionStatus = ExecutionStatus = {}));
exports.WorkflowExecutionSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    workflowId: zod_1.z.string().uuid(),
    initiatedBy: zod_1.z.string().uuid(),
    status: zod_1.z.nativeEnum(ExecutionStatus),
    currentNode: zod_1.z.string().optional(),
    data: zod_1.z.record(zod_1.z.any()).default({}),
    logs: zod_1.z.array(zod_1.z.object({
        timestamp: zod_1.z.date(),
        nodeId: zod_1.z.string(),
        action: zod_1.z.string(),
        details: zod_1.z.string().optional(),
        userId: zod_1.z.string().uuid().optional()
    })).default([]),
    startedAt: zod_1.z.date(),
    completedAt: zod_1.z.date().optional(),
    error: zod_1.z.string().optional()
});
exports.StartExecutionSchema = zod_1.z.object({
    workflowId: zod_1.z.string().uuid(),
    data: zod_1.z.record(zod_1.z.any()).optional()
});
//# sourceMappingURL=workflow.js.map