import type { Mode } from "@/lib/styles/types";
import { kinetic } from "./kit";

const SV = {
  arrow: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>`,
  x: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
  zap: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>`,
};

export const kineticCode: Record<string, (mode: Mode) => string> = {
  button: (m) => {
    const k = kinetic(m);
    return `<!-- Kinetic · High Velocity Buttons -->
<div class="flex flex-wrap gap-4 items-center">
  <button class="${k.btnPrimary}">
    <span>MAX VELOCITY</span>
    ${SV.zap}
  </button>
  <button class="${k.btnSecondary}">
    <span>SLANTED BOOST</span>
  </button>
</div>`;
  },

  card: (m) => {
    const k = kinetic(m);
    return `<!-- Kinetic · Dynamic Motion Card -->
<div class="${k.panel} w-full max-w-md space-y-4">
  <div class="flex items-center justify-between border-b-2 ${m === 'dark' ? 'border-[#FF5500]' : 'border-[#0A0E17]'} pb-3">
    <div class="flex items-center gap-2">
      <span class="w-3 h-3 bg-[#FF5500] skew-x-[-6deg] inline-block"></span>
      <span class="w-3 h-3 bg-[#00E5FF] skew-x-[-6deg] inline-block"></span>
    </div>
    <span class="${k.badge}">KINETIC BOOSTER</span>
  </div>
  <h3 class="${k.heading} text-2xl leading-none">ACCELERATED MOTION ENGINE</h3>
  <p class="${k.muted} font-sans text-xs leading-relaxed uppercase">
    Slanted 6-degree angles, high-contrast kinetic orange, electric cyan accents, and velocity indicator lines.
  </p>
  <div class="pt-2 flex items-center justify-between">
    <span class="font-mono text-[10px] text-[#00E5FF] font-bold">SPD: 240 FPS</span>
    <button class="${k.btnPrimarySm}">
      <span>ACCELERATE</span>
      ${SV.arrow}
    </button>
  </div>
</div>`;
  },

  navbar: (m) => {
    const k = kinetic(m);
    return `<!-- Kinetic · Navbar -->
<header class="${k.bar} flex items-center justify-between px-6 py-4 w-full">
  <div class="flex items-center gap-3">
    <div class="w-5 h-5 bg-[#FF5500] skew-x-[-12deg] flex items-center justify-center text-white font-black text-xs">
      K
    </div>
    <a href="#" class="font-black text-sm uppercase tracking-wider text-[#FF5500] skew-x-[-4deg]">KINETIC_LAB</a>
  </div>

  <nav class="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest font-black">
    <a href="#" class="text-[#FF5500] underline decoration-2 underline-offset-4">01. SPEED</a>
    <a href="#" class="${k.muted} hover:text-[#00E5FF]">02. MOTION</a>
    <a href="#" class="${k.muted} hover:text-[#00E5FF]">03. VECTORS</a>
  </nav>

  <button class="${k.btnPrimarySm}">LAUNCH SPEED</button>
</header>`;
  },

  input: (m) => {
    const k = kinetic(m);
    return `<!-- Kinetic · Form Input -->
<div class="w-full max-w-sm space-y-1.5">
  <label class="${k.label}">01 // INPUT VELOCITY PARAMETER</label>
  <input type="text" placeholder="BOOST-ORANGE-900" class="${k.input}" />
  <p class="font-mono text-[10px] text-[#FF5500] font-bold">KINETIC ENGINE ACCELERATION</p>
</div>`;
  },

  badge: (m) => {
    const k = kinetic(m);
    return `<!-- Kinetic · Badges -->
<div class="flex flex-wrap items-center gap-3">
  <span class="${k.badge}">KINETIC ORANGE</span>
  <span class="${k.badgeOutline}">ELECTRIC CYAN</span>
  <span class="inline-flex items-center px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest bg-[#00E5FF] text-[#0A0E17] border border-black skew-x-[-4deg]">
    BOOST READY
  </span>
</div>`;
  },

  modal: (m) => {
    const k = kinetic(m);
    return `<!-- Kinetic · Modal -->
<div class="${k.panel} w-full max-w-md space-y-5">
  <div class="flex items-center justify-between border-b-2 ${m === 'dark' ? 'border-[#FF5500]' : 'border-[#0A0E17]'} pb-3">
    <span class="font-mono text-xs font-bold text-[#FF5500] skew-x-[-4deg]">MAX OVERDRIVE ALERT</span>
    <button class="${k.muted} hover:text-[#FF5500]">${SV.x}</button>
  </div>
  <h3 class="${k.heading} text-xl">ENGAGE TURBO BOOST ENGINE?</h3>
  <p class="${k.muted} font-sans text-xs leading-relaxed uppercase">
    Motion vector parameters will be boosted to maximum 240Hz refresh rate.
  </p>
  <div class="flex justify-end gap-3 pt-2">
    <button class="${k.btnSecondary}">ABORT</button>
    <button class="${k.btnPrimary}">ENGAGE BOOST</button>
  </div>
</div>`;
  },

  accordion: (m) => {
    const k = kinetic(m);
    return `<!-- Kinetic · Accordion -->
<div class="${k.panel} w-full max-w-md divide-y-2 ${m === 'dark' ? 'divide-[#FF5500]' : 'divide-[#0A0E17]'} p-0">
  <div class="p-4">
    <button class="w-full flex items-center justify-between text-left font-mono text-xs font-black uppercase tracking-wider text-[#FF5500]">
      <span>01 // WHAT IS KINETIC DESIGN?</span>
      <span class="font-black">-</span>
    </button>
    <p class="mt-3 ${k.muted} font-sans text-xs leading-relaxed uppercase">
      UI design centered around physical momentum, slanted 6-degree angles, speed lines, and rapid transition feedback.
    </p>
  </div>
  <div class="p-4">
    <button class="w-full flex items-center justify-between text-left font-mono text-xs font-black uppercase tracking-wider ${k.muted}">
      <span>02 // HIGH-ENERGY CONTRAST</span>
      <span class="font-black">+</span>
    </button>
  </div>
</div>`;
  },

  tooltip: () => {
    return `<!-- Kinetic · Tooltip -->
<div class="relative inline-block">
  <div class="bg-[#FF5500] text-white border-2 border-black px-3 py-1 font-mono text-[10px] font-black uppercase tracking-widest skew-x-[-6deg] shadow-[2px_2px_0_#00E5FF]">
    SPD: 240FPS-ORANGE
  </div>
</div>`;
  },

  tabs: (m) => {
    const k = kinetic(m);
    return `<!-- Kinetic · Tabs -->
<div class="flex border-b-2 ${m === 'dark' ? 'border-[#FF5500]' : 'border-[#0A0E17]'} w-full max-w-md font-mono text-xs">
  <button class="px-5 py-2.5 bg-[#FF5500] text-white font-black tracking-wider skew-x-[-4deg] border-r-2 border-black">
    01. VELOCITY
  </button>
  <button class="px-5 py-2.5 bg-[#00E5FF] text-[#0A0E17] font-black tracking-wider skew-x-[-4deg] border-r-2 border-black">
    02. TURBO
  </button>
  <button class="px-5 py-2.5 ${k.muted} font-black tracking-wider">
    03. VECTOR
  </button>
</div>`;
  },

  dropdown: (m) => {
    const k = kinetic(m);
    return `<!-- Kinetic · Dropdown -->
<div class="${k.panel} w-56 p-0 divide-y-2 ${m === 'dark' ? 'divide-[#FF5500]' : 'divide-[#0A0E17]'} font-mono text-xs uppercase tracking-wider">
  <div class="p-3 bg-[#FF5500] text-white font-black flex justify-between items-center skew-x-[-4deg]">
    <span>SELECT SPEED</span>
    <span>▼</span>
  </div>
  <a href="#" class="block p-3 text-[#00E5FF] hover:bg-[#00E5FF] hover:text-[#0A0E17] transition-colors">120 FPS HIGH</a>
  <a href="#" class="block p-3 text-[#FF5500] hover:bg-[#FF5500] hover:text-white transition-colors">240 FPS TURBO</a>
  <a href="#" class="block p-3 text-white hover:bg-white hover:text-black transition-colors">UNLIMITED MAX</a>
</div>`;
  },

  switch: () => {
    return `<!-- Kinetic · Switch -->
<div class="flex items-center gap-4">
  <button class="w-12 h-6 border-2 border-black bg-[#00E5FF] relative p-0.5 rounded-none skew-x-[-6deg] shadow-[2px_2px_0_#FF5500]">
    <div class="w-5 h-4.5 bg-[#FF5500] rounded-none"></div>
  </button>
  <span class="font-mono text-xs font-black text-[#FF5500] tracking-widest skew-x-[-4deg]">BOOST ENGINE: ACTIVE</span>
</div>`;
  },

  skeleton: (m) => {
    const k = kinetic(m);
    return `<!-- Kinetic · Skeleton -->
<div class="${k.panel} w-full max-w-sm p-6 space-y-4">
  <div class="h-4 bg-[#FF5500] animate-pulse w-1/3 skew-x-[-6deg]"></div>
  <div class="h-8 bg-[#00E5FF] animate-pulse w-3/4 border-2 border-black skew-x-[-4deg]"></div>
  <div class="space-y-2">
    <div class="h-3 bg-[#FF5500]/30 animate-pulse w-full"></div>
    <div class="h-3 bg-[#FF5500]/30 animate-pulse w-5/6"></div>
  </div>
</div>`;
  },

  toast: (m) => {
    const k = kinetic(m);
    return `<!-- Kinetic · Toast -->
<div class="${k.panel} w-full max-w-sm p-4 border-l-8 border-l-[#FF5500] flex items-start gap-3">
  <div class="w-3 h-3 bg-[#00E5FF] border border-black mt-0.5 flex-shrink-0 skew-x-[-6deg]"></div>
  <div class="space-y-1">
    <p class="font-mono text-xs font-black text-[#FF5500] skew-x-[-4deg]">VELOCITY BOOST DEPLOYED</p>
    <p class="${k.muted} font-mono text-xs uppercase">Engine refresh rate boosted to 240Hz.</p>
  </div>
</div>`;
  },

  progress: () => {
    return `<!-- Kinetic · Progress Bar -->
<div class="w-full max-w-sm space-y-2">
  <div class="flex justify-between font-mono text-xs font-black uppercase">
    <span class="text-[#00E5FF]">ACCELERATION</span>
    <span class="text-[#FF5500]">96%</span>
  </div>
  <div class="h-4 w-full border-2 border-black bg-[#0A0E17] p-0.5 shadow-[2px_2px_0_#FF5500]">
    <div class="h-full bg-gradient-to-r from-[#FF5500] to-[#00E5FF] w-[96%] skew-x-[-6deg]"></div>
  </div>
</div>`;
  },

  avatar: () => {
    return `<!-- Kinetic · Avatar -->
<div class="flex items-center gap-3">
  <div class="w-10 h-10 bg-[#FF5500] text-white border-2 border-[#00E5FF] flex items-center justify-center font-mono font-black text-sm skew-x-[-6deg] shadow-[2px_2px_0_#00E5FF]">
    KL
  </div>
  <div>
    <p class="font-black text-xs uppercase text-[#FF5500] skew-x-[-4deg]">SPEED RACER</p>
    <p class="font-mono text-[10px] text-[#00E5FF] uppercase font-bold">KINETIC PILOT</p>
  </div>
</div>`;
  },
};
