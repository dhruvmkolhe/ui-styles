"use client"

/**
 * ApplicationSearch — Embeddable search widget component.
 *
 * An inline, self-contained search component that searches across all
 * registered application content (styles, components, vault items, pages).
 *
 * Features:
 *   - Real matches from the centralized SEARCH_INDEX
 *   - Partial-match, case-insensitive, relevance-sorted results
 *   - Text highlighting of matched fragments
 *   - Results grouped by category with icons and counts
 *   - Keyboard navigation: ↑ ↓ Enter Escape
 *   - Clear-search action button
 *   - Loading, empty, and idle states
 *   - onSelect callback for navigation or custom handling
 *   - Responsive and accessible (combobox + listbox roles)
 *   - All 25 design styles supported via CSS design tokens
 */

import * as React from "react"
import {
  Search,
  X,
  ArrowRight,
  Sparkles,
  SquareTerminal,
  Layers,
  LayoutGrid,
  Loader2,
  FileSearch,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  SEARCH_INDEX,
  searchIndex,
  type SearchCategory,
  type SearchEntry,
} from "@/lib/search-index"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ApplicationSearchProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** Called when the user selects a result. Receives the matched entry. */
  onSelect?: (entry: SearchEntry) => void
  /** If true, shows an indeterminate loading spinner instead of search results. */
  loading?: boolean
  /** If true, simulates an error state (data fetch failure, etc.). */
  error?: boolean | string
  /** Max results per category. Defaults to 6. */
  maxPerCategory?: number
  /** Placeholder text for the search input. */
  placeholder?: string
}

// ─── Category meta ────────────────────────────────────────────────────────────

const CATEGORY_ORDER: SearchCategory[] = ["Pages", "Styles", "Components"]

const CATEGORY_ICONS: Record<SearchCategory, React.ReactNode> = {
  Pages: <LayoutGrid className="h-3.5 w-3.5" />,
  Styles: <Sparkles className="h-3.5 w-3.5" />,
  Components: <SquareTerminal className="h-3.5 w-3.5" />,
}

const CATEGORY_DESCRIPTIONS: Record<SearchCategory, string> = {
  Pages: "Application routes",
  Styles: "Design aesthetics",
  Components: "UI components",
}

// ─── Highlight helper ─────────────────────────────────────────────────────────

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>
  const q = query.trim()
  const idx = text.toLowerCase().indexOf(q.toLowerCase())
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-primary/15 text-primary rounded-sm font-semibold not-italic">
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export const ApplicationSearch = React.forwardRef<
  HTMLDivElement,
  ApplicationSearchProps
