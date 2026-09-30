"use client"

import * as React from "react"
import { AlertCircle, ChevronDown, ChevronUp, Loader2, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface ErrorStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode
  description?: React.ReactNode
  errorDetails?: string | Error | null
  onRetry?: () => void | Promise<void>
  isRetrying?: boolean
  retryLabel?: string
  secondaryAction?: React.ReactNode
  compact?: boolean
  icon?: React.ReactNode
}

export function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred while loading this section. You can try refreshing or retrying.",
  errorDetails,
  onRetry,
  isRetrying = false,
  retryLabel = "Try Again",
  secondaryAction,
  compact = false,
  icon,
  className,
  children,
  ...props
}: ErrorStateProps) {
  const [showDetails, setShowDetails] = React.useState(false)

  const formattedDetails = React.useMemo(() => {
    if (!errorDetails) return null
    if (errorDetails instanceof Error) {
      return `${errorDetails.name}: ${errorDetails.message}\n${errorDetails.stack || ""}`
    }
    return String(errorDetails)
  }, [errorDetails])

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        "flex flex-col items-center justify-center text-center",
        compact ? "p-4 sm:p-6" : "p-8 sm:p-12",
        className
      )}
      {...props}
    >
      <div className="mb-3.5 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive ring-8 ring-destructive/10">
        {icon || <AlertCircle className="h-6 w-6 stroke-[2]" />}
      </div>

      <h4 className="text-base font-semibold tracking-tight text-foreground max-w-md">
        {title}
      </h4>

      {description && (
        <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}

      {children && <div className="mt-3">{children}</div>}

      {(onRetry || secondaryAction) && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
          {onRetry && (
            <Button
              type="button"
              size="sm"
              variant="default"
              disabled={isRetrying}
              onClick={onRetry}
            >
              {isRetrying ? (
                <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-3.5 w-3.5" />
              )}
              {retryLabel}
            </Button>
          )}
          {secondaryAction}
        </div>
      )}

      {formattedDetails && (
        <div className="mt-5 w-full max-w-md text-left">
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors mx-auto"
          >
            <span>{showDetails ? "Hide technical details" : "View technical details"}</span>
            {showDetails ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
          {showDetails && (
            <pre className="mt-2 p-3 text-[11px] font-mono rounded-md border border-border bg-muted/60 overflow-x-auto text-muted-foreground leading-normal whitespace-pre-wrap break-all">
              {formattedDetails}
            </pre>
          )}
        </div>
      )}
    </div>
  )
}
