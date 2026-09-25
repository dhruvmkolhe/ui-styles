"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Mode } from "@/lib/styles/types";
import { retroY2k } from "./kit";
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
  const k = retroY2k(mode);
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <button className={k.btnPrimary}>✦ EXPLORE NOW ✦</button>
      <button className={k.btnSecondary}>
        xoxo
        <IconArrowRight className="h-4 w-4 stroke-[2.5]" />
      </button>
    </div>
  );
}

/* ============ 2 · Card ============ */
export function CardPreview({ mode }: { mode: Mode }) {
  const k = retroY2k(mode);
  return (
    <div className="flex justify-center">
      <div className={cn(k.panel, "w-full max-w-sm relative")}>
        <div className={cn("relative flex h-36 items-center justify-center rounded-xl overflow-hidden", k.imagePlaceholder)}>
          <IconImage className="h-8 w-8 stroke-[2.5]" />
          <span className={cn(k.badge, "absolute left-3 top-3 -rotate-3")}>★ POP STICKER ★</span>
        </div>
        <div className="mt-4 space-y-3">
          <h3 className={cn(k.serif, "text-xl font-black")}>Cyber Candy Mix</h3>
          <p className={cn("text-xs font-bold leading-relaxed", k.muted)}>
            Millennium boombox vibe, bubblegum gradients and pop star bursts.
          </p>
          <div className="flex items-center justify-between pt-2">
            <button className={k.btnPrimarySm}>GET KIT</button>
            <span className="font-black text-sm text-[#FF2E93]">2003.MP3</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ 3 · Navbar ============ */
export function NavbarPreview({ mode }: { mode: Mode }) {
  const k = retroY2k(mode);
  return (
    <div className={cn(k.bar, "flex items-center justify-between p-4")}>
      <span className="font-black text-base text-[#FF2E93] flex items-center gap-1">✦ STAR_HUB ✦</span>
      <nav className="hidden items-center gap-5 font-bold text-xs uppercase sm:flex">
        <a href="#" className="hover:text-[#FF2E93]">MUSIC</a>
        <a href="#" className="hover:text-[#FF2E93]">GLITTER</a>
        <a href="#" className="hover:text-[#FF2E93]">SKINS</a>
      </nav>
      <button className={k.btnPrimarySm}>GO!!</button>
    </div>
  );
}

/* ============ 4 · Input ============ */
export function InputPreview({ mode }: { mode: Mode }) {
  const k = retroY2k(mode);
  return (
    <div className="mx-auto w-full max-w-sm">
      <label className={k.label}>~* BLOGGER HANDLE *~</label>
      <input className={k.input} placeholder="pink_princess_99" />
    </div>
  );
}

/* ============ 5 · Badge ============ */
export function BadgePreview({ mode }: { mode: Mode }) {
  const k = retroY2k(mode);
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <span className={k.badge}>★ HOT ★</span>
      <span className={k.badgeSolid}>CYBER 2000</span>
    </div>
  );
}

/* ============ 6 · Modal ============ */
export function ModalPreview({ mode }: { mode: Mode }) {
  const k = retroY2k(mode);
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-center">
      <button onClick={() => setOpen(true)} className={k.btnPrimary}>
        ✦ OPEN SHUFFLE ✦
      </button>
      {open && (
        <div className={k.overlay}>
          <div className={cn(k.panel, "w-full max-w-md")}>
            <div className="flex items-center justify-between border-b-[3px] border-[#FF2E93] pb-3">
              <h3 className={cn(k.serif, "text-base font-black")}>✦ PLAYLIST CREATED ✦</h3>
              <button onClick={() => setOpen(false)} className={k.iconBtn}>
                <IconX className="h-4 w-4 stroke-[2.5]" />
              </button>
            </div>
            <p className={cn("mt-4 font-bold text-xs", k.muted)}>
              32 tracks added to your iPod Shuffle mix.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setOpen(false)} className={k.btnSecondary}>
                LATER
              </button>
              <button onClick={() => setOpen(false)} className={k.btnPrimarySm}>
                PLAY NOW
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
  const k = retroY2k(mode);
  const [open, setOpen] = useState(true);
  return (
    <div className="mx-auto w-full max-w-md space-y-3">
      <div className={cn(k.panelSoft, "p-4")}>
        <div
          onClick={() => setOpen(!open)}
          className="flex cursor-pointer items-center justify-between font-black text-xs uppercase"
        >
          <span>★ WHY Y2K DESIGN? ★</span>
          <IconChevronDown className={cn("h-4 w-4 stroke-[2.5] transition-transform", open && "rotate-180")} />
        </div>
        {open && (
          <p className={cn("mt-2.5 font-bold text-xs leading-relaxed", k.muted)}>
            Because chrome gradients and hot pink bubble text bring uninhibited optimism back to the web!
          </p>
        )}
      </div>
    </div>
  );
}

/* ============ 8 · Tooltip ============ */
export function TooltipPreview({ mode }: { mode: Mode }) {
  const k = retroY2k(mode);
  return (
    <div className="flex justify-center">
      <div className={k.tooltip}>✦ Totally Y2K ✦</div>
    </div>
  );
}

/* ============ 9 · Tabs ============ */
export function TabsPreview({ mode }: { mode: Mode }) {
  const k = retroY2k(mode);
  const [tab, setTab] = useState("TOP 100");
  return (
    <div className="flex justify-center">
      <div className={k.tabList}>
        {["TOP 100", "REMIXES", "GIFS"].map((t) => (
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
  const k = retroY2k(mode);
  return (
    <div className="flex justify-center">
      <div className={cn(k.menu, "w-48 p-2 space-y-1")}>
        <button className={k.menuItem}>
          <IconUser className="h-4 w-4 stroke-[2.5]" /> MY PROFILE
        </button>
        <button className={k.menuItem}>
          <IconGear className="h-4 w-4 stroke-[2.5]" /> SKIN THEMES
        </button>
        <button className={cn(k.menuItem, k.dangerText)}>
          <IconLogout className="h-4 w-4 stroke-[2.5]" /> EXIT Y2K
        </button>
      </div>
    </div>
  );
}

/* ============ 11 · Switch ============ */
export function SwitchPreview({ mode }: { mode: Mode }) {
  const k = retroY2k(mode);
  const [on, setOn] = useState(true);
  return (
    <div className="flex items-center justify-center gap-3">
      <div
        onClick={() => setOn(!on)}
        className={cn("relative h-7 w-14 cursor-pointer rounded-full transition-colors", on ? k.switchOn : k.switchOff)}
      >
        <div
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full border-2 border-[#2b0a3d] transition-all",
            on ? "left-7 bg-[#B6FF00]" : "left-1 bg-white"
          )}
        />
      </div>
      <span className="font-black text-xs uppercase">{on ? "POP!" : "OFF"}</span>
    </div>
  );
}

/* ============ 12 · Skeleton ============ */
export function SkeletonPreview({ mode }: { mode: Mode }) {
  const k = retroY2k(mode);
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
  const k = retroY2k(mode);
  return (
    <div className="mx-auto w-full max-w-sm">
      <div className={cn(k.successBg, "p-4 rounded-2xl flex items-center justify-between")}>
        <div className="flex items-center gap-2">
          <IconCheck className="h-4 w-4 stroke-[2.5]" />
          <span>★ SONG DOWNLOADED ★</span>
        </div>
        <IconX className="h-4 w-4 stroke-[2.5] cursor-pointer" />
      </div>
    </div>
  );
}

/* ============ 14 · Progress ============ */
export function ProgressPreview({ mode }: { mode: Mode }) {
  const k = retroY2k(mode);
  return (
    <div className="mx-auto w-full max-w-sm space-y-2">
      <div className="flex justify-between font-black text-xs uppercase">
        <span className="text-[#FF2E93]">BURNING CD...</span>
        <span className="text-[#00E5FF]">80%</span>
      </div>
      <div className={cn(k.track, "h-5 w-full rounded-full p-1 overflow-hidden")}>
        <div className={cn(k.fill, "h-full w-4/5 rounded-full")} />
      </div>
    </div>
  );
}

/* ============ 15 · Avatar ============ */
export function AvatarPreview() {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="h-11 w-11 rounded-full border-[3px] border-[#2b0a3d] bg-gradient-to-tr from-[#FF2E93] to-[#B6FF00] font-black text-xs flex items-center justify-center text-[#2b0a3d] shadow-[3px_3px_0_#FF2E93]">
        Y2K
      </div>
      <div className="h-11 w-11 rounded-full border-[3px] border-[#2b0a3d] bg-gradient-to-tr from-[#00E5FF] to-[#7C4DFF] font-black text-xs flex items-center justify-center text-white shadow-[3px_3px_0_#00E5FF]">
        ★ POP ★
      </div>
    </div>
  );
}
