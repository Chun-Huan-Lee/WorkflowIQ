import { z } from 'zod';
export declare enum CollaborationEvent {
    USER_JOINED = "user_joined",
    USER_LEFT = "user_left",
    CURSOR_MOVED = "cursor_moved",
    SELECTION_CHANGED = "selection_changed",
    CONTENT_CHANGED = "content_changed",
    COMMENT_ADDED = "comment_added",
    COMMENT_RESOLVED = "comment_resolved"
}
export declare const CursorPositionSchema: z.ZodObject<{
    x: z.ZodNumber;
    y: z.ZodNumber;
    elementId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    x: number;
    y: number;
    elementId?: string | undefined;
}, {
    x: number;
    y: number;
    elementId?: string | undefined;
}>;
export type CursorPosition = z.infer<typeof CursorPositionSchema>;
export declare const CollaboratorSchema: z.ZodObject<{
    userId: z.ZodString;
    name: z.ZodString;
    avatar: z.ZodOptional<z.ZodString>;
    color: z.ZodString;
    cursor: z.ZodOptional<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
        elementId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
        elementId?: string | undefined;
    }, {
        x: number;
        y: number;
        elementId?: string | undefined;
    }>>;
    lastActivity: z.ZodDate;
    permissions: z.ZodObject<{
        canEdit: z.ZodBoolean;
        canComment: z.ZodBoolean;
        canShare: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        canEdit: boolean;
        canComment: boolean;
        canShare: boolean;
    }, {
        canEdit: boolean;
        canComment: boolean;
        canShare: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    permissions: {
        canEdit: boolean;
        canComment: boolean;
        canShare: boolean;
    };
    userId: string;
    color: string;
    lastActivity: Date;
    avatar?: string | undefined;
    cursor?: {
        x: number;
        y: number;
        elementId?: string | undefined;
    } | undefined;
}, {
    name: string;
    permissions: {
        canEdit: boolean;
        canComment: boolean;
        canShare: boolean;
    };
    userId: string;
    color: string;
    lastActivity: Date;
    avatar?: string | undefined;
    cursor?: {
        x: number;
        y: number;
        elementId?: string | undefined;
    } | undefined;
}>;
export type Collaborator = z.infer<typeof CollaboratorSchema>;
export declare const CommentSchema: z.ZodObject<{
    id: z.ZodString;
    content: z.ZodString;
    authorId: z.ZodString;
    targetId: z.ZodString;
    targetType: z.ZodEnum<["workflow", "process", "node", "connection"]>;
    position: z.ZodOptional<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>>;
    thread: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        content: z.ZodString;
        authorId: z.ZodString;
        createdAt: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: Date;
        content: string;
        authorId: string;
    }, {
        id: string;
        createdAt: Date;
        content: string;
        authorId: string;
    }>, "many">>;
    resolved: z.ZodDefault<z.ZodBoolean>;
    resolvedBy: z.ZodOptional<z.ZodString>;
    resolvedAt: z.ZodOptional<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    content: string;
    authorId: string;
    targetId: string;
    targetType: "workflow" | "process" | "node" | "connection";
    thread: {
        id: string;
        createdAt: Date;
        content: string;
        authorId: string;
    }[];
    resolved: boolean;
    position?: {
        x: number;
        y: number;
    } | undefined;
    resolvedBy?: string | undefined;
    resolvedAt?: Date | undefined;
}, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    content: string;
    authorId: string;
    targetId: string;
    targetType: "workflow" | "process" | "node" | "connection";
    position?: {
        x: number;
        y: number;
    } | undefined;
    thread?: {
        id: string;
        createdAt: Date;
        content: string;
        authorId: string;
    }[] | undefined;
    resolved?: boolean | undefined;
    resolvedBy?: string | undefined;
    resolvedAt?: Date | undefined;
}>;
export type Comment = z.infer<typeof CommentSchema>;
export declare const CollaborationSessionSchema: z.ZodObject<{
    id: z.ZodString;
    resourceId: z.ZodString;
    resourceType: z.ZodEnum<["workflow", "process", "dashboard"]>;
    collaborators: z.ZodArray<z.ZodObject<{
        userId: z.ZodString;
        name: z.ZodString;
        avatar: z.ZodOptional<z.ZodString>;
        color: z.ZodString;
        cursor: z.ZodOptional<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
            elementId: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
            elementId?: string | undefined;
        }, {
            x: number;
            y: number;
            elementId?: string | undefined;
        }>>;
        lastActivity: z.ZodDate;
        permissions: z.ZodObject<{
            canEdit: z.ZodBoolean;
            canComment: z.ZodBoolean;
            canShare: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            canEdit: boolean;
            canComment: boolean;
            canShare: boolean;
        }, {
            canEdit: boolean;
            canComment: boolean;
            canShare: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        permissions: {
            canEdit: boolean;
            canComment: boolean;
            canShare: boolean;
        };
        userId: string;
        color: string;
        lastActivity: Date;
        avatar?: string | undefined;
        cursor?: {
            x: number;
            y: number;
            elementId?: string | undefined;
        } | undefined;
    }, {
        name: string;
        permissions: {
            canEdit: boolean;
            canComment: boolean;
            canShare: boolean;
        };
        userId: string;
        color: string;
        lastActivity: Date;
        avatar?: string | undefined;
        cursor?: {
            x: number;
            y: number;
            elementId?: string | undefined;
        } | undefined;
    }>, "many">;
    comments: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        content: z.ZodString;
        authorId: z.ZodString;
        targetId: z.ZodString;
        targetType: z.ZodEnum<["workflow", "process", "node", "connection"]>;
        position: z.ZodOptional<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>>;
        thread: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            content: z.ZodString;
            authorId: z.ZodString;
            createdAt: z.ZodDate;
        }, "strip", z.ZodTypeAny, {
            id: string;
            createdAt: Date;
            content: string;
            authorId: string;
        }, {
            id: string;
            createdAt: Date;
            content: string;
            authorId: string;
        }>, "many">>;
        resolved: z.ZodDefault<z.ZodBoolean>;
        resolvedBy: z.ZodOptional<z.ZodString>;
        resolvedAt: z.ZodOptional<z.ZodDate>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorId: string;
        targetId: string;
        targetType: "workflow" | "process" | "node" | "connection";
        thread: {
            id: string;
            createdAt: Date;
            content: string;
            authorId: string;
        }[];
        resolved: boolean;
        position?: {
            x: number;
            y: number;
        } | undefined;
        resolvedBy?: string | undefined;
        resolvedAt?: Date | undefined;
    }, {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorId: string;
        targetId: string;
        targetType: "workflow" | "process" | "node" | "connection";
        position?: {
            x: number;
            y: number;
        } | undefined;
        thread?: {
            id: string;
            createdAt: Date;
            content: string;
            authorId: string;
        }[] | undefined;
        resolved?: boolean | undefined;
        resolvedBy?: string | undefined;
        resolvedAt?: Date | undefined;
    }>, "many">;
    createdAt: z.ZodDate;
    lastActivity: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    lastActivity: Date;
    resourceId: string;
    resourceType: "dashboard" | "workflow" | "process";
    collaborators: {
        name: string;
        permissions: {
            canEdit: boolean;
            canComment: boolean;
            canShare: boolean;
        };
        userId: string;
        color: string;
        lastActivity: Date;
        avatar?: string | undefined;
        cursor?: {
            x: number;
            y: number;
            elementId?: string | undefined;
        } | undefined;
    }[];
    comments: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorId: string;
        targetId: string;
        targetType: "workflow" | "process" | "node" | "connection";
        thread: {
            id: string;
            createdAt: Date;
            content: string;
            authorId: string;
        }[];
        resolved: boolean;
        position?: {
            x: number;
            y: number;
        } | undefined;
        resolvedBy?: string | undefined;
        resolvedAt?: Date | undefined;
    }[];
}, {
    id: string;
    createdAt: Date;
    lastActivity: Date;
    resourceId: string;
    resourceType: "dashboard" | "workflow" | "process";
    collaborators: {
        name: string;
        permissions: {
            canEdit: boolean;
            canComment: boolean;
            canShare: boolean;
        };
        userId: string;
        color: string;
        lastActivity: Date;
        avatar?: string | undefined;
        cursor?: {
            x: number;
            y: number;
            elementId?: string | undefined;
        } | undefined;
    }[];
    comments: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorId: string;
        targetId: string;
        targetType: "workflow" | "process" | "node" | "connection";
        position?: {
            x: number;
            y: number;
        } | undefined;
        thread?: {
            id: string;
            createdAt: Date;
            content: string;
            authorId: string;
        }[] | undefined;
        resolved?: boolean | undefined;
        resolvedBy?: string | undefined;
        resolvedAt?: Date | undefined;
    }[];
}>;
export type CollaborationSession = z.infer<typeof CollaborationSessionSchema>;
export declare const ShareConfigSchema: z.ZodObject<{
    resourceId: z.ZodString;
    resourceType: z.ZodEnum<["workflow", "process", "dashboard"]>;
    shareType: z.ZodEnum<["view", "comment", "edit"]>;
    expiresAt: z.ZodOptional<z.ZodDate>;
    password: z.ZodOptional<z.ZodString>;
    allowDownload: z.ZodDefault<z.ZodBoolean>;
    trackViews: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    resourceId: string;
    resourceType: "dashboard" | "workflow" | "process";
    shareType: "view" | "comment" | "edit";
    allowDownload: boolean;
    trackViews: boolean;
    password?: string | undefined;
    expiresAt?: Date | undefined;
}, {
    resourceId: string;
    resourceType: "dashboard" | "workflow" | "process";
    shareType: "view" | "comment" | "edit";
    password?: string | undefined;
    expiresAt?: Date | undefined;
    allowDownload?: boolean | undefined;
    trackViews?: boolean | undefined;
}>;
export type ShareConfig = z.infer<typeof ShareConfigSchema>;
export declare const ShareLinkSchema: z.ZodObject<{
    id: z.ZodString;
    token: z.ZodString;
    config: z.ZodObject<{
        resourceId: z.ZodString;
        resourceType: z.ZodEnum<["workflow", "process", "dashboard"]>;
        shareType: z.ZodEnum<["view", "comment", "edit"]>;
        expiresAt: z.ZodOptional<z.ZodDate>;
        password: z.ZodOptional<z.ZodString>;
        allowDownload: z.ZodDefault<z.ZodBoolean>;
        trackViews: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        resourceId: string;
        resourceType: "dashboard" | "workflow" | "process";
        shareType: "view" | "comment" | "edit";
        allowDownload: boolean;
        trackViews: boolean;
        password?: string | undefined;
        expiresAt?: Date | undefined;
    }, {
        resourceId: string;
        resourceType: "dashboard" | "workflow" | "process";
        shareType: "view" | "comment" | "edit";
        password?: string | undefined;
        expiresAt?: Date | undefined;
        allowDownload?: boolean | undefined;
        trackViews?: boolean | undefined;
    }>;
    views: z.ZodDefault<z.ZodNumber>;
    lastAccessed: z.ZodOptional<z.ZodDate>;
    createdBy: z.ZodString;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    config: {
        resourceId: string;
        resourceType: "dashboard" | "workflow" | "process";
        shareType: "view" | "comment" | "edit";
        allowDownload: boolean;
        trackViews: boolean;
        password?: string | undefined;
        expiresAt?: Date | undefined;
    };
    createdBy: string;
    token: string;
    views: number;
    lastAccessed?: Date | undefined;
}, {
    id: string;
    createdAt: Date;
    config: {
        resourceId: string;
        resourceType: "dashboard" | "workflow" | "process";
        shareType: "view" | "comment" | "edit";
        password?: string | undefined;
        expiresAt?: Date | undefined;
        allowDownload?: boolean | undefined;
        trackViews?: boolean | undefined;
    };
    createdBy: string;
    token: string;
    views?: number | undefined;
    lastAccessed?: Date | undefined;
}>;
export type ShareLink = z.infer<typeof ShareLinkSchema>;
//# sourceMappingURL=collaboration.d.ts.map