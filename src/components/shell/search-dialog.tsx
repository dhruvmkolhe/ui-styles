"use client";

/**
 * SearchDialog — Global application search.
 *
 * Searches across:
 *   - 25 design styles  (/style/:slug)
 *   - 85+ UI components (/components#:id)
 *   - Component Vault items (/component-vault)
 *   - App pages (Home, Explore, Components, Component Vault)
 *
 * Features:
 *   - ⌘K / Ctrl+K global shortcut (registered once, here)
 *   - Partial-match, case-insensitive, keyword-aware search
 *   - Inline text highlighting of matched fragments
 *   - Results grouped by category with counts
 *   - Keyboard navigation: ↑ ↓ Enter Escape
 *   - Clear-search action
 *   - Loading / empty / error states
 *   - Mobile-responsive layout
 *   - Accessible: role=dialog, combobox, listbox, aria-selected
 */

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  ArrowRight,
  X,
  Sparkles,
  SquareTerminal,
  Layers,
  FileText,
  LayoutGrid,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  SEARCH_INDEX,
  searchIndex,
  flatSearchResults,
  type SearchCategory,
  type SearchEntry,
} from "@/lib/search-index";
import { cn } from "@/lib/utils";

// ─── Category meta ────────────────────────────────────────────────────────────

const CATEGORY_ORDER: SearchCategory[] = ["Pages", "Styles", "Components"];

const CATEGORY_ICONS: Record<SearchCategory, React.ReactNode> = {
  Pages: <LayoutGrid className="h-3 w-3" />,
  Styles: <Sparkles className="h-3 w-3" />,
  Components: <SquareTerminal className="h-3 w-3" />,
};

// ─── Highlight helper ─────────────────────────────────────────────────────────

