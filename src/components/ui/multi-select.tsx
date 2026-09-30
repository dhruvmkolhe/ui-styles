"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Loader2, Search, X, CheckCheck, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

export interface MultiSelectOption {
  value: string
  label: string
  disabled?: boolean
  icon?: React.ReactNode
}

export interface MultiSelectProps {
  options: MultiSelectOption[]
  value?: string[]
  defaultValue?: string[]
  onChange?: (values: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  disabled?: boolean
  loading?: boolean
  emptyMessage?: string
  maxDisplayedChips?: number
  className?: string
  label?: string
  hideLabel?: boolean
}

export function MultiSelect({
  options,
  value: controlledValue,
  defaultValue = [],
  onChange,
  placeholder = "Select items...",
  searchPlaceholder = "Search items...",
  disabled = false,
  loading = false,
  emptyMessage = "No items found.",
  maxDisplayedChips = 4,
  className,
  label,
  hideLabel = true,
}: MultiSelectProps) {
  const isControlled = controlledValue !== undefined
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string[]>(defaultValue)
  const selectedValues = isControlled ? controlledValue : uncontrolledValue

  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [highlightedIndex, setHighlightedIndex] = React.useState(0)

  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const triggerRef = React.useRef<HTMLButtonElement | null>(null)
  const searchInputRef = React.useRef<HTMLInputElement | null>(null)
  const listboxId = React.useId()

  // Filter options based on query
  const filteredOptions = React.useMemo(() => {
    if (!searchQuery.trim()) return options
    const q = searchQuery.toLowerCase()
    return options.filter((opt) => opt.label.toLowerCase().includes(q))
  }, [options, searchQuery])

  React.useEffect(() => {
    if (open) {
      setTimeout(() => searchInputRef.current?.focus(), 40)
    } else {
      setSearchQuery("")
    }
  }, [open])

  const toggleOption = (val: string) => {
    const isSelected = selectedValues.includes(val)
    const next = isSelected
      ? selectedValues.filter((v) => v !== val)
      : [...selectedValues, val]

    if (!isControlled) {
      setUncontrolledValue(next)
    }
    onChange?.(next)
  }

  const removeChip = (val: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const next = selectedValues.filter((v) => v !== val)
    if (!isControlled) {
      setUncontrolledValue(next)
    }
    onChange?.(next)
  }

  const selectAll = () => {
    const allEnabled = options.filter((o) => !o.disabled).map((o) => o.value)
    if (!isControlled) {
      setUncontrolledValue(allEnabled)
    }
    onChange?.(allEnabled)
  }

  const clearAll = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (!isControlled) {
      setUncontrolledValue([])
    }
    onChange?.([])
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return

    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault()
        setOpen(true)
      }
      return
    }

    if (e.key === "Escape") {
      e.preventDefault()
      setOpen(false)
      triggerRef.current?.focus()
      return
    }

    if (e.key === "ArrowDown") {
      e.preventDefault()
      if (filteredOptions.length > 0) {
        setHighlightedIndex((prev) => (prev + 1) % filteredOptions.length)
      }
      return
    }

    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (filteredOptions.length > 0) {
        setHighlightedIndex((prev) =>
          prev <= 0 ? filteredOptions.length - 1 : prev - 1
        )
      }
      return
    }

    if (e.key === "Enter") {
      e.preventDefault()
      const opt = filteredOptions[highlightedIndex]
      if (opt && !opt.disabled) {
        toggleOption(opt.value)
      }
      return
    }

    if (e.key === "Backspace" && searchQuery === "" && selectedValues.length > 0) {
      // Remove last chip on backspace
      const next = selectedValues.slice(0, -1)
      if (!isControlled) setUncontrolledValue(next)
      onChange?.(next)
    }
  }

  // Click outside listener
  React.useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  const visibleChips = selectedValues.slice(0, maxDisplayedChips)
  const hiddenChipsCount = selectedValues.length - maxDisplayedChips

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {label && (
        <label
          className={cn(
            "block text-xs font-medium text-foreground mb-1.5",
            hideLabel && "sr-only"
          )}
        >
          {label}
        </label>
      )}

      {/* Trigger Box */}
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={open ? listboxId : undefined}
        aria-label={label || placeholder}
        disabled={disabled}
        onClick={() => !disabled && setOpen(!open)}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex min-h-9 w-full items-center justify-between rounded-lg border border-input bg-background p-1.5 text-sm text-foreground shadow-xs transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
          open && "ring-2 ring-ring ring-offset-1 border-primary",
          disabled && "opacity-50 pointer-events-none cursor-not-allowed bg-muted/30"
        )}
      >
        <div className="flex flex-wrap items-center gap-1.5 flex-1 min-w-0 pr-2">
          {selectedValues.length === 0 ? (
            <span className="text-muted-foreground text-xs px-1.5">{placeholder}</span>
          ) : (
            visibleChips.map((val) => {
              const opt = options.find((o) => o.value === val)
              return (
                <span
                  key={val}
                  className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                >
                  {opt?.icon && <span className="h-3 w-3 shrink-0">{opt.icon}</span>}
                  <span className="truncate max-w-[120px]">{opt ? opt.label : val}</span>
                  {!disabled && (
                    <span
                      role="button"
                      tabIndex={0}
                      aria-label={`Remove ${opt ? opt.label : val}`}
                      onClick={(e) => removeChip(val, e)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          e.stopPropagation()
                          removeChip(val, e as any)
                        }
                      }}
                      className="hover:text-destructive hover:bg-muted/80 rounded p-0.5 cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </span>
                  )}
                </span>
              )
            })
          )}

          {hiddenChipsCount > 0 && (
            <span className="inline-flex items-center rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-mono text-muted-foreground">
              +{hiddenChipsCount} more
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0 ml-1">
          {selectedValues.length > 0 && !disabled && (
            <span
              role="button"
              tabIndex={0}
              aria-label="Clear all selections"
              onClick={clearAll}
              className="p-1 rounded text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </span>
          )}
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </div>
      </button>

      {/* Popover */}
      {open && (
        <div
          className="absolute z-50 mt-1 w-full rounded-xl border border-border bg-popover p-1.5 text-popover-foreground shadow-xl animate-in fade-in-0 zoom-in-95"
          onKeyDown={handleKeyDown}
        >
          {/* Search Header */}
          <div className="flex items-center border-b border-border/70 px-2 pb-1.5 mb-1 gap-2">
            <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setHighlightedIndex(0)
              }}
              placeholder={searchPlaceholder}
              className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            {loading && <Loader2 className="h-3.5 w-3.5 animate-spin text-primary shrink-0" />}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center justify-between px-2 py-1 text-[11px] text-muted-foreground border-b border-border/50 mb-1">
            <button
              type="button"
              onClick={selectAll}
              className="hover:text-foreground flex items-center gap-1 font-medium"
            >
              <CheckCheck className="h-3 w-3" />
              Select all
            </button>
            {selectedValues.length > 0 && (
              <button
                type="button"
                onClick={() => clearAll()}
                className="hover:text-destructive flex items-center gap-1"
              >
                <RotateCcw className="h-3 w-3" />
                Clear ({selectedValues.length})
              </button>
            )}
          </div>

          {/* Options List */}
          <ul
            id={listboxId}
            role="listbox"
            aria-multiselectable="true"
            aria-label="Multi-select options"
            className="max-h-60 overflow-y-auto space-y-0.5"
          >
            {filteredOptions.length === 0 ? (
              <li className="py-4 text-center text-xs text-muted-foreground">
                {emptyMessage}
              </li>
            ) : (
              filteredOptions.map((opt, index) => {
                const isSelected = selectedValues.includes(opt.value)
                const isHighlighted = index === highlightedIndex

                return (
                  <li
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={opt.disabled}
                    onClick={() => !opt.disabled && toggleOption(opt.value)}
                    onMouseEnter={() => !opt.disabled && setHighlightedIndex(index)}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs select-none transition-colors cursor-pointer",
                      isHighlighted && "bg-muted",
                      isSelected && "text-primary font-medium",
                      opt.disabled && "opacity-40 cursor-not-allowed pointer-events-none"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "h-3.5 w-3.5 rounded border flex items-center justify-center transition-colors",
                          isSelected
                            ? "bg-primary border-primary text-primary-foreground"
                            : "border-input bg-background"
                        )}
                      >
                        {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                      </div>
                      {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                      <span>{opt.label}</span>
                    </div>
                  </li>
                )
              })
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
