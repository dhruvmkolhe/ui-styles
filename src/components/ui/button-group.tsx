"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonGroupVariants = cva(
  "inline-flex items-center",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col items-stretch",
      },
      attached: {
        true: "isolate",
        false: "gap-2",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      attached: true,
    },
  }
)

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {
  size?: "sm" | "default" | "lg"
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive"
  attached?: boolean
  items?: Array<{
    id: string
    label: React.ReactNode
    icon?: React.ReactNode
    onClick?: () => void
    disabled?: boolean
    active?: boolean
    variant?: "default" | "outline" | "secondary" | "ghost" | "destructive"
  }>
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
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
    // If declarative items array is provided:
    if (items && items.length > 0) {
      return (
        <div
          ref={ref}
          role="group"
          className={cn(buttonGroupVariants({ orientation, attached }), className)}
          {...props}
        >
          {items.map((item, index) => {
            const isFirst = index === 0
            const isLast = index === items.length - 1
            const itemVariant = item.variant || variant

            let cornerClasses = ""
            let borderCollapseClasses = ""

            if (attached) {
              if (orientation === "horizontal") {
                cornerClasses = isFirst
                  ? "rounded-r-none"
                  : isLast
                  ? "rounded-l-none"
                  : "rounded-none"
                borderCollapseClasses = !isFirst ? "-ml-px" : ""
              } else {
                cornerClasses = isFirst
                  ? "rounded-b-none"
                  : isLast
                  ? "rounded-t-none"
                  : "rounded-none"
                borderCollapseClasses = !isFirst ? "-mt-px" : ""
              }
            }

            const sizeClasses =
              size === "sm"
                ? "h-8 px-3 text-xs"
                : size === "lg"
                ? "h-10 px-5 text-base"
                : "h-9 px-4 text-sm"

            const variantClasses =
              itemVariant === "default"
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : itemVariant === "secondary"
                ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                : itemVariant === "ghost"
                ? "hover:bg-muted text-foreground"
                : itemVariant === "destructive"
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : "border border-border bg-card text-foreground hover:bg-muted"

            return (
              <button
                key={item.id}
                type="button"
                disabled={item.disabled}
                onClick={item.onClick}
                className={cn(
                  "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 select-none relative",
                  cornerClasses,
                  borderCollapseClasses,
                  sizeClasses,
                  variantClasses,
                  attached && "hover:z-10 focus-visible:z-20",
                  item.active && "bg-accent text-accent-foreground font-semibold"
                )}
              >
                {item.icon && <span className="mr-2 shrink-0">{item.icon}</span>}
                {item.label}
              </button>
            )
          })}
        </div>
      )
    }

    // If compound children are provided, modify child classes to connect borders
    const childArray = React.Children.toArray(children).filter(Boolean)

    return (
      <div
        ref={ref}
        role="group"
        className={cn(buttonGroupVariants({ orientation, attached }), className)}
        {...props}
      >
        {childArray.map((child, index) => {
          if (!React.isValidElement(child)) return child

          const isFirst = index === 0
          const isLast = index === childArray.length - 1

          let attachedClasses = ""
          if (attached) {
            if (orientation === "horizontal") {
              attachedClasses = cn(
                isFirst && "rounded-r-none",
                isLast && "rounded-l-none",
                !isFirst && !isLast && "rounded-none",
                !isFirst && "-ml-px",
                "hover:z-10 focus-visible:z-20 relative"
              )
            } else {
              attachedClasses = cn(
                isFirst && "rounded-b-none",
                isLast && "rounded-t-none",
                !isFirst && !isLast && "rounded-none",
                !isFirst && "-mt-px",
                "hover:z-10 focus-visible:z-20 relative"
              )
            }
          }

          return React.cloneElement(child as React.ReactElement<any>, {
            className: cn((child.props as any).className, attachedClasses),
          })
        })}
      </div>
    )
  }
)
ButtonGroup.displayName = "ButtonGroup"
