"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { GripVertical, GripHorizontal } from "lucide-react"

export interface SplitPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical"
  initialSize?: number // percentage (0 - 100)
  minSize?: number // percentage
  maxSize?: number // percentage
  onSizeChange?: (size: number) => void
  primaryPanel: React.ReactNode
  secondaryPanel: React.ReactNode
  disabled?: boolean
  className?: string
  panelClassName?: string
}

export const SplitPane = React.forwardRef<HTMLDivElement, SplitPaneProps>(
  (
    {
      direction = "horizontal",
      initialSize = 50,
      minSize = 20,
      maxSize = 80,
      onSizeChange,
      primaryPanel,
      secondaryPanel,
      disabled = false,
      className,
      panelClassName,
      ...props
    },
    ref
  ) => {
    const [size, setSize] = React.useState(initialSize)
    const [isDragging, setIsDragging] = React.useState(false)
    const containerRef = React.useRef<HTMLDivElement>(null)

    const isHorizontal = direction === "horizontal"

    const clamp = (val: number) => Math.min(Math.max(val, minSize), maxSize)

    const updateSize = (newSize: number) => {
      const clamped = clamp(newSize)
      setSize(clamped)
      onSizeChange?.(clamped)
    }

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return
      e.currentTarget.setPointerCapture(e.pointerId)
      setIsDragging(true)
    }

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      let percentage = 50
      if (isHorizontal) {
        percentage = ((e.clientX - rect.left) / rect.width) * 100
      } else {
        percentage = ((e.clientY - rect.top) / rect.height) * 100
      }
      updateSize(percentage)
    }

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
      if (isDragging) {
        try {
          e.currentTarget.releasePointerCapture(e.pointerId)
        } catch {
          // ignore
        }
        setIsDragging(false)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return
      const step = 2
      if (
        (isHorizontal && e.key === "ArrowLeft") ||
        (!isHorizontal && e.key === "ArrowUp")
      ) {
        e.preventDefault()
        updateSize(size - step)
      } else if (
        (isHorizontal && e.key === "ArrowRight") ||
        (!isHorizontal && e.key === "ArrowDown")
      ) {
        e.preventDefault()
        updateSize(size + step)
      } else if (e.key === "Home") {
        e.preventDefault()
        updateSize(minSize)
      } else if (e.key === "End") {
        e.preventDefault()
        updateSize(maxSize)
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        updateSize(initialSize)
      }
    }

    return (
      <div
        ref={containerRef}
        className={cn(
          "relative flex overflow-hidden rounded-lg border border-border bg-card select-none",
          isHorizontal ? "flex-row w-full h-80" : "flex-col w-full h-96",
          className
        )}
        {...props}
      >
        {/* Primary Panel */}
        <div
          style={{ [isHorizontal ? "width" : "height"]: `${size}%` }}
          className={cn("overflow-auto min-w-0 min-h-0", panelClassName)}
        >
          {primaryPanel}
        </div>

        {/* Separator / Drag Handle */}
        <div
          role="separator"
          tabIndex={disabled ? -1 : 0}
          aria-orientation={direction}
          aria-valuenow={Math.round(size)}
          aria-valuemin={minSize}
          aria-valuemax={maxSize}
          aria-label="Split pane resize handle"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onDoubleClick={() => updateSize(initialSize)}
          onKeyDown={handleKeyDown}
          className={cn(
            "relative z-10 flex shrink-0 items-center justify-center bg-border transition-colors outline-none",
            isHorizontal
              ? "w-2.5 cursor-col-resize hover:bg-primary/40 focus-visible:bg-primary"
              : "h-2.5 cursor-row-resize hover:bg-primary/40 focus-visible:bg-primary",
            isDragging && "bg-primary text-primary-foreground",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          {isHorizontal ? (
            <GripVertical className="h-4 w-4 opacity-50" />
          ) : (
            <GripHorizontal className="h-4 w-4 opacity-50" />
          )}
        </div>

        {/* Secondary Panel */}
        <div
          style={{ [isHorizontal ? "width" : "height"]: `${100 - size}%` }}
          className={cn("overflow-auto min-w-0 min-h-0 flex-1", panelClassName)}
        >
          {secondaryPanel}
        </div>
      </div>
    )
  }
)
SplitPane.displayName = "SplitPane"
