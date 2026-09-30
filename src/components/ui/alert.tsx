"use client"

import * as React from "react"
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full transition-all duration-200 text-sm",
  {
    variants: {
      variant: {
        info: "border-sky-500/30 bg-sky-50/80 text-sky-950 dark:border-sky-500/20 dark:bg-sky-950/40 dark:text-sky-200 [&>svg]:text-sky-600 dark:[&>svg]:text-sky-400",
        success: "border-emerald-500/30 bg-emerald-50/80 text-emerald-950 dark:border-emerald-500/20 dark:bg-emerald-950/40 dark:text-emerald-200 [&>svg]:text-emerald-600 dark:[&>svg]:text-emerald-400",
        warning: "border-amber-500/30 bg-amber-50/80 text-amber-950 dark:border-amber-500/20 dark:bg-amber-950/40 dark:text-amber-200 [&>svg]:text-amber-600 dark:[&>svg]:text-amber-400",
        destructive: "border-destructive/40 bg-destructive/10 text-destructive dark:border-destructive/30 dark:bg-destructive/20 [&>svg]:text-destructive",
      },
      format: {
        card: "rounded-lg border p-4 shadow-xs",
        banner: "border-y py-3 px-4 sm:px-6 shadow-none",
      },
    },
    defaultVariants: {
      variant: "info",
      format: "card",
    },
  }
)

const DEFAULT_ICONS = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  destructive: AlertCircle,
}

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof alertVariants> {
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode | boolean
  dismissible?: boolean
  onDismiss?: () => void
  action?: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = "info",
      format = "card",
      title,
      description,
      icon = true,
      dismissible = false,
      onDismiss,
      action,
      open: controlledOpen,
      defaultOpen = true,
      onOpenChange,
      children,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledOpen !== undefined
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
    const isOpen = isControlled ? controlledOpen : uncontrolledOpen

    if (!isOpen) return null

    const handleDismiss = () => {
      if (!isControlled) {
        setUncontrolledOpen(false)
      }
      onDismiss?.()
      onOpenChange?.(false)
    }

    const safeVariant = variant || "info"
    const IconComponent = DEFAULT_ICONS[safeVariant]
    const isAssertive = safeVariant === "destructive"

    return (
      <div
        ref={ref}
        role={isAssertive ? "alert" : "status"}
        aria-live={isAssertive ? "assertive" : "polite"}
        className={cn(alertVariants({ variant: safeVariant, format }), className)}
        {...props}
      >
        <div className="flex items-start gap-3">
          {icon !== false && (
            <div className="mt-0.5 shrink-0">
              {React.isValidElement(icon) ? icon : <IconComponent className="h-4 w-4" />}
            </div>
          )}

          <div className="flex-1 min-w-0 space-y-1">
            {title && (
              <h5 className="font-semibold leading-tight tracking-tight">
                {title}
              </h5>
            )}
            {description && (
              <div className="text-xs leading-relaxed opacity-90 break-words">
                {description}
              </div>
            )}
            {children}
          </div>

          {action && <div className="shrink-0 ml-2">{action}</div>}

          {dismissible && (
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss alert"
              className="shrink-0 -mr-1 -mt-1 p-1 rounded-md opacity-70 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    )
  }
)
Alert.displayName = "Alert"

export { Alert, alertVariants }
