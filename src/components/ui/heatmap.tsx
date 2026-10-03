"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Grid, Sparkles, Info } from "lucide-react"

export interface HeatmapCell {
  row: string // e.g. "Mon"
  col: string // e.g. "09:00"
  value: number // intensity value
  label?: string
}

export interface HeatmapProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: HeatmapCell[]
  rows?: string[]
  columns?: string[]
  title?: string
  colorTheme?: "emerald" | "blue" | "purple" | "amber"
  showLegend?: boolean
  emptyMessage?: string
}

const DEFAULT_ROWS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const DEFAULT_COLS = ["08h", "10h", "12h", "14h", "16h", "18h", "20h", "22h"]

// Generate representative mock commit/activity heatmap matrix
function generateDefaultHeatmap(): HeatmapCell[] {
  const cells: HeatmapCell[] = []
  const valuesMatrix = [
    [2, 8, 14, 28, 35, 18, 9, 2], // Mon
    [4, 12, 38, 45, 52, 24, 11, 4], // Tue
    [6, 18, 42, 60, 48, 30, 14, 3], // Wed
    [5, 14, 33, 50, 44, 22, 10, 2], // Thu
    [8, 20, 48, 55, 38, 15, 6, 1], // Fri
    [1, 3, 8, 12, 10, 5, 2, 0], // Sat
    [0, 2, 5, 9, 14, 8, 3, 0], // Sun
  ]

  DEFAULT_ROWS.forEach((row, rIdx) => {
    DEFAULT_COLS.forEach((col, cIdx) => {
      cells.push({
        row,
        col,
        value: valuesMatrix[rIdx][cIdx] || 0,
      })
    })
  })

  return cells
}

