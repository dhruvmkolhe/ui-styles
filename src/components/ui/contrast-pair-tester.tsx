"use client"

import * as React from "react"
import {
  Sparkles,
  ArrowLeftRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Sliders,
  Eye,
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface ContrastPairTesterProps extends React.HTMLAttributes<HTMLDivElement> {
  initialForeground?: string
  initialBackground?: string
  onRatioChange?: (ratio: number, passesAA: boolean, passesAAA: boolean) => void
}

// Convert Hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const sanitized = hex.replace("#", "").trim()
  if (sanitized.length === 3) {
    const r = parseInt(sanitized[0] + sanitized[0], 16)
    const g = parseInt(sanitized[1] + sanitized[1], 16)
    const b = parseInt(sanitized[2] + sanitized[2], 16)
    return { r, g, b }
  }
  if (sanitized.length === 6) {
    const r = parseInt(sanitized.slice(0, 2), 16)
    const g = parseInt(sanitized.slice(2, 4), 16)
    const b = parseInt(sanitized.slice(4, 6), 16)
    return { r, g, b }
  }
  return null
}

// Relative luminance formula per WCAG 2.1
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const val = c / 255
    return val <= 0.04045 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

// Calculate WCAG contrast ratio
function calculateContrast(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1)
  const rgb2 = hexToRgb(hex2)
  if (!rgb1 || !rgb2) return 1

  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b)
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b)

  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  return (lighter + 0.05) / (darker + 0.05)
}

const COLOR_PRESETS = [
  { name: "Teal on White", fg: "#0f766e", bg: "#ffffff" },
  { name: "Slate on Dark", fg: "#f8fafc", bg: "#0f172a" },
  { name: "Violet on Light", fg: "#6d28d9", bg: "#faf5ff" },
  { name: "Low Contrast Warning", fg: "#94a3b8", bg: "#ffffff" },
  { name: "Pure High Contrast", fg: "#000000", bg: "#ffffff" },
]

