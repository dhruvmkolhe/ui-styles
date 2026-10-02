"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Mode } from "@/lib/styles/types";
import { brutalist } from "./kit";
import {
  IconArrowRight,
  IconCheckCircle,
  IconChevronDown,
  IconGear,
  IconImage,
  IconLogout,
  IconMenu,
  IconUser,
  IconX,
} from "../icons";

/* ============ 1 · Button ============ */
export function ButtonPreview({ mode }: { mode: Mode }) {
  const k = brutalist(mode);
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <button className={k.btnPrimary}>SMASH THIS BUTTON</button>
      <button className={k.btnSecondary}>
        LEARN MORE
        <IconArrowRight className="h-4 w-4 stroke-[3]" />
      </button>
    </div>
  );
}

/* ============ 2 · Card ============ */
export function CardPreview({ mode }: { mode: Mode }) {
  const k = brutalist(mode);
  return (
    <div className="flex justify-center">
      <div className={cn(k.panel, "w-full max-w-sm")}>
        <div className={cn("relative flex h-36 items-center justify-center font-mono font-black uppercase", k.imagePlaceholder)}>
          <IconImage className="h-8 w-8 stroke-[2.5]" />
          <span className={cn(k.badge, "absolute left-2 top-2")}>HOT DROP</span>
        </div>
        <div className="mt-4 space-y-3">
          <h3 className={cn(k.serif, "text-xl font-black")}>RAW ENGINE V2</h3>
          <p className={cn("font-mono text-xs leading-relaxed", k.muted)}>
            UNAPOLOGETIC PERFORMANCE WITH ZERO BLOAT AND HARD EDGES.
          </p>
          <div className="flex items-center justify-between pt-2">
            <button className={k.btnPrimarySm}>GET IT NOW</button>
            <span className="font-mono font-black text-sm">$99</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ 3 · Navbar ============ */
export function NavbarPreview({ mode }: { mode: Mode }) {
  const k = brutalist(mode);
  const [open, setOpen] = useState(false);
  return (
    <header className={cn(k.bar, "w-full flex flex-col justify-center p-3 sm:p-4 transition-all")}>
      <div className="flex items-center justify-between gap-3 w-full">
        <span className="font-mono font-black text-base sm:text-lg tracking-widest shrink-0">BRUTAL//UI</span>
        <nav className="hidden md:flex nav-desktop-links items-center gap-6 font-mono text-xs font-black">
          <a href="#" className="hover:underline">PROJECTS</a>
          <a href="#" className="hover:underline">MANIFESTO</a>
          <a href="#" className="hover:underline">SHOP</a>
        </nav>
        <div className="flex items-center gap-2 shrink-0">
          <button className={cn(k.btnPrimarySm, "shrink-0 px-3 py-1.5 text-xs")}>JOIN</button>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="md:hidden nav-mobile-toggle p-1.5 border-2 border-current hover:bg-[#FFE500] hover:text-black transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <IconX className="h-4 w-4 stroke-[3]" /> : <IconMenu className="h-4 w-4 stroke-[3]" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="pt-3 mt-3 border-t-2 border-current flex flex-col gap-2 font-mono text-xs font-black animate-in fade-in-0">
          <a href="#" className="py-1 hover:bg-[#FFE500] hover:text-black px-1">PROJECTS</a>
          <a href="#" className="py-1 hover:bg-[#FFE500] hover:text-black px-1">MANIFESTO</a>
          <a href="#" className="py-1 hover:bg-[#FFE500] hover:text-black px-1">SHOP</a>
        </nav>
      )}
    </header>
  );
}

/* ============ 4 · Input ============ */
export function InputPreview({ mode }: { mode: Mode }) {
  const k = brutalist(mode);
  return (
    <div className="mx-auto w-full max-w-sm">
      <label className={k.label} htmlFor="brutalist-handle">YOUR HANDLE</label>
      <input
        id="brutalist-handle"
        name="userHandle"
        aria-label="Your handle"
        autoComplete="off"
        suppressHydrationWarning
        className={k.input}
        placeholder="@CYBERPUNK"
      />
    </div>
  );
}

/* ============ 5 · Badge ============ */
export function BadgePreview({ mode }: { mode: Mode }) {
  const k = brutalist(mode);
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <span className={k.badge}>LIVE</span>
      <span className={k.badgeSolid}>WARNING</span>
    </div>
  );
}

