"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeOff, RotateCcw } from "lucide-react"

export interface ChartSeriesItem {
  id: string
  label: string
  color: string // e.g. "#3b82f6" or "rgb(59, 130, 246)"
  value?: string | number
  change?: string
  visible?: boolean
}

export interface ChartLegendProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  series?: ChartSeriesItem[]
  onChangeSeries?: (series: ChartSeriesItem[]) => void
  orientation?: "horizontal" | "vertical"
  showValues?: boolean
  showControls?: boolean
  shape?: "circle" | "square" | "pill" | "line"
}

const DEFAULT_SERIES: ChartSeriesItem[] = [
  { id: "s-1", label: "Direct Revenue", color: "#3b82f6", value: "$48,200", change: "+14%", visible: true },
  { id: "s-2", label: "Enterprise Subscriptions", color: "#10b981", value: "$92,400", change: "+28%", visible: true },
  { id: "s-3", label: "Consulting & Retainers", color: "#f59e0b", value: "$18,500", change: "-4%", visible: true },
  { id: "s-4", label: "Marketplace Add-ons", color: "#8b5cf6", value: "$12,100", change: "+8%", visible: false },
]

export const ChartLegend = React.forwardRef<HTMLDivElement, ChartLegendProps>(
  (
    {
      className,
      series: initialSeries = DEFAULT_SERIES,
      onChangeSeries,
      orientation = "horizontal",
      showValues = true,
      showControls = true,
      shape = "circle",
      ...props
    },
    ref
  ) => {
    const [series, setSeries] = React.useState<ChartSeriesItem[]>(initialSeries)

    const toggleSeries = (id: string) => {
      const next = series.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s))
      setSeries(next)
      onChangeSeries?.(next)
    }

    const selectAll = () => {
      const next = series.map((s) => ({ ...s, visible: true }))
      setSeries(next)
      onChangeSeries?.(next)
    }

    const invertSelection = () => {
      const next = series.map((s) => ({ ...s, visible: !s.visible }))
      setSeries(next)
      onChangeSeries?.(next)
    }

    return (
      <div
        ref={ref}
        role="group"
        aria-label="Chart data series legend"
        className={cn(
          "w-full rounded-xl border border-border bg-card shadow-2xs p-3 space-y-3 text-xs text-card-foreground select-none",
          className
        )}
        {...props}
      >
        {/* Controls Bar */}
        {showControls && (
          <div className="flex items-center justify-between border-b border-border/60 pb-2 text-[11px] text-muted-foreground">
            <span className="font-semibold uppercase tracking-wider font-mono">
              Series ({series.filter((s) => s.visible).length}/{series.length} Active)
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={selectAll}
                className="hover:text-primary transition-colors font-medium"
              >
                Select All
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={invertSelection}
                className="hover:text-primary transition-colors font-medium"
              >
                Invert
              </button>
            </div>
          </div>
        )}

        {/* Series Chips Container */}
        <div
          className={cn(
            "flex flex-wrap gap-2.5",
            orientation === "vertical" ? "flex-col" : "items-center"
          )}
        >
          {series.map((item) => {
            const isVisible = item.visible !== false

            return (
              <button
                key={item.id}
                type="button"
                role="checkbox"
                aria-checked={isVisible}
                onClick={() => toggleSeries(item.id)}
                className={cn(
                  "group flex items-center justify-between gap-2.5 p-2 rounded-lg border transition-all text-left focus:outline-hidden focus:ring-1 focus:ring-ring",
                  isVisible
                    ? "border-border bg-background hover:bg-muted/40 text-foreground shadow-2xs"
                    : "border-dashed border-border/60 bg-muted/20 opacity-50 hover:opacity-75 text-muted-foreground"
                )}
              >
                <div className="flex items-center gap-2">
                  {/* Swatch Shape */}
                  {shape === "line" ? (
                    <span
                      className="h-1 w-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  ) : shape === "square" ? (
                    <span
                      className="h-3 w-3 rounded-xs"
                      style={{ backgroundColor: item.color }}
                    />
                  ) : shape === "pill" ? (
                    <span
                      className="h-2 w-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  ) : (
                    <span
                      className="h-2.5 w-2.5 rounded-full ring-2 ring-background"
                      style={{ backgroundColor: item.color }}
                    />
                  )}

                  <span className={cn("font-medium text-xs", !isVisible && "line-through")}>
                    {item.label}
                  </span>
                </div>

                {showValues && item.value !== undefined && (
                  <div className="flex items-center gap-1.5 font-mono text-[11px] ml-1">
                    <span className="font-semibold text-foreground">{item.value}</span>
                    {item.change && (
                      <span
                        className={cn(
                          "text-[10px] font-bold",
                          item.change.startsWith("+")
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-rose-600 dark:text-rose-400"
                        )}
                      >
                        {item.change}
                      </span>
                    )}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    )
  }
)

ChartLegend.displayName = "ChartLegend"
