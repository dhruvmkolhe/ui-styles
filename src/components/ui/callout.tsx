"use client"

import * as React from "react"
import { AlertCircle, AlertTriangle, CheckCircle2, Info, Lightbulb, X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const calloutVariants = cva(
  "relative w-full rounded-r-lg border-l-4 p-4 text-xs transition-colors duration-200",
  {
    variants: {
      variant: {
        info: "border-l-sky-500 bg-sky-500/10 text-sky-950 dark:text-sky-200 [&>div>svg]:text-sky-600 dark:[&>div>svg]:text-sky-400",
        success: "border-l-emerald-500 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200 [&>div>svg]:text-emerald-600 dark:[&>div>svg]:text-emerald-400",
        warning: "border-l-amber-500 bg-amber-500/10 text-amber-950 dark:text-amber-200 [&>div>svg]:text-amber-600 dark:[&>div>svg]:text-amber-400",
        destructive: "border-l-rose-500 bg-rose-500/10 text-rose-950 dark:text-rose-200 [&>div>svg]:text-rose-600 dark:[&>div>svg]:text-rose-400",
        neutral: "border-l-foreground/40 bg-muted/50 text-foreground [&>div>svg]:text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
)

const CALLOUT_ICONS = {
  info: Lightbulb,
  success: CheckCircle2,
  warning: AlertTriangle,
  destructive: AlertCircle,
  neutral: Info,
}

export interface CalloutProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof calloutVariants> {
  title?: React.ReactNode
  icon?: React.ReactNode | boolean
  action?: React.ReactNode
  dismissible?: boolean
  onDismiss?: () => void
}

export function Callout({
  className,
  variant = "info",
  title,
  icon = true,
  action,
  dismissible = false,
  onDismiss,
  children,
  ...props
}: CalloutProps) {
  const [open, setOpen] = React.useState(true)

  if (!open) return null

  const safeVariant = variant || "info"
  const IconComp = CALLOUT_ICONS[safeVariant]

  const handleDismiss = () => {
    setOpen(false)
    onDismiss?.()
  }

  return (
    <aside
      aria-label={typeof title === "string" ? title : "Callout note"}
      className={cn(calloutVariants({ variant: safeVariant }), className)}
      {...props}
    >
      <div className="flex items-start gap-3">
        {icon !== false && (
          <div className="mt-0.5 shrink-0">
            {React.isValidElement(icon) ? icon : <IconComp className="h-4 w-4" />}
          </div>
        )}

        <div className="flex-1 space-y-1">
          {title && <h5 className="font-bold text-xs uppercase tracking-wider">{title}</h5>}
          <div className="leading-relaxed opacity-90">{children}</div>
          {action && <div className="pt-2">{action}</div>}
        </div>

        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss callout"
            className="shrink-0 -mr-1 -mt-1 p-1 rounded-md opacity-60 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </aside>
  )
}
