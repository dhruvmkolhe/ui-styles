import type { Mode } from "@/lib/styles/types";
import { retroY2k } from "./kit";

const SV = {
  arrow: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>`,
  image: `<svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A1.5 1.5 0 0021.75 19.5V4.5A1.5 1.5 0 0020.25 3H3.75A1.5 1.5 0 002.25 4.5v15A1.5 1.5 0 003.75 21z"/></svg>`,
  x: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
  chevron: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>`,
  check: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  user: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>`,
  gear: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="3"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
  logout: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/></svg>`,
};

export const retroY2kCode: Record<string, (mode: Mode) => string> = {
  button: (m) => {
    const k = retroY2k(m);
    return `<!-- Retro/Y2K · Button -->
<button class="${k.btnPrimary}">
  ✦ EXPLORE NOW ✦
</button>
<button class="${k.btnSecondary}">
  xoxo ${SV.arrow}
</button>`;
  },

  card: (m) => {
    const k = retroY2k(m);
    return `<!-- Retro/Y2K · Card -->
<div class="${k.panel} w-full max-w-sm relative">
  <div class="${k.imagePlaceholder} relative flex h-36 items-center justify-center rounded-xl overflow-hidden">
    ${SV.image}
    <span class="${k.badge} absolute left-3 top-3 -rotate-3">★ POP STICKER ★</span>
  </div>
  <div class="mt-4 space-y-3">
    <h3 class="${k.serif} text-xl font-black">Cyber Candy Mix</h3>
    <p class="${k.muted} text-xs font-bold leading-relaxed">
      Millennium boombox vibe, bubblegum gradients and pop star bursts.
    </p>
    <div class="flex items-center justify-between pt-2">
      <button class="${k.btnPrimarySm}">GET KIT</button>
      <span class="font-black text-sm text-[#FF2E93]">2003.MP3</span>
    </div>
  </div>
</div>`;
  },

  navbar: (m) => {
    const k = retroY2k(m);
    return `<!-- Retro/Y2K · Navbar -->
<div class="${k.bar} flex items-center justify-between p-4">
  <span class="font-black text-base text-[#FF2E93] flex items-center gap-1">✦ STAR_HUB ✦</span>
  <nav className="hidden items-center gap-5 font-bold text-xs uppercase sm:flex">
    <a href="#" class="hover:text-[#FF2E93]">MUSIC</a>
    <a href="#" class="hover:text-[#FF2E93]">GLITTER</a>
    <a href="#" class="hover:text-[#FF2E93]">SKINS</a>
  </nav>
  <button class="${k.btnPrimarySm}">GO!!</button>
</div>`;
  },

  input: (m) => {
    const k = retroY2k(m);
    return `<!-- Retro/Y2K · Input -->
<div class="w-full max-w-sm">
  <label class="${k.label}">~* BLOGGER HANDLE *~</label>
  <input class="${k.input}" placeholder="pink_princess_99" />
</div>`;
  },

  badge: (m) => {
    const k = retroY2k(m);
    return `<!-- Retro/Y2K · Badges -->
<div class="flex items-center gap-3">
  <span class="${k.badge}">★ HOT ★</span>
  <span class="${k.badgeSolid}">CYBER 2000</span>
</div>`;
  },

  modal: (m) => {
    const k = retroY2k(m);
    return `<!-- Retro/Y2K · Modal -->
<div class="${k.panel} max-w-md w-full">
  <div class="flex items-center justify-between border-b-[3px] border-[#FF2E93] pb-3">
    <h3 class="${k.serif} text-base font-black">✦ PLAYLIST CREATED ✦</h3>
    <button class="${k.iconBtn}">${SV.x}</button>
  </div>
  <p class="mt-4 font-bold text-xs ${k.muted}">32 tracks added to your iPod Shuffle mix.</p>
  <div class="mt-6 flex justify-end gap-3">
    <button class="${k.btnSecondary}">LATER</button>
    <button class="${k.btnPrimarySm}">PLAY NOW</button>
  </div>
</div>`;
  },

  accordion: (m) => {
    const k = retroY2k(m);
    return `<!-- Retro/Y2K · Accordion -->
<div class="space-y-3">
  <div class="${k.panelSoft} p-4">
    <div class="flex items-center justify-between font-black text-xs uppercase cursor-pointer">
      <span>★ WHY Y2K DESIGN? ★</span>
      ${SV.chevron}
    </div>
    <p class="mt-2.5 font-bold text-xs leading-relaxed ${k.muted}">
      Because chrome gradients and hot pink bubble text bring uninhibited optimism back to the web!
    </p>
  </div>
</div>`;
  },

  tooltip: (m) => {
    const k = retroY2k(m);
    return `<!-- Retro/Y2K · Tooltip -->
<div class="${k.tooltip}">
  ✦ Totally Y2K ✦
</div>`;
  },

  tabs: (m) => {
    const k = retroY2k(m);
    return `<!-- Retro/Y2K · Tabs -->
<div class="${k.tabList}">
  <button class="${k.tabActive}">TOP 100</button>
  <button class="${k.tabIdle}">REMIXES</button>
  <button class="${k.tabIdle}">GIFS</button>
</div>`;
  },

  dropdown: (m) => {
    const k = retroY2k(m);
    return `<!-- Retro/Y2K · Dropdown -->
<div class="${k.menu} p-2 w-48 space-y-1">
  <button class="${k.menuItem}">${SV.user} MY PROFILE</button>
  <button class="${k.menuItem}">${SV.gear} SKIN THEMES</button>
  <button class="${k.menuItem} ${k.dangerText}">${SV.logout} EXIT Y2K</button>
</div>`;
  },

  switch: (m) => {
    const k = retroY2k(m);
    return `<!-- Retro/Y2K · Switch -->
<div class="flex items-center gap-3">
  <div class="relative h-7 w-14 cursor-pointer rounded-full ${k.switchOn}">
    <div class="absolute top-0.5 left-7 h-5 w-5 rounded-full bg-[#B6FF00] border-2 border-[#2b0a3d] transition-all"></div>
  </div>
</div>`;
  },

  skeleton: (m) => {
    const k = retroY2k(m);
    return `<!-- Retro/Y2K · Skeleton -->
<div class="space-y-3">
  <div class="${k.skeleton} h-8 w-3/4"></div>
  <div class="${k.skeleton} h-4 w-full"></div>
  <div class="${k.skeleton} h-4 w-1/2"></div>
</div>`;
  },

  toast: (m) => {
    const k = retroY2k(m);
    return `<!-- Retro/Y2K · Toast -->
<div class="${k.successBg} p-4 rounded-2xl flex items-center justify-between max-w-sm">
  <div class="flex items-center gap-2">
    ${SV.check}
    <span>★ SONG DOWNLOADED ★</span>
  </div>
  ${SV.x}
</div>`;
  },

  progress: (m) => {
    const k = retroY2k(m);
    return `<!-- Retro/Y2K · Progress Bar -->
<div class="${k.track} h-5 w-full rounded-full p-1 overflow-hidden">
  <div class="${k.fill} h-full w-4/5 rounded-full"></div>
</div>`;
  },

  avatar: () => {
    return `<!-- Retro/Y2K · Avatar -->
<div class="flex items-center gap-3">
  <div class="h-11 w-11 rounded-full border-[3px] border-[#2b0a3d] bg-gradient-to-tr from-[#FF2E93] to-[#B6FF00] font-black text-xs flex items-center justify-center text-[#2b0a3d] shadow-[3px_3px_0_#FF2E93]">
    Y2K
  </div>
</div>`;
  },
};
