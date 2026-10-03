"use client"

import * as React from "react"
import {
  GitCommit,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowRight,
  Loader2,
  XCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type MachineState = "idle" | "loading" | "success" | "error"
export type MachineEvent = "FETCH" | "RESOLVE" | "REJECT" | "RESET" | "RETRY"

export interface StateTransitionLog {
  id: string
  from: MachineState
  event: MachineEvent
  to: MachineState
  timestamp: string
}

export interface StateMachineVisualizerProps extends React.HTMLAttributes<HTMLDivElement> {
  initialState?: MachineState
  onTransition?: (from: MachineState, event: MachineEvent, to: MachineState) => void
}

// Allowed finite state transitions definition
const STATE_TRANSITIONS: Record<MachineState, Partial<Record<MachineEvent, MachineState>>> = {
  idle: {
    FETCH: "loading",
  },
  loading: {
    RESOLVE: "success",
    REJECT: "error",
    RESET: "idle",
  },
  success: {
    FETCH: "loading",
    RESET: "idle",
  },
  error: {
    RETRY: "loading",
    RESET: "idle",
  },
}

const STATE_CONFIG: Record<
  MachineState,
  { label: string; description: string; color: string; border: string; bg: string }
> = {
  idle: {
    label: "IDLE",
    description: "Component mounted, waiting for user trigger",
    color: "text-slate-600 dark:text-slate-300",
    border: "border-slate-400/40",
    bg: "bg-slate-500/10",
  },
  loading: {
    label: "LOADING",
    description: "Asynchronous task or network payload in-flight",
    color: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500/50",
    bg: "bg-blue-500/15",
  },
  success: {
    label: "SUCCESS",
    description: "Payload validated and view rendered cleanly",
    color: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/50",
    bg: "bg-emerald-500/15",
  },
  error: {
    label: "ERROR",
    description: "Exception caught, recovery options presented",
    color: "text-rose-600 dark:text-rose-400",
    border: "border-rose-500/50",
    bg: "bg-rose-500/15",
  },
}

export const StateMachineVisualizer = React.forwardRef<HTMLDivElement, StateMachineVisualizerProps>(
  (
    {
      initialState = "idle",
      onTransition,
      className,
      ...props
    },
    ref
  ) => {
    const [currentState, setCurrentState] = React.useState<MachineState>(initialState)
    const [history, setHistory] = React.useState<StateTransitionLog[]>([])

    const allowedEvents = React.useMemo(() => {
      const transitions = STATE_TRANSITIONS[currentState]
      return Object.keys(transitions) as MachineEvent[]
    }, [currentState])

    const dispatchEvent = (evt: MachineEvent) => {
      const targetState = STATE_TRANSITIONS[currentState][evt]
      if (!targetState) return

      const logItem: StateTransitionLog = {
        id: `tx-${Date.now()}`,
        from: currentState,
        event: evt,
        to: targetState,
        timestamp: new Date().toLocaleTimeString(),
      }

      setHistory((prev) => [logItem, ...prev.slice(0, 7)])
      setCurrentState(targetState)
      onTransition?.(currentState, evt, targetState)
    }

    const handleResetAll = () => {
      setCurrentState("idle")
      setHistory([])
    }

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Finite State Machine Visualizer"
        className={cn(
          "w-full rounded-xl border border-border bg-card shadow-2xs p-4 space-y-4 select-none",
          className
        )}
        {...props}
      >
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-primary/10 text-primary">
              <GitCommit className="h-4 w-4" />
            </span>
            <div>
              <h4 className="font-semibold text-foreground">Finite State Machine Visualizer</h4>
              <p className="text-[11px] text-muted-foreground">
                Predictable UI lifecycle modeling with explicit state transitions and event guards
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetAll}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-background hover:bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="h-3 w-3" /> Reset Machine
          </button>
        </div>

        {/* State Node Graph Visualizer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(["idle", "loading", "success", "error"] as MachineState[]).map((st) => {
            const isCurrent = currentState === st
            const conf = STATE_CONFIG[st]

            return (
              <div
                key={st}
                className={cn(
                  "p-4 rounded-xl border transition-all duration-200 space-y-2 relative overflow-hidden",
                  isCurrent
                    ? "border-primary bg-card shadow-md ring-2 ring-primary/20 scale-[1.02]"
                    : "border-border/60 bg-muted/20 opacity-60"
                )}
              >
                {/* Active Indicator Pulse */}
                {isCurrent && (
                  <span className="absolute top-2 right-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                )}

                <div className="flex items-center gap-1.5">
                  <span className={cn("px-2 py-0.5 rounded font-mono font-bold text-xs uppercase", conf.bg, conf.color)}>
                    {conf.label}
                  </span>
                </div>

                <p className="text-[11px] text-muted-foreground leading-snug">
                  {conf.description}
                </p>

                {isCurrent && (
                  <span className="text-[10px] font-mono text-primary font-bold block pt-1 border-t border-border/60">
                    ● ACTIVE STATE
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {/* Event Dispatcher Action Bar */}
        <div className="p-3.5 rounded-xl border border-border bg-muted/30 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-foreground">
              Allowed Transition Triggers from <strong className="uppercase font-mono text-primary">{currentState}</strong>:
            </span>
            <span className="text-[10px] text-muted-foreground font-mono">
              Deterministic Guard
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {(["FETCH", "RESOLVE", "REJECT", "RETRY", "RESET"] as MachineEvent[]).map((evt) => {
              const isAllowed = allowedEvents.includes(evt)

              return (
                <button
                  key={evt}
                  type="button"
                  disabled={!isAllowed}
                  onClick={() => dispatchEvent(evt)}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-xs font-bold transition-all shadow-xs",
                    isAllowed
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
                      : "bg-muted text-muted-foreground/40 border border-border/50 cursor-not-allowed"
                  )}
                >
                  <Play className="h-3 w-3" /> {evt}
                </button>
              )
            })}
          </div>
        </div>

        {/* State Transition History Log */}
        <div className="space-y-1.5">
          <span className="font-mono text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
            Transition History Log ({history.length})
          </span>

          <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
            {history.length === 0 ? (
              <p className="text-xs text-muted-foreground italic py-2">
                No events dispatched yet. Click any enabled trigger above.
              </p>
            ) : (
              history.map((tx) => (
                <div
                  key={tx.id}
                  className="p-2 rounded-lg bg-background border border-border/70 flex items-center justify-between text-xs font-mono"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground uppercase">{tx.from}</span>
                    <ArrowRight className="h-3 w-3 text-primary" />
                    <span className="px-1.5 py-0.2 rounded bg-primary/10 text-primary font-bold">
                      {tx.event}
                    </span>
                    <ArrowRight className="h-3 w-3 text-primary" />
                    <span className="font-bold text-foreground uppercase">{tx.to}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{tx.timestamp}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    )
  }
)

StateMachineVisualizer.displayName = "StateMachineVisualizer"
