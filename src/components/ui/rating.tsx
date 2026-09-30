"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"

export interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number
  defaultValue?: number
  max?: number
  precision?: 0.5 | 1
  readOnly?: boolean
  disabled?: boolean
  size?: "sm" | "md" | "lg"
  showValue?: boolean
  onChange?: (val: number) => void
}

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = 0,
      max = 5,
      precision = 1,
      readOnly = false,
      disabled = false,
      size = "md",
      showValue = false,
      onChange,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const [hoverValue, setHoverValue] = React.useState<number | null>(null)

    const isControlled = controlledValue !== undefined
    const currentValue = isControlled ? controlledValue : internalValue
    const displayValue = hoverValue !== null ? hoverValue : currentValue

    const handleSelect = (val: number) => {
      if (readOnly || disabled) return
      if (!isControlled) {
        setInternalValue(val)
      }
      onChange?.(val)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (readOnly || disabled) return
      const step = precision
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault()
        const next = Math.min(max, currentValue + step)
        handleSelect(next)
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault()
        const next = Math.max(0, currentValue - step)
        handleSelect(next)
      } else if (e.key === "Home") {
        e.preventDefault()
        handleSelect(0)
      } else if (e.key === "End") {
        e.preventDefault()
        handleSelect(max)
      }
    }

    const iconSizeClasses = {
      sm: "h-3.5 w-3.5",
      md: "h-5 w-5",
      lg: "h-6 w-6",
    }

    return (
      <div
        ref={ref}
        role="slider"
        aria-label="Rating"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={currentValue}
        aria-readonly={readOnly}
        aria-disabled={disabled}
        tabIndex={readOnly || disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        onMouseLeave={() => setHoverValue(null)}
        className={cn(
          "inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded select-none",
          disabled && "opacity-50 cursor-not-allowed",
          !readOnly && !disabled && "cursor-pointer",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-0.5">
          {Array.from({ length: max }, (_, index) => {
            const starNumber = index + 1
            const isFull = displayValue >= starNumber
            const isHalf = precision === 0.5 && displayValue >= starNumber - 0.5 && !isFull

            return (
              <span
                key={index}
                className={cn(
                  "relative transition-transform duration-100",
                  !readOnly && !disabled && "hover:scale-110 active:scale-95"
                )}
                onMouseEnter={() => {
                  if (!readOnly && !disabled) setHoverValue(starNumber)
                }}
                onClick={() => handleSelect(starNumber)}
              >
                {/* Background inactive star */}
                <Star
                  className={cn(
                    iconSizeClasses[size],
                    "text-muted-foreground/30 fill-muted-foreground/20 stroke-1"
                  )}
                />

                {/* Filled star overlay */}
                {(isFull || isHalf) && (
                  <div
                    className="absolute inset-0 overflow-hidden text-amber-500"
                    style={{ width: isHalf ? "50%" : "100%" }}
                  >
                    <Star
                      className={cn(
                        iconSizeClasses[size],
                        "text-amber-500 fill-amber-400 stroke-amber-500"
                      )}
                    />
                  </div>
                )}
              </span>
            )
          })}
        </div>

        {showValue && (
          <span className="text-xs font-semibold text-muted-foreground ml-1">
            {currentValue.toFixed(precision === 0.5 ? 1 : 0)} / {max}
          </span>
        )}
      </div>
    )
  }
)
Rating.displayName = "Rating"
