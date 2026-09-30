"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type PopoverPlacement = "top" | "bottom" | "left" | "right"
export type PopoverAlign = "start" | "center" | "end"

interface PopoverContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
  contentId: string
  placement: PopoverPlacement
  align: PopoverAlign
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null)

export function usePopover() {
  const context = React.useContext(PopoverContext)
  if (!context) {
    throw new Error("Popover subcomponents must be used within a <Popover />")
  }
  return context
}

export interface PopoverProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  placement?: PopoverPlacement
  align?: PopoverAlign
  children: React.ReactNode
}

export function Popover({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  placement = "bottom",
  align = "center",
  children,
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const triggerRef = React.useRef<HTMLButtonElement | null>(null)
  const contentId = React.useId()

  const setOpen = React.useCallback(
    (newOpen: boolean) => {
      if (!isControlled) setUncontrolledOpen(newOpen)
      onOpenChange?.(newOpen)
      if (!newOpen && triggerRef.current) {
        // Restore focus on close
        triggerRef.current.focus()
      }
    },
    [isControlled, onOpenChange]
  )

  return (
    <PopoverContext.Provider
      value={{ open, setOpen, triggerRef, contentId, placement, align }}
    >
      <div className="relative inline-block">{children}</div>
    </PopoverContext.Provider>
  )
}

export interface PopoverTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ className, onClick, children, disabled, ...props }, ref) => {
    const { open, setOpen, triggerRef, contentId } = usePopover()

    const combinedRef = (node: HTMLButtonElement | null) => {
      (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node
      if (typeof ref === "function") ref(node)
      else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node
    }

    return (
      <button
        ref={combinedRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? contentId : undefined}
        disabled={disabled}
        onClick={(e) => {
          if (disabled) return
          onClick?.(e)
          setOpen(!open)
        }}
        className={cn(
          "inline-flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          disabled && "opacity-50 pointer-events-none cursor-not-allowed",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
PopoverTrigger.displayName = "PopoverTrigger"

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  sideOffset?: number
}

export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, sideOffset = 6, children, style, ...props }, ref) => {
    const { open, setOpen, contentId, triggerRef, placement, align } = usePopover()
    const contentRef = React.useRef<HTMLDivElement | null>(null)

    // Handle outside clicks and Escape key
    React.useEffect(() => {
      if (!open) return

      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node
        if (
          contentRef.current &&
          !contentRef.current.contains(target) &&
          triggerRef.current &&
          !triggerRef.current.contains(target)
        ) {
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
    }, [open, setOpen, triggerRef])

    if (!open) return null

    // Compute placement classes
    let placementClasses = "top-full mt-2"
    if (placement === "top") placementClasses = "bottom-full mb-2"
    else if (placement === "left") placementClasses = "right-full mr-2 top-0"
    else if (placement === "right") placementClasses = "left-full ml-2 top-0"

    let alignClasses = "left-1/2 -translate-x-1/2"
    if (align === "start") alignClasses = "left-0"
    else if (align === "end") alignClasses = "right-0"

    if (placement === "left" || placement === "right") {
      if (align === "center") alignClasses = "top-1/2 -translate-y-1/2"
      else if (align === "start") alignClasses = "top-0"
      else if (align === "end") alignClasses = "bottom-0"
    }

    return (
      <div
        ref={(node) => {
          contentRef.current = node
          if (typeof ref === "function") ref(node)
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }}
        id={contentId}
        role="dialog"
        aria-modal="false"
        className={cn(
          "absolute z-50 min-w-[16rem] rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none",
          "animate-in fade-in-0 zoom-in-95",
          placementClasses,
          alignClasses,
          className
        )}
        style={{ ...style }}
        {...props}
      >
        {children}
      </div>
    )
  }
)
PopoverContent.displayName = "PopoverContent"

export function PopoverClose({
  className,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = usePopover()

  return (
    <button
      type="button"
      onClick={(e) => {
        onClick?.(e)
        setOpen(false)
      }}
      className={cn("outline-none cursor-pointer", className)}
      {...props}
    />
  )
}
