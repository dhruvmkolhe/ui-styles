"use client";

import React, { useState } from "react";
import type { Mode } from "@/lib/styles/types";
import { editorial } from "./kit";
import { ArrowRight, X } from "lucide-react";

export function ButtonPreview({ mode }: { mode: Mode }) {
  const k = editorial(mode);
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <button className={k.btnPrimary}>
        <span>Read Full Essay</span>
        <ArrowRight className="h-4 w-4" />
      </button>
      <button className={k.btnSecondary}>
        <span>Subscribe to Edition</span>
      </button>
    </div>
  );
}

export function CardPreview({ mode }: { mode: Mode }) {
  const k = editorial(mode);
  return (
    <div className={`${k.panel} w-full max-w-md space-y-4`}>
      <div className={`flex items-center justify-between border-b ${mode === 'dark' ? 'border-[#44403C]' : 'border-[#D6D3D1]'} pb-2`}>
        <span className="font-mono text-xs text-[#78716C]">ISSUE № 42 — ESSAY</span>
        <span className={k.badge}>12 MIN READ</span>
      </div>
      <h3 className="font-serif text-2xl leading-tight">The Architecture of Silence</h3>
      <p className={`${k.muted} font-serif text-sm leading-relaxed italic`}>
        “In an age of relentless notification, quietude becomes the ultimate subversive aesthetic.”
      </p>
      <div className={`pt-2 flex items-center justify-between border-t ${mode === 'dark' ? 'border-[#44403C]' : 'border-[#D6D3D1]'}`}>
        <span className="font-serif text-xs text-[#78716C]">By Julian Vance</span>
        <button className={k.btnPrimarySm}>
          <span>Continue</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export function NavbarPreview({ mode }: { mode: Mode }) {
  const k = editorial(mode);
  return (
    <header className={`${k.bar} px-6 py-5 w-full`}>
      <div className={`flex items-center justify-between border-b ${mode === 'dark' ? 'border-[#44403C]' : 'border-[#D6D3D1]'} pb-4`}>
        <span className="font-mono text-xs uppercase tracking-widest text-[#78716C]">EST. 1924</span>
        <a href="#" className="font-serif text-2xl font-bold tracking-tight">THE CHRONICLE</a>
        <span className="font-mono text-xs uppercase tracking-widest text-[#78716C]">VOL. IV</span>
      </div>
      <nav className="flex items-center justify-center gap-8 pt-3 font-serif text-xs uppercase tracking-widest">
        <a href="#" className={`${k.text} underline underline-offset-4`}>Essays</a>
        <a href="#" className={`${k.muted} hover:text-foreground`}>Criticism</a>
        <a href="#" className={`${k.muted} hover:text-foreground`}>Dispatch</a>
        <a href="#" className={`${k.muted} hover:text-foreground`}>Archive</a>
      </nav>
    </header>
  );
}

export function InputPreview({ mode }: { mode: Mode }) {
  const k = editorial(mode);
  return (
    <div className="w-full max-w-sm space-y-2">
      <label className={k.label}>SUBSCRIBE TO THE WEEKLY DISPATCH</label>
      <input type="email" placeholder="reader@journal.org" className={k.input} suppressHydrationWarning />
      <p className="font-serif italic text-xs text-[#78716C]">Delivered every Sunday dawn. No spam.</p>
    </div>
  );
}

export function BadgePreview({ mode }: { mode: Mode }) {
  const k = editorial(mode);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className={k.badge}>Editor&apos;s Choice</span>
      <span className={k.badgeOutline}>Volume 04</span>
      <span className="font-serif text-xs italic underline text-[#78716C]">Longform</span>
    </div>
  );
}

export function ModalPreview({ mode }: { mode: Mode }) {
  const k = editorial(mode);
  return (
    <div className={`${k.panel} w-full max-w-md space-y-5`}>
      <div className={`flex items-center justify-between border-b ${mode === 'dark' ? 'border-[#44403C]' : 'border-[#D6D3D1]'} pb-3`}>
        <span className="font-mono text-xs uppercase tracking-widest text-[#78716C]">MEMBERSHIP INVITATION</span>
        <button className={`${k.muted} hover:text-foreground`}><X className="h-3.5 w-3.5" /></button>
      </div>
      <h3 className="font-serif text-xl font-normal leading-snug">Support Independent Longform Journalism</h3>
      <p className={`${k.muted} font-serif text-sm leading-relaxed`}>
        Gain unlimited access to our entire historical archive dating back to 1924, plus print editions delivered bi-monthly.
      </p>
      <div className="flex justify-end gap-3 pt-2">
        <button className={k.btnSecondary}>Dismiss</button>
        <button className={k.btnPrimary}>Join the Society</button>
      </div>
    </div>
  );
}

export function AccordionPreview({ mode }: { mode: Mode }) {
  const k = editorial(mode);
  const [open, setOpen] = useState(true);
  return (
    <div className={`${k.panel} w-full max-w-md divide-y ${mode === 'dark' ? 'divide-[#44403C]' : 'divide-[#D6D3D1]'} p-0`}>
      <div className="p-4">
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left font-serif text-sm font-semibold">
          <span>What is the editorial philosophy?</span>
          <span className="font-serif italic text-xs text-[#78716C]">{open ? "Collapse" : "Expand"}</span>
        </button>
        {open && (
          <p className={`mt-2 ${k.muted} font-serif text-xs leading-relaxed`}>
            We believe in deep reading, meticulous fact-checking, and timeless typography that respects the reader&apos;s attention.
          </p>
        )}
      </div>
      <div className="p-4">
        <button className={`w-full flex items-center justify-between text-left font-serif text-sm ${k.muted}`}>
          <span>How are submissions reviewed?</span>
          <span className="font-serif italic text-xs">+</span>
        </button>
      </div>
    </div>
  );
}

export function TooltipPreview() {
  return (
    <div className="relative inline-block">
      <div className="border border-[#1C1917] bg-[#FAF7F2] text-[#1C1917] px-3 py-1 font-serif text-xs italic">
        Citation: Vol III, pp. 45–52
      </div>
    </div>
  );
}

export function TabsPreview({ mode }: { mode: Mode }) {
  const k = editorial(mode);
  const [active, setActive] = useState(0);
  const tabs = ["Curated", "Archive", "Correspondence"];
  return (
    <div className={`flex border-b ${mode === 'dark' ? 'border-[#44403C]' : 'border-[#D6D3D1]'} w-full max-w-md font-serif text-sm`}>
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => setActive(i)}
          className={`px-4 py-2 ${
            active === i ? "border-b-2 border-[#1C1917] font-semibold" : `${k.muted} hover:text-foreground`
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export function DropdownPreview({ mode }: { mode: Mode }) {
  const k = editorial(mode);
  return (
    <div className={`${k.panel} w-56 p-2 space-y-1 font-serif text-sm`}>
      <div className={`px-3 py-1.5 font-mono text-[10px] text-[#78716C] uppercase tracking-widest border-b ${mode === 'dark' ? 'border-[#44403C]' : 'border-[#D6D3D1]'}`}>
        Filter by Genre
      </div>
      <a href="#" className="block px-3 py-1.5 hover:bg-[#FAF7F2] hover:text-[#1C1917] italic transition-colors">Cultural Criticism</a>
      <a href="#" className="block px-3 py-1.5 hover:bg-[#FAF7F2] hover:text-[#1C1917] italic transition-colors">Historical Fiction</a>
      <a href="#" className="block px-3 py-1.5 hover:bg-[#FAF7F2] hover:text-[#1C1917] italic transition-colors">Philosophical Essays</a>
    </div>
  );
}

export function SwitchPreview() {
  const [checked, setChecked] = useState(true);
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setChecked(!checked)}
        className="w-10 h-5 border border-[#1C1917] bg-[#FAF7F2] relative p-0.5 rounded-none flex items-center justify-start"
      >
        <div className={`w-4 h-3.5 bg-[#1C1917] transition-transform ${checked ? 'translate-x-4.5' : ''}`}></div>
      </button>
      <span className="font-serif text-xs italic">Serif Typography Mode</span>
    </div>
  );
}

