"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrganizationSchema = exports.OrganizationSchema = exports.OrganizationPlan = void 0;
const zod_1 = require("zod");
var OrganizationPlan;
(function (OrganizationPlan) {
    OrganizationPlan["FREE"] = "free";
    OrganizationPlan["STARTER"] = "starter";
    OrganizationPlan["PROFESSIONAL"] = "professional";
    OrganizationPlan["ENTERPRISE"] = "enterprise";
})(OrganizationPlan || (exports.OrganizationPlan = OrganizationPlan = {}));
exports.OrganizationSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string().min(1),
    domain: zod_1.z.string().optional(),
    plan: zod_1.z.nativeEnum(OrganizationPlan),
    settings: zod_1.z.object({
        allowExternalCollaboration: zod_1.z.boolean().default(false),
        dataRetentionDays: zod_1.z.number().default(365),
        requireTwoFactorAuth: zod_1.z.boolean().default(false),
        allowProcessMining: zod_1.z.boolean().default(true),
        aiFeatures: zod_1.z.object({
            enabled: zod_1.z.boolean().default(true),
            allowDataSharing: zod_1.z.boolean().default(false)
        })
    }),
    limits: zod_1.z.object({
        maxUsers: zod_1.z.number(),
        maxProcesses: zod_1.z.number(),
        maxWorkflows: zod_1.z.number(),
        storageGB: zod_1.z.number()
    }),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date()
});
exports.CreateOrganizationSchema = exports.OrganizationSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true
});
//# sourceMappingURL=organization.js.map