"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Workflow,
  Plus,
  Trash2,
  Settings,
  ChevronDown,
  ChevronUp,
  ArrowDown,
  CheckCircle2,
  Clock,
  Send,
  Zap,
  Filter,
  Webhook,
  Split,
  Edit2,
  AlertCircle,
} from "lucide-react"

export type WorkflowStepType = "trigger" | "filter" | "action" | "delay" | "webhook" | "branch"

export interface WorkflowStep {
  id: string
  title: string
  type: WorkflowStepType
  description?: string
  config?: Record<string, string>
  isEnabled?: boolean
  branches?: {
    trueStepId?: string
    falseStepId?: string
  }
}

export interface WorkflowBuilderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  initialSteps?: WorkflowStep[]
  onChange?: (steps: WorkflowStep[]) => void
  onSelectStep?: (step: WorkflowStep | null) => void
  readOnly?: boolean
}

const STEP_ICONS: Record<WorkflowStepType, React.ElementType> = {
  trigger: Zap,
  filter: Filter,
  action: Send,
  delay: Clock,
  webhook: Webhook,
  branch: Split,
}

const STEP_BADGE_COLORS: Record<WorkflowStepType, string> = {
  trigger: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  filter: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  action: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  delay: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  webhook: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  branch: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
}

export const WorkflowBuilder = React.forwardRef<HTMLDivElement, WorkflowBuilderProps>(
  (
    {
      className,
      initialSteps = [
        {
          id: "step-1",
          title: "New User Registered",
          type: "trigger",
          description: "Runs automatically when auth webhook fires",
          isEnabled: true,
          config: { event: "auth.user.created", source: "Supabase Webhook" },
        },
        {
          id: "step-2",
          title: "Verify Work Email Domain",
          type: "filter",
          description: "Check if email is not personal Gmail/Yahoo",
          isEnabled: true,
          config: { rule: "domain != 'gmail.com'", operator: "matches_regex" },
        },
        {
          id: "step-3",
          title: "Wait 15 Minutes",
          type: "delay",
          description: "Allow welcome onboarding email to settle",
          isEnabled: true,
          config: { duration: "15m", behavior: "pause_execution" },
        },
        {
          id: "step-4",
          title: "Send Slack Team Notification",
          type: "action",
          description: "Notify #sales-leads channel via webhook",
          isEnabled: true,
          config: { channel: "#sales-leads", botName: "LeadNotifier" },
        },
      ],
      onChange,
      onSelectStep,
      readOnly = false,
      ...props
    },
    ref
  ) => {
    const [steps, setSteps] = React.useState<WorkflowStep[]>(initialSteps)
    const [selectedStepId, setSelectedStepId] = React.useState<string | null>("step-1")
    const [showAddMenu, setShowAddMenu] = React.useState(false)

    const updateSteps = (next: WorkflowStep[]) => {
      setSteps(next)
      onChange?.(next)
    }

    const selectedStep = steps.find((s) => s.id === selectedStepId) || null

    const handleSelectStep = (step: WorkflowStep) => {
      setSelectedStepId(step.id)
      onSelectStep?.(step)
    }

    const handleAddStep = (type: WorkflowStepType) => {
      const id = `step-${Date.now()}`
      const newStep: WorkflowStep = {
        id,
        title:
          type === "action"
            ? "Execute HTTP Request"
            : type === "filter"
            ? "Condition Filter"
            : type === "delay"
            ? "Pause Execution"
            : type === "webhook"
            ? "Outbound Webhook"
            : "Branch Condition",
        type,
        description: `Configured ${type} pipeline step`,
        isEnabled: true,
        config: { status: "ready" },
      }
      const next = [...steps, newStep]
      updateSteps(next)
      setSelectedStepId(id)
      setShowAddMenu(false)
    }

    const handleDeleteStep = (id: string) => {
      if (readOnly) return
      const next = steps.filter((s) => s.id !== id)
      updateSteps(next)
      if (selectedStepId === id) {
        setSelectedStepId(next[0]?.id || null)
      }
    }

    const handleMoveStep = (index: number, direction: "up" | "down") => {
      if (readOnly) return
      const targetIndex = direction === "up" ? index - 1 : index + 1
      if (targetIndex < 0 || targetIndex >= steps.length) return
      const updated = [...steps]
      const [moved] = updated.splice(index, 1)
      updated.splice(targetIndex, 0, moved)
      updateSteps(updated)
    }

    const handleToggleEnabled = (id: string) => {
      if (readOnly) return
      const next = steps.map((s) =>
        s.id === id ? { ...s, isEnabled: s.isEnabled === false ? true : false } : s
      )
      updateSteps(next)
    }

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Automation Workflow Builder"
        className={cn(
          "flex flex-col rounded-xl border border-border bg-card text-card-foreground shadow-xs overflow-hidden select-none",
          className
        )}
        {...props}
      >
        {/* Header Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/20 p-3 sm:px-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Workflow className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-xs font-bold text-foreground">Workflow Builder</h3>
              <p className="text-[10px] text-muted-foreground">
                Sequential automation pipeline configuration (Client-side demonstration)
              </p>
            </div>
          </div>

          {!readOnly && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowAddMenu(!showAddMenu)}
                className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-2xs hover:bg-primary/90 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Step</span>
              </button>

              {/* Add Step Dropdown Menu */}
              {showAddMenu && (
                <div className="absolute right-0 top-full mt-1.5 w-48 rounded-xl border border-border bg-popover p-1 shadow-lg z-30 space-y-0.5">
                  {(["action", "filter", "delay", "webhook", "branch"] as const).map((type) => {
                    const Icon = STEP_ICONS[type]
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleAddStep(type)}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-foreground hover:bg-muted transition-colors capitalize text-left"
                      >
                        <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>{type} Step</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Builder Body: Two column layout (Steps stream & Parameter inspector) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border min-h-[380px]">
          {/* Left Column: Visual Pipeline Flow */}
          <div className="lg:col-span-2 p-6 overflow-y-auto space-y-3 bg-muted/10">
            {steps.map((step, idx) => {
              const Icon = STEP_ICONS[step.type] || Zap
              const badgeStyle = STEP_BADGE_COLORS[step.type] || "bg-muted text-muted-foreground"
              const isSelected = selectedStepId === step.id
              const isFirst = idx === 0
              const isLast = idx === steps.length - 1

              return (
                <React.Fragment key={step.id}>
                  {/* Step Card */}
                  <div
                    onClick={() => handleSelectStep(step)}
                    className={cn(
                      "group relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border p-4 transition-all cursor-pointer",
                      isSelected
                        ? "border-primary bg-card shadow-sm ring-2 ring-primary/30"
                        : "border-border bg-card/80 hover:border-primary/40 hover:bg-card",
                      step.isEnabled === false && "opacity-50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {/* Step index badge */}
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[10px] font-mono font-bold text-muted-foreground shrink-0">
                        {idx + 1}
                      </span>

                      {/* Icon */}
                      <span className={cn("p-2 rounded-lg border shrink-0", badgeStyle)}>
                        <Icon className="h-4 w-4" />
                      </span>

                      {/* Details */}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-foreground">{step.title}</h4>
                          <span
                            className={cn(
                              "rounded px-1.5 py-0.2 text-[9px] font-mono font-semibold uppercase tracking-wider border",
                              badgeStyle
                            )}
                          >
                            {step.type}
                          </span>
                        </div>
                        {step.description && (
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            {step.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Step Action Controls */}
                    {!readOnly && (
                      <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
                        <button
                          type="button"
                          disabled={isFirst}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleMoveStep(idx, "up")
                          }}
                          aria-label={`Move ${step.title} up`}
                          className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
                        >
                          <ChevronUp className="h-3.5 w-3.5" />
                        </button>

                        <button
                          type="button"
                          disabled={isLast}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleMoveStep(idx, "down")
                          }}
                          aria-label={`Move ${step.title} down`}
                          className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
                        >
                          <ChevronDown className="h-3.5 w-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteStep(step.id)
                          }}
                          aria-label={`Delete ${step.title}`}
                          className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors ml-1"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Connecting Arrow between steps */}
                  {!isLast && (
                    <div className="flex justify-center py-0.5">
                      <div className="flex flex-col items-center text-muted-foreground/60">
                        <div className="h-3 w-[2px] bg-border" />
                        <ArrowDown className="h-3 w-3 -mt-1 text-muted-foreground" />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              )
            })}
          </div>

          {/* Right Column: Step Parameter Inspector */}
          <div className="p-5 space-y-4 bg-card">
            <div className="flex items-center justify-between border-b border-border pb-2.5">
              <span className="text-xs font-bold text-foreground">Step Inspector</span>
              {selectedStep && (
                <span className="text-[10px] font-mono text-primary font-semibold uppercase">
                  {selectedStep.type}
                </span>
              )}
            </div>

            {selectedStep ? (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                    Step Name
                  </label>
                  <input
                    type="text"
                    value={selectedStep.title}
                    disabled={readOnly}
                    onChange={(e) => {
                      const next = steps.map((s) =>
                        s.id === selectedStep.id ? { ...s, title: e.target.value } : s
                      )
                      updateSteps(next)
                    }}
                    className="h-8 w-full rounded-md border border-input bg-background px-2.5 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={selectedStep.description || ""}
                    disabled={readOnly}
                    onChange={(e) => {
                      const next = steps.map((s) =>
                        s.id === selectedStep.id ? { ...s, description: e.target.value } : s
                      )
                      updateSteps(next)
                    }}
                    className="w-full rounded-md border border-input bg-background p-2 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                  />
                </div>

                {/* Parameters Key-Values */}
                {selectedStep.config && (
                  <div className="space-y-2 pt-2 border-t border-border">
                    <span className="text-[11px] font-semibold text-muted-foreground block">
                      Configuration Properties
                    </span>
                    {Object.entries(selectedStep.config).map(([key, val]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-2 rounded-md bg-muted/40 text-[11px]"
                      >
                        <span className="font-mono text-muted-foreground">{key}</span>
                        <span className="font-mono font-semibold text-foreground truncate max-w-[140px]">
                          {val}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Active Toggle */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-[11px] font-medium text-foreground">Step Enabled</span>
                  <button
                    type="button"
                    disabled={readOnly}
                    onClick={() => handleToggleEnabled(selectedStep.id)}
                    className={cn(
                      "px-2.5 py-1 rounded text-[10px] font-semibold transition-colors",
                      selectedStep.isEnabled !== false
                        ? "bg-emerald-600 text-white"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {selectedStep.isEnabled !== false ? "Active" : "Disabled"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-center text-xs text-muted-foreground">
                <Settings className="h-6 w-6 text-muted-foreground/40 mb-2" />
                <span>Select a workflow step to configure its parameters.</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer info bar */}
        <div className="flex items-center justify-between border-t border-border bg-muted/20 px-4 py-2 text-[11px] text-muted-foreground">
          <span>{steps.length} sequential execution stages</span>
          <span>Simulation Configuration</span>
        </div>
      </div>
    )
  }
)
WorkflowBuilder.displayName = "WorkflowBuilder"
