"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Mode } from "@/lib/styles/types";
import { neomorphism } from "./kit";
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
  const k = neomorphism(mode);
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <button className={k.btnPrimary}>Extruded Button</button>
      <button className={k.btnSecondary}>
        Soft Surface
        <IconArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

/* ============ 2 · Card ============ */
export function CardPreview({ mode }: { mode: Mode }) {
  const k = neomorphism(mode);
  return (
    <div className="flex justify-center">
      <div className={cn(k.panel, "w-full max-w-sm")}>
        <div className={cn("flex h-36 items-center justify-center rounded-xl", k.imagePlaceholder)}>
          <IconImage className="h-7 w-7 stroke-[1.8]" />
        </div>
        <div className="mt-5 space-y-2.5">
          <h3 className={cn(k.strong, "text-base font-semibold")}>Tactile Audio Hub</h3>
          <p className={cn("text-xs leading-relaxed", k.muted)}>
            Extruded elements molded directly from the background canvas with soft dual shadows.
          </p>
          <div className="flex items-center justify-between pt-3">
            <button className={k.btnPrimarySm}>Interact</button>
            <span className={cn(k.faint, "text-xs")}>v2.4</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ 3 · Navbar ============ */
export function NavbarPreview({ mode }: { mode: Mode }) {
  const k = neomorphism(mode);
  return (
    <div className={cn(k.bar, "flex items-center justify-between px-6 py-4")}>
      <span className="text-sm font-bold tracking-wide text-[#6d7df2]">SOFT.UI</span>
      <nav className={cn("hidden items-center gap-6 text-xs font-medium sm:flex", k.muted)}>
        <a href="#" className="hover:text-[#6d7df2]">Surfaces</a>
        <a href="#" className="hover:text-[#6d7df2]">Controls</a>
        <a href="#" className="hover:text-[#6d7df2]">Specs</a>
      </nav>
      <button className={k.btnPrimarySm}>Connect</button>
    </div>
  );
}

/* ============ 4 · Input ============ */
export function InputPreview({ mode }: { mode: Mode }) {
  const k = neomorphism(mode);
  return (
    <div className="mx-auto w-full max-w-sm">
      <label className={k.label}>PRESSED INPUT SURFACE</label>
      <input className={k.input} placeholder="Type message..." />
    </div>
  );
}

/* ============ 5 · Badge ============ */
export function BadgePreview({ mode }: { mode: Mode }) {
  const k = neomorphism(mode);
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <span className={k.badge}>Extruded</span>
      <span className={k.badgeSolid}>Active</span>
    </div>
  );
}

/* ============ 6 · Modal ============ */
export function ModalPreview({ mode }: { mode: Mode }) {
  const k = neomorphism(mode);
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-center">
      <button onClick={() => setOpen(true)} className={k.btnPrimary}>
        Open Soft Modal
      </button>
      {open && (
        <div className={k.overlay}>
          <div className={cn(k.panel, "w-full max-w-md")}>
            <div className="flex items-center justify-between border-b border-[#b8bec7]/40 pb-3">
              <h3 className={cn(k.strong, "text-sm font-semibold")}>Tactile Dialog</h3>
              <button onClick={() => setOpen(false)} className={k.iconBtn}>
                <IconX className="h-4 w-4" />
              </button>
            </div>
            <p className={cn("mt-4 text-xs leading-relaxed", k.muted)}>
              Adjust system volume curves and tactile feedback sensitivity across paired controllers.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setOpen(false)} className={k.btnSecondary}>
                Back
              </button>
              <button onClick={() => setOpen(false)} className={k.btnPrimarySm}>
                Save State
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
  const k = neomorphism(mode);
  const [open, setOpen] = useState(true);
  return (
    <div className="mx-auto w-full max-w-md space-y-3">
      <div className={cn(k.panel, "p-4")}>
        <div
          onClick={() => setOpen(!open)}
          className={cn("flex cursor-pointer items-center justify-between text-xs font-semibold", k.strong)}
        >
          <span>How does Neomorphism work?</span>
          <IconChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
        </div>
        {open && (
          <p className={cn("mt-2.5 text-xs leading-relaxed", k.muted)}>
            It uses light and dark drop shadows on a canvas of identical background color to create extruded surface depth.
          </p>
        )}
      </div>
    </div>
  );
}

/* ============ 8 · Tooltip ============ */
export function TooltipPreview({ mode }: { mode: Mode }) {
  const k = neomorphism(mode);
  return (
    <div className="flex justify-center">
      <div className={k.tooltip}>Soft Floating Tooltip</div>
    </div>
  );
}

/* ============ 9 · Tabs ============ */
export function TabsPreview({ mode }: { mode: Mode }) {
  const k = neomorphism(mode);
  const [tab, setTab] = useState("Sound");
  return (
    <div className="flex justify-center">
      <div className={k.tabList}>
        {["Sound", "Display", "Network"].map((t) => (
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
  const k = neomorphism(mode);
  return (
    <div className="flex justify-center">
      <div className={cn(k.menu, "w-48 p-2 space-y-1")}>
        <button className={k.menuItem}>
          <IconUser className="h-4 w-4" /> My Account
        </button>
        <button className={k.menuItem}>
          <IconGear className="h-4 w-4" /> Device Hub
        </button>
        <button className={cn(k.menuItem, k.dangerText)}>
          <IconLogout className="h-4 w-4" /> Disconnect
        </button>
      </div>
    </div>
  );
}

/* ============ 11 · Switch ============ */
export function SwitchPreview({ mode }: { mode: Mode }) {
  const k = neomorphism(mode);
  const [on, setOn] = useState(true);
  const d = mode === "dark";
  return (
    <div className="flex items-center justify-center gap-3">
      <div
        onClick={() => setOn(!on)}
        className={cn("relative h-7 w-14 cursor-pointer rounded-full transition-colors", on ? k.switchOn : k.switchOff)}
      >
        <div
          className={cn(
            "absolute top-1 h-5 w-5 rounded-full transition-all",
            d
              ? "shadow-[2px_2px_5px_#14171c,-2px_-2px_5px_#242930]"
              : "shadow-[2px_2px_5px_#b8bec7,-2px_-2px_5px_#ffffff]",
            on ? "left-7 bg-[#6d7df2]" : "left-1 bg-[#8a94a6]"
          )}
        />
      </div>
      <span className="text-xs font-medium">{on ? "Pressed" : "Raised"}</span>
    </div>
  );
}

/* ============ 12 · Skeleton ============ */
export function SkeletonPreview({ mode }: { mode: Mode }) {
  const k = neomorphism(mode);
  return (
    <div className="mx-auto w-full max-w-sm space-y-3">
      <div className={cn(k.skeleton, "h-7 w-3/4")} />
      <div className={cn(k.skeleton, "h-4 w-full")} />
      <div className={cn(k.skeleton, "h-4 w-2/3")} />
    </div>
  );
}

/* ============ 13 · Toast ============ */
export function ToastPreview({ mode }: { mode: Mode }) {
  const k = neomorphism(mode);
  return (
    <div className="mx-auto w-full max-w-sm">
      <div className={cn(k.successBg, "p-4 rounded-xl flex items-center justify-between")}>
        <div className="flex items-center gap-2.5 text-xs font-semibold">
          <IconCheck className="h-4 w-4" />
          <span>Preset saved into memory</span>
        </div>
        <IconX className="h-4 w-4 cursor-pointer" />
      </div>
    </div>
  );
}

/* ============ 14 · Progress ============ */
export function ProgressPreview({ mode }: { mode: Mode }) {
  const k = neomorphism(mode);
  return (
    <div className="mx-auto w-full max-w-sm space-y-2">
      <div className="flex justify-between text-xs font-semibold">
        <span className={k.faint}>Equalizing</span>
        <span className="text-[#6d7df2]">80%</span>
      </div>
      <div className={cn(k.track, "h-3 w-full rounded-full p-0.5 overflow-hidden")}>
        <div className={cn(k.fill, "h-full w-4/5 rounded-full")} />
      </div>
    </div>
  );
}

/* ============ 15 · Avatar ============ */
export function AvatarPreview({ mode }: { mode: Mode }) {
  const k = neomorphism(mode);
  return (
    <div className="flex items-center justify-center gap-4">
      <div className={cn(k.badge, "h-11 w-11 !rounded-full !px-0 flex items-center justify-center font-bold text-xs text-[#6d7df2]")}>
        SO
      </div>
      <div className={cn(k.badge, "h-11 w-11 !rounded-full !px-0 flex items-center justify-center font-bold text-xs text-emerald-500")}>
        UI
      </div>
    </div>
  );
}
