"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  ChevronRight,
  ChevronDown,
  Copy,
  Check,
  Code2,
  Minimize2,
  Maximize2,
  AlertCircle,
  Search,
} from "lucide-react"

export interface JSONViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: any
  initialExpandedDepth?: number
  title?: string
  showControls?: boolean
  showSearch?: boolean
  editable?: boolean
  onDataChange?: (newData: any) => void
}

const DEFAULT_JSON = {
  project: "Chameleon UI Design System",
  batch: 13,
  category: "Collaboration & Developer Tools",
  isProductionReady: true,
  componentCount: 10,
  features: [
    "Simulated terminal sandbox",
    "Unified & split diff viewer",
    "Nested comment tree",
    "Real-time user presence",
  ],
  systemMetrics: {
    memoryAllocatedMb: 256.4,
    nodeVersion: "v20.12.0",
    cluster: {
      primary: "us-east-1a",
      replicas: 3,
      health: "healthy",
    },
  },
  tags: ["react", "nextjs", "tailwind", "design-tokens"],
  author: null,
}

// Tree node component for recursion
interface JSONNodeProps {
  keyName?: string
  value: any
  depth: number
  maxInitialDepth: number
  searchQuery: string
}

function JSONNode({ keyName, value, depth, maxInitialDepth, searchQuery }: JSONNodeProps) {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(depth < maxInitialDepth)

  const isObject = value !== null && typeof value === "object" && !Array.isArray(value)
  const isArray = Array.isArray(value)
  const isPrimitive = !isObject && !isArray

  // Search matching
  const matchesSearch = React.useMemo(() => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    if (keyName && keyName.toLowerCase().includes(q)) return true
    if (isPrimitive && String(value).toLowerCase().includes(q)) return true
    return false
  }, [keyName, value, isPrimitive, searchQuery])

  // Formatting primitives
  const renderPrimitiveValue = (val: any) => {
    if (val === null) return <span className="text-slate-400 italic">null</span>
    if (typeof val === "boolean")
      return (
        <span className="text-sky-500 dark:text-sky-400 font-bold">{val ? "true" : "false"}</span>
      )
    if (typeof val === "number")
      return <span className="text-amber-600 dark:text-amber-400 font-mono">{val}</span>
    if (typeof val === "string")
      return (
        <span className="text-emerald-600 dark:text-emerald-400 break-all">&quot;{val}&quot;</span>
      )
    return <span className="text-foreground">{String(val)}</span>
  }

  if (isPrimitive) {
    if (searchQuery && !matchesSearch) return null
    return (
      <div
        className={cn(
          "flex items-start gap-1.5 py-0.5 text-xs font-mono leading-relaxed pl-4 hover:bg-muted/40 rounded transition-colors"
        )}
      >
        {keyName !== undefined && (
          <span className="text-indigo-600 dark:text-indigo-400 font-medium shrink-0">
            &quot;{keyName}&quot;:
          </span>
        )}
        <span className="break-all">{renderPrimitiveValue(value)}</span>
      </div>
    )
  }

  const entries = isArray
    ? value.map((item: any, idx: number) => ({ key: String(idx), val: item }))
    : Object.entries(value).map(([k, v]) => ({ key: k, val: v }))

  const count = entries.length
  const bracketOpen = isArray ? "[" : "{"
  const bracketClose = isArray ? "]" : "}"

  return (
    <div className="text-xs font-mono">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-1 py-0.5 cursor-pointer select-none hover:bg-muted/50 rounded px-1 -ml-1 transition-colors text-foreground"
      >
        <span className="text-muted-foreground p-0.5">
          {isExpanded ? (
            <ChevronDown className="h-3 w-3" />
          ) : (
            <ChevronRight className="h-3 w-3" />
          )}
        </span>

        {keyName !== undefined && (
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
            &quot;{keyName}&quot;:
          </span>
        )}

        <span className="text-muted-foreground font-semibold">{bracketOpen}</span>

        {!isExpanded && (
          <span className="text-muted-foreground/70 text-[11px] px-1 bg-muted/60 rounded mx-1">
            {count} {isArray ? "items" : "keys"}
          </span>
        )}

        {!isExpanded && (
          <span className="text-muted-foreground font-semibold">{bracketClose}</span>
        )}
      </div>

      {isExpanded && (
        <div className="pl-4 border-l border-border/40 ml-2 space-y-0.5 my-0.5">
          {entries.map(({ key, val }: { key: string; val: any }) => (
            <JSONNode
              key={key}
              keyName={isArray ? undefined : key}
              value={val}
              depth={depth + 1}
              maxInitialDepth={maxInitialDepth}
              searchQuery={searchQuery}
            />
          ))}
          <div className="text-muted-foreground font-semibold pl-1">{bracketClose}</div>
        </div>
      )}
    </div>
  )
}

