"use client"

import * as React from "react"
import {
  Search,
  Command,
  ArrowUp,
  ArrowDown,
  CornerDownLeft,
  X,
  FileText,
  Layout,
  Sliders,
  Sparkles,
  ExternalLink,
  Code,
  Shield,
  Layers,
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface SpotlightItem {
  id: string
  title: string
  category: "pages" | "components" | "actions" | "docs"
  description: string
  shortcut?: string
  href?: string
  icon?: React.ReactNode
}

export interface SpotlightSearchProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  items?: SpotlightItem[]
  isOpen?: boolean
  onSelect?: (item: SpotlightItem) => void
  onClose?: () => void
}

const DEFAULT_SPOTLIGHT_ITEMS: SpotlightItem[] = [
  {
    id: "nav-explore",
    title: "Explore Aesthetics",
    category: "pages",
    description: "Inspect live design presets including Japandi, Brutalist, and Glassmorphism",
    shortcut: "G E",
    href: "/explore",
    icon: <Sparkles className="h-4 w-4" />,
  },
  {
    id: "comp-treemap",
    title: "Treemap Visualizer",
    category: "components",
    description: "Hierarchical squarified storage and proportion layout",
    shortcut: "C 155",
    icon: <Layers className="h-4 w-4" />,
  },
  {
    id: "comp-sankey",
    title: "Sankey Flow Diagram",
    category: "components",
    description: "Directional weighted flow ribbons across funnel stages",
    shortcut: "C 156",
    icon: <Code className="h-4 w-4" />,
  },
  {
    id: "comp-network",
    title: "Network Topology Graph",
    category: "components",
    description: "Interactive node drag-and-drop with zoom, pan, and inspector",
    shortcut: "C 157",
    icon: <Sliders className="h-4 w-4" />,
  },
  {
    id: "act-dark-mode",
    title: "Toggle Dark Mode",
    category: "actions",
    description: "Switch system color appearance between light and dark themes",
    shortcut: "⌘ D",
    icon: <Sparkles className="h-4 w-4" />,
  },
  {
    id: "act-export-tokens",
    title: "Export Design Tokens",
    category: "actions",
    description: "Generate and download JSON tokens and Tailwind configuration",
    shortcut: "⌘ ⇧ E",
    icon: <ExternalLink className="h-4 w-4" />,
  },
  {
    id: "doc-rbac",
    title: "RBAC Security Guide",
    category: "docs",
    description: "Permission matrices, role assignments, and client-side simulation guardrails",
    shortcut: "D 161",
    icon: <Shield className="h-4 w-4" />,
  },
  {
    id: "doc-getting-started",
    title: "Getting Started Documentation",
    category: "docs",
    description: "Quick setup instructions for Next.js App Router and Tailwind CSS v4",
    shortcut: "D 01",
    icon: <FileText className="h-4 w-4" />,
  },
]

