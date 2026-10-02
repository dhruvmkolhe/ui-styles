"use client"

import React, { useState, useRef } from "react"
import {
  ChevronDown,
  Columns2,
  Copy,
  Download,
  GripHorizontal,
  GripVertical,
  Layers,
  LayoutGrid,
  Maximize2,
  RotateCcw,
  ScrollText,
  Share2,
  Sliders,
  Sparkles,
  Terminal,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Mode, StyleSlug } from "@/lib/styles/types"
import { getStyleFormKit } from "./common-form-kit"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import { Divider, Separator } from "@/components/ui/divider"
import { Container } from "@/components/ui/container"
import { Grid, GridItem } from "@/components/ui/grid"
import { Stack } from "@/components/ui/stack"
import { SplitPane } from "@/components/ui/split-pane"
import { AspectRatio, type AspectRatioPreset } from "@/components/ui/aspect-ratio"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable-panel"
import { Masonry, type MasonryCols } from "@/components/ui/masonry"

/* ========================================================================== */
/* 1 · Collapsible Preview                                                    */
/* ========================================================================== */
export function CollapsiblePreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="mx-auto w-full max-w-md space-y-3">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Disclosure Panel
        </span>
        <span className={cn("text-xs font-mono", k.muted)}>
          State: {isOpen ? "Expanded" : "Collapsed"}
        </span>
      </div>

      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className={cn("border overflow-hidden shadow-xs", k.panel, k.radius)}
      >
        <div className="p-4 flex items-center justify-between">
          <div>
            <h4 className={cn("text-xs font-bold", k.strong)}>System Telemetry &amp; Metrics</h4>
            <p className={cn("text-[11px]", k.muted)}>Click to view cluster resource allocations.</p>
          </div>
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className={cn(
                "p-1.5 rounded border border-border hover:bg-muted transition-colors outline-none focus-visible:ring-1 focus-visible:ring-ring",
                k.radius
              )}
            >
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
              <span className="sr-only">Toggle telemetry details</span>
            </button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          <div className="px-4 pb-4 pt-2 border-t border-border/60 text-xs space-y-2 bg-muted/20">
            <div className="flex items-center justify-between">
              <span className={k.muted}>Edge CDN Hit Ratio</span>
              <span className={cn("font-mono font-bold text-emerald-600 dark:text-emerald-400")}>99.4%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={k.muted}>Active Worker Instances</span>
              <span className={cn("font-mono font-bold", k.strong)}>64 nodes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={k.muted}>Average Response Latency</span>
              <span className={cn("font-mono font-bold", k.strong)}>28ms</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

