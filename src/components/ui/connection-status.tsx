import * as React from "react"
import { cn } from "@/lib/utils"
import { Wifi, WifiOff, RefreshCw, AlertTriangle } from "lucide-react"

export type ConnectionState =
  | "connected"
  | "connecting"
  | "disconnected"
  | "reconnecting"
  | "offline"
  | "error"

export interface ConnectionStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  status: ConnectionState
  label?: string
  latency?: string | number
  onRetry?: () => void
  isRetrying?: boolean
  variant?: "badge" | "card" | "inline"
}

const connectionConfig: Record<
  ConnectionState,
  {
    name: string
    dotClass: string
    bgClass: string
    borderClass: string
    icon: React.ComponentType<{ className?: string }>
    spinIcon?: boolean
  }
> = {
  connected: {
    name: "Connected",
    dotClass: "bg-emerald-500",
    bgClass: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    borderClass: "border-emerald-500/20",
    icon: Wifi,
  },
  connecting: {
    name: "Connecting...",
    dotClass: "bg-sky-500",
    bgClass: "bg-sky-500/10 text-sky-700 dark:text-sky-400",
    borderClass: "border-sky-500/20",
    icon: RefreshCw,
    spinIcon: true,
  },
  reconnecting: {
    name: "Reconnecting...",
    dotClass: "bg-amber-500",
    bgClass: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
    borderClass: "border-amber-500/20",
    icon: RefreshCw,
    spinIcon: true,
  },
  disconnected: {
    name: "Disconnected",
    dotClass: "bg-muted-foreground",
    bgClass: "bg-muted/80 text-muted-foreground",
    borderClass: "border-border",
    icon: WifiOff,
  },
  offline: {
    name: "Offline",
    dotClass: "bg-rose-500",
    bgClass: "bg-rose-500/10 text-rose-700 dark:text-rose-400",
    borderClass: "border-rose-500/20",
    icon: WifiOff,
  },
  error: {
    name: "Connection Error",
    dotClass: "bg-rose-600",
    bgClass: "bg-rose-600/10 text-rose-700 dark:text-rose-400",
    borderClass: "border-rose-600/20",
    icon: AlertTriangle,
  },
}

export const ConnectionStatus = React.forwardRef<HTMLDivElement, ConnectionStatusProps>(
  (
    {
      status,
      label,
      latency,
      onRetry,
      isRetrying = false,
      variant = "badge",
      className,
      ...props
    },
    ref
  ) => {
    const config = connectionConfig[status] ?? connectionConfig.disconnected
    const Icon = config.icon
    const displayLabel = label ?? config.name
    const showRetry = Boolean(
      onRetry && (status === "disconnected" || status === "offline" || status === "error")
    )

    if (variant === "card") {
      return (
        <div
          ref={ref}
          role="status"
          aria-live="polite"
          className={cn(
            "rounded-xl border p-4 shadow-xs flex items-center justify-between gap-4 bg-card",
            config.borderClass,
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "p-2 rounded-lg flex items-center justify-center shrink-0",
                config.bgClass
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4",
                  config.spinIcon && "animate-spin motion-reduce:animate-none"
                )}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-foreground">{displayLabel}</span>
                {latency !== undefined && (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-muted text-muted-foreground">
                    {typeof latency === "number" ? `${latency}ms` : latency}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {status === "connected"
                  ? "Realtime socket synchronized."
                  : status === "reconnecting" || status === "connecting"
                  ? "Negotiating transport handshake..."
                  : "Server unreachable. Check network connectivity."}
              </p>
            </div>
          </div>

          {showRetry && (
            <button
              type="button"
              onClick={onRetry}
              disabled={isRetrying}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md border border-border bg-background hover:bg-muted transition-colors shadow-xs"
            >
              <RefreshCw
                className={cn(
                  "h-3 w-3",
                  isRetrying && "animate-spin motion-reduce:animate-none"
                )}
              />
              {isRetrying ? "Retrying..." : "Retry"}
            </button>
          )}
        </div>
      )
    }

    if (variant === "inline") {
      return (
        <div
          ref={ref}
          role="status"
          aria-live="polite"
          className={cn("inline-flex items-center gap-2 text-xs", className)}
          {...props}
        >
          <span className={cn("h-2 w-2 rounded-full shrink-0", config.dotClass)} />
          <span className="font-medium text-foreground">{displayLabel}</span>
          {latency !== undefined && (
            <span className="text-[11px] font-mono text-muted-foreground">
              ({typeof latency === "number" ? `${latency}ms` : latency})
            </span>
          )}
          {showRetry && (
            <button
              type="button"
              onClick={onRetry}
              disabled={isRetrying}
              className="text-[11px] underline text-primary font-medium hover:opacity-80"
            >
              {isRetrying ? "Retrying..." : "Retry"}
            </button>
          )}
        </div>
      )
    }

    // Default: "badge"
    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border shadow-xs transition-colors",
          config.bgClass,
          config.borderClass,
          className
        )}
        {...props}
      >
        <Icon
          className={cn(
            "h-3.5 w-3.5 shrink-0",
            config.spinIcon && "animate-spin motion-reduce:animate-none"
          )}
        />
        <span>{displayLabel}</span>
        {latency !== undefined && (
          <span className="font-mono text-[10px] opacity-80">
            {typeof latency === "number" ? `${latency}ms` : latency}
          </span>
        )}
        {showRetry && (
          <button
            type="button"
            onClick={onRetry}
            disabled={isRetrying}
            className="ml-1 text-[10px] underline font-bold hover:opacity-80 cursor-pointer"
          >
            Retry
          </button>
        )}
      </div>
    )
  }
)

ConnectionStatus.displayName = "ConnectionStatus"
