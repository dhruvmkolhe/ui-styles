"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Clock,
  CheckCircle2,
  AlertCircle,
  Flag,
} from "lucide-react"

export interface GanttTask {
  id: string
  name: string
  startDate: string // "YYYY-MM-DD"
  endDate: string // "YYYY-MM-DD"
  progress: number // 0 - 100
  color?: string
  isMilestone?: boolean
  assignee?: string
  dependencies?: string[] // IDs of prerequisite tasks
  status?: "pending" | "in-progress" | "completed" | "delayed"
}

export interface GanttChartProps extends React.HTMLAttributes<HTMLDivElement> {
  tasks?: GanttTask[]
  startDate?: string
  endDate?: string
  timeScale?: "day" | "week" | "month"
  onTaskClick?: (task: GanttTask) => void
  onTaskUpdate?: (task: GanttTask) => void
  readOnly?: boolean
}

// Convert "YYYY-MM-DD" to days from a base date
function dateToDayOffset(dateStr: string, baseDateStr: string): number {
  const [y1, m1, d1] = dateStr.split("-").map(Number)
  const [y0, m0, d0] = baseDateStr.split("-").map(Number)
  const t1 = Date.UTC(y1, m1 - 1, d1)
  const t0 = Date.UTC(y0, m0 - 1, d0)
  return Math.round((t1 - t0) / (1000 * 60 * 60 * 24))
}

