"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
  spacing?: "none" | "sm" | "md" | "lg"
  label?: React.ReactNode
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      spacing = "md",
      label,
      children,
      ...props
    },
    ref
  ) => {
    const content = label ?? children
    const isHorizontal = orientation === "horizontal"

    const spacingClasses = {
      none: "my-0 mx-0",
      sm: isHorizontal ? "my-2" : "mx-2",
      md: isHorizontal ? "my-4" : "mx-4",
      lg: isHorizontal ? "my-6" : "mx-6",
    }

    if (content && isHorizontal) {
      return (
        <div
          ref={ref}
          role={decorative ? "none" : "separator"}
          aria-orientation={decorative ? undefined : "horizontal"}
          className={cn(
            "relative flex items-center w-full",
            spacingClasses[spacing],
            className
          )}
          {...props}
        >
          <div className="flex-grow border-t border-border" />
          <span className="shrink-0 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground select-none">
            {content}
          </span>
          <div className="flex-grow border-t border-border" />
        </div>
      )
    }

    return (
      <div
        ref={ref}
        role={decorative ? "none" : "separator"}
        aria-orientation={decorative ? undefined : orientation}
        className={cn(
          "shrink-0 bg-border",
          isHorizontal ? "h-px w-full" : "h-full w-px min-h-[1rem]",
          spacingClasses[spacing],
          className
        )}
        {...props}
      />
    )
  }
)
Divider.displayName = "Divider"

export const Separator = Divider