export const JSONViewer = React.forwardRef<HTMLDivElement, JSONViewerProps>(
  (
    {
      className,
      data = DEFAULT_JSON,
      initialExpandedDepth = 2,
      title = "JSON Object Inspector",
      showControls = true,
      showSearch = true,
      editable = false,
      onDataChange,
      ...props
    },
    ref
  ) => {
    const [rawText, setRawText] = React.useState<string>(() => JSON.stringify(data, null, 2))
    const [parsedData, setParsedData] = React.useState<any>(data)
    const [parseError, setParseError] = React.useState<string | null>(null)
    const [searchQuery, setSearchQuery] = React.useState("")
    const [depthSetting, setDepthSetting] = React.useState(initialExpandedDepth)
    const [copied, setCopied] = React.useState(false)
    const [isEditMode, setIsEditMode] = React.useState(editable)

    // Sync if data prop changes
    React.useEffect(() => {
      try {
        setParsedData(data)
        setRawText(JSON.stringify(data, null, 2))
        setParseError(null)
      } catch (err: any) {
        setParseError(err?.message || "Invalid JSON structure")
      }
    }, [data])

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = e.target.value
      setRawText(val)
      try {
        const parsed = JSON.parse(val)
        setParsedData(parsed)
        setParseError(null)
        onDataChange?.(parsed)
      } catch (err: any) {
        setParseError(err?.message || "SyntaxError: Unexpected token in JSON")
      }
    }

    const handleCopy = () => {
      navigator.clipboard.writeText(rawText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-full rounded-xl border border-border bg-card shadow-sm overflow-hidden flex flex-col font-mono text-xs text-card-foreground",
          className
        )}
        {...props}
      >
        {/* Header Toolbar */}
        <div className="p-3 border-b border-border bg-muted/30 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-primary shrink-0" />
            <span className="font-semibold tracking-tight text-xs">{title}</span>
            {parseError ? (
              <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 font-bold border border-rose-500/20">
                Syntax Error
              </span>
            ) : (
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-bold border border-emerald-500/20">
                Valid JSON
              </span>
            )}
          </div>

          {showControls && (
            <div className="flex items-center gap-1.5">
              {/* Expand / Collapse All buttons */}
              <button
                type="button"
                onClick={() => setDepthSetting((d) => (d === 0 ? 5 : 0))}
                className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium border border-border bg-background hover:bg-muted transition-colors"
                title={depthSetting === 0 ? "Expand tree" : "Collapse tree"}
              >
                {depthSetting === 0 ? (
                  <>
                    <Maximize2 className="h-3 w-3" />
                    <span>Expand</span>
                  </>
                ) : (
                  <>
                    <Minimize2 className="h-3 w-3" />
                    <span>Collapse</span>
                  </>
                )}
              </button>

              {/* Edit Raw Mode toggle */}
              <button
                type="button"
                onClick={() => setIsEditMode(!isEditMode)}
                className={cn(
                  "px-2 py-1 rounded text-[11px] font-medium border border-border transition-colors",
                  isEditMode
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "bg-background text-muted-foreground hover:text-foreground"
                )}
              >
                {isEditMode ? "Tree View" : "Edit JSON"}
              </button>

              {/* Copy Raw JSON */}
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium border border-border bg-background hover:bg-muted transition-colors"
                title="Copy raw JSON"
              >
                {copied ? (
                  <Check className="h-3 w-3 text-emerald-500" />
                ) : (
                  <Copy className="h-3 w-3 text-muted-foreground" />
                )}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          )}
        </div>

        {/* Search bar (tree view mode only) */}
        {!isEditMode && showSearch && (
          <div className="px-3 py-2 border-b border-border/60 bg-background/50">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search keys or values..."
                className="w-full pl-8 pr-3 py-1 text-xs rounded-md border border-input bg-background placeholder:text-muted-foreground/70 focus:outline-hidden focus:ring-1 focus:ring-ring"
              />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="p-4 overflow-y-auto max-h-[440px] bg-background/60">
          {parseError && (
            <div className="mb-3 p-3 rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400 space-y-1 text-xs">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>JSON Parsing Error</span>
              </div>
              <p className="text-[11px] font-mono leading-relaxed pl-5">{parseError}</p>
            </div>
          )}

          {isEditMode ? (
            /* Editable Textarea Mode */
            <textarea
              value={rawText}
              onChange={handleTextareaChange}
              rows={14}
              className="w-full font-mono text-xs p-3 rounded-lg border border-input bg-card text-foreground focus:outline-hidden focus:ring-1 focus:ring-ring whitespace-pre"
              spellCheck={false}
            />
          ) : (
            /* Interactive Tree View */
            <div role="tree" aria-label="JSON Tree" className="space-y-0.5">
              <JSONNode
                value={parsedData}
                depth={0}
                maxInitialDepth={depthSetting}
                searchQuery={searchQuery}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
)

JSONViewer.displayName = "JSONViewer"
