"use client"

import * as React from "react"
import { Search, Loader2, ArrowRight, CornerDownLeft, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CommandItem {
  id: string
  label: string
  keywords?: string[]
  icon?: React.ReactNode
  shortcut?: string
  disabled?: boolean
  onSelect?: () => void
}

export interface CommandGroup {
  heading: string
  items: CommandItem[]
}

export interface CommandMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  groups: CommandGroup[]
  placeholder?: string
  loading?: boolean
  emptyMessage?: string
  className?: string
}

export function CommandMenu({
  open,
  onOpenChange,
  groups,
  placeholder = "Type a command or search...",
  loading = false,
  emptyMessage = "No results found.",
  className,
}: CommandMenuProps) {
  const [query, setQuery] = React.useState("")
  const [highlightedIndex, setHighlightedIndex] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const listRef = React.useRef<HTMLDivElement | null>(null)

  // Reset search query and highlight when opening
  React.useEffect(() => {
    if (open) {
      setQuery("")
      setHighlightedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  // Filter groups and items
  const filteredGroups = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return groups

    return groups
      .map((group) => {
        const matchingItems = group.items.filter((item) => {
          if (item.label.toLowerCase().includes(q)) return true
          if (item.keywords?.some((k) => k.toLowerCase().includes(q))) return true
          return false
        })
        return { ...group, items: matchingItems }
      })
      .filter((group) => group.items.length > 0)
  }, [groups, query])

  // Flattened list of active items for keyboard navigation
  const flatItems = React.useMemo(() => {
    return filteredGroups.flatMap((group) => group.items)
  }, [filteredGroups])

  // Keep highlighted index in bounds
  React.useEffect(() => {
    setHighlightedIndex((prev) => {
      if (flatItems.length === 0) return 0
      return Math.min(prev, flatItems.length - 1)
    })
  }, [flatItems])

  // Scroll active item into view
  React.useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector('[data-highlighted="true"]')
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" })
      }
    }
  }, [highlightedIndex])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault()
      onOpenChange(false)
      return
    }

    if (flatItems.length === 0) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlightedIndex((prev) => {
        let next = (prev + 1) % flatItems.length
        // skip disabled
        while (flatItems[next]?.disabled && next !== prev) {
          next = (next + 1) % flatItems.length
        }
        return next
      })
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlightedIndex((prev) => {
        let next = (prev - 1 + flatItems.length) % flatItems.length
        // skip disabled
        while (flatItems[next]?.disabled && next !== prev) {
          next = (next - 1 + flatItems.length) % flatItems.length
        }
        return next
      })
    } else if (e.key === "Enter") {
      e.preventDefault()
      const item = flatItems[highlightedIndex]
      if (item && !item.disabled) {
        item.onSelect?.()
        onOpenChange(false)
      }
    }
  }

  if (!open) return null

  let globalIndexCounter = 0

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Menu"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh] sm:pt-[15vh] bg-black/60 backdrop-blur-xs animate-in fade-in-0"
      onClick={(e) => {
        if (e.target === e.currentTarget) onOpenChange(false)
      }}
    >
      <div
        className={cn(
          "w-full max-w-xl overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-2xl animate-in zoom-in-95 duration-150 flex flex-col max-h-[75vh]",
          className
        )}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-border px-3.5 py-2.5 gap-2.5">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : (
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          )}
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-list"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setHighlightedIndex(0)
            }}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="rounded p-1 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Command Items List */}
        <div
          ref={listRef}
          id="command-list"
          role="listbox"
          className="flex-1 overflow-y-auto p-2 space-y-3"
        >
          {flatItems.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              {emptyMessage}
            </div>
          ) : (
            filteredGroups.map((group) => (
              <div key={group.heading} className="space-y-1">
                <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
                  {group.heading}
                </div>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const currentIndex = globalIndexCounter++
                    const isHighlighted = currentIndex === highlightedIndex

                    return (
                      <div
                        key={item.id}
                        role="option"
                        aria-selected={isHighlighted}
                        data-highlighted={isHighlighted ? "true" : undefined}
                        onClick={() => {
                          if (item.disabled) return
                          item.onSelect?.()
                          onOpenChange(false)
                        }}
                        onMouseEnter={() => {
                          if (!item.disabled) setHighlightedIndex(currentIndex)
                        }}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm cursor-pointer select-none transition-colors",
                          isHighlighted
                            ? "bg-accent text-accent-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground",
                          item.disabled &&
                            "opacity-40 cursor-not-allowed pointer-events-none"
                        )}
                      >
                        {item.icon && (
                          <span className="shrink-0 h-4 w-4 [&>svg]:h-4 [&>svg]:w-4 flex items-center justify-center">
                            {item.icon}
                          </span>
                        )}
                        <span className="flex-1 truncate text-left">{item.label}</span>
                        {item.shortcut && (
                          <kbd className="ml-auto inline-flex items-center rounded border border-border/80 bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                            {item.shortcut}
                          </kbd>
                        )}
                        {isHighlighted && !item.shortcut && (
                          <CornerDownLeft className="h-3.5 w-3.5 text-muted-foreground opacity-60 ml-auto" />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts info */}
        <div className="border-t border-border px-3 py-2 bg-muted/30 text-[11px] text-muted-foreground flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>
              <kbd className="font-mono bg-muted px-1 rounded border border-border">↑</kbd>
              <kbd className="font-mono bg-muted px-1 rounded border border-border ml-1">↓</kbd> to navigate
            </span>
            <span>
              <kbd className="font-mono bg-muted px-1.5 rounded border border-border">↵</kbd> to select
            </span>
          </div>
          <span>
            {flatItems.length} command{flatItems.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>
    </div>
  )
}
