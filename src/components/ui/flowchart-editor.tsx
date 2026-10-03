"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Workflow,
  Plus,
  Trash2,
  Edit2,
  Play,
  RotateCcw,
  Square,
  Diamond,
  CircleDot,
  Check,
  ArrowRight,
} from "lucide-react"

export type FlowNodeType = "start" | "process" | "decision" | "end" | "io"

export interface FlowNode {
  id: string
  label: string
  type: FlowNodeType
  x: number
  y: number
  description?: string
}

export interface FlowEdge {
  id: string
  from: string
  to: string
  label?: string // e.g. "Yes", "No", "Success"
}

export interface FlowchartEditorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  initialNodes?: FlowNode[]
  initialEdges?: FlowEdge[]
  onChange?: (nodes: FlowNode[], edges: FlowEdge[]) => void
  onSelectNode?: (node: FlowNode | null) => void
  readOnly?: boolean
}

export const FlowchartEditor = React.forwardRef<HTMLDivElement, FlowchartEditorProps>(
  (
    {
      className,
      initialNodes = [
        { id: "node-1", label: "User Form Submit", type: "start", x: 40, y: 100 },
        { id: "node-2", label: "Validate Input", type: "process", x: 220, y: 100 },
        { id: "node-3", label: "Is Valid?", type: "decision", x: 400, y: 88 },
        { id: "node-4", label: "Save to Database", type: "process", x: 580, y: 40 },
        { id: "node-5", label: "Show Validation Error", type: "io", x: 580, y: 160 },
      ],
      initialEdges = [
        { id: "e-1-2", from: "node-1", to: "node-2" },
        { id: "e-2-3", from: "node-2", to: "node-3" },
        { id: "e-3-4", from: "node-3", to: "node-4", label: "Yes" },
        { id: "e-3-5", from: "node-3", to: "node-5", label: "No" },
      ],
      onChange,
      onSelectNode,
      readOnly = false,
      ...props
    },
    ref
  ) => {
    const [nodes, setNodes] = React.useState<FlowNode[]>(initialNodes)
    const [edges, setEdges] = React.useState<FlowEdge[]>(initialEdges)
    const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>(null)
    const [selectedEdgeId, setSelectedEdgeId] = React.useState<string | null>(null)
    const [connectingSourceId, setConnectingSourceId] = React.useState<string | null>(null)
    const [editingNodeId, setEditingNodeId] = React.useState<string | null>(null)
    const [editingLabel, setEditingLabel] = React.useState("")

    const updateGraph = (nextNodes: FlowNode[], nextEdges: FlowEdge[]) => {
      setNodes(nextNodes)
      setEdges(nextEdges)
      onChange?.(nextNodes, nextEdges)
    }

    const handleSelectNode = (node: FlowNode) => {
      if (connectingSourceId && connectingSourceId !== node.id) {
        // Connect nodes
        const newEdge: FlowEdge = {
          id: `e-${connectingSourceId}-${node.id}-${Date.now()}`,
          from: connectingSourceId,
          to: node.id,
        }
        const nextEdges = [...edges, newEdge]
        updateGraph(nodes, nextEdges)
        setConnectingSourceId(null)
        return
      }

      setSelectedNodeId(node.id)
      setSelectedEdgeId(null)
      onSelectNode?.(node)
    }

    const handleAddNode = (type: FlowNodeType) => {
      const id = `node-${Date.now()}`
      const newNode: FlowNode = {
        id,
        label:
          type === "start"
            ? "Start Trigger"
            : type === "decision"
            ? "Condition?"
            : type === "end"
            ? "Complete"
            : type === "io"
            ? "Log Event"
            : "Execute Task",
        type,
        x: 40 + (nodes.length % 4) * 160,
        y: 180 + Math.floor(nodes.length / 4) * 80,
      }
      const nextNodes = [...nodes, newNode]
      updateGraph(nextNodes, edges)
      setSelectedNodeId(id)
    }

    const handleDeleteSelected = () => {
      if (readOnly) return
      if (selectedNodeId) {
        const nextNodes = nodes.filter((n) => n.id !== selectedNodeId)
        const nextEdges = edges.filter(
          (e) => e.from !== selectedNodeId && e.to !== selectedNodeId
        )
        updateGraph(nextNodes, nextEdges)
        setSelectedNodeId(null)
        onSelectNode?.(null)
      } else if (selectedEdgeId) {
        const nextEdges = edges.filter((e) => e.id !== selectedEdgeId)
        updateGraph(nodes, nextEdges)
        setSelectedEdgeId(null)
      }
    }

    const startEditing = (node: FlowNode) => {
      setEditingNodeId(node.id)
      setEditingLabel(node.label)
    }

    const saveEditing = () => {
      if (!editingNodeId) return
      const trimmed = editingLabel.trim()
      if (trimmed) {
        const nextNodes = nodes.map((n) =>
          n.id === editingNodeId ? { ...n, label: trimmed } : n
        )
        updateGraph(nextNodes, edges)
      }
      setEditingNodeId(null)
      setEditingLabel("")
    }

    // Keyboard listener for deletion
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (editingNodeId) return
      if (e.key === "Backspace" || e.key === "Delete") {
        handleDeleteSelected()
      }
      if (e.key === "Escape") {
        setSelectedNodeId(null)
        setSelectedEdgeId(null)
        setConnectingSourceId(null)
      }
    }

    const nodeWidth = 140
    const nodeHeight = 54

    return (
      <div
        ref={ref}
        role="region"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label="Flowchart Diagram Editor"
        className={cn(
          "flex flex-col rounded-xl border border-border bg-card text-card-foreground shadow-xs overflow-hidden select-none outline-none focus-visible:ring-1 focus-visible:ring-ring",
          className
        )}
        {...props}
      >
        {/* Editor Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/20 p-3 sm:px-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Workflow className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-xs font-bold text-foreground">Flowchart Editor</h3>
              <p className="text-[10px] text-muted-foreground">
                Process diagram builder with decision branches and custom nodes
              </p>
            </div>
          </div>

          {!readOnly && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleAddNode("process")}
                className="inline-flex items-center gap-1 rounded border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted transition-colors shadow-2xs"
              >
                <Square className="h-3 w-3 text-blue-500" />
                <span>Process</span>
              </button>

              <button
                type="button"
                onClick={() => handleAddNode("decision")}
                className="inline-flex items-center gap-1 rounded border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted transition-colors shadow-2xs"
              >
                <Diamond className="h-3 w-3 text-amber-500" />
                <span>Decision</span>
              </button>

              <button
                type="button"
                onClick={() => handleAddNode("end")}
                className="inline-flex items-center gap-1 rounded border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted transition-colors shadow-2xs"
              >
                <CircleDot className="h-3 w-3 text-emerald-500" />
                <span>End</span>
              </button>

              {(selectedNodeId || selectedEdgeId) && (
                <button
                  type="button"
                  onClick={handleDeleteSelected}
                  aria-label="Delete selected node or edge"
                  className="rounded p-1.5 text-destructive hover:bg-destructive/10 transition-colors ml-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Canvas Area with Dot Grid */}
        <div className="relative overflow-auto p-8 min-h-[340px] max-h-[500px] bg-muted/15 scrollbar-thin">
          {/* Dot Grid pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage: "radial-gradient(var(--border) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* SVG Connector Edges */}
          <svg className="absolute inset-0 h-full w-full pointer-events-none">
            <defs>
              <marker
                id="flow-arrow"
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

            {edges.map((edge) => {
              const src = nodes.find((n) => n.id === edge.from)
              const dst = nodes.find((n) => n.id === edge.to)
              if (!src || !dst) return null

              const x1 = src.x + nodeWidth
              const y1 = src.y + nodeHeight / 2
              const x2 = dst.x
              const y2 = dst.y + nodeHeight / 2

              const midX = (x1 + x2) / 2
              const d = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`
              const isSelected = selectedEdgeId === edge.id

              return (
                <g key={edge.id} className="pointer-events-auto cursor-pointer">
                  <path
                    d={d}
                    fill="none"
                    markerEnd="url(#flow-arrow)"
                    onClick={() => {
                      setSelectedEdgeId(edge.id)
                      setSelectedNodeId(null)
                    }}
                    className={cn(
                      "transition-all",
                      isSelected
                        ? "stroke-primary stroke-[3px]"
                        : "stroke-border hover:stroke-primary/70 stroke-[2px]"
                    )}
                  />
                  {edge.label && (
                    <text
                      x={midX}
                      y={(y1 + y2) / 2 - 6}
                      textAnchor="middle"
                      className="fill-muted-foreground text-[10px] font-mono font-bold"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>

          {/* Nodes Container */}
          <div className="relative" style={{ minWidth: "760px", minHeight: "260px" }}>
            {nodes.map((node) => {
              const isSelected = selectedNodeId === node.id
              const isConnecting = connectingSourceId === node.id
              const isEditing = editingNodeId === node.id

              return (
                <div
                  key={node.id}
                  onClick={() => handleSelectNode(node)}
                  style={{
                    position: "absolute",
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    width: `${nodeWidth}px`,
                    minHeight: `${nodeHeight}px`,
                  }}
                  className={cn(
                    "group relative flex flex-col items-center justify-center p-2.5 text-center text-xs shadow-xs transition-all cursor-pointer select-none",
                    node.type === "start"
                      ? "rounded-full border-2 border-emerald-500 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100"
                      : node.type === "end"
                      ? "rounded-full border-2 border-rose-500 bg-rose-500/10 text-rose-950 dark:text-rose-100"
                      : node.type === "decision"
                      ? "rounded-xl border-2 border-amber-500 bg-amber-500/10 text-foreground"
                      : node.type === "io"
                      ? "rounded-md border-2 border-purple-500 bg-purple-500/10 text-foreground skew-x-[-6deg]"
                      : "rounded-lg border border-border bg-card text-foreground",
                    isSelected && "ring-2 ring-primary ring-offset-1 shadow-md scale-102 z-20",
                    isConnecting && "ring-2 ring-amber-400 animate-pulse"
                  )}
                >
                  {isEditing ? (
                    <input
                      type="text"
                      autoFocus
                      value={editingLabel}
                      onChange={(e) => setEditingLabel(e.target.value)}
                      onBlur={saveEditing}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveEditing()
                        if (e.key === "Escape") setEditingNodeId(null)
                      }}
                      className="h-6 w-full rounded border border-primary bg-background px-1 text-center text-xs font-semibold outline-none text-foreground"
                    />
                  ) : (
                    <div className="flex items-center gap-1">
                      <span className="truncate font-semibold text-xs leading-snug">
                        {node.label}
                      </span>
                    </div>
                  )}

                  {/* Node Quick Action Hover Overlay */}
                  {!readOnly && (
                    <div className="absolute -top-3 right-0 hidden group-hover:flex items-center gap-0.5 rounded border border-border bg-popover p-0.5 shadow-xs z-30">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          startEditing(node)
                        }}
                        title="Rename"
                        className="rounded p-1 text-muted-foreground hover:text-foreground"
                      >
                        <Edit2 className="h-2.5 w-2.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setConnectingSourceId(isConnecting ? null : node.id)
                        }}
                        title="Connect to node..."
                        className="rounded p-1 text-muted-foreground hover:text-primary"
                      >
                        <ArrowRight className="h-2.5 w-2.5" />
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer info bar */}
        <div className="flex items-center justify-between border-t border-border bg-muted/20 px-4 py-2 text-[11px] text-muted-foreground">
          <span>
            {connectingSourceId
              ? "Click another node to connect"
              : selectedNodeId
              ? "Press Delete to remove selected node"
              : "Click node to select or hover to connect"}
          </span>
          <span className="font-mono">
            {nodes.length} nodes · {edges.length} connections
          </span>
        </div>
      </div>
    )
  }
)
FlowchartEditor.displayName = "FlowchartEditor"
