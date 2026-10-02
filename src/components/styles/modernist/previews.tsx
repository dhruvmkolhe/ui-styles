"use client";

import React, { useState } from "react";
import type { Mode } from "@/lib/styles/types";
import { modernist } from "./kit";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";

export function ButtonPreview({ mode }: { mode: Mode }) {
  const k = modernist(mode);
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <button className={k.btnPrimary}>
        <span>TERRACOTTA CTA</span>
        <ArrowRight className="h-4 w-4" />
      </button>
      <button className={k.btnSecondary}>
        <span>OLIVE ACCENT</span>
      </button>
    </div>
  );
}

export function CardPreview({ mode }: { mode: Mode }) {
  const k = modernist(mode);
  return (
    <div className={`${k.panel} w-full max-w-md space-y-4`}>
      <div className="flex items-center justify-between border-b border-[#2B2B2B] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#C85A32] inline-block"></span>
          <span className="w-3 h-3 bg-[#556B2F] inline-block"></span>
          <span className="w-3 h-3 bg-[#DAA520] inline-block"></span>
        </div>
        <span className={k.badge}>MID-CENTURY</span>
      </div>
      <h3 className={`${k.heading} text-xl leading-none`}>EAMES STRUCTURAL SPEC</h3>
      <p className={`${k.muted} font-sans text-xs leading-relaxed uppercase`}>
        Mid-century modern aesthetic blending earthy terracotta, deep olive green, mustard yellow, and crisp structural borders.
      </p>
      <div className="pt-2 flex items-center justify-between border-t border-[#2B2B2B]">
        <span className="font-mono text-[10px] text-[#556B2F] font-bold">1950S ARCHITECTURE</span>
        <button className={k.btnPrimarySm}>
          <span>CATALOGUE</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export function NavbarPreview({ mode }: { mode: Mode }) {
  const k = modernist(mode);
  const [open, setOpen] = useState(false);
  return (
    <header className={`${k.bar} flex flex-col justify-center px-4 py-3 sm:px-6 sm:py-4 w-full transition-all`}>
      <div className="flex items-center justify-between gap-3 w-full">
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-4 h-4 bg-[#C85A32]"></div>
          <a href="#" className="font-bold text-xs sm:text-sm uppercase tracking-wider text-[#2B2B2B] dark:text-white">MODERNIST 1954</a>
        </div>

        <nav className="hidden md:flex nav-desktop-links items-center gap-6 sm:gap-8 font-mono text-xs uppercase tracking-widest font-bold">
          <a href="#" className="text-[#C85A32] underline underline-offset-4">01. FURNITURE</a>
          <a href="#" className={`${k.muted} hover:text-[#C85A32]`}>02. LIGHTING</a>
          <a href="#" className={`${k.muted} hover:text-[#C85A32]`}>03. LAYOUT</a>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button className={`${k.btnPrimarySm} text-xs px-2.5 py-1.5`}>CONTACT</button>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="md:hidden nav-mobile-toggle p-1.5 border border-[#C85A32]/40 text-[#C85A32] hover:bg-[#C85A32]/10 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="pt-3 mt-3 border-t border-[#C85A32]/20 flex flex-col gap-2 font-mono text-xs uppercase tracking-widest font-bold animate-in fade-in-0">
          <a href="#" className="py-1 text-[#C85A32]">01. FURNITURE</a>
          <a href="#" className={`py-1 ${k.muted} hover:text-[#C85A32]`}>02. LIGHTING</a>
          <a href="#" className={`py-1 ${k.muted} hover:text-[#C85A32]`}>03. LAYOUT</a>
        </nav>
      )}
    </header>
  );
}

export function InputPreview({ mode }: { mode: Mode }) {
  const k = modernist(mode);
  return (
    <div className="w-full max-w-sm space-y-1.5">
      <label className={k.label} htmlFor="modernist-drawing-id">01 // ARCHITECTURAL DRAWING ID</label>
      <input
        id="modernist-drawing-id"
        name="drawingId"
        aria-label="Architectural Drawing ID"
        type="text"
        autoComplete="off"
        suppressHydrationWarning
        placeholder="MOD-1954-TERRACOTTA"
        className={k.input}
      />
      <p className="font-mono text-[10px] text-[#556B2F] font-bold">MID-CENTURY SPECIFICATION FILE</p>
    </div>
  );
}

export function BadgePreview({ mode }: { mode: Mode }) {
  const k = modernist(mode);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className={k.badge}>TERRACOTTA</span>
      <span className={k.badgeOutline}>MUSTARD GOLD</span>
      <span className="inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-[#556B2F] text-white border border-[#2B2B2B]">
        OLIVE GREEN
      </span>
    </div>
  );
}

export function ModalPreview({ mode }: { mode: Mode }) {
  const k = modernist(mode);
  return (
    <div className={`${k.panel} w-full max-w-md space-y-5`}>
      <div className="flex items-center justify-between border-b border-[#2B2B2B] pb-3">
        <span className="font-mono text-xs font-bold text-[#C85A32]">BLUEPRINT REVISION № 54</span>
        <button className={`${k.muted} hover:text-[#C85A32]`}><X className="h-3.5 w-3.5" /></button>
      </div>
      <h3 className={`${k.heading} text-lg`}>UPDATE MID-CENTURY PALETTE?</h3>
      <p className={`${k.muted} font-sans text-xs leading-relaxed uppercase`}>
        Synchronize layout parameters to mid-century terracotta and olive color swatches.
      </p>
      <div className="flex justify-end gap-3 pt-2">
        <button className={k.btnSecondary}>DISCARD</button>
        <button className={k.btnPrimary}>APPLY SPEC</button>
      </div>
    </div>
  );
}

export function AccordionPreview({ mode }: { mode: Mode }) {
  const k = modernist(mode);
  const [open, setOpen] = useState(true);
  return (
    <div className={`${k.panel} w-full max-w-md divide-y divide-[#2B2B2B] p-0`}>
      <div className="p-4">
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left font-sans text-xs font-bold uppercase tracking-wider text-[#C85A32]">
          <span>01 // WHAT IS MID-CENTURY MODERNISM?</span>
          <span className="font-bold">{open ? "-" : "+"}</span>
        </button>
        {open && (
          <p className={`mt-3 ${k.muted} font-sans text-xs leading-relaxed uppercase`}>
            Post-WWII design movement emphasizing organic shapes, clean lines, and integration with nature.
          </p>
        )}
      </div>
      <div className="p-4">
        <button className={`w-full flex items-center justify-between text-left font-sans text-xs font-bold uppercase tracking-wider ${k.muted}`}>
          <span>02 // EARTHY COLOR PALETTES</span>
          <span className="font-bold">+</span>
        </button>
      </div>
    </div>
  );
}

export function TooltipPreview() {
  return (
    <div className="relative inline-block">
      <div className="bg-[#DAA520] text-[#2B2B2B] border border-[#2B2B2B] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest">
        PALETTE: TERRACOTTA-1954
      </div>
    </div>
  );
}

export function TabsPreview({ mode }: { mode: Mode }) {
  const k = modernist(mode);
  const [active, setActive] = useState(0);
  return (
    <div className="flex border-b border-[#2B2B2B] w-full max-w-md font-mono text-xs">
      <button
        onClick={() => setActive(0)}
        className={`px-5 py-2.5 font-bold tracking-wider border-r border-[#2B2B2B] ${
          active === 0 ? "bg-[#C85A32] text-white" : `${k.muted}`
        }`}
      >
        01. TERRA
      </button>
      <button
        onClick={() => setActive(1)}
        className={`px-5 py-2.5 font-bold tracking-wider border-r border-[#2B2B2B] ${
          active === 1 ? "bg-[#556B2F] text-white" : `${k.muted}`
        }`}
      >
        02. OLIVE
      </button>
      <button
        onClick={() => setActive(2)}
        className={`px-5 py-2.5 font-bold tracking-wider ${
          active === 2 ? "bg-[#DAA520] text-[#2B2B2B]" : `${k.muted}`
        }`}
      >
        03. MUSTARD
      </button>
    </div>
  );
}

export function DropdownPreview({ mode }: { mode: Mode }) {
  const k = modernist(mode);
  return (
    <div className={`${k.panel} w-56 p-0 divide-y divide-[#2B2B2B] font-mono text-xs uppercase tracking-wider`}>
      <div className="p-3 bg-[#C85A32] text-white font-bold flex justify-between items-center">
        <span>SELECT DESIGNER</span>
        <ChevronDown className="h-3.5 w-3.5" />
      </div>
      <a href="#" className="block p-3 text-[#2B2B2B] hover:bg-[#556B2F] hover:text-white transition-colors">CHARLES &amp; RAY EAMES</a>
      <a href="#" className="block p-3 text-[#2B2B2B] hover:bg-[#DAA520] hover:text-[#2B2B2B] transition-colors">EERO SAARINEN</a>
      <a href="#" className="block p-3 text-[#2B2B2B] hover:bg-[#C85A32] hover:text-white transition-colors">GEORGE NELSON</a>
    </div>
  );
}

export function SwitchPreview() {
  const [checked, setChecked] = useState(true);
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setChecked(!checked)}
        className="w-12 h-6 border border-[#2B2B2B] bg-[#F4F0EA] relative p-0.5 rounded-none flex items-center justify-start"
      >
        <div className={`w-5 h-4.5 bg-[#C85A32] rounded-none transition-transform ${checked ? 'translate-x-5.5' : ''}`}></div>
      </button>
      <span className="font-mono text-xs font-bold text-[#2B2B2B]">TERRACOTTA MODE: {checked ? 'ON' : 'OFF'}</span>
    </div>
  );
}

