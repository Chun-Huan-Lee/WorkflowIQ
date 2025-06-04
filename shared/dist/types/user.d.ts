import { z } from 'zod';
export declare enum UserRole {
    ADMIN = "admin",
    MANAGER = "manager",
    ANALYST = "analyst",
    VIEWER = "viewer"
}
export declare enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    PENDING = "pending",
    SUSPENDED = "suspended"
}
export declare const UserSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    role: z.ZodNativeEnum<typeof UserRole>;
    status: z.ZodNativeEnum<typeof UserStatus>;
    organizationId: z.ZodString;
    avatar: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    timezone: z.ZodDefault<z.ZodString>;
    preferences: z.ZodOptional<z.ZodObject<{
        notifications: z.ZodObject<{
            email: z.ZodDefault<z.ZodBoolean>;
            inApp: z.ZodDefault<z.ZodBoolean>;
            processUpdates: z.ZodDefault<z.ZodBoolean>;
            collaborationUpdates: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            email: boolean;
            inApp: boolean;
            processUpdates: boolean;
            collaborationUpdates: boolean;
        }, {
            email?: boolean | undefined;
            inApp?: boolean | undefined;
            processUpdates?: boolean | undefined;
            collaborationUpdates?: boolean | undefined;
        }>;
        dashboard: z.ZodObject<{
            defaultView: z.ZodDefault<z.ZodEnum<["grid", "list"]>>;
            itemsPerPage: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            defaultView: "grid" | "list";
            itemsPerPage: number;
        }, {
            defaultView?: "grid" | "list" | undefined;
            itemsPerPage?: number | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        notifications: {
            email: boolean;
            inApp: boolean;
            processUpdates: boolean;
            collaborationUpdates: boolean;
        };
        dashboard: {
            defaultView: "grid" | "list";
            itemsPerPage: number;
        };
    }, {
        notifications: {
            email?: boolean | undefined;
            inApp?: boolean | undefined;
            processUpdates?: boolean | undefined;
            collaborationUpdates?: boolean | undefined;
        };
        dashboard: {
            defaultView?: "grid" | "list" | undefined;
            itemsPerPage?: number | undefined;
        };
    }>>;
    lastLoginAt: z.ZodOptional<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    status: UserStatus;
    organizationId: string;
    timezone: string;
    createdAt: Date;
    updatedAt: Date;
    avatar?: string | undefined;
    bio?: string | undefined;
    preferences?: {
        notifications: {
            email: boolean;
            inApp: boolean;
            processUpdates: boolean;
            collaborationUpdates: boolean;
        };
        dashboard: {
            defaultView: "grid" | "list";
            itemsPerPage: number;
        };
    } | undefined;
    lastLoginAt?: Date | undefined;
}, {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    status: UserStatus;
    organizationId: string;
    createdAt: Date;
    updatedAt: Date;
    avatar?: string | undefined;
    bio?: string | undefined;
    timezone?: string | undefined;
    preferences?: {
        notifications: {
            email?: boolean | undefined;
            inApp?: boolean | undefined;
            processUpdates?: boolean | undefined;
            collaborationUpdates?: boolean | undefined;
        };
        dashboard: {
            defaultView?: "grid" | "list" | undefined;
            itemsPerPage?: number | undefined;
        };
    } | undefined;
    lastLoginAt?: Date | undefined;
}>;
export type User = z.infer<typeof UserSchema>;
export declare const CreateUserSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    email: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    role: z.ZodNativeEnum<typeof UserRole>;
    status: z.ZodNativeEnum<typeof UserStatus>;
    organizationId: z.ZodString;
    avatar: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    timezone: z.ZodDefault<z.ZodString>;
    preferences: z.ZodOptional<z.ZodObject<{
        notifications: z.ZodObject<{
            email: z.ZodDefault<z.ZodBoolean>;
            inApp: z.ZodDefault<z.ZodBoolean>;
            processUpdates: z.ZodDefault<z.ZodBoolean>;
            collaborationUpdates: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            email: boolean;
            inApp: boolean;
            processUpdates: boolean;
            collaborationUpdates: boolean;
        }, {
            email?: boolean | undefined;
            inApp?: boolean | undefined;
            processUpdates?: boolean | undefined;
            collaborationUpdates?: boolean | undefined;
        }>;
        dashboard: z.ZodObject<{
            defaultView: z.ZodDefault<z.ZodEnum<["grid", "list"]>>;
            itemsPerPage: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            defaultView: "grid" | "list";
            itemsPerPage: number;
        }, {
            defaultView?: "grid" | "list" | undefined;
            itemsPerPage?: number | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        notifications: {
            email: boolean;
            inApp: boolean;
            processUpdates: boolean;
            collaborationUpdates: boolean;
        };
        dashboard: {
            defaultView: "grid" | "list";
            itemsPerPage: number;
        };
    }, {
        notifications: {
            email?: boolean | undefined;
            inApp?: boolean | undefined;
            processUpdates?: boolean | undefined;
            collaborationUpdates?: boolean | undefined;
        };
        dashboard: {
            defaultView?: "grid" | "list" | undefined;
            itemsPerPage?: number | undefined;
        };
    }>>;
    lastLoginAt: z.ZodOptional<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "id" | "lastLoginAt" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    status: UserStatus;
    organizationId: string;
    timezone: string;
    avatar?: string | undefined;
    bio?: string | undefined;
    preferences?: {
        notifications: {
            email: boolean;
            inApp: boolean;
            processUpdates: boolean;
            collaborationUpdates: boolean;
        };
        dashboard: {
            defaultView: "grid" | "list";
            itemsPerPage: number;
        };
    } | undefined;
}, {
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    status: UserStatus;
    organizationId: string;
    avatar?: string | undefined;
    bio?: string | undefined;
    timezone?: string | undefined;
    preferences?: {
        notifications: {
            email?: boolean | undefined;
            inApp?: boolean | undefined;
            processUpdates?: boolean | undefined;
            collaborationUpdates?: boolean | undefined;
        };
        dashboard: {
            defaultView?: "grid" | "list" | undefined;
            itemsPerPage?: number | undefined;
        };
    } | undefined;
}>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export declare const UpdateUserSchema: z.ZodObject<{
    email: z.ZodOptional<z.ZodString>;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodNativeEnum<typeof UserRole>>;
    status: z.ZodOptional<z.ZodNativeEnum<typeof UserStatus>>;
    organizationId: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    bio: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    timezone: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    preferences: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        notifications: z.ZodObject<{
            email: z.ZodDefault<z.ZodBoolean>;
            inApp: z.ZodDefault<z.ZodBoolean>;
            processUpdates: z.ZodDefault<z.ZodBoolean>;
            collaborationUpdates: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            email: boolean;
            inApp: boolean;
            processUpdates: boolean;
            collaborationUpdates: boolean;
        }, {
            email?: boolean | undefined;
            inApp?: boolean | undefined;
            processUpdates?: boolean | undefined;
            collaborationUpdates?: boolean | undefined;
        }>;
        dashboard: z.ZodObject<{
            defaultView: z.ZodDefault<z.ZodEnum<["grid", "list"]>>;
            itemsPerPage: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            defaultView: "grid" | "list";
            itemsPerPage: number;
        }, {
            defaultView?: "grid" | "list" | undefined;
            itemsPerPage?: number | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        notifications: {
            email: boolean;
            inApp: boolean;
            processUpdates: boolean;
            collaborationUpdates: boolean;
        };
        dashboard: {
            defaultView: "grid" | "list";
            itemsPerPage: number;
        };
    }, {
        notifications: {
            email?: boolean | undefined;
            inApp?: boolean | undefined;
            processUpdates?: boolean | undefined;
            collaborationUpdates?: boolean | undefined;
        };
        dashboard: {
            defaultView?: "grid" | "list" | undefined;
            itemsPerPage?: number | undefined;
        };
    }>>>;
}, "strip", z.ZodTypeAny, {
    email?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    role?: UserRole | undefined;
    status?: UserStatus | undefined;
    organizationId?: string | undefined;
    avatar?: string | undefined;
    bio?: string | undefined;
    timezone?: string | undefined;
    preferences?: {
        notifications: {
            email: boolean;
            inApp: boolean;
            processUpdates: boolean;
            collaborationUpdates: boolean;
        };
        dashboard: {
            defaultView: "grid" | "list";
            itemsPerPage: number;
        };
    } | undefined;
}, {
    email?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    role?: UserRole | undefined;
    status?: UserStatus | undefined;
    organizationId?: string | undefined;
    avatar?: string | undefined;
    bio?: string | undefined;
    timezone?: string | undefined;
    preferences?: {
        notifications: {
            email?: boolean | undefined;
            inApp?: boolean | undefined;
            processUpdates?: boolean | undefined;
            collaborationUpdates?: boolean | undefined;
        };
        dashboard: {
            defaultView?: "grid" | "list" | undefined;
            itemsPerPage?: number | undefined;
        };
    } | undefined;
}>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export declare const LoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type LoginCredentials = z.infer<typeof LoginSchema>;
export declare const RegisterSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    organizationName: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    organizationName?: string | undefined;
}, {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    organizationName?: string | undefined;
}>;
export type RegisterData = z.infer<typeof RegisterSchema>;
export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}
export interface AuthResponse {
    user: User;
    tokens: AuthTokens;
}
//# sourceMappingURL=user.d.ts.map