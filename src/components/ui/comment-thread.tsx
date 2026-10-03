"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  MessageSquare,
  Reply,
  Heart,
  ThumbsUp,
  MoreHorizontal,
  Edit2,
  Trash2,
  CornerDownRight,
  Send,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

export interface CommentAuthor {
  id: string
  name: string
  avatar?: string
  initials?: string
  badge?: "Author" | "Team" | "Contributor" | "Maintainer"
}

export interface CommentItem {
  id: string
  author: CommentAuthor
  content: string
  timestamp: string
  likes?: number
  hasLiked?: boolean
  isEdited?: boolean
  replies?: CommentItem[]
}

export interface CommentThreadProps extends React.HTMLAttributes<HTMLDivElement> {
  initialComments?: CommentItem[]
  currentUser?: CommentAuthor
  onAddComment?: (content: string, parentId?: string) => void
  onEditComment?: (id: string, newContent: string) => void
  onDeleteComment?: (id: string) => void
  onLikeComment?: (id: string) => void
  allowNesting?: boolean
}

const DEFAULT_COMMENTS: CommentItem[] = [
  {
    id: "c-1",
    author: {
      id: "u-1",
      name: "Dhruv Kolhe",
      initials: "DK",
      badge: "Author",
    },
    content:
      "Batch 13 introduces collaboration tools including real-time simulated presence, diff viewers, and sandboxed developer consoles.",
    timestamp: "2 hours ago",
    likes: 8,
    hasLiked: true,
    replies: [
      {
        id: "c-1-1",
        author: {
          id: "u-2",
          name: "Sarah Chen",
          initials: "SC",
          badge: "Team",
        },
        content:
          "The diff viewer split and unified modes work wonderfully across mobile and desktop breakpoints.",
        timestamp: "1 hour ago",
        likes: 3,
        replies: [
          {
            id: "c-1-1-1",
            author: {
              id: "u-3",
              name: "Alex Rivera",
              initials: "AR",
              badge: "Contributor",
            },
            content: "Agreed! And the terminal emulator command history navigation feels snappy.",
            timestamp: "30m ago",
            likes: 2,
          },
        ],
      },
      {
        id: "c-1-2",
        author: {
          id: "u-4",
          name: "Elena Rostova",
          initials: "ER",
        },
        content: "Make sure all props extend HTMLAttributes without clashing onChange types.",
        timestamp: "45m ago",
        likes: 1,
      },
    ],
  },
  {
    id: "c-2",
    author: {
      id: "u-5",
      name: "Marcus Vance",
      initials: "MV",
      badge: "Maintainer",
    },
    content: "Reviewed the accessibility requirements. Keyboard reply forms and aria roles look solid.",
    timestamp: "3 hours ago",
    likes: 5,
    replies: [],
  },
]

