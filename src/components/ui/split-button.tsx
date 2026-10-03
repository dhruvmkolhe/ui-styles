"use client"

import * as React from "react"
import { ChevronDown, Loader2 } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const splitButtonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 select-none relative",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-border bg-card text-foreground hover:bg-muted",
        ghost: "hover:bg-muted text-foreground",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        sm: "h-8 text-xs",
        default: "h-9 text-sm",
        lg: "h-10 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface SplitButtonOption {
  id: string
  label: React.ReactNode
  icon?: React.ReactNode
  description?: string
  shortcut?: string
  disabled?: boolean
  destructive?: boolean
  onClick?: () => void
}

export interface SplitButtonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof splitButtonVariants> {
  label: React.ReactNode
  icon?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  options: SplitButtonOption[]
  menuAlign?: "start" | "end"
  dropdownAriaLabel?: string
}

export const SplitButton = React.forwardRef<HTMLDivElement, SplitButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      label,
      icon,
      onClick,
      disabled = false,
      loading = false,
      options = [],
      menuAlign = "end",
      dropdownAriaLabel = "Additional actions",
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [focusedIndex, setFocusedIndex] = React.useState<number>(-1)
    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const menuRef = React.useRef<HTMLDivElement | null>(null)
    const triggerRef = React.useRef<HTMLButtonElement | null>(null)

    // Close menu when clicking outside
    React.useEffect(() => {
      if (!isOpen) return
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false)
          setFocusedIndex(-1)
        }
      }
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isOpen])

    // Keyboard navigation within the dropdown
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          setIsOpen(true)
          setFocusedIndex(0)
        }
        return
      }

      if (e.key === "Escape") {
        e.preventDefault()
        setIsOpen(false)
        setFocusedIndex(-1)
        triggerRef.current?.focus()
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        setFocusedIndex((prev) => {
          let next = prev + 1
          while (next < options.length && options[next].disabled) {
            next++
          }
          return next < options.length ? next : prev
        })
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setFocusedIndex((prev) => {
          let next = prev - 1
          while (next >= 0 && options[next].disabled) {
            next--
          }
          return next >= 0 ? next : prev
        })
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        if (focusedIndex >= 0 && focusedIndex < options.length) {
          const opt = options[focusedIndex]
          if (!opt.disabled) {
            opt.onClick?.()
            setIsOpen(false)
            setFocusedIndex(-1)
            triggerRef.current?.focus()
          }
        }
      }
    }

    const mainPadding =
      size === "sm" ? "px-3" : size === "lg" ? "px-5" : "px-4"
    const caretPadding =
      size === "sm" ? "px-2" : size === "lg" ? "px-3" : "px-2.5"

    return (
      <div
        ref={(node) => {
          containerRef.current = node
          if (typeof ref === "function") ref(node)
          else if (ref) (ref as any).current = node
        }}
        className={cn("inline-flex items-center isolate relative", className)}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {/* Main Action Button */}
        <button
          type="button"
          disabled={disabled || loading}
          onClick={onClick}
          className={cn(
            splitButtonVariants({ variant, size }),
            "rounded-l-md rounded-r-none z-10 hover:z-20 focus-visible:z-30",
            mainPadding
          )}
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin shrink-0" />
          ) : (
            icon && <span className="mr-2 shrink-0">{icon}</span>
          )}
          <span>{label}</span>
        </button>

        {/* Divider line / shared border */}
        <div
          className={cn(
            "w-[1px] h-full self-stretch z-20",
            variant === "outline" ? "bg-border" : "bg-black/15 dark:bg-white/20"
          )}
        />

        {/* Dropdown Menu Trigger Button */}
        <button
          ref={triggerRef}
          type="button"
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-label={dropdownAriaLabel}
          disabled={disabled || loading}
          onClick={() => {
            setIsOpen((prev) => !prev)
            setFocusedIndex(0)
          }}
          className={cn(
            splitButtonVariants({ variant, size }),
            "rounded-r-md rounded-l-none -ml-px z-10 hover:z-20 focus-visible:z-30",
            caretPadding
          )}
        >
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {/* Dropdown Menu Popover */}
        {isOpen && options.length > 0 && (
          <div
            ref={menuRef}
            role="menu"
            aria-orientation="vertical"
            className={cn(
              "absolute top-full mt-1.5 z-50 min-w-[13rem] rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg animate-in fade-in-50 zoom-in-95",
              menuAlign === "end" ? "right-0" : "left-0"
            )}
          >
            {options.map((option, idx) => {
              const isSelected = focusedIndex === idx
              return (
                <button
                  key={option.id}
                  role="menuitem"
                  type="button"
                  disabled={option.disabled}
                  onClick={() => {
                    option.onClick?.()
                    setIsOpen(false)
                    setFocusedIndex(-1)
                    triggerRef.current?.focus()
                  }}
                  onMouseEnter={() => !option.disabled && setFocusedIndex(idx)}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-sm px-2.5 py-1.5 text-xs text-left transition-colors select-none",
                    option.disabled
                      ? "opacity-50 pointer-events-none"
                      : isSelected
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent/60",
                    option.destructive && "text-destructive hover:bg-destructive/10"
                  )}
                >
                  <div className="flex items-center gap-2 truncate">
                    {option.icon && (
                      <span className="shrink-0 text-muted-foreground">{option.icon}</span>
                    )}
                    <div className="truncate">
                      <div className="font-medium truncate">{option.label}</div>
                      {option.description && (
                        <div className="text-[10px] text-muted-foreground truncate">
                          {option.description}
                        </div>
                      )}
                    </div>
                  </div>
                  {option.shortcut && (
                    <kbd className="ml-2 font-mono text-[10px] text-muted-foreground uppercase shrink-0">
                      {option.shortcut}
                    </kbd>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>
    )
  }
)
SplitButton.displayName = "SplitButton"
