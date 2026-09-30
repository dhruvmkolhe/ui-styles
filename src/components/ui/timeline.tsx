"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Check, Clock, AlertCircle } from "lucide-react"

export type TimelineItemStatus = "completed" | "current" | "upcoming" | "error"

export interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  orientation?: "vertical" | "horizontal"
}

export const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
  ({ className, orientation = "vertical", children, ...props }, ref) => {
    return (
      <ol
        ref={ref}
        role="list"
        className={cn(
          "relative",
          orientation === "vertical" ? "flex flex-col space-y-6" : "flex flex-row items-start space-x-6 overflow-x-auto pb-4",
          className
        )}
        {...props}
      >
        {children}
      </ol>
    )
  }
)
Timeline.displayName = "Timeline"

export interface TimelineItemProps
  extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "title"> {
  status?: TimelineItemStatus
  title: React.ReactNode
  description?: React.ReactNode
  timestamp?: React.ReactNode
  icon?: React.ReactNode
  isLast?: boolean
  badge?: React.ReactNode
}

export const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  (
    {
      className,
      status = "upcoming",
      title,
      description,
      timestamp,
      icon,
      isLast = false,
      badge,
      children,
      ...props
    },
    ref
  ) => {
    const renderDefaultIcon = () => {
      switch (status) {
        case "completed":
          return <Check className="h-3 w-3 stroke-[3]" />
        case "current":
          return <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
        case "error":
          return <AlertCircle className="h-3 w-3" />
        case "upcoming":
        default:
          return <Clock className="h-3 w-3 opacity-60" />
      }
    }

    return (
      <li
        ref={ref}
        aria-current={status === "current" ? "step" : undefined}
        className={cn("relative flex gap-4 group", className)}
        {...props}
      >
        {/* Node column: icon and vertical connector */}
        <div className="relative flex flex-col items-center">
          <div
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold shadow-sm transition-colors z-10 shrink-0",
              status === "completed" && "bg-primary text-primary-foreground border-primary",
              status === "current" && "border-primary bg-background text-primary ring-4 ring-primary/20",
              status === "error" && "bg-destructive text-destructive-foreground border-destructive",
              status === "upcoming" && "border-border bg-muted/50 text-muted-foreground"
            )}
          >
            {icon ?? renderDefaultIcon()}
          </div>

          {!isLast && (
            <div
              className={cn(
                "absolute top-7 bottom-[-24px] w-0.5",
                status === "completed" ? "bg-primary/80" : "bg-border"
              )}
            />
          )}
        </div>

        {/* Content column */}
        <div className="flex-1 pt-0.5 pb-2 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-foreground leading-snug">{title}</h4>
              {badge}
            </div>
            {timestamp && (
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {timestamp}
              </span>
            )}
          </div>
          {description && (
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
          {children && <div className="mt-2 text-xs">{children}</div>}
        </div>
      </li>
    )
  }
)
TimelineItem.displayName = "TimelineItem"
