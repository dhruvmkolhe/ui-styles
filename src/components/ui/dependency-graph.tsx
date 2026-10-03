"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Network,
  AlertTriangle,
  CheckCircle2,
  Layers,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
} from "lucide-react"

export interface DependencyNode {
  id: string
  label: string
  category?: string
  status?: "healthy" | "warning" | "error" | "pending"
  version?: string
  description?: string
  x?: number
  y?: number
}

export interface DependencyEdge {
  id: string
  from: string
  to: string
  label?: string
  type?: "sync" | "async" | "fallback"
}

export interface DependencyGraphProps extends React.HTMLAttributes<HTMLDivElement> {
  nodes?: DependencyNode[]
  edges?: DependencyEdge[]
  selectedNodeId?: string
  onNodeSelect?: (node: DependencyNode | null) => void
  highlightCycles?: boolean
  readOnly?: boolean
}

/**
 * Cycle detection via DFS with cycle path extraction.
 * Returns array of edge IDs that form a cycle.
 */
export function findGraphCycles(
  nodes: DependencyNode[],
  edges: DependencyEdge[]
): { hasCycle: boolean; cycleEdgeIds: Set<string>; cycleNodeIds: Set<string> } {
  const adj = new Map<string, Array<{ to: string; edgeId: string }>>()
  nodes.forEach((n) => adj.set(n.id, []))
  edges.forEach((e) => {
    if (adj.has(e.from)) {
      adj.get(e.from)!.push({ to: e.to, edgeId: e.id })
    }
  })

  const visited = new Set<string>()
  const recursionStack = new Set<string>()
  const cycleEdgeIds = new Set<string>()
  const cycleNodeIds = new Set<string>()

  function dfs(curr: string, path: Array<{ node: string; edgeId?: string }>): boolean {
    visited.add(curr)
    recursionStack.add(curr)

    const neighbors = adj.get(curr) || []
    for (const { to, edgeId } of neighbors) {
      if (!visited.has(to)) {
        if (dfs(to, [...path, { node: curr, edgeId }])) {
          return true
        }
      } else if (recursionStack.has(to)) {
        // Cycle detected
        cycleEdgeIds.add(edgeId)
        cycleNodeIds.add(curr)
        cycleNodeIds.add(to)
        // Mark remaining cycle path
        let found = false
        for (const item of path) {
          if (item.node === to) found = true
          if (found && item.edgeId) {
            cycleEdgeIds.add(item.edgeId)
            cycleNodeIds.add(item.node)
          }
        }
        return true
      }
    }

    recursionStack.delete(curr)
    return false
  }

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      dfs(node.id, [])
    }
  }

  return {
    hasCycle: cycleEdgeIds.size > 0,
    cycleEdgeIds,
    cycleNodeIds,
  }
}

