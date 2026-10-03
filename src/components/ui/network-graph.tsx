"use client"

import * as React from "react"
import {
  Share2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Move,
  Server,
  Database,
  Globe,
  Shield,
  Layers,
  Info,
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface NetworkNode {
  id: string
  label: string
  type: "service" | "database" | "gateway" | "security" | "client"
  status?: "healthy" | "warning" | "error"
  x: number
  y: number
  color?: string
}

export interface NetworkEdge {
  id: string
  source: string
  target: string
  label?: string
  bandwidth?: string
}

export interface NetworkGraphData {
  nodes: NetworkNode[]
  edges: NetworkEdge[]
}

export interface NetworkGraphProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: NetworkGraphData
  width?: number
  height?: number
  onNodeSelect?: (node: NetworkNode | null) => void
}

const DEFAULT_GRAPH_DATA: NetworkGraphData = {
  nodes: [
    { id: "edge-gateway", label: "Global CDN / Edge", type: "gateway", status: "healthy", x: 120, y: 180, color: "#06b6d4" },
    { id: "auth-service", label: "Auth & Identity", type: "security", status: "healthy", x: 280, y: 90, color: "#8b5cf6" },
    { id: "api-service", label: "Core API Server", type: "service", status: "healthy", x: 280, y: 270, color: "#3b82f6" },
    { id: "cache-redis", label: "Redis Session Cache", type: "database", status: "healthy", x: 440, y: 70, color: "#ef4444" },
    { id: "primary-db", label: "Postgres Master DB", type: "database", status: "warning", x: 460, y: 220, color: "#10b981" },
    { id: "worker-queue", label: "Background Workers", type: "service", status: "healthy", x: 600, y: 150, color: "#f59e0b" },
    { id: "s3-storage", label: "Object Storage (S3)", type: "database", status: "healthy", x: 620, y: 290, color: "#64748b" },
  ],
  edges: [
    { id: "e1", source: "edge-gateway", target: "auth-service", label: "TLS 1.3", bandwidth: "14 Gb/s" },
    { id: "e2", source: "edge-gateway", target: "api-service", label: "HTTP/2", bandwidth: "48 Gb/s" },
    { id: "e3", source: "auth-service", target: "cache-redis", label: "TCP/6379", bandwidth: "8 Gb/s" },
    { id: "e4", source: "api-service", target: "primary-db", label: "Pool (20)", bandwidth: "32 Gb/s" },
    { id: "e5", source: "api-service", target: "worker-queue", label: "gRPC", bandwidth: "18 Gb/s" },
    { id: "e6", source: "worker-queue", target: "primary-db", label: "Sync", bandwidth: "12 Gb/s" },
    { id: "e7", source: "worker-queue", target: "s3-storage", label: "Archive", bandwidth: "24 Gb/s" },
  ],
}

