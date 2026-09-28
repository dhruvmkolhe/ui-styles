import type { Mode } from "@/lib/styles/types";
import { editorial } from "./kit";

const SV = {
  arrow: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"/></svg>`,
  x: `<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
  chevron: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg>`,
};

export const editorialCode: Record<string, (mode: Mode) => string> = {
  button: (m) => {
    const k = editorial(m);
    return `<!-- Editorial · Button (Primary & Secondary) -->
<div class="flex flex-wrap gap-4 items-center">
  <button class="${k.btnPrimary}">
    <span>Read Full Essay</span>
    ${SV.arrow}
  </button>
  <button class="${k.btnSecondary}">
    <span>Subscribe to Edition</span>
  </button>
</div>`;
  },

  card: (m) => {
    const k = editorial(m);
    return `<!-- Editorial · Article Card -->
<div class="${k.panel} w-full max-w-md space-y-4">
  <div class="flex items-center justify-between border-b ${m === 'dark' ? 'border-[#44403C]' : 'border-[#D6D3D1]'} pb-2">
    <span class="font-mono text-xs text-[#78716C]">ISSUE № 42 — ESSAY</span>
    <span class="${k.badge}">12 MIN READ</span>
  </div>
  <h3 class="font-serif text-2xl leading-tight">The Architecture of Silence</h3>
  <p class="${k.muted} font-serif text-sm leading-relaxed italic">
    “In an age of relentless notification, quietude becomes the ultimate subversive aesthetic.”
  </p>
  <div class="pt-2 flex items-center justify-between border-t ${m === 'dark' ? 'border-[#44403C]' : 'border-[#D6D3D1]'}">
    <span class="font-serif text-xs text-[#78716C]">By Julian Vance</span>
    <button class="${k.btnPrimarySm}">
      <span>Continue</span>
      ${SV.arrow}
    </button>
  </div>
</div>`;
  },

  navbar: (m) => {
    const k = editorial(m);
    return `<!-- Editorial · Header / Masthead -->
<header class="${k.bar} px-6 py-5 w-full">
  <div class="flex items-center justify-between border-b ${m === 'dark' ? 'border-[#44403C]' : 'border-[#D6D3D1]'} pb-4">
    <span class="font-mono text-xs uppercase tracking-widest text-[#78716C]">EST. 1924</span>
    <a href="#" class="font-serif text-2xl font-bold tracking-tight">THE CHRONICLE</a>
    <span class="font-mono text-xs uppercase tracking-widest text-[#78716C]">VOL. IV</span>
  </div>
  <nav class="flex items-center justify-center gap-8 pt-3 font-serif text-xs uppercase tracking-widest">
    <a href="#" class="${k.text} underline underline-offset-4">Essays</a>
    <a href="#" class="${k.muted} hover:text-foreground">Criticism</a>
    <a href="#" class="${k.muted} hover:text-foreground">Dispatch</a>
    <a href="#" class="${k.muted} hover:text-foreground">Archive</a>
  </nav>
</header>`;
  },

  input: (m) => {
    const k = editorial(m);
    return `<!-- Editorial · Input Field -->
<div class="w-full max-w-sm space-y-2">
  <label class="${k.label}">SUBSCRIBE TO THE WEEKLY DISPATCH</label>
  <input type="email" placeholder="reader@journal.org" class="${k.input}" />
  <p class="font-serif italic text-xs text-[#78716C]">Delivered every Sunday dawn. No spam.</p>
</div>`;
  },

  badge: (m) => {
    const k = editorial(m);
    return `<!-- Editorial · Badges -->
<div class="flex flex-wrap items-center gap-3">
  <span class="${k.badge}">Editor's Choice</span>
  <span class="${k.badgeOutline}">Volume 04</span>
  <span class="font-serif text-xs italic underline text-[#78716C]">Longform</span>
</div>`;
  },

  modal: (m) => {
    const k = editorial(m);
    return `<!-- Editorial · Modal Dialog -->
<div class="${k.panel} w-full max-w-md space-y-5">
  <div class="flex items-center justify-between border-b ${m === 'dark' ? 'border-[#44403C]' : 'border-[#D6D3D1]'} pb-3">
    <span class="font-mono text-xs uppercase tracking-widest text-[#78716C]">MEMBERSHIP INVITATION</span>
    <button class="${k.muted} hover:text-foreground">${SV.x}</button>
  </div>
  <h3 class="font-serif text-xl font-normal leading-snug">Support Independent Longform Journalism</h3>
  <p class="${k.muted} font-serif text-sm leading-relaxed">
    Gain unlimited access to our entire historical archive dating back to 1924, plus print editions delivered bi-monthly.
  </p>
  <div class="flex justify-end gap-3 pt-2">
    <button class="${k.btnSecondary}">Dismiss</button>
    <button class="${k.btnPrimary}">Join the Society</button>
  </div>
</div>`;
  },

  accordion: (m) => {
    const k = editorial(m);
    return `<!-- Editorial · Accordion -->
<div class="${k.panel} w-full max-w-md divide-y ${m === 'dark' ? 'divide-[#44403C]' : 'divide-[#D6D3D1]'} p-0">
  <div class="p-4">
    <button class="w-full flex items-center justify-between text-left font-serif text-sm font-semibold">
      <span>What is the editorial philosophy?</span>
      <span class="font-serif italic text-xs text-[#78716C]">Collapse</span>
    </button>
    <p class="mt-2 ${k.muted} font-serif text-xs leading-relaxed">
      We believe in deep reading, meticulous fact-checking, and timeless typography that respects the reader's attention.
    </p>
  </div>
  <div class="p-4">
    <button class="w-full flex items-center justify-between text-left font-serif text-sm ${k.muted}">
      <span>How are submissions reviewed?</span>
      <span class="font-serif italic text-xs">+</span>
    </button>
  </div>
</div>`;
  },

  tooltip: () => {
    return `<!-- Editorial · Tooltip -->
<div class="relative inline-block">
  <div class="border border-[#1C1917] bg-[#FAF7F2] text-[#1C1917] px-3 py-1 font-serif text-xs italic">
    Citation: Vol III, pp. 45–52
  </div>
</div>`;
  },

  tabs: (m) => {
    const k = editorial(m);
    return `<!-- Editorial · Tabs -->
<div class="flex border-b ${m === 'dark' ? 'border-[#44403C]' : 'border-[#D6D3D1]'} w-full max-w-md font-serif text-sm">
  <button class="px-4 py-2 border-b-2 border-[#1C1917] font-semibold">
    Curated
  </button>
  <button class="px-4 py-2 ${k.muted} hover:text-foreground">
    Archive
  </button>
  <button class="px-4 py-2 ${k.muted} hover:text-foreground">
    Correspondence
  </button>
</div>`;
  },

  dropdown: (m) => {
    const k = editorial(m);
    return `<!-- Editorial · Dropdown -->
<div class="${k.panel} w-56 p-2 space-y-1 font-serif text-sm">
  <div class="px-3 py-1.5 font-mono text-[10px] text-[#78716C] uppercase tracking-widest border-b ${m === 'dark' ? 'border-[#44403C]' : 'border-[#D6D3D1]'}">
    Filter by Genre
  </div>
  <a href="#" class="block px-3 py-1.5 hover:bg-[#FAF7F2] hover:text-[#1C1917] italic transition-colors">Cultural Criticism</a>
  <a href="#" class="block px-3 py-1.5 hover:bg-[#FAF7F2] hover:text-[#1C1917] italic transition-colors">Historical Fiction</a>
  <a href="#" class="block px-3 py-1.5 hover:bg-[#FAF7F2] hover:text-[#1C1917] italic transition-colors">Philosophical Essays</a>
</div>`;
  },

  switch: () => {
    return `<!-- Editorial · Switch -->
<div class="flex items-center gap-3">
  <button class="w-10 h-5 border border-[#1C1917] bg-[#FAF7F2] relative p-0.5 rounded-none">
    <div class="w-4 h-3.5 bg-[#1C1917]"></div>
  </button>
  <span class="font-serif text-xs italic">Serif Typography Mode</span>
</div>`;
  },

  skeleton: (m) => {
    const k = editorial(m);
    return `<!-- Editorial · Skeleton Loader -->
<div class="${k.panel} w-full max-w-md space-y-4">
  <div class="h-3 bg-[#D6D3D1] animate-pulse w-1/4"></div>
  <div class="h-6 bg-[#D6D3D1] animate-pulse w-3/4"></div>
  <div class="space-y-2">
    <div class="h-3 bg-[#E7E5E4] animate-pulse w-full"></div>
    <div class="h-3 bg-[#E7E5E4] animate-pulse w-5/6"></div>
  </div>
</div>`;
  },

  toast: (m) => {
    const k = editorial(m);
    return `<!-- Editorial · Toast -->
<div class="${k.panel} w-full max-w-sm p-4 border-l-2 border-l-[#1C1917] space-y-1">
  <p class="font-mono text-[10px] uppercase tracking-widest text-[#78716C]">DISPATCH SENT</p>
  <p class="${k.text} font-serif text-xs italic">Your article has been saved to your personal reading list.</p>
</div>`;
  },

  progress: () => {
    return `<!-- Editorial · Progress Bar -->
<div class="w-full max-w-sm space-y-1.5">
  <div class="flex justify-between font-serif text-xs italic">
    <span>Reading Progress</span>
    <span>65%</span>
  </div>
  <div class="h-1 w-full bg-[#E7E5E4]">
    <div class="h-full bg-[#1C1917] w-2/3"></div>
  </div>
</div>`;
  },

  avatar: () => {
    return `<!-- Editorial · Author Avatar -->
<div class="flex items-center gap-3">
  <div class="w-10 h-10 border border-[#1C1917] bg-[#FAF7F2] text-[#1C1917] font-serif italic text-lg flex items-center justify-center">
    JV
  </div>
  <div>
    <p class="font-serif text-sm font-semibold">Julian Vance</p>
    <p class="font-serif text-xs italic text-[#78716C]">Senior Editor</p>
  </div>
</div>`;
  },
};