export const DependencyGraph = React.forwardRef<HTMLDivElement, DependencyGraphProps>(
  (
    {
      className,
      nodes = [],
      edges = [],
      selectedNodeId: controlledSelectedId,
      onNodeSelect,
      highlightCycles = true,
      readOnly = false,
      ...props
    },
    ref
  ) => {
    const [selectedId, setSelectedId] = React.useState<string | null>(controlledSelectedId ?? null)

    React.useEffect(() => {
      if (controlledSelectedId !== undefined) {
        setSelectedId(controlledSelectedId)
      }
    }, [controlledSelectedId])

    // Detect cycles safely
    const cycleAnalysis = React.useMemo(() => {
      return findGraphCycles(nodes, edges)
    }, [nodes, edges])

    // Assign layout coordinates (layered DAG layout)
    const positionedNodes = React.useMemo(() => {
      // If nodes have explicit x/y coordinates use them, else compute automatically
      const hasCoords = nodes.some((n) => n.x !== undefined && n.y !== undefined)
      if (hasCoords) return nodes

      // Multi-column tiered rank layout
      const ranks = new Map<string, number>()
      const inDegree = new Map<string, number>()
      nodes.forEach((n) => {
        ranks.set(n.id, 0)
        inDegree.set(n.id, 0)
      })

      edges.forEach((e) => {
        if (inDegree.has(e.to)) {
          inDegree.set(e.to, (inDegree.get(e.to) || 0) + 1)
        }
      })

      // Simple topological tier assignment
      const levels: string[][] = []
      nodes.forEach((n) => {
        const deg = inDegree.get(n.id) || 0
        const lvl = Math.min(deg, 3)
        while (levels.length <= lvl) levels.push([])
        levels[lvl].push(n.id)
      })

      const colWidth = 220
      const rowHeight = 90
      const startX = 40
      const startY = 40

      const result: DependencyNode[] = []
      levels.forEach((colNodes, colIdx) => {
        colNodes.forEach((nodeId, rowIdx) => {
          const original = nodes.find((n) => n.id === nodeId)!
          result.push({
            ...original,
            x: startX + colIdx * colWidth,
            y: startY + rowIdx * rowHeight,
          })
        })
      })

      return result
    }, [nodes, edges])

    // Rendered edge paths
    const renderedEdges = React.useMemo(() => {
      const nodeMap = new Map<string, DependencyNode>()
      positionedNodes.forEach((n) => nodeMap.set(n.id, n))

      const cardWidth = 160
      const cardHeight = 60

      return edges
        .map((edge) => {
          const source = nodeMap.get(edge.from)
          const target = nodeMap.get(edge.to)

          // Safely skip missing references / orphan edges
          if (!source || !target || source.x === undefined || source.y === undefined || target.x === undefined || target.y === undefined) {
            return null
          }

          const x1 = source.x + cardWidth
          const y1 = source.y + cardHeight / 2
          const x2 = target.x
          const y2 = target.y + cardHeight / 2

          const dx = Math.abs(x2 - x1) * 0.5
          const d = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`

          const isCycle = cycleAnalysis.cycleEdgeIds.has(edge.id)
          const isSelected = selectedId === edge.from || selectedId === edge.to

          return {
            ...edge,
            d,
            isCycle,
            isSelected,
          }
        })
        .filter(Boolean) as Array<DependencyEdge & { d: string; isCycle: boolean; isSelected: boolean }>
    }, [edges, positionedNodes, cycleAnalysis, selectedId])

    const handleNodeClick = (node: DependencyNode) => {
      const nextId = selectedId === node.id ? null : node.id
      setSelectedId(nextId)
      onNodeSelect?.(nextId ? node : null)
    }

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Dependency Graph"
        className={cn(
          "flex flex-col rounded-xl border border-border bg-card text-card-foreground shadow-xs overflow-hidden select-none",
          className
        )}
        {...props}
      >
        {/* Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/20 p-3 sm:px-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Network className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-xs font-bold text-foreground">Dependency Graph</h3>
              <p className="text-[10px] text-muted-foreground">
                Component and task dependency map with cycle detection
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {cycleAnalysis.hasCycle && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                <AlertTriangle className="h-3 w-3" />
                <span>Cyclic Dependency Detected</span>
              </span>
            )}

            <div className="text-[11px] text-muted-foreground font-mono">
              {nodes.length} nodes · {edges.length} edges
            </div>
          </div>
        </div>

        {/* Graph SVG Canvas */}
        <div className="relative overflow-auto p-6 min-h-[320px] max-h-[500px] bg-muted/10 scrollbar-thin">
          <svg className="absolute inset-0 h-full w-full pointer-events-none">
            <defs>
              <marker
                id="dep-arrow"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="currentColor" className="text-muted-foreground" />
              </marker>
              <marker
                id="cycle-arrow"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="currentColor" className="text-amber-500" />
              </marker>
              <marker
                id="selected-arrow"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="currentColor" className="text-primary" />
              </marker>
            </defs>

            {renderedEdges.map((e) => (
              <path
                key={e.id}
                d={e.d}
                fill="none"
                markerEnd={
                  e.isCycle
                    ? "url(#cycle-arrow)"
                    : e.isSelected
                    ? "url(#selected-arrow)"
                    : "url(#dep-arrow)"
                }
                className={cn(
                  "transition-all",
                  e.isCycle
                    ? "stroke-amber-500 stroke-[2.5px] stroke-dasharray-[4_2]"
                    : e.isSelected
                    ? "stroke-primary stroke-[2px]"
                    : "stroke-border stroke-[1.5px]"
                )}
              />
            ))}
          </svg>

          {/* Node Cards */}
          <div className="relative" style={{ minWidth: "680px", minHeight: "260px" }}>
            {positionedNodes.map((node) => {
              const isSelected = selectedId === node.id
              const isCycleNode = cycleAnalysis.cycleNodeIds.has(node.id)

              return (
                <div
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  style={{
                    position: "absolute",
                    left: `${node.x || 0}px`,
                    top: `${node.y || 0}px`,
                    width: "160px",
                  }}
                  className={cn(
                    "flex flex-col justify-between rounded-lg border p-2.5 text-xs shadow-xs transition-all cursor-pointer select-none",
                    isSelected
                      ? "border-primary bg-primary/10 shadow-md ring-2 ring-primary/40 -translate-y-0.5 z-20"
                      : isCycleNode
                      ? "border-amber-500 bg-amber-500/10 text-foreground z-10"
                      : "border-border bg-card hover:border-primary/50 hover:bg-muted/40 z-10"
                  )}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="truncate font-bold text-foreground text-[11px]">
                      {node.label}
                    </span>
                    {node.version && (
                      <span className="rounded bg-muted px-1 text-[9px] font-mono text-muted-foreground shrink-0">
                        {node.version}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span className="truncate capitalize">{node.category || "Task"}</span>
                    {isCycleNode && (
                      <span className="text-amber-600 dark:text-amber-400 font-semibold text-[9px]">
                        Cycle
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer info bar */}
        <div className="flex items-center justify-between border-t border-border bg-muted/20 px-4 py-2 text-[11px] text-muted-foreground">
          <span>Click node to inspect relationships</span>
          <span>Client Graph Topology</span>
        </div>
      </div>
    )
  }
)
DependencyGraph.displayName = "DependencyGraph"
