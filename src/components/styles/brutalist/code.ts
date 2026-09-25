import type { Mode } from "@/lib/styles/types";
import { brutalist } from "./kit";

const SV = {
  arrow: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>`,
  image: `<svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A1.5 1.5 0 0021.75 19.5V4.5A1.5 1.5 0 0020.25 3H3.75A1.5 1.5 0 002.25 4.5v15A1.5 1.5 0 003.75 21z"/></svg>`,
  x: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
  chevron: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>`,
  check: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  alert: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/></svg>`,
  info: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/></svg>`,
  user: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>`,
  card: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"/></svg>`,
  gear: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="3"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
  logout: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/></svg>`,
};

export const brutalistCode: Record<string, (mode: Mode) => string> = {
  button: (m) => {
    const k = brutalist(m);
    return `<!-- Brutalist · Button -->
<button class="${k.btnPrimary}">
  SMASH THIS BUTTON
</button>
<button class="${k.btnSecondary}">
  LEARN MORE ${SV.arrow}
</button>`;
  },

  card: (m) => {
    const k = brutalist(m);
    return `<!-- Brutalist · Card -->
<div class="${k.panel} w-full max-w-sm">
  <div class="${k.imagePlaceholder} relative flex h-36 items-center justify-center font-mono font-black uppercase">
    ${SV.image}
    <span class="${k.badge} absolute left-2 top-2">HOT DROP</span>
  </div>
  <div class="mt-4 space-y-3">
    <h3 class="${k.serif} text-xl font-black">RAW ENGINE V2</h3>
    <p class="font-mono text-xs leading-relaxed ${k.muted}">
      UNAPOLOGETIC PERFORMANCE WITH ZERO BLOAT AND HARD EDGES.
    </p>
    <div class="flex items-center justify-between pt-2">
      <button class="${k.btnPrimarySm}">GET IT NOW</button>
      <span class="font-mono font-black text-sm">$99</span>
    </div>
  </div>
</div>`;
  },

  navbar: (m) => {
    const k = brutalist(m);
    return `<!-- Brutalist · Navbar -->
<div class="${k.bar} flex items-center justify-between p-4">
  <span class="font-mono font-black text-lg tracking-widest">BRUTAL//UI</span>
  <nav className="hidden items-center gap-4 font-mono text-xs font-black sm:flex">
    <a href="#" class="hover:underline">PROJECTS</a>
    <a href="#" class="hover:underline">MANIFESTO</a>
    <a href="#" class="hover:underline">SHOP</a>
  </nav>
  <button class="${k.btnPrimarySm}">JOIN</button>
</div>`;
  },

  input: (m) => {
    const k = brutalist(m);
    return `<!-- Brutalist · Input -->
<div class="w-full max-w-sm">
  <label class="${k.label}">YOUR HANDLE</label>
  <input class="${k.input}" placeholder="@CYBERPUNK" />
</div>`;
  },

  badge: (m) => {
    const k = brutalist(m);
    return `<!-- Brutalist · Badges -->
<div class="flex items-center gap-3">
  <span class="${k.badge}">LIVE</span>
  <span class="${k.badgeSolid}">WARNING</span>
</div>`;
  },

  modal: (m) => {
    const k = brutalist(m);
    return `<!-- Brutalist · Modal -->
<div class="${k.panel} max-w-md w-full">
  <div class="flex items-center justify-between border-b-4 border-current pb-3">
    <h3 class="${k.serif} text-lg font-black">CONFIRM ACTION</h3>
    <button class="${k.iconBtn}">${SV.x}</button>
  </div>
  <p class="mt-4 font-mono text-xs ${k.muted}">ARE YOU SURE YOU WANT TO OVERWRITE THE SYSTEM LOGS?</p>
  <div class="mt-6 flex justify-end gap-3">
    <button class="${k.btnSecondary}">CANCEL</button>
    <button class="${k.btnPrimarySm}">EXECUTE</button>
  </div>
</div>`;
  },

  accordion: (m) => {
    const k = brutalist(m);
    return `<!-- Brutalist · Accordion -->
<div class="space-y-3">
  <div class="${k.panelSoft} p-4">
    <div class="flex items-center justify-between font-mono font-black text-sm uppercase cursor-pointer">
      <span>WHAT IS BRUTALISM?</span>
      ${SV.chevron}
    </div>
    <p class="mt-2 font-mono text-xs ${k.muted}">RAW STRUCTURE, HIGH CONTRAST, ZERO DECORATION.</p>
  </div>
</div>`;
  },

  tooltip: (m) => {
    const k = brutalist(m);
    return `<!-- Brutalist · Tooltip -->
<div class="${k.tooltip}">
  HARD SHADOW TOOLTIP
</div>`;
  },

  tabs: (m) => {
    const k = brutalist(m);
    return `<!-- Brutalist · Tabs -->
<div class="${k.tabList}">
  <button class="${k.tabActive}">ALL</button>
  <button class="${k.tabIdle}">POPULAR</button>
  <button class="${k.tabIdle}">NEW</button>
</div>`;
  },

  dropdown: (m) => {
    const k = brutalist(m);
    return `<!-- Brutalist · Dropdown -->
<div class="${k.menu} p-2 w-48 space-y-1">
  <button class="${k.menuItem}">${SV.user} PROFILE</button>
  <button class="${k.menuItem}">${SV.gear} SETTINGS</button>
  <button class="${k.menuItem} ${k.dangerText}">${SV.logout} LOGOUT</button>
</div>`;
  },

  switch: (m) => {
    const k = brutalist(m);
    return `<!-- Brutalist · Switch -->
<div class="flex items-center gap-3">
  <div class="relative h-6 w-12 cursor-pointer ${k.switchOn}">
    <div class="absolute top-0.5 left-6 h-4 w-4 bg-black border-2 border-white transition-all"></div>
  </div>
</div>`;
  },

  skeleton: (m) => {
    const k = brutalist(m);
    return `<!-- Brutalist · Skeleton -->
<div class="space-y-3">
  <div class="${k.skeleton} h-8 w-3/4"></div>
  <div class="${k.skeleton} h-4 w-full"></div>
  <div class="${k.skeleton} h-4 w-1/2"></div>
</div>`;
  },

  toast: (m) => {
    const k = brutalist(m);
    return `<!-- Brutalist · Toast -->
<div class="${k.successBg} p-4 flex items-center justify-between max-w-sm">
  <div class="flex items-center gap-2">
    ${SV.check}
    <span>ACTION SUCCESSFUL</span>
  </div>
  ${SV.x}
</div>`;
  },

  progress: (m) => {
    const k = brutalist(m);
    return `<!-- Brutalist · Progress Bar -->
<div class="${k.track} h-6 w-full p-1">
  <div class="${k.fill} h-full w-3/4"></div>
</div>`;
  },

  avatar: () => {
    return `<!-- Brutalist · Avatar -->
<div class="flex items-center gap-3">
  <div class="h-12 w-12 rounded-none border-4 border-black bg-[#FFDE00] font-mono font-black flex items-center justify-center text-lg text-black shadow-[3px_3px_0_#000]">
    BT
  </div>
</div>`;
  },
};
