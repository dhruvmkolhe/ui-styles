import * as React from "react"
import { cn } from "@/lib/utils"

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number
  variant?: "primary" | "secondary" | "muted" | "white" | "current"
  label?: string
  showLabel?: boolean
  inline?: boolean
}

const sizeMap = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
}

const strokeMap = {
  xs: 2.5,
  sm: 2.5,
  md: 3,
  lg: 3,
  xl: 3.5,
}

const variantMap = {
  primary: "text-primary",
  secondary: "text-secondary-foreground",
  muted: "text-muted-foreground",
  white: "text-white",
  current: "text-current",
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      size = "md",
      variant = "primary",
      label,
      showLabel = false,
      inline = false,
      className,
      ...props
    },
    ref
  ) => {
    const isNamedSize = typeof size === "string" && size in sizeMap
    const sizeClass = isNamedSize ? sizeMap[size as keyof typeof sizeMap] : ""
    const strokeWidth = isNamedSize ? strokeMap[size as keyof typeof strokeMap] : 3
    const customStyle =
      typeof size === "number"
        ? { width: `${size}px`, height: `${size}px` }
        : undefined

    const accessibleLabel = label || "Loading"

    return (
      <div
        ref={ref}
        role="status"
        aria-label={accessibleLabel}
        className={cn(
          inline ? "inline-flex items-center gap-2" : "flex items-center gap-2.5",
          className
        )}
        {...props}
      >
        <svg
          className={cn(
            "animate-spin motion-reduce:animate-none",
            sizeClass,
            variantMap[variant]
          )}
          style={customStyle}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />
          <path
            className="opacity-90"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>

        {showLabel && label && (
          <span className="text-xs font-medium text-foreground select-none">
            {label}
          </span>
        )}

        <span className="sr-only">{accessibleLabel}</span>
      </div>
    )
  }
)

Spinner.displayName = "Spinner"
