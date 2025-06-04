import { z } from 'zod';
export declare enum OrganizationPlan {
    FREE = "free",
    STARTER = "starter",
    PROFESSIONAL = "professional",
    ENTERPRISE = "enterprise"
}
export declare const OrganizationSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    domain: z.ZodOptional<z.ZodString>;
    plan: z.ZodNativeEnum<typeof OrganizationPlan>;
    settings: z.ZodObject<{
        allowExternalCollaboration: z.ZodDefault<z.ZodBoolean>;
        dataRetentionDays: z.ZodDefault<z.ZodNumber>;
        requireTwoFactorAuth: z.ZodDefault<z.ZodBoolean>;
        allowProcessMining: z.ZodDefault<z.ZodBoolean>;
        aiFeatures: z.ZodObject<{
            enabled: z.ZodDefault<z.ZodBoolean>;
            allowDataSharing: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            allowDataSharing: boolean;
        }, {
            enabled?: boolean | undefined;
            allowDataSharing?: boolean | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        allowExternalCollaboration: boolean;
        dataRetentionDays: number;
        requireTwoFactorAuth: boolean;
        allowProcessMining: boolean;
        aiFeatures: {
            enabled: boolean;
            allowDataSharing: boolean;
        };
    }, {
        aiFeatures: {
            enabled?: boolean | undefined;
            allowDataSharing?: boolean | undefined;
        };
        allowExternalCollaboration?: boolean | undefined;
        dataRetentionDays?: number | undefined;
        requireTwoFactorAuth?: boolean | undefined;
        allowProcessMining?: boolean | undefined;
    }>;
    limits: z.ZodObject<{
        maxUsers: z.ZodNumber;
        maxProcesses: z.ZodNumber;
        maxWorkflows: z.ZodNumber;
        storageGB: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        maxUsers: number;
        maxProcesses: number;
        maxWorkflows: number;
        storageGB: number;
    }, {
        maxUsers: number;
        maxProcesses: number;
        maxWorkflows: number;
        storageGB: number;
    }>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    plan: OrganizationPlan;
    settings: {
        allowExternalCollaboration: boolean;
        dataRetentionDays: number;
        requireTwoFactorAuth: boolean;
        allowProcessMining: boolean;
        aiFeatures: {
            enabled: boolean;
            allowDataSharing: boolean;
        };
    };
    limits: {
        maxUsers: number;
        maxProcesses: number;
        maxWorkflows: number;
        storageGB: number;
    };
    domain?: string | undefined;
}, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    plan: OrganizationPlan;
    settings: {
        aiFeatures: {
            enabled?: boolean | undefined;
            allowDataSharing?: boolean | undefined;
        };
        allowExternalCollaboration?: boolean | undefined;
        dataRetentionDays?: number | undefined;
        requireTwoFactorAuth?: boolean | undefined;
        allowProcessMining?: boolean | undefined;
    };
    limits: {
        maxUsers: number;
        maxProcesses: number;
        maxWorkflows: number;
        storageGB: number;
    };
    domain?: string | undefined;
}>;
export type Organization = z.infer<typeof OrganizationSchema>;
export declare const CreateOrganizationSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    name: z.ZodString;
    domain: z.ZodOptional<z.ZodString>;
    plan: z.ZodNativeEnum<typeof OrganizationPlan>;
    settings: z.ZodObject<{
        allowExternalCollaboration: z.ZodDefault<z.ZodBoolean>;
        dataRetentionDays: z.ZodDefault<z.ZodNumber>;
        requireTwoFactorAuth: z.ZodDefault<z.ZodBoolean>;
        allowProcessMining: z.ZodDefault<z.ZodBoolean>;
        aiFeatures: z.ZodObject<{
            enabled: z.ZodDefault<z.ZodBoolean>;
            allowDataSharing: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            allowDataSharing: boolean;
        }, {
            enabled?: boolean | undefined;
            allowDataSharing?: boolean | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        allowExternalCollaboration: boolean;
        dataRetentionDays: number;
        requireTwoFactorAuth: boolean;
        allowProcessMining: boolean;
        aiFeatures: {
            enabled: boolean;
            allowDataSharing: boolean;
        };
    }, {
        aiFeatures: {
            enabled?: boolean | undefined;
            allowDataSharing?: boolean | undefined;
        };
        allowExternalCollaboration?: boolean | undefined;
        dataRetentionDays?: number | undefined;
        requireTwoFactorAuth?: boolean | undefined;
        allowProcessMining?: boolean | undefined;
    }>;
    limits: z.ZodObject<{
        maxUsers: z.ZodNumber;
        maxProcesses: z.ZodNumber;
        maxWorkflows: z.ZodNumber;
        storageGB: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        maxUsers: number;
        maxProcesses: number;
        maxWorkflows: number;
        storageGB: number;
    }, {
        maxUsers: number;
        maxProcesses: number;
        maxWorkflows: number;
        storageGB: number;
    }>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
    name: string;
    plan: OrganizationPlan;
    settings: {
        allowExternalCollaboration: boolean;
        dataRetentionDays: number;
        requireTwoFactorAuth: boolean;
        allowProcessMining: boolean;
        aiFeatures: {
            enabled: boolean;
            allowDataSharing: boolean;
        };
    };
    limits: {
        maxUsers: number;
        maxProcesses: number;
        maxWorkflows: number;
        storageGB: number;
    };
    domain?: string | undefined;
}, {
    name: string;
    plan: OrganizationPlan;
    settings: {
        aiFeatures: {
            enabled?: boolean | undefined;
            allowDataSharing?: boolean | undefined;
        };
        allowExternalCollaboration?: boolean | undefined;
        dataRetentionDays?: number | undefined;
        requireTwoFactorAuth?: boolean | undefined;
        allowProcessMining?: boolean | undefined;
    };
    limits: {
        maxUsers: number;
        maxProcesses: number;
        maxWorkflows: number;
        storageGB: number;
    };
    domain?: string | undefined;
}>;
export type CreateOrganization = z.infer<typeof CreateOrganizationSchema>;
//# sourceMappingURL=organization.d.ts.map