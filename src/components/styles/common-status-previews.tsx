import React, { useState } from "react"
import { cn } from "@/lib/utils"
import type { Mode, StyleSlug } from "@/lib/styles/types"
import { getStyleFormKit } from "./common-form-kit"
import { Spinner } from "@/components/ui/spinner"
import { LoadingButton } from "@/components/ui/loading-button"
import { StatusIndicator, type StatusType } from "@/components/ui/status-indicator"
import { StepProgress } from "@/components/ui/step-progress"
import { CircularProgress } from "@/components/ui/circular-progress"
import { Shimmer } from "@/components/ui/shimmer"
import { ConnectionStatus, type ConnectionState } from "@/components/ui/connection-status"
import { SkeletonText } from "@/components/ui/skeleton-text"
import { LoadingBar } from "@/components/ui/loading-bar"
import { ProcessingIndicator, type ProcessingStatus } from "@/components/ui/processing-indicator"
import { Play, RotateCcw, Check, Sparkles } from "lucide-react"

// 1. SPINNER PREVIEW
export function SpinnerPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)

  return (
    <div className={`p-6 ${k.panel} ${k.radius} border space-y-6 max-w-lg mx-auto`}>
      <div className="flex items-center justify-between border-b pb-2 text-xs">
        <span className={`font-semibold ${k.strong}`}>Size Variants</span>
        <span className={k.muted}>xs, sm, md, lg, xl</span>
      </div>

      <div className="flex flex-wrap items-center justify-around gap-4 py-2">
        <div className="flex flex-col items-center gap-1.5">
          <Spinner size="xs" variant="primary" />
          <span className={`text-[10px] ${k.muted}`}>xs (12px)</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <Spinner size="sm" variant="primary" />
          <span className={`text-[10px] ${k.muted}`}>sm (16px)</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <Spinner size="md" variant="primary" />
          <span className={`text-[10px] ${k.muted}`}>md (20px)</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <Spinner size="lg" variant="primary" />
          <span className={`text-[10px] ${k.muted}`}>lg (32px)</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <Spinner size="xl" variant="primary" />
          <span className={`text-[10px] ${k.muted}`}>xl (48px)</span>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className={cn("p-3 flex items-center justify-between border", k.panelSoft, k.radius)}>
          <Spinner size="sm" label="Fetching latest telemetry stream..." showLabel />
          <span className={cn("text-[10px] font-mono px-2 py-0.5 border", k.radius, k.panel)}>
            LIVE SYNC
          </span>
        </div>
      </div>
    </div>
  )
}

// 2. LOADING BUTTON PREVIEW
export function LoadingButtonPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const triggerAction = () => {
    setLoading(true)
    setSuccess(false)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2500)
    }, 1800)
  }

  return (
    <div className={`p-6 ${k.panel} ${k.radius} border space-y-5 max-w-md mx-auto`}>
      <div className="flex items-center justify-between border-b pb-2 text-xs">
        <span className={`font-semibold ${k.strong}`}>Async Execution</span>
        <span className={k.muted}>Duplicate-Click Protected</span>
      </div>

      <div className="flex flex-col gap-3">
        <LoadingButton
          loading={loading}
          loadingText="Deploying Microservice..."
          onClick={triggerAction}
          className={`w-full ${k.radius}`}
        >
          {success ? (
            <>
              <Check className="h-4 w-4 mr-1 text-emerald-300" />
              Deployed Successfully!
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-1" />
              Deploy Cluster Node
            </>
          )}
        </LoadingButton>

        <div className="flex items-center justify-between text-[11px] px-2 text-muted-foreground">
          <span>State: <strong className="text-foreground">{loading ? "Submitting (locked)" : success ? "Completed" : "Idle"}</strong></span>
          <button
            type="button"
            onClick={() => {
              setLoading(false)
              setSuccess(false)
            }}
            className="hover:underline flex items-center gap-1"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        </div>
      </div>
    </div>
  )
}

// 3. STATUS INDICATOR PREVIEW
export function StatusIndicatorPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)

  return (
    <div className={`p-6 ${k.panel} ${k.radius} border space-y-4 max-w-lg mx-auto`}>
      <div className="flex items-center justify-between border-b pb-2 text-xs">
        <span className={`font-semibold ${k.strong}`}>System State Matrix</span>
        <span className={k.muted}>Color + Label Accessible</span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className={cn("p-2.5 border flex items-center", k.panelSoft, k.radius)}>
          <StatusIndicator status="online" label="Online" />
        </div>
        <div className={cn("p-2.5 border flex items-center", k.panelSoft, k.radius)}>
          <StatusIndicator status="pending" label="Syncing" />
        </div>
        <div className={cn("p-2.5 border flex items-center", k.panelSoft, k.radius)}>
          <StatusIndicator status="warning" label="Degraded" />
        </div>
        <div className={cn("p-2.5 border flex items-center", k.panelSoft, k.radius)}>
          <StatusIndicator status="error" label="Outage" />
        </div>
        <div className={cn("p-2.5 border flex items-center", k.panelSoft, k.radius)}>
          <StatusIndicator status="offline" label="Offline" />
        </div>
        <div className={cn("p-2.5 border flex items-center", k.panelSoft, k.radius)}>
          <StatusIndicator status="neutral" label="Standby" />
        </div>
      </div>
    </div>
  )
}

