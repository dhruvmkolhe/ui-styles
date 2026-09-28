import type { Mode } from "@/lib/styles/types";
import { material } from "./kit";

const SV = {
  arrow: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>`,
  x: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
  check: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>`,
};

export const materialCode: Record<string, (mode: Mode) => string> = {
  button: (m) => {
    const k = material(m);
    return `<!-- Material Design · Elevation Buttons -->
<div class="flex flex-wrap gap-4 items-center">
  <button class="${k.btnPrimary}">
    <span>GET STARTED</span>
    ${SV.arrow}
  </button>
  <button class="${k.btnSecondary}">
    <span>LEARN MORE</span>
  </button>
</div>`;
  },

  card: (m) => {
    const k = material(m);
    return `<!-- Material Design · Surface Card -->
<div class="${k.panel} w-full max-w-md space-y-4">
  <div class="flex items-center justify-between">
    <span class="text-xs font-medium text-[#6200EE]">MATERIAL DESIGN 3</span>
    <span class="${k.badge}">ELEVATION 2</span>
  </div>
  <h3 class="${k.heading} text-xl font-normal">Layered Surface Cards</h3>
  <p class="${k.muted} text-sm leading-relaxed">
    Components built from elevated paper surfaces, rounded pill buttons, and subtle material ripples.
  </p>
  <div class="pt-2 flex items-center justify-between border-t border-neutral-100">
    <span class="text-xs text-neutral-500">Surface Tint</span>
    <button class="${k.btnPrimarySm}">
      <span>EXPLORE</span>
      ${SV.arrow}
    </button>
  </div>
</div>`;
  },

  navbar: (m) => {
    const k = material(m);
    return `<!-- Material Design · Top App Bar -->
<header class="${k.bar} flex items-center justify-between px-6 py-4 w-full">
  <div class="flex items-center gap-3">
    <div class="w-8 h-8 rounded-full bg-[#6200EE] text-white flex items-center justify-center font-bold text-xs shadow-md">
      M
    </div>
    <a href="#" class="font-medium text-lg text-[#121212]">Material Hub</a>
  </div>

  <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
    <a href="#" class="text-[#6200EE] border-b-2 border-[#6200EE] pb-1">Surfaces</a>
    <a href="#" class="hover:text-[#6200EE]">Components</a>
    <a href="#" class="hover:text-[#6200EE]">Tokens</a>
  </nav>

  <button class="${k.btnPrimarySm}">SIGN IN</button>
</header>`;
  },

  input: (m) => {
    const k = material(m);
    return `<!-- Material Design · Filled Input -->
<div class="w-full max-w-sm space-y-1">
  <label class="${k.label}">EMAIL ADDRESS</label>
  <input type="email" placeholder="user@material.io" class="${k.input}" />
  <p class="text-xs text-neutral-500">Enter your official Material Design account</p>
</div>`;
  },

  badge: (m) => {
    const k = material(m);
    return `<!-- Material Design · Chips / Badges -->
<div class="flex flex-wrap items-center gap-3">
  <span class="${k.badge}">Primary Chip</span>
  <span class="${k.badgeOutline}">Filter Tag</span>
  <span class="inline-flex items-center px-3 py-1 text-xs font-medium bg-[#03DAC6] text-[#121212] rounded-full shadow-sm">
    Secondary Teal
  </span>
</div>`;
  },

  modal: (m) => {
    const k = material(m);
    return `<!-- Material Design · Alert Dialog -->
<div class="${k.panel} w-full max-w-md space-y-5">
  <div class="flex items-center justify-between">
    <h3 class="${k.heading} text-lg font-normal">Discard unsaved changes?</h3>
    <button class="text-neutral-400 hover:text-neutral-700">${SV.x}</button>
  </div>
  <p class="${k.muted} text-sm leading-relaxed">
    This action will delete your current draft. You cannot undo this operation.
  </p>
  <div class="flex justify-end gap-3 pt-2">
    <button class="${k.btnSecondary}">CANCEL</button>
    <button class="${k.btnPrimary}">DISCARD</button>
  </div>
</div>`;
  },

  accordion: (m) => {
    const k = material(m);
    return `<!-- Material Design · Expansion Panel -->
<div class="${k.panel} w-full max-w-md divide-y divide-neutral-100 p-0 overflow-hidden">
  <div class="p-5">
    <button class="w-full flex items-center justify-between text-left font-medium text-sm text-[#6200EE]">
      <span>What is Material Design?</span>
      <span class="font-bold">▲</span>
    </button>
    <p class="mt-3 ${k.muted} text-xs leading-relaxed">
      A design system developed by Google that uses grid-based layouts, responsive animations, and depth effects.
    </p>
  </div>
  <div class="p-5">
    <button class="w-full flex items-center justify-between text-left font-medium text-sm text-neutral-700">
      <span>Elevation and Shadows</span>
      <span class="font-bold">▼</span>
    </button>
  </div>
</div>`;
  },

  tooltip: () => {
    return `<!-- Material Design · Tooltip -->
<div class="relative inline-block">
  <div class="bg-[#323232] text-white px-3 py-1.5 text-xs font-medium rounded-md shadow-md">
    Tooltip helper text
  </div>
</div>`;
  },

  tabs: (m) => {
    const k = material(m);
    return `<!-- Material Design · Tab Bar -->
<div class="flex border-b border-neutral-200 w-full max-w-md font-medium text-sm">
  <button class="px-6 py-3 border-b-2 border-[#6200EE] text-[#6200EE]">
    TAB ONE
  </button>
  <button class="px-6 py-3 ${k.muted} hover:text-[#6200EE]">
    TAB TWO
  </button>
  <button class="px-6 py-3 ${k.muted} hover:text-[#6200EE]">
    TAB THREE
  </button>
</div>`;
  },

  dropdown: (m) => {
    const k = material(m);
    return `<!-- Material Design · Menu -->
<div class="${k.panel} w-56 p-2 space-y-1 text-sm font-medium">
  <a href="#" class="block px-4 py-2.5 rounded-lg hover:bg-[#6200EE]/10 text-[#6200EE] transition-colors">Profile Options</a>
  <a href="#" class="block px-4 py-2.5 rounded-lg hover:bg-neutral-100 text-neutral-700 transition-colors">Account Settings</a>
  <a href="#" class="block px-4 py-2.5 rounded-lg hover:bg-neutral-100 text-neutral-700 transition-colors">Sign Out</a>
</div>`;
  },

  switch: () => {
    return `<!-- Material Design · Switch -->
<div class="flex items-center gap-4">
  <button class="w-12 h-7 bg-[#6200EE] relative p-1 rounded-full shadow-inner flex items-center justify-end">
    <div class="w-5 h-5 bg-white rounded-full shadow-md"></div>
  </button>
  <span class="text-sm font-medium text-[#121212]">Material Theme: Enabled</span>
</div>`;
  },

  skeleton: (m) => {
    const k = material(m);
    return `<!-- Material Design · Skeleton Loader -->
<div class="${k.panel} w-full max-w-sm p-6 space-y-4">
  <div class="h-5 bg-[#6200EE]/20 animate-pulse rounded-full w-1/3"></div>
  <div class="h-8 bg-neutral-200 animate-pulse rounded-lg w-3/4"></div>
  <div class="space-y-2">
    <div class="h-3.5 bg-neutral-150 animate-pulse rounded-full w-full"></div>
    <div class="h-3.5 bg-neutral-150 animate-pulse rounded-full w-5/6"></div>
  </div>
</div>`;
  },

  toast: () => {
    return `<!-- Material Design · Snackbar -->
<div class="bg-[#323232] text-white w-full max-w-sm p-4 rounded-lg shadow-lg flex items-center justify-between">
  <span class="text-xs font-medium">Message sent to inbox</span>
  <button class="text-[#03DAC6] font-bold text-xs hover:underline">UNDO</button>
</div>`;
  },

  progress: () => {
    return `<!-- Material Design · Progress Bar -->
<div class="w-full max-w-sm space-y-2">
  <div class="flex justify-between text-xs font-medium text-[#6200EE]">
    <span>Downloading update</span>
    <span>70%</span>
  </div>
  <div class="h-1.5 w-full bg-[#6200EE]/20 rounded-full overflow-hidden">
    <div class="h-full bg-[#6200EE] w-[70%] rounded-full"></div>
  </div>
</div>`;
  },

  avatar: () => {
    return `<!-- Material Design · Avatar -->
<div class="flex items-center gap-3">
  <div class="w-10 h-10 bg-[#6200EE] text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
    MD
  </div>
  <div>
    <p class="font-medium text-sm text-[#121212]">Material Designer</p>
    <p class="text-xs text-neutral-500">Google Design Team</p>
  </div>
</div>`;
  },
};
