"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode
  leading?: React.ReactNode
  trailing?: React.ReactNode
  selected?: boolean
  disabled?: boolean
  removable?: boolean
  onRemove?: (e: React.MouseEvent<HTMLButtonElement>) => void
  variant?: "default" | "outline" | "secondary" | "accent"
  size?: "sm" | "md" | "lg"
}

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      className,
      label,
      children,
      leading,
      trailing,
      selected = false,
      disabled = false,
      removable = false,
      onRemove,
      variant = "default",
      size = "md",
      onClick,
      ...props
    },
    ref
  ) => {
    const isInteractive = !!onClick
    const showRemove = removable || !!onRemove

    return (
      <div
        ref={ref}
        role={isInteractive ? "button" : undefined}
        tabIndex={isInteractive && !disabled ? 0 : undefined}
        aria-selected={selected ? true : undefined}
        aria-disabled={disabled ? true : undefined}
        onClick={disabled ? undefined : onClick}
        onKeyDown={(e) => {
          if (isInteractive && !disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault()
            onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>)
          }
        }}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full font-medium transition-colors select-none",
          // Sizing
          size === "sm" && "h-6 px-2.5 text-xs",
          size === "md" && "h-7 px-3 text-xs",
          size === "lg" && "h-8 px-3.5 text-sm",
          // Variants
          variant === "default" && "bg-muted text-foreground border border-border/60 hover:bg-muted/80",
          variant === "outline" && "bg-transparent text-foreground border border-border hover:bg-muted/50",
          variant === "secondary" && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          variant === "accent" && "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20",
          // Selected
          selected && "bg-primary text-primary-foreground border-primary hover:bg-primary/90",
          // Interactive / Disabled
          isInteractive && !disabled && "cursor-pointer active:scale-95",
          disabled && "opacity-50 pointer-events-none cursor-not-allowed",
          className
        )}
        {...props}
      >
        {leading && <span className="shrink-0 -ml-0.5 flex items-center">{leading}</span>}
        <span className="truncate">{label ?? children}</span>
        {trailing && <span className="shrink-0 flex items-center">{trailing}</span>}
        {showRemove && (
          <button
            type="button"
            aria-label="Remove"
            disabled={disabled}
            onClick={(e) => {
              e.stopPropagation()
              onRemove?.(e)
            }}
            className={cn(
              "shrink-0 -mr-1 ml-0.5 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/20 transition-colors focus:outline-none focus:ring-1 focus:ring-current",
              disabled && "cursor-not-allowed"
            )}
          >
            <X className="h-3 w-3 stroke-[2.5]" />
          </button>
        )}
      </div>
    )
  }
)
Chip.displayName = "Chip"
