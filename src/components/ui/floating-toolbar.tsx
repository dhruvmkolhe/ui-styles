"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface FloatingToolbarAction {
  id: string
  label: string
  icon: React.ReactNode
  shortcut?: string
  active?: boolean
  disabled?: boolean
  onClick: () => void
}

export interface FloatingToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  onClose?: () => void
  anchorRect?: DOMRect | { top: number; left: number; width: number; height: number } | null
  actions?: FloatingToolbarAction[]
  targetRef?: React.RefObject<HTMLElement | null>
}

export const FloatingToolbar = React.forwardRef<HTMLDivElement, FloatingToolbarProps>(
  (
    {
      className,
      open: controlledOpen,
      onClose,
      anchorRect: controlledAnchorRect,
      actions,
      targetRef,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
    const [anchorPos, setAnchorPos] = React.useState<{ top: number; left: number } | null>(null)
    const toolbarRef = React.useRef<HTMLDivElement | null>(null)

    const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen

    // Position calculation
    React.useEffect(() => {
      if (controlledAnchorRect) {
        const top = Math.max(10, controlledAnchorRect.top - 48)
        const left = Math.max(
          10,
          controlledAnchorRect.left + controlledAnchorRect.width / 2 - 120
        )
        setAnchorPos({ top, left })
        return
      }

      // If a target ref or window selection is used:
      const handleSelection = () => {
        if (controlledOpen !== undefined) return
        const selection = window.getSelection()
        if (
          selection &&
          !selection.isCollapsed &&
          selection.toString().trim().length > 0
        ) {
          const range = selection.getRangeAt(0)
          if (
            targetRef &&
            targetRef.current &&
            !targetRef.current.contains(range.commonAncestorContainer)
          ) {
            setUncontrolledOpen(false)
            return
          }
          const rect = range.getBoundingClientRect()
          const top = Math.max(10, rect.top - 48 + window.scrollY)
          const left = Math.max(
            10,
            rect.left + rect.width / 2 - 120 + window.scrollX
          )
          setAnchorPos({ top, left })
          setUncontrolledOpen(true)
        } else {
          setUncontrolledOpen(false)
        }
      }

      document.addEventListener("selectionchange", handleSelection)
      return () => document.removeEventListener("selectionchange", handleSelection)
    }, [controlledAnchorRect, controlledOpen, targetRef])

    // Handle escape key
    React.useEffect(() => {
      if (!isOpen) return
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose?.()
          setUncontrolledOpen(false)
        }
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, onClose])

    // Handle click outside
    React.useEffect(() => {
      if (!isOpen) return
      const handleClickOutside = (e: MouseEvent) => {
        if (
          toolbarRef.current &&
          !toolbarRef.current.contains(e.target as Node)
        ) {
          onClose?.()
          setUncontrolledOpen(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isOpen, onClose])

    if (!isOpen || !anchorPos) return null

    return (
      <div
        ref={(node) => {
          toolbarRef.current = node
          if (typeof ref === "function") ref(node)
          else if (ref) (ref as any).current = node
        }}
        role="toolbar"
        aria-label="Contextual formatting"
        style={{
          position: "fixed",
          top: `${anchorPos.top}px`,
          left: `${anchorPos.left}px`,
        }}
        className={cn(
          "z-50 flex items-center gap-1 rounded-lg border border-border bg-popover/95 p-1 text-popover-foreground shadow-xl backdrop-blur-md animate-in fade-in-0 zoom-in-95 select-none",
          className
        )}
        {...props}
      >
        {actions
          ? actions.map((action) => (
              <button
                key={action.id}
                type="button"
                title={action.shortcut ? `${action.label} (${action.shortcut})` : action.label}
                aria-label={action.label}
                disabled={action.disabled}
                onClick={action.onClick}
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-md text-xs font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                  action.active
                    ? "bg-accent text-accent-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground",
                  action.disabled && "opacity-40 cursor-not-allowed pointer-events-none"
                )}
              >
                {action.icon}
              </button>
            ))
          : children}
      </div>
    )
  }
)
FloatingToolbar.displayName = "FloatingToolbar"
