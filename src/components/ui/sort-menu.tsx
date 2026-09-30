"use client"

import * as React from "react"
import { ArrowUpDown, ArrowUp, ArrowDown, Check, ChevronDown, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SortOption {
  id: string
  label: string
  direction?: "asc" | "desc"
  disabled?: boolean
}

export interface SortMenuProps {
  options: SortOption[]
  value?: string
  defaultValue?: string
  onChange?: (option: SortOption) => void
  onClear?: () => void
  placeholder?: string
  disabled?: boolean
  className?: string
  size?: "sm" | "md" | "lg"
  align?: "start" | "end"
}

export function SortMenu({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  onClear,
  placeholder = "Sort by...",
  disabled = false,
  className,
  size = "md",
  align = "start",
}: SortMenuProps) {
  const isControlled = controlledValue !== undefined
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string | undefined>(defaultValue)
  const currentId = isControlled ? controlledValue : uncontrolledValue

  const [open, setOpen] = React.useState(false)
  const [focusedIndex, setFocusedIndex] = React.useState(-1)

  const menuRef = React.useRef<HTMLDivElement | null>(null)
  const triggerRef = React.useRef<HTMLButtonElement | null>(null)
  const listboxId = React.useId()

  const selectedOption = options.find((opt) => opt.id === currentId)

  const handleSelect = (option: SortOption) => {
    if (option.disabled) return
    if (!isControlled) {
      setUncontrolledValue(option.id)
    }
    onChange?.(option)
    setOpen(false)
    triggerRef.current?.focus()
  }

  const handleClear = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (!isControlled) {
      setUncontrolledValue(undefined)
    }
    onClear?.()
    setOpen(false)
    triggerRef.current?.focus()
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return

    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault()
        setOpen(true)
        const initialIdx = currentId ? options.findIndex((o) => o.id === currentId) : 0
        setFocusedIndex(initialIdx >= 0 ? initialIdx : 0)
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
      setFocusedIndex((prev) => (prev + 1) % options.length)
      return
    }

    if (e.key === "ArrowUp") {
      e.preventDefault()
      setFocusedIndex((prev) => (prev <= 0 ? options.length - 1 : prev - 1))
      return
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      if (focusedIndex >= 0 && options[focusedIndex] && !options[focusedIndex].disabled) {
        handleSelect(options[focusedIndex])
      }
    }
  }

  // Outside click listener
  React.useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  const sizeClasses = {
    sm: "h-8 text-xs px-2.5 gap-1.5",
    md: "h-9 text-sm px-3 gap-2",
    lg: "h-11 text-base px-4 gap-2.5",
  }[size]

  return (
    <div ref={menuRef} className={cn("relative inline-block text-left", className)}>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-label="Sort options"
        onClick={() => {
          if (!disabled) {
            setOpen(!open)
            if (!open) {
              const idx = currentId ? options.findIndex((o) => o.id === currentId) : 0
              setFocusedIndex(idx >= 0 ? idx : 0)
            }
          }
        }}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-between rounded-lg border border-input bg-background font-medium text-foreground shadow-xs transition-colors",
          "hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          selectedOption ? "border-primary/50 text-foreground" : "text-muted-foreground",
          disabled && "opacity-50 pointer-events-none cursor-not-allowed bg-muted/20",
          sizeClasses
        )}
      >
        <div className="flex items-center gap-1.5 truncate">
          {selectedOption ? (
            selectedOption.direction === "asc" ? (
              <ArrowUp className="h-4 w-4 text-primary shrink-0" />
            ) : selectedOption.direction === "desc" ? (
              <ArrowDown className="h-4 w-4 text-primary shrink-0" />
            ) : (
              <ArrowUpDown className="h-4 w-4 text-primary shrink-0" />
            )
          ) : (
            <ArrowUpDown className="h-4 w-4 shrink-0" />
          )}
          <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        </div>

        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 opacity-50 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Sort order"
          className={cn(
            "absolute z-50 mt-1.5 min-w-[14rem] overflow-hidden rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-xl animate-in fade-in-0 zoom-in-95",
            align === "end" ? "right-0" : "left-0"
          )}
        >
          {selectedOption && (
            <div className="flex items-center justify-between px-2.5 py-1.5 text-xs font-semibold text-muted-foreground border-b border-border/60 mb-1">
              <span>Active: {selectedOption.label}</span>
              <button
                type="button"
                onClick={handleClear}
                className="hover:text-destructive flex items-center gap-1 text-[11px] font-normal"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </button>
            </div>
          )}

          <div className="space-y-0.5">
            {options.map((opt, index) => {
              const isSelected = opt.id === currentId
              const isFocused = index === focusedIndex

              return (
                <div
                  key={opt.id}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={opt.disabled}
                  onClick={() => handleSelect(opt)}
                  onMouseEnter={() => !opt.disabled && setFocusedIndex(index)}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-2.5 py-2 text-xs select-none transition-colors cursor-pointer",
                    isSelected
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-foreground hover:bg-muted",
                    isFocused && !isSelected && "bg-muted",
                    opt.disabled && "opacity-40 cursor-not-allowed pointer-events-none"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {opt.direction === "asc" ? (
                      <ArrowUp className="h-3.5 w-3.5 opacity-70" />
                    ) : opt.direction === "desc" ? (
                      <ArrowDown className="h-3.5 w-3.5 opacity-70" />
                    ) : (
                      <ArrowUpDown className="h-3.5 w-3.5 opacity-70" />
                    )}
                    <span>{opt.label}</span>
                  </div>

                  {isSelected && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
