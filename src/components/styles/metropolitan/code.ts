import type { Mode } from "@/lib/styles/types";
import { metropolitan } from "./kit";

const SV = {
  arrow: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>`,
  x: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
  subway: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V6.375c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125H15.75m-7.5 0v3.75m7.5-3.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h3.375c.621 0 1.125-.504 1.125-1.125V6.375"/></svg>`,
};

export const metropolitanCode: Record<string, (mode: Mode) => string> = {
  button: (m) => {
    const mkt = metropolitan(m);
    return `<!-- Metropolitan · Transit Buttons -->
<div class="flex flex-wrap gap-4 items-center">
  <button class="${mkt.btnPrimary}">
    <span>LINE 4 EXPRESS</span>
    ${SV.arrow}
  </button>
  <button class="${mkt.btnSecondary}">
    <span>CONCOURSE MAP</span>
  </button>
</div>`;
  },

  card: (m) => {
    const mkt = metropolitan(m);
    return `<!-- Metropolitan · Urban Transit Card -->
<div class="${mkt.panel} w-full max-w-md space-y-4">
  <div class="flex items-center justify-between border-b ${m === 'dark' ? 'border-slate-700' : 'border-slate-300'} pb-3">
    <div class="flex items-center gap-2">
      <span class="w-3 h-3 bg-blue-600 inline-block"></span>
      <span class="font-mono text-xs font-bold text-blue-600">STATION #409</span>
    </div>
    <span class="${mkt.badge}">ON SCHEDULE</span>
  </div>
  <h3 class="${mkt.heading} text-2xl leading-none">GRAND CENTRAL CONCOURSE</h3>
  <p class="${mkt.muted} font-sans text-xs leading-relaxed">
    High-density urban transit board with real-time schedule indicators and monospaced platform codes.
  </p>
  <div class="pt-2 flex items-center justify-between font-mono text-xs">
    <span class="${mkt.muted}">TRACK 14 // DEPART 08:45</span>
    <button class="${mkt.btnPrimarySm}">
      <span>BOARD</span>
      ${SV.arrow}
    </button>
  </div>
</div>`;
  },

  navbar: (m) => {
    const mkt = metropolitan(m);
    return `<!-- Metropolitan · Header Bar -->
<header class="${mkt.bar} flex items-center justify-between px-6 py-4 w-full">
  <div class="flex items-center gap-3">
    <div class="w-6 h-6 bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center">
      M
    </div>
    <a href="#" class="font-bold text-sm uppercase tracking-tight text-blue-600">METRO_NET</a>
  </div>

  <nav class="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-wider font-bold">
    <a href="#" class="text-blue-600 border-b-2 border-blue-600 pb-0.5">01. LINES</a>
    <a href="#" class="${mkt.muted} hover:text-blue-600">02. SCHEDULES</a>
    <a href="#" class="${mkt.muted} hover:text-blue-600">03. FARES</a>
  </nav>

  <button class="${mkt.btnPrimarySm}">BUY PASS</button>
</header>`;
  },

  input: (m) => {
    const mkt = metropolitan(m);
    return `<!-- Metropolitan · Form Input -->
<div class="w-full max-w-sm space-y-1.5">
  <label class="${mkt.label}">DESTINATION STATION CODE</label>
  <input type="text" placeholder="NYC-GCT-409" class="${mkt.input}" />
  <p class="font-mono text-[10px] ${mkt.muted}">Enter 6-character terminal identifier</p>
</div>`;
  },

  badge: (m) => {
    const mkt = metropolitan(m);
    return `<!-- Metropolitan · Badges -->
<div class="flex flex-wrap items-center gap-3">
  <span class="${mkt.badge}">EXPRESS LINE</span>
  <span class="${mkt.badgeOutline}">PLATFORM 3B</span>
  <span class="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-bold bg-amber-500 text-black">
    DELAY 4 MIN
  </span>
</div>`;
  },

  modal: (m) => {
    const mkt = metropolitan(m);
    return `<!-- Metropolitan · Modal -->
<div class="${mkt.panel} w-full max-w-md space-y-5">
  <div class="flex items-center justify-between border-b ${m === 'dark' ? 'border-slate-700' : 'border-slate-300'} pb-3">
    <span class="font-mono text-xs font-bold text-blue-600">TICKET CONFIRMATION</span>
    <button class="${mkt.muted} hover:text-blue-600">${SV.x}</button>
  </div>
  <h3 class="${mkt.heading} text-xl">CONFIRM UNLIMITED METRO PASS</h3>
  <p class="${mkt.muted} font-sans text-xs leading-relaxed">
    30-day all-access transit pass across all subway, light rail, and regional express networks.
  </p>
  <div class="flex justify-end gap-3 pt-2">
    <button class="${mkt.btnSecondary}">CANCEL</button>
    <button class="${mkt.btnPrimary}">PURCHASE $127</button>
  </div>
</div>`;
  },

  accordion: (m) => {
    const mkt = metropolitan(m);
    return `<!-- Metropolitan · Accordion -->
<div class="${mkt.panel} w-full max-w-md divide-y ${m === 'dark' ? 'divide-slate-700' : 'divide-slate-300'} p-0">
  <div class="p-4">
    <button class="w-full flex items-center justify-between text-left font-mono text-xs font-bold uppercase tracking-wider text-blue-600">
      <span>01 // TRANSIT TARIFF RULES</span>
      <span class="font-bold">-</span>
    </button>
    <p class="mt-3 ${mkt.muted} font-sans text-xs leading-relaxed">
      Fares are calculated by zone density. Free transfers available within 120 minutes across all interconnect lines.
    </p>
  </div>
  <div class="p-4">
    <button class="w-full flex items-center justify-between text-left font-mono text-xs font-bold uppercase tracking-wider ${mkt.muted}">
      <span>02 // NIGHT SERVICE SCHEDULE</span>
      <span class="font-bold">+</span>
    </button>
  </div>
</div>`;
  },

  tooltip: () => {
    return `<!-- Metropolitan · Tooltip -->
<div class="relative inline-block">
  <div class="bg-blue-600 text-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider">
    SYS_STATUS: OPTIMAL 99.8%
  </div>
</div>`;
  },

  tabs: (m) => {
    const mkt = metropolitan(m);
    return `<!-- Metropolitan · Tabs -->
<div class="flex border-b-2 ${m === 'dark' ? 'border-blue-500' : 'border-blue-600'} w-full max-w-md font-mono text-xs">
  <button class="px-5 py-2.5 bg-blue-600 text-white font-bold tracking-wider">
    01. EXPRESS
  </button>
  <button class="px-5 py-2.5 ${mkt.muted} font-bold tracking-wider hover:text-blue-600">
    02. LOCAL
  </button>
  <button class="px-5 py-2.5 ${mkt.muted} font-bold tracking-wider hover:text-blue-600">
    03. NIGHT
  </button>
</div>`;
  },

  dropdown: (m) => {
    const mkt = metropolitan(m);
    return `<!-- Metropolitan · Dropdown -->
<div class="${mkt.panel} w-56 p-0 divide-y ${m === 'dark' ? 'divide-slate-700' : 'divide-slate-300'} font-mono text-xs uppercase">
  <div class="p-3 bg-blue-600 text-white font-bold flex justify-between items-center">
    <span>SELECT ROUTE</span>
    <span>▼</span>
  </div>
  <a href="#" class="block p-3 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors">LINE A — DOWNTOWN</a>
  <a href="#" class="block p-3 ${mkt.muted} hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors">LINE B — CROSSTOWN</a>
  <a href="#" class="block p-3 ${mkt.muted} hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors">LINE C — AIRPORT EXPR</a>
</div>`;
  },

  switch: (m) => {
    return `<!-- Metropolitan · Switch -->
<div class="flex items-center gap-4">
  <button class="w-11 h-6 border ${m === 'dark' ? 'border-slate-600 bg-slate-800' : 'border-slate-300 bg-slate-200'} relative p-0.5 rounded-none">
    <div class="w-5 h-4.5 bg-blue-600 rounded-none"></div>
  </button>
  <span class="font-mono text-xs font-bold text-blue-600 tracking-wider">REALTIME ALERTS: ON</span>
</div>`;
  },

  skeleton: (m) => {
    const mkt = metropolitan(m);
    return `<!-- Metropolitan · Skeleton -->
<div class="${mkt.panel} w-full max-w-sm p-6 space-y-4">
  <div class="h-4 bg-blue-600/40 animate-pulse w-1/3"></div>
  <div class="h-7 ${m === 'dark' ? 'bg-slate-700' : 'bg-slate-300'} animate-pulse w-3/4"></div>
  <div class="space-y-2">
    <div class="h-3 ${m === 'dark' ? 'bg-slate-800' : 'bg-slate-200'} animate-pulse w-full"></div>
    <div class="h-3 ${m === 'dark' ? 'bg-slate-800' : 'bg-slate-200'} animate-pulse w-5/6"></div>
  </div>
</div>`;
  },

  toast: (m) => {
    const mkt = metropolitan(m);
    return `<!-- Metropolitan · Toast -->
<div class="${mkt.panel} w-full max-w-sm p-4 border-l-4 border-l-blue-600 flex items-start gap-3">
  <div class="w-2.5 h-2.5 bg-blue-600 mt-1 flex-shrink-0"></div>
  <div class="space-y-1">
    <p class="font-mono text-xs font-bold text-blue-600">SCHEDULE UPDATE</p>
    <p class="${mkt.muted} font-sans text-xs">Train #409 now boarding Track 14.</p>
  </div>
</div>`;
  },

  progress: () => {
    return `<!-- Metropolitan · Progress Bar -->
<div class="w-full max-w-sm space-y-2">
  <div class="flex justify-between font-mono text-xs font-bold uppercase">
    <span class="text-blue-600">TRANSIT CAPACITY</span>
    <span class="text-blue-600">82%</span>
  </div>
  <div class="h-3 w-full border border-slate-400 bg-slate-200 dark:bg-slate-800 p-0.5">
    <div class="h-full bg-blue-600 w-[82%]"></div>
  </div>
</div>`;
  },

  avatar: (m) => {
    const mkt = metropolitan(m);
    return `<!-- Metropolitan · Avatar -->
<div class="flex items-center gap-3">
  <div class="w-9 h-9 bg-blue-600 text-white font-mono font-bold flex items-center justify-center text-xs">
    MN
  </div>
  <div>
    <p class="font-sans font-bold text-xs uppercase">METRO NAVIGATOR</p>
    <p class="font-mono text-[10px] ${mkt.muted}">OPERATOR #9042</p>
  </div>
</div>`;
  },
};
