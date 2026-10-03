import type { Mode, StyleSlug } from "@/lib/styles/types";
import { getStyleFormKit } from "./common-form-kit";

export function getNavigationCodeForStyle(
  slug: StyleSlug,
  componentId: string,
  mode: Mode
): string {
  const k = getStyleFormKit(slug, mode);

  switch (componentId) {
    case "breadcrumb":
      return `<!-- ${k.styleName} · Breadcrumb -->
<!-- Semantic breadcrumb navigation with links, separator, and active page -->

<nav aria-label="Breadcrumb" class="text-sm">
  <ol class="flex flex-wrap items-center gap-2 ${k.muted}">
    <li class="inline-flex items-center gap-1.5">
      <a href="#" class="hover:${k.strong} transition-colors flex items-center gap-1">
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span>Home</span>
      </a>
    </li>
    <li role="presentation" aria-hidden="true" class="opacity-50">/</li>
    <li class="inline-flex items-center gap-1.5">
      <a href="#" class="hover:${k.strong} transition-colors">Workspace</a>
    </li>
    <li role="presentation" aria-hidden="true" class="opacity-50">/</li>
    <li class="inline-flex items-center gap-1.5">
      <a href="#" class="hover:${k.strong} transition-colors">Projects</a>
    </li>
    <li role="presentation" aria-hidden="true" class="opacity-50">/</li>
    <li class="inline-flex items-center gap-1.5">
      <span role="link" aria-current="page" aria-disabled="true" class="font-bold ${k.strong}">
        Design System
      </span>
    </li>
  </ol>
</nav>`;

    case "pagination":
      return `<!-- ${k.styleName} · Pagination -->
<!-- Accessible pagination with page buttons, ellipses, and active page indication -->

<nav role="navigation" aria-label="Pagination" class="flex items-center justify-center gap-1.5">
  <!-- Previous -->
  <button type="button" aria-label="Go to previous page" class="${k.btnSecondary} ${k.radius} px-3 py-1.5 text-xs font-medium flex items-center gap-1">
    <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
    <span>Previous</span>
  </button>

  <!-- Page Numbers -->
  <button type="button" class="${k.btnSecondary} ${k.radius} h-8 w-8 text-xs font-medium">1</button>
  <button type="button" aria-current="page" class="${k.btnPrimary} ${k.radius} h-8 w-8 text-xs font-bold shadow-xs">2</button>
  <button type="button" class="${k.btnSecondary} ${k.radius} h-8 w-8 text-xs font-medium">3</button>
  <span aria-hidden="true" class="h-8 w-8 flex items-center justify-center text-xs opacity-50">...</span>
  <button type="button" class="${k.btnSecondary} ${k.radius} h-8 w-8 text-xs font-medium">12</button>

  <!-- Next -->
  <button type="button" aria-label="Go to next page" class="${k.btnSecondary} ${k.radius} px-3 py-1.5 text-xs font-medium flex items-center gap-1">
    <span>Next</span>
    <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>
  </button>
</nav>`;

    case "sidebar":
      return `<!-- ${k.styleName} · Sidebar Navigation -->
<!-- Collapsible sidebar with brand header, grouped links, nested menu, and footer -->

<aside aria-label="Main sidebar" class="${k.panel} ${k.radius} w-64 border flex flex-col h-[420px] select-none">
  <!-- Header -->
  <div class="h-14 border-b border-current/10 px-4 flex items-center justify-between">
    <span class="font-extrabold text-sm tracking-tight ${k.strong}">CHAMELEON UI STUDIO</span>
    <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-current/10">PRO</span>
  </div>

  <!-- Content Links -->
  <div class="flex-1 overflow-y-auto p-3 space-y-4">
    <div class="space-y-1">
      <div class="px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${k.muted}">Workspace</div>
      <button class="${k.btnPrimarySm} ${k.radius} w-full flex items-center gap-2.5 text-xs font-semibold">
        <span>Overview</span>
      </button>
      <button class="w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded hover:bg-current/5 ${k.muted} hover:${k.strong}">
        <span>Components</span>
        <span class="text-[10px] font-mono opacity-70">45</span>
      </button>
      <button class="w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded hover:bg-current/5 ${k.muted} hover:${k.strong}">
        <span>Templates</span>
      </button>
    </div>
  </div>

  <!-- Footer Profile -->
  <div class="border-t border-current/10 p-3 flex items-center gap-2.5">
    <div class="h-7 w-7 rounded-full bg-current/20 flex items-center justify-center font-bold text-xs">U</div>
    <div class="flex-1 truncate text-xs">
      <div class="font-bold ${k.strong}">Alex Morgan</div>
      <div class="${k.muted} text-[10px]">Lead Architect</div>
    </div>
  </div>
</aside>`;

    case "navigation-menu":
      return `<!-- ${k.styleName} · Navigation Menu -->
<!-- Accessible top navigation with dropdown panels and keyboard accessibility -->

<nav aria-label="Main Navigation" class="${k.panel} ${k.radius} border px-4 py-2 flex items-center justify-between">
  <div class="flex items-center gap-1">
    <button type="button" aria-haspopup="true" aria-expanded="false" class="${k.btnSecondary} ${k.radius} px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5">
      <span>Products</span>
      <svg class="h-3 w-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <a href="#" class="px-3 py-1.5 text-xs font-medium rounded hover:bg-current/5 ${k.muted} hover:${k.strong}">Documentation</a>
    <a href="#" class="px-3 py-1.5 text-xs font-medium rounded hover:bg-current/5 ${k.muted} hover:${k.strong}">Showcase</a>
  </div>
  <button class="${k.btnPrimarySm} ${k.radius} text-xs">Get Started</button>
</nav>`;

    case "menu-bar":
      return `<!-- ${k.styleName} · Menu Bar -->
<!-- Application-style menu bar with keyboard shortcuts and cascading submenus -->

<div role="menubar" aria-orientation="horizontal" class="${k.panel} ${k.radius} border p-1 flex items-center gap-1 text-xs">
  <button role="menuitem" aria-haspopup="true" aria-expanded="false" class="px-2.5 py-1 rounded hover:bg-current/10 font-medium">File</button>
  <button role="menuitem" aria-haspopup="true" aria-expanded="true" class="${k.btnSecondary} ${k.radius} px-2.5 py-1 font-bold">Edit</button>
  <button role="menuitem" aria-haspopup="true" aria-expanded="false" class="px-2.5 py-1 rounded hover:bg-current/10 font-medium">View</button>
  <button role="menuitem" aria-haspopup="true" aria-expanded="false" class="px-2.5 py-1 rounded hover:bg-current/10 font-medium">Help</button>

  <!-- Dropdown Menu Item Example -->
  <div role="menu" class="${k.panel} ${k.radius} absolute mt-8 ml-10 p-1 border shadow-xl w-48 space-y-0.5">
    <button role="menuitem" class="w-full flex items-center justify-between px-2 py-1.5 rounded hover:bg-current/10 text-left">
      <span>Undo</span>
      <kbd class="text-[10px] font-mono opacity-60">⌘Z</kbd>
    </button>
    <button role="menuitem" class="w-full flex items-center justify-between px-2 py-1.5 rounded hover:bg-current/10 text-left">
      <span>Redo</span>
      <kbd class="text-[10px] font-mono opacity-60">⇧⌘Z</kbd>
    </button>
    <div role="separator" class="h-px bg-current/10 my-1"></div>
    <button role="menuitem" class="w-full flex items-center justify-between px-2 py-1.5 rounded hover:bg-current/10 text-left">
      <span>Cut</span>
      <kbd class="text-[10px] font-mono opacity-60">⌘X</kbd>
    </button>
  </div>
</div>`;

    case "stepper":
      return `<!-- ${k.styleName} · Stepper -->
<!-- Multi-step wizard with completed checkmark, current highlight, and connecting rule -->

<nav aria-label="Progress Stepper" class="w-full">
  <ol class="flex items-center justify-between gap-3">
    <!-- Step 1 (Completed) -->
    <li class="flex items-center gap-2 flex-1">
      <div class="h-7 w-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
        ✓
      </div>
      <div class="text-xs font-bold ${k.strong}">Account</div>
      <div class="flex-1 h-0.5 bg-emerald-600"></div>
    </li>

    <!-- Step 2 (Current) -->
    <li class="flex items-center gap-2 flex-1">
      <div class="h-7 w-7 rounded-full border-2 border-current flex items-center justify-center text-xs font-extrabold ${k.strong}">
        2
      </div>
      <div class="text-xs font-bold ${k.strong}">Billing</div>
      <div class="flex-1 h-0.5 bg-current/20"></div>
    </li>

    <!-- Step 3 (Upcoming) -->
    <li class="flex items-center gap-2">
      <div class="h-7 w-7 rounded-full border border-current/30 flex items-center justify-center text-xs ${k.muted}">
        3
      </div>
      <div class="text-xs ${k.muted}">Confirm</div>
    </li>
  </ol>
</nav>`;

    case "bottom-navigation":
      return `<!-- ${k.styleName} · Bottom Navigation -->
<!-- Mobile bottom navigation bar with active state and notification badge -->

<nav aria-label="Bottom Navigation" class="${k.panel} border-t px-4 py-2 flex items-center justify-around select-none">
  <button aria-current="page" class="flex flex-col items-center gap-1 ${k.strong} font-bold text-xs">
    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
    <span>Home</span>
  </button>
  <button class="flex flex-col items-center gap-1 ${k.muted} text-xs">
    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <span>Search</span>
  </button>
  <button class="relative flex flex-col items-center gap-1 ${k.muted} text-xs">
    <span class="absolute -top-1 right-2 h-4 w-4 rounded-full bg-rose-500 text-white font-bold text-[9px] flex items-center justify-center">3</span>
    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
    <span>Updates</span>
  </button>
  <button class="flex flex-col items-center gap-1 ${k.muted} text-xs">
    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
    <span>Profile</span>
  </button>
</nav>`;

    case "command-menu":
      return `<!-- ${k.styleName} · Command Menu -->
<!-- Accessible command palette modal with search input, group filtering, and keyboard shortcuts -->

<div role="dialog" aria-modal="true" class="w-full max-w-lg ${k.panel} ${k.radius} border shadow-2xl overflow-hidden">
  <!-- Search Input -->
  <div class="flex items-center gap-2 px-3.5 py-3 border-b border-current/10">
    <svg class="h-4 w-4 ${k.muted}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <input type="text" placeholder="Type a command or search..." class="flex-1 bg-transparent text-xs ${k.strong} outline-none" />
    <kbd class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-current/10 ${k.muted}">ESC</kbd>
  </div>

  <!-- Command Results -->
  <div class="p-2 space-y-1 text-xs">
    <div class="px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${k.muted}">Navigation</div>
    <div class="${k.btnPrimarySm} ${k.radius} flex items-center justify-between px-2.5 py-2 font-medium cursor-pointer">
      <span>Go to Components Gallery</span>
      <kbd class="text-[10px] font-mono opacity-80">G C</kbd>
    </div>
    <div class="flex items-center justify-between px-2.5 py-2 rounded hover:bg-current/10 ${k.muted} hover:${k.strong} cursor-pointer">
      <span>Documentation & Specs</span>
      <kbd class="text-[10px] font-mono opacity-60">G D</kbd>
    </div>
  </div>
</div>`;

    case "link":
      return `<!-- ${k.styleName} · Link Variants -->
<!-- Standard, subtle, external, and underlined link variants -->

<div class="space-y-3 text-xs">
  <div>
    <a href="#" class="${k.strong} font-semibold underline underline-offset-4 hover:opacity-80">
      Primary Underlined Link
    </a>
  </div>
  <div>
    <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="${k.muted} hover:${k.strong} inline-flex items-center gap-1">
      <span>External Documentation</span>
      <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  </div>
  <div>
    <span aria-disabled="true" class="opacity-40 cursor-not-allowed">
      Disabled Inactive Anchor
    </span>
  </div>
</div>`;

    case "back-to-top":
      return `<!-- ${k.styleName} · Back to Top -->
<!-- Floating scroll-to-top button with smooth scroll behavior -->

<button type="button" aria-label="Back to top" class="${k.btnPrimary} ${k.radius} fixed bottom-6 right-6 p-3 shadow-xl inline-flex items-center gap-1.5 text-xs font-bold">
  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
  </svg>
  <span>Top</span>
</button>`;

    default:
      return `<!-- Component code for ${componentId} -->`;
  }
}
