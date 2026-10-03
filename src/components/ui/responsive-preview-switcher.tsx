"use client"

import * as React from "react"
import {
  Smartphone,
  Tablet,
  Monitor,
  RotateCw,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Layers,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type DevicePreset = "mobile-sm" | "mobile-lg" | "tablet" | "desktop" | "responsive"

export interface ViewportConfig {
  id: DevicePreset
  name: string
  width: number
  height: number
  icon: React.ReactNode
}

export interface ResponsivePreviewSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {
  initialPreset?: DevicePreset
  renderPreview?: () => React.ReactNode
}

const PRESETS: ViewportConfig[] = [
  { id: "mobile-sm", name: "iPhone SE", width: 320, height: 568, icon: <Smartphone className="h-3.5 w-3.5" /> },
  { id: "mobile-lg", name: "iPhone 15", width: 390, height: 720, icon: <Smartphone className="h-4 w-4" /> },
  { id: "tablet", name: "iPad Mini", width: 768, height: 600, icon: <Tablet className="h-4 w-4" /> },
  { id: "desktop", name: "MacBook", width: 1024, height: 640, icon: <Monitor className="h-4 w-4" /> },
  { id: "responsive", name: "Fluid 100%", width: 0, height: 0, icon: <Maximize2 className="h-3.5 w-3.5" /> },
]

export const ResponsivePreviewSwitcher = React.forwardRef<HTMLDivElement, ResponsivePreviewSwitcherProps>(
  (
    {
      initialPreset = "mobile-lg",
      renderPreview,
      className,
      ...props
    },
    ref
  ) => {
    const [preset, setPreset] = React.useState<DevicePreset>(initialPreset)
    const [isLandscape, setIsLandscape] = React.useState(false)
    const [scale, setScale] = React.useState(1)

    const activeConfig = PRESETS.find((p) => p.id === preset) || PRESETS[1]

    const effectiveWidth = React.useMemo(() => {
      if (activeConfig.id === "responsive") return "100%"
      return isLandscape ? activeConfig.height : activeConfig.width
    }, [activeConfig, isLandscape])

    const effectiveHeight = React.useMemo(() => {
      if (activeConfig.id === "responsive") return 480
      return isLandscape ? activeConfig.width : activeConfig.height
    }, [activeConfig, isLandscape])

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Responsive Viewport Preview Switcher"
        className={cn(
          "w-full rounded-xl border border-border bg-card shadow-2xs p-4 space-y-4 select-none",
          className
        )}
        {...props}
      >
        {/* Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3 text-xs">
          {/* Preset Buttons */}
          <div className="flex items-center gap-1 bg-muted/40 p-1 rounded-lg border border-border">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPreset(p.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all",
                  preset === p.id
                    ? "bg-background text-foreground shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {p.icon}
                <span>{p.name}</span>
              </button>
            ))}
          </div>

          {/* Action Modifiers: Orientation & Zoom */}
          <div className="flex items-center gap-2">
            {preset !== "responsive" && (
              <button
                type="button"
                onClick={() => setIsLandscape(!isLandscape)}
                className={cn(
                  "inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border bg-background text-xs font-medium transition-colors",
                  isLandscape ? "bg-muted text-primary font-bold" : "text-muted-foreground hover:text-foreground"
                )}
                title="Rotate Orientation"
              >
                <RotateCw className="h-3.5 w-3.5" />
                <span>{isLandscape ? "Landscape" : "Portrait"}</span>
              </button>
            )}

            <div className="flex items-center gap-1 bg-background border border-border rounded-lg p-1 text-xs">
              <button
                type="button"
                onClick={() => setScale((s) => Math.max(0.6, +(s - 0.1).toFixed(2)))}
                className="p-1 text-muted-foreground hover:text-foreground rounded"
                title="Scale Down"
              >
                <ZoomOut className="h-3 w-3" />
              </button>
              <span className="font-mono text-[10px] px-1 font-semibold text-muted-foreground">
                {Math.round(scale * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setScale((s) => Math.min(1.2, +(s + 0.1).toFixed(2)))}
                className="p-1 text-muted-foreground hover:text-foreground rounded"
                title="Scale Up"
              >
                <ZoomIn className="h-3 w-3" />
              </button>
            </div>

            <span className="font-mono text-[11px] text-muted-foreground px-1.5">
              {typeof effectiveWidth === "number" ? `${effectiveWidth} × ${effectiveHeight} px` : "Fluid 100%"}
            </span>
          </div>
        </div>

        {/* Viewport Frame Canvas */}
        <div className="relative w-full min-h-[480px] rounded-lg border border-dashed border-border/80 bg-muted/20 p-4 flex items-center justify-center overflow-auto">
          <div
            style={{
              width: effectiveWidth,
              maxWidth: "100%",
              transform: `scale(${scale})`,
              transformOrigin: "top center",
              transition: "width 0.2s ease, height 0.2s ease",
            }}
            className={cn(
              "overflow-hidden rounded-2xl border-4 border-slate-800 bg-background shadow-2xl transition-all duration-200",
              preset === "responsive" && "border-2 border-border rounded-lg shadow-xs"
            )}
          >
            {/* Device Notch / Status Bar */}
            {preset !== "responsive" && (
              <div className="h-6 bg-slate-900 flex items-center justify-between px-4 text-[10px] text-slate-400 font-mono select-none">
                <span>09:41</span>
                <div className="w-16 h-3 bg-black rounded-full" />
                <div className="flex items-center gap-1">5G 100%</div>
              </div>
            )}

            {/* Render Preview Content */}
            <div className="p-4 space-y-4 text-xs">
              {renderPreview ? (
                renderPreview()
              ) : (
                <div className="space-y-4">
                  {/* Sample responsive UI layout */}
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">
                        UI
                      </div>
                      <span className="font-bold text-foreground">Studio Hub</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-semibold">
                      Live Preview
                    </span>
                  </div>

                  <div className="p-4 rounded-xl border border-border bg-card space-y-2">
                    <h5 className="font-bold text-sm text-foreground">Responsive Design System</h5>
                    <p className="text-muted-foreground leading-relaxed">
                      Fluid typography, adaptive container padding, and flex wrap boundaries scale cleanly across breakpoints.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2">
                      <button className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground font-semibold text-xs shadow-xs">
                        Action CTA
                      </button>
                      <button className="px-3 py-1.5 rounded-md border border-border bg-background text-foreground font-semibold text-xs">
                        Secondary
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="p-3 rounded-lg border border-border bg-muted/40 font-semibold">
                      Column A
                    </div>
                    <div className="p-3 rounded-lg border border-border bg-muted/40 font-semibold">
                      Column B
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
)

ResponsivePreviewSwitcher.displayName = "ResponsivePreviewSwitcher"
