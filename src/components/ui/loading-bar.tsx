import * as React from "react"
import { cn } from "@/lib/utils"

export interface LoadingBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number // 0 to 100
  indeterminate?: boolean
  size?: "sm" | "md" | "lg"
  variant?: "default" | "success" | "warning" | "error" | "gradient"
  label?: string
  showValue?: boolean
  disabled?: boolean
}

const heightMap = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
}

const variantFillMap = {
  default: "bg-primary",
  success: "bg-emerald-600 dark:bg-emerald-500",
  warning: "bg-amber-500",
  error: "bg-rose-500",
  gradient: "bg-gradient-to-r from-teal-500 to-indigo-600",
}

export const LoadingBar = React.forwardRef<HTMLDivElement, LoadingBarProps>(
  (
    {
      value,
      indeterminate = value === undefined,
      size = "md",
      variant = "default",
      label,
      showValue = false,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const isDeterminate = !indeterminate && typeof value === "number"
    const clampedValue = isDeterminate
      ? Math.min(100, Math.max(0, value as number))
      : undefined

    return (
      <div
        ref={ref}
        className={cn(
          "w-full space-y-1.5",
          disabled && "opacity-50 pointer-events-none",
          className
        )}
        {...props}
      >
        {/* Header with label and value */}
        {(label || (showValue && isDeterminate)) && (
          <div className="flex items-center justify-between text-xs">
            {label && <span className="font-semibold text-foreground">{label}</span>}
            {showValue && isDeterminate && (
              <span className="font-mono text-muted-foreground ml-auto">
                {Math.round(clampedValue as number)}%
              </span>
            )}
          </div>
        )}

        {/* Progress Bar Container */}
        <div
          role="progressbar"
          aria-label={label || (isDeterminate ? "Progress" : "Loading")}
          aria-valuemin={isDeterminate ? 0 : undefined}
          aria-valuemax={isDeterminate ? 100 : undefined}
          aria-valuenow={clampedValue}
          className={cn(
            "relative w-full overflow-hidden rounded-full bg-muted/60 dark:bg-muted/30 shadow-inner",
            heightMap[size]
          )}
        >
          {isDeterminate ? (
            <div
              className={cn(
                "h-full rounded-full transition-all duration-300 ease-out",
                variantFillMap[variant]
              )}
              style={{ width: `${clampedValue}%` }}
            />
          ) : (
            <div
              className={cn(
                "h-full rounded-full w-1/3 animate-[indeterminate_1.5s_infinite_linear] motion-reduce:animate-none",
                variantFillMap[variant]
              )}
            />
          )}
        </div>
      </div>
    )
  }
)

LoadingBar.displayName = "LoadingBar"
