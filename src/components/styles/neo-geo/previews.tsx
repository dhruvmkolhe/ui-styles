"use client";

import React, { useState } from "react";
import type { Mode } from "@/lib/styles/types";
import { neoGeo } from "./kit";
import { ArrowRight, X, ChevronDown } from "lucide-react";

export function ButtonPreview({ mode }: { mode: Mode }) {
  const k = neoGeo(mode);
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <button className={k.btnPrimary}>
        <span>ELECTRIC PURPLE</span>
        <ArrowRight className="h-4 w-4" />
      </button>
      <button className={k.btnSecondary}>
        <span>YELLOW BLOCK</span>
      </button>
    </div>
  );
}

export function CardPreview({ mode }: { mode: Mode }) {
  const k = neoGeo(mode);
  return (
    <div className={`${k.panel} w-full max-w-md space-y-4`}>
      <div className={`flex items-center justify-between border-b-2 ${mode === 'dark' ? 'border-[#00F0FF]' : 'border-[#8A2BE2]'} pb-3`}>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#8A2BE2] inline-block"></span>
          <span className="w-3 h-3 bg-[#00F0FF] inline-block"></span>
          <span className="w-3 h-3 bg-[#FFD700] inline-block"></span>
        </div>
        <span className={k.badge}>NEO-GEO</span>
      </div>
      <h3 className={`${k.heading} text-2xl leading-none`}>POST-MODERN GEOMETRY</h3>
      <p className={`${k.muted} font-mono text-xs leading-relaxed uppercase`}>
        Electric purple, neon cyan, lemon yellow, and coral pink juxtaposed inside sharp offset containers.
      </p>
      <div className="pt-2 flex items-center justify-between">
        <span className="font-mono text-[10px] text-[#FFD700] font-bold">GRID MULTI-COLOR</span>
        <button className={k.btnPrimarySm}>
          <span>EXPLORE</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export function NavbarPreview({ mode }: { mode: Mode }) {
  const k = neoGeo(mode);
  return (
    <header className={`${k.bar} flex items-center justify-between px-6 py-4 w-full`}>
      <div className="flex items-center gap-3">
        <div className="w-4 h-4 bg-[#FFD700] border border-black rotate-45"></div>
        <a href="#" className="font-black text-sm uppercase tracking-wider text-[#00F0FF]">NEO_GEO_</a>
      </div>

      <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest font-black">
        <a href="#" className="text-[#FFD700] underline decoration-2 underline-offset-4">01. BLOCKS</a>
        <a href="#" className={`${k.muted} hover:text-[#00F0FF]`}>02. ANGLES</a>
        <a href="#" className={`${k.muted} hover:text-[#00F0FF]`}>03. COLOR</a>
      </nav>

      <button className={k.btnPrimarySm}>ENTER MATRIX</button>
    </header>
  );
}

export function InputPreview({ mode }: { mode: Mode }) {
  const k = neoGeo(mode);
  return (
    <div className="w-full max-w-sm space-y-1.5">
      <label className={k.label}>01 // INPUT GEOMETRIC CODE</label>
      <input type="text" placeholder="GEO-PURPLE-800" className={k.input} />
      <p className="font-mono text-[10px] text-[#FF6B6B] font-bold">ELECTRIC COLOR OVERLAY</p>
    </div>
  );
}

export function BadgePreview({ mode }: { mode: Mode }) {
  const k = neoGeo(mode);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className={k.badge}>CORAL PINK</span>
      <span className={k.badgeOutline}>NEON CYAN</span>
      <span className="inline-flex items-center px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest bg-[#FFD700] text-[#140029] border border-black">
        LEMON YELLOW
      </span>
    </div>
  );
}

export function ModalPreview({ mode }: { mode: Mode }) {
  const k = neoGeo(mode);
  return (
    <div className={`${k.panel} w-full max-w-md space-y-5`}>
      <div className={`flex items-center justify-between border-b-2 ${mode === 'dark' ? 'border-[#00F0FF]' : 'border-[#8A2BE2]'} pb-3`}>
        <span className="font-mono text-xs font-bold text-[#FFD700]">POST-MODERN ALERT #07</span>
        <button className={`${k.muted} hover:text-[#FF6B6B]`}><X className="h-3.5 w-3.5" /></button>
      </div>
      <h3 className={`${k.heading} text-xl`}>INITIALIZE GEOMETRIC SWAP?</h3>
      <p className={`${k.muted} font-mono text-xs leading-relaxed uppercase`}>
        All layout containers will be reconfigured into asymmetric electric color blocks.
      </p>
      <div className="flex justify-end gap-3 pt-2">
        <button className={k.btnSecondary}>CANCEL</button>
        <button className={k.btnPrimary}>CONFIRM SWAP</button>
      </div>
    </div>
  );
}

export function AccordionPreview({ mode }: { mode: Mode }) {
  const k = neoGeo(mode);
  const [open, setOpen] = useState(true);
  return (
    <div className={`${k.panel} w-full max-w-md divide-y-2 ${mode === 'dark' ? 'divide-[#00F0FF]' : 'divide-[#8A2BE2]'} p-0`}>
      <div className="p-4">
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left font-mono text-xs font-black uppercase tracking-wider text-[#FFD700]">
          <span>01 // WHAT IS NEO-GEO ART?</span>
          <span className="font-black">{open ? "-" : "+"}</span>
        </button>
        {open && (
          <p className={`mt-3 ${k.muted} font-mono text-xs leading-relaxed uppercase`}>
            Short for Neo-Geometric Conceptualism, an 80s art movement focused on geometric abstraction and commercial pop color.
          </p>
        )}
      </div>
      <div className="p-4">
        <button className={`w-full flex items-center justify-between text-left font-mono text-xs font-black uppercase tracking-wider ${k.muted}`}>
          <span>02 // POP COLOR JUXTAPOSITION</span>
          <span className="font-black">+</span>
        </button>
      </div>
    </div>
  );
}

export function TooltipPreview() {
  return (
    <div className="relative inline-block">
      <div className="bg-[#FFD700] text-[#140029] border-2 border-black px-3 py-1 font-mono text-[10px] font-black uppercase tracking-widest shadow-[2px_2px_0_#8A2BE2]">
        BLOCK: PURPLE-CYAN-1986
      </div>
    </div>
  );
}

export function TabsPreview({ mode }: { mode: Mode }) {
  const k = neoGeo(mode);
  const [active, setActive] = useState(0);
  return (
    <div className={`flex border-b-2 ${mode === 'dark' ? 'border-[#00F0FF]' : 'border-[#8A2BE2]'} w-full max-w-md font-mono text-xs`}>
      <button
        onClick={() => setActive(0)}
        className={`px-5 py-2.5 font-black tracking-wider border-r-2 border-black ${
          active === 0 ? "bg-[#8A2BE2] text-white" : `${k.muted}`
        }`}
      >
        01. PURPLE
      </button>
      <button
        onClick={() => setActive(1)}
        className={`px-5 py-2.5 font-black tracking-wider border-r-2 border-black ${
          active === 1 ? "bg-[#00F0FF] text-[#140029]" : `${k.muted}`
        }`}
      >
        02. CYAN
      </button>
      <button
        onClick={() => setActive(2)}
        className={`px-5 py-2.5 font-black tracking-wider ${
          active === 2 ? "bg-[#FFD700] text-[#140029]" : `${k.muted}`
        }`}
      >
        03. YELLOW
      </button>
    </div>
  );
}

export function DropdownPreview({ mode }: { mode: Mode }) {
  const k = neoGeo(mode);
  return (
    <div className={`${k.panel} w-56 p-0 divide-y-2 ${mode === 'dark' ? 'divide-[#00F0FF]' : 'divide-[#8A2BE2]'} font-mono text-xs uppercase tracking-wider`}>
      <div className="p-3 bg-[#8A2BE2] text-white font-black flex justify-between items-center">
        <span>SELECT MATRIX</span>
        <ChevronDown className="h-3.5 w-3.5" />
      </div>
      <a href="#" className="block p-3 text-[#00F0FF] hover:bg-[#00F0FF] hover:text-[#140029] transition-colors">ELECTRIC PURPLE</a>
      <a href="#" className="block p-3 text-[#FFD700] hover:bg-[#FFD700] hover:text-[#140029] transition-colors">LEMON YELLOW</a>
      <a href="#" className="block p-3 text-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-white transition-colors">CORAL PINK</a>
    </div>
  );
}

export function SwitchPreview() {
  const [checked, setChecked] = useState(true);
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setChecked(!checked)}
        className="w-12 h-6 border-2 border-black bg-[#00F0FF] relative p-0.5 rounded-none shadow-[2px_2px_0_#FFD700] flex items-center justify-start"
      >
        <div className={`w-5 h-4.5 bg-[#8A2BE2] rounded-none transition-transform ${checked ? 'translate-x-5.5' : ''}`}></div>
      </button>
      <span className="font-mono text-xs font-black text-[#FFD700] tracking-widest">ELECTRIC GRID: {checked ? 'ACTIVE' : 'OFF'}</span>
    </div>
  );
}

