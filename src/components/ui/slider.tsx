"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SliderProps {
  min?: number
  max?: number
  step?: number
  value?: number
  defaultValue?: number
  onChange?: (val: number) => void
  onChangeEnd?: (val: number) => void
  disabled?: boolean
  showValue?: boolean
  formatValue?: (val: number) => string
  orientation?: "horizontal" | "vertical"
  className?: string
  ariaLabel?: string
  marks?: Array<{ value: number; label?: string }>
}

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  defaultValue = 50,
  onChange,
  onChangeEnd,
  disabled = false,
  showValue = true,
  formatValue = (v) => `${v}`,
  orientation = "horizontal",
  className,
  ariaLabel = "Slider",
  marks,
}: SliderProps) {
  const isControlled = controlledValue !== undefined
  const [uncontrolledValue, setUncontrolledValue] = React.useState<number>(defaultValue)
  const currentVal = isControlled ? controlledValue : uncontrolledValue

  const trackRef = React.useRef<HTMLDivElement | null>(null)
  const [isDragging, setIsDragging] = React.useState(false)

  const clamp = (val: number) => Math.min(Math.max(val, min), max)

  const snapToStep = (val: number) => {
    const steps = Math.round((val - min) / step)
    return clamp(min + steps * step)
  }

  const updateValue = (next: number, triggerEnd = false) => {
    const clamped = snapToStep(next)
    if (!isControlled) {
      setUncontrolledValue(clamped)
    }
    onChange?.(clamped)
    if (triggerEnd) {
      onChangeEnd?.(clamped)
    }
  }

  // Pointer drag handling
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || !trackRef.current) return

    const rect = trackRef.current.getBoundingClientRect()
    const isVertical = orientation === "vertical"
    const ratio = isVertical
      ? 1 - (e.clientY - rect.top) / rect.height
      : (e.clientX - rect.left) / rect.width

    const nextVal = min + ratio * (max - min)
    updateValue(nextVal)
    setIsDragging(true)

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const moveRatio = isVertical
        ? 1 - (moveEvent.clientY - rect.top) / rect.height
        : (moveEvent.clientX - rect.left) / rect.width
      updateValue(min + moveRatio * (max - min))
    }

    const handlePointerUp = () => {
      setIsDragging(false)
      onChangeEnd?.(currentVal)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }

    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerup", handlePointerUp)
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return

    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault()
      updateValue(currentVal + step, true)
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault()
      updateValue(currentVal - step, true)
    } else if (e.key === "Home") {
      e.preventDefault()
      updateValue(min, true)
    } else if (e.key === "End") {
      e.preventDefault()
      updateValue(max, true)
    } else if (e.key === "PageUp") {
      e.preventDefault()
      updateValue(currentVal + step * 10, true)
    } else if (e.key === "PageDown") {
      e.preventDefault()
      updateValue(currentVal - step * 10, true)
    }
  }

  const percent = Math.max(0, Math.min(100, ((currentVal - min) / (max - min)) * 100))
  const isVertical = orientation === "vertical"

  return (
    <div
      className={cn(
        "relative select-none",
        isVertical ? "h-48 w-8 flex flex-col items-center justify-between" : "w-full py-2 space-y-2",
        disabled && "opacity-50 pointer-events-none cursor-not-allowed",
        className
      )}
    >
      {showValue && !isVertical && (
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
          <span>{formatValue(min)}</span>
          <span className="font-bold text-foreground">{formatValue(currentVal)}</span>
          <span>{formatValue(max)}</span>
        </div>
      )}

      {/* Slider Track */}
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        className={cn(
          "relative rounded-full bg-muted cursor-pointer flex items-center justify-center",
          isVertical ? "h-full w-2" : "w-full h-2"
        )}
      >
        {/* Active Range Highlight */}
        <div
          className="absolute rounded-full bg-primary"
          style={
            isVertical
              ? { bottom: 0, width: "100%", height: `${percent}%` }
              : { left: 0, height: "100%", width: `${percent}%` }
          }
        />

        {/* Thumb */}
        <div
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentVal}
          aria-orientation={orientation}
          aria-label={ariaLabel}
          onKeyDown={handleKeyDown}
          className={cn(
            "absolute rounded-full border-2 border-primary bg-background shadow-md transition-transform",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "hover:scale-110 active:scale-95 cursor-grab active:cursor-grabbing",
            isVertical ? "h-5 w-5 -translate-y-1/2" : "h-5 w-5 -translate-x-1/2",
            isDragging && "ring-2 ring-ring ring-offset-2 scale-110"
          )}
          style={isVertical ? { bottom: `${percent}%` } : { left: `${percent}%` }}
        />
      </div>

      {/* Marks */}
      {marks && marks.length > 0 && !isVertical && (
        <div className="relative w-full flex justify-between text-[10px] text-muted-foreground pt-1">
          {marks.map((m) => (
            <span key={m.value} className="select-none font-mono">
              {m.label ?? m.value}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
