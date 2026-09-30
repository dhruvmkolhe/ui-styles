import type { Mode, StyleSlug } from "@/lib/styles/types"
import { getStyleFormKit } from "./common-form-kit"

export function getAdvancedCodeForStyle(slug: StyleSlug, componentId: string, mode: Mode): string {
  const k = getStyleFormKit(slug, mode)

  switch (componentId) {
    case "command-palette":
      return `<!-- ${k.styleName} · Command Palette -->
<div class="w-full max-w-xl ${k.radius} ${k.panel} border border-border shadow-xl flex flex-col overflow-hidden">
  <div class="flex items-center border-b border-border px-3 py-2.5 gap-2">
    <Search class="h-4 w-4 text-muted-foreground" />
    <input type="text" placeholder="Type a command or search..." class="flex-1 bg-transparent text-sm focus:outline-none" />
    <kbd class="h-5 items-center rounded border bg-muted px-1.5 font-mono text-[10px]">ESC</kbd>
  </div>
  <div class="p-2 space-y-1">
    <div class="px-2 py-1 text-[11px] font-semibold uppercase text-muted-foreground">Quick Actions</div>
    <div class="flex items-center gap-2.5 ${k.radius} px-2.5 py-2 text-sm bg-accent text-accent-foreground font-medium cursor-pointer">
      <span>Open Project</span>
      <kbd class="ml-auto text-[10px] font-mono border rounded px-1">⌘O</kbd>
    </div>
  </div>
</div>`

    case "search-bar":
      return `<!-- ${k.styleName} · Search Bar -->
<div class="relative w-full">
  <div class="flex items-center ${k.radius} border border-input bg-background px-3 h-10 ${k.focusRing}">
    <Search class="h-4 w-4 text-muted-foreground mr-2 shrink-0" />
    <input type="search" placeholder="Search documentation, components..." class="w-full bg-transparent text-sm focus:outline-none" />
    <button type="button" class="p-1 text-muted-foreground hover:text-foreground">
      <X class="h-4 w-4" />
    </button>
  </div>
</div>`

    case "filter":
      return `<!-- ${k.styleName} · Filter -->
<div class="${k.radius} ${k.panel} border border-border p-4 shadow-sm space-y-3">
  <div class="flex items-center justify-between border-b pb-2">
    <h4 class="text-sm font-semibold flex items-center gap-1.5">
      <Filter class="h-4 w-4 text-primary" /> Active Filters
    </h4>
    <button class="text-xs text-muted-foreground hover:text-foreground">Reset</button>
  </div>
  <div class="flex flex-wrap gap-2">
    <span class="inline-flex items-center gap-1 px-2.5 py-1 ${k.radius} text-xs bg-primary text-primary-foreground font-medium">
      Frontend <X class="h-3 w-3 cursor-pointer" />
    </span>
  </div>
</div>`

    case "sort-menu":
      return `<!-- ${k.styleName} · Sort Menu -->
<div class="relative inline-block">
  <button type="button" class="inline-flex items-center justify-between ${k.radius} border border-input bg-background px-3 h-9 text-sm font-medium ${k.focusRing}">
    <span class="flex items-center gap-1.5"><ArrowUpDown class="h-4 w-4 text-primary" /> Newest First</span>
    <ChevronDown class="h-4 w-4 opacity-50 ml-2" />
  </button>
</div>`

    case "range-slider":
      return `<!-- ${k.styleName} · Range Slider -->
<div class="w-full py-2 space-y-2">
  <div class="flex justify-between text-xs font-mono text-muted-foreground">
    <span>$10</span>
    <span class="font-bold text-foreground">$24 – $78</span>
    <span>$100</span>
  </div>
  <div class="relative h-2 w-full rounded-full bg-muted">
    <div class="absolute h-full rounded-full bg-primary" style="left: 24%; width: 54%;"></div>
    <div class="absolute -translate-x-1/2 h-5 w-5 rounded-full border-2 border-primary bg-background shadow-md" style="left: 24%;"></div>
    <div class="absolute -translate-x-1/2 h-5 w-5 rounded-full border-2 border-primary bg-background shadow-md" style="left: 78%;"></div>
  </div>
</div>`

    case "slider":
      return `<!-- ${k.styleName} · Slider -->
<div class="w-full py-2 space-y-2">
  <div class="flex justify-between text-xs font-mono text-muted-foreground">
    <span>0%</span>
    <span class="font-bold text-foreground">65%</span>
    <span>100%</span>
  </div>
  <div class="relative h-2 w-full rounded-full bg-muted">
    <div class="absolute h-full rounded-full bg-primary" style="width: 65%;"></div>
    <div class="absolute -translate-x-1/2 h-5 w-5 rounded-full border-2 border-primary bg-background shadow-md" style="left: 65%;"></div>
  </div>
</div>`

    case "color-picker":
      return `<!-- ${k.styleName} · Color Picker -->
<div class="flex items-center gap-2">
  <button class="flex items-center gap-2 p-1.5 ${k.radius} border border-border bg-background shadow-sm">
    <div class="h-6 w-6 ${k.radius} border" style="background-color: #3b82f6;"></div>
    <span class="font-mono text-xs uppercase font-medium">#3B82F6</span>
  </button>
</div>`

    case "combobox":
      return `<!-- ${k.styleName} · Combobox -->
<div class="relative w-full max-w-sm">
  <button class="flex h-9 w-full items-center justify-between ${k.radius} border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm">
    <span>Next.js (App Router)</span>
    <ChevronsUpDown class="h-4 w-4 opacity-50 ml-2" />
  </button>
</div>`

    case "multi-select":
      return `<!-- ${k.styleName} · Multi-Select -->
<div class="flex min-h-9 w-full flex-wrap items-center gap-1.5 ${k.radius} border border-input bg-background p-1.5 text-sm shadow-sm">
  <span class="inline-flex items-center gap-1 rounded bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
    React <X class="h-3 w-3 cursor-pointer" />
  </span>
  <span class="inline-flex items-center gap-1 rounded bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
    TypeScript <X class="h-3 w-3 cursor-pointer" />
  </span>
  <ChevronsUpDown class="h-4 w-4 opacity-50 ml-auto" />
</div>`

    case "otp-input":
      return `<!-- ${k.styleName} · OTP / PIN Input -->
<div class="flex items-center gap-2">
  <input class="h-11 w-10 text-center text-lg font-mono font-bold ${k.radius} border border-input bg-background" value="4" />
  <input class="h-11 w-10 text-center text-lg font-mono font-bold ${k.radius} border border-input bg-background" value="9" />
  <input class="h-11 w-10 text-center text-lg font-mono font-bold ${k.radius} border border-input bg-background" value="2" />
  <input class="h-11 w-10 text-center text-lg font-mono font-bold ${k.radius} border border-input bg-background" value="0" />
</div>`

    default:
      return `<!-- ${k.styleName} · Advanced Component -->`
  }
}
