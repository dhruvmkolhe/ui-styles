"use client"

import * as React from "react"
import { Check, ChevronRight, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/* Types & Context                                                            */
/* -------------------------------------------------------------------------- */

interface MenuBarContextValue {
  openMenu: string | null
  setOpenMenu: (id: string | null) => void
  activeSubmenu: string | null
  setActiveSubmenu: (id: string | null) => void
}

const MenuBarContext = React.createContext<MenuBarContextValue | null>(null)

export interface MenuBarProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MenuBar = React.forwardRef<HTMLDivElement, MenuBarProps>(
  ({ className, children, ...props }, ref) => {
    const [openMenu, setOpenMenu] = React.useState<string | null>(null)
    const [activeSubmenu, setActiveSubmenu] = React.useState<string | null>(null)
    const menubarRef = React.useRef<HTMLDivElement | null>(null)

    // Outside click listener
    React.useEffect(() => {
      const handleOutside = (e: MouseEvent) => {
        if (menubarRef.current && !menubarRef.current.contains(e.target as Node)) {
          setOpenMenu(null)
          setActiveSubmenu(null)
        }
      }
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setOpenMenu(null)
          setActiveSubmenu(null)
        }
      }
      document.addEventListener("mousedown", handleOutside)
      document.addEventListener("keydown", handleEsc)
      return () => {
        document.removeEventListener("mousedown", handleOutside)
        document.removeEventListener("keydown", handleEsc)
      }
    }, [])

    return (
      <MenuBarContext.Provider
        value={{ openMenu, setOpenMenu, activeSubmenu, setActiveSubmenu }}
      >
        <div
          ref={(node) => {
            menubarRef.current = node
            if (typeof ref === "function") ref(node)
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
          }}
          role="menubar"
          aria-orientation="horizontal"
          className={cn(
            "flex h-9 items-center gap-1 rounded-md border border-border bg-background p-1 select-none text-sm",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </MenuBarContext.Provider>
    )
  }
)
MenuBar.displayName = "MenuBar"

/* -------------------------------------------------------------------------- */
/* Menu Bar Menu (Top Level)                                                  */
/* -------------------------------------------------------------------------- */

export interface MenuBarMenuProps {
  id: string
  label: string
  disabled?: boolean
  children: React.ReactNode
}

export function MenuBarMenu({ id, label, disabled, children }: MenuBarMenuProps) {
  const ctx = React.useContext(MenuBarContext)
  if (!ctx) throw new Error("MenuBarMenu must be used inside MenuBar")

  const isOpen = ctx.openMenu === id
  const buttonRef = React.useRef<HTMLButtonElement | null>(null)

  const toggle = () => {
    if (disabled) return
    ctx.setOpenMenu(isOpen ? null : id)
  }

  const handleMouseEnter = () => {
    // If another menu is already open, hovering switches active top-level menu
    if (ctx.openMenu !== null && ctx.openMenu !== id && !disabled) {
      ctx.setOpenMenu(id)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      ctx.setOpenMenu(id)
    }
  }

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        role="menuitem"
        aria-haspopup="true"
        aria-expanded={isOpen}
        disabled={disabled}
        onClick={toggle}
        onMouseEnter={handleMouseEnter}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex cursor-pointer items-center rounded-sm px-3 py-1 text-sm font-medium outline-none transition-colors",
          "hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground",
          isOpen && "bg-accent text-accent-foreground",
          disabled && "opacity-40 cursor-not-allowed pointer-events-none"
        )}
      >
        {label}
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute left-0 top-full mt-1 min-w-[12rem] rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md z-50 animate-in fade-in-0 zoom-in-95"
        >
          {children}
        </div>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Menu Bar Items                                                             */
/* -------------------------------------------------------------------------- */

export interface MenuBarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  inset?: boolean
  shortcut?: string
  icon?: React.ReactNode
}

export const MenuBarItem = React.forwardRef<HTMLButtonElement, MenuBarItemProps>(
  ({ className, inset, shortcut, icon, children, onClick, disabled, ...props }, ref) => {
    const ctx = React.useContext(MenuBarContext)

    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        disabled={disabled}
        onClick={(e) => {
          if (disabled) return
          onClick?.(e)
          ctx?.setOpenMenu(null)
        }}
        className={cn(
          "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors text-left",
          "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:outline-none",
          inset && "pl-8",
          disabled && "opacity-40 cursor-not-allowed pointer-events-none",
          className
        )}
        {...props}
      >
        {icon && <span className="mr-2 h-4 w-4 shrink-0 flex items-center justify-center">{icon}</span>}
        <span className="flex-1 truncate">{children}</span>
        {shortcut && (
          <span className="ml-auto text-xs tracking-widest text-muted-foreground pl-3">
            {shortcut}
          </span>
        )}
      </button>
    )
  }
)
MenuBarItem.displayName = "MenuBarItem"

export const MenuBarSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
))
MenuBarSeparator.displayName = "MenuBarSeparator"

export interface MenuBarSubProps {
  id: string
  label: string
  icon?: React.ReactNode
  disabled?: boolean
  children: React.ReactNode
}

export function MenuBarSub({ id, label, icon, disabled, children }: MenuBarSubProps) {
  const ctx = React.useContext(MenuBarContext)
  const isSubOpen = ctx?.activeSubmenu === id

  return (
    <div
      className="relative"
      onMouseEnter={() => !disabled && ctx?.setActiveSubmenu(id)}
      onMouseLeave={() => ctx?.setActiveSubmenu(null)}
    >
      <button
        type="button"
        role="menuitem"
        aria-haspopup="true"
        aria-expanded={isSubOpen}
        disabled={disabled}
        onClick={() => !disabled && ctx?.setActiveSubmenu(isSubOpen ? null : id)}
        className={cn(
          "flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
          "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          isSubOpen && "bg-accent text-accent-foreground",
          disabled && "opacity-40 cursor-not-allowed pointer-events-none"
        )}
      >
        {icon && <span className="mr-2 h-4 w-4 shrink-0">{icon}</span>}
        <span className="flex-1 truncate text-left">{label}</span>
        <ChevronRight className="ml-auto h-4 w-4 opacity-70" />
      </button>

      {isSubOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute left-full top-0 ml-1 min-w-[10rem] rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg z-50 animate-in fade-in-0 zoom-in-95"
        >
          {children}
        </div>
      )}
    </div>
  )
}
