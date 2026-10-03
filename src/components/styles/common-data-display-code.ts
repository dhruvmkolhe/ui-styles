import type { Mode, StyleSlug } from "@/lib/styles/types";
import { getStyleFormKit } from "./common-form-kit";

export function getDataDisplayCodeForStyle(
  slug: StyleSlug,
  componentId: string,
  mode: Mode
): string {
  const k = getStyleFormKit(slug, mode);

  switch (componentId) {
    case "table":
      return `<!-- ${k.styleName} · Semantic Table -->
<!-- Structured data table with aligned headers and hover states -->

<div class="${k.panel} ${k.radius} border overflow-hidden">
  <table class="w-full text-left text-xs border-collapse">
    <thead class="border-b ${k.borderHex ? "" : "border-border/60"} bg-current/5 font-semibold ${k.muted}">
      <tr>
        <th class="px-3.5 py-2.5">Invoice</th>
        <th class="px-3.5 py-2.5">Client</th>
        <th class="px-3.5 py-2.5">Status</th>
        <th class="px-3.5 py-2.5 text-right">Amount</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-current/10">
      <tr class="hover:bg-current/5 transition-colors">
        <td class="px-3.5 py-2.5 font-mono ${k.strong}">INV-001</td>
        <td class="px-3.5 py-2.5">Acme Corporation</td>
        <td class="px-3.5 py-2.5">
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600">Paid</span>
        </td>
        <td class="px-3.5 py-2.5 text-right font-mono font-medium">$1,250.00</td>
      </tr>
      <tr class="hover:bg-current/5 transition-colors">
        <td class="px-3.5 py-2.5 font-mono ${k.strong}">INV-002</td>
        <td class="px-3.5 py-2.5">Globex Studios</td>
        <td class="px-3.5 py-2.5">
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-600">Pending</span>
        </td>
        <td class="px-3.5 py-2.5 text-right font-mono font-medium">$850.00</td>
      </tr>
    </tbody>
  </table>
</div>`;

    case "data-table":
      return `<!-- ${k.styleName} · Data Table -->
<!-- Dynamic sorting, search filtering, row selection, and pagination -->

<div class="space-y-3 w-full">
  <div class="flex items-center justify-between gap-3">
    <input type="text" placeholder="Filter records..." class="${k.input} ${k.radius} px-3 py-1.5 text-xs w-64 border" />
    <span class="text-xs ${k.muted}">Showing 3 of 24 records</span>
  </div>

  <div class="${k.panel} ${k.radius} border overflow-hidden">
    <table class="w-full text-xs text-left">
      <thead class="border-b bg-current/5 font-medium ${k.muted}">
        <tr>
          <th class="w-10 px-3 py-2 text-center"><input type="checkbox" class="rounded" /></th>
          <th class="px-3 py-2 cursor-pointer hover:underline">Name ↕</th>
          <th class="px-3 py-2 cursor-pointer hover:underline">Role ↕</th>
          <th class="px-3 py-2 text-right">Activity</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-current/10">
        <tr class="hover:bg-current/5">
          <td class="px-3 py-2 text-center"><input type="checkbox" class="rounded" /></td>
          <td class="px-3 py-2 font-medium ${k.strong}">Elena Rostova</td>
          <td class="px-3 py-2 ${k.muted}">Principal Architect</td>
          <td class="px-3 py-2 text-right font-mono">2m ago</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`;

    case "list":
      return `<!-- ${k.styleName} · List -->
<!-- Bordered and interactive item list with leading avatars and actions -->

<ul class="${k.panel} ${k.radius} border divide-y divide-current/10 overflow-hidden text-xs">
  <li class="flex items-center justify-between px-3.5 py-2.5 hover:bg-current/5 transition-colors cursor-pointer">
    <div class="flex items-center gap-3">
      <div class="h-8 w-8 rounded-full bg-current/10 flex items-center justify-center font-bold">ER</div>
      <div>
        <div class="font-semibold ${k.strong}">Elena Rostova</div>
        <div class="text-[11px] ${k.muted}">Product Design Lead</div>
      </div>
    </div>
    <span class="px-2 py-0.5 rounded text-[10px] bg-current/10 font-mono">Active</span>
  </li>
  <li class="flex items-center justify-between px-3.5 py-2.5 hover:bg-current/5 transition-colors cursor-pointer">
    <div class="flex items-center gap-3">
      <div class="h-8 w-8 rounded-full bg-current/10 flex items-center justify-center font-bold">MK</div>
      <div>
        <div class="font-semibold ${k.strong}">Marcus Vance</div>
        <div class="text-[11px] ${k.muted}">Design Systems Engineer</div>
      </div>
    </div>
    <span class="px-2 py-0.5 rounded text-[10px] bg-current/10 font-mono">Offline</span>
  </li>
</ul>`;

    case "timeline":
      return `<!-- ${k.styleName} · Timeline -->
<!-- Vertical activity tracker with status nodes and connector lines -->

<ol class="relative flex flex-col space-y-5 text-xs">
  <li class="relative flex gap-3.5">
    <div class="relative flex flex-col items-center">
      <div class="h-6 w-6 rounded-full bg-emerald-600 text-white flex items-center justify-center z-10 text-[10px] font-bold">✓</div>
      <div class="absolute top-6 bottom-[-20px] w-0.5 bg-emerald-600/60"></div>
    </div>
    <div class="pt-0.5 pb-2">
      <div class="flex items-center gap-2">
        <h4 class="font-bold ${k.strong}">Production Deployment</h4>
        <span class="text-[10px] ${k.muted}">14:20 UTC</span>
      </div>
      <p class="text-[11px] ${k.muted} mt-0.5">Automated canary release successfully promoted to cluster.</p>
    </div>
  </li>
  <li class="relative flex gap-3.5">
    <div class="relative flex flex-col items-center">
      <div class="h-6 w-6 rounded-full border-2 border-primary bg-background text-primary flex items-center justify-center z-10 text-[10px] font-bold">●</div>
    </div>
    <div class="pt-0.5 pb-2">
      <div class="flex items-center gap-2">
        <h4 class="font-bold ${k.strong}">Health Checks Running</h4>
        <span class="text-[10px] ${k.muted}">Current</span>
      </div>
      <p class="text-[11px] ${k.muted} mt-0.5">Monitoring latency probes and error rate thresholds.</p>
    </div>
  </li>
</ol>`;

    case "stat-card":
      return `<!-- ${k.styleName} · Stat / Metric Card -->
<!-- KPI card with metric, trend indicator, and context -->

<div class="${k.panel} ${k.radius} border p-5 shadow-sm space-y-2">
  <div class="text-[11px] font-semibold uppercase tracking-wider ${k.muted}">Monthly Recurring Revenue</div>
  <div class="flex items-baseline gap-2">
    <span class="text-3xl font-extrabold font-mono tracking-tight ${k.strong}">$48,250</span>
    <span class="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded">
      +14.2% ↑
    </span>
  </div>
  <p class="text-xs ${k.muted}">+$5,980 from previous calendar month.</p>
</div>`;

    case "rating":
      return `<!-- ${k.styleName} · Rating -->
<!-- Interactive star rating with hover preview and keyboard accessibility -->

<div class="inline-flex items-center gap-2">
  <div role="slider" aria-valuenow="4" aria-valuemin="0" aria-valuemax="5" class="flex items-center gap-0.5 text-amber-500 cursor-pointer">
    <span>★</span><span>★</span><span>★</span><span>★</span><span class="opacity-30">★</span>
  </div>
  <span class="text-xs font-bold font-mono ${k.muted}">4.0 / 5.0</span>
</div>`;

    case "chip":
      return `<!-- ${k.styleName} · Chip / Tag -->
<!-- Filter pills and dismissible tags with selection states -->

<div class="flex flex-wrap items-center gap-2">
  <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
    Selected Filter
  </span>
  <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${k.panel} border ${k.strong}">
    <span>Design Systems</span>
    <button type="button" aria-label="Remove" class="hover:opacity-75">✕</button>
  </span>
</div>`;

    case "description-list":
      return `<!-- ${k.styleName} · Description List -->
<!-- Semantic term and definition layout with horizontal key-value alignment -->

<dl class="${k.panel} ${k.radius} border divide-y divide-current/10 p-4 text-xs">
  <div class="py-2.5 flex items-baseline justify-between gap-4">
    <dt class="font-semibold uppercase tracking-wider ${k.muted}">Repository</dt>
    <dd class="font-mono ${k.strong}">acme/enterprise-core</dd>
  </div>
  <div class="py-2.5 flex items-baseline justify-between gap-4">
    <dt class="font-semibold uppercase tracking-wider ${k.muted}">Runtime Engine</dt>
    <dd class="${k.strong}">Node.js v20.12 (Turbopack)</dd>
  </div>
</dl>`;

    case "key-value-list":
      return `<!-- ${k.styleName} · Key-Value List -->
<!-- Metadata inspection rows with monospace values and copy action -->

<div class="${k.panel} ${k.radius} border divide-y divide-current/10 text-xs overflow-hidden">
  <div class="flex items-center justify-between px-3.5 py-2.5 hover:bg-current/5">
    <span class="font-medium ${k.muted}">Deployment SHA</span>
    <div class="flex items-center gap-2">
      <code class="font-mono bg-current/10 px-1.5 py-0.5 rounded text-[11px]">8f3b92a</code>
      <button class="p-1 hover:opacity-75" title="Copy to clipboard">📋</button>
    </div>
  </div>
</div>`;

    case "data-grid":
      return `<!-- ${k.styleName} · Data Grid -->
<!-- Spreadsheet-style 2D matrix with roving tabindex keyboard navigation -->

<div class="${k.panel} ${k.radius} border overflow-auto">
  <table role="grid" class="w-full border-collapse text-xs font-mono select-none">
    <thead>
      <tr class="border-b bg-current/5 font-semibold text-[11px] ${k.muted}">
        <th class="px-3 py-2 border-r">CELL</th>
        <th class="px-3 py-2 border-r">Q1</th>
        <th class="px-3 py-2 border-r">Q2</th>
        <th class="px-3 py-2">TOTAL</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b divide-x divide-current/10">
        <td class="px-3 py-2 font-semibold">Row 1</td>
        <td tabindex="0" class="px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none">$12,400</td>
        <td tabindex="-1" class="px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none">$18,200</td>
        <td tabindex="-1" class="px-3 py-2 font-bold focus:ring-2 focus:ring-primary focus:outline-none">$30,600</td>
      </tr>
    </tbody>
  </table>
</div>`;

    case "faq":
      return `<!-- ${k.styleName} · FAQ Section -->
<!-- Interactive frequently asked questions accordion with category filters and contact banner -->

<div class="w-full max-w-2xl mx-auto space-y-6">
  <!-- FAQ Header -->
  <div class="text-center space-y-2">
    <h3 class="text-2xl font-bold tracking-tight ${k.text}">${k.styleName} Knowledge Base</h3>
    <p class="text-xs ${k.muted}">Find answers to common questions about setup, tokens, and licensing.</p>
  </div>

  <!-- Search Filter -->
  <div class="relative w-full">
    <input
      type="text"
      placeholder="Search answers..."
      class="${k.input} ${k.radius} w-full pl-9 pr-4 py-2 text-xs border"
    />
  </div>

  <!-- FAQ Accordion List -->
  <div class="space-y-3">
    <!-- Item 1: Open State -->
    <div class="${k.panel} ${k.radius} border overflow-hidden">
      <button
        type="button"
        aria-expanded="true"
        class="w-full flex items-center justify-between p-4 text-left transition-colors font-semibold text-xs ${k.strong}"
      >
        <span>How do I install these components into Next.js?</span>
        <svg class="h-4 w-4 shrink-0 rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div class="px-4 pb-4 pt-1 text-xs ${k.muted} leading-relaxed border-t border-current/10">
        Every component is crafted with Tailwind CSS classes and accessible HTML primitives. Copy the snippet directly into your project or install individual primitives from the UI directory.
      </div>
    </div>

    <!-- Item 2: Collapsed State -->
    <div class="${k.panel} ${k.radius} border overflow-hidden">
      <button
        type="button"
        aria-expanded="false"
        class="w-full flex items-center justify-between p-4 text-left transition-colors font-semibold text-xs ${k.strong}"
      >
        <span>Are these components fully accessible (WCAG 2.1)?</span>
        <svg class="h-4 w-4 shrink-0 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>

    <!-- Item 3: Collapsed State -->
    <div class="${k.panel} ${k.radius} border overflow-hidden">
      <button
        type="button"
        aria-expanded="false"
        class="w-full flex items-center justify-between p-4 text-left transition-colors font-semibold text-xs ${k.strong}"
      >
        <span>Can I use this theme in commercial software?</span>
        <svg class="h-4 w-4 shrink-0 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  </div>

  <!-- Support Footer Banner -->
  <div class="${k.panelSoft} ${k.radius} border p-4 flex items-center justify-between gap-4">
    <p class="text-xs ${k.muted}">Still have questions? Our engineering team is here to help.</p>
    <a href="#" class="${k.btnPrimarySm} text-xs shrink-0">Contact Support</a>
  </div>
</div>`;

    default:
      return `<!-- ${k.styleName} · ${componentId} -->\n<div class="${k.panel} ${k.radius} border p-4 text-xs">Preview code for ${componentId}</div>`;
  }
}
