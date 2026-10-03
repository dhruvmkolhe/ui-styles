"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const commandButtonGroupVariants = cva(
  "inline-flex items-center",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col items-stretch",
      },
      attached: {
        true: "",
        false: "gap-1.5",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      attached: true,
    },
  }
)

const commandButtonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 relative select-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-border bg-card text-foreground hover:bg-muted",
        ghost: "hover:bg-muted text-foreground",
      },
      size: {
        sm: "h-8 px-2.5 text-xs gap-1.5",
        default: "h-9 px-3.5 text-sm gap-2",
        lg: "h-10 px-4 text-base gap-2.5",
      },
      attached: {
        true: "",
        false: "rounded-md",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
      attached: true,
    },
  }
)

export interface CommandItem {
  id: string
  label: React.ReactNode
  icon?: React.ReactNode
  shortcut?: string
  description?: string
  disabled?: boolean
  loading?: boolean
  variant?: "default" | "secondary" | "outline" | "ghost"
  onClick?: () => void
  active?: boolean
}

export interface CommandButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof commandButtonGroupVariants> {
  items?: CommandItem[]
  size?: "sm" | "default" | "lg"
  variant?: "default" | "secondary" | "outline" | "ghost"
  attached?: boolean
}

export const CommandButtonGroup = React.forwardRef<HTMLDivElement, CommandButtonGroupProps>(
  (
    {
      className,
      orientation = "horizontal",
      attached = true,
      size = "default",
      variant = "outline",
      items,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          commandButtonGroupVariants({ orientation, attached }),
          attached && "isolate",
          className
        )}
        {...props}
      >
        {items
          ? items.map((item, index) => {
              const isFirst = index === 0
              const isLast = index === items.length - 1
              const itemVariant = item.variant || variant

              let roundedClasses = ""
              let marginClasses = ""

              if (attached) {
                if (orientation === "horizontal") {
                  roundedClasses = isFirst
                    ? "rounded-l-md rounded-r-none"
                    : isLast
                    ? "rounded-r-md rounded-l-none"
                    : "rounded-none"
                  marginClasses = !isFirst ? "-ml-px" : ""
                } else {
                  roundedClasses = isFirst
                    ? "rounded-t-md rounded-b-none"
                    : isLast
                    ? "rounded-b-md rounded-t-none"
                    : "rounded-none"
                  marginClasses = !isFirst ? "-mt-px" : ""
                }
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  disabled={item.disabled || item.loading}
                  onClick={item.onClick}
                  title={item.description}
                  aria-label={typeof item.label === "string" ? item.label : undefined}
                  className={cn(
                    commandButtonVariants({
                      variant: itemVariant,
                      size,
                      attached,
                    }),
                    roundedClasses,
                    marginClasses,
                    attached && "hover:z-10 focus-visible:z-20",
                    item.active && "bg-accent text-accent-foreground font-semibold"
                  )}
                >
                  {item.loading ? (
                    <Loader2 className="h-4 w-4 animate-spin shrink-0" />
                  ) : (
                    item.icon && <span className="shrink-0">{item.icon}</span>
                  )}
                  <span>{item.label}</span>
                  {item.shortcut && (
                    <kbd className="ml-1.5 hidden sm:inline-flex h-4 items-center rounded border border-border/60 bg-muted/70 px-1 font-mono text-[10px] text-muted-foreground uppercase">
                      {item.shortcut}
                    </kbd>
                  )}
                </button>
              )
            })
          : children}
      </div>
    )
  }
)
CommandButtonGroup.displayName = "CommandButtonGroup"

export interface CommandButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof commandButtonVariants> {
  icon?: React.ReactNode
  shortcut?: string
  loading?: boolean
  active?: boolean
}

export const CommandButton = React.forwardRef<HTMLButtonElement, CommandButtonProps>(
  (
    {
      className,
      variant = "outline",
      size = "default",
      attached = true,
      icon,
      shortcut,
      loading,
      active,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled || loading}
        className={cn(
          commandButtonVariants({ variant, size, attached }),
          attached && "hover:z-10 focus-visible:z-20",
          active && "bg-accent text-accent-foreground font-semibold",
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin shrink-0" />
        ) : (
          icon && <span className="shrink-0">{icon}</span>
        )}
        {children && <span>{children}</span>}
        {shortcut && (
          <kbd className="ml-1.5 hidden sm:inline-flex h-4 items-center rounded border border-border/60 bg-muted/70 px-1 font-mono text-[10px] text-muted-foreground uppercase">
            {shortcut}
          </kbd>
        )}
      </button>
    )
  }
)
CommandButton.displayName = "CommandButton"
