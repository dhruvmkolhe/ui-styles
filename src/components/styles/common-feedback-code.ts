import type { Mode, StyleSlug } from "@/lib/styles/types";
import { getStyleFormKit } from "./common-form-kit";

export function getFeedbackCodeForStyle(
  slug: StyleSlug,
  componentId: string,
  mode: Mode
): string {
  const k = getStyleFormKit(slug, mode);

  switch (componentId) {
    case "alert":
      return `<!-- ${k.styleName} · Alert / Banner -->
<!-- Contextual alert message with informational, success, warning, and destructive variants -->

<!-- 1. Informational Alert -->
<div role="status" class="${k.panelSoft} ${k.radius} flex items-start gap-3 p-3.5 border text-xs">
  <svg class="h-4 w-4 shrink-0 text-sky-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <div class="space-y-0.5">
    <h5 class="font-bold ${k.strong}">Design Tokens Synchronized</h5>
    <p class="${k.muted}">Connected with remote Figma variables. 14 color tokens and 8 typography ramps updated.</p>
  </div>
</div>

<!-- 2. Destructive Alert (with dismiss) -->
<div role="alert" aria-live="assertive" class="${k.radius} flex items-start gap-3 p-3.5 border border-rose-500/40 bg-rose-500/10 text-xs">
  <svg class="h-4 w-4 shrink-0 text-rose-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
  </svg>
  <div class="flex-1 space-y-0.5">
    <h5 class="font-bold text-rose-600 dark:text-rose-400">SSL Certificate Expiration Warning</h5>
    <p class="text-rose-700 dark:text-rose-300">The TLS certificate for your custom apex domain will expire in 48 hours.</p>
  </div>
  <button type="button" aria-label="Dismiss alert" class="p-1 rounded opacity-70 hover:opacity-100 text-rose-500">
    <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</div>`;

    case "confirmation-dialog":
      return `<!-- ${k.styleName} · Confirmation Dialog -->
<!-- Accessible modal dialog with backdrop, focus trap, and loading confirmation -->

<div role="dialog" aria-modal="true" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
  <div class="${k.panel} ${k.radius} w-full max-w-md p-6 border shadow-2xl space-y-4">
    <div class="border-b border-current/10 pb-3">
      <h4 class="text-sm font-bold ${k.strong}">Confirm Deployment to Production?</h4>
      <p class="mt-1 text-xs ${k.muted}">
        This action will propagate 25 new design styles and tokens to the live public CDN.
      </p>
    </div>

    <div class="flex items-center justify-end gap-2.5 pt-2">
      <button type="button" class="${k.btnSecondary}">
        Cancel
      </button>
      <button type="button" class="${k.btnPrimary}">
        Yes, Publish
      </button>
    </div>
  </div>
</div>`;

    case "alert-dialog":
      return `<!-- ${k.styleName} · Alert Dialog -->
<!-- Critical modal alert with role="alertdialog" and safe cancel-first focus -->

<div role="alertdialog" aria-modal="true" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
  <div class="${k.panel} ${k.radius} w-full max-w-md p-6 border shadow-2xl space-y-4">
    <div class="flex items-start gap-3 border-b border-current/10 pb-3">
      <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400">
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </span>
      <div>
        <h4 class="text-sm font-bold text-rose-600 dark:text-rose-400">Are you absolutely certain?</h4>
        <p class="mt-1 text-xs ${k.muted}">
          This action cannot be reversed. This will permanently delete your workspace repository and purge backups.
        </p>
      </div>
    </div>

    <div class="flex items-center justify-end gap-2.5 pt-2">
      <!-- Cancel receives initial focus for safety -->
      <button type="button" autofocus class="${k.btnSecondary}">
        Cancel
      </button>
      <button type="button" class="px-4 py-2 text-xs font-bold uppercase rounded bg-rose-600 text-white hover:bg-rose-700">
        Delete Workspace
      </button>
    </div>
  </div>
</div>`;

    case "loading-overlay":
      return `<!-- ${k.styleName} · Loading Overlay -->
<!-- Accessible blocking overlay with status role and aria-busy -->

<div class="${k.panel} ${k.radius} relative p-6 border min-h-[160px] overflow-hidden">
  <h4 class="text-sm font-bold ${k.strong}">Database Cluster Metrics</h4>
  <p class="text-xs ${k.muted}">Active read replicas: 4 · Query latency: 12ms</p>

  <!-- Overlay -->
  <div
    role="status"
    aria-live="polite"
    aria-busy="true"
    class="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-black/60 backdrop-blur-xs select-none"
  >
    <svg class="h-7 w-7 animate-spin text-white mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
    <h5 class="text-xs font-bold text-white tracking-wide">Syncing Cluster Shards...</h5>
    <p class="text-[11px] text-white/70 mt-0.5">Rebalancing partitions across availability zones.</p>
  </div>
</div>`;

    case "empty-state":
      return `<!-- ${k.styleName} · Empty State -->
<!-- Reusable zero-data view with icon badge, title, description, and actions -->

<div class="${k.panel} ${k.radius} p-8 border text-center flex flex-col items-center justify-center">
  <div class="mb-3.5 flex h-12 w-12 items-center justify-center rounded-full bg-current/10 ring-8 ring-current/5">
    <svg class="h-6 w-6 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  </div>

  <h4 class="text-sm font-bold ${k.strong}">No components found</h4>
  <p class="mt-1.5 max-w-xs text-xs ${k.muted}">
    We couldn't find any tokens matching your search term. Try checking spelling or resetting filters.
  </p>

  <div class="mt-5 flex items-center gap-2">
    <button type="button" class="${k.btnPrimarySm}">Clear Search Filter</button>
    <button type="button" class="${k.btnSecondary}">Documentation</button>
  </div>
</div>`;

    case "error-state":
      return `<!-- ${k.styleName} · Error State -->
<!-- Failure state with retry CTA, error visual, and collapsible technical diagnostics -->

<div role="alert" aria-live="assertive" class="${k.panel} ${k.radius} p-8 border text-center flex flex-col items-center justify-center">
  <div class="mb-3.5 flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/15 text-rose-500 ring-8 ring-rose-500/10">
    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  </div>

  <h4 class="text-sm font-bold text-rose-600 dark:text-rose-400">Failed to Load Style Manifest</h4>
  <p class="mt-1.5 max-w-xs text-xs ${k.muted}">
    Remote token endpoint returned an upstream timeout (504 Gateway Timeout).
  </p>

  <div class="mt-5 flex items-center gap-2.5">
    <button type="button" class="${k.btnPrimarySm}">Retry Sync</button>
    <button type="button" class="${k.btnSecondary}">View Status Page</button>
  </div>
</div>`;

    case "success-state":
      return `<!-- ${k.styleName} · Success State -->
<!-- Positive completion feedback with receipt details summary and primary CTA -->

<div role="status" aria-live="polite" class="${k.panel} ${k.radius} p-8 border text-center flex flex-col items-center justify-center">
  <div class="mb-3.5 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500 ring-8 ring-emerald-500/10">
    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </div>

  <h4 class="text-sm font-bold text-emerald-600 dark:text-emerald-400">Component Export Ready</h4>
  <p class="mt-1.5 max-w-xs text-xs ${k.muted}">
    Your customized 25-style design package has been compiled, minified, and verified.
  </p>

  <div class="${k.panelSoft} mt-5 w-full max-w-xs rounded border p-3 text-xs text-left divide-y divide-current/10">
    <div class="flex justify-between items-center py-1.5 first:pt-0">
      <span class="${k.faint}">Export Hash</span>
      <span class="font-mono font-bold">#ui-0x92f8a1</span>
    </div>
    <div class="flex justify-between items-center py-1.5 last:pb-0">
      <span class="${k.faint}">Components</span>
      <span class="font-mono font-bold">35 items</span>
    </div>
  </div>

  <div class="mt-6 flex items-center gap-2">
    <button type="button" class="${k.btnPrimarySm}">Download Archive (.zip)</button>
    <button type="button" class="${k.btnSecondary}">Open Vault</button>
  </div>
</div>`;

    case "callout":
      return `<!-- ${k.styleName} · Callout -->
<!-- Contextual aside with editorial left-accent border and typography -->

<aside class="${k.radius} rounded-r border-l-4 border-l-sky-500 bg-sky-500/10 p-3.5 text-xs">
  <div class="flex items-start gap-3">
    <svg class="h-4 w-4 shrink-0 text-sky-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
    <div class="space-y-0.5">
      <h5 class="font-bold text-[11px] uppercase tracking-wider text-sky-600 dark:text-sky-400">
        Pro-Tip · Zero CSS Overhead
      </h5>
      <p class="${k.text} leading-relaxed">
        Every style in Chameleon UI is generated exclusively with utility classes. No external stylesheets required.
      </p>
    </div>
  </div>
</aside>`;

    case "notification-center":
      return `<!-- ${k.styleName} · Notification Center -->
<!-- Notification drawer with unread tracking, category filters, and dismissal -->

<div class="${k.panel} ${k.radius} w-full max-w-sm border shadow-xl overflow-hidden text-xs">
  <div class="flex items-center justify-between p-3 border-b border-current/10 bg-current/[0.03]">
    <div class="flex items-center gap-2">
      <h5 class="font-bold uppercase tracking-wider ${k.strong}">Notifications</h5>
      <span class="rounded-full bg-current/10 px-2 py-0.5 text-[10px] font-bold">2 unread</span>
    </div>
    <button type="button" class="text-[11px] font-medium opacity-70 hover:opacity-100">
      Mark all read
    </button>
  </div>

  <div class="divide-y divide-current/10">
    <div class="p-3 flex items-start gap-2.5 bg-current/[0.05]">
      <span class="h-2 w-2 rounded-full bg-primary mt-1 shrink-0"></span>
      <div class="flex-1 space-y-0.5">
        <h6 class="font-semibold ${k.strong}">New Token Sync</h6>
        <p class="${k.muted}">Typography tokens updated across Japandi and Brutalist.</p>
        <span class="${k.faint} text-[10px] font-mono">5m ago</span>
      </div>
    </div>
  </div>
</div>`;

    case "cookie-banner":
    default:
      return `<!-- ${k.styleName} · Cookie Consent Banner -->
<!-- Privacy compliance banner with persistent preference customization -->

<aside role="dialog" aria-label="Cookie consent" class="${k.panel} ${k.radius} p-5 border shadow-2xl space-y-3 max-w-lg text-xs">
  <div class="flex items-start gap-3">
    <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-amber-500">
      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </span>
    <div class="space-y-1">
      <h4 class="font-bold text-sm ${k.strong}">Privacy &amp; Cookie Compliance</h4>
      <p class="${k.muted} leading-relaxed">
        We use essential cookies to keep sessions secure and optional telemetry to analyze UI performance.
      </p>
    </div>
  </div>

  <div class="flex items-center justify-end gap-2 pt-2 border-t border-current/10">
    <button type="button" class="${k.btnSecondary}">Customize</button>
    <button type="button" class="${k.btnSecondary}">Essential Only</button>
    <button type="button" class="${k.btnPrimarySm}">Accept All</button>
  </div>
</aside>`;
  }
}
