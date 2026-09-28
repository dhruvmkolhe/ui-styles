"use client";

import React, { useState } from "react";
import type { Mode } from "@/lib/styles/types";
import { luxuryMinimal } from "./kit";
import { ArrowRight, X } from "lucide-react";

export function ButtonPreview({ mode }: { mode: Mode }) {
  const k = luxuryMinimal(mode);
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <button className={k.btnPrimary}>
        <span>DISCOVER COLLECTION</span>
        <ArrowRight className="h-4 w-4" />
      </button>
      <button className={k.btnSecondary}>
        <span>REQUEST PRIVATE VIEWING</span>
      </button>
    </div>
  );
}

export function CardPreview({ mode }: { mode: Mode }) {
  const k = luxuryMinimal(mode);
  return (
    <div className={`${k.panel} w-full max-w-md space-y-5`}>
      <div className={`flex items-center justify-between border-b ${mode === 'dark' ? 'border-neutral-800' : 'border-neutral-200'} pb-3`}>
        <span className="font-sans text-[10px] text-neutral-400 tracking-[0.25em]">LIMITED EDITION // № 01</span>
        <span className={k.badge}>CHAMPAGNE</span>
      </div>
      <h3 className="font-serif text-2xl font-light leading-snug">The Atelier Horizon</h3>
      <p className={`${k.muted} font-serif italic text-sm leading-relaxed`}>
        “Elegance is refusal — stripping away every unnecessary element until only pure structure remains.”
      </p>
      <div className={`pt-3 flex items-center justify-between border-t ${mode === 'dark' ? 'border-neutral-800' : 'border-neutral-200'}`}>
        <span className="font-sans text-[10px] text-[#C5A059] tracking-widest">€ 4,800</span>
        <button className={k.btnPrimarySm}>
          <span>ACQUIRE</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export function NavbarPreview({ mode }: { mode: Mode }) {
  const k = luxuryMinimal(mode);
  return (
    <header className={`${k.bar} flex items-center justify-between px-8 py-5 w-full`}>
      <div className="flex items-center gap-3">
        <a href="#" className="font-serif text-xl font-normal tracking-[0.25em]">Maison V</a>
      </div>

      <nav className="hidden md:flex items-center gap-8 font-sans text-xs text-neutral-400 tracking-[0.25em]">
        <a href="#" className="text-[#C5A059] border-b border-[#C5A059] pb-0.5">COUTURE</a>
        <a href="#" className="hover:text-foreground transition-colors">ATELIER</a>
        <a href="#" className="hover:text-foreground transition-colors">JOURNAL</a>
      </nav>

      <button className={k.btnPrimarySm}>APPOINTMENT</button>
    </header>
  );
}

export function InputPreview({ mode }: { mode: Mode }) {
  const k = luxuryMinimal(mode);
  return (
    <div className="w-full max-w-sm space-y-2">
      <label className={k.label}>PRIVATE INVITATION CODE</label>
      <input type="text" placeholder="MAISON-PARIS-VIP" className={k.input} />
      <p className="font-serif italic text-xs text-neutral-400">Strictly confidential subscription service</p>
    </div>
  );
}

export function BadgePreview({ mode }: { mode: Mode }) {
  const k = luxuryMinimal(mode);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className={k.badge}>Haut Couture</span>
      <span className={k.badgeOutline}>Champagne Gold</span>
      <span className="font-serif text-xs italic underline text-[#C5A059]">Exclusive Release</span>
    </div>
  );
}

export function ModalPreview({ mode }: { mode: Mode }) {
  const k = luxuryMinimal(mode);
  return (
    <div className={`${k.panel} w-full max-w-md space-y-5`}>
      <div className={`flex items-center justify-between border-b ${mode === 'dark' ? 'border-neutral-800' : 'border-neutral-200'} pb-3`}>
        <span className="font-sans text-[10px] text-neutral-400 tracking-[0.25em]">PRIVATE ATELIER</span>
        <button className={`${k.muted} hover:text-foreground`}><X className="h-3.5 w-3.5" /></button>
      </div>
      <h3 className="font-serif text-xl font-light">Confirm Private Viewing Request</h3>
      <p className={`${k.muted} font-serif text-sm leading-relaxed italic`}>
        Our personal concierge will arrange a private consultation at our Place Vendôme atelier.
      </p>
      <div className="flex justify-end gap-3 pt-2">
        <button className={k.btnSecondary}>CANCEL</button>
        <button className={k.btnPrimary}>CONFIRM RESERVATION</button>
      </div>
    </div>
  );
}

export function AccordionPreview({ mode }: { mode: Mode }) {
  const k = luxuryMinimal(mode);
  const [open, setOpen] = useState(true);
  return (
    <div className={`${k.panel} w-full max-w-md divide-y ${mode === 'dark' ? 'divide-neutral-800' : 'divide-neutral-200'} p-0`}>
      <div className="p-5">
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left font-serif text-sm">
          <span>What defines high-fashion minimalism?</span>
          <span className="font-serif italic text-xs text-[#C5A059]">{open ? "Collapse" : "Explore"}</span>
        </button>
        {open && (
          <p className={`mt-3 ${k.muted} font-serif text-xs leading-relaxed italic`}>
            Subtle luxury materials, ultra-thin border rules, and serene whitespace calculated to perfection.
          </p>
        )}
      </div>
      <div className="p-5">
        <button className={`w-full flex items-center justify-between text-left font-serif text-sm ${k.muted}`}>
          <span>Bespoke Tailoring Process</span>
          <span className="font-serif italic text-xs">+</span>
        </button>
      </div>
    </div>
  );
}

export function TooltipPreview() {
  return (
    <div className="relative inline-block">
      <div className="bg-[#050505] text-[#C5A059] border border-[#C5A059]/40 px-3 py-1 font-serif text-xs italic">
        Specification: Place Vendôme № 12
      </div>
    </div>
  );
}

export function TabsPreview({ mode }: { mode: Mode }) {
  const k = luxuryMinimal(mode);
  const [active, setActive] = useState(0);
  const tabs = ["LOOKBOOK", "ATELIER", "ARCHIVE"];
  return (
    <div className={`flex border-b ${mode === 'dark' ? 'border-neutral-800' : 'border-neutral-200'} w-full max-w-md font-sans text-xs tracking-[0.25em]`}>
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => setActive(i)}
          className={`px-5 py-3 ${
            active === i ? "border-b-2 border-[#C5A059] text-[#C5A059] font-medium" : `${k.muted} hover:text-foreground`
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export function DropdownPreview({ mode }: { mode: Mode }) {
  const k = luxuryMinimal(mode);
  return (
    <div className={`${k.panel} w-56 p-2 space-y-1 font-serif text-sm`}>
      <div className={`px-3 py-1.5 font-sans text-[9px] text-neutral-400 uppercase tracking-[0.25em] border-b ${mode === 'dark' ? 'border-neutral-800' : 'border-neutral-200'}`}>
        Select Season
      </div>
      <a href="#" className="block px-3 py-2 hover:bg-neutral-100 hover:text-black italic transition-colors">Spring / Summer 2026</a>
      <a href="#" className="block px-3 py-2 hover:bg-neutral-100 hover:text-black italic transition-colors">Autumn / Winter 2025</a>
      <a href="#" className="block px-3 py-2 hover:bg-neutral-100 hover:text-black italic transition-colors">Permanent Collection</a>
    </div>
  );
}

export function SwitchPreview() {
  const [checked, setChecked] = useState(true);
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setChecked(!checked)}
        className="w-10 h-5 border border-neutral-400 bg-transparent relative p-0.5 rounded-none flex items-center justify-start"
      >
        <div className={`w-4 h-3.5 bg-[#C5A059] transition-transform ${checked ? 'translate-x-4.5' : ''}`}></div>
      </button>
      <span className="font-serif text-xs italic">Monochrome Couture Mode</span>
    </div>
  );
}

export function SkeletonPreview({ mode }: { mode: Mode }) {
  const k = luxuryMinimal(mode);
  return (
    <div className={`${k.panel} w-full max-w-sm p-6 space-y-4`}>
      <div className="h-3 bg-neutral-300 animate-pulse w-1/4"></div>
      <div className="h-6 bg-neutral-300 animate-pulse w-3/4"></div>
      <div className="space-y-2">
        <div className="h-3 bg-neutral-200 animate-pulse w-full"></div>
        <div className="h-3 bg-neutral-200 animate-pulse w-5/6"></div>
      </div>
    </div>
  );
}

export function ToastPreview({ mode }: { mode: Mode }) {
  const k = luxuryMinimal(mode);
  return (
    <div className={`${k.panel} w-full max-w-sm p-4 border-l-2 border-l-[#C5A059] space-y-1`}>
      <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#C5A059]">RESERVATION CONFIRMED</p>
      <p className={`${k.text} font-serif text-xs italic`}>Private concierge appointment booked for Place Vendôme.</p>
    </div>
  );
}

export function ProgressPreview() {
  return (
    <div className="w-full max-w-sm space-y-1.5">
      <div className="flex justify-between font-serif text-xs italic">
        <span>Couture Crafting</span>
        <span>85%</span>
      </div>
      <div className="h-0.5 w-full bg-neutral-200">
        <div className="h-full bg-[#C5A059] w-[85%]"></div>
      </div>
    </div>
  );
}

export function AvatarPreview() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 border border-[#C5A059] bg-[#050505] text-[#C5A059] font-serif italic text-base flex items-center justify-center">
        MV
      </div>
      <div>
        <p className="font-serif text-sm font-light">Maison Vendôme</p>
        <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-neutral-400">PARIS // ATELIER</p>
      </div>
    </div>
  );
}