/* ========================================================================== */
/* 2 · Divider / Separator Preview                                            */
/* ========================================================================== */
export function DividerPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)

  return (
    <div className="mx-auto w-full max-w-lg space-y-6">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Separators &amp; Dividers
        </span>
        <span className={cn("text-xs font-mono", k.muted)}>Horizontal &amp; Vertical</span>
      </div>

      <div className={cn("p-6 border space-y-5", k.panel, k.radius)}>
        {/* Labeled horizontal divider */}
        <div className="space-y-2">
          <div className={cn("text-xs font-semibold", k.muted)}>Labeled Section Divider:</div>
          <Divider label="Deployment Stages" spacing="sm" />
        </div>

        {/* Inline vertical divider toolbar */}
        <div className="space-y-2">
          <div className={cn("text-xs font-semibold", k.muted)}>Vertical Action Divider:</div>
          <div className="flex items-center gap-3 text-xs p-2 rounded border border-border/80 bg-background/50">
            <button type="button" className="font-semibold hover:underline">Copy Code</button>
            <Divider orientation="vertical" spacing="none" className="h-4" />
            <button type="button" className="text-muted-foreground hover:text-foreground">Download SVG</button>
            <Divider orientation="vertical" spacing="none" className="h-4" />
            <button type="button" className="text-muted-foreground hover:text-foreground">Share Spec</button>
          </div>
        </div>

        {/* Subdued horizontal divider */}
        <div className="space-y-2">
          <div className={cn("text-xs font-semibold", k.muted)}>Subtle Break:</div>
          <Divider spacing="sm" decorative />
          <p className={cn("text-[11px]", k.muted)}>
            Decorative mode renders standard semantic presentation without creating accessibility noise for screen readers.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ========================================================================== */
/* 3 · Container Preview                                                      */
/* ========================================================================== */
export function ContainerPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [size, setSize] = useState<"sm" | "md" | "lg" | "xl">("md")

  const sizeLabels = {
    sm: "sm (640px)",
    md: "md (768px)",
    lg: "lg (1024px)",
    xl: "xl (1280px)",
  }

  return (
    <div className="mx-auto w-full space-y-4">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Responsive Container
        </span>
        <div className="flex items-center gap-1.5 text-xs">
          {(["sm", "md", "lg", "xl"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={cn(
                "px-2.5 py-1 text-xs rounded border transition-colors",
                size === s ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted"
              )}
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className={cn("border border-dashed border-border/80 p-4 bg-muted/10", k.radius)}>
        <Container size={size} className={cn("border p-6 shadow-sm transition-all duration-300", k.panel, k.radius)}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-3">
            <div>
              <h4 className={cn("text-sm font-bold", k.strong)}>Bound Viewport Box</h4>
              <p className={cn("text-xs", k.muted)}>Max-width target: {sizeLabels[size]}</p>
            </div>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-muted">
              Auto Centered (mx-auto)
            </span>
          </div>
          <p className={cn("mt-3 text-xs leading-relaxed", k.muted)}>
            Containers enforce standardized responsive horizontal margins and padding presets across mobile, tablet, and desktop viewports without requiring custom inline media queries.
          </p>
        </Container>
      </div>
    </div>
  )
}

/* ========================================================================== */
/* 4 · Grid Preview                                                           */
/* ========================================================================== */
export function GridPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [cols, setCols] = useState<number>(3)

  return (
    <div className="mx-auto w-full max-w-xl space-y-4">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          CSS Grid Matrix
        </span>
        <div className="flex items-center gap-1 text-xs">
          {[2, 3, 4].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCols(c)}
              className={cn(
                "px-2.5 py-1 text-xs rounded border transition-colors",
                cols === c ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted"
              )}
            >
              {c} Cols
            </button>
          ))}
        </div>
      </div>

      <Grid cols={cols as any} gap="sm" className="w-full">
        {Array.from({ length: 6 }).map((_, idx) => (
          <GridItem
            key={idx}
            className={cn(
              "p-4 border flex flex-col justify-between gap-2 shadow-xs transition-all",
              k.panel,
              k.radius
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-muted-foreground">0{idx + 1}</span>
              <LayoutGrid className="h-3.5 w-3.5 text-muted-foreground/60" />
            </div>
            <div className={cn("text-xs font-semibold", k.strong)}>Matrix Tile {idx + 1}</div>
            <div className={cn("text-[10px] font-mono", k.muted)}>Auto Gap &middot; Aligned</div>
          </GridItem>
        ))}
      </Grid>
    </div>
  )
}

/* ========================================================================== */
/* 5 · Stack Preview                                                          */
/* ========================================================================== */
export function StackPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [direction, setDirection] = useState<"horizontal" | "vertical">("horizontal")
  const [withDivider, setWithDivider] = useState(true)

  return (
    <div className="mx-auto w-full max-w-xl space-y-4">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Linear Flex Stack
        </span>
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setDirection((d) => (d === "horizontal" ? "vertical" : "horizontal"))}
            className={cn("px-2.5 py-1 rounded border hover:bg-muted font-medium transition-colors")}
          >
            Direction: {direction === "horizontal" ? "Row" : "Column"}
          </button>
          <button
            type="button"
            onClick={() => setWithDivider(!withDivider)}
            className={cn(
              "px-2.5 py-1 rounded border transition-colors",
              withDivider ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted"
            )}
          >
            Divider: {withDivider ? "ON" : "OFF"}
          </button>
        </div>
      </div>

      <div className={cn("p-5 border", k.panel, k.radius)}>
        <Stack
          direction={direction}
          gap="sm"
          align="center"
          divider={withDivider ? <span className="text-muted-foreground/40 font-mono text-xs">•</span> : undefined}
          className="w-full"
        >
          <div className="p-3 border rounded bg-background/50 flex-1 text-xs min-w-0">
            <span className={cn("font-bold block truncate", k.strong)}>Step 1: Ingest</span>
            <span className={cn("text-[11px] block truncate", k.muted)}>Stream event payload</span>
          </div>
          <div className="p-3 border rounded bg-background/50 flex-1 text-xs min-w-0">
            <span className={cn("font-bold block truncate", k.strong)}>Step 2: Transform</span>
            <span className={cn("text-[11px] block truncate", k.muted)}>Normalize token keys</span>
          </div>
          <div className="p-3 border rounded bg-background/50 flex-1 text-xs min-w-0">
            <span className={cn("font-bold block truncate", k.strong)}>Step 3: Publish</span>
            <span className={cn("text-[11px] block truncate", k.muted)}>Broadcast to edge</span>
          </div>
        </Stack>
      </div>
    </div>
  )
}

