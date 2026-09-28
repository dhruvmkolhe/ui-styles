import type { Mode } from "@/lib/styles/types";
import { retroFuturistic } from "./kit";

const SV = {
  arrow: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7m0 0l-7 7m7-7H3"/></svg>`,
  x: `<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
  zap: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>`,
};

export const retroFuturisticCode: Record<string, (mode: Mode) => string> = {
  button: (m) => {
    const k = retroFuturistic(m);
    return `<!-- Retro Futuristic · Neon Action Buttons -->
<div class="flex flex-wrap gap-4 items-center">
  <button class="${k.btnPrimary}">
    <span>ENGAGE HYPERDRIVE</span>
    ${SV.zap}
  </button>
  <button class="${k.btnSecondary}">
    <span>GRID INITIALIZE</span>
  </button>
</div>`;
  },

  card: (m) => {
    const k = retroFuturistic(m);
    return `<!-- Retro Futuristic · Neon Synth Card -->
<div class="${k.panel} w-full max-w-md space-y-4">
  <div class="flex items-center justify-between border-b border-[#00F0FF]/30 pb-3">
    <span class="font-mono text-xs font-bold text-[#00F0FF] tracking-widest">// SECTOR 084</span>
    <span class="${k.badge}">SYNTHWAVE</span>
  </div>
  <h3 class="${k.heading} text-2xl leading-none">CYBER HORIZON 1984</h3>
  <p class="${k.muted} font-mono text-xs leading-relaxed">
    Neon grid horizons, chrome reflections, and vector speed lines radiating into the retro cosmic void.
  </p>
  <div class="pt-2 flex items-center justify-between">
    <span class="font-mono text-[10px] text-[#FF00AA]">FREQ: 108.4 MHZ</span>
    <button class="${k.btnPrimarySm}">
      <span>LAUNCH</span>
      ${SV.arrow}
    </button>
  </div>
</div>`;
  },

  navbar: (m) => {
    const k = retroFuturistic(m);
    return `<!-- Retro Futuristic · Neon Navbar -->
<header class="${k.bar} flex items-center justify-between px-6 py-4 w-full">
  <div class="flex items-center gap-3">
    <span class="h-3 w-3 bg-[#FF00AA] shadow-[0_0_10px_#FF00AA] inline-block rotate-45"></span>
    <a href="#" class="font-mono font-black text-sm text-[#00F0FF] tracking-widest">NEON_PROTOCOL_</a>
  </div>

  <nav class="hidden md:flex items-center gap-8 font-mono text-xs text-[#B399D4] tracking-widest">
    <a href="#" class="text-[#FF00AA] shadow-sm hover:text-white transition-colors">[GRID]</a>
    <a href="#" class="hover:text-[#00F0FF] transition-colors">[SYNTH]</a>
    <a href="#" class="hover:text-[#00F0FF] transition-colors">[CHROME]</a>
  </nav>

  <button class="${k.btnPrimarySm}">SYSTEM LOGIN</button>
</header>`;
  },

  input: (m) => {
    const k = retroFuturistic(m);
    return `<!-- Retro Futuristic · Input Field -->
<div class="w-full max-w-sm space-y-1.5">
  <label class="${k.label}">INPUT VECTOR CODE</label>
  <input type="text" placeholder="SYNTH-8492-X" class="${k.input}" />
  <p class="font-mono text-[10px] text-[#00F0FF] tracking-widest">TRANSMISSION ENCRYPTED 256-BIT</p>
</div>`;
  },

  badge: (m) => {
    const k = retroFuturistic(m);
    return `<!-- Retro Futuristic · Neon Badges -->
<div class="flex flex-wrap items-center gap-3">
  <span class="${k.badge}">NEON ACTIVE</span>
  <span class="${k.badgeOutline}">GRID ONLINE</span>
  <span class="inline-flex items-center px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest bg-[#9D00FF] text-white shadow-[0_0_10px_#9D00FF]">
    OVERDRIVE
  </span>
</div>`;
  },

  modal: (m) => {
    const k = retroFuturistic(m);
    return `<!-- Retro Futuristic · Neon Modal -->
<div class="${k.panel} w-full max-w-md space-y-5">
  <div class="flex items-center justify-between border-b border-[#FF00AA]/40 pb-3">
    <span class="font-mono text-xs font-bold text-[#FF00AA] tracking-widest">! OVERHEAT ALERT !</span>
    <button class="text-[#00F0FF] hover:text-[#FF00AA]">${SV.x}</button>
  </div>
  <h3 class="${k.heading} text-xl">CRITICAL MATRIX CORE OVERLOAD</h3>
  <p class="${k.muted} font-mono text-xs leading-relaxed">
    Grid frequency exceeds 88.4 gigahertz. Coolant injection required to prevent total digital singularity.
  </p>
  <div class="flex justify-end gap-3 pt-2">
    <button class="${k.btnSecondary}">ABORT</button>
    <button class="${k.btnPrimary}">ENGAGE COOLANT</button>
  </div>
</div>`;
  },

  accordion: (m) => {
    const k = retroFuturistic(m);
    return `<!-- Retro Futuristic · Accordion -->
<div class="${k.panel} w-full max-w-md divide-y divide-[#00F0FF]/20 p-0">
  <div class="p-4">
    <button class="w-full flex items-center justify-between text-left font-mono text-xs font-bold text-[#00F0FF] tracking-widest">
      <span>01 // WHAT IS RETRO FUTURISM?</span>
      <span class="text-[#FF00AA] font-black">-</span>
    </button>
    <p class="mt-3 ${k.muted} font-mono text-xs leading-relaxed">
      A nostalgic aesthetic celebrating how the 1980s envisioned the distant cyberpunk future of 2026.
    </p>
  </div>
  <div class="p-4">
    <button class="w-full flex items-center justify-between text-left font-mono text-xs font-bold text-[#B399D4] tracking-widest">
      <span>02 // SYNTHWAVE AUDIO CHANNELS</span>
      <span class="text-[#00F0FF]">+</span>
    </button>
  </div>
</div>`;
  },

  tooltip: () => {
    return `<!-- Retro Futuristic · Neon Tooltip -->
<div class="relative inline-block">
  <div class="bg-[#090014] text-[#00F0FF] border border-[#FF00AA] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest shadow-[0_0_12px_#FF00AA]">
    GRID MATRIX: 1984-X
  </div>
</div>`;
  },

  tabs: (m) => {
    const k = retroFuturistic(m);
    return `<!-- Retro Futuristic · Tabs -->
<div class="flex border-b border-[#00F0FF]/40 w-full max-w-md font-mono text-xs">
  <button class="px-5 py-2.5 bg-gradient-to-r from-[#FF00AA] to-[#9D00FF] text-white font-bold tracking-widest shadow-[0_0_10px_#FF00AA]">
    01. GRID
  </button>
  <button class="px-5 py-2.5 ${k.muted} hover:text-[#00F0FF] tracking-widest">
    02. SYNTH
  </button>
  <button class="px-5 py-2.5 ${k.muted} hover:text-[#00F0FF] tracking-widest">
    03. VECTOR
  </button>
</div>`;
  },

  dropdown: (m) => {
    const k = retroFuturistic(m);
    return `<!-- Retro Futuristic · Dropdown -->
<div class="${k.panel} w-56 p-0 divide-y divide-[#00F0FF]/30 font-mono text-xs tracking-widest">
  <div class="p-3 bg-[#FF00AA] text-white font-bold flex justify-between items-center shadow-[0_0_10px_#FF00AA]">
    <span>SELECT VECTOR</span>
    <span>▼</span>
  </div>
  <a href="#" class="block p-3 text-[#00F0FF] hover:bg-[#00F0FF]/10 hover:text-white transition-colors">ALPHA SECTOR</a>
  <a href="#" class="block p-3 text-[#00F0FF] hover:bg-[#00F0FF]/10 hover:text-white transition-colors">CYBER HORIZON</a>
  <a href="#" class="block p-3 text-[#00F0FF] hover:bg-[#00F0FF]/10 hover:text-white transition-colors">NEON WASTELAND</a>
</div>`;
  },

  switch: () => {
    return `<!-- Retro Futuristic · Neon Switch -->
<div class="flex items-center gap-4">
  <button class="w-12 h-6 border border-[#00F0FF] bg-[#090014] relative p-0.5 shadow-[0_0_10px_rgba(0,240,255,0.4)]">
    <div class="w-5 h-4.5 bg-[#FF00AA] shadow-[0_0_10px_#FF00AA]"></div>
  </button>
  <span class="font-mono text-xs font-bold text-[#FF00AA] tracking-widest">NEON GLOW: ONLINE</span>
</div>`;
  },

  skeleton: (m) => {
    const k = retroFuturistic(m);
    return `<!-- Retro Futuristic · Skeleton -->
<div class="${k.panel} w-full max-w-sm p-6 space-y-4">
  <div class="h-4 bg-[#FF00AA] animate-pulse shadow-[0_0_10px_#FF00AA] w-1/3"></div>
  <div class="h-8 bg-[#00F0FF]/30 animate-pulse w-3/4 border border-[#00F0FF]/50"></div>
  <div class="space-y-2">
    <div class="h-3 bg-[#9D00FF]/30 animate-pulse w-full"></div>
    <div class="h-3 bg-[#9D00FF]/30 animate-pulse w-5/6"></div>
  </div>
</div>`;
  },

  toast: (m) => {
    const k = retroFuturistic(m);
    return `<!-- Retro Futuristic · Toast -->
<div class="${k.panel} w-full max-w-sm p-4 border-l-4 border-l-[#FF00AA] shadow-[0_0_20px_rgba(255,0,170,0.4)] flex items-start gap-3">
  <span class="h-3 w-3 bg-[#FF00AA] shadow-[0_0_8px_#FF00AA] mt-0.5 flex-shrink-0"></span>
  <div class="space-y-1">
    <p class="font-mono text-xs font-bold text-[#00F0FF] tracking-widest">// SIGNAL RECEIVED</p>
    <p class="${k.muted} font-mono text-xs">Synthwave vector link established at 1.21 gigawatts.</p>
  </div>
</div>`;
  },

  progress: () => {
    return `<!-- Retro Futuristic · Progress Bar -->
<div class="w-full max-w-sm space-y-2">
  <div class="flex justify-between font-mono text-xs font-bold tracking-widest">
    <span class="text-[#00F0FF]">NEON FREQUENCY</span>
    <span class="text-[#FF00AA]">88%</span>
  </div>
  <div class="h-3 w-full border border-[#00F0FF] bg-[#090014] p-0.5 shadow-[0_0_10px_rgba(0,240,255,0.3)]">
    <div class="h-full bg-gradient-to-r from-[#FF00AA] to-[#00F0FF] w-[88%] shadow-[0_0_12px_#FF00AA]"></div>
  </div>
</div>`;
  },

  avatar: () => {
    return `<!-- Retro Futuristic · Avatar -->
<div class="flex items-center gap-3">
  <div class="w-10 h-10 bg-gradient-to-br from-[#FF00AA] to-[#00F0FF] text-white flex items-center justify-center font-mono font-black text-sm shadow-[0_0_15px_#FF00AA] border border-white">
    84
  </div>
  <div>
    <p class="font-mono font-bold text-xs text-[#00F0FF] tracking-widest">VECTOR RIDER</p>
    <p class="font-mono text-[10px] text-[#FF00AA] tracking-widest">LEVEL 99 SYNTH</p>
  </div>
</div>`;
  },
};
