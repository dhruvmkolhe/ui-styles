"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Columns2,
  Rows,
  Copy,
  Check,
  FileCode,
  Plus,
  Minus,
  WrapText,
} from "lucide-react"

export type DiffViewMode = "split" | "unified"

export interface DiffLine {
  type: "added" | "removed" | "unchanged"
  oldLineNumber?: number
  newLineNumber?: number
  content: string
}

export interface DiffViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  oldCode?: string
  newCode?: string
  fileName?: string
  language?: string
  initialMode?: DiffViewMode
  wrapLines?: boolean
  showLineNumbers?: boolean
}

// Default demonstration code diff
const DEFAULT_OLD_CODE = `export function calculateMetrics(data: Metric[]) {
  // Legacy single-thread calculation
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total += data[i].value;
  }
  return {
    sum: total,
    average: total / data.length
  };
}`

const DEFAULT_NEW_CODE = `export function calculateMetrics(data: Metric[]) {
  // Optimized SIMD-ready calculation with bounds checking
  if (!data || data.length === 0) {
    return { sum: 0, average: 0 };
  }
  const sum = data.reduce((acc, curr) => acc + curr.value, 0);
  return {
    sum,
    average: sum / data.length,
    count: data.length
  };
}`

// Simple unified diff computation without external heavy dependencies
function computeDiffLines(oldStr: string, newStr: string): DiffLine[] {
  const oldLines = oldStr.split("\n")
  const newLines = newStr.split("\n")
  const result: DiffLine[] = []

  let oldIdx = 0
  let newIdx = 0

  while (oldIdx < oldLines.length || newIdx < newLines.length) {
    const oldLine = oldLines[oldIdx]
    const newLine = newLines[newIdx]

    if (oldLine === newLine) {
      result.push({
        type: "unchanged",
        oldLineNumber: oldIdx + 1,
        newLineNumber: newIdx + 1,
        content: oldLine ?? "",
      })
      oldIdx++
      newIdx++
    } else {
      // Lookahead match
      const nextMatchInNew = newLines.indexOf(oldLine, newIdx)
      const nextMatchInOld = oldLines.indexOf(newLine, oldIdx)

      if (nextMatchInNew !== -1 && (nextMatchInOld === -1 || nextMatchInNew - newIdx < nextMatchInOld - oldIdx)) {
        // Line added in new
        result.push({
          type: "added",
          newLineNumber: newIdx + 1,
          content: newLine ?? "",
        })
        newIdx++
      } else if (nextMatchInOld !== -1) {
        // Line removed from old
        result.push({
          type: "removed",
          oldLineNumber: oldIdx + 1,
          content: oldLine ?? "",
        })
        oldIdx++
      } else {
        // Both changed
        if (oldIdx < oldLines.length) {
          result.push({
            type: "removed",
            oldLineNumber: oldIdx + 1,
            content: oldLine ?? "",
          })
          oldIdx++
        }
        if (newIdx < newLines.length) {
          result.push({
            type: "added",
            newLineNumber: newIdx + 1,
            content: newLine ?? "",
          })
          newIdx++
        }
      }
    }
  }

  return result
}

export const DiffViewer = React.forwardRef<HTMLDivElement, DiffViewerProps>(
  (
    {
      className,
      oldCode = DEFAULT_OLD_CODE,
      newCode = DEFAULT_NEW_CODE,
      fileName = "calculate-metrics.ts",
      language = "typescript",
      initialMode = "split",
      wrapLines: initialWrap = false,
      showLineNumbers = true,
      ...props
    },
    ref
  ) => {
    const [mode, setMode] = React.useState<DiffViewMode>(initialMode)
    const [wrap, setWrap] = React.useState(initialWrap)
    const [copied, setCopied] = React.useState(false)

    const diffLines = React.useMemo(() => {
      return computeDiffLines(oldCode, newCode)
    }, [oldCode, newCode])

    // Calculate additions & deletions summary
    const additions = diffLines.filter((l) => l.type === "added").length
    const deletions = diffLines.filter((l) => l.type === "removed").length

    const handleCopy = () => {
      navigator.clipboard.writeText(newCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-full rounded-xl border border-border bg-card shadow-sm overflow-hidden text-xs font-mono",
          className
        )}
        {...props}
      >
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-muted/40 border-b border-border text-foreground">
          <div className="flex items-center gap-2">
            <FileCode className="h-4 w-4 text-primary shrink-0" />
            <span className="font-semibold text-xs tracking-tight">{fileName}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground uppercase font-semibold">
              {language}
            </span>

            {/* Stat counts */}
            <div className="flex items-center gap-1.5 ml-2 font-mono text-[11px]">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">+{additions}</span>
              <span className="text-rose-600 dark:text-rose-400 font-bold">-{deletions}</span>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-1.5">
            {/* Split / Unified Toggle */}
            <div className="flex items-center rounded-lg border border-border bg-background p-0.5 shadow-2xs">
              <button
                type="button"
                onClick={() => setMode("split")}
                className={cn(
                  "flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition-colors",
                  mode === "split"
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
                title="Split Side-by-Side View"
              >
                <Columns2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Split</span>
              </button>
              <button
                type="button"
                onClick={() => setMode("unified")}
                className={cn(
                  "flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition-colors",
                  mode === "unified"
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
                title="Unified Inline View"
              >
                <Rows className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Unified</span>
              </button>
            </div>

            {/* Wrap Toggle */}
            <button
              type="button"
              onClick={() => setWrap(!wrap)}
              className={cn(
                "p-1.5 rounded-lg border border-border transition-colors",
                wrap
                  ? "bg-accent text-accent-foreground"
                  : "bg-background text-muted-foreground hover:text-foreground"
              )}
              title={wrap ? "Disable Word Wrap" : "Enable Word Wrap"}
            >
              <WrapText className="h-3.5 w-3.5" />
            </button>

            {/* Copy Modified Code */}
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1 px-2 py-1 rounded-lg border border-border bg-background text-foreground hover:bg-muted transition-colors text-[11px] font-medium"
              title="Copy new code"
            >
              {copied ? (
                <Check className="h-3 w-3 text-emerald-500" />
              ) : (
                <Copy className="h-3 w-3 text-muted-foreground" />
              )}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>

        {/* Diff Canvas */}
        <div className="overflow-x-auto bg-background/60">
          {mode === "unified" ? (
            /* Unified (Inline) Layout */
            <div className="divide-y divide-border/20 min-w-full">
              {diffLines.map((line, idx) => {
                const isAdded = line.type === "added"
                const isRemoved = line.type === "removed"

                return (
                  <div
                    key={idx}
                    className={cn(
                      "flex items-stretch text-xs leading-relaxed transition-colors",
                      isAdded && "bg-emerald-500/10 text-emerald-900 dark:text-emerald-100",
                      isRemoved && "bg-rose-500/10 text-rose-900 dark:text-rose-100",
                      !isAdded && !isRemoved && "hover:bg-muted/30 text-foreground"
                    )}
                  >
                    {/* Line numbers old & new */}
                    {showLineNumbers && (
                      <div className="flex select-none font-mono text-[11px] text-muted-foreground/60 bg-muted/20 border-r border-border/40 shrink-0">
                        <span className="w-10 text-right pr-2 py-0.5">
                          {line.oldLineNumber || ""}
                        </span>
                        <span className="w-10 text-right pr-2 py-0.5 border-l border-border/30">
                          {line.newLineNumber || ""}
                        </span>
                      </div>
                    )}

                    {/* Change Marker */}
                    <div className="w-6 shrink-0 flex items-center justify-center font-bold select-none text-[11px]">
                      {isAdded && <span className="text-emerald-600 dark:text-emerald-400">+</span>}
                      {isRemoved && <span className="text-rose-600 dark:text-rose-400">-</span>}
                    </div>

                    {/* Content */}
                    <pre
                      className={cn(
                        "flex-1 py-0.5 px-2 font-mono text-xs overflow-x-auto",
                        wrap ? "whitespace-pre-wrap break-all" : "whitespace-pre"
                      )}
                    >
                      {line.content || " "}
                    </pre>
                  </div>
                )
              })}
            </div>
          ) : (
            /* Split (Side-by-Side) Layout */
            <div className="grid grid-cols-2 divide-x divide-border min-w-[600px]">
              {/* Left: Original Code */}
              <div className="divide-y divide-border/20">
                <div className="p-1.5 text-[11px] font-semibold text-muted-foreground bg-muted/40 uppercase tracking-wider text-center">
                  Original
                </div>
                {oldCode.split("\n").map((line, idx) => {
                  const matchingDiff = diffLines.find(
                    (d) => d.oldLineNumber === idx + 1 && d.type === "removed"
                  )
                  return (
                    <div
                      key={idx}
                      className={cn(
                        "flex items-stretch text-xs leading-relaxed",
                        matchingDiff ? "bg-rose-500/10 text-rose-900 dark:text-rose-100" : "text-foreground"
                      )}
                    >
                      {showLineNumbers && (
                        <span className="w-10 select-none text-right pr-2 py-0.5 font-mono text-[11px] text-muted-foreground/60 bg-muted/20 border-r border-border/40 shrink-0">
                          {idx + 1}
                        </span>
                      )}
                      <span className="w-5 shrink-0 flex items-center justify-center select-none text-rose-500 font-bold">
                        {matchingDiff ? "-" : ""}
                      </span>
                      <pre
                        className={cn(
                          "flex-1 py-0.5 px-2 font-mono text-xs overflow-x-auto",
                          wrap ? "whitespace-pre-wrap break-all" : "whitespace-pre"
                        )}
                      >
                        {line || " "}
                      </pre>
                    </div>
                  )
                })}
              </div>

              {/* Right: Modified Code */}
              <div className="divide-y divide-border/20">
                <div className="p-1.5 text-[11px] font-semibold text-muted-foreground bg-muted/40 uppercase tracking-wider text-center">
                  Modified
                </div>
                {newCode.split("\n").map((line, idx) => {
                  const matchingDiff = diffLines.find(
                    (d) => d.newLineNumber === idx + 1 && d.type === "added"
                  )
                  return (
                    <div
                      key={idx}
                      className={cn(
                        "flex items-stretch text-xs leading-relaxed",
                        matchingDiff ? "bg-emerald-500/10 text-emerald-900 dark:text-emerald-100" : "text-foreground"
                      )}
                    >
                      {showLineNumbers && (
                        <span className="w-10 select-none text-right pr-2 py-0.5 font-mono text-[11px] text-muted-foreground/60 bg-muted/20 border-r border-border/40 shrink-0">
                          {idx + 1}
                        </span>
                      )}
                      <span className="w-5 shrink-0 flex items-center justify-center select-none text-emerald-500 font-bold">
                        {matchingDiff ? "+" : ""}
                      </span>
                      <pre
                        className={cn(
                          "flex-1 py-0.5 px-2 font-mono text-xs overflow-x-auto",
                          wrap ? "whitespace-pre-wrap break-all" : "whitespace-pre"
                        )}
                      >
                        {line || " "}
                      </pre>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
)

DiffViewer.displayName = "DiffViewer"
