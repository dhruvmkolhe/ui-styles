import type { Mode } from "@/lib/styles/types";
import { luxuryMinimal } from "./kit";

const SV = {
  arrow: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"/></svg>`,
  x: `<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
};

export const luxuryMinimalCode: Record<string, (mode: Mode) => string> = {
  button: (m) => {
    const k = luxuryMinimal(m);
    return `<!-- Luxury Minimal · High Fashion Buttons -->
<div class="flex flex-wrap gap-4 items-center">
  <button class="${k.btnPrimary}">
    <span>DISCOVER COLLECTION</span>
    ${SV.arrow}
  </button>
  <button class="${k.btnSecondary}">
    <span>REQUEST PRIVATE VIEWING</span>
  </button>
</div>`;
  },

  card: (m) => {
    const k = luxuryMinimal(m);
    return `<!-- Luxury Minimal · Editorial Card -->
<div class="${k.panel} w-full max-w-md space-y-5">
  <div class="flex items-center justify-between border-b ${m === 'dark' ? 'border-neutral-800' : 'border-neutral-200'} pb-3">
    <span class="font-sans text-[10px] text-neutral-400 tracking-[0.25em]">LIMITED EDITION // № 01</span>
    <span class="${k.badge}">CHAMPAGNE</span>
  </div>
  <h3 class="font-serif text-2xl font-light leading-snug">The Atelier Horizon</h3>
  <p class="${k.muted} font-serif italic text-sm leading-relaxed">
    “Elegance is refusal — stripping away every unnecessary element until only pure structure remains.”
  </p>
  <div class="pt-3 flex items-center justify-between border-t ${m === 'dark' ? 'border-neutral-800' : 'border-neutral-200'}">
    <span class="font-sans text-[10px] text-[#C5A059] tracking-widest">€ 4,800</span>
    <button class="${k.btnPrimarySm}">
      <span>ACQUIRE</span>
      ${SV.arrow}
    </button>
  </div>
</div>`;
  },

  navbar: (m) => {
    const k = luxuryMinimal(m);
    return `<!-- Luxury Minimal · Header / Masthead -->
<header class="${k.bar} flex items-center justify-between px-8 py-5 w-full">
  <div class="flex items-center gap-3">
    <a href="#" class="font-serif text-xl font-normal tracking-[0.25em]">Maison V</a>
  </div>

  <nav class="hidden md:flex items-center gap-8 font-sans text-xs text-neutral-400 tracking-[0.25em]">
    <a href="#" class="text-[#C5A059] border-b border-[#C5A059] pb-0.5">COUTURE</a>
    <a href="#" class="hover:text-foreground transition-colors">ATELIER</a>
    <a href="#" class="hover:text-foreground transition-colors">JOURNAL</a>
  </nav>

  <button class="${k.btnPrimarySm}">APPOINTMENT</button>
</header>`;
  },

  input: (m) => {
    const k = luxuryMinimal(m);
    return `<!-- Luxury Minimal · Form Input -->
<div class="w-full max-w-sm space-y-2">
  <label class="${k.label}">PRIVATE INVITATION CODE</label>
  <input type="text" placeholder="MAISON-PARIS-VIP" class="${k.input}" />
  <p class="font-serif italic text-xs text-neutral-400">Strictly confidential subscription service</p>
</div>`;
  },

  badge: (m) => {
    const k = luxuryMinimal(m);
    return `<!-- Luxury Minimal · Badges -->
<div class="flex flex-wrap items-center gap-3">
  <span class="${k.badge}">Haut Couture</span>
  <span class="${k.badgeOutline}">Champagne Gold</span>
  <span class="font-serif text-xs italic underline text-[#C5A059]">Exclusive Release</span>
</div>`;
  },

  modal: (m) => {
    const k = luxuryMinimal(m);
    return `<!-- Luxury Minimal · Modal -->
<div class="${k.panel} w-full max-w-md space-y-5">
  <div class="flex items-center justify-between border-b ${m === 'dark' ? 'border-neutral-800' : 'border-neutral-200'} pb-3">
    <span class="font-sans text-[10px] text-neutral-400 tracking-[0.25em]">PRIVATE ATELIER</span>
    <button class="${k.muted} hover:text-foreground">${SV.x}</button>
  </div>
  <h3 class="font-serif text-xl font-light">Confirm Private Viewing Request</h3>
  <p class="${k.muted} font-serif text-sm leading-relaxed italic">
    Our personal concierge will arrange a private consultation at our Place Vendôme atelier.
  </p>
  <div class="flex justify-end gap-3 pt-2">
    <button class="${k.btnSecondary}">CANCEL</button>
    <button class="${k.btnPrimary}">CONFIRM RESERVATION</button>
  </div>
</div>`;
  },

  accordion: (m) => {
    const k = luxuryMinimal(m);
    return `<!-- Luxury Minimal · Accordion -->
<div class="${k.panel} w-full max-w-md divide-y ${m === 'dark' ? 'divide-neutral-800' : 'divide-neutral-200'} p-0">
  <div class="p-5">
    <button class="w-full flex items-center justify-between text-left font-serif text-sm">
      <span>What defines high-fashion minimalism?</span>
      <span class="font-serif italic text-xs text-[#C5A059]">Explore</span>
    </button>
    <p class="mt-3 ${k.muted} font-serif text-xs leading-relaxed italic">
      Subtle luxury materials, ultra-thin border rules, and serene whitespace calculated to perfection.
    </p>
  </div>
  <div class="p-5">
    <button class="w-full flex items-center justify-between text-left font-serif text-sm ${k.muted}">
      <span>Bespoke Tailoring Process</span>
      <span class="font-serif italic text-xs">+</span>
    </button>
  </div>
</div>`;
  },

  tooltip: () => {
    return `<!-- Luxury Minimal · Tooltip -->
<div class="relative inline-block">
  <div class="bg-[#050505] text-[#C5A059] border border-[#C5A059]/40 px-3 py-1 font-serif text-xs italic">
    Specification: Place Vendôme № 12
  </div>
</div>`;
  },

  tabs: (m) => {
    const k = luxuryMinimal(m);
    return `<!-- Luxury Minimal · Tabs -->
<div class="flex border-b ${m === 'dark' ? 'border-neutral-800' : 'border-neutral-200'} w-full max-w-md font-sans text-xs tracking-[0.25em]">
  <button class="px-5 py-3 border-b-2 border-[#C5A059] text-[#C5A059] font-medium">
    LOOKBOOK
  </button>
  <button class="px-5 py-3 ${k.muted} hover:text-foreground">
    ATELIER
  </button>
  <button class="px-5 py-3 ${k.muted} hover:text-foreground">
    ARCHIVE
  </button>
</div>`;
  },

  dropdown: (m) => {
    const k = luxuryMinimal(m);
    return `<!-- Luxury Minimal · Dropdown -->
<div class="${k.panel} w-56 p-2 space-y-1 font-serif text-sm">
  <div class="px-3 py-1.5 font-sans text-[9px] text-neutral-400 uppercase tracking-[0.25em] border-b ${m === 'dark' ? 'border-neutral-800' : 'border-neutral-200'}">
    Select Season
  </div>
  <a href="#" class="block px-3 py-2 hover:bg-neutral-100 hover:text-black italic transition-colors">Spring / Summer 2026</a>
  <a href="#" class="block px-3 py-2 hover:bg-neutral-100 hover:text-black italic transition-colors">Autumn / Winter 2025</a>
  <a href="#" class="block px-3 py-2 hover:bg-neutral-100 hover:text-black italic transition-colors">Permanent Collection</a>
</div>`;
  },

  switch: () => {
    return `<!-- Luxury Minimal · Switch -->
<div class="flex items-center gap-4">
  <button class="w-10 h-5 border border-neutral-400 bg-transparent relative p-0.5 rounded-none">
    <div class="w-4 h-3.5 bg-[#C5A059]"></div>
  </button>
  <span class="font-serif text-xs italic">Monochrome Couture Mode</span>
</div>`;
  },

  skeleton: (m) => {
    const k = luxuryMinimal(m);
    return `<!-- Luxury Minimal · Skeleton Loader -->
<div class="${k.panel} w-full max-w-sm p-6 space-y-4">
  <div class="h-3 bg-neutral-300 animate-pulse w-1/4"></div>
  <div class="h-6 bg-neutral-300 animate-pulse w-3/4"></div>
  <div class="space-y-2">
    <div class="h-3 bg-neutral-200 animate-pulse w-full"></div>
    <div class="h-3 bg-neutral-200 animate-pulse w-5/6"></div>
  </div>
</div>`;
  },

  toast: (m) => {
    const k = luxuryMinimal(m);
    return `<!-- Luxury Minimal · Toast -->
<div class="${k.panel} w-full max-w-sm p-4 border-l-2 border-l-[#C5A059] space-y-1">
  <p class="font-sans text-[9px] uppercase tracking-[0.25em] text-[#C5A059]">RESERVATION CONFIRMED</p>
  <p class="${k.text} font-serif text-xs italic">Private concierge appointment booked for Place Vendôme.</p>
</div>`;
  },

  progress: () => {
    return `<!-- Luxury Minimal · Progress Bar -->
<div class="w-full max-w-sm space-y-1.5">
  <div class="flex justify-between font-serif text-xs italic">
    <span>Couture Crafting</span>
    <span>85%</span>
  </div>
  <div class="h-0.5 w-full bg-neutral-200">
    <div class="h-full bg-[#C5A059] w-[85%]"></div>
  </div>
</div>`;
  },

  avatar: () => {
    return `<!-- Luxury Minimal · Avatar -->
<div class="flex items-center gap-3">
  <div class="w-10 h-10 border border-[#C5A059] bg-[#050505] text-[#C5A059] font-serif italic text-base flex items-center justify-center">
    MV
  </div>
  <div>
    <p class="font-serif text-sm font-light">Maison Vendôme</p>
    <p class="font-sans text-[9px] uppercase tracking-[0.25em] text-neutral-400">PARIS // ATELIER</p>
  </div>
</div>`;
  },
};
