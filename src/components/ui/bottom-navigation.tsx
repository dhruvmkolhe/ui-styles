"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface BottomNavItem {
  id: string
  label: string
  icon: React.ReactNode
  badge?: string | number
  disabled?: boolean
}

export interface BottomNavigationProps extends React.HTMLAttributes<HTMLElement> {
  items: BottomNavItem[]
  value: string
  onValueChange: (value: string) => void
  fixed?: boolean
  showLabels?: boolean
  className?: string
}

export const BottomNavigation = React.forwardRef<HTMLElement, BottomNavigationProps>(
  (
    {
      items,
      value,
      onValueChange,
      fixed = false,
      showLabels = true,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <nav
        ref={ref}
        aria-label="Bottom Navigation"
        className={cn(
          "w-full border-t border-border bg-card/95 backdrop-blur-md px-2 py-1 select-none z-40 transition-colors",
          fixed && "fixed bottom-0 left-0 right-0 pb-[env(safe-area-inset-bottom,0px)] shadow-lg",
          className
        )}
        {...props}
      >
        <ul className="flex items-center justify-around gap-1 max-w-lg mx-auto">
          {items.map((item) => {
            const isActive = item.id === value
            const isDisabled = item.disabled

            return (
              <li key={item.id} className="flex-1 list-none">
                <button
                  type="button"
                  disabled={isDisabled}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => !isDisabled && onValueChange(item.id)}
                  className={cn(
                    "group relative flex w-full flex-col items-center justify-center gap-1 rounded-lg py-1.5 px-2 text-xs transition-all outline-none",
                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                    isActive
                      ? "text-teal-600 dark:text-teal-400 font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
                    isDisabled && "opacity-40 cursor-not-allowed pointer-events-none"
                  )}
                >
                  {/* Icon with optional badge */}
                  <div className="relative flex items-center justify-center">
                    <span
                      className={cn(
                        "h-5 w-5 [&>svg]:h-5 [&>svg]:w-5 transition-transform duration-200",
                        isActive && "scale-110"
                      )}
                    >
                      {item.icon}
                    </span>
                    {item.badge !== undefined && (
                      <span className="absolute -top-1.5 -right-2.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white shadow-xs">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  {showLabels && (
                    <span
                      className={cn(
                        "truncate max-w-[64px] text-[11px] leading-tight transition-colors",
                        isActive ? "font-bold" : "font-normal"
                      )}
                    >
                      {item.label}
                    </span>
                  )}

                  {/* Active bottom indicator pill */}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 h-0.5 w-6 rounded-full bg-teal-600 dark:bg-teal-400"
                    />
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }
)
BottomNavigation.displayName = "BottomNavigation"