export const GanttChart = React.forwardRef<HTMLDivElement, GanttChartProps>(
  (
    {
      className,
      tasks = [],
      startDate = "2026-10-01",
      endDate = "2026-10-31",
      timeScale: initialScale = "day",
      onTaskClick,
      onTaskUpdate,
      readOnly = false,
      ...props
    },
    ref
  ) => {
    const [timeScale, setTimeScale] = React.useState<"day" | "week" | "month">(initialScale)
    const [hoveredTaskId, setHoveredTaskId] = React.useState<string | null>(null)

    // Calculate total days
    const totalDays = React.useMemo(() => {
      const days = dateToDayOffset(endDate, startDate) + 1
      return Math.max(days, 14)
    }, [startDate, endDate])

    // Day column width based on scale
    const dayWidth = timeScale === "day" ? 36 : timeScale === "week" ? 18 : 8
    const totalTimelineWidth = totalDays * dayWidth

    // Generate column headers
    const timelineHeaders = React.useMemo(() => {
      const headers = []
      const [sy, sm, sd] = startDate.split("-").map(Number)
      const baseDate = new Date(sy, sm - 1, sd)

      for (let i = 0; i < totalDays; i++) {
        const d = new Date(baseDate)
        d.setDate(baseDate.getDate() + i)
        headers.push({
          dayNum: d.getDate(),
          weekday: d.toLocaleDateString("en-US", { weekday: "narrow" }),
          isWeekend: d.getDay() === 0 || d.getDay() === 6,
          dateStr: d.toISOString().split("T")[0],
        })
      }
      return headers
    }, [startDate, totalDays])

    // Dependency lines (SVG paths)
    const dependencyPaths = React.useMemo(() => {
      const paths: Array<{ id: string; d: string; isHighlighted: boolean }> = []
      const rowHeight = 44
      const headerHeight = 36

      tasks.forEach((targetTask, targetIdx) => {
        if (!targetTask.dependencies) return

        targetTask.dependencies.forEach((depId) => {
          const sourceIdx = tasks.findIndex((t) => t.id === depId)
          if (sourceIdx === -1) return
          const sourceTask = tasks[sourceIdx]

          const sourceStart = dateToDayOffset(sourceTask.startDate, startDate)
          const sourceEnd = dateToDayOffset(sourceTask.endDate, startDate) + 1
          const targetStart = dateToDayOffset(targetTask.startDate, startDate)

          const x1 = sourceEnd * dayWidth
          const y1 = headerHeight + sourceIdx * rowHeight + rowHeight / 2
          const x2 = targetStart * dayWidth
          const y2 = headerHeight + targetIdx * rowHeight + rowHeight / 2

          // Smooth step curve
          const midX = x1 + Math.max(12, (x2 - x1) / 2)
          const d = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`

          const isHighlighted =
            hoveredTaskId === targetTask.id || hoveredTaskId === sourceTask.id

          paths.push({
            id: `${sourceTask.id}->${targetTask.id}`,
            d,
            isHighlighted,
          })
        })
      })

      return paths
    }, [tasks, startDate, dayWidth, hoveredTaskId])

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Gantt Chart Timeline"
        className={cn(
          "flex flex-col rounded-xl border border-border bg-card text-card-foreground shadow-xs overflow-hidden select-none",
          className
        )}
        {...props}
      >
        {/* Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/20 p-3 sm:px-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Calendar className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-xs font-bold text-foreground">Gantt Chart</h3>
              <p className="text-[10px] text-muted-foreground">
                Project roadmap with dependency curves and duration tracking
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Scale switcher */}
            <div className="flex items-center rounded-lg border border-border bg-background p-0.5 text-xs">
              {(["day", "week", "month"] as const).map((scale) => (
                <button
                  key={scale}
                  type="button"
                  onClick={() => setTimeScale(scale)}
                  className={cn(
                    "rounded px-2.5 py-1 text-[11px] font-medium capitalize transition-colors",
                    timeScale === scale
                      ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {scale}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Timeline Grid container with horizontal scroll */}
        <div className="flex overflow-x-auto overflow-y-hidden max-h-[500px] scrollbar-thin">
          {/* Sticky Left Task Labels Column */}
          <div className="sticky left-0 z-20 shrink-0 w-48 sm:w-60 border-r border-border bg-card/95 backdrop-blur-xs">
            {/* Header placeholder */}
            <div className="h-9 border-b border-border bg-muted/40 px-3 flex items-center text-xs font-semibold text-muted-foreground">
              Task Name
            </div>
            {/* Task list rows */}
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => onTaskClick?.(task)}
                onMouseEnter={() => setHoveredTaskId(task.id)}
                onMouseLeave={() => setHoveredTaskId(null)}
                className={cn(
                  "h-11 px-3 border-b border-border/50 flex items-center justify-between gap-2 text-xs transition-colors cursor-pointer",
                  hoveredTaskId === task.id ? "bg-muted/60" : "hover:bg-muted/30"
                )}
              >
                <div className="flex items-center gap-1.5 truncate">
                  {task.isMilestone ? (
                    <Flag className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                  ) : (
                    <span
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ backgroundColor: task.color || "var(--primary)" }}
                    />
                  )}
                  <span className="truncate font-medium text-foreground">{task.name}</span>
                </div>
                {task.assignee && (
                  <span className="text-[10px] font-mono text-muted-foreground shrink-0">
                    {task.assignee}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Right Gantt Bars & Dependency SVG Canvas */}
          <div
            className="relative shrink-0"
            style={{ width: `${totalTimelineWidth}px` }}
          >
            {/* Header Dates Bar */}
            <div className="h-9 border-b border-border bg-muted/40 flex">
              {timelineHeaders.map((hd, i) => (
                <div
                  key={i}
                  style={{ width: `${dayWidth}px` }}
                  className={cn(
                    "flex flex-col items-center justify-center border-r border-border/40 text-[10px]",
                    hd.isWeekend ? "bg-muted/60 text-muted-foreground" : "text-foreground"
                  )}
                >
                  <span className="font-mono font-medium leading-none">{hd.dayNum}</span>
                  {timeScale === "day" && (
                    <span className="text-[8px] text-muted-foreground leading-none mt-0.5">
                      {hd.weekday}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Background grid vertical lines */}
            <div className="absolute top-9 left-0 right-0 bottom-0 flex pointer-events-none">
              {timelineHeaders.map((hd, i) => (
                <div
                  key={i}
                  style={{ width: `${dayWidth}px` }}
                  className={cn(
                    "h-full border-r border-border/20",
                    hd.isWeekend && "bg-muted/20"
                  )}
                />
              ))}
            </div>

            {/* SVG Connecting Curves Layer */}
            <svg
              className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
              style={{ width: `${totalTimelineWidth}px` }}
            >
              <defs>
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="currentColor" className="text-primary" />
                </marker>
              </defs>
              {dependencyPaths.map((path) => (
                <path
                  key={path.id}
                  d={path.d}
                  fill="none"
                  markerEnd="url(#arrow)"
                  className={cn(
                    "transition-all",
                    path.isHighlighted
                      ? "stroke-primary stroke-[2px]"
                      : "stroke-muted-foreground/40 stroke-[1.5px]"
                  )}
                />
              ))}
            </svg>

            {/* Task Row Bars */}
            <div className="relative">
              {tasks.map((task) => {
                const startOffset = dateToDayOffset(task.startDate, startDate)
                const endOffset = dateToDayOffset(task.endDate, startDate)
                const durationDays = Math.max(1, endOffset - startOffset + 1)

                const leftPx = startOffset * dayWidth
                const widthPx = durationDays * dayWidth

                const isHovered = hoveredTaskId === task.id

                return (
                  <div
                    key={task.id}
                    className="h-11 relative border-b border-border/30 flex items-center"
                    onMouseEnter={() => setHoveredTaskId(task.id)}
                    onMouseLeave={() => setHoveredTaskId(null)}
                  >
                    {task.isMilestone ? (
                      /* Diamond Milestone */
                      <div
                        onClick={() => onTaskClick?.(task)}
                        style={{ left: `${leftPx + widthPx / 2 - 8}px` }}
                        className={cn(
                          "absolute h-4 w-4 rotate-45 rounded-xs bg-amber-500 shadow-xs cursor-pointer transition-transform z-20",
                          isHovered && "scale-125 ring-2 ring-amber-400"
                        )}
                        title={`${task.name} (Milestone)`}
                      />
                    ) : (
                      /* Progress Bar */
                      <div
                        onClick={() => onTaskClick?.(task)}
                        className={cn(
                          "group/bar absolute h-6 rounded-md shadow-xs overflow-hidden cursor-pointer transition-all z-10 flex items-center px-2",
                          isHovered ? "ring-2 ring-primary ring-offset-1" : ""
                        )}
                        style={{
                          left: `${leftPx}px`,
                          width: `${Math.max(widthPx, 24)}px`,
                          backgroundColor: task.color || "rgba(99, 102, 241, 0.25)",
                        }}
                      >
                        {/* Internal progress fill */}
                        <div
                          className="absolute left-0 top-0 bottom-0 bg-primary/80 transition-all pointer-events-none"
                          style={{
                            width: `${task.progress}%`,
                            backgroundColor: task.color ? `${task.color}` : undefined,
                          }}
                        />

                        {/* Task text inside bar */}
                        <span className="relative z-10 truncate text-[10px] font-semibold text-foreground drop-shadow-xs select-none">
                          {task.name} ({task.progress}%)
                        </span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="flex items-center justify-between border-t border-border bg-muted/20 px-4 py-2 text-[11px] text-muted-foreground">
          <span>{tasks.length} tasks scheduled</span>
          <span>Timeline View: {timeScale}</span>
        </div>
      </div>
    )
  }
)
GanttChart.displayName = "GanttChart"