// 4. STEP PROGRESS PREVIEW
export function StepProgressPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [activeStep, setActiveStep] = useState(1)

  const steps = [
    { id: "1", label: "Account", description: "Identity check" },
    { id: "2", label: "Cluster", description: "Node capacity" },
    { id: "3", label: "Review", description: "Access policy" },
  ]

  return (
    <div className={`p-6 ${k.panel} ${k.radius} border space-y-6 max-w-xl mx-auto`}>
      <div className="flex items-center justify-between border-b pb-2 text-xs">
        <span className={`font-semibold ${k.strong}`}>Multi-Step Workflow</span>
        <span className={k.muted}>Step {activeStep + 1} of {steps.length}</span>
      </div>

      <StepProgress
        steps={steps}
        currentStep={activeStep}
        onStepClick={(i) => setActiveStep(i)}
      />

      <div className="flex items-center justify-between pt-2 border-t text-xs">
        <button
          type="button"
          disabled={activeStep === 0}
          onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
          className={cn("px-3 py-1.5 transition-colors disabled:opacity-40", k.radius, k.btnSecondary)}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={activeStep === steps.length - 1}
          onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
          className={cn("px-3 py-1.5 font-semibold disabled:opacity-40", k.radius, k.btnPrimarySm)}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

// 5. CIRCULAR PROGRESS PREVIEW
export function CircularProgressPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [progressVal, setProgressVal] = useState(65)
  const [isIndeterminate, setIsIndeterminate] = useState(false)

  return (
    <div className={`p-6 ${k.panel} ${k.radius} border space-y-6 max-w-lg mx-auto`}>
      <div className="flex items-center justify-between border-b pb-2 text-xs">
        <span className={`font-semibold ${k.strong}`}>Radial Indicators</span>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 cursor-pointer text-muted-foreground text-[11px]">
            <input
              id="circular-indeterminate-toggle"
              name="circularIndeterminate"
              aria-label="Indeterminate mode"
              type="checkbox"
              suppressHydrationWarning
              checked={isIndeterminate}
              onChange={(e) => setIsIndeterminate(e.target.checked)}
              className="rounded"
            />
            Indeterminate
          </label>
        </div>
      </div>

      <div className="flex items-center justify-around gap-4 py-2">
        <div className="flex flex-col items-center gap-2">
          <CircularProgress
            value={isIndeterminate ? undefined : progressVal}
            size="md"
            showValue
            variant="default"
          />
          <span className={`text-[11px] ${k.muted}`}>Default</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <CircularProgress
            value={isIndeterminate ? undefined : progressVal}
            size="md"
            showValue
            variant="success"
          />
          <span className={`text-[11px] ${k.muted}`}>Success</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <CircularProgress
            value={isIndeterminate ? undefined : progressVal}
            size="lg"
            showValue
            variant="default"
          />
          <span className={`text-[11px] ${k.muted}`}>Large</span>
        </div>
      </div>

      {!isIndeterminate && (
        <div className="space-y-1.5 border-t pt-3">
          <div className="flex justify-between text-[11px] text-muted-foreground">
            <label htmlFor="circular-progress-slider">Adjust Gauge</label>
            <span className="font-mono font-bold text-foreground">{progressVal}%</span>
          </div>
          <input
            id="circular-progress-slider"
            name="circularProgressValue"
            aria-label="Adjust Gauge"
            type="range"
            suppressHydrationWarning
            min={0}
            max={100}
            value={progressVal}
            onChange={(e) => setProgressVal(Number(e.target.value))}
            className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>
      )}
    </div>
  )
}

// 6. SHIMMER PREVIEW
export function ShimmerPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)

  return (
    <div className={`p-6 ${k.panel} ${k.radius} border space-y-4 max-w-md mx-auto`}>
      <div className="flex items-center justify-between border-b pb-2 text-xs">
        <span className={`font-semibold ${k.strong}`}>Card Placeholder Shimmer</span>
        <span className={k.muted}>Zero Layout Shift</span>
      </div>

      <div className="p-4 rounded-xl border bg-card space-y-4">
        <div className="flex items-center gap-3">
          <Shimmer variant="avatar" className="h-10 w-10" />
          <div className="space-y-1.5 flex-1">
            <Shimmer variant="text" height={14} width="70%" />
            <Shimmer variant="text" height={10} width="40%" />
          </div>
        </div>
        <Shimmer variant="block" height={90} className="w-full" />
        <div className="flex gap-2">
          <Shimmer variant="block" height={24} width={70} rounded="sm" />
          <Shimmer variant="block" height={24} width={70} rounded="sm" />
        </div>
      </div>
    </div>
  )
}

