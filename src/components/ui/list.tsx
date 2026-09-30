"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  variant?: "default" | "bordered" | "divided" | "cards"
  size?: "sm" | "md" | "lg"
  as?: "ul" | "ol"
}

export const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ className, variant = "divided", size = "md", as = "ul", ...props }, ref) => {
    const Component = as
    return (
      <Component
        ref={ref as any}
        className={cn(
          "w-full text-foreground",
          variant === "bordered" && "rounded-lg border border-border divide-y divide-border overflow-hidden bg-card",
          variant === "divided" && "divide-y divide-border/60",
          variant === "cards" && "space-y-2",
          size === "sm" && "text-xs",
          size === "md" && "text-sm",
          size === "lg" && "text-base",
          className
        )}
        {...props}
      />
    )
  }
)
List.displayName = "List"

export interface ListItemProps
  extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "title"> {
  leading?: React.ReactNode
  trailing?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  selected?: boolean
  disabled?: boolean
  interactive?: boolean
}

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  (
    {
      className,
      leading,
      trailing,
      title,
      description,
      children,
      selected,
      disabled,
      interactive = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const isClickable = interactive || !!onClick
    return (
      <li
        ref={ref}
        aria-selected={selected ? true : undefined}
        aria-disabled={disabled ? true : undefined}
        onClick={disabled ? undefined : onClick}
        className={cn(
          "flex items-center gap-3 py-2.5 px-3 transition-colors",
          isClickable && !disabled && "cursor-pointer hover:bg-muted/60 active:bg-muted select-none",
          selected && "bg-muted/80 font-medium",
          disabled && "opacity-50 pointer-events-none cursor-not-allowed",
          className
        )}
        {...props}
      >
        {leading && <div className="shrink-0 flex items-center">{leading}</div>}
        <div className="flex-1 min-w-0">
          {title && <div className="font-medium text-foreground truncate">{title}</div>}
          {description && (
            <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{description}</div>
          )}
          {children}
        </div>
        {trailing && <div className="shrink-0 flex items-center text-xs text-muted-foreground">{trailing}</div>}
      </li>
    )
  }
)
ListItem.displayName = "ListItem"

export interface ListHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  action?: React.ReactNode
}

export const ListHeader = React.forwardRef<HTMLDivElement, ListHeaderProps>(
  ({ className, children, action, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-muted/30 border-b border-border/40",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {action && <span>{action}</span>}
    </div>
  )
)
ListHeader.displayName = "ListHeader"

export const ListDivider = React.forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement>
>(({ className, ...props }, ref) => (
  <hr
    ref={ref}
    className={cn("border-t border-border/60 my-1", className)}
    {...props}
  />
))
ListDivider.displayName = "ListDivider"
