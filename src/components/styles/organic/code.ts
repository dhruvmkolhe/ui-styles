import type { Mode } from "@/lib/styles/types";
import { organic } from "./kit";

const SV = {
  arrow: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>`,
  x: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
  leaf: `<svg class="h-4 w-4 text-[#6E8560]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 01-9-9c0-4.97 4.03-9 9-9 4.97 0 9 4.03 9 9a9 9 0 01-9 9zm0 0v-9"/></svg>`,
};

export const organicCode: Record<string, (mode: Mode) => string> = {
  button: (m) => {
    const k = organic(m);
    return `<!-- Organic · Pebble Action Buttons -->
<div class="flex flex-wrap gap-4 items-center">
  <button class="${k.btnPrimary}">
    <span>SAGE HARVEST</span>
    ${SV.arrow}
  </button>
  <button class="${k.btnSecondary}">
    <span>CLAY TERRACOTTA</span>
  </button>
</div>`;
  },

  card: (m) => {
    const k = organic(m);
    return `<!-- Organic · Biophilic Pebble Card -->
<div class="${k.panel} w-full max-w-md space-y-4">
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-2">
      ${SV.leaf}
      <span class="text-xs font-medium text-[#6E8560]">BIOPHILIC FORM</span>
    </div>
    <span class="${k.badge}">SAGE GREEN</span>
  </div>
  <h3 class="${k.heading} text-xl font-normal">Botanical Sanctuary</h3>
  <p class="${k.muted} text-sm leading-relaxed">
    Soft flowing organic curves, warm stone textures, and natural terracotta clay accents inspired by living ecosystems.
  </p>
  <div class="pt-2 flex items-center justify-between border-t border-[#D4CEB8]">
    <span class="text-xs text-[#C87D55] font-medium">Terracotta Clay</span>
    <button class="${k.btnPrimarySm}">
      <span>DISCOVER</span>
      ${SV.arrow}
    </button>
  </div>
</div>`;
  },

  navbar: (m) => {
    const k = organic(m);
    return `<!-- Organic · Navbar -->
<header class="${k.bar} flex items-center justify-between px-6 py-4 w-full">
  <div class="flex items-center gap-3">
    <div class="w-8 h-8 rounded-full bg-[#6E8560] text-white flex items-center justify-center font-medium text-xs">
      🌿
    </div>
    <a href="#" class="font-medium text-base text-[#4A5D44]">FLORA &amp; STONE</a>
  </div>

  <nav class="hidden md:flex items-center gap-6 text-sm text-[#5C6E57]">
    <a href="#" class="text-[#4A5D44] border-b border-[#6E8560] pb-0.5">Sanctuary</a>
    <a href="#" class="hover:text-[#4A5D44]">Botanicals</a>
    <a href="#" class="hover:text-[#4A5D44]">Terracotta</a>
  </nav>

  <button class="${k.btnPrimarySm}">EXPLORE</button>
</header>`;
  },

  input: (m) => {
    const k = organic(m);
    return `<!-- Organic · Form Input -->
<div class="w-full max-w-sm space-y-1">
  <label class="${k.label}">SUBSCRIBE TO BOTANICAL DISPATCH</label>
  <input type="email" placeholder="nature@flora.org" class="${k.input}" />
  <p class="text-xs text-[#5C6E57]">Natural stone tones and organic rounded curves</p>
</div>`;
  },

  badge: (m) => {
    const k = organic(m);
    return `<!-- Organic · Badges -->
<div class="flex flex-wrap items-center gap-3">
  <span class="${k.badge}">Sage Leaf</span>
  <span class="${k.badgeOutline}">Terracotta Clay</span>
  <span class="inline-flex items-center px-3.5 py-1 text-xs font-medium bg-[#C87D55] text-white rounded-full">
    Earthy Clay
  </span>
</div>`;
  },

  modal: (m) => {
    const k = organic(m);
    return `<!-- Organic · Pebble Modal -->
<div class="${k.panel} w-full max-w-md space-y-5">
  <div class="flex items-center justify-between">
    <h3 class="${k.heading} text-lg font-normal">Harmonize with nature?</h3>
    <button class="text-[#8D9E88] hover:text-[#4A5D44]">${SV.x}</button>
  </div>
  <p class="${k.muted} text-sm leading-relaxed">
    Embrace flowing organic shapes and earthy biophilic color palettes designed for peaceful digital wellbeing.
  </p>
  <div class="flex justify-end gap-3 pt-2">
    <button class="${k.btnSecondary}">PAUSE</button>
    <button class="${k.btnPrimary}">EMBRACE</button>
  </div>
</div>`;
  },

  accordion: (m) => {
    const k = organic(m);
    return `<!-- Organic · Accordion -->
<div class="${k.panel} w-full max-w-md divide-y divide-[#D4CEB8] p-0 overflow-hidden">
  <div class="p-5">
    <button class="w-full flex items-center justify-between text-left font-medium text-sm text-[#4A5D44]">
      <span>What is biophilic design?</span>
      <span class="text-[#C87D55] font-bold">-</span>
    </button>
    <p class="mt-3 ${k.muted} text-xs leading-relaxed">
      Designing environments that connect human beings to natural ecosystems through organic materials and shapes.
    </p>
  </div>
  <div class="p-5">
    <button class="w-full flex items-center justify-between text-left font-medium text-sm text-[#5C6E57]">
      <span>Earthy Terracotta Pigments</span>
      <span class="text-[#6E8560]">+</span>
    </button>
  </div>
</div>`;
  },

  tooltip: () => {
    return `<!-- Organic · Tooltip -->
<div class="relative inline-block">
  <div class="bg-[#2C352B] text-[#F4F1EA] border border-[#6E8560] px-3.5 py-1.5 text-xs font-medium rounded-full shadow-sm">
    Material: Terracotta Clay &amp; Stone
  </div>
</div>`;
  },

  tabs: (m) => {
    const k = organic(m);
    return `<!-- Organic · Tabs -->
<div class="flex border-b border-[#D4CEB8] w-full max-w-md font-medium text-sm">
  <button class="px-5 py-2.5 border-b-2 border-[#6E8560] text-[#4A5D44]">
    01. BOTANICAL
  </button>
  <button class="px-5 py-2.5 ${k.muted} hover:text-[#4A5D44]">
    02. TERRACOTTA
  </button>
  <button class="px-5 py-2.5 ${k.muted} hover:text-[#4A5D44]">
    03. STONE
  </button>
</div>`;
  },

  dropdown: (m) => {
    const k = organic(m);
    return `<!-- Organic · Dropdown -->
<div class="${k.panel} w-56 p-2 space-y-1 text-sm font-medium">
  <a href="#" class="block px-4 py-2.5 rounded-2xl bg-[#E3EADF] text-[#4A5D44]">Sage Leaf #8FA382</a>
  <a href="#" class="block px-4 py-2.5 rounded-2xl hover:bg-[#E3EADF] text-[#5C6E57] transition-colors">Terracotta #C87D55</a>
  <a href="#" class="block px-4 py-2.5 rounded-2xl hover:bg-[#E3EADF] text-[#5C6E57] transition-colors">Warm Stone #F4F1EA</a>
</div>`;
  },

  switch: () => {
    return `<!-- Organic · Switch -->
<div class="flex items-center gap-4">
  <button class="w-12 h-6 bg-[#6E8560] relative p-0.5 rounded-full flex items-center justify-end">
    <div class="w-5 h-5 bg-[#F4F1EA] rounded-full shadow-sm"></div>
  </button>
  <span class="text-xs font-medium text-[#4A5D44]">BIOPHILIC FLOW: ACTIVE</span>
</div>`;
  },

  skeleton: (m) => {
    const k = organic(m);
    return `<!-- Organic · Skeleton Loader -->
<div class="${k.panel} w-full max-w-sm p-6 space-y-4">
  <div class="h-4 bg-[#6E8560]/30 animate-pulse rounded-full w-1/3"></div>
  <div class="h-8 bg-[#D4CEB8]/40 animate-pulse rounded-2xl w-3/4"></div>
  <div class="space-y-2">
    <div class="h-3 bg-[#D4CEB8]/30 animate-pulse rounded-full w-full"></div>
    <div class="h-3 bg-[#D4CEB8]/30 animate-pulse rounded-full w-5/6"></div>
  </div>
</div>`;
  },

  toast: (m) => {
    const k = organic(m);
    return `<!-- Organic · Toast -->
<div class="${k.panel} w-full max-w-sm p-4 border-l-4 border-l-[#C87D55] flex items-start gap-3">
  <span class="h-3 w-3 bg-[#C87D55] rounded-full mt-0.5 flex-shrink-0"></span>
  <div class="space-y-1">
    <p class="text-xs font-bold text-[#4A5D44]">SANCTUARY UPDATED</p>
    <p class="${k.muted} text-xs">Botanical terracotta palette applied to workspace.</p>
  </div>
</div>`;
  },

  progress: () => {
    return `<!-- Organic · Progress Bar -->
<div class="w-full max-w-sm space-y-2">
  <div class="flex justify-between text-xs font-medium text-[#4A5D44]">
    <span>Ecosystem Growth</span>
    <span class="text-[#C87D55]">78%</span>
  </div>
  <div class="h-2 w-full bg-[#D4CEB8]/50 rounded-full overflow-hidden">
    <div class="h-full bg-gradient-to-r from-[#6E8560] to-[#C87D55] w-[78%] rounded-full"></div>
  </div>
</div>`;
  },

  avatar: () => {
    return `<!-- Organic · Avatar -->
<div class="flex items-center gap-3">
  <div class="w-10 h-10 bg-[#6E8560] text-[#F4F1EA] rounded-full flex items-center justify-center font-medium text-sm">
    FS
  </div>
  <div>
    <p class="font-medium text-xs text-[#4A5D44]">Flora Solis</p>
    <p class="text-[10px] text-[#5C6E57]">Biophilic Architect</p>
  </div>
</div>`;
  },
};
