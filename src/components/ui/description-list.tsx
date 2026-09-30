"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface DescriptionListProps
  extends React.HTMLAttributes<HTMLDListElement> {
  layout?: "horizontal" | "vertical" | "grid"
  columns?: 1 | 2 | 3 | 4
  divided?: boolean
}

export const DescriptionList = React.forwardRef<
  HTMLDListElement,
  DescriptionListProps
>(({ className, layout = "horizontal", columns = 1, divided = true, ...props }, ref) => {
  return (
    <dl
      ref={ref}
      className={cn(
        "w-full text-sm",
        layout === "grid" && [
          "grid gap-4",
          columns === 1 && "grid-cols-1",
          columns === 2 && "grid-cols-1 sm:grid-cols-2",
          columns === 3 && "grid-cols-1 sm:grid-cols-3",
          columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        ],
        layout !== "grid" && divided && "divide-y divide-border/60",
        layout !== "grid" && !divided && "space-y-3",
        className
      )}
      {...props}
    />
  )
})
DescriptionList.displayName = "DescriptionList"

export interface DescriptionItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  layout?: "horizontal" | "vertical"
}

export const DescriptionItem = React.forwardRef<
  HTMLDivElement,
  DescriptionItemProps
>(({ className, layout = "horizontal", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "py-3",
        layout === "horizontal"
          ? "flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4"
          : "flex flex-col gap-1",
        className
      )}
      {...props}
    />
  )
})
DescriptionItem.displayName = "DescriptionItem"

export const DescriptionTerm = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <dt
    ref={ref}
    className={cn(
      "text-xs font-semibold uppercase tracking-wider text-muted-foreground shrink-0 sm:w-1/3 max-w-xs",
      className
    )}
    {...props}
  />
))
DescriptionTerm.displayName = "DescriptionTerm"

export const DescriptionDetails = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <dd
    ref={ref}
    className={cn("text-sm text-foreground flex-1 min-w-0 font-normal", className)}
    {...props}
  />
))
DescriptionDetails.displayName = "DescriptionDetails"
