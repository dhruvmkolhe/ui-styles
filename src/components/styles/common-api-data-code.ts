import type { Mode, StyleSlug } from "@/lib/styles/types"
import { getStyleFormKit } from "./common-form-kit"

export function getApiDataCodeForStyle(slug: StyleSlug, componentId: string, mode: Mode): string {
  const k = getStyleFormKit(slug, mode)

  switch (componentId) {
    case "api-request-builder":
      return `<!-- ${k.styleName} · API Request Builder -->
<div class="flex flex-col ${k.radius} border border-border bg-card overflow-hidden shadow-xs text-xs font-mono">
  <div class="flex items-center gap-2 p-3 border-b border-border bg-muted/20">
    <span class="px-2 py-0.5 rounded font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/30">GET</span>
    <span class="flex-1 px-2.5 py-1 rounded bg-background border border-border text-foreground">https://api.chameleon-ui.dev/v1/metrics</span>
    <button class="px-3 py-1 rounded ${k.radius} bg-primary text-primary-foreground font-semibold font-sans">Send</button>
  </div>
  <div class="p-3 text-muted-foreground font-sans">Query params: limit=20, status=active</div>
</div>`

    case "api-response-viewer":
      return `<!-- ${k.styleName} · API Response Viewer -->
<div class="flex flex-col ${k.radius} border border-border bg-card overflow-hidden shadow-xs text-xs font-mono">
  <div class="flex items-center justify-between p-2.5 bg-muted/30 border-b border-border font-sans">
    <span class="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 font-bold">200 OK</span>
    <span class="text-[11px] text-muted-foreground font-mono">142ms • 1.84 KB</span>
  </div>
  <pre class="p-3 text-foreground overflow-x-auto leading-relaxed">{\n  "status": "success",\n  "total": 144\n}</pre>
</div>`

    case "regex-tester":
      return `<!-- ${k.styleName} · Regex Tester -->
<div class="p-4 ${k.radius} border border-border bg-card space-y-3 shadow-xs text-xs font-mono">
  <div class="flex items-center gap-2 p-2 rounded ${k.radius} border border-border bg-background">
    <span class="text-muted-foreground font-bold">/</span>
    <span class="flex-1 text-foreground font-semibold">(\\w+)@(\\w+\\.[a-z]{2,})</span>
    <span class="text-muted-foreground font-bold">/</span>
    <span class="text-primary font-bold">g</span>
  </div>
  <div class="p-2 rounded bg-muted/30 text-[11px] font-sans text-muted-foreground">
    2 matches detected • Executed in 0.12ms
  </div>
</div>`

    case "cron-expression-builder":
      return `<!-- ${k.styleName} · Cron Expression Builder -->
<div class="p-4 ${k.radius} border border-border bg-card space-y-3 shadow-xs text-xs font-sans">
  <div class="flex items-center justify-between">
    <span class="font-bold text-foreground">Cron Schedule</span>
    <span class="px-2 py-0.5 rounded font-mono font-bold bg-primary/10 text-primary">0 9 * * 1</span>
  </div>
  <p class="text-xs text-muted-foreground">Runs every Monday at 9:00 AM</p>
</div>`

    case "query-builder":
      return `<!-- ${k.styleName} · Query Builder -->
<div class="p-4 ${k.radius} border border-border bg-card space-y-3 shadow-xs text-xs font-sans">
  <div class="flex items-center gap-2">
    <span class="px-2 py-0.5 rounded bg-primary text-primary-foreground font-bold font-mono">AND</span>
    <span class="text-xs text-muted-foreground">Match all conditions</span>
  </div>
  <div class="flex items-center gap-2 p-2 rounded border border-border bg-background font-mono text-xs">
    <span class="text-primary font-semibold">status</span>
    <span class="font-bold">=</span>
    <span class="text-foreground">'active'</span>
  </div>
</div>`

    case "formula-editor":
      return `<!-- ${k.styleName} · Formula Editor -->
<div class="p-3 ${k.radius} border border-border bg-card space-y-2 shadow-xs text-xs font-mono">
  <div class="flex items-center gap-2 p-2 rounded bg-background border border-border">
    <span class="text-primary font-bold italic">fx</span>
    <span class="flex-1 text-foreground font-semibold">=SUM(A1, B2, 45)</span>
    <span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-bold font-sans">= 245</span>
  </div>
</div>`

    case "spreadsheet-grid":
      return `<!-- ${k.styleName} · Spreadsheet Grid -->
<div class="${k.radius} border border-border bg-card overflow-hidden shadow-xs text-xs font-mono">
  <table class="w-full border-collapse">
    <tr class="bg-muted/30 border-b border-border">
      <th class="p-1 border-r border-border text-center text-muted-foreground">#</th>
      <th class="p-1 border-r border-border text-center">A</th>
      <th class="p-1 border-r border-border text-center">B</th>
      <th class="p-1 border-r border-border text-center">C</th>
    </tr>
    <tr class="border-b border-border">
      <td class="p-1 border-r border-border text-center text-muted-foreground">1</td>
      <td class="p-1.5 border-r border-border text-right">150</td>
      <td class="p-1.5 border-r border-border text-right">250</td>
      <td class="p-1.5 border-r border-border text-right font-bold text-primary">400</td>
    </tr>
  </table>
</div>`

    case "chart-legend":
      return `<!-- ${k.styleName} · Chart Legend -->
<div class="p-3 ${k.radius} border border-border bg-card flex flex-wrap items-center gap-3 text-xs shadow-2xs">
  <div class="flex items-center gap-1.5">
    <span class="h-2.5 w-2.5 rounded-full bg-blue-500"></span>
    <span class="font-medium text-foreground">Direct Revenue</span>
  </div>
  <div class="flex items-center gap-1.5">
    <span class="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
    <span class="font-medium text-foreground">Subscriptions</span>
  </div>
</div>`

    case "chart-crosshair-tooltip":
      return `<!-- ${k.styleName} · Chart Crosshair & Tooltip -->
<div class="p-4 ${k.radius} border border-border bg-card space-y-2 shadow-xs text-xs">
  <div class="flex items-center justify-between text-muted-foreground font-mono">
    <span>Friday</span>
    <span class="font-bold text-primary">$42,500</span>
  </div>
  <div class="h-16 w-full rounded bg-muted/20 border border-dashed border-border flex items-center justify-center font-mono text-[11px] text-muted-foreground">
    Crosshair Hairline Active
  </div>
</div>`

    case "heatmap":
      return `<!-- ${k.styleName} · Heatmap Matrix -->
<div class="p-4 ${k.radius} border border-border bg-card space-y-3 shadow-xs text-xs font-mono">
  <span class="font-sans font-bold text-foreground">Intensity Matrix</span>
  <div class="grid grid-cols-4 gap-1.5">
    <div class="h-6 rounded-xs bg-emerald-500/20 border border-emerald-500/30"></div>
    <div class="h-6 rounded-xs bg-emerald-500/40 border border-emerald-500/50"></div>
    <div class="h-6 rounded-xs bg-emerald-500/70 border border-emerald-500/80"></div>
    <div class="h-6 rounded-xs bg-emerald-600 border border-emerald-600"></div>
  </div>
</div>`

    default:
      return `<!-- ${k.styleName} · ${componentId} -->\n<div class="${k.radius} border border-border bg-card p-4">Component: ${componentId}</div>`
  }
}
