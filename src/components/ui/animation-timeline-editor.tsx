"use client"

import * as React from "react"
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Sliders,
  Copy,
  Check,
  Info,
  Clock,
  Zap,
  Layers,
  Activity,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type EasingPreset =
  | "linear"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "spring-overshoot"
  | "bounce-anticipate"

export interface AnimationKeyframeConfig {
  opacity: number // 0 to 1
  translateY: number // -100 to 100 px
  scale: number // 0.5 to 1.5
  rotate: number // -180 to 180 deg
}

export interface AnimationTimelineEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  initialDurationMs?: number
  initialEasing?: EasingPreset
  onKeyframesChange?: (keyframes: { start: AnimationKeyframeConfig; end: AnimationKeyframeConfig }) => void
}

const EASING_MAP: Record<EasingPreset, { label: string; css: string }> = {
  linear: { label: "Linear", css: "linear" },
  "ease-in": { label: "Ease In", css: "cubic-bezier(0.4, 0, 1, 1)" },
  "ease-out": { label: "Ease Out (Decel)", css: "cubic-bezier(0, 0, 0.2, 1)" },
  "ease-in-out": { label: "Ease In-Out", css: "cubic-bezier(0.4, 0, 0.2, 1)" },
  "spring-overshoot": { label: "Spring Overshoot", css: "cubic-bezier(0.175, 0.885, 0.32, 1.275)" },
  "bounce-anticipate": { label: "Anticipate & Bounce", css: "cubic-bezier(0.68, -0.55, 0.265, 1.55)" },
}

