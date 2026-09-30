"use client"

import * as React from "react"
import { ChevronDown, ChevronRight, PanelLeftClose, PanelLeftOpen, X } from "lucide-react"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/* Sidebar Context                                                            */
/* -------------------------------------------------------------------------- */

interface SidebarContextValue {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  toggleCollapsed: () => void
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
  toggleMobileOpen: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a <SidebarProvider /> or <Sidebar />")
  }
  return context
}

/* -------------------------------------------------------------------------- */
/* Sidebar Root Component                                                     */
/* -------------------------------------------------------------------------- */

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  defaultCollapsed?: boolean
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  defaultMobileOpen?: boolean
  mobileOpen?: boolean
  onMobileOpenChange?: (open: boolean) => void
  collapsible?: boolean
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      defaultCollapsed = false,
      collapsed: controlledCollapsed,
      onCollapsedChange,
      defaultMobileOpen = false,
      mobileOpen: controlledMobileOpen,
      onMobileOpenChange,
      collapsible = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledCollapsed, setUncontrolledCollapsed] = React.useState(defaultCollapsed)
    const [uncontrolledMobileOpen, setUncontrolledMobileOpen] = React.useState(defaultMobileOpen)

    const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : uncontrolledCollapsed
    const isMobileOpen = controlledMobileOpen !== undefined ? controlledMobileOpen : uncontrolledMobileOpen

    const setCollapsed = React.useCallback(
      (val: boolean) => {
        if (controlledCollapsed === undefined) setUncontrolledCollapsed(val)
        onCollapsedChange?.(val)
      },
      [controlledCollapsed, onCollapsedChange]
    )

    const toggleCollapsed = React.useCallback(() => {
      setCollapsed(!isCollapsed)
    }, [isCollapsed, setCollapsed])

    const setMobileOpen = React.useCallback(
      (val: boolean) => {
        if (controlledMobileOpen === undefined) setUncontrolledMobileOpen(val)
        onMobileOpenChange?.(val)
      },
      [controlledMobileOpen, onMobileOpenChange]
    )

    const toggleMobileOpen = React.useCallback(() => {
      setMobileOpen(!isMobileOpen)
    }, [isMobileOpen, setMobileOpen])

    // Handle Escape key to close mobile sidebar
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isMobileOpen) {
          setMobileOpen(false)
        }
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isMobileOpen, setMobileOpen])

    return (
      <SidebarContext.Provider
        value={{
          collapsed: isCollapsed,
          setCollapsed,
          toggleCollapsed,
          mobileOpen: isMobileOpen,
          setMobileOpen,
          toggleMobileOpen,
        }}
      >
        {/* Mobile Backdrop Overlay */}
        {isMobileOpen && (
          <div
            aria-hidden="true"
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity md:hidden"
          />
        )}

        <aside
          ref={ref}
          aria-label="Sidebar navigation"
          className={cn(
            "flex flex-col border-r border-border bg-card text-card-foreground transition-all duration-300 ease-in-out select-none",
            // Desktop dimensions
            isCollapsed ? "md:w-16" : "md:w-64",
            // Mobile sliding drawer positioning
            "fixed inset-y-0 left-0 z-50 md:static md:z-auto",
            isMobileOpen ? "translate-x-0 w-72 shadow-2xl" : "-translate-x-full md:translate-x-0",
            className
          )}
          {...props}
        >
          {children}
        </aside>
      </SidebarContext.Provider>
    )
  }
)
Sidebar.displayName = "Sidebar"

/* -------------------------------------------------------------------------- */
/* Subcomponents                                                              */
/* -------------------------------------------------------------------------- */

export const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { mobileOpen, setMobileOpen, collapsed } = useSidebar()
  return (
    <div
      ref={ref}
      className={cn(
        "flex h-14 items-center justify-between border-b border-border/80 px-3.5 shrink-0",
        collapsed && "md:justify-center md:px-2",
        className
      )}
      {...props}
    >
      {children}
      {mobileOpen && (
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground md:hidden"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  )
})
SidebarHeader.displayName = "SidebarHeader"

export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-4", className)}
    {...props}
  />
))
SidebarContent.displayName = "SidebarContent"

