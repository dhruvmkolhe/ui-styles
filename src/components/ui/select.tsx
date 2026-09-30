"use client"

import * as React from "react"
import { ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
  description?: string
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  error?: boolean
  name?: string
  required?: boolean
  id?: string
  className?: string
  ariaLabel?: string
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      value: controlledValue,
      defaultValue,
      onValueChange,
      placeholder = "Select an option...",
      disabled = false,
      error = false,
      name,
      required = false,
      id: idProp,
      className,
      ariaLabel,
    },
    ref
  ) => {
    const generatedId = React.useId()
    const id = idProp || generatedId
    const [isOpen, setIsOpen] = React.useState(false)
    const [highlightedIndex, setHighlightedIndex] = React.useState<number>(-1)

    const isControlled = controlledValue !== undefined
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string>(
      defaultValue || ""
    )
    const currentValue = isControlled ? controlledValue : uncontrolledValue

    const containerRef = React.useRef<HTMLDivElement>(null)
    const listboxRef = React.useRef<HTMLUListElement>(null)

    const selectedOption = options.find((opt) => opt.value === currentValue)

    // Handle outside clicks to close
    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false)
        }
      }
      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside)
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [isOpen])

    const handleSelect = (val: string) => {
      if (!isControlled) {
        setUncontrolledValue(val)
      }
      onValueChange?.(val)
      setIsOpen(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return

      if (e.key === "Enter" || e.key === " ") {
        if (!isOpen) {
          e.preventDefault()
          setIsOpen(true)
          const selIdx = options.findIndex((opt) => opt.value === currentValue)
          setHighlightedIndex(selIdx >= 0 ? selIdx : 0)
        } else if (highlightedIndex >= 0 && options[highlightedIndex]) {
          e.preventDefault()
          const opt = options[highlightedIndex]
          if (!opt.disabled) {
            handleSelect(opt.value)
          }
        }
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault()
        setIsOpen(false)
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
          setHighlightedIndex(0)
        } else {
          setHighlightedIndex((prev) =>
            prev < options.length - 1 ? prev + 1 : 0
          )
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
          setHighlightedIndex(options.length - 1)
        } else {
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : options.length - 1
          )
        }
      }
    }

    return (
      <div ref={containerRef} className="relative w-full">
        {/* Hidden form input for standard form submission */}
        {name && (
          <input
            type="hidden"
            name={name}
            value={currentValue || ""}
            required={required}
          />
        )}

        <button
          ref={ref}
          type="button"
          id={id}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={ariaLabel}
          aria-invalid={error ? "true" : undefined}
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className={cn(
            "flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs transition-colors",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive text-destructive ring-destructive/20",
            !selectedOption && "text-muted-foreground",
            className
          )}
        >
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {isOpen && (
          <ul
            ref={listboxRef}
            role="listbox"
            tabIndex={-1}
            className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 zoom-in-95 focus:outline-none"
          >
            {options.map((opt, idx) => {
              const isSelected = opt.value === currentValue
              const isHighlighted = idx === highlightedIndex
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={opt.disabled}
                  onClick={() => {
                    if (!opt.disabled) {
                      handleSelect(opt.value)
                    }
                  }}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  className={cn(
                    "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
                    (isSelected || isHighlighted) && "bg-accent text-accent-foreground",
                    opt.disabled && "pointer-events-none opacity-40"
                  )}
                >
                  {isSelected && (
                    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                      <Check className="h-4 w-4 text-primary" />
                    </span>
                  )}
                  <div className="flex flex-col">
                    <span className={cn("truncate", isSelected && "font-medium")}>
                      {opt.label}
                    </span>
                    {opt.description && (
                      <span className="text-[11px] text-muted-foreground">
                        {opt.description}
                      </span>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    )
  }
)
Select.displayName = "Select"

export interface NativeSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
}

const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          className={cn(
            "flex h-9 w-full appearance-none rounded-md border border-input bg-background px-3 py-1 pr-8 text-sm shadow-xs transition-colors",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive text-destructive",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      </div>
    )
  }
)
NativeSelect.displayName = "NativeSelect"

export { Select, NativeSelect }
