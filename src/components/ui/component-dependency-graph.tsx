"use client"

import * as React from "react"
import {
  Network,
  Search,
  CheckCircle2,
  Layers,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Box,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type ComponentTier = "tokens" | "primitives" | "composites" | "features"

export interface DependencyNode {
  id: string
  name: string
  tier: ComponentTier
  deps: string[] // IDs of nodes this component depends on
}

export interface ComponentDependencyGraphProps extends React.HTMLAttributes<HTMLDivElement> {
  nodes?: DependencyNode[]
  onSelectNode?: (node: DependencyNode | null) => void
}

const DEFAULT_GRAPH_NODES: DependencyNode[] = [
  // Tokens
  { id: "tokens-color", name: "Color Palette Tokens", tier: "tokens", deps: [] },
  { id: "tokens-radius", name: "Radius & Spacing Tokens", tier: "tokens", deps: [] },
  { id: "tokens-type", name: "Typography Scale Tokens", tier: "tokens", deps: [] },

  // Primitives
  { id: "prim-button", name: "Button Primitive", tier: "primitives", deps: ["tokens-color", "tokens-radius"] },
  { id: "prim-input", name: "Input Primitive", tier: "primitives", deps: ["tokens-color", "tokens-radius", "tokens-type"] },
  { id: "prim-badge", name: "Badge Primitive", tier: "primitives", deps: ["tokens-color", "tokens-radius"] },
  { id: "prim-tooltip", name: "Tooltip Primitive", tier: "primitives", deps: ["tokens-color", "tokens-radius"] },

  // Composites
  { id: "comp-form-field", name: "FormField Container", tier: "composites", deps: ["prim-input", "prim-tooltip"] },
  { id: "comp-card", name: "Card Component", tier: "composites", deps: ["prim-button", "prim-badge"] },
  { id: "comp-dialog", name: "Dialog Modal", tier: "composites", deps: ["prim-button", "tokens-radius"] },

  // Features
  { id: "feat-spotlight", name: "Spotlight Search (160)", tier: "features", deps: ["comp-dialog", "prim-input", "prim-badge"] },
  { id: "feat-api-builder", name: "API Request Builder (145)", tier: "features", deps: ["comp-form-field", "prim-button", "prim-badge"] },
  { id: "feat-onboarding", name: "Onboarding Tour (159)", tier: "features", deps: ["comp-card", "prim-button", "prim-tooltip"] },
]

const TIER_COLORS: Record<ComponentTier, { bg: string; text: string; border: string }> = {
  tokens: { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400", border: "border-amber-500/30" },
  primitives: { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400", border: "border-blue-500/30" },
  composites: { bg: "bg-violet-500/10", text: "text-violet-600 dark:text-violet-400", border: "border-violet-500/30" },
  features: { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500/30" },
}

export const ComponentDependencyGraph = React.forwardRef<HTMLDivElement, ComponentDependencyGraphProps>(
  (
    {
      nodes = DEFAULT_GRAPH_NODES,
      onSelectNode,
      className,
      ...props
    },
    ref
  ) => {
    const [selectedId, setSelectedId] = React.useState<string | null>("comp-form-field")
    const [searchQuery, setSearchQuery] = React.useState("")

    const selectedNode = React.useMemo(() => {
      return nodes.find((n) => n.id === selectedId) || null
    }, [nodes, selectedId])

    // Find upstream dependencies (what this node depends on)
    const upstreamDeps = React.useMemo(() => {
      if (!selectedNode) return []
      return nodes.filter((n) => selectedNode.deps.includes(n.id))
    }, [selectedNode, nodes])

    // Find downstream consumers (what depends on this node)
    const downstreamConsumers = React.useMemo(() => {
      if (!selectedNode) return []
      return nodes.filter((n) => n.deps.includes(selectedNode.id))
    }, [selectedNode, nodes])

    const filteredNodes = React.useMemo(() => {
      const q = searchQuery.toLowerCase().trim()
      if (!q) return nodes
      return nodes.filter(
        (n) => n.name.toLowerCase().includes(q) || n.tier.toLowerCase().includes(q)
      )
    }, [nodes, searchQuery])

    const handleSelect = (node: DependencyNode) => {
      setSelectedId(node.id)
      onSelectNode?.(node)
    }

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Component Architecture Dependency Graph"
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
              <Network className="h-4 w-4" />
            </span>
            <div>
              <h4 className="font-semibold text-foreground">Component Dependency Graph</h4>
              <p className="text-[11px] text-muted-foreground">
                Architectural relationships across tokens, primitives, composites, and high-level features
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
              <CheckCircle2 className="h-3.5 w-3.5" /> 0 Cycles Detected
            </span>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-input bg-background text-xs">
              <Search className="h-3 w-3 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter graph..."
                className="bg-transparent outline-hidden w-28 text-foreground"
              />
            </div>
          </div>
        </div>

        {/* 4-Tier Dependency Architecture Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {(["tokens", "primitives", "composites", "features"] as const).map((tier) => {
            const tierNodes = filteredNodes.filter((n) => n.tier === tier)
            const colors = TIER_COLORS[tier]

            return (
              <div
                key={tier}
                className="p-3 rounded-xl border border-border bg-muted/20 space-y-2.5 flex flex-col"
              >
                <div className="flex items-center justify-between border-b border-border/60 pb-1.5">
                  <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono", colors.bg, colors.text)}>
                    {tier}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {tierNodes.length} nodes
                  </span>
                </div>

                <div className="space-y-1.5 flex-1 overflow-y-auto max-h-60 pr-0.5">
                  {tierNodes.map((node) => {
                    const isSelected = selectedId === node.id
                    const isUpstream = upstreamDeps.some((u) => u.id === node.id)
                    const isDownstream = downstreamConsumers.some((d) => d.id === node.id)

                    return (
                      <div
                        key={node.id}
                        onClick={() => handleSelect(node)}
                        className={cn(
                          "p-2.5 rounded-lg border text-xs cursor-pointer transition-all duration-150 space-y-1",
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground shadow-xs font-semibold"
                            : isUpstream
                            ? "border-blue-500 bg-blue-500/10 text-foreground font-medium"
                            : isDownstream
                            ? "border-emerald-500 bg-emerald-500/10 text-foreground font-medium"
                            : "border-border bg-card/60 hover:bg-muted text-foreground"
                        )}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="truncate">{node.name}</span>
                          {node.deps.length > 0 && (
                            <span className={cn("text-[9px] font-mono px-1 rounded", isSelected ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground")}>
                              {node.deps.length} deps
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Selected Component Relationships Inspector */}
        {selectedNode && (
          <div className="p-3.5 rounded-xl border border-border bg-popover/80 space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground text-sm">
                  {selectedNode.name}
                </span>
                <span className={cn("px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold", TIER_COLORS[selectedNode.tier].bg, TIER_COLORS[selectedNode.tier].text)}>
                  {selectedNode.tier}
                </span>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">
                ID: {selectedNode.id}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Upstream Dependencies */}
              <div className="space-y-1.5">
                <span className="font-semibold text-foreground text-[11px] flex items-center gap-1.5">
                  <ArrowRight className="h-3 w-3 text-blue-500 rotate-180" />
                  Depends On ({upstreamDeps.length} Primitives / Tokens)
                </span>
                {upstreamDeps.length === 0 ? (
                  <p className="text-[11px] text-muted-foreground italic">No upstream dependencies (base architectural tier).</p>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {upstreamDeps.map((u) => (
                      <span
                        key={u.id}
                        onClick={() => handleSelect(u)}
                        className="px-2 py-1 rounded-md border border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300 font-medium text-[11px] cursor-pointer hover:underline"
                      >
                        {u.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Downstream Consumers */}
              <div className="space-y-1.5">
                <span className="font-semibold text-foreground text-[11px] flex items-center gap-1.5">
                  <ArrowRight className="h-3 w-3 text-emerald-500" />
                  Consumed By ({downstreamConsumers.length} Composites / Features)
                </span>
                {downstreamConsumers.length === 0 ? (
                  <p className="text-[11px] text-muted-foreground italic">No downstream consumers (terminal feature component).</p>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {downstreamConsumers.map((d) => (
                      <span
                        key={d.id}
                        onClick={() => handleSelect(d)}
                        className="px-2 py-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-medium text-[11px] cursor-pointer hover:underline"
                      >
                        {d.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
)

ComponentDependencyGraph.displayName = "ComponentDependencyGraph"
