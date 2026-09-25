import type { Mode } from "@/lib/styles/types";
import { darkTech } from "./kit";

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

export const darkTechCode: Record<string, (mode: Mode) => string> = {
  button: (m) => {
    const k = darkTech(m);
    return `<!-- Dark Tech · Button -->
<button class="${k.btnPrimary}">
  EXECUTE_RUN
</button>
<button class="${k.btnSecondary}">
  SYS_DIAGNOSTIC ${SV.arrow}
</button>`;
  },

  card: (m) => {
    const k = darkTech(m);
    return `<!-- Dark Tech · Card -->
<div class="${k.panel} w-full max-w-sm">
  <div class="${k.imagePlaceholder} flex h-36 items-center justify-center font-mono">
    ${SV.image}
  </div>
  <div class="mt-4 space-y-2.5">
    <div class="flex items-center justify-between">
      <span class="${k.badge}">ONLINE</span>
      <span class="font-mono text-[10px] text-[#00FFFF]">0x8F92</span>
    </div>
    <h3 class="${k.strong} text-sm font-bold uppercase">CYBER_NODE_01</h3>
    <p class="${k.muted} font-mono text-xs leading-relaxed">
      Phosphor green terminal telemetry with glowing grid lines and scanning markers.
    </p>
    <div class="flex items-center justify-between pt-2">
      <button class="${k.btnPrimarySm}">CONNECT</button>
      <span class="${k.faint} font-mono text-[10px]">PING 12ms</span>
    </div>
  </div>
</div>`;
  },

  navbar: (m) => {
    const k = darkTech(m);
    return `<!-- Dark Tech · Navbar -->
<div class="${k.bar} flex items-center justify-between px-5 py-3">
  <span class="font-mono font-bold text-sm text-[#00FF41]">root@hub:~$</span>
  <nav className="hidden items-center gap-6 font-mono text-xs uppercase sm:flex">
    <a href="#" class="hover:text-[#00FFFF]">/NET</a>
    <a href="#" class="hover:text-[#00FFFF]">/CORE</a>
    <a href="#" class="hover:text-[#00FFFF]">/LOGS</a>
  </nav>
  <button class="${k.btnPrimarySm}">SYSTEM.ONLINE</button>
</div>`;
  },

  input: (m) => {
    const k = darkTech(m);
    return `<!-- Dark Tech · Input -->
<div class="w-full max-w-sm">
  <label class="${k.label}">PROMPT &gt; ENTRY_COMMAND</label>
  <input class="${k.input}" placeholder="./launch_daemon --verbose" />
</div>`;
  },

  badge: (m) => {
    const k = darkTech(m);
    return `<!-- Dark Tech · Badges -->
<div class="flex items-center gap-3">
  <span class="${k.badge}">[SYSTEM_OK]</span>
  <span class="${k.badgeSolid}">[CYBER_CORE]</span>
</div>`;
  },

  modal: (m) => {
    const k = darkTech(m);
    return `<!-- Dark Tech · Modal -->
<div class="${k.panel} max-w-md w-full">
  <div class="flex items-center justify-between border-b border-[#00FF41]/30 pb-3">
    <h3 class="${k.strong} text-sm font-bold">TERMINAL SESSION DETACHED</h3>
    <button class="${k.iconBtn}">${SV.x}</button>
  </div>
  <p class="mt-4 font-mono text-xs ${k.muted}">
    Worker thread task-14 detached cleanly. Reconnect using daemon handle.
  </p>
  <div class="mt-6 flex justify-end gap-3">
    <button class="${k.btnSecondary}">ABORT</button>
    <button class="${k.btnPrimarySm}">REATTACH</button>
  </div>
</div>`;
  },

  accordion: (m) => {
    const k = darkTech(m);
    return `<!-- Dark Tech · Accordion -->
<div class="space-y-2">
  <div class="${k.panelSoft} p-4">
    <div class="flex items-center justify-between font-mono text-xs font-bold ${k.strong} cursor-pointer">
      <span>&gt; inspect --protocol</span>
      ${SV.chevron}
    </div>
    <p class="mt-2.5 font-mono text-xs leading-relaxed ${k.muted}">
      Terminal glowing matrix UI designed for cyber command centers and developer consoles.
    </p>
  </div>
</div>`;
  },

  tooltip: (m) => {
    const k = darkTech(m);
    return `<!-- Dark Tech · Tooltip -->
<div class="${k.tooltip}">
  [SYS_PROMPT: SHIFT+ENTER]
</div>`;
  },

  tabs: (m) => {
    const k = darkTech(m);
    return `<!-- Dark Tech · Tabs -->
<div class="${k.tabList}">
  <button class="${k.tabActive}">PROD_01</button>
  <button class="${k.tabIdle}">STAGING</button>
  <button class="${k.tabIdle}">LOCAL</button>
</div>`;
  },

  dropdown: (m) => {
    const k = darkTech(m);
    return `<!-- Dark Tech · Dropdown -->
<div class="${k.menu} p-1.5 w-48 space-y-1">
  <button class="${k.menuItem}">${SV.user} SYS_ADMIN</button>
  <button class="${k.menuItem}">${SV.gear} CONFIG_MAP</button>
  <button class="${k.menuItem} ${k.dangerText}">${SV.logout} KILL_PROCESS</button>
</div>`;
  },

  switch: (m) => {
    const k = darkTech(m);
    return `<!-- Dark Tech · Switch -->
<div class="flex items-center gap-3">
  <div class="relative h-6 w-12 cursor-pointer rounded-sm ${k.switchOn}">
    <div class="absolute top-0.5 left-6 h-4.5 w-4.5 bg-[#00FF41] rounded-xs shadow-[0_0_8px_#00FF41]"></div>
  </div>
</div>`;
  },

  skeleton: (m) => {
    const k = darkTech(m);
    return `<!-- Dark Tech · Skeleton -->
<div class="space-y-3">
  <div class="${k.skeleton} h-7 w-3/4"></div>
  <div class="${k.skeleton} h-4 w-full"></div>
  <div class="${k.skeleton} h-4 w-1/2"></div>
</div>`;
  },

  toast: (m) => {
    const k = darkTech(m);
    return `<!-- Dark Tech · Toast -->
<div class="${k.successBg} p-3.5 rounded-sm flex items-center justify-between max-w-sm font-mono text-xs">
  <div class="flex items-center gap-2">
    ${SV.check}
    <span>DAEMON ONLINE (PID: 4092)</span>
  </div>
  ${SV.x}
</div>`;
  },

  progress: (m) => {
    const k = darkTech(m);
    return `<!-- Dark Tech · Progress Bar -->
<div class="${k.track} h-3 w-full p-0.5 overflow-hidden">
  <div class="${k.fill} h-full w-3/4"></div>
</div>`;
  },

  avatar: () => {
    return `<!-- Dark Tech · Avatar -->
<div class="flex items-center gap-3">
  <div class="h-9 w-9 rounded-sm border border-[#00FF41] bg-black font-mono font-bold text-xs flex items-center justify-center text-[#00FF41] shadow-[0_0_10px_rgba(0,255,65,0.4)]">
    01
  </div>
</div>`;
  },
};
