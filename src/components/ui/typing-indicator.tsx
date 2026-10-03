"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TypingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
  name?: string
  avatar?: string
  size?: "sm" | "md" | "lg"
  variant?: "bubble" | "text" | "minimal"
}

export const TypingIndicator = React.forwardRef<HTMLDivElement, TypingIndicatorProps>(
  (
    {
      className,
      active = true,
      name,
      avatar,
      size = "md",
      variant = "bubble",
      ...props
    },
    ref
  ) => {
    if (!active) return null

    const dotSize =
      size === "sm" ? "h-1.5 w-1.5" : size === "lg" ? "h-2.5 w-2.5" : "h-2 w-2"

    const bubblePadding =
      size === "sm" ? "px-2.5 py-1.5" : size === "lg" ? "px-4 py-2.5" : "px-3 py-2"

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-label={name ? `${name} is typing` : "Someone is typing"}
        className={cn(
          "flex items-center gap-2 text-muted-foreground select-none",
          className
        )}
        {...props}
      >
        {/* Optional Avatar */}
        {avatar && (
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-muted text-[10px] font-bold overflow-hidden shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatar} alt={name || "User"} className="h-full w-full object-cover" />
          </div>
        )}

        {/* Bubble variant */}
        {variant === "bubble" ? (
          <div
            className={cn(
              "inline-flex items-center gap-1 rounded-2xl border border-border bg-muted/70 text-foreground shadow-2xs rounded-tl-xs",
              bubblePadding
            )}
          >
            <span
              className={cn(
                "rounded-full bg-primary animate-bounce motion-reduce:animate-pulse",
                dotSize
              )}
              style={{ animationDelay: "0ms" }}
            />
            <span
              className={cn(
                "rounded-full bg-primary animate-bounce motion-reduce:animate-pulse",
                dotSize
              )}
              style={{ animationDelay: "150ms" }}
            />
            <span
              className={cn(
                "rounded-full bg-primary animate-bounce motion-reduce:animate-pulse",
                dotSize
              )}
              style={{ animationDelay: "300ms" }}
            />
          </div>
        ) : (
          /* Text or Minimal */
          <div className="flex items-center gap-1.5 text-xs">
            <div className="flex items-center gap-0.5">
              <span
                className={cn("rounded-full bg-primary animate-bounce", dotSize)}
                style={{ animationDelay: "0ms" }}
              />
              <span
                className={cn("rounded-full bg-primary animate-bounce", dotSize)}
                style={{ animationDelay: "150ms" }}
              />
              <span
                className={cn("rounded-full bg-primary animate-bounce", dotSize)}
                style={{ animationDelay: "300ms" }}
              />
            </div>
            {name && <span className="text-[11px] font-medium">{name} is typing...</span>}
          </div>
        )}
      </div>
    )
  }
)
TypingIndicator.displayName = "TypingIndicator"
