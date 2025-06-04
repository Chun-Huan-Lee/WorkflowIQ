import { z } from 'zod';

export enum WorkflowStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  PAUSED = 'paused',
  ARCHIVED = 'archived'
}

export enum NodeType {
  START = 'start',
  END = 'end',
  TASK = 'task',
  DECISION = 'decision',
  PARALLEL = 'parallel',
  JOIN = 'join',
  SUBPROCESS = 'subprocess',
  TIMER = 'timer',
  USER_INPUT = 'user_input'
}

export enum ConnectionType {
  SEQUENCE = 'sequence',
  CONDITIONAL = 'conditional',
  DEFAULT = 'default'
}

export const WorkflowNodeSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(NodeType),
  label: z.string(),
  description: z.string().optional(),
  position: z.object({
    x: z.number(),
    y: z.number()
  }),
  data: z.record(z.any()).optional(),
  config: z.object({
    assignee: z.string().optional(),
    estimatedDuration: z.number().optional(), // in minutes
    priority: z.enum(['low', 'medium', 'high']).default('medium'),
    automated: z.boolean().default(false),
    requiredApprovals: z.number().default(0)
  }).optional()
});

export type WorkflowNode = z.infer<typeof WorkflowNodeSchema>;

export const WorkflowConnectionSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  type: z.nativeEnum(ConnectionType),
  label: z.string().optional(),
  condition: z.string().optional() // For conditional connections
});

export type WorkflowConnection = z.infer<typeof WorkflowConnectionSchema>;

export const WorkflowSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().optional(),
  organizationId: z.string().uuid(),
  createdBy: z.string().uuid(),
  status: z.nativeEnum(WorkflowStatus),
  version: z.number().default(1),
  nodes: z.array(WorkflowNodeSchema),
  connections: z.array(WorkflowConnectionSchema),
  metadata: z.object({
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    estimatedCompletionTime: z.number().optional(),
    averageCompletionTime: z.number().optional(),
    complexity: z.enum(['simple', 'medium', 'complex']).default('medium')
  }),
  permissions: z.object({
    canEdit: z.array(z.string().uuid()).default([]),
    canView: z.array(z.string().uuid()).default([]),
    canExecute: z.array(z.string().uuid()).default([])
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
  publishedAt: z.date().optional()
});

export type Workflow = z.infer<typeof WorkflowSchema>;

export const CreateWorkflowSchema = WorkflowSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  publishedAt: true,
  version: true
});

export type CreateWorkflow = z.infer<typeof CreateWorkflowSchema>;

export const UpdateWorkflowSchema = CreateWorkflowSchema.partial();

export type UpdateWorkflow = z.infer<typeof UpdateWorkflowSchema>;

// Workflow execution types
export enum ExecutionStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  PAUSED = 'paused'
}

export const WorkflowExecutionSchema = z.object({
  id: z.string().uuid(),
  workflowId: z.string().uuid(),
  initiatedBy: z.string().uuid(),
  status: z.nativeEnum(ExecutionStatus),
  currentNode: z.string().optional(),
  data: z.record(z.any()).default({}),
  logs: z.array(z.object({
    timestamp: z.date(),
    nodeId: z.string(),
    action: z.string(),
    details: z.string().optional(),
    userId: z.string().uuid().optional()
  })).default([]),
  startedAt: z.date(),
  completedAt: z.date().optional(),
  error: z.string().optional()
});

export type WorkflowExecution = z.infer<typeof WorkflowExecutionSchema>;

export const StartExecutionSchema = z.object({
  workflowId: z.string().uuid(),
  data: z.record(z.any()).optional()
});

export type StartExecution = z.infer<typeof StartExecutionSchema>; 