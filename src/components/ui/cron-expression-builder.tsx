"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Clock,
  Calendar,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  AlertCircle,
  HelpCircle,
} from "lucide-react"

export interface CronPreset {
  label: string
  expression: string
  description: string
}

export interface CronExpressionBuilderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  initialExpression?: string
  onChange?: (expression: string) => void
  showPresets?: boolean
  showHumanDescription?: boolean
}

const CRON_PRESETS: CronPreset[] = [
  { label: "Every Minute", expression: "* * * * *", description: "Triggers every 60 seconds" },
  { label: "Every 15 Minutes", expression: "*/15 * * * *", description: "At minutes 0, 15, 30, and 45" },
  { label: "Hourly", expression: "0 * * * *", description: "At the start of every hour" },
  { label: "Daily at Midnight", expression: "0 0 * * *", description: "Every day at 00:00" },
  { label: "Daily at 9:00 AM", expression: "0 9 * * *", description: "Every day at 09:00" },
  { label: "Weekly (Monday 9 AM)", expression: "0 9 * * 1", description: "Every Monday morning" },
  { label: "Monthly (1st Day)", expression: "0 0 1 * *", description: "At midnight on the first of every month" },
]

// Pure translation generator for 5-part cron
function translateCron(expr: string): string {
  const parts = expr.trim().split(/\s+/)
  if (parts.length !== 5) return "Invalid cron format (must have exactly 5 parts: min hr dom mon dow)"

  const [min, hr, dom, mon, dow] = parts

  if (expr === "* * * * *") return "Every minute, every day"
  if (expr === "0 * * * *") return "Every hour on the hour"
  if (expr === "0 0 * * *") return "Every day at 12:00 AM (midnight)"
  if (expr === "0 9 * * *") return "Every day at 9:00 AM"
  if (expr === "0 9 * * 1") return "Every Monday at 9:00 AM"
  if (expr === "0 0 1 * *") return "On the 1st day of every month at midnight"

  const dowNames: Record<string, string> = {
    "0": "Sunday",
    "1": "Monday",
    "2": "Tuesday",
    "3": "Wednesday",
    "4": "Thursday",
    "5": "Friday",
    "6": "Saturday",
    "7": "Sunday",
  }

  let desc = ""

  // Minute
  if (min === "*") desc += "Every minute"
  else if (min.startsWith("*/")) desc += `Every ${min.slice(2)} minutes`
  else desc += `At minute ${min}`

  // Hour
  if (hr === "*") desc += ", every hour"
  else if (hr.startsWith("*/")) desc += `, every ${hr.slice(2)} hours`
  else desc += `, past hour ${hr}`

  // Day of Month
  if (dom !== "*") desc += `, on day ${dom} of the month`

  // Day of Week
  if (dow !== "*") {
    const day = dowNames[dow] || `day ${dow}`
    desc += `, only on ${day}`
  }

  // Month
  if (mon !== "*") desc += `, in month ${mon}`

  return desc
}

function validateCron(expr: string): { isValid: boolean; error?: string } {
  const parts = expr.trim().split(/\s+/)
  if (parts.length !== 5) {
    return { isValid: false, error: "Cron expression must contain exactly 5 space-separated fields." }
  }

  const validCharRegex = /^[0-9*,\/-]+$/
  for (let i = 0; i < 5; i++) {
    if (!validCharRegex.test(parts[i])) {
      return { isValid: false, error: `Field #${i + 1} contains invalid characters.` }
    }
  }

  return { isValid: true }
}

export const CronExpressionBuilder = React.forwardRef<HTMLDivElement, CronExpressionBuilderProps>(
  (
    {
      className,
      initialExpression = "0 9 * * 1",
      onChange,
      showPresets = true,
      showHumanDescription = true,
      ...props
    },
    ref
  ) => {
    const [expression, setExpression] = React.useState(initialExpression)
    const [copied, setCopied] = React.useState(false)

    const parts = expression.trim().split(/\s+/)
    const minVal = parts[0] || "*"
    const hrVal = parts[1] || "*"
    const domVal = parts[2] || "*"
    const monVal = parts[3] || "*"
    const dowVal = parts[4] || "*"

    const validation = React.useMemo(() => validateCron(expression), [expression])
    const humanReadable = React.useMemo(() => translateCron(expression), [expression])

    const updateField = (index: number, val: string) => {
      const current = expression.trim().split(/\s+/)
      while (current.length < 5) current.push("*")
      current[index] = val || "*"
      const next = current.join(" ")
      setExpression(next)
      onChange?.(next)
    }

    const handleApplyPreset = (p: CronPreset) => {
      setExpression(p.expression)
      onChange?.(p.expression)
    }

    const handleCopy = () => {
      navigator.clipboard.writeText(expression)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-2xl rounded-xl border border-border bg-card shadow-sm p-4 sm:p-6 space-y-6 text-card-foreground text-xs",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-bold text-foreground">Cron Expression Builder</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
              <span>{copied ? "Copied" : "Copy Expression"}</span>
            </button>
          </div>
        </div>

        {/* Live Expression Display Box */}
        <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground font-sans">
            <span className="font-semibold uppercase tracking-wider">Cron String (5-Field)</span>
            {validation.isValid ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                Valid Expression
              </span>
            ) : (
              <span className="text-rose-500 font-bold font-mono">Format Error</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={expression}
              onChange={(e) => {
                setExpression(e.target.value)
                onChange?.(e.target.value)
              }}
              className="flex-1 px-3 py-2 rounded-lg border border-input bg-background font-mono text-sm font-bold text-foreground focus:outline-hidden focus:ring-1 focus:ring-ring"
            />
          </div>

          {/* Natural Language Translation */}
          {showHumanDescription && (
            <div className="flex items-center gap-1.5 pt-1 text-xs text-foreground/80 font-sans">
              <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="font-medium">{humanReadable}</span>
            </div>
          )}

          {validation.error && (
            <p className="text-[11px] text-rose-500 font-sans flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              <span>{validation.error}</span>
            </p>
          )}
        </div>

        {/* 5 Field Visual Granular Adjuster */}
        <div className="space-y-3 font-sans">
          <span className="text-xs font-semibold text-foreground">Field Configuration</span>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 font-mono text-xs">
            {/* 1. Minute */}
            <div className="p-2.5 rounded-lg border border-border bg-background space-y-1">
              <label className="text-[10px] text-muted-foreground uppercase font-bold block">
                Minute (0-59)
              </label>
              <input
                type="text"
                value={minVal}
                onChange={(e) => updateField(0, e.target.value)}
                className="w-full px-2 py-1 rounded border border-input bg-card text-foreground font-bold"
              />
            </div>

            {/* 2. Hour */}
            <div className="p-2.5 rounded-lg border border-border bg-background space-y-1">
              <label className="text-[10px] text-muted-foreground uppercase font-bold block">
                Hour (0-23)
              </label>
              <input
                type="text"
                value={hrVal}
                onChange={(e) => updateField(1, e.target.value)}
                className="w-full px-2 py-1 rounded border border-input bg-card text-foreground font-bold"
              />
            </div>

            {/* 3. Day of Month */}
            <div className="p-2.5 rounded-lg border border-border bg-background space-y-1">
              <label className="text-[10px] text-muted-foreground uppercase font-bold block">
                Day (1-31)
              </label>
              <input
                type="text"
                value={domVal}
                onChange={(e) => updateField(2, e.target.value)}
                className="w-full px-2 py-1 rounded border border-input bg-card text-foreground font-bold"
              />
            </div>

            {/* 4. Month */}
            <div className="p-2.5 rounded-lg border border-border bg-background space-y-1">
              <label className="text-[10px] text-muted-foreground uppercase font-bold block">
                Month (1-12)
              </label>
              <input
                type="text"
                value={monVal}
                onChange={(e) => updateField(3, e.target.value)}
                className="w-full px-2 py-1 rounded border border-input bg-card text-foreground font-bold"
              />
            </div>

            {/* 5. Day of Week */}
            <div className="p-2.5 rounded-lg border border-border bg-background space-y-1 col-span-2 sm:col-span-1">
              <label className="text-[10px] text-muted-foreground uppercase font-bold block">
                Weekday (0-6)
              </label>
              <input
                type="text"
                value={dowVal}
                onChange={(e) => updateField(4, e.target.value)}
                className="w-full px-2 py-1 rounded border border-input bg-card text-foreground font-bold"
              />
            </div>
          </div>
        </div>

        {/* Common Quick Presets */}
        {showPresets && (
          <div className="space-y-2 pt-2 border-t border-border font-sans">
            <span className="text-xs font-semibold text-foreground">Common Presets</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CRON_PRESETS.map((p) => {
                const isActive = expression === p.expression
                return (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => handleApplyPreset(p)}
                    className={cn(
                      "p-2.5 rounded-lg border text-left transition-colors flex flex-col gap-0.5",
                      isActive
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-foreground hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs">{p.label}</span>
                      <span className="font-mono text-[11px] font-bold text-muted-foreground">
                        {p.expression}
                      </span>
                    </div>
                    <span className="text-[11px] text-muted-foreground">{p.description}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  }
)

CronExpressionBuilder.displayName = "CronExpressionBuilder"
