"use client"

import * as React from "react"
import { ChevronDown, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface MegaMenuColumnItem {
  title: string
  description?: string
  href: string
  icon?: React.ReactNode
  badge?: string
}

export interface MegaMenuColumn {
  heading: string
  items: MegaMenuColumnItem[]
}

export interface MegaMenuFeatured {
  title: string
  description: string
  ctaText: string
  href: string
  tag?: string
}

export interface MegaMenuProps {
  label: string
  columns: MegaMenuColumn[]
  featured?: MegaMenuFeatured
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

export function MegaMenu({
  label,
  columns,
  featured,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  className,
}: MegaMenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen

  const containerRef = React.useRef<HTMLDivElement | null>(null)

  const setOpen = React.useCallback(
    (newOpen: boolean) => {
      if (!isControlled) setUncontrolledOpen(newOpen)
      onOpenChange?.(newOpen)
    },
    [isControlled, onOpenChange]
  )

  React.useEffect(() => {
    if (!isOpen) return

    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleOutside)
    document.addEventListener("keydown", handleEsc)
    return () => {
      document.removeEventListener("mousedown", handleOutside)
      document.removeEventListener("keydown", handleEsc)
    }
  }, [isOpen, setOpen])

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      {/* Trigger Button */}
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setOpen(!isOpen)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold transition-colors outline-none",
          "hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          isOpen && "bg-accent text-accent-foreground"
        )}
      >
        <span>{label}</span>
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform duration-200", isOpen && "rotate-180")}
        />
      </button>

      {/* Flyout Multi-Column Panel */}
      {isOpen && (
        <div
          role="region"
          aria-label={`${label} navigation`}
          className={cn(
            "absolute left-0 top-full mt-2 w-[92vw] max-w-4xl rounded-2xl border border-border bg-popover p-6 text-popover-foreground shadow-2xl z-50",
            "animate-in fade-in-0 zoom-in-95"
          )}
        >
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* Columns */}
            {columns.map((col) => (
              <div key={col.heading} className="space-y-3">
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 border-b border-border/60 pb-1.5">
                  {col.heading}
                </div>
                <div className="space-y-1">
                  {col.items.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-start gap-2.5 rounded-lg p-2 transition-colors hover:bg-accent/60 outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      {item.icon && (
                        <span className="shrink-0 h-4 w-4 mt-0.5 text-muted-foreground group-hover:text-foreground">
                          {item.icon}
                        </span>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 truncate">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="rounded bg-teal-500/10 px-1.5 py-0.2 text-[9px] font-mono font-bold text-teal-600 dark:text-teal-400">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5 leading-snug">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}

            {/* Optional Featured Card */}
            {featured && (
              <div className="rounded-xl border border-border bg-muted/40 p-4 flex flex-col justify-between">
                <div className="space-y-2">
                  {featured.tag && (
                    <span className="inline-block rounded-md bg-teal-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">
                      {featured.tag}
                    </span>
                  )}
                  <h4 className="text-xs font-bold text-foreground">{featured.title}</h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {featured.description}
                  </p>
                </div>
                <a
                  href={featured.href}
                  onClick={() => setOpen(false)}
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
                >
                  <span>{featured.ctaText}</span>
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