>(
  (
    {
      onSelect,
      loading = false,
      error = false,
      maxPerCategory = 6,
      placeholder = "Search components, styles, pages…",
      className,
      ...props
    },
    ref
  ) => {
    const [query, setQuery] = React.useState("")
    const [activeCategory, setActiveCategory] = React.useState<SearchCategory | "All">("All")
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const [isFocused, setIsFocused] = React.useState(false)

    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const listRef = React.useRef<HTMLDivElement | null>(null)
    const listboxId = React.useId()

    const totalIndexed = SEARCH_INDEX.length

    // ─── Search results ────────────────────────────────────────────────────

    const grouped = React.useMemo(() => {
      const results = searchIndex(query, maxPerCategory)
      if (activeCategory !== "All") {
        for (const cat of Array.from(results.keys())) {
          if (cat !== activeCategory) results.delete(cat)
        }
      }
      return results
    }, [query, activeCategory, maxPerCategory])

    const flatItems = React.useMemo<SearchEntry[]>(() => {
      const ordered: SearchEntry[] = []
      for (const cat of CATEGORY_ORDER) {
        const entries = grouped.get(cat)
        if (entries) ordered.push(...entries)
      }
      return ordered
    }, [grouped])

    // Reset selectedIndex when results or category changes
    React.useEffect(() => {
      setSelectedIndex(0)
    }, [query, activeCategory])

    // Scroll selected item into view
    React.useEffect(() => {
      if (listRef.current) {
        const el = listRef.current.querySelector("[data-selected='true']")
        if (el) el.scrollIntoView({ block: "nearest" })
      }
    }, [selectedIndex])

    // ─── Handlers ──────────────────────────────────────────────────────────

    const handleClear = () => {
      setQuery("")
      setSelectedIndex(0)
      inputRef.current?.focus()
    }

    const handleSelectEntry = React.useCallback(
      (entry: SearchEntry) => {
        onSelect?.(entry)
        setSelectedIndex(flatItems.indexOf(entry))
      },
      [onSelect, flatItems]
    )

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) =>
          flatItems.length === 0 ? 0 : (prev + 1) % flatItems.length
        )
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) =>
          flatItems.length === 0
            ? 0
            : (prev - 1 + flatItems.length) % flatItems.length
        )
      } else if (e.key === "Enter") {
        e.preventDefault()
        const item = flatItems[selectedIndex]
        if (item) handleSelectEntry(item)
      } else if (e.key === "Escape") {
        if (query) {
          e.preventDefault()
          handleClear()
        }
      }
    }

    // ─── Derived states ────────────────────────────────────────────────────

    const hasResults = flatItems.length > 0
    const showEmpty = query.trim().length > 0 && !hasResults && !loading
    const errorMessage =
      typeof error === "string"
        ? error
        : error
        ? "Search is temporarily unavailable. Please try again."
        : null

    // ─── Render ────────────────────────────────────────────────────────────

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Application search"
        className={cn(
          "w-full rounded-xl border border-border bg-card shadow-sm overflow-hidden select-none",
          className
        )}
        {...props}
      >
        {/* ── Header ── */}
        <div className="border-b border-border/60 px-4 py-3 bg-muted/20 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-primary/10 text-primary">
              <Search className="h-3.5 w-3.5" />
            </span>
            <div>
              <h4 className="font-semibold text-foreground text-sm">
                Application Search
              </h4>
              <p className="text-[11px] text-muted-foreground">
                Search across {totalIndexed}+ items — styles, components &amp; pages
              </p>
            </div>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded border border-border bg-background font-mono text-[10px] text-muted-foreground">
            ⌘K
          </kbd>
        </div>

        {/* ── Search input ── */}
        <div
          className={cn(
            "flex items-center gap-3 px-4 py-3 border-b border-border transition-colors",
            isFocused && "ring-2 ring-inset ring-primary/30",
            error && "ring-2 ring-inset ring-destructive/40"
          )}
        >
          {loading ? (
            <Loader2
              className="h-4 w-4 shrink-0 text-primary animate-spin"
              aria-hidden="true"
            />
          ) : (
            <Search
              className="h-4 w-4 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
          )}
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-label="Search application content"
            aria-autocomplete="list"
            aria-expanded={hasResults && isFocused}
            aria-controls={listboxId}
            aria-activedescendant={
              flatItems[selectedIndex]
                ? `as-item-${flatItems[selectedIndex].id}`
                : undefined
            }
            aria-invalid={!!error}
            autoComplete="off"
            suppressHydrationWarning
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={loading || !!error}
            className={cn(
              "flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground text-foreground min-w-0 disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          />
          {query && !loading && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
              className="shrink-0 rounded p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* ── Error message ── */}
        {errorMessage && (
          <div className="px-4 py-2 text-xs text-destructive bg-destructive/5 border-b border-destructive/20">
            {errorMessage}
          </div>
        )}

        {/* ── Category filter pills ── */}
        {!error && (
          <div
            className="flex items-center gap-1.5 px-3 py-2 border-b border-border/60 bg-muted/10 overflow-x-auto scrollbar-none"
            role="tablist"
            aria-label="Filter by category"
          >
            {(["All", ...CATEGORY_ORDER] as (SearchCategory | "All")[]).map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => {
                  setActiveCategory(cat)
                  setSelectedIndex(0)
                  inputRef.current?.focus()
                }}
                className={cn(
                  "shrink-0 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all whitespace-nowrap",
                  activeCategory === cat
                    ? "bg-foreground text-background shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {cat !== "All" && (
                  <span aria-hidden="true">{CATEGORY_ICONS[cat]}</span>
                )}
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* ── Results panel ── */}
        <div
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-label="Search results"
          className="max-h-[340px] overflow-y-auto p-2.5 space-y-3"
        >
          {/* Loading state */}
          {loading && (
            <div className="py-10 text-center space-y-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin mx-auto text-primary" />
              <p className="text-xs">Searching…</p>
            </div>
          )}

          {/* Error state */}
          {errorMessage && !loading && (
            <div className="py-10 text-center space-y-2">
              <FileSearch className="h-8 w-8 mx-auto text-muted-foreground/50" />
              <p className="text-sm font-semibold text-foreground">Search unavailable</p>
              <p className="text-xs text-muted-foreground">{errorMessage}</p>
            </div>
          )}

          {/* Idle hint */}
          {!loading && !error && !query.trim() && (
            <div className="py-6 px-2 space-y-3">
              <p className="text-xs text-muted-foreground font-medium">
                Browse categories or type to search:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORY_ORDER.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setActiveCategory(cat)
                      inputRef.current?.focus()
                    }}
                    className="flex items-center gap-2 rounded-lg border border-border bg-background/60 px-3 py-2 text-left text-xs hover:bg-muted/60 hover:border-primary/30 transition-colors"
                  >
                    <span className="text-muted-foreground" aria-hidden="true">
                      {CATEGORY_ICONS[cat]}
                    </span>
                    <div className="min-w-0">
                      <div className="font-medium text-foreground">{cat}</div>
                      <div className="text-[10px] text-muted-foreground truncate">
                        {CATEGORY_DESCRIPTIONS[cat]}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {showEmpty && (
            <div className="py-10 text-center space-y-2">
              <FileSearch className="h-8 w-8 mx-auto text-muted-foreground/40" />
              <p className="text-sm font-semibold text-foreground">
                No results for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-muted-foreground">
                Try a component name, style, animation type, or keyword
              </p>
            </div>
          )}

          {/* Grouped results */}
          {!loading && !error && hasResults &&
            CATEGORY_ORDER.map((cat) => {
              const entries = grouped.get(cat)
              if (!entries || entries.length === 0) return null

              return (
                <div key={cat}>
                  {/* Category heading */}
                  <div className="flex items-center gap-1.5 px-2 pb-1">
                    <span className="text-primary/70" aria-hidden="true">
                      {CATEGORY_ICONS[cat]}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      {cat}
                    </span>
                    <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                      {entries.length}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="space-y-0.5" role="group" aria-label={cat}>
                    {entries.map((entry) => {
                      const flatIdx = flatItems.indexOf(entry)
                      const isSelected = flatIdx === selectedIndex

                      return (
                        <button
                          key={entry.id}
                          id={`as-item-${entry.id}`}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          data-selected={isSelected ? "true" : undefined}
                          onClick={() => handleSelectEntry(entry)}
                          onMouseEnter={() => setSelectedIndex(flatIdx)}
                          className={cn(
                            "w-full group flex items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer",
                            isSelected
                              ? "bg-primary/10 text-foreground ring-1 ring-primary/30"
                              : "hover:bg-muted/70 text-foreground"
                          )}
                        >
                          {/* Content */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className={cn(
                                  "text-sm font-medium truncate",
                                  isSelected ? "text-primary" : "text-foreground group-hover:text-primary"
                                )}
                              >
                                <Highlight text={entry.title} query={query} />
                              </span>
                              {entry.badge && (
                                <span
                                  className={cn(
                                    "shrink-0 text-[9px] uppercase font-bold px-1.5 py-px rounded border",
                                    entry.badge === "New"
                                      ? "text-violet-600 dark:text-violet-400 bg-violet-500/10 border-violet-500/20"
                                      : entry.badge === "Live"
                                      ? "text-teal-600 dark:text-teal-400 bg-teal-500/10 border-teal-500/20"
                                      : "text-muted-foreground bg-muted border-border"
                                  )}
                                >
                                  {entry.badge}
                                </span>
                              )}
                            </div>
                            <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                              <Highlight text={entry.description} query={query} />
                            </p>
                          </div>

                          {/* Arrow */}
                          <ArrowRight
                            className={cn(
                              "h-3.5 w-3.5 shrink-0 transition-opacity text-muted-foreground",
                              isSelected
                                ? "opacity-100 text-primary"
                                : "opacity-0 group-hover:opacity-100"
                            )}
                            aria-hidden="true"
                          />
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
        </div>

        {/* ── Footer ── */}
        <div className="border-t border-border px-4 py-2 bg-muted/30 flex items-center justify-between text-[11px] text-muted-foreground flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <kbd className="font-mono bg-background px-1 py-px rounded border border-border">↑</kbd>
              <kbd className="font-mono bg-background px-1 py-px rounded border border-border">↓</kbd>
              navigate
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="font-mono bg-background px-1.5 py-px rounded border border-border">↵</kbd>
              select
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="font-mono bg-background px-1 py-px rounded border border-border">esc</kbd>
              clear
            </span>
          </div>
          <span className="font-mono text-[10px]">
            {hasResults
              ? `${flatItems.length} result${flatItems.length === 1 ? "" : "s"}`
              : query
              ? "0 results"
              : `${totalIndexed} indexed`}
          </span>
        </div>
      </div>
    )
  }
)

ApplicationSearch.displayName = "ApplicationSearch"
