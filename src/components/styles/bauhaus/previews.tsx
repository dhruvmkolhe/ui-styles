"use client";

import React, { useState } from "react";
import type { Mode } from "@/lib/styles/types";
import { bauhaus } from "./kit";
import { ArrowRight, X, ChevronDown } from "lucide-react";

export function ButtonPreview({ mode }: { mode: Mode }) {
  const k = bauhaus(mode);
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <button className={k.btnPrimary}>
        <span>FORM FOLLOWS FUNCTION</span>
        <ArrowRight className="h-4 w-4" />
      </button>
      <button className={k.btnSecondary}>
        <span>GEOMETRIC SPEC</span>
      </button>
    </div>
  );
}

export function CardPreview({ mode }: { mode: Mode }) {
  const k = bauhaus(mode);
  return (
    <div className={`${k.panel} w-full max-w-md space-y-4`}>
      <div className={`flex items-center justify-between border-b-2 ${mode === 'dark' ? 'border-[#F1FAEE]' : 'border-[#1D3557]'} pb-3`}>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#E63946] inline-block"></span>
          <span className="h-3 w-3 bg-[#FFD60A] inline-block"></span>
          <span className="h-3 w-3 bg-[#1D3557] inline-block"></span>
        </div>
        <span className={k.badge}>WEIMAR 1919</span>
      </div>
      <h3 className={`${k.heading} text-2xl leading-none`}>THE DESSAU MANIFESTO</h3>
      <p className={`${k.muted} font-sans text-xs leading-relaxed uppercase`}>
        A radical unification of art, craft, and technology. Universal principles of geometric proportion and primary color balance.
      </p>
      <div className="pt-2 flex items-center justify-between">
        <span className="font-mono text-[10px] text-[#E63946] font-bold">CIRC / TRI / SQ</span>
        <button className={k.btnPrimarySm}>
          <span>EXHIBIT</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export function NavbarPreview({ mode }: { mode: Mode }) {
  const k = bauhaus(mode);
  return (
    <header className={`${k.bar} flex items-center justify-between px-6 py-4 w-full`}>
      <div className="flex items-center gap-3">
        <div className="w-4 h-4 rounded-full bg-[#E63946]"></div>
        <a href="#" className="font-black text-sm uppercase tracking-tighter text-[#1D3557]">BAUHAUS 1919</a>
      </div>

      <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest font-bold">
        <a href="#" className="text-[#E63946] underline decoration-2 underline-offset-4">01. ART</a>
        <a href="#" className={`${k.muted} hover:text-[#E63946]`}>02. CRAFT</a>
        <a href="#" className={`${k.muted} hover:text-[#E63946]`}>03. TECH</a>
      </nav>

      <button className={k.btnPrimarySm}>JOIN ARCHIVE</button>
    </header>
  );
}

export function InputPreview({ mode }: { mode: Mode }) {
  const k = bauhaus(mode);
  return (
    <div className="w-full max-w-sm space-y-1.5">
      <label className={k.label}>01 // REGISTER STUDENT DISCIPLINE</label>
      <input type="text" placeholder="ARCHITECTURE & DESIGN" className={k.input} />
      <p className="font-mono text-[10px] text-[#E63946] font-bold">PRIMARY COLOR CODING ENFORCED</p>
    </div>
  );
}

export function BadgePreview({ mode }: { mode: Mode }) {
  const k = bauhaus(mode);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className={k.badge}>PRIMARY RED</span>
      <span className={k.badgeOutline}>YELLOW CIRCLE</span>
      <span className="inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-[#1D3557] text-white border border-black">
        BLUE TRIANGLE
      </span>
    </div>
  );
}

export function ModalPreview({ mode }: { mode: Mode }) {
  const k = bauhaus(mode);
  return (
    <div className={`${k.panel} w-full max-w-md space-y-5`}>
      <div className={`flex items-center justify-between border-b-2 ${mode === 'dark' ? 'border-[#F1FAEE]' : 'border-[#1D3557]'} pb-3`}>
        <span className="font-mono text-xs font-bold text-[#E63946]">EXHIBITION PROPOSAL #04</span>
        <button className={`${k.muted} hover:text-[#E63946]`}><X className="h-3.5 w-3.5" /></button>
      </div>
      <h3 className={`${k.heading} text-xl`}>RESET ALL DECORATIVE ELEMENTS?</h3>
      <p className={`${k.muted} font-sans text-xs leading-relaxed uppercase`}>
        Eliminate unnecessary ornamentation. All components will revert to raw primary colors and geometric primitives.
      </p>
      <div className="flex justify-end gap-3 pt-2">
        <button className={k.btnSecondary}>CANCEL</button>
        <button className={k.btnPrimary}>CONFIRM RESET</button>
      </div>
    </div>
  );
}

export function AccordionPreview({ mode }: { mode: Mode }) {
  const k = bauhaus(mode);
  const [open, setOpen] = useState(true);
  return (
    <div className={`${k.panel} w-full max-w-md divide-y-2 ${mode === 'dark' ? 'divide-[#F1FAEE]' : 'divide-[#1D3557]'} p-0`}>
      <div className="p-4">
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left font-sans text-xs font-bold uppercase tracking-wider text-[#E63946]">
          <span>01 // WHAT IS THE BAUHAUS MOVEMENT?</span>
          <span className="font-black">{open ? "-" : "+"}</span>
        </button>
        {open && (
          <p className={`mt-3 ${k.muted} font-sans text-xs leading-relaxed uppercase`}>
            Founded in Weimar in 1919 by Walter Gropius, combining fine arts with functional craft design.
          </p>
        )}
      </div>
      <div className="p-4">
        <button className={`w-full flex items-center justify-between text-left font-sans text-xs font-bold uppercase tracking-wider ${k.muted}`}>
          <span>02 // THE THREE PRIMARY SHAPES</span>
          <span className="font-black">+</span>
        </button>
      </div>
    </div>
  );
}

export function TooltipPreview() {
  return (
    <div className="relative inline-block">
      <div className="bg-[#FFD60A] text-[#1D3557] border-2 border-[#1D3557] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest">
        SHAPE: CIRCLE-RED-1919
      </div>
    </div>
  );
}

export function TabsPreview({ mode }: { mode: Mode }) {
  const k = bauhaus(mode);
  const [active, setActive] = useState(0);
  return (
    <div className={`flex border-b-2 ${mode === 'dark' ? 'border-[#F1FAEE]' : 'border-[#1D3557]'} w-full max-w-md font-mono text-xs`}>
      <button
        onClick={() => setActive(0)}
        className={`px-5 py-2.5 font-bold tracking-wider border-r-2 border-[#1D3557] ${
          active === 0 ? "bg-[#E63946] text-white" : `${k.muted}`
        }`}
      >
        01. RED
      </button>
      <button
        onClick={() => setActive(1)}
        className={`px-5 py-2.5 font-bold tracking-wider border-r-2 border-[#1D3557] ${
          active === 1 ? "bg-[#FFD60A] text-[#1D3557]" : `${k.muted}`
        }`}
      >
        02. YELLOW
      </button>
      <button
        onClick={() => setActive(2)}
        className={`px-5 py-2.5 font-bold tracking-wider ${
          active === 2 ? "bg-[#1D3557] text-white" : `${k.muted}`
        }`}
      >
        03. BLUE
      </button>
    </div>
  );
}

export function DropdownPreview({ mode }: { mode: Mode }) {
  const k = bauhaus(mode);
  return (
    <div className={`${k.panel} w-56 p-0 divide-y-2 ${mode === 'dark' ? 'divide-[#F1FAEE]' : 'divide-[#1D3557]'} font-mono text-xs uppercase tracking-wider`}>
      <div className="p-3 bg-[#1D3557] text-white font-bold flex justify-between items-center">
        <span>SELECT MASTERS</span>
        <ChevronDown className="h-3.5 w-3.5" />
      </div>
      <a href="#" className="block p-3 hover:bg-[#E63946] hover:text-white transition-colors">WALTER GROPIUS</a>
      <a href="#" className="block p-3 hover:bg-[#FFD60A] hover:text-[#1D3557] transition-colors">WASSILY KANDINSKY</a>
      <a href="#" className="block p-3 hover:bg-[#1D3557] hover:text-white transition-colors">PAUL KLEE</a>
    </div>
  );
}

export function SwitchPreview() {
  const [checked, setChecked] = useState(true);
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setChecked(!checked)}
        className="w-12 h-6 border-2 border-[#1D3557] bg-white relative p-0.5 rounded-none flex items-center justify-start"
      >
        <div className={`w-5 h-4 bg-[#E63946] rounded-none transition-transform ${checked ? 'translate-x-5.5' : ''}`}></div>
      </button>
      <span className="font-mono text-xs font-bold text-[#1D3557]">GEOMETRIC GRID: {checked ? 'ACTIVE' : 'OFF'}</span>
    </div>
  );
}

export function SkeletonPreview({ mode }: { mode: Mode }) {
  const k = bauhaus(mode);
  return (
    <div className={`${k.panel} w-full max-w-sm p-6 space-y-4`}>
      <div className="h-4 bg-[#E63946] animate-pulse w-1/3"></div>
      <div className="h-8 bg-[#FFD60A] animate-pulse w-3/4 border-2 border-[#1D3557]"></div>
      <div className="space-y-2">
        <div className="h-3 bg-[#1D3557]/20 animate-pulse w-full"></div>
        <div className="h-3 bg-[#1D3557]/20 animate-pulse w-5/6"></div>
      </div>
    </div>
  );
}

export function ToastPreview({ mode }: { mode: Mode }) {
  const k = bauhaus(mode);
  return (
    <div className={`${k.panel} w-full max-w-sm p-4 border-l-8 border-l-[#E63946] flex items-start gap-3`}>
      <div className="w-3 h-3 rounded-full bg-[#FFD60A] border border-[#1D3557] mt-0.5 flex-shrink-0"></div>
      <div className="space-y-1">
        <p className="font-mono text-xs font-bold text-[#1D3557]">SPECIFICATION DEPLOYED</p>
        <p className={`${k.muted} font-sans text-xs uppercase`}>Primary color geometry synchronized to canvas.</p>
      </div>
    </div>
  );
}

export function ProgressPreview() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="flex justify-between font-mono text-xs font-bold uppercase">
        <span className="text-[#1D3557]">CRAFT CONSTRUCTION</span>
        <span className="text-[#E63946]">80%</span>
      </div>
      <div className="h-4 w-full border-2 border-[#1D3557] bg-white p-0.5">
        <div className="h-full bg-[#E63946] w-4/5"></div>
      </div>
    </div>
  );
}

export function AvatarPreview() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-[#E63946] text-white rounded-full flex items-center justify-center font-mono font-bold text-sm border-2 border-[#1D3557]">
        WG
      </div>
      <div>
        <p className="font-bold text-xs uppercase text-[#1D3557]">WALTER GROPIUS</p>
        <p className="font-mono text-[10px] text-[#E63946] uppercase font-bold">FOUNDER / ARCHITECT</p>
      </div>
    </div>
  );
}