/* ============ 6 · Modal ============ */
export function ModalPreview({ mode }: { mode: Mode }) {
  const k = brutalist(mode);
  const [open, setOpen] = useState(true);

  if (!open) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <button onClick={() => setOpen(true)} className={k.btnPrimary}>
          OPEN MODAL
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex w-full min-h-[380px] sm:min-h-[420px] items-center justify-center p-4 sm:p-6 my-2">
      <div
        className={cn(k.overlay, "rounded-none")}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        className={cn(k.panel, "relative z-20 w-full max-w-md shadow-2xl mx-auto")}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b-4 border-current pb-3">
          <h3 className={cn(k.serif, "text-lg font-black")}>CONFIRM ACTION</h3>
          <button onClick={() => setOpen(false)} className={k.iconBtn}>
            <IconX className="h-4 w-4 stroke-[3]" />
          </button>
        </div>
        <p className={cn("mt-4 font-mono text-xs", k.muted)}>
          ARE YOU SURE YOU WANT TO OVERWRITE THE SYSTEM LOGS?
        </p>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button onClick={() => setOpen(false)} className={k.btnSecondary}>
            CANCEL
          </button>
          <button onClick={() => setOpen(false)} className={k.btnPrimarySm}>
            EXECUTE
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============ 7 · Accordion ============ */
export function AccordionPreview({ mode }: { mode: Mode }) {
  const k = brutalist(mode);
  const [open, setOpen] = useState(true);
  return (
    <div className="mx-auto w-full max-w-md space-y-3">
      <div className={cn(k.panelSoft, "p-4")}>
        <div
          onClick={() => setOpen(!open)}
          className="flex cursor-pointer items-center justify-between font-mono font-black text-sm uppercase"
        >
          <span>WHAT IS BRUTALISM?</span>
          <IconChevronDown className={cn("h-4 w-4 stroke-[3] transition-transform", open && "rotate-180")} />
        </div>
        {open && (
          <p className={cn("mt-2 font-mono text-xs leading-relaxed", k.muted)}>
            RAW STRUCTURE, HIGH CONTRAST, BOLD TYPOGRAPHY AND ZERO DECORATION.
          </p>
        )}
      </div>
    </div>
  );
}

/* ============ 8 · Tooltip ============ */
export function TooltipPreview({ mode }: { mode: Mode }) {
  const k = brutalist(mode);
  return (
    <div className="flex justify-center">
      <div className={k.tooltip}>HARD SHADOW TOOLTIP</div>
    </div>
  );
}

/* ============ 9 · Tabs ============ */
export function TabsPreview({ mode }: { mode: Mode }) {
  const k = brutalist(mode);
  const [tab, setTab] = useState("ALL");
  return (
    <div className="flex justify-center">
      <div className={k.tabList}>
        {["ALL", "POPULAR", "NEW"].map((t) => (
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
  const k = brutalist(mode);
  return (
    <div className="flex justify-center">
      <div className={cn(k.menu, "w-48 p-2 space-y-1")}>
        <button className={k.menuItem}>
          <IconUser className="h-4 w-4 stroke-[2.5]" /> PROFILE
        </button>
        <button className={k.menuItem}>
          <IconGear className="h-4 w-4 stroke-[2.5]" /> SETTINGS
        </button>
        <button className={cn(k.menuItem, k.dangerText)}>
          <IconLogout className="h-4 w-4 stroke-[2.5]" /> LOGOUT
        </button>
      </div>
    </div>
  );
}

/* ============ 11 · Switch ============ */
export function SwitchPreview({ mode }: { mode: Mode }) {
  const k = brutalist(mode);
  const [on, setOn] = useState(true);
  return (
    <div className="flex items-center justify-center gap-3">
      <div
        onClick={() => setOn(!on)}
        className={cn("relative h-7 w-14 cursor-pointer transition-colors", on ? k.switchOn : k.switchOff)}
      >
        <div
          className={cn(
            "absolute top-0.5 h-5 w-5 bg-black border-2 border-white transition-all",
            on ? "left-[30px] bg-[#FFDE00]" : "left-1 bg-white"
          )}
        />
      </div>
      <span className="font-mono text-xs font-black uppercase">{on ? "ON" : "OFF"}</span>
    </div>
  );
}

/* ============ 12 · Skeleton ============ */
export function SkeletonPreview({ mode }: { mode: Mode }) {
  const k = brutalist(mode);
  return (
    <div className="mx-auto w-full max-w-sm space-y-3">
      <div className={cn(k.skeleton, "h-8 w-3/4")} />
      <div className={cn(k.skeleton, "h-4 w-full")} />
      <div className={cn(k.skeleton, "h-4 w-1/2")} />
    </div>
  );
}

/* ============ 13 · Toast ============ */
export function ToastPreview({ mode }: { mode: Mode }) {
  const k = brutalist(mode);
  return (
    <div className="mx-auto w-full max-w-sm space-y-3">
      <div className={cn(k.successBg, "p-4 flex items-center justify-between")}>
        <div className="flex items-center gap-2">
          <IconCheckCircle className="h-4 w-4 stroke-[3]" />
          <span>ACTION SUCCESSFUL</span>
        </div>
        <IconX className="h-4 w-4 stroke-[3] cursor-pointer" />
      </div>
    </div>
  );
}

/* ============ 14 · Progress ============ */
export function ProgressPreview({ mode }: { mode: Mode }) {
  const k = brutalist(mode);
  return (
    <div className="mx-auto w-full max-w-sm space-y-2">
      <div className="flex justify-between font-mono text-xs font-black uppercase">
        <span>LOADING...</span>
        <span>75%</span>
      </div>
      <div className={cn(k.track, "h-6 w-full p-1")}>
        <div className={cn(k.fill, "h-full w-3/4")} />
      </div>
    </div>
  );
}

/* ============ 15 · Avatar ============ */
export function AvatarPreview() {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="h-12 w-12 rounded-none border-4 border-black bg-[#FFDE00] font-mono font-black flex items-center justify-center text-lg text-black shadow-[3px_3px_0_#000]">
        BT
      </div>
      <div className="h-12 w-12 rounded-none border-4 border-black bg-[#FF3B30] font-mono font-black flex items-center justify-center text-lg text-white shadow-[3px_3px_0_#000]">
        RX
      </div>
    </div>
  );
}
