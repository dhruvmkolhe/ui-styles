import type { Mode } from "@/lib/styles/types";
import { bentoGrid } from "./kit";

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

export const bentoGridCode: Record<string, (mode: Mode) => string> = {
  button: (m) => {
    const k = bentoGrid(m);
    return `<!-- Bento Grid · Button -->
<button class="${k.btnPrimary}">
  Explore Feature
</button>
<button class="${k.btnSecondary}">
  Documentation ${SV.arrow}
</button>`;
  },

  card: (m) => {
    const k = bentoGrid(m);
    return `<!-- Bento Grid · Card -->
<div class="${k.panel} w-full max-w-sm">
  <div class="${k.imagePlaceholder} flex h-36 items-center justify-center rounded-xl">
    ${SV.image}
  </div>
  <div class="mt-4 space-y-2">
    <span class="${k.badge}">Bento Card 2x1</span>
    <h3 class="${k.strong} text-base">Editorial Grid Component</h3>
    <p class="${k.muted} text-xs leading-relaxed">
      Asymmetric modular cards with clean subtle borders, popularized by Apple, Linear and Vercel.
    </p>
    <div class="flex items-center justify-between pt-3">
      <button class="${k.btnPrimarySm}">Learn more</button>
      <span class="${k.faint} text-xs font-mono">⌘ + B</span>
    </div>
  </div>
</div>`;
  },

  navbar: (m) => {
    const k = bentoGrid(m);
    return `<!-- Bento Grid · Navbar -->
<div class="${k.bar} flex items-center justify-between px-6 py-3.5">
  <div class="flex items-center gap-2">
    <div class="h-3 w-3 rounded-md bg-indigo-500"></div>
    <span class="text-sm font-bold tracking-tight">BentoUI</span>
  </div>
  <nav className="hidden items-center gap-6 text-xs font-medium ${k.muted} sm:flex">
    <a href="#" class="hover:text-white">Grid</a>
    <a href="#" class="hover:text-white">Modules</a>
    <a href="#" class="hover:text-white">Showcase</a>
  </nav>
  <button class="${k.btnPrimarySm}">Deploy</button>
</div>`;
  },

  input: (m) => {
    const k = bentoGrid(m);
    return `<!-- Bento Grid · Input -->
<div class="w-full max-w-sm">
  <label class="${k.label}">WORKSPACE NAME</label>
  <input class="${k.input}" placeholder="my-linear-team" />
</div>`;
  },

  badge: (m) => {
    const k = bentoGrid(m);
    return `<!-- Bento Grid · Badges -->
<div class="flex items-center gap-3">
  <span class="${k.badge}">2x2 Feature</span>
  <span class="${k.badgeSolid}">Vercel Stack</span>
</div>`;
  },

  modal: (m) => {
    const k = bentoGrid(m);
    return `<!-- Bento Grid · Modal -->
<div class="${k.panel} max-w-md w-full">
  <div class="flex items-center justify-between border-b border-white/10 pb-3">
    <h3 class="${k.strong} text-sm font-semibold">Modular Grid Config</h3>
    <button class="${k.iconBtn}">${SV.x}</button>
  </div>
  <p class="mt-4 text-xs ${k.muted} leading-relaxed">
    Rearrange bento cards dynamically across breakpoints for desktop and mobile viewport rendering.
  </p>
  <div class="mt-6 flex justify-end gap-3">
    <button class="${k.btnSecondary}">Cancel</button>
    <button class="${k.btnPrimarySm}">Apply Grid</button>
  </div>
</div>`;
  },

  accordion: (m) => {
    const k = bentoGrid(m);
    return `<!-- Bento Grid · Accordion -->
<div class="space-y-3">
  <div class="${k.panelSoft} p-4">
    <div class="flex items-center justify-between text-xs font-semibold ${k.strong} cursor-pointer">
      <span>What is a Bento Grid layout?</span>
      ${SV.chevron}
    </div>
    <p class="mt-2.5 text-xs leading-relaxed ${k.muted}">
      A structured grid of asymmetric cards of varying aspect ratios that display product features cleanly.
    </p>
  </div>
</div>`;
  },

  tooltip: (m) => {
    const k = bentoGrid(m);
    return `<!-- Bento Grid · Tooltip -->
<div class="${k.tooltip}">
  Editorial Bento Cell
</div>`;
  },

  tabs: (m) => {
    const k = bentoGrid(m);
    return `<!-- Bento Grid · Tabs -->
<div class="${k.tabList}">
  <button class="${k.tabActive}">Overview</button>
  <button class="${k.tabIdle}">Analytics</button>
  <button class="${k.tabIdle}">Settings</button>
</div>`;
  },

  dropdown: (m) => {
    const k = bentoGrid(m);
    return `<!-- Bento Grid · Dropdown -->
<div class="${k.menu} p-1.5 w-48 space-y-1">
  <button class="${k.menuItem}">${SV.user} Team Members</button>
  <button class="${k.menuItem}">${SV.gear} Grid Preferences</button>
  <button class="${k.menuItem} ${k.dangerText}">${SV.logout} Archive Card</button>
</div>`;
  },

  switch: (m) => {
    const k = bentoGrid(m);
    return `<!-- Bento Grid · Switch -->
<div class="flex items-center gap-3">
  <div class="relative h-6 w-11 cursor-pointer rounded-full ${k.switchOn}">
    <div class="absolute top-1 left-6 h-4 w-4 rounded-full bg-white transition-all shadow-sm"></div>
  </div>
</div>`;
  },

  skeleton: (m) => {
    const k = bentoGrid(m);
    return `<!-- Bento Grid · Skeleton -->
<div class="grid grid-cols-3 gap-2 w-full max-w-sm">
  <div class="${k.skeleton} h-20 col-span-2"></div>
  <div class="${k.skeleton} h-20"></div>
</div>`;
  },

  toast: (m) => {
    const k = bentoGrid(m);
    return `<!-- Bento Grid · Toast -->
<div class="${k.successBg} p-3.5 rounded-xl flex items-center justify-between max-w-sm text-xs font-medium">
  <div class="flex items-center gap-2.5">
    ${SV.check}
    <span>Bento card added to layout</span>
  </div>
  ${SV.x}
</div>`;
  },

  progress: (m) => {
    const k = bentoGrid(m);
    return `<!-- Bento Grid · Progress Bar -->
<div class="${k.track} h-2 w-full rounded-full overflow-hidden">
  <div class="${k.fill} h-full w-3/4"></div>
</div>`;
  },

  avatar: () => {
    return `<!-- Bento Grid · Avatar -->
<div class="flex items-center gap-3">
  <div class="h-9 w-9 rounded-xl bg-indigo-600 font-semibold text-xs flex items-center justify-center text-white shadow-sm">
    BG
  </div>
</div>`;
  },
};
