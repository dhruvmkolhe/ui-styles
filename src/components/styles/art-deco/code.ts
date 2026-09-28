import type { Mode } from "@/lib/styles/types";
import { artDeco } from "./kit";

const SV = {
  arrow: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"/></svg>`,
  x: `<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
  star: `<svg class="h-4 w-4 text-[#C9A961]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"/></svg>`,
};

export const artDecoCode: Record<string, (mode: Mode) => string> = {
  button: (m) => {
    const k = artDeco(m);
    return `<!-- Art Deco · Metallic Gold Buttons -->
<div class="flex flex-wrap gap-4 items-center">
  <button class="${k.btnPrimary}">
    <span>RESERVE SUITE</span>
    ${SV.arrow}
  </button>
  <button class="${k.btnSecondary}">
    <span>VIEW CATALOGUE</span>
  </button>
</div>`;
  },

  card: (m) => {
    const k = artDeco(m);
    return `<!-- Art Deco · Luxury Gold Card -->
<div class="${k.panel} w-full max-w-md space-y-4">
  <div class="flex items-center justify-between border-b border-[#C9A961]/40 pb-3">
    <span class="font-sans text-[10px] font-bold text-[#C9A961] tracking-[0.25em]">EST. 1925 // GATSBY</span>
    <span class="${k.badge}">EXCLUSIVE</span>
  </div>
  <h3 class="${k.heading} text-xl leading-snug">THE GRAND MAJESTIC HOTEL</h3>
  <p class="${k.muted} font-sans text-xs leading-relaxed tracking-wider">
    Symmetrical geometric chevron motifs, metallic gold gilding, and timeless roaring twenties elegance.
  </p>
  <div class="pt-2 flex items-center justify-between border-t border-[#C9A961]/40">
    <span class="font-sans text-[10px] text-[#C9A961] tracking-widest">SUITE № 408</span>
    <button class="${k.btnPrimarySm}">
      <span>INSPECT</span>
      ${SV.arrow}
    </button>
  </div>
</div>`;
  },

  navbar: (m) => {
    const k = artDeco(m);
    return `<!-- Art Deco · Header / Masthead -->
<header class="${k.bar} flex items-center justify-between px-8 py-5 w-full">
  <div class="flex items-center gap-3">
    <span class="text-[#C9A961] font-serif text-sm">✦</span>
    <a href="#" class="font-sans font-bold text-sm text-[#C9A961] tracking-[0.3em]">L&apos;HORIZON</a>
    <span class="text-[#C9A961] font-serif text-sm">✦</span>
  </div>

  <nav class="hidden md:flex items-center gap-8 font-sans text-xs text-[#A38D56] tracking-[0.2em]">
    <a href="#" class="text-[#C9A961] border-b border-[#C9A961]">SALON</a>
    <a href="#" class="hover:text-[#C9A961] transition-colors">ARCHIVE</a>
    <a href="#" class="hover:text-[#C9A961] transition-colors">GALLERY</a>
  </nav>

  <button class="${k.btnPrimarySm}">CONCIERGE</button>
</header>`;
  },

  input: (m) => {
    const k = artDeco(m);
    return `<!-- Art Deco · Form Input -->
<div class="w-full max-w-sm space-y-1.5">
  <label class="${k.label}">MEMBERSHIP ACCESS CODE</label>
  <input type="text" placeholder="GOLDEN-1925-VIP" class="${k.input}" />
  <p class="font-sans text-[9px] text-[#A38D56] tracking-[0.2em]">BY PRIVATE INVITATION ONLY</p>
</div>`;
  },

  badge: (m) => {
    const k = artDeco(m);
    return `<!-- Art Deco · Badges -->
<div class="flex flex-wrap items-center gap-3">
  <span class="${k.badge}">GOLD GILDED</span>
  <span class="${k.badgeOutline}">1920S GEOMETRIC</span>
  <span class="inline-flex items-center px-3 py-0.5 text-[9px] font-sans font-bold uppercase tracking-[0.2em] bg-[#141414] text-[#F3E5AB] border border-[#F3E5AB]">
    VIP SOIRÉE
  </span>
</div>`;
  },

  modal: (m) => {
    const k = artDeco(m);
    return `<!-- Art Deco · Luxury Modal -->
<div class="${k.panel} w-full max-w-md space-y-5">
  <div class="flex items-center justify-between border-b border-[#C9A961]/40 pb-3">
    <span class="font-sans text-[10px] font-bold text-[#C9A961] tracking-[0.25em]">PRIVATE INVITATION</span>
    <button class="text-[#C9A961] hover:text-[#F3E5AB]">${SV.x}</button>
  </div>
  <h3 class="${k.heading} text-lg">ENTER THE ROARING TWENTIES GALA</h3>
  <p class="${k.muted} font-sans text-xs leading-relaxed tracking-wider">
    You have been cordially summoned to an evening of jazz, champagne, and symmetrical geometric grandeur.
  </p>
  <div class="flex justify-end gap-3 pt-2">
    <button class="${k.btnSecondary}">DECLINE</button>
    <button class="${k.btnPrimary}">ACCEPT INVITATION</button>
  </div>
</div>`;
  },

  accordion: (m) => {
    const k = artDeco(m);
    return `<!-- Art Deco · Accordion -->
<div class="${k.panel} w-full max-w-md divide-y divide-[#C9A961]/30 p-0">
  <div class="p-4">
    <button class="w-full flex items-center justify-between text-left font-sans text-xs font-bold text-[#C9A961] tracking-[0.2em]">
      <span>✦ WHAT IS ART DECO DESIGN?</span>
      <span class="text-[#F3E5AB] font-bold">-</span>
    </button>
    <p class="mt-3 ${k.muted} font-sans text-xs leading-relaxed tracking-wider">
      Popularized in 1920s Paris, combining rich materials, geometric symmetry, and exquisite craftsmanship.
    </p>
  </div>
  <div class="p-4">
    <button class="w-full flex items-center justify-between text-left font-sans text-xs font-bold text-[#A38D56] tracking-[0.2em]">
      <span>✦ ARCHITECTURAL CHEVRON PATTERNS</span>
      <span class="text-[#C9A961]">+</span>
    </button>
  </div>
</div>`;
  },

  tooltip: () => {
    return `<!-- Art Deco · Tooltip -->
<div class="relative inline-block">
  <div class="bg-[#0A0A0A] text-[#C9A961] border border-[#C9A961] px-3 py-1 font-sans text-[9px] font-bold uppercase tracking-[0.25em] outline outline-1 outline-[#C9A961]/40 outline-offset-2">
    GATSBY EDITION: 1925
  </div>
</div>`;
  },

  tabs: (m) => {
    const k = artDeco(m);
    return `<!-- Art Deco · Tabs -->
<div class="flex border-b border-[#C9A961]/40 w-full max-w-md font-sans text-xs">
  <button class="px-5 py-2.5 bg-[#C9A961] text-[#0A0A0A] font-bold tracking-[0.2em]">
    ✦ SALON
  </button>
  <button class="px-5 py-2.5 ${k.muted} hover:text-[#C9A961] tracking-[0.2em]">
    GALLERY
  </button>
  <button class="px-5 py-2.5 ${k.muted} hover:text-[#C9A961] tracking-[0.2em]">
    ARCHIVE
  </button>
</div>`;
  },

  dropdown: (m) => {
    const k = artDeco(m);
    return `<!-- Art Deco · Dropdown -->
<div class="${k.panel} w-56 p-0 divide-y divide-[#C9A961]/40 font-sans text-xs tracking-[0.2em]">
  <div class="p-3 bg-[#C9A961] text-[#0A0A0A] font-bold flex justify-between items-center">
    <span>SELECT SALON</span>
    <span>▼</span>
  </div>
  <a href="#" class="block p-3 text-[#C9A961] hover:bg-[#C9A961]/10 hover:text-[#F3E5AB] transition-colors">THE CHANDELIER ROOM</a>
  <a href="#" class="block p-3 text-[#C9A961] hover:bg-[#C9A961]/10 hover:text-[#F3E5AB] transition-colors">GOLDEN LOUNGE</a>
  <a href="#" class="block p-3 text-[#C9A961] hover:bg-[#C9A961]/10 hover:text-[#F3E5AB] transition-colors">CHAMPAGNE VERANDA</a>
</div>`;
  },

  switch: () => {
    return `<!-- Art Deco · Switch -->
<div class="flex items-center gap-4">
  <button class="w-12 h-6 border border-[#C9A961] bg-[#0A0A0A] relative p-0.5 outline outline-1 outline-[#C9A961]/40 outline-offset-2">
    <div class="w-5 h-4.5 bg-[#C9A961]"></div>
  </button>
  <span class="font-sans text-xs font-bold text-[#C9A961] tracking-[0.2em]">GOLD ILLUMINATION: ON</span>
</div>`;
  },

  skeleton: (m) => {
    const k = artDeco(m);
    return `<!-- Art Deco · Skeleton -->
<div class="${k.panel} w-full max-w-sm p-6 space-y-4">
  <div class="h-4 bg-[#C9A961] animate-pulse w-1/3"></div>
  <div class="h-8 bg-[#C9A961]/20 animate-pulse w-3/4 border border-[#C9A961]/50"></div>
  <div class="space-y-2">
    <div class="h-3 bg-[#C9A961]/10 animate-pulse w-full"></div>
    <div class="h-3 bg-[#C9A961]/10 animate-pulse w-5/6"></div>
  </div>
</div>`;
  },

  toast: (m) => {
    const k = artDeco(m);
    return `<!-- Art Deco · Toast -->
<div class="${k.panel} w-full max-w-sm p-4 border-l-4 border-l-[#C9A961] flex items-start gap-3">
  <span class="text-[#C9A961] text-xs mt-0.5">✦</span>
  <div class="space-y-1">
    <p class="font-sans text-xs font-bold text-[#C9A961] tracking-[0.2em]">RESERVATION CONFIRMED</p>
    <p class="${k.muted} font-sans text-xs tracking-wider">Your private suite at L'Horizon has been secured.</p>
  </div>
</div>`;
  },

  progress: () => {
    return `<!-- Art Deco · Progress Bar -->
<div class="w-full max-w-sm space-y-2">
  <div class="flex justify-between font-sans text-xs font-bold tracking-[0.2em]">
    <span class="text-[#C9A961]">GILDING PROGRESS</span>
    <span class="text-[#F3E5AB]">90%</span>
  </div>
  <div class="h-3 w-full border border-[#C9A961] bg-[#0A0A0A] p-0.5 outline outline-1 outline-[#C9A961]/30 outline-offset-1">
    <div class="h-full bg-gradient-to-r from-[#C9A961] to-[#F3E5AB] w-[90%]"></div>
  </div>
</div>`;
  },

  avatar: () => {
    return `<!-- Art Deco · Avatar -->
<div class="flex items-center gap-3">
  <div class="w-10 h-10 bg-[#C9A961] text-[#0A0A0A] font-sans font-bold text-xs tracking-widest flex items-center justify-center border border-[#F3E5AB]">
    JG
  </div>
  <div>
    <p class="font-sans font-bold text-xs text-[#C9A961] tracking-[0.2em]">JAY GATSBY</p>
    <p class="font-sans text-[9px] text-[#A38D56] tracking-[0.2em]">WEST EGG // PATRON</p>
  </div>
</div>`;
  },
};