export const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-1", className)} {...props} />
))
SidebarGroup.displayName = "SidebarGroup"

export const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { collapsed } = useSidebar()
  if (collapsed) return null
  return (
    <div
      ref={ref}
      className={cn(
        "px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupLabel.displayName = "SidebarGroupLabel"

export const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("space-y-0.5", className)} {...props} />
))
SidebarMenu.displayName = "SidebarMenu"

export const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("relative list-none", className)} {...props} />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

export interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
  icon?: React.ReactNode
  badge?: React.ReactNode
  tooltip?: string
}

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(
  (
    { className, isActive, icon, badge, children, disabled, title, tooltip, ...props },
    ref
  ) => {
    const { collapsed } = useSidebar()

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-current={isActive ? "page" : undefined}
        title={collapsed ? (tooltip || (typeof children === "string" ? children : undefined)) : title}
        className={cn(
          "group flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium transition-colors text-left",
          "hover:bg-accent/60 hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          isActive
            ? "bg-accent text-accent-foreground font-semibold shadow-xs"
            : "text-muted-foreground hover:text-foreground",
          disabled && "opacity-50 pointer-events-none cursor-not-allowed",
          collapsed && "md:justify-center md:px-0",
          className
        )}
        {...props}
      >
        {icon && (
          <span
            className={cn(
              "shrink-0 h-4 w-4 [&>svg]:h-4 [&>svg]:w-4 flex items-center justify-center transition-colors",
              isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
            )}
          >
            {icon}
          </span>
        )}
        {!collapsed && <span className="flex-1 truncate">{children}</span>}
        {!collapsed && badge && (
          <span className="shrink-0 ml-auto inline-flex items-center">{badge}</span>
        )}
      </button>
    )
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

/* Nested Submenu support */
export interface SidebarMenuSubProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  icon?: React.ReactNode
  defaultOpen?: boolean
}

export function SidebarMenuSub({
  title,
  icon,
  defaultOpen = false,
  children,
  className,
}: SidebarMenuSubProps) {
  const { collapsed } = useSidebar()
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  if (collapsed) {
    return (
      <SidebarMenuButton icon={icon} tooltip={title} onClick={() => {}}>
        {title}
      </SidebarMenuButton>
    )
  }

  return (
    <div className={cn("space-y-0.5", className)}>
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium text-muted-foreground hover:bg-accent/60 hover:text-foreground transition-colors text-left"
      >
        {icon && <span className="shrink-0 h-4 w-4 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>}
        <span className="flex-1 truncate">{title}</span>
        {isOpen ? (
          <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-60" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" />
        )}
      </button>
      {isOpen && (
        <div className="pl-6 pr-1 space-y-0.5 border-l border-border/60 ml-4.5 my-1">
          {children}
        </div>
      )}
    </div>
  )
}

export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { collapsed, toggleCollapsed } = useSidebar()
  return (
    <div
      ref={ref}
      className={cn(
        "border-t border-border/80 p-3 flex items-center justify-between shrink-0",
        collapsed && "md:flex-col md:gap-2 md:p-2",
        className
      )}
      {...props}
    >
      {children}
      <button
        type="button"
        onClick={toggleCollapsed}
        className="hidden md:inline-flex items-center justify-center rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <PanelLeftOpen className="h-4 w-4" />
        ) : (
          <PanelLeftClose className="h-4 w-4" />
        )}
      </button>
    </div>
  )
})
SidebarFooter.displayName = "SidebarFooter"

export function SidebarTrigger({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { toggleMobileOpen, toggleCollapsed } = useSidebar()

  return (
    <button
      type="button"
      onClick={() => {
        if (window.innerWidth < 768) {
          toggleMobileOpen()
        } else {
          toggleCollapsed()
        }
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      aria-label="Toggle navigation sidebar"
      {...props}
    >
      <PanelLeftOpen className="h-5 w-5" />
    </button>
  )
}
