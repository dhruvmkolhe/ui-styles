"use client"

import * as React from "react"
import { Calendar, X } from "lucide-react"
import { cn } from "@/lib/utils"

export type DateDisplayFormat = "YYYY-MM-DD" | "DD-MM-YYYY"

/**
 * Formats an ISO string (YYYY-MM-DD) into the requested display format.
 */
export function formatIsoToDisplay(
  isoDate?: string,
  format: DateDisplayFormat = "YYYY-MM-DD"
): string {
  if (!isoDate) return ""
  const match = isoDate.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!match) return isoDate
  const [, y, m, d] = match
  if (format === "DD-MM-YYYY") {
    return `${d}-${m}-${y}`
  }
  return `${y}-${m}-${d}`
}

function isValidDateComponents(yrNum: number, monNum: number, dayNum: number): boolean {
  if (yrNum < 1000 || yrNum > 9999) return false
  if (monNum < 1 || monNum > 12) return false
  if (dayNum < 1 || dayNum > 31) return false
  const date = new Date(yrNum, monNum - 1, dayNum)
  return (
    date.getFullYear() === yrNum &&
    date.getMonth() === monNum - 1 &&
    date.getDate() === dayNum
  )
}

/**
 * Parses a display-formatted string into an ISO string (YYYY-MM-DD).
 * Returns empty string if invalid or unparseable.
 */
export function parseDisplayToIso(
  displayDate?: string,
  format: DateDisplayFormat = "YYYY-MM-DD"
): string {
  if (!displayDate) return ""
  const trimmed = displayDate.trim()
  if (!trimmed) return ""

  if (format === "DD-MM-YYYY") {
    const match = trimmed.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/)
    if (match) {
      const [, d, m, y] = match
      const dayNum = parseInt(d, 10)
      const monNum = parseInt(m, 10)
      const yrNum = parseInt(y, 10)
      if (isValidDateComponents(yrNum, monNum, dayNum)) {
        return `${yrNum.toString().padStart(4, "0")}-${monNum.toString().padStart(2, "0")}-${dayNum.toString().padStart(2, "0")}`
      }
    }
  } else {
    const match = trimmed.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/)
    if (match) {
      const [, y, m, d] = match
      const dayNum = parseInt(d, 10)
      const monNum = parseInt(m, 10)
      const yrNum = parseInt(y, 10)
      if (isValidDateComponents(yrNum, monNum, dayNum)) {
        return `${yrNum.toString().padStart(4, "0")}-${monNum.toString().padStart(2, "0")}-${dayNum.toString().padStart(2, "0")}`
      }
    }
  }
  return ""
}

