"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type AspectRatioPreset = "1:1" | "4:3" | "16:9" | "21:9" | "3:2" | "9:16"

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number | AspectRatioPreset
}

export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ className, ratio = "16:9", style, children, ...props }, ref) => {
    let resolvedRatio = "16 / 9"
    if (typeof ratio === "number") {
      resolvedRatio = `${ratio}`
    } else {
      switch (ratio) {
        case "1:1":
          resolvedRatio = "1 / 1"
          break
        case "4:3":
          resolvedRatio = "4 / 3"
          break
        case "16:9":
          resolvedRatio = "16 / 9"
          break
        case "21:9":
          resolvedRatio = "21 / 9"
          break
        case "3:2":
          resolvedRatio = "3 / 2"
          break
        case "9:16":
          resolvedRatio = "9 / 16"
          break
        default:
          resolvedRatio = "16 / 9"
      }
    }

    return (
      <div
        ref={ref}
        style={{
          aspectRatio: resolvedRatio,
          ...style,
        }}
        className={cn("relative w-full overflow-hidden", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
AspectRatio.displayName = "AspectRatio"
