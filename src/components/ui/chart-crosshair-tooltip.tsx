"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { TrendingUp, MousePointer, Info } from "lucide-react"

export interface ChartDataPoint {
  xLabel: string
  values: Record<string, number>
}

export interface ChartCrosshairTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: ChartDataPoint[]
  seriesConfig?: Record<string, { label: string; color: string; prefix?: string; suffix?: string }>
  width?: number
  height?: number
}

const DEFAULT_DATA: ChartDataPoint[] = [
  { xLabel: "Mon", values: { revenue: 14000, users: 420 } },
  { xLabel: "Tue", values: { revenue: 22000, users: 580 } },
  { xLabel: "Wed", values: { revenue: 19500, users: 510 } },
  { xLabel: "Thu", values: { revenue: 31000, users: 790 } },
  { xLabel: "Fri", values: { revenue: 42500, users: 1120 } },
  { xLabel: "Sat", values: { revenue: 38000, users: 980 } },
  { xLabel: "Sun", values: { revenue: 49000, users: 1250 } },
]

const DEFAULT_SERIES = {
  revenue: { label: "Gross Revenue", color: "#3b82f6", prefix: "$" },
  users: { label: "Active Users", color: "#10b981", suffix: " users" },
}

export const ChartCrosshairTooltip = React.forwardRef<HTMLDivElement, ChartCrosshairTooltipProps>(
  (
    {
      className,
      data = DEFAULT_DATA,
      seriesConfig = DEFAULT_SERIES,
      width = 600,
      height = 240,
      ...props
    },
    ref
  ) => {
    const [activeIndex, setActiveIndex] = React.useState<number>(4) // default Friday
    const [isHovering, setIsHovering] = React.useState<boolean>(true)
    const svgRef = React.useRef<SVGSVGElement>(null)

    const padding = { top: 20, right: 30, bottom: 30, left: 40 }
    const chartW = width - padding.left - padding.right
    const chartH = height - padding.top - padding.bottom

    // Calculate scaling
    const maxRevenue = Math.max(...data.map((d) => d.values.revenue || 0)) * 1.15
    const maxUsers = Math.max(...data.map((d) => d.values.users || 0)) * 1.15

    const getX = (idx: number) => padding.left + (idx / (data.length - 1)) * chartW
    const getRevenueY = (val: number) => padding.top + chartH - (val / maxRevenue) * chartH
    const getUsersY = (val: number) => padding.top + chartH - (val / maxUsers) * chartH

    // Path generators
    const revenuePath = React.useMemo(() => {
      return data
        .map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getRevenueY(d.values.revenue)}`)
        .join(" ")
    }, [data, chartW, chartH, maxRevenue])

    const usersPath = React.useMemo(() => {
      return data
        .map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getUsersY(d.values.users)}`)
        .join(" ")
    }, [data, chartW, chartH, maxUsers])

    const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
      if (!svgRef.current) return
      const rect = svgRef.current.getBoundingClientRect()
      const relX = ((e.clientX - rect.left) / rect.width) * width
      const clampedX = Math.max(padding.left, Math.min(width - padding.right, relX))

      const step = chartW / (data.length - 1)
      const closestIdx = Math.round((clampedX - padding.left) / step)
      setActiveIndex(Math.max(0, Math.min(data.length - 1, closestIdx)))
      setIsHovering(true)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        setActiveIndex((prev) => Math.max(0, prev - 1))
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        setActiveIndex((prev) => Math.min(data.length - 1, prev + 1))
      }
    }

    const activePoint = data[activeIndex] || data[0]
    const activeX = getX(activeIndex)
    const activeRevY = getRevenueY(activePoint.values.revenue)

    return (
      <div
        ref={ref}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-label={`Interactive chart. Current point: ${activePoint.xLabel}`}
        className={cn(
          "w-full max-w-2xl rounded-xl border border-border bg-card shadow-sm p-4 space-y-4 text-card-foreground select-none outline-hidden focus:ring-1 focus:ring-ring",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3 text-xs">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="font-bold text-foreground">Interactive Chart Crosshair</h3>
          </div>
          <span className="text-[11px] text-muted-foreground font-mono">
            Hover or use Arrow Keys to inspect points
          </span>
        </div>

        {/* SVG Chart Canvas with Crosshair & Tooltip Overlay */}
        <div className="relative w-full overflow-hidden rounded-lg bg-background border border-border/60">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${width} ${height}`}
            onPointerMove={handlePointerMove}
            onPointerEnter={() => setIsHovering(true)}
            className="w-full h-auto cursor-crosshair touch-none"
          >
            {/* Horizontal Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
              const y = padding.top + chartH * pct
              return (
                <line
                  key={i}
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="currentColor"
                  strokeOpacity={0.08}
                  strokeDasharray="4 4"
                />
              )
            })}

            {/* Area gradients & lines */}
            <path
              d={`${revenuePath} L ${getX(data.length - 1)} ${padding.top + chartH} L ${padding.left} ${padding.top + chartH} Z`}
              fill="#3b82f6"
              fillOpacity={0.08}
            />
            <path
              d={revenuePath}
              fill="none"
              stroke="#3b82f6"
              strokeWidth={2.5}
              strokeLinecap="round"
            />

            <path
              d={usersPath}
              fill="none"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="5 3"
              strokeLinecap="round"
            />

            {/* X-axis labels */}
            {data.map((d, i) => (
              <text
                key={i}
                x={getX(i)}
                y={height - 10}
                textAnchor="middle"
                fill="currentColor"
                fillOpacity={0.6}
                fontSize={10}
                fontFamily="sans-serif"
              >
                {d.xLabel}
              </text>
            ))}

            {/* Crosshair Vertical Hairline */}
            {isHovering && (
              <>
                <line
                  x1={activeX}
                  y1={padding.top}
                  x2={activeX}
                  y2={padding.top + chartH}
                  stroke="currentColor"
                  strokeOpacity={0.5}
                  strokeWidth={1.5}
                  strokeDasharray="3 3"
                />
                {/* Horizontal Hairline tracking active revenue */}
                <line
                  x1={padding.left}
                  y1={activeRevY}
                  x2={width - padding.right}
                  y2={activeRevY}
                  stroke="#3b82f6"
                  strokeOpacity={0.3}
                  strokeWidth={1}
                />
                {/* Active Dots on curves */}
                <circle cx={activeX} cy={activeRevY} r={5} fill="#3b82f6" stroke="#fff" strokeWidth={2} />
                <circle
                  cx={activeX}
                  cy={getUsersY(activePoint.values.users)}
                  r={4}
                  fill="#10b981"
                  stroke="#fff"
                  strokeWidth={2}
                />
              </>
            )}
          </svg>

          {/* Floating Contextual Tooltip Card */}
          {isHovering && (
            <div
              style={{
                left: `${Math.min(75, Math.max(15, (activeX / width) * 100))}%`,
                top: "16px",
              }}
              className="absolute -translate-x-1/2 pointer-events-none z-20 rounded-lg border border-border bg-card/95 backdrop-blur-md shadow-lg p-2.5 space-y-1.5 min-w-[150px] animate-in fade-in-50 zoom-in-95 text-xs font-mono"
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-1 text-[11px]">
                <span className="font-bold text-foreground font-sans">{activePoint.xLabel}</span>
                <span className="text-muted-foreground text-[10px]">Point #{activeIndex + 1}</span>
              </div>

              {Object.entries(seriesConfig).map(([key, cfg]) => {
                const rawVal = activePoint.values[key] ?? 0
                return (
                  <div key={key} className="flex items-center justify-between gap-3 text-[11px]">
                    <div className="flex items-center gap-1.5 font-sans">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: cfg.color }} />
                      <span className="text-muted-foreground text-[10px]">{cfg.label}:</span>
                    </div>
                    <span suppressHydrationWarning className="font-bold text-foreground">
                      {cfg.prefix || ""}{rawVal.toLocaleString("en-US")}{cfg.suffix || ""}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    )
  }
)

ChartCrosshairTooltip.displayName = "ChartCrosshairTooltip"
