import type { Mode, StyleSlug } from "@/lib/styles/types";
import { getStyleFormKit } from "./common-form-kit";

export function getLayoutCodeForStyle(
  slug: StyleSlug,
  componentId: string,
  mode: Mode
): string {
  const k = getStyleFormKit(slug, mode);

  switch (componentId) {
    case "collapsible":
      return `<!-- ${k.styleName} · Collapsible -->
<!-- Expandable disclosure card with smooth transition -->

<div class="${k.panel} ${k.radius} border p-4 w-full max-w-md space-y-3">
  <button type="button" aria-expanded="true" class="w-full flex items-center justify-between font-semibold text-xs text-left ${k.strong}">
    <span>System Telemetry & Analytics</span>
    <span class="text-xs">▾</span>
  </button>
  <div class="pt-2 border-t text-xs ${k.muted} space-y-1.5">
    <p>Real-time edge cache hit ratio: 98.4% across 48 regions.</p>
    <p class="font-mono text-[11px]">Avg Latency: 32ms · Active Workers: 128</p>
  </div>
</div>`;

    case "divider":
      return `<!-- ${k.styleName} · Divider / Separator -->
<!-- Horizontal labeled divider and vertical content separator -->

<div class="space-y-4 w-full max-w-md">
  <!-- Horizontal with centered label -->
  <div class="relative flex items-center w-full my-4">
    <div class="flex-grow border-t border-border"></div>
    <span class="shrink-0 px-3 text-[11px] font-mono uppercase tracking-wider ${k.muted}">
      Secure Auth
    </span>
    <div class="flex-grow border-t border-border"></div>
  </div>

  <!-- Vertical inline divider -->
  <div class="flex items-center gap-3 text-xs">
    <span class="${k.strong}">Dashboard</span>
    <div class="h-4 w-px bg-border"></div>
    <span class="${k.muted}">Analytics</span>
    <div class="h-4 w-px bg-border"></div>
    <span class="${k.muted}">Settings</span>
  </div>
</div>`;

    case "container":
      return `<!-- ${k.styleName} · Responsive Container -->
<!-- Centered fluid wrapper with padding presets and constraints -->

<div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div class="${k.panel} ${k.radius} border p-6">
    <h3 class="text-sm font-bold ${k.strong}">Restricted Container Viewport</h3>
    <p class="text-xs ${k.muted} mt-1">
      Padded at mobile (16px), tablet (24px), and desktop (32px) margins.
    </p>
  </div>
</div>`;

    case "grid":
      return `<!-- ${k.styleName} · CSS Grid -->
<!-- Responsive grid with auto-fit items and gap tokens -->

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
  <div class="${k.panel} ${k.radius} border p-4 text-xs font-semibold ${k.strong}">Grid Cell 1</div>
  <div class="${k.panel} ${k.radius} border p-4 text-xs font-semibold ${k.strong}">Grid Cell 2</div>
  <div class="${k.panel} ${k.radius} border p-4 text-xs font-semibold ${k.strong}">Grid Cell 3</div>
</div>`;

    case "stack":
      return `<!-- ${k.styleName} · Flex Stack -->
<!-- Linear arrangement with responsive direction, alignment, and dividers -->

<div class="flex flex-col sm:flex-row items-center gap-3 w-full">
  <div class="${k.panel} ${k.radius} border p-3 text-xs flex-1">Primary Spec</div>
  <div class="${k.panel} ${k.radius} border p-3 text-xs flex-1">Secondary Option</div>
  <button class="${k.btnPrimarySm} ${k.radius} text-xs">Apply Stack</button>
</div>`;

    case "split-pane":
      return `<!-- ${k.styleName} · Split Pane -->
<!-- Two-panel layout with draggable separator and keyboard resizing -->

<div class="${k.panel} ${k.radius} border flex h-72 w-full overflow-hidden select-none">
  <div class="w-1/2 p-4 overflow-auto border-r border-border text-xs ${k.strong}">
    <h5>Source Markdown</h5>
  </div>
  <div role="separator" aria-orientation="horizontal" tabindex="0" class="w-2 bg-border hover:bg-primary/40 cursor-col-resize"></div>
  <div class="w-1/2 p-4 overflow-auto text-xs ${k.muted}">
    <h5>Live HTML Preview</h5>
  </div>
</div>`;

    case "aspect-ratio":
      return `<!-- ${k.styleName} · Aspect Ratio -->
<!-- Fixed 16:9 proportional container with clipped media -->

<div class="w-full max-w-md ${k.radius} overflow-hidden border" style="aspect-ratio: 16 / 9;">
  <div class="w-full h-full ${k.panel} flex items-center justify-center text-xs font-mono font-bold ${k.strong}">
    16 : 9 Widescreen Ratio
  </div>
</div>`;

    case "scroll-area":
      return `<!-- ${k.styleName} · Scroll Area -->
<!-- Accessible scrollable region with custom thin scrollbars -->

<div tabindex="0" role="region" aria-label="Logs" class="${k.panel} ${k.radius} border p-4 h-48 overflow-y-auto scrollbar-thin text-xs space-y-2">
  <div class="font-mono text-[11px] ${k.muted}">[14:20:01] Worker pool initialized.</div>
  <div class="font-mono text-[11px] ${k.muted}">[14:20:02] Connected to PostgreSQL replica.</div>
  <div class="font-mono text-[11px] ${k.muted}">[14:20:03] Turbopack compiled 65 modules.</div>
</div>`;

    case "resizable-panel":
      return `<!-- ${k.styleName} · Resizable Panel -->
<!-- Multi-panel group with drag handles and min/max constraints -->

<div class="${k.panel} ${k.radius} border flex h-64 w-full overflow-hidden">
  <div class="w-1/3 p-4 border-r border-border text-xs font-semibold ${k.strong}">Navigation Tree</div>
  <div role="separator" tabindex="0" class="w-2 bg-border hover:bg-primary/40 cursor-col-resize"></div>
  <div class="w-2/3 p-4 text-xs ${k.muted}">Document Content</div>
</div>`;

    case "masonry":
      return `<!-- ${k.styleName} · Masonry -->
<!-- Responsive Pinterest-style multi-column waterfall layout -->

<div class="columns-1 sm:columns-2 lg:columns-3 gap-4 w-full">
  <div class="break-inside-avoid mb-4 ${k.panel} ${k.radius} border p-4 h-32">Card A</div>
  <div class="break-inside-avoid mb-4 ${k.panel} ${k.radius} border p-4 h-48">Card B (Tall)</div>
  <div class="break-inside-avoid mb-4 ${k.panel} ${k.radius} border p-4 h-24">Card C (Compact)</div>
</div>`;

    default:
      return `<!-- ${k.styleName} · ${componentId} -->\n<div class="${k.panel} ${k.radius} border p-4 text-xs">Preview code for ${componentId}</div>`;
  }
}
