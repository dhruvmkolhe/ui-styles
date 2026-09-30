"use client"

import * as React from "react"
import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SuccessDetailItem {
  label: string
  value: React.ReactNode
}

export interface SuccessStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode
  description?: React.ReactNode
  details?: SuccessDetailItem[]
  action?: React.ReactNode
  secondaryAction?: React.ReactNode
  icon?: React.ReactNode
  compact?: boolean
}

export function SuccessState({
  title = "Operation completed successfully",
  description = "Your changes have been processed and saved across all connected systems.",
  details,
  action,
  secondaryAction,
  icon,
  compact = false,
  className,
  children,
  ...props
}: SuccessStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center text-center",
        compact ? "p-4 sm:p-6" : "p-8 sm:p-12",
        className
      )}
      {...props}
    >
      <div className="mb-3.5 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 ring-8 ring-emerald-500/10">
        {icon || <CheckCircle2 className="h-6 w-6 stroke-[2.25]" />}
      </div>

      <h4 className="text-base font-semibold tracking-tight text-foreground max-w-md">
        {title}
      </h4>

      {description && (
        <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}

      {details && details.length > 0 && (
        <div className="mt-5 w-full max-w-sm rounded-lg border border-border bg-muted/40 p-3 text-xs text-left divide-y divide-border">
          {details.map((item, idx) => (
            <div key={idx} className={cn("flex justify-between items-center py-2 first:pt-0 last:pb-0")}>
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-semibold text-foreground font-mono">{item.value}</span>
            </div>
          ))}
        </div>
      )}

      {children && <div className="mt-4">{children}</div>}

      {(action || secondaryAction) && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  )
}
