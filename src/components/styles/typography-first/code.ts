import type { Mode } from "@/lib/styles/types";
import { typographyFirst } from "./kit";

const SV = {
  arrow: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>`,
  x: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
};

export const typographyFirstCode: Record<string, (mode: Mode) => string> = {
  button: (m) => {
    const t = typographyFirst(m);
    return `<!-- Typography First · Buttons -->
<div class="flex flex-wrap gap-4 items-center">
  <button class="${t.btnPrimary}">
    <span>READ ARTICLE</span>
    ${SV.arrow}
  </button>
  <button class="${t.btnSecondary}">
    <span>EXPLORE ARCHIVE</span>
  </button>
</div>`;
  },

  card: (m) => {
    const t = typographyFirst(m);
    return `<!-- Typography First · Editorial Card -->
<div class="${t.panel} w-full max-w-md space-y-4">
  <div class="flex items-center justify-between border-b ${m === 'dark' ? 'border-slate-800' : 'border-slate-200'} pb-3">
    <span class="font-sans text-[10px] uppercase tracking-widest ${t.muted}">ISSUE N° 42 — ESSAY</span>
    <span class="${t.badge}">12 Min Read</span>
  </div>
  <h3 class="${t.heading} text-2xl leading-tight">The Architecture of Written Thought</h3>
  <p class="${t.muted} font-sans text-xs leading-relaxed">
    Exploring typographic hierarchies, serif-sans contrasts, and delicate line rhythms in modern digital publishing systems.
  </p>
  <div class="pt-2 flex items-center justify-between">
    <span class="font-serif italic text-xs ${t.muted}">By Helena Vance</span>
    <button class="${t.btnPrimarySm}">
      <span>CONTINUE</span>
      ${SV.arrow}
    </button>
  </div>
</div>`;
  },

  navbar: (m) => {
    const t = typographyFirst(m);
    return `<!-- Typography First · Navbar -->
<header class="${t.bar} flex items-center justify-between px-6 py-4 w-full">
  <div class="flex items-baseline gap-3">
    <a href="#" class="font-serif text-lg font-bold tracking-tight">VERBUM.</a>
    <span class="font-sans text-[10px] uppercase tracking-widest ${t.muted}">JOURNAL</span>
  </div>

  <nav class="hidden md:flex items-center gap-8 font-sans text-xs uppercase tracking-widest font-medium">
    <a href="#" class="${t.text} border-b border-current pb-0.5">01. ESSAYS</a>
    <a href="#" class="${t.muted} hover:${t.text}">02. MONOGRAPHS</a>
    <a href="#" class="${t.muted} hover:${t.text}">03. ARCHIVE</a>
  </nav>

  <button class="${t.btnPrimarySm}">SUBSCRIBE</button>
</header>`;
  },

  input: (m) => {
    const t = typographyFirst(m);
    return `<!-- Typography First · Minimal Input -->
<div class="w-full max-w-sm space-y-1.5">
  <label class="${t.label}">AUTHOR SEARCH</label>
  <input type="text" placeholder="e.g. Virginia Woolf" class="${t.input}" />
  <p class="font-serif italic text-[11px] ${t.muted}">Press enter to query repository</p>
</div>`;
  },

  badge: (m) => {
    const t = typographyFirst(m);
    return `<!-- Typography First · Badges -->
<div class="flex flex-wrap items-center gap-3">
  <span class="${t.badge}">Editorial Pick</span>
  <span class="${t.badgeOutline}">CRITIQUE</span>
  <span class="inline-flex items-center px-2 py-0.5 text-[10px] font-mono border-b ${m === 'dark' ? 'border-slate-600 text-slate-400' : 'border-slate-400 text-slate-600'}">
    VOL. IX
  </span>
</div>`;
  },

  modal: (m) => {
    const t = typographyFirst(m);
    return `<!-- Typography First · Modal -->
<div class="${t.panel} w-full max-w-md space-y-5">
  <div class="flex items-center justify-between border-b ${m === 'dark' ? 'border-slate-800' : 'border-slate-200'} pb-3">
    <span class="font-sans text-[10px] uppercase tracking-widest ${t.muted}">CONFIRM SUBSCRIPTION</span>
    <button class="${t.muted} hover:${t.text}">${SV.x}</button>
  </div>
  <h3 class="${t.heading} text-xl">Join the Literary Dispatch</h3>
  <p class="${t.muted} font-sans text-xs leading-relaxed">
    Delivered weekly: curated essays, typographic analysis, and interviews with design scholars.
  </p>
  <div class="flex justify-end gap-3 pt-2">
    <button class="${t.btnSecondary}">DISMISS</button>
    <button class="${t.btnPrimary}">CONFIRM</button>
  </div>
</div>`;
  },

  accordion: (m) => {
    const t = typographyFirst(m);
    return `<!-- Typography First · Accordion -->
<div class="${t.panel} w-full max-w-md divide-y ${m === 'dark' ? 'divide-slate-800' : 'divide-slate-200'} p-0">
  <div class="p-4">
    <button class="w-full flex items-center justify-between text-left font-serif text-sm font-bold">
      <span>01. Why prioritize typography?</span>
      <span class="font-sans text-xs ${t.muted}">—</span>
    </button>
    <p class="mt-3 ${t.muted} font-sans text-xs leading-relaxed">
      Text makes up over 95% of information on the web. Mastering typographic contrast yields unmatched clarity.
    </p>
  </div>
  <div class="p-4">
    <button class="w-full flex items-center justify-between text-left font-serif text-sm font-bold ${t.muted}">
      <span>02. Serif vs. Sans pairing rules</span>
      <span class="font-sans text-xs">+</span>
    </button>
  </div>
</div>`;
  },

  tooltip: (m) => {
    return `<!-- Typography First · Tooltip -->
<div class="relative inline-block">
  <div class="${m === 'dark' ? 'bg-[#F8FAFC] text-[#111111]' : 'bg-[#0F172A] text-white'} px-3 py-1 font-serif text-[11px] italic">
    Citation: Oxford University Press (2024)
  </div>
</div>`;
  },

  tabs: (m) => {
    const t = typographyFirst(m);
    return `<!-- Typography First · Tabs -->
<div class="flex border-b ${m === 'dark' ? 'border-slate-800' : 'border-slate-200'} w-full max-w-md font-sans text-xs">
  <button class="px-5 py-2.5 ${t.text} font-bold border-b-2 border-current">
    01. OVERVIEW
  </button>
  <button class="px-5 py-2.5 ${t.muted} hover:${t.text}">
    02. BIBLIOGRAPHY
  </button>
  <button class="px-5 py-2.5 ${t.muted} hover:${t.text}">
    03. CITATIONS
  </button>
</div>`;
  },

  dropdown: (m) => {
    const t = typographyFirst(m);
    return `<!-- Typography First · Dropdown -->
<div class="${t.panel} w-56 p-0 divide-y ${m === 'dark' ? 'divide-slate-800' : 'divide-slate-200'} font-sans text-xs">
  <div class="p-3 font-serif font-bold text-xs flex justify-between items-center">
    <span>FILTER BY CATEGORY</span>
    <span>↓</span>
  </div>
  <a href="#" class="block p-3 ${t.text} hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">Essays & Criticism</a>
  <a href="#" class="block p-3 ${t.muted} hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">Typographic Studies</a>
  <a href="#" class="block p-3 ${t.muted} hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">Author Interviews</a>
</div>`;
  },

  switch: (m) => {
    const t = typographyFirst(m);
    return `<!-- Typography First · Switch -->
<div class="flex items-center gap-4">
  <button class="w-10 h-5 border ${m === 'dark' ? 'border-slate-700 bg-slate-900' : 'border-slate-300 bg-slate-200'} relative p-0.5 rounded-none">
    <div class="w-4 h-3.5 ${m === 'dark' ? 'bg-[#F8FAFC]' : 'bg-[#0F172A]'} rounded-none"></div>
  </button>
  <span class="font-serif text-xs italic ${t.muted}">Serif Display Mode</span>
</div>`;
  },

  skeleton: (m) => {
    const t = typographyFirst(m);
    return `<!-- Typography First · Skeleton -->
<div class="${t.panel} w-full max-w-sm p-6 space-y-4">
  <div class="h-3 ${m === 'dark' ? 'bg-slate-800' : 'bg-slate-200'} animate-pulse w-1/4"></div>
  <div class="h-6 ${m === 'dark' ? 'bg-slate-700' : 'bg-slate-300'} animate-pulse w-3/4"></div>
  <div class="space-y-2">
    <div class="h-2.5 ${m === 'dark' ? 'bg-slate-800' : 'bg-slate-200'} animate-pulse w-full"></div>
    <div class="h-2.5 ${m === 'dark' ? 'bg-slate-800' : 'bg-slate-200'} animate-pulse w-5/6"></div>
  </div>
</div>`;
  },

  toast: (m) => {
    const t = typographyFirst(m);
    return `<!-- Typography First · Toast -->
<div class="${t.panel} w-full max-w-sm p-4 border-l-2 ${m === 'dark' ? 'border-l-slate-200' : 'border-l-slate-900'} flex items-start gap-3">
  <div class="space-y-1">
    <p class="font-serif font-bold text-xs">ARTICLE BOOKMARKED</p>
    <p class="${t.muted} font-sans text-xs">Saved to your editorial reading list.</p>
  </div>
</div>`;
  },

  progress: (m) => {
    const t = typographyFirst(m);
    return `<!-- Typography First · Progress Bar -->
<div class="w-full max-w-sm space-y-2">
  <div class="flex justify-between font-sans text-[10px] uppercase tracking-widest ${t.muted}">
    <span>READING PROGRESS</span>
    <span>68%</span>
  </div>
  <div class="h-1 w-full ${m === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}">
    <div class="h-full ${m === 'dark' ? 'bg-[#F8FAFC]' : 'bg-[#0F172A]'} w-[68%]"></div>
  </div>
</div>`;
  },

  avatar: (m) => {
    const t = typographyFirst(m);
    return `<!-- Typography First · Avatar -->
<div class="flex items-center gap-3">
  <div class="w-9 h-9 ${m === 'dark' ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-slate-100 text-slate-800 border-slate-300'} border flex items-center justify-center font-serif font-bold text-sm">
    HV
  </div>
  <div>
    <p class="font-serif font-bold text-xs">Helena Vance</p>
    <p class="font-sans text-[10px] uppercase tracking-widest ${t.muted}">SENIOR EDITOR</p>
  </div>
</div>`;
  },
};