export const NetworkGraph = React.forwardRef<HTMLDivElement, NetworkGraphProps>(
  (
    {
      data = DEFAULT_GRAPH_DATA,
      width = 740,
      height = 400,
      onNodeSelect,
      className,
      ...props
    },
    ref
  ) => {
    const [nodes, setNodes] = React.useState<NetworkNode[]>(data.nodes)
    const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>("api-service")
    const [zoom, setZoom] = React.useState(1)
    const [pan, setPan] = React.useState({ x: 0, y: 0 })
    const [draggingNodeId, setDraggingNodeId] = React.useState<string | null>(null)
    const [isPanning, setIsPanning] = React.useState(false)
    const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 })

    const svgRef = React.useRef<SVGSVGElement | null>(null)

    // Lookup node coordinates
    const nodeCoords = React.useMemo(() => {
      const map = new Map<string, NetworkNode>()
      nodes.forEach((n) => map.set(n.id, n))
      return map
    }, [nodes])

    const selectedNode = React.useMemo(() => {
      return nodes.find((n) => n.id === selectedNodeId) || null
    }, [nodes, selectedNodeId])

    // Connected neighbors and edges for selected node
    const { connectedEdges, neighborIds } = React.useMemo(() => {
      if (!selectedNodeId) return { connectedEdges: [], neighborIds: new Set<string>() }
      const edges = data.edges.filter(
        (e) => e.source === selectedNodeId || e.target === selectedNodeId
      )
      const nIds = new Set<string>()
      edges.forEach((e) => {
        nIds.add(e.source === selectedNodeId ? e.target : e.source)
      })
      return { connectedEdges: edges, neighborIds: nIds }
    }, [data.edges, selectedNodeId])

    // Zoom controls
    const handleZoomIn = () => setZoom((z) => Math.min(2.5, +(z + 0.2).toFixed(2)))
    const handleZoomOut = () => setZoom((z) => Math.max(0.5, +(z - 0.2).toFixed(2)))
    const handleReset = () => {
      setZoom(1)
      setPan({ x: 0, y: 0 })
      setNodes(data.nodes)
    }

    // Dragging logic
    const handleMouseDownNode = (e: React.MouseEvent, nodeId: string) => {
      e.stopPropagation()
      setDraggingNodeId(nodeId)
      setSelectedNodeId(nodeId)
      const node = nodes.find((n) => n.id === nodeId)
      onNodeSelect?.(node || null)
    }

    const handleMouseDownSvg = (e: React.MouseEvent) => {
      setIsPanning(true)
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
    }

    const handleMouseMove = (e: React.MouseEvent) => {
      if (draggingNodeId && svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect()
        const mouseX = (e.clientX - rect.left - pan.x) / zoom
        const mouseY = (e.clientY - rect.top - pan.y) / zoom

        setNodes((prev) =>
          prev.map((n) =>
            n.id === draggingNodeId ? { ...n, x: Math.round(mouseX), y: Math.round(mouseY) } : n
          )
        )
      } else if (isPanning) {
        setPan({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        })
      }
    }

    const handleMouseUp = () => {
      setDraggingNodeId(null)
      setIsPanning(false)
    }

    const getNodeIcon = (type: NetworkNode["type"]) => {
      switch (type) {
        case "gateway":
          return <Globe className="h-4 w-4" />
        case "security":
          return <Shield className="h-4 w-4" />
        case "database":
          return <Database className="h-4 w-4" />
        default:
          return <Server className="h-4 w-4" />
      }
    }

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Interactive Network Graph"
        className={cn(
          "w-full rounded-xl border border-border bg-card shadow-2xs p-4 space-y-3 select-none",
          className
        )}
        {...props}
      >
        {/* Header with Navigation Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-primary/10 text-primary">
              <Share2 className="h-4 w-4" />
            </span>
            <div>
              <h4 className="font-semibold text-foreground">Interactive Network Topology</h4>
              <p className="text-[11px] text-muted-foreground">
                {nodes.length} nodes · {data.edges.length} connections · Drag nodes to reposition
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-background border border-border rounded-lg p-1">
            <button
              type="button"
              onClick={handleZoomIn}
              title="Zoom In"
              className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
            <span className="text-[10px] font-mono px-1 font-semibold text-muted-foreground">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={handleZoomOut}
              title="Zoom Out"
              className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={handleReset}
              title="Reset Layout & Zoom"
              className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border-l border-border/60 pl-2 ml-1"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Network Canvas & Side Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          <div className="lg:col-span-3 relative w-full overflow-hidden rounded-lg border border-border/70 bg-background/50 cursor-grab active:cursor-grabbing">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-auto block"
              style={{ aspectRatio: `${width} / ${height}` }}
              onMouseDown={handleMouseDownSvg}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
                {/* Background grid pattern */}
                <defs>
                  <pattern id="net-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="currentColor" className="text-border/40" />
                  </pattern>
                </defs>
                <rect width={width * 3} height={height * 3} x={-width} y={-height} fill="url(#net-grid)" />

                {/* Edges */}
                {data.edges.map((edge) => {
                  const s = nodeCoords.get(edge.source)
                  const t = nodeCoords.get(edge.target)
                  if (!s || !t) return null

                  const isConnected =
                    selectedNodeId === edge.source || selectedNodeId === edge.target
                  const midX = (s.x + t.x) / 2
                  const midY = (s.y + t.y) / 2

                  return (
                    <g key={edge.id}>
                      <line
                        x1={s.x}
                        y1={s.y}
                        x2={t.x}
                        y2={t.y}
                        stroke={isConnected ? "#3b82f6" : "currentColor"}
                        className={cn(
                          "transition-all duration-150",
                          isConnected ? "text-primary" : "text-border"
                        )}
                        strokeWidth={isConnected ? 2.5 : 1.2}
                        strokeDasharray={isConnected ? "none" : "3 3"}
                        opacity={selectedNodeId && !isConnected ? 0.25 : 0.85}
                      />
                      {/* Edge bandwidth badge */}
                      {edge.bandwidth && (
                        <foreignObject
                          x={midX - 35}
                          y={midY - 10}
                          width={70}
                          height={20}
                          className="pointer-events-none"
                        >
                          <div className="flex justify-center">
                            <span
                              className={cn(
                                "text-[9px] font-mono px-1.5 py-0.5 rounded-full border shadow-2xs transition-opacity select-none",
                                isConnected
                                  ? "bg-primary text-primary-foreground border-primary font-bold"
                                  : "bg-background/90 text-muted-foreground border-border"
                              )}
                            >
                              {edge.bandwidth}
                            </span>
                          </div>
                        </foreignObject>
                      )}
                    </g>
                  )
                })}

                {/* Nodes */}
                {nodes.map((node) => {
                  const isSelected = selectedNodeId === node.id
                  const isNeighbor = neighborIds.has(node.id)
                  const dimmed = selectedNodeId && !isSelected && !isNeighbor

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x}, ${node.y})`}
                      onMouseDown={(e) => handleMouseDownNode(e, node.id)}
                      className="cursor-pointer"
                    >
                      {/* Node Halo */}
                      {isSelected && (
                        <circle
                          r={28}
                          fill={node.color || "#3b82f6"}
                          fillOpacity={0.2}
                          className="animate-pulse"
                        />
                      )}

                      {/* Main Node Circle */}
                      <circle
                        r={20}
                        fill={node.color || "#3b82f6"}
                        stroke={isSelected ? "#ffffff" : "rgba(0,0,0,0.15)"}
                        strokeWidth={isSelected ? 2.5 : 1.5}
                        opacity={dimmed ? 0.35 : 1}
                        className="transition-all duration-150"
                      />

                      {/* Status indicator dot */}
                      <circle
                        cx={14}
                        cy={-14}
                        r={4.5}
                        fill={
                          node.status === "error"
                            ? "#ef4444"
                            : node.status === "warning"
                            ? "#f59e0b"
                            : "#10b981"
                        }
                        stroke="#ffffff"
                        strokeWidth={1.5}
                      />

                      {/* Center Icon */}
                      <foreignObject x={-8} y={-8} width={16} height={16} className="pointer-events-none">
                        <div className="w-full h-full flex items-center justify-center text-white">
                          {getNodeIcon(node.type)}
                        </div>
                      </foreignObject>

                      {/* Label below node */}
                      <text
                        y={32}
                        textAnchor="middle"
                        className={cn(
                          "text-[10px] font-semibold transition-opacity select-none",
                          isSelected
                            ? "fill-foreground font-bold"
                            : isNeighbor
                            ? "fill-foreground"
                            : "fill-muted-foreground",
                          dimmed && "opacity-40"
                        )}
                      >
                        {node.label}
                      </text>
                    </g>
                  )
                })}
              </g>
            </svg>
          </div>

          {/* Node Inspector Side Panel */}
          <div className="rounded-lg border border-border/80 bg-background/80 p-3 space-y-3 text-xs">
            <span className="font-mono text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
              Node Inspector
            </span>

            {selectedNode ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full shrink-0"
                    style={{ backgroundColor: selectedNode.color || "#3b82f6" }}
                  />
                  <div>
                    <h5 className="font-semibold text-foreground text-xs leading-tight">
                      {selectedNode.label}
                    </h5>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      ID: {selectedNode.id}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1 border-t border-border/60">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted-foreground">Node Type:</span>
                    <span className="font-semibold uppercase tracking-wider font-mono text-[10px]">
                      {selectedNode.type}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted-foreground">Health Status:</span>
                    <span
                      className={cn(
                        "font-semibold text-[10px] uppercase font-mono",
                        selectedNode.status === "error"
                          ? "text-rose-500"
                          : selectedNode.status === "warning"
                          ? "text-amber-500"
                          : "text-emerald-500"
                      )}
                    >
                      ● {selectedNode.status || "healthy"}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted-foreground">Coordinates:</span>
                    <span className="font-mono text-muted-foreground">
                      ({selectedNode.x}, {selectedNode.y})
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-border/60 space-y-1.5">
                  <span className="text-[11px] font-semibold text-foreground block">
                    Connections ({connectedEdges.length})
                  </span>
                  <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                    {connectedEdges.map((e) => {
                      const peerId = e.source === selectedNode.id ? e.target : e.source
                      const peer = nodeCoords.get(peerId)
                      return (
                        <div
                          key={e.id}
                          className="p-1.5 rounded bg-muted/50 border border-border/60 flex items-center justify-between text-[10px]"
                        >
                          <span className="truncate max-w-[90px] font-medium">
                            {peer?.label || peerId}
                          </span>
                          <span className="font-mono text-primary font-bold">{e.bandwidth}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground text-xs">
                Select any node on the graph to inspect properties and connections.
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
)

NetworkGraph.displayName = "NetworkGraph"