export const CommentThread = React.forwardRef<HTMLDivElement, CommentThreadProps>(
  (
    {
      className,
      initialComments = DEFAULT_COMMENTS,
      currentUser = { id: "current-user", name: "You", initials: "ME", badge: "Team" },
      onAddComment,
      onEditComment,
      onDeleteComment,
      onLikeComment,
      allowNesting = true,
      ...props
    },
    ref
  ) => {
    const [comments, setComments] = React.useState<CommentItem[]>(initialComments)
    const [replyingToId, setReplyingToId] = React.useState<string | null>(null)
    const [replyText, setReplyText] = React.useState("")
    const [newTopComment, setNewTopComment] = React.useState("")
    const [editingCommentId, setEditingCommentId] = React.useState<string | null>(null)
    const [editText, setEditText] = React.useState("")
    const [collapsedIds, setCollapsedIds] = React.useState<Set<string>>(new Set())

    // Helper: Recursively add reply
    const addReplyRecursive = (items: CommentItem[], parentId: string, newReply: CommentItem): CommentItem[] => {
      return items.map((item) => {
        if (item.id === parentId) {
          return {
            ...item,
            replies: [...(item.replies || []), newReply],
          }
        }
        if (item.replies && item.replies.length > 0) {
          return {
            ...item,
            replies: addReplyRecursive(item.replies, parentId, newReply),
          }
        }
        return item
      })
    }

    // Helper: Recursively edit comment
    const editRecursive = (items: CommentItem[], targetId: string, newText: string): CommentItem[] => {
      return items.map((item) => {
        if (item.id === targetId) {
          return {
            ...item,
            content: newText,
            isEdited: true,
          }
        }
        if (item.replies && item.replies.length > 0) {
          return {
            ...item,
            replies: editRecursive(item.replies, targetId, newText),
          }
        }
        return item
      })
    }

    // Helper: Recursively delete comment
    const deleteRecursive = (items: CommentItem[], targetId: string): CommentItem[] => {
      return items
        .filter((item) => item.id !== targetId)
        .map((item) => {
          if (item.replies && item.replies.length > 0) {
            return {
              ...item,
              replies: deleteRecursive(item.replies, targetId),
            }
          }
          return item
        })
    }

    // Helper: Recursively toggle like
    const toggleLikeRecursive = (items: CommentItem[], targetId: string): CommentItem[] => {
      return items.map((item) => {
        if (item.id === targetId) {
          const hasLiked = !item.hasLiked
          return {
            ...item,
            hasLiked,
            likes: (item.likes || 0) + (hasLiked ? 1 : -1),
          }
        }
        if (item.replies && item.replies.length > 0) {
          return {
            ...item,
            replies: toggleLikeRecursive(item.replies, targetId),
          }
        }
        return item
      })
    }

    const handleSendTopComment = (e: React.FormEvent) => {
      e.preventDefault()
      if (!newTopComment.trim()) return
      const created: CommentItem = {
        id: `c-${Date.now()}`,
        author: currentUser,
        content: newTopComment.trim(),
        timestamp: "Just now",
        likes: 0,
        replies: [],
      }
      setComments((prev) => [created, ...prev])
      onAddComment?.(newTopComment.trim())
      setNewTopComment("")
    }

    const handleSendReply = (parentId: string) => {
      if (!replyText.trim()) return
      const created: CommentItem = {
        id: `r-${Date.now()}`,
        author: currentUser,
        content: replyText.trim(),
        timestamp: "Just now",
        likes: 0,
        replies: [],
      }
      setComments((prev) => addReplyRecursive(prev, parentId, created))
      onAddComment?.(replyText.trim(), parentId)
      setReplyingToId(null)
      setReplyText("")
    }

    const handleSaveEdit = (targetId: string) => {
      if (!editText.trim()) return
      setComments((prev) => editRecursive(prev, targetId, editText.trim()))
      onEditComment?.(targetId, editText.trim())
      setEditingCommentId(null)
      setEditText("")
    }

    const handleDelete = (targetId: string) => {
      setComments((prev) => deleteRecursive(prev, targetId))
      onDeleteComment?.(targetId)
    }

    const handleToggleLike = (targetId: string) => {
      setComments((prev) => toggleLikeRecursive(prev, targetId))
      onLikeComment?.(targetId)
    }

    const toggleCollapse = (id: string) => {
      setCollapsedIds((prev) => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      })
    }

    // Render a single comment and its recursive replies
    const renderComment = (comment: CommentItem, depth = 0) => {
      const isReplying = replyingToId === comment.id
      const isEditing = editingCommentId === comment.id
      const isCollapsed = collapsedIds.has(comment.id)
      const hasReplies = comment.replies && comment.replies.length > 0

      return (
        <div key={comment.id} className={cn("space-y-3", depth > 0 && "ml-4 sm:ml-8 border-l border-border pl-3 sm:pl-4")}>
          <div className="rounded-xl border border-border bg-card p-3.5 space-y-2.5 text-xs text-card-foreground shadow-2xs transition-colors">
            {/* Author bar */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="h-6 w-6 rounded-full bg-primary/10 border border-border flex items-center justify-center font-bold text-[10px] text-primary shrink-0">
                  {comment.author.initials || comment.author.name.slice(0, 2).toUpperCase()}
                </div>
                <span className="font-semibold text-foreground">{comment.author.name}</span>
                {comment.author.badge && (
                  <span className="px-1.5 py-0.2 rounded-full border border-primary/20 bg-primary/10 text-primary text-[10px] font-semibold">
                    {comment.author.badge}
                  </span>
                )}
                <span className="text-[11px] text-muted-foreground font-mono">
                  • {comment.timestamp}
                </span>
                {comment.isEdited && (
                  <span className="text-[10px] text-muted-foreground italic">(edited)</span>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1">
                {hasReplies && (
                  <button
                    type="button"
                    onClick={() => toggleCollapse(comment.id)}
                    className="p-1 rounded text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    title={isCollapsed ? "Expand replies" : "Collapse replies"}
                    aria-label={isCollapsed ? "Expand replies" : "Collapse replies"}
                  >
                    {isCollapsed ? (
                      <ChevronDown className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronUp className="h-3.5 w-3.5" />
                    )}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setEditingCommentId(comment.id)
                    setEditText(comment.content)
                  }}
                  className="p-1 rounded text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  title="Edit comment"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(comment.id)}
                  className="p-1 rounded text-muted-foreground hover:bg-rose-500/10 hover:text-rose-500 transition-colors"
                  title="Delete comment"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Comment Body */}
            {isEditing ? (
              <div className="space-y-2 pt-1">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full p-2 text-xs rounded-lg border border-input bg-background focus:outline-hidden focus:ring-1 focus:ring-ring"
                  rows={2}
                />
                <div className="flex items-center gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingCommentId(null)}
                    className="px-2.5 py-1 text-xs rounded border border-border text-muted-foreground hover:bg-muted"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSaveEdit(comment.id)}
                    className="px-2.5 py-1 text-xs rounded bg-primary text-primary-foreground font-semibold"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs leading-relaxed text-foreground whitespace-pre-wrap">
                {comment.content}
              </p>
            )}

            {/* Bottom Reactions and Reply Trigger */}
            <div className="flex items-center gap-3 pt-1 border-t border-border/50 text-[11px] text-muted-foreground">
              <button
                type="button"
                onClick={() => handleToggleLike(comment.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full transition-colors",
                  comment.hasLiked
                    ? "bg-rose-500/10 text-rose-600 font-semibold dark:text-rose-400"
                    : "hover:bg-muted hover:text-foreground"
                )}
              >
                <Heart className={cn("h-3 w-3", comment.hasLiked && "fill-current")} />
                <span>{comment.likes || 0}</span>
              </button>

              {allowNesting && (
                <button
                  type="button"
                  onClick={() => {
                    setReplyingToId(isReplying ? null : comment.id)
                    setReplyText("")
                  }}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full hover:bg-muted hover:text-foreground transition-colors font-medium"
                >
                  <Reply className="h-3 w-3" />
                  <span>Reply</span>
                </button>
              )}
            </div>
          </div>

          {/* Reply Form */}
          {isReplying && (
            <div className="ml-4 sm:ml-8 flex items-start gap-2 pt-1 animate-in fade-in-50">
              <CornerDownRight className="h-4 w-4 text-muted-foreground shrink-0 mt-2" />
              <div className="flex-1 space-y-2">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Reply to ${comment.author.name}...`}
                  className="w-full p-2.5 text-xs rounded-lg border border-input bg-background focus:outline-hidden focus:ring-1 focus:ring-ring"
                  rows={2}
                  autoFocus
                />
                <div className="flex items-center gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setReplyingToId(null)}
                    className="px-2.5 py-1 text-xs rounded border border-border text-muted-foreground hover:bg-muted"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSendReply(comment.id)}
                    className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded bg-primary text-primary-foreground font-semibold"
                  >
                    <Send className="h-3 w-3" />
                    <span>Send Reply</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Nested Replies */}
          {hasReplies && !isCollapsed && (
            <div className="space-y-3 pt-1">
              {comment.replies!.map((sub) => renderComment(sub, depth + 1))}
            </div>
          )}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-2xl mx-auto rounded-xl border border-border bg-card shadow-sm p-4 sm:p-6 space-y-6 text-card-foreground",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold tracking-tight">Discussion Thread</h3>
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            {comments.length} top comments
          </span>
        </div>

        {/* Top-level Comment Input Box */}
        <form onSubmit={handleSendTopComment} className="space-y-2.5">
          <div className="relative">
            <textarea
              value={newTopComment}
              onChange={(e) => setNewTopComment(e.target.value)}
              placeholder="Join the discussion or leave a note..."
              rows={3}
              className="w-full p-3 text-xs rounded-xl border border-input bg-background placeholder:text-muted-foreground/70 focus:outline-hidden focus:ring-1 focus:ring-ring transition-all"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">
              Markdown formatting supported (demo mode)
            </span>
            <button
              type="submit"
              disabled={!newTopComment.trim()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Comment</span>
            </button>
          </div>
        </form>

        {/* Comments Feed */}
        <div className="space-y-4 pt-2">
          {comments.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground text-xs">
              No comments yet. Be the first to start the conversation!
            </div>
          ) : (
            comments.map((c) => renderComment(c, 0))
          )}
        </div>
      </div>
    )
  }
)

CommentThread.displayName = "CommentThread"
