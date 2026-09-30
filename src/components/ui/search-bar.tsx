"use client"

import * as React from "react"
import { Search, Loader2, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SearchSuggestion {
  id: string
  label: string
  category?: string
  description?: string
}

export interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "size"> {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onSearch?: (query: string) => void
  onClear?: () => void
  suggestions?: Array<SearchSuggestion | string>
  onSelectSuggestion?: (suggestion: SearchSuggestion | string) => void
  loading?: boolean
  error?: boolean | string
  size?: "sm" | "md" | "lg"
  clearable?: boolean
  label?: string
  hideLabel?: boolean
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      value: controlledValue,
      defaultValue = "",
      onChange,
      onSearch,
      onClear,
      suggestions = [],
      onSelectSuggestion,
      loading = false,
      error,
      size = "md",
      clearable = true,
      label = "Search",
      hideLabel = true,
      placeholder = "Search...",
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
    const query = isControlled ? controlledValue : uncontrolledValue

    const [isFocused, setIsFocused] = React.useState(false)
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1)
    const [suggestionsOpen, setSuggestionsOpen] = React.useState(false)

    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const listboxId = React.useId()

    // Normalize suggestions
    const normalizedSuggestions: SearchSuggestion[] = React.useMemo(() => {
      return suggestions.map((s, idx) =>
        typeof s === "string" ? { id: `sug-${idx}`, label: s } : s
      )
    }, [suggestions])

    // Filter suggestions based on query if needed
    const filteredSuggestions = React.useMemo(() => {
      if (!query.trim()) return normalizedSuggestions
      const q = query.toLowerCase()
      return normalizedSuggestions.filter(
        (s) =>
          s.label.toLowerCase().includes(q) ||
          s.category?.toLowerCase().includes(q) ||
          s.description?.toLowerCase().includes(q)
      )
    }, [normalizedSuggestions, query])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextVal = e.target.value
      if (!isControlled) {
        setUncontrolledValue(nextVal)
      }
      onChange?.(nextVal)
      setSuggestionsOpen(true)
      setHighlightedIndex(-1)
    }

    const handleClear = () => {
      if (!isControlled) {
        setUncontrolledValue("")
      }
      onChange?.("")
      onClear?.()
      setSuggestionsOpen(false)
      setHighlightedIndex(-1)
      inputRef.current?.focus()
    }

    const handleSelect = (item: SearchSuggestion) => {
      if (!isControlled) {
        setUncontrolledValue(item.label)
      }
      onChange?.(item.label)
      onSelectSuggestion?.(item)
      onSearch?.(item.label)
      setSuggestionsOpen(false)
      setHighlightedIndex(-1)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return

      if (e.key === "Escape") {
        if (suggestionsOpen) {
          e.preventDefault()
          setSuggestionsOpen(false)
          setHighlightedIndex(-1)
        } else if (query) {
          e.preventDefault()
          handleClear()
        }
        return
      }

      if (e.key === "ArrowDown") {
        e.preventDefault()
        if (!suggestionsOpen && filteredSuggestions.length > 0) {
          setSuggestionsOpen(true)
          setHighlightedIndex(0)
          return
        }
        if (filteredSuggestions.length > 0) {
          setHighlightedIndex((prev) => (prev + 1) % filteredSuggestions.length)
        }
        return
      }

      if (e.key === "ArrowUp") {
        e.preventDefault()
        if (filteredSuggestions.length > 0) {
          setHighlightedIndex((prev) =>
            prev <= 0 ? filteredSuggestions.length - 1 : prev - 1
          )
        }
        return
      }

      if (e.key === "Enter") {
        e.preventDefault()
        if (suggestionsOpen && highlightedIndex >= 0 && filteredSuggestions[highlightedIndex]) {
          handleSelect(filteredSuggestions[highlightedIndex])
        } else {
          onSearch?.(query)
          setSuggestionsOpen(false)
        }
        return
      }
    }

    // Click outside listener
    React.useEffect(() => {
      const handleOutsideClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setSuggestionsOpen(false)
        }
      }
      document.addEventListener("mousedown", handleOutsideClick)
      return () => document.removeEventListener("mousedown", handleOutsideClick)
    }, [])

    const sizeClasses = {
      sm: "h-8 text-xs px-2.5",
      md: "h-10 text-sm px-3",
      lg: "h-12 text-base px-4",
    }[size]

    const iconSizes = {
      sm: "h-3.5 w-3.5",
      md: "h-4 w-4",
      lg: "h-5 w-5",
    }[size]

    const showSuggestions =
      suggestionsOpen && isFocused && filteredSuggestions.length > 0

    return (
      <div ref={containerRef} className={cn("relative w-full", className)}>
        {label && (
          <label
            htmlFor={props.id || "search-bar-input"}
            className={cn(
              "block text-xs font-medium mb-1.5 text-foreground",
              hideLabel && "sr-only"
            )}
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            "relative flex items-center rounded-lg border bg-background transition-colors",
            "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1",
            error ? "border-destructive text-destructive" : "border-input",
            disabled && "opacity-50 pointer-events-none cursor-not-allowed bg-muted/30"
          )}
        >
          {/* Leading Search Icon or Loading Spinner */}
          <div className="flex items-center justify-center pl-3 text-muted-foreground pointer-events-none shrink-0">
            {loading ? (
              <Loader2 className={cn(iconSizes, "animate-spin text-primary")} aria-hidden="true" />
            ) : (
              <Search className={iconSizes} aria-hidden="true" />
            )}
          </div>

          {/* Search Input */}
          <input
            ref={(node) => {
              inputRef.current = node
              if (typeof ref === "function") ref(node)
              else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node
            }}
            id={props.id || "search-bar-input"}
            type="search"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={showSuggestions}
            aria-controls={showSuggestions ? listboxId : undefined}
            aria-activedescendant={
              highlightedIndex >= 0 ? `${listboxId}-opt-${highlightedIndex}` : undefined
            }
            aria-invalid={!!error}
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              setIsFocused(true)
              if (filteredSuggestions.length > 0) setSuggestionsOpen(true)
            }}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "w-full bg-transparent border-0 placeholder:text-muted-foreground focus:outline-none",
              "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
              sizeClasses
            )}
            {...props}
          />

          {/* Clear Button */}
          {clearable && query && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="mr-2 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Clear search query"
            >
              <X className={cn(iconSizes, "shrink-0")} />
            </button>
          )}
        </div>

        {/* Error message */}
        {typeof error === "string" && (
          <p className="mt-1 text-xs text-destructive">{error}</p>
        )}

        {/* Suggestions Dropdown */}
        {showSuggestions && (
          <ul
            id={listboxId}
            role="listbox"
            aria-label="Search suggestions"
            className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95"
          >
            {filteredSuggestions.map((suggestion, index) => {
              const isHighlighted = index === highlightedIndex
              return (
                <li
                  key={suggestion.id}
                  id={`${listboxId}-opt-${index}`}
                  role="option"
                  aria-selected={isHighlighted}
                  onMouseDown={(e) => {
                    // Prevent blur before selection
                    e.preventDefault()
                    handleSelect(suggestion)
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={cn(
                    "flex flex-col rounded-sm px-3 py-2 text-sm cursor-pointer select-none transition-colors",
                    isHighlighted
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span>{suggestion.label}</span>
                    {suggestion.category && (
                      <span className="text-[11px] text-muted-foreground uppercase font-mono px-1.5 py-0.5 rounded bg-muted/60">
                        {suggestion.category}
                      </span>
                    )}
                  </div>
                  {suggestion.description && (
                    <span className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                      {suggestion.description}
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    )
  }
)
SearchBar.displayName = "SearchBar"
