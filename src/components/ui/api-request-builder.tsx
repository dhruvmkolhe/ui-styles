"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Send,
  Plus,
  Trash2,
  Copy,
  Check,
  Code2,
  Shield,
  Info,
  ChevronDown,
  Globe,
  SlidersHorizontal,
  Key,
} from "lucide-react"

export type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export interface KeyValueParam {
  id: string
  key: string
  value: string
  enabled: boolean
  description?: string
}

export interface APIRequestConfig {
  method: HTTPMethod
  url: string
  headers: KeyValueParam[]
  params: KeyValueParam[]
  bodyType: "json" | "raw" | "none"
  bodyContent: string
  authType: "none" | "bearer" | "apikey"
  authToken?: string
}

export interface APIRequestBuilderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  initialMethod?: HTTPMethod
  initialUrl?: string
  initialHeaders?: KeyValueParam[]
  initialParams?: KeyValueParam[]
  initialBody?: string
  onSendRequest?: (config: APIRequestConfig) => void
  disabled?: boolean
}

const METHOD_COLORS: Record<HTTPMethod, string> = {
  GET: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  POST: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/30",
  PUT: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/30",
  PATCH: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/30",
  DELETE: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/30",
}

const DEFAULT_HEADERS: KeyValueParam[] = [
  { id: "h-1", key: "Content-Type", value: "application/json", enabled: true },
  { id: "h-2", key: "Accept", value: "application/json", enabled: true },
]

const DEFAULT_PARAMS: KeyValueParam[] = [
  { id: "p-1", key: "limit", value: "20", enabled: true },
  { id: "p-2", key: "status", value: "active", enabled: true },
]

const DEFAULT_BODY = `{
  "name": "Design Systems Core",
  "environment": "production",
  "features": ["batch-14-api-tools"]
}`

