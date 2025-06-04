import { z } from 'zod';
import { CollaborationEvent } from './collaboration';
export declare enum WebSocketEventType {
    CONNECTION = "connection",
    DISCONNECTION = "disconnection",
    JOIN_ROOM = "join_room",
    LEAVE_ROOM = "leave_room",
    COLLABORATION = "collaboration",
    WORKFLOW_UPDATE = "workflow_update",
    PROCESS_UPDATE = "process_update",
    NOTIFICATION = "notification",
    HEARTBEAT = "heartbeat"
}
export declare const WebSocketMessageSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodNativeEnum<typeof WebSocketEventType>;
    event: z.ZodOptional<z.ZodString>;
    payload: z.ZodRecord<z.ZodString, z.ZodAny>;
    timestamp: z.ZodDate;
    userId: z.ZodOptional<z.ZodString>;
    roomId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: WebSocketEventType;
    timestamp: Date;
    payload: Record<string, any>;
    userId?: string | undefined;
    event?: string | undefined;
    roomId?: string | undefined;
}, {
    id: string;
    type: WebSocketEventType;
    timestamp: Date;
    payload: Record<string, any>;
    userId?: string | undefined;
    event?: string | undefined;
    roomId?: string | undefined;
}>;
export type WebSocketMessage = z.infer<typeof WebSocketMessageSchema>;
export declare const CollaborationMessageSchema: z.ZodObject<{
    type: z.ZodLiteral<WebSocketEventType.COLLABORATION>;
    event: z.ZodNativeEnum<typeof CollaborationEvent>;
    payload: z.ZodObject<{
        userId: z.ZodString;
        resourceId: z.ZodString;
        resourceType: z.ZodEnum<["workflow", "process", "dashboard"]>;
        data: z.ZodRecord<z.ZodString, z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        data: Record<string, any>;
        userId: string;
        resourceId: string;
        resourceType: "dashboard" | "workflow" | "process";
    }, {
        data: Record<string, any>;
        userId: string;
        resourceId: string;
        resourceType: "dashboard" | "workflow" | "process";
    }>;
}, "strip", z.ZodTypeAny, {
    type: WebSocketEventType.COLLABORATION;
    event: CollaborationEvent;
    payload: {
        data: Record<string, any>;
        userId: string;
        resourceId: string;
        resourceType: "dashboard" | "workflow" | "process";
    };
}, {
    type: WebSocketEventType.COLLABORATION;
    event: CollaborationEvent;
    payload: {
        data: Record<string, any>;
        userId: string;
        resourceId: string;
        resourceType: "dashboard" | "workflow" | "process";
    };
}>;
export type CollaborationMessage = z.infer<typeof CollaborationMessageSchema>;
export declare const WorkflowUpdateMessageSchema: z.ZodObject<{
    type: z.ZodLiteral<WebSocketEventType.WORKFLOW_UPDATE>;
    payload: z.ZodObject<{
        workflowId: z.ZodString;
        updateType: z.ZodEnum<["node_added", "node_removed", "node_updated", "connection_added", "connection_removed"]>;
        data: z.ZodRecord<z.ZodString, z.ZodAny>;
        userId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        data: Record<string, any>;
        workflowId: string;
        userId: string;
        updateType: "node_added" | "node_removed" | "node_updated" | "connection_added" | "connection_removed";
    }, {
        data: Record<string, any>;
        workflowId: string;
        userId: string;
        updateType: "node_added" | "node_removed" | "node_updated" | "connection_added" | "connection_removed";
    }>;
}, "strip", z.ZodTypeAny, {
    type: WebSocketEventType.WORKFLOW_UPDATE;
    payload: {
        data: Record<string, any>;
        workflowId: string;
        userId: string;
        updateType: "node_added" | "node_removed" | "node_updated" | "connection_added" | "connection_removed";
    };
}, {
    type: WebSocketEventType.WORKFLOW_UPDATE;
    payload: {
        data: Record<string, any>;
        workflowId: string;
        userId: string;
        updateType: "node_added" | "node_removed" | "node_updated" | "connection_added" | "connection_removed";
    };
}>;
export type WorkflowUpdateMessage = z.infer<typeof WorkflowUpdateMessageSchema>;
export declare const NotificationMessageSchema: z.ZodObject<{
    type: z.ZodLiteral<WebSocketEventType.NOTIFICATION>;
    payload: z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        message: z.ZodString;
        level: z.ZodEnum<["info", "success", "warning", "error"]>;
        targetUserId: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        message: string;
        title: string;
        level: "error" | "info" | "success" | "warning";
        metadata?: Record<string, any> | undefined;
        targetUserId?: string | undefined;
        actionUrl?: string | undefined;
    }, {
        id: string;
        message: string;
        title: string;
        level: "error" | "info" | "success" | "warning";
        metadata?: Record<string, any> | undefined;
        targetUserId?: string | undefined;
        actionUrl?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: WebSocketEventType.NOTIFICATION;
    payload: {
        id: string;
        message: string;
        title: string;
        level: "error" | "info" | "success" | "warning";
        metadata?: Record<string, any> | undefined;
        targetUserId?: string | undefined;
        actionUrl?: string | undefined;
    };
}, {
    type: WebSocketEventType.NOTIFICATION;
    payload: {
        id: string;
        message: string;
        title: string;
        level: "error" | "info" | "success" | "warning";
        metadata?: Record<string, any> | undefined;
        targetUserId?: string | undefined;
        actionUrl?: string | undefined;
    };
}>;
export type NotificationMessage = z.infer<typeof NotificationMessageSchema>;
export declare const RoomJoinMessageSchema: z.ZodObject<{
    type: z.ZodLiteral<WebSocketEventType.JOIN_ROOM>;
    payload: z.ZodObject<{
        roomId: z.ZodString;
        roomType: z.ZodEnum<["workflow", "process", "dashboard"]>;
        userId: z.ZodString;
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
        permissions: {
            canEdit: boolean;
            canComment: boolean;
            canShare: boolean;
        };
        userId: string;
        roomId: string;
        roomType: "dashboard" | "workflow" | "process";
    }, {
        permissions: {
            canEdit: boolean;
            canComment: boolean;
            canShare: boolean;
        };
        userId: string;
        roomId: string;
        roomType: "dashboard" | "workflow" | "process";
    }>;
}, "strip", z.ZodTypeAny, {
    type: WebSocketEventType.JOIN_ROOM;
    payload: {
        permissions: {
            canEdit: boolean;
            canComment: boolean;
            canShare: boolean;
        };
        userId: string;
        roomId: string;
        roomType: "dashboard" | "workflow" | "process";
    };
}, {
    type: WebSocketEventType.JOIN_ROOM;
    payload: {
        permissions: {
            canEdit: boolean;
            canComment: boolean;
            canShare: boolean;
        };
        userId: string;
        roomId: string;
        roomType: "dashboard" | "workflow" | "process";
    };
}>;
export type RoomJoinMessage = z.infer<typeof RoomJoinMessageSchema>;
export interface WebSocketClient {
    id: string;
    userId?: string;
    rooms: Set<string>;
    lastHeartbeat: Date;
    permissions: Record<string, any>;
}
export interface WebSocketRoom {
    id: string;
    resourceType: 'workflow' | 'process' | 'dashboard';
    resourceId: string;
    clients: Set<string>;
    metadata: Record<string, any>;
    createdAt: Date;
    lastActivity: Date;
}
//# sourceMappingURL=websocket.d.ts.map