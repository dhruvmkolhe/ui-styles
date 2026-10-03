"use client"

import * as React from "react"
import {
  FileCode2,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Calendar,
  User,
  Clock,
  Eye,
  X,
  ShieldAlert,
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface AuditEvent {
  id: string
  actor: {
    name: string
    email: string
    avatar?: string
  }
  action: string
  target: string
  category: "auth" | "security" | "billing" | "tokens" | "data"
  status: "success" | "warning" | "blocked"
  timestamp: string
  ipAddress: string
  details?: {
    previousState?: Record<string, any>
    newState?: Record<string, any>
    userAgent?: string
  }
}

export interface AuditLogProps extends React.HTMLAttributes<HTMLDivElement> {
  events?: AuditEvent[]
  onExportLogs?: () => void
}

const DEFAULT_AUDIT_EVENTS: AuditEvent[] = [
  {
    id: "evt-901",
    actor: { name: "Elena Rostova", email: "elena@chameleon-ui.io" },
    action: "api_key.created",
    target: "Production Backend Key (prod_live_8492)",
    category: "tokens",
    status: "success",
    timestamp: "2 minutes ago",
    ipAddress: "192.241.142.88",
    details: {
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4_1)",
      newState: { name: "Production Backend Key", scopes: ["read:styles", "write:tokens"], expiresAt: "2027-01-01" },
    },
  },
  {
    id: "evt-902",
    actor: { name: "Marcus Vance", email: "marcus@chameleon-ui.io" },
    action: "role_permission.modified",
    target: "Content Editor → RBAC Matrix",
    category: "security",
    status: "warning",
    timestamp: "18 minutes ago",
    ipAddress: "54.210.82.14",
    details: {
      userAgent: "Mozilla/5.0 (X11; Linux x86_64)",
      previousState: { role: "editor", access: "scoped" },
      newState: { role: "editor", access: "full" },
    },
  },
  {
    id: "evt-903",
    actor: { name: "Unknown Client", email: "guest-probe@89.208.29.11" },
    action: "auth.login_failed",
    target: "/api/v1/admin/auth",
    category: "auth",
    status: "blocked",
    timestamp: "42 minutes ago",
    ipAddress: "89.208.29.11",
    details: {
      userAgent: "curl/7.88.1 (x86_64-pc-linux-gnu)",
      newState: { reason: "Rate limit exceeded (5 attempts in 10s)", actionTaken: "IP temporarily banned" },
    },
  },
  {
    id: "evt-904",
    actor: { name: "Sarah Chen", email: "sarah@chameleon-ui.io" },
    action: "subscription.tier_upgraded",
    target: "Studio Enterprise Plan ($99/mo)",
    category: "billing",
    status: "success",
    timestamp: "2 hours ago",
    ipAddress: "140.82.112.4",
    details: {
      previousState: { plan: "pro", seats: 3 },
      newState: { plan: "enterprise", seats: 15, billedAnnually: true },
    },
  },
  {
    id: "evt-905",
    actor: { name: "Automated Backup", email: "system@internal.cloud" },
    action: "database.snapshot_saved",
    target: "Snapshot ID: snap-pg-2026-10-03",
    category: "data",
    status: "success",
    timestamp: "5 hours ago",
    ipAddress: "10.0.4.12",
    details: {
      newState: { sizeMb: 4280, encrypted: true, retentionDays: 90 },
    },
  },
]

