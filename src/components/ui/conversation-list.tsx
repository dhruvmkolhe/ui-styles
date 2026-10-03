"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Search, Pin, MessageSquare, Check, CheckCheck, Users, Circle, Sparkles, Filter } from "lucide-react"

export type ConversationPresence = "online" | "busy" | "away" | "offline"

export interface ConversationItem {
  id: string
  name: string
  avatar?: string
  initials?: string
  lastMessage: string
  timestamp: string
  unreadCount?: number
  isPinned?: boolean
  isGroup?: boolean
  presence?: ConversationPresence
  isTyping?: boolean
  senderName?: string
  tags?: string[]
}

export interface ConversationListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  conversations?: ConversationItem[]
  selectedId?: string
  onSelectConversation?: (conversation: ConversationItem) => void
  isLoading?: boolean
  emptyMessage?: string
  showSearch?: boolean
  showFilterTabs?: boolean
  title?: string
}

const DEFAULT_CONVERSATIONS: ConversationItem[] = [
  {
    id: "conv-1",
    name: "Design Systems Core",
    initials: "DS",
    lastMessage: "Batch 13 Collaboration components review is ready for testing.",
    timestamp: "10:42 AM",
    unreadCount: 3,
    isPinned: true,
    isGroup: true,
    senderName: "Sarah Chen",
    presence: "online",
  },
  {
    id: "conv-2",
    name: "Dhruv Kolhe",
    initials: "DK",
    lastMessage: "Sounds great, will run the static verification right now.",
    timestamp: "09:30 AM",
    unreadCount: 0,
    isPinned: true,
    isGroup: false,
    presence: "online",
  },
  {
    id: "conv-3",
    name: "Alex Rivera",
    initials: "AR",
    lastMessage: "Alex is typing...",
    timestamp: "Yesterday",
    unreadCount: 1,
    isGroup: false,
    presence: "busy",
    isTyping: true,
  },
  {
    id: "conv-4",
    name: "Frontend Architecture",
    initials: "FA",
    lastMessage: "Merged PR #204: Tailwind v4 theme token synchronization.",
    timestamp: "Oct 1",
    unreadCount: 0,
    isGroup: true,
    senderName: "Bot",
    presence: "offline",
  },
  {
    id: "conv-5",
    name: "Elena Rostova",
    initials: "ER",
    lastMessage: "Let me know when the Terminal Emulator tests finish.",
    timestamp: "Sep 29",
    unreadCount: 0,
    isGroup: false,
    presence: "away",
  },
]

const PRESENCE_COLORS: Record<ConversationPresence, string> = {
  online: "bg-emerald-500 ring-background",
  busy: "bg-rose-500 ring-background",
  away: "bg-amber-500 ring-background",
  offline: "bg-slate-400 ring-background",
}

