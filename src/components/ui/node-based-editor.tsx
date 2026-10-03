"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Layers,
  Plus,
  Trash2,
  Cpu,
  Sliders,
  Sparkles,
  Zap,
  ArrowRight,
  Move,
  X,
} from "lucide-react"

export interface NodePort {
  id: string
  label: string
  type: "string" | "number" | "boolean" | "any"
}

export interface GraphEditorNode {
  id: string
  title: string
  category?: string
  inputs: NodePort[]
  outputs: NodePort[]
  x: number
  y: number
  color?: string
}

export interface NodeConnection {
  id: string
  fromNodeId: string
  fromPortId: string
  toNodeId: string
  toPortId: string
}

export interface NodeBasedEditorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  initialNodes?: GraphEditorNode[]
  initialConnections?: NodeConnection[]
  onChange?: (nodes: GraphEditorNode[], connections: NodeConnection[]) => void
  selectedNodeId?: string
  onSelectNode?: (nodeId: string | null) => void
  readOnly?: boolean
}

const PORT_COLORS: Record<string, string> = {
  string: "#3b82f6", // blue
  number: "#10b981", // green
  boolean: "#f59e0b", // amber
  any: "#a855f7", // purple
}

export const NodeBasedEditor = React.forwardRef<HTMLDivElement, NodeBasedEditorProps>(
  (
    {
      className,
      initialNodes = [
        {
          id: "n-input",
          title: "Audio Oscillator",
          category: "Generator",
          color: "#3b82f6",
          x: 40,
          y: 60,
          inputs: [],
          outputs: [{ id: "out-wave", label: "Waveform", type: "any" }],
        },
        {
          id: "n-filter",
          title: "Lowpass Filter",
          category: "Processor",
          color: "#10b981",
          x: 280,
          y: 40,
          inputs: [{ id: "in-signal", label: "Signal", type: "any" }],
          outputs: [{ id: "out-filtered", label: "Filtered", type: "any" }],
        },
        {
          id: "n-gain",
          title: "Master Gain",
          category: "Output",
          color: "#a855f7",
          x: 520,
          y: 80,
          inputs: [{ id: "in-main", label: "Input", type: "any" }],
          outputs: [{ id: "out-speaker", label: "Speakers", type: "any" }],
        },
      ],
      initialConnections = [
        {
          id: "c-1-2",
          fromNodeId: "n-input",
          fromPortId: "out-wave",
          toNodeId: "n-filter",
          toPortId: "in-signal",
        },
        {
          id: "c-2-3",
          fromNodeId: "n-filter",
          fromPortId: "out-filtered",
          toNodeId: "n-gain",
          toPortId: "in-main",
        },
      ],
      onChange,
      selectedNodeId: controlledSelectedId,
      onSelectNode,
      readOnly = false,
      ...props
    },
    ref
  ) => {
    const [nodes, setNodes] = React.useState<GraphEditorNode[]>(initialNodes)
    const [connections, setConnections] = React.useState<NodeConnection[]>(initialConnections)
    const [selectedId, setSelectedId] = React.useState<string | null>(controlledSelectedId ?? null)
    const [pendingPort, setPendingPort] = React.useState<{
      nodeId: string
      portId: string
      isOutput: boolean
    } | null>(null)

    const updateGraph = (nextNodes: GraphEditorNode[], nextConns: NodeConnection[]) => {
      setNodes(nextNodes)
      setConnections(nextConns)
      onChange?.(nextNodes, nextConns)
    }

    const handleSelectNode = (id: string) => {
      const next = selectedId === id ? null : id
      setSelectedId(next)
      onSelectNode?.(next)
    }

    // Keyboard movement alternative for accessibility
    const handleMoveNode = (id: string, dx: number, dy: number) => {
      if (readOnly) return
      const nextNodes = nodes.map((n) =>
        n.id === id ? { ...n, x: Math.max(10, n.x + dx), y: Math.max(10, n.y + dy) } : n
      )
      updateGraph(nextNodes, connections)
    }

    const handleDeleteNode = (id: string) => {
      if (readOnly) return
      const nextNodes = nodes.filter((n) => n.id !== id)
      const nextConns = connections.filter(
        (c) => c.fromNodeId !== id && c.toNodeId !== id
      )
      updateGraph(nextNodes, nextConns)
      if (selectedId === id) setSelectedId(null)
    }

    const handlePortClick = (nodeId: string, portId: string, isOutput: boolean) => {
      if (readOnly) return

      if (!pendingPort) {
        setPendingPort({ nodeId, portId, isOutput })
        return
      }

      // If clicking opposite port direction on another node, create connection
      if (pendingPort.nodeId !== nodeId && pendingPort.isOutput !== isOutput) {
        const fromNodeId = isOutput ? nodeId : pendingPort.nodeId
        const fromPortId = isOutput ? portId : pendingPort.portId
        const toNodeId = isOutput ? pendingPort.nodeId : nodeId
        const toPortId = isOutput ? pendingPort.portId : portId

        // Avoid duplicate connection
        const exists = connections.some(
          (c) =>
            c.fromNodeId === fromNodeId &&
            c.fromPortId === fromPortId &&
            c.toNodeId === toNodeId &&
            c.toPortId === toPortId
        )

        if (!exists) {
          const newConn: NodeConnection = {
            id: `conn-${Date.now()}`,
            fromNodeId,
            fromPortId,
            toNodeId,
            toPortId,
          }
          updateGraph(nodes, [...connections, newConn])
        }
      }

      setPendingPort(null)
    }

    const handleAddNode = () => {
      const id = `node-${Date.now()}`
      const newNode: GraphEditorNode = {
        id,
        title: `Transform Node ${nodes.length + 1}`,
        category: "Math",
        color: "#f59e0b",
        x: 60 + (nodes.length % 3) * 180,
        y: 160 + Math.floor(nodes.length / 3) * 60,
        inputs: [{ id: "in-val", label: "Value", type: "number" }],
        outputs: [{ id: "out-val", label: "Result", type: "number" }],
      }
      updateGraph([...nodes, newNode], connections)
      setSelectedId(id)
    }

    const nodeWidth = 180
    const nodeHeaderHeight = 36
    const portRowHeight = 24

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Node-Based Graph Editor"
        className={cn(
          "flex flex-col rounded-xl border border-border bg-card text-card-foreground shadow-xs overflow-hidden select-none",
          className
        )}
        {...props}
      >
        {/* Editor Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/20 p-3 sm:px-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Cpu className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-xs font-bold text-foreground">Node-Based Editor</h3>
              <p className="text-[10px] text-muted-foreground">
                Visual node connections with typed I/O ports and cable routing
              </p>
            </div>
          </div>

          {!readOnly && (
            <div className="flex items-center gap-2">
              {selectedId && (
                <div className="flex items-center gap-1 border-r border-border pr-2">
                  <span className="text-[10px] text-muted-foreground mr-1">Move:</span>
                  <button
                    type="button"
                    onClick={() => handleMoveNode(selectedId, -20, 0)}
                    aria-label="Move node left"
                    className="h-6 w-6 rounded border border-border bg-background text-xs font-bold hover:bg-muted"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveNode(selectedId, 20, 0)}
                    aria-label="Move node right"
                    className="h-6 w-6 rounded border border-border bg-background text-xs font-bold hover:bg-muted"
                  >
                    →
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveNode(selectedId, 0, -20)}
                    aria-label="Move node up"
                    className="h-6 w-6 rounded border border-border bg-background text-xs font-bold hover:bg-muted"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveNode(selectedId, 0, 20)}
                    aria-label="Move node down"
                    className="h-6 w-6 rounded border border-border bg-background text-xs font-bold hover:bg-muted"
                  >
                    ↓
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={handleAddNode}
                className="inline-flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground shadow-2xs hover:bg-primary/90 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Node</span>
              </button>
            </div>
          )}
        </div>

        {/* Canvas Area with Cables and Nodes */}
        <div className="relative overflow-auto p-8 min-h-[340px] max-h-[500px] bg-muted/10 scrollbar-thin">
          {/* Dot Grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage: "radial-gradient(var(--border) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* SVG Connection Cables */}
          <svg className="absolute inset-0 h-full w-full pointer-events-none">
            {connections.map((conn) => {
              const srcNode = nodes.find((n) => n.id === conn.fromNodeId)
              const dstNode = nodes.find((n) => n.id === conn.toNodeId)
              if (!srcNode || !dstNode) return null

              const srcPortIdx = srcNode.outputs.findIndex((p) => p.id === conn.fromPortId)
              const dstPortIdx = dstNode.inputs.findIndex((p) => p.id === conn.toPortId)

              const x1 = srcNode.x + nodeWidth
              const y1 = srcNode.y + nodeHeaderHeight + (srcPortIdx >= 0 ? srcPortIdx : 0) * portRowHeight + 12
              const x2 = dstNode.x
              const y2 = dstNode.y + nodeHeaderHeight + (dstPortIdx >= 0 ? dstPortIdx : 0) * portRowHeight + 12

              const dx = Math.max(40, Math.abs(x2 - x1) * 0.5)
              const d = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`

              return (
                <g key={conn.id} className="pointer-events-auto">
                  <path
                    d={d}
                    fill="none"
                    className="stroke-primary/70 hover:stroke-destructive stroke-[2.5px] transition-colors cursor-pointer"
                    onClick={() => {
                      if (!readOnly) {
                        updateGraph(
                          nodes,
                          connections.filter((c) => c.id !== conn.id)
                        )
                      }
                    }}
                  />
                  {/* Glowing core */}
                  <path
                    d={d}
                    fill="none"
                    className="stroke-background stroke-[1px] pointer-events-none opacity-40"
                  />
                </g>
              )
            })}
          </svg>

          {/* Node Items */}
          <div className="relative" style={{ minWidth: "760px", minHeight: "260px" }}>
            {nodes.map((node) => {
              const isSelected = selectedId === node.id

              return (
                <div
                  key={node.id}
                  onClick={() => handleSelectNode(node.id)}
                  style={{
                    position: "absolute",
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    width: `${nodeWidth}px`,
                  }}
                  className={cn(
                    "flex flex-col rounded-xl border border-border bg-card/95 text-card-foreground shadow-sm backdrop-blur-xs transition-all cursor-pointer z-10",
                    isSelected && "ring-2 ring-primary shadow-lg z-20 scale-102"
                  )}
                >
                  {/* Node Header */}
                  <div
                    className="flex items-center justify-between px-3 py-2 border-b border-border/60 rounded-t-xl"
                    style={{
                      borderTop: `3px solid ${node.color || "var(--primary)"}`,
                    }}
                  >
                    <div className="truncate">
                      <span className="text-[11px] font-bold text-foreground block truncate">
                        {node.title}
                      </span>
                      {node.category && (
                        <span className="text-[9px] text-muted-foreground uppercase tracking-wider block">
                          {node.category}
                        </span>
                      )}
                    </div>

                    {!readOnly && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteNode(node.id)
                        }}
                        aria-label={`Remove ${node.title}`}
                        className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors shrink-0"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>

                  {/* Ports Container */}
                  <div className="p-2 space-y-1 text-[10px]">
                    {/* Inputs */}
                    {node.inputs.map((port) => {
                      const isPending =
                        pendingPort?.nodeId === node.id && pendingPort?.portId === port.id
                      return (
                        <div
                          key={port.id}
                          className="flex items-center gap-1.5 py-0.5 text-muted-foreground"
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              handlePortClick(node.id, port.id, false)
                            }}
                            title={`Input: ${port.label} (${port.type})`}
                            className={cn(
                              "h-3 w-3 rounded-full border border-border transition-transform hover:scale-125 -ml-3.5",
                              isPending && "ring-2 ring-primary animate-ping"
                            )}
                            style={{
                              backgroundColor: PORT_COLORS[port.type] || "var(--primary)",
                            }}
                          />
                          <span className="truncate">{port.label}</span>
                        </div>
                      )
                    })}

                    {/* Outputs */}
                    {node.outputs.map((port) => {
                      const isPending =
                        pendingPort?.nodeId === node.id && pendingPort?.portId === port.id
                      return (
                        <div
                          key={port.id}
                          className="flex items-center justify-end gap-1.5 py-0.5 text-muted-foreground"
                        >
                          <span className="truncate">{port.label}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              handlePortClick(node.id, port.id, true)
                            }}
                            title={`Output: ${port.label} (${port.type})`}
                            className={cn(
                              "h-3 w-3 rounded-full border border-border transition-transform hover:scale-125 -mr-3.5",
                              isPending && "ring-2 ring-primary animate-ping"
                            )}
                            style={{
                              backgroundColor: PORT_COLORS[port.type] || "var(--primary)",
                            }}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer info bar */}
        <div className="flex items-center justify-between border-t border-border bg-muted/20 px-4 py-2 text-[11px] text-muted-foreground">
          <span>
            {pendingPort
              ? "Click another compatible port to connect"
              : "Click port dots to route cables, click cable to disconnect"}
          </span>
          <span className="font-mono">
            {nodes.length} nodes · {connections.length} cables
          </span>
        </div>
      </div>
    )
  }
)
NodeBasedEditor.displayName = "NodeBasedEditor"
