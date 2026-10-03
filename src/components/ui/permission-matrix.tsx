"use client"

import * as React from "react"
import {
  ShieldCheck,
  Check,
  Eye,
  Sliders,
  Minus,
  AlertTriangle,
  RotateCcw,
  Save,
  Info,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type AccessLevel = "full" | "read" | "scoped" | "none"

export interface PermissionResource {
  id: string
  name: string
  category: string
  description: string
}

export interface PermissionRole {
  id: string
  name: string
  description: string
  color: string
}

export interface PermissionMatrixProps extends React.HTMLAttributes<HTMLDivElement> {
  roles?: PermissionRole[]
  resources?: PermissionResource[]
  initialPermissions?: Record<string, Record<string, AccessLevel>>
  onSavePermissions?: (permissions: Record<string, Record<string, AccessLevel>>) => void
}

const DEFAULT_ROLES: PermissionRole[] = [
  { id: "owner", name: "Workspace Owner", description: "Unrestricted master administration", color: "#8b5cf6" },
  { id: "admin", name: "Team Admin", description: "Full user and token management", color: "#3b82f6" },
  { id: "editor", name: "Content Editor", description: "Can create and publish design sets", color: "#10b981" },
  { id: "analyst", name: "Security Analyst", description: "Read-only audit and usage analytics", color: "#f59e0b" },
  { id: "guest", name: "Guest Reviewer", description: "Restricted comment and inspection", color: "#64748b" },
]

const DEFAULT_RESOURCES: PermissionResource[] = [
  { id: "user_mgmt", name: "User Accounts & Invites", category: "Organization", description: "Invite, suspend, and assign roles" },
  { id: "billing_invoices", name: "Billing & Subscriptions", category: "Organization", description: "Update credit card, tier, and invoices" },
  { id: "api_credentials", name: "API Keys & Webhooks", category: "Developer", description: "Generate production server secret keys" },
  { id: "component_publish", name: "Design Library Publishing", category: "Assets", description: "Deploy token presets and themes" },
  { id: "analytics_export", name: "Traffic & Usage Export", category: "Telemetry", description: "Download CSV telemetry records" },
  { id: "audit_logs", name: "Audit Trail Inspection", category: "Security", description: "Inspect tamper-evident administrative logs" },
]

const DEFAULT_INITIAL_PERMISSIONS: Record<string, Record<string, AccessLevel>> = {
  user_mgmt: { owner: "full", admin: "full", editor: "none", analyst: "read", guest: "none" },
  billing_invoices: { owner: "full", admin: "full", editor: "none", analyst: "none", guest: "none" },
  api_credentials: { owner: "full", admin: "full", editor: "scoped", analyst: "read", guest: "none" },
  component_publish: { owner: "full", admin: "full", editor: "full", analyst: "read", guest: "scoped" },
  analytics_export: { owner: "full", admin: "full", editor: "read", analyst: "full", guest: "none" },
  audit_logs: { owner: "full", admin: "full", editor: "none", analyst: "full", guest: "none" },
}

export const PermissionMatrix = React.forwardRef<HTMLDivElement, PermissionMatrixProps>(
  (
    {
      roles = DEFAULT_ROLES,
      resources = DEFAULT_RESOURCES,
      initialPermissions = DEFAULT_INITIAL_PERMISSIONS,
      onSavePermissions,
      className,
      ...props
    },
    ref
  ) => {
    const [permissions, setPermissions] = React.useState(initialPermissions)
    const [initialState, setInitialState] = React.useState(initialPermissions)
    const [savedNotification, setSavedNotification] = React.useState<string | null>(null)

    // Calculate changes count
    const changeCount = React.useMemo(() => {
      let count = 0
      resources.forEach((res) => {
        roles.forEach((role) => {
          if (permissions[res.id]?.[role.id] !== initialState[res.id]?.[role.id]) {
            count++
          }
        })
      })
      return count
    }, [permissions, initialState, resources, roles])

    // Cycle through access levels: full -> read -> scoped -> none -> full
    const cycleAccessLevel = (resourceId: string, roleId: string) => {
      const current = permissions[resourceId]?.[roleId] || "none"
      const levels: AccessLevel[] = ["full", "read", "scoped", "none"]
      const nextIndex = (levels.indexOf(current) + 1) % levels.length
      const nextLevel = levels[nextIndex]

      setPermissions((prev) => ({
        ...prev,
        [resourceId]: {
          ...prev[resourceId],
          [roleId]: nextLevel,
        },
      }))
    }

    const handleSave = () => {
      setInitialState(permissions)
      setSavedNotification(`Saved ${changeCount} permission policies to local simulation state.`)
      onSavePermissions?.(permissions)
      setTimeout(() => setSavedNotification(null), 3500)
    }

    const handleReset = () => {
      setPermissions(initialState)
    }

    const renderLevelIcon = (level: AccessLevel) => {
      switch (level) {
        case "full":
          return (
            <span className="inline-flex items-center justify-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] whitespace-nowrap">
              <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0" /> Full
            </span>
          )
        case "read":
          return (
            <span className="inline-flex items-center justify-center gap-1 font-semibold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] whitespace-nowrap">
              <Eye className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0" /> Read
            </span>
          )
        case "scoped":
          return (
            <span className="inline-flex items-center justify-center gap-1 font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] whitespace-nowrap">
              <Sliders className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0" /> Scoped
            </span>
          )
        default:
          return (
            <span className="inline-flex items-center justify-center gap-1 text-muted-foreground/60 px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] whitespace-nowrap">
              <Minus className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0" /> None
            </span>
          )
      }
    }

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Role and Resource Permission Matrix"
        className={cn(
          "w-full rounded-xl border border-border bg-card shadow-2xs p-4 space-y-4 select-none",
          className
        )}
        {...props}
      >
        {/* Header with Title and Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-primary/10 text-primary">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <div>
              <h4 className="font-semibold text-foreground">Role-Based Access Control (RBAC) Matrix</h4>
              <p className="text-[11px] text-muted-foreground">
                Click any cell to cycle policies: <strong className="text-foreground">Full → Read → Scoped → None</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {changeCount > 0 && (
              <span className="text-[11px] font-mono text-amber-500 font-semibold">
                {changeCount} unsaved {changeCount === 1 ? "policy" : "policies"}
              </span>
            )}
            <button
              type="button"
              onClick={handleReset}
              disabled={changeCount === 0}
              className="px-2.5 py-1.5 rounded-lg border border-border bg-background text-xs font-medium hover:bg-muted disabled:opacity-40 transition-colors"
            >
              <RotateCcw className="h-3 w-3 inline mr-1" /> Revert
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors shadow-xs"
            >
              <Save className="h-3.5 w-3.5 inline mr-1" /> Save Matrix
            </button>
          </div>
        </div>

        {/* Honest Security Disclaimer */}
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-900 dark:text-blue-200">
          <Info className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="font-semibold">Demonstration Sandbox:</strong> This permission matrix modifies local client visualization state. In production systems, authorization must be validated and enforced by secure backend server middleware and JWT claims.
          </p>
        </div>

        {/* Saved feedback notification */}
        {savedNotification && (
          <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300 font-mono animate-in fade-in duration-150">
            ✓ {savedNotification}
          </div>
        )}

        {/* Matrix Table */}
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                <th className="p-2 sm:p-3 w-[26%] min-w-[125px]">Resource / Domain</th>
                {roles.map((role) => (
                  <th key={role.id} className="p-1 sm:p-2.5 text-center w-[14.8%] min-w-[65px] align-top">
                    <div className="font-bold text-foreground flex flex-col items-center justify-start gap-1">
                      <div className="flex items-center justify-center gap-1">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0" style={{ backgroundColor: role.color }} />
                        <span className="text-[10px] sm:text-xs leading-tight text-center">{role.name}</span>
                      </div>
                      <span className="text-[9px] text-muted-foreground font-normal leading-tight hidden xl:block">
                        {role.description}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {resources.map((res) => (
                <tr key={res.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-2 sm:p-2.5">
                    <span className="text-[9.5px] font-mono uppercase tracking-wider text-muted-foreground block">
                      {res.category}
                    </span>
                    <strong className="text-foreground font-semibold text-xs block leading-tight">
                      {res.name}
                    </strong>
                    <span className="text-[10.5px] text-muted-foreground block mt-0.5 line-clamp-1">
                      {res.description}
                    </span>
                  </td>

                  {roles.map((role) => {
                    const level = permissions[res.id]?.[role.id] || "none"
                    return (
                      <td
                        key={role.id}
                        onClick={() => cycleAccessLevel(res.id, role.id)}
                        className="p-1.5 sm:p-2 text-center cursor-pointer hover:bg-primary/5 transition-colors"
                        title={`Click to cycle access level for ${role.name}`}
                      >
                        {renderLevelIcon(level)}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
)

PermissionMatrix.displayName = "PermissionMatrix"