export const ConversationList = React.forwardRef<HTMLDivElement, ConversationListProps>(
  (
    {
      className,
      conversations = DEFAULT_CONVERSATIONS,
      selectedId: controlledSelectedId,
      onSelectConversation,
      isLoading = false,
      emptyMessage = "No conversations found",
      showSearch = true,
      showFilterTabs = true,
      title = "Chats",
      ...props
    },
    ref
  ) => {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [activeFilter, setActiveFilter] = React.useState<"all" | "unread" | "direct" | "groups">("all")
    const [selectedInternal, setSelectedInternal] = React.useState<string>(conversations[0]?.id || "")

    const currentSelected = controlledSelectedId !== undefined ? controlledSelectedId : selectedInternal

    const handleSelect = (item: ConversationItem) => {
      setSelectedInternal(item.id)
      onSelectConversation?.(item)
    }

    const filteredConversations = React.useMemo(() => {
      return conversations.filter((item) => {
        // Search match
        const matchesSearch =
          !searchQuery ||
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())

        if (!matchesSearch) return false

        // Tab filter
        if (activeFilter === "unread") return (item.unreadCount || 0) > 0
        if (activeFilter === "direct") return !item.isGroup
        if (activeFilter === "groups") return !!item.isGroup
        return true
      })
    }, [conversations, searchQuery, activeFilter])

    // Sort: pinned first, then by existing order
    const sortedConversations = React.useMemo(() => {
      return [...filteredConversations].sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1
        if (!a.isPinned && b.isPinned) return 1
        return 0
      })
    }, [filteredConversations])

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col h-[520px] w-full max-w-sm rounded-xl border border-border bg-card shadow-sm overflow-hidden text-card-foreground select-none",
          className
        )}
        {...props}
      >
        {/* Header with Title and Search */}
        <div className="p-3.5 border-b border-border space-y-3 bg-card/60 backdrop-blur-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
            </div>
            <span className="text-[11px] font-mono text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full">
              {conversations.length} total
            </span>
          </div>

          {showSearch && (
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-input bg-background/80 placeholder:text-muted-foreground/70 focus:outline-hidden focus:ring-1 focus:ring-ring transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>
          )}

          {showFilterTabs && (
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pt-0.5">
              {(
                [
                  { id: "all", label: "All" },
                  { id: "unread", label: "Unread" },
                  { id: "direct", label: "Direct" },
                  { id: "groups", label: "Groups" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap",
                    activeFilter === tab.id
                      ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Conversation Items List */}
        <div className="flex-1 overflow-y-auto divide-y divide-border/40 p-1" role="list">
          {isLoading ? (
            /* Skeleton Loading State */
            <div className="p-3 space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3 animate-pulse">
                  <div className="h-10 w-10 rounded-full bg-muted shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-1/3 bg-muted rounded" />
                    <div className="h-2.5 w-3/4 bg-muted/70 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : sortedConversations.length === 0 ? (
            /* Empty State */
            <div className="h-full flex flex-col items-center justify-center p-6 text-center text-muted-foreground space-y-2">
              <MessageSquare className="h-8 w-8 text-muted-foreground/40 stroke-1" />
              <p className="text-xs font-medium">{emptyMessage}</p>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-primary underline underline-offset-2 hover:opacity-80"
                >
                  Reset search filter
                </button>
              )}
            </div>
          ) : (
            sortedConversations.map((item) => {
              const isSelected = item.id === currentSelected
              return (
                <button
                  key={item.id}
                  type="button"
                  role="listitem"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(item)}
                  className={cn(
                    "w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors relative group",
                    isSelected
                      ? "bg-accent/80 text-accent-foreground"
                      : "hover:bg-muted/50 text-foreground"
                  )}
                >
                  {/* Avatar + Presence Badge */}
                  <div className="relative shrink-0 mt-0.5">
                    <div className="h-10 w-10 rounded-full bg-primary/10 border border-border flex items-center justify-center text-xs font-bold text-primary">
                      {item.isGroup ? (
                        <Users className="h-4 w-4" />
                      ) : (
                        item.initials || item.name.slice(0, 2).toUpperCase()
                      )}
                    </div>
                    {item.presence && (
                      <span
                        className={cn(
                          "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2",
                          PRESENCE_COLORS[item.presence]
                        )}
                        title={`Status: ${item.presence}`}
                        aria-label={`Status: ${item.presence}`}
                      />
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-xs font-semibold truncate">{item.name}</span>
                        {item.isPinned && (
                          <Pin className="h-3 w-3 text-muted-foreground shrink-0 rotate-45" />
                        )}
                      </div>
                      <span className="text-[10px] text-muted-foreground font-mono shrink-0">
                        {item.timestamp}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={cn(
                          "text-xs truncate",
                          item.unreadCount && item.unreadCount > 0
                            ? "text-foreground font-medium"
                            : "text-muted-foreground",
                          item.isTyping && "italic text-primary"
                        )}
                      >
                        {item.senderName && !item.isTyping && (
                          <span className="font-medium text-foreground/80">
                            {item.senderName}:{" "}
                          </span>
                        )}
                        {item.lastMessage}
                      </p>

                      {item.unreadCount && item.unreadCount > 0 ? (
                        <span className="shrink-0 h-4 min-w-4 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-xs">
                          {item.unreadCount}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </button>
              )
            })
          )}
        </div>
      </div>
    )
  }
)

ConversationList.displayName = "ConversationList"
