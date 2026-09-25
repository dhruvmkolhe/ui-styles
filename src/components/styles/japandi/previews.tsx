"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { Mode } from "@/lib/styles/types";
import { japandi } from "./kit";
import {
  IconAlertCircle,
  IconArrowRight,
  IconCard,
  IconCheckCircle,
  IconChevronDown,
  IconGear,
  IconImage,
  IconInfo,
  IconLogout,
  IconUser,
  IconX,
  avatarSvg,
} from "../icons";

/* ============ 1 · Button ============ */
export function ButtonPreview({ mode }: { mode: Mode }) {
  const k = japandi(mode);
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <button className={k.btnPrimary}>Explore the collection</button>
      <button className={k.btnSecondary}>
        Our story
        <IconArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

/* ============ 2 · Card ============ */
export function CardPreview({ mode }: { mode: Mode }) {
  const k = japandi(mode);
  return (
    <div className="flex justify-center">
      <div className={cn(k.panel, "w-full max-w-sm overflow-hidden")}>
        <div className={cn("relative flex h-36 items-center justify-center", k.imagePlaceholder)}>
          <IconImage className="h-8 w-8" />
          <span className={cn(k.badge, "absolute left-3 top-3 !bg-[#FBF8F1]/80")}>New season</span>
        </div>
        <div className="space-y-3 p-6">
          <h3 className={cn(k.serif, "text-lg tracking-wide", k.strong)}>Kyoto Ceramics Set</h3>
          <p className={cn("text-sm leading-relaxed", k.muted)}>
            Hand-glazed stoneware in warm oat tones. Made slowly, meant to last a lifetime.
          </p>
          <div className="flex items-center justify-between pt-2">
            <button className={k.btnPrimarySm}>
              View details
              <IconArrowRight className="h-3.5 w-3.5" />
            </button>
            <span className={cn("text-xs tracking-wide", k.faint)}>¥ 12,400</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ 3 · Navbar ============ */
export function NavbarPreview({ mode }: { mode: Mode }) {
  const k = japandi(mode);
  return (
    <div className={cn(k.bar, "flex items-center justify-between px-5 py-4")}>
      <div className={cn(k.serif, "text-sm tracking-[0.2em]", k.strong)}>SABI&nbsp;&amp;&nbsp;CO</div>
      <nav className="hidden items-center gap-6 text-[13px] tracking-wide sm:flex">
        {["Shop", "Journal", "Ateliers"].map((l) => (
          <a key={l} href="#" className={cn(k.muted, "transition-colors hover:text-inherit")}>
            {l}
          </a>
        ))}
      </nav>
      <button className={k.btnPrimarySm}>Cart (0)</button>
    </div>
  );
}

/* ============ 4 · Input ============ */
export function InputPreview({ mode }: { mode: Mode }) {
  const k = japandi(mode);
  return (
    <div className="mx-auto w-full max-w-sm">
      <label className={k.label} htmlFor="japandi-email">Email address</label>
      <input id="japandi-email" className={k.input} placeholder="you@studio.com" />
      <p className={cn("mt-2.5 text-xs tracking-wide", k.faint)}>
        One quiet letter each month. Unsubscribe anytime.
      </p>
    </div>
  );
}

/* ============ 5 · Badge ============ */
export function BadgePreview({ mode }: { mode: Mode }) {
  const k = japandi(mode);
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <span className={k.badge}>
        <span className={cn("h-1.5 w-1.5 rounded-full", mode === "dark" ? "bg-[#A8B897]" : "bg-[#7C8F6B]")} />
        In stock
      </span>
      <span className={k.badgeSolid}>Handmade</span>
      <span className={k.badge}>Oak · Linen</span>
    </div>
  );
}

/* ============ 6 · Modal ============ */
export function ModalPreview({ mode }: { mode: Mode }) {
  const k = japandi(mode);
  const [open, setOpen] = useState(false);
  return (
    <div className="relative -m-5 flex min-h-[260px] items-center justify-center p-5 sm:-m-10 sm:p-10">
      <button className={k.btnPrimary} onClick={() => setOpen(true)}>Open dialog</button>
      {open && (
        <div className={k.overlay} onClick={() => setOpen(false)}>
          <div className={cn(k.panel, "w-full max-w-sm p-7")} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <h3 className={cn(k.serif, "text-lg tracking-wide", k.strong)}>Join the atelier</h3>
              <button className={k.iconBtn} onClick={() => setOpen(false)} aria-label="Close">
                <IconX className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className={cn("mt-3.5 text-sm leading-relaxed", k.muted)}>
              Receive early access to seasonal releases, studio notes and a 10% welcome gift.
            </p>
            <div className="mt-7 flex justify-end gap-3">
              <button className={cn(k.btnSecondary, "!px-4 !py-2 !text-xs")} onClick={() => setOpen(false)}>
                Not now
              </button>
              <button className={k.btnPrimarySm} onClick={() => setOpen(false)}>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============ 7 · Accordion ============ */
const JAPANDI_FAQ = [
  {
    q: "What is Japandi design?",
    a: "A quiet fusion of Japanese wabi-sabi and Scandinavian functionalism — warm neutrals, natural materials, thin borders and space to breathe.",
  },
  {
    q: "Which colors should I use?",
    a: "Oat, linen, clay and soft browns like #F5F0E8 and #8B7355. Keep contrast gentle; accents come from texture, not saturation.",
  },
  {
    q: "Can it work for software?",
    a: "Beautifully. Generous padding, hairline dividers and serif display type give dashboards and marketing pages a calm, premium feel.",
  },
];

export function AccordionPreview({ mode }: { mode: Mode }) {
  const k = japandi(mode);
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className={cn(k.panelSoft, "mx-auto w-full max-w-md divide-y", k.divider)}>
      {JAPANDI_FAQ.map((item, i) => (
        <div key={item.q}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className={cn("flex w-full items-center justify-between px-6 py-4 text-left text-sm tracking-wide", k.strong)}
          >
            {item.q}
            <IconChevronDown className={cn("h-4 w-4 shrink-0 transition-transform duration-300", k.faint, open === i && "rotate-180")} />
          </button>
          <div className={cn("grid transition-all duration-300", open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
            <div className="overflow-hidden">
              <p className={cn("px-6 pb-5 text-sm leading-relaxed", k.muted)}>{item.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============ 8 · Tooltip ============ */
export function TooltipPreview({ mode }: { mode: Mode }) {
  const k = japandi(mode);
  return (
    <div className="flex min-h-[150px] items-center justify-center">
      <div className="group relative">
        <button className={k.btnSecondary}>
          <IconCard className="h-4 w-4" />
          Add to cart
        </button>
        <div className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
          <div className={cn(k.tooltip, "flex items-center gap-1.5 whitespace-nowrap")}>
            <IconInfo className="h-3.5 w-3.5" />
            Free shipping over ¥8,000
          </div>
          <div className={cn("absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r", mode === "dark" ? "border-[#A98D6B]/30 bg-[#2A231A]" : "border-[#8B7355]/30 bg-[#3D3529]")} />
        </div>
      </div>
    </div>
  );
}

/* ============ 9 · Tabs ============ */
const JAPANDI_TABS = [
  {
    label: "Materials",
    body: "Solid white oak, unbleached linen and hand-glazed stoneware — sourced within 200km of our Kyoto atelier.",
  },
  {
    label: "Dimensions",
    body: "Bowl Ø 14cm · Mug 280ml · Plate Ø 21cm. Each piece varies slightly; that irregularity is the point.",
  },
  {
    label: "Care",
    body: "Hand wash in warm water, dry immediately, and the glaze will deepen beautifully over years of use.",
  },
];

export function TabsPreview({ mode }: { mode: Mode }) {
  const k = japandi(mode);
  const [tab, setTab] = useState(0);
  return (
    <div className="mx-auto w-full max-w-md">
      <div className={k.tabList}>
        {JAPANDI_TABS.map((t, i) => (
          <button key={t.label} onClick={() => setTab(i)} className={tab === i ? k.tabActive : k.tabIdle}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="pt-5">
        <p className={cn("text-sm leading-relaxed", k.muted)}>{JAPANDI_TABS[tab].body}</p>
      </div>
    </div>
  );
}

/* ============ 10 · Dropdown ============ */
export function DropdownPreview({ mode }: { mode: Mode }) {
  const k = japandi(mode);
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex min-h-[250px] items-start justify-center pt-2">
      {open && <div className="absolute inset-0 z-10" onClick={() => setOpen(false)} />}
      <div className="relative z-20">
        <button
          onClick={() => setOpen((o) => !o)}
          className={cn(k.btnSecondary, "min-w-[190px] justify-between gap-6")}
        >
          Account
          <IconChevronDown className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180")} />
        </button>
        {open && (
          <div className={cn(k.menu, "absolute left-0 top-full z-20 mt-2 w-56 p-2")}>
            <button className={k.menuItem}><IconUser className="h-4 w-4" /> Profile</button>
            <button className={k.menuItem}><IconCard className="h-4 w-4" /> Orders</button>
            <button className={k.menuItem}><IconGear className="h-4 w-4" /> Preferences</button>
            <div className={cn("my-2 border-t", k.hairline)} />
            <button className={cn(k.menuItem, k.dangerText)}><IconLogout className="h-4 w-4" /> Sign out</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============ 11 · Switch ============ */
export function SwitchPreview({ mode }: { mode: Mode }) {
  const k = japandi(mode);
  const [on, setOn] = useState(true);
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        role="switch"
        aria-checked={on}
        onClick={() => setOn(!on)}
        className={cn(
          "relative h-7 w-12 rounded-full border transition-colors duration-300",
          on ? k.switchOn : k.switchOff
        )}
      >
        <span
          className={cn(
            "absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-[#FBF8F1] shadow-sm transition-all duration-300",
            on ? "left-6" : "left-1"
          )}
        />
      </button>
      <div>
        <p className={cn("text-sm tracking-wide", k.strong)}>Newsletter</p>
        <p className={cn("text-xs tracking-wide", k.muted)}>{on ? "Subscribed — one letter a month" : "Paused"}</p>
      </div>
    </div>
  );
}

/* ============ 12 · Skeleton ============ */
export function SkeletonPreview({ mode }: { mode: Mode }) {
  const k = japandi(mode);
  return (
    <div className="flex justify-center">
      <div className={cn(k.panel, "w-full max-w-sm space-y-4 p-6")}>
        <div className={cn(k.skeleton, "h-32 w-full animate-pulse rounded-md")} />
        <div className={cn(k.skeleton, "h-4 w-2/3 animate-pulse rounded-sm")} />
        <div className={cn(k.skeleton, "h-3 w-full animate-pulse rounded-sm")} />
        <div className={cn(k.skeleton, "h-3 w-4/5 animate-pulse rounded-sm")} />
        <div className="flex items-center gap-3 pt-2">
          <div className={cn(k.skeleton, "h-8 w-28 animate-pulse rounded-md")} />
          <div className={cn(k.skeleton, "h-3 w-12 animate-pulse rounded-sm")} />
        </div>
      </div>
    </div>
  );
}

/* ============ 13 · Toast ============ */
export function ToastPreview({ mode }: { mode: Mode }) {
  const k = japandi(mode);
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-3">
      <div className={cn(k.panelSoft, "relative overflow-hidden p-5")}>
        <div className="flex items-start gap-3.5">
          <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", k.successBg)}>
            <IconCheckCircle className="h-[18px] w-[18px]" />
          </span>
          <div className="flex-1">
            <p className={cn("text-sm tracking-wide", k.strong)}>Order placed</p>
            <p className={cn("mt-1 text-xs leading-relaxed", k.muted)}>Your ceramics will arrive within 3–5 days.</p>
          </div>
          <button className={k.iconBtn} aria-label="Dismiss"><IconX className="h-3.5 w-3.5" /></button>
        </div>
        <div className={cn("absolute bottom-0 left-0 h-px w-2/3", k.successLine)} />
      </div>
      <div className={cn(k.panelSoft, "relative overflow-hidden p-5")}>
        <div className="flex items-start gap-3.5">
          <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", k.errorBg)}>
            <IconAlertCircle className="h-[18px] w-[18px]" />
          </span>
          <div className="flex-1">
            <p className={cn("text-sm tracking-wide", k.strong)}>Payment declined</p>
            <p className={cn("mt-1 text-xs leading-relaxed", k.muted)}>Please try a different card.</p>
          </div>
          <button className={k.iconBtn} aria-label="Dismiss"><IconX className="h-3.5 w-3.5" /></button>
        </div>
        <div className={cn("absolute bottom-0 left-0 h-px w-1/3", k.errorLine)} />
      </div>
    </div>
  );
}

/* ============ 14 · Progress ============ */
export function ProgressPreview({ mode }: { mode: Mode }) {
  const k = japandi(mode);
  const [pct, setPct] = useState(0);
  useEffect(() => {
    setPct(0);
    let n = 0;
    const id = setInterval(() => {
      n += 2;
      if (n >= 64) {
        n = 64;
        clearInterval(id);
      }
      setPct(n);
    }, 28);
    return () => clearInterval(id);
  }, [mode]);
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className={cn("tracking-wide", k.strong)}>Glazing your set…</span>
        <span className={cn("font-mono text-xs", k.muted)}>{pct}%</span>
      </div>
      <div className={cn("h-1 w-full overflow-hidden rounded-full", k.track)}>
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
  const k = japandi(mode);
  return (
    <div className="flex items-center justify-center gap-5">
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarSvg("#A98D6B", "#D8CBB6")}
          alt="Yuki Tanaka"
          className={cn("h-14 w-14 rounded-full object-cover ring-1", k.ring)}
        />
        <span className={cn("absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 bg-[#7C8F6B]", k.dotRing)} />
      </div>
      <div className="relative">
        <div className={cn(k.serif, "flex h-14 w-14 items-center justify-center rounded-full text-sm tracking-widest ring-1", k.ring, mode === "dark" ? "bg-[#2B241A] text-[#C8B394]" : "bg-[#EDE4D3] text-[#7A6449]")}>
          YT
        </div>
        <span className={cn("absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 bg-[#C9A227]", k.dotRing)} />
      </div>
      <div>
        <p className={cn(k.serif, "text-sm tracking-wide", k.strong)}>Yuki Tanaka</p>
        <p className={cn("text-xs tracking-wide", k.muted)}>Available · Kyoto atelier</p>
      </div>
    </div>
  );
}