export const Heatmap = React.forwardRef<HTMLDivElement, HeatmapProps>(
  (
    {
      className,
      data = generateDefaultHeatmap(),
      rows = DEFAULT_ROWS,
      columns = DEFAULT_COLS,
      title = "Activity & Intensity Matrix",
      colorTheme = "emerald",
      showLegend = true,
      emptyMessage = "No heatmap data available",
      ...props
    },
    ref
  ) => {
    const [hoveredCell, setHoveredCell] = React.useState<HeatmapCell | null>(null)

    // Calculate min & max values for normalization
    const { minVal, maxVal } = React.useMemo(() => {
      if (!data || data.length === 0) return { minVal: 0, maxVal: 1 }
      const values = data.map((d) => d.value)
      return {
        minVal: Math.min(...values),
        maxVal: Math.max(...values, 1),
      }
    }, [data])

    // Lookup table
    const cellMap = React.useMemo(() => {
      const map: Record<string, HeatmapCell> = {}
      data.forEach((c) => {
        map[`${c.row}-${c.col}`] = c
      })
      return map
    }, [data])

    // Color intensity level (0 to 4)
    const getIntensityClass = (val: number): string => {
      if (val === 0) return "bg-muted/40 border-border/40"
      const ratio = (val - minVal) / (maxVal - minVal || 1)

      if (colorTheme === "blue") {
        if (ratio < 0.25) return "bg-blue-500/20 text-blue-900 dark:text-blue-100 border-blue-500/30"
        if (ratio < 0.5) return "bg-blue-500/40 text-blue-900 dark:text-blue-100 border-blue-500/50"
        if (ratio < 0.75) return "bg-blue-500/70 text-white border-blue-500/80"
        return "bg-blue-600 text-white font-bold border-blue-600"
      }

      if (colorTheme === "purple") {
        if (ratio < 0.25) return "bg-purple-500/20 text-purple-900 dark:text-purple-100 border-purple-500/30"
        if (ratio < 0.5) return "bg-purple-500/40 text-purple-900 dark:text-purple-100 border-purple-500/50"
        if (ratio < 0.75) return "bg-purple-500/70 text-white border-purple-500/80"
        return "bg-purple-600 text-white font-bold border-purple-600"
      }

      // Default Emerald
      if (ratio < 0.25) return "bg-emerald-500/20 text-emerald-900 dark:text-emerald-100 border-emerald-500/30"
      if (ratio < 0.5) return "bg-emerald-500/40 text-emerald-900 dark:text-emerald-100 border-emerald-500/50"
      if (ratio < 0.75) return "bg-emerald-500/70 text-white border-emerald-500/80"
      return "bg-emerald-600 text-white font-bold border-emerald-600"
    }

    if (!data || data.length === 0) {
      return (
        <div
          ref={ref}
          className={cn(
            "w-full max-w-2xl p-8 rounded-xl border border-border bg-card text-center text-muted-foreground text-xs",
            className
          )}
          {...props}
        >
          {emptyMessage}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-2xl rounded-xl border border-border bg-card shadow-sm p-4 sm:p-5 space-y-4 text-card-foreground select-none text-xs",
          className
        )}
        {...props}
      >
        {/* Header with Title and Hover Tooltip Echo */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Grid className="h-4 w-4 text-primary" />
            <h3 className="font-bold text-foreground text-xs">{title}</h3>
          </div>

          {/* Active Hover Echo */}
          <div className="h-5 flex items-center font-mono text-[11px]">
            {hoveredCell ? (
              <span className="text-foreground font-semibold">
                {hoveredCell.row} at {hoveredCell.col}: <strong className="text-primary font-bold">{hoveredCell.value}</strong> units
              </span>
            ) : (
              <span className="text-muted-foreground text-[10px]">Hover any cell to inspect</span>
            )}
          </div>
        </div>

        {/* Matrix Grid Container */}
        <div className="overflow-x-auto pb-1" role="grid" aria-label={title}>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="w-12 p-1 text-left text-[10px] text-muted-foreground font-mono"></th>
                {columns.map((col) => (
                  <th
                    key={col}
                    className="p-1 text-center font-mono text-[10px] text-muted-foreground font-semibold"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row} role="row">
                  {/* Row Label */}
                  <td className="p-1 font-mono text-[10px] text-muted-foreground font-semibold">
                    {row}
                  </td>

                  {/* Columns */}
                  {columns.map((col) => {
                    const cell = cellMap[`${row}-${col}`] || { row, col, value: 0 }
                    const isHovered =
                      hoveredCell?.row === row && hoveredCell?.col === col

                    return (
                      <td key={col} className="p-1">
                        <button
                          type="button"
                          role="gridcell"
                          aria-label={`${row} ${col}: ${cell.value}`}
                          onMouseEnter={() => setHoveredCell(cell)}
                          onMouseLeave={() => setHoveredCell(null)}
                          onFocus={() => setHoveredCell(cell)}
                          onBlur={() => setHoveredCell(null)}
                          className={cn(
                            "w-full h-7 rounded-sm border transition-all flex items-center justify-center font-mono text-[10px] focus:outline-hidden",
                            getIntensityClass(cell.value),
                            isHovered && "ring-2 ring-primary ring-offset-1 scale-110 z-10 shadow-xs"
                          )}
                        >
                          <span className={cell.value === 0 ? "opacity-0" : "opacity-90"}>
                            {cell.value}
                          </span>
                        </button>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Legend */}
        {showLegend && (
          <div className="flex items-center justify-between pt-2 border-t border-border/60 text-[11px] text-muted-foreground font-mono">
            <span>Low Intensity ({minVal})</span>

            <div className="flex items-center gap-1.5">
              <span className="h-3 w-4 rounded-xs bg-muted/40 border border-border" />
              <span className="h-3 w-4 rounded-xs bg-emerald-500/20 border border-emerald-500/30" />
              <span className="h-3 w-4 rounded-xs bg-emerald-500/40 border border-emerald-500/50" />
              <span className="h-3 w-4 rounded-xs bg-emerald-500/70 border border-emerald-500/80" />
              <span className="h-3 w-4 rounded-xs bg-emerald-600 border border-emerald-600" />
            </div>

            <span>High Intensity ({maxVal})</span>
          </div>
        )}
      </div>
    )
  }
)

Heatmap.displayName = "Heatmap"
