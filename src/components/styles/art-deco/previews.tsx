"use client";

import React, { useState } from "react";
import type { Mode } from "@/lib/styles/types";
import { artDeco } from "./kit";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";

export function ButtonPreview({ mode }: { mode: Mode }) {
  const k = artDeco(mode);
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <button className={k.btnPrimary}>
        <span>RESERVE SUITE</span>
        <ArrowRight className="h-4 w-4" />
      </button>
      <button className={k.btnSecondary}>
        <span>VIEW CATALOGUE</span>
      </button>
    </div>
  );
}

export function CardPreview({ mode }: { mode: Mode }) {
  const k = artDeco(mode);
  return (
    <div className={`${k.panel} w-full max-w-md space-y-4`}>
      <div className="flex items-center justify-between border-b border-[#C9A961]/40 pb-3">
        <span className="font-sans text-[10px] font-bold text-[#C9A961] tracking-[0.25em]">EST. 1925 // GATSBY</span>
        <span className={k.badge}>EXCLUSIVE</span>
      </div>
      <h3 className={`${k.heading} text-xl leading-snug`}>THE GRAND MAJESTIC HOTEL</h3>
      <p className={`${k.muted} font-sans text-xs leading-relaxed tracking-wider`}>
        Symmetrical geometric chevron motifs, metallic gold gilding, and timeless roaring twenties elegance.
      </p>
      <div className="pt-2 flex items-center justify-between border-t border-[#C9A961]/40">
        <span className="font-sans text-[10px] text-[#C9A961] tracking-widest">SUITE № 408</span>
        <button className={k.btnPrimarySm}>
          <span>INSPECT</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export function NavbarPreview({ mode }: { mode: Mode }) {
  const k = artDeco(mode);
  const [open, setOpen] = useState(false);
  return (
    <header className={`${k.bar} flex flex-col justify-center px-4 py-3 sm:px-8 sm:py-5 w-full transition-all`}>
      <div className="flex items-center justify-between gap-3 w-full">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[#C9A961] font-serif text-xs sm:text-sm">✦</span>
          <a href="#" className="font-sans font-bold text-xs sm:text-sm text-[#C9A961] tracking-[0.2em] sm:tracking-[0.3em]">L&apos;HORIZON</a>
          <span className="text-[#C9A961] font-serif text-xs sm:text-sm">✦</span>
        </div>

        <nav className="hidden md:flex nav-desktop-links items-center gap-6 sm:gap-8 font-sans text-xs text-[#A38D56] tracking-[0.2em]">
          <a href="#" className="text-[#C9A961] border-b border-[#C9A961]">SALON</a>
          <a href="#" className="hover:text-[#C9A961] transition-colors">ARCHIVE</a>
          <a href="#" className="hover:text-[#C9A961] transition-colors">GALLERY</a>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button className={`${k.btnPrimarySm} text-xs px-2.5 py-1.5`}>CONCIERGE</button>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="md:hidden nav-mobile-toggle p-1.5 border border-[#C9A961] text-[#C9A961] hover:bg-[#C9A961]/10 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="pt-3 mt-3 border-t border-[#C9A961]/30 flex flex-col items-center gap-2 font-sans text-xs text-[#A38D56] tracking-[0.2em] animate-in fade-in-0">
          <a href="#" className="py-1 text-[#C9A961]">SALON</a>
          <a href="#" className="py-1 hover:text-[#C9A961] transition-colors">ARCHIVE</a>
          <a href="#" className="py-1 hover:text-[#C9A961] transition-colors">GALLERY</a>
        </nav>
      )}
    </header>
  );
}

export function InputPreview({ mode }: { mode: Mode }) {
  const k = artDeco(mode);
  return (
    <div className="w-full max-w-sm space-y-1.5">
      <label className={k.label} htmlFor="art-deco-code">MEMBERSHIP ACCESS CODE</label>
      <input
        id="art-deco-code"
        name="accessCode"
        aria-label="Membership access code"
        autoComplete="off"
        suppressHydrationWarning
        type="text"
        placeholder="GOLDEN-1925-VIP"
        className={k.input}
      />
      <p className="font-sans text-[9px] text-[#A38D56] tracking-[0.2em]">BY PRIVATE INVITATION ONLY</p>
    </div>
  );
}

export function BadgePreview({ mode }: { mode: Mode }) {
  const k = artDeco(mode);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className={k.badge}>GOLD GILDED</span>
      <span className={k.badgeOutline}>1920S GEOMETRIC</span>
      <span className="inline-flex items-center px-3 py-0.5 text-[9px] font-sans font-bold uppercase tracking-[0.2em] bg-[#141414] text-[#F3E5AB] border border-[#F3E5AB]">
        VIP SOIRÉE
      </span>
    </div>
  );
}

export function ModalPreview({ mode }: { mode: Mode }) {
  const k = artDeco(mode);
  return (
    <div className={`${k.panel} w-full max-w-md space-y-5`}>
      <div className="flex items-center justify-between border-b border-[#C9A961]/40 pb-3">
        <span className="font-sans text-[10px] font-bold text-[#C9A961] tracking-[0.25em]">PRIVATE INVITATION</span>
        <button className="text-[#C9A961] hover:text-[#F3E5AB]"><X className="h-3.5 w-3.5" /></button>
      </div>
      <h3 className={`${k.heading} text-lg`}>ENTER THE ROARING TWENTIES GALA</h3>
      <p className={`${k.muted} font-sans text-xs leading-relaxed tracking-wider`}>
        You have been cordially summoned to an evening of jazz, champagne, and symmetrical geometric grandeur.
      </p>
      <div className="flex justify-end gap-3 pt-2">
        <button className={k.btnSecondary}>DECLINE</button>
        <button className={k.btnPrimary}>ACCEPT INVITATION</button>
      </div>
    </div>
  );
}

export function AccordionPreview({ mode }: { mode: Mode }) {
  const k = artDeco(mode);
  const [open, setOpen] = useState(true);
  return (
    <div className={`${k.panel} w-full max-w-md divide-y divide-[#C9A961]/30 p-0`}>
      <div className="p-4">
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left font-sans text-xs font-bold text-[#C9A961] tracking-[0.2em]">
          <span>✦ WHAT IS ART DECO DESIGN?</span>
          <span className="text-[#F3E5AB] font-bold">{open ? "-" : "+"}</span>
        </button>
        {open && (
          <p className={`mt-3 ${k.muted} font-sans text-xs leading-relaxed tracking-wider`}>
            Popularized in 1920s Paris, combining rich materials, geometric symmetry, and exquisite craftsmanship.
          </p>
        )}
      </div>
      <div className="p-4">
        <button className="w-full flex items-center justify-between text-left font-sans text-xs font-bold text-[#A38D56] tracking-[0.2em]">
          <span>✦ ARCHITECTURAL CHEVRON PATTERNS</span>
          <span className="text-[#C9A961]">+</span>
        </button>
      </div>
    </div>
  );
}

export function TooltipPreview() {
  return (
    <div className="relative inline-block">
      <div className="bg-[#0A0A0A] text-[#C9A961] border border-[#C9A961] px-3 py-1 font-sans text-[9px] font-bold uppercase tracking-[0.25em] outline outline-1 outline-[#C9A961]/40 outline-offset-2">
        GATSBY EDITION: 1925
      </div>
    </div>
  );
}

export function TabsPreview({ mode }: { mode: Mode }) {
  const k = artDeco(mode);
  const [active, setActive] = useState(0);
  const tabs = ["✦ SALON", "GALLERY", "ARCHIVE"];
  return (
    <div className="flex border-b border-[#C9A961]/40 w-full max-w-md font-sans text-xs">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => setActive(i)}
          className={`px-5 py-2.5 font-bold tracking-[0.2em] ${
            active === i ? "bg-[#C9A961] text-[#0A0A0A]" : `${k.muted} hover:text-[#C9A961]`
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export function DropdownPreview({ mode }: { mode: Mode }) {
  const k = artDeco(mode);
  return (
    <div className={`${k.panel} w-56 p-0 divide-y divide-[#C9A961]/40 font-sans text-xs tracking-[0.2em]`}>
      <div className="p-3 bg-[#C9A961] text-[#0A0A0A] font-bold flex justify-between items-center">
        <span>SELECT SALON</span>
        <ChevronDown className="h-3.5 w-3.5" />
      </div>
      <a href="#" className="block p-3 text-[#C9A961] hover:bg-[#C9A961]/10 hover:text-[#F3E5AB] transition-colors">THE CHANDELIER ROOM</a>
      <a href="#" className="block p-3 text-[#C9A961] hover:bg-[#C9A961]/10 hover:text-[#F3E5AB] transition-colors">GOLDEN LOUNGE</a>
      <a href="#" className="block p-3 text-[#C9A961] hover:bg-[#C9A961]/10 hover:text-[#F3E5AB] transition-colors">CHAMPAGNE VERANDA</a>
    </div>
  );
}

export function SwitchPreview() {
  const [checked, setChecked] = useState(true);
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setChecked(!checked)}
        className="w-12 h-6 border border-[#C9A961] bg-[#0A0A0A] relative p-0.5 outline outline-1 outline-[#C9A961]/40 outline-offset-2 flex items-center justify-start"
      >
        <div className={`w-5 h-4.5 bg-[#C9A961] transition-transform ${checked ? 'translate-x-5.5' : ''}`}></div>
      </button>
      <span className="font-sans text-xs font-bold text-[#C9A961] tracking-[0.2em]">GOLD ILLUMINATION: {checked ? 'ON' : 'OFF'}</span>
    </div>
  );
}

export function SkeletonPreview({ mode }: { mode: Mode }) {
  const k = artDeco(mode);
  return (
    <div className={`${k.panel} w-full max-w-sm p-6 space-y-4`}>
      <div className="h-4 bg-[#C9A961] animate-pulse w-1/3"></div>
      <div className="h-8 bg-[#C9A961]/20 animate-pulse w-3/4 border border-[#C9A961]/50"></div>
      <div className="space-y-2">
        <div className="h-3 bg-[#C9A961]/10 animate-pulse w-full"></div>
        <div className="h-3 bg-[#C9A961]/10 animate-pulse w-5/6"></div>
      </div>
    </div>
  );
}

export function ToastPreview({ mode }: { mode: Mode }) {
  const k = artDeco(mode);
  return (
    <div className={`${k.panel} w-full max-w-sm p-4 border-l-4 border-l-[#C9A961] flex items-start gap-3`}>
      <span className="text-[#C9A961] text-xs mt-0.5">✦</span>
      <div className="space-y-1">
        <p className="font-sans text-xs font-bold text-[#C9A961] tracking-[0.2em]">RESERVATION CONFIRMED</p>
        <p className={`${k.muted} font-sans text-xs tracking-wider`}>Your private suite at L&apos;Horizon has been secured.</p>
      </div>
    </div>
  );
}

export function ProgressPreview() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="flex justify-between font-sans text-xs font-bold tracking-[0.2em]">
        <span className="text-[#C9A961]">GILDING PROGRESS</span>
        <span className="text-[#F3E5AB]">90%</span>
      </div>
      <div className="h-3 w-full border border-[#C9A961] bg-[#0A0A0A] p-0.5 outline outline-1 outline-[#C9A961]/30 outline-offset-1">
        <div className="h-full bg-gradient-to-r from-[#C9A961] to-[#F3E5AB] w-[90%]"></div>
      </div>
    </div>
  );
}

export function AvatarPreview() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-[#C9A961] text-[#0A0A0A] font-sans font-bold text-xs tracking-widest flex items-center justify-center border border-[#F3E5AB]">
        JG
      </div>
      <div>
        <p className="font-sans font-bold text-xs text-[#C9A961] tracking-[0.2em]">JAY GATSBY</p>
        <p className="font-sans text-[9px] text-[#A38D56] tracking-[0.2em]">WEST EGG // PATRON</p>
      </div>
    </div>
  );
}
