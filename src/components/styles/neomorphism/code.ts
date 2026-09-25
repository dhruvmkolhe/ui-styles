import type { Mode } from "@/lib/styles/types";
import { neomorphism } from "./kit";

const SV = {
  arrow: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>`,
  image: `<svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A1.5 1.5 0 0021.75 19.5V4.5A1.5 1.5 0 0020.25 3H3.75A1.5 1.5 0 002.25 4.5v15A1.5 1.5 0 003.75 21z"/></svg>`,
  x: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
  chevron: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>`,
  check: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  user: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>`,
  gear: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
  logout: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/></svg>`,
};

export const neomorphismCode: Record<string, (mode: Mode) => string> = {
  button: (m) => {
    const k = neomorphism(m);
    return `<!-- Neomorphism · Button -->
<button class="${k.btnPrimary}">
  Extruded Button
</button>
<button class="${k.btnSecondary}">
  Soft Surface ${SV.arrow}
</button>`;
  },

  card: (m) => {
    const k = neomorphism(m);
    return `<!-- Neomorphism · Card -->
<div class="${k.panel} w-full max-w-sm">
  <div class="${k.imagePlaceholder} flex h-36 items-center justify-center rounded-xl">
    ${SV.image}
  </div>
  <div class="mt-5 space-y-2.5">
    <h3 class="${k.strong} text-base font-semibold">Tactile Audio Hub</h3>
    <p class="${k.muted} text-xs leading-relaxed">
      Extruded elements molded directly from the background canvas with soft dual shadows.
    </p>
    <div class="flex items-center justify-between pt-3">
      <button class="${k.btnPrimarySm}">Interact</button>
      <span class="${k.faint} text-xs">v2.4</span>
    </div>
  </div>
</div>`;
  },

  navbar: (m) => {
    const k = neomorphism(m);
    return `<!-- Neomorphism · Navbar -->
<div class="${k.bar} flex items-center justify-between px-6 py-4">
  <span class="text-sm font-bold tracking-wide text-[#6d7df2]">SOFT.UI</span>
  <nav className="hidden items-center gap-6 text-xs font-medium ${k.muted} sm:flex">
    <a href="#" class="hover:text-[#6d7df2]">Surfaces</a>
    <a href="#" class="hover:text-[#6d7df2]">Controls</a>
    <a href="#" class="hover:text-[#6d7df2]">Specs</a>
  </nav>
  <button class="${k.btnPrimarySm}">Connect</button>
</div>`;
  },

  input: (m) => {
    const k = neomorphism(m);
    return `<!-- Neomorphism · Input -->
<div class="w-full max-w-sm">
  <label class="${k.label}">PRESSED INPUT SURFACE</label>
  <input class="${k.input}" placeholder="Type message..." />
</div>`;
  },

  badge: (m) => {
    const k = neomorphism(m);
    return `<!-- Neomorphism · Badges -->
<div class="flex items-center gap-3">
  <span class="${k.badge}">Extruded</span>
  <span class="${k.badgeSolid}">Active</span>
</div>`;
  },

  modal: (m) => {
    const k = neomorphism(m);
    return `<!-- Neomorphism · Modal -->
<div class="${k.panel} max-w-md w-full">
  <div class="flex items-center justify-between border-b border-[#b8bec7]/40 pb-3">
    <h3 class="${k.strong} text-sm font-semibold">Tactile Dialog</h3>
    <button class="${k.iconBtn}">${SV.x}</button>
  </div>
  <p class="mt-4 text-xs ${k.muted} leading-relaxed">
    Adjust system volume curves and tactile feedback sensitivity across paired controllers.
  </p>
  <div class="mt-6 flex justify-end gap-3">
    <button class="${k.btnSecondary}">Back</button>
    <button class="${k.btnPrimarySm}">Save State</button>
  </div>
</div>`;
  },

  accordion: (m) => {
    const k = neomorphism(m);
    return `<!-- Neomorphism · Accordion -->
<div class="space-y-3">
  <div class="${k.panel} p-4">
    <div class="flex items-center justify-between text-xs font-semibold ${k.strong} cursor-pointer">
      <span>How does Neomorphism work?</span>
      ${SV.chevron}
    </div>
    <p class="mt-2.5 text-xs leading-relaxed ${k.muted}">
      It uses light and dark drop shadows on a canvas of identical background color to create extruded surface depth.
    </p>
  </div>
</div>`;
  },

  tooltip: (m) => {
    const k = neomorphism(m);
    return `<!-- Neomorphism · Tooltip -->
<div class="${k.tooltip}">
  Soft Floating Tooltip
</div>`;
  },

  tabs: (m) => {
    const k = neomorphism(m);
    return `<!-- Neomorphism · Tabs -->
<div class="${k.tabList}">
  <button class="${k.tabActive}">Sound</button>
  <button class="${k.tabIdle}">Display</button>
  <button class="${k.tabIdle}">Network</button>
</div>`;
  },

  dropdown: (m) => {
    const k = neomorphism(m);
    return `<!-- Neomorphism · Dropdown -->
<div class="${k.menu} p-2 w-48 space-y-1">
  <button class="${k.menuItem}">${SV.user} My Account</button>
  <button class="${k.menuItem}">${SV.gear} Device Hub</button>
  <button class="${k.menuItem} ${k.dangerText}">${SV.logout} Disconnect</button>
</div>`;
  },

  switch: (m) => {
    const k = neomorphism(m);
    return `<!-- Neomorphism · Switch -->
<div class="flex items-center gap-3">
  <div class="relative h-7 w-14 cursor-pointer rounded-full ${k.switchOn}">
    <div class="absolute top-1 left-7 h-5 w-5 rounded-full bg-[#6d7df2] shadow-[2px_2px_5px_#b8bec7,-2px_-2px_5px_#ffffff]"></div>
  </div>
</div>`;
  },

  skeleton: (m) => {
    const k = neomorphism(m);
    return `<!-- Neomorphism · Skeleton -->
<div class="space-y-3">
  <div class="${k.skeleton} h-7 w-3/4"></div>
  <div class="${k.skeleton} h-4 w-full"></div>
  <div class="${k.skeleton} h-4 w-2/3"></div>
</div>`;
  },

  toast: (m) => {
    const k = neomorphism(m);
    return `<!-- Neomorphism · Toast -->
<div class="${k.successBg} p-4 rounded-xl flex items-center justify-between max-w-sm">
  <div class="flex items-center gap-2.5 text-xs font-semibold">
    ${SV.check}
    <span>Preset saved into memory</span>
  </div>
  ${SV.x}
</div>`;
  },

  progress: (m) => {
    const k = neomorphism(m);
    return `<!-- Neomorphism · Progress Bar -->
<div class="${k.track} h-3 w-full rounded-full p-0.5 overflow-hidden">
  <div class="${k.fill} h-full w-4/5 rounded-full"></div>
</div>`;
  },

  avatar: (m) => {
    const k = neomorphism(m);
    return `<!-- Neomorphism · Avatar -->
<div class="flex items-center gap-3">
  <div class="h-11 w-11 rounded-full bg-transparent ${k.badge} flex items-center justify-center font-bold text-xs text-[#6d7df2]">
    SO
  </div>
</div>`;
  },
};