export function SkeletonPreview({ mode }: { mode: Mode }) {
  const k = editorial(mode);
  return (
    <div className={`${k.panel} w-full max-w-md space-y-4`}>
      <div className="h-3 bg-[#D6D3D1] animate-pulse w-1/4"></div>
      <div className="h-6 bg-[#D6D3D1] animate-pulse w-3/4"></div>
      <div className="space-y-2">
        <div className="h-3 bg-[#E7E5E4] animate-pulse w-full"></div>
        <div className="h-3 bg-[#E7E5E4] animate-pulse w-5/6"></div>
      </div>
    </div>
  );
}

export function ToastPreview({ mode }: { mode: Mode }) {
  const k = editorial(mode);
  return (
    <div className={`${k.panel} w-full max-w-sm p-4 border-l-2 border-l-[#1C1917] space-y-1`}>
      <p className="font-mono text-[10px] uppercase tracking-widest text-[#78716C]">DISPATCH SENT</p>
      <p className={`${k.text} font-serif text-xs italic`}>Your article has been saved to your personal reading list.</p>
    </div>
  );
}

export function ProgressPreview() {
  return (
    <div className="w-full max-w-sm space-y-1.5">
      <div className="flex justify-between font-serif text-xs italic">
        <span>Reading Progress</span>
        <span>65%</span>
      </div>
      <div className="h-1 w-full bg-[#E7E5E4]">
        <div className="h-full bg-[#1C1917] w-2/3"></div>
      </div>
    </div>
  );
}

export function AvatarPreview() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 border border-[#1C1917] bg-[#FAF7F2] text-[#1C1917] font-serif italic text-lg flex items-center justify-center">
        JV
      </div>
      <div>
        <p className="font-serif text-sm font-semibold">Julian Vance</p>
        <p className="font-serif text-xs italic text-[#78716C]">Senior Editor</p>
      </div>
    </div>
  );
}
