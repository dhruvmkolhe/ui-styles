import type { Mode, StyleSlug } from "@/lib/styles/types"
import { getStyleFormKit } from "./common-form-kit"

export function getDesignSystemA11yCodeForStyle(
  slug: StyleSlug,
  componentId: string,
  mode: Mode
): string {
  const k = getStyleFormKit(slug, mode)

  switch (componentId) {
    case "design-token-editor":
      return `<!-- ${k.styleName} · Design Token Editor -->
<div class="p-4 ${k.radius} border border-border bg-card space-y-3 shadow-xs text-xs font-sans">
  <div class="flex items-center justify-between border-b border-border/60 pb-2">
    <span class="font-bold text-foreground">Token Palette</span>
    <span class="font-mono text-[10px] text-muted-foreground">:root Scope</span>
  </div>
  <div class="grid grid-cols-3 gap-2 text-center text-xs font-mono">
    <div class="p-2 rounded bg-primary/10 border border-primary text-primary font-bold">Primary</div>
    <div class="p-2 rounded bg-muted border border-border text-foreground font-semibold">Surface</div>
    <div class="p-2 rounded bg-background border border-border text-muted-foreground">Border</div>
  </div>
</div>`

    case "responsive-preview-switcher":
      return `<!-- ${k.styleName} · Responsive Preview Switcher -->
<div class="p-4 ${k.radius} border border-border bg-card space-y-3 shadow-xs text-xs font-sans">
  <div class="flex items-center justify-between">
    <span class="font-bold text-foreground">Viewport Frame</span>
    <span class="px-2 py-0.5 rounded font-mono text-[10px] bg-primary/10 text-primary font-bold">390 × 844 px</span>
  </div>
  <div class="p-3 rounded-lg border border-border bg-muted/20 text-center font-mono text-muted-foreground text-xs">
    Mobile (iPhone 15) • Portrait Mode (100% Zoom)
  </div>
</div>`

    case "accessibility-audit-panel":
      return `<!-- ${k.styleName} · Accessibility Audit Panel -->
<div class="p-4 ${k.radius} border border-border bg-card space-y-3 shadow-xs text-xs font-sans">
  <div class="flex items-center justify-between border-b border-border/60 pb-2">
    <span class="font-bold text-foreground">WCAG 2.1 Audit</span>
    <span class="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-bold font-mono text-[10px]">PASS (AA)</span>
  </div>
  <div class="text-[11px] text-muted-foreground space-y-1">
    <p>• 4.5:1 Minimum Color Contrast Ratio verified</p>
    <p>• Explicit form labels &amp; aria-hidden attributes checked</p>
  </div>
</div>`

    case "contrast-pair-tester":
      return `<!-- ${k.styleName} · Contrast Pair Tester -->
<div class="p-4 ${k.radius} border border-border bg-card space-y-3 shadow-xs text-xs font-sans">
  <div class="flex items-center justify-between">
    <span class="font-bold text-foreground">Relative Luminance</span>
    <span class="text-xl font-black font-mono text-primary">5.82 : 1</span>
  </div>
  <div class="p-2.5 rounded bg-emerald-500/10 text-emerald-600 font-semibold text-xs text-center">
    ✓ WCAG AA &amp; AAA Large Text Compliant
  </div>
</div>`

    case "visual-regression-comparator":
      return `<!-- ${k.styleName} · Visual Regression Comparator -->
<div class="p-4 ${k.radius} border border-border bg-card space-y-3 shadow-xs text-xs font-sans">
  <div class="flex items-center justify-between border-b border-border/60 pb-2">
    <span class="font-bold text-foreground">Screenshot Diff</span>
    <span class="font-mono text-[11px] text-emerald-600 font-bold">98.4% Match</span>
  </div>
  <div class="h-16 rounded border border-dashed border-border bg-muted/30 flex items-center justify-center font-mono text-xs text-muted-foreground">
    Draggable Reveal Slider (50% Split)
  </div>
</div>`

    case "live-component-playground":
      return `<!-- ${k.styleName} · Live Component Playground -->
<div class="p-4 ${k.radius} border border-border bg-card space-y-3 shadow-xs text-xs font-sans">
  <div class="flex items-center justify-between">
    <span class="font-bold text-foreground">Props Sandbox</span>
    <span class="font-mono text-[10px] text-muted-foreground">Safe Zero-Eval</span>
  </div>
  <button class="px-4 py-2 ${k.radius} bg-primary text-primary-foreground font-semibold shadow-xs">
    Interactive Prop Button
  </button>
</div>`

    case "component-dependency-graph":
      return `<!-- ${k.styleName} · Component Dependency Graph -->
<div class="p-4 ${k.radius} border border-border bg-card space-y-3 shadow-xs text-xs font-sans">
  <div class="flex items-center justify-between border-b border-border/60 pb-2">
    <span class="font-bold text-foreground">Component Hierarchy</span>
    <span class="font-mono text-[10px] text-primary font-bold">4 Tiers</span>
  </div>
  <div class="flex items-center justify-between text-[11px] font-mono">
    <span>Tokens</span>
    <span>──▶</span>
    <span>Primitives</span>
    <span>──▶</span>
    <span>Features</span>
  </div>
</div>`

    case "state-machine-visualizer":
      return `<!-- ${k.styleName} · State Machine Visualizer -->
<div class="p-4 ${k.radius} border border-border bg-card space-y-3 shadow-xs text-xs font-sans">
  <div class="flex items-center justify-between border-b border-border/60 pb-2">
    <span class="font-bold text-foreground">Finite State Model</span>
    <span class="px-2 py-0.5 rounded font-mono font-bold bg-blue-500/10 text-blue-600 text-[10px]">LOADING</span>
  </div>
  <div class="flex items-center gap-2 pt-1 font-mono text-xs">
    <button class="px-2.5 py-1 rounded bg-primary text-primary-foreground font-bold">RESOLVE</button>
    <button class="px-2.5 py-1 rounded border border-border text-foreground font-bold">REJECT</button>
  </div>
</div>`

    case "mock-api-response-generator":
      return `<!-- ${k.styleName} · Mock API Response Generator -->
<div class="p-4 ${k.radius} border border-border bg-card space-y-2.5 shadow-xs text-xs font-mono">
  <div class="flex items-center justify-between font-sans">
    <span class="font-bold text-foreground">Mock HTTP API</span>
    <span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-bold text-[10px]">200 OK</span>
  </div>
  <pre class="p-2.5 rounded bg-muted/40 text-[11px] text-foreground leading-relaxed">{\n  "status": "success",\n  "total": 3\n}</pre>
</div>`

    case "form-validation-playground":
      return `<!-- ${k.styleName} · Form Validation Playground -->
<div class="p-4 ${k.radius} border border-border bg-card space-y-3 shadow-xs text-xs font-sans">
  <div class="flex items-center justify-between border-b border-border/60 pb-2">
    <span class="font-bold text-foreground">Rule Constraints</span>
    <span class="font-mono text-emerald-600 text-[11px] font-bold">6/6 Valid</span>
  </div>
  <div class="p-2.5 rounded bg-muted/30 text-[11px] text-muted-foreground">
    ✓ RFC Email • ✓ 8+ Pwd • ✓ Special Char • ✓ 18+ Age
  </div>
</div>`

    default:
      return `<!-- ${k.styleName} · ${componentId} -->\n<div class="p-4 ${k.radius} border border-border bg-card text-foreground">${componentId}</div>`
  }
}
