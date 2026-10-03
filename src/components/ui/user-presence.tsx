"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Check, ChevronDown, Clock, MinusCircle, Moon, Video, Circle, Smile } from "lucide-react"

export type PresenceStatus = "online" | "busy" | "away" | "offline" | "in-meeting"

export interface PresenceConfig {
  id: PresenceStatus
  label: string
  description: string
  color: string
  ringColor: string
  icon: React.ElementType
}

export const PRESENCE_CONFIGS: Record<PresenceStatus, PresenceConfig> = {
  online: {
    id: "online",
    label: "Online",
    description: "Active and available for messages",
    color: "bg-emerald-500",
    ringColor: "ring-emerald-500/20 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
    icon: Circle,
  },
  busy: {
    id: "busy",
    label: "Busy / Do Not Disturb",
    description: "Mutes desktop notifications",
    color: "bg-rose-500",
    ringColor: "ring-rose-500/20 text-rose-600 dark:text-rose-400 bg-rose-500/10",
    icon: MinusCircle,
  },
  away: {
    id: "away",
    label: "Away",
    description: "Inactive for more than 15 minutes",
    color: "bg-amber-500",
    ringColor: "ring-amber-500/20 text-amber-600 dark:text-amber-400 bg-amber-500/10",
    icon: Clock,
  },
  "in-meeting": {
    id: "in-meeting",
    label: "In a Meeting",
    description: "In a scheduled calendar sync or call",
    color: "bg-indigo-500",
    ringColor: "ring-indigo-500/20 text-indigo-600 dark:text-indigo-400 bg-indigo-500/10",
    icon: Video,
  },
  offline: {
    id: "offline",
    label: "Offline",
    description: "Not connected or appearing invisible",
    color: "bg-slate-400",
    ringColor: "ring-slate-400/20 text-slate-500 dark:text-slate-400 bg-slate-500/10",
    icon: Moon,
  },
}

export interface UserPresenceProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  status?: PresenceStatus
  onChangeStatus?: (status: PresenceStatus, customMessage?: string) => void
  customMessage?: string
  userName?: string
  userAvatar?: string
  userRole?: string
  variant?: "badge" | "pill" | "selector" | "detailed"
  size?: "sm" | "md" | "lg"
  interactive?: boolean
}