export const AnimationTimelineEditor = React.forwardRef<HTMLDivElement, AnimationTimelineEditorProps>(
  (
    {
      initialDurationMs = 600,
      initialEasing = "spring-overshoot",
      onKeyframesChange,
      className,
      ...props
    },
    ref
  ) => {
    const [durationMs, setDurationMs] = React.useState(initialDurationMs)
    const [delayMs, setDelayMs] = React.useState(0)
    const [easing, setEasing] = React.useState<EasingPreset>(initialEasing)
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [isLooping, setIsLooping] = React.useState(true)
    const [scrubProgress, setScrubProgress] = React.useState(0) // 0 to 1
    const [copied, setCopied] = React.useState(false)

    // Keyframe configs
    const [startKf, setStartKf] = React.useState<AnimationKeyframeConfig>({
      opacity: 0,
      translateY: 24,
      scale: 0.9,
      rotate: -4,
    })

    const [endKf, setEndKf] = React.useState<AnimationKeyframeConfig>({
      opacity: 1,
      translateY: 0,
      scale: 1,
      rotate: 0,
    })

    const animationRef = React.useRef<number | null>(null)
    const startTimeRef = React.useRef<number | null>(null)

    // Playback loop
    React.useEffect(() => {
      if (!isPlaying) {
        if (animationRef.current) cancelAnimationFrame(animationRef.current)
        startTimeRef.current = null
        return
      }

      const animate = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp
        const elapsed = timestamp - startTimeRef.current

        if (elapsed < delayMs) {
          setScrubProgress(0)
          animationRef.current = requestAnimationFrame(animate)
          return
        }

        const activeElapsed = elapsed - delayMs
        const p = Math.min(1, activeElapsed / durationMs)
        setScrubProgress(p)

        if (p < 1) {
          animationRef.current = requestAnimationFrame(animate)
        } else {
          if (isLooping) {
            startTimeRef.current = timestamp
            animationRef.current = requestAnimationFrame(animate)
          } else {
            setIsPlaying(false)
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
      return () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current)
      }
    }, [isPlaying, durationMs, delayMs, isLooping])

    // Interpolate animated properties based on scrub progress
    const currentStyle = React.useMemo(() => {
      const p = scrubProgress
      const opacity = startKf.opacity + (endKf.opacity - startKf.opacity) * p
      const translateY = startKf.translateY + (endKf.translateY - startKf.translateY) * p
      const scale = startKf.scale + (endKf.scale - startKf.scale) * p
      const rotate = startKf.rotate + (endKf.rotate - startKf.rotate) * p

      return {
        opacity,
        transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
      }
    }, [scrubProgress, startKf, endKf])

    const handlePlayPause = () => {
      if (isPlaying) {
        setIsPlaying(false)
      } else {
        if (scrubProgress >= 1) setScrubProgress(0)
        setIsPlaying(true)
      }
    }

    const handleReset = () => {
      setIsPlaying(false)
      setScrubProgress(0)
      setDurationMs(600)
      setDelayMs(0)
      setEasing("spring-overshoot")
      setStartKf({ opacity: 0, translateY: 24, scale: 0.9, rotate: -4 })
      setEndKf({ opacity: 1, translateY: 0, scale: 1, rotate: 0 })
    }

    const generatedCss = React.useMemo(() => {
      const easeCss = EASING_MAP[easing].css
      return `@keyframes enter-reveal {
  0% {
    opacity: ${startKf.opacity};
    transform: translateY(${startKf.translateY}px) scale(${startKf.scale}) rotate(${startKf.rotate}deg);
  }
  100% {
    opacity: ${endKf.opacity};
    transform: translateY(${endKf.translateY}px) scale(${endKf.scale}) rotate(${endKf.rotate}deg);
  }
}

.animated-element {
  animation: enter-reveal ${durationMs}ms ${easeCss} ${delayMs > 0 ? `${delayMs}ms ` : ""}both;
}`
    }, [startKf, endKf, durationMs, delayMs, easing])

    const handleCopyCss = () => {
      navigator.clipboard.writeText(generatedCss)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Animation Timeline and Keyframe Editor"
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
              <Activity className="h-4 w-4" />
            </span>
            <div>
              <h4 className="font-semibold text-foreground">Animation Timeline Editor</h4>
              <p className="text-[11px] text-muted-foreground">
                Visually configure transition curves, scrub timeline progress, and export CSS keyframes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-background hover:bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="h-3 w-3" /> Reset Defaults
            </button>
            <button
              type="button"
              onClick={handleCopyCss}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition-colors shadow-2xs"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copied CSS" : "Export CSS"}
            </button>
          </div>
        </div>

        {/* Safety Disclaimer */}
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-900 dark:text-blue-200">
          <Info className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="font-semibold">Safe Sandbox Rendering:</strong> Transitions are calculated mathematically using standard CSS transform properties without dynamic script execution or eval.
          </p>
        </div>

        {/* Main Stage: Controls (Left) & Live Preview Canvas (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
          {/* Controls Panel (7 cols) */}
          <div className="md:col-span-7 space-y-3 text-xs">
            {/* Playback & Scrub Bar */}
            <div className="p-3.5 rounded-xl border border-border bg-muted/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePlayPause}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90 transition-colors shadow-2xs"
                  >
                    {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                    <span>{isPlaying ? "Pause" : "Play"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setScrubProgress(0)}
                    className="p-1.5 rounded-lg border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground"
                    title="Jump to Start (0%)"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono">
                  <button
                    type="button"
                    onClick={() => setIsLooping(!isLooping)}
                    className={cn(
                      "px-2 py-0.5 rounded border text-[10px] font-semibold transition-colors",
                      isLooping
                        ? "bg-primary/10 border-primary text-primary"
                        : "border-border text-muted-foreground"
                    )}
                  >
                    Loop: {isLooping ? "ON" : "OFF"}
                  </button>
                  <span className="text-muted-foreground">
                    Progress: <strong>{Math.round(scrubProgress * 100)}%</strong>
                  </span>
                </div>
              </div>

              {/* Scrub Slider */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                  <span>0% (Start)</span>
                  <span>50%</span>
                  <span>100% (End)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={scrubProgress}
                  onChange={(e) => {
                    setIsPlaying(false)
                    setScrubProgress(parseFloat(e.target.value))
                  }}
                  className="w-full h-2 rounded-lg bg-muted appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>

            {/* Timing & Easing Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl border border-border bg-card">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-foreground">Duration</label>
                  <span className="font-mono text-muted-foreground">{durationMs}ms</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="50"
                  value={durationMs}
                  onChange={(e) => setDurationMs(parseInt(e.target.value))}
                  className="w-full h-1.5 rounded-lg bg-muted appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground block">Easing Curve</label>
                <select
                  value={easing}
                  onChange={(e) => setEasing(e.target.value as EasingPreset)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-input bg-background text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {Object.entries(EASING_MAP).map(([key, item]) => (
                    <option key={key} value={key}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Keyframe Property Sliders (TranslateY & Scale) */}
            <div className="p-3.5 rounded-xl border border-border bg-card space-y-3">
              <span className="font-semibold text-foreground block">
                Start Keyframe Offsets (0% State)
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Translate Y</span>
                    <span className="font-mono">{startKf.translateY}px</span>
                  </div>
                  <input
                    type="range"
                    min="-60"
                    max="60"
                    value={startKf.translateY}
                    onChange={(e) =>
                      setStartKf({ ...startKf, translateY: parseInt(e.target.value) })
                    }
                    className="w-full h-1.5 rounded-lg bg-muted appearance-none cursor-pointer accent-primary"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Start Scale</span>
                    <span className="font-mono">{startKf.scale}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="1.5"
                    step="0.05"
                    value={startKf.scale}
                    onChange={(e) =>
                      setStartKf({ ...startKf, scale: parseFloat(e.target.value) })
                    }
                    className="w-full h-1.5 rounded-lg bg-muted appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Live Preview Canvas (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-8 rounded-xl border border-border bg-muted/20 min-h-[320px] relative overflow-hidden">
            {/* Visual Stage Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-60 pointer-events-none" />

            {/* Target Animated Element */}
            <div
              style={currentStyle}
              className="relative z-10 w-full max-w-xs p-5 rounded-2xl border border-border bg-card shadow-lg text-center space-y-3"
            >
              <div className="mx-auto w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shadow-2xs">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-sm">Interactive Target</h4>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Timeline scrub progress: {Math.round(scrubProgress * 100)}%
                </p>
              </div>
              <div className="pt-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-mono text-[10px] font-bold">
                  <Zap className="h-3 w-3" /> CSS Transform Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Code Snippet Output */}
        <div className="p-3 rounded-lg border border-border bg-background space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-muted-foreground font-mono">Generated CSS Animation</span>
            <span className="text-[10px] text-muted-foreground font-mono">{durationMs}ms duration</span>
          </div>
          <pre className="p-2.5 rounded bg-muted/40 text-[11px] font-mono text-foreground overflow-x-auto">
            {generatedCss}
          </pre>
        </div>
      </div>
    )
  }
)
AnimationTimelineEditor.displayName = "AnimationTimelineEditor"
