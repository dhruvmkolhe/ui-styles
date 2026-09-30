import * as React from "react"
import { cn } from "@/lib/utils"

export interface ShimmerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "block" | "text" | "avatar" | "circle"
  width?: string | number
  height?: string | number
  rounded?: "none" | "sm" | "md" | "lg" | "full"
  count?: number
}

const roundedMap = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
}

export const Shimmer = React.forwardRef<HTMLDivElement, ShimmerProps>(
  (
    {
      variant = "block",
      width,
      height,
      rounded = variant === "avatar" || variant === "circle" ? "full" : "md",
      count = 1,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const inlineStyle: React.CSSProperties = {
      ...(width !== undefined
        ? { width: typeof width === "number" ? `${width}px` : width }
        : {}),
      ...(height !== undefined
        ? { height: typeof height === "number" ? `${height}px` : height }
        : {}),
      ...style,
    }

    const defaultVariantClasses = {
      block: "h-24 w-full",
      text: "h-4 w-full",
      avatar: "h-10 w-10 shrink-0",
      circle: "h-12 w-12 shrink-0",
    }

    const baseClasses = cn(
      "relative overflow-hidden bg-muted/60 dark:bg-muted/40",
      "before:absolute before:inset-0 before:-translate-x-full",
      "before:animate-[shimmer_2s_infinite] motion-reduce:before:animate-none",
      "before:bg-gradient-to-r before:from-transparent before:via-foreground/5 dark:before:via-white/5 before:to-transparent",
      roundedMap[rounded],
      defaultVariantClasses[variant],
      className
    )

    if (count > 1) {
      return (
        <div ref={ref} className="space-y-2.5 w-full" aria-hidden="true" {...props}>
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className={baseClasses} style={inlineStyle} />
          ))}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={baseClasses}
        style={inlineStyle}
        {...props}
      />
    )
  }
)

Shimmer.displayName = "Shimmer"
