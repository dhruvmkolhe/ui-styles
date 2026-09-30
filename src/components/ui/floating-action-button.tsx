"use client"

import * as React from "react"
import { Plus, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface FabAction {
  id: string
  label: string
  icon: React.ReactNode
  onClick: () => void
}

export interface FloatingActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  label?: string
  extended?: boolean
  loading?: boolean
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left" | "inline"
  actions?: FabAction[]
}

export function FloatingActionButton({
  icon = <Plus className="h-5 w-5" />,
  label = "Action",
  extended = false,
  loading = false,
  position = "bottom-right",
  actions,
  disabled = false,
  className,
  onClick,
  ...props
}: FloatingActionButtonProps) {
  const [open, setOpen] = React.useState(false)
  const hasSpeedDial = Boolean(actions && actions.length > 0)

  const positionClasses = {
    "bottom-right": "fixed bottom-6 right-6 z-40 pb-[env(safe-area-inset-bottom,0px)]",
    "bottom-left": "fixed bottom-6 left-6 z-40 pb-[env(safe-area-inset-bottom,0px)]",
    "top-right": "fixed top-6 right-6 z-40",
    "top-left": "fixed top-6 left-6 z-40",
    "inline": "relative",
  }[position]

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return
    if (hasSpeedDial) {
      setOpen(!open)
    }
    onClick?.(e)
  }

  return (
    <div className={cn("inline-flex flex-col items-center gap-2", positionClasses)}>
      {/* Speed Dial Menu Actions */}
      {hasSpeedDial && open && (
        <div className="flex flex-col-reverse items-center gap-2 mb-2 animate-in fade-in-0 slide-in-from-bottom-2">
          {actions?.map((act) => (
            <div key={act.id} className="flex items-center gap-2">
              <span className="rounded-md border border-border bg-popover px-2 py-1 text-[11px] font-semibold text-popover-foreground shadow-md select-none">
                {act.label}
              </span>
              <button
                type="button"
                onClick={() => {
                  act.onClick()
                  setOpen(false)
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md hover:bg-accent hover:text-accent-foreground transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={act.label}
              >
                {act.icon}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main Trigger FAB */}
      <button
        type="button"
        disabled={disabled || loading}
        aria-label={label}
        aria-expanded={hasSpeedDial ? open : undefined}
        aria-haspopup={hasSpeedDial ? "menu" : undefined}
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center shadow-xl transition-all duration-200 outline-none select-none",
          "bg-teal-600 text-white hover:bg-teal-700 active:scale-95",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          extended ? "h-11 px-5 rounded-full gap-2 text-xs font-bold" : "h-12 w-12 rounded-full",
          (disabled || loading) && "opacity-50 pointer-events-none cursor-not-allowed",
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : hasSpeedDial && open ? (
          <X className="h-5 w-5" />
        ) : (
          icon
        )}
        {extended && <span>{label}</span>}
      </button>
    </div>
  )
}

// Alias FAB
export { FloatingActionButton as FAB }
