"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  GitCommit,
  GitPullRequest,
  MessageSquare,
  Rocket,
  ShieldAlert,
  UserPlus,
  Tag,
  Clock,
  Filter,
  ExternalLink,
  ChevronRight,
} from "lucide-react"

export type ActivityActionType =
  | "commit"
  | "review"
  | "comment"
  | "deploy"
  | "release"
  | "member"
  | "security"

export interface ActivityEvent {
  id: string
  actor: {
    name: string
    avatar?: string
    initials?: string
    role?: string
  }
  type: ActivityActionType
  title: string
  description?: string
  target?: {
    name: string
    url?: string
  }
  timestamp: string // "10m ago", "2h ago", "Yesterday"
  dateGroup?: string // "Today", "Yesterday", "This Week"
  metadata?: Record<string, string>
}

export interface ActivityFeedProps extends React.HTMLAttributes<HTMLDivElement> {
  events?: ActivityEvent[]
  isLoading?: boolean
  groupByDate?: boolean
  showFilters?: boolean
  emptyMessage?: string
  title?: string
  onEventClick?: (event: ActivityEvent) => void
}

const ACTION_CONFIGS: Record<
  ActivityActionType,
  { label: string; icon: React.ElementType; color: string; badgeBg: string }
> = {
  commit: {
    label: "Commit",
    icon: GitCommit,
    color: "text-blue-500",
    badgeBg: "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400",
  },
  review: {
    label: "PR Review",
    icon: GitPullRequest,
    color: "text-purple-500",
    badgeBg: "bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400",
  },
  comment: {
    label: "Comment",
    icon: MessageSquare,
    color: "text-emerald-500",
    badgeBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
  },
  deploy: {
    label: "Deployment",
    icon: Rocket,
    color: "text-teal-500",
    badgeBg: "bg-teal-500/10 border-teal-500/20 text-teal-600 dark:text-teal-400",
  },
  release: {
    label: "Release",
    icon: Tag,
    color: "text-amber-500",
    badgeBg: "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400",
  },
  member: {
    label: "Team",
    icon: UserPlus,
    color: "text-indigo-500",
    badgeBg: "bg-indigo-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-400",
  },
  security: {
    label: "Security",
    icon: ShieldAlert,
    color: "text-rose-500",
    badgeBg: "bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400",
  },
}

const DEFAULT_EVENTS: ActivityEvent[] = [
  {
    id: "act-1",
    actor: { name: "Dhruv Kolhe", initials: "DK", role: "VP Engineering" },
    type: "deploy",
    title: "Deployed production build v2.4.0",
    description: "All 31 static routes and design tokens generated cleanly.",
    target: { name: "production-eu-central", url: "#" },
    timestamp: "12m ago",
    dateGroup: "Today",
  },
  {
    id: "act-2",
    actor: { name: "Sarah Chen", initials: "SC", role: "Design Lead" },
    type: "review",
    title: "Approved pull request #142",
    description: "Added Batch 13 Collaboration & Developer Tools specifications.",
    target: { name: "feat/collab-tools", url: "#" },
    timestamp: "45m ago",
    dateGroup: "Today",
  },
  {
    id: "act-3",
    actor: { name: "Alex Rivera", initials: "AR", role: "Security Engineer" },
    type: "commit",
    title: "Pushed 3 commits to staging",
    description: "Hardened terminal emulator sandboxing to prevent arbitrary evaluation.",
    target: { name: "commit 8f3c1a2", url: "#" },
    timestamp: "2h ago",
    dateGroup: "Today",
  },
  {
    id: "act-4",
    actor: { name: "Elena Rostova", initials: "ER", role: "Staff Engineer" },
    type: "comment",
    title: "Left review note on diff-viewer.tsx",
    description: "Ensure split view handles wide side-by-side lines gracefully on tablet.",
    target: { name: "PR #140 Discussion", url: "#" },
    timestamp: "Yesterday",
    dateGroup: "Yesterday",
  },
  {
    id: "act-5",
    actor: { name: "GitHub Actions", initials: "GH", role: "Automation" },
    type: "release",
    title: "Published Chameleon UI Release v2.3.9",
    description: "Includes Batch 12 Scheduling & Workflow Diagrams.",
    target: { name: "v2.3.9", url: "#" },
    timestamp: "2 days ago",
    dateGroup: "Earlier this week",
  },
]

