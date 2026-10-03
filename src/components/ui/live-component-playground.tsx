"use client"

import * as React from "react"
import {
  Sliders,
  Sparkles,
  ArrowRight,
  Check,
  Download,
  Copy,
  Code,
  RotateCcw,
  Loader2,
  Box,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type PlaygroundVariant = "default" | "primary" | "secondary" | "outline" | "ghost" | "destructive"
export type PlaygroundSize = "sm" | "md" | "lg"
export type PlaygroundIcon = "none" | "sparkles" | "arrow" | "check" | "download"

export interface LiveComponentPlaygroundProps extends React.HTMLAttributes<HTMLDivElement> {
  initialLabel?: string
  initialVariant?: PlaygroundVariant
  initialSize?: PlaygroundSize
}

export const LiveComponentPlayground = React.forwardRef<HTMLDivElement, LiveComponentPlaygroundProps>(
  (
    {
      initialLabel = "Explore Tokens",
      initialVariant = "primary",
      initialSize = "md",
      className,
      ...props
    },
    ref
  ) => {
    const [label, setLabel] = React.useState(initialLabel)
    const [variant, setVariant] = React.useState<PlaygroundVariant>(initialVariant)
    const [size, setSize] = React.useState<PlaygroundSize>(initialSize)
    const [icon, setIcon] = React.useState<PlaygroundIcon>("sparkles")
    const [isDisabled, setIsDisabled] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [aesthetic, setAesthetic] = React.useState<"default" | "japandi" | "brutalist" | "glass" | "dark-tech">("default")
    const [copied, setCopied] = React.useState(false)

    const renderIcon = () => {
      if (isLoading) return <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
      switch (icon) {
        case "sparkles":
          return <Sparkles className="h-4 w-4 mr-1.5" />
        case "arrow":
          return <ArrowRight className="h-4 w-4 ml-1.5 order-last" />
        case "check":
          return <Check className="h-4 w-4 mr-1.5 text-emerald-400" />
        case "download":
          return <Download className="h-4 w-4 mr-1.5" />
        default:
          return null
      }
    }

    // Aesthetic-specific token styling
    const getAestheticClasses = () => {
      switch (aesthetic) {
        case "japandi":
          return "rounded-none border-stone-400 font-serif tracking-wide"
        case "brutalist":
          return "rounded-none border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase font-mono font-bold"
        case "glass":
          return "rounded-xl backdrop-blur-md bg-white/20 dark:bg-white/10 border border-white/30 shadow-lg"
        case "dark-tech":
          return "rounded-md border border-cyan-500/50 bg-slate-950 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)] font-mono"
        default:
          return "rounded-lg shadow-xs"
      }
    }

    // Variant classes
    const getVariantClasses = () => {
      if (aesthetic !== "default") return "" // Aesthetic overrides basic variant colors
      switch (variant) {
        case "primary":
          return "bg-primary text-primary-foreground hover:bg-primary/90"
        case "secondary":
          return "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        case "outline":
          return "border border-input bg-background hover:bg-muted text-foreground"
        case "ghost":
          return "hover:bg-muted text-foreground"
        case "destructive":
          return "bg-destructive text-destructive-foreground hover:bg-destructive/90"
        default:
          return "bg-primary text-primary-foreground hover:bg-primary/90"
      }
    }

    // Size classes
    const getSizeClasses = () => {
      switch (size) {
        case "sm":
          return "px-2.5 py-1 text-xs h-8"
        case "lg":
          return "px-5 py-2.5 text-sm h-11"
        default:
          return "px-4 py-2 text-xs h-9.5"
      }
    }

    const generatedJsxCode = React.useMemo(() => {
      const iconProp = icon !== "none" ? `\n  icon={<${icon.charAt(0).toUpperCase() + icon.slice(1)} />}` : ""
      const disabledProp = isDisabled ? "\n  disabled" : ""
      const loadingProp = isLoading ? "\n  loading" : ""

      return `<Button\n  variant="${variant}"\n  size="${size}"${iconProp}${disabledProp}${loadingProp}\n>\n  ${label}\n</Button>`
    }, [variant, size, icon, isDisabled, isLoading, label])

    const handleCopy = () => {
      navigator.clipboard.writeText(generatedJsxCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    const handleReset = () => {
      setLabel(initialLabel)
      setVariant(initialVariant)
      setSize(initialSize)
      setIcon("sparkles")
      setIsDisabled(false)
      setIsLoading(false)
      setAesthetic("default")
    }

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Live Component Sandbox Playground"
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
              <Sliders className="h-4 w-4" />
            </span>
            <div>
              <h4 className="font-semibold text-foreground">Live Component Playground</h4>
              <p className="text-[11px] text-muted-foreground">
                Configurable prop controls, aesthetic presets, and real-time JSX synchronization
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-background hover:bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="h-3 w-3" /> Reset
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition-colors shadow-2xs"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copied" : "Copy JSX"}
            </button>
          </div>
        </div>

        {/* Interactive Controls & Canvas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 space-y-3 text-xs">
            {/* Label Input */}
            <div className="space-y-1">
              <label className="font-semibold text-foreground">Button Text Label</label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-md border border-input bg-background text-foreground text-xs"
              />
            </div>

            {/* Aesthetic Selector */}
            <div className="space-y-1">
              <label className="font-semibold text-foreground">Aesthetic Preset</label>
              <select
                value={aesthetic}
                onChange={(e) => setAesthetic(e.target.value as any)}
                className="w-full px-2.5 py-1.5 rounded-md border border-input bg-background text-foreground text-xs cursor-pointer"
              >
                <option value="default">Chameleon UI Clean Modern (Default)</option>
                <option value="japandi">Japandi (Warm Organic Serif)</option>
                <option value="brutalist">Neo-Brutalist (Bold Borders &amp; Shadows)</option>
                <option value="glass">Glassmorphism (Frosted Backdrop Blur)</option>
                <option value="dark-tech">Dark Tech (Cyan Glow &amp; Mono)</option>
              </select>
            </div>

            {/* Variant (only when default aesthetic) */}
            {aesthetic === "default" && (
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Variant Style</label>
                <select
                  value={variant}
                  onChange={(e) => setVariant(e.target.value as PlaygroundVariant)}
                  className="w-full px-2.5 py-1.5 rounded-md border border-input bg-background text-foreground text-xs cursor-pointer"
                >
                  <option value="primary">Primary (Brand Accent)</option>
                  <option value="secondary">Secondary (Muted Surface)</option>
                  <option value="outline">Outline (Border Only)</option>
                  <option value="ghost">Ghost (Subtle Hover)</option>
                  <option value="destructive">Destructive (Alert Red)</option>
                </select>
              </div>
            )}

            {/* Size & Icon */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Size</label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value as PlaygroundSize)}
                  className="w-full px-2.5 py-1.5 rounded-md border border-input bg-background text-foreground text-xs"
                >
                  <option value="sm">Small (32px)</option>
                  <option value="md">Medium (38px)</option>
                  <option value="lg">Large (44px)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Leading Icon</label>
                <select
                  value={icon}
                  onChange={(e) => setIcon(e.target.value as PlaygroundIcon)}
                  className="w-full px-2.5 py-1.5 rounded-md border border-input bg-background text-foreground text-xs"
                >
                  <option value="none">None</option>
                  <option value="sparkles">Sparkles</option>
                  <option value="arrow">Arrow Right</option>
                  <option value="check">Checkmark</option>
                  <option value="download">Download</option>
                </select>
              </div>
            </div>

            {/* State Toggles */}
            <div className="flex items-center gap-4 pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer font-medium text-foreground">
                <input
                  type="checkbox"
                  checked={isDisabled}
                  onChange={(e) => setIsDisabled(e.target.checked)}
                  className="rounded border-input text-primary"
                />
                Disabled State
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer font-medium text-foreground">
                <input
                  type="checkbox"
                  checked={isLoading}
                  onChange={(e) => setIsLoading(e.target.checked)}
                  className="rounded border-input text-primary"
                />
                Loading Spinner
              </label>
            </div>
          </div>

          {/* Canvas & Code Preview Column (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            {/* Live Interactive Canvas */}
            <div className="min-h-[180px] rounded-xl border border-border/80 bg-background/60 p-6 flex flex-col items-center justify-center relative overflow-hidden">
              <span className="absolute top-2.5 left-3 font-mono text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                Live Preview
              </span>

              <button
                type="button"
                disabled={isDisabled || isLoading}
                className={cn(
                  "inline-flex items-center justify-center font-semibold transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
                  getSizeClasses(),
                  getVariantClasses(),
                  getAestheticClasses()
                )}
              >
                {renderIcon()}
                <span>{label || "Button"}</span>
              </button>
            </div>

            {/* Generated Code Snippet */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                <span>Synchronized JSX Definition</span>
                <span className="text-[10px]">Zero eval() sandbox</span>
              </div>
              <pre className="p-3 rounded-lg bg-muted/60 border border-border/80 font-mono text-[11px] text-foreground overflow-x-auto leading-relaxed">
                {generatedJsxCode}
              </pre>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

LiveComponentPlayground.displayName = "LiveComponentPlayground"