/* ========================================================================== */
/* 6 · Split Pane Preview                                                     */
/* ========================================================================== */
export function SplitPanePreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [size, setSize] = useState(50)

  return (
    <div className="mx-auto w-full max-w-xl space-y-3">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Resizable Split Pane (Drag Divider)
        </span>
        <span className={cn("text-xs font-mono", k.muted)}>
          Pane A: {Math.round(size)}% | Pane B: {100 - Math.round(size)}%
        </span>
      </div>

      <SplitPane
        direction="horizontal"
        initialSize={50}
        onSizeChange={setSize}
        className={cn("border shadow-xs h-64", k.panel, k.radius)}
        primaryPanel={
          <div className="p-4 h-full flex flex-col justify-between text-xs space-y-2">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                <Terminal className={cn("h-3.5 w-3.5", k.strong)} />
                <span>Primary Editor Pane</span>
              </div>
              <p className={cn("text-[11px] mt-1.5 leading-relaxed", k.muted)}>
                Use pointer dragging on the central handle or use arrow keys when focused to adjust pane widths.
              </p>
            </div>
            <div className={cn("font-mono text-[10px] text-muted-foreground bg-muted/40 p-2", k.radius)}>
              width: {Math.round(size)}%
            </div>
          </div>
        }
        secondaryPanel={
          <div className="p-4 h-full flex flex-col justify-between text-xs bg-muted/10 space-y-2">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>Live Preview Pane</span>
              </div>
              <p className={cn("text-[11px] mt-1.5 leading-relaxed", k.muted)}>
                Automatic min-size constraints (20%) prevent panels from collapsing out of view.
              </p>
            </div>
            <div className="font-mono text-[10px] text-muted-foreground bg-muted/40 p-2 rounded">
              width: {100 - Math.round(size)}%
            </div>
          </div>
        }
      />
    </div>
  )
}

/* ========================================================================== */
/* 7 · Aspect Ratio Preview                                                   */
/* ========================================================================== */
export function AspectRatioPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [ratio, setRatio] = useState<AspectRatioPreset>("16:9")

  const presets: AspectRatioPreset[] = ["16:9", "4:3", "1:1", "21:9"]

  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Aspect Ratio Container
        </span>
        <div className="flex items-center gap-1 text-xs">
          {presets.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setRatio(p)}
              className={cn(
                "px-2 py-0.5 text-xs rounded border transition-colors",
                ratio === p ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className={cn("border border-border/60 p-4", k.panelSoft, k.radius)}>
        <AspectRatio ratio={ratio} className={cn("border shadow-inner", k.panel, k.radius)}>
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center space-y-1">
            <span className="font-mono text-sm font-bold text-foreground">{ratio}</span>
            <span className={cn("text-xs", k.muted)}>Native CSS aspect-ratio</span>
          </div>
        </AspectRatio>
      </div>
    </div>
  )
}

