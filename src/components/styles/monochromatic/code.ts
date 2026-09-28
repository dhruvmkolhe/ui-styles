import type { Mode } from "@/lib/styles/types";
import { monochromatic } from "./kit";

const SV = {
  arrow: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>`,
  x: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
  check: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>`,
};

export const monochromaticCode: Record<string, (mode: Mode) => string> = {
  button: (m) => {
    const k = monochromatic(m);
    return `<!-- Monochromatic · Royal Blue Buttons -->
<div class="flex flex-wrap gap-4 items-center">
  <button class="${k.btnPrimary}">
    <span>ROYAL BLUE PRIMARY</span>
    ${SV.arrow}
  </button>
  <button class="${k.btnSecondary}">
    <span>TINT SECONDARY</span>
  </button>
</div>`;
  },

  card: (m) => {
    const k = monochromatic(m);
    return `<!-- Monochromatic · Single-Hue Card -->
<div class="${k.panel} w-full max-w-md space-y-4">
  <div class="flex items-center justify-between border-b border-[#BFDBFE] pb-3">
    <span class="text-xs font-semibold text-[#1E40AF]">SINGLE HUE SYSTEM</span>
    <span class="${k.badge}">ROYAL BLUE</span>
  </div>
  <h3 class="${k.heading} text-xl font-bold">Harmonious Shade Palette</h3>
  <p class="${k.muted} text-sm leading-relaxed">
    Interface elements styled strictly through subtle variations in tint, tone, and shade of a single royal blue color.
  </p>
  <div class="pt-2 flex items-center justify-between border-t border-[#BFDBFE]">
    <span class="text-xs text-[#2563EB]">#2563EB Base</span>
    <button class="${k.btnPrimarySm}">
      <span>DETAILS</span>
      ${SV.arrow}
    </button>
  </div>
</div>`;
  },

  navbar: (m) => {
    const k = monochromatic(m);
    return `<!-- Monochromatic · Navbar -->
<header class="${k.bar} flex items-center justify-between px-6 py-4 w-full">
  <div class="flex items-center gap-3">
    <div class="w-8 h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs">
      MB
    </div>
    <a href="#" class="font-bold text-base text-[#1E40AF]">MonoBlue</a>
  </div>

  <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-[#2563EB]">
    <a href="#" class="text-[#1E40AF] border-b-2 border-[#1E40AF] pb-1">Tints</a>
    <a href="#" class="hover:text-[#1E40AF]">Shades</a>
    <a href="#" class="hover:text-[#1E40AF]">Tones</a>
  </nav>

  <button class="${k.btnPrimarySm}">CONNECT</button>
</header>`;
  },

  input: (m) => {
    const k = monochromatic(m);
    return `<!-- Monochromatic · Form Input -->
<div class="w-full max-w-sm space-y-1">
  <label class="${k.label}">BLUEPRINT IDENTIFIER</label>
  <input type="text" placeholder="BLUE-SHADE-900" class="${k.input}" />
  <p class="text-xs text-[#3B82F6]">Strictly blue spectrum values permitted</p>
</div>`;
  },

  badge: (m) => {
    const k = monochromatic(m);
    return `<!-- Monochromatic · Badges -->
<div class="flex flex-wrap items-center gap-3">
  <span class="${k.badge}">Light Blue Tint</span>
  <span class="${k.badgeOutline}">Outlined Shade</span>
  <span class="inline-flex items-center px-3 py-0.5 text-xs font-medium bg-[#1E40AF] text-white rounded-full">
    Deep Royal
  </span>
</div>`;
  },

  modal: (m) => {
    const k = monochromatic(m);
    return `<!-- Monochromatic · Modal -->
<div class="${k.panel} w-full max-w-md space-y-5">
  <div class="flex items-center justify-between border-b border-[#BFDBFE] pb-3">
    <h3 class="${k.heading} text-lg font-bold">Apply Single-Hue Palette?</h3>
    <button class="text-[#2563EB] hover:text-[#1E40AF]">${SV.x}</button>
  </div>
  <p class="${k.muted} text-sm leading-relaxed">
    All UI surfaces, text tokens, and borders will be harmonized to royal blue color scales.
  </p>
  <div class="flex justify-end gap-3 pt-2">
    <button class="${k.btnSecondary}">CANCEL</button>
    <button class="${k.btnPrimary}">APPLY PALETTE</button>
  </div>
</div>`;
  },

  accordion: (m) => {
    const k = monochromatic(m);
    return `<!-- Monochromatic · Accordion -->
<div class="${k.panel} w-full max-w-md divide-y divide-[#BFDBFE] p-0 overflow-hidden">
  <div class="p-4">
    <button class="w-full flex items-center justify-between text-left font-semibold text-sm text-[#1E40AF]">
      <span>Why use monochromatic UI?</span>
      <span class="font-bold">-</span>
    </button>
    <p class="mt-2 ${k.muted} text-xs leading-relaxed">
      Monochromatic designs create visual harmony, simplify component hierarchies, and reduce cognitive friction.
    </p>
  </div>
  <div class="p-4">
    <button class="w-full flex items-center justify-between text-left font-semibold text-sm text-[#2563EB]">
      <span>Contrast vs Value Scale</span>
      <span class="font-bold">+</span>
    </button>
  </div>
</div>`;
  },

  tooltip: () => {
    return `<!-- Monochromatic · Tooltip -->
<div class="relative inline-block">
  <div class="bg-[#1E40AF] text-white px-3 py-1 text-xs font-medium rounded-md shadow-sm">
    Color: #2563EB Royal Blue
  </div>
</div>`;
  },

  tabs: (m) => {
    const k = monochromatic(m);
    return `<!-- Monochromatic · Tabs -->
<div class="flex border-b border-[#BFDBFE] w-full max-w-md font-medium text-sm">
  <button class="px-5 py-2.5 border-b-2 border-[#1E40AF] text-[#1E40AF] font-bold">
    01. SHADES
  </button>
  <button class="px-5 py-2.5 ${k.muted} hover:text-[#1E40AF]">
    02. TINTS
  </button>
  <button class="px-5 py-2.5 ${k.muted} hover:text-[#1E40AF]">
    03. TONES
  </button>
</div>`;
  },

  dropdown: (m) => {
    const k = monochromatic(m);
    return `<!-- Monochromatic · Dropdown -->
<div class="${k.panel} w-56 p-2 space-y-1 text-sm font-medium">
  <a href="#" class="block px-3.5 py-2 rounded-lg bg-[#DBEAFE] text-[#1E40AF]">Royal Blue #2563EB</a>
  <a href="#" class="block px-3.5 py-2 rounded-lg hover:bg-[#EFF6FF] text-[#2563EB] transition-colors">Sky Blue #60A5FA</a>
  <a href="#" class="block px-3.5 py-2 rounded-lg hover:bg-[#EFF6FF] text-[#2563EB] transition-colors">Midnight #1E293B</a>
</div>`;
  },

  switch: () => {
    return `<!-- Monochromatic · Switch -->
<div class="flex items-center gap-4">
  <button class="w-12 h-6 bg-[#2563EB] relative p-0.5 rounded-full flex items-center justify-end">
    <div class="w-5 h-5 bg-white rounded-full shadow-sm"></div>
  </button>
  <span class="text-xs font-bold text-[#1E40AF]">SINGLE HUE: ACTIVE</span>
</div>`;
  },

  skeleton: (m) => {
    const k = monochromatic(m);
    return `<!-- Monochromatic · Skeleton Loader -->
<div class="${k.panel} w-full max-w-sm p-6 space-y-4">
  <div class="h-4 bg-[#2563EB]/20 animate-pulse rounded-md w-1/3"></div>
  <div class="h-8 bg-[#DBEAFE] animate-pulse rounded-md w-3/4"></div>
  <div class="space-y-2">
    <div class="h-3 bg-[#BFDBFE]/40 animate-pulse rounded-md w-full"></div>
    <div class="h-3 bg-[#BFDBFE]/40 animate-pulse rounded-md w-5/6"></div>
  </div>
</div>`;
  },

  toast: (m) => {
    const k = monochromatic(m);
    return `<!-- Monochromatic · Toast -->
<div class="${k.panel} w-full max-w-sm p-4 border-l-4 border-l-[#2563EB] flex items-start gap-3">
  <span class="h-3 w-3 bg-[#2563EB] rounded-full mt-0.5 flex-shrink-0"></span>
  <div class="space-y-1">
    <p class="text-xs font-bold text-[#1E40AF]">PALETTE HARMONIZED</p>
    <p class="${k.muted} text-xs">All components generated in single-hue royal blue.</p>
  </div>
</div>`;
  },

  progress: () => {
    return `<!-- Monochromatic · Progress Bar -->
<div class="w-full max-w-sm space-y-2">
  <div class="flex justify-between text-xs font-bold text-[#1E40AF]">
    <span>BLUE SCALE FILL</span>
    <span class="text-[#2563EB]">85%</span>
  </div>
  <div class="h-2 w-full bg-[#DBEAFE] rounded-full overflow-hidden">
    <div class="h-full bg-[#2563EB] w-[85%] rounded-full"></div>
  </div>
</div>`;
  },

  avatar: () => {
    return `<!-- Monochromatic · Avatar -->
<div class="flex items-center gap-3">
  <div class="w-10 h-10 bg-[#2563EB] text-white rounded-lg flex items-center justify-center font-bold text-sm">
    MB
  </div>
  <div>
    <p class="font-bold text-xs text-[#1E40AF]">MONO BLUE</p>
    <p class="text-[10px] text-[#3B82F6]">ROYAL ACCENT #2563EB</p>
  </div>
</div>`;
  },
};
