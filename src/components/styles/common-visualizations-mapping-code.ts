import type { Mode, StyleSlug } from "@/lib/styles/types"
import { getStyleFormKit } from "./common-form-kit"

export function getVisualizationsMappingCodeForStyle(
  slug: StyleSlug,
  componentId: string,
  mode: Mode
): string {
  const k = getStyleFormKit(slug, mode)

  switch (componentId) {
    case "treemap":
      return `<!-- ${k.styleName} · Treemap -->
<div class="p-4 ${k.radius} border border-border bg-card space-y-3 shadow-xs text-xs font-sans">
  <div class="flex items-center justify-between border-b border-border/60 pb-2">
    <span class="font-bold text-foreground">Storage Breakdown</span>
    <span class="font-mono text-[11px] text-muted-foreground">256 GB Total</span>
  </div>
  <div class="grid grid-cols-3 gap-1.5 h-36">
    <div class="col-span-2 bg-emerald-600/80 rounded-md p-2 text-white flex flex-col justify-between">
      <span class="font-semibold text-xs truncate">Applications (94 GB)</span>
      <span class="font-mono text-[10px] opacity-90">36.7%</span>
    </div>
    <div class="flex flex-col gap-1.5">
      <div class="flex-1 bg-blue-600/80 rounded-md p-2 text-white flex flex-col justify-between">
        <span class="font-semibold text-[11px] truncate">Media (68 GB)</span>
        <span class="font-mono text-[10px] opacity-90">26.5%</span>
      </div>
      <div class="flex-1 bg-violet-600/80 rounded-md p-2 text-white flex flex-col justify-between">
        <span class="font-semibold text-[11px] truncate">System (52 GB)</span>
        <span class="font-mono text-[10px] opacity-90">20.3%</span>
      </div>
    </div>
  </div>
</div>`

    case "sankey-diagram":
      return `<!-- ${k.styleName} · Sankey Diagram -->
<div class="p-4 ${k.radius} border border-border bg-card space-y-3 shadow-xs text-xs font-sans">
  <div class="flex items-center justify-between border-b border-border/60 pb-2">
    <span class="font-bold text-foreground">Conversion Flow</span>
    <span class="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">18,400 Units</span>
  </div>
  <div class="flex items-center justify-between gap-3 py-4 text-xs font-semibold">
    <span class="px-2 py-1 rounded bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">Organic Search</span>
    <span class="text-muted-foreground font-mono">──── 68% ────▶</span>
    <span class="px-2 py-1 rounded bg-blue-500/10 text-blue-600 border border-blue-500/20">Docs &amp; Portal</span>
    <span class="text-muted-foreground font-mono">──── 32% ────▶</span>
    <span class="px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">Active Signup</span>
  </div>
</div>`

    case "network-graph":
      return `<!-- ${k.styleName} · Network Graph -->
<div class="p-4 ${k.radius} border border-border bg-card space-y-3 shadow-xs text-xs font-sans">
  <div class="flex items-center justify-between border-b border-border/60 pb-2">
    <span class="font-bold text-foreground">Network Topology</span>
    <span class="font-mono text-[11px] text-muted-foreground">7 Nodes • 7 Edges</span>
  </div>
  <div class="relative h-32 rounded-lg border border-border/80 bg-background/50 flex items-center justify-around p-2">
    <div class="w-10 h-10 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold text-xs shadow-md">CDN</div>
    <div class="h-0.5 w-12 bg-primary/40"></div>
    <div class="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shadow-md">API</div>
    <div class="h-0.5 w-12 bg-primary/40"></div>
    <div class="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-md">DB</div>
  </div>
</div>`

    case "map-marker-cluster":
      return `<!-- ${k.styleName} · Map Marker / Cluster -->
<div class="p-4 ${k.radius} border border-border bg-card space-y-3 shadow-xs text-xs font-sans">
  <div class="flex items-center justify-between border-b border-border/60 pb-2">
    <span class="font-bold text-foreground">Proximity Node Clusters</span>
    <span class="font-mono text-[11px] text-primary font-bold">14 Edge Sites</span>
  </div>
  <div class="h-28 rounded-lg border border-border bg-slate-950 flex items-center justify-center gap-6">
    <div class="w-8 h-8 rounded-full bg-primary text-primary-foreground font-mono font-bold flex items-center justify-center text-xs shadow-lg animate-pulse">
      6
    </div>
    <div class="w-7 h-7 rounded-full bg-emerald-500 text-white font-mono font-bold flex items-center justify-center text-xs shadow-md">
      4
    </div>
    <div class="w-6 h-6 rounded-full bg-blue-500 text-white font-mono font-bold flex items-center justify-center text-[10px] shadow-sm">
      1
    </div>
  </div>
</div>`

    case "onboarding-tour":
      return `<!-- ${k.styleName} · Onboarding Tour -->
<div class="p-4 ${k.radius} border border-primary/40 bg-card space-y-3 shadow-md text-xs font-sans">
  <div class="flex items-center justify-between">
    <span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold text-[10px] uppercase">Tour Guide</span>
    <span class="font-mono text-[11px] text-muted-foreground">Step 2 of 4</span>
  </div>
  <h5 class="font-bold text-foreground text-sm">Theme &amp; Palette Controls</h5>
  <p class="text-xs text-muted-foreground">Switch between light and dark modes or explore color harmonies.</p>
  <div class="flex justify-between items-center pt-2 border-t border-border">
    <button class="px-2.5 py-1 rounded border border-border text-xs">Prev</button>
    <button class="px-3 py-1 rounded bg-primary text-primary-foreground font-semibold text-xs">Next Step</button>
  </div>
</div>`

    case "spotlight-search":
      return `<!-- ${k.styleName} · Spotlight Search -->
<div class="p-3 ${k.radius} border border-border bg-card shadow-lg text-xs font-sans space-y-2">
  <div class="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-input bg-background font-mono">
    <span class="text-muted-foreground font-bold">⌘</span>
    <span class="flex-1 text-foreground">Treemap Visualizer</span>
    <kbd class="text-[10px] px-1 rounded border border-border bg-muted">↵</kbd>
  </div>
  <div class="p-2 rounded bg-muted/30 text-[11px] text-muted-foreground flex justify-between">
    <span>Jump to component #155</span>
    <span class="font-mono text-primary font-bold">C 155</span>
  </div>
</div>`

    case "permission-matrix":
      return `<!-- ${k.styleName} · Permission Matrix -->
<div class="p-4 ${k.radius} border border-border bg-card space-y-3 shadow-xs text-xs font-sans">
  <div class="flex items-center justify-between border-b border-border/60 pb-2">
    <span class="font-bold text-foreground">RBAC Policies</span>
    <span class="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Client Simulation</span>
  </div>
  <div class="grid grid-cols-3 gap-2 text-center text-xs font-mono">
    <div class="p-2 rounded border border-border bg-background">
      <span class="text-[10px] text-muted-foreground block">Admin</span>
      <span class="text-emerald-500 font-bold">Full Access</span>
    </div>
    <div class="p-2 rounded border border-border bg-background">
      <span class="text-[10px] text-muted-foreground block">Editor</span>
      <span class="text-amber-500 font-bold">Scoped</span>
    </div>
    <div class="p-2 rounded border border-border bg-background">
      <span class="text-[10px] text-muted-foreground block">Guest</span>
      <span class="text-muted-foreground font-bold">Read Only</span>
    </div>
  </div>
</div>`

    case "audit-log":
      return `<!-- ${k.styleName} · Audit Log -->
<div class="p-4 ${k.radius} border border-border bg-card space-y-2.5 shadow-xs text-xs font-sans">
  <div class="flex items-center justify-between border-b border-border/60 pb-2">
    <span class="font-bold text-foreground">Security Audit Trail</span>
    <span class="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-mono font-bold text-[10px]">SUCCESS</span>
  </div>
  <div class="flex items-center justify-between text-[11px]">
    <div>
      <span class="font-bold text-foreground block">elena@chameleon-ui.io</span>
      <span class="font-mono text-muted-foreground text-[10px]">api_key.created • 192.241.142.88</span>
    </div>
    <span class="font-mono text-muted-foreground text-[10px]">2m ago</span>
  </div>
</div>`

    case "feature-flag-manager":
      return `<!-- ${k.styleName} · Feature Flag Manager -->
<div class="p-4 ${k.radius} border border-border bg-card space-y-3 shadow-xs text-xs font-sans">
  <div class="flex items-center justify-between">
    <div>
      <span class="font-bold text-foreground block">ai_smart_autocomplete</span>
      <span class="text-[11px] text-muted-foreground">Rollout: 75% • Production</span>
    </div>
    <span class="px-2.5 py-1 rounded-full bg-emerald-500 text-white font-bold text-[10px]">Active</span>
  </div>
</div>`

    case "version-history":
      return `<!-- ${k.styleName} · Version History -->
<div class="p-4 ${k.radius} border border-border bg-card space-y-3 shadow-xs text-xs font-sans">
  <div class="flex items-center justify-between border-b border-border/60 pb-2">
    <span class="font-mono font-bold text-foreground">Rev #a9f3b12</span>
    <span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-[10px]">Current</span>
  </div>
  <p class="text-xs text-muted-foreground">Batch 15 Architecture Finalization (10m ago)</p>
  <button class="w-full py-1.5 rounded ${k.radius} border border-border bg-background hover:bg-muted font-semibold text-xs">
    Compare Revision Diff
  </button>
</div>`

    default:
      return `<!-- ${k.styleName} · ${componentId} -->\n<div class="p-4 ${k.radius} border border-border bg-card text-foreground">${componentId}</div>`
  }
}
