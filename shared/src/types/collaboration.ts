import { z } from 'zod';

export enum CollaborationEvent {
  USER_JOINED = 'user_joined',
  USER_LEFT = 'user_left',
  CURSOR_MOVED = 'cursor_moved',
  SELECTION_CHANGED = 'selection_changed',
  CONTENT_CHANGED = 'content_changed',
  COMMENT_ADDED = 'comment_added',
  COMMENT_RESOLVED = 'comment_resolved'
}

export const CursorPositionSchema = z.object({
  x: z.number(),
  y: z.number(),
  elementId: z.string().optional()
});

export type CursorPosition = z.infer<typeof CursorPositionSchema>;

export const CollaboratorSchema = z.object({
  userId: z.string().uuid(),
  name: z.string(),
  avatar: z.string().optional(),
  color: z.string(),
  cursor: CursorPositionSchema.optional(),
  lastActivity: z.date(),
  permissions: z.object({
    canEdit: z.boolean(),
    canComment: z.boolean(),
    canShare: z.boolean()
  })
});

export type Collaborator = z.infer<typeof CollaboratorSchema>;

export const CommentSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  authorId: z.string().uuid(),
  targetId: z.string(), // ID of the element being commented on
  targetType: z.enum(['workflow', 'process', 'node', 'connection']),
  position: z.object({
    x: z.number(),
    y: z.number()
  }).optional(),
  thread: z.array(z.object({
    id: z.string(),
    content: z.string(),
    authorId: z.string().uuid(),
    createdAt: z.date()
  })).default([]),
  resolved: z.boolean().default(false),
  resolvedBy: z.string().uuid().optional(),
  resolvedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type Comment = z.infer<typeof CommentSchema>;

export const CollaborationSessionSchema = z.object({
  id: z.string().uuid(),
  resourceId: z.string().uuid(),
  resourceType: z.enum(['workflow', 'process', 'dashboard']),
  collaborators: z.array(CollaboratorSchema),
  comments: z.array(CommentSchema),
  createdAt: z.date(),
  lastActivity: z.date()
});

export type CollaborationSession = z.infer<typeof CollaborationSessionSchema>;

export const ShareConfigSchema = z.object({
  resourceId: z.string().uuid(),
  resourceType: z.enum(['workflow', 'process', 'dashboard']),
  shareType: z.enum(['view', 'comment', 'edit']),
  expiresAt: z.date().optional(),
  password: z.string().optional(),
  allowDownload: z.boolean().default(false),
  trackViews: z.boolean().default(true)
});

export type ShareConfig = z.infer<typeof ShareConfigSchema>;

export const ShareLinkSchema = z.object({
  id: z.string().uuid(),
  token: z.string(),
  config: ShareConfigSchema,
  views: z.number().default(0),
  lastAccessed: z.date().optional(),
  createdBy: z.string().uuid(),
  createdAt: z.date()
});

export type ShareLink = z.infer<typeof ShareLinkSchema>; 