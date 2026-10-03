"use client"

import * as React from "react"
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Eye,
  ShieldAlert,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type AuditSeverity = "critical" | "serious" | "moderate" | "manual-review"

export interface AuditCheckItem {
  id: string
  title: string
  rule: string
  severity: AuditSeverity
  category: "contrast" | "labels" | "keyboard" | "semantics"
  status: "passed" | "failed" | "manual-required"
  automated: boolean
  description: string
  selector?: string
  recommendation: string
}

export interface AccessibilityAuditPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  checks?: AuditCheckItem[]
  onRunAudit?: () => void
}

const DEFAULT_AUDIT_CHECKS: AuditCheckItem[] = [
  {
    id: "chk-1",
    title: "Sufficient Color Contrast Ratio",
    rule: "WCAG 2.1 SC 1.4.3 (Level AA)",
    severity: "critical",
    category: "contrast",
    status: "passed",
    automated: true,
    description: "Evaluated normal text contrast against background. Lowest ratio detected: 5.4:1 (exceeds 4.5:1 minimum).",
    selector: ".text-foreground on .bg-card",
    recommendation: "Ensure text maintains at least 4.5:1 contrast for body copy and 3:1 for large display headers.",
  },
  {
    id: "chk-2",
    title: "Explicit Form Labels & IDs",
    rule: "WCAG 2.1 SC 1.3.1 (Level A)",
    severity: "serious",
    category: "labels",
    status: "passed",
    automated: true,
    description: "All interactive input elements possess a linked <label htmlFor> or explicit aria-label attribute.",
    selector: "input[type='text'], select, textarea",
    recommendation: "Ensure every form field has an associated label or aria-labelledby pointing to helper text.",
  },
  {
    id: "chk-3",
    title: "Visible Keyboard Focus Indicators",
    rule: "WCAG 2.1 SC 2.4.7 (Level AA)",
    severity: "serious",
    category: "keyboard",
    status: "failed",
    automated: true,
    description: "One custom icon button lacks a visible focus-visible outline or ring when navigating via Tab.",
    selector: "button.icon-only-action",
    recommendation: "Add 'focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-hidden' to all interactive controls.",
  },
  {
    id: "chk-4",
    title: "Alt Text on Informative Images",
    rule: "WCAG 2.1 SC 1.1.1 (Level A)",
    severity: "critical",
    category: "semantics",
    status: "passed",
    automated: true,
    description: "Informative media contains descriptive alt strings, while decorative icons carry aria-hidden='true'.",
    selector: "svg, img",
    recommendation: "Supply concise text descriptions for content images and hide decorative glyphs from screen readers.",
  },
  {
    id: "chk-5",
    title: "Screen Reader Reading Order & Announcements",
    rule: "WCAG 2.1 SC 1.3.2 (Level A)",
    severity: "manual-review",
    category: "semantics",
    status: "manual-required",
    automated: false,
    description: "Automated scanners cannot verify logical comprehension order or dynamic live region announcements.",
    recommendation: "Manually test with NVDA (Windows), VoiceOver (macOS/iOS), or JAWS to verify natural reading flow.",
  },
  {
    id: "chk-6",
    title: "Touch Target Size (Mobile & Touch Devices)",
    rule: "WCAG 2.1 SC 2.5.5 (Level AAA) / SC 2.5.8 (Level AA)",
    severity: "manual-review",
    category: "keyboard",
    status: "manual-required",
    automated: false,
    description: "Minimum bounding box of 24x24 CSS pixels with 44x44 recommended spacing must be verified on touch hardware.",
    recommendation: "Ensure clickable touch areas provide at least 44x44px padding or margin spacing on mobile viewport.",
  },
]

export const AccessibilityAuditPanel = React.forwardRef<HTMLDivElement, AccessibilityAuditPanelProps>(
  (
    {
      checks = DEFAULT_AUDIT_CHECKS,
      onRunAudit,
      className,
      ...props
    },
    ref
  ) => {
    const [auditList, setAuditList] = React.useState<AuditCheckItem[]>(checks)
    const [selectedCategory, setSelectedCategory] = React.useState<string>("all")
    const [expandedCheckId, setExpandedCheckId] = React.useState<string | null>("chk-3")
    const [isRunning, setIsRunning] = React.useState(false)
    const [scanDurationMs, setScanDurationMs] = React.useState(42)

    const handleRunScan = () => {
      setIsRunning(true)
      const start = performance.now()
      setTimeout(() => {
        setIsRunning(false)
        setScanDurationMs(Math.round(performance.now() - start + 30))
        onRunAudit?.()
      }, 350)
    }

    const { automatedPassed, automatedFailed, manualCount } = React.useMemo(() => {
      let passed = 0
      let failed = 0
      let manual = 0

      auditList.forEach((c) => {
        if (!c.automated) {
          manual++
        } else if (c.status === "passed") {
          passed++
        } else {
          failed++
        }
      })

      return { automatedPassed: passed, automatedFailed: failed, manualCount: manual }
    }, [auditList])

    const filteredChecks = React.useMemo(() => {
      return auditList.filter((c) => {
        if (selectedCategory === "all") return true
        if (selectedCategory === "automated") return c.automated
        if (selectedCategory === "manual") return !c.automated
        if (selectedCategory === "failed") return c.status === "failed"
        return c.category === selectedCategory
      })
    }, [auditList, selectedCategory])

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Accessibility and WCAG Audit Panel"
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
              <ShieldAlert className="h-4 w-4" />
            </span>
            <div>
              <h4 className="font-semibold text-foreground">Accessibility (a11y) Audit Panel</h4>
              <p className="text-[11px] text-muted-foreground">
                Automated WCAG 2.1 rule checks and structured manual testing criteria
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-muted-foreground">
              Last scan: {scanDurationMs}ms
            </span>
            <button
              type="button"
              onClick={handleRunScan}
              disabled={isRunning}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition-colors shadow-2xs disabled:opacity-50"
            >
              <RotateCcw className={cn("h-3.5 w-3.5", isRunning && "animate-spin")} />
              {isRunning ? "Scanning..." : "Re-run a11y Scan"}
            </button>
          </div>
        </div>

        {/* Clear Boundary Notice */}
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-900 dark:text-blue-200">
          <Info className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="font-semibold">Honest Audit Reporting:</strong> Automated accessibility tools can detect approximately 30–40% of WCAG criteria (such as contrast math and tag attributes). Full compliance requires manual screen reader and keyboard traversal inspection.
          </p>
        </div>

        {/* Scoreboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-emerald-700 dark:text-emerald-300">
                Automated Passed
              </span>
              <h3 className="text-xl font-extrabold text-emerald-800 dark:text-emerald-200 font-mono mt-0.5">
                {automatedPassed}
              </h3>
            </div>
            <CheckCircle2 className="h-7 w-7 text-emerald-500" />
          </div>

          <div className="p-3 rounded-xl border border-rose-500/30 bg-rose-500/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-rose-700 dark:text-rose-300">
                Automated Violations
              </span>
              <h3 className="text-xl font-extrabold text-rose-800 dark:text-rose-200 font-mono mt-0.5">
                {automatedFailed}
              </h3>
            </div>
            <XCircle className="h-7 w-7 text-rose-500" />
          </div>

          <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-amber-700 dark:text-amber-300">
                Requires Manual Testing
              </span>
              <h3 className="text-xl font-extrabold text-amber-800 dark:text-amber-200 font-mono mt-0.5">
                {manualCount}
              </h3>
            </div>
            <HelpCircle className="h-7 w-7 text-amber-500" />
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 text-xs overflow-x-auto pb-1">
          {["all", "failed", "automated", "manual", "contrast", "keyboard", "labels", "semantics"].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setSelectedCategory(f)}
              className={cn(
                "px-2.5 py-1 rounded-md text-[11px] font-semibold capitalize transition-colors",
                selectedCategory === f
                  ? "bg-foreground text-background shadow-2xs"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Check Items List */}
        <div className="space-y-2">
          {filteredChecks.map((item) => {
            const isExpanded = expandedCheckId === item.id

            return (
              <div
                key={item.id}
                className={cn(
                  "rounded-lg border transition-colors overflow-hidden",
                  item.status === "failed"
                    ? "border-rose-500/40 bg-rose-500/5"
                    : item.status === "passed"
                    ? "border-border bg-card"
                    : "border-amber-500/40 bg-amber-500/5"
                )}
              >
                {/* Check Summary Row */}
                <div
                  onClick={() => setExpandedCheckId(isExpanded ? null : item.id)}
                  className="p-3 flex items-center justify-between cursor-pointer hover:bg-muted/30 gap-2 text-xs"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    {item.status === "passed" ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    ) : item.status === "failed" ? (
                      <XCircle className="h-4 w-4 text-rose-500 shrink-0" />
                    ) : (
                      <HelpCircle className="h-4 w-4 text-amber-500 shrink-0" />
                    )}

                    <div className="truncate">
                      <div className="font-semibold text-foreground flex items-center gap-2 truncate">
                        <span>{item.title}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-muted text-muted-foreground font-normal">
                          {item.rule}
                        </span>
                      </div>
                      <span className="text-[11px] text-muted-foreground truncate block">
                        {item.description}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase",
                        item.automated
                          ? "bg-primary/10 text-primary"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      )}
                    >
                      {item.automated ? "Automated" : "Manual"}
                    </span>
                    {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                  </div>
                </div>

                {/* Expanded Details & Remediation Tip */}
                {isExpanded && (
                  <div className="p-3 pt-0 border-t border-border/60 text-xs space-y-2 mt-1">
                    {item.selector && (
                      <div className="text-[11px]">
                        <span className="text-muted-foreground font-mono">Target Selector: </span>
                        <code className="text-primary font-bold">{item.selector}</code>
                      </div>
                    )}
                    <div className="p-2.5 rounded bg-muted/50 border border-border/80 text-[11px] text-foreground space-y-1">
                      <span className="font-bold text-foreground block">Remediation Guidance:</span>
                      <p className="text-muted-foreground">{item.recommendation}</p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)

AccessibilityAuditPanel.displayName = "AccessibilityAuditPanel"