export const ActivityFeed = React.forwardRef<HTMLDivElement, ActivityFeedProps>(
  (
    {
      className,
      events = DEFAULT_EVENTS,
      isLoading = false,
      groupByDate = true,
      showFilters = true,
      emptyMessage = "No recent activity recorded",
      title = "Activity Feed",
      onEventClick,
      ...props
    },
    ref
  ) => {
    const [selectedFilter, setSelectedFilter] = React.useState<string>("all")

    const filteredEvents = React.useMemo(() => {
      if (selectedFilter === "all") return events
      return events.filter((e) => e.type === selectedFilter)
    }, [events, selectedFilter])

    // Grouping
    const grouped = React.useMemo(() => {
      if (!groupByDate) return { "All Activity": filteredEvents }
      const groups: Record<string, ActivityEvent[]> = {}
      for (const ev of filteredEvents) {
        const groupName = ev.dateGroup || "Recent"
        if (!groups[groupName]) groups[groupName] = []
        groups[groupName].push(ev)
      }
      return groups
    }, [filteredEvents, groupByDate])

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-xl rounded-xl border border-border bg-card shadow-sm overflow-hidden text-card-foreground",
          className
        )}
        {...props}
      >
        {/* Header with Title and Filter Pills */}
        <div className="p-4 border-b border-border bg-muted/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
            </div>
            <span className="text-[11px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {filteredEvents.length} events
            </span>
          </div>

          {showFilters && (
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-0.5">
              {[
                { id: "all", label: "All" },
                { id: "commit", label: "Commits" },
                { id: "review", label: "Reviews" },
                { id: "deploy", label: "Deploys" },
                { id: "comment", label: "Comments" },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSelectedFilter(f.id)}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap",
                    selectedFilter === f.id
                      ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Feed List Container */}
        <div className="p-4 space-y-6 max-h-[500px] overflow-y-auto" role="feed">
          {isLoading ? (
            <div className="space-y-4 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-muted shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-1/3 bg-muted rounded" />
                    <div className="h-2.5 w-full bg-muted/60 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground space-y-2">
              <Clock className="h-8 w-8 mx-auto text-muted-foreground/40 stroke-1" />
              <p className="text-xs">{emptyMessage}</p>
            </div>
          ) : (
            Object.entries(grouped).map(([groupTitle, groupEvents]) => (
              <div key={groupTitle} className="space-y-3">
                {groupByDate && (
                  <div className="sticky top-0 z-10 bg-card/90 backdrop-blur-xs py-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                      {groupTitle}
                    </span>
                  </div>
                )}

                <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-px before:bg-border">
                  {groupEvents.map((ev) => {
                    const cfg = ACTION_CONFIGS[ev.type] || ACTION_CONFIGS.commit
                    const Icon = cfg.icon

                    return (
                      <div
                        key={ev.id}
                        onClick={() => onEventClick?.(ev)}
                        className={cn(
                          "relative group flex items-start gap-3 text-left transition-colors",
                          onEventClick && "cursor-pointer hover:bg-muted/40 p-2 -ml-2 rounded-lg"
                        )}
                      >
                        {/* Timeline Node Dot */}
                        <span
                          className={cn(
                            "absolute -left-6 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-card border border-border shadow-xs",
                            cfg.color
                          )}
                        >
                          <Icon className="h-2.5 w-2.5" />
                        </span>

                        {/* Content */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex flex-wrap items-center justify-between gap-1 text-xs">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-semibold text-foreground">
                                {ev.actor.name}
                              </span>
                              <span
                                className={cn(
                                  "px-1.5 py-0.2 rounded border text-[10px] font-medium font-mono uppercase",
                                  cfg.badgeBg
                                )}
                              >
                                {cfg.label}
                              </span>
                            </div>
                            <span className="text-[11px] text-muted-foreground font-mono">
                              {ev.timestamp}
                            </span>
                          </div>

                          <p className="text-xs font-medium text-foreground">{ev.title}</p>

                          {ev.description && (
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {ev.description}
                            </p>
                          )}

                          {ev.target && (
                            <div className="pt-0.5">
                              <a
                                href={ev.target.url || "#"}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline font-mono"
                              >
                                <span>{ev.target.name}</span>
                                <ExternalLink className="h-2.5 w-2.5" />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    )
  }
)

ActivityFeed.displayName = "ActivityFeed"
