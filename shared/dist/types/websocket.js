"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomJoinMessageSchema = exports.NotificationMessageSchema = exports.WorkflowUpdateMessageSchema = exports.CollaborationMessageSchema = exports.WebSocketMessageSchema = exports.WebSocketEventType = void 0;
const zod_1 = require("zod");
const collaboration_1 = require("./collaboration");
var WebSocketEventType;
(function (WebSocketEventType) {
    WebSocketEventType["CONNECTION"] = "connection";
    WebSocketEventType["DISCONNECTION"] = "disconnection";
    WebSocketEventType["JOIN_ROOM"] = "join_room";
    WebSocketEventType["LEAVE_ROOM"] = "leave_room";
    WebSocketEventType["COLLABORATION"] = "collaboration";
    WebSocketEventType["WORKFLOW_UPDATE"] = "workflow_update";
    WebSocketEventType["PROCESS_UPDATE"] = "process_update";
    WebSocketEventType["NOTIFICATION"] = "notification";
    WebSocketEventType["HEARTBEAT"] = "heartbeat";
})(WebSocketEventType || (exports.WebSocketEventType = WebSocketEventType = {}));
exports.WebSocketMessageSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    type: zod_1.z.nativeEnum(WebSocketEventType),
    event: zod_1.z.string().optional(),
    payload: zod_1.z.record(zod_1.z.any()),
    timestamp: zod_1.z.date(),
    userId: zod_1.z.string().uuid().optional(),
    roomId: zod_1.z.string().optional()
});
exports.CollaborationMessageSchema = zod_1.z.object({
    type: zod_1.z.literal(WebSocketEventType.COLLABORATION),
    event: zod_1.z.nativeEnum(collaboration_1.CollaborationEvent),
    payload: zod_1.z.object({
        userId: zod_1.z.string().uuid(),
        resourceId: zod_1.z.string().uuid(),
        resourceType: zod_1.z.enum(['workflow', 'process', 'dashboard']),
        data: zod_1.z.record(zod_1.z.any())
    })
});
exports.WorkflowUpdateMessageSchema = zod_1.z.object({
    type: zod_1.z.literal(WebSocketEventType.WORKFLOW_UPDATE),
    payload: zod_1.z.object({
        workflowId: zod_1.z.string().uuid(),
        updateType: zod_1.z.enum(['node_added', 'node_removed', 'node_updated', 'connection_added', 'connection_removed']),
        data: zod_1.z.record(zod_1.z.any()),
        userId: zod_1.z.string().uuid()
    })
});
exports.NotificationMessageSchema = zod_1.z.object({
    type: zod_1.z.literal(WebSocketEventType.NOTIFICATION),
    payload: zod_1.z.object({
        id: zod_1.z.string().uuid(),
        title: zod_1.z.string(),
        message: zod_1.z.string(),
        level: zod_1.z.enum(['info', 'success', 'warning', 'error']),
        targetUserId: zod_1.z.string().uuid().optional(),
        actionUrl: zod_1.z.string().optional(),
        metadata: zod_1.z.record(zod_1.z.any()).optional()
    })
});
exports.RoomJoinMessageSchema = zod_1.z.object({
    type: zod_1.z.literal(WebSocketEventType.JOIN_ROOM),
    payload: zod_1.z.object({
        roomId: zod_1.z.string(),
        roomType: zod_1.z.enum(['workflow', 'process', 'dashboard']),
        userId: zod_1.z.string().uuid(),
        permissions: zod_1.z.object({
            canEdit: zod_1.z.boolean(),
            canComment: zod_1.z.boolean(),
            canShare: zod_1.z.boolean()
        })
    })
});
//# sourceMappingURL=websocket.js.map