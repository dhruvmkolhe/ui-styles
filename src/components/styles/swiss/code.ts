import type { Mode } from "@/lib/styles/types";
import { swiss } from "./kit";

const SV = {
  arrow: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>`,
  x: `<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
  chevron: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>`,
  check: `<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>`,
};

export const swissCode: Record<string, (mode: Mode) => string> = {
  button: (m) => {
    const k = swiss(m);
    return `<!-- Swiss Style · Button (Primary & Outline) -->
<div class="flex flex-wrap gap-4 items-center">
  <button class="${k.btnPrimary}">
    <span>01 // INITIALIZE GRID</span>
    ${SV.arrow}
  </button>
  <button class="${k.btnSecondary}">
    <span>EXPORT SPEC</span>
  </button>
</div>`;
  },

  card: (m) => {
    const k = swiss(m);
    return `<!-- Swiss Style · Card (Strict 12-col layout) -->
<div class="${k.panel} w-full max-w-sm p-6 space-y-4">
  <div class="flex items-center justify-between border-b ${m === 'dark' ? 'border-neutral-800' : 'border-neutral-900'} pb-3">
    <span class="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E30613]">SEC-04 / EXHIBIT</span>
    <span class="${k.badgeOutline}">ZÜRICH 1957</span>
  </div>
  <h3 class="text-xl font-black uppercase tracking-tighter leading-none">NEUE GRAFIK</h3>
  <p class="${k.muted} text-xs leading-relaxed font-sans">
    Objective typography, asymmetric grid systems, and rational design principles for clarity.
  </p>
  <div class="pt-2 flex items-center justify-between">
    <button class="${k.btnPrimarySm}">
      <span>READ ARCHIVE</span>
      ${SV.arrow}
    </button>
    <span class="font-mono text-[10px] text-neutral-400">VOL. 12</span>
  </div>
</div>`;
  },

  navbar: (m) => {
    const k = swiss(m);
    return `<!-- Swiss Style · Navbar -->
<header class="${k.bar} flex items-center justify-between px-6 py-4">
  <div class="flex items-center gap-3">
    <span class="h-3 w-3 bg-[#E30613] inline-block"></span>
    <a href="#" class="font-black text-sm uppercase tracking-tighter">HELVETICA ARCHIVE</a>
  </div>

  <nav class="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest">
    <a href="#" class="${k.text} hover:text-[#E30613] transition-colors">01. PRINCIPLES</a>
    <a href="#" class="${k.muted} hover:text-[#E30613] transition-colors">02. GRID</a>
    <a href="#" class="${k.muted} hover:text-[#E30613] transition-colors">03. POSTERS</a>
  </nav>

  <button class="${k.btnPrimarySm}">CONTACT</button>
</header>`;
  },

  input: (m) => {
    const k = swiss(m);
    return `<!-- Swiss Style · Input Field -->
<div class="w-full max-w-sm space-y-1.5">
  <label class="${k.label}">01. REGISTRATION EMAIL</label>
  <input type="email" placeholder="ARCHIVE@DESIGN.CH" class="${k.input}" />
  <p class="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">REQUIRES VALID INSTITUTIONAL DOMAIN</p>
</div>`;
  },

  badge: (m) => {
    const k = swiss(m);
    return `<!-- Swiss Style · Badges & Tags -->
<div class="flex flex-wrap items-center gap-3">
  <span class="${k.badge}">SWISS RED</span>
  <span class="${k.badgeOutline}">GRID ALIGNED</span>
  <span class="inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase bg-neutral-900 text-white rounded-none">
    HELVETICA 65
  </span>
</div>`;
  },

  modal: (m) => {
    const k = swiss(m);
    return `<!-- Swiss Style · Modal Dialog -->
<div class="${k.panel} w-full max-w-md p-6 space-y-5">
  <div class="flex items-center justify-between border-b ${m === 'dark' ? 'border-neutral-800' : 'border-neutral-900'} pb-3">
    <div class="flex items-center gap-2">
      <span class="h-2 w-2 bg-[#E30613]"></span>
      <span class="text-xs font-mono font-bold uppercase tracking-widest">SYS // WARNING 004</span>
    </div>
    <button class="${k.muted} hover:text-[#E30613]">${SV.x}</button>
  </div>
  <h3 class="text-lg font-black uppercase tracking-tighter">CONFIRM GRID OVERWRITE?</h3>
  <p class="${k.muted} text-xs leading-relaxed font-sans">
    This action will reset all layout parameters to the standardized 12-column Swiss grid system.
  </p>
  <div class="flex justify-end gap-3 pt-2">
    <button class="${k.btnSecondary}">CANCEL</button>
    <button class="${k.btnPrimary}">CONFIRM OVERWRITE</button>
  </div>
</div>`;
  },

  accordion: (m) => {
    const k = swiss(m);
    return `<!-- Swiss Style · Accordion -->
<div class="${k.panel} w-full max-w-md divide-y ${m === 'dark' ? 'divide-neutral-800' : 'divide-neutral-900'}">
  <div class="p-4">
    <button class="w-full flex items-center justify-between text-left font-mono text-xs font-bold uppercase tracking-wider">
      <span>01 // WHAT IS SWISS DESIGN?</span>
      <span class="text-[#E30613] font-bold">-</span>
    </button>
    <p class="mt-3 ${k.muted} text-xs leading-relaxed font-sans">
      Developed in Switzerland in the 1950s, emphasizing cleanliness, readability, and objectivity.
    </p>
  </div>
  <div class="p-4">
    <button class="w-full flex items-center justify-between text-left font-mono text-xs font-bold uppercase tracking-wider ${k.muted}">
      <span>02 // KEY CHARACTERISTICS</span>
      <span class="font-bold">+</span>
    </button>
  </div>
</div>`;
  },

  tooltip: () => {
    return `<!-- Swiss Style · Tooltip -->
<div class="relative inline-block">
  <div class="bg-[#E30613] text-white px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest rounded-none shadow-none">
    SPEC-GRID: 12-COL
  </div>
</div>`;
  },

  tabs: (m) => {
    const k = swiss(m);
    return `<!-- Swiss Style · Tabs -->
<div class="flex border-b ${m === 'dark' ? 'border-neutral-800' : 'border-neutral-900'} w-full max-w-md">
  <button class="px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-widest bg-[#E30613] text-white rounded-none">
    01. OVERVIEW
  </button>
  <button class="px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-widest ${k.muted} hover:text-foreground rounded-none">
    02. STRUCTURE
  </button>
  <button class="px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-widest ${k.muted} hover:text-foreground rounded-none">
    03. ARCHIVE
  </button>
</div>`;
  },

  dropdown: (m) => {
    const k = swiss(m);
    return `<!-- Swiss Style · Dropdown Menu -->
<div class="${k.panel} w-56 p-0 divide-y ${m === 'dark' ? 'divide-neutral-800' : 'divide-neutral-900'} font-mono text-xs uppercase tracking-wider">
  <div class="p-3 bg-[#E30613] text-white font-bold flex justify-between items-center">
    <span>SELECT TYPEFACE</span>
    <span>↓</span>
  </div>
  <a href="#" class="block p-3 hover:bg-neutral-800 hover:text-white transition-colors">HELVETICA BOLD</a>
  <a href="#" class="block p-3 hover:bg-neutral-800 hover:text-white transition-colors">UNIVERS 57</a>
  <a href="#" class="block p-3 hover:bg-neutral-800 hover:text-white transition-colors">AKZIDENZ GROTESK</a>
</div>`;
  },

  switch: (m) => {
    return `<!-- Swiss Style · Toggle Switch -->
<div class="flex items-center gap-4">
  <button class="w-12 h-6 border ${m === 'dark' ? 'border-neutral-700 bg-neutral-900' : 'border-neutral-900 bg-white'} relative p-0.5 rounded-none">
    <div class="w-5 h-4.5 bg-[#E30613] rounded-none"></div>
  </button>
  <span class="font-mono text-xs font-bold uppercase tracking-widest">GRID ALIGNMENT: ON</span>
</div>`;
  },

  skeleton: (m) => {
    const k = swiss(m);
    return `<!-- Swiss Style · Skeleton Loader -->
<div class="${k.panel} w-full max-w-sm p-6 space-y-4">
  <div class="h-4 bg-[#E30613] animate-pulse w-1/3 rounded-none"></div>
  <div class="h-8 ${m === 'dark' ? 'bg-neutral-800' : 'bg-neutral-200'} animate-pulse w-3/4 rounded-none"></div>
  <div class="space-y-2">
    <div class="h-3 ${m === 'dark' ? 'bg-neutral-800' : 'bg-neutral-200'} animate-pulse w-full rounded-none"></div>
    <div class="h-3 ${m === 'dark' ? 'bg-neutral-800' : 'bg-neutral-200'} animate-pulse w-5/6 rounded-none"></div>
  </div>
</div>`;
  },

  toast: (m) => {
    const k = swiss(m);
    return `<!-- Swiss Style · Notification Toast -->
<div class="${k.panel} w-full max-w-sm p-4 border-l-4 border-l-[#E30613] flex items-start gap-3">
  <span class="h-3 w-3 bg-[#E30613] mt-0.5 flex-shrink-0"></span>
  <div class="space-y-1">
    <p class="font-mono text-xs font-bold uppercase tracking-widest">SYSTEM ALERT // 200 OK</p>
    <p class="${k.muted} text-xs font-sans">Layout specifications successfully deployed to master grid.</p>
  </div>
</div>`;
  },

  progress: (m) => {
    return `<!-- Swiss Style · Progress Bar -->
<div class="w-full max-w-sm space-y-2">
  <div class="flex justify-between font-mono text-[10px] uppercase font-bold tracking-widest">
    <span>SYSTEM LOADING</span>
    <span class="text-[#E30613]">75%</span>
  </div>
  <div class="h-3 w-full border ${m === 'dark' ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-900 bg-neutral-100'} p-0.5 rounded-none">
    <div class="h-full bg-[#E30613] w-3/4 rounded-none"></div>
  </div>
</div>`;
  },

  avatar: () => {
    return `<!-- Swiss Style · Avatar -->
<div class="flex items-center gap-3">
  <div class="w-10 h-10 bg-[#E30613] text-white flex items-center justify-center font-mono font-black text-sm rounded-none border border-neutral-900">
    CH
  </div>
  <div>
    <p class="font-bold text-xs uppercase tracking-tight">MAX MIEDINGER</p>
    <p class="font-mono text-[10px] text-neutral-500 uppercase">TYPOGRAPHER / ZÜRICH</p>
  </div>
</div>`;
  },
};
