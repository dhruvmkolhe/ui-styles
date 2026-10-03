"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Plus,
  Video,
  AlertCircle,
  Tag,
  CheckCircle2,
} from "lucide-react"

export interface AgendaEvent {
  id: string
  title: string
  date: string // "YYYY-MM-DD"
  startTime: string // "09:00 AM"
  endTime?: string // "10:30 AM"
  category?: string
  color?: string // Hex or Tailwind color class
  location?: string
  isVirtual?: boolean
  meetingUrl?: string
  status?: "confirmed" | "tentative" | "cancelled"
  description?: string
  attendees?: Array<{ name: string; avatar?: string }>
}

export interface AgendaViewProps extends React.HTMLAttributes<HTMLDivElement> {
  events?: AgendaEvent[]
  selectedDate?: string
  onSelectDate?: (date: string) => void
  onEventClick?: (event: AgendaEvent) => void
  onAddEvent?: (date?: string) => void
  emptyMessage?: string
  viewMode?: "all" | "today" | "upcoming"
  readOnly?: boolean
}

export function formatAgendaDate(dateStr: string): string {
  try {
    const [year, month, day] = dateStr.split("-").map(Number)
    const d = new Date(year, month - 1, day)
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  } catch {
    return dateStr
  }
}

export const AgendaView = React.forwardRef<HTMLDivElement, AgendaViewProps>(
  (
    {
      className,
      events = [],
      selectedDate,
      onSelectDate,
      onEventClick,
      onAddEvent,
      emptyMessage = "No scheduled events for this timeframe.",
      viewMode = "all",
      readOnly = false,
      ...props
    },
    ref
  ) => {
    const [activeFilter, setActiveFilter] = React.useState<"all" | "today" | "upcoming">(viewMode)
    const [searchTerm, setSearchTerm] = React.useState("")

    // Sort events chronologically
    const sortedEvents = React.useMemo(() => {
      return [...events].sort((a, b) => {
        const dComp = a.date.localeCompare(b.date)
        if (dComp !== 0) return dComp
        return a.startTime.localeCompare(b.startTime)
      })
    }, [events])

    // Filter by search & active view
    const filteredEvents = React.useMemo(() => {
      const todayStr = "2026-10-24" // Canonical showcase date
      return sortedEvents.filter((ev) => {
        if (searchTerm) {
          const matchTerm =
            ev.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ev.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ev.description?.toLowerCase().includes(searchTerm.toLowerCase())
          if (!matchTerm) return false
        }

        if (activeFilter === "today") {
          return ev.date === todayStr
        }
        if (activeFilter === "upcoming") {
          return ev.date >= todayStr
        }
        return true
      })
    }, [sortedEvents, searchTerm, activeFilter])

    // Group filtered events by date
    const groupedByDate = React.useMemo(() => {
      const groups: Record<string, AgendaEvent[]> = {}
      filteredEvents.forEach((ev) => {
        if (!groups[ev.date]) {
          groups[ev.date] = []
        }
        groups[ev.date].push(ev)
      })
      return groups
    }, [filteredEvents])

    const dateKeys = Object.keys(groupedByDate).sort()

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Agenda Schedule"
        className={cn(
          "flex flex-col rounded-xl border border-border bg-card text-card-foreground shadow-xs overflow-hidden select-none",
          className
        )}
        {...props}
      >
        {/* Header Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/20 p-3 sm:px-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <CalendarIcon className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-xs font-bold text-foreground">Agenda View</h3>
              <p className="text-[10px] text-muted-foreground">
                Chronological calendar schedule and appointment roster
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View filter buttons */}
            <div className="flex items-center rounded-lg border border-border bg-background p-0.5 text-xs">
              {(["all", "today", "upcoming"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setActiveFilter(mode)}
                  className={cn(
                    "rounded px-2.5 py-1 text-[11px] font-medium capitalize transition-colors",
                    activeFilter === mode
                      ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {mode}
                </button>
              ))}
            </div>

            {!readOnly && onAddEvent && (
              <button
                type="button"
                onClick={() => onAddEvent()}
                className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-2xs hover:bg-primary/90 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>New Event</span>
              </button>
            )}
          </div>
        </div>

        {/* Content list */}
        <div className="p-4 sm:p-5 space-y-6 overflow-y-auto max-h-[500px]">
          {dateKeys.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/70 p-10 text-center space-y-2">
              <CalendarIcon className="h-8 w-8 text-muted-foreground/50" />
              <p className="text-xs font-semibold text-foreground">No events found</p>
              <p className="text-[11px] text-muted-foreground max-w-xs">{emptyMessage}</p>
            </div>
          ) : (
            dateKeys.map((dateKey) => {
              const dayEvents = groupedByDate[dateKey]
              const formattedDate = formatAgendaDate(dateKey)
              const isSelected = selectedDate === dateKey

              return (
                <div key={dateKey} className="space-y-2.5">
                  {/* Date section header */}
                  <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/60 bg-card/95 py-1 backdrop-blur-xs">
                    <span className="text-xs font-bold text-foreground">
                      {formattedDate}
                    </span>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
                      {dayEvents.length} {dayEvents.length === 1 ? "event" : "events"}
                    </span>
                  </div>

                  {/* Day Events list */}
                  <div className="space-y-2 pl-1 sm:pl-2">
                    {dayEvents.map((ev) => {
                      const isCancelled = ev.status === "cancelled"
                      const isTentative = ev.status === "tentative"

                      return (
                        <div
                          key={ev.id}
                          onClick={() => onEventClick?.(ev)}
                          className={cn(
                            "group relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border p-3 transition-all cursor-pointer",
                            isSelected
                              ? "border-primary bg-primary/5 shadow-2xs"
                              : "border-border/70 bg-card hover:border-primary/40 hover:bg-muted/30",
                            isCancelled && "opacity-60 bg-muted/20"
                          )}
                        >
                          {/* Left Color Bar */}
                          <div
                            className="absolute left-0 top-2 bottom-2 w-1 rounded-r"
                            style={{ backgroundColor: ev.color || "var(--primary)" }}
                          />

                          {/* Event details */}
                          <div className="flex flex-col space-y-1 pl-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4
                                className={cn(
                                  "text-xs font-bold text-foreground",
                                  isCancelled && "line-through text-muted-foreground"
                                )}
                              >
                                {ev.title}
                              </h4>

                              {ev.category && (
                                <span className="rounded-md border border-border/60 bg-muted/40 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                                  {ev.category}
                                </span>
                              )}

                              {isTentative && (
                                <span className="rounded bg-amber-500/10 px-1.5 py-0.2 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                                  Tentative
                                </span>
                              )}

                              {isCancelled && (
                                <span className="rounded bg-destructive/10 px-1.5 py-0.2 text-[10px] font-semibold text-destructive">
                                  Cancelled
                                </span>
                              )}
                            </div>

                            {ev.description && (
                              <p className="text-[11px] text-muted-foreground line-clamp-1">
                                {ev.description}
                              </p>
                            )}

                            <div className="flex flex-wrap items-center gap-3 pt-0.5 text-[11px] text-muted-foreground">
                              {/* Time */}
                              <span className="inline-flex items-center gap-1 font-mono">
                                <Clock className="h-3 w-3 text-primary shrink-0" />
                                {ev.startTime}
                                {ev.endTime && ` – ${ev.endTime}`}
                              </span>

                              {/* Location / Virtual */}
                              {ev.isVirtual ? (
                                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                                  <Video className="h-3 w-3 shrink-0" />
                                  Virtual Call
                                </span>
                              ) : ev.location ? (
                                <span className="inline-flex items-center gap-1 truncate max-w-[200px]">
                                  <MapPin className="h-3 w-3 shrink-0" />
                                  {ev.location}
                                </span>
                              ) : null}
                            </div>
                          </div>

                          {/* Right: Attendees avatar stack */}
                          {ev.attendees && ev.attendees.length > 0 && (
                            <div className="flex items-center gap-1.5 sm:self-center shrink-0 pl-2 sm:pl-0">
                              <div className="flex -space-x-1.5 overflow-hidden">
                                {ev.attendees.slice(0, 3).map((a, idx) => (
                                  <div
                                    key={idx}
                                    title={a.name}
                                    className="flex h-5 w-5 items-center justify-center rounded-full border border-background bg-primary/10 text-[9px] font-bold text-primary"
                                  >
                                    {a.name.slice(0, 1)}
                                  </div>
                                ))}
                              </div>
                              {ev.attendees.length > 3 && (
                                <span className="text-[10px] font-mono text-muted-foreground">
                                  +{ev.attendees.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer info bar */}
        <div className="flex items-center justify-between border-t border-border bg-muted/20 px-4 py-2 text-[11px] text-muted-foreground">
          <span>{filteredEvents.length} events scheduled</span>
          <span>Client-side Timeline</span>
        </div>
      </div>
    )
  }
)
AgendaView.displayName = "AgendaView"