export interface DateInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "value" | "defaultValue"> {
  /** ISO date string (YYYY-MM-DD) */
  value?: string
  /** Default ISO date string (YYYY-MM-DD) */
  defaultValue?: string
  /** Emits updated ISO date string (YYYY-MM-DD) or empty string */
  onChange?: (value: string) => void
  /** Visual display format: YYYY-MM-DD (ISO) or DD-MM-YYYY */
  displayFormat?: DateDisplayFormat
  min?: string
  max?: string
  error?: boolean
  clearable?: boolean
  calendarAriaLabel?: string
  clearAriaLabel?: string
  containerClassName?: string
}

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  (
    {
      className,
      containerClassName,
      value: controlledValue,
      defaultValue,
      onChange,
      displayFormat = "YYYY-MM-DD",
      min,
      max,
      error = false,
      clearable = true,
      disabled = false,
      id: idProp,
      placeholder,
      calendarAriaLabel = "Open calendar picker",
      clearAriaLabel = "Clear date",
      onBlur,
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
    const currentIso = isControlled ? (controlledValue ?? "") : uncontrolledValue

    const [textValue, setTextValue] = React.useState<string>(() =>
      formatIsoToDisplay(currentIso, displayFormat)
    )

    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const hiddenDateRef = React.useRef<HTMLInputElement | null>(null)
    const isFocusedRef = React.useRef(false)

    // Synchronize textValue when external ISO value or displayFormat changes, unless actively typing
    React.useEffect(() => {
      if (!isFocusedRef.current) {
        setTextValue(formatIsoToDisplay(currentIso, displayFormat))
      }
    }, [currentIso, displayFormat])

    const handleRef = (el: HTMLInputElement | null) => {
      inputRef.current = el
      if (typeof forwardedRef === "function") {
        forwardedRef(el)
      } else if (forwardedRef) {
        forwardedRef.current = el
      }
    }

    const handleOpenPicker = (e: React.MouseEvent) => {
      e.preventDefault()
      if (disabled) return
      try {
        hiddenDateRef.current?.showPicker?.()
      } catch {
        inputRef.current?.focus()
      }
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setTextValue(val)
      if (!val.trim()) {
        if (!isControlled) {
          setUncontrolledValue("")
        }
        onChange?.("")
        return
      }
      const parsedIso = parseDisplayToIso(val, displayFormat)
      if (parsedIso) {
        if (!isControlled) {
          setUncontrolledValue(parsedIso)
        }
        onChange?.(parsedIso)
      }
    }

    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      isFocusedRef.current = true
      props.onFocus?.(e)
    }

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      isFocusedRef.current = false
      onBlur?.(e)
      if (!textValue.trim()) {
        setTextValue("")
        if (!isControlled) setUncontrolledValue("")
        onChange?.("")
      } else {
        const parsedIso = parseDisplayToIso(textValue, displayFormat)
        if (parsedIso) {
          setTextValue(formatIsoToDisplay(parsedIso, displayFormat))
          if (!isControlled) setUncontrolledValue(parsedIso)
          onChange?.(parsedIso)
        } else {
          // Revert to last confirmed valid date
          setTextValue(formatIsoToDisplay(currentIso, displayFormat))
        }
      }
    }

    const handleHiddenDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newIso = e.target.value
      if (!isControlled) {
        setUncontrolledValue(newIso)
      }
      setTextValue(formatIsoToDisplay(newIso, displayFormat))
      onChange?.(newIso)
    }

    const handleClear = (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (disabled) return
      setTextValue("")
      if (!isControlled) {
        setUncontrolledValue("")
      }
      onChange?.("")
      inputRef.current?.focus()
    }

    const effectivePlaceholder =
      placeholder || (displayFormat === "DD-MM-YYYY" ? "DD-MM-YYYY" : "YYYY-MM-DD")

    return (
      <div className={cn("relative flex w-full items-center", containerClassName)}>
        {/* Left Calendar Trigger Button */}
        <button
          type="button"
          onClick={handleOpenPicker}
          disabled={disabled}
          aria-label={calendarAriaLabel}
          title={calendarAriaLabel}
          tabIndex={-1}
          className="absolute left-3 z-10 flex items-center justify-center text-muted-foreground opacity-70 hover:opacity-100 transition-opacity cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Calendar className="h-4 w-4" />
        </button>

        {/* Visible Text Input displaying formatted string */}
        <input
          ref={handleRef}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          suppressHydrationWarning
          id={id}
          name={props.name || "dateInput"}
          aria-label={props["aria-label"] || "Select date"}
          value={textValue}
          placeholder={effectivePlaceholder}
          disabled={disabled}
          onChange={handleTextChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          aria-invalid={error ? "true" : undefined}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-background pl-10 pr-10 text-sm shadow-xs transition-colors",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive text-destructive ring-destructive/20",
            className
          )}
          {...props}
        />

        {/* Hidden Native Date Input for Picker Dialog */}
        <input
          ref={hiddenDateRef}
          type="date"
          tabIndex={-1}
          aria-hidden="true"
          value={currentIso}
          min={min}
          max={max}
          disabled={disabled}
          onChange={handleHiddenDateChange}
          className="sr-only pointer-events-none absolute h-0 w-0 opacity-0"
        />

        {/* Right Clear Button */}
        {clearable && currentIso && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 z-10 flex h-4 w-4 items-center justify-center rounded-full text-muted-foreground opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
            title={clearAriaLabel}
            aria-label={clearAriaLabel}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    )
  }
)
DateInput.displayName = "DateInput"

export { DateInput }
