"use client"

import * as React from "react"
import {
  FileJson,
  Copy,
  Check,
  Download,
  RotateCcw,
  Sliders,
  Sparkles,
  Clock,
  Server,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type HttpStatus = 200 | 201 | 204 | 400 | 401 | 404 | 429 | 500
export type ResponseSchemaTemplate = "users" | "auth" | "order" | "paginated" | "error"

export interface MockApiResponseGeneratorProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultStatus?: HttpStatus
  defaultTemplate?: ResponseSchemaTemplate
  onGenerateResponse?: (payload: { status: HttpStatus; body: any; headers: Record<string, string> }) => void
}

const TEMPLATE_GENERATORS: Record<ResponseSchemaTemplate, (status: HttpStatus) => any> = {
  users: (status) => {
    if (status >= 400) {
      return { error: "ResourceNotFound", message: "User directory unavailable", code: status }
    }
    return {
      status: "success",
      total: 3,
      data: [
        { id: "usr_101", name: "Elena Rostova", email: "elena@chameleon-ui.io", role: "admin", active: true },
        { id: "usr_102", name: "Marcus Vance", email: "marcus@chameleon-ui.io", role: "editor", active: true },
        { id: "usr_103", name: "Sarah Chen", email: "sarah@chameleon-ui.io", role: "analyst", active: false },
      ],
    }
  },
  auth: (status) => {
    if (status === 401) {
      return { error: "Unauthorized", message: "JWT token expired or signature invalid" }
    }
    return {
      tokenType: "Bearer",
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.s6f89a7df6a5s4d8f",
      expiresIn: 3600,
      user: { id: "usr_101", email: "elena@chameleon-ui.io" },
    }
  },
  order: (status) => {
    if (status >= 400) {
      return { error: "PaymentRequired", message: "Credit card declined by issuer" }
    }
    return {
      orderId: "ord_98271",
      customer: "Acme Design Studios",
      amountTotal: 29900,
      currency: "usd",
      items: [
        { sku: "sku_pro_license", name: "Chameleon UI Studio Pro Seat (Annual)", quantity: 1, unitPrice: 29900 },
      ],
      paid: true,
      createdAt: "2026-10-03T01:45:00Z",
    }
  },
  paginated: () => ({
    page: 1,
    perPage: 20,
    totalPages: 5,
    totalRecords: 92,
    records: [
      { id: "rec_1", title: "Treemap Visualizer", category: "components" },
      { id: "rec_2", title: "Sankey Flow Diagram", category: "components" },
      { id: "rec_3", title: "Network Graph", category: "components" },
    ],
  }),
  error: (status) => ({
    type: "https://api.chameleon-ui.dev/errors/rfc-7807",
    title: status === 429 ? "Rate Limit Exceeded" : "Request Processing Failure",
    status,
    detail: "Too many requests dispatched within 60 second quota window.",
    instance: "/api/v1/projects/9402",
    retryAfterSeconds: 30,
  }),
}

export const MockApiResponseGenerator = React.forwardRef<HTMLDivElement, MockApiResponseGeneratorProps>(
  (
    {
      defaultStatus = 200,
      defaultTemplate = "users",
      onGenerateResponse,
      className,
      ...props
    },
    ref
  ) => {
    const [status, setStatus] = React.useState<HttpStatus>(defaultStatus)
    const [template, setTemplate] = React.useState<ResponseSchemaTemplate>(defaultTemplate)
    const [latencyMs, setLatencyMs] = React.useState(120)
    const [contentType, setContentType] = React.useState("application/json; charset=utf-8")
    const [copied, setCopied] = React.useState(false)

    const responsePayload = React.useMemo(() => {
      const generator = TEMPLATE_GENERATORS[template] || TEMPLATE_GENERATORS.users
      return generator(status)
    }, [template, status])

    const jsonString = React.useMemo(() => {
      return JSON.stringify(responsePayload, null, 2)
    }, [responsePayload])

    const handleCopy = () => {
      navigator.clipboard.writeText(jsonString)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    const handleDownload = () => {
      const blob = new Blob([jsonString], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `mock-response-${status}-${template}.json`
      a.click()
      URL.revokeObjectURL(url)
    }

    const handleGenerate = () => {
      onGenerateResponse?.({
        status,
        body: responsePayload,
        headers: {
          "content-type": contentType,
          "x-simulated-latency": `${latencyMs}ms`,
        },
      })
    }

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Mock API Response Generator"
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
              <FileJson className="h-4 w-4" />
            </span>
            <div>
              <h4 className="font-semibold text-foreground">Mock API Response Generator</h4>
              <p className="text-[11px] text-muted-foreground">
                Configurable HTTP statuses, JSON schema templates, and simulated network latencies
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-background hover:bg-muted text-xs font-medium text-foreground transition-colors shadow-2xs"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copied" : "Copy JSON"}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition-colors shadow-2xs"
            >
              <Download className="h-3.5 w-3.5" /> Download .json
            </button>
          </div>
        </div>

        {/* Configuration Controls Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Status Code */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">HTTP Status Code</label>
            <select
              value={status}
              onChange={(e) => setStatus(Number(e.target.value) as HttpStatus)}
              className="w-full px-2.5 py-1.5 rounded-md border border-input bg-background font-mono text-xs text-foreground cursor-pointer"
            >
              <option value={200}>200 OK</option>
              <option value={201}>201 Created</option>
              <option value={204}>204 No Content</option>
              <option value={400}>400 Bad Request</option>
              <option value={401}>401 Unauthorized</option>
              <option value={404}>404 Not Found</option>
              <option value={429}>429 Rate Limited</option>
              <option value={500}>500 Internal Server Error</option>
            </select>
          </div>

          {/* Template */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Payload Template</label>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value as ResponseSchemaTemplate)}
              className="w-full px-2.5 py-1.5 rounded-md border border-input bg-background text-xs text-foreground cursor-pointer"
            >
              <option value="users">User Accounts Directory</option>
              <option value="auth">JWT Auth Token Payload</option>
              <option value="order">E-Commerce Invoice Order</option>
              <option value="paginated">Paginated Resource Index</option>
              <option value="error">RFC 7807 Error Details</option>
            </select>
          </div>

          {/* Artificial Latency */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-foreground">Simulated Latency</label>
              <span className="font-mono text-primary font-bold">{latencyMs} ms</span>
            </div>
            <input
              type="range"
              min={0}
              max={1500}
              step={50}
              value={latencyMs}
              onChange={(e) => setLatencyMs(Number(e.target.value))}
              className="w-full accent-primary h-1.5 cursor-pointer mt-1"
            />
          </div>
        </div>

        {/* JSON Preview Box */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
            <span>
              STATUS: <strong className={cn(status >= 400 ? "text-rose-500" : "text-emerald-500")}>{status}</strong> · {contentType}
            </span>
            <span>{jsonString.split("\n").length} lines</span>
          </div>

          <pre className="p-4 rounded-xl border border-border bg-muted/40 font-mono text-xs text-foreground overflow-x-auto leading-relaxed max-h-72">
            {jsonString}
          </pre>
        </div>
      </div>
    )
  }
)

MockApiResponseGenerator.displayName = "MockApiResponseGenerator"
