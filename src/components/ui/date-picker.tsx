"use client"

import * as React from "react"
import { Calendar as CalendarIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

export interface DatePickerProps {
  value?: Date | undefined
  defaultValue?: Date | undefined
  onValueChange?: (date: Date | undefined) => void
  placeholder?: string
  minDate?: Date
  maxDate?: Date
  disabledDates?: (date: Date) => boolean
  disabled?: boolean
  clearable?: boolean
  className?: string
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  popoverClassName?: string
}

export function formatDate(d?: Date): string {
  if (!d) return ""
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d)
}

export function DatePicker({
  value: controlledValue,
  defaultValue,
  onValueChange,
  placeholder = "Select date...",
  minDate,
  maxDate,
  disabledDates,
  disabled = false,
  clearable = true,
  className,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  popoverClassName,
}: DatePickerProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<Date | undefined>(defaultValue)
  const isControlled = controlledValue !== undefined
  const selectedDate = isControlled ? controlledValue : uncontrolledValue

  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlledOpen = controlledOpen !== undefined
  const open = isControlledOpen ? controlledOpen : uncontrolledOpen

  const setOpen = React.useCallback(
    (newOpen: boolean) => {
      if (!isControlledOpen) setUncontrolledOpen(newOpen)
      onOpenChange?.(newOpen)
    },
    [isControlledOpen, onOpenChange]
  )

  const handleSelect = (d: Date | undefined) => {
    if (!isControlled) setUncontrolledValue(d)
    onValueChange?.(d)
    setOpen(false)
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isControlled) setUncontrolledValue(undefined)
    onValueChange?.(undefined)
  }

  const handleToday = () => {
    handleSelect(new Date())
  }

  return (
    <Popover open={open} onOpenChange={setOpen} placement="bottom" align="start" className="w-full">
      <div className={cn("relative flex w-full min-w-[220px] items-center", className)}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "flex h-9 w-full items-center justify-between rounded-md border border-input bg-background pl-3 text-xs shadow-xs transition-colors outline-none",
              clearable && selectedDate && !disabled ? "pr-8" : "pr-3",
              "hover:bg-accent/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
              disabled && "opacity-50 pointer-events-none cursor-not-allowed",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <span className="flex items-center gap-2 truncate">
              <CalendarIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span>{selectedDate ? formatDate(selectedDate) : placeholder}</span>
            </span>
          </button>
        </PopoverTrigger>

        {clearable && selectedDate && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 z-10 rounded p-1 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            title="Clear date"
            aria-label="Clear date"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <PopoverContent
        className={cn(
          "p-2 w-auto border border-border bg-popover text-popover-foreground shadow-2xl rounded-xl z-50",
          popoverClassName
        )}
      >
        <Calendar
          value={selectedDate}
          onValueChange={handleSelect}
          minDate={minDate}
          maxDate={maxDate}
          disabledDates={disabledDates}
          className="p-1 bg-transparent border-0 shadow-none"
        />
        <div className="flex items-center justify-between border-t border-border/80 px-2 pt-2 mt-1 text-xs">
          <button
            type="button"
            onClick={handleToday}
            className="text-teal-600 dark:text-teal-400 font-semibold hover:underline"
          >
            Today
          </button>
          {selectedDate && (
            <button
              type="button"
              onClick={() => handleSelect(undefined)}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
