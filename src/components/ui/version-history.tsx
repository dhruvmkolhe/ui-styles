"use client"

import * as React from "react"
import {
  History,
  GitCommit,
  RotateCcw,
  Check,
  User,
  Clock,
  Sparkles,
  Diff,
  FileCode,
  Tag,
  AlertCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface DocumentRevision {
  id: string
  hash: string
  title: string
  author: string
  timestamp: string
  tag?: string
  content: string
  summary: string
}

export interface VersionHistoryProps extends React.HTMLAttributes<HTMLDivElement> {
  initialRevisions?: DocumentRevision[]
  onRestoreRevision?: (revision: DocumentRevision) => void
}

const DEFAULT_REVISIONS: DocumentRevision[] = [
  {
    id: "rev-3",
    hash: "a9f3b12",
    title: "Batch 15 Architecture Finalization",
    author: "Elena Rostova",
    timestamp: "10 minutes ago",
    tag: "Current",
    summary: "Integrated Treemap, Sankey, Network Graph, and RBAC matrices into 25 styles.",
    content: `// Chameleon UI Architecture Manifest v3
export const SYSTEM_CONFIGURATION = {
  version: "15.0.0",
  stylesSupported: 25,
  componentsCount: 164,
  features: ["Treemap", "Sankey", "NetworkGraph", "PermissionMatrix", "AuditLog"],
  runtime: "Next.js 16 (Turbopack) & React 19",
  securityEnforced: "Client Simulation Sandbox",
};`,
  },
  {
    id: "rev-2",
    hash: "74cd9e8",
    title: "Batch 14 API Utilities Release",
    author: "Marcus Vance",
    timestamp: "4 hours ago",
    tag: "Published",
    summary: "Implemented safe formula evaluator without eval() and spreadsheet grid.",
    content: `// Chameleon UI Architecture Manifest v2
export const SYSTEM_CONFIGURATION = {
  version: "14.0.0",
  stylesSupported: 25,
  componentsCount: 154,
  features: ["ApiRequestBuilder", "FormulaEditor", "SpreadsheetGrid", "RegexTester"],
  runtime: "Next.js 16 (Turbopack) & React 19",
  securityEnforced: "Client Simulation Sandbox",
};`,
  },
  {
    id: "rev-1",
    hash: "0e129ba",
    title: "Batch 13 Collaboration Primitives",
    author: "Sarah Chen",
    timestamp: "Yesterday at 18:20",
    tag: "v13.0",
    summary: "Added Activity Feed, Review Panels, Terminal Emulator, and Diff Viewers.",
    content: `// Chameleon UI Architecture Manifest v1
export const SYSTEM_CONFIGURATION = {
  version: "13.0.0",
  stylesSupported: 25,
  componentsCount: 144,
  features: ["DiffViewer", "TerminalEmulator", "LogViewer", "ActivityFeed"],
  runtime: "Next.js 16 (Turbopack) & React 19",
  securityEnforced: "Client Simulation Sandbox",
};`,
  },
]

export const VersionHistory = React.forwardRef<HTMLDivElement, VersionHistoryProps>(
  (
    {
      initialRevisions = DEFAULT_REVISIONS,
      onRestoreRevision,
      className,
      ...props
    },
    ref
  ) => {
    const [revisions, setRevisions] = React.useState<DocumentRevision[]>(initialRevisions)
    const [selectedRevisionId, setSelectedRevisionId] = React.useState<string>(revisions[0]?.id || "rev-3")
    const [compareRevisionId, setCompareRevisionId] = React.useState<string>(revisions[1]?.id || "rev-2")
    const [restoreModalRevision, setRestoreModalRevision] = React.useState<DocumentRevision | null>(null)
    const [restoreSuccess, setRestoreSuccess] = React.useState<string | null>(null)

    const selectedRev = revisions.find((r) => r.id === selectedRevisionId) || revisions[0]
    const compareRev = revisions.find((r) => r.id === compareRevisionId) || revisions[1] || revisions[0]

    // Line-by-line diff computation
    const diffLines = React.useMemo(() => {
      const baseLines = compareRev.content.split("\n")
      const currentLines = selectedRev.content.split("\n")

      const lines: { type: "same" | "added" | "removed"; text: string; lineNo: number }[] = []
      const maxLen = Math.max(baseLines.length, currentLines.length)

      for (let i = 0; i < maxLen; i++) {
        const base = baseLines[i]
        const curr = currentLines[i]

        if (base === curr) {
          if (curr !== undefined) {
            lines.push({ type: "same", text: curr, lineNo: i + 1 })
          }
        } else {
          if (base !== undefined) {
            lines.push({ type: "removed", text: `- ${base}`, lineNo: i + 1 })
          }
          if (curr !== undefined) {
            lines.push({ type: "added", text: `+ ${curr}`, lineNo: i + 1 })
          }
        }
      }
      return lines
    }, [selectedRev, compareRev])

    // Functional restore logic
    const handleConfirmRestore = () => {
      if (!restoreModalRevision) return

      const rollbackRevision: DocumentRevision = {
        id: `rev-${Date.now()}`,
        hash: Math.random().toString(16).substring(2, 9),
        title: `Rollback to "${restoreModalRevision.title}"`,
        author: "Current User",
        timestamp: "Just now",
        tag: "Restored",
        summary: `Restored state from revision ${restoreModalRevision.hash}.`,
        content: restoreModalRevision.content,
      }

      const next = [rollbackRevision, ...revisions]
      setRevisions(next)
      setSelectedRevisionId(rollbackRevision.id)
      setCompareRevisionId(restoreModalRevision.id)
      onRestoreRevision?.(restoreModalRevision)
      setRestoreSuccess(`Restored revision ${restoreModalRevision.hash} successfully.`)
      setRestoreModalRevision(null)
      setTimeout(() => setRestoreSuccess(null), 3500)
    }

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Document and Project Version History"
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
              <History className="h-4 w-4" />
            </span>
            <div>
              <h4 className="font-semibold text-foreground">Version History &amp; Revisions</h4>
              <p className="text-[11px] text-muted-foreground">
                Compare revision differences, inspect commit details, and restore earlier snapshots
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground text-[11px]">Comparing:</span>
            <select
              value={compareRevisionId}
              onChange={(e) => setCompareRevisionId(e.target.value)}
              className="px-2 py-1 rounded-md border border-input bg-background font-mono text-[11px]"
            >
              {revisions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.hash} ({r.title})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Restore Notification Alert */}
        {restoreSuccess && (
          <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300 font-mono animate-in fade-in duration-150">
            ✓ {restoreSuccess}
          </div>
        )}

        {/* Main Content Layout: Revisions Timeline on Left, Diff on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Revisions Timeline List (4 cols) */}
          <div className="lg:col-span-4 space-y-2 max-h-[360px] overflow-y-auto pr-1">
            <span className="font-mono text-[10px] font-bold uppercase text-muted-foreground tracking-wider block">
              Timeline ({revisions.length} Revisions)
            </span>

            {revisions.map((rev) => {
              const isSelected = rev.id === selectedRevisionId

              return (
                <div
                  key={rev.id}
                  onClick={() => setSelectedRevisionId(rev.id)}
                  className={cn(
                    "p-3 rounded-lg border text-xs cursor-pointer transition-all duration-150 space-y-1.5",
                    isSelected
                      ? "border-primary bg-primary/5 shadow-2xs"
                      : "border-border bg-card/50 hover:bg-muted/30"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <GitCommit className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span className="font-mono font-bold text-[11px] text-foreground">
                        {rev.hash}
                      </span>
                    </div>
                    {rev.tag && (
                      <span className="px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold text-[10px]">
                        {rev.tag}
                      </span>
                    )}
                  </div>

                  <h6 className="font-semibold text-foreground text-xs leading-snug">
                    {rev.title}
                  </h6>

                  <p className="text-[11px] text-muted-foreground leading-tight">
                    {rev.summary}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-border/40 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" /> {rev.author}
                    </span>
                    <span>{rev.timestamp}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Diff & Restoration Pane (8 cols) */}
          <div className="lg:col-span-8 rounded-lg border border-border bg-popover/50 p-4 space-y-3 text-xs">
            {/* Diff header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-2.5">
              <div className="flex items-center gap-2">
                <Diff className="h-4 w-4 text-primary" />
                <div>
                  <span className="font-bold text-foreground">
                    {selectedRev.title}
                  </span>
                  <span className="text-[11px] text-muted-foreground block">
                    vs. {compareRev.hash} ({compareRev.timestamp})
                  </span>
                </div>
              </div>

              {selectedRev.id !== revisions[0]?.id && (
                <button
                  type="button"
                  onClick={() => setRestoreModalRevision(selectedRev)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition-colors shadow-2xs"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Restore This Version
                </button>
              )}
            </div>

            {/* Line Diff View */}
            <div className="rounded-lg border border-border bg-background/80 font-mono text-[11px] max-h-64 overflow-y-auto p-2 space-y-0.5">
              {diffLines.map((line, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "px-2 py-0.5 rounded leading-relaxed whitespace-pre font-mono",
                    line.type === "added"
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-semibold"
                      : line.type === "removed"
                      ? "bg-rose-500/15 text-rose-700 dark:text-rose-300 line-through opacity-80"
                      : "text-muted-foreground"
                  )}
                >
                  {line.text}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
              <span>Comparing line-by-line syntax tree changes</span>
              <span className="font-mono">
                {diffLines.filter((l) => l.type === "added").length} added ·{" "}
                {diffLines.filter((l) => l.type === "removed").length} removed
              </span>
            </div>
          </div>
        </div>

        {/* Restore Confirmation Dialog Modal */}
        {restoreModalRevision && (
          <div className="rounded-xl border border-primary/40 bg-card p-4 shadow-xl space-y-3 text-xs animate-in fade-in duration-150">
            <div className="flex items-center gap-2 text-foreground font-bold">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <span>Confirm Version Restoration</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Are you sure you want to restore revision <code className="font-mono font-bold text-foreground">{restoreModalRevision.hash}</code> ({restoreModalRevision.title})? This will append a new rollback snapshot to the timeline and update current state.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRestoreModalRevision(null)}
                className="px-3 py-1.5 rounded-md border border-border hover:bg-muted text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRestore}
                className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 shadow-2xs"
              >
                Confirm &amp; Restore
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
)

VersionHistory.displayName = "VersionHistory"