// 7. CONNECTION STATUS PREVIEW
export function ConnectionStatusPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [conn, setConn] = useState<ConnectionState>("connected")

  return (
    <div className={`p-6 ${k.panel} ${k.radius} border space-y-5 max-w-lg mx-auto`}>
      <div className="flex items-center justify-between border-b pb-2 text-xs">
        <span className={`font-semibold ${k.strong}`}>Network Transport Monitor</span>
        <div className="flex gap-1">
          {(["connected", "reconnecting", "offline"] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setConn(st)}
              className={`px-2 py-0.5 rounded text-[11px] capitalize transition-colors ${
                conn === st ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <ConnectionStatus
        status={conn}
        latency={conn === "connected" ? "19ms" : undefined}
        onRetry={() => setConn("connected")}
        variant="card"
      />
    </div>
  )
}

// 8. SKELETON TEXT PREVIEW
export function SkeletonTextPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)

  return (
    <div className={`p-6 ${k.panel} ${k.radius} border space-y-5 max-w-md mx-auto`}>
      <div className="flex items-center justify-between border-b pb-2 text-xs">
        <span className={`font-semibold ${k.strong}`}>Typography Skeletons</span>
        <span className={k.muted}>Tapered Last Line</span>
      </div>

      <div className={cn("p-4 border space-y-4", k.panelSoft, k.radius)}>
        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
            Headline Skeleton
          </span>
          <SkeletonText lines={1} variant="heading" widths={["80%"]} />
        </div>

        <div className="space-y-2 pt-2 border-t">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
            Paragraph Skeleton
          </span>
          <SkeletonText lines={3} variant="paragraph" lastLineWidth="55%" />
        </div>
      </div>
    </div>
  )
}

// 9. LOADING BAR PREVIEW
export function LoadingBarPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [val, setVal] = useState(72)
  const [indeterminate, setIndeterminate] = useState(false)

  return (
    <div className={`p-6 ${k.panel} ${k.radius} border space-y-5 max-w-lg mx-auto`}>
      <div className="flex items-center justify-between border-b pb-2 text-xs">
        <span className={`font-semibold ${k.strong}`}>Horizontal Bars</span>
        <label className="flex items-center gap-1.5 cursor-pointer text-muted-foreground text-[11px]">
          <input
            id="loading-bar-indeterminate-toggle"
            name="loadingBarIndeterminate"
            aria-label="Indeterminate mode"
            type="checkbox"
            suppressHydrationWarning
            checked={indeterminate}
            onChange={(e) => setIndeterminate(e.target.checked)}
            className="rounded"
          />
          Indeterminate
        </label>
      </div>

      <div className="space-y-4">
        <LoadingBar
          value={indeterminate ? undefined : val}
          label="Database Migration"
          showValue
          size="md"
          variant="default"
        />

        <LoadingBar
          value={indeterminate ? undefined : val}
          label="Cache Compression"
          showValue
          size="sm"
          variant="success"
        />

        <LoadingBar
          value={indeterminate ? undefined : val}
          label="Media Transcoding"
          showValue
          size="lg"
          variant="gradient"
        />
      </div>

      {!indeterminate && (
        <div className="space-y-1 pt-2 border-t">
          <label htmlFor="loading-bar-progress-slider" className="sr-only">
            Adjust Loading Bar Progress
          </label>
          <input
            id="loading-bar-progress-slider"
            name="loadingBarProgress"
            aria-label="Adjust Loading Bar Progress"
            type="range"
            suppressHydrationWarning
            min={0}
            max={100}
            value={val}
            onChange={(e) => setVal(Number(e.target.value))}
            className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>
      )}
    </div>
  )
}

// 10. PROCESSING INDICATOR PREVIEW
export function ProcessingIndicatorPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [state, setState] = useState<ProcessingStatus>("processing")

  return (
    <div className={`p-6 ${k.panel} ${k.radius} border space-y-5 max-w-lg mx-auto`}>
      <div className="flex items-center justify-between border-b pb-2 text-xs">
        <span className={`font-semibold ${k.strong}`}>Background Worker State</span>
        <div className="flex gap-1">
          {(["idle", "processing", "success", "error"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setState(s)}
              className={`px-2 py-0.5 rounded text-[11px] capitalize transition-colors ${
                state === s ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <ProcessingIndicator
        status={state}
        title={
          state === "processing"
            ? "Syncing Cloud Storage"
            : state === "success"
            ? "Data Synchronized"
            : state === "error"
            ? "Transfer Interrupted"
            : "Worker Ready"
        }
        description="Encrypted backup archive transfer in progress."
        progress={state === "processing" ? 58 : undefined}
        onRetry={() => setState("processing")}
        onCancel={() => setState("idle")}
        variant="card"
      />
    </div>
  )
}
