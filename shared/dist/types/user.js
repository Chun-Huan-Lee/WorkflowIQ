"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterSchema = exports.LoginSchema = exports.UpdateUserSchema = exports.CreateUserSchema = exports.UserSchema = exports.UserStatus = exports.UserRole = void 0;
const zod_1 = require("zod");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["MANAGER"] = "manager";
    UserRole["ANALYST"] = "analyst";
    UserRole["VIEWER"] = "viewer";
})(UserRole || (exports.UserRole = UserRole = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "active";
    UserStatus["INACTIVE"] = "inactive";
    UserStatus["PENDING"] = "pending";
    UserStatus["SUSPENDED"] = "suspended";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    email: zod_1.z.string().email(),
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
    role: zod_1.z.nativeEnum(UserRole),
    status: zod_1.z.nativeEnum(UserStatus),
    organizationId: zod_1.z.string().uuid(),
    avatar: zod_1.z.string().url().optional(),
    bio: zod_1.z.string().optional(),
    timezone: zod_1.z.string().default('UTC'),
    preferences: zod_1.z.object({
        notifications: zod_1.z.object({
            email: zod_1.z.boolean().default(true),
            inApp: zod_1.z.boolean().default(true),
            processUpdates: zod_1.z.boolean().default(true),
            collaborationUpdates: zod_1.z.boolean().default(true)
        }),
        dashboard: zod_1.z.object({
            defaultView: zod_1.z.enum(['grid', 'list']).default('grid'),
            itemsPerPage: zod_1.z.number().min(10).max(100).default(20)
        })
    }).optional(),
    lastLoginAt: zod_1.z.date().optional(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date()
});
exports.CreateUserSchema = exports.UserSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    lastLoginAt: true
});
exports.UpdateUserSchema = exports.CreateUserSchema.partial();
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8)
});
exports.RegisterSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
    organizationName: zod_1.z.string().min(1).optional()
});
//# sourceMappingURL=user.js.map