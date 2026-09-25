import type { Mode } from "@/lib/styles/types";
import { glass } from "./kit";
import { avatarSvg } from "../icons";

const SV = {
  sparkle: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/></svg>`,
  arrow: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>`,
  bolt: `<svg class="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>`,
  image: `<svg class="h-8 w-8 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A1.5 1.5 0 0021.75 19.5V4.5A1.5 1.5 0 0020.25 3H3.75A1.5 1.5 0 002.25 4.5v15A1.5 1.5 0 003.75 21z"/></svg>`,
  x: `<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
  chevron: `<svg class="h-4 w-4 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>`,
  check: `<svg class="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  alert: `<svg class="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/></svg>`,
  info: `<svg class="h-3.5 w-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/></svg>`,
  user: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>`,
  card: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"/></svg>`,
  gear: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
  logout: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/></svg>`,
};

export const glassCode: Record<string, (mode: Mode) => string> = {
  button: (m) => {
    const k = glass(m);
    return `<!-- Glassmorphism · Button (primary + secondary) -->
<!-- Place on a colorful/gradient background so the blur has something to frost -->

<!-- Primary -->
<button class="${k.btnPrimary}">
  ${SV.sparkle}
  Get Started
</button>

<!-- Secondary -->
<button class="${k.btnSecondary}">
  Learn more
  ${SV.arrow}
</button>`;
  },

  card: (m) => {
    const k = glass(m);
    return `<!-- Glassmorphism · Card -->
<div class="${k.panel} w-full max-w-sm overflow-hidden">
  <!-- Image placeholder -->
  <div class="relative flex h-36 items-center justify-center bg-gradient-to-br from-violet-500/50 via-fuchsia-500/30 to-cyan-400/40">
    ${SV.image}
    <span class="${k.badgeViolet} absolute left-3 top-3 px-2.5 py-0.5 text-[10px]">✦ New</span>
  </div>

  <div class="space-y-2.5 p-5">
    <h3 class="${k.strong} text-base font-semibold">Frosted Dashboard Kit</h3>
    <p class="${k.muted} text-sm leading-relaxed">
      Layered glass panels, soft glows and frosted blur — ready to drop into any product.
    </p>
    <div class="flex items-center justify-between pt-2">
      <button class="${k.btnPrimarySm}">
        Explore kit
        ${SV.arrow.replace('class="h-4 w-4"', 'class="h-3.5 w-3.5"')}
      </button>
      <span class="${k.faint} text-xs">42 components</span>
    </div>
  </div>
</div>`;
  },

  navbar: (m) => {
    const k = glass(m);
    return `<!-- Glassmorphism · Navbar -->
<header class="${k.bar} flex items-center justify-between px-5 py-3">
  <a href="#" class="${k.strong} flex items-center gap-2 text-sm font-semibold">
    <span class="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 shadow-[0_0_12px_rgba(139,92,246,0.5)]">
      ${SV.bolt}
    </span>
    Aurora
  </a>

  <nav class="flex items-center gap-5 text-[13px]">
    <a href="#" class="${k.muted} transition hover:text-white">Products</a>
    <a href="#" class="${k.muted} transition hover:text-white">Pricing</a>
    <a href="#" class="${k.muted} transition hover:text-white">Docs</a>
  </nav>

  <button class="${k.btnPrimarySm}">Sign in</button>
</header>`;
  },

  input: (m) => {
    const k = glass(m);
    return `<!-- Glassmorphism · Input field -->
<div class="w-full max-w-sm">
  <label for="email" class="${k.label}">Email address</label>
  <input
    id="email"
    type="email"
    placeholder="you@studio.com"
    class="${k.input}"
  />
  <p class="${k.faint} mt-2 text-xs">We'll send a magic link — no password needed.</p>
</div>`;
  },

  badge: (m) => {
    const k = glass(m);
    return `<!-- Glassmorphism · Badges -->
<span class="${k.badgeViolet}">
  <span class="h-1.5 w-1.5 rounded-full bg-violet-400"></span>
  Live
</span>

<span class="${k.badgeCyan}">
  ${SV.sparkle.replace('class="h-4 w-4"', 'class="h-3 w-3"')}
  Beta
</span>

<span class="${k.badgeGhost}">v2.4.0</span>`;
  },

  modal: (m) => {
    const k = glass(m);
    return `<!-- Glassmorphism · Modal (shown open; toggle with JS or your framework) -->
<div class="relative">
  <!-- Trigger -->
  <button class="${k.btnPrimary}" onclick="document.getElementById('glass-modal').classList.remove('hidden')">
    ${SV.sparkle}
    Open modal
  </button>

  <!-- Overlay + dialog -->
  <div id="glass-modal" class="${k.overlay}">
    <div class="${k.panel} w-full max-w-sm p-6">
      <div class="flex items-start justify-between">
        <h3 class="${k.strong} text-base font-semibold">Upgrade to Pro</h3>
        <button class="${k.iconBtn}" aria-label="Close"
                onclick="document.getElementById('glass-modal').classList.add('hidden')">
          ${SV.x}
        </button>
      </div>
      <p class="${k.muted} mt-3 text-sm leading-relaxed">
        Unlock all 8 styles, 120 components and clean, unwatermarked code for your team.
      </p>
      <div class="mt-6 flex justify-end gap-3">
        <button class="${k.btnSecondary} px-4 py-2 text-xs">Cancel</button>
        <button class="${k.btnPrimarySm}">Upgrade — $9/mo</button>
      </div>
    </div>
  </div>
</div>`;
  },

  accordion: (m) => {
    const k = glass(m);
    const row = (q: string, a: string, open: boolean) => `  <div>
    <button class="${k.strong} flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium"
            onclick="this.nextElementSibling.classList.toggle('grid-rows-[0fr]'); this.firstElementChild?.classList.toggle('rotate-180')">
      ${q}
      <span class="${k.muted} ${open ? "rotate-180" : ""} transition-transform duration-300">${SV.chevron}</span>
    </button>
    <div class="grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}">
      <div class="overflow-hidden">
        <p class="${k.muted} px-5 pb-4 text-sm leading-relaxed">${a}</p>
      </div>
    </div>
  </div>`;
    return `<!-- Glassmorphism · Accordion (first item open) -->
<div class="${k.panelSoft} mx-auto w-full max-w-md divide-y ${k.divider}">
${row("What is glassmorphism?", "A style built on translucent, frosted-glass panels floating over colorful backgrounds — created with backdrop-blur, semi-transparent fills and subtle light borders.", true)}
${row("When should I use it?", "Great for hero sections, dashboards and overlays where depth matters. Keep body text on solid or heavily-blurred surfaces so it stays readable.", false)}
${row("Does it hurt performance?", "backdrop-filter is GPU-accelerated on modern browsers. Limit stacked blur layers on low-end mobile devices.", false)}
</div>`;
  },

  tooltip: (m) => {
    const k = glass(m);
    const bubbleBg = m === "dark" ? "bg-[#171426]/90" : "bg-white/85";
    return `<!-- Glassmorphism · Tooltip (pure CSS, hover the button) -->
<div class="group relative inline-block">
  <button class="${k.btnSecondary}">
    ${SV.card}
    Copy API key
  </button>

  <div class="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 scale-95 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
    <div class="${k.tooltip} flex items-center gap-1.5 whitespace-nowrap">
      ${SV.info}
      Keys are stored encrypted ✦
    </div>
    <!-- Arrow -->
    <div class="${k.hairline} ${bubbleBg} absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r"></div>
  </div>
</div>`;
  },

  tabs: (m) => {
    const k = glass(m);
    return `<!-- Glassmorphism · Tabs (first tab active) -->
<div class="w-full max-w-md">
  <div class="${k.tabList}" role="tablist">
    <button class="${k.tabActive}" role="tab" aria-selected="true">Overview</button>
    <button class="${k.tabIdle}" role="tab" aria-selected="false">Specs</button>
    <button class="${k.tabIdle}" role="tab" aria-selected="false">Reviews</button>
  </div>

  <div class="${k.panelSoft} mt-4 p-5" role="tabpanel">
    <p class="${k.muted} text-sm leading-relaxed">
      Frosted panels layered over a vivid gradient backdrop. Blur, transparency and glow do all the heavy lifting.
    </p>
  </div>
</div>`;
  },

  dropdown: (m) => {
    const k = glass(m);
    return `<!-- Glassmorphism · Dropdown menu (shown open) -->
<div class="relative inline-block">
  <button class="${k.btnSecondary} min-w-[190px] justify-between gap-6">
    Workspace settings
    ${SV.chevron}
  </button>

  <div class="${k.menu} absolute left-0 top-full z-20 mt-2 w-56 p-1.5">
    <button class="${k.menuItem}">${SV.user} Profile</button>
    <button class="${k.menuItem}">${SV.card} Billing</button>
    <button class="${k.menuItem}">${SV.gear} Preferences</button>
    <div class="${k.hairline} my-1.5 border-t"></div>
    <button class="${k.menuItem} text-rose-400 hover:bg-rose-400/10">${SV.logout} Sign out</button>
  </div>
</div>`;
  },

  switch: (m) => {
    const k = glass(m);
    return `<!-- Glassmorphism · Toggle / Switch (ON state shown) -->
<label class="flex items-center gap-4">
  <button role="switch" aria-checked="true"
          class="${m === "dark" ? k.switchOn : k.switchOn} relative h-7 w-12 rounded-full border backdrop-blur-md transition-all duration-300">
    <!-- Knob: ON → left-6 · OFF → left-1 + track class "${k.switchOff}" -->
    <span class="absolute top-1/2 left-6 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow-md transition-all duration-300"></span>
  </button>
  <span>
    <span class="${k.strong} block text-sm font-medium">Push notifications</span>
    <span class="${k.muted} block text-xs">On — glowing violet</span>
  </span>
</label>`;
  },

  skeleton: (m) => {
    const k = glass(m);
    return `<!-- Glassmorphism · Skeleton loader (card-shaped) -->
<div class="${k.panel} w-full max-w-sm space-y-4 p-5">
  <div class="${k.skeleton} h-32 w-full animate-pulse rounded-xl"></div>
  <div class="${k.skeleton} h-4 w-3/4 animate-pulse rounded-full"></div>
  <div class="${k.skeleton} h-3 w-full animate-pulse rounded-full"></div>
  <div class="${k.skeleton} h-3 w-5/6 animate-pulse rounded-full"></div>
  <div class="flex items-center gap-3 pt-1">
    <div class="${k.skeleton} h-8 w-24 animate-pulse rounded-lg"></div>
    <div class="${k.skeleton} h-8 w-8 animate-pulse rounded-full"></div>
  </div>
</div>`;
  },

  toast: (m) => {
    const k = glass(m);
    return `<!-- Glassmorphism · Toasts (success + error) -->
<div class="flex w-full max-w-sm flex-col gap-3">
  <!-- Success -->
  <div class="${k.panelSoft} relative overflow-hidden p-4">
    <div class="flex items-start gap-3">
      <span class="${k.successBg} flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
        ${SV.check}
      </span>
      <div class="flex-1">
        <p class="${k.strong} text-sm font-medium">Changes saved</p>
        <p class="${k.muted} mt-0.5 text-xs">Your profile was updated successfully.</p>
      </div>
      <button class="${k.iconBtn}" aria-label="Dismiss">${SV.x}</button>
    </div>
    <div class="${k.successLine} absolute bottom-0 left-0 h-0.5 w-2/3 rounded-full"></div>
  </div>

  <!-- Error -->
  <div class="${k.panelSoft} relative overflow-hidden p-4">
    <div class="flex items-start gap-3">
      <span class="${k.errorBg} flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
        ${SV.alert}
      </span>
      <div class="flex-1">
        <p class="${k.strong} text-sm font-medium">Upload failed</p>
        <p class="${k.muted} mt-0.5 text-xs">The file exceeds the 25 MB limit.</p>
      </div>
      <button class="${k.iconBtn}" aria-label="Dismiss">${SV.x}</button>
    </div>
    <div class="${k.errorLine} absolute bottom-0 left-0 h-0.5 w-1/3 rounded-full"></div>
  </div>
</div>`;
  },

  progress: (m) => {
    const k = glass(m);
    return `<!-- Glassmorphism · Progress bar (animate width with JS; 72% shown) -->
<div class="w-full max-w-md">
  <div class="mb-2.5 flex items-center justify-between text-sm">
    <span class="${k.strong} font-medium">Uploading glass assets…</span>
    <span class="${k.muted} font-mono text-xs">72%</span>
  </div>
  <div class="${k.track} h-2.5 w-full overflow-hidden rounded-full">
    <div class="${k.fill} h-full rounded-full transition-all duration-300 ease-out" style="width: 72%"></div>
  </div>
</div>`;
  },

  avatar: (m) => {
    const k = glass(m);
    return `<!-- Glassmorphism · Avatars (photo + initials fallback, with status dots) -->
<div class="flex items-center gap-5">
  <!-- Photo avatar · online -->
  <div class="relative">
    <img src="${avatarSvg("#8b5cf6", "#06b6d4")}" alt="Mia Chen"
         class="${k.ring} h-14 w-14 rounded-full object-cover ring-2" />
    <span class="${k.dotRing} absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 bg-emerald-400"></span>
  </div>

  <!-- Initials fallback · away -->
  <div class="relative">
    <div class="${k.ring} flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/70 to-cyan-400/70 text-sm font-semibold text-white ring-2 backdrop-blur-md">
      AK
    </div>
    <span class="${k.dotRing} absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 bg-amber-400"></span>
  </div>

  <div>
    <p class="${k.strong} text-sm font-medium">Mia Chen</p>
    <p class="${k.muted} text-xs">Online · Product design</p>
  </div>
</div>`;
  },
};
