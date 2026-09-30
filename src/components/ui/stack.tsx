"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type StackDirection = "vertical" | "horizontal"

export type StackGap = "none" | "xs" | "sm" | "md" | "lg" | "xl"

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: StackDirection | { default?: StackDirection; sm?: StackDirection; md?: StackDirection; lg?: StackDirection }
  gap?: StackGap
  align?: "start" | "center" | "end" | "stretch" | "baseline"
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly"
  wrap?: boolean | "wrap" | "nowrap" | "wrap-reverse"
  divider?: React.ReactNode
  fullWidth?: boolean
}

const gapClasses: Record<StackGap, string> = {
  none: "gap-0",
  xs: "gap-1.5",
  sm: "gap-3",
  md: "gap-4 sm:gap-5",
  lg: "gap-6",
  xl: "gap-8 sm:gap-10",
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      direction = "vertical",
      gap = "md",
      align,
      justify,
      wrap = false,
      divider,
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    let directionClass = "flex-col"
    if (typeof direction === "string") {
      directionClass = direction === "horizontal" ? "flex-row" : "flex-col"
    } else if (typeof direction === "object") {
      directionClass = cn(
        direction.default === "horizontal" ? "flex-row" : "flex-col",
        direction.sm && (direction.sm === "horizontal" ? "sm:flex-row" : "sm:flex-col"),
        direction.md && (direction.md === "horizontal" ? "md:flex-row" : "md:flex-col"),
        direction.lg && (direction.lg === "horizontal" ? "lg:flex-row" : "lg:flex-col")
      )
    }

    const alignClasses = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    }

    const justifyClasses = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    }

    const wrapClass =
      typeof wrap === "boolean"
        ? wrap
          ? "flex-wrap"
          : "flex-nowrap"
        : wrap === "wrap-reverse"
        ? "flex-wrap-reverse"
        : wrap === "wrap"
        ? "flex-wrap"
        : "flex-nowrap"

    const childrenArray = React.Children.toArray(children).filter(Boolean)

    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          directionClass,
          gapClasses[gap],
          align && alignClasses[align],
          justify && justifyClasses[justify],
          wrapClass,
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {divider
          ? childrenArray.map((child, index) => (
              <React.Fragment key={index}>
                {child}
                {index < childrenArray.length - 1 && (
                  <div className="shrink-0 flex items-center justify-center select-none">
                    {divider}
                  </div>
                )}
              </React.Fragment>
            ))
          : children}
      </div>
    )
  }
)
Stack.displayName = "Stack"
