"use client";

import React, { useState } from "react";
import type { Mode } from "@/lib/styles/types";
import { swiss } from "./kit";
import { ArrowRight, X, ChevronDown } from "lucide-react";

export function ButtonPreview({ mode }: { mode: Mode }) {
  const k = swiss(mode);
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <button className={k.btnPrimary}>
        <span>01 // INITIALIZE GRID</span>
        <ArrowRight className="h-4 w-4" />
      </button>
      <button className={k.btnSecondary}>
        <span>EXPORT SPEC</span>
      </button>
    </div>
  );
}

export function CardPreview({ mode }: { mode: Mode }) {
  const k = swiss(mode);
  return (
    <div className={`${k.panel} w-full max-w-sm p-6 space-y-4`}>
      <div className={`flex items-center justify-between border-b ${mode === 'dark' ? 'border-neutral-800' : 'border-neutral-900'} pb-3`}>
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E30613]">SEC-04 / EXHIBIT</span>
        <span className={k.badgeOutline}>ZÜRICH 1957</span>
      </div>
      <h3 className="text-xl font-black uppercase tracking-tighter leading-none">NEUE GRAFIK</h3>
      <p className={`${k.muted} text-xs leading-relaxed font-sans`}>
        Objective typography, asymmetric grid systems, and rational design principles for clarity.
      </p>
      <div className="pt-2 flex items-center justify-between">
        <button className={k.btnPrimarySm}>
          <span>READ ARCHIVE</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
        <span className="font-mono text-[10px] text-neutral-400">VOL. 12</span>
      </div>
    </div>
  );
}

export function NavbarPreview({ mode }: { mode: Mode }) {
  const k = swiss(mode);
  return (
    <header className={`${k.bar} flex items-center justify-between px-6 py-4 w-full`}>
      <div className="flex items-center gap-3">
        <span className="h-3 w-3 bg-[#E30613] inline-block"></span>
        <a href="#" className="font-black text-sm uppercase tracking-tighter">HELVETICA ARCHIVE</a>
      </div>

      <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest">
        <a href="#" className={`${k.text} hover:text-[#E30613] transition-colors`}>01. PRINCIPLES</a>
        <a href="#" className={`${k.muted} hover:text-[#E30613] transition-colors`}>02. GRID</a>
        <a href="#" className={`${k.muted} hover:text-[#E30613] transition-colors`}>03. POSTERS</a>
      </nav>

      <button className={k.btnPrimarySm}>CONTACT</button>
    </header>
  );
}

export function InputPreview({ mode }: { mode: Mode }) {
  const k = swiss(mode);
  return (
    <div className="w-full max-w-sm space-y-1.5">
      <label className={k.label}>01. REGISTRATION EMAIL</label>
      <input type="email" placeholder="ARCHIVE@DESIGN.CH" className={k.input} />
      <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">REQUIRES VALID INSTITUTIONAL DOMAIN</p>
    </div>
  );
}

export function BadgePreview({ mode }: { mode: Mode }) {
  const k = swiss(mode);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className={k.badge}>SWISS RED</span>
      <span className={k.badgeOutline}>GRID ALIGNED</span>
      <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase bg-neutral-900 text-white rounded-none">
        HELVETICA 65
      </span>
    </div>
  );
}

