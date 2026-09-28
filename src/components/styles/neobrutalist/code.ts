import type { Mode } from "@/lib/styles/types";
import { neobrutalist } from "./kit";

const SV = {
  arrow: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>`,
  image: `<svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A1.5 1.5 0 0021.75 19.5V4.5A1.5 1.5 0 0020.25 3H3.75A1.5 1.5 0 002.25 4.5v15A1.5 1.5 0 003.75 21z"/></svg>`,
  x: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
  chevron: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>`,
  check: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  user: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>`,
  gear: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><circle cx="12" cy="12" r="3"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
  logout: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/></svg>`,
};

export const neobrutalistCode: Record<string, (mode: Mode) => string> = {
  button: (m) => {
    const k = neobrutalist(m);
    return `<!-- Neobrutalist · Button -->
<button class="${k.btnPrimary}">
  YELLOW ACCENT CTA
</button>
<button class="${k.btnSecondary}">
  HARD SHADOW ${SV.arrow}
</button>`;
  },

  card: (m) => {
    const k = neobrutalist(m);
    return `<!-- Neobrutalist · Card -->
<div class="${k.panel} w-full max-w-sm">
  <div class="${k.imagePlaceholder} relative flex h-36 items-center justify-center font-mono font-black uppercase">
    ${SV.image}
    <span class="${k.badge} absolute left-2 top-2">NEO VIBE</span>
  </div>
  <div class="mt-4 space-y-3">
    <h3 class="${k.serif} text-xl font-black">NEO-BRUTAL V2</h3>
    <p class="font-mono text-xs leading-relaxed ${k.muted}">
      BORDER-4 BLACK, #FFE500 YELLOW FILLS AND UNAPOLOGETIC CONTRAST.
    </p>
    <div class="flex items-center justify-between pt-2">
      <button class="${k.btnPrimarySm}">GET CODE</button>
      <span class="font-mono font-black text-sm">$49</span>
    </div>
  </div>
</div>`;
  },

  navbar: (m) => {
    const k = neobrutalist(m);
    return `<!-- Neobrutalist · Navbar -->
<div class="${k.bar} flex items-center justify-between p-4">
  <span class="font-mono font-black text-lg tracking-widest text-[#FFE500]">NEO//HUB</span>
  <nav className="hidden items-center gap-4 font-mono text-xs font-black sm:flex">
    <a href="#" class="hover:underline">TOKENS</a>
    <a href="#" class="hover:underline">COMPONENTS</a>
    <a href="#" class="hover:underline">MANIFESTO</a>
  </nav>
  <button class="${k.btnPrimarySm}">ACTION</button>
</div>`;
  },

  input: (m) => {
    const k = neobrutalist(m);
    return `<!-- Neobrutalist · Input -->
<div class="w-full max-w-sm">
  <label class="${k.label}">YOUR EMAIL</label>
  <input class="${k.input}" placeholder="user@domain.com" />
</div>`;
  },

  badge: (m) => {
    const k = neobrutalist(m);
    return `<!-- Neobrutalist · Badges -->
<div class="flex items-center gap-3">
  <span class="${k.badge}">NEO-TAG</span>
  <span class="${k.badgeSolid}">ORANGE POP</span>
</div>`;
  },

  modal: (m) => {
    const k = neobrutalist(m);
    return `<!-- Neobrutalist · Modal -->
<div class="${k.panel} max-w-md w-full">
  <div class="flex items-center justify-between border-b-4 border-black pb-3">
    <h3 class="${k.serif} text-lg font-black">CONFIRM ACTION</h3>
    <button class="${k.iconBtn}">${SV.x}</button>
  </div>
  <p class="mt-4 font-mono text-xs ${k.muted}">ARE YOU SURE YOU WANT TO DEPLOY THIS BOLD UI?</p>
  <div class="mt-6 flex justify-end gap-3">
    <button class="${k.btnSecondary}">CANCEL</button>
    <button class="${k.btnPrimarySm}">CONFIRM</button>
  </div>
</div>`;
  },

  accordion: (m) => {
    const k = neobrutalist(m);
    return `<!-- Neobrutalist · Accordion -->
<div class="space-y-3">
  <div class="${k.panelSoft}">
    <div class="flex items-center justify-between font-mono font-black text-sm uppercase cursor-pointer">
      <span>WHAT IS NEOBRUTALISM?</span>
      ${SV.chevron}
    </div>
    <p class="mt-2 font-mono text-xs ${k.muted}">BOLD BLACK BORDERS, VIBRANT FILLS &amp; HARD SHADOWS.</p>
  </div>
</div>`;
  },

  tooltip: (m) => {
    const k = neobrutalist(m);
    return `<!-- Neobrutalist · Tooltip -->
<div class="${k.tooltip}">
  NEOBRUTAL TOOLTIP
</div>`;
  },

  tabs: (m) => {
    const k = neobrutalist(m);
    return `<!-- Neobrutalist · Tabs -->
<div class="${k.tabList}">
  <button class="${k.tabActive}">ACTIVE</button>
  <button class="${k.tabIdle}">INACTIVE</button>
  <button class="${k.tabIdle}">ARCHIVE</button>
</div>`;
  },

  dropdown: (m) => {
    const k = neobrutalist(m);
    return `<!-- Neobrutalist · Dropdown -->
<div class="${k.menu} p-2 w-48 space-y-1">
  <button class="${k.menuItem}">${SV.user} PROFILE</button>
  <button class="${k.menuItem}">${SV.gear} SETTINGS</button>
  <button class="${k.menuItem} ${k.dangerText}">${SV.logout} LOGOUT</button>
</div>`;
  },

  switch: (m) => {
    const k = neobrutalist(m);
    return `<!-- Neobrutalist · Switch -->
<div class="flex items-center gap-3">
  <div class="relative h-6 w-12 cursor-pointer ${k.switchOn}">
    <div class="absolute top-0.5 left-6 h-4 w-4 bg-black border-2 border-white transition-all"></div>
  </div>
</div>`;
  },

  skeleton: (m) => {
    const k = neobrutalist(m);
    return `<!-- Neobrutalist · Skeleton -->
<div class="space-y-3">
  <div class="${k.skeleton} h-8 w-3/4"></div>
  <div class="${k.skeleton} h-4 w-full"></div>
  <div class="${k.skeleton} h-4 w-1/2"></div>
</div>`;
  },

  toast: (m) => {
    const k = neobrutalist(m);
    return `<!-- Neobrutalist · Toast -->
<div class="${k.successBg} p-4 flex items-center justify-between max-w-sm">
  <div class="flex items-center gap-2">
    ${SV.check}
    <span>ACTION SUCCESSFUL</span>
  </div>
  ${SV.x}
</div>`;
  },

  progress: (m) => {
    const k = neobrutalist(m);
    return `<!-- Neobrutalist · Progress Bar -->
<div class="${k.track} h-6 w-full p-1">
  <div class="${k.fill} h-full w-3/4"></div>
</div>`;
  },

  avatar: () => {
    return `<!-- Neobrutalist · Avatar -->
<div class="flex items-center gap-3">
  <div class="h-12 w-12 rounded-none border-4 border-black bg-[#FFE500] font-mono font-black flex items-center justify-center text-lg text-black shadow-[3px_3px_0_#000]">
    NB
  </div>
</div>`;
  },
};
