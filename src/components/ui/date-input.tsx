"use client"

import * as React from "react"
import { Calendar, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface DateInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  min?: string
  max?: string
  error?: boolean
  clearable?: boolean
}

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue,
      onChange,
      min,
      max,
      error = false,
      clearable = true,
      disabled = false,
      id: idProp,
      placeholder = "YYYY-MM-DD",
      ...props
    },
    forwardedRef
  ) => {
    const generatedId = React.useId()
    const id = idProp || generatedId
    const isControlled = controlledValue !== undefined
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string>(
      defaultValue || ""
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      if (!isControlled) {
        setUncontrolledValue(val)
      }
      onChange?.(val)
    }

    const handleClear = (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (disabled) return
      if (!isControlled) {
        setUncontrolledValue("")
      }
      onChange?.("")
      inputRef.current?.focus()
    }

    return (
      <div className="relative flex w-full items-center">
        <div className="pointer-events-none absolute left-3 flex items-center justify-center text-muted-foreground">
          <Calendar className="h-4 w-4" />
        </div>

        <input
          ref={handleRef}
          type="date"
          id={id}
          value={currentValue}
          min={min}
          max={max}
          disabled={disabled}
          onChange={handleChange}
          aria-invalid={error ? "true" : undefined}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-background pl-9 pr-8 text-sm shadow-xs transition-colors",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
            // Remove browser default date indicators if custom or style them nicely
            "[&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 dark:[&::-webkit-calendar-picker-indicator]:invert",
            error && "border-destructive text-destructive ring-destructive/20",
            className
          )}
          {...props}
        />

        {clearable && currentValue && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-8 flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            title="Clear date"
            aria-label="Clear date"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    )
  }
)
DateInput.displayName = "DateInput"

export { DateInput }
