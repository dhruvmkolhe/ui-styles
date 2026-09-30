"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  visible: boolean
  message?: React.ReactNode
  description?: React.ReactNode
  fullPage?: boolean
  blur?: boolean
  spinnerSize?: "sm" | "md" | "lg"
}

export function LoadingOverlay({
  visible,
  message,
  description,
  fullPage = false,
  blur = true,
  spinnerSize = "md",
  className,
  ...props
}: LoadingOverlayProps) {
  if (!visible) return null

  const sizeClass = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }[spinnerSize]

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn(
        fullPage ? "fixed inset-0 z-50" : "absolute inset-0 z-20",
        "flex flex-col items-center justify-center p-6 text-center select-none transition-opacity duration-200 animate-in fade-in-0",
        blur
          ? "bg-background/80 backdrop-blur-xs"
          : "bg-background/90",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center max-w-sm space-y-3">
        <Loader2 className={cn("animate-spin text-primary", sizeClass)} />
        {message && (
          <h4 className="text-sm font-semibold tracking-tight text-foreground">
            {message}
          </h4>
        )}
        {description && (
          <p className="text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <span className="sr-only">
        {typeof message === "string" ? message : "Loading, please wait..."}
      </span>
    </div>
  )
}
