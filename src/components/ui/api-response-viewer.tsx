"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Copy,
  Check,
  Clock,
  HardDrive,
  Download,
  FileCode,
  Table as TableIcon,
  Maximize2,
} from "lucide-react"

export interface ResponseHeader {
  name: string
  value: string
}

export interface APIResponseData {
  statusCode: number
  statusText: string
  durationMs: number
  sizeBytes: number
  headers: ResponseHeader[]
  body: string
  contentType?: string
}

export interface APIResponseViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  response?: APIResponseData
  isLoading?: boolean
  emptyMessage?: string
}

const DEFAULT_RESPONSE: APIResponseData = {
  statusCode: 200,
  statusText: "OK",
  durationMs: 142,
  sizeBytes: 1840,
  contentType: "application/json; charset=utf-8",
  headers: [
    { name: "Content-Type", value: "application/json; charset=utf-8" },
    { name: "X-RateLimit-Limit", value: "1000" },
    { name: "X-RateLimit-Remaining", value: "984" },
    { name: "X-RateLimit-Reset", value: "1727931600" },
    { name: "Cache-Control", value: "max-age=3600, s-maxage=3600" },
    { name: "Server", value: "Cloudflare" },
  ],
  body: `{
  "status": "success",
  "data": {
    "total": 144,
    "batch": 14,
    "category": "API & Data Utilities",
    "readyForProduction": true,
    "components": [
      "api-request-builder",
      "api-response-viewer",
      "regex-tester",
      "cron-expression-builder",
      "query-builder"
    ]
  },
  "timestamp": "2026-10-03T01:20:00.000Z"
}`,
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export const APIResponseViewer = React.forwardRef<HTMLDivElement, APIResponseViewerProps>(
  (
    {
      className,
      response = DEFAULT_RESPONSE,
      isLoading = false,
      emptyMessage = "No response data available. Send a request to view results.",
      ...props
    },
    ref
  ) => {
    const [activeTab, setActiveTab] = React.useState<"body" | "headers" | "preview">("body")
    const [copied, setCopied] = React.useState(false)

    const isSuccess = response.statusCode >= 200 && response.statusCode < 300
    const isRedirect = response.statusCode >= 300 && response.statusCode < 400
    const isClientError = response.statusCode >= 400 && response.statusCode < 500
    const isServerError = response.statusCode >= 500

    const statusBadgeColor = isSuccess
      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
      : isRedirect
      ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30"
      : isClientError
      ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
      : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30"

    // Parse JSON safely
    const parsedJSON = React.useMemo(() => {
      try {
        return JSON.parse(response.body)
      } catch {
        return null
      }
    }, [response.body])

    const handleCopy = () => {
      navigator.clipboard.writeText(response.body)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    const handleDownload = () => {
      const blob = new Blob([response.body], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `response-${Date.now()}.json`
      a.click()
      URL.revokeObjectURL(url)
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-3xl rounded-xl border border-border bg-card shadow-sm overflow-hidden text-card-foreground text-xs font-mono",
          className
        )}
        {...props}
      >
        {/* Top Header Bar */}
        <div className="p-3 border-b border-border bg-muted/30 flex flex-wrap items-center justify-between gap-2 font-sans">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xs text-foreground">Response Status:</span>
            {/* Status Code Pill */}
            <span
              className={cn(
                "px-2.5 py-0.5 rounded-full border text-[11px] font-mono font-bold flex items-center gap-1",
                statusBadgeColor
              )}
            >
              {isSuccess ? (
                <CheckCircle2 className="h-3 w-3" />
              ) : isClientError ? (
                <AlertTriangle className="h-3 w-3" />
              ) : (
                <AlertCircle className="h-3 w-3" />
              )}
              <span>{response.statusCode} {response.statusText}</span>
            </span>
          </div>

          {/* Quick Metrics: Latency and Size */}
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-mono">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{response.durationMs}ms</span>
            </div>
            <div className="flex items-center gap-1">
              <HardDrive className="h-3 w-3" />
              <span>{formatBytes(response.sizeBytes)}</span>
            </div>
          </div>
        </div>

        {/* Tab Selection + Action Icons */}
        <div className="flex items-center justify-between border-b border-border bg-background/50 px-3 pt-1">
          <div className="flex items-center gap-1 font-sans">
            {[
              { id: "body", label: "Response Body" },
              { id: "headers", label: `Headers (${response.headers.length})` },
              { id: "preview", label: "Preview" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "px-3 py-1.5 text-xs font-semibold rounded-t-lg transition-colors border-b-2 -mb-[1px]",
                  activeTab === tab.id
                    ? "border-primary text-primary bg-card"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 font-sans">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1 px-2 py-1 rounded text-[11px] text-muted-foreground hover:text-foreground transition-colors"
              title="Copy response body"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-1 px-2 py-1 rounded text-[11px] text-muted-foreground hover:text-foreground transition-colors"
              title="Download JSON payload"
            >
              <Download className="h-3 w-3" />
              <span className="hidden sm:inline">Download</span>
            </button>
          </div>
        </div>

        {/* Content Viewport */}
        <div className="p-4 max-h-[360px] overflow-y-auto bg-card">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-2 text-muted-foreground font-sans">
              <Clock className="h-8 w-8 animate-spin text-primary" />
              <p className="text-xs font-medium">Awaiting server response...</p>
            </div>
          ) : !response ? (
            <div className="py-12 text-center text-muted-foreground font-sans text-xs">
              {emptyMessage}
            </div>
          ) : activeTab === "body" ? (
            /* Body Tab: Formatted JSON with line numbers or raw text */
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground font-sans pb-1 border-b border-border/50">
                <span>Payload Format: {parsedJSON ? "JSON" : "Raw Text"}</span>
                <span>{response.body.split("\n").length} lines</span>
              </div>
              <pre className="text-xs font-mono text-foreground overflow-x-auto whitespace-pre leading-relaxed p-1">
                <code>{response.body}</code>
              </pre>
            </div>
          ) : activeTab === "headers" ? (
            /* Headers Tab: Key-Value Table */
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border text-muted-foreground font-sans font-semibold">
                    <th className="py-1.5 pr-4">Header Key</th>
                    <th className="py-1.5">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {response.headers.map((h, i) => (
                    <tr key={i} className="hover:bg-muted/30">
                      <td className="py-1.5 pr-4 text-primary font-semibold">{h.name}</td>
                      <td className="py-1.5 text-foreground break-all">{h.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Preview Tab: Visual overview of payload */
            <div className="space-y-3 font-sans">
              <div className="p-3 rounded-lg border border-border bg-muted/20 space-y-2">
                <span className="text-xs font-bold text-foreground">Response Summary</span>
                {parsedJSON && typeof parsedJSON === "object" ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    {Object.entries(parsedJSON).map(([k, v]) => (
                      <div key={k} className="p-2 rounded bg-background border border-border">
                        <span className="text-[10px] text-muted-foreground uppercase font-mono block font-bold">
                          {k}
                        </span>
                        <span className="font-semibold text-foreground truncate block font-mono">
                          {typeof v === "object" ? `${Array.isArray(v) ? v.length : Object.keys(v || {}).length} items` : String(v)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">Raw string payload (non-JSON)</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
)

APIResponseViewer.displayName = "APIResponseViewer"