function Highlight({
  text,
  query,
  className,
}: {
  text: string;
  query: string;
  className?: string;
}) {
  if (!query.trim()) return <span className={className}>{text}</span>;

  const q = query.trim();
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return <span className={className}>{text}</span>;

  return (
    <span className={className}>
      {text.slice(0, idx)}
      <mark className="bg-teal-500/20 text-teal-700 dark:text-teal-300 rounded-sm font-semibold not-italic">
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </span>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();

  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [activeCategory, setActiveCategory] = React.useState<SearchCategory | "All">("All");

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const listRef = React.useRef<HTMLDivElement | null>(null);

  // ⌘K / Ctrl+K global shortcut
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  // Reset state when dialog opens
  React.useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setActiveCategory("All");
      // Small delay so the Dialog animation finishes and the input is mounted
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [open]);

  // ─── Search results ──────────────────────────────────────────────────────

  const grouped = React.useMemo(() => {
    const results = searchIndex(query, 8);

    // If category filter is active, keep only that category
    if (activeCategory !== "All") {
      for (const cat of Array.from(results.keys())) {
        if (cat !== activeCategory) results.delete(cat);
      }
    }
    return results;
  }, [query, activeCategory]);

  // Flat list in display order (for keyboard nav)
  const flatItems = React.useMemo<SearchEntry[]>(() => {
    const ordered: SearchEntry[] = [];
    for (const cat of CATEGORY_ORDER) {
      const entries = grouped.get(cat);
      if (entries) ordered.push(...entries);
    }
    return ordered;
  }, [grouped]);

  const totalResults = SEARCH_INDEX.length;

  // Keep selectedIndex in bounds when results change
  React.useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeCategory]);

  // Scroll active item into view
  React.useEffect(() => {
    if (listRef.current) {
      const el = listRef.current.querySelector("[data-selected='true']");
      if (el) el.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  // ─── Handlers ────────────────────────────────────────────────────────────

  const handleSelect = React.useCallback(
    (entry: SearchEntry) => {
      onOpenChange(false);
      setQuery("");
      router.push(entry.href);
    },
    [onOpenChange, router]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        flatItems.length === 0 ? 0 : (prev + 1) % flatItems.length
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        flatItems.length === 0
          ? 0
          : (prev - 1 + flatItems.length) % flatItems.length
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = flatItems[selectedIndex];
      if (item) handleSelect(item);
    }
    // Escape is handled by Dialog natively
  };

  const handleClear = () => {
    setQuery("");
    setSelectedIndex(0);
    inputRef.current?.focus();
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  const hasResults = flatItems.length > 0;
  const showEmpty = query.trim().length > 0 && !hasResults;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-xl p-0 gap-0 overflow-hidden border-border bg-card shadow-2xl"
        aria-label="Global search"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Search Chameleon UI</DialogTitle>
        </DialogHeader>

        {/* ── Search input ── */}
        <div className="flex items-center border-b border-border px-4 py-3 bg-card gap-3">
          <Search
            className="h-4 w-4 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            id="global-search-dialog-input"
            name="globalSearch"
            type="text"
            role="combobox"
            aria-label="Search styles, components, and pages"
            aria-autocomplete="list"
            aria-expanded={hasResults}
            aria-controls="search-results-list"
            aria-activedescendant={
              flatItems[selectedIndex]
                ? `search-item-${flatItems[selectedIndex].id}`
                : undefined
            }
            autoComplete="off"
            suppressHydrationWarning
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Search ${totalResults}+ items across styles and components…`}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground text-foreground min-w-0"
            autoFocus
          />
          {query && (
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

        {/* ── Category filter pills ── */}
        <div
          className="flex items-center gap-1.5 px-4 py-2 border-b border-border bg-muted/30 overflow-x-auto scrollbar-none"
          role="tablist"
          aria-label="Filter by category"
        >
          {(["All", ...CATEGORY_ORDER] as (SearchCategory | "All")[]).map(
            (cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedIndex(0);
                  inputRef.current?.focus();
                }}
                className={cn(
                  "shrink-0 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-colors",
                  activeCategory === cat
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {cat !== "All" && (
                  <span aria-hidden="true">{CATEGORY_ICONS[cat]}</span>
                )}
                {cat}
              </button>
            )
          )}
        </div>

        {/* ── Results ── */}
        <div
          ref={listRef}
          id="search-results-list"
          role="listbox"
          aria-label="Search results"
          className="max-h-[400px] overflow-y-auto p-3 space-y-4"
        >
          {/* Empty state */}
          {showEmpty && (
            <div className="py-10 text-center space-y-1.5">
              <p className="text-sm font-semibold text-foreground">
                No results for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-muted-foreground">
                Try searching for a component name or style
              </p>
            </div>
          )}

          {/* Default hint when no query */}
          {!query.trim() && (
            <p className="px-2 text-xs text-muted-foreground">
              Type to search across {totalResults}+ styles, components, and pages.
            </p>
          )}

          {/* Grouped results */}
          {CATEGORY_ORDER.map((cat) => {
            const entries = grouped.get(cat);
            if (!entries || entries.length === 0) return null;

            return (
              <div key={cat}>
                {/* Category heading */}
                <div className="flex items-center gap-1.5 px-2 pb-1.5">
                  <span className="text-teal-600 dark:text-teal-400" aria-hidden="true">
                    {CATEGORY_ICONS[cat]}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {cat}
                  </span>
                  <span className="ml-auto text-[10px] text-muted-foreground font-mono">
                    {entries.length}
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-0.5" role="group" aria-label={cat}>
                  {entries.map((entry) => {
                    const flatIdx = flatItems.indexOf(entry);
                    const isSelected = flatIdx === selectedIndex;

                    return (
                      <button
                        key={entry.id}
                        id={`search-item-${entry.id}`}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        data-selected={isSelected ? "true" : undefined}
                        onClick={() => handleSelect(entry)}
                        onMouseEnter={() => setSelectedIndex(flatIdx)}
                        className={cn(
                          "w-full group flex items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer",
                          isSelected
                            ? "bg-muted text-foreground ring-1 ring-teal-500/40"
                            : "hover:bg-muted/70 text-foreground"
                        )}
                      >
                        {/* Title + description */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Highlight
                              text={entry.title}
                              query={query}
                              className={cn(
                                "font-medium truncate block",
                                isSelected
                                  ? "text-teal-700 dark:text-teal-300"
                                  : "text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400"
                              )}
                            />
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
                          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                            <Highlight text={entry.description} query={query} />
                          </p>
                        </div>

                        {/* Arrow indicator */}
                        <ArrowRight
                          className={cn(
                            "h-3.5 w-3.5 shrink-0 transition-opacity text-muted-foreground",
                            isSelected
                              ? "opacity-100 text-teal-600 dark:text-teal-400"
                              : "opacity-0 group-hover:opacity-100"
                          )}
                          aria-hidden="true"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Footer ── */}
        <div className="border-t border-border px-4 py-2 bg-muted/40 flex items-center justify-between text-[11px] text-muted-foreground flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <kbd className="font-mono bg-muted px-1 py-px rounded border border-border">↑</kbd>
              <kbd className="font-mono bg-muted px-1 py-px rounded border border-border">↓</kbd>
              navigate
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="font-mono bg-muted px-1.5 py-px rounded border border-border">↵</kbd>
              select
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="font-mono bg-muted px-1 py-px rounded border border-border">esc</kbd>
              close
            </span>
          </div>
          <span className="font-mono text-[10px]">
            {flatItems.length > 0
              ? `${flatItems.length} result${flatItems.length === 1 ? "" : "s"}`
              : query
              ? "0 results"
              : `${totalResults} items indexed`}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
