import type { Mode } from "@/lib/styles/types";
import { neoGeo } from "./kit";

const SV = {
  arrow: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>`,
  x: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
};

export const neoGeoCode: Record<string, (mode: Mode) => string> = {
  button: (m) => {
    const k = neoGeo(m);
    return `<!-- Neo-Geo · Electric Buttons -->
<div class="flex flex-wrap gap-4 items-center">
  <button class="${k.btnPrimary}">
    <span>ELECTRIC PURPLE</span>
    ${SV.arrow}
  </button>
  <button class="${k.btnSecondary}">
    <span>YELLOW BLOCK</span>
  </button>
</div>`;
  },

  card: (m) => {
    const k = neoGeo(m);
    return `<!-- Neo-Geo · Multi-Color Card -->
<div class="${k.panel} w-full max-w-md space-y-4">
  <div class="flex items-center justify-between border-b-2 ${m === 'dark' ? 'border-[#00F0FF]' : 'border-[#8A2BE2]'} pb-3">
    <div class="flex items-center gap-2">
      <span class="w-3 h-3 bg-[#8A2BE2] inline-block"></span>
      <span class="w-3 h-3 bg-[#00F0FF] inline-block"></span>
      <span class="w-3 h-3 bg-[#FFD700] inline-block"></span>
    </div>
    <span class="${k.badge}">NEO-GEO</span>
  </div>
  <h3 class="${k.heading} text-2xl leading-none">POST-MODERN GEOMETRY</h3>
  <p class="${k.muted} font-mono text-xs leading-relaxed uppercase">
    Electric purple, neon cyan, lemon yellow, and coral pink juxtaposed inside sharp offset containers.
  </p>
  <div class="pt-2 flex items-center justify-between">
    <span class="font-mono text-[10px] text-[#FFD700] font-bold">GRID MULTI-COLOR</span>
    <button class="${k.btnPrimarySm}">
      <span>EXPLORE</span>
      ${SV.arrow}
    </button>
  </div>
</div>`;
  },

  navbar: (m) => {
    const k = neoGeo(m);
    return `<!-- Neo-Geo · Navbar -->
<header class="${k.bar} flex items-center justify-between px-6 py-4 w-full">
  <div class="flex items-center gap-3">
    <div class="w-4 h-4 bg-[#FFD700] border border-black rotate-45"></div>
    <a href="#" class="font-black text-sm uppercase tracking-wider text-[#00F0FF]">NEO_GEO_</a>
  </div>

  <nav class="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest font-black">
    <a href="#" class="text-[#FFD700] underline decoration-2 underline-offset-4">01. BLOCKS</a>
    <a href="#" class="${k.muted} hover:text-[#00F0FF]">02. ANGLES</a>
    <a href="#" class="${k.muted} hover:text-[#00F0FF]">03. COLOR</a>
  </nav>

  <button class="${k.btnPrimarySm}">ENTER MATRIX</button>
</header>`;
  },

  input: (m) => {
    const k = neoGeo(m);
    return `<!-- Neo-Geo · Form Input -->
<div class="w-full max-w-sm space-y-1.5">
  <label class="${k.label}">01 // INPUT GEOMETRIC CODE</label>
  <input type="text" placeholder="GEO-PURPLE-800" class="${k.input}" />
  <p class="font-mono text-[10px] text-[#FF6B6B] font-bold">ELECTRIC COLOR OVERLAY</p>
</div>`;
  },

  badge: (m) => {
    const k = neoGeo(m);
    return `<!-- Neo-Geo · Badges -->
<div class="flex flex-wrap items-center gap-3">
  <span class="${k.badge}">CORAL PINK</span>
  <span class="${k.badgeOutline}">NEON CYAN</span>
  <span class="inline-flex items-center px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest bg-[#FFD700] text-[#140029] border border-black">
    LEMON YELLOW
  </span>
</div>`;
  },

  modal: (m) => {
    const k = neoGeo(m);
    return `<!-- Neo-Geo · Modal -->
<div class="${k.panel} w-full max-w-md space-y-5">
  <div class="flex items-center justify-between border-b-2 ${m === 'dark' ? 'border-[#00F0FF]' : 'border-[#8A2BE2]'} pb-3">
    <span class="font-mono text-xs font-bold text-[#FFD700]">POST-MODERN ALERT #07</span>
    <button class="${k.muted} hover:text-[#FF6B6B]">${SV.x}</button>
  </div>
  <h3 class="${k.heading} text-xl">INITIALIZE GEOMETRIC SWAP?</h3>
  <p class="${k.muted} font-mono text-xs leading-relaxed uppercase">
    All layout containers will be reconfigured into asymmetric electric color blocks.
  </p>
  <div class="flex justify-end gap-3 pt-2">
    <button class="${k.btnSecondary}">CANCEL</button>
    <button class="${k.btnPrimary}">CONFIRM SWAP</button>
  </div>
</div>`;
  },

  accordion: (m) => {
    const k = neoGeo(m);
    return `<!-- Neo-Geo · Accordion -->
<div class="${k.panel} w-full max-w-md divide-y-2 ${m === 'dark' ? 'divide-[#00F0FF]' : 'divide-[#8A2BE2]'} p-0">
  <div class="p-4">
    <button class="w-full flex items-center justify-between text-left font-mono text-xs font-black uppercase tracking-wider text-[#FFD700]">
      <span>01 // WHAT IS NEO-GEO ART?</span>
      <span class="font-black">-</span>
    </button>
    <p class="mt-3 ${k.muted} font-mono text-xs leading-relaxed uppercase">
      Short for Neo-Geometric Conceptualism, an 80s art movement focused on geometric abstraction and commercial pop color.
    </p>
  </div>
  <div class="p-4">
    <button class="w-full flex items-center justify-between text-left font-mono text-xs font-black uppercase tracking-wider ${k.muted}">
      <span>02 // POP COLOR JUXTAPOSITION</span>
      <span class="font-black">+</span>
    </button>
  </div>
</div>`;
  },

  tooltip: () => {
    return `<!-- Neo-Geo · Tooltip -->
<div class="relative inline-block">
  <div class="bg-[#FFD700] text-[#140029] border-2 border-black px-3 py-1 font-mono text-[10px] font-black uppercase tracking-widest shadow-[2px_2px_0_#8A2BE2]">
    BLOCK: PURPLE-CYAN-1986
  </div>
</div>`;
  },

  tabs: (m) => {
    const k = neoGeo(m);
    return `<!-- Neo-Geo · Tabs -->
<div class="flex border-b-2 ${m === 'dark' ? 'border-[#00F0FF]' : 'border-[#8A2BE2]'} w-full max-w-md font-mono text-xs">
  <button class="px-5 py-2.5 bg-[#8A2BE2] text-white font-black tracking-wider border-r-2 border-black">
    01. PURPLE
  </button>
  <button class="px-5 py-2.5 bg-[#00F0FF] text-[#140029] font-black tracking-wider border-r-2 border-black">
    02. CYAN
  </button>
  <button class="px-5 py-2.5 ${k.muted} font-black tracking-wider">
    03. YELLOW
  </button>
</div>`;
  },

  dropdown: (m) => {
    const k = neoGeo(m);
    return `<!-- Neo-Geo · Dropdown -->
<div class="${k.panel} w-56 p-0 divide-y-2 ${m === 'dark' ? 'divide-[#00F0FF]' : 'divide-[#8A2BE2]'} font-mono text-xs uppercase tracking-wider">
  <div class="p-3 bg-[#8A2BE2] text-white font-black flex justify-between items-center">
    <span>SELECT MATRIX</span>
    <span>▼</span>
  </div>
  <a href="#" class="block p-3 text-[#00F0FF] hover:bg-[#00F0FF] hover:text-[#140029] transition-colors">ELECTRIC PURPLE</a>
  <a href="#" class="block p-3 text-[#FFD700] hover:bg-[#FFD700] hover:text-[#140029] transition-colors">LEMON YELLOW</a>
  <a href="#" class="block p-3 text-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-white transition-colors">CORAL PINK</a>
</div>`;
  },

  switch: () => {
    return `<!-- Neo-Geo · Switch -->
<div class="flex items-center gap-4">
  <button class="w-12 h-6 border-2 border-black bg-[#00F0FF] relative p-0.5 rounded-none shadow-[2px_2px_0_#FFD700]">
    <div class="w-5 h-4.5 bg-[#8A2BE2] rounded-none"></div>
  </button>
  <span class="font-mono text-xs font-black text-[#FFD700] tracking-widest">ELECTRIC GRID: ACTIVE</span>
</div>`;
  },

  skeleton: (m) => {
    const k = neoGeo(m);
    return `<!-- Neo-Geo · Skeleton -->
<div class="${k.panel} w-full max-w-sm p-6 space-y-4">
  <div class="h-4 bg-[#8A2BE2] animate-pulse w-1/3"></div>
  <div class="h-8 bg-[#00F0FF] animate-pulse w-3/4 border-2 border-black"></div>
  <div class="space-y-2">
    <div class="h-3 bg-[#FFD700]/40 animate-pulse w-full"></div>
    <div class="h-3 bg-[#FFD700]/40 animate-pulse w-5/6"></div>
  </div>
</div>`;
  },

  toast: (m) => {
    const k = neoGeo(m);
    return `<!-- Neo-Geo · Toast -->
<div class="${k.panel} w-full max-w-sm p-4 border-l-8 border-l-[#8A2BE2] flex items-start gap-3">
  <div class="w-3 h-3 bg-[#FFD700] border border-black mt-0.5 flex-shrink-0"></div>
  <div class="space-y-1">
    <p class="font-mono text-xs font-black text-[#00F0FF]">GEOMETRY SYNCHRONIZED</p>
    <p class="${k.muted} font-mono text-xs uppercase">Post-modern palette loaded to grid.</p>
  </div>
</div>`;
  },

  progress: () => {
    return `<!-- Neo-Geo · Progress Bar -->
<div class="w-full max-w-sm space-y-2">
  <div class="flex justify-between font-mono text-xs font-black uppercase">
    <span class="text-[#00F0FF]">MATRIX LOADING</span>
    <span class="text-[#FFD700]">92%</span>
  </div>
  <div class="h-4 w-full border-2 border-black bg-[#140029] p-0.5 shadow-[2px_2px_0_#00F0FF]">
    <div class="h-full bg-gradient-to-r from-[#8A2BE2] via-[#00F0FF] to-[#FFD700] w-[92%]"></div>
  </div>
</div>`;
  },

  avatar: () => {
    return `<!-- Neo-Geo · Avatar -->
<div class="flex items-center gap-3">
  <div class="w-10 h-10 bg-[#8A2BE2] text-[#FFD700] border-2 border-[#00F0FF] flex items-center justify-center font-mono font-black text-sm shadow-[2px_2px_0_#FF6B6B]">
    NG
  </div>
  <div>
    <p class="font-black text-xs uppercase text-[#00F0FF]">PETER HALLEY</p>
    <p class="font-mono text-[10px] text-[#FFD700] uppercase font-bold">NEO-GEO ARTIST</p>
  </div>
</div>`;
  },
};
