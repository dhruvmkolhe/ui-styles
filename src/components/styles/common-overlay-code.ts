import type { Mode, StyleSlug } from "@/lib/styles/types";
import { getStyleFormKit } from "./common-form-kit";

export function getOverlayCodeForStyle(
  slug: StyleSlug,
  componentId: string,
  mode: Mode
): string {
  const k = getStyleFormKit(slug, mode);

  switch (componentId) {
    case "popover":
      return `<!-- ${k.styleName} · Popover -->
<!-- Floating popover panel anchored to trigger with boundary detection -->

<div class="relative inline-block">
  <button type="button" aria-haspopup="dialog" aria-expanded="true" class="${k.btnSecondary} ${k.radius} px-3 py-1.5 text-xs font-semibold">
    Dimensions Settings
  </button>

  <div role="dialog" class="${k.panel} ${k.radius} absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 p-4 border shadow-xl z-50 space-y-3">
    <div class="space-y-1">
      <h4 class="font-bold text-xs ${k.strong}">Canvas Dimensions</h4>
      <p class="text-[11px] ${k.muted}">Set default grid boundaries and export aspect ratios.</p>
    </div>
    <div class="grid grid-cols-2 gap-2 text-xs">
      <div>
        <label class="text-[10px] font-mono ${k.muted}">WIDTH (PX)</label>
        <input type="text" value="1440" class="${k.input} ${k.radius} w-full px-2 py-1 text-xs border" />
      </div>
      <div>
        <label class="text-[10px] font-mono ${k.muted}">HEIGHT (PX)</label>
        <input type="text" value="900" class="${k.input} ${k.radius} w-full px-2 py-1 text-xs border" />
      </div>
    </div>
    <button class="${k.btnPrimarySm} ${k.radius} w-full text-xs">Save Settings</button>
  </div>
</div>`;

    case "context-menu":
      return `<!-- ${k.styleName} · Context Menu -->
<!-- Pointer-positioned right-click context menu with keyboard shortcuts -->

<div role="menu" aria-orientation="vertical" class="${k.panel} ${k.radius} w-52 p-1 border shadow-2xl z-50 text-xs space-y-0.5">
  <button role="menuitem" class="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-current/10 text-left">
    <span>Duplicate Layer</span>
    <kbd class="text-[10px] font-mono opacity-60">⌘D</kbd>
  </button>
  <button role="menuitem" class="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-current/10 text-left">
    <span>Copy Styles</span>
    <kbd class="text-[10px] font-mono opacity-60">⌥⌘C</kbd>
  </button>
  <div role="separator" class="h-px bg-current/10 my-1"></div>
  <button role="menuitem" class="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-current/10 text-left text-rose-500">
    <span>Delete</span>
    <kbd class="text-[10px] font-mono opacity-60">⌫</kbd>
  </button>
</div>`;

    case "hover-card":
      return `<!-- ${k.styleName} · Hover Card -->
<!-- Supplementary preview card with delayed hover interaction -->

<div role="region" aria-label="Author preview" class="${k.panel} ${k.radius} w-80 p-4 border shadow-xl text-xs space-y-3">
  <div class="flex items-start gap-3">
    <div class="h-10 w-10 rounded-full bg-current/10 flex items-center justify-center font-bold text-sm shrink-0">
      AL
    </div>
    <div class="space-y-1 min-w-0 flex-1">
      <h5 class="font-bold ${k.strong} truncate">Ada Lovelace</h5>
      <p class="text-[11px] ${k.muted}">Pioneer of algorithmic thinking & computational design.</p>
    </div>
  </div>
  <div class="flex items-center gap-4 text-[11px] ${k.muted} pt-2 border-t border-current/10">
    <div><strong class="${k.strong}">128</strong> Components</div>
    <div><strong class="${k.strong}">4.9k</strong> Stars</div>
  </div>
</div>`;

    case "drawer":
      return `<!-- ${k.styleName} · Drawer / Sheet -->
<!-- Slide-over panel anchored to viewport edge with focus trap -->

<div class="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
  <aside role="dialog" aria-modal="true" class="${k.panel} w-full max-w-sm h-full border-l p-6 shadow-2xl flex flex-col justify-between">
    <div class="space-y-4">
      <div class="border-b border-current/10 pb-3 flex items-center justify-between">
        <div>
          <h3 class="font-bold text-sm ${k.strong}">Workspace Settings</h3>
          <p class="text-xs ${k.muted} mt-0.5">Manage token export preferences and build hooks.</p>
        </div>
        <button class="p-1 rounded opacity-70 hover:opacity-100">✕</button>
      </div>
      <div class="space-y-3 text-xs">
        <label class="block space-y-1">
          <span class="font-semibold ${k.strong}">Project Namespace</span>
          <input type="text" value="@ui-hub/design" class="${k.input} ${k.radius} w-full px-3 py-1.5 border text-xs" />
        </label>
      </div>
    </div>
    <div class="border-t border-current/10 pt-4 flex gap-2 justify-end">
      <button class="${k.btnSecondary} ${k.radius} px-3 py-1.5 text-xs">Cancel</button>
      <button class="${k.btnPrimarySm} ${k.radius} text-xs">Save Changes</button>
    </div>
  </aside>
</div>`;

    case "command-palette":
      return `<!-- ${k.styleName} · Command Palette -->
<!-- Quick launcher dialog with multi-category search and roving focus -->

<div role="dialog" aria-modal="true" class="${k.panel} ${k.radius} w-full max-w-lg border shadow-2xl overflow-hidden text-xs">
  <div class="flex items-center gap-2 px-3.5 py-3 border-b border-current/10">
    <input type="text" placeholder="Type a command or search..." class="flex-1 bg-transparent text-xs ${k.strong} outline-none" />
    <kbd class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-current/10 ${k.muted}">ESC</kbd>
  </div>
  <div class="p-2 space-y-1">
    <div class="px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${k.muted}">Navigation</div>
    <div class="${k.btnPrimarySm} ${k.radius} flex items-center justify-between px-2.5 py-2 font-medium">
      <span>Go to Components</span>
      <kbd class="text-[10px] font-mono opacity-70">G C</kbd>
    </div>
  </div>
</div>`;

    case "date-picker":
      return `<!-- ${k.styleName} · Date Picker -->
<!-- Date input with popover calendar trigger and formatting -->

<div class="relative inline-block w-64">
  <button type="button" class="${k.input} ${k.radius} w-full px-3 py-2 border flex items-center justify-between text-xs">
    <span class="flex items-center gap-2">
      <span>📅</span>
      <span>Oct 24, 2026</span>
    </span>
  </button>
</div>`;

    case "time-picker":
      return `<!-- ${k.styleName} · Time Picker -->
<!-- Time input with hour, minute, and AM/PM steppers -->

<div class="relative inline-block w-48">
  <button type="button" class="${k.input} ${k.radius} w-full px-3 py-2 border flex items-center justify-between text-xs">
    <span class="flex items-center gap-2">
      <span>🕒</span>
      <span class="font-mono">09:30 AM</span>
    </span>
  </button>
</div>`;

    case "calendar":
      return `<!-- ${k.styleName} · Calendar -->
<!-- Monthly grid calendar with weekday headers and day cell states -->

<div role="region" aria-label="Calendar" class="${k.panel} ${k.radius} p-3 border shadow-md w-64 text-xs select-none">
  <div class="flex items-center justify-between pb-2 border-b border-current/10">
    <button class="p-1 hover:bg-current/10 rounded">◀</button>
    <span class="font-bold ${k.strong}">October 2026</span>
    <button class="p-1 hover:bg-current/10 rounded">▶</button>
  </div>
  <div class="grid grid-cols-7 gap-1 pt-2 text-center text-[10px] font-semibold ${k.muted}">
    <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
  </div>
  <div class="grid grid-cols-7 gap-1 pt-1 text-center">
    <button class="h-7 w-7 rounded flex items-center justify-center hover:bg-current/10">1</button>
    <button class="${k.btnPrimarySm} rounded h-7 w-7 flex items-center justify-center font-bold">24</button>
  </div>
</div>`;

    case "mega-menu":
      return `<!-- ${k.styleName} · Mega Menu -->
<!-- Multi-column navigation dropdown with categorized sections and promo card -->

<div role="region" class="${k.panel} ${k.radius} w-full max-w-3xl p-6 border shadow-2xl grid grid-cols-3 gap-6 text-xs">
  <div class="space-y-2">
    <h5 class="font-bold uppercase tracking-wider text-[10px] ${k.muted}">Components</h5>
    <a href="#" class="block font-semibold hover:${k.strong}">Buttons &amp; Inputs</a>
    <a href="#" class="block font-semibold hover:${k.strong}">Dialogs &amp; Overlays</a>
    <a href="#" class="block font-semibold hover:${k.strong}">Navigation Menus</a>
  </div>
  <div class="space-y-2">
    <h5 class="font-bold uppercase tracking-wider text-[10px] ${k.muted}">Design Systems</h5>
    <a href="#" class="block font-semibold hover:${k.strong}">Japandi Minimal</a>
    <a href="#" class="block font-semibold hover:${k.strong}">Glassmorphism</a>
    <a href="#" class="block font-semibold hover:${k.strong}">Brutalist High Contrast</a>
  </div>
  <div class="rounded-xl border border-current/10 bg-current/5 p-4 flex flex-col justify-between">
    <div>
      <span class="text-[9px] font-bold uppercase rounded px-1.5 py-0.5 bg-teal-500/20 text-teal-600">NEW</span>
      <h6 class="font-bold mt-2">UI Hub CLI v3.0</h6>
      <p class="text-[11px] ${k.muted} mt-1">Export entire style bundles with zero dependencies.</p>
    </div>
    <a href="#" class="text-teal-600 font-bold mt-3">Read Release Notes →</a>
  </div>
</div>`;

    case "floating-action-button":
      return `<!-- ${k.styleName} · Floating Action Button -->
<!-- Fixed corner action trigger with extended label and shadow -->

<button type="button" aria-label="Create new workspace" class="${k.btnPrimary} ${k.radius} fixed bottom-6 right-6 p-3.5 shadow-2xl flex items-center gap-2 text-xs font-bold z-40">
  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
  </svg>
  <span>New Component</span>
</button>`;

    default:
      return `<!-- Component snippet for ${componentId} -->`;
  }
}
