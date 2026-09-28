import type { Mode } from "@/lib/styles/types";
import { gradientModern } from "./kit";

const SV = {
  arrow: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>`,
  x: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
  sparkle: `<svg class="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/></svg>`,
};

export const gradientModernCode: Record<string, (mode: Mode) => string> = {
  button: (m) => {
    const k = gradientModern(m);
    return `<!-- Gradient Modern · Mesh Action Buttons -->
<div class="flex flex-wrap gap-4 items-center">
  <button class="${k.btnPrimary}">
    <span>GENERATE MESH</span>
    ${SV.sparkle}
  </button>
  <button class="${k.btnSecondary}">
    <span>VIEW SHADERS</span>
  </button>
</div>`;
  },

  card: (m) => {
    const k = gradientModern(m);
    return `<!-- Gradient Modern · Translucent Mesh Card -->
<div class="${k.panel} w-full max-w-md space-y-4">
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-2">
      ${SV.sparkle}
      <span class="text-xs font-semibold text-purple-400">SHADER v4.2</span>
    </div>
    <span class="${k.badge}">MESH GRADIENT</span>
  </div>
  <h3 class="${k.heading} text-2xl font-bold">Luminous Prism Surfaces</h3>
  <p class="${k.muted} text-sm leading-relaxed">
    Rich indigo-to-fuchsia mesh gradients radiating through frosted glass panels with smooth lighting highlights.
  </p>
  <div class="pt-2 flex items-center justify-between border-t border-white/10">
    <span class="text-xs text-indigo-400 font-medium">Spectrum Shift</span>
    <button class="${k.btnPrimarySm}">
      <span>LAUNCH</span>
      ${SV.arrow}
    </button>
  </div>
</div>`;
  },

  navbar: (m) => {
    const k = gradientModern(m);
    return `<!-- Gradient Modern · Navbar -->
<header class="${k.bar} flex items-center justify-between px-6 py-4 w-full">
  <div class="flex items-center gap-3">
    <div class="w-8 h-8 rounded-xl bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#EC4899] text-white flex items-center justify-center font-bold text-xs shadow-md">
      GM
    </div>
    <a href="#" class="font-bold text-base text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#EC4899]">PrismUI</a>
  </div>

  <nav class="hidden md:flex items-center gap-6 text-sm text-slate-400 font-medium">
    <a href="#" class="text-purple-400 border-b-2 border-purple-500 pb-0.5">Shaders</a>
    <a href="#" class="hover:text-purple-300">Gradients</a>
    <a href="#" class="hover:text-purple-300">Prisms</a>
  </nav>

  <button class="${k.btnPrimarySm}">GET STARTED</button>
</header>`;
  },

  input: (m) => {
    const k = gradientModern(m);
    return `<!-- Gradient Modern · Form Input -->
<div class="w-full max-w-sm space-y-1">
  <label class="${k.label}">SPECTRAL PROMPT</label>
  <input type="text" placeholder="indigo-fuchsia-glow-mesh" class="${k.input}" />
  <p class="text-xs text-slate-400">Enter custom CSS gradient parameters</p>
</div>`;
  },

  badge: (m) => {
    const k = gradientModern(m);
    return `<!-- Gradient Modern · Badges -->
<div class="flex flex-wrap items-center gap-3">
  <span class="${k.badge}">Prism Mesh</span>
  <span class="${k.badgeOutline}">Electric Cyan</span>
  <span class="inline-flex items-center px-3 py-1 text-xs font-medium bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] text-white rounded-full shadow-sm">
    Fuchsia Glow
  </span>
</div>`;
  },

  modal: (m) => {
    const k = gradientModern(m);
    return `<!-- Gradient Modern · Modal -->
<div class="${k.panel} w-full max-w-md space-y-5">
  <div class="flex items-center justify-between">
    <h3 class="${k.heading} text-xl font-bold">Deploy Spectral Shader?</h3>
    <button class="text-slate-400 hover:text-white">${SV.x}</button>
  </div>
  <p class="${k.muted} text-sm leading-relaxed">
    This action will compile 3D mesh gradient shaders and project smooth color glows across all active components.
  </p>
  <div class="flex justify-end gap-3 pt-2">
    <button class="${k.btnSecondary}">CANCEL</button>
    <button class="${k.btnPrimary}">DEPLOY SHADER</button>
  </div>
</div>`;
  },

  accordion: (m) => {
    const k = gradientModern(m);
    return `<!-- Gradient Modern · Accordion -->
<div class="${k.panel} w-full max-w-md divide-y divide-white/10 p-0 overflow-hidden">
  <div class="p-5">
    <button class="w-full flex items-center justify-between text-left font-semibold text-sm text-purple-400">
      <span>What are mesh gradient shaders?</span>
      <span class="text-purple-400 font-bold">-</span>
    </button>
    <p class="mt-3 ${k.muted} text-xs leading-relaxed">
      Multi-point color interpolations rendering smooth continuous spectrum transitions across translucent UI surfaces.
    </p>
  </div>
  <div class="p-5">
    <button class="w-full flex items-center justify-between text-left font-semibold text-sm text-slate-300">
      <span>Hardware Acceleration &amp; Performance</span>
      <span class="text-purple-400">+</span>
    </button>
  </div>
</div>`;
  },

  tooltip: () => {
    return `<!-- Gradient Modern · Tooltip -->
<div class="relative inline-block">
  <div class="bg-gradient-to-r from-[#6366F1] to-[#A855F7] text-white px-3.5 py-1.5 text-xs font-medium rounded-lg shadow-lg">
    Shader: Indigo-Fuchsia-Mesh-04
  </div>
</div>`;
  },

  tabs: (m) => {
    const k = gradientModern(m);
    return `<!-- Gradient Modern · Tabs -->
<div class="flex border-b border-white/10 w-full max-w-md font-medium text-sm">
  <button class="px-5 py-2.5 border-b-2 border-purple-500 text-purple-400 font-bold">
    01. MESH
  </button>
  <button class="px-5 py-2.5 ${k.muted} hover:text-purple-300">
    02. SHADERS
  </button>
  <button class="px-5 py-2.5 ${k.muted} hover:text-purple-300">
    03. PRISMS
  </button>
</div>`;
  },

  dropdown: (m) => {
    const k = gradientModern(m);
    return `<!-- Gradient Modern · Dropdown -->
<div class="${k.panel} w-56 p-2 space-y-1 text-sm font-medium">
  <a href="#" class="block px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#6366F1]/20 to-[#A855F7]/20 text-purple-300">Indigo Fuchsia Shader</a>
  <a href="#" class="block px-4 py-2.5 rounded-xl hover:bg-white/5 text-slate-300 transition-colors">Electric Cyan Mesh</a>
  <a href="#" class="block px-4 py-2.5 rounded-xl hover:bg-white/5 text-slate-300 transition-colors">Sunset Aurora Mesh</a>
</div>`;
  },

  switch: () => {
    return `<!-- Gradient Modern · Switch -->
<div class="flex items-center gap-4">
  <button class="w-12 h-6 bg-gradient-to-r from-[#6366F1] to-[#EC4899] relative p-0.5 rounded-full shadow-md flex items-center justify-end">
    <div class="w-5 h-5 bg-white rounded-full shadow-sm"></div>
  </button>
  <span class="text-xs font-bold text-purple-400">GRADIENT SHADOWS: ACTIVE</span>
</div>`;
  },

  skeleton: (m) => {
    const k = gradientModern(m);
    return `<!-- Gradient Modern · Skeleton Loader -->
<div class="${k.panel} w-full max-w-sm p-6 space-y-4">
  <div class="h-4 bg-gradient-to-r from-[#6366F1]/40 to-[#EC4899]/40 animate-pulse rounded-full w-1/3"></div>
  <div class="h-8 bg-white/10 animate-pulse rounded-xl w-3/4"></div>
  <div class="space-y-2">
    <div class="h-3 bg-white/10 animate-pulse rounded-full w-full"></div>
    <div class="h-3 bg-white/10 animate-pulse rounded-full w-5/6"></div>
  </div>
</div>`;
  },

  toast: (m) => {
    const k = gradientModern(m);
    return `<!-- Gradient Modern · Toast -->
<div class="${k.panel} w-full max-w-sm p-4 border-l-4 border-l-[#EC4899] shadow-xl flex items-start gap-3">
  <span class="h-3 w-3 bg-gradient-to-r from-[#6366F1] to-[#EC4899] rounded-full mt-0.5 flex-shrink-0"></span>
  <div class="space-y-1">
    <p class="text-xs font-bold text-purple-300">SHADER COMPILED</p>
    <p class="${k.muted} text-xs">Gradient mesh parameters saved to GPU cache.</p>
  </div>
</div>`;
  },

  progress: () => {
    return `<!-- Gradient Modern · Progress Bar -->
<div class="w-full max-w-sm space-y-2">
  <div class="flex justify-between text-xs font-bold text-purple-400">
    <span>Compiling Mesh Shaders</span>
    <span class="text-pink-400">88%</span>
  </div>
  <div class="h-2 w-full bg-white/10 rounded-full overflow-hidden">
    <div class="h-full bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#EC4899] w-[88%] rounded-full shadow-lg"></div>
  </div>
</div>`;
  },

  avatar: () => {
    return `<!-- Gradient Modern · Avatar -->
<div class="flex items-center gap-3">
  <div class="w-10 h-10 bg-gradient-to-tr from-[#6366F1] via-[#A855F7] to-[#EC4899] text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-md">
    GM
  </div>
  <div>
    <p class="font-bold text-xs text-purple-300">Prism Developer</p>
    <p class="text-[10px] text-slate-400">GPU Shader Engineer</p>
  </div>
</div>`;
  },
};
