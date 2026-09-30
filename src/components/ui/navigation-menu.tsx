"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/* Navigation Menu Context                                                    */
/* -------------------------------------------------------------------------- */

interface NavigationMenuContextValue {
  value: string | null
  setValue: (value: string | null) => void
  onItemKeyDown: (e: React.KeyboardEvent, id: string) => void
}

const NavigationMenuContext = React.createContext<NavigationMenuContextValue | null>(null)

export interface NavigationMenuProps
  extends Omit<React.ComponentPropsWithoutRef<"nav">, "defaultValue"> {
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
}

export const NavigationMenu = React.forwardRef<HTMLElement, NavigationMenuProps>(
  (
    {
      value: controlledValue,
      defaultValue = null,
      onValueChange,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string | null>(defaultValue)
    const isControlled = controlledValue !== undefined
    const activeValue = isControlled ? controlledValue : uncontrolledValue

    const setValue = React.useCallback(
      (val: string | null) => {
        if (!isControlled) setUncontrolledValue(val)
        onValueChange?.(val)
      },
      [isControlled, onValueChange]
    )

    // Close when clicking outside
    const navRef = React.useRef<HTMLElement | null>(null)
    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (navRef.current && !navRef.current.contains(e.target as Node)) {
          setValue(null)
        }
      }
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setValue(null)
        }
      }
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscape)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
        document.removeEventListener("keydown", handleEscape)
      }
    }, [setValue])

    const onItemKeyDown = (e: React.KeyboardEvent, id: string) => {
      if (e.key === "Escape") {
        setValue(null)
      }
    }

    return (
      <NavigationMenuContext.Provider value={{ value: activeValue, setValue, onItemKeyDown }}>
        <nav
          ref={(node) => {
            navRef.current = node
            if (typeof ref === "function") ref(node)
            else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node
          }}
          aria-label="Main Navigation"
          className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
          {...props}
        >
          {children}
        </nav>
      </NavigationMenuContext.Provider>
    )
  }
)
NavigationMenu.displayName = "NavigationMenu"

export const NavigationMenuList = React.forwardRef<
  HTMLUListElement,
  React.ComponentPropsWithoutRef<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center gap-1 p-1",
      className
    )}
    {...props}
  />
))
NavigationMenuList.displayName = "NavigationMenuList"

export const NavigationMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("relative", className)} {...props} />
))
NavigationMenuItem.displayName = "NavigationMenuItem"

export interface NavigationMenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

export const NavigationMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  NavigationMenuTriggerProps
>(({ className, children, value, disabled, ...props }, ref) => {
  const context = React.useContext(NavigationMenuContext)
  if (!context) throw new Error("NavigationMenuTrigger must be inside NavigationMenu")

  const isOpen = context.value === value

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      aria-expanded={isOpen}
      aria-haspopup="true"
      onClick={() => context.setValue(isOpen ? null : value)}
      onKeyDown={(e) => {
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          context.setValue(value)
        }
      }}
      className={cn(
        "group inline-flex h-9 w-max items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        isOpen && "bg-accent/80 text-accent-foreground",
        disabled && "opacity-50 pointer-events-none cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn(
          "ml-1.5 h-3.5 w-3.5 transition-transform duration-200",
          isOpen && "rotate-180"
        )}
        aria-hidden="true"
      />
    </button>
  )
})
NavigationMenuTrigger.displayName = "NavigationMenuTrigger"

export interface NavigationMenuContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

export const NavigationMenuContent = React.forwardRef<
  HTMLDivElement,
  NavigationMenuContentProps
>(({ className, value, children, ...props }, ref) => {
  const context = React.useContext(NavigationMenuContext)
  if (!context) throw new Error("NavigationMenuContent must be inside NavigationMenu")

  const isOpen = context.value === value
  if (!isOpen) return null

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Submenu"
      className={cn(
        "absolute left-0 top-full mt-2 w-auto min-w-[18rem] rounded-md border border-border bg-popover p-3 text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95 z-50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
NavigationMenuContent.displayName = "NavigationMenuContent"

export interface NavigationMenuLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean
  disabled?: boolean
}

export const NavigationMenuLink = React.forwardRef<
  HTMLAnchorElement,
  NavigationMenuLinkProps
>(({ className, isActive, disabled, ...props }, ref) => (
  <a
    ref={ref}
    aria-current={isActive ? "page" : undefined}
    aria-disabled={disabled ? "true" : undefined}
    tabIndex={disabled ? -1 : 0}
    className={cn(
      "block select-none rounded-md p-2.5 text-sm font-medium leading-none no-underline outline-none transition-colors",
      "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 cursor-pointer",
      isActive && "bg-accent/70 text-foreground font-semibold",
      disabled && "opacity-50 pointer-events-none cursor-not-allowed",
      className
    )}
    {...props}
  />
))
NavigationMenuLink.displayName = "NavigationMenuLink"
