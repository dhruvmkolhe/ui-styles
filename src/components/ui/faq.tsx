"use client"

import * as React from "react"
import { ChevronDown, Search, HelpCircle, MessageCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface FaqItem {
  id: string
  question: string
  answer: React.ReactNode
  category?: string
}

export interface FaqProps extends React.HTMLAttributes<HTMLDivElement> {
  items: FaqItem[]
  title?: string
  subtitle?: string
  categories?: string[]
  searchable?: boolean
  searchPlaceholder?: string
  allowMultiple?: boolean
  defaultOpenId?: string | string[]
  supportCta?: {
    text: string
    actionText: string
    onAction?: () => void
    href?: string
  }
  variant?: "bordered" | "separated" | "cards" | "minimal"
  itemClassName?: string
}

export function Faq({
  items,
  title,
  subtitle,
  categories,
  searchable = true,
  searchPlaceholder = "Search questions...",
  allowMultiple = false,
  defaultOpenId,
  supportCta,
  variant = "separated",
  className,
  itemClassName,
  ...props
}: FaqProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All")

  const initialOpen = React.useMemo(() => {
    if (!defaultOpenId) return new Set<string>()
    if (Array.isArray(defaultOpenId)) return new Set(defaultOpenId)
    return new Set([defaultOpenId])
  }, [defaultOpenId])

  const [openItems, setOpenItems] = React.useState<Set<string>>(initialOpen)

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        if (!allowMultiple) {
          next.clear()
        }
        next.add(id)
      }
      return next
    })
  }

  // Derive categories if not explicitly provided
  const resolvedCategories = React.useMemo(() => {
    if (categories && categories.length > 0) {
      return ["All", ...categories]
    }
    const itemCats = Array.from(
      new Set(items.map((i) => i.category).filter(Boolean) as string[])
    )
    return itemCats.length > 0 ? ["All", ...itemCats] : []
  }, [categories, items])

  // Filter items
  const filteredItems = React.useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || !item.category || item.category === selectedCategory
      const query = searchQuery.toLowerCase().trim()
      const matchesQuery =
        !query ||
        item.question.toLowerCase().includes(query) ||
        (typeof item.answer === "string" && item.answer.toLowerCase().includes(query))
      return matchesCategory && matchesQuery
    })
  }, [items, selectedCategory, searchQuery])

  return (
    <div className={cn("w-full space-y-6", className)} {...props}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          {title && (
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Search and Category Filter Controls */}
      {(searchable || resolvedCategories.length > 0) && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {resolvedCategories.length > 1 && (
            <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
              {resolvedCategories.map((cat) => {
                const isActive = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          )}

          {searchable && (
            <div className="relative w-full sm:w-64 shrink-0">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full h-8 pl-8 pr-7 text-xs rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary/40 transition-colors text-foreground placeholder:text-muted-foreground"
              />
              {searchQuery && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 rounded cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* FAQ Items Accordion */}
      <div
        className={cn(
          "w-full",
          variant === "bordered" && "border border-border rounded-xl divide-y divide-border overflow-hidden bg-card",
          variant === "separated" && "space-y-2.5",
          variant === "cards" && "grid gap-3 sm:grid-cols-2",
          variant === "minimal" && "divide-y divide-border/60"
        )}
      >
        {filteredItems.map((item) => {
          const isOpen = openItems.has(item.id)
          const buttonId = `faq-btn-${item.id}`
          const panelId = `faq-panel-${item.id}`

          return (
            <div
              key={item.id}
              className={cn(
                "transition-all duration-200",
                variant === "separated" &&
                  "rounded-xl border border-border bg-card shadow-2xs hover:border-border/90",
                variant === "cards" &&
                  "rounded-xl border border-border bg-card p-4 space-y-2 flex flex-col justify-start",
                itemClassName
              )}
            >
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(item.id)}
                className={cn(
                  "w-full flex items-center justify-between text-left gap-4 py-3.5 px-4 rounded-xl transition-colors cursor-pointer group",
                  variant === "bordered" && "rounded-none px-4 py-3.5",
                  variant === "minimal" && "px-1 py-3"
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.question}
                  </span>
                  {item.category && selectedCategory === "All" && (
                    <span className="hidden md:inline-flex px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-muted/60 text-muted-foreground shrink-0 border border-border/40">
                      {item.category}
                    </span>
                  )}
                </div>
                <div
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border/60 bg-muted/40 text-muted-foreground group-hover:text-foreground group-hover:border-primary/40 transition-transform duration-200",
                    isOpen && "rotate-180 bg-primary/10 text-primary border-primary/20"
                  )}
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                </div>
              </button>

              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={cn(
                    "px-4 pb-4 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed animate-in fade-in-0 duration-150",
                    variant === "minimal" && "px-1"
                  )}
                >
                  {item.answer}
                </div>
              )}
            </div>
          )
        })}

        {filteredItems.length === 0 && (
          <div className="py-10 text-center rounded-xl border border-dashed border-border p-6 bg-card/40 space-y-2">
            <HelpCircle className="h-6 w-6 text-muted-foreground/60 mx-auto" />
            <p className="text-xs sm:text-sm font-medium text-foreground">
              No matching questions found
            </p>
            <p className="text-xs text-muted-foreground">
              Try adjusting your search query or switching categories.
            </p>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="inline-flex text-xs font-semibold text-primary hover:underline pt-1 cursor-pointer"
              >
                Clear search query
              </button>
            )}
          </div>
        )}
      </div>

      {/* Optional Support CTA */}
      {supportCta && (
        <div className="rounded-xl border border-border/70 bg-muted/30 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary shadow-2xs">
              <MessageCircle className="h-4 w-4" />
            </div>
            <p className="text-xs text-muted-foreground">
              {supportCta.text}
            </p>
          </div>
          {supportCta.href ? (
            <a
              href={supportCta.href}
              className="inline-flex items-center justify-center h-8 px-3 rounded-lg bg-primary text-primary-foreground text-xs font-semibold shadow-xs hover:bg-primary/90 transition-colors shrink-0"
            >
              {supportCta.actionText}
            </a>
          ) : (
            <button
              type="button"
              onClick={supportCta.onAction}
              className="inline-flex items-center justify-center h-8 px-3 rounded-lg bg-primary text-primary-foreground text-xs font-semibold shadow-xs hover:bg-primary/90 transition-colors shrink-0 cursor-pointer"
            >
              {supportCta.actionText}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
