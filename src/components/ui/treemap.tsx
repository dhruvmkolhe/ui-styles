"use client"

import * as React from "react"
import { ChevronRight, ArrowLeft, Layers, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TreemapNode {
  id: string
  name: string
  value: number
  color?: string
  children?: TreemapNode[]
}

export interface TreemapProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: TreemapNode
  width?: number
  height?: number
  colorTheme?: "emerald" | "blue" | "violet" | "amber" | "monochrome"
  onNodeClick?: (node: TreemapNode) => void
}

interface LayoutRect {
  node: TreemapNode
  x: number
  y: number
  w: number
  h: number
  color: string
}

const DEFAULT_TREEMAP_DATA: TreemapNode = {
  id: "root",
  name: "System Storage",
  value: 256,
  children: [
    {
      id: "apps",
      name: "Applications",
      value: 94,
      children: [
        { id: "ide", name: "IDE & DevTools", value: 42 },
        { id: "browsers", name: "Web Browsers", value: 28 },
        { id: "design", name: "Design Suite", value: 24 },
      ],
    },
    {
      id: "media",
      name: "Media & Assets",
      value: 68,
      children: [
        { id: "video", name: "4K Recordings", value: 38 },
        { id: "audio", name: "Soundtracks", value: 18 },
        { id: "images", name: "Mockups & Icons", value: 12 },
      ],
    },
    {
      id: "system",
      name: "System Files",
      value: 52,
      children: [
        { id: "os", name: "Operating Kernel", value: 34 },
        { id: "cache", name: "Runtime Cache", value: 18 },
      ],
    },
    {
      id: "docs",
      name: "Documents",
      value: 42,
      children: [
        { id: "repos", name: "Git Repositories", value: 26 },
        { id: "notes", name: "Vault Notes", value: 16 },
      ],
    },
  ],
}

const COLOR_PALETTES: Record<string, string[]> = {
  emerald: ["#059669", "#10b981", "#34d399", "#6ee7b7", "#047857", "#065f46"],
  blue: ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#1d4ed8", "#1e40af"],
  violet: ["#7c3aed", "#8b5cf6", "#a78bfa", "#c4b5fd", "#6d28d9", "#5b21b6"],
  amber: ["#d97706", "#f59e0b", "#fbbf24", "#fcd34d", "#b45309", "#92400e"],
  monochrome: ["#475569", "#64748b", "#94a3b8", "#cbd5e1", "#334155", "#1e293b"],
}

