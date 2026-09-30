"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface RangeSliderProps {
  min?: number
  max?: number
  step?: number
  value?: [number, number]
  defaultValue?: [number, number]
  onChange?: (val: [number, number]) => void
  onChangeEnd?: (val: [number, number]) => void
  disabled?: boolean
  showLabels?: boolean
  formatValue?: (val: number) => string
  className?: string
  ariaLabelLower?: string
  ariaLabelUpper?: string
}

export function RangeSlider({
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  defaultValue = [20, 80],
  onChange,
  onChangeEnd,
  disabled = false,
  showLabels = true,
  formatValue = (v) => `${v}`,
  className,
  ariaLabelLower = "Minimum value",
  ariaLabelUpper = "Maximum value",
}: RangeSliderProps) {
  const isControlled = controlledValue !== undefined
  const [uncontrolledValue, setUncontrolledValue] = React.useState<[number, number]>(defaultValue)
  const [lower, upper] = isControlled ? controlledValue : uncontrolledValue

  const trackRef = React.useRef<HTMLDivElement | null>(null)
  const [activeThumb, setActiveThumb] = React.useState<"lower" | "upper" | null>(null)

  // Clamp helper
  const clamp = (val: number, minBound: number, maxBound: number) => {
    return Math.min(Math.max(val, minBound), maxBound)
  }

  // Snap to step
  const snapToStep = (val: number) => {
    const steps = Math.round((val - min) / step)
    return clamp(min + steps * step, min, max)
  }

  const updateRange = (nextLower: number, nextUpper: number, triggerEnd = false) => {
    const clampedLower = clamp(snapToStep(nextLower), min, nextUpper)
    const clampedUpper = clamp(snapToStep(nextUpper), clampedLower, max)
    const nextVal: [number, number] = [clampedLower, clampedUpper]

    if (!isControlled) {
      setUncontrolledValue(nextVal)
    }
    onChange?.(nextVal)
    if (triggerEnd) {
      onChangeEnd?.(nextVal)
    }
  }

  // Handle pointer down on track
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || !trackRef.current) return

    const rect = trackRef.current.getBoundingClientRect()
    const clickRatio = (e.clientX - rect.left) / rect.width
    const clickVal = min + clickRatio * (max - min)

    // Determine closer thumb
    const distLower = Math.abs(clickVal - lower)
    const distUpper = Math.abs(clickVal - upper)

    const targetThumb = distLower <= distUpper ? "lower" : "upper"
    setActiveThumb(targetThumb)

    if (targetThumb === "lower") {
      updateRange(Math.min(clickVal, upper), upper)
    } else {
      updateRange(lower, Math.max(clickVal, lower))
    }

    // Pointer capture
    const handlePointerMove = (moveEvent: PointerEvent) => {
      const moveRatio = (moveEvent.clientX - rect.left) / rect.width
      const moveVal = min + moveRatio * (max - min)

      if (targetThumb === "lower") {
        updateRange(Math.min(moveVal, upper), upper)
      } else {
        updateRange(lower, Math.max(moveVal, lower))
      }
    }

    const handlePointerUp = () => {
      setActiveThumb(null)
      onChangeEnd?.([lower, upper])
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }

    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerup", handlePointerUp)
  }

  // Keyboard navigation for thumbs
  const handleKeyDown = (thumb: "lower" | "upper", e: React.KeyboardEvent) => {
    if (disabled) return

    let nextLower = lower
    let nextUpper = upper

    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault()
      if (thumb === "lower") nextLower = Math.min(lower + step, upper)
      else nextUpper = Math.min(upper + step, max)
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault()
      if (thumb === "lower") nextLower = Math.max(lower - step, min)
      else nextUpper = Math.max(upper - step, lower)
    } else if (e.key === "Home") {
      e.preventDefault()
      if (thumb === "lower") nextLower = min
      else nextUpper = lower
    } else if (e.key === "End") {
      e.preventDefault()
      if (thumb === "lower") nextLower = upper
      else nextUpper = max
    } else {
      return
    }

    updateRange(nextLower, nextUpper, true)
  }

  // Calculate percentages for track highlight
  const lowerPercent = Math.max(0, Math.min(100, ((lower - min) / (max - min)) * 100))
  const upperPercent = Math.max(0, Math.min(100, ((upper - min) / (max - min)) * 100))

  return (
    <div
      className={cn(
        "relative w-full select-none py-2 space-y-2",
        disabled && "opacity-50 pointer-events-none cursor-not-allowed",
        className
      )}
    >
      {showLabels && (
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
          <span>{formatValue(min)}</span>
          <span className="font-bold text-foreground">
            {formatValue(lower)} – {formatValue(upper)}
          </span>
          <span>{formatValue(max)}</span>
        </div>
      )}

      {/* Slider Track */}
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        className="relative h-2 w-full rounded-full bg-muted cursor-pointer flex items-center"
      >
        {/* Active Range Highlight */}
        <div
          className="absolute h-full rounded-full bg-primary"
          style={{
            left: `${lowerPercent}%`,
            width: `${upperPercent - lowerPercent}%`,
          }}
        />

        {/* Lower Thumb */}
        <div
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-valuemin={min}
          aria-valuemax={upper}
          aria-valuenow={lower}
          aria-label={ariaLabelLower}
          onKeyDown={(e) => handleKeyDown("lower", e)}
          className={cn(
            "absolute -translate-x-1/2 h-5 w-5 rounded-full border-2 border-primary bg-background shadow-md transition-transform",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "hover:scale-110 active:scale-95 cursor-grab active:cursor-grabbing",
            activeThumb === "lower" && "ring-2 ring-ring ring-offset-2 scale-110"
          )}
          style={{ left: `${lowerPercent}%` }}
        />

        {/* Upper Thumb */}
        <div
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-valuemin={lower}
          aria-valuemax={max}
          aria-valuenow={upper}
          aria-label={ariaLabelUpper}
          onKeyDown={(e) => handleKeyDown("upper", e)}
          className={cn(
            "absolute -translate-x-1/2 h-5 w-5 rounded-full border-2 border-primary bg-background shadow-md transition-transform",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "hover:scale-110 active:scale-95 cursor-grab active:cursor-grabbing",
            activeThumb === "upper" && "ring-2 ring-ring ring-offset-2 scale-110"
          )}
          style={{ left: `${upperPercent}%` }}
        />
      </div>
    </div>
  )
}
