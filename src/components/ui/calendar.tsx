"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CalendarProps {
  value?: Date | undefined
  defaultValue?: Date | undefined
  onValueChange?: (date: Date | undefined) => void
  minDate?: Date
  maxDate?: Date
  disabledDates?: (date: Date) => boolean
  className?: string
}

export function isSameDay(d1?: Date | null, d2?: Date | null): boolean {
  if (!d1 || !d2) return false
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const WEEKDAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

export function Calendar({
  value: controlledValue,
  defaultValue,
  onValueChange,
  minDate,
  maxDate,
  disabledDates,
  className,
}: CalendarProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<Date | undefined>(defaultValue)
  const isControlled = controlledValue !== undefined
  const selectedDate = isControlled ? controlledValue : uncontrolledValue

  // The active month being viewed
  const [viewDate, setViewDate] = React.useState<Date>(
    () => selectedDate || defaultValue || new Date()
  )

  const viewYear = viewDate.getFullYear()
  const viewMonth = viewDate.getMonth()

  const handlePrevMonth = () => {
    setViewDate(new Date(viewYear, viewMonth - 1, 1))
  }

  const handleNextMonth = () => {
    setViewDate(new Date(viewYear, viewMonth + 1, 1))
  }

  // Days in month calculation
  const daysInCurrentMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay() // 0 = Sunday
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate()

  // Generate calendar cells (6 rows * 7 columns = 42 cells)
  const calendarCells = React.useMemo(() => {
    const cells: Array<{
      date: Date
      isCurrentMonth: boolean
      dayNumber: number
    }> = []

    // Trailing days from previous month
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i
      cells.push({
        date: new Date(viewYear, viewMonth - 1, day),
        isCurrentMonth: false,
        dayNumber: day,
      })
    }

    // Days in current month
    for (let day = 1; day <= daysInCurrentMonth; day++) {
      cells.push({
        date: new Date(viewYear, viewMonth, day),
        isCurrentMonth: true,
        dayNumber: day,
      })
    }

    // Leading days from next month to fill grid
    const remaining = 42 - cells.length
    for (let day = 1; day <= remaining; day++) {
      cells.push({
        date: new Date(viewYear, viewMonth + 1, day),
        isCurrentMonth: false,
        dayNumber: day,
      })
    }

    return cells
  }, [viewYear, viewMonth, daysInCurrentMonth, firstDayOfWeek, daysInPrevMonth])

  const today = new Date()

  const isDateDisabled = (d: Date): boolean => {
    if (minDate && d < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true
    if (maxDate && d > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate(), 23, 59, 59)) return true
    if (disabledDates && disabledDates(d)) return true
    return false
  }

  const handleSelect = (d: Date) => {
    if (isDateDisabled(d)) return
    if (!isControlled) setUncontrolledValue(d)
    onValueChange?.(d)
  }

  return (
    <div
      role="region"
      aria-label="Calendar"
      className={cn("p-3 bg-card text-card-foreground rounded-xl select-none w-fit", className)}
    >
      {/* Month & Year Header with Navigation */}
      <div className="flex items-center justify-between pb-3 px-1 border-b border-border/60">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="rounded-md p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <span className="text-xs font-bold tracking-tight text-foreground">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>

        <button
          type="button"
          onClick={handleNextMonth}
          className="rounded-md p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Weekday Labels */}
      <div role="row" className="grid grid-cols-7 gap-1 pt-2 pb-1 text-center">
        {WEEKDAY_NAMES.map((name) => (
          <span
            key={name}
            role="columnheader"
            aria-label={name}
            className="text-[11px] font-semibold text-muted-foreground/70 h-7 flex items-center justify-center"
          >
            {name}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div role="grid" aria-label="Days of the month" className="grid grid-cols-7 gap-1">
        {calendarCells.map(({ date, isCurrentMonth, dayNumber }, idx) => {
          const isSelected = isSameDay(date, selectedDate)
          const isToday = isSameDay(date, today)
          const disabled = isDateDisabled(date)

          const formattedLabel = `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`

          return (
            <button
              key={idx}
              type="button"
              role="gridcell"
              aria-label={formattedLabel}
              aria-selected={isSelected ? "true" : undefined}
              aria-disabled={disabled ? "true" : undefined}
              disabled={disabled}
              onClick={() => handleSelect(date)}
              className={cn(
                "h-8 w-8 text-xs rounded-lg flex items-center justify-center transition-all outline-none font-medium",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                isCurrentMonth ? "text-foreground" : "text-muted-foreground/40",
                isToday && !isSelected && "border border-teal-500 font-bold text-teal-600 dark:text-teal-400",
                isSelected
                  ? "bg-teal-600 text-white font-bold shadow-xs hover:bg-teal-700"
                  : "hover:bg-muted/70 hover:text-foreground",
                disabled && "opacity-25 pointer-events-none cursor-not-allowed"
              )}
            >
              {dayNumber}
            </button>
          )
        })}
      </div>
    </div>
  )
}
