import * as React from "react"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"
import { CheckCircle2, AlertCircle, Clock, X } from "lucide-react"

export type ProcessingStatus = "idle" | "processing" | "success" | "error"

export interface ProcessingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: ProcessingStatus
  title?: string
  description?: React.ReactNode
  progress?: number // optional 0-100 for determinate progress
  onCancel?: () => void
  onRetry?: () => void
  variant?: "card" | "inline" | "banner"
}

const statusConfig: Record<
  ProcessingStatus,
  {
    name: string
    title: string
    color: string
    border: string
    bg: string
    icon: React.ComponentType<{ className?: string }>
  }
> = {
  idle: {
    name: "Idle",
    title: "Standing By",
    color: "text-muted-foreground",
    border: "border-border",
    bg: "bg-muted/30",
    icon: Clock,
  },
  processing: {
    name: "Processing",
    title: "Processing Request...",
    color: "text-primary",
    border: "border-primary/30",
    bg: "bg-primary/5",
    icon: () => <Spinner size="sm" variant="primary" />,
  },
  success: {
    name: "Success",
    title: "Operation Completed",
    color: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    icon: CheckCircle2,
  },
  error: {
    name: "Error",
    title: "Processing Failed",
    color: "text-rose-600 dark:text-rose-400",
    border: "border-rose-500/30",
    bg: "bg-rose-500/10",
    icon: AlertCircle,
  },
}

export const ProcessingIndicator = React.forwardRef<HTMLDivElement, ProcessingIndicatorProps>(
  (
    {
      status,
      title,
      description,
      progress,
      onCancel,
      onRetry,
      variant = "card",
      className,
      ...props
    },
    ref
  ) => {
    const config = statusConfig[status] ?? statusConfig.idle
    const StatusIcon = config.icon
    const heading = title ?? config.title

    if (variant === "inline") {
      return (
        <div
          ref={ref}
          role="status"
          aria-live="polite"
          className={cn("inline-flex items-center gap-2 text-xs", className)}
          {...props}
        >
          <span className="shrink-0 flex items-center justify-center">
            <StatusIcon className="h-4 w-4" />
          </span>
          <span className="font-semibold text-foreground">{heading}</span>
          {description && (
            <span className="text-muted-foreground">&middot; {description}</span>
          )}
        </div>
      )
    }

    if (variant === "banner") {
      return (
        <div
          ref={ref}
          role="status"
          aria-live="polite"
          className={cn(
            "flex items-center justify-between gap-4 p-3.5 rounded-lg border text-xs shadow-xs",
            config.bg,
            config.border,
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-3">
            <span className="shrink-0">
              <StatusIcon className="h-4 w-4" />
            </span>
            <div>
              <span className="font-bold text-foreground">{heading}</span>
              {description && (
                <p className="text-[11px] text-muted-foreground mt-0.5">{description}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {status === "processing" && onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Cancel processing"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            {status === "error" && onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="px-2.5 py-1 text-xs font-semibold rounded bg-background border border-border shadow-xs hover:bg-muted transition-colors"
              >
                Retry
              </button>
            )}
          </div>
        </div>
      )
    }

    // Default: "card"
    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn(
          "rounded-xl border p-5 shadow-xs bg-card space-y-3 transition-colors",
          config.border,
          className
        )}
        {...props}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "p-2.5 rounded-xl flex items-center justify-center shrink-0",
                config.bg
              )}
            >
              <StatusIcon className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">{heading}</h4>
              {description && (
                <p className="text-[11px] text-muted-foreground mt-0.5">{description}</p>
              )}
            </div>
          </div>

          {status === "processing" && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="text-xs text-muted-foreground hover:text-foreground border border-border px-2 py-0.5 rounded shadow-xs"
            >
              Cancel
            </button>
          )}

          {status === "error" && onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="text-xs font-bold text-primary hover:underline"
            >
              Try Again
            </button>
          )}
        </div>

        {/* Determinate progress bar if progress is specified during processing */}
        {typeof progress === "number" && status === "processing" && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted/60 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
)

ProcessingIndicator.displayName = "ProcessingIndicator"