export function ModalPreview({ mode }: { mode: Mode }) {
  const k = swiss(mode);
  return (
    <div className={`${k.panel} w-full max-w-md p-6 space-y-5`}>
      <div className={`flex items-center justify-between border-b ${mode === 'dark' ? 'border-neutral-800' : 'border-neutral-900'} pb-3`}>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 bg-[#E30613]"></span>
          <span className="text-xs font-mono font-bold uppercase tracking-widest">SYS // WARNING 004</span>
        </div>
        <button className={`${k.muted} hover:text-[#E30613]`}><X className="h-3.5 w-3.5" /></button>
      </div>
      <h3 className="text-lg font-black uppercase tracking-tighter">CONFIRM GRID OVERWRITE?</h3>
      <p className={`${k.muted} text-xs leading-relaxed font-sans`}>
        This action will reset all layout parameters to the standardized 12-column Swiss grid system.
      </p>
      <div className="flex justify-end gap-3 pt-2">
        <button className={k.btnSecondary}>CANCEL</button>
        <button className={k.btnPrimary}>CONFIRM OVERWRITE</button>
      </div>
    </div>
  );
}

export function AccordionPreview({ mode }: { mode: Mode }) {
  const k = swiss(mode);
  const [open, setOpen] = useState(true);
  return (
    <div className={`${k.panel} w-full max-w-md divide-y ${mode === 'dark' ? 'divide-neutral-800' : 'divide-neutral-900'}`}>
      <div className="p-4">
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left font-mono text-xs font-bold uppercase tracking-wider">
          <span>01 // WHAT IS SWISS DESIGN?</span>
          <span className="text-[#E30613] font-bold">{open ? "-" : "+"}</span>
        </button>
        {open && (
          <p className={`mt-3 ${k.muted} text-xs leading-relaxed font-sans`}>
            Developed in Switzerland in the 1950s, emphasizing cleanliness, readability, and objectivity.
          </p>
        )}
      </div>
      <div className="p-4">
        <button className={`w-full flex items-center justify-between text-left font-mono text-xs font-bold uppercase tracking-wider ${k.muted}`}>
          <span>02 // KEY CHARACTERISTICS</span>
          <span className="font-bold">+</span>
        </button>
      </div>
    </div>
  );
}

export function TooltipPreview() {
  return (
    <div className="relative inline-block">
      <div className="bg-[#E30613] text-white px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest rounded-none shadow-none">
        SPEC-GRID: 12-COL
      </div>
    </div>
  );
}

export function TabsPreview({ mode }: { mode: Mode }) {
  const k = swiss(mode);
  const [active, setActive] = useState(0);
  const tabs = ["01. OVERVIEW", "02. STRUCTURE", "03. ARCHIVE"];
  return (
    <div className={`flex border-b ${mode === 'dark' ? 'border-neutral-800' : 'border-neutral-900'} w-full max-w-md`}>
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => setActive(i)}
          className={`px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-widest rounded-none ${
            active === i ? "bg-[#E30613] text-white" : `${k.muted} hover:text-foreground`
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export function DropdownPreview({ mode }: { mode: Mode }) {
  const k = swiss(mode);
  return (
    <div className={`${k.panel} w-56 p-0 divide-y ${mode === 'dark' ? 'divide-neutral-800' : 'divide-neutral-900'} font-mono text-xs uppercase tracking-wider`}>
      <div className="p-3 bg-[#E30613] text-white font-bold flex justify-between items-center">
        <span>SELECT TYPEFACE</span>
        <ChevronDown className="h-3.5 w-3.5" />
      </div>
      <a href="#" className="block p-3 hover:bg-neutral-800 hover:text-white transition-colors">HELVETICA BOLD</a>
      <a href="#" className="block p-3 hover:bg-neutral-800 hover:text-white transition-colors">UNIVERS 57</a>
      <a href="#" className="block p-3 hover:bg-neutral-800 hover:text-white transition-colors">AKZIDENZ GROTESK</a>
    </div>
  );
}

export function SwitchPreview({ mode }: { mode: Mode }) {
  const [checked, setChecked] = useState(true);
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setChecked(!checked)}
        className={`w-12 h-6 border ${mode === 'dark' ? 'border-neutral-700 bg-neutral-900' : 'border-neutral-900 bg-white'} relative p-0.5 rounded-none flex items-center ${checked ? 'justify-end' : 'justify-start'}`}
      >
        <div className="w-5 h-4.5 bg-[#E30613] rounded-none"></div>
      </button>
      <span className="font-mono text-xs font-bold uppercase tracking-widest">GRID ALIGNMENT: {checked ? 'ON' : 'OFF'}</span>
    </div>
  );
}

export function SkeletonPreview({ mode }: { mode: Mode }) {
  const k = swiss(mode);
  return (
    <div className={`${k.panel} w-full max-w-sm p-6 space-y-4`}>
      <div className="h-4 bg-[#E30613] animate-pulse w-1/3 rounded-none"></div>
      <div className={`h-8 ${mode === 'dark' ? 'bg-neutral-800' : 'bg-neutral-200'} animate-pulse w-3/4 rounded-none`}></div>
      <div className="space-y-2">
        <div className={`h-3 ${mode === 'dark' ? 'bg-neutral-800' : 'bg-neutral-200'} animate-pulse w-full rounded-none`}></div>
        <div className={`h-3 ${mode === 'dark' ? 'bg-neutral-800' : 'bg-neutral-200'} animate-pulse w-5/6 rounded-none`}></div>
      </div>
    </div>
  );
}

export function ToastPreview({ mode }: { mode: Mode }) {
  const k = swiss(mode);
  return (
    <div className={`${k.panel} w-full max-w-sm p-4 border-l-4 border-l-[#E30613] flex items-start gap-3`}>
      <span className="h-3 w-3 bg-[#E30613] mt-0.5 flex-shrink-0"></span>
      <div className="space-y-1">
        <p className="font-mono text-xs font-bold uppercase tracking-widest">SYSTEM ALERT // 200 OK</p>
        <p className={`${k.muted} text-xs font-sans`}>Layout specifications successfully deployed to master grid.</p>
      </div>
    </div>
  );
}

export function ProgressPreview({ mode }: { mode: Mode }) {
  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="flex justify-between font-mono text-[10px] uppercase font-bold tracking-widest">
        <span>SYSTEM LOADING</span>
        <span className="text-[#E30613]">75%</span>
      </div>
      <div className={`h-3 w-full border ${mode === 'dark' ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-900 bg-neutral-100'} p-0.5 rounded-none`}>
        <div className="h-full bg-[#E30613] w-3/4 rounded-none"></div>
      </div>
    </div>
  );
}

export function AvatarPreview() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-[#E30613] text-white flex items-center justify-center font-mono font-black text-sm rounded-none border border-neutral-900">
        CH
      </div>
      <div>
        <p className="font-bold text-xs uppercase tracking-tight">MAX MIEDINGER</p>
        <p className="font-mono text-[10px] text-neutral-500 uppercase">TYPOGRAPHER / ZÜRICH</p>
      </div>
    </div>
  );
}
