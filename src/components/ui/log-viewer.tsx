"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  FileText,
  Search,
  Filter,
  Trash2,
  Copy,
  Check,
  Pause,
  Play,
  ChevronRight,
  ChevronDown,
  Download,
  AlertTriangle,
  Info,
  Bug,
  AlertCircle,
  Skull,
} from "lucide-react"

export type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR" | "FATAL"

export interface LogEntry {
  id: string
  timestamp: string // "2026-10-03 10:42:01.124"
  level: LogLevel
  source: string // "[auth-service]", "[db-pool]"
  message: string
  metadata?: Record<string, any>
}

export interface LogViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  logs?: LogEntry[]
  initialLevel?: string
  title?: string
  showSearch?: boolean
  showControls?: boolean
  autoScroll?: boolean
  maxHeight?: string
  onClearLogs?: () => void
}

const LEVEL_COLORS: Record<
  LogLevel,
  { badge: string; text: string; icon: React.ElementType }
> = {
  DEBUG: {
    badge: "bg-slate-500/10 text-slate-500 border-slate-500/20",
    text: "text-slate-400",
    icon: Bug,
  },
  INFO: {
    badge: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
    text: "text-teal-600 dark:text-teal-400",
    icon: Info,
  },
  WARN: {
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    text: "text-amber-600 dark:text-amber-400",
    icon: AlertTriangle,
  },
  ERROR: {
    badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    text: "text-rose-600 dark:text-rose-400",
    icon: AlertCircle,
  },
  FATAL: {
    badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    text: "text-purple-600 dark:text-purple-400",
    icon: Skull,
  },
}

const DEFAULT_LOGS: LogEntry[] = [
  {
    id: "log-1",
    timestamp: "10:40:02.104",
    level: "INFO",
    source: "server",
    message: "Next.js application booted on port 3000 in production mode.",
    metadata: { env: "production", pid: 14022, staticRoutes: 31 },
  },
  {
    id: "log-2",
    timestamp: "10:40:05.412",
    level: "DEBUG",
    source: "theme-engine",
    message: "Loaded 25 aesthetic tokens into CSS variables cache.",
    metadata: { cachedTokens: 25, durationMs: 14.2 },
  },
  {
    id: "log-3",
    timestamp: "10:40:12.890",
    level: "INFO",
    source: "auth-guard",
    message: "Session token validated for user developer@chameleon-ui.io.",
  },
  {
    id: "log-4",
    timestamp: "10:40:18.230",
    level: "WARN",
    source: "redis-cache",
    message: "High latency detected in cluster node eu-central-1 (82ms > 50ms threshold).",
    metadata: { latencyMs: 82, cluster: "eu-central-1" },
  },
  {
    id: "log-5",
    timestamp: "10:40:24.008",
    level: "ERROR",
    source: "webhook-worker",
    message: "Failed to deliver stripe invoice notification webhook: Connection timeout.",
    metadata: { endpoint: "https://api.partner.io/v1/events", retryCount: 3, code: "ETIMEDOUT" },
  },
  {
    id: "log-6",
    timestamp: "10:40:31.954",
    level: "INFO",
    source: "batch-13",
    message: "Collaboration and Developer Tools suite components rendered successfully.",
  },
]

