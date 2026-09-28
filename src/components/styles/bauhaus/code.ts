import type { Mode } from "@/lib/styles/types";
import { bauhaus } from "./kit";

const SV = {
  arrow: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>`,
  x: `<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
  shape: `<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>`,
};

export const bauhausCode: Record<string, (mode: Mode) => string> = {
  button: (m) => {
    const k = bauhaus(m);
    return `<!-- Bauhaus · Primary Action Buttons -->
<div class="flex flex-wrap gap-4 items-center">
  <button class="${k.btnPrimary}">
    <span>FORM FOLLOWS FUNCTION</span>
    ${SV.arrow}
  </button>
  <button class="${k.btnSecondary}">
    <span>GEOMETRIC SPEC</span>
  </button>
</div>`;
  },

  card: (m) => {
    const k = bauhaus(m);
    return `<!-- Bauhaus · Geometric Card -->
<div class="${k.panel} w-full max-w-md space-y-4">
  <div class="flex items-center justify-between border-b-2 ${m === 'dark' ? 'border-[#F1FAEE]' : 'border-[#1D3557]'} pb-3">
    <div class="flex items-center gap-2">
      <span class="h-3 w-3 rounded-full bg-[#E63946] inline-block"></span>
      <span class="h-3 w-3 bg-[#FFD60A] inline-block"></span>
      <span class="h-3 w-3 bg-[#1D3557] inline-block"></span>
    </div>
    <span class="${k.badge}">WEIMAR 1919</span>
  </div>
  <h3 class="${k.heading} text-2xl leading-none">THE DESSAU MANIFESTO</h3>
  <p class="${k.muted} font-sans text-xs leading-relaxed uppercase">
    A radical unification of art, craft, and technology. Universal principles of geometric proportion and primary color balance.
  </p>
  <div class="pt-2 flex items-center justify-between">
    <span class="font-mono text-[10px] text-[#E63946] font-bold">CIRC / TRI / SQ</span>
    <button class="${k.btnPrimarySm}">
      <span>EXHIBIT</span>
      ${SV.arrow}
    </button>
  </div>
</div>`;
  },

  navbar: (m) => {
    const k = bauhaus(m);
    return `<!-- Bauhaus · Navbar -->
<header class="${k.bar} flex items-center justify-between px-6 py-4 w-full">
  <div class="flex items-center gap-3">
    <div class="w-4 h-4 rounded-full bg-[#E63946]"></div>
    <a href="#" class="font-black text-sm uppercase tracking-tighter text-[#1D3557]">BAUHAUS 1919</a>
  </div>

  <nav class="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest font-bold">
    <a href="#" class="text-[#E63946] underline decoration-2 underline-offset-4">01. ART</a>
    <a href="#" class="${k.muted} hover:text-[#E63946]">02. CRAFT</a>
    <a href="#" class="${k.muted} hover:text-[#E63946]">03. TECH</a>
  </nav>

  <button class="${k.btnPrimarySm}">JOIN ARCHIVE</button>
</header>`;
  },

  input: (m) => {
    const k = bauhaus(m);
    return `<!-- Bauhaus · Form Input -->
<div class="w-full max-w-sm space-y-1.5">
  <label class="${k.label}">01 // REGISTER STUDENT DISCIPLINE</label>
  <input type="text" placeholder="ARCHITECTURE & DESIGN" class="${k.input}" />
  <p class="font-mono text-[10px] text-[#E63946] font-bold">PRIMARY COLOR CODING ENFORCED</p>
</div>`;
  },

  badge: (m) => {
    const k = bauhaus(m);
    return `<!-- Bauhaus · Badges & Tags -->
<div class="flex flex-wrap items-center gap-3">
  <span class="${k.badge}">PRIMARY RED</span>
  <span class="${k.badgeOutline}">YELLOW CIRCLE</span>
  <span class="inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-[#1D3557] text-white border border-black">
    BLUE TRIANGLE
  </span>
</div>`;
  },

  modal: (m) => {
    const k = bauhaus(m);
    return `<!-- Bauhaus · Geometric Modal -->
<div class="${k.panel} w-full max-w-md space-y-5">
  <div class="flex items-center justify-between border-b-2 ${m === 'dark' ? 'border-[#F1FAEE]' : 'border-[#1D3557]'} pb-3">
    <span class="font-mono text-xs font-bold text-[#E63946]">EXHIBITION PROPOSAL #04</span>
    <button class="${k.muted} hover:text-[#E63946]">${SV.x}</button>
  </div>
  <h3 class="${k.heading} text-xl">RESET ALL DECORATIVE ELEMENTS?</h3>
  <p class="${k.muted} font-sans text-xs leading-relaxed uppercase">
    Eliminate unnecessary ornamentation. All components will revert to raw primary colors and geometric primitives.
  </p>
  <div class="flex justify-end gap-3 pt-2">
    <button class="${k.btnSecondary}">CANCEL</button>
    <button class="${k.btnPrimary}">CONFIRM RESET</button>
  </div>
</div>`;
  },

  accordion: (m) => {
    const k = bauhaus(m);
    return `<!-- Bauhaus · Accordion -->
<div class="${k.panel} w-full max-w-md divide-y-2 ${m === 'dark' ? 'divide-[#F1FAEE]' : 'divide-[#1D3557]'} p-0">
  <div class="p-4">
    <button class="w-full flex items-center justify-between text-left font-sans text-xs font-bold uppercase tracking-wider text-[#E63946]">
      <span>01 // WHAT IS THE BAUHAUS MOVEMENT?</span>
      <span class="font-black">-</span>
    </button>
    <p class="mt-3 ${k.muted} font-sans text-xs leading-relaxed uppercase">
      Founded in Weimar in 1919 by Walter Gropius, combining fine arts with functional craft design.
    </p>
  </div>
  <div class="p-4">
    <button class="w-full flex items-center justify-between text-left font-sans text-xs font-bold uppercase tracking-wider ${k.muted}">
      <span>02 // THE THREE PRIMARY SHAPES</span>
      <span class="font-black">+</span>
    </button>
  </div>
</div>`;
  },

  tooltip: () => {
    return `<!-- Bauhaus · Tooltip -->
<div class="relative inline-block">
  <div class="bg-[#FFD60A] text-[#1D3557] border-2 border-[#1D3557] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest">
    SHAPE: CIRCLE-RED-1919
  </div>
</div>`;
  },

  tabs: (m) => {
    const k = bauhaus(m);
    return `<!-- Bauhaus · Tabs -->
<div class="flex border-b-2 ${m === 'dark' ? 'border-[#F1FAEE]' : 'border-[#1D3557]'} w-full max-w-md font-mono text-xs">
  <button class="px-5 py-2.5 bg-[#E63946] text-white font-bold tracking-wider border-r-2 border-[#1D3557]">
    01. RED
  </button>
  <button class="px-5 py-2.5 bg-[#FFD60A] text-[#1D3557] font-bold tracking-wider border-r-2 border-[#1D3557]">
    02. YELLOW
  </button>
  <button class="px-5 py-2.5 ${k.muted} font-bold tracking-wider">
    03. BLUE
  </button>
</div>`;
  },

  dropdown: (m) => {
    const k = bauhaus(m);
    return `<!-- Bauhaus · Dropdown -->
<div class="${k.panel} w-56 p-0 divide-y-2 ${m === 'dark' ? 'divide-[#F1FAEE]' : 'divide-[#1D3557]'} font-mono text-xs uppercase tracking-wider">
  <div class="p-3 bg-[#1D3557] text-white font-bold flex justify-between items-center">
    <span>SELECT MASTERS</span>
    <span>▼</span>
  </div>
  <a href="#" class="block p-3 hover:bg-[#E63946] hover:text-white transition-colors">WALTER GROPIUS</a>
  <a href="#" class="block p-3 hover:bg-[#FFD60A] hover:text-[#1D3557] transition-colors">WASSILY KANDINSKY</a>
  <a href="#" class="block p-3 hover:bg-[#1D3557] hover:text-white transition-colors">PAUL KLEE</a>
</div>`;
  },

  switch: () => {
    return `<!-- Bauhaus · Switch -->
<div class="flex items-center gap-4">
  <button class="w-12 h-6 border-2 border-[#1D3557] bg-white relative p-0.5 rounded-none">
    <div class="w-5 h-4 bg-[#E63946] rounded-none"></div>
  </button>
  <span class="font-mono text-xs font-bold text-[#1D3557]">GEOMETRIC GRID: ACTIVE</span>
</div>`;
  },

  skeleton: (m) => {
    const k = bauhaus(m);
    return `<!-- Bauhaus · Skeleton Loader -->
<div class="${k.panel} w-full max-w-sm p-6 space-y-4">
  <div class="h-4 bg-[#E63946] animate-pulse w-1/3"></div>
  <div class="h-8 bg-[#FFD60A] animate-pulse w-3/4 border-2 border-[#1D3557]"></div>
  <div class="space-y-2">
    <div class="h-3 bg-[#1D3557]/20 animate-pulse w-full"></div>
    <div class="h-3 bg-[#1D3557]/20 animate-pulse w-5/6"></div>
  </div>
</div>`;
  },

  toast: (m) => {
    const k = bauhaus(m);
    return `<!-- Bauhaus · Toast -->
<div class="${k.panel} w-full max-w-sm p-4 border-l-8 border-l-[#E63946] flex items-start gap-3">
  <div class="w-3 h-3 rounded-full bg-[#FFD60A] border border-[#1D3557] mt-0.5 flex-shrink-0"></div>
  <div class="space-y-1">
    <p class="font-mono text-xs font-bold text-[#1D3557]">SPECIFICATION DEPLOYED</p>
    <p class="${k.muted} font-sans text-xs uppercase">Primary color geometry synchronized to canvas.</p>
  </div>
</div>`;
  },

  progress: () => {
    return `<!-- Bauhaus · Progress Bar -->
<div class="w-full max-w-sm space-y-2">
  <div class="flex justify-between font-mono text-xs font-bold uppercase">
    <span class="text-[#1D3557]">CRAFT CONSTRUCTION</span>
    <span class="text-[#E63946]">80%</span>
  </div>
  <div class="h-4 w-full border-2 border-[#1D3557] bg-white p-0.5">
    <div class="h-full bg-[#E63946] w-4/5"></div>
  </div>
</div>`;
  },

  avatar: () => {
    return `<!-- Bauhaus · Avatar -->
<div class="flex items-center gap-3">
  <div class="w-10 h-10 bg-[#E63946] text-white rounded-full flex items-center justify-center font-mono font-bold text-sm border-2 border-[#1D3557]">
    WG
  </div>
  <div>
    <p class="font-bold text-xs uppercase text-[#1D3557]">WALTER GROPIUS</p>
    <p class="font-mono text-[10px] text-[#E63946] uppercase font-bold">FOUNDER / ARCHITECT</p>
  </div>
</div>`;
  },
};
