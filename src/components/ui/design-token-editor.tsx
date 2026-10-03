"use client"

import * as React from "react"
import {
  Palette,
  RotateCcw,
  Copy,
  Check,
  Code,
  Sliders,
  Sparkles,
  Info,
  Type,
  Maximize2,
  Box,
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface DesignTokens {
  colors: {
    primary: string
    background: string
    foreground: string
    muted: string
    border: string
    accent: string
  }
  typography: {
    fontFamily: string
    baseSizePx: number
    scaleRatio: number
  }
  spacing: {
    baseUnitPx: number
  }
  radii: {
    basePx: number
  }
  shadows: {
    elevation: "none" | "subtle" | "medium" | "dramatic"
  }
}

export interface DesignTokenEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  initialTokens?: DesignTokens
  onTokensChange?: (tokens: DesignTokens) => void
}

const DEFAULT_TOKENS: DesignTokens = {
  colors: {
    primary: "#0d9488", // Teal 600
    background: "#ffffff",
    foreground: "#0f172a",
    muted: "#f1f5f9",
    border: "#e2e8f0",
    accent: "#6366f1",
  },
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
    baseSizePx: 14,
    scaleRatio: 1.25, // Major Third
  },
  spacing: {
    baseUnitPx: 4,
  },
  radii: {
    basePx: 8,
  },
  shadows: {
    elevation: "subtle",
  },
}

export const DesignTokenEditor = React.forwardRef<HTMLDivElement, DesignTokenEditorProps>(
  (
    {
      initialTokens = DEFAULT_TOKENS,
      onTokensChange,
      className,
      ...props
    },
    ref
  ) => {
    const [tokens, setTokens] = React.useState<DesignTokens>(initialTokens)
    const [activeTab, setActiveTab] = React.useState<"colors" | "typography" | "radii" | "preview" | "export">("colors")
    const [copied, setCopied] = React.useState(false)

    const updateColor = (key: keyof DesignTokens["colors"], value: string) => {
      const next = {
        ...tokens,
        colors: {
          ...tokens.colors,
          [key]: value,
        },
      }
      setTokens(next)
      onTokensChange?.(next)
    }

    const updateRadius = (px: number) => {
      const next = {
        ...tokens,
        radii: { basePx: px },
      }
      setTokens(next)
      onTokensChange?.(next)
    }

    const updateBaseSize = (px: number) => {
      const next = {
        ...tokens,
        typography: {
          ...tokens.typography,
          baseSizePx: px,
        },
      }
      setTokens(next)
      onTokensChange?.(next)
    }

    const handleReset = () => {
      setTokens(initialTokens)
      onTokensChange?.(initialTokens)
    }

    const generatedCssVars = React.useMemo(() => {
      return `/* Generated Design System Tokens */
:root {
  --color-primary: ${tokens.colors.primary};
  --color-background: ${tokens.colors.background};
  --color-foreground: ${tokens.colors.foreground};
  --color-muted: ${tokens.colors.muted};
  --color-border: ${tokens.colors.border};
  --color-accent: ${tokens.colors.accent};
  --font-family-base: ${tokens.typography.fontFamily};
  --font-size-base: ${tokens.typography.baseSizePx}px;
  --radius-base: ${tokens.radii.basePx}px;
  --spacing-unit: ${tokens.spacing.baseUnitPx}px;
}`
    }, [tokens])

    const handleCopy = () => {
      navigator.clipboard.writeText(generatedCssVars)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Design Token Editor"
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
              <Palette className="h-4 w-4" />
            </span>
            <div>
              <h4 className="font-semibold text-foreground">Design Token Editor</h4>
              <p className="text-[11px] text-muted-foreground">
                Safely inspect and modify design system color palettes, typography scale, and radius tokens
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
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition-colors shadow-2xs"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copied CSS" : "Export Tokens"}
            </button>
          </div>
        </div>

        {/* Safety Disclaimer */}
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-900 dark:text-blue-200">
          <Info className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="font-semibold">Scoped Sandbox:</strong> Token edits apply directly to this component&apos;s preview canvas and do not overwrite or pollute global root CSS variables across the rest of the application.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 border-b border-border text-xs">
          {(["colors", "typography", "radii", "preview", "export"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-3 py-1.5 font-semibold capitalize border-b-2 -mb-px transition-colors",
                activeTab === tab
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab 1: Colors */}
        {activeTab === "colors" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(tokens.colors).map(([key, val]) => (
              <div
                key={key}
                className="p-3 rounded-lg border border-border bg-background space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold capitalize text-foreground">{key}</span>
                  <span className="font-mono text-[10px] text-muted-foreground uppercase">{val}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <input
                    type="color"
                    value={val}
                    onChange={(e) => updateColor(key as keyof DesignTokens["colors"], e.target.value)}
                    className="w-8 h-8 rounded border border-border cursor-pointer p-0.5 bg-background shrink-0"
                  />
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => updateColor(key as keyof DesignTokens["colors"], e.target.value)}
                    className="flex-1 px-2.5 py-1 rounded border border-input bg-background font-mono text-xs text-foreground uppercase"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Typography */}
        {activeTab === "typography" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg border border-border bg-background space-y-1.5">
                <label className="font-semibold text-foreground block">Base Font Size: {tokens.typography.baseSizePx}px</label>
                <input
                  type="range"
                  min={12}
                  max={20}
                  step={1}
                  value={tokens.typography.baseSizePx}
                  onChange={(e) => updateBaseSize(Number(e.target.value))}
                  className="w-full accent-primary h-1.5 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                  <span>12px</span>
                  <span>14px (Default)</span>
                  <span>20px</span>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-border bg-background space-y-1.5">
                <label className="font-semibold text-foreground block">Font Family</label>
                <select
                  value={tokens.typography.fontFamily}
                  onChange={(e) =>
                    setTokens((prev) => ({
                      ...prev,
                      typography: { ...prev.typography, fontFamily: e.target.value },
                    }))
                  }
                  className="w-full px-2.5 py-1.5 rounded border border-input bg-background text-xs text-foreground"
                >
                  <option value="Inter, system-ui, sans-serif">Inter (Modern Clean)</option>
                  <option value="'JetBrains Mono', monospace">JetBrains Mono (Technical Code)</option>
                  <option value="Georgia, serif">Georgia (Editorial Serif)</option>
                  <option value="system-ui, sans-serif">System Native Sans</option>
                </select>
              </div>
            </div>

            {/* Type scale preview */}
            <div className="p-4 rounded-lg border border-border/80 bg-muted/20 space-y-2">
              <span className="font-mono text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                Type Scale Preview
              </span>
              <p
                style={{
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: `${tokens.typography.baseSizePx * 1.5}px`,
                  fontWeight: 700,
                }}
                className="text-foreground leading-tight"
              >
                Display Heading Text
              </p>
              <p
                style={{
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: `${tokens.typography.baseSizePx}px`,
                }}
                className="text-muted-foreground leading-normal"
              >
                Body text showing comfortable paragraph leading and kerning across scale bounds.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Radii */}
        {activeTab === "radii" && (
          <div className="space-y-4 text-xs">
            <div className="p-3 rounded-lg border border-border bg-background space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-foreground">Base Corner Radius</span>
                <span className="font-mono font-bold text-primary">{tokens.radii.basePx}px</span>
              </div>
              <input
                type="range"
                min={0}
                max={24}
                step={2}
                value={tokens.radii.basePx}
                onChange={(e) => updateRadius(Number(e.target.value))}
                className="w-full accent-primary h-1.5 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                <span>0px (Sharp)</span>
                <span>8px (Smooth)</span>
                <span>24px (Pill/Organic)</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div
                style={{ borderRadius: `${tokens.radii.basePx}px` }}
                className="p-4 border border-primary bg-primary/10 text-center font-semibold text-primary"
              >
                Button
              </div>
              <div
                style={{ borderRadius: `${tokens.radii.basePx * 1.5}px` }}
                className="p-4 border border-border bg-card text-center font-semibold text-foreground shadow-xs"
              >
                Card Box
              </div>
              <div
                style={{ borderRadius: "9999px" }}
                className="p-4 border border-border bg-muted text-center font-semibold text-muted-foreground"
              >
                Badge Tag
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Live Preview */}
        {activeTab === "preview" && (
          <div
            className="p-6 rounded-xl border space-y-4"
            style={{
              backgroundColor: tokens.colors.background,
              color: tokens.colors.foreground,
              borderColor: tokens.colors.border,
              fontFamily: tokens.typography.fontFamily,
            }}
          >
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: tokens.colors.border }}>
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: tokens.colors.primary }}
                />
                <h5 className="font-bold text-sm">Design System Canvas Preview</h5>
              </div>
              <span
                className="px-2 py-0.5 text-xs font-semibold"
                style={{
                  backgroundColor: tokens.colors.muted,
                  color: tokens.colors.foreground,
                  borderRadius: `${tokens.radii.basePx}px`,
                }}
              >
                v16.0 Tokens
              </span>
            </div>

            <p style={{ fontSize: `${tokens.typography.baseSizePx}px` }} className="opacity-80">
              Interactive sample button and card reflecting your customized token configurations.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                style={{
                  backgroundColor: tokens.colors.primary,
                  color: "#ffffff",
                  borderRadius: `${tokens.radii.basePx}px`,
                  fontSize: `${tokens.typography.baseSizePx}px`,
                }}
                className="px-4 py-2 font-semibold shadow-xs hover:opacity-90 transition-opacity"
              >
                Primary Button
              </button>

              <button
                type="button"
                style={{
                  backgroundColor: tokens.colors.muted,
                  color: tokens.colors.foreground,
                  borderRadius: `${tokens.radii.basePx}px`,
                  borderColor: tokens.colors.border,
                  fontSize: `${tokens.typography.baseSizePx}px`,
                }}
                className="px-4 py-2 font-semibold border hover:opacity-90 transition-opacity"
              >
                Secondary Action
              </button>
            </div>
          </div>
        )}

        {/* Tab 5: Export */}
        {activeTab === "export" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Ready-to-use CSS Variables (@theme / :root)</span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-primary font-semibold hover:underline"
              >
                {copied ? "Copied!" : "Copy code"}
              </button>
            </div>
            <pre className="p-3.5 rounded-lg bg-muted/60 border border-border/80 font-mono text-[11px] overflow-x-auto text-foreground leading-relaxed">
              {generatedCssVars}
            </pre>
          </div>
        )}
      </div>
    )
  }
)

DesignTokenEditor.displayName = "DesignTokenEditor"
