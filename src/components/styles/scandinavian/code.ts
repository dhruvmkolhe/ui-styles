import type { Mode } from "@/lib/styles/types";
import { scandinavian } from "./kit";

const SV = {
  arrow: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>`,
  x: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
};

export const scandinavianCode: Record<string, (mode: Mode) => string> = {
  button: (m) => {
    const k = scandinavian(m);
    return `<!-- Scandinavian · Hygge Buttons -->
<div class="flex flex-wrap gap-4 items-center">
  <button class="${k.btnPrimary}">
    <span>EXPLORE HYGGE</span>
    ${SV.arrow}
  </button>
  <button class="${k.btnSecondary}">
    <span>OUR CRAFT</span>
  </button>
</div>`;
  },

  card: (m) => {
    const k = scandinavian(m);
    return `<!-- Scandinavian · Pale Wood Card -->
<div class="${k.panel} w-full max-w-md space-y-4">
  <div class="flex items-center justify-between">
    <span class="text-xs font-medium text-[#64748B]">STOCKHOLM STUDIO</span>
    <span class="${k.badge}">NATURAL OAT</span>
  </div>
  <h3 class="${k.heading} text-xl font-normal">Airy Living Collection</h3>
  <p class="${k.muted} text-sm leading-relaxed">
    Minimalist pale birch finishes, muted sky blue accents, and generous whitespace for calm daily living.
  </p>
  <div class="pt-2 flex items-center justify-between border-t border-[#E8DCC8]">
    <span class="text-xs text-[#64748B]">Nordic Timber</span>
    <button class="${k.btnPrimarySm}">
      <span>VIEW PIECE</span>
      ${SV.arrow}
    </button>
  </div>
</div>`;
  },

  navbar: (m) => {
    const k = scandinavian(m);
    return `<!-- Scandinavian · Navbar -->
<header class="${k.bar} flex items-center justify-between px-6 py-4 w-full">
  <div class="flex items-center gap-3">
    <div class="w-8 h-8 rounded-xl bg-[#E8DCC8] text-[#334155] flex items-center justify-center font-medium text-xs">
      N
    </div>
    <a href="#" class="font-medium text-base text-[#334155]">NORDIC FORM</a>
  </div>

  <nav class="hidden md:flex items-center gap-6 text-sm text-[#64748B]">
    <a href="#" class="text-[#334155] border-b border-[#A8C0D6] pb-0.5">Spaces</a>
    <a href="#" class="hover:text-[#334155]">Crafts</a>
    <a href="#" class="hover:text-[#334155]">Materials</a>
  </nav>

  <button class="${k.btnPrimarySm}">DISCOVER</button>
</header>`;
  },

  input: (m) => {
    const k = scandinavian(m);
    return `<!-- Scandinavian · Form Input -->
<div class="w-full max-w-sm space-y-1">
  <label class="${k.label}">SUBSCRIBE TO NORDIC NEWSLETTER</label>
  <input type="email" placeholder="hello@hygge.se" class="${k.input}" />
  <p class="text-xs text-[#64748B]">Monthly interior design notes from Copenhagen</p>
</div>`;
  },

  badge: (m) => {
    const k = scandinavian(m);
    return `<!-- Scandinavian · Badges -->
<div class="flex flex-wrap items-center gap-3">
  <span class="${k.badge}">Pale Birch</span>
  <span class="${k.badgeOutline}">Muted Sky</span>
  <span class="inline-flex items-center px-3 py-1 text-xs font-medium bg-[#A8C0D6] text-[#334155] rounded-full">
    Nordic Light
  </span>
</div>`;
  },

  modal: (m) => {
    const k = scandinavian(m);
    return `<!-- Scandinavian · Hygge Modal -->
<div class="${k.panel} w-full max-w-md space-y-5">
  <div class="flex items-center justify-between">
    <h3 class="${k.heading} text-lg font-normal">Welcome to Nordic Living</h3>
    <button class="text-slate-400 hover:text-slate-600">${SV.x}</button>
  </div>
  <p class="${k.muted} text-sm leading-relaxed">
    Join our quiet community of interior designers, woodworkers, and architects pursuing balance and warmth.
  </p>
  <div class="flex justify-end gap-3 pt-2">
    <button class="${k.btnSecondary}">LATER</button>
    <button class="${k.btnPrimary}">JOIN COMMUNITY</button>
  </div>
</div>`;
  },

  accordion: (m) => {
    const k = scandinavian(m);
    return `<!-- Scandinavian · Accordion -->
<div class="${k.panel} w-full max-w-md divide-y divide-[#E8DCC8] p-0 overflow-hidden">
  <div class="p-5">
    <button class="w-full flex items-center justify-between text-left font-medium text-sm text-[#334155]">
      <span>What defines Scandinavian design?</span>
      <span class="text-[#A8C0D6] font-bold">-</span>
    </button>
    <p class="mt-3 ${k.muted} text-xs leading-relaxed">
      Simplicity, functionality, and connection to natural wood, light, and open whitespace.
    </p>
  </div>
  <div class="p-5">
    <button class="w-full flex items-center justify-between text-left font-medium text-sm text-[#64748B]">
      <span>Sustainably Sourced Birch</span>
      <span class="text-[#A8C0D6]">+</span>
    </button>
  </div>
</div>`;
  },

  tooltip: () => {
    return `<!-- Scandinavian · Tooltip -->
<div class="relative inline-block">
  <div class="bg-[#F5EFE6] text-[#334155] border border-[#E8DCC8] px-3 py-1.5 text-xs font-medium rounded-lg shadow-sm">
    Wood origin: Dalarna, Sweden
  </div>
</div>`;
  },

  tabs: (m) => {
    const k = scandinavian(m);
    return `<!-- Scandinavian · Tabs -->
<div class="flex border-b border-[#E8DCC8] w-full max-w-md font-medium text-sm">
  <button class="px-5 py-2.5 border-b-2 border-[#A8C0D6] text-[#334155]">
    01. LIVING
  </button>
  <button class="px-5 py-2.5 ${k.muted} hover:text-[#334155]">
    02. TIMBER
  </button>
  <button class="px-5 py-2.5 ${k.muted} hover:text-[#334155]">
    03. LIGHT
  </button>
</div>`;
  },

  dropdown: (m) => {
    const k = scandinavian(m);
    return `<!-- Scandinavian · Dropdown -->
<div class="${k.panel} w-56 p-2 space-y-1 text-sm font-medium">
  <a href="#" class="block px-3.5 py-2 rounded-xl bg-[#F5EFE6] text-[#334155]">Copenhagen Chair</a>
  <a href="#" class="block px-3.5 py-2 rounded-xl hover:bg-[#F5EFE6] text-[#64748B] transition-colors">Oslo Table</a>
  <a href="#" class="block px-3.5 py-2 rounded-xl hover:bg-[#F5EFE6] text-[#64748B] transition-colors">Stockholm Lamp</a>
</div>`;
  },

  switch: () => {
    return `<!-- Scandinavian · Switch -->
<div class="flex items-center gap-4">
  <button class="w-12 h-6 bg-[#A8C0D6] relative p-0.5 rounded-full flex items-center justify-end">
    <div class="w-5 h-5 bg-white rounded-full shadow-sm"></div>
  </button>
  <span class="text-xs font-medium text-[#334155]">HYGGE LIGHTING: ON</span>
</div>`;
  },

  skeleton: (m) => {
    const k = scandinavian(m);
    return `<!-- Scandinavian · Skeleton Loader -->
<div class="${k.panel} w-full max-w-sm p-6 space-y-4">
  <div class="h-4 bg-[#A8C0D6]/40 animate-pulse rounded-full w-1/3"></div>
  <div class="h-8 bg-[#E8DCC8]/40 animate-pulse rounded-xl w-3/4"></div>
  <div class="space-y-2">
    <div class="h-3 bg-[#E8DCC8]/30 animate-pulse rounded-full w-full"></div>
    <div class="h-3 bg-[#E8DCC8]/30 animate-pulse rounded-full w-5/6"></div>
  </div>
</div>`;
  },

  toast: (m) => {
    const k = scandinavian(m);
    return `<!-- Scandinavian · Toast -->
<div class="${k.panel} w-full max-w-sm p-4 border-l-4 border-l-[#A8C0D6] flex items-start gap-3">
  <span class="h-3 w-3 bg-[#A8C0D6] rounded-full mt-0.5 flex-shrink-0"></span>
  <div class="space-y-1">
    <p class="text-xs font-bold text-[#334155]">ITEM ADDED TO WISHLIST</p>
    <p class="${k.muted} text-xs">Stockholm lounge chair saved to quiet mood board.</p>
  </div>
</div>`;
  },

  progress: () => {
    return `<!-- Scandinavian · Progress Bar -->
<div class="w-full max-w-sm space-y-2">
  <div class="flex justify-between text-xs font-medium text-[#334155]">
    <span>Handcrafting timber</span>
    <span class="text-[#A8C0D6]">75%</span>
  </div>
  <div class="h-2 w-full bg-[#E8DCC8]/50 rounded-full overflow-hidden">
    <div class="h-full bg-[#A8C0D6] w-[75%] rounded-full"></div>
  </div>
</div>`;
  },

  avatar: () => {
    return `<!-- Scandinavian · Avatar -->
<div class="flex items-center gap-3">
  <div class="w-10 h-10 bg-[#E8DCC8] text-[#334155] rounded-full flex items-center justify-center font-medium text-sm">
    AL
  </div>
  <div>
    <p class="font-medium text-xs text-[#334155]">Astrid Lind</p>
    <p class="text-[10px] text-[#64748B]">Interior Stylist // Oslo</p>
  </div>
</div>`;
  },
};
