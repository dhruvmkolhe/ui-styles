import * as React from "react"
import { cn } from "@/lib/utils"
import { Check, AlertCircle } from "lucide-react"

export interface StepItem {
  id: string | number
  label: string
  description?: string
  icon?: React.ReactNode
  error?: boolean
  disabled?: boolean
}

export interface StepProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: StepItem[]
  currentStep: number // 0-indexed
  orientation?: "horizontal" | "vertical"
  onStepClick?: (stepIndex: number) => void
}

export const StepProgress = React.forwardRef<HTMLDivElement, StepProgressProps>(
  (
    {
      steps,
      currentStep,
      orientation = "horizontal",
      onStepClick,
      className,
      ...props
    },
    ref
  ) => {
    const isVertical = orientation === "vertical"

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Progress navigation"
        className={cn(
          "w-full",
          isVertical ? "flex flex-col space-y-4" : "flex flex-col space-y-2",
          className
        )}
        {...props}
      >
        <ol
          className={cn(
            isVertical
              ? "relative flex flex-col space-y-6"
              : "relative flex items-center justify-between gap-2 overflow-x-auto py-2"
          )}
        >
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStep
            const isCurrent = idx === currentStep
            const isUpcoming = idx > currentStep
            const isClickable = Boolean(onStepClick && !step.disabled && (isCompleted || isCurrent))
            const hasError = step.error

            return (
              <li
                key={step.id ?? idx}
                aria-current={isCurrent ? "step" : undefined}
                className={cn(
                  "relative flex items-center",
                  isVertical ? "flex-row gap-4" : "flex-1 flex-col items-center text-center",
                  step.disabled && "opacity-50 pointer-events-none"
                )}
              >
                {/* Connecting Line (non-last items) */}
                {idx < steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className={cn(
                      "transition-colors duration-300",
                      isVertical
                        ? "absolute left-4 top-8 -bottom-6 w-0.5"
                        : "absolute left-1/2 top-4 w-full h-0.5 -z-0",
                      isCompleted ? "bg-primary" : "bg-border"
                    )}
                  />
                )}

                {/* Step Circle / Button */}
                <button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => isClickable && onStepClick?.(idx)}
                  className={cn(
                    "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    hasError && "border-destructive bg-destructive/10 text-destructive",
                    !hasError && isCompleted && "border-primary bg-primary text-primary-foreground",
                    !hasError && isCurrent && "border-primary bg-background text-primary ring-4 ring-primary/10",
                    !hasError && isUpcoming && "border-border bg-card text-muted-foreground",
                    isClickable ? "cursor-pointer hover:scale-105" : "cursor-default"
                  )}
                >
                  {hasError ? (
                    <AlertCircle className="h-4 w-4" />
                  ) : isCompleted ? (
                    <Check className="h-4 w-4 stroke-[3]" />
                  ) : step.icon ? (
                    step.icon
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </button>

                {/* Step Labels */}
                <div
                  className={cn(
                    isVertical ? "flex flex-col" : "mt-2 flex flex-col items-center max-w-[120px]"
                  )}
                >
                  <span
                    className={cn(
                      "text-xs font-semibold transition-colors",
                      isCurrent ? "text-foreground font-bold" : "text-muted-foreground",
                      hasError && "text-destructive"
                    )}
                  >
                    {step.label}
                  </span>
                  {step.description && (
                    <span className="text-[11px] text-muted-foreground/80 line-clamp-1 mt-0.5">
                      {step.description}
                    </span>
                  )}
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    )
  }
)

StepProgress.displayName = "StepProgress"
