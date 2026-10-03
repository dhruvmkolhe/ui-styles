"use client"

import * as React from "react"
import { GitCommit, AlertTriangle, ArrowRight, Layers } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SankeyNode {
  id: string
  name: string
  color?: string
  column?: number // optional explicit column override
}

export interface SankeyLink {
  source: string
  target: string
  value: number
  color?: string
}

export interface SankeyData {
  nodes: SankeyNode[]
  links: SankeyLink[]
}

export interface SankeyDiagramProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: SankeyData
  width?: number
  height?: number
  nodeWidth?: number
  onNodeClick?: (node: SankeyNode) => void
  onLinkClick?: (link: SankeyLink) => void
}

const DEFAULT_SANKEY_DATA: SankeyData = {
  nodes: [
    // Column 0: Acquisition Sources
    { id: "organic", name: "Organic Search", color: "#10b981", column: 0 },
    { id: "direct", name: "Direct Traffic", color: "#06b6d4", column: 0 },
    { id: "social", name: "Social Media", color: "#8b5cf6", column: 0 },
    { id: "referral", name: "Partner Referral", color: "#f59e0b", column: 0 },

    // Column 1: Entry Landing Pages
    { id: "home", name: "Homepage", color: "#3b82f6", column: 1 },
    { id: "docs", name: "Developer Docs", color: "#6366f1", column: 1 },
    { id: "pricing", name: "Pricing Page", color: "#ec4899", column: 1 },

    // Column 2: Conversions / Outcomes
    { id: "signup", name: "Free Signup", color: "#10b981", column: 2 },
    { id: "pro", name: "Pro Trial", color: "#f97316", column: 2 },
    { id: "bounce", name: "Bounce / Exit", color: "#64748b", column: 2 },
  ],
  links: [
    { source: "organic", target: "home", value: 3400 },
    { source: "organic", target: "docs", value: 4200 },
    { source: "direct", target: "home", value: 5100 },
    { source: "social", target: "home", value: 1800 },
    { source: "referral", target: "pricing", value: 2400 },
    { source: "home", target: "pricing", value: 3800 },
    { source: "home", target: "signup", value: 2900 },
    { source: "home", target: "bounce", value: 3600 },
    { source: "docs", target: "signup", value: 2800 },
    { source: "docs", target: "bounce", value: 1400 },
    { source: "pricing", target: "pro", value: 3200 },
    { source: "pricing", target: "signup", value: 1900 },
    { source: "pricing", target: "bounce", value: 1100 },
  ],
}