export const APIRequestBuilder = React.forwardRef<HTMLDivElement, APIRequestBuilderProps>(
  (
    {
      className,
      initialMethod = "GET",
      initialUrl = "https://api.chameleon-ui.dev/v1/components",
      initialHeaders = DEFAULT_HEADERS,
      initialParams = DEFAULT_PARAMS,
      initialBody = DEFAULT_BODY,
      onSendRequest,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [method, setMethod] = React.useState<HTTPMethod>(initialMethod)
    const [url, setUrl] = React.useState(initialUrl)
    const [activeTab, setActiveTab] = React.useState<"params" | "headers" | "body" | "auth">("params")
    const [params, setParams] = React.useState<KeyValueParam[]>(initialParams)
    const [headers, setHeaders] = React.useState<KeyValueParam[]>(initialHeaders)
    const [bodyContent, setBodyContent] = React.useState(initialBody)
    const [authType, setAuthType] = React.useState<"none" | "bearer" | "apikey">("bearer")
    const [authToken, setAuthToken] = React.useState("chameleonui_sec_live_9942a")
    const [copiedCurl, setCopiedCurl] = React.useState(false)
    const [isSending, setIsSending] = React.useState(false)

    // Add row helper
    const addRow = (type: "params" | "headers") => {
      const newRow: KeyValueParam = {
        id: `row-${Date.now()}`,
        key: "",
        value: "",
        enabled: true,
      }
      if (type === "params") setParams((p) => [...p, newRow])
      else setHeaders((h) => [...h, newRow])
    }

    // Remove row helper
    const removeRow = (type: "params" | "headers", id: string) => {
      if (type === "params") setParams((p) => p.filter((r) => r.id !== id))
      else setHeaders((h) => h.filter((r) => r.id !== id))
    }

    // Update row helper
    const updateRow = (
      type: "params" | "headers",
      id: string,
      field: keyof KeyValueParam,
      val: any
    ) => {
      const updater = (rows: KeyValueParam[]) =>
        rows.map((r) => (r.id === id ? { ...r, [field]: val } : r))
      if (type === "params") setParams(updater)
      else setHeaders(updater)
    }

    // Generate cURL command
    const generateCurl = () => {
      let cmd = `curl -X ${method} "${url}`
      const activeQuery = params.filter((p) => p.enabled && p.key).map((p) => `${p.key}=${encodeURIComponent(p.value)}`).join("&")
      if (activeQuery) cmd += `?${activeQuery}`
      cmd += `"`

      headers.filter((h) => h.enabled && h.key).forEach((h) => {
        cmd += ` \\\n  -H "${h.key}: ${h.value}"`
      })

      if (authType === "bearer" && authToken) {
        cmd += ` \\\n  -H "Authorization: Bearer ${authToken}"`
      }

      if (["POST", "PUT", "PATCH"].includes(method) && bodyContent.trim()) {
        cmd += ` \\\n  -d '${bodyContent.replace(/'/g, "\\'")}'`
      }

      return cmd
    }

    const handleCopyCurl = () => {
      navigator.clipboard.writeText(generateCurl())
      setCopiedCurl(true)
      setTimeout(() => setCopiedCurl(false), 2000)
    }

    const handleSend = () => {
      if (disabled || isSending) return
      setIsSending(true)

      const config: APIRequestConfig = {
        method,
        url,
        headers,
        params,
        bodyType: method === "GET" ? "none" : "json",
        bodyContent,
        authType,
        authToken,
      }

      setTimeout(() => {
        setIsSending(false)
        onSendRequest?.(config)
      }, 500)
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-3xl rounded-xl border border-border bg-card shadow-sm overflow-hidden text-card-foreground text-xs font-mono",
          disabled && "opacity-60 pointer-events-none",
          className
        )}
        {...props}
      >
        {/* Top Control Bar: Method + URL + Send */}
        <div className="p-3.5 border-b border-border bg-muted/30 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground font-sans">
              <Globe className="h-4 w-4 text-primary" />
              <span>API Request Builder</span>
            </div>

            {/* Safe simulation badge */}
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[11px] font-sans font-medium">
              <Shield className="h-3 w-3 shrink-0" />
              <span>Simulated Client Sandbox</span>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
            {/* Method Select */}
            <div className="relative shrink-0">
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as HTTPMethod)}
                className={cn(
                  "h-9 px-3 pr-8 rounded-lg font-bold text-xs uppercase border cursor-pointer appearance-none bg-background focus:outline-hidden focus:ring-1 focus:ring-ring transition-colors",
                  METHOD_COLORS[method]
                )}
              >
                {(["GET", "POST", "PUT", "PATCH", "DELETE"] as const).map((m) => (
                  <option key={m} value={m} className="font-bold bg-background text-foreground">
                    {m}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            </div>

            {/* URL Input */}
            <div className="flex-1 min-w-[200px] relative">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://api.domain.com/v1/resource"
                className="w-full h-9 px-3 rounded-lg border border-input bg-background text-foreground text-xs placeholder:text-muted-foreground/60 focus:outline-hidden focus:ring-1 focus:ring-ring"
              />
            </div>

            {/* Send Button */}
            <button
              type="button"
              onClick={handleSend}
              disabled={isSending}
              className="h-9 px-4 rounded-lg bg-primary text-primary-foreground font-sans font-semibold text-xs flex items-center gap-1.5 shadow-xs hover:bg-primary/90 transition-colors shrink-0 disabled:opacity-50"
            >
              <Send className={cn("h-3.5 w-3.5", isSending && "animate-spin")} />
              <span>{isSending ? "Sending..." : "Send"}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-border bg-background/50 px-3 pt-1">
          <div className="flex items-center gap-1 font-sans">
            {[
              { id: "params", label: `Params (${params.filter((p) => p.enabled).length})` },
              { id: "headers", label: `Headers (${headers.filter((h) => h.enabled).length})` },
              { id: "body", label: "Body" },
              { id: "auth", label: "Auth" },
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

          <button
            type="button"
            onClick={handleCopyCurl}
            className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-sans text-muted-foreground hover:text-foreground transition-colors"
            title="Copy cURL command"
          >
            {copiedCurl ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
            <span>{copiedCurl ? "Copied cURL" : "Copy cURL"}</span>
          </button>
        </div>

        {/* Tab Content Panel */}
        <div className="p-3.5 min-h-[180px] max-h-[300px] overflow-y-auto bg-card">
          {/* 1. Params Tab */}
          {activeTab === "params" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground font-sans pb-1">
                <span>Query Parameters</span>
                <button
                  type="button"
                  onClick={() => addRow("params")}
                  className="inline-flex items-center gap-1 text-primary hover:underline font-semibold"
                >
                  <Plus className="h-3 w-3" /> Add Param
                </button>
              </div>

              <div className="space-y-1.5">
                {params.map((p) => (
                  <div key={p.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={p.enabled}
                      onChange={(e) => updateRow("params", p.id, "enabled", e.target.checked)}
                      className="rounded border-input text-primary focus:ring-ring"
                    />
                    <input
                      type="text"
                      value={p.key}
                      onChange={(e) => updateRow("params", p.id, "key", e.target.value)}
                      placeholder="Key"
                      className="w-1/3 px-2 py-1 rounded border border-input bg-background text-xs"
                    />
                    <input
                      type="text"
                      value={p.value}
                      onChange={(e) => updateRow("params", p.id, "value", e.target.value)}
                      placeholder="Value"
                      className="flex-1 px-2 py-1 rounded border border-input bg-background text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => removeRow("params", p.id)}
                      className="p-1 text-muted-foreground hover:text-rose-500 transition-colors"
                      title="Delete row"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Headers Tab */}
          {activeTab === "headers" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground font-sans pb-1">
                <span>HTTP Headers</span>
                <button
                  type="button"
                  onClick={() => addRow("headers")}
                  className="inline-flex items-center gap-1 text-primary hover:underline font-semibold"
                >
                  <Plus className="h-3 w-3" /> Add Header
                </button>
              </div>

              <div className="space-y-1.5">
                {headers.map((h) => (
                  <div key={h.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={h.enabled}
                      onChange={(e) => updateRow("headers", h.id, "enabled", e.target.checked)}
                      className="rounded border-input text-primary focus:ring-ring"
                    />
                    <input
                      type="text"
                      value={h.key}
                      onChange={(e) => updateRow("headers", h.id, "key", e.target.value)}
                      placeholder="Header Name"
                      className="w-1/3 px-2 py-1 rounded border border-input bg-background text-xs"
                    />
                    <input
                      type="text"
                      value={h.value}
                      onChange={(e) => updateRow("headers", h.id, "value", e.target.value)}
                      placeholder="Value"
                      className="flex-1 px-2 py-1 rounded border border-input bg-background text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => removeRow("headers", h.id)}
                      className="p-1 text-muted-foreground hover:text-rose-500 transition-colors"
                      title="Delete header"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Body Tab */}
          {activeTab === "body" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground font-sans">
                <span>JSON Payload (Used for POST / PUT / PATCH)</span>
                <span className="text-[10px] text-emerald-600 font-mono">application/json</span>
              </div>
              <textarea
                value={bodyContent}
                onChange={(e) => setBodyContent(e.target.value)}
                rows={7}
                className="w-full p-2.5 rounded-lg border border-input bg-background text-foreground text-xs font-mono focus:outline-hidden focus:ring-1 focus:ring-ring whitespace-pre"
                spellCheck={false}
              />
            </div>
          )}

          {/* 4. Auth Tab */}
          {activeTab === "auth" && (
            <div className="space-y-3 font-sans">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-foreground">Authentication Scheme</span>
                <div className="flex items-center gap-2">
                  {(["none", "bearer", "apikey"] as const).map((scheme) => (
                    <button
                      key={scheme}
                      type="button"
                      onClick={() => setAuthType(scheme)}
                      className={cn(
                        "px-2.5 py-1 rounded-md text-xs font-medium border transition-colors capitalize",
                        authType === scheme
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border bg-background text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {scheme === "none" ? "No Auth" : scheme === "bearer" ? "Bearer Token" : "API Key"}
                    </button>
                  ))}
                </div>
              </div>

              {authType !== "none" && (
                <div className="space-y-1 pt-1 font-mono">
                  <span className="text-[11px] text-muted-foreground font-sans">
                    {authType === "bearer" ? "Bearer Token (Masked)" : "API Secret Key"}
                  </span>
                  <div className="relative">
                    <input
                      type="password"
                      value={authToken}
                      onChange={(e) => setAuthToken(e.target.value)}
                      placeholder="Enter secret token..."
                      className="w-full px-3 py-1.5 rounded-lg border border-input bg-background text-xs focus:outline-hidden focus:ring-1 focus:ring-ring"
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground font-sans">
                    Tokens are kept client-side and never logged to third parties.
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
)

APIRequestBuilder.displayName = "APIRequestBuilder"