export const UserPresence = React.forwardRef<HTMLDivElement, UserPresenceProps>(
  (
    {
      className,
      status: controlledStatus = "online",
      onChangeStatus,
      customMessage = "Reviewing Batch 13 components",
      userName = "Dhruv Kolhe",
      userRole = "Senior Architect",
      variant = "pill",
      size = "md",
      interactive = false,
      ...props
    },
    ref
  ) => {
    const [currentStatus, setCurrentStatus] = React.useState<PresenceStatus>(controlledStatus)
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const [statusNote, setStatusNote] = React.useState(customMessage)
    const menuRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
      setCurrentStatus(controlledStatus)
    }, [controlledStatus])

    // Click outside listener for selector dropdown
    React.useEffect(() => {
      const handleOutsideClick = (e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
          setIsMenuOpen(false)
        }
      }
      if (isMenuOpen) {
        document.addEventListener("mousedown", handleOutsideClick)
      }
      return () => document.removeEventListener("mousedown", handleOutsideClick)
    }, [isMenuOpen])

    const config = PRESENCE_CONFIGS[currentStatus] || PRESENCE_CONFIGS.online

    const handleSelectStatus = (newStatus: PresenceStatus) => {
      setCurrentStatus(newStatus)
      onChangeStatus?.(newStatus, statusNote)
      setIsMenuOpen(false)
    }

    // Size variants
    const dotSizes = {
      sm: "h-2 w-2",
      md: "h-2.5 w-2.5",
      lg: "h-3.5 w-3.5",
    }

    // 1. Badge Variant
    if (variant === "badge") {
      return (
        <span
          ref={ref}
          role="status"
          aria-label={`Presence: ${config.label}`}
          className={cn(
            "relative inline-flex rounded-full ring-2 ring-background transition-colors",
            dotSizes[size],
            config.color,
            className
          )}
          title={`Presence: ${config.label}`}
          {...props}
        />
      )
    }

    // 2. Pill Variant
    if (variant === "pill") {
      return (
        <div
          ref={ref}
          role="status"
          className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-border/80 shadow-2xs transition-colors",
            config.ringColor,
            className
          )}
          {...props}
        >
          <span className={cn("rounded-full shrink-0", dotSizes[size], config.color)} />
          <span>{config.label}</span>
        </div>
      )
    }

    // 3. Detailed Card Variant
    if (variant === "detailed") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center gap-3 p-3 rounded-xl border border-border bg-card text-card-foreground shadow-xs",
            className
          )}
          {...props}
        >
          {/* Avatar with anchored badge */}
          <div className="relative shrink-0">
            <div className="h-11 w-11 rounded-full bg-primary/10 border border-border flex items-center justify-center font-bold text-sm text-primary">
              {userName.slice(0, 2).toUpperCase()}
            </div>
            <span
              role="status"
              aria-label={config.label}
              className={cn(
                "absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full ring-2 ring-background",
                config.color
              )}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold truncate text-foreground">{userName}</span>
              <span className="text-[11px] text-muted-foreground">• {userRole}</span>
            </div>

            <div className="flex items-center gap-1.5 mt-0.5 text-xs text-muted-foreground truncate">
              <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", config.color)} />
              <span className="font-medium text-foreground/80">{config.label}</span>
              {statusNote && (
                <>
                  <span className="text-muted-foreground/60">—</span>
                  <span className="italic truncate text-muted-foreground">{statusNote}</span>
                </>
              )}
            </div>
          </div>
        </div>
      )
    }

    // 4. Selector Variant (Interactive Status Dropdown)
    return (
      <div ref={menuRef} className={cn("relative inline-block text-left", className)}>
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium text-foreground hover:bg-muted/60 transition-colors shadow-2xs focus:outline-hidden focus:ring-1 focus:ring-ring"
          aria-expanded={isMenuOpen}
          aria-haspopup="true"
        >
          <span className={cn("rounded-full shrink-0", dotSizes[size], config.color)} />
          <span>{config.label}</span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground transition-transform duration-200" />
        </button>

        {isMenuOpen && (
          <div className="absolute left-0 mt-1.5 w-64 rounded-xl border border-border bg-popover text-popover-foreground shadow-lg z-50 p-1.5 space-y-1 animate-in fade-in-50 zoom-in-95">
            <div className="px-2 py-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Set Presence Status
            </div>

            {(Object.keys(PRESENCE_CONFIGS) as PresenceStatus[]).map((key) => {
              const item = PRESENCE_CONFIGS[key]
              const isSelected = item.id === currentStatus
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectStatus(item.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors",
                    isSelected ? "bg-accent text-accent-foreground font-semibold" : "hover:bg-muted text-foreground"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={cn("h-2.5 w-2.5 rounded-full shrink-0", item.color)} />
                    <div className="flex flex-col">
                      <span>{item.label}</span>
                      <span className="text-[10px] text-muted-foreground font-normal leading-tight">
                        {item.description}
                      </span>
                    </div>
                  </div>
                  {isSelected && <Check className="h-3.5 w-3.5 text-primary shrink-0 ml-2" />}
                </button>
              )
            })}

            {/* Custom Status Message Bar */}
            <div className="pt-2 border-t border-border mt-1 px-1">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-md border border-input bg-background/50">
                <Smile className="h-3 w-3 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder="Set custom status message..."
                  className="w-full text-[11px] bg-transparent outline-hidden text-foreground placeholder:text-muted-foreground/70"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
)

UserPresence.displayName = "UserPresence"
