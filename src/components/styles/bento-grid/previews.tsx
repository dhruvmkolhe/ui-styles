"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Mode } from "@/lib/styles/types";
import { bentoGrid } from "./kit";
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
  const k = bentoGrid(mode);
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <button className={k.btnPrimary}>Explore Feature</button>
      <button className={k.btnSecondary}>
        Documentation
        <IconArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

/* ============ 2 · Card ============ */
export function CardPreview({ mode }: { mode: Mode }) {
  const k = bentoGrid(mode);
  return (
    <div className="flex justify-center">
      <div className={cn(k.panel, "w-full max-w-sm")}>
        <div className={cn("flex h-36 items-center justify-center rounded-xl", k.imagePlaceholder)}>
          <IconImage className="h-7 w-7 stroke-[1.8]" />
        </div>
        <div className="mt-4 space-y-2">
          <span className={k.badge}>Bento Card 2x1</span>
          <h3 className={cn(k.strong, "text-base")}>Editorial Grid Component</h3>
          <p className={cn("text-xs leading-relaxed", k.muted)}>
            Asymmetric modular cards with clean subtle borders, popularized by Apple, Linear and Vercel.
          </p>
          <div className="flex items-center justify-between pt-3">
            <button className={k.btnPrimarySm}>Learn more</button>
            <span className={cn(k.faint, "text-xs font-mono")}>⌘ + B</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ 3 · Navbar ============ */
export function NavbarPreview({ mode }: { mode: Mode }) {
  const k = bentoGrid(mode);
  return (
    <div className={cn(k.bar, "flex items-center justify-between px-6 py-3.5")}>
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-md bg-indigo-500" />
        <span className="text-sm font-bold tracking-tight">BentoUI</span>
      </div>
      <nav className={cn("hidden items-center gap-6 text-xs font-medium sm:flex", k.muted)}>
        <a href="#" className="hover:text-white">Grid</a>
        <a href="#" className="hover:text-white">Modules</a>
        <a href="#" className="hover:text-white">Showcase</a>
      </nav>
      <button className={k.btnPrimarySm}>Deploy</button>
    </div>
  );
}

/* ============ 4 · Input ============ */
export function InputPreview({ mode }: { mode: Mode }) {
  const k = bentoGrid(mode);
  return (
    <div className="mx-auto w-full max-w-sm">
      <label className={k.label}>WORKSPACE NAME</label>
      <input className={k.input} placeholder="my-linear-team" />
    </div>
  );
}

/* ============ 5 · Badge ============ */
export function BadgePreview({ mode }: { mode: Mode }) {
  const k = bentoGrid(mode);
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <span className={k.badge}>2x2 Feature</span>
      <span className={k.badgeSolid}>Vercel Stack</span>
    </div>
  );
}

/* ============ 6 · Modal ============ */
export function ModalPreview({ mode }: { mode: Mode }) {
  const k = bentoGrid(mode);
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-center">
      <button onClick={() => setOpen(true)} className={k.btnPrimary}>
        Configure Grid
      </button>
      {open && (
        <div className={k.overlay}>
          <div className={cn(k.panel, "w-full max-w-md")}>
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className={cn(k.strong, "text-sm font-semibold")}>Modular Grid Config</h3>
              <button onClick={() => setOpen(false)} className={k.iconBtn}>
                <IconX className="h-4 w-4" />
              </button>
            </div>
            <p className={cn("mt-4 text-xs leading-relaxed", k.muted)}>
              Rearrange bento cards dynamically across breakpoints for desktop and mobile viewport rendering.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setOpen(false)} className={k.btnSecondary}>
                Cancel
              </button>
              <button onClick={() => setOpen(false)} className={k.btnPrimarySm}>
                Apply Grid
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
  const k = bentoGrid(mode);
  const [open, setOpen] = useState(true);
  return (
    <div className="mx-auto w-full max-w-md space-y-3">
      <div className={cn(k.panelSoft, "p-4")}>
        <div
          onClick={() => setOpen(!open)}
          className={cn("flex cursor-pointer items-center justify-between text-xs font-semibold", k.strong)}
        >
          <span>What is a Bento Grid layout?</span>
          <IconChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
        </div>
        {open && (
          <p className={cn("mt-2.5 text-xs leading-relaxed", k.muted)}>
            A structured grid of asymmetric cards of varying aspect ratios that display product features cleanly.
          </p>
        )}
      </div>
    </div>
  );
}

/* ============ 8 · Tooltip ============ */
export function TooltipPreview({ mode }: { mode: Mode }) {
  const k = bentoGrid(mode);
  return (
    <div className="flex justify-center">
      <div className={k.tooltip}>Editorial Bento Cell</div>
    </div>
  );
}

/* ============ 9 · Tabs ============ */
export function TabsPreview({ mode }: { mode: Mode }) {
  const k = bentoGrid(mode);
  const [tab, setTab] = useState("Overview");
  return (
    <div className="flex justify-center">
      <div className={k.tabList}>
        {["Overview", "Analytics", "Settings"].map((t) => (
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
  const k = bentoGrid(mode);
  return (
    <div className="flex justify-center">
      <div className={cn(k.menu, "w-48 p-1.5 space-y-1")}>
        <button className={k.menuItem}>
          <IconUser className="h-4 w-4" /> Team Members
        </button>
        <button className={k.menuItem}>
          <IconGear className="h-4 w-4" /> Grid Preferences
        </button>
        <button className={cn(k.menuItem, k.dangerText)}>
          <IconLogout className="h-4 w-4" /> Archive Card
        </button>
      </div>
    </div>
  );
}

/* ============ 11 · Switch ============ */
export function SwitchPreview({ mode }: { mode: Mode }) {
  const k = bentoGrid(mode);
  const [on, setOn] = useState(true);
  return (
    <div className="flex items-center justify-center gap-3">
      <div
        onClick={() => setOn(!on)}
        className={cn("relative h-6 w-11 cursor-pointer rounded-full transition-colors", on ? k.switchOn : k.switchOff)}
      >
        <div
          className={cn(
            "absolute top-1 h-4 w-4 rounded-full bg-white transition-all shadow-sm",
            on ? "left-6" : "left-1"
          )}
        />
      </div>
      <span className="text-xs font-medium">{on ? "Enabled" : "Disabled"}</span>
    </div>
  );
}

/* ============ 12 · Skeleton ============ */
export function SkeletonPreview({ mode }: { mode: Mode }) {
  const k = bentoGrid(mode);
  return (
    <div className="mx-auto grid w-full max-w-sm grid-cols-3 gap-2">
      <div className={cn(k.skeleton, "h-20 col-span-2")} />
      <div className={cn(k.skeleton, "h-20")} />
    </div>
  );
}

/* ============ 13 · Toast ============ */
export function ToastPreview({ mode }: { mode: Mode }) {
  const k = bentoGrid(mode);
  return (
    <div className="mx-auto w-full max-w-sm">
      <div className={cn(k.successBg, "p-3.5 rounded-xl flex items-center justify-between text-xs font-medium")}>
        <div className="flex items-center gap-2.5">
          <IconCheck className="h-4 w-4" />
          <span>Bento card added to layout</span>
        </div>
        <IconX className="h-4 w-4 cursor-pointer" />
      </div>
    </div>
  );
}

/* ============ 14 · Progress ============ */
export function ProgressPreview({ mode }: { mode: Mode }) {
  const k = bentoGrid(mode);
  return (
    <div className="mx-auto w-full max-w-sm space-y-2">
      <div className="flex justify-between text-xs font-medium">
        <span className={k.faint}>Grid rendering</span>
        <span className="text-indigo-400">75%</span>
      </div>
      <div className={cn(k.track, "h-2 w-full rounded-full overflow-hidden")}>
        <div className={cn(k.fill, "h-full w-3/4")} />
      </div>
    </div>
  );
}

/* ============ 15 · Avatar ============ */
export function AvatarPreview() {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="h-9 w-9 rounded-xl bg-indigo-600 font-semibold text-xs flex items-center justify-center text-white shadow-sm">
        BG
      </div>
      <div className="h-9 w-9 rounded-xl border border-white/10 bg-white/10 font-semibold text-xs flex items-center justify-center text-slate-300">
        ED
      </div>
    </div>
  );
}
