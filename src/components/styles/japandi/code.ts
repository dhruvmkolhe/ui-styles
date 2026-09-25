import type { Mode } from "@/lib/styles/types";
import { japandi } from "./kit";
import { avatarSvg } from "../icons";

const SV = {
  arrow: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>`,
  image: `<svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A1.5 1.5 0 0021.75 19.5V4.5A1.5 1.5 0 0020.25 3H3.75A1.5 1.5 0 002.25 4.5v15A1.5 1.5 0 003.75 21z"/></svg>`,
  x: `<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
  chevron: `<svg class="h-4 w-4 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>`,
  check: `<svg class="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  alert: `<svg class="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/></svg>`,
  info: `<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/></svg>`,
  user: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>`,
  card: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"/></svg>`,
  gear: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
  logout: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/></svg>`,
};

export const japandiCode: Record<string, (mode: Mode) => string> = {
  button: (m) => {
    const k = japandi(m);
    return `<!-- Japandi · Button (primary + secondary) -->
<!-- Warm neutrals, soft rounding, no shadows, no decoration -->

<!-- Primary -->
<button class="${k.btnPrimary}">
  Explore the collection
</button>

<!-- Secondary -->
<button class="${k.btnSecondary}">
  Our story
  ${SV.arrow}
</button>`;
  },

  card: (m) => {
    const k = japandi(m);
    return `<!-- Japandi · Card -->
<div class="${k.panel} w-full max-w-sm overflow-hidden">
  <!-- Image placeholder -->
  <div class="${k.imagePlaceholder} relative flex h-36 items-center justify-center">
    ${SV.image}
    <span class="${k.badge} absolute left-3 top-3 bg-[#FBF8F1]/80">New season</span>
  </div>

  <div class="space-y-3 p-6">
    <h3 class="${k.serif} ${k.strong} text-lg tracking-wide">Kyoto Ceramics Set</h3>
    <p class="${k.muted} text-sm leading-relaxed">
      Hand-glazed stoneware in warm oat tones. Made slowly, meant to last a lifetime.
    </p>
    <div class="flex items-center justify-between pt-2">
      <button class="${k.btnPrimarySm}">
        View details
        ${SV.arrow.replace('class="h-4 w-4"', 'class="h-3.5 w-3.5"')}
      </button>
      <span class="${k.faint} text-xs tracking-wide">¥ 12,400</span>
    </div>
  </div>
</div>`;
  },

  navbar: (m) => {
    const k = japandi(m);
    return `<!-- Japandi · Navbar -->
<header class="${k.bar} flex items-center justify-between px-5 py-4">
  <a href="#" class="${k.serif} ${k.strong} text-sm tracking-[0.2em]">SABI &amp; CO</a>

  <nav class="flex items-center gap-6 text-[13px] tracking-wide">
    <a href="#" class="${k.muted} transition-colors hover:text-[#3D3529]">Shop</a>
    <a href="#" class="${k.muted} transition-colors hover:text-[#3D3529]">Journal</a>
    <a href="#" class="${k.muted} transition-colors hover:text-[#3D3529]">Ateliers</a>
  </nav>

  <button class="${k.btnPrimarySm}">Cart (0)</button>
</header>`;
  },

  input: (m) => {
    const k = japandi(m);
    return `<!-- Japandi · Input field -->
<div class="w-full max-w-sm">
  <label for="email" class="${k.label}">Email address</label>
  <input
    id="email"
    type="email"
    placeholder="you@studio.com"
    class="${k.input}"
  />
  <p class="${k.faint} mt-2.5 text-xs tracking-wide">
    One quiet letter each month. Unsubscribe anytime.
  </p>
</div>`;
  },

  badge: (m) => {
    const k = japandi(m);
    const dot = m === "dark" ? "bg-[#A8B897]" : "bg-[#7C8F6B]";
    return `<!-- Japandi · Badges -->
<span class="${k.badge}">
  <span class="${dot} h-1.5 w-1.5 rounded-full"></span>
  In stock
</span>

<span class="${k.badgeSolid}">Handmade</span>

<span class="${k.badge}">Oak · Linen</span>`;
  },

  modal: (m) => {
    const k = japandi(m);
    return `<!-- Japandi · Modal (shown open; toggle with JS or your framework) -->
<div class="relative">
  <!-- Trigger -->
  <button class="${k.btnPrimary}" onclick="document.getElementById('japandi-modal').classList.remove('hidden')">
    Open dialog
  </button>

  <!-- Overlay + dialog -->
  <div id="japandi-modal" class="${k.overlay}">
    <div class="${k.panel} w-full max-w-sm p-7">
      <div class="flex items-start justify-between">
        <h3 class="${k.serif} ${k.strong} text-lg tracking-wide">Join the atelier</h3>
        <button class="${k.iconBtn}" aria-label="Close"
                onclick="document.getElementById('japandi-modal').classList.add('hidden')">
          ${SV.x}
        </button>
      </div>
      <p class="${k.muted} mt-3.5 text-sm leading-relaxed">
        Receive early access to seasonal releases, studio notes and a 10% welcome gift.
      </p>
      <div class="mt-7 flex justify-end gap-3">
        <button class="${k.btnSecondary} px-4 py-2 text-xs">Not now</button>
        <button class="${k.btnPrimarySm}">Subscribe</button>
      </div>
    </div>
  </div>
</div>`;
  },

  accordion: (m) => {
    const k = japandi(m);
    const row = (q: string, a: string, open: boolean) => `  <div>
    <button class="${k.strong} flex w-full items-center justify-between px-6 py-4 text-left text-sm tracking-wide"
            onclick="this.nextElementSibling.classList.toggle('grid-rows-[0fr]')">
      ${q}
      <span class="${k.faint} ${open ? "rotate-180" : ""} transition-transform duration-300">${SV.chevron}</span>
    </button>
    <div class="grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}">
      <div class="overflow-hidden">
        <p class="${k.muted} px-6 pb-5 text-sm leading-relaxed">${a}</p>
      </div>
    </div>
  </div>`;
    return `<!-- Japandi · Accordion (first item open) -->
<div class="${k.panelSoft} mx-auto w-full max-w-md divide-y ${k.divider}">
${row("What is Japandi design?", "A quiet fusion of Japanese wabi-sabi and Scandinavian functionalism — warm neutrals, natural materials, thin borders and space to breathe.", true)}
${row("Which colors should I use?", "Oat, linen, clay and soft browns like #F5F0E8 and #8B7355. Keep contrast gentle; accents come from texture, not saturation.", false)}
${row("Can it work for software?", "Beautifully. Generous padding, hairline dividers and serif display type give dashboards and marketing pages a calm, premium feel.", false)}
</div>`;
  },

  tooltip: (m) => {
    const k = japandi(m);
    const arrow = m === "dark"
      ? "border-[#A98D6B]/30 bg-[#2A231A]"
      : "border-[#8B7355]/30 bg-[#3D3529]";
    return `<!-- Japandi · Tooltip (pure CSS, hover the button) -->
<div class="group relative inline-block">
  <button class="${k.btnSecondary}">
    ${SV.card}
    Add to cart
  </button>

  <div class="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
    <div class="${k.tooltip} flex items-center gap-1.5 whitespace-nowrap">
      ${SV.info}
      Free shipping over ¥8,000
    </div>
    <!-- Arrow -->
    <div class="${arrow} absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r"></div>
  </div>
</div>`;
  },

  tabs: (m) => {
    const k = japandi(m);
    return `<!-- Japandi · Tabs (underline style, first tab active) -->
<div class="w-full max-w-md">
  <div class="${k.tabList}" role="tablist">
    <button class="${k.tabActive}" role="tab" aria-selected="true">Materials</button>
    <button class="${k.tabIdle}" role="tab" aria-selected="false">Dimensions</button>
    <button class="${k.tabIdle}" role="tab" aria-selected="false">Care</button>
  </div>

  <div class="pt-5" role="tabpanel">
    <p class="${k.muted} text-sm leading-relaxed">
      Solid white oak, unbleached linen and hand-glazed stoneware — sourced within 200km of our Kyoto atelier.
    </p>
  </div>
</div>`;
  },

  dropdown: (m) => {
    const k = japandi(m);
    return `<!-- Japandi · Dropdown menu (shown open) -->
<div class="relative inline-block">
  <button class="${k.btnSecondary} min-w-[190px] justify-between gap-6">
    Account
    ${SV.chevron}
  </button>

  <div class="${k.menu} absolute left-0 top-full z-20 mt-2 w-56 p-2">
    <button class="${k.menuItem}">${SV.user} Profile</button>
    <button class="${k.menuItem}">${SV.card} Orders</button>
    <button class="${k.menuItem}">${SV.gear} Preferences</button>
    <div class="${k.hairline} my-2 border-t"></div>
    <button class="${k.menuItem} ${m === "dark" ? "text-[#D09C8B] hover:bg-[#B0705F]/10" : "text-[#9C5B49] hover:bg-[#B0705F]/[0.08]"}">${SV.logout} Sign out</button>
  </div>
</div>`;
  },

  switch: (m) => {
    const k = japandi(m);
    return `<!-- Japandi · Toggle / Switch (ON state shown) -->
<label class="flex items-center gap-4">
  <button role="switch" aria-checked="true"
          class="${k.switchOn} relative h-7 w-12 rounded-full border transition-colors duration-300">
    <!-- Knob: ON → left-6 · OFF → left-1 + track classes "${k.switchOff}" -->
    <span class="absolute top-1/2 left-6 h-5 w-5 -translate-y-1/2 rounded-full bg-[#FBF8F1] shadow-sm transition-all duration-300"></span>
  </button>
  <span>
    <span class="${k.strong} block text-sm tracking-wide">Newsletter</span>
    <span class="${k.muted} block text-xs tracking-wide">Subscribed — one letter a month</span>
  </span>
</label>`;
  },

  skeleton: (m) => {
    const k = japandi(m);
    return `<!-- Japandi · Skeleton loader (card-shaped) -->
<div class="${k.panel} w-full max-w-sm space-y-4 p-6">
  <div class="${k.skeleton} h-32 w-full animate-pulse rounded-md"></div>
  <div class="${k.skeleton} h-4 w-2/3 animate-pulse rounded-sm"></div>
  <div class="${k.skeleton} h-3 w-full animate-pulse rounded-sm"></div>
  <div class="${k.skeleton} h-3 w-4/5 animate-pulse rounded-sm"></div>
  <div class="flex items-center gap-3 pt-2">
    <div class="${k.skeleton} h-8 w-28 animate-pulse rounded-md"></div>
    <div class="${k.skeleton} h-3 w-12 animate-pulse rounded-sm"></div>
  </div>
</div>`;
  },

  toast: (m) => {
    const k = japandi(m);
    return `<!-- Japandi · Toasts (success + error) -->
<div class="flex w-full max-w-sm flex-col gap-3">
  <!-- Success -->
  <div class="${k.panelSoft} relative overflow-hidden p-5">
    <div class="flex items-start gap-3.5">
      <span class="${k.successBg} flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
        ${SV.check}
      </span>
      <div class="flex-1">
        <p class="${k.strong} text-sm tracking-wide">Order placed</p>
        <p class="${k.muted} mt-1 text-xs leading-relaxed">Your ceramics will arrive within 3–5 days.</p>
      </div>
      <button class="${k.iconBtn}" aria-label="Dismiss">${SV.x}</button>
    </div>
    <div class="${k.successLine} absolute bottom-0 left-0 h-px w-2/3"></div>
  </div>

  <!-- Error -->
  <div class="${k.panelSoft} relative overflow-hidden p-5">
    <div class="flex items-start gap-3.5">
      <span class="${k.errorBg} flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
        ${SV.alert}
      </span>
      <div class="flex-1">
        <p class="${k.strong} text-sm tracking-wide">Payment declined</p>
        <p class="${k.muted} mt-1 text-xs leading-relaxed">Please try a different card.</p>
      </div>
      <button class="${k.iconBtn}" aria-label="Dismiss">${SV.x}</button>
    </div>
    <div class="${k.errorLine} absolute bottom-0 left-0 h-px w-1/3"></div>
  </div>
</div>`;
  },

  progress: (m) => {
    const k = japandi(m);
    return `<!-- Japandi · Progress bar (hairline track, animate width with JS; 64% shown) -->
<div class="w-full max-w-md">
  <div class="mb-3 flex items-center justify-between text-sm">
    <span class="${k.strong} tracking-wide">Glazing your set…</span>
    <span class="${k.muted} font-mono text-xs">64%</span>
  </div>
  <div class="${k.track} h-1 w-full overflow-hidden rounded-full">
    <div class="${k.fill} h-full rounded-full transition-all duration-300 ease-out" style="width: 64%"></div>
  </div>
</div>`;
  },

  avatar: (m) => {
    const k = japandi(m);
    const initials = m === "dark" ? "bg-[#2B241A] text-[#C8B394]" : "bg-[#EDE4D3] text-[#7A6449]";
    return `<!-- Japandi · Avatars (photo + initials fallback, with status dots) -->
<div class="flex items-center gap-5">
  <!-- Photo avatar · available -->
  <div class="relative">
    <img src="${avatarSvg("#A98D6B", "#D8CBB6")}" alt="Yuki Tanaka"
         class="${k.ring} h-14 w-14 rounded-full object-cover ring-1" />
    <span class="${k.dotRing} absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 bg-[#7C8F6B]"></span>
  </div>

  <!-- Initials fallback · away -->
  <div class="relative">
    <div class="${k.serif} ${k.ring} ${initials} flex h-14 w-14 items-center justify-center rounded-full text-sm tracking-widest ring-1">
      YT
    </div>
    <span class="${k.dotRing} absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 bg-[#C9A227]"></span>
  </div>

  <div>
    <p class="${k.serif} ${k.strong} text-sm tracking-wide">Yuki Tanaka</p>
    <p class="${k.muted} text-xs tracking-wide">Available · Kyoto atelier</p>
  </div>
</div>`;
  },
};
