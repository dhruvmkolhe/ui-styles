"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Mode } from "@/lib/styles/types";
import { minimalist } from "./kit";
import {
  IconArrowRight,
  IconCheck,
  IconChevronDown,
  IconGear,
  IconImage,
  IconLogout,
  IconUser,
  IconX,
} from "../icons";

/* ============ 1 · Button ============ */
export function ButtonPreview({ mode }: { mode: Mode }) {
  const k = minimalist(mode);
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <button className={k.btnPrimary}>Get Started</button>
      <button className={k.btnSecondary}>
        Overview
        <IconArrowRight className="h-3.5 w-3.5 stroke-[1.5]" />
      </button>
    </div>
  );
}

/* ============ 2 · Card ============ */
export function CardPreview({ mode }: { mode: Mode }) {
  const k = minimalist(mode);
  return (
    <div className="flex justify-center">
      <div className={cn(k.panel, "w-full max-w-sm")}>
        <div className={cn("flex h-32 items-center justify-center rounded-lg", k.imagePlaceholder)}>
          <IconImage className="h-6 w-6 stroke-[1.2]" />
        </div>
        <div className="mt-5 space-y-2">
          <span className={k.badge}>Architecture</span>
          <h3 className={cn(k.strong, "text-base tracking-tight")}>Monochrome Volume 01</h3>
          <p className={cn("text-xs leading-relaxed", k.muted)}>
            A quiet study in spatial proportions, light, and natural shadow play.
          </p>
          <div className="flex items-center justify-between pt-4">
            <button className={k.btnPrimarySm}>Read essay</button>
            <span className={cn(k.faint, "font-mono text-xs")}>01/08</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ 3 · Navbar ============ */
export function NavbarPreview({ mode }: { mode: Mode }) {
  const k = minimalist(mode);
  return (
    <div className={cn(k.bar, "flex items-center justify-between px-6 py-3.5")}>
      <span className="text-xs font-light uppercase tracking-[0.3em]">STUDIO</span>
      <nav className="hidden items-center gap-8 text-xs font-light text-neutral-500 sm:flex">
        <a href="#" className="hover:text-black">Work</a>
        <a href="#" className="hover:text-black">Index</a>
        <a href="#" className="hover:text-black">About</a>
      </nav>
      <button className={k.btnPrimarySm}>Contact</button>
    </div>
  );
}

/* ============ 4 · Input ============ */
export function InputPreview({ mode }: { mode: Mode }) {
  const k = minimalist(mode);
  return (
    <div className="mx-auto w-full max-w-sm">
      <label className={k.label}>SUBSCRIPTION EMAIL</label>
      <input className={k.input} placeholder="address@domain.com" />
    </div>
  );
}

/* ============ 5 · Badge ============ */
export function BadgePreview({ mode }: { mode: Mode }) {
  const k = minimalist(mode);
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <span className={k.badge}>ARCHIVE</span>
      <span className={k.badgeSolid}>FEATURED</span>
    </div>
  );
}

/* ============ 6 · Modal ============ */
export function ModalPreview({ mode }: { mode: Mode }) {
  const k = minimalist(mode);
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-center">
      <button onClick={() => setOpen(true)} className={k.btnPrimary}>
        Open Modal
      </button>
      {open && (
        <div className={k.overlay}>
          <div className={cn(k.panel, "w-full max-w-md")}>
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <h3 className={cn(k.strong, "text-sm font-normal")}>Export Workspace</h3>
              <button onClick={() => setOpen(false)} className={k.iconBtn}>
                <IconX className="h-3.5 w-3.5 stroke-[1.5]" />
              </button>
            </div>
            <p className={cn("mt-4 text-xs leading-relaxed", k.muted)}>
              All canvas state will be packaged as a single vector file with embedded font definitions.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setOpen(false)} className={k.btnSecondary}>
                Dismiss
              </button>
              <button onClick={() => setOpen(false)} className={k.btnPrimarySm}>
                Export PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============ 7 · Accordion ============ */
export function AccordionPreview({ mode }: { mode: Mode }) {
  const k = minimalist(mode);
  const [open, setOpen] = useState(true);
  return (
    <div className="mx-auto w-full max-w-md space-y-2">
      <div className={cn(k.panelSoft, "p-4")}>
        <div
          onClick={() => setOpen(!open)}
          className="flex cursor-pointer items-center justify-between text-xs font-light tracking-wide"
        >
          <span>Core Design Principles</span>
          <IconChevronDown className={cn("h-3.5 w-3.5 stroke-[1.5] transition-transform", open && "rotate-180")} />
        </div>
        {open && (
          <p className={cn("mt-3 text-xs leading-relaxed", k.muted)}>
            Minimalism strips non-essentials to emphasize purpose, clarity and serene balance.
          </p>
        )}
      </div>
    </div>
  );
}

/* ============ 8 · Tooltip ============ */
export function TooltipPreview({ mode }: { mode: Mode }) {
  const k = minimalist(mode);
  return (
    <div className="flex justify-center">
      <div className={k.tooltip}>Shift + Click to inspect</div>
    </div>
  );
}

/* ============ 9 · Tabs ============ */
export function TabsPreview({ mode }: { mode: Mode }) {
  const k = minimalist(mode);
  const [tab, setTab] = useState("Selected");
  return (
    <div className="flex justify-center">
      <div className={k.tabList}>
        {["Selected", "Overview", "Settings"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={t === tab ? k.tabActive : k.tabIdle}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============ 10 · Dropdown ============ */
export function DropdownPreview({ mode }: { mode: Mode }) {
  const k = minimalist(mode);
  return (
    <div className="flex justify-center">
      <div className={cn(k.menu, "w-44 p-1.5 space-y-0.5")}>
        <button className={k.menuItem}>
          <IconUser className="h-3.5 w-3.5 stroke-[1.5]" /> Profile
        </button>
        <button className={k.menuItem}>
          <IconGear className="h-3.5 w-3.5 stroke-[1.5]" /> Preferences
        </button>
        <button className={cn(k.menuItem, k.dangerText)}>
          <IconLogout className="h-3.5 w-3.5 stroke-[1.5]" /> Sign out
        </button>
      </div>
    </div>
  );
}

/* ============ 11 · Switch ============ */
export function SwitchPreview({ mode }: { mode: Mode }) {
  const k = minimalist(mode);
  const [on, setOn] = useState(true);
  return (
    <div className="flex items-center justify-center gap-3">
      <div
        onClick={() => setOn(!on)}
        className={cn("relative h-5 w-9 cursor-pointer rounded-full transition-colors", on ? k.switchOn : k.switchOff)}
      >
        <div
          className={cn(
            "absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all shadow-sm",
            on ? "left-4" : "left-0.5 bg-neutral-400"
          )}
        />
      </div>
      <span className="text-xs font-light">{on ? "Active" : "Quiet"}</span>
    </div>
  );
}

/* ============ 12 · Skeleton ============ */
export function SkeletonPreview({ mode }: { mode: Mode }) {
  const k = minimalist(mode);
  return (
    <div className="mx-auto w-full max-w-sm space-y-2.5">
      <div className={cn(k.skeleton, "h-6 w-2/3")} />
      <div className={cn(k.skeleton, "h-3.5 w-full")} />
      <div className={cn(k.skeleton, "h-3.5 w-4/5")} />
    </div>
  );
}

/* ============ 13 · Toast ============ */
export function ToastPreview({ mode }: { mode: Mode }) {
  const k = minimalist(mode);
  return (
    <div className="mx-auto w-full max-w-sm">
      <div className={cn(k.successBg, "p-3.5 rounded-lg flex items-center justify-between")}>
        <div className="flex items-center gap-2.5 text-xs font-light">
          <IconCheck className="h-3.5 w-3.5 stroke-[1.5]" />
          <span>Document published to index</span>
        </div>
        <IconX className="h-3.5 w-3.5 stroke-[1.5] cursor-pointer" />
      </div>
    </div>
  );
}

/* ============ 14 · Progress ============ */
export function ProgressPreview({ mode }: { mode: Mode }) {
  const k = minimalist(mode);
  return (
    <div className="mx-auto w-full max-w-sm space-y-2">
      <div className="flex justify-between text-xs font-light">
        <span className={k.faint}>Processing</span>
        <span>66%</span>
      </div>
      <div className={cn(k.track, "h-1 w-full rounded-full overflow-hidden")}>
        <div className={cn(k.fill, "h-full w-2/3")} />
      </div>
    </div>
  );
}

/* ============ 15 · Avatar ============ */
export function AvatarPreview() {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="h-9 w-9 rounded-full bg-neutral-900 font-light text-xs flex items-center justify-center text-white">
        M
      </div>
      <div className="h-9 w-9 rounded-full border border-neutral-300 font-light text-xs flex items-center justify-center text-neutral-600">
        A
      </div>
    </div>
  );
}
