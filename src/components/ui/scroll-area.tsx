"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal" | "both"
  maxHeight?: string | number
  maxWidth?: string | number
  hideScrollbar?: boolean
}

export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      className,
      orientation = "vertical",
      maxHeight,
      maxWidth,
      hideScrollbar = false,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const overflowClasses = {
      vertical: "overflow-y-auto overflow-x-hidden",
      horizontal: "overflow-x-auto overflow-y-hidden",
      both: "overflow-auto",
    }

    const resolvedStyle: React.CSSProperties = {
      ...style,
      ...(maxHeight ? { maxHeight } : {}),
      ...(maxWidth ? { maxWidth } : {}),
    }

    return (
      <div
        ref={ref}
        role="region"
        tabIndex={0}
        aria-label="Scrollable content region"
        style={resolvedStyle}
        className={cn(
          "relative w-full outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-inset",
          overflowClasses[orientation],
          hideScrollbar ? "scrollbar-none" : "scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ScrollArea.displayName = "ScrollArea"