export const ContrastPairTester = React.forwardRef<HTMLDivElement, ContrastPairTesterProps>(
  (
    {
      initialForeground = "#0f766e",
      initialBackground = "#ffffff",
      onRatioChange,
      className,
      ...props
    },
    ref
  ) => {
    const [fg, setFg] = React.useState(initialForeground)
    const [bg, setBg] = React.useState(initialBackground)

    const contrastRatio = React.useMemo(() => {
      const ratio = calculateContrast(fg, bg)
      return +ratio.toFixed(2)
    }, [fg, bg])

    const passAANormal = contrastRatio >= 4.5
    const passAALarge = contrastRatio >= 3.0
    const passAAANormal = contrastRatio >= 7.0
    const passAAALarge = contrastRatio >= 4.5
    const passUI = contrastRatio >= 3.0

    React.useEffect(() => {
      onRatioChange?.(contrastRatio, passAANormal, passAAANormal)
    }, [contrastRatio, passAANormal, passAAANormal, onRatioChange])

    const fgLuminance = React.useMemo(() => {
      const rgb = hexToRgb(fg)
      return rgb ? getLuminance(rgb.r, rgb.g, rgb.b).toFixed(3) : "—"
    }, [fg])

    const bgLuminance = React.useMemo(() => {
      const rgb = hexToRgb(bg)
      return rgb ? getLuminance(rgb.r, rgb.g, rgb.b).toFixed(3) : "—"
    }, [bg])

    const handleSwap = () => {
      const nextFg = bg
      const nextBg = fg
      setFg(nextFg)
      setBg(nextBg)
    }

    return (
      <div
        ref={ref}
        role="region"
        aria-label="WCAG Color Contrast Pair Tester"
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
              <Eye className="h-4 w-4" />
            </span>
            <div>
              <h4 className="font-semibold text-foreground">Color Contrast Pair Tester</h4>
              <p className="text-[11px] text-muted-foreground">
                Exact WCAG 2.1 relative luminance and contrast ratio evaluator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {COLOR_PRESETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => {
                    setFg(p.fg)
                    setBg(p.bg)
                  }}
                  className="px-2 py-1 rounded border border-border bg-background hover:bg-muted text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                >
                  {p.name}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleSwap}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-border bg-background hover:bg-muted text-[10px] font-semibold text-foreground transition-colors shrink-0 shadow-2xs"
              title="Swap Foreground and Background"
              aria-label="Swap foreground and background colors"
            >
              <ArrowLeftRight className="h-3 w-3 text-primary" />
              <span>Swap</span>
            </button>
          </div>
        </div>

        {/* 3-Column Balanced Controls: FG | BG | Calculated Ratio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* FG Picker Card */}
          <div className="p-3.5 rounded-xl border border-border bg-background/80 flex flex-col justify-between gap-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground">Text / Foreground</span>
              <span className="text-[10px] font-mono text-muted-foreground uppercase">{fg}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <input
                type="color"
                value={fg}
                onChange={(e) => setFg(e.target.value)}
                className="w-9 h-9 rounded-lg border border-border cursor-pointer p-0.5 bg-background shrink-0 shadow-2xs"
                title="Select foreground color"
              />
              <input
                type="text"
                value={fg}
                onChange={(e) => setFg(e.target.value)}
                className="flex-1 min-w-0 px-2.5 py-1.5 rounded-lg border border-input bg-muted/20 font-mono text-xs text-foreground uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="#000000"
              />
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">
              Luminance: {fgLuminance}
            </span>
          </div>

          {/* BG Picker Card */}
          <div className="p-3.5 rounded-xl border border-border bg-background/80 flex flex-col justify-between gap-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground">Surface / Background</span>
              <span className="text-[10px] font-mono text-muted-foreground uppercase">{bg}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <input
                type="color"
                value={bg}
                onChange={(e) => setBg(e.target.value)}
                className="w-9 h-9 rounded-lg border border-border cursor-pointer p-0.5 bg-background shrink-0 shadow-2xs"
                title="Select background color"
              />
              <input
                type="text"
                value={bg}
                onChange={(e) => setBg(e.target.value)}
                className="flex-1 min-w-0 px-2.5 py-1.5 rounded-lg border border-input bg-muted/20 font-mono text-xs text-foreground uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="#FFFFFF"
              />
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">
              Luminance: {bgLuminance}
            </span>
          </div>

          {/* Calculated Ratio Score Card */}
          <div className="p-3.5 rounded-xl border border-border bg-muted/25 flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] font-mono uppercase font-bold text-muted-foreground">
                Calculated Ratio
              </span>
              <span
                className={cn(
                  "px-2 py-0.5 rounded-full font-bold font-mono text-[10px] inline-block shrink-0",
                  passAAANormal
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                    : passAANormal
                    ? "bg-blue-500/15 text-blue-700 dark:text-blue-300"
                    : "bg-rose-500/15 text-rose-700 dark:text-rose-300"
                )}
              >
                {passAAANormal ? "AAA Compliant" : passAANormal ? "AA Compliant" : "Fails AA"}
              </span>
            </div>

            <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-foreground whitespace-nowrap">
              {contrastRatio} : 1
            </div>

            <span className="text-[10px] text-muted-foreground block truncate">
              {passAAANormal
                ? "Enhanced body & display criteria"
                : passAANormal
                ? "Passed minimum body criteria"
                : "Needs higher contrast for body text"}
            </span>
          </div>
        </div>

        {/* Compliance Checklist Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          <div className="p-3 rounded-lg border border-border bg-background space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground">AA Normal Text</span>
              {passAANormal ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              ) : (
                <XCircle className="h-4 w-4 text-rose-500" />
              )}
            </div>
            <span className="text-[10px] font-mono text-muted-foreground block">Min 4.5:1</span>
          </div>

          <div className="p-3 rounded-lg border border-border bg-background space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground">AA Large Text</span>
              {passAALarge ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              ) : (
                <XCircle className="h-4 w-4 text-rose-500" />
              )}
            </div>
            <span className="text-[10px] font-mono text-muted-foreground block">Min 3.0:1 (&gt;18pt)</span>
          </div>

          <div className="p-3 rounded-lg border border-border bg-background space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground">AAA Normal Text</span>
              {passAAANormal ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              ) : (
                <XCircle className="h-4 w-4 text-rose-500" />
              )}
            </div>
            <span className="text-[10px] font-mono text-muted-foreground block">Min 7.0:1</span>
          </div>

          <div className="p-3 rounded-lg border border-border bg-background space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground">UI Components</span>
              {passUI ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              ) : (
                <XCircle className="h-4 w-4 text-rose-500" />
              )}
            </div>
            <span className="text-[10px] font-mono text-muted-foreground block">Min 3.0:1</span>
          </div>
        </div>

        {/* Live Typography Preview Canvas */}
        <div
          style={{ backgroundColor: bg, color: fg }}
          className="p-6 rounded-xl border border-border/80 shadow-md space-y-3 transition-colors duration-200"
        >
          <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: `${fg}30` }}>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider opacity-80">
              Live Rendering Preview
            </span>
            <span
              style={{ backgroundColor: `${fg}15`, color: fg }}
              className="px-2 py-0.5 rounded text-[10px] font-bold font-mono"
            >
              {contrastRatio}:1
            </span>
          </div>

          <h3 className="text-xl font-bold leading-tight">
            The quick brown fox jumps over the lazy dog.
          </h3>
          <p className="text-sm leading-relaxed opacity-90">
            Accessible typography ensures readability for all users, including individuals with low vision, color blindness, or situational contrast constraints (such as bright sunlight).
          </p>

          <div className="pt-2 flex flex-wrap gap-2">
            <button
              style={{ backgroundColor: fg, color: bg }}
              className="px-3 py-1.5 rounded-md font-semibold text-xs shadow-xs"
            >
              Tested Button
            </button>
            <span
              style={{ borderColor: fg, color: fg }}
              className="px-3 py-1.5 rounded-md border font-medium text-xs inline-flex items-center"
            >
              Outlined Tag
            </span>
          </div>
        </div>
      </div>
    )
  }
)

ContrastPairTester.displayName = "ContrastPairTester"
