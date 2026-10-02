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
  columnClassName?: string
}

const gapClasses: Record<MasonryGap, string> = {
  none: "gap-0",
  xs: "gap-2",
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
}

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const

function useColumnCount(cols: MasonryCols | ResponsiveMasonryCols = { default: 1, sm: 2, md: 3 }): number {
  const isNumber = typeof cols === "number"
  const defaultCol = isNumber ? cols : cols.default ?? 1
  const smCol = !isNumber ? cols.sm : undefined
  const mdCol = !isNumber ? cols.md : undefined
  const lgCol = !isNumber ? cols.lg : undefined
  const xlCol = !isNumber ? cols.xl : undefined

  // Match SSR initial state to avoid hydration mismatch
  const [columnCount, setColumnCount] = React.useState<number>(defaultCol)

  React.useEffect(() => {
    const computeCount = (): number => {
      if (isNumber) return defaultCol
      const width = window.innerWidth
      if (width >= BREAKPOINTS.xl) return xlCol ?? lgCol ?? mdCol ?? smCol ?? defaultCol
      if (width >= BREAKPOINTS.lg) return lgCol ?? mdCol ?? smCol ?? defaultCol
      if (width >= BREAKPOINTS.md) return mdCol ?? smCol ?? defaultCol
      if (width >= BREAKPOINTS.sm) return smCol ?? defaultCol
      return defaultCol
    }

    let rafId: number | null = null
    const handleResize = () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        setColumnCount(computeCount())
      })
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      window.removeEventListener("resize", handleResize)
    }
  }, [isNumber, defaultCol, smCol, mdCol, lgCol, xlCol])

  return columnCount
}

export const Masonry = React.forwardRef<HTMLDivElement, MasonryProps>(
  ({ className, cols = { default: 1, sm: 2, md: 3 }, gap = "md", columnClassName, children, ...props }, ref) => {
    const columnCount = useColumnCount(cols)

    const childArray = React.useMemo(() => {
      return React.Children.toArray(children).filter(Boolean)
    }, [children])

    const columns = React.useMemo(() => {
      const safeCols = Math.max(1, Math.min(6, columnCount))
      const colBuckets: React.ReactNode[][] = Array.from({ length: safeCols }, () => [])
      childArray.forEach((child, index) => {
        colBuckets[index % safeCols].push(child)
      })
      return colBuckets
    }, [childArray, columnCount])

    return (
      <div
        ref={ref}
        suppressHydrationWarning
        className={cn(
          "flex w-full items-start",
          gapClasses[gap],
          className
        )}
        {...props}
      >
        {columns.map((colChildren, colIdx) => (
          <div
            key={colIdx}
            className={cn(
              "flex-1 min-w-0 flex flex-col",
              gapClasses[gap],
              columnClassName
            )}
          >
            {colChildren}
          </div>
        ))}
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
        className={cn("w-full", className)}
        {...props}
      />
    )
  }
)
MasonryItem.displayName = "MasonryItem"