/* ========================================================================== */
/* 8 · Scroll Area Preview                                                    */
/* ========================================================================== */
export function ScrollAreaPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)

  const logEntries = [
    { time: "21:30:01", msg: "Initialized Turbopack compilation daemon." },
    { time: "21:30:04", msg: "Verified 25 design style kits and tokens." },
    { time: "21:30:08", msg: "Mounted responsive Container & Grid system." },
    { time: "21:30:12", msg: "Registered PointerCapture on SplitPane handle." },
    { time: "21:30:15", msg: "Synthesized CSS aspect-ratio constraints." },
    { time: "21:30:19", msg: "Initialized keyboard roving focus on ScrollArea." },
    { time: "21:30:24", msg: "Resolved hydration tree with 0 nesting errors." },
    { time: "21:30:28", msg: "Production cluster ready for edge distribution." },
  ]

  return (
    <div className="mx-auto w-full max-w-lg space-y-3">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Scroll Area (Keyboard Scrollable)
        </span>
        <span className={cn("text-xs font-mono", k.muted)}>max-height: 180px</span>
      </div>

      <div className={cn("border overflow-hidden", k.panel, k.radius)}>
        <div className="px-4 py-2 border-b border-border/60 bg-muted/30 flex items-center justify-between text-xs font-semibold">
          <span>Server Execution Logs</span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">● LIVE</span>
        </div>
        <ScrollArea maxHeight={180} className="p-4 space-y-2">
          {logEntries.map((log, i) => (
            <div key={i} className="flex items-baseline gap-2 font-mono text-xs">
              <span className="text-muted-foreground/60 select-none text-[11px]">{log.time}</span>
              <span className={k.strong}>{log.msg}</span>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  )
}

/* ========================================================================== */
/* 9 · Resizable Panel Preview                                                */
/* ========================================================================== */
export function ResizablePanelPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)

  return (
    <div className="mx-auto w-full max-w-xl space-y-3">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Multi-Panel Resizable Group
        </span>
        <span className={cn("text-xs font-mono", k.muted)}>Drag handle or focus &amp; arrows</span>
      </div>

      <ResizablePanelGroup
        direction="horizontal"
        className={cn("border shadow-xs h-64", k.panel, k.radius)}
      >
        <ResizablePanel defaultSize={35} minSize={20} maxSize={50} className="p-4 border-r border-border/40">
          <div className="space-y-1">
            <h5 className={cn("text-xs font-bold", k.strong)}>Navigation Tree</h5>
            <p className={cn("text-[11px]", k.muted)}>Components suite and styles.</p>
          </div>
          <div className="mt-4 space-y-1 text-xs">
            <div className="p-1 rounded bg-muted/60 font-mono text-[11px]">📁 src/components</div>
            <div className="p-1 pl-4 text-muted-foreground text-[11px]">📄 layout.tsx</div>
            <div className="p-1 pl-4 text-muted-foreground text-[11px]">📄 container.tsx</div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={65} minSize={50} maxSize={80} className="p-4 bg-muted/10">
          <div className="space-y-1">
            <h5 className={cn("text-xs font-bold", k.strong)}>Document Surface</h5>
            <p className={cn("text-[11px]", k.muted)}>Active working buffer area with dynamic sizing.</p>
          </div>
          <div className="mt-4 p-3 border rounded bg-background font-mono text-xs text-muted-foreground">
            // ResizablePanel automatically synchronizes sibling sizes.
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

/* ========================================================================== */
/* 10 · Masonry Preview                                                       */
/* ========================================================================== */
export function MasonryPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [colsOverride, setColsOverride] = useState<MasonryCols | null>(null)

  const items = [
    {
      num: "01",
      tag: "SYSTEM",
      title: "Design Principles",
      desc: "Establishing strict typography hierarchies and token constraints across all visual surfaces.",
      minHeight: "min-h-[120px]",
      badge: "CORE",
    },
    {
      num: "02",
      tag: "TOKENS",
      title: "Responsive Breakpoints",
      desc: "Coordinating multi-device fluid tokens across mobile, tablet, laptop, and ultra-wide monitor screens with synchronized clamp functions.",
      minHeight: "min-h-[165px]",
      badge: "FLUID",
    },
    {
      num: "03",
      tag: "A11Y",
      title: "Color Contrast",
      desc: "WCAG 2.2 AAA ratings verified with high-contrast luminance ratios.",
      minHeight: "min-h-[105px]",
      badge: "7.1:1",
    },
    {
      num: "04",
      tag: "MOTION",
      title: "Spring Physics Engine",
      desc: "Interactive kinetic curves and cubic-bezier transition rates tuned for tactile user interactions and natural dampening.",
      minHeight: "min-h-[155px]",
      badge: "60 FPS",
    },
    {
      num: "05",
      tag: "PERF",
      title: "Zero Cumulative Layout Shift",
      desc: "Aspect-ratio placeholders prevent reflows during lazy asset mounting.",
      minHeight: "min-h-[120px]",
      badge: "0.00 CLS",
    },
    {
      num: "06",
      tag: "WATERFALL",
      title: "Staggered Flow Architecture",
      desc: "Dynamic multi-column tracks distribute elements horizontally so the natural reading order flows left-to-right across the top row before descending.",
      minHeight: "min-h-[175px]",
      badge: "STREAM",
    },
    {
      num: "07",
      tag: "EDGE",
      title: "Sub-Millisecond Hydration",
      desc: "Optimized server bundle with zero redundant DOM nesting or hydration drift.",
      minHeight: "min-h-[110px]",
      badge: "99.9%",
    },
  ]

  const activeCols: MasonryCols | { default: MasonryCols; sm: MasonryCols; md: MasonryCols } =
    colsOverride ?? { default: 1, sm: 2, md: 3 }

  return (
    <div className="mx-auto w-full max-w-xl space-y-4">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Responsive Masonry Waterfall
        </span>
        <div className="flex items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => setColsOverride(null)}
            className={cn(
              "px-2.5 py-1 text-xs rounded border transition-colors",
              colsOverride === null ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted"
            )}
          >
            Auto
          </button>
          {([2, 3] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColsOverride(c)}
              className={cn(
                "px-2.5 py-1 text-xs rounded border transition-colors",
                colsOverride === c ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted"
              )}
            >
              {c} Cols
            </button>
          ))}
        </div>
      </div>

      <Masonry cols={activeCols} gap="sm" className="w-full">
        {items.map((item) => (
          <div
            key={item.num}
            className={cn(
              "p-4 border shadow-xs flex flex-col justify-between transition-all",
              item.minHeight,
              k.panel,
              k.radius
            )}
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] font-mono text-muted-foreground">ENTRY {item.num}</span>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-muted/60 text-muted-foreground">
                  {item.tag}
                </span>
              </div>
              <h5 className={cn("text-xs font-bold mt-0.5", k.strong)}>{item.title}</h5>
              <p className={cn("text-[11px] mt-1.5 leading-relaxed", k.muted)}>{item.desc}</p>
            </div>
            <div className="flex items-center justify-between border-t border-border/40 pt-2 mt-3 text-[9px] font-mono text-muted-foreground">
              <span>{item.badge}</span>
              <span>VERIFIED</span>
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  )
}