export const SankeyDiagram = React.forwardRef<HTMLDivElement, SankeyDiagramProps>(
  (
    {
      data = DEFAULT_SANKEY_DATA,
      width = 720,
      height = 360,
      nodeWidth = 18,
      onNodeClick,
      onLinkClick,
      className,
      ...props
    },
    ref
  ) => {
    const [hoveredLink, setHoveredLink] = React.useState<SankeyLink | null>(null)
    const [hoveredNode, setHoveredNode] = React.useState<string | null>(null)

    // Validate nodes & links to gracefully catch invalid or broken edges
    const { validNodes, validLinks, invalidLinkCount, columns } = React.useMemo(() => {
      const nodeMap = new Map<string, SankeyNode>()
      data.nodes.forEach((n) => nodeMap.set(n.id, n))

      let invalid = 0
      const safeLinks: SankeyLink[] = []

      data.links.forEach((link) => {
        if (nodeMap.has(link.source) && nodeMap.has(link.target) && link.value > 0) {
          safeLinks.push(link)
        } else {
          invalid++
        }
      })

      // Group nodes into distinct columns
      const cols: SankeyNode[][] = [[], [], []]
      data.nodes.forEach((node) => {
        const colIdx = Math.min(2, Math.max(0, node.column ?? 0))
        cols[colIdx].push(node)
      })

      return {
        validNodes: data.nodes,
        validLinks: safeLinks,
        invalidLinkCount: invalid,
        columns: cols,
      }
    }, [data])

    // Compute total node throughput
    const nodeTotals = React.useMemo(() => {
      const totals: Record<string, { in: number; out: number; total: number }> = {}
      validNodes.forEach((n) => {
        totals[n.id] = { in: 0, out: 0, total: 0 }
      })
      validLinks.forEach((link) => {
        if (totals[link.source]) totals[link.source].out += link.value
        if (totals[link.target]) totals[link.target].in += link.value
      })
      validNodes.forEach((n) => {
        totals[n.id].total = Math.max(totals[n.id].in, totals[n.id].out, 1)
      })
      return totals
    }, [validNodes, validLinks])

    // Layout positions: X per column, Y spaced per node in column
    const nodeLayout = React.useMemo(() => {
      const positions: Record<string, { x: number; y: number; h: number; w: number; node: SankeyNode }> = {}
      const colWidthStep = (width - nodeWidth) / Math.max(1, columns.length - 1)
      const paddingTop = 28
      const paddingBottom = 28
      const availableHeight = height - paddingTop - paddingBottom

      columns.forEach((colNodes, colIdx) => {
        const x = colIdx * colWidthStep
        const colTotal = colNodes.reduce((acc, n) => acc + (nodeTotals[n.id]?.total || 1), 0) || 1
        const gap = 12
        const totalGaps = gap * (colNodes.length - 1)
        const scaleH = Math.max(10, availableHeight - totalGaps)

        let currY = paddingTop
        colNodes.forEach((node) => {
          const h = Math.max(18, ((nodeTotals[node.id]?.total || 1) / colTotal) * scaleH)
          positions[node.id] = {
            x,
            y: currY,
            w: nodeWidth,
            h,
            node,
          }
          currY += h + gap
        })
      })

      return positions
    }, [columns, width, height, nodeWidth, nodeTotals])

    // Generate ribbons (Bézier curves)
    const linkRibbons = React.useMemo(() => {
      // Keep track of source and target Y offsets
      const srcOffsets: Record<string, number> = {}
      const tgtOffsets: Record<string, number> = {}
      validNodes.forEach((n) => {
        srcOffsets[n.id] = 0
        tgtOffsets[n.id] = 0
      })

      return validLinks.map((link, idx) => {
        const src = nodeLayout[link.source]
        const tgt = nodeLayout[link.target]
        if (!src || !tgt) return null

        const srcTotal = nodeTotals[link.source]?.out || 1
        const tgtTotal = nodeTotals[link.target]?.in || 1

        const ribbonH_src = (link.value / srcTotal) * src.h
        const ribbonH_tgt = (link.value / tgtTotal) * tgt.h

        const y0_top = src.y + srcOffsets[link.source]
        const y0_bot = y0_top + ribbonH_src
        srcOffsets[link.source] += ribbonH_src

        const y1_top = tgt.y + tgtOffsets[link.target]
        const y1_bot = y1_top + ribbonH_tgt
        tgtOffsets[link.target] += ribbonH_tgt

        const x0 = src.x + src.w
        const x1 = tgt.x
        const dx = (x1 - x0) / 2

        // Cubic Bézier area path
        const d = `
          M ${x0},${y0_top}
          C ${x0 + dx},${y0_top} ${x1 - dx},${y1_top} ${x1},${y1_top}
          L ${x1},${y1_bot}
          C ${x1 - dx},${y1_bot} ${x0 + dx},${y0_bot} ${x0},${y0_bot}
          Z
        `

        return {
          id: `link-${idx}`,
          link,
          d,
          color: link.color || src.node.color || "#3b82f6",
        }
      }).filter(Boolean)
    }, [validLinks, nodeLayout, nodeTotals, validNodes])

    const totalThroughput = React.useMemo(
      () => validLinks.reduce((acc, l) => acc + l.value, 0),
      [validLinks]
    )

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Sankey Flow Diagram"
        className={cn(
          "w-full rounded-xl border border-border bg-card shadow-2xs p-4 space-y-3 select-none",
          className
        )}
        {...props}
      >
        {/* Header & Metrics */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-primary/10 text-primary">
              <GitCommit className="h-4 w-4" />
            </span>
            <div>
              <h4 className="font-semibold text-foreground">Sankey Flow Diagram</h4>
              <p suppressHydrationWarning className="text-[11px] text-muted-foreground">
                Total throughput: <span suppressHydrationWarning className="font-mono text-foreground font-semibold">{totalThroughput.toLocaleString("en-US")} units</span> across {validLinks.length} active paths
              </p>
            </div>
          </div>

          {invalidLinkCount > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>{invalidLinkCount} invalid links filtered safely</span>
            </div>
          )}
        </div>

        {/* Sankey Canvas */}
        <div className="relative w-full overflow-hidden rounded-lg border border-border/70 bg-background/50 p-2">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto block"
            style={{ aspectRatio: `${width} / ${height}` }}
          >
            {/* Stage Column Labels */}
            <text x={0} y={16} className="text-[11px] font-bold fill-muted-foreground uppercase tracking-wider">
              1. Acquisition Source
            </text>
            <text x={width / 2} textAnchor="middle" y={16} className="text-[11px] font-bold fill-muted-foreground uppercase tracking-wider">
              2. User Destination
            </text>
            <text x={width} textAnchor="end" y={16} className="text-[11px] font-bold fill-muted-foreground uppercase tracking-wider">
              3. Outcome / Conversion
            </text>

            {/* Ribbons / Links */}
            {linkRibbons.map((r) => {
              if (!r) return null
              const isHovered = hoveredLink === r.link || hoveredNode === r.link.source || hoveredNode === r.link.target
              return (
                <path
                  key={r.id}
                  d={r.d}
                  fill={r.color}
                  fillOpacity={isHovered ? 0.65 : 0.28}
                  stroke={r.color}
                  strokeWidth={isHovered ? 1.5 : 0.5}
                  strokeOpacity={isHovered ? 0.9 : 0.4}
                  className="transition-all duration-150 cursor-pointer"
                  onMouseEnter={() => setHoveredLink(r.link)}
                  onMouseLeave={() => setHoveredLink(null)}
                  onClick={() => onLinkClick?.(r.link)}
                />
              )
            })}

            {/* Nodes */}
            {Object.values(nodeLayout).map(({ x, y, w, h, node }) => {
              const totalVal = nodeTotals[node.id]?.total || 0
              const isHovered = hoveredNode === node.id || hoveredLink?.source === node.id || hoveredLink?.target === node.id

              return (
                <g
                  key={node.id}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => onNodeClick?.(node)}
                >
                  <rect
                    x={x}
                    y={y}
                    width={w}
                    height={h}
                    rx={4}
                    fill={node.color || "#3b82f6"}
                    stroke={isHovered ? "#ffffff" : "rgba(0,0,0,0.15)"}
                    strokeWidth={isHovered ? 2 : 1}
                    className="transition-all duration-150"
                  />
                  {/* Node label */}
                  <text
                    x={x < width / 2 ? x + w + 8 : x - 8}
                    y={y + h / 2}
                    textAnchor={x < width / 2 ? "start" : "end"}
                    dominantBaseline="middle"
                    className={cn(
                      "text-[11px] font-medium transition-colors select-none",
                      isHovered ? "fill-foreground font-bold" : "fill-muted-foreground"
                    )}
                  >
                    {node.name} ({totalVal.toLocaleString("en-US")})
                  </text>
                </g>
              )
            })}
          </svg>

          {/* Active Flow Inspection Footer */}
          {hoveredLink ? (
            <div className="mt-2 p-2.5 rounded-lg bg-muted/60 border border-border/60 flex items-center justify-between text-xs animate-in fade-in duration-100">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">
                  {validNodes.find((n) => n.id === hoveredLink.source)?.name}
                </span>
                <ArrowRight className="h-3 w-3 text-muted-foreground" />
                <span className="font-semibold text-foreground">
                  {validNodes.find((n) => n.id === hoveredLink.target)?.name}
                </span>
              </div>
              <div className="font-mono text-primary font-bold">
                {hoveredLink.value.toLocaleString("en-US")} units (
                {((hoveredLink.value / totalThroughput) * 100).toFixed(1)}% of total volume)
              </div>
            </div>
          ) : (
            <div className="mt-2 p-2.5 rounded-lg bg-muted/20 border border-dashed border-border/50 text-center text-xs text-muted-foreground">
              Hover over any node or flow path ribbon to inspect volumetric distribution
            </div>
          )}
        </div>
      </div>
    )
  }
)

SankeyDiagram.displayName = "SankeyDiagram"
