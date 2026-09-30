"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "prose"
  padding?: "none" | "sm" | "md" | "lg"
  centered?: boolean
  fluid?: boolean
  asChild?: boolean
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      className,
      size = "xl",
      padding = "md",
      centered = true,
      fluid = false,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div"

    const sizeClasses = {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      "2xl": "max-w-7xl",
      prose: "max-w-prose",
      full: "max-w-full",
    }

    const paddingClasses = {
      none: "px-0",
      sm: "px-3 sm:px-4",
      md: "px-4 sm:px-6 lg:px-8",
      lg: "px-6 sm:px-10 lg:px-16",
    }

    return (
      <Comp
        ref={ref}
        className={cn(
          "w-full",
          centered && "mx-auto",
          !fluid && sizeClasses[size],
          paddingClasses[padding],
          className
        )}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"
