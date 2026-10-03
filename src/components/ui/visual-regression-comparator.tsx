"use client"

import * as React from "react"
import {
  Diff,
  Columns2,
  Sliders,
  Sparkles,
  AlertTriangle,
  RotateCcw,
  Maximize2,
  Info,
  CheckCircle2,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type CompareMode = "slider" | "side-by-side" | "onion-skin"

export interface VisualRegressionProps extends React.HTMLAttributes<HTMLDivElement> {
  baselineTitle?: string
  currentTitle?: string
  initialSliderPos?: number // 0 to 100
  onSliderChange?: (position: number) => void
}

export const VisualRegressionComparator = React.forwardRef<HTMLDivElement, VisualRegressionProps>(
  (
    {
      baselineTitle = "Baseline (v1.4.0)",
      currentTitle = "Current (v1.5.0-rc)",
      initialSliderPos = 50,
      onSliderChange,
      className,
      ...props
    },
    ref
  ) => {
    const [sliderPos, setSliderPos] = React.useState(initialSliderPos)
    const [mode, setMode] = React.useState<CompareMode>("slider")
    const [isDragging, setIsDragging] = React.useState(false)
    const [onionOpacity, setOnionOpacity] = React.useState(50)

    const containerRef = React.useRef<HTMLDivElement | null>(null)

    const handleMouseDown = () => setIsDragging(true)
    const handleMouseUp = () => setIsDragging(false)

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDragging || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left))
      const pct = Math.round((x / rect.width) * 100)
      setSliderPos(pct)
      onSliderChange?.(pct)
    }

    // Touch support for mobile dragging
    const handleTouchMove = (e: React.TouchEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const touch = e.touches[0]
      const x = Math.max(0, Math.min(rect.width, touch.clientX - rect.left))
      const pct = Math.round((x / rect.width) * 100)
      setSliderPos(pct)
      onSliderChange?.(pct)
    }

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Visual Regression Screenshot Comparator"
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
              <Diff className="h-4 w-4" />
            </span>
            <div>
              <h4 className="font-semibold text-foreground">Visual Regression Screenshot Comparator</h4>
              <p className="text-[11px] text-muted-foreground">
                Pixel-diff reveal slider comparing baseline against current release snapshot
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode Selector */}
            <div className="flex items-center rounded-lg border border-border bg-muted/40 p-1 text-xs">
              {(["slider", "side-by-side", "onion-skin"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-[11px] font-semibold capitalize transition-all",
                    mode === m
                      ? "bg-background text-foreground shadow-2xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {m.replace("-", " ")}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setSliderPos(50)
                setOnionOpacity(50)
              }}
              className="p-1.5 rounded-lg border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title="Reset View"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Change Metric Badge Banner */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30 border border-border text-xs">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold font-mono text-[11px]">
              <CheckCircle2 className="h-3.5 w-3.5" /> 98.4% Match
            </span>
            <span className="text-muted-foreground text-[11px]">
              1.6% delta detected in CTA button padding and border radius
            </span>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">
            Split: {sliderPos}%
          </span>
        </div>

        {/* Comparison Canvas */}
        {mode === "slider" && (
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative w-full h-[320px] rounded-xl border border-border overflow-hidden cursor-ew-resize bg-background select-none"
          >
            {/* Current Snapshot Layer (Full Width Background) */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between bg-card text-foreground select-none">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="font-bold text-sm">Dashboard Overview</span>
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-[10px]">
                  {currentTitle}
                </span>
              </div>

              {/* Redesigned Button in Current Layer */}
              <div className="space-y-3">
                <h5 className="font-extrabold text-lg text-primary tracking-tight">
                  Design System Release 2.0
                </h5>
                <p className="text-muted-foreground text-xs max-w-sm leading-relaxed">
                  Refined atomic tokens with rounded-xl corners and increased tap targets.
                </p>
                <div className="pt-2 flex gap-3">
                  <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-md">
                    Updated Action Button (12px radius)
                  </button>
                </div>
              </div>

              <div className="text-[10px] font-mono text-muted-foreground">
                DOM Node ID: #checkout-cta-v2
              </div>
            </div>

            {/* Baseline Snapshot Layer (Clipped by slider position) */}
            <div
              style={{ width: `${sliderPos}%` }}
              className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-primary bg-slate-900 text-slate-100 select-none shadow-xl"
            >
              <div className="w-full h-full p-6 flex flex-col justify-between" style={{ minWidth: "600px" }}>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="font-bold text-sm">Dashboard Overview</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold text-[10px]">
                    {baselineTitle}
                  </span>
                </div>

                {/* Legacy Button in Baseline Layer */}
                <div className="space-y-3">
                  <h5 className="font-extrabold text-lg text-slate-100 tracking-tight">
                    Design System Release 1.4
                  </h5>
                  <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
                    Legacy baseline styling with sharp square corners and compact button height.
                  </p>
                  <div className="pt-2 flex gap-3">
                    <button className="px-4 py-1.5 rounded-xs bg-slate-700 text-slate-100 font-semibold text-xs border border-slate-600">
                      Legacy Action Button (2px radius)
                    </button>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-slate-500">
                  DOM Node ID: #checkout-cta-legacy
                </div>
              </div>
            </div>

            {/* Draggable Divider Handle */}
            <div
              style={{ left: `${sliderPos}%` }}
              className="absolute inset-y-0 -ml-3 w-6 flex items-center justify-center cursor-ew-resize pointer-events-none"
            >
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center border-2 border-background text-[10px] font-bold">
                ⇄
              </div>
            </div>
          </div>
        )}

        {/* Mode: Side-by-Side */}
        {mode === "side-by-side" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {/* Baseline */}
            <div className="p-4 rounded-xl border border-border bg-slate-900 text-slate-100 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold">{baselineTitle}</span>
                <span className="text-[10px] font-mono text-slate-400">Sharp 2px radius</span>
              </div>
              <p className="text-slate-400">Baseline reference before UI polish update.</p>
              <button className="px-3 py-1.5 rounded-xs bg-slate-700 text-slate-100 font-semibold">
                Legacy Button
              </button>
            </div>

            {/* Current */}
            <div className="p-4 rounded-xl border border-primary/40 bg-card text-foreground space-y-3 shadow-xs">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="font-bold">{currentTitle}</span>
                <span className="text-[10px] font-mono text-primary font-bold">Rounded 12px</span>
              </div>
              <p className="text-muted-foreground">Current release snapshot with modern tokens.</p>
              <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold shadow-xs">
                Updated Action Button
              </button>
            </div>
          </div>
        )}

        {/* Mode: Onion Skin */}
        {mode === "onion-skin" && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs">
              <span className="font-semibold text-foreground">Overlay Transparency:</span>
              <input
                type="range"
                min={0}
                max={100}
                value={onionOpacity}
                onChange={(e) => setOnionOpacity(Number(e.target.value))}
                className="w-48 accent-primary h-1.5 cursor-pointer"
              />
              <span className="font-mono font-bold text-primary">{onionOpacity}%</span>
            </div>

            <div className="relative h-[220px] rounded-xl border border-border overflow-hidden p-6 bg-card">
              <div className="space-y-2">
                <h5 className="font-bold text-foreground">Layer Comparison Overlay</h5>
                <button
                  style={{ opacity: onionOpacity / 100 }}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold shadow-md transition-opacity"
                >
                  Superimposed Element
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
)

VisualRegressionComparator.displayName = "VisualRegressionComparator"
