import type { Mode, StyleSlug } from "@/lib/styles/types"
import { getStyleFormKit } from "./common-form-kit"

export function getStatusCodeForStyle(
  slug: StyleSlug,
  componentId: string,
  mode: Mode
): string {
  const k = getStyleFormKit(slug, mode)

  switch (componentId) {
    case "spinner":
      return `<!-- ${k.styleName} · Spinner / Loader -->
<!-- Accessible SVG loader with size & color adaptability -->

<div class="flex items-center gap-3" role="status" aria-label="Loading workspace">
  <svg class="h-6 w-6 animate-spin text-primary motion-reduce:animate-none" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle>
    <path class="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
  <span class="text-xs font-medium ${k.strong}">Synchronizing records...</span>
</div>`

    case "loading-button":
      return `<!-- ${k.styleName} · Loading Button -->
<!-- Prevents duplicate clicks, maintains height, and presents active state -->

<button
  type="button"
  disabled
  aria-busy="true"
  class="relative inline-flex items-center justify-center gap-2 px-4 py-2 ${k.radius} ${k.btnPrimary} text-xs font-semibold cursor-wait transition-all"
>
  <svg class="h-3.5 w-3.5 animate-spin motion-reduce:animate-none" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle>
    <path class="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
  <span>Deploying Cluster...</span>
</button>`

    case "status-indicator":
      return `<!-- ${k.styleName} · Status Indicator -->
<!-- Semantic state badge combining visual dot, pulse ping, and text label -->

<div class="inline-flex items-center gap-2" role="status">
  <span class="relative flex h-2.5 w-2.5">
    <span class="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping motion-reduce:animate-none"></span>
    <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
  </span>
  <span class="text-xs font-medium ${k.strong}">API Gateway Online</span>
  <span class="sr-only">Status: Online</span>
</div>`

    case "step-progress":
      return `<!-- ${k.styleName} · Step Progress -->
<!-- Multi-step tracker with connected fill nodes and current step indication -->

<div class="w-full max-w-lg" role="region" aria-label="Progress navigation">
  <ol class="relative flex items-center justify-between gap-2">
    <!-- Step 1: Completed -->
    <li class="flex-1 flex flex-col items-center relative text-center">
      <div class="h-8 w-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold ${k.radius}">
        ✓
      </div>
      <span class="text-xs font-semibold ${k.strong} mt-1.5">Profile</span>
    </li>
    <!-- Step 2: Current -->
    <li class="flex-1 flex flex-col items-center relative text-center" aria-current="step">
      <div class="h-8 w-8 rounded-full border-2 border-primary bg-background text-primary flex items-center justify-center text-xs font-bold ${k.radius} ring-4 ring-primary/10">
        2
      </div>
      <span class="text-xs font-bold ${k.strong} mt-1.5">Billing</span>
    </li>
    <!-- Step 3: Upcoming -->
    <li class="flex-1 flex flex-col items-center relative text-center opacity-60">
      <div class="h-8 w-8 rounded-full border border-border bg-card ${k.muted} flex items-center justify-center text-xs ${k.radius}">
        3
      </div>
      <span class="text-xs ${k.muted} mt-1.5">Confirm</span>
    </li>
  </ol>
</div>`

    case "circular-progress":
      return `<!-- ${k.styleName} · Circular Progress -->
<!-- SVG radial progress ring with accurate stroke-dashoffset calculations -->

<div
  role="progressbar"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-valuenow="68"
  aria-label="Export Progress"
  class="relative inline-flex items-center justify-center h-16 w-16"
>
  <svg class="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="28" stroke-width="4" stroke="currentColor" fill="transparent" class="text-muted/30" />
    <circle
      cx="32"
      cy="32"
      r="28"
      stroke-width="4"
      stroke-dasharray="175.9"
      stroke-dashoffset="56.2"
      stroke-linecap="round"
      stroke="currentColor"
      fill="transparent"
      class="text-primary transition-all duration-300"
    />
  </svg>
  <span class="absolute font-mono text-xs font-bold ${k.strong}">68%</span>
</div>`

    case "shimmer":
      return `<!-- ${k.styleName} · Shimmer -->
<!-- Content-preserving placeholder with smooth gradient highlight sweep -->

<div class="space-y-3 w-full max-w-md" aria-hidden="true">
  <!-- Card image shimmer -->
  <div class="h-32 w-full ${k.radius} relative overflow-hidden bg-muted/60 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent"></div>
  <!-- Text line shimmer -->
  <div class="h-4 w-3/4 ${k.radius} relative overflow-hidden bg-muted/60 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent"></div>
</div>`

    case "connection-status":
      return `<!-- ${k.styleName} · Connection Status -->
<!-- Realtime transport indicator with latency measurement and retry button -->

<div class="inline-flex items-center gap-2 px-3 py-1.5 ${k.radius} border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-medium" role="status">
  <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
  <span class="font-semibold">Connected</span>
  <span class="font-mono text-[10px] opacity-80">(18ms)</span>
</div>`

    case "skeleton-text":
      return `<!-- ${k.styleName} · Skeleton Text -->
<!-- Multiple paragraph placeholder lines with realistic line-end tapering -->

<div class="space-y-2.5 w-full max-w-md" aria-hidden="true">
  <div class="h-4 w-full rounded bg-muted/60 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent"></div>
  <div class="h-4 w-[92%] rounded bg-muted/60 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent"></div>
  <div class="h-4 w-[65%] rounded bg-muted/60 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent"></div>
</div>`

    case "loading-bar":
      return `<!-- ${k.styleName} · Loading Bar -->
<!-- Linear progress bar with percentage readout and accessible ARIA attributes -->

<div class="w-full max-w-md space-y-1.5">
  <div class="flex items-center justify-between text-xs">
    <span class="font-semibold ${k.strong}">Uploading Asset Bundle</span>
    <span class="font-mono text-[11px] ${k.muted}">74%</span>
  </div>
  <div role="progressbar" aria-valuenow="74" aria-valuemin="0" aria-valuemax="100" class="h-2 w-full overflow-hidden rounded-full bg-muted/50">
    <div class="h-full rounded-full bg-primary transition-all duration-300" style="width: 74%"></div>
  </div>
</div>`

    case "processing-indicator":
      return `<!-- ${k.styleName} · Processing Indicator -->
<!-- Dedicated card highlighting active server-side tasks with progress status -->

<div class="${k.panel} ${k.radius} border p-4 w-full max-w-md space-y-3" role="status" aria-live="polite">
  <div class="flex items-center gap-3">
    <div class="p-2 rounded-lg bg-primary/10 text-primary">
      <svg class="h-4 w-4 animate-spin motion-reduce:animate-none" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle>
        <path class="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
    <div>
      <h5 class="text-xs font-bold ${k.strong}">Generating Production Build</h5>
      <p class="text-[11px] ${k.muted}">Tree-shaking modules and compiling CSS...</p>
    </div>
  </div>
</div>`

    default:
      return `<!-- ${k.styleName} · Loading / Status Component -->`
  }
}
