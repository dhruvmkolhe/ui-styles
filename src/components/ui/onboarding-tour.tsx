"use client"

import * as React from "react"
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle2,
  Sparkles,
  HelpCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface TourStep {
  id: string
  title: string
  description: string
  targetSelector?: string
  placement?: "top" | "bottom" | "left" | "right" | "center"
  badge?: string
}

export interface OnboardingTourProps extends React.HTMLAttributes<HTMLDivElement> {
  steps?: TourStep[]
  isOpen?: boolean
  initialStepIndex?: number
  onComplete?: () => void
  onDismiss?: () => void
}

const DEFAULT_TOUR_STEPS: TourStep[] = [
  {
    id: "step-1",
    title: "Welcome to Chameleon UI Studio",
    description: "Explore 25 authentic aesthetic design systems, 160+ copy-paste production components, and token palettes.",
    badge: "Getting Started",
    placement: "center",
  },
  {
    id: "step-2",
    title: "Theme & Palette Controls",
    description: "Switch seamlessly between Light and Dark mode, toggle full screen previews, and inspect atomic Tailwind utility tokens.",
    targetSelector: "#theme-toggle-target",
    badge: "Personalization",
    placement: "bottom",
  },
  {
    id: "step-3",
    title: "Instant Code Generator",
    description: "Click any component to reveal production React and JSX code snippets ready for immediate copy-pasting into your project.",
    targetSelector: "#code-action-target",
    badge: "Productivity",
    placement: "left",
  },
  {
    id: "step-4",
    title: "Ready to Build",
    description: "You're all set! Search components using ⌘K anytime or explore the style gallery for complete design inspirations.",
    badge: "Ready",
    placement: "center",
  },
]

export const OnboardingTour = React.forwardRef<HTMLDivElement, OnboardingTourProps>(
  (
    {
      steps = DEFAULT_TOUR_STEPS,
      isOpen = true,
      initialStepIndex = 0,
      onComplete,
      onDismiss,
      className,
      ...props
    },
    ref
  ) => {
    const [currentStepIndex, setCurrentStepIndex] = React.useState(initialStepIndex)
    const [active, setActive] = React.useState(isOpen)
    const [targetFound, setTargetFound] = React.useState<boolean>(true)

    const step = steps[currentStepIndex] || steps[0]
    const isFirst = currentStepIndex === 0
    const isLast = currentStepIndex === steps.length - 1

    // Check if target selector exists on page
    React.useEffect(() => {
      if (!step?.targetSelector) {
        setTargetFound(true)
        return
      }
      const el = document.querySelector(step.targetSelector)
      setTargetFound(!!el)
    }, [step])

    // Keyboard navigation
    React.useEffect(() => {
      if (!active) return

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setActive(false)
          onDismiss?.()
        } else if (e.key === "ArrowRight" || e.key === "Enter") {
          if (isLast) {
            setActive(false)
            onComplete?.()
          } else {
            setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1))
          }
        } else if (e.key === "ArrowLeft") {
          if (!isFirst) {
            setCurrentStepIndex((prev) => Math.max(0, prev - 1))
          }
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [active, isFirst, isLast, steps.length, onComplete, onDismiss])

    const handleNext = () => {
      if (isLast) {
        setActive(false)
        onComplete?.()
      } else {
        setCurrentStepIndex((prev) => prev + 1)
      }
    }

    const handlePrev = () => {
      if (!isFirst) {
        setCurrentStepIndex((prev) => prev - 1)
      }
    }

    const handleClose = () => {
      setActive(false)
      onDismiss?.()
    }

    const handleRestart = () => {
      setCurrentStepIndex(0)
      setActive(true)
    }

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Interactive Onboarding Tour"
        className={cn(
          "w-full rounded-xl border border-border bg-card shadow-2xs p-4 space-y-4 select-none",
          className
        )}
        {...props}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-border/60 pb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-primary/10 text-primary">
              <Compass className="h-4 w-4" />
            </span>
            <div>
              <h4 className="font-semibold text-foreground">Interactive Onboarding Tour</h4>
              <p className="text-[11px] text-muted-foreground">
                Step-by-step contextual product guide with spotlight target detection
              </p>
            </div>
          </div>

          {!active ? (
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs shadow-xs hover:bg-primary/90 transition-colors"
            >
              <Compass className="h-3.5 w-3.5" /> Start Product Tour
            </button>
          ) : (
            <button
              type="button"
              onClick={handleClose}
              className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Close Tour (Esc)"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Tour Stage Simulation Container */}
        <div className="relative min-h-[300px] rounded-lg border border-border/80 bg-muted/20 p-6 flex flex-col items-center justify-center overflow-hidden">
          {/* Simulated App Background Elements to act as tour targets */}
          <div className="w-full max-w-lg space-y-4 opacity-40 pointer-events-none">
            <div className="flex justify-between items-center p-3 rounded-lg border border-border bg-card">
              <span className="text-xs font-mono">App Navigation Bar</span>
              <div id="theme-toggle-target" className="px-2.5 py-1 rounded border border-border text-[11px]">
                Theme Toggle
              </div>
            </div>
            <div className="p-4 rounded-lg border border-border bg-card space-y-2">
              <div className="h-4 w-1/3 bg-muted rounded" />
              <div className="h-3 w-3/4 bg-muted/60 rounded" />
              <div className="flex justify-end pt-2">
                <div id="code-action-target" className="px-3 py-1 rounded bg-primary/20 text-primary text-[11px]">
                  Copy React Code
                </div>
              </div>
            </div>
          </div>

          {/* Active Spotlight Card */}
          {active ? (
            <div className="absolute z-30 max-w-sm w-full mx-4 rounded-xl border border-primary/40 bg-card p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
              {/* Badge & Step indicator */}
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold text-[10px] tracking-wider uppercase">
                  {step.badge || "Guide"}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  Step {currentStepIndex + 1} of {steps.length}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5">
                <h5 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                  {step.title}
                  {isLast && <Sparkles className="h-4 w-4 text-amber-500" />}
                </h5>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Graceful Target Selector Notification */}
              {step.targetSelector && !targetFound && (
                <div className="flex items-center gap-2 p-2 rounded bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[11px]">
                  <HelpCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>Target element relocated; presenting centered step.</span>
                </div>
              )}

              {/* Progress Dots & Buttons */}
              <div className="pt-2 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {steps.map((_, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-200",
                        idx === currentStepIndex
                          ? "w-4 bg-primary"
                          : "w-1.5 bg-muted-foreground/30"
                      )}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {!isFirst && (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-2.5 py-1 rounded-md border border-border bg-background text-xs font-medium hover:bg-muted text-foreground transition-colors"
                    >
                      <ArrowLeft className="h-3 w-3 inline mr-1" /> Prev
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-3 py-1 rounded-md bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors shadow-xs"
                  >
                    {isLast ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 inline mr-1" /> Finish
                      </>
                    ) : (
                      <>
                        Next <ArrowRight className="h-3 w-3 inline ml-1" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute z-20 text-center space-y-2 p-6">
              <div className="mx-auto w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h5 className="font-bold text-foreground text-sm">Tour Completed</h5>
              <p className="text-xs text-muted-foreground max-w-xs">
                You have walked through the interface features. You can restart the tour anytime.
              </p>
              <button
                type="button"
                onClick={handleRestart}
                className="mt-2 text-xs text-primary font-semibold hover:underline"
              >
                Restart Guide
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
)

OnboardingTour.displayName = "OnboardingTour"
