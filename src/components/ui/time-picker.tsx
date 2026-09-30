"use client"

import * as React from "react"
import { Clock, ChevronUp, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

export interface TimePickerProps {
  value?: string // format "HH:MM" or "HH:MM AM/PM"
  defaultValue?: string
  onValueChange?: (time: string) => void
  format?: "12h" | "24h"
  minuteStep?: number
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  className?: string
}

export function TimePicker({
  value: controlledValue,
  defaultValue = "09:00 AM",
  onValueChange,
  format = "12h",
  minuteStep = 15,
  placeholder = "Select time...",
  disabled = false,
  clearable = true,
  className,
}: TimePickerProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string>(defaultValue)
  const isControlled = controlledValue !== undefined
  const activeValue = isControlled ? (controlledValue || "") : uncontrolledValue
  const [open, setOpen] = React.useState(false)

  // Parse hours, minutes, and meridian
  const is12h = format === "12h"
  let initialHour = 9
  let initialMinute = 0
  let initialMeridian: "AM" | "PM" = "AM"

  if (activeValue) {
    const parts = activeValue.split(" ")
    const timeParts = parts[0].split(":")
    if (timeParts.length >= 2) {
      initialHour = parseInt(timeParts[0], 10) || (is12h ? 12 : 0)
      initialMinute = parseInt(timeParts[1], 10) || 0
    }
    if (parts[1] === "PM" || parts[1] === "AM") {
      initialMeridian = parts[1]
    }
  }

  const [hour, setHour] = React.useState(initialHour)
  const [minute, setMinute] = React.useState(initialMinute)
  const [meridian, setMeridian] = React.useState<"AM" | "PM">(initialMeridian)

  // Sync internal state when controlled value changes
  React.useEffect(() => {
    if (controlledValue) {
      const parts = controlledValue.split(" ")
      const timeParts = parts[0].split(":")
      if (timeParts.length >= 2) {
        setHour(parseInt(timeParts[0], 10) || 12)
        setMinute(parseInt(timeParts[1], 10) || 0)
      }
      if (parts[1] === "PM" || parts[1] === "AM") {
        setMeridian(parts[1])
      }
    }
  }, [controlledValue])

  const notifyChange = (newH: number, newM: number, newPeriod: "AM" | "PM") => {
    const paddedH = is12h ? String(newH) : String(newH).padStart(2, "0")
    const paddedM = String(newM).padStart(2, "0")
    const formatted = is12h ? `${paddedH}:${paddedM} ${newPeriod}` : `${paddedH}:${paddedM}`

    if (!isControlled) setUncontrolledValue(formatted)
    onValueChange?.(formatted)
  }

  const adjustHour = (delta: number) => {
    let nextH = hour + delta
    if (is12h) {
      if (nextH > 12) nextH = 1
      if (nextH < 1) nextH = 12
    } else {
      if (nextH > 23) nextH = 0
      if (nextH < 0) nextH = 23
    }
    setHour(nextH)
    notifyChange(nextH, minute, meridian)
  }

  const adjustMinute = (delta: number) => {
    let nextM = minute + delta * minuteStep
    if (nextM >= 60) nextM = 0
    if (nextM < 0) nextM = 60 - minuteStep
    setMinute(nextM)
    notifyChange(hour, nextM, meridian)
  }

  const toggleMeridian = () => {
    const nextP = meridian === "AM" ? "PM" : "AM"
    setMeridian(nextP)
    notifyChange(hour, minute, nextP)
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isControlled) setUncontrolledValue("")
    onValueChange?.("")
  }

  return (
    <Popover open={open} onOpenChange={setOpen} placement="bottom" align="start">
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "flex h-9 w-full min-w-[180px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-xs shadow-xs transition-colors outline-none",
            "hover:bg-accent/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
            disabled && "opacity-50 pointer-events-none cursor-not-allowed",
            !activeValue && "text-muted-foreground",
            className
          )}
        >
          <span className="flex items-center gap-2 truncate">
            <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span>{activeValue || placeholder}</span>
          </span>

          {clearable && activeValue && !disabled && (
            <span
              role="button"
              tabIndex={0}
              onClick={handleClear}
              className="rounded p-0.5 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors ml-2"
              title="Clear time"
              aria-label="Clear time"
            >
              <X className="h-3.5 w-3.5" />
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent className="p-4 w-60 border border-border bg-popover shadow-xl rounded-xl z-50">
        <div className="flex items-center justify-center gap-3">
          {/* Hours Column */}
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => adjustHour(1)}
              className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
              aria-label="Increment hour"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
            <div className="h-10 w-12 rounded-lg border border-border bg-card flex items-center justify-center text-sm font-bold my-1">
              {String(hour).padStart(2, "0")}
            </div>
            <button
              type="button"
              onClick={() => adjustHour(-1)}
              className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
              aria-label="Decrement hour"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
            <span className="text-[10px] text-muted-foreground uppercase font-mono mt-0.5">Hours</span>
          </div>

          <span className="text-lg font-bold pb-4 text-muted-foreground">:</span>

          {/* Minutes Column */}
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => adjustMinute(1)}
              className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
              aria-label="Increment minute"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
            <div className="h-10 w-12 rounded-lg border border-border bg-card flex items-center justify-center text-sm font-bold my-1">
              {String(minute).padStart(2, "0")}
            </div>
            <button
              type="button"
              onClick={() => adjustMinute(-1)}
              className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
              aria-label="Decrement minute"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
            <span className="text-[10px] text-muted-foreground uppercase font-mono mt-0.5">Mins</span>
          </div>

          {/* Meridian AM/PM (12h format) */}
          {is12h && (
            <div className="flex flex-col items-center pb-4">
              <button
                type="button"
                onClick={toggleMeridian}
                className="h-10 px-2.5 rounded-lg border border-border bg-card hover:bg-accent text-xs font-bold transition-colors"
                aria-label={`Toggle AM/PM, currently ${meridian}`}
              >
                {meridian}
              </button>
              <span className="text-[10px] text-muted-foreground uppercase font-mono mt-1">Period</span>
            </div>
          )}
        </div>

        {/* Quick select buttons */}
        <div className="grid grid-cols-3 gap-1 pt-3 mt-3 border-t border-border/80 text-[11px]">
          {["09:00 AM", "12:00 PM", "05:00 PM"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                if (!isControlled) setUncontrolledValue(t)
                onValueChange?.(t)
                setOpen(false)
              }}
              className="p-1 rounded hover:bg-muted text-center font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.split(" ")[0]}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
