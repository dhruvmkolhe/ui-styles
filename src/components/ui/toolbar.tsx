"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { MoreHorizontal } from "lucide-react"

const toolbarVariants = cva(
  "inline-flex items-center gap-1 rounded-lg border border-border bg-card p-1 text-card-foreground shadow-xs",
  {
    variants: {
      size: {
        sm: "h-9 text-xs",
        default: "h-10 text-sm",
        lg: "h-12 text-base",
      },
      wrap: {
        true: "flex-wrap h-auto min-h-10",
        false: "flex-nowrap overflow-x-auto scrollbar-none",
      },
    },
    defaultVariants: {
      size: "default",
      wrap: false,
    },
  }
)

interface ToolbarContextValue {
  size: "sm" | "default" | "lg"
}

const ToolbarContext = React.createContext<ToolbarContextValue>({
  size: "default",
})

export interface ToolbarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toolbarVariants> {
  size?: "sm" | "default" | "lg"
  wrap?: boolean
}

export const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  ({ className, size = "default", wrap = false, children, ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const focusable = Array.from(
          e.currentTarget.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [tabindex="0"]:not([disabled])'
          )
        )
        const currentIndex = focusable.indexOf(document.activeElement as HTMLElement)
        if (currentIndex !== -1) {
          e.preventDefault()
          const nextIndex =
            e.key === "ArrowRight"
              ? (currentIndex + 1) % focusable.length
              : (currentIndex - 1 + focusable.length) % focusable.length
          focusable[nextIndex]?.focus()
        }
      }
    }

    return (
      <ToolbarContext.Provider value={{ size }}>
        <div
          ref={ref}
          role="toolbar"
          aria-orientation="horizontal"
          onKeyDown={handleKeyDown}
          className={cn(toolbarVariants({ size, wrap }), className)}
          {...props}
        >
          {children}
        </div>
      </ToolbarContext.Provider>
    )
  }
)
Toolbar.displayName = "Toolbar"

/* ------------------------------------------------------------------ */
/* Toolbar Group                                                       */
/* ------------------------------------------------------------------ */
export const ToolbarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="group"
      className={cn("inline-flex items-center gap-0.5 shrink-0", className)}
      {...props}
    >
      {children}
    </div>
  )
})
ToolbarGroup.displayName = "ToolbarGroup"

/* ------------------------------------------------------------------ */
/* Toolbar Button                                                      */
/* ------------------------------------------------------------------ */
export interface ToolbarButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  iconOnly?: boolean
}

export const ToolbarButton = React.forwardRef<
  HTMLButtonElement,
  ToolbarButtonProps
>(({ className, active, iconOnly, children, disabled, ...props }, ref) => {
  const { size } = React.useContext(ToolbarContext)

  const sizeClasses =
    size === "sm"
      ? iconOnly
        ? "h-7 w-7 p-1"
        : "h-7 px-2 text-xs"
      : size === "lg"
      ? iconOnly
        ? "h-9 w-9 p-2"
        : "h-9 px-3 text-base"
      : iconOnly
      ? "h-8 w-8 p-1.5"
      : "h-8 px-2.5 text-sm"

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-md transition-colors select-none shrink-0",
        sizeClasses,
        active
          ? "bg-accent text-accent-foreground font-semibold shadow-2xs"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        disabled && "opacity-40 cursor-not-allowed pointer-events-none",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})
ToolbarButton.displayName = "ToolbarButton"

/* ------------------------------------------------------------------ */
/* Toolbar Separator                                                   */
/* ------------------------------------------------------------------ */
export const ToolbarSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation="vertical"
      className={cn("mx-1 h-5 w-[1px] bg-border shrink-0 self-center", className)}
      {...props}
    />
  )
})
ToolbarSeparator.displayName = "ToolbarSeparator"

/* ------------------------------------------------------------------ */
/* Toolbar Toggle Group                                                */
/* ------------------------------------------------------------------ */
export interface ToolbarToggleGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  type?: "single" | "multiple"
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: any) => void
}

interface ToggleGroupContextValue {
  type: "single" | "multiple"
  value: string | string[]
  onToggle: (itemValue: string) => void
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(null)

export const ToolbarToggleGroup = React.forwardRef<
  HTMLDivElement,
  ToolbarToggleGroupProps
>(
  (
    {
      className,
      type = "single",
      value: controlledValue,
      defaultValue,
      onValueChange,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string | string[]>(
      () => defaultValue ?? (type === "multiple" ? [] : "")
    )
    const isControlled = controlledValue !== undefined
    const currentValue = isControlled ? controlledValue : uncontrolledValue

    const handleToggle = (itemValue: string) => {
      let nextValue: string | string[]
      if (type === "multiple") {
        const arr = Array.isArray(currentValue) ? currentValue : []
        if (arr.includes(itemValue)) {
          nextValue = arr.filter((v) => v !== itemValue)
        } else {
          nextValue = [...arr, itemValue]
        }
      } else {
        nextValue = currentValue === itemValue ? "" : itemValue
      }

      if (!isControlled) {
        setUncontrolledValue(nextValue)
      }
      onValueChange?.(nextValue)
    }

    return (
      <ToggleGroupContext.Provider
        value={{
          type,
          value: currentValue,
          onToggle: handleToggle,
        }}
      >
        <div
          ref={ref}
          role="group"
          className={cn("inline-flex items-center gap-0.5 shrink-0", className)}
          {...props}
        >
          {children}
        </div>
      </ToggleGroupContext.Provider>
    )
  }
)
ToolbarToggleGroup.displayName = "ToolbarToggleGroup"

export interface ToolbarToggleItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  iconOnly?: boolean
}

export const ToolbarToggleItem = React.forwardRef<
  HTMLButtonElement,
  ToolbarToggleItemProps
>(({ className, value, iconOnly = true, children, disabled, ...props }, ref) => {
  const groupContext = React.useContext(ToggleGroupContext)
  const { size } = React.useContext(ToolbarContext)

  const isChecked = groupContext
    ? Array.isArray(groupContext.value)
      ? groupContext.value.includes(value)
      : groupContext.value === value
    : false

  const sizeClasses =
    size === "sm"
      ? iconOnly
        ? "h-7 w-7 p-1"
        : "h-7 px-2 text-xs"
      : size === "lg"
      ? iconOnly
        ? "h-9 w-9 p-2"
        : "h-9 px-3 text-base"
      : iconOnly
      ? "h-8 w-8 p-1.5"
      : "h-8 px-2.5 text-sm"

  return (
    <button
      ref={ref}
      type="button"
      role="checkbox"
      aria-checked={isChecked}
      disabled={disabled}
      onClick={() => groupContext?.onToggle(value)}
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-md transition-colors select-none shrink-0",
        sizeClasses,
        isChecked
          ? "bg-accent text-accent-foreground font-semibold shadow-2xs"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        disabled && "opacity-40 cursor-not-allowed pointer-events-none",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})
ToolbarToggleItem.displayName = "ToolbarToggleItem"
