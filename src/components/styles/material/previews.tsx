"use client";

import React, { useState } from "react";
import type { Mode } from "@/lib/styles/types";
import { material } from "./kit";
import { ArrowRight, X } from "lucide-react";

export function ButtonPreview({ mode }: { mode: Mode }) {
  const k = material(mode);
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <button className={k.btnPrimary}>
        <span>GET STARTED</span>
        <ArrowRight className="h-4 w-4" />
      </button>
      <button className={k.btnSecondary}>
        <span>LEARN MORE</span>
      </button>
    </div>
  );
}

export function CardPreview({ mode }: { mode: Mode }) {
  const k = material(mode);
  return (
    <div className={`${k.panel} w-full max-w-md space-y-4`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#6200EE]">MATERIAL DESIGN 3</span>
        <span className={k.badge}>ELEVATION 2</span>
      </div>
      <h3 className={`${k.heading} text-xl font-normal`}>Layered Surface Cards</h3>
      <p className={`${k.muted} text-sm leading-relaxed`}>
        Components built from elevated paper surfaces, rounded pill buttons, and subtle material ripples.
      </p>
      <div className="pt-2 flex items-center justify-between border-t border-neutral-100">
        <span className="text-xs text-neutral-500">Surface Tint</span>
        <button className={k.btnPrimarySm}>
          <span>EXPLORE</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export function NavbarPreview({ mode }: { mode: Mode }) {
  const k = material(mode);
  return (
    <header className={`${k.bar} flex items-center justify-between px-6 py-4 w-full`}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#6200EE] text-white flex items-center justify-center font-bold text-xs shadow-md">
          M
        </div>
        <a href="#" className="font-medium text-lg text-[#121212]">Material Hub</a>
      </div>

      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
        <a href="#" className="text-[#6200EE] border-b-2 border-[#6200EE] pb-1">Surfaces</a>
        <a href="#" className="hover:text-[#6200EE]">Components</a>
        <a href="#" className="hover:text-[#6200EE]">Tokens</a>
      </nav>

      <button className={k.btnPrimarySm}>SIGN IN</button>
    </header>
  );
}

export function InputPreview({ mode }: { mode: Mode }) {
  const k = material(mode);
  return (
    <div className="w-full max-w-sm space-y-1">
      <label className={k.label}>EMAIL ADDRESS</label>
      <input type="email" placeholder="user@material.io" className={k.input} />
      <p className="text-xs text-neutral-500">Enter your official Material Design account</p>
    </div>
  );
}

export function BadgePreview({ mode }: { mode: Mode }) {
  const k = material(mode);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className={k.badge}>Primary Chip</span>
      <span className={k.badgeOutline}>Filter Tag</span>
      <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-[#03DAC6] text-[#121212] rounded-full shadow-sm">
        Secondary Teal
      </span>
    </div>
  );
}

export function ModalPreview({ mode }: { mode: Mode }) {
  const k = material(mode);
  return (
    <div className={`${k.panel} w-full max-w-md space-y-5`}>
      <div className="flex items-center justify-between">
        <h3 className={`${k.heading} text-lg font-normal`}>Discard unsaved changes?</h3>
        <button className="text-neutral-400 hover:text-neutral-700"><X className="h-4 w-4" /></button>
      </div>
      <p className={`${k.muted} text-sm leading-relaxed`}>
        This action will delete your current draft. You cannot undo this operation.
      </p>
      <div className="flex justify-end gap-3 pt-2">
        <button className={k.btnSecondary}>CANCEL</button>
        <button className={k.btnPrimary}>DISCARD</button>
      </div>
    </div>
  );
}

export function AccordionPreview({ mode }: { mode: Mode }) {
  const k = material(mode);
  const [open, setOpen] = useState(true);
  return (
    <div className={`${k.panel} w-full max-w-md divide-y divide-neutral-100 p-0 overflow-hidden`}>
      <div className="p-5">
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left font-medium text-sm text-[#6200EE]">
          <span>What is Material Design?</span>
          <span className="font-bold">{open ? "▲" : "▼"}</span>
        </button>
        {open && (
          <p className={`mt-3 ${k.muted} text-xs leading-relaxed`}>
            A design system developed by Google that uses grid-based layouts, responsive animations, and depth effects.
          </p>
        )}
      </div>
      <div className="p-5">
        <button className="w-full flex items-center justify-between text-left font-medium text-sm text-neutral-700">
          <span>Elevation and Shadows</span>
          <span className="font-bold">▼</span>
        </button>
      </div>
    </div>
  );
}

export function TooltipPreview() {
  return (
    <div className="relative inline-block">
      <div className="bg-[#323232] text-white px-3 py-1.5 text-xs font-medium rounded-md shadow-md">
        Tooltip helper text
      </div>
    </div>
  );
}

export function TabsPreview({ mode }: { mode: Mode }) {
  const k = material(mode);
  const [active, setActive] = useState(0);
  const tabs = ["TAB ONE", "TAB TWO", "TAB THREE"];
  return (
    <div className="flex border-b border-neutral-200 w-full max-w-md font-medium text-sm">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => setActive(i)}
          className={`px-6 py-3 ${
            active === i ? "border-b-2 border-[#6200EE] text-[#6200EE]" : `${k.muted} hover:text-[#6200EE]`
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export function DropdownPreview({ mode }: { mode: Mode }) {
  const k = material(mode);
  return (
    <div className={`${k.panel} w-56 p-2 space-y-1 text-sm font-medium`}>
      <a href="#" className="block px-4 py-2.5 rounded-lg hover:bg-[#6200EE]/10 text-[#6200EE] transition-colors">Profile Options</a>
      <a href="#" className="block px-4 py-2.5 rounded-lg hover:bg-neutral-100 text-neutral-700 transition-colors">Account Settings</a>
      <a href="#" className="block px-4 py-2.5 rounded-lg hover:bg-neutral-100 text-neutral-700 transition-colors">Sign Out</a>
    </div>
  );
}

export function SwitchPreview() {
  const [checked, setChecked] = useState(true);
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setChecked(!checked)}
        className="w-12 h-7 bg-[#6200EE] relative p-1 rounded-full shadow-inner flex items-center justify-end"
      >
        <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${checked ? '' : '-translate-x-5'}`}></div>
      </button>
      <span className="text-sm font-medium text-[#121212]">Material Theme: {checked ? 'Enabled' : 'Disabled'}</span>
    </div>
  );
}

export function SkeletonPreview({ mode }: { mode: Mode }) {
  const k = material(mode);
  return (
    <div className={`${k.panel} w-full max-w-sm p-6 space-y-4`}>
      <div className="h-5 bg-[#6200EE]/20 animate-pulse rounded-full w-1/3"></div>
      <div className="h-8 bg-neutral-200 animate-pulse rounded-lg w-3/4"></div>
      <div className="space-y-2">
        <div className="h-3.5 bg-neutral-150 animate-pulse rounded-full w-full"></div>
        <div className="h-3.5 bg-neutral-150 animate-pulse rounded-full w-5/6"></div>
      </div>
    </div>
  );
}

export function ToastPreview() {
  return (
    <div className="bg-[#323232] text-white w-full max-w-sm p-4 rounded-lg shadow-lg flex items-center justify-between">
      <span className="text-xs font-medium">Message sent to inbox</span>
      <button className="text-[#03DAC6] font-bold text-xs hover:underline">UNDO</button>
    </div>
  );
}

export function ProgressPreview() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="flex justify-between text-xs font-medium text-[#6200EE]">
        <span>Downloading update</span>
        <span>70%</span>
      </div>
      <div className="h-1.5 w-full bg-[#6200EE]/20 rounded-full overflow-hidden">
        <div className="h-full bg-[#6200EE] w-[70%] rounded-full"></div>
      </div>
    </div>
  );
}

export function AvatarPreview() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-[#6200EE] text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
        MD
      </div>
      <div>
        <p className="font-medium text-sm text-[#121212]">Material Designer</p>
        <p className="text-xs text-neutral-500">Google Design Team</p>
      </div>
    </div>
  );
}