export function SkeletonPreview({ mode }: { mode: Mode }) {
  const k = neoGeo(mode);
  return (
    <div className={`${k.panel} w-full max-w-sm p-6 space-y-4`}>
      <div className="h-4 bg-[#8A2BE2] animate-pulse w-1/3"></div>
      <div className="h-8 bg-[#00F0FF] animate-pulse w-3/4 border-2 border-black"></div>
      <div className="space-y-2">
        <div className="h-3 bg-[#FFD700]/40 animate-pulse w-full"></div>
        <div className="h-3 bg-[#FFD700]/40 animate-pulse w-5/6"></div>
      </div>
    </div>
  );
}

export function ToastPreview({ mode }: { mode: Mode }) {
  const k = neoGeo(mode);
  return (
    <div className={`${k.panel} w-full max-w-sm p-4 border-l-8 border-l-[#8A2BE2] flex items-start gap-3`}>
      <div className="w-3 h-3 bg-[#FFD700] border border-black mt-0.5 flex-shrink-0"></div>
      <div className="space-y-1">
        <p className="font-mono text-xs font-black text-[#00F0FF]">GEOMETRY SYNCHRONIZED</p>
        <p className={`${k.muted} font-mono text-xs uppercase`}>Post-modern palette loaded to grid.</p>
      </div>
    </div>
  );
}

export function ProgressPreview() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="flex justify-between font-mono text-xs font-black uppercase">
        <span className="text-[#00F0FF]">MATRIX LOADING</span>
        <span className="text-[#FFD700]">92%</span>
      </div>
      <div className="h-4 w-full border-2 border-black bg-[#140029] p-0.5 shadow-[2px_2px_0_#00F0FF]">
        <div className="h-full bg-gradient-to-r from-[#8A2BE2] via-[#00F0FF] to-[#FFD700] w-[92%]"></div>
      </div>
    </div>
  );
}

export function AvatarPreview() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-[#8A2BE2] text-[#FFD700] border-2 border-[#00F0FF] flex items-center justify-center font-mono font-black text-sm shadow-[2px_2px_0_#FF6B6B]">
        NG
      </div>
      <div>
        <p className="font-black text-xs uppercase text-[#00F0FF]">PETER HALLEY</p>
        <p className="font-mono text-[10px] text-[#FFD700] uppercase font-bold">NEO-GEO ARTIST</p>
      </div>
    </div>
  );
}
