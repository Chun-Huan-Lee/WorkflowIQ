import { z } from 'zod';

export enum AIProvider {
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
  GEMINI = 'gemini',
  CUSTOM = 'custom'
}

export enum AITaskType {
  PROCESS_DISCOVERY = 'process_discovery',
  WORKFLOW_OPTIMIZATION = 'workflow_optimization',
  DOCUMENT_ANALYSIS = 'document_analysis',
  PATTERN_RECOGNITION = 'pattern_recognition',
  ANOMALY_DETECTION = 'anomaly_detection',
  PREDICTIVE_ANALYSIS = 'predictive_analysis'
}

export const AIPromptSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
  template: z.string(),
  variables: z.array(z.object({
    name: z.string(),
    type: z.enum(['string', 'number', 'boolean', 'array', 'object']),
    required: z.boolean().default(false),
    description: z.string().optional()
  })).default([]),
  taskType: z.nativeEnum(AITaskType),
  provider: z.nativeEnum(AIProvider),
  model: z.string(),
  parameters: z.object({
    temperature: z.number().min(0).max(2).default(0.7),
    maxTokens: z.number().min(1).max(100000).default(1000),
    topP: z.number().min(0).max(1).default(1),
    frequencyPenalty: z.number().min(-2).max(2).default(0),
    presencePenalty: z.number().min(-2).max(2).default(0)
  }),
  createdBy: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type AIPrompt = z.infer<typeof AIPromptSchema>;

export const AITaskSchema = z.object({
  id: z.string().uuid(),
  type: z.nativeEnum(AITaskType),
  status: z.enum(['pending', 'running', 'completed', 'failed']),
  input: z.record(z.any()),
  output: z.record(z.any()).optional(),
  promptId: z.string().uuid().optional(),
  provider: z.nativeEnum(AIProvider),
  model: z.string(),
  usage: z.object({
    promptTokens: z.number(),
    completionTokens: z.number(),
    totalTokens: z.number(),
    cost: z.number().optional()
  }).optional(),
  error: z.string().optional(),
  executionTime: z.number().optional(), // in milliseconds
  createdBy: z.string().uuid(),
  createdAt: z.date(),
  completedAt: z.date().optional()
});

export type AITask = z.infer<typeof AITaskSchema>;

export const ProcessDiscoveryRequestSchema = z.object({
  documentText: z.string().optional(),
  documentUrl: z.string().optional(),
  systemLogs: z.array(z.object({
    timestamp: z.date(),
    user: z.string(),
    action: z.string(),
    system: z.string(),
    details: z.record(z.any()).optional()
  })).optional(),
  context: z.object({
    department: z.string().optional(),
    processType: z.string().optional(),
    industry: z.string().optional()
  }).optional()
});

export type ProcessDiscoveryRequest = z.infer<typeof ProcessDiscoveryRequestSchema>;

export const ProcessOptimizationRequestSchema = z.object({
  processId: z.string().uuid(),
  currentMetrics: z.object({
    averageTime: z.number(),
    successRate: z.number(),
    cost: z.number().optional(),
    bottlenecks: z.array(z.string())
  }),
  goals: z.array(z.enum(['reduce_time', 'increase_quality', 'reduce_cost', 'improve_compliance'])),
  constraints: z.array(z.string()).default([])
});

export type ProcessOptimizationRequest = z.infer<typeof ProcessOptimizationRequestSchema>;

export const AIInsightSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(['optimization', 'anomaly', 'prediction', 'recommendation']),
  title: z.string(),
  description: z.string(),
  confidence: z.number().min(0).max(1),
  impact: z.enum(['low', 'medium', 'high']),
  category: z.string(),
  data: z.record(z.any()),
  actionable: z.boolean().default(false),
  actions: z.array(z.object({
    title: z.string(),
    description: z.string(),
    estimatedEffort: z.enum(['low', 'medium', 'high']),
    expectedBenefit: z.string()
  })).default([]),
  relatedResources: z.array(z.object({
    id: z.string(),
    type: z.enum(['workflow', 'process', 'document']),
    name: z.string()
  })).default([]),
  generatedBy: z.object({
    taskId: z.string().uuid(),
    model: z.string(),
    provider: z.nativeEnum(AIProvider)
  }),
  createdAt: z.date(),
  expiresAt: z.date().optional()
});

export type AIInsight = z.infer<typeof AIInsightSchema>;

export const EmbeddingSchema = z.object({
  id: z.string().uuid(),
  resourceId: z.string().uuid(),
  resourceType: z.enum(['workflow', 'process', 'document', 'comment']),
  content: z.string(),
  vector: z.array(z.number()),
  metadata: z.record(z.any()).default({}),
  createdAt: z.date()
});

export type Embedding = z.infer<typeof EmbeddingSchema>;

export const SemanticSearchRequestSchema = z.object({
  query: z.string(),
  resourceTypes: z.array(z.enum(['workflow', 'process', 'document', 'comment'])).optional(),
  organizationId: z.string().uuid(),
  limit: z.number().min(1).max(100).default(10),
  threshold: z.number().min(0).max(1).default(0.7)
});

export type SemanticSearchRequest = z.infer<typeof SemanticSearchRequestSchema>;

export const SemanticSearchResultSchema = z.object({
  results: z.array(z.object({
    id: z.string(),
    resourceId: z.string(),
    resourceType: z.enum(['workflow', 'process', 'document', 'comment']),
    title: z.string(),
    content: z.string(),
    score: z.number(),
    metadata: z.record(z.any())
  })),
  query: z.string(),
  executionTime: z.number(),
  totalResults: z.number()
});

export type SemanticSearchResult = z.infer<typeof SemanticSearchResultSchema>; 