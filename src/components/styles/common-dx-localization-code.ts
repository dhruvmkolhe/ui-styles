import type { Mode, StyleSlug } from "@/lib/styles/types"
import { getStyleFormKit } from "./common-form-kit"

export function getDxLocalizationCodeForStyle(
  slug: StyleSlug,
  componentId: string,
  mode: Mode
): string {
  const k = getStyleFormKit(slug, mode)

  switch (componentId) {
    case "keyboard-shortcut-editor":
      return `<!-- ${k.styleName} · Keyboard Shortcut Editor -->
<div class="p-4 ${k.radius} border border-border bg-card space-y-3 shadow-xs text-xs font-sans">
  <div class="flex items-center justify-between border-b border-border/60 pb-2">
    <span class="font-bold text-foreground">Active Shortcut Bindings</span>
    <span class="font-mono text-[10px] text-emerald-600 font-bold">0 Conflicts</span>
  </div>
  <div class="space-y-1.5 font-mono text-[11px]">
    <div class="flex items-center justify-between p-1.5 rounded bg-muted/40">
      <span class="text-foreground">Command Palette</span>
      <kbd class="px-2 py-0.5 rounded bg-background border border-border font-bold">⌘K</kbd>
    </div>
    <div class="flex items-center justify-between p-1.5 rounded bg-muted/40">
      <span class="text-foreground">Quick Save</span>
      <kbd class="px-2 py-0.5 rounded bg-background border border-border font-bold">⌘S</kbd>
    </div>
  </div>
</div>`

    case "theme-token-diff":
      return `<!-- ${k.styleName} · Theme Token Diff -->
<div class="p-4 ${k.radius} border border-border bg-card space-y-3 shadow-xs text-xs font-sans">
  <div class="flex items-center justify-between border-b border-border/60 pb-2">
    <span class="font-bold text-foreground">Theme Comparison</span>
    <span class="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 font-mono text-[10px] font-bold">4 Delta</span>
  </div>
  <div class="grid grid-cols-2 gap-2 text-xs font-mono">
    <div class="p-2 rounded bg-muted/30 border border-border">
      <span class="text-[10px] text-muted-foreground block">Theme A</span>
      <span class="text-foreground font-semibold">#0d9488</span>
    </div>
    <div class="p-2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-700">
      <span class="text-[10px] block font-bold">Theme B (Mod)</span>
      <span class="font-semibold">#06b6d4</span>
    </div>
  </div>
</div>`

    case "rtl-layout-preview":
      return `<!-- ${k.styleName} · RTL Layout Preview -->
<div dir="rtl" class="p-4 ${k.radius} border border-border bg-card space-y-3 shadow-xs text-xs font-sans text-right">
  <div class="flex items-center justify-between border-b border-border/60 pb-2">
    <span class="font-bold text-foreground">لوحة التحكم التفاعلية</span>
    <span class="px-2 py-0.5 rounded bg-primary/10 text-primary font-mono text-[10px] font-bold">RTL</span>
  </div>
  <div class="flex items-center gap-2">
    <input type="text" placeholder="بحث سريع..." class="flex-1 px-3 py-1.5 rounded border border-input bg-background text-xs text-right" />
    <button class="px-3 py-1.5 rounded bg-primary text-primary-foreground font-semibold text-xs">إرسال</button>
  </div>
</div>`

    case "localization-preview":
      return `<!-- ${k.styleName} · Localization Preview -->
<div class="p-4 ${k.radius} border border-border bg-card space-y-3 shadow-xs text-xs font-sans">
  <div class="flex items-center justify-between border-b border-border/60 pb-2">
    <span class="font-bold text-foreground">de-DE • Lokalisierung</span>
    <span class="font-mono text-[10px] text-primary font-bold">2.490,50 €</span>
  </div>
  <p class="text-[11px] text-muted-foreground">
    Abonnement &amp; Rechnungsstellung für Unternehmenskonten.
  </p>
  <button class="w-full py-1.5 rounded bg-primary text-primary-foreground font-semibold text-xs text-center">
    Abonnement jetzt aktualisieren
  </button>
</div>`

    case "animation-timeline-editor":
      return `<!-- ${k.styleName} · Animation Timeline Editor -->
<div class="p-4 ${k.radius} border border-border bg-card space-y-3 shadow-xs text-xs font-sans">
  <div class="flex items-center justify-between">
    <span class="font-bold text-foreground">Timeline Scrub</span>
    <span class="font-mono text-[10px] text-primary">600ms • Spring</span>
  </div>
  <div class="w-full h-2 rounded-full bg-muted overflow-hidden">
    <div class="w-1/2 h-full bg-primary rounded-full"></div>
  </div>
  <div class="flex items-center justify-between text-[10px] text-muted-foreground font-mono">
    <span>0% (0ms)</span>
    <span>50% (300ms)</span>
    <span>100% (600ms)</span>
  </div>
</div>`

    case "component-usage-analytics":
      return `<!-- ${k.styleName} · Component Usage Analytics -->
<div class="p-4 ${k.radius} border border-border bg-card space-y-3 shadow-xs text-xs font-sans">
  <div class="flex items-center justify-between border-b border-border/60 pb-2">
    <span class="font-bold text-foreground">Button Primitive Telemetry</span>
    <span class="font-mono text-[10px] text-emerald-600 font-bold">1,248 Usages</span>
  </div>
  <div class="space-y-1 text-[11px] font-mono">
    <div class="flex justify-between text-muted-foreground">
      <span>Primary: 48%</span>
      <span>Secondary: 26%</span>
      <span>Outline: 16%</span>
    </div>
  </div>
</div>`

    default:
      return `<!-- ${k.styleName} · ${componentId} -->
<div class="p-4 ${k.radius} border border-border bg-card text-foreground text-xs">
  ${componentId}
</div>`
  }
}
