import { z } from 'zod';

export enum ProcessStatus {
  DISCOVERED = 'discovered',
  DOCUMENTED = 'documented',
  OPTIMIZED = 'optimized',
  DEPRECATED = 'deprecated'
}

export enum ProcessComplexity {
  SIMPLE = 'simple',
  MEDIUM = 'medium',
  COMPLEX = 'complex'
}

export const ProcessStepSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  estimatedTime: z.number().optional(), // in minutes
  actualTime: z.number().optional(),
  owner: z.string().optional(),
  systems: z.array(z.string()).default([]),
  inputs: z.array(z.string()).default([]),
  outputs: z.array(z.string()).default([]),
  dependencies: z.array(z.string()).default([]),
  order: z.number()
});

export type ProcessStep = z.infer<typeof ProcessStepSchema>;

export const ProcessMetricsSchema = z.object({
  averageCompletionTime: z.number().optional(),
  successRate: z.number().min(0).max(100).optional(),
  costPerExecution: z.number().optional(),
  volumePerMonth: z.number().optional(),
  bottlenecks: z.array(z.object({
    stepId: z.string(),
    severity: z.enum(['low', 'medium', 'high']),
    description: z.string()
  })).default([]),
  lastAnalyzed: z.date().optional()
});

export type ProcessMetrics = z.infer<typeof ProcessMetricsSchema>;

export const BusinessProcessSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().optional(),
  organizationId: z.string().uuid(),
  department: z.string().optional(),
  category: z.string().optional(),
  status: z.nativeEnum(ProcessStatus),
  complexity: z.nativeEnum(ProcessComplexity),
  steps: z.array(ProcessStepSchema),
  metrics: ProcessMetricsSchema.optional(),
  stakeholders: z.array(z.object({
    userId: z.string().uuid(),
    role: z.enum(['owner', 'participant', 'reviewer', 'approver'])
  })).default([]),
  documents: z.array(z.object({
    id: z.string(),
    name: z.string(),
    url: z.string(),
    type: z.enum(['document', 'video', 'image', 'other'])
  })).default([]),
  tags: z.array(z.string()).default([]),
  aiInsights: z.object({
    optimizationSuggestions: z.array(z.string()).default([]),
    automationOpportunities: z.array(z.string()).default([]),
    riskAssessment: z.object({
      score: z.number().min(0).max(100),
      factors: z.array(z.string())
    }).optional(),
    lastAnalyzed: z.date().optional()
  }).optional(),
  createdBy: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type BusinessProcess = z.infer<typeof BusinessProcessSchema>;

export const CreateProcessSchema = BusinessProcessSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  aiInsights: true
});

export type CreateProcess = z.infer<typeof CreateProcessSchema>;

export const UpdateProcessSchema = CreateProcessSchema.partial();

export type UpdateProcess = z.infer<typeof UpdateProcessSchema>;

// Process Mining Types
export const ProcessMiningConfigSchema = z.object({
  dataSource: z.enum(['database', 'csv', 'api', 'logs']),
  caseIdColumn: z.string(),
  activityColumn: z.string(),
  timestampColumn: z.string(),
  resourceColumn: z.string().optional(),
  additionalColumns: z.array(z.string()).default([]),
  filters: z.record(z.any()).optional()
});

export type ProcessMiningConfig = z.infer<typeof ProcessMiningConfigSchema>;

export const ProcessMiningResultSchema = z.object({
  id: z.string().uuid(),
  configId: z.string().uuid(),
  processId: z.string().uuid().optional(),
  discoveredProcesses: z.array(z.object({
    name: z.string(),
    frequency: z.number(),
    averageDuration: z.number(),
    variants: z.array(z.object({
      path: z.array(z.string()),
      frequency: z.number(),
      duration: z.number()
    }))
  })),
  insights: z.object({
    totalCases: z.number(),
    uniqueActivities: z.number(),
    averageCaseDuration: z.number(),
    mostCommonPath: z.array(z.string()),
    deviations: z.array(z.object({
      description: z.string(),
      frequency: z.number(),
      impact: z.enum(['low', 'medium', 'high'])
    }))
  }),
  createdAt: z.date()
});

export type ProcessMiningResult = z.infer<typeof ProcessMiningResultSchema>; 