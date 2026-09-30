import * as React from "react"
import { cn } from "@/lib/utils"

export interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number // 0-100; if undefined, treated as indeterminate
  indeterminate?: boolean
  size?: "sm" | "md" | "lg" | "xl" | number
  strokeWidth?: number
  variant?: "default" | "success" | "warning" | "error"
  showValue?: boolean
  label?: string
  children?: React.ReactNode
}

const sizeMap = {
  sm: 36,
  md: 48,
  lg: 64,
  xl: 96,
}

const variantStrokeMap = {
  default: "text-primary",
  success: "text-emerald-600 dark:text-emerald-400",
  warning: "text-amber-500",
  error: "text-rose-500",
}

export const CircularProgress = React.forwardRef<HTMLDivElement, CircularProgressProps>(
  (
    {
      value,
      indeterminate = value === undefined,
      size = "md",
      strokeWidth = 4,
      variant = "default",
      showValue = false,
      label,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const dimension = typeof size === "number" ? size : sizeMap[size] ?? 48
    const radius = (dimension - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius

    const clampedValue =
      typeof value === "number" ? Math.min(100, Math.max(0, value)) : undefined
    const strokeDashoffset =
      clampedValue !== undefined
        ? circumference - (clampedValue / 100) * circumference
        : circumference * 0.75

    const isIndeterminate = indeterminate || clampedValue === undefined

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-label={label || (isIndeterminate ? "Loading" : "Progress")}
        aria-valuemin={isIndeterminate ? undefined : 0}
        aria-valuemax={isIndeterminate ? undefined : 100}
        aria-valuenow={isIndeterminate ? undefined : clampedValue}
        className={cn(
          "relative inline-flex items-center justify-center shrink-0",
          className
        )}
        style={{ width: dimension, height: dimension }}
        {...props}
      >
        <svg
          width={dimension}
          height={dimension}
          viewBox={`0 0 ${dimension} ${dimension}`}
          className={cn(
            isIndeterminate
              ? "animate-spin motion-reduce:animate-none"
              : "-rotate-90 transition-transform duration-300"
          )}
        >
          {/* Background track */}
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            className="text-muted/30"
          />

          {/* Active progress stroke */}
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={isIndeterminate ? circumference * 0.75 : strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            className={cn(
              variantStrokeMap[variant],
              !isIndeterminate && "transition-all duration-300 ease-out"
            )}
          />
        </svg>

        {/* Center label / value */}
        <div className="absolute inset-0 flex items-center justify-center text-center">
          {children ? (
            children
          ) : showValue && clampedValue !== undefined ? (
            <span
              className={cn(
                "font-mono font-bold leading-none text-foreground select-none",
                dimension <= 40 ? "text-[10px]" : dimension <= 60 ? "text-xs" : "text-sm"
              )}
            >
              {Math.round(clampedValue)}%
            </span>
          ) : null}
        </div>
      </div>
    )
  }
)

CircularProgress.displayName = "CircularProgress"