export const LogViewer = React.forwardRef<HTMLDivElement, LogViewerProps>(
  (
    {
      className,
      logs: initialLogs = DEFAULT_LOGS,
      initialLevel = "ALL",
      title = "System Logs",
      showSearch = true,
      showControls = true,
      autoScroll: initialAutoScroll = true,
      maxHeight = "440px",
      onClearLogs,
      ...props
    },
    ref
  ) => {
    const [logs, setLogs] = React.useState<LogEntry[]>(initialLogs)
    const [selectedLevel, setSelectedLevel] = React.useState<string>(initialLevel)
    const [searchQuery, setSearchQuery] = React.useState("")
    const [isAutoScroll, setIsAutoScroll] = React.useState(initialAutoScroll)
    const [expandedIds, setExpandedIds] = React.useState<Set<string>>(new Set())
    const [copiedId, setCopiedId] = React.useState<string | null>(null)

    const scrollRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
      if (isAutoScroll && scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }
    }, [logs, isAutoScroll])

    const filteredLogs = React.useMemo(() => {
      return logs.filter((log) => {
        // Level match
        if (selectedLevel !== "ALL" && log.level !== selectedLevel) return false

        // Search query match
        if (searchQuery) {
          const q = searchQuery.toLowerCase()
          const textMatch =
            log.message.toLowerCase().includes(q) ||
            log.source.toLowerCase().includes(q) ||
            log.timestamp.includes(q)
          return textMatch
        }
        return true
      })
    }, [logs, selectedLevel, searchQuery])

    const toggleExpand = (id: string) => {
      setExpandedIds((prev) => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      })
    }

    const handleCopyLine = (entry: LogEntry) => {
      const formatted = `[${entry.timestamp}] [${entry.level}] [${entry.source}] ${entry.message}`
      navigator.clipboard.writeText(formatted)
      setCopiedId(entry.id)
      setTimeout(() => setCopiedId(null), 2000)
    }

    const handleClear = () => {
      setLogs([])
      onClearLogs?.()
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-full rounded-xl border border-border bg-card shadow-sm overflow-hidden flex flex-col font-mono text-xs text-card-foreground",
          className
        )}
        {...props}
      >
        {/* Header Toolbar */}
        <div className="p-3 border-b border-border bg-muted/30 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary shrink-0" />
              <h3 className="font-semibold text-xs tracking-tight">{title}</h3>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground font-bold">
                {filteredLogs.length} / {logs.length}
              </span>
            </div>

            {showControls && (
              <div className="flex items-center gap-1.5">
                {/* Auto-scroll toggle */}
                <button
                  type="button"
                  onClick={() => setIsAutoScroll(!isAutoScroll)}
                  className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium border border-border transition-colors",
                    isAutoScroll
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "bg-background text-muted-foreground hover:text-foreground"
                  )}
                  title={isAutoScroll ? "Pause autoscroll" : "Resume autoscroll"}
                >
                  {isAutoScroll ? (
                    <>
                      <Pause className="h-3 w-3" />
                      <span>Live</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3 w-3" />
                      <span>Paused</span>
                    </>
                  )}
                </button>

                {/* Clear logs */}
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors border border-border bg-background"
                  title="Clear all logs"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Search bar and Level filter buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            {showSearch && (
              <div className="relative flex-1 min-w-[180px]">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter logs by message, source..."
                  className="w-full pl-8 pr-3 py-1 text-xs rounded-md border border-input bg-background placeholder:text-muted-foreground/70 focus:outline-hidden focus:ring-1 focus:ring-ring"
                />
              </div>
            )}

            {/* Severity pills */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
              {(["ALL", "DEBUG", "INFO", "WARN", "ERROR", "FATAL"] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedLevel(lvl)}
                  className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors whitespace-nowrap",
                    selectedLevel === lvl
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Logs Stream Container */}
        <div
          ref={scrollRef}
          style={{ maxHeight }}
          className="flex-1 overflow-y-auto divide-y divide-border/20 p-1 bg-background/50"
        >
          {filteredLogs.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground space-y-1">
              <FileText className="h-8 w-8 mx-auto text-muted-foreground/40 stroke-1" />
              <p className="text-xs">No matching log entries found.</p>
              {(searchQuery || selectedLevel !== "ALL") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedLevel("ALL")
                  }}
                  className="text-xs text-primary underline underline-offset-2"
                >
                  Reset filters
                </button>
              )}
            </div>
          ) : (
            filteredLogs.map((entry) => {
              const cfg = LEVEL_COLORS[entry.level] || LEVEL_COLORS.INFO
              const Icon = cfg.icon
              const isExpanded = expandedIds.has(entry.id)
              const hasMetadata = entry.metadata && Object.keys(entry.metadata).length > 0

              return (
                <div
                  key={entry.id}
                  className="group flex flex-col p-1.5 rounded hover:bg-muted/40 transition-colors text-[11px]"
                >
                  <div className="flex items-start gap-2">
                    {/* Timestamp */}
                    <span className="text-muted-foreground font-mono shrink-0 select-none">
                      {entry.timestamp}
                    </span>

                    {/* Level Badge */}
                    <span
                      className={cn(
                        "px-1.5 py-0.2 rounded border text-[9px] font-bold uppercase shrink-0 flex items-center gap-1 select-none",
                        cfg.badge
                      )}
                    >
                      <Icon className="h-2.5 w-2.5" />
                      <span>{entry.level}</span>
                    </span>

                    {/* Source tag */}
                    <span className="text-primary font-semibold shrink-0 select-none">
                      [{entry.source}]
                    </span>

                    {/* Message Body */}
                    <span className="flex-1 text-foreground break-all leading-relaxed">
                      {entry.message}
                    </span>

                    {/* Actions: Copy and Expand Metadata */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      {hasMetadata && (
                        <button
                          type="button"
                          onClick={() => toggleExpand(entry.id)}
                          className="p-1 rounded text-muted-foreground hover:text-foreground"
                          title="View metadata"
                        >
                          {isExpanded ? (
                            <ChevronDown className="h-3 w-3" />
                          ) : (
                            <ChevronRight className="h-3 w-3" />
                          )}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleCopyLine(entry)}
                        className="p-1 rounded text-muted-foreground hover:text-foreground"
                        title="Copy log line"
                      >
                        {copiedId === entry.id ? (
                          <Check className="h-3 w-3 text-emerald-500" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Metadata JSON View */}
                  {hasMetadata && isExpanded && (
                    <div className="mt-1.5 ml-14 p-2 rounded bg-muted/60 border border-border/60 text-[10px] space-y-1">
                      <span className="text-muted-foreground uppercase font-bold text-[9px]">
                        Context Metadata:
                      </span>
                      <pre className="text-foreground overflow-x-auto whitespace-pre-wrap">
                        {JSON.stringify(entry.metadata, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    )
  }
)

LogViewer.displayName = "LogViewer"
