"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ContextMenuContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  position: { x: number; y: number }
  setPosition: (pos: { x: number; y: number }) => void
}

const ContextMenuContext = React.createContext<ContextMenuContextValue | null>(null)

export function useContextMenu() {
  const context = React.useContext(ContextMenuContext)
  if (!context) {
    throw new Error("ContextMenu subcomponents must be used inside <ContextMenu />")
  }
  return context
}

export function ContextMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })

  return (
    <ContextMenuContext.Provider value={{ open, setOpen, position, setPosition }}>
      <div className="relative">{children}</div>
    </ContextMenuContext.Provider>
  )
}

export interface ContextMenuTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
}

export const ContextMenuTrigger = React.forwardRef<HTMLDivElement, ContextMenuTriggerProps>(
  ({ className, disabled, onContextMenu, children, ...props }, ref) => {
    const { setOpen, setPosition } = useContextMenu()

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      e.preventDefault()

      // Calculate position with boundary checks
      const x = Math.min(e.clientX, window.innerWidth - 220)
      const y = Math.min(e.clientY, window.innerHeight - 260)

      setPosition({ x, y })
      setOpen(true)
      onContextMenu?.(e)
    }

    return (
      <div
        ref={ref}
        onContextMenu={handleContextMenu}
        className={cn("select-none", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ContextMenuTrigger.displayName = "ContextMenuTrigger"

export interface ContextMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ContextMenuContent = React.forwardRef<HTMLDivElement, ContextMenuContentProps>(
  ({ className, children, ...props }, ref) => {
    const { open, setOpen, position } = useContextMenu()
    const menuRef = React.useRef<HTMLDivElement | null>(null)

    React.useEffect(() => {
      if (!open) return

      const handleClickOutside = (e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
          setOpen(false)
        }
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault()
          setOpen(false)
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleKeyDown)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
        document.removeEventListener("keydown", handleKeyDown)
      }
    }, [open, setOpen])

    if (!open) return null

    return (
      <div
        ref={(node) => {
          menuRef.current = node
          if (typeof ref === "function") ref(node)
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }}
        role="menu"
        aria-orientation="vertical"
        style={{
          position: "fixed",
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: 60,
        }}
        className={cn(
          "min-w-[12rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-xl animate-in fade-in-0 zoom-in-95 select-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ContextMenuContent.displayName = "ContextMenuContent"

export interface ContextMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  inset?: boolean
  shortcut?: string
  icon?: React.ReactNode
}

export const ContextMenuItem = React.forwardRef<HTMLButtonElement, ContextMenuItemProps>(
  ({ className, inset, shortcut, icon, disabled, onClick, children, ...props }, ref) => {
    const { setOpen } = useContextMenu()

    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        disabled={disabled}
        aria-disabled={disabled ? "true" : undefined}
        onClick={(e) => {
          if (disabled) return
          onClick?.(e)
          setOpen(false)
        }}
        className={cn(
          "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-xs outline-none transition-colors text-left",
          "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          inset && "pl-8",
          disabled && "opacity-40 pointer-events-none cursor-not-allowed",
          className
        )}
        {...props}
      >
        {icon && <span className="mr-2 h-4 w-4 shrink-0 flex items-center justify-center">{icon}</span>}
        <span className="flex-1 truncate">{children}</span>
        {shortcut && (
          <span className="ml-auto text-[10px] tracking-widest text-muted-foreground pl-3 font-mono">
            {shortcut}
          </span>
        )}
      </button>
    )
  }
)
ContextMenuItem.displayName = "ContextMenuItem"

export const ContextMenuSeparator = React.forwardRef<
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
ContextMenuSeparator.displayName = "ContextMenuSeparator"
