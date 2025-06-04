"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareLinkSchema = exports.ShareConfigSchema = exports.CollaborationSessionSchema = exports.CommentSchema = exports.CollaboratorSchema = exports.CursorPositionSchema = exports.CollaborationEvent = void 0;
const zod_1 = require("zod");
var CollaborationEvent;
(function (CollaborationEvent) {
    CollaborationEvent["USER_JOINED"] = "user_joined";
    CollaborationEvent["USER_LEFT"] = "user_left";
    CollaborationEvent["CURSOR_MOVED"] = "cursor_moved";
    CollaborationEvent["SELECTION_CHANGED"] = "selection_changed";
    CollaborationEvent["CONTENT_CHANGED"] = "content_changed";
    CollaborationEvent["COMMENT_ADDED"] = "comment_added";
    CollaborationEvent["COMMENT_RESOLVED"] = "comment_resolved";
})(CollaborationEvent || (exports.CollaborationEvent = CollaborationEvent = {}));
exports.CursorPositionSchema = zod_1.z.object({
    x: zod_1.z.number(),
    y: zod_1.z.number(),
    elementId: zod_1.z.string().optional()
});
exports.CollaboratorSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    avatar: zod_1.z.string().optional(),
    color: zod_1.z.string(),
    cursor: exports.CursorPositionSchema.optional(),
    lastActivity: zod_1.z.date(),
    permissions: zod_1.z.object({
        canEdit: zod_1.z.boolean(),
        canComment: zod_1.z.boolean(),
        canShare: zod_1.z.boolean()
    })
});
exports.CommentSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    content: zod_1.z.string(),
    authorId: zod_1.z.string().uuid(),
    targetId: zod_1.z.string(), // ID of the element being commented on
    targetType: zod_1.z.enum(['workflow', 'process', 'node', 'connection']),
    position: zod_1.z.object({
        x: zod_1.z.number(),
        y: zod_1.z.number()
    }).optional(),
    thread: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string(),
        content: zod_1.z.string(),
        authorId: zod_1.z.string().uuid(),
        createdAt: zod_1.z.date()
    })).default([]),
    resolved: zod_1.z.boolean().default(false),
    resolvedBy: zod_1.z.string().uuid().optional(),
    resolvedAt: zod_1.z.date().optional(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date()
});
exports.CollaborationSessionSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    resourceId: zod_1.z.string().uuid(),
    resourceType: zod_1.z.enum(['workflow', 'process', 'dashboard']),
    collaborators: zod_1.z.array(exports.CollaboratorSchema),
    comments: zod_1.z.array(exports.CommentSchema),
    createdAt: zod_1.z.date(),
    lastActivity: zod_1.z.date()
});
exports.ShareConfigSchema = zod_1.z.object({
    resourceId: zod_1.z.string().uuid(),
    resourceType: zod_1.z.enum(['workflow', 'process', 'dashboard']),
    shareType: zod_1.z.enum(['view', 'comment', 'edit']),
    expiresAt: zod_1.z.date().optional(),
    password: zod_1.z.string().optional(),
    allowDownload: zod_1.z.boolean().default(false),
    trackViews: zod_1.z.boolean().default(true)
});
exports.ShareLinkSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    token: zod_1.z.string(),
    config: exports.ShareConfigSchema,
    views: zod_1.z.number().default(0),
    lastAccessed: zod_1.z.date().optional(),
    createdBy: zod_1.z.string().uuid(),
    createdAt: zod_1.z.date()
});
//# sourceMappingURL=collaboration.js.map