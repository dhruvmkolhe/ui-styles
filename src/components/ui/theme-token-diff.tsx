"use client"

import * as React from "react"
import {
  GitCompare,
  Plus,
  Minus,
  Edit3,
  Check,
  Search,
  Filter,
  Copy,
  RotateCcw,
  Sparkles,
  Info,
  ArrowRight,
  Palette,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type TokenDiffStatus = "added" | "removed" | "modified" | "identical"

export interface TokenItem {
  key: string
  category: "colors" | "typography" | "radii" | "spacing" | "shadows"
  value: string
}

export interface TokenDiffResult {
  key: string
  category: "colors" | "typography" | "radii" | "spacing" | "shadows"
  status: TokenDiffStatus
  valA?: string
  valB?: string
}

export interface ThemeTokenDiffProps extends React.HTMLAttributes<HTMLDivElement> {
  themeAName?: string
  themeBName?: string
  themeATokens?: TokenItem[]
  themeBTokens?: TokenItem[]
  onExportDiff?: (diffs: TokenDiffResult[]) => void
}

const DEFAULT_THEME_A: TokenItem[] = [
  { key: "--color-primary", category: "colors", value: "#0d9488" },
  { key: "--color-background", category: "colors", value: "#ffffff" },
  { key: "--color-foreground", category: "colors", value: "#0f172a" },
  { key: "--color-muted", category: "colors", value: "#f1f5f9" },
  { key: "--color-border", category: "colors", value: "#e2e8f0" },
  { key: "--color-accent", category: "colors", value: "#6366f1" },
  { key: "--radius-base", category: "radii", value: "8px" },
  { key: "--radius-sm", category: "radii", value: "4px" },
  { key: "--radius-lg", category: "radii", value: "12px" },
  { key: "--font-sans", category: "typography", value: "Inter, sans-serif" },
  { key: "--font-mono", category: "typography", value: "JetBrains Mono, monospace" },
  { key: "--spacing-unit", category: "spacing", value: "4px" },
  { key: "--shadow-elevation", category: "shadows", value: "0 1px 3px rgba(0,0,0,0.1)" },
]

const DEFAULT_THEME_B: TokenItem[] = [
  { key: "--color-primary", category: "colors", value: "#06b6d4" }, // MODIFIED (Cyan)
  { key: "--color-background", category: "colors", value: "#020617" }, // MODIFIED (Dark Slate)
  { key: "--color-foreground", category: "colors", value: "#f8fafc" }, // MODIFIED
  { key: "--color-muted", category: "colors", value: "#0f172a" }, // MODIFIED
  { key: "--color-border", category: "colors", value: "#1e293b" }, // MODIFIED
  { key: "--color-accent", category: "colors", value: "#38bdf8" }, // MODIFIED
  { key: "--color-glow", category: "colors", value: "rgba(6,182,212,0.4)" }, // ADDED
  { key: "--radius-base", category: "radii", value: "4px" }, // MODIFIED (Sharper)
  { key: "--radius-sm", category: "radii", value: "2px" }, // MODIFIED
  // radius-lg REMOVED
  { key: "--font-sans", category: "typography", value: "Inter, sans-serif" }, // IDENTICAL
  { key: "--font-mono", category: "typography", value: "JetBrains Mono, monospace" }, // IDENTICAL
  { key: "--spacing-unit", category: "spacing", value: "4px" }, // IDENTICAL
  { key: "--shadow-elevation", category: "shadows", value: "0 0 16px rgba(6,182,212,0.3)" }, // MODIFIED
]

const THEME_PRESETS: Record<string, TokenItem[]> = {
  "Base Clean (Light)": DEFAULT_THEME_A,
  "Dark Tech (Cyan Glow)": DEFAULT_THEME_B,
  "Japandi (Warm Organic)": [
    { key: "--color-primary", category: "colors", value: "#57534e" },
    { key: "--color-background", category: "colors", value: "#fafaf9" },
    { key: "--color-foreground", category: "colors", value: "#292524" },
    { key: "--color-muted", category: "colors", value: "#f5f5f4" },
    { key: "--color-border", category: "colors", value: "#e7e5e4" },
    { key: "--color-accent", category: "colors", value: "#78716c" },
    { key: "--radius-base", category: "radii", value: "2px" },
    { key: "--font-sans", category: "typography", value: "serif" },
    { key: "--spacing-unit", category: "spacing", value: "6px" },
  ],
  "Neo-Brutalist (High Contrast)": [
    { key: "--color-primary", category: "colors", value: "#000000" },
    { key: "--color-background", category: "colors", value: "#fef08a" },
    { key: "--color-foreground", category: "colors", value: "#000000" },
    { key: "--color-muted", category: "colors", value: "#fef9c3" },
    { key: "--color-border", category: "colors", value: "#000000" },
    { key: "--color-accent", category: "colors", value: "#f43f5e" },
    { key: "--radius-base", category: "radii", value: "0px" },
    { key: "--border-width", category: "spacing", value: "3px" },
    { key: "--shadow-elevation", category: "shadows", value: "4px 4px 0px #000" },
  ],
}

export const ThemeTokenDiff = React.forwardRef<HTMLDivElement, ThemeTokenDiffProps>(
  (
    {
      themeAName: initialThemeAName = "Base Clean (Light)",
      themeBName: initialThemeBName = "Dark Tech (Cyan Glow)",
      themeATokens: customTokensA,
      themeBTokens: customTokensB,
      onExportDiff,
      className,
      ...props
    },
    ref
  ) => {
    const [selectedPresetA, setSelectedPresetA] = React.useState(initialThemeAName)
    const [selectedPresetB, setSelectedPresetB] = React.useState(initialThemeBName)
    const [statusFilter, setStatusFilter] = React.useState<string>("all")
    const [categoryFilter, setCategoryFilter] = React.useState<string>("all")
    const [searchQuery, setSearchQuery] = React.useState("")
    const [copied, setCopied] = React.useState(false)

    const tokensA = customTokensA || THEME_PRESETS[selectedPresetA] || DEFAULT_THEME_A
    const tokensB = customTokensB || THEME_PRESETS[selectedPresetB] || DEFAULT_THEME_B

    // Diff calculation engine
    const diffResults: TokenDiffResult[] = React.useMemo(() => {
      const mapA = new Map<string, TokenItem>()
      tokensA.forEach((t) => mapA.set(t.key, t))

      const mapB = new Map<string, TokenItem>()
      tokensB.forEach((t) => mapB.set(t.key, t))

      const results: TokenDiffResult[] = []

      // Check all tokens in B
      mapB.forEach((tB, key) => {
        const tA = mapA.get(key)
        if (!tA) {
          results.push({
            key,
            category: tB.category,
            status: "added",
            valB: tB.value,
          })
        } else if (tA.value === tB.value) {
          results.push({
            key,
            category: tB.category,
            status: "identical",
            valA: tA.value,
            valB: tB.value,
          })
        } else {
          results.push({
            key,
            category: tB.category,
            status: "modified",
            valA: tA.value,
            valB: tB.value,
          })
        }
      })

      // Check tokens in A that are missing in B (removed)
      mapA.forEach((tA, key) => {
        if (!mapB.has(key)) {
          results.push({
            key,
            category: tA.category,
            status: "removed",
            valA: tA.value,
          })
        }
      })

      // Sort by category then key
      return results.sort((a, b) => a.key.localeCompare(b.key))
    }, [tokensA, tokensB])

    // Metric counts
    const { modifiedCount, addedCount, removedCount, identicalCount } = React.useMemo(() => {
      let m = 0, a = 0, r = 0, id = 0
      diffResults.forEach((d) => {
        if (d.status === "modified") m++
        else if (d.status === "added") a++
        else if (d.status === "removed") r++
        else id++
      })
      return { modifiedCount: m, addedCount: a, removedCount: r, identicalCount: id }
    }, [diffResults])

    const filteredDiffs = React.useMemo(() => {
      return diffResults.filter((d) => {
        const matchesStatus =
          statusFilter === "all" ||
          (statusFilter === "changes" && d.status !== "identical") ||
          d.status === statusFilter
        const matchesCategory =
          categoryFilter === "all" || d.category === categoryFilter
        const matchesQuery =
          searchQuery === "" ||
          d.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (d.valA && d.valA.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (d.valB && d.valB.toLowerCase().includes(searchQuery.toLowerCase()))

        return matchesStatus && matchesCategory && matchesQuery
      })
    }, [diffResults, statusFilter, categoryFilter, searchQuery])

    const handleCopyReport = () => {
      const summary = {
        themeA: selectedPresetA,
        themeB: selectedPresetB,
        metrics: {
          totalTokensCompared: diffResults.length,
          modified: modifiedCount,
          added: addedCount,
          removed: removedCount,
          identical: identicalCount,
        },
        diffs: diffResults,
      }
      navigator.clipboard.writeText(JSON.stringify(summary, null, 2))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      onExportDiff?.(diffResults)
    }

    const isColorValue = (val?: string) => {
      if (!val) return false
      return val.startsWith("#") || val.startsWith("rgb") || val.startsWith("hsl")
    }

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Theme Token Diff Inspector"
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
              <GitCompare className="h-4 w-4" />
            </span>
            <div>
              <h4 className="font-semibold text-foreground">Theme Token Diff Inspector</h4>
              <p className="text-[11px] text-muted-foreground">
                Compare design token structures, identifying added, removed, and modified values
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopyReport}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition-colors shadow-2xs"
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copied ? "Copied Diff JSON" : "Export Diff"}
          </button>
        </div>

        {/* Theme Comparison Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-lg border border-border bg-muted/30">
          <div className="space-y-1 text-xs">
            <label className="font-semibold text-muted-foreground block">Theme A (Baseline)</label>
            <select
              value={selectedPresetA}
              onChange={(e) => setSelectedPresetA(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-input bg-background text-foreground text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {Object.keys(THEME_PRESETS).map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1 text-xs">
            <label className="font-semibold text-muted-foreground block">Theme B (Comparison Target)</label>
            <select
              value={selectedPresetB}
              onChange={(e) => setSelectedPresetB(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-input bg-background text-foreground text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {Object.keys(THEME_PRESETS).map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Diff Metric Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="p-2.5 rounded-lg border border-amber-500/30 bg-amber-500/10 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-amber-700 dark:text-amber-300">Modified</span>
              <Edit3 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="text-xl font-bold font-mono text-amber-700 dark:text-amber-300 mt-1">
              {modifiedCount}
            </div>
          </div>

          <div className="p-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-emerald-700 dark:text-emerald-300">Added</span>
              <Plus className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-300 mt-1">
              {addedCount}
            </div>
          </div>

          <div className="p-2.5 rounded-lg border border-rose-500/30 bg-rose-500/10 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-rose-700 dark:text-rose-300">Removed</span>
              <Minus className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400" />
            </div>
            <div className="text-xl font-bold font-mono text-rose-700 dark:text-rose-300 mt-1">
              {removedCount}
            </div>
          </div>

          <div className="p-2.5 rounded-lg border border-border bg-muted/30 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-muted-foreground">Identical</span>
              <Check className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div className="text-xl font-bold font-mono text-foreground mt-1">
              {identicalCount}
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-muted/40 p-1 rounded-lg border border-border">
            {[
              { id: "all", label: "All Tokens" },
              { id: "changes", label: "Changes Only" },
              { id: "modified", label: "Modified" },
              { id: "added", label: "Added" },
              { id: "removed", label: "Removed" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id)}
                className={cn(
                  "px-2.5 py-1 rounded-md text-xs font-semibold capitalize transition-all",
                  statusFilter === tab.id
                    ? "bg-background text-foreground shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[200px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search token names or values..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-input bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Token Diff Table */}
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
              <tr>
                <th className="py-2.5 px-3">Token Variable</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">{selectedPresetA} (A)</th>
                <th className="py-2.5 px-3">{selectedPresetB} (B)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredDiffs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-muted-foreground">
                    No tokens match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredDiffs.map((d) => {
                  return (
                    <tr
                      key={d.key}
                      className={cn(
                        "hover:bg-muted/20 transition-colors",
                        d.status === "added" && "bg-emerald-500/5",
                        d.status === "removed" && "bg-rose-500/5",
                        d.status === "modified" && "bg-amber-500/5"
                      )}
                    >
                      <td className="py-2.5 px-3 font-mono font-medium text-foreground">
                        <div>{d.key}</div>
                        <span className="text-[10px] text-muted-foreground font-sans uppercase">
                          {d.category}
                        </span>
                      </td>

                      <td className="py-2.5 px-3">
                        {d.status === "added" && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                            <Plus className="h-3 w-3" /> Added
                          </span>
                        )}
                        {d.status === "removed" && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-rose-500/20 text-rose-700 dark:text-rose-300">
                            <Minus className="h-3 w-3" /> Removed
                          </span>
                        )}
                        {d.status === "modified" && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300">
                            <Edit3 className="h-3 w-3" /> Modified
                          </span>
                        )}
                        {d.status === "identical" && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-muted text-muted-foreground">
                            <Check className="h-3 w-3" /> Identical
                          </span>
                        )}
                      </td>

                      {/* Theme A Value */}
                      <td className="py-2.5 px-3">
                        {d.valA ? (
                          <div className="flex items-center gap-2">
                            {isColorValue(d.valA) && (
                              <span
                                className="w-3.5 h-3.5 rounded border border-border shrink-0 shadow-2xs"
                                style={{ backgroundColor: d.valA }}
                              />
                            )}
                            <code className="px-1.5 py-0.5 rounded bg-muted/60 font-mono text-[11px] text-foreground">
                              {d.valA}
                            </code>
                          </div>
                        ) : (
                          <span className="text-muted-foreground italic text-[11px]">— Not in Theme A —</span>
                        )}
                      </td>

                      {/* Theme B Value */}
                      <td className="py-2.5 px-3">
                        {d.valB ? (
                          <div className="flex items-center gap-2">
                            {isColorValue(d.valB) && (
                              <span
                                className="w-3.5 h-3.5 rounded border border-border shrink-0 shadow-2xs"
                                style={{ backgroundColor: d.valB }}
                              />
                            )}
                            <code className="px-1.5 py-0.5 rounded bg-muted/60 font-mono text-[11px] text-foreground">
                              {d.valB}
                            </code>
                          </div>
                        ) : (
                          <span className="text-muted-foreground italic text-[11px]">— Removed in Theme B —</span>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
)
ThemeTokenDiff.displayName = "ThemeTokenDiff"
