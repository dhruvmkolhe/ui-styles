"use client"

import * as React from "react"
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  X,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  Inbox,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export type NotificationType = "info" | "success" | "warning" | "error"

export interface NotificationItem {
  id: string
  title: string
  description: string
  timestamp: string
  read: boolean
  type?: NotificationType
  actionLabel?: string
  onAction?: () => void
}

const TYPE_ICONS: Record<NotificationType, React.ComponentType<{ className?: string }>> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
}

export interface NotificationCenterProps {
  notifications?: NotificationItem[]
  onMarkAsRead?: (id: string) => void
  onMarkAllAsRead?: () => void
  onDismiss?: (id: string) => void
  onClearAll?: () => void
  trigger?: React.ReactNode
  align?: "left" | "right"
  className?: string
}

export function NotificationCenter({
  notifications: initialNotifications = [],
  onMarkAsRead: externalMarkAsRead,
  onMarkAllAsRead: externalMarkAllAsRead,
  onDismiss: externalDismiss,
  onClearAll: externalClearAll,
  trigger,
  align = "right",
  className,
}: NotificationCenterProps) {
  const [items, setItems] = React.useState<NotificationItem[]>(initialNotifications)
  const [isOpen, setIsOpen] = React.useState(false)
  const [filter, setFilter] = React.useState<"all" | "unread">("all")

  // Synchronize with external changes if provided
  React.useEffect(() => {
    if (initialNotifications.length > 0) {
      setItems(initialNotifications)
    }
  }, [initialNotifications])

  const containerRef = React.useRef<HTMLDivElement>(null)

  // Close on outside click
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Close on escape
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  const unreadCount = items.filter((n) => !n.read).length

  const handleMarkAsRead = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    )
    externalMarkAsRead?.(id)
  }

  const handleMarkAllAsRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, read: true })))
    externalMarkAllAsRead?.()
  }

  const handleDismiss = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
    externalDismiss?.(id)
  }

  const handleClearAll = () => {
    setItems([])
    externalClearAll?.()
  }

  const filteredItems = items.filter((item) => {
    if (filter === "unread") return !item.read
    return true
  })

  return (
    <div ref={containerRef} className="relative inline-block">
      {/* Trigger Button */}
      {trigger ? (
        <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label={
            unreadCount > 0
              ? `${unreadCount} unread notifications`
              : "Notifications"
          }
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-foreground shadow-xs hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground animate-in zoom-in-50">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Popover Dropdown */}
      {isOpen && (
        <div
          role="region"
          aria-label="Notification center"
          className={cn(
            "absolute z-50 mt-2 w-80 sm:w-96 rounded-xl border border-border bg-popover text-popover-foreground shadow-xl animate-in fade-in-50 zoom-in-95 focus:outline-none overflow-hidden",
            align === "right" ? "right-0" : "left-0",
            className
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border p-3.5 bg-muted/30">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                Notifications
              </h4>
              {unreadCount > 0 && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                  {unreadCount} new
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleMarkAllAsRead}
                  className="h-7 px-2 text-[11px] text-muted-foreground hover:text-foreground"
                  title="Mark all as read"
                >
                  <CheckCheck className="h-3 w-3 mr-1" />
                  Read all
                </Button>
              )}
              {items.length > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleClearAll}
                  className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                  title="Clear all"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex border-b border-border bg-muted/20 px-3 py-1.5 gap-2 text-[11px]">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={cn(
                "rounded px-2.5 py-0.5 font-medium transition-colors",
                filter === "all"
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              All ({items.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("unread")}
              className={cn(
                "rounded px-2.5 py-0.5 font-medium transition-colors",
                filter === "unread"
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Unread ({unreadCount})
            </button>
          </div>

          {/* List items */}
          <div className="max-h-80 overflow-y-auto divide-y divide-border">
            {filteredItems.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Inbox className="h-8 w-8 mx-auto stroke-[1.5] mb-2 opacity-50" />
                <p className="text-xs font-medium">No notifications in this view</p>
                <p className="text-[11px] opacity-70 mt-0.5">
                  {filter === "unread" ? "You have read all updates!" : "You're all caught up."}
                </p>
              </div>
            ) : (
              filteredItems.map((n) => {
                const safeType = n.type || "info"
                const IconComp = TYPE_ICONS[safeType] || Info
                return (
                  <div
                    key={n.id}
                    className={cn(
                      "group relative flex items-start gap-3 p-3.5 transition-colors hover:bg-muted/40",
                      !n.read && "bg-primary/[0.03]"
                    )}
                  >
                    {/* Unread dot / Icon */}
                    <div className="relative mt-0.5 shrink-0">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <IconComp className="h-3.5 w-3.5" />
                      </span>
                      {!n.read && (
                        <span
                          className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background"
                          title="Unread notification"
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <h5 className={cn("text-xs font-medium truncate", !n.read && "font-bold text-foreground")}>
                          {n.title}
                        </h5>
                        <span className="text-[10px] text-muted-foreground shrink-0 font-mono">
                          {n.timestamp}
                        </span>
                      </div>

                      <p className="text-[11px] leading-relaxed text-muted-foreground line-clamp-2">
                        {n.description}
                      </p>

                      {n.actionLabel && (
                        <button
                          type="button"
                          onClick={n.onAction}
                          className="text-[11px] font-semibold text-primary hover:underline pt-0.5"
                        >
                          {n.actionLabel}
                        </button>
                      )}
                    </div>

                    {/* Quick actions on hover/focus */}
                    <div className="flex items-center gap-1 opacity-70 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 transition-opacity shrink-0">
                      {!n.read && (
                        <button
                          type="button"
                          onClick={() => handleMarkAsRead(n.id)}
                          aria-label="Mark as read"
                          className="p-1 rounded text-muted-foreground hover:bg-muted hover:text-foreground"
                          title="Mark read"
                        >
                          <Check className="h-3 w-3" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDismiss(n.id)}
                        aria-label="Dismiss notification"
                        className="p-1 rounded text-muted-foreground hover:bg-muted hover:text-destructive"
                        title="Dismiss"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}
