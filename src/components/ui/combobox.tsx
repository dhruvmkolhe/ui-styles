"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Loader2, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ComboboxOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
  icon?: React.ReactNode
}

export interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  disabled?: boolean
  loading?: boolean
  emptyMessage?: string
  clearable?: boolean
  className?: string
  label?: string
  hideLabel?: boolean
  renderOption?: (option: ComboboxOption, isSelected: boolean) => React.ReactNode
}

export function Combobox({
  options,
  value: controlledValue,
  defaultValue = "",
  onChange,
  placeholder = "Select an option...",
  searchPlaceholder = "Search options...",
  disabled = false,
  loading = false,
  emptyMessage = "No matching options.",
  clearable = true,
  className,
  label,
  hideLabel = true,
  renderOption,
}: ComboboxProps) {
  const isControlled = controlledValue !== undefined
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const selectedValue = isControlled ? controlledValue : uncontrolledValue

  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1)

  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const triggerRef = React.useRef<HTMLButtonElement | null>(null)
  const searchInputRef = React.useRef<HTMLInputElement | null>(null)
  const listboxId = React.useId()

  const selectedOption = options.find((opt) => opt.value === selectedValue)

  // Filter options based on search query
  const filteredOptions = React.useMemo(() => {
    if (!searchQuery.trim()) return options
    const q = searchQuery.toLowerCase()
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(q) ||
        opt.description?.toLowerCase().includes(q)
    )
  }, [options, searchQuery])

  // Reset highlight on options change
  React.useEffect(() => {
    if (open) {
      const idx = filteredOptions.findIndex((o) => o.value === selectedValue)
      setHighlightedIndex(idx >= 0 ? idx : 0)
      setTimeout(() => searchInputRef.current?.focus(), 40)
    } else {
      setSearchQuery("")
    }
  }, [open, filteredOptions, selectedValue])

  const handleSelect = (val: string) => {
    if (!isControlled) {
      setUncontrolledValue(val)
    }
    onChange?.(val)
    setOpen(false)
    triggerRef.current?.focus()
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isControlled) {
      setUncontrolledValue("")
    }
    onChange?.("")
  }

  // Keyboard navigation inside popover list
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
        setHighlightedIndex((prev) => {
          let next = (prev + 1) % filteredOptions.length
          while (filteredOptions[next]?.disabled && next !== prev) {
            next = (next + 1) % filteredOptions.length
          }
          return next
        })
      }
      return
    }

    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (filteredOptions.length > 0) {
        setHighlightedIndex((prev) => {
          let next = prev <= 0 ? filteredOptions.length - 1 : prev - 1
          while (filteredOptions[next]?.disabled && next !== prev) {
            next = next <= 0 ? filteredOptions.length - 1 : next - 1
          }
          return next
        })
      }
      return
    }

    if (e.key === "Enter") {
      e.preventDefault()
      const opt = filteredOptions[highlightedIndex]
      if (opt && !opt.disabled) {
        handleSelect(opt.value)
      }
      return
    }

    if (e.key === "Home") {
      e.preventDefault()
      setHighlightedIndex(0)
    } else if (e.key === "End") {
      e.preventDefault()
      setHighlightedIndex(filteredOptions.length - 1)
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

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {label && (
        <label
          htmlFor={listboxId}
          className={cn(
            "block text-xs font-medium text-foreground mb-1.5",
            hideLabel && "sr-only"
          )}
        >
          {label}
        </label>
      )}

      {/* Trigger Button */}
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
          "flex h-9 w-full items-center justify-between rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
          open && "ring-2 ring-ring ring-offset-1 border-primary",
          disabled && "opacity-50 pointer-events-none cursor-not-allowed bg-muted/30"
        )}
      >
        <div className="flex items-center gap-2 truncate">
          {selectedOption?.icon && (
            <span className="shrink-0 h-4 w-4 text-muted-foreground flex items-center justify-center">
              {selectedOption.icon}
            </span>
          )}
          <span className={cn("truncate", !selectedOption && "text-muted-foreground")}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0 ml-2">
          {clearable && selectedOption && !disabled && (
            <span
              role="button"
              aria-label="Clear selected option"
              onClick={handleClear}
              className="p-0.5 rounded text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </span>
          )}
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </div>
      </button>

      {/* Dropdown Popover */}
      {open && (
        <div
          className="absolute z-50 mt-1 w-full rounded-xl border border-border bg-popover p-1.5 text-popover-foreground shadow-xl animate-in fade-in-0 zoom-in-95"
          onKeyDown={handleKeyDown}
        >
          {/* Search Input Header */}
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

          {/* Options List */}
          <ul
            id={listboxId}
            role="listbox"
            aria-label="Combobox options"
            className="max-h-60 overflow-y-auto space-y-0.5"
          >
            {filteredOptions.length === 0 ? (
              <li className="py-4 text-center text-xs text-muted-foreground">
                {emptyMessage}
              </li>
            ) : (
              filteredOptions.map((opt, index) => {
                const isSelected = opt.value === selectedValue
                const isHighlighted = index === highlightedIndex

                return (
                  <li
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={opt.disabled}
                    onClick={() => !opt.disabled && handleSelect(opt.value)}
                    onMouseEnter={() => !opt.disabled && setHighlightedIndex(index)}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs select-none transition-colors cursor-pointer",
                      isHighlighted && "bg-muted text-foreground",
                      isSelected && "font-semibold text-primary",
                      opt.disabled && "opacity-40 cursor-not-allowed pointer-events-none"
                    )}
                  >
                    {renderOption ? (
                      renderOption(opt, isSelected)
                    ) : (
                      <div className="flex items-center gap-2 truncate">
                        {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                        <div className="truncate">
                          <div>{opt.label}</div>
                          {opt.description && (
                            <div className="text-[10px] text-muted-foreground font-normal line-clamp-1">
                              {opt.description}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {isSelected && <Check className="h-3.5 w-3.5 text-primary shrink-0 ml-2" />}
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
