"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Check,
  CheckCheck,
  Clock,
  AlertCircle,
  Copy,
  CornerDownRight,
  Trash2,
  FileText,
  Image as ImageIcon,
  Download,
} from "lucide-react"

export type MessageStatus = "sending" | "sent" | "delivered" | "read" | "error"

export interface MessageAttachment {
  id: string
  name: string
  size?: number
  type?: "image" | "file"
  url?: string
}

export interface ChatMessageData {
  id: string
  sender: {
    id: string
    name: string
    avatar?: string
    role?: string
  }
  content: string
  timestamp: string // "10:42 AM"
  status?: MessageStatus
  attachments?: MessageAttachment[]
  isSystem?: boolean
}

export interface ChatMessageProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onCopy"> {
  message: ChatMessageData
  isOutgoing?: boolean
  showAvatar?: boolean
  onCopy?: (message: ChatMessageData) => void
  onReply?: (message: ChatMessageData) => void
  onDelete?: (messageId: string) => void
}

export const ChatMessage = React.forwardRef<HTMLDivElement, ChatMessageProps>(
  (
    {
      className,
      message,
      isOutgoing = false,
      showAvatar = true,
      onCopy,
      onReply,
      onDelete,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = () => {
      navigator.clipboard?.writeText(message.content)
      setCopied(true)
      onCopy?.(message)
      setTimeout(() => setCopied(false), 2000)
    }

    if (message.isSystem) {
      return (
        <div
          ref={ref}
          role="status"
          className={cn(
            "flex items-center justify-center gap-2 py-2 text-center text-xs text-muted-foreground",
            className
          )}
          {...props}
        >
          <div className="h-[1px] flex-1 bg-border/60" />
          <span className="rounded-full bg-muted/60 px-3 py-0.5 text-[11px] font-medium">
            {message.content}
          </span>
          <div className="h-[1px] flex-1 bg-border/60" />
        </div>
      )
    }

    const renderStatusIcon = () => {
      switch (message.status) {
        case "sending":
          return <Clock className="h-3 w-3 text-muted-foreground animate-spin" />
        case "sent":
          return <Check className="h-3 w-3 text-muted-foreground" />
        case "delivered":
          return <CheckCheck className="h-3 w-3 text-muted-foreground" />
        case "read":
          return <CheckCheck className="h-3 w-3 text-primary font-bold" />
        case "error":
          return <AlertCircle className="h-3 w-3 text-destructive" />
        default:
          return null
      }
    }

    return (
      <div
        ref={ref}
        role="article"
        aria-label={`Message from ${message.sender.name}`}
        className={cn(
          "group relative flex items-start gap-2.5 py-1 text-xs select-text",
          isOutgoing ? "flex-row-reverse" : "flex-row",
          className
        )}
        {...props}
      >
        {/* Avatar */}
        {showAvatar && (
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full border text-[11px] font-bold shrink-0 uppercase select-none",
              isOutgoing
                ? "border-primary/20 bg-primary/10 text-primary"
                : "border-border bg-muted text-muted-foreground"
            )}
          >
            {message.sender.avatar ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={message.sender.avatar}
                alt={message.sender.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              message.sender.name.slice(0, 2)
            )}
          </div>
        )}

        {/* Message Bubble Column */}
        <div
          className={cn(
            "flex max-w-[85%] sm:max-w-[70%] flex-col space-y-1",
            isOutgoing ? "items-end" : "items-start"
          )}
        >
          {/* Sender Header */}
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground px-1 select-none">
            <span className="font-semibold text-foreground">{message.sender.name}</span>
            {message.sender.role && (
              <span className="rounded bg-muted px-1 text-[9px] font-mono">
                {message.sender.role}
              </span>
            )}
            <span>•</span>
            <span className="font-mono">{message.timestamp}</span>
          </div>

          {/* Bubble */}
          <div
            className={cn(
              "relative rounded-2xl px-3.5 py-2.5 shadow-2xs leading-relaxed text-xs break-words",
              isOutgoing
                ? "bg-primary text-primary-foreground rounded-tr-xs"
                : "bg-muted/70 text-foreground border border-border/60 rounded-tl-xs"
            )}
          >
            <p className="whitespace-pre-wrap">{message.content}</p>

            {/* Attachments List */}
            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-2 space-y-1 pt-1 border-t border-current/20">
                {message.attachments.map((att) => (
                  <div
                    key={att.id}
                    className="flex items-center gap-2 rounded-lg bg-black/10 dark:bg-white/10 p-1.5 text-[11px]"
                  >
                    {att.type === "image" ? (
                      <ImageIcon className="h-3.5 w-3.5 shrink-0" />
                    ) : (
                      <FileText className="h-3.5 w-3.5 shrink-0" />
                    )}
                    <span className="truncate flex-1 font-medium">{att.name}</span>
                    {att.size && (
                      <span className="text-[9px] opacity-75 font-mono">
                        {(att.size / 1024).toFixed(0)} KB
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Status Indicators */}
          {isOutgoing && message.status && (
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground pr-1 select-none">
              <span className="capitalize">{message.status}</span>
              {renderStatusIcon()}
            </div>
          )}
        </div>

        {/* Hover Quick Action Buttons */}
        <div
          className={cn(
            "hidden group-hover:flex items-center gap-0.5 rounded-lg border border-border bg-popover p-0.5 shadow-xs select-none z-10 self-center",
            isOutgoing ? "order-first mr-1" : "ml-1"
          )}
        >
          <button
            type="button"
            onClick={handleCopy}
            title={copied ? "Copied" : "Copy text"}
            className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
          </button>

          {onReply && (
            <button
              type="button"
              onClick={() => onReply(message)}
              title="Reply"
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <CornerDownRight className="h-3 w-3" />
            </button>
          )}

          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(message.id)}
              title="Delete message"
              className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    )
  }
)
ChatMessage.displayName = "ChatMessage"