export const AuditLog = React.forwardRef<HTMLDivElement, AuditLogProps>(
  (
    {
      events = DEFAULT_AUDIT_EVENTS,
      onExportLogs,
      className,
      ...props
    },
    ref
  ) => {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [selectedCategory, setSelectedCategory] = React.useState<string>("all")
    const [selectedStatus, setSelectedStatus] = React.useState<string>("all")
    const [activeEvent, setActiveEvent] = React.useState<AuditEvent | null>(null)

    // Filter events
    const filteredEvents = React.useMemo(() => {
      return events.filter((e) => {
        const matchesCategory = selectedCategory === "all" || e.category === selectedCategory
        const matchesStatus = selectedStatus === "all" || e.status === selectedStatus
        const q = searchQuery.toLowerCase().trim()
        const matchesSearch =
          q === "" ||
          e.actor.name.toLowerCase().includes(q) ||
          e.actor.email.toLowerCase().includes(q) ||
          e.action.toLowerCase().includes(q) ||
          e.target.toLowerCase().includes(q) ||
          e.ipAddress.includes(q)
        return matchesCategory && matchesStatus && matchesSearch
      })
    }, [events, selectedCategory, selectedStatus, searchQuery])

    const renderStatusBadge = (status: AuditEvent["status"]) => {
      switch (status) {
        case "success":
          return (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-3 w-3" /> Success
            </span>
          )
        case "warning":
          return (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="h-3 w-3" /> Warning
            </span>
          )
        case "blocked":
          return (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <XCircle className="h-3 w-3" /> Blocked
            </span>
          )
      }
    }

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Security and Administration Audit Trail Log"
        className={cn(
          "w-full rounded-xl border border-border bg-card shadow-2xs p-4 space-y-4 select-none",
          className
        )}
        {...props}
      >
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-primary/10 text-primary">
              <FileCode2 className="h-4 w-4" />
            </span>
            <div>
              <h4 className="font-semibold text-foreground">Security Audit Trail Log</h4>
              <p className="text-[11px] text-muted-foreground">
                Tamper-evident system activity log with actor, IP, timestamp, and diff inspection
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onExportLogs}
            className="px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted text-foreground text-xs font-semibold transition-colors shadow-2xs"
          >
            Export Log (CSV/JSON)
          </button>
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-input bg-background text-xs focus-within:ring-1 focus-within:ring-ring">
            <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by actor, action, IP..."
              className="w-full bg-transparent outline-hidden text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-input bg-background text-xs">
            <Filter className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-transparent outline-hidden text-foreground text-xs cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="auth">Authentication</option>
              <option value="security">Security &amp; Roles</option>
              <option value="billing">Billing &amp; Plans</option>
              <option value="tokens">API Tokens</option>
              <option value="data">Data &amp; Backups</option>
            </select>
          </div>

          {/* Status Dropdown */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-input bg-background text-xs">
            <ShieldAlert className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-transparent outline-hidden text-foreground text-xs cursor-pointer"
            >
              <option value="all">All Outcomes</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="blocked">Blocked / Denied</option>
            </select>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                <th className="p-3">Actor / Principal</th>
                <th className="p-3">Action &amp; Target</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3">IP Address</th>
                <th className="p-3 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground">
                    No audit records match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredEvents.map((evt) => (
                  <tr
                    key={evt.id}
                    className="hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => setActiveEvent(evt)}
                  >
                    <td className="p-3">
                      <div className="font-semibold text-foreground flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                        {evt.actor.name}
                      </div>
                      <span className="text-[11px] text-muted-foreground font-mono block">
                        {evt.actor.email}
                      </span>
                    </td>

                    <td className="p-3">
                      <span className="font-mono text-[11px] font-bold text-primary block">
                        {evt.action}
                      </span>
                      <span className="text-[11px] text-muted-foreground truncate max-w-xs block">
                        {evt.target}
                      </span>
                    </td>

                    <td className="p-3 text-center">
                      {renderStatusBadge(evt.status)}
                    </td>

                    <td className="p-3">
                      <div className="flex items-center gap-1 text-foreground">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span>{evt.timestamp}</span>
                      </div>
                    </td>

                    <td className="p-3 font-mono text-[11px] text-muted-foreground">
                      {evt.ipAddress}
                    </td>

                    <td className="p-3 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveEvent(evt)
                        }}
                        className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        title="Inspect Event Changes & Metadata"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Event Detail Drawer Modal */}
        {activeEvent && (
          <div className="rounded-xl border border-border bg-popover p-4 shadow-xl space-y-3 text-xs animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-foreground">
                  EVENT #{activeEvent.id}
                </span>
                {renderStatusBadge(activeEvent.status)}
              </div>
              <button
                type="button"
                onClick={() => setActiveEvent(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px]">
              <div>
                <span className="text-muted-foreground block">Actor:</span>
                <strong className="text-foreground">{activeEvent.actor.name} ({activeEvent.actor.email})</strong>
              </div>
              <div>
                <span className="text-muted-foreground block">Action:</span>
                <code className="text-primary font-bold">{activeEvent.action}</code>
              </div>
              <div>
                <span className="text-muted-foreground block">Client IP / User Agent:</span>
                <span className="font-mono text-muted-foreground truncate block">
                  {activeEvent.ipAddress} · {activeEvent.details?.userAgent || "Standard Browser"}
                </span>
              </div>
            </div>

            {/* Changed Properties JSON / Diff View */}
            <div className="space-y-1.5 pt-2">
              <span className="font-mono text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                Metadata &amp; State Payload:
              </span>
              <pre className="p-3 rounded-lg bg-muted/60 border border-border/80 font-mono text-[11px] overflow-x-auto text-foreground">
                {JSON.stringify(activeEvent.details || {}, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    )
  }
)

AuditLog.displayName = "AuditLog"
