import type { Mode } from "@/lib/styles/types";
import { modernist } from "./kit";

const SV = {
  arrow: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>`,
  x: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
};

export const modernistCode: Record<string, (mode: Mode) => string> = {
  button: (m) => {
    const k = modernist(m);
    return `<!-- Modernist · Mid-Century Buttons -->
<div class="flex flex-wrap gap-4 items-center">
  <button class="${k.btnPrimary}">
    <span>TERRACOTTA CTA</span>
    ${SV.arrow}
  </button>
  <button class="${k.btnSecondary}">
    <span>OLIVE ACCENT</span>
  </button>
</div>`;
  },

  card: (m) => {
    const k = modernist(m);
    return `<!-- Modernist · Structural Card -->
<div class="${k.panel} w-full max-w-md space-y-4">
  <div class="flex items-center justify-between border-b border-[#2B2B2B] pb-3">
    <div class="flex items-center gap-2">
      <span class="w-3 h-3 bg-[#C85A32] inline-block"></span>
      <span class="w-3 h-3 bg-[#556B2F] inline-block"></span>
      <span class="w-3 h-3 bg-[#DAA520] inline-block"></span>
    </div>
    <span class="${k.badge}">MID-CENTURY</span>
  </div>
  <h3 class="${k.heading} text-xl leading-none">EAMES STRUCTURAL SPEC</h3>
  <p class="${k.muted} font-sans text-xs leading-relaxed uppercase">
    Mid-century modern aesthetic blending earthy terracotta, deep olive green, mustard yellow, and crisp structural borders.
  </p>
  <div class="pt-2 flex items-center justify-between border-t border-[#2B2B2B]">
    <span class="font-mono text-[10px] text-[#556B2F] font-bold">1950S ARCHITECTURE</span>
    <button class="${k.btnPrimarySm}">
      <span>CATALOGUE</span>
      ${SV.arrow}
    </button>
  </div>
</div>`;
  },

  navbar: (m) => {
    const k = modernist(m);
    return `<!-- Modernist · Navbar -->
<header class="${k.bar} flex items-center justify-between px-6 py-4 w-full">
  <div class="flex items-center gap-3">
    <div class="w-4 h-4 bg-[#C85A32]"></div>
    <a href="#" class="font-bold text-sm uppercase tracking-wider text-[#2B2B2B]">MODERNIST 1954</a>
  </div>

  <nav class="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest font-bold">
    <a href="#" class="text-[#C85A32] underline underline-offset-4">01. FURNITURE</a>
    <a href="#" class="${k.muted} hover:text-[#C85A32]">02. LIGHTING</a>
    <a href="#" class="${k.muted} hover:text-[#C85A32]">03. LAYOUT</a>
  </nav>

  <button class="${k.btnPrimarySm}">CONTACT</button>
</header>`;
  },

  input: (m) => {
    const k = modernist(m);
    return `<!-- Modernist · Form Input -->
<div class="w-full max-w-sm space-y-1.5">
  <label class="${k.label}">01 // ARCHITECTURAL DRAWING ID</label>
  <input type="text" placeholder="MOD-1954-TERRACOTTA" class="${k.input}" />
  <p class="font-mono text-[10px] text-[#556B2F] font-bold">MID-CENTURY SPECIFICATION FILE</p>
</div>`;
  },

  badge: (m) => {
    const k = modernist(m);
    return `<!-- Modernist · Badges -->
<div class="flex flex-wrap items-center gap-3">
  <span class="${k.badge}">TERRACOTTA</span>
  <span class="${k.badgeOutline}">MUSTARD GOLD</span>
  <span class="inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-[#556B2F] text-white border border-[#2B2B2B]">
    OLIVE GREEN
  </span>
</div>`;
  },

  modal: (m) => {
    const k = modernist(m);
    return `<!-- Modernist · Modal -->
<div class="${k.panel} w-full max-w-md space-y-5">
  <div class="flex items-center justify-between border-b border-[#2B2B2B] pb-3">
    <span class="font-mono text-xs font-bold text-[#C85A32]">BLUEPRINT REVISION № 54</span>
    <button class="${k.muted} hover:text-[#C85A32]">${SV.x}</button>
  </div>
  <h3 class="${k.heading} text-lg">UPDATE MID-CENTURY PALETTE?</h3>
  <p class="${k.muted} font-sans text-xs leading-relaxed uppercase">
    Synchronize layout parameters to mid-century terracotta and olive color swatches.
  </p>
  <div class="flex justify-end gap-3 pt-2">
    <button class="${k.btnSecondary}">DISCARD</button>
    <button class="${k.btnPrimary}">APPLY SPEC</button>
  </div>
</div>`;
  },

  accordion: (m) => {
    const k = modernist(m);
    return `<!-- Modernist · Accordion -->
<div class="${k.panel} w-full max-w-md divide-y divide-[#2B2B2B] p-0">
  <div class="p-4">
    <button class="w-full flex items-center justify-between text-left font-sans text-xs font-bold uppercase tracking-wider text-[#C85A32]">
      <span>01 // WHAT IS MID-CENTURY MODERNISM?</span>
      <span class="font-bold">-</span>
    </button>
    <p class="mt-3 ${k.muted} font-sans text-xs leading-relaxed uppercase">
      Post-WWII design movement emphasizing organic shapes, clean lines, and integration with nature.
    </p>
  </div>
  <div class="p-4">
    <button class="w-full flex items-center justify-between text-left font-sans text-xs font-bold uppercase tracking-wider ${k.muted}">
      <span>02 // EARTHY COLOR PALETTES</span>
      <span class="font-bold">+</span>
    </button>
  </div>
</div>`;
  },

  tooltip: () => {
    return `<!-- Modernist · Tooltip -->
<div class="relative inline-block">
  <div class="bg-[#DAA520] text-[#2B2B2B] border border-[#2B2B2B] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest">
    PALETTE: TERRACOTTA-1954
  </div>
</div>`;
  },

  tabs: (m) => {
    const k = modernist(m);
    return `<!-- Modernist · Tabs -->
<div class="flex border-b border-[#2B2B2B] w-full max-w-md font-mono text-xs">
  <button class="px-5 py-2.5 bg-[#C85A32] text-white font-bold tracking-wider border-r border-[#2B2B2B]">
    01. TERRA
  </button>
  <button class="px-5 py-2.5 bg-[#556B2F] text-white font-bold tracking-wider border-r border-[#2B2B2B]">
    02. OLIVE
  </button>
  <button class="px-5 py-2.5 ${k.muted} font-bold tracking-wider">
    03. MUSTARD
  </button>
</div>`;
  },

  dropdown: (m) => {
    const k = modernist(m);
    return `<!-- Modernist · Dropdown -->
<div class="${k.panel} w-56 p-0 divide-y divide-[#2B2B2B] font-mono text-xs uppercase tracking-wider">
  <div class="p-3 bg-[#C85A32] text-white font-bold flex justify-between items-center">
    <span>SELECT DESIGNER</span>
    <span>▼</span>
  </div>
  <a href="#" class="block p-3 text-[#2B2B2B] hover:bg-[#556B2F] hover:text-white transition-colors">CHARLES &amp; RAY EAMES</a>
  <a href="#" class="block p-3 text-[#2B2B2B] hover:bg-[#DAA520] hover:text-[#2B2B2B] transition-colors">EERO SAARINEN</a>
  <a href="#" class="block p-3 text-[#2B2B2B] hover:bg-[#C85A32] hover:text-white transition-colors">GEORGE NELSON</a>
</div>`;
  },

  switch: () => {
    return `<!-- Modernist · Switch -->
<div class="flex items-center gap-4">
  <button class="w-12 h-6 border border-[#2B2B2B] bg-[#F4F0EA] relative p-0.5 rounded-none">
    <div class="w-5 h-4.5 bg-[#C85A32] rounded-none"></div>
  </button>
  <span class="font-mono text-xs font-bold text-[#2B2B2B]">TERRACOTTA MODE: ON</span>
</div>`;
  },

  skeleton: (m) => {
    const k = modernist(m);
    return `<!-- Modernist · Skeleton Loader -->
<div class="${k.panel} w-full max-w-sm p-6 space-y-4">
  <div class="h-4 bg-[#C85A32] animate-pulse w-1/3"></div>
  <div class="h-8 bg-[#DAA520]/30 animate-pulse w-3/4 border border-[#2B2B2B]"></div>
  <div class="space-y-2">
    <div class="h-3 bg-[#556B2F]/20 animate-pulse w-full"></div>
    <div class="h-3 bg-[#556B2F]/20 animate-pulse w-5/6"></div>
  </div>
</div>`;
  },

  toast: (m) => {
    const k = modernist(m);
    return `<!-- Modernist · Toast -->
<div class="${k.panel} w-full max-w-sm p-4 border-l-4 border-l-[#C85A32] flex items-start gap-3">
  <div class="w-3 h-3 bg-[#DAA520] border border-[#2B2B2B] mt-0.5 flex-shrink-0"></div>
  <div class="space-y-1">
    <p class="font-mono text-xs font-bold text-[#2B2B2B]">BLUEPRINT ARCHIVED</p>
    <p class="${k.muted} font-sans text-xs uppercase">Mid-century specification successfully saved.</p>
  </div>
</div>`;
  },

  progress: () => {
    return `<!-- Modernist · Progress Bar -->
<div class="w-full max-w-sm space-y-2">
  <div class="flex justify-between font-mono text-xs font-bold uppercase">
    <span class="text-[#2B2B2B]">FURNITURE ASSEMBLY</span>
    <span class="text-[#C85A32]">82%</span>
  </div>
  <div class="h-3 w-full border border-[#2B2B2B] bg-[#F4F0EA] p-0.5">
    <div class="h-full bg-[#C85A32] w-[82%]"></div>
  </div>
</div>`;
  },

  avatar: () => {
    return `<!-- Modernist · Avatar -->
<div class="flex items-center gap-3">
  <div class="w-10 h-10 bg-[#C85A32] text-white flex items-center justify-center font-mono font-bold text-sm border border-[#2B2B2B]">
    CE
  </div>
  <div>
    <p class="font-bold text-xs uppercase text-[#2B2B2B]">CHARLES EAMES</p>
    <p class="font-mono text-[10px] text-[#556B2F] uppercase font-bold">INDUSTRIAL DESIGNER</p>
  </div>
</div>`;
  },
};