export const Treemap = React.forwardRef<HTMLDivElement, TreemapProps>(
  (
    {
      data = DEFAULT_TREEMAP_DATA,
      width = 640,
      height = 360,
      colorTheme = "emerald",
      onNodeClick,
      className,
      ...props
    },
    ref
  ) => {
    const [currentNode, setCurrentNode] = React.useState<TreemapNode>(data)
    const [pathHistory, setPathHistory] = React.useState<TreemapNode[]>([])
    const [hoveredNode, setHoveredNode] = React.useState<TreemapNode | null>(null)
    const [tooltipPos, setTooltipPos] = React.useState<{ x: number; y: number } | null>(null)

    const palette = COLOR_PALETTES[colorTheme] || COLOR_PALETTES.emerald

    // Recursive sum
    const getNodeValue = (node: TreemapNode): number => {
      if (!node.children || node.children.length === 0) return node.value || 1
      return node.children.reduce((acc, c) => acc + getNodeValue(c), 0)
    }

    const totalCurrentValue = React.useMemo(() => getNodeValue(currentNode), [currentNode])

    // Compute Treemap layout using squarified alternating slice partitioning
    const layoutRects: LayoutRect[] = React.useMemo(() => {
      const items = currentNode.children && currentNode.children.length > 0
        ? [...currentNode.children].sort((a, b) => getNodeValue(b) - getNodeValue(a))
        : [currentNode]

      const rects: LayoutRect[] = []
      const total = items.reduce((acc, it) => acc + getNodeValue(it), 0) || 1

      // Slice & dice squarified layout partition
      function partition(
        subItems: TreemapNode[],
        x: number,
        y: number,
        w: number,
        h: number,
        depth: number
      ) {
        if (subItems.length === 0) return
        if (subItems.length === 1) {
          const it = subItems[0]
          rects.push({
            node: it,
            x,
            y,
            w,
            h,
            color: palette[rects.length % palette.length],
          })
          return
        }

        const subTotal = subItems.reduce((acc, it) => acc + getNodeValue(it), 0) || 1
        const isHorizontal = w >= h

        let currentOffset = 0
        subItems.forEach((it, idx) => {
          const val = getNodeValue(it)
          const ratio = val / subTotal
          const itemColor = it.color || palette[(rects.length + idx) % palette.length]

          if (isHorizontal) {
            const itemW = ratio * w
            rects.push({
              node: it,
              x: x + currentOffset,
              y,
              w: Math.max(0, itemW),
              h,
              color: itemColor,
            })
            currentOffset += itemW
          } else {
            const itemH = ratio * h
            rects.push({
              node: it,
              x,
              y: y + currentOffset,
              w,
              h: Math.max(0, itemH),
              color: itemColor,
            })
            currentOffset += itemH
          }
        })
      }

      partition(items, 0, 0, width, height, 0)
      return rects
    }, [currentNode, width, height, palette])

    const handleDrillDown = (node: TreemapNode) => {
      if (node.children && node.children.length > 0) {
        setPathHistory((prev) => [...prev, currentNode])
        setCurrentNode(node)
      }
      onNodeClick?.(node)
    }

    const handleBack = () => {
      if (pathHistory.length === 0) return
      const nextHistory = [...pathHistory]
      const parent = nextHistory.pop()
      if (parent) {
        setPathHistory(nextHistory)
        setCurrentNode(parent)
      }
    }

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Hierarchical Treemap Visualization"
        className={cn(
          "w-full rounded-xl border border-border bg-card shadow-2xs p-4 space-y-3 select-none",
          className
        )}
        {...props}
      >
        {/* Header with Breadcrumb and Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3 text-xs">
          <div className="flex items-center gap-1.5 font-medium text-foreground">
            <span className="p-1 rounded bg-primary/10 text-primary">
              <Layers className="h-4 w-4" />
            </span>
            <div className="flex items-center gap-1">
              {pathHistory.length > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mr-1 px-1.5 py-0.5 rounded border border-border hover:bg-muted"
                >
                  <ArrowLeft className="h-3 w-3" /> Back
                </button>
              )}
              <span className="font-semibold">{currentNode.name}</span>
              <span className="text-[11px] text-muted-foreground font-mono">
                ({totalCurrentValue} GB · {currentNode.children?.length || 0} categories)
              </span>
            </div>
          </div>

          <div className="text-[11px] text-muted-foreground flex items-center gap-1">
            <Info className="h-3 w-3" />
            <span>Click any node with subcategories to drill down</span>
          </div>
        </div>

        {/* Treemap SVG Canvas */}
        <div className="relative w-full overflow-hidden rounded-lg border border-border/80 bg-background/50">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto block"
            style={{ aspectRatio: `${width} / ${height}` }}
            onMouseLeave={() => {
              setHoveredNode(null)
              setTooltipPos(null)
            }}
          >
            {layoutRects.map((rect, idx) => {
              const val = getNodeValue(rect.node)
              const pct = ((val / totalCurrentValue) * 100).toFixed(1)
              const isHovered = hoveredNode?.id === rect.node.id
              const hasSub = rect.node.children && rect.node.children.length > 0

              return (
                <g
                  key={rect.node.id || idx}
                  className={cn("transition-transform duration-150 cursor-pointer")}
                  onClick={() => handleDrillDown(rect.node)}
                  onMouseEnter={(e) => {
                    setHoveredNode(rect.node)
                    const svgRect = e.currentTarget.ownerSVGElement?.getBoundingClientRect()
                    if (svgRect) {
                      setTooltipPos({
                        x: (rect.x + rect.w / 2) * (svgRect.width / width),
                        y: rect.y * (svgRect.height / height),
                      })
                    }
                  }}
                >
                  <rect
                    x={rect.x + 1}
                    y={rect.y + 1}
                    width={Math.max(1, rect.w - 2)}
                    height={Math.max(1, rect.h - 2)}
                    fill={rect.color}
                    rx={6}
                    opacity={isHovered ? 0.95 : 0.82}
                    stroke={isHovered ? "#ffffff" : "rgba(0,0,0,0.15)"}
                    strokeWidth={isHovered ? 2 : 1}
                    className="transition-all duration-150"
                  />
                  {rect.w > 48 && rect.h > 36 && (
                    <foreignObject
                      x={rect.x + 4}
                      y={rect.y + 4}
                      width={rect.w - 8}
                      height={rect.h - 8}
                      className="pointer-events-none overflow-hidden"
                    >
                      <div className="h-full w-full flex flex-col justify-start p-1 text-white select-none">
                        <div className="font-semibold text-xs leading-tight truncate drop-shadow-xs flex items-center gap-1">
                          {rect.node.name}
                          {hasSub && <ChevronRight className="h-3 w-3 shrink-0 opacity-80" />}
                        </div>
                        <div className="text-[10px] font-mono opacity-90 drop-shadow-xs">
                          {val} GB · {pct}%
                        </div>
                      </div>
                    </foreignObject>
                  )}
                </g>
              )
            })}
          </svg>

          {/* Floating Tooltip */}
          {hoveredNode && tooltipPos && (
            <div
              className="absolute z-20 pointer-events-none rounded-lg border border-border bg-popover/95 px-3 py-2 text-xs shadow-md backdrop-blur-xs transform -translate-x-1/2 -translate-y-full mb-2 animate-in fade-in zoom-in-95 duration-100"
              style={{
                left: Math.max(80, Math.min(tooltipPos.x, width - 80)),
                top: Math.max(30, tooltipPos.y - 8),
              }}
            >
              <div className="font-semibold text-foreground flex items-center gap-1.5">
                <span>{hoveredNode.name}</span>
                {hoveredNode.children && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-primary/10 text-primary">
                    {hoveredNode.children.length} sub-items
                  </span>
                )}
              </div>
              <div className="text-muted-foreground text-[11px] font-mono mt-0.5">
                Size: <span className="text-foreground font-semibold">{getNodeValue(hoveredNode)} GB</span> (
                {((getNodeValue(hoveredNode) / totalCurrentValue) * 100).toFixed(1)}% of view)
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
)

Treemap.displayName = "Treemap"