export const SpotlightSearch = React.forwardRef<HTMLDivElement, SpotlightSearchProps>(
  (
    {
      items = DEFAULT_SPOTLIGHT_ITEMS,
      isOpen = true,
      onSelect,
      onClose,
      className,
      ...props
    },
    ref
  ) => {
    const [query, setQuery] = React.useState("")
    const [selectedCategory, setSelectedCategory] = React.useState<string>("all")
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const [active, setActive] = React.useState(isOpen)
    const [selectedActionMessage, setSelectedActionMessage] = React.useState<string | null>(null)

    const inputRef = React.useRef<HTMLInputElement | null>(null)

    // Filter items
    const filteredItems = React.useMemo(() => {
      return items.filter((item) => {
        const matchesCategory =
          selectedCategory === "all" || item.category === selectedCategory
        const matchesQuery =
          query.trim() === "" ||
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
        return matchesCategory && matchesQuery
      })
    }, [items, selectedCategory, query])

    // Keyboard navigation within list
    React.useEffect(() => {
      setSelectedIndex(0)
    }, [query, selectedCategory])

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length))
      } else if (e.key === "Enter") {
        e.preventDefault()
        const selected = filteredItems[selectedIndex]
        if (selected) {
          handleTriggerItem(selected)
        }
      } else if (e.key === "Escape") {
        setActive(false)
        onClose?.()
      }
    }

    const handleTriggerItem = (item: SpotlightItem) => {
      setSelectedActionMessage(`Selected: "${item.title}" (${item.category.toUpperCase()})`)
      onSelect?.(item)
    }

    const activeItem = filteredItems[selectedIndex] || null

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Spotlight Search & Navigation"
        className={cn(
          "w-full rounded-xl border border-border bg-card shadow-2xs p-4 space-y-3 select-none",
          className
        )}
        {...props}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-border/60 pb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-primary/10 text-primary">
              <Command className="h-4 w-4" />
            </span>
            <div>
              <h4 className="font-semibold text-foreground">Spotlight Global Command Search</h4>
              <p className="text-[11px] text-muted-foreground">
                Fuzzy search across routes, components, actions, and documentation with ⌘K
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <kbd className="px-2 py-0.5 rounded border border-border bg-muted font-mono text-[10px] text-muted-foreground font-semibold">
              ⌘ K
            </kbd>
          </div>
        </div>

        {/* Selected Action Banner */}
        {selectedActionMessage && (
          <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300 font-mono flex items-center justify-between">
            <span>{selectedActionMessage}</span>
            <button
              type="button"
              onClick={() => setSelectedActionMessage(null)}
              className="text-emerald-700 hover:text-emerald-900 dark:text-emerald-300 text-xs"
            >
              ✕
            </button>
          </div>
        )}

        {/* Search Modal Container */}
        <div className="rounded-xl border border-border bg-popover shadow-xl overflow-hidden">
          {/* Input Row */}
          <div className="flex items-center gap-2.5 px-3.5 py-3 border-b border-border">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search components, commands, pages, or guides..."
              className="flex-1 bg-transparent text-sm text-foreground outline-hidden placeholder:text-muted-foreground"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="p-1 rounded text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-muted/30 border-b border-border text-xs overflow-x-auto">
            {["all", "pages", "components", "actions", "docs"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-2.5 py-1 rounded-md text-[11px] font-semibold capitalize transition-colors",
                  selectedCategory === cat
                    ? "bg-foreground text-background shadow-2xs"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results List & Preview Panel */}
          <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-border min-h-[260px]">
            {/* List */}
            <div className="md:col-span-3 max-h-72 overflow-y-auto p-1.5 space-y-0.5">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-xs text-muted-foreground space-y-1">
                  <p className="font-semibold text-foreground">No matching items found</p>
                  <p>Try searching for &quot;Treemap&quot;, &quot;Tokens&quot;, or &quot;Dark Mode&quot;</p>
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const isSelected = index === selectedIndex
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleTriggerItem(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={cn(
                        "flex items-center justify-between px-3 py-2 rounded-lg text-xs cursor-pointer transition-colors",
                        isSelected
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "hover:bg-muted text-foreground"
                      )}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className={cn(isSelected ? "text-primary-foreground" : "text-muted-foreground")}>
                          {item.icon}
                        </span>
                        <div className="truncate">
                          <span className="block truncate">{item.title}</span>
                          <span
                            className={cn(
                              "text-[10px] block truncate font-normal",
                              isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                            )}
                          >
                            {item.description}
                          </span>
                        </div>
                      </div>

                      {item.shortcut && (
                        <kbd
                          className={cn(
                            "px-1.5 py-0.5 rounded font-mono text-[9px] shrink-0 ml-2",
                            isSelected
                              ? "bg-primary-foreground/20 text-primary-foreground"
                              : "border border-border bg-muted/60 text-muted-foreground"
                          )}
                        >
                          {item.shortcut}
                        </kbd>
                      )}
                    </div>
                  )
                })
              )}
            </div>

            {/* Item Preview Pane */}
            <div className="md:col-span-2 p-3.5 bg-muted/10 space-y-3 text-xs">
              <span className="font-mono text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                Quick Inspector
              </span>

              {activeItem ? (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-primary/10 text-primary">
                      {activeItem.icon}
                    </span>
                    <div>
                      <h5 className="font-semibold text-foreground text-xs leading-tight">
                        {activeItem.title}
                      </h5>
                      <span className="text-[10px] font-mono uppercase text-muted-foreground">
                        {activeItem.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {activeItem.description}
                  </p>

                  <div className="pt-2 border-t border-border/60 space-y-1.5 text-[11px]">
                    {activeItem.href && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Path:</span>
                        <span className="font-mono text-primary truncate max-w-[120px]">
                          {activeItem.href}
                        </span>
                      </div>
                    )}
                    {activeItem.shortcut && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shortcut:</span>
                        <kbd className="font-mono text-foreground font-semibold">
                          {activeItem.shortcut}
                        </kbd>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleTriggerItem(activeItem)}
                    className="w-full mt-3 py-1.5 px-3 rounded-md bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors shadow-2xs"
                  >
                    Execute Command (↵)
                  </button>
                </div>
              ) : (
                <div className="text-xs text-muted-foreground py-8 text-center">
                  Use arrow keys or cursor to inspect details
                </div>
              )}
            </div>
          </div>

          {/* Keyboard Helper Footer */}
          <div className="px-3.5 py-2 bg-muted/40 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <ArrowUp className="h-3 w-3" />
                <ArrowDown className="h-3 w-3" /> Navigate
              </span>
              <span className="inline-flex items-center gap-1">
                <CornerDownLeft className="h-3 w-3" /> Select
              </span>
              <span className="inline-flex items-center gap-1">
                <kbd className="font-mono text-[9px] border px-1 rounded">esc</kbd> Dismiss
              </span>
            </div>
            <span className="font-mono text-[10px]">
              {filteredItems.length} of {items.length} items
            </span>
          </div>
        </div>
      </div>
    )
  }
)

SpotlightSearch.displayName = "SpotlightSearch"
