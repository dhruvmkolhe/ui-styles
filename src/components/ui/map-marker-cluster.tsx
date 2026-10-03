"use client"

import * as React from "react"
import {
  MapPin,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Navigation,
  Globe,
  Radio,
  Server,
  Layers,
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface GeoPoint {
  id: string
  name: string
  region: string
  lat: number
  lng: number
  activeUsers: number
  status: "operational" | "degraded" | "maintenance"
  latencyMs: number
}

export interface MapCluster {
  id: string
  x: number
  y: number
  count: number
  points: GeoPoint[]
  isCluster: boolean
}

export interface MapMarkerClusterProps extends React.HTMLAttributes<HTMLDivElement> {
  points?: GeoPoint[]
  width?: number
  height?: number
  clusterDistance?: number // threshold in pixels
  onPointSelect?: (point: GeoPoint | null) => void
}

const DEFAULT_GEO_POINTS: GeoPoint[] = [
  // North America
  { id: "sfo", name: "San Francisco", region: "North America (US-West)", lat: 37.77, lng: -122.41, activeUsers: 48200, status: "operational", latencyMs: 14 },
  { id: "lax", name: "Los Angeles", region: "North America (US-West)", lat: 34.05, lng: -118.24, activeUsers: 34100, status: "operational", latencyMs: 18 },
  { id: "sea", name: "Seattle", region: "North America (US-West)", lat: 47.60, lng: -122.33, activeUsers: 28900, status: "operational", latencyMs: 22 },
  { id: "nyc", name: "New York City", region: "North America (US-East)", lat: 40.71, lng: -74.00, activeUsers: 64200, status: "operational", latencyMs: 11 },
  { id: "chi", name: "Chicago", region: "North America (US-Central)", lat: 41.87, lng: -87.62, activeUsers: 29500, status: "operational", latencyMs: 19 },
  { id: "tor", name: "Toronto", region: "North America (CA-East)", lat: 43.65, lng: -79.38, activeUsers: 19800, status: "operational", latencyMs: 24 },

  // Europe
  { id: "lon", name: "London", region: "Europe (UK-South)", lat: 51.50, lng: -0.12, activeUsers: 58400, status: "operational", latencyMs: 16 },
  { id: "par", name: "Paris", region: "Europe (EU-West)", lat: 48.85, lng: 2.35, activeUsers: 38200, status: "operational", latencyMs: 21 },
  { id: "fra", name: "Frankfurt", region: "Europe (EU-Central)", lat: 50.11, lng: 8.68, activeUsers: 49100, status: "operational", latencyMs: 15 },
  { id: "ams", name: "Amsterdam", region: "Europe (EU-North)", lat: 52.36, lng: 4.90, activeUsers: 31200, status: "operational", latencyMs: 17 },

  // Asia & Pacific
  { id: "tok", name: "Tokyo", region: "Asia Pacific (AP-Northeast)", lat: 35.67, lng: 139.65, activeUsers: 72400, status: "operational", latencyMs: 28 },
  { id: "sin", name: "Singapore", region: "Asia Pacific (AP-Southeast)", lat: 1.35, lng: 103.81, activeUsers: 41800, status: "operational", latencyMs: 32 },
  { id: "syd", name: "Sydney", region: "Oceania (AP-Southeast)", lat: -33.86, lng: 151.20, activeUsers: 24600, status: "degraded", latencyMs: 84 },
  { id: "sao", name: "São Paulo", region: "South America (SA-East)", lat: -23.55, lng: -46.63, activeUsers: 16400, status: "operational", latencyMs: 110 },
]

export const MapMarkerCluster = React.forwardRef<HTMLDivElement, MapMarkerClusterProps>(
  (
    {
      points = DEFAULT_GEO_POINTS,
      width = 740,
      height = 380,
      clusterDistance = 45,
      onPointSelect,
      className,
      ...props
    },
    ref
  ) => {
    const [zoom, setZoom] = React.useState(1)
    const [pan, setPan] = React.useState({ x: 0, y: 0 })
    const [selectedPoint, setSelectedPoint] = React.useState<GeoPoint | null>(null)
    const [isPanning, setIsPanning] = React.useState(false)
    const [startPan, setStartPan] = React.useState({ x: 0, y: 0 })

    // Mercator projection conversion (lat/lng to SVG canvas X/Y)
    const project = React.useCallback(
      (lat: number, lng: number) => {
        const x = ((lng + 180) / 360) * width
        const latRad = (lat * Math.PI) / 180
        const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2))
        const y = height / 2 - (width * mercN) / (2 * Math.PI)
        return { x: Math.max(10, Math.min(width - 10, x)), y: Math.max(10, Math.min(height - 10, y)) }
      },
      [width, height]
    )

    // Dynamic clustering calculation based on screen distance at current zoom level
    const clusters: MapCluster[] = React.useMemo(() => {
      const projected = points.map((p) => {
        const coord = project(p.lat, p.lng)
        return { point: p, x: coord.x, y: coord.y }
      })

      const effectiveThreshold = clusterDistance / zoom
      const visited = new Set<string>()
      const result: MapCluster[] = []

      for (let i = 0; i < projected.length; i++) {
        const current = projected[i]
        if (visited.has(current.point.id)) continue
        visited.add(current.point.id)

        const group: GeoPoint[] = [current.point]
        let sumX = current.x
        let sumY = current.y

        for (let j = i + 1; j < projected.length; j++) {
          const other = projected[j]
          if (visited.has(other.point.id)) continue

          const dist = Math.hypot(current.x - other.x, current.y - other.y)
          if (dist <= effectiveThreshold) {
            visited.add(other.point.id)
            group.push(other.point)
            sumX += other.x
            sumY += other.y
          }
        }

        result.push({
          id: `cluster-${current.point.id}-${group.length}`,
          x: sumX / group.length,
          y: sumY / group.length,
          count: group.length,
          points: group,
          isCluster: group.length > 1,
        })
      }

      return result
    }, [points, project, clusterDistance, zoom])

    // Zoom controls
    const handleZoomIn = () => setZoom((z) => Math.min(3.5, +(z + 0.3).toFixed(2)))
    const handleZoomOut = () => setZoom((z) => Math.max(0.8, +(z - 0.3).toFixed(2)))
    const handleReset = () => {
      setZoom(1)
      setPan({ x: 0, y: 0 })
      setSelectedPoint(null)
    }

    // Pan handling
    const handleMouseDown = (e: React.MouseEvent) => {
      setIsPanning(true)
      setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y })
    }

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isPanning) return
      setPan({
        x: e.clientX - startPan.x,
        y: e.clientY - startPan.y,
      })
    }

    const handleMouseUp = () => setIsPanning(false)

    // Handle cluster click: zoom into cluster coordinates
    const handleClusterClick = (cluster: MapCluster) => {
      if (cluster.isCluster) {
        setZoom((z) => Math.min(3.5, +(z + 0.8).toFixed(2)))
        setPan({
          x: width / 2 - cluster.x * (zoom + 0.8),
          y: height / 2 - cluster.y * (zoom + 0.8),
        })
      } else {
        const pt = cluster.points[0]
        setSelectedPoint(pt)
        onPointSelect?.(pt)
      }
    }

    const totalActiveUsers = React.useMemo(
      () => points.reduce((acc, p) => acc + p.activeUsers, 0),
      [points]
    )

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Map Marker and Proximity Cluster Visualization"
        className={cn(
          "w-full rounded-xl border border-border bg-card shadow-2xs p-4 space-y-3 select-none",
          className
        )}
        {...props}
      >
        {/* Header and Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-primary/10 text-primary">
              <Globe className="h-4 w-4" />
            </span>
            <div>
              <h4 className="font-semibold text-foreground">Global Node Proximity Clusters</h4>
              <p suppressHydrationWarning className="text-[11px] text-muted-foreground">
                {points.length} edge locations · {clusters.length} active visual clusters · {totalActiveUsers.toLocaleString("en-US")} active connections
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-background border border-border rounded-lg p-1">
            <button
              type="button"
              onClick={handleZoomIn}
              title="Zoom in and expand clusters"
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
              title="Zoom out"
              className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={handleReset}
              title="Reset map"
              className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border-l border-border/60 pl-2 ml-1"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Map Canvas */}
        <div className="relative w-full overflow-hidden rounded-lg border border-border/80 bg-slate-950 dark:bg-black cursor-grab active:cursor-grabbing">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto block"
            style={{ aspectRatio: `${width} / ${height}` }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
              {/* Graticule & stylized world continents */}
              <defs>
                <radialGradient id="map-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#1e293b" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#020617" stopOpacity="1" />
                </radialGradient>
              </defs>
              <rect width={width} height={height} fill="url(#map-glow)" />

              {/* Grid Lines */}
              <line x1={0} y1={height / 2} x2={width} y2={height / 2} stroke="#334155" strokeDasharray="2 4" strokeWidth={0.8} />
              <line x1={width / 2} y1={0} x2={width / 2} y2={height} stroke="#334155" strokeDasharray="2 4" strokeWidth={0.8} />
              <line x1={width * 0.25} y1={0} x2={width * 0.25} y2={height} stroke="#1e293b" strokeDasharray="1 5" strokeWidth={0.6} />
              <line x1={width * 0.75} y1={0} x2={width * 0.75} y2={height} stroke="#1e293b" strokeDasharray="1 5" strokeWidth={0.6} />

              {/* Abstract Landmass Outlines */}
              {/* North America */}
              <path
                d="M 120,60 Q 210,50 250,90 Q 260,140 180,180 Q 140,150 110,110 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth={1}
                opacity={0.7}
              />
              {/* South America */}
              <path
                d="M 210,195 Q 260,220 250,290 Q 220,340 190,270 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth={1}
                opacity={0.7}
              />
              {/* Eurasia */}
              <path
                d="M 360,60 Q 520,40 640,90 Q 610,180 480,160 Q 420,130 350,90 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth={1}
                opacity={0.7}
              />
              {/* Africa */}
              <path
                d="M 370,140 Q 430,150 440,240 Q 400,280 360,200 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth={1}
                opacity={0.7}
              />
              {/* Australia */}
              <path
                d="M 580,240 Q 660,230 670,280 Q 610,310 570,270 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth={1}
                opacity={0.7}
              />

              {/* Cluster / Pin Markers */}
              {clusters.map((cluster) => {
                const isSelected = selectedPoint && cluster.points.some((p) => p.id === selectedPoint.id)

                if (cluster.isCluster) {
                  // Render Cluster Bubble
                  const radius = Math.min(26, 14 + cluster.count * 2.5)
                  return (
                    <g
                      key={cluster.id}
                      transform={`translate(${cluster.x}, ${cluster.y})`}
                      className="cursor-pointer group"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleClusterClick(cluster)
                      }}
                    >
                      {/* Pulse halo */}
                      <circle
                        r={radius + 6}
                        fill="#3b82f6"
                        fillOpacity={0.2}
                        className="animate-ping"
                      />
                      <circle
                        r={radius}
                        fill="#2563eb"
                        stroke="#ffffff"
                        strokeWidth={2}
                        className="transition-transform group-hover:scale-110 drop-shadow-md"
                      />
                      <text
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#ffffff"
                        className="text-[11px] font-bold font-mono select-none"
                      >
                        {cluster.count}
                      </text>
                    </g>
                  )
                }

                // Render Single Marker Pin
                const pt = cluster.points[0]
                return (
                  <g
                    key={pt.id}
                    transform={`translate(${cluster.x}, ${cluster.y})`}
                    className="cursor-pointer group"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedPoint(pt)
                      onPointSelect?.(pt)
                    }}
                  >
                    {/* Ring highlight when selected */}
                    {isSelected && (
                      <circle
                        r={16}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth={2}
                        strokeDasharray="3 3"
                        className="animate-spin"
                      />
                    )}
                    <circle
                      r={7}
                      fill={pt.status === "degraded" ? "#f59e0b" : "#10b981"}
                      stroke="#ffffff"
                      strokeWidth={1.5}
                      className="transition-transform group-hover:scale-125 drop-shadow-md"
                    />
                    <text
                      y={-12}
                      textAnchor="middle"
                      fill="#e2e8f0"
                      className="text-[9px] font-semibold tracking-tight select-none opacity-90 group-hover:opacity-100"
                    >
                      {pt.name}
                    </text>
                  </g>
                )
              })}
            </g>
          </svg>

          {/* Location Detail Popover overlay */}
          {selectedPoint && (
            <div className="absolute top-3 right-3 z-20 w-64 rounded-lg border border-border bg-popover/95 p-3 text-xs shadow-xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-border/60 pb-2">
                <div className="flex items-center gap-1.5 font-bold text-foreground">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  <span>{selectedPoint.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPoint(null)}
                  className="text-muted-foreground hover:text-foreground p-0.5 rounded"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-1.5 pt-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Region:</span>
                  <span className="font-medium text-foreground">{selectedPoint.region}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Coordinates:</span>
                  <span className="font-mono text-muted-foreground">
                    {selectedPoint.lat.toFixed(2)}°, {selectedPoint.lng.toFixed(2)}°
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Connections:</span>
                  <span suppressHydrationWarning className="font-mono font-bold text-primary">
                    {selectedPoint.activeUsers.toLocaleString("en-US")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Roundtrip Latency:</span>
                  <span className="font-mono font-bold text-emerald-500">
                    {selectedPoint.latencyMs} ms
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
)

MapMarkerCluster.displayName = "MapMarkerCluster"
