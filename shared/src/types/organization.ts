import { z } from 'zod';

export enum OrganizationPlan {
  FREE = 'free',
  STARTER = 'starter',
  PROFESSIONAL = 'professional',
  ENTERPRISE = 'enterprise'
}

export const OrganizationSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  domain: z.string().optional(),
  plan: z.nativeEnum(OrganizationPlan),
  settings: z.object({
    allowExternalCollaboration: z.boolean().default(false),
    dataRetentionDays: z.number().default(365),
    requireTwoFactorAuth: z.boolean().default(false),
    allowProcessMining: z.boolean().default(true),
    aiFeatures: z.object({
      enabled: z.boolean().default(true),
      allowDataSharing: z.boolean().default(false)
    })
  }),
  limits: z.object({
    maxUsers: z.number(),
    maxProcesses: z.number(),
    maxWorkflows: z.number(),
    storageGB: z.number()
  }),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type Organization = z.infer<typeof OrganizationSchema>;

export const CreateOrganizationSchema = OrganizationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export type CreateOrganization = z.infer<typeof CreateOrganizationSchema>; 