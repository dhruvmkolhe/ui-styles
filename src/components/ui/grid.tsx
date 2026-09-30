"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface ResponsiveGridCols {
  default?: GridCols
  sm?: GridCols
  md?: GridCols
  lg?: GridCols
  xl?: GridCols
}

export type GridGap = "none" | "xs" | "sm" | "md" | "lg" | "xl"

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: GridCols | ResponsiveGridCols
  gap?: GridGap
  rowGap?: GridGap
  colGap?: GridGap
  flow?: "row" | "col" | "dense" | "row-dense" | "col-dense"
  autoFit?: boolean
  minItemWidth?: string
  align?: "start" | "center" | "end" | "stretch"
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly"
}

const gapClasses: Record<GridGap, string> = {
  none: "gap-0",
  xs: "gap-2",
  sm: "gap-3",
  md: "gap-4 sm:gap-6",
  lg: "gap-6 sm:gap-8",
  xl: "gap-8 sm:gap-12",
}

const colClasses: Record<GridCols, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  11: "grid-cols-11",
  12: "grid-cols-12",
}

const smColClasses: Record<GridCols, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
  6: "sm:grid-cols-6",
  7: "sm:grid-cols-7",
  8: "sm:grid-cols-8",
  9: "sm:grid-cols-9",
  10: "sm:grid-cols-10",
  11: "sm:grid-cols-11",
  12: "sm:grid-cols-12",
}

const mdColClasses: Record<GridCols, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
  7: "md:grid-cols-7",
  8: "md:grid-cols-8",
  9: "md:grid-cols-9",
  10: "md:grid-cols-10",
  11: "md:grid-cols-11",
  12: "md:grid-cols-12",
}

const lgColClasses: Record<GridCols, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
  7: "lg:grid-cols-7",
  8: "lg:grid-cols-8",
  9: "lg:grid-cols-9",
  10: "lg:grid-cols-10",
  11: "lg:grid-cols-11",
  12: "lg:grid-cols-12",
}

const xlColClasses: Record<GridCols, string> = {
  1: "xl:grid-cols-1",
  2: "xl:grid-cols-2",
  3: "xl:grid-cols-3",
  4: "xl:grid-cols-4",
  5: "xl:grid-cols-5",
  6: "xl:grid-cols-6",
  7: "xl:grid-cols-7",
  8: "xl:grid-cols-8",
  9: "xl:grid-cols-9",
  10: "xl:grid-cols-10",
  11: "xl:grid-cols-11",
  12: "xl:grid-cols-12",
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      cols = 1,
      gap = "md",
      rowGap,
      colGap,
      flow,
      autoFit = false,
      minItemWidth = "240px",
      align,
      justify,
      style,
      ...props
    },
    ref
  ) => {
    let colClassNames = ""
    if (typeof cols === "number") {
      colClassNames = colClasses[cols] || "grid-cols-1"
    } else if (typeof cols === "object") {
      colClassNames = cn(
        cols.default ? colClasses[cols.default] : "grid-cols-1",
        cols.sm && smColClasses[cols.sm],
        cols.md && mdColClasses[cols.md],
        cols.lg && lgColClasses[cols.lg],
        cols.xl && xlColClasses[cols.xl]
      )
    }

    const flowClasses = {
      row: "grid-flow-row",
      col: "grid-flow-col",
      dense: "grid-flow-dense",
      "row-dense": "grid-flow-row-dense",
      "col-dense": "grid-flow-col-dense",
    }

    const alignClasses = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    }

    const justifyClasses = {
      start: "justify-items-start",
      center: "justify-items-center",
      end: "justify-items-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    }

    const customStyle: React.CSSProperties = {
      ...style,
      ...(autoFit
        ? {
            gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`,
          }
        : {}),
    }

    return (
      <div
        ref={ref}
        style={customStyle}
        className={cn(
          "grid w-full",
          !autoFit && colClassNames,
          gapClasses[gap],
          rowGap && `gap-y-${rowGap === "none" ? 0 : rowGap === "xs" ? 2 : rowGap === "sm" ? 3 : 6}`,
          colGap && `gap-x-${colGap === "none" ? 0 : colGap === "xs" ? 2 : colGap === "sm" ? 3 : 6}`,
          flow && flowClasses[flow],
          align && alignClasses[align],
          justify && justifyClasses[justify],
          className
        )}
        {...props}
      />
    )
  }
)
Grid.displayName = "Grid"

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full"
  rowSpan?: 1 | 2 | 3 | 4 | 5 | 6 | "full"
  colStart?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  rowStart?: 1 | 2 | 3 | 4 | 5 | 6
}

const spanClasses: Record<string, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
  full: "col-span-full",
}

const rowSpanClasses: Record<string, string> = {
  1: "row-span-1",
  2: "row-span-2",
  3: "row-span-3",
  4: "row-span-4",
  5: "row-span-5",
  6: "row-span-6",
  full: "row-span-full",
}

export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, colSpan, rowSpan, colStart, rowStart, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          colSpan && spanClasses[String(colSpan)],
          rowSpan && rowSpanClasses[String(rowSpan)],
          colStart && `col-start-${colStart}`,
          rowStart && `row-start-${rowStart}`,
          className
        )}
        {...props}
      />
    )
  }
)
GridItem.displayName = "GridItem"
