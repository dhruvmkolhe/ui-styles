"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode
  value: React.ReactNode
  description?: React.ReactNode
  trend?: {
    value: string | number
    direction: "up" | "down" | "neutral"
    label?: string
  }
  icon?: React.ReactNode
  badge?: React.ReactNode
  footer?: React.ReactNode
}

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      className,
      label,
      value,
      description,
      trend,
      icon,
      badge,
      footer,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {label}
          </div>
          {icon ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              {icon}
            </div>
          ) : badge ? (
            <div>{badge}</div>
          ) : null}
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <div className="text-2xl font-bold tracking-tight text-foreground font-mono">
            {value}
          </div>
          {trend && (
            <div
              className={cn(
                "inline-flex items-center gap-1 text-xs font-semibold px-1.5 py-0.5 rounded",
                trend.direction === "up" && "text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-950/40",
                trend.direction === "down" && "text-rose-700 bg-rose-50 dark:text-rose-300 dark:bg-rose-950/40",
                trend.direction === "neutral" && "text-muted-foreground bg-muted"
              )}
            >
              {trend.direction === "up" && <TrendingUp className="h-3 w-3 stroke-[2.5]" />}
              {trend.direction === "down" && <TrendingDown className="h-3 w-3 stroke-[2.5]" />}
              {trend.direction === "neutral" && <Minus className="h-3 w-3" />}
              <span>{trend.value}</span>
            </div>
          )}
        </div>

        {(description || trend?.label) && (
          <p className="mt-1 text-xs text-muted-foreground">
            {description || trend?.label}
          </p>
        )}

        {footer && <div className="mt-3 pt-3 border-t border-border/50 text-xs">{footer}</div>}
      </div>
    )
  }
)
StatCard.displayName = "StatCard"
