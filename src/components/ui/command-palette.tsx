"use client"

import * as React from "react"
import { Search, Loader2, ArrowRight, CornerDownLeft, X, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export interface PaletteCommand {
  id: string
  label: string
  description?: string
  keywords?: string[]
  icon?: React.ReactNode
  shortcut?: string
  disabled?: boolean
  onSelect?: () => void
}

export interface PaletteGroup {
  category: string
  items: PaletteCommand[]
}

export interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  groups: PaletteGroup[]
  placeholder?: string
  loading?: boolean
  emptyMessage?: string
  enableGlobalShortcut?: boolean
  inline?: boolean
  className?: string
}

export function CommandPalette({
  open,
  onOpenChange,
  groups,
  placeholder = "Type a command or search...",
  loading = false,
  emptyMessage = "No matching commands found.",
  enableGlobalShortcut = true,
  inline = false,
  className,
}: CommandPaletteProps) {
  const [query, setQuery] = React.useState("")
  const [highlightedIndex, setHighlightedIndex] = React.useState(0)
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const listRef = React.useRef<HTMLDivElement | null>(null)

  // Global Cmd+K / Ctrl+K listener
  React.useEffect(() => {
    if (!enableGlobalShortcut) return
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    window.addEventListener("keydown", handleGlobalKeyDown)
    return () => window.removeEventListener("keydown", handleGlobalKeyDown)
  }, [enableGlobalShortcut, open, onOpenChange])

  // Reset when opened
  React.useEffect(() => {
    if (open) {
      setQuery("")
      setSelectedCategory(null)
      setHighlightedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  // Categories list
  const categories = React.useMemo(() => {
    return Array.from(new Set(groups.map((g) => g.category)))
  }, [groups])

  // Filter groups
  const filteredGroups = React.useMemo(() => {
    const q = query.trim().toLowerCase()

    return groups
      .filter((g) => !selectedCategory || g.category === selectedCategory)
      .map((group) => {
        const matchingItems = group.items.filter((item) => {
          if (!q) return true
          if (item.label.toLowerCase().includes(q)) return true
          if (item.description?.toLowerCase().includes(q)) return true
          if (item.keywords?.some((k) => k.toLowerCase().includes(q))) return true
          return false
        })
        return { ...group, items: matchingItems }
      })
      .filter((group) => group.items.length > 0)
  }, [groups, query, selectedCategory])

  const flatItems = React.useMemo(() => {
    return filteredGroups.flatMap((g) => g.items)
  }, [filteredGroups])

  React.useEffect(() => {
    setHighlightedIndex((prev) => {
      if (flatItems.length === 0) return 0
      return Math.min(prev, flatItems.length - 1)
    })
  }, [flatItems])

  React.useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector('[data-active="true"]')
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
        while (flatItems[next]?.disabled && next !== prev) {
          next = (next + 1) % flatItems.length
        }
        return next
      })
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlightedIndex((prev) => {
        let next = (prev - 1 + flatItems.length) % flatItems.length
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

  if (!open && !inline) return null

  let globalCounter = 0

  const paletteContent = (
    <div
      className={cn(
        "w-full max-w-xl overflow-hidden rounded-xl border border-border bg-card text-card-foreground flex flex-col",
        inline ? "shadow-md max-h-[460px]" : "shadow-2xl animate-in zoom-in-95 duration-150 max-h-[75vh]",
        className
      )}
      onKeyDown={handleKeyDown}
    >
        {/* Search Header */}
        <div className="flex items-center border-b border-border px-3.5 py-3 gap-2.5">
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
            aria-controls="palette-list"
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
              aria-label="Clear input"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex h-5 select-none items-center rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/60 bg-muted/20 overflow-x-auto text-xs">
          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "px-2 py-0.5 rounded text-[11px] font-medium transition-colors shrink-0",
              selectedCategory === null
                ? "bg-foreground text-background font-semibold"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
              className={cn(
                "px-2 py-0.5 rounded text-[11px] font-medium transition-colors shrink-0",
                selectedCategory === cat
                  ? "bg-foreground text-background font-semibold"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Command List */}
        <div
          ref={listRef}
          id="palette-list"
          role="listbox"
          className="flex-1 overflow-y-auto p-2 space-y-3"
        >
          {flatItems.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              {emptyMessage}
            </div>
          ) : (
            filteredGroups.map((group) => (
              <div key={group.category} className="space-y-1">
                <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
                  {group.category}
                </div>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const currentIndex = globalCounter++
                    const isActive = currentIndex === highlightedIndex

                    return (
                      <div
                        key={item.id}
                        role="option"
                        aria-selected={isActive}
                        data-active={isActive ? "true" : undefined}
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
                          isActive
                            ? "bg-accent text-accent-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground",
                          item.disabled && "opacity-40 cursor-not-allowed pointer-events-none"
                        )}
                      >
                        {item.icon && (
                          <span className="shrink-0 h-4 w-4 [&>svg]:h-4 [&>svg]:w-4 flex items-center justify-center">
                            {item.icon}
                          </span>
                        )}
                        <div className="flex-1 min-w-0 text-left">
                          <div className="truncate font-medium">{item.label}</div>
                          {item.description && (
                            <div className="truncate text-[11px] text-muted-foreground">
                              {item.description}
                            </div>
                          )}
                        </div>
                        {item.shortcut && (
                          <kbd className="ml-auto inline-flex items-center rounded border border-border/80 bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                            {item.shortcut}
                          </kbd>
                        )}
                        {isActive && !item.shortcut && (
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

        {/* Footer Navigation Hints */}
        <div className="border-t border-border px-3.5 py-2 bg-muted/30 text-[11px] text-muted-foreground flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>
              <kbd className="font-mono bg-muted px-1 rounded border border-border">↑</kbd>
              <kbd className="font-mono bg-muted px-1 rounded border border-border ml-1">↓</kbd> navigate
            </span>
            <span>
              <kbd className="font-mono bg-muted px-1.5 rounded border border-border">↵</kbd> select
            </span>
          </div>
          <span>{flatItems.length} command{flatItems.length === 1 ? "" : "s"}</span>
        </div>
      </div>
    )

    if (inline) {
      return paletteContent
    }

    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
        className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[10vh] sm:pt-[14vh] bg-black/60 backdrop-blur-xs animate-in fade-in-0"
        onClick={(e) => {
          if (e.target === e.currentTarget) onOpenChange(false)
        }}
      >
        {paletteContent}
      </div>
    )
}
