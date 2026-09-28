"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Mode } from "@/lib/styles/types";
import { neobrutalist } from "./kit";
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

export function ButtonPreview({ mode }: { mode: Mode }) {
  const k = neobrutalist(mode);
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <button className={k.btnPrimary}>YELLOW ACCENT CTA</button>
      <button className={k.btnSecondary}>
        HARD SHADOW
        <IconArrowRight className="h-4 w-4 stroke-[3]" />
      </button>
    </div>
  );
}

export function CardPreview({ mode }: { mode: Mode }) {
  const k = neobrutalist(mode);
  return (
    <div className="flex justify-center">
      <div className={cn(k.panel, "w-full max-w-sm")}>
        <div className={cn("relative flex h-36 items-center justify-center font-mono font-black uppercase", k.imagePlaceholder)}>
          <IconImage className="h-8 w-8 stroke-[3]" />
          <span className={cn(k.badge, "absolute left-2 top-2")}>NEO VIBE</span>
        </div>
        <div className="mt-4 space-y-3">
          <h3 className={cn(k.serif, "text-xl font-black")}>NEO-BRUTAL V2</h3>
          <p className={cn("font-mono text-xs leading-relaxed", k.muted)}>
            BORDER-4 BLACK, #FFE500 YELLOW FILLS AND UNAPOLOGETIC CONTRAST.
          </p>
          <div className="flex items-center justify-between pt-2">
            <button className={k.btnPrimarySm}>GET CODE</button>
            <span className="font-mono font-black text-sm">$49</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NavbarPreview({ mode }: { mode: Mode }) {
  const k = neobrutalist(mode);
  return (
    <div className={cn(k.bar, "flex items-center justify-between p-4")}>
      <span className="font-mono font-black text-lg tracking-widest text-[#FFE500]">NEO//HUB</span>
      <nav className="hidden items-center gap-4 font-mono text-xs font-black sm:flex">
        <a href="#" className="hover:underline">TOKENS</a>
        <a href="#" className="hover:underline">COMPONENTS</a>
        <a href="#" className="hover:underline">MANIFESTO</a>
      </nav>
      <button className={k.btnPrimarySm}>ACTION</button>
    </div>
  );
}

export function InputPreview({ mode }: { mode: Mode }) {
  const k = neobrutalist(mode);
  return (
    <div className="mx-auto w-full max-w-sm">
      <label className={k.label}>YOUR EMAIL</label>
      <input className={k.input} placeholder="user@domain.com" />
    </div>
  );
}

export function BadgePreview({ mode }: { mode: Mode }) {
  const k = neobrutalist(mode);
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <span className={k.badge}>NEO-TAG</span>
      <span className={k.badgeSolid}>ORANGE POP</span>
    </div>
  );
}

export function ModalPreview({ mode }: { mode: Mode }) {
  const k = neobrutalist(mode);
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-center">
      <button onClick={() => setOpen(true)} className={k.btnPrimary}>
        OPEN MODAL
      </button>
      {open && (
        <div className={k.overlay}>
          <div className={cn(k.panel, "w-full max-w-md")}>
            <div className="flex items-center justify-between border-b-4 border-black pb-3">
              <h3 className={cn(k.serif, "text-lg font-black")}>CONFIRM ACTION</h3>
              <button onClick={() => setOpen(false)} className={k.iconBtn}>
                <IconX className="h-4 w-4 stroke-[3]" />
              </button>
            </div>
            <p className={cn("mt-4 font-mono text-xs", k.muted)}>
              ARE YOU SURE YOU WANT TO DEPLOY THIS BOLD UI?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setOpen(false)} className={k.btnSecondary}>
                CANCEL
              </button>
              <button onClick={() => setOpen(false)} className={k.btnPrimarySm}>
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function AccordionPreview({ mode }: { mode: Mode }) {
  const k = neobrutalist(mode);
  const [open, setOpen] = useState(true);
  return (
    <div className="mx-auto w-full max-w-md space-y-3">
      <div className={cn(k.panelSoft)}>
        <div
          onClick={() => setOpen(!open)}
          className="flex cursor-pointer items-center justify-between font-mono font-black text-sm uppercase"
        >
          <span>WHAT IS NEOBRUTALISM?</span>
          <IconChevronDown className={cn("h-4 w-4 stroke-[3] transition-transform", open && "rotate-180")} />
        </div>
        {open && (
          <p className={cn("mt-2 font-mono text-xs leading-relaxed", k.muted)}>
            BOLD BLACK BORDERS, VIBRANT FILLS &amp; HARD SHADOWS.
          </p>
        )}
      </div>
    </div>
  );
}

export function TooltipPreview({ mode }: { mode: Mode }) {
  const k = neobrutalist(mode);
  return (
    <div className="flex justify-center">
      <div className={k.tooltip}>NEOBRUTAL TOOLTIP</div>
    </div>
  );
}

export function TabsPreview({ mode }: { mode: Mode }) {
  const k = neobrutalist(mode);
  const [tab, setTab] = useState("ACTIVE");
  return (
    <div className="flex justify-center">
      <div className={k.tabList}>
        {["ACTIVE", "INACTIVE", "ARCHIVE"].map((t) => (
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

export function DropdownPreview({ mode }: { mode: Mode }) {
  const k = neobrutalist(mode);
  return (
    <div className="flex justify-center">
      <div className={cn(k.menu, "w-48 p-2 space-y-1")}>
        <button className={k.menuItem}>
          <IconUser className="h-4 w-4 stroke-[3]" /> PROFILE
        </button>
        <button className={k.menuItem}>
          <IconGear className="h-4 w-4 stroke-[3]" /> SETTINGS
        </button>
        <button className={cn(k.menuItem, k.dangerText)}>
          <IconLogout className="h-4 w-4 stroke-[3]" /> LOGOUT
        </button>
      </div>
    </div>
  );
}

export function SwitchPreview({ mode }: { mode: Mode }) {
  const k = neobrutalist(mode);
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
            on ? "left-7 bg-[#FF5C00]" : "left-1 bg-white"
          )}
        />
      </div>
      <span className="font-mono text-xs font-black uppercase">{on ? "ON" : "OFF"}</span>
    </div>
  );
}

export function SkeletonPreview({ mode }: { mode: Mode }) {
  const k = neobrutalist(mode);
  return (
    <div className="mx-auto w-full max-w-sm space-y-3">
      <div className={cn(k.skeleton, "h-8 w-3/4")} />
      <div className={cn(k.skeleton, "h-4 w-full")} />
      <div className={cn(k.skeleton, "h-4 w-1/2")} />
    </div>
  );
}

export function ToastPreview({ mode }: { mode: Mode }) {
  const k = neobrutalist(mode);
  return (
    <div className="mx-auto w-full max-w-sm">
      <div className={cn(k.successBg, "p-4 flex items-center justify-between")}>
        <div className="flex items-center gap-2">
          <IconCheck className="h-4 w-4 stroke-[3]" />
          <span>ACTION SUCCESSFUL</span>
        </div>
        <IconX className="h-4 w-4 stroke-[3] cursor-pointer" />
      </div>
    </div>
  );
}

export function ProgressPreview({ mode }: { mode: Mode }) {
  const k = neobrutalist(mode);
  return (
    <div className="mx-auto w-full max-w-sm space-y-2">
      <div className="flex justify-between font-mono text-xs font-black uppercase">
        <span>LOADING NEO...</span>
        <span>75%</span>
      </div>
      <div className={cn(k.track, "h-6 w-full p-1")}>
        <div className={cn(k.fill, "h-full w-3/4")} />
      </div>
    </div>
  );
}

export function AvatarPreview() {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="h-12 w-12 rounded-none border-4 border-black bg-[#FFE500] font-mono font-black flex items-center justify-center text-lg text-black shadow-[3px_3px_0_#000]">
        NB
      </div>
    </div>
  );
}
