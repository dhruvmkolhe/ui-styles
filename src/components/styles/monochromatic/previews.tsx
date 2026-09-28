"use client";

import React, { useState } from "react";
import type { Mode } from "@/lib/styles/types";
import { monochromatic } from "./kit";
import { ArrowRight, X } from "lucide-react";

export function ButtonPreview({ mode }: { mode: Mode }) {
  const k = monochromatic(mode);
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <button className={k.btnPrimary}>
        <span>ROYAL BLUE PRIMARY</span>
        <ArrowRight className="h-4 w-4" />
      </button>
      <button className={k.btnSecondary}>
        <span>TINT SECONDARY</span>
      </button>
    </div>
  );
}

export function CardPreview({ mode }: { mode: Mode }) {
  const k = monochromatic(mode);
  return (
    <div className={`${k.panel} w-full max-w-md space-y-4`}>
      <div className="flex items-center justify-between border-b border-[#BFDBFE] pb-3">
        <span className="text-xs font-semibold text-[#1E40AF]">SINGLE HUE SYSTEM</span>
        <span className={k.badge}>ROYAL BLUE</span>
      </div>
      <h3 className={`${k.heading} text-xl font-bold`}>Harmonious Shade Palette</h3>
      <p className={`${k.muted} text-sm leading-relaxed`}>
        Interface elements styled strictly through subtle variations in tint, tone, and shade of a single royal blue color.
      </p>
      <div className="pt-2 flex items-center justify-between border-t border-[#BFDBFE]">
        <span className="text-xs text-[#2563EB]">#2563EB Base</span>
        <button className={k.btnPrimarySm}>
          <span>DETAILS</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export function NavbarPreview({ mode }: { mode: Mode }) {
  const k = monochromatic(mode);
  return (
    <header className={`${k.bar} flex items-center justify-between px-6 py-4 w-full`}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs">
          MB
        </div>
        <a href="#" className="font-bold text-base text-[#1E40AF]">MonoBlue</a>
      </div>

      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#2563EB]">
        <a href="#" className="text-[#1E40AF] border-b-2 border-[#1E40AF] pb-1">Tints</a>
        <a href="#" className="hover:text-[#1E40AF]">Shades</a>
        <a href="#" className="hover:text-[#1E40AF]">Tones</a>
      </nav>

      <button className={k.btnPrimarySm}>CONNECT</button>
    </header>
  );
}

export function InputPreview({ mode }: { mode: Mode }) {
  const k = monochromatic(mode);
  return (
    <div className="w-full max-w-sm space-y-1">
      <label className={k.label}>BLUEPRINT IDENTIFIER</label>
      <input type="text" placeholder="BLUE-SHADE-900" className={k.input} />
      <p className="text-xs text-[#3B82F6]">Strictly blue spectrum values permitted</p>
    </div>
  );
}

export function BadgePreview({ mode }: { mode: Mode }) {
  const k = monochromatic(mode);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className={k.badge}>Light Blue Tint</span>
      <span className={k.badgeOutline}>Outlined Shade</span>
      <span className="inline-flex items-center px-3 py-0.5 text-xs font-medium bg-[#1E40AF] text-white rounded-full">
        Deep Royal
      </span>
    </div>
  );
}

export function ModalPreview({ mode }: { mode: Mode }) {
  const k = monochromatic(mode);
  return (
    <div className={`${k.panel} w-full max-w-md space-y-5`}>
      <div className="flex items-center justify-between border-b border-[#BFDBFE] pb-3">
        <h3 className={`${k.heading} text-lg font-bold`}>Apply Single-Hue Palette?</h3>
        <button className="text-[#2563EB] hover:text-[#1E40AF]"><X className="h-4 w-4" /></button>
      </div>
      <p className={`${k.muted} text-sm leading-relaxed`}>
        All UI surfaces, text tokens, and borders will be harmonized to royal blue color scales.
      </p>
      <div className="flex justify-end gap-3 pt-2">
        <button className={k.btnSecondary}>CANCEL</button>
        <button className={k.btnPrimary}>APPLY PALETTE</button>
      </div>
    </div>
  );
}

export function AccordionPreview({ mode }: { mode: Mode }) {
  const k = monochromatic(mode);
  const [open, setOpen] = useState(true);
  return (
    <div className={`${k.panel} w-full max-w-md divide-y divide-[#BFDBFE] p-0 overflow-hidden`}>
      <div className="p-4">
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left font-semibold text-sm text-[#1E40AF]">
          <span>Why use monochromatic UI?</span>
          <span className="font-bold">{open ? "-" : "+"}</span>
        </button>
        {open && (
          <p className={`mt-2 ${k.muted} text-xs leading-relaxed`}>
            Monochromatic designs create visual harmony, simplify component hierarchies, and reduce cognitive friction.
          </p>
        )}
      </div>
      <div className="p-4">
        <button className="w-full flex items-center justify-between text-left font-semibold text-sm text-[#2563EB]">
          <span>Contrast vs Value Scale</span>
          <span className="font-bold">+</span>
        </button>
      </div>
    </div>
  );
}

export function TooltipPreview() {
  return (
    <div className="relative inline-block">
      <div className="bg-[#1E40AF] text-white px-3 py-1 text-xs font-medium rounded-md shadow-sm">
        Color: #2563EB Royal Blue
      </div>
    </div>
  );
}

export function TabsPreview({ mode }: { mode: Mode }) {
  const k = monochromatic(mode);
  const [active, setActive] = useState(0);
  const tabs = ["01. SHADES", "02. TINTS", "03. TONES"];
  return (
    <div className="flex border-b border-[#BFDBFE] w-full max-w-md font-medium text-sm">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => setActive(i)}
          className={`px-5 py-2.5 ${
            active === i ? "border-b-2 border-[#1E40AF] text-[#1E40AF] font-bold" : `${k.muted} hover:text-[#1E40AF]`
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export function DropdownPreview({ mode }: { mode: Mode }) {
  const k = monochromatic(mode);
  return (
    <div className={`${k.panel} w-56 p-2 space-y-1 text-sm font-medium`}>
      <a href="#" className="block px-3.5 py-2 rounded-lg bg-[#DBEAFE] text-[#1E40AF]">Royal Blue #2563EB</a>
      <a href="#" className="block px-3.5 py-2 rounded-lg hover:bg-[#EFF6FF] text-[#2563EB] transition-colors">Sky Blue #60A5FA</a>
      <a href="#" className="block px-3.5 py-2 rounded-lg hover:bg-[#EFF6FF] text-[#2563EB] transition-colors">Midnight #1E293B</a>
    </div>
  );
}

export function SwitchPreview() {
  const [checked, setChecked] = useState(true);
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setChecked(!checked)}
        className="w-12 h-6 bg-[#2563EB] relative p-0.5 rounded-full flex items-center justify-end"
      >
        <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${checked ? '' : '-translate-x-5'}`}></div>
      </button>
      <span className="text-xs font-bold text-[#1E40AF]">SINGLE HUE: {checked ? 'ACTIVE' : 'OFF'}</span>
    </div>
  );
}

export function SkeletonPreview({ mode }: { mode: Mode }) {
  const k = monochromatic(mode);
  return (
    <div className={`${k.panel} w-full max-w-sm p-6 space-y-4`}>
      <div className="h-4 bg-[#2563EB]/20 animate-pulse rounded-md w-1/3"></div>
      <div className="h-8 bg-[#DBEAFE] animate-pulse rounded-md w-3/4"></div>
      <div className="space-y-2">
        <div className="h-3 bg-[#BFDBFE]/40 animate-pulse rounded-md w-full"></div>
        <div className="h-3 bg-[#BFDBFE]/40 animate-pulse rounded-md w-5/6"></div>
      </div>
    </div>
  );
}

export function ToastPreview({ mode }: { mode: Mode }) {
  const k = monochromatic(mode);
  return (
    <div className={`${k.panel} w-full max-w-sm p-4 border-l-4 border-l-[#2563EB] flex items-start gap-3`}>
      <span className="h-3 w-3 bg-[#2563EB] rounded-full mt-0.5 flex-shrink-0"></span>
      <div className="space-y-1">
        <p className="text-xs font-bold text-[#1E40AF]">PALETTE HARMONIZED</p>
        <p className={`${k.muted} text-xs`}>All components generated in single-hue royal blue.</p>
      </div>
    </div>
  );
}

export function ProgressPreview() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="flex justify-between text-xs font-bold text-[#1E40AF]">
        <span>BLUE SCALE FILL</span>
        <span className="text-[#2563EB]">85%</span>
      </div>
      <div className="h-2 w-full bg-[#DBEAFE] rounded-full overflow-hidden">
        <div className="h-full bg-[#2563EB] w-[85%] rounded-full"></div>
      </div>
    </div>
  );
}

export function AvatarPreview() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-[#2563EB] text-white rounded-lg flex items-center justify-center font-bold text-sm">
        MB
      </div>
      <div>
        <p className="font-bold text-xs text-[#1E40AF]">MONO BLUE</p>
        <p className="text-[10px] text-[#3B82F6]">ROYAL ACCENT #2563EB</p>
      </div>
    </div>
  );
}
