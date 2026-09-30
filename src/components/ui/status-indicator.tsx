import * as React from "react"
import { cn } from "@/lib/utils"
import { Check, AlertTriangle, XCircle, Clock, CircleDot } from "lucide-react"

export type StatusType =
  | "online"
  | "offline"
  | "active"
  | "inactive"
  | "success"
  | "warning"
  | "error"
  | "pending"
  | "neutral"

export interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: StatusType
  label?: React.ReactNode
  showLabel?: boolean
  size?: "sm" | "md" | "lg"
  pulse?: boolean
  showIcon?: boolean
}

const statusConfig: Record<
  StatusType,
  {
    name: string
    dotClass: string
    pingClass: string
    textClass: string
    defaultIcon: React.ComponentType<{ className?: string }>
  }
> = {
  online: {
    name: "Online",
    dotClass: "bg-emerald-500",
    pingClass: "bg-emerald-400",
    textClass: "text-emerald-700 dark:text-emerald-400",
    defaultIcon: Check,
  },
  active: {
    name: "Active",
    dotClass: "bg-emerald-500",
    pingClass: "bg-emerald-400",
    textClass: "text-emerald-700 dark:text-emerald-400",
    defaultIcon: Check,
  },
  success: {
    name: "Success",
    dotClass: "bg-emerald-600",
    pingClass: "bg-emerald-400",
    textClass: "text-emerald-700 dark:text-emerald-400",
    defaultIcon: Check,
  },
  warning: {
    name: "Warning",
    dotClass: "bg-amber-500",
    pingClass: "bg-amber-400",
    textClass: "text-amber-700 dark:text-amber-400",
    defaultIcon: AlertTriangle,
  },
  error: {
    name: "Error",
    dotClass: "bg-rose-500",
    pingClass: "bg-rose-400",
    textClass: "text-rose-700 dark:text-rose-400",
    defaultIcon: XCircle,
  },
  offline: {
    name: "Offline",
    dotClass: "bg-rose-400 dark:bg-rose-600",
    pingClass: "bg-rose-400",
    textClass: "text-rose-700 dark:text-rose-400",
    defaultIcon: XCircle,
  },
  pending: {
    name: "Pending",
    dotClass: "bg-sky-500",
    pingClass: "bg-sky-400",
    textClass: "text-sky-700 dark:text-sky-400",
    defaultIcon: Clock,
  },
  inactive: {
    name: "Inactive",
    dotClass: "bg-muted-foreground/60",
    pingClass: "bg-muted-foreground/40",
    textClass: "text-muted-foreground",
    defaultIcon: CircleDot,
  },
  neutral: {
    name: "Neutral",
    dotClass: "bg-muted-foreground/60",
    pingClass: "bg-muted-foreground/40",
    textClass: "text-muted-foreground",
    defaultIcon: CircleDot,
  },
}

const sizeConfig = {
  sm: { dot: "h-2 w-2", icon: "h-3 w-3", text: "text-xs" },
  md: { dot: "h-2.5 w-2.5", icon: "h-3.5 w-3.5", text: "text-xs" },
  lg: { dot: "h-3 w-3", icon: "h-4 w-4", text: "text-sm" },
}

export const StatusIndicator = React.forwardRef<HTMLDivElement, StatusIndicatorProps>(
  (
    {
      status,
      label,
      showLabel = true,
      size = "md",
      pulse = true,
      showIcon = false,
      className,
      ...props
    },
    ref
  ) => {
    const config = statusConfig[status] ?? statusConfig.neutral
    const sizes = sizeConfig[size]
    const displayText = label ?? config.name
    const IconComp = config.defaultIcon

    // Only pulse online, active, or pending by default unless pulse prop explicitly provided
    const shouldPulse =
      pulse && (status === "online" || status === "active" || status === "pending")

    return (
      <div
        ref={ref}
        role="status"
        className={cn("inline-flex items-center gap-2", className)}
        {...props}
      >
        {showIcon ? (
          <IconComp className={cn(sizes.icon, config.textClass, "shrink-0")} />
        ) : (
          <span className="relative flex shrink-0 items-center justify-center">
            {shouldPulse && (
              <span
                className={cn(
                  "absolute inline-flex rounded-full opacity-75 animate-ping motion-reduce:animate-none",
                  sizes.dot,
                  config.pingClass
                )}
              />
            )}
            <span
              className={cn(
                "relative inline-flex rounded-full shadow-xs",
                sizes.dot,
                config.dotClass
              )}
            />
          </span>
        )}

        {showLabel && (
          <span className={cn(sizes.text, "font-medium text-foreground select-none")}>
            {displayText}
          </span>
        )}

        {/* Screen reader fallback ensuring state is not conveyed by color alone */}
        <span className="sr-only">Status: {config.name}</span>
      </div>
    )
  }
)

StatusIndicator.displayName = "StatusIndicator"
