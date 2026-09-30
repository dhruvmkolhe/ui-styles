"use client"

import * as React from "react"
import { AlertCircle, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export type StepState = "completed" | "current" | "upcoming" | "error" | "disabled"

export interface StepperStep {
  id: string | number
  title: string
  description?: string
  icon?: React.ReactNode
  optional?: boolean
  error?: boolean
  disabled?: boolean
}

export interface StepperProps extends React.HTMLAttributes<HTMLElement> {
  steps: StepperStep[]
  currentStep: number // 0-indexed or 1-indexed (we will handle 0-indexed internally, with 0 as step 1)
  onStepClick?: (stepIndex: number) => void
  orientation?: "horizontal" | "vertical"
  clickableCompletedOnly?: boolean
  compactOnMobile?: boolean
}

export function Stepper({
  steps,
  currentStep,
  onStepClick,
  orientation = "horizontal",
  clickableCompletedOnly = true,
  compactOnMobile = true,
  className,
  ...props
}: StepperProps) {
  const isHorizontal = orientation === "horizontal"

  return (
    <nav
      aria-label="Progress Stepper"
      className={cn(
        "w-full",
        isHorizontal ? "flex flex-col" : "flex flex-row gap-6",
        className
      )}
      {...props}
    >
      {/* Mobile-condensed header if horizontal and compact enabled */}
      {compactOnMobile && isHorizontal && (
        <div className="flex sm:hidden items-center justify-between pb-3 text-xs border-b border-border mb-3">
          <span className="font-semibold text-foreground">
            Step {Math.min(currentStep + 1, steps.length)} of {steps.length}:{" "}
            <span className="font-normal text-muted-foreground">
              {steps[currentStep]?.title}
            </span>
          </span>
          <span className="text-[11px] font-mono text-muted-foreground">
            {Math.round(((currentStep + 1) / steps.length) * 100)}%
          </span>
        </div>
      )}

      <ol
        className={cn(
          "w-full",
          isHorizontal
            ? "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-2"
            : "flex flex-col space-y-6"
        )}
      >
        {steps.map((step, index) => {
          let state: StepState = "upcoming"
          if (step.disabled) {
            state = "disabled"
          } else if (step.error) {
            state = "error"
          } else if (index < currentStep) {
            state = "completed"
          } else if (index === currentStep) {
            state = "current"
          }

          const isClickable =
            Boolean(onStepClick) &&
            !step.disabled &&
            (!clickableCompletedOnly || index <= currentStep)

          const isLast = index === steps.length - 1

          return (
            <li
              key={step.id}
              className={cn(
                "relative flex items-center",
                isHorizontal
                  ? "flex-1 last:flex-none w-full sm:w-auto"
                  : "flex-row items-start gap-4"
              )}
            >
              <div
                className={cn(
                  "group flex items-center gap-3 w-full",
                  isClickable && "cursor-pointer"
                )}
                onClick={() => isClickable && onStepClick?.(index)}
                onKeyDown={(e) => {
                  if (isClickable && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault()
                    onStepClick?.(index)
                  }
                }}
                tabIndex={isClickable ? 0 : undefined}
                role={isClickable ? "button" : undefined}
                aria-current={state === "current" ? "step" : undefined}
                aria-label={`Step ${index + 1}: ${step.title} (${state})`}
              >
                {/* Step indicator circle / badge */}
                <div
                  className={cn(
                    "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-200 select-none",
                    state === "completed" &&
                      "bg-teal-600 text-white shadow-xs group-hover:bg-teal-700",
                    state === "current" &&
                      "border-2 border-teal-600 bg-background text-teal-600 ring-4 ring-teal-500/20 font-extrabold",
                    state === "upcoming" &&
                      "border border-border bg-muted/60 text-muted-foreground",
                    state === "error" &&
                      "border-2 border-destructive bg-destructive/10 text-destructive ring-4 ring-destructive/20",
                    state === "disabled" &&
                      "border border-border/40 bg-muted/30 text-muted-foreground/40 cursor-not-allowed"
                  )}
                >
                  {state === "completed" ? (
                    <Check className="h-4 w-4 stroke-[2.5]" />
                  ) : state === "error" ? (
                    <AlertCircle className="h-4 w-4 stroke-[2.5]" />
                  ) : step.icon ? (
                    step.icon
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                {/* Step Text Info */}
                <div className="flex flex-col min-w-0 pr-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "text-xs font-semibold tracking-tight truncate",
                        state === "current" && "text-foreground font-bold",
                        state === "completed" && "text-foreground",
                        state === "upcoming" && "text-muted-foreground",
                        state === "error" && "text-destructive",
                        state === "disabled" && "text-muted-foreground/40"
                      )}
                    >
                      {step.title}
                    </span>
                    {step.optional && (
                      <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider">
                        Optional
                      </span>
                    )}
                  </div>
                  {step.description && (
                    <span
                      className={cn(
                        "text-[11px] truncate max-w-[180px]",
                        state === "disabled" ? "text-muted-foreground/40" : "text-muted-foreground"
                      )}
                    >
                      {step.description}
                    </span>
                  )}
                </div>
              </div>

              {/* Connecting line for horizontal stepper on desktop */}
              {isHorizontal && !isLast && (
                <div
                  aria-hidden="true"
                  className={cn(
                    "hidden sm:block flex-1 h-0.5 mx-2 transition-colors",
                    index < currentStep ? "bg-teal-600" : "bg-border"
                  )}
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
