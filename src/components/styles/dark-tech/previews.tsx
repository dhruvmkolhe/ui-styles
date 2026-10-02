"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Mode } from "@/lib/styles/types";
import { darkTech } from "./kit";
import {
  IconArrowRight,
  IconCheck,
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
  const k = darkTech(mode);
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <button className={k.btnPrimary}>EXECUTE_RUN</button>
      <button className={k.btnSecondary}>
        SYS_DIAGNOSTIC
        <IconArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

/* ============ 2 · Card ============ */
export function CardPreview({ mode }: { mode: Mode }) {
  const k = darkTech(mode);
  return (
    <div className="flex justify-center">
      <div className={cn(k.panel, "w-full max-w-sm")}>
        <div className={cn("flex h-36 items-center justify-center font-mono", k.imagePlaceholder)}>
          <IconImage className="h-7 w-7 stroke-[1.8]" />
        </div>
        <div className="mt-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className={k.badge}>ONLINE</span>
            <span className="font-mono text-[10px] text-[#00FFFF]">0x8F92</span>
          </div>
          <h3 className={cn(k.strong, "text-sm font-bold uppercase")}>CYBER_NODE_01</h3>
          <p className={cn("font-mono text-xs leading-relaxed", k.muted)}>
            Phosphor green terminal telemetry with glowing grid lines and scanning markers.
          </p>
          <div className="flex items-center justify-between pt-2">
            <button className={k.btnPrimarySm}>CONNECT</button>
            <span className={cn(k.faint, "font-mono text-[10px]")}>PING 12ms</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ 3 · Navbar ============ */
export function NavbarPreview({ mode }: { mode: Mode }) {
  const k = darkTech(mode);
  const [open, setOpen] = useState(false);
  return (
    <header className={cn(k.bar, "w-full flex flex-col justify-center px-4 py-2.5 sm:px-5 sm:py-3 transition-all")}>
      <div className="flex items-center justify-between gap-3 w-full">
        <span className="font-mono font-bold text-xs sm:text-sm text-[#00FF41] shrink-0">root@hub:~$</span>
        <nav className="hidden md:flex nav-desktop-links items-center gap-6 font-mono text-xs uppercase">
          <a href="#" className="hover:text-[#00FFFF] transition-colors">/NET</a>
          <a href="#" className="hover:text-[#00FFFF] transition-colors">/CORE</a>
          <a href="#" className="hover:text-[#00FFFF] transition-colors">/LOGS</a>
        </nav>
        <div className="flex items-center gap-2 shrink-0">
          <button className={cn(k.btnPrimarySm, "shrink-0 px-2.5 py-1 text-xs")}>SYS.ONLINE</button>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="md:hidden nav-mobile-toggle p-1 border border-[#00FF41]/40 text-[#00FF41] hover:bg-[#00FF41]/10 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <IconX className="h-4 w-4" /> : <IconMenu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="pt-2.5 mt-2.5 border-t border-[#00FF41]/30 flex flex-col gap-2 font-mono text-xs uppercase text-[#00FF41] animate-in fade-in-0">
          <a href="#" className="py-1 hover:text-[#00FFFF] transition-colors">/NET</a>
          <a href="#" className="py-1 hover:text-[#00FFFF] transition-colors">/CORE</a>
          <a href="#" className="py-1 hover:text-[#00FFFF] transition-colors">/LOGS</a>
        </nav>
      )}
    </header>
  );
}

/* ============ 4 · Input ============ */
export function InputPreview({ mode }: { mode: Mode }) {
  const k = darkTech(mode);
  return (
    <div className="mx-auto w-full max-w-sm">
      <label className={k.label} htmlFor="dark-tech-cmd">PROMPT &gt; ENTRY_COMMAND</label>
      <input
        id="dark-tech-cmd"
        name="entryCommand"
        aria-label="Prompt entry command"
        autoComplete="off"
        suppressHydrationWarning
        className={k.input}
        placeholder="./launch_daemon --verbose"
      />
    </div>
  );
}

/* ============ 5 · Badge ============ */
export function BadgePreview({ mode }: { mode: Mode }) {
  const k = darkTech(mode);
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <span className={k.badge}>[SYSTEM_OK]</span>
      <span className={k.badgeSolid}>[CYBER_CORE]</span>
    </div>
  );
}

/* ============ 6 · Modal ============ */
export function ModalPreview({ mode }: { mode: Mode }) {
  const k = darkTech(mode);
  const [open, setOpen] = useState(true);

  if (!open) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <button onClick={() => setOpen(true)} className={k.btnPrimary}>
          INIT_MODAL
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
        <div className="flex items-center justify-between border-b border-[#00FF41]/30 pb-3">
          <h3 className={cn(k.strong, "text-sm font-bold")}>TERMINAL SESSION DETACHED</h3>
          <button onClick={() => setOpen(false)} className={k.iconBtn}>
            <IconX className="h-4 w-4" />
          </button>
        </div>
        <p className={cn("mt-4 font-mono text-xs leading-relaxed", k.muted)}>
          Worker thread task-14 detached cleanly. Reconnect using daemon handle.
        </p>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button onClick={() => setOpen(false)} className={k.btnSecondary}>
            ABORT
          </button>
          <button onClick={() => setOpen(false)} className={k.btnPrimarySm}>
            REATTACH
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============ 7 · Accordion ============ */
export function AccordionPreview({ mode }: { mode: Mode }) {
  const k = darkTech(mode);
  const [open, setOpen] = useState(true);
  return (
    <div className="mx-auto w-full max-w-md space-y-2">
      <div className={cn(k.panelSoft, "p-4")}>
        <div
          onClick={() => setOpen(!open)}
          className={cn("flex cursor-pointer items-center justify-between font-mono text-xs font-bold", k.strong)}
        >
          <span>&gt; inspect --protocol</span>
          <IconChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
        </div>
        {open && (
          <p className={cn("mt-2.5 font-mono text-xs leading-relaxed", k.muted)}>
            Terminal glowing matrix UI designed for cyber command centers and developer consoles.
          </p>
        )}
      </div>
    </div>
  );
}

/* ============ 8 · Tooltip ============ */
export function TooltipPreview({ mode }: { mode: Mode }) {
  const k = darkTech(mode);
  return (
    <div className="flex justify-center">
      <div className={k.tooltip}>[SYS_PROMPT: SHIFT+ENTER]</div>
    </div>
  );
}

/* ============ 9 · Tabs ============ */
export function TabsPreview({ mode }: { mode: Mode }) {
  const k = darkTech(mode);
  const [tab, setTab] = useState("PROD_01");
  return (
    <div className="flex justify-center">
      <div className={k.tabList}>
        {["PROD_01", "STAGING", "LOCAL"].map((t) => (
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
  const k = darkTech(mode);
  return (
    <div className="flex justify-center">
      <div className={cn(k.menu, "w-48 p-1.5 space-y-1")}>
        <button className={k.menuItem}>
          <IconUser className="h-4 w-4" /> SYS_ADMIN
        </button>
        <button className={k.menuItem}>
          <IconGear className="h-4 w-4" /> CONFIG_MAP
        </button>
        <button className={cn(k.menuItem, k.dangerText)}>
          <IconLogout className="h-4 w-4" /> KILL_PROCESS
        </button>
      </div>
    </div>
  );
}

/* ============ 11 · Switch ============ */
export function SwitchPreview({ mode }: { mode: Mode }) {
  const k = darkTech(mode);
  const [on, setOn] = useState(true);
  return (
    <div className="flex items-center justify-center gap-3 font-mono text-xs">
      <div
        onClick={() => setOn(!on)}
        className={cn("relative h-6 w-12 cursor-pointer rounded-sm transition-colors", on ? k.switchOn : k.switchOff)}
      >
        <div
          className={cn(
            "absolute top-0.5 h-4.5 w-4.5 rounded-xs transition-all",
            on ? "left-6 bg-[#00FF41] shadow-[0_0_8px_#00FF41]" : "left-1 bg-neutral-600"
          )}
        />
      </div>
      <span className={k.strong}>{on ? "1" : "0"}</span>
    </div>
  );
}

/* ============ 12 · Skeleton ============ */
export function SkeletonPreview({ mode }: { mode: Mode }) {
  const k = darkTech(mode);
  return (
    <div className="mx-auto w-full max-w-sm space-y-3">
      <div className={cn(k.skeleton, "h-7 w-3/4")} />
      <div className={cn(k.skeleton, "h-4 w-full")} />
      <div className={cn(k.skeleton, "h-4 w-1/2")} />
    </div>
  );
}

/* ============ 13 · Toast ============ */
export function ToastPreview({ mode }: { mode: Mode }) {
  const k = darkTech(mode);
  return (
    <div className="mx-auto w-full max-w-sm">
      <div className={cn(k.successBg, "p-3.5 rounded-sm flex items-center justify-between font-mono text-xs")}>
        <div className="flex items-center gap-2">
          <IconCheck className="h-4 w-4" />
          <span>DAEMON ONLINE (PID: 4092)</span>
        </div>
        <IconX className="h-4 w-4 cursor-pointer" />
      </div>
    </div>
  );
}

/* ============ 14 · Progress ============ */
export function ProgressPreview({ mode }: { mode: Mode }) {
  const k = darkTech(mode);
  return (
    <div className="mx-auto w-full max-w-sm space-y-2 font-mono text-xs">
      <div className="flex justify-between">
        <span className={k.faint}>[DOWNLOADING_KERNEL]</span>
        <span className="text-[#00FF41]">75%</span>
      </div>
      <div className={cn(k.track, "h-3 w-full p-0.5 overflow-hidden")}>
        <div className={cn(k.fill, "h-full w-3/4")} />
      </div>
    </div>
  );
}

/* ============ 15 · Avatar ============ */
export function AvatarPreview() {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="h-9 w-9 rounded-sm border border-[#00FF41] bg-black font-mono font-bold text-xs flex items-center justify-center text-[#00FF41] shadow-[0_0_10px_rgba(0,255,65,0.4)]">
        01
      </div>
      <div className="h-9 w-9 rounded-sm border border-[#00FFFF] bg-black font-mono font-bold text-xs flex items-center justify-center text-[#00FFFF] shadow-[0_0_10px_rgba(0,255,255,0.4)]">
        FF
      </div>
    </div>
  );
}
