import * as React from "react"
import { cn } from "@/lib/utils"

export interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number
  widths?: Array<string | number>
  lastLineWidth?: string | number
  variant?: "paragraph" | "heading" | "caption"
  gap?: "sm" | "md" | "lg"
}

const variantHeight = {
  heading: "h-7 rounded-md",
  paragraph: "h-4 rounded",
  caption: "h-3 rounded-xs",
}

const gapMap = {
  sm: "space-y-1.5",
  md: "space-y-2.5",
  lg: "space-y-3.5",
}

export const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  (
    {
      lines = 3,
      widths,
      lastLineWidth = "60%",
      variant = "paragraph",
      gap = "md",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="presentation"
        aria-hidden="true"
        className={cn("w-full select-none", gapMap[gap], className)}
        {...props}
      >
        {Array.from({ length: lines }).map((_, index) => {
          const isLast = index === lines - 1
          let widthStyle: string | number = "100%"

          if (widths && widths[index] !== undefined) {
            widthStyle = widths[index]
          } else if (isLast && lines > 1) {
            widthStyle = lastLineWidth
          }

          const styleObj: React.CSSProperties =
            typeof widthStyle === "number"
              ? { width: `${widthStyle}px` }
              : { width: widthStyle }

          return (
            <div
              key={index}
              style={styleObj}
              className={cn(
                "relative overflow-hidden bg-muted/60 dark:bg-muted/40",
                "before:absolute before:inset-0 before:-translate-x-full",
                "before:animate-[shimmer_2s_infinite] motion-reduce:before:animate-none",
                "before:bg-gradient-to-r before:from-transparent before:via-foreground/5 dark:before:via-white/5 before:to-transparent",
                variantHeight[variant]
              )}
            />
          )
        })}
      </div>
    )
  }
)

SkeletonText.displayName = "SkeletonText"
