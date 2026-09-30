"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

interface HoverCardContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  openWithDelay: () => void
  closeWithDelay: () => void
}

const HoverCardContext = React.createContext<HoverCardContextValue | null>(null)

export function useHoverCard() {
  const context = React.useContext(HoverCardContext)
  if (!context) {
    throw new Error("HoverCard subcomponents must be used inside <HoverCard />")
  }
  return context
}

export interface HoverCardProps {
  openDelay?: number
  closeDelay?: number
  children: React.ReactNode
}

export function HoverCard({
  openDelay = 200,
  closeDelay = 150,
  children,
}: HoverCardProps) {
  const [open, setOpen] = React.useState(false)
  const openTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const openWithDelay = React.useCallback(() => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    openTimeoutRef.current = setTimeout(() => {
      setOpen(true)
    }, openDelay)
  }, [openDelay])

  const closeWithDelay = React.useCallback(() => {
    if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current)
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false)
    }, closeDelay)
  }, [closeDelay])

  React.useEffect(() => {
    return () => {
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current)
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    }
  }, [])

  return (
    <HoverCardContext.Provider
      value={{ open, setOpen, openWithDelay, closeWithDelay }}
    >
      <span
        className="relative inline-block"
        onMouseEnter={openWithDelay}
        onMouseLeave={closeWithDelay}
      >
        {children}
      </span>
    </HoverCardContext.Provider>
  )
}

export interface HoverCardTriggerProps
  extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean
}

export const HoverCardTrigger = React.forwardRef<
  HTMLElement,
  HoverCardTriggerProps
>(({ className, children, asChild = false, ...props }, ref) => {
  const { open, setOpen, openWithDelay, closeWithDelay } = useHoverCard()
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      ref={ref}
      tabIndex={0}
      role="button"
      aria-haspopup="dialog"
      aria-expanded={open}
      onFocus={openWithDelay}
      onBlur={closeWithDelay}
      onClick={() => setOpen(!open)}
      className={cn(
        !asChild &&
          "inline-flex cursor-pointer underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-xs",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
})
HoverCardTrigger.displayName = "HoverCardTrigger"

export interface HoverCardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end"
  sideOffset?: number
}

export const HoverCardContent = React.forwardRef<
  HTMLDivElement,
  HoverCardContentProps
>(({ className, align = "center", sideOffset = 4, children, ...props }, ref) => {
  const { open, openWithDelay, closeWithDelay } = useHoverCard()

  if (!open) return null

  let alignClass = "left-1/2 -translate-x-1/2"
  if (align === "start") alignClass = "left-0"
  if (align === "end") alignClass = "right-0"

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Hover preview details"
      onMouseEnter={openWithDelay}
      onMouseLeave={closeWithDelay}
      className={cn(
        "absolute top-full mt-2 z-50 w-72 rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-lg outline-none",
        "animate-in fade-in-0 zoom-in-95",
        alignClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
HoverCardContent.displayName = "HoverCardContent"
