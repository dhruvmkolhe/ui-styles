"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { Mode } from "@/lib/styles/types";
import { glass } from "./kit";
import {
  IconAlertCircle,
  IconArrowRight,
  IconBolt,
  IconCard,
  IconCheckCircle,
  IconChevronDown,
  IconGear,
  IconImage,
  IconInfo,
  IconLogout,
  IconSparkle,
  IconUser,
  IconX,
  avatarSvg,
} from "../icons";

/* ============ 1 · Button ============ */
export function ButtonPreview({ mode }: { mode: Mode }) {
  const k = glass(mode);
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <button className={k.btnPrimary}>
        <IconSparkle className="h-4 w-4" />
        Get Started
      </button>
      <button className={k.btnSecondary}>
        Learn more
        <IconArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

/* ============ 2 · Card ============ */
export function CardPreview({ mode }: { mode: Mode }) {
  const k = glass(mode);
  return (
    <div className="flex justify-center">
      <div className={cn(k.panel, "w-full max-w-sm overflow-hidden")}>
        <div className="relative flex h-36 items-center justify-center bg-gradient-to-br from-violet-500/50 via-fuchsia-500/30 to-cyan-400/40">
          <IconImage className="h-8 w-8 text-white/70" />
          <span className={cn(k.badgeViolet, "absolute left-3 top-3 !px-2.5 !py-0.5 text-[10px]")}>
            ✦ New
          </span>
        </div>
        <div className="space-y-2.5 p-5">
          <h3 className={cn("text-base font-semibold", k.strong)}>Frosted Dashboard Kit</h3>
          <p className={cn("text-sm leading-relaxed", k.muted)}>
            Layered glass panels, soft glows and frosted blur — ready to drop into any product.
          </p>
          <div className="flex items-center justify-between pt-2">
            <button className={k.btnPrimarySm}>
              Explore kit
              <IconArrowRight className="h-3.5 w-3.5" />
            </button>
            <span className={cn("text-xs", k.faint)}>42 components</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ 3 · Navbar ============ */
export function NavbarPreview({ mode }: { mode: Mode }) {
  const k = glass(mode);
  return (
    <div className={cn(k.bar, "flex items-center justify-between px-4 py-3 sm:px-5")}>
      <div className={cn("flex items-center gap-2 text-sm font-semibold", k.strong)}>
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 shadow-[0_0_12px_rgba(139,92,246,0.5)]">
          <IconBolt className="h-3.5 w-3.5 text-white" />
        </span>
        Aurora
      </div>
      <nav className="hidden items-center gap-5 text-[13px] sm:flex">
        {["Products", "Pricing", "Docs"].map((l) => (
          <a key={l} href="#" className={cn("transition hover:opacity-100", k.muted, "hover:text-inherit")}>
            {l}
          </a>
        ))}
      </nav>
      <button className={k.btnPrimarySm}>Sign in</button>
    </div>
  );
}

/* ============ 4 · Input ============ */
export function InputPreview({ mode }: { mode: Mode }) {
  const k = glass(mode);
  return (
    <div className="mx-auto w-full max-w-sm">
      <label className={k.label} htmlFor="glass-email">Email address</label>
      <input id="glass-email" className={k.input} placeholder="you@studio.com" />
      <p className={cn("mt-2 text-xs", k.faint)}>
        We&apos;ll send a magic link — no password needed.
      </p>
    </div>
  );
}

/* ============ 5 · Badge ============ */
export function BadgePreview({ mode }: { mode: Mode }) {
  const k = glass(mode);
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <span className={k.badgeViolet}>
        <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
        Live
      </span>
      <span className={k.badgeCyan}>
        <IconSparkle className="h-3 w-3" />
        Beta
      </span>
      <span className={k.badgeGhost}>v2.4.0</span>
    </div>
  );
}

/* ============ 6 · Modal ============ */
export function ModalPreview({ mode }: { mode: Mode }) {
  const k = glass(mode);
  const [open, setOpen] = useState(false);
  return (
    <div className="relative -m-5 flex min-h-[260px] items-center justify-center p-5 sm:-m-10 sm:p-10">
      <button className={k.btnPrimary} onClick={() => setOpen(true)}>
        <IconSparkle className="h-4 w-4" />
        Open modal
      </button>
      {open && (
        <div className={k.overlay} onClick={() => setOpen(false)}>
          <div
            className={cn(k.panel, "w-full max-w-sm p-6")}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h3 className={cn("text-base font-semibold", k.strong)}>Upgrade to Pro</h3>
              <button className={k.iconBtn} onClick={() => setOpen(false)} aria-label="Close">
                <IconX className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className={cn("mt-3 text-sm leading-relaxed", k.muted)}>
              Unlock all 8 styles, 120 components and clean, unwatermarked code for your team.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button className={cn(k.btnSecondary, "!px-4 !py-2 !text-xs")} onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button className={k.btnPrimarySm} onClick={() => setOpen(false)}>
                Upgrade — $9/mo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============ 7 · Accordion ============ */
const GLASS_FAQ = [
  {
    q: "What is glassmorphism?",
    a: "A style built on translucent, frosted-glass panels floating over colorful backgrounds — created with backdrop-blur, semi-transparent fills and subtle light borders.",
  },
  {
    q: "When should I use it?",
    a: "Great for hero sections, dashboards and overlays where depth matters. Keep body text on solid or heavily-blurred surfaces so it stays readable.",
  },
  {
    q: "Does it hurt performance?",
    a: "backdrop-filter is GPU-accelerated on modern browsers. Limit the number of stacked blur layers on low-end mobile devices and you'll be fine.",
  },
];

export function AccordionPreview({ mode }: { mode: Mode }) {
  const k = glass(mode);
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className={cn(k.panelSoft, "mx-auto w-full max-w-md divide-y", k.divider)}>
      {GLASS_FAQ.map((item, i) => (
        <div key={item.q}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className={cn("flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium", k.strong)}
          >
            {item.q}
            <IconChevronDown className={cn("h-4 w-4 shrink-0 transition-transform duration-300", k.muted, open === i && "rotate-180")} />
          </button>
          <div className={cn("grid transition-all duration-300", open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
            <div className="overflow-hidden">
              <p className={cn("px-5 pb-4 text-sm leading-relaxed", k.muted)}>{item.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============ 8 · Tooltip ============ */
export function TooltipPreview({ mode }: { mode: Mode }) {
  const k = glass(mode);
  return (
    <div className="flex min-h-[150px] items-center justify-center">
      <div className="group relative">
        <button className={k.btnSecondary}>
          <IconCard className="h-4 w-4" />
          Copy API key
        </button>
        <div className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 scale-95 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
          <div className={cn(k.tooltip, "flex items-center gap-1.5 whitespace-nowrap")}>
            <IconInfo className="h-3.5 w-3.5 text-cyan-400" />
            Keys are stored encrypted ✦
          </div>
          <div className={cn("absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r", k.hairline, mode === "dark" ? "bg-[#171426]/90" : "bg-white/85")} />
        </div>
      </div>
    </div>
  );
}

/* ============ 9 · Tabs ============ */
const GLASS_TABS = [
  {
    label: "Overview",
    body: "Frosted panels layered over a vivid gradient backdrop. Blur, transparency and glow do all the heavy lifting.",
  },
  {
    label: "Specs",
    body: "backdrop-blur-md · bg-white/10 · border-white/15 · shadow with 45% black · violet & cyan accent glows.",
  },
  {
    label: "Reviews",
    body: "“Feels like the interface is floating.” — 4.9★ from 214 designers who shipped glass dashboards with this kit.",
  },
];

export function TabsPreview({ mode }: { mode: Mode }) {
  const k = glass(mode);
  const [tab, setTab] = useState(0);
  return (
    <div className="mx-auto w-full max-w-md">
      <div className={k.tabList}>
        {GLASS_TABS.map((t, i) => (
          <button key={t.label} onClick={() => setTab(i)} className={tab === i ? k.tabActive : k.tabIdle}>
            {t.label}
          </button>
        ))}
      </div>
      <div className={cn(k.panelSoft, "mt-4 p-5")}>
        <p className={cn("text-sm leading-relaxed", k.muted)}>{GLASS_TABS[tab].body}</p>
      </div>
    </div>
  );
}

/* ============ 10 · Dropdown ============ */
export function DropdownPreview({ mode }: { mode: Mode }) {
  const k = glass(mode);
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex min-h-[250px] items-start justify-center pt-2">
      {open && <div className="absolute inset-0 z-10" onClick={() => setOpen(false)} />}
      <div className="relative z-20">
        <button
          onClick={() => setOpen((o) => !o)}
          className={cn(k.btnSecondary, "min-w-[190px] justify-between gap-6")}
        >
          Workspace settings
          <IconChevronDown className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180")} />
        </button>
        {open && (
          <div className={cn(k.menu, "absolute left-0 top-full z-20 mt-2 w-56 p-1.5")}>
            <button className={k.menuItem}><IconUser className="h-4 w-4" /> Profile</button>
            <button className={k.menuItem}><IconCard className="h-4 w-4" /> Billing</button>
            <button className={k.menuItem}><IconGear className="h-4 w-4" /> Preferences</button>
            <div className={cn("my-1.5 border-t", k.hairline)} />
            <button className={cn(k.menuItem, "!text-rose-400 hover:!bg-rose-400/10")}><IconLogout className="h-4 w-4" /> Sign out</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============ 11 · Switch ============ */
export function SwitchPreview({ mode }: { mode: Mode }) {
  const k = glass(mode);
  const [on, setOn] = useState(true);
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        role="switch"
        aria-checked={on}
        onClick={() => setOn(!on)}
        className={cn(
          "relative h-7 w-12 rounded-full border backdrop-blur-md transition-all duration-300",
          on ? k.switchOn : cn(k.switchOff, mode === "dark" ? "border-white/15" : "border-white/70")
        )}
      >
        <span
          className={cn(
            "absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow-md transition-all duration-300",
            on ? "left-6" : "left-1"
          )}
        />
      </button>
      <div>
        <p className={cn("text-sm font-medium", k.strong)}>Push notifications</p>
        <p className={cn("text-xs", k.muted)}>{on ? "On — glowing violet" : "Off"}</p>
      </div>
    </div>
  );
}

/* ============ 12 · Skeleton ============ */
export function SkeletonPreview({ mode }: { mode: Mode }) {
  const k = glass(mode);
  return (
    <div className="flex justify-center">
      <div className={cn(k.panel, "w-full max-w-sm space-y-4 p-5")}>
        <div className={cn(k.skeleton, "h-32 w-full animate-pulse rounded-xl")} />
        <div className={cn(k.skeleton, "h-4 w-3/4 animate-pulse rounded-full")} />
        <div className={cn(k.skeleton, "h-3 w-full animate-pulse rounded-full")} />
        <div className={cn(k.skeleton, "h-3 w-5/6 animate-pulse rounded-full")} />
        <div className="flex items-center gap-3 pt-1">
          <div className={cn(k.skeleton, "h-8 w-24 animate-pulse rounded-lg")} />
          <div className={cn(k.skeleton, "h-8 w-8 animate-pulse rounded-full")} />
        </div>
      </div>
    </div>
  );
}

/* ============ 13 · Toast ============ */
export function ToastPreview({ mode }: { mode: Mode }) {
  const k = glass(mode);
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-3">
      <div className={cn(k.panelSoft, "relative overflow-hidden p-4")}>
        <div className="flex items-start gap-3">
          <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", k.successBg)}>
            <IconCheckCircle className="h-[18px] w-[18px]" />
          </span>
          <div className="flex-1">
            <p className={cn("text-sm font-medium", k.strong)}>Changes saved</p>
            <p className={cn("mt-0.5 text-xs", k.muted)}>Your profile was updated successfully.</p>
          </div>
          <button className={k.iconBtn} aria-label="Dismiss"><IconX className="h-3.5 w-3.5" /></button>
        </div>
        <div className={cn("absolute bottom-0 left-0 h-0.5 w-2/3 rounded-full", k.successLine)} />
      </div>
      <div className={cn(k.panelSoft, "relative overflow-hidden p-4")}>
        <div className="flex items-start gap-3">
          <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", k.errorBg)}>
            <IconAlertCircle className="h-[18px] w-[18px]" />
          </span>
          <div className="flex-1">
            <p className={cn("text-sm font-medium", k.strong)}>Upload failed</p>
            <p className={cn("mt-0.5 text-xs", k.muted)}>The file exceeds the 25 MB limit.</p>
          </div>
          <button className={k.iconBtn} aria-label="Dismiss"><IconX className="h-3.5 w-3.5" /></button>
        </div>
        <div className={cn("absolute bottom-0 left-0 h-0.5 w-1/3 rounded-full", k.errorLine)} />
      </div>
    </div>
  );
}

/* ============ 14 · Progress ============ */
export function ProgressPreview({ mode }: { mode: Mode }) {
  const k = glass(mode);
  const [pct, setPct] = useState(0);
  useEffect(() => {
    setPct(0);
    let n = 0;
    const id = setInterval(() => {
      n += 2;
      if (n >= 72) {
        n = 72;
        clearInterval(id);
      }
      setPct(n);
    }, 26);
    return () => clearInterval(id);
  }, [mode]);
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-2.5 flex items-center justify-between text-sm">
        <span className={cn("font-medium", k.strong)}>Uploading glass assets…</span>
        <span className={cn("font-mono text-xs", k.muted)}>{pct}%</span>
      </div>
      <div className={cn("h-2.5 w-full overflow-hidden rounded-full", k.track)}>
        <div
          className={cn("h-full rounded-full transition-all duration-200 ease-out", k.fill)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* ============ 15 · Avatar ============ */
export function AvatarPreview({ mode }: { mode: Mode }) {
  const k = glass(mode);
  return (
    <div className="flex items-center justify-center gap-5">
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarSvg("#8b5cf6", "#06b6d4")}
          alt="Mia Chen"
          className={cn("h-14 w-14 rounded-full object-cover ring-2", k.ring)}
        />
        <span className={cn("absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 bg-emerald-400", k.dotRing)} />
      </div>
      <div className="relative">
        <div className={cn("flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/70 to-cyan-400/70 text-sm font-semibold text-white ring-2 backdrop-blur-md", k.ring)}>
          AK
        </div>
        <span className={cn("absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 bg-amber-400", k.dotRing)} />
      </div>
      <div>
        <p className={cn("text-sm font-medium", k.strong)}>Mia Chen</p>
        <p className={cn("text-xs", k.muted)}>Online · Product design</p>
      </div>
    </div>
  );
}

/* ============ Decorative stage background ============ */
export function GlassDecor({ mode }: { mode: Mode }) {
  if (mode === "dark") {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-violet-600/40 blur-3xl animate-blob" />
        <div className="absolute -bottom-28 -right-16 h-80 w-80 rounded-full bg-cyan-500/30 blur-3xl animate-blob-slow" />
        <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/20 blur-3xl" />
      </div>
    );
  }
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-violet-400/35 blur-3xl animate-blob" />
      <div className="absolute -bottom-28 -right-16 h-80 w-80 rounded-full bg-sky-400/35 blur-3xl animate-blob-slow" />
      <div className="absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 rounded-full bg-fuchsia-300/30 blur-3xl" />
    </div>
  );
}
