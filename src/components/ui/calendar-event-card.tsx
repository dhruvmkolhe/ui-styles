"use client"

import * as React from "react"
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  Users,
  Check,
  X,
  ExternalLink,
  MoreVertical,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type EventStatus = "confirmed" | "tentative" | "cancelled"

export interface EventAttendee {
  id: string
  name: string
  avatar?: string
}

export interface CalendarEvent {
  id: string
  title: string
  description?: string
  date: string // e.g. "2026-10-24"
  startTime: string // e.g. "10:00 AM"
  endTime?: string // e.g. "11:30 AM"
  category?: string
  color?: string
  location?: string
  meetingLink?: string
  attendees?: EventAttendee[]
  status?: EventStatus
}

export interface CalendarEventCardProps extends React.HTMLAttributes<HTMLDivElement> {
  event: CalendarEvent
  variant?: "card" | "compact"
  onJoinMeeting?: (event: CalendarEvent) => void
  onRSVP?: (event: CalendarEvent, status: "accepted" | "declined") => void
  onDelete?: (event: CalendarEvent) => void
}

export function CalendarEventCard({
  className,
  event,
  variant = "card",
  onJoinMeeting,
  onRSVP,
  onDelete,
  ...props
}: CalendarEventCardProps) {
  const isCancelled = event.status === "cancelled"
  const isTentative = event.status === "tentative"

  if (variant === "compact") {
    return (
      <div
        role="article"
        className={cn(
          "flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-2.5 text-xs transition-colors hover:bg-muted/40",
          isCancelled && "opacity-60 bg-muted/20 line-through",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className="h-2.5 w-2.5 rounded-full shrink-0"
            style={{ backgroundColor: event.color || "#3b82f6" }}
          />
          <div className="min-w-0">
            <h4 className="font-semibold text-foreground truncate">{event.title}</h4>
            <p className="text-[11px] text-muted-foreground font-mono">
              {event.startTime} {event.endTime && `- ${event.endTime}`}
            </p>
          </div>
        </div>

        {event.meetingLink && onJoinMeeting && (
          <button
            type="button"
            onClick={() => onJoinMeeting(event)}
            className="inline-flex items-center gap-1 rounded bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary hover:bg-primary/20 shrink-0"
          >
            <Video className="h-3 w-3" />
            <span>Join</span>
          </button>
        )}
      </div>
    )
  }

  return (
    <div
      role="article"
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-xs transition-all",
        "hover:border-primary/50 hover:shadow-md",
        isCancelled && "opacity-60 bg-muted/20",
        className
      )}
      {...props}
    >
      {/* Header: Category & Status */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-full shrink-0"
            style={{ backgroundColor: event.color || "#3b82f6" }}
          />
          {event.category && (
            <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              {event.category}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {isCancelled && (
            <span className="rounded bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase">
              Cancelled
            </span>
          )}
          {isTentative && (
            <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase">
              Tentative
            </span>
          )}
        </div>
      </div>

      {/* Title & Description */}
      <div>
        <h3 className={cn("text-sm font-bold text-foreground", isCancelled && "line-through")}>
          {event.title}
        </h3>
        {event.description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        )}
      </div>

      {/* Date, Time, and Location meta */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground pt-1 border-t border-border/60">
        <div className="flex items-center gap-1.5 font-mono">
          <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
          <span>
            {event.startTime} {event.endTime && `– ${event.endTime}`}
          </span>
        </div>

        <div className="flex items-center gap-1.5 font-mono">
          <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
          <span>{event.date}</span>
        </div>

        {event.location && (
          <div className="flex items-center gap-1.5 col-span-full truncate">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        )}
      </div>

      {/* Attendees and Actions Footer */}
      <div className="flex items-center justify-between gap-3 border-t border-border/60 pt-3 mt-1">
        {/* Attendees */}
        {event.attendees && event.attendees.length > 0 ? (
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-1.5 overflow-hidden">
              {event.attendees.map((attendee) => (
                <div
                  key={attendee.id}
                  title={attendee.name}
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-card bg-primary/20 text-[10px] font-bold text-primary ring-1 ring-background"
                >
                  {attendee.avatar ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={attendee.avatar} alt={attendee.name} className="h-full w-full rounded-full" />
                  ) : (
                    attendee.name.slice(0, 1)
                  )}
                </div>
              ))}
            </div>
            <span className="text-[11px] text-muted-foreground font-mono">
              {event.attendees.length} guests
            </span>
          </div>
        ) : (
          <div />
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5">
          {event.meetingLink && (
            <button
              type="button"
              onClick={() => onJoinMeeting?.(event)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-2.5 py-1 text-xs font-semibold shadow-2xs hover:bg-primary/90 transition-colors"
            >
              <Video className="h-3.5 w-3.5" />
              <span>Join Call</span>
            </button>
          )}

          {onRSVP && !isCancelled && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onRSVP(event, "accepted")}
                aria-label="Accept RSVP"
                className="rounded-md border border-border p-1 text-emerald-600 hover:bg-emerald-500/10 transition-colors"
              >
                <Check className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onRSVP(event, "declined")}
                aria-label="Decline RSVP"
                className="rounded-md border border-border p-1 text-rose-600 hover:bg-rose-500/10 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
CalendarEventCard.displayName = "CalendarEventCard"
