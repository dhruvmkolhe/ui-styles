"use client"

import * as React from "react"
import { ChevronDown, ChevronUp, Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "value"> {
  value?: number
  defaultValue?: number
  onValueChange?: (val: number | undefined) => void
  min?: number
  max?: number
  step?: number
  error?: boolean
  stepperType?: "buttons" | "inline"
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue,
      onValueChange,
      min = -Infinity,
      max = Infinity,
      step = 1,
      error = false,
      disabled = false,
      stepperType = "inline",
      id: idProp,
      ...props
    },
    forwardedRef
  ) => {
    const generatedId = React.useId()
    const id = idProp || generatedId
    const isControlled = controlledValue !== undefined
    const [uncontrolledValue, setUncontrolledValue] = React.useState<number | undefined>(
      defaultValue
    )
    const currentValue = isControlled ? controlledValue : uncontrolledValue

    const inputRef = React.useRef<HTMLInputElement | null>(null)

    const handleRef = (el: HTMLInputElement | null) => {
      inputRef.current = el
      if (typeof forwardedRef === "function") {
        forwardedRef(el)
      } else if (forwardedRef) {
        forwardedRef.current = el
      }
    }

    const clamp = (val: number) => {
      return Math.min(Math.max(val, min), max)
    }

    const updateValue = (nextVal: number) => {
      const clamped = clamp(nextVal)
      if (!isControlled) {
        setUncontrolledValue(clamped)
      }
      onValueChange?.(clamped)
    }

    const handleIncrement = () => {
      if (disabled) return
      const base = currentValue !== undefined ? currentValue : 0
      updateValue(base + step)
    }

    const handleDecrement = () => {
      if (disabled) return
      const base = currentValue !== undefined ? currentValue : 0
      updateValue(base - step)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const str = e.target.value
      if (str === "" || str === "-") {
        if (!isControlled) setUncontrolledValue(undefined)
        onValueChange?.(undefined)
        return
      }
      const parsed = parseFloat(str)
      if (!isNaN(parsed)) {
        if (!isControlled) setUncontrolledValue(parsed)
        onValueChange?.(parsed)
      }
    }

    const handleBlur = () => {
      if (currentValue !== undefined) {
        const clamped = clamp(currentValue)
        if (clamped !== currentValue) {
          updateValue(clamped)
        }
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const multiplier = e.shiftKey ? 10 : 1
      if (e.key === "ArrowUp") {
        e.preventDefault()
        const base = currentValue !== undefined ? currentValue : 0
        updateValue(base + step * multiplier)
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        const base = currentValue !== undefined ? currentValue : 0
        updateValue(base - step * multiplier)
      }
    }

    const isAtMin = currentValue !== undefined && currentValue <= min
    const isAtMax = currentValue !== undefined && currentValue >= max

    if (stepperType === "buttons") {
      return (
        <div className="inline-flex w-full items-center rounded-md border border-input bg-background shadow-xs transition-colors">
          <button
            type="button"
            disabled={disabled || isAtMin}
            onClick={handleDecrement}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-l-md border-r border-input text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Decrease value"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <input
            ref={handleRef}
            type="number"
            autoComplete="off"
            suppressHydrationWarning
            id={id}
            name={props.name || "numberInput"}
            aria-label={props["aria-label"] || "Number value"}
            value={currentValue !== undefined ? currentValue : ""}
            disabled={disabled}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            aria-invalid={error ? "true" : undefined}
            className={cn(
              "h-9 w-full bg-transparent px-3 text-center text-sm outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
              error && "text-destructive",
              className
            )}
            {...props}
          />
          <button
            type="button"
            disabled={disabled || isAtMax}
            onClick={handleIncrement}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-r-md border-l border-input text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Increase value"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      )
    }

    return (
      <div className="relative flex w-full items-center">
        <input
          ref={handleRef}
          type="number"
          autoComplete="off"
          suppressHydrationWarning
          id={id}
          name={props.name || "numberInput"}
          aria-label={props["aria-label"] || "Number value"}
          value={currentValue !== undefined ? currentValue : ""}
          disabled={disabled}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          aria-invalid={error ? "true" : undefined}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 pr-8 text-sm shadow-xs transition-colors [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive text-destructive ring-destructive/20",
            className
          )}
          {...props}
        />
        <div className="absolute right-1 flex flex-col">
          <button
            type="button"
            disabled={disabled || isAtMax}
            onClick={handleIncrement}
            className="flex h-4 w-6 items-center justify-center rounded-t text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Increment"
          >
            <ChevronUp className="h-3 w-3" />
          </button>
          <button
            type="button"
            disabled={disabled || isAtMin}
            onClick={handleDecrement}
            className="flex h-4 w-6 items-center justify-center rounded-b text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Decrement"
          >
            <ChevronDown className="h-3 w-3" />
          </button>
        </div>
      </div>
    )
  }
)
NumberInput.displayName = "NumberInput"

export { NumberInput }
