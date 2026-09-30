"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type MasonryCols = 1 | 2 | 3 | 4 | 5 | 6

export interface ResponsiveMasonryCols {
  default?: MasonryCols
  sm?: MasonryCols
  md?: MasonryCols
  lg?: MasonryCols
  xl?: MasonryCols
}

export type MasonryGap = "none" | "xs" | "sm" | "md" | "lg"

export interface MasonryProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: MasonryCols | ResponsiveMasonryCols
  gap?: MasonryGap
}

const columnClasses: Record<MasonryCols, string> = {
  1: "columns-1",
  2: "columns-2",
  3: "columns-3",
  4: "columns-4",
  5: "columns-5",
  6: "columns-6",
}

const smColClasses: Record<MasonryCols, string> = {
  1: "sm:columns-1",
  2: "sm:columns-2",
  3: "sm:columns-3",
  4: "sm:columns-4",
  5: "sm:columns-5",
  6: "sm:columns-6",
}

const mdColClasses: Record<MasonryCols, string> = {
  1: "md:columns-1",
  2: "md:columns-2",
  3: "md:columns-3",
  4: "md:columns-4",
  5: "md:columns-5",
  6: "md:columns-6",
}

const lgColClasses: Record<MasonryCols, string> = {
  1: "lg:columns-1",
  2: "lg:columns-2",
  3: "lg:columns-3",
  4: "lg:columns-4",
  5: "lg:columns-5",
  6: "lg:columns-6",
}

const xlColClasses: Record<MasonryCols, string> = {
  1: "xl:columns-1",
  2: "xl:columns-2",
  3: "xl:columns-3",
  4: "xl:columns-4",
  5: "xl:columns-5",
  6: "xl:columns-6",
}

const gapClasses: Record<MasonryGap, string> = {
  none: "gap-0 [&>*]:mb-0",
  xs: "gap-2 [&>*]:mb-2",
  sm: "gap-3 [&>*]:mb-3",
  md: "gap-4 [&>*]:mb-4",
  lg: "gap-6 [&>*]:mb-6",
}

export const Masonry = React.forwardRef<HTMLDivElement, MasonryProps>(
  ({ className, cols = { default: 1, sm: 2, md: 3 }, gap = "md", children, ...props }, ref) => {
    let colClassNames = ""
    if (typeof cols === "number") {
      colClassNames = columnClasses[cols] || "columns-1"
    } else if (typeof cols === "object") {
      colClassNames = cn(
        cols.default ? columnClasses[cols.default] : "columns-1",
        cols.sm && smColClasses[cols.sm],
        cols.md && mdColClasses[cols.md],
        cols.lg && lgColClasses[cols.lg],
        cols.xl && xlColClasses[cols.xl]
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-full",
          colClassNames,
          gapClasses[gap],
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child
          return (
            <div className="break-inside-avoid">
              {child}
            </div>
          )
        })}
      </div>
    )
  }
)
Masonry.displayName = "Masonry"

export interface MasonryItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MasonryItem = React.forwardRef<HTMLDivElement, MasonryItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("break-inside-avoid w-full", className)}
        {...props}
      />
    )
  }
)
MasonryItem.displayName = "MasonryItem"