export function SkeletonPreview({ mode }: { mode: Mode }) {
  const k = modernist(mode);
  return (
    <div className={`${k.panel} w-full max-w-sm p-6 space-y-4`}>
      <div className="h-4 bg-[#C85A32] animate-pulse w-1/3"></div>
      <div className="h-8 bg-[#DAA520]/30 animate-pulse w-3/4 border border-[#2B2B2B]"></div>
      <div className="space-y-2">
        <div className="h-3 bg-[#556B2F]/20 animate-pulse w-full"></div>
        <div className="h-3 bg-[#556B2F]/20 animate-pulse w-5/6"></div>
      </div>
    </div>
  );
}

export function ToastPreview({ mode }: { mode: Mode }) {
  const k = modernist(mode);
  return (
    <div className={`${k.panel} w-full max-w-sm p-4 border-l-4 border-l-[#C85A32] flex items-start gap-3`}>
      <div className="w-3 h-3 bg-[#DAA520] border border-[#2B2B2B] mt-0.5 flex-shrink-0"></div>
      <div className="space-y-1">
        <p className="font-mono text-xs font-bold text-[#2B2B2B]">BLUEPRINT ARCHIVED</p>
        <p className={`${k.muted} font-sans text-xs uppercase`}>Mid-century specification successfully saved.</p>
      </div>
    </div>
  );
}

export function ProgressPreview() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="flex justify-between font-mono text-xs font-bold uppercase">
        <span className="text-[#2B2B2B]">FURNITURE ASSEMBLY</span>
        <span className="text-[#C85A32]">82%</span>
      </div>
      <div className="h-3 w-full border border-[#2B2B2B] bg-[#F4F0EA] p-0.5">
        <div className="h-full bg-[#C85A32] w-[82%]"></div>
      </div>
    </div>
  );
}

export function AvatarPreview() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-[#C85A32] text-white flex items-center justify-center font-mono font-bold text-sm border border-[#2B2B2B]">
        CE
      </div>
      <div>
        <p className="font-bold text-xs uppercase text-[#2B2B2B]">CHARLES EAMES</p>
        <p className="font-mono text-[10px] text-[#556B2F] uppercase font-bold">INDUSTRIAL DESIGNER</p>
      </div>
    </div>
  );
}
