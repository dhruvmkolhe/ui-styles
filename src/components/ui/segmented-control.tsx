"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const segmentedControlVariants = cva(
  "inline-flex items-center rounded-lg bg-muted p-1 text-muted-foreground select-none relative",
  {
    variants: {
      size: {
        sm: "h-8 text-xs p-0.5",
        default: "h-9.5 text-sm p-1",
        lg: "h-11 text-base p-1.5",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      size: "default",
      fullWidth: false,
    },
  }
)

export interface SegmentedControlOption {
  value: string
  label: React.ReactNode
  icon?: React.ReactNode
  badge?: React.ReactNode
  disabled?: boolean
}

export interface SegmentedControlProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof segmentedControlVariants> {
  options: SegmentedControlOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  onChange?: (value: string) => void
  disabled?: boolean
  name?: string
  size?: "sm" | "default" | "lg"
  fullWidth?: boolean
}

export const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  (
    {
      className,
      size = "default",
      fullWidth = false,
      options = [],
      value: controlledValue,
      defaultValue,
      onValueChange,
      onChange,
      disabled = false,
      name,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string>(() => {
      if (defaultValue !== undefined) return defaultValue
      return options[0]?.value ?? ""
    })

    const selectedValue = isControlled ? controlledValue : uncontrolledValue
    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const buttonRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map())

    const handleSelect = (val: string) => {
      if (disabled) return
      if (!isControlled) {
        setUncontrolledValue(val)
      }
      onValueChange?.(val)
      onChange?.(val)
    }

    const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
      if (disabled) return
      let nextIndex = -1

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault()
        nextIndex = (currentIndex + 1) % options.length
        while (options[nextIndex]?.disabled && nextIndex !== currentIndex) {
          nextIndex = (nextIndex + 1) % options.length
        }
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault()
        nextIndex = (currentIndex - 1 + options.length) % options.length
        while (options[nextIndex]?.disabled && nextIndex !== currentIndex) {
          nextIndex = (nextIndex - 1 + options.length) % options.length
        }
      } else if (e.key === "Home") {
        e.preventDefault()
        nextIndex = options.findIndex((o) => !o.disabled)
      } else if (e.key === "End") {
        e.preventDefault()
        for (let i = options.length - 1; i >= 0; i--) {
          if (!options[i].disabled) {
            nextIndex = i
            break
          }
        }
      }

      if (nextIndex !== -1 && !options[nextIndex]?.disabled) {
        const nextVal = options[nextIndex].value
        handleSelect(nextVal)
        buttonRefs.current.get(nextVal)?.focus()
      }
    }

    const itemPadding =
      size === "sm"
        ? "px-2.5 py-1 text-xs"
        : size === "lg"
        ? "px-4 py-2 text-base"
        : "px-3 py-1.5 text-sm"

    return (
      <div
        ref={(node) => {
          containerRef.current = node
          if (typeof ref === "function") ref(node)
          else if (ref) (ref as any).current = node
        }}
        role="radiogroup"
        aria-disabled={disabled}
        className={cn(
          segmentedControlVariants({ size, fullWidth }),
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {options.map((option, idx) => {
          const isSelected = selectedValue === option.value
          const isOptionDisabled = disabled || option.disabled

          return (
            <button
              key={option.value}
              ref={(el) => {
                if (el) buttonRefs.current.set(option.value, el)
                else buttonRefs.current.delete(option.value)
              }}
              type="button"
              role="radio"
              aria-checked={isSelected}
              tabIndex={isSelected ? 0 : -1}
              disabled={isOptionDisabled}
              onClick={() => !isOptionDisabled && handleSelect(option.value)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={cn(
                "relative z-10 flex items-center justify-center font-medium transition-all duration-150 outline-none rounded-md select-none",
                fullWidth && "flex-1",
                itemPadding,
                isSelected
                  ? "bg-card text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground",
                isOptionDisabled && "opacity-40 cursor-not-allowed pointer-events-none",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              )}
            >
              {option.icon && (
                <span className={cn("shrink-0", option.label ? "mr-1.5" : "")}>
                  {option.icon}
                </span>
              )}
              {option.label && <span>{option.label}</span>}
              {option.badge !== undefined && (
                <span className="ml-1.5 rounded-full bg-muted-foreground/15 px-1.5 py-0.2 text-[10px] font-bold">
                  {option.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>
    )
  }
)
SegmentedControl.displayName = "SegmentedControl"
