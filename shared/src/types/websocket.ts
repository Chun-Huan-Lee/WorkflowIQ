import { z } from 'zod';
import { CollaborationEvent } from './collaboration';

export enum WebSocketEventType {
  CONNECTION = 'connection',
  DISCONNECTION = 'disconnection',
  JOIN_ROOM = 'join_room',
  LEAVE_ROOM = 'leave_room',
  COLLABORATION = 'collaboration',
  WORKFLOW_UPDATE = 'workflow_update',
  PROCESS_UPDATE = 'process_update',
  NOTIFICATION = 'notification',
  HEARTBEAT = 'heartbeat'
}

export const WebSocketMessageSchema = z.object({
  id: z.string().uuid(),
  type: z.nativeEnum(WebSocketEventType),
  event: z.string().optional(),
  payload: z.record(z.any()),
  timestamp: z.date(),
  userId: z.string().uuid().optional(),
  roomId: z.string().optional()
});

export type WebSocketMessage = z.infer<typeof WebSocketMessageSchema>;

export const CollaborationMessageSchema = z.object({
  type: z.literal(WebSocketEventType.COLLABORATION),
  event: z.nativeEnum(CollaborationEvent),
  payload: z.object({
    userId: z.string().uuid(),
    resourceId: z.string().uuid(),
    resourceType: z.enum(['workflow', 'process', 'dashboard']),
    data: z.record(z.any())
  })
});

export type CollaborationMessage = z.infer<typeof CollaborationMessageSchema>;

export const WorkflowUpdateMessageSchema = z.object({
  type: z.literal(WebSocketEventType.WORKFLOW_UPDATE),
  payload: z.object({
    workflowId: z.string().uuid(),
    updateType: z.enum(['node_added', 'node_removed', 'node_updated', 'connection_added', 'connection_removed']),
    data: z.record(z.any()),
    userId: z.string().uuid()
  })
});

export type WorkflowUpdateMessage = z.infer<typeof WorkflowUpdateMessageSchema>;

export const NotificationMessageSchema = z.object({
  type: z.literal(WebSocketEventType.NOTIFICATION),
  payload: z.object({
    id: z.string().uuid(),
    title: z.string(),
    message: z.string(),
    level: z.enum(['info', 'success', 'warning', 'error']),
    targetUserId: z.string().uuid().optional(),
    actionUrl: z.string().optional(),
    metadata: z.record(z.any()).optional()
  })
});

export type NotificationMessage = z.infer<typeof NotificationMessageSchema>;

export const RoomJoinMessageSchema = z.object({
  type: z.literal(WebSocketEventType.JOIN_ROOM),
  payload: z.object({
    roomId: z.string(),
    roomType: z.enum(['workflow', 'process', 'dashboard']),
    userId: z.string().uuid(),
    permissions: z.object({
      canEdit: z.boolean(),
      canComment: z.boolean(),
      canShare: z.boolean()
    })
  })
});

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