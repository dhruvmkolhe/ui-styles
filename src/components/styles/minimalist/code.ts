import type { Mode } from "@/lib/styles/types";
import { minimalist } from "./kit";

const SV = {
  arrow: `<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>`,
  image: `<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A1.5 1.5 0 0021.75 19.5V4.5A1.5 1.5 0 0020.25 3H3.75A1.5 1.5 0 002.25 4.5v15A1.5 1.5 0 003.75 21z"/></svg>`,
  x: `<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
  chevron: `<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>`,
  check: `<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  user: `<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>`,
  gear: `<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
  logout: `<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/></svg>`,
};

export const minimalistCode: Record<string, (mode: Mode) => string> = {
  button: (m) => {
    const k = minimalist(m);
    return `<!-- Minimalist · Button -->
<button class="${k.btnPrimary}">
  Get Started
</button>
<button class="${k.btnSecondary}">
  Overview ${SV.arrow}
</button>`;
  },

  card: (m) => {
    const k = minimalist(m);
    return `<!-- Minimalist · Card -->
<div class="${k.panel} w-full max-w-sm">
  <div class="${k.imagePlaceholder} flex h-32 items-center justify-center rounded-lg">
    ${SV.image}
  </div>
  <div class="mt-5 space-y-2">
    <span class="${k.badge}">Architecture</span>
    <h3 class="${k.strong} text-base tracking-tight">Monochrome Volume 01</h3>
    <p class="${k.muted} text-xs leading-relaxed">
      A quiet study in spatial proportions, light, and natural shadow play.
    </p>
    <div class="flex items-center justify-between pt-4">
      <button class="${k.btnPrimarySm}">Read essay</button>
      <span class="${k.faint} text-xs font-mono">01/08</span>
    </div>
  </div>
</div>`;
  },

  navbar: (m) => {
    const k = minimalist(m);
    return `<!-- Minimalist · Navbar -->
<div class="${k.bar} flex items-center justify-between px-6 py-3.5">
  <span class="text-xs tracking-[0.3em] font-light uppercase">STUDIO</span>
  <nav className="hidden items-center gap-8 text-xs font-light text-neutral-500 sm:flex">
    <a href="#" class="hover:text-black">Work</a>
    <a href="#" class="hover:text-black">Index</a>
    <a href="#" class="hover:text-black">About</a>
  </nav>
  <button class="${k.btnPrimarySm}">Contact</button>
</div>`;
  },

  input: (m) => {
    const k = minimalist(m);
    return `<!-- Minimalist · Input -->
<div class="w-full max-w-sm">
  <label class="${k.label}">SUBSCRIPTION EMAIL</label>
  <input class="${k.input}" placeholder="address@domain.com" />
</div>`;
  },

  badge: (m) => {
    const k = minimalist(m);
    return `<!-- Minimalist · Badges -->
<div class="flex items-center gap-3">
  <span class="${k.badge}">ARCHIVE</span>
  <span class="${k.badgeSolid}">FEATURED</span>
</div>`;
  },

  modal: (m) => {
    const k = minimalist(m);
    return `<!-- Minimalist · Modal -->
<div class="${k.panel} max-w-md w-full">
  <div class="flex items-center justify-between border-b border-neutral-100 pb-4">
    <h3 class="${k.strong} text-sm font-normal">Export Workspace</h3>
    <button class="${k.iconBtn}">${SV.x}</button>
  </div>
  <p class="mt-4 text-xs ${k.muted} leading-relaxed">
    All canvas state will be packaged as a single vector file with embedded font definitions.
  </p>
  <div class="mt-6 flex justify-end gap-3">
    <button class="${k.btnSecondary}">Dismiss</button>
    <button class="${k.btnPrimarySm}">Export PDF</button>
  </div>
</div>`;
  },

  accordion: (m) => {
    const k = minimalist(m);
    return `<!-- Minimalist · Accordion -->
<div class="space-y-2">
  <div class="${k.panelSoft} p-4">
    <div class="flex items-center justify-between text-xs font-light tracking-wide cursor-pointer">
      <span>Core Design Principles</span>
      ${SV.chevron}
    </div>
    <p class="mt-3 text-xs leading-relaxed ${k.muted}">
      Minimalism strips non-essentials to emphasize purpose, clarity and serene balance.
    </p>
  </div>
</div>`;
  },

  tooltip: (m) => {
    const k = minimalist(m);
    return `<!-- Minimalist · Tooltip -->
<div class="${k.tooltip}">
  Shift + Click to inspect
</div>`;
  },

  tabs: (m) => {
    const k = minimalist(m);
    return `<!-- Minimalist · Tabs -->
<div class="${k.tabList}">
  <button class="${k.tabActive}">Selected</button>
  <button class="${k.tabIdle}">Overview</button>
  <button class="${k.tabIdle}">Settings</button>
</div>`;
  },

  dropdown: (m) => {
    const k = minimalist(m);
    return `<!-- Minimalist · Dropdown -->
<div class="${k.menu} p-1.5 w-44 space-y-0.5">
  <button class="${k.menuItem}">${SV.user} Profile</button>
  <button class="${k.menuItem}">${SV.gear} Preferences</button>
  <button class="${k.menuItem} ${k.dangerText}">${SV.logout} Sign out</button>
</div>`;
  },

  switch: (m) => {
    const k = minimalist(m);
    return `<!-- Minimalist · Switch -->
<div class="flex items-center gap-3">
  <div class="relative h-5 w-9 cursor-pointer rounded-full ${k.switchOn} transition-colors">
    <div class="absolute top-0.5 left-4 h-4 w-4 rounded-full bg-white transition-all shadow-sm"></div>
  </div>
</div>`;
  },

  skeleton: (m) => {
    const k = minimalist(m);
    return `<!-- Minimalist · Skeleton -->
<div class="space-y-2.5">
  <div class="${k.skeleton} h-6 w-2/3"></div>
  <div class="${k.skeleton} h-3.5 w-full"></div>
  <div class="${k.skeleton} h-3.5 w-4/5"></div>
</div>`;
  },

  toast: (m) => {
    const k = minimalist(m);
    return `<!-- Minimalist · Toast -->
<div class="${k.successBg} p-3.5 rounded-lg flex items-center justify-between max-w-sm">
  <div class="flex items-center gap-2.5 text-xs font-light">
    ${SV.check}
    <span>Document published to index</span>
  </div>
  ${SV.x}
</div>`;
  },

  progress: (m) => {
    const k = minimalist(m);
    return `<!-- Minimalist · Progress Bar -->
<div class="${k.track} h-1 w-full rounded-full overflow-hidden">
  <div class="${k.fill} h-full w-2/3"></div>
</div>`;
  },

  avatar: () => {
    return `<!-- Minimalist · Avatar -->
<div class="flex items-center gap-3">
  <div class="h-9 w-9 rounded-full bg-neutral-900 font-light text-xs flex items-center justify-center text-white">
    M
  </div>
</div>`;
  },
};
