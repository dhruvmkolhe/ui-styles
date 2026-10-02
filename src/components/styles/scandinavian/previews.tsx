"use client";

import React, { useState } from "react";
import type { Mode } from "@/lib/styles/types";
import { scandinavian } from "./kit";
import { ArrowRight, Menu, X } from "lucide-react";

export function ButtonPreview({ mode }: { mode: Mode }) {
  const k = scandinavian(mode);
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <button className={k.btnPrimary}>
        <span>EXPLORE HYGGE</span>
        <ArrowRight className="h-4 w-4" />
      </button>
      <button className={k.btnSecondary}>
        <span>OUR CRAFT</span>
      </button>
    </div>
  );
}

export function CardPreview({ mode }: { mode: Mode }) {
  const k = scandinavian(mode);
  return (
    <div className={`${k.panel} w-full max-w-md space-y-4`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#64748B]">STOCKHOLM STUDIO</span>
        <span className={k.badge}>NATURAL OAT</span>
      </div>
      <h3 className={`${k.heading} text-xl font-normal`}>Airy Living Collection</h3>
      <p className={`${k.muted} text-sm leading-relaxed`}>
        Minimalist pale birch finishes, muted sky blue accents, and generous whitespace for calm daily living.
      </p>
      <div className="pt-2 flex items-center justify-between border-t border-[#E8DCC8]">
        <span className="text-xs text-[#64748B]">Nordic Timber</span>
        <button className={k.btnPrimarySm}>
          <span>VIEW PIECE</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export function NavbarPreview({ mode }: { mode: Mode }) {
  const k = scandinavian(mode);
  const [open, setOpen] = useState(false);
  return (
    <header className={`${k.bar} flex flex-col justify-center px-4 py-3 sm:px-6 sm:py-4 w-full transition-all`}>
      <div className="flex items-center justify-between gap-3 w-full">
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#E8DCC8] text-[#334155] flex items-center justify-center font-medium text-xs">
            N
          </div>
          <a href="#" className="font-medium text-sm sm:text-base text-[#334155] dark:text-[#E2E8F0]">NORDIC FORM</a>
        </div>

        <nav className="hidden md:flex nav-desktop-links items-center gap-6 text-sm text-[#64748B] dark:text-[#94A3B8]">
          <a href="#" className="text-[#334155] dark:text-[#E2E8F0] border-b border-[#A8C0D6] pb-0.5">Spaces</a>
          <a href="#" className="hover:text-[#334155] dark:hover:text-[#E2E8F0]">Crafts</a>
          <a href="#" className="hover:text-[#334155] dark:hover:text-[#E2E8F0]">Materials</a>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button className={`${k.btnPrimarySm} text-xs px-3 py-1.5`}>DISCOVER</button>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="md:hidden nav-mobile-toggle p-1.5 rounded-lg border border-[#A8C0D6]/40 text-[#64748B] hover:bg-[#E8DCC8]/20 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="pt-3 mt-3 border-t border-[#A8C0D6]/20 flex flex-col gap-2 text-xs text-[#64748B] dark:text-[#94A3B8] animate-in fade-in-0">
          <a href="#" className="py-1 text-[#334155] dark:text-[#E2E8F0]">Spaces</a>
          <a href="#" className="py-1 hover:text-[#334155] dark:hover:text-[#E2E8F0]">Crafts</a>
          <a href="#" className="py-1 hover:text-[#334155] dark:hover:text-[#E2E8F0]">Materials</a>
        </nav>
      )}
    </header>
  );
}

export function InputPreview({ mode }: { mode: Mode }) {
  const k = scandinavian(mode);
  return (
    <div className="w-full max-w-sm space-y-1">
      <label className={k.label} htmlFor="scandi-email">SUBSCRIBE TO NORDIC NEWSLETTER</label>
      <input id="scandi-email" name="email" aria-label="Subscribe to Nordic Newsletter" type="email" placeholder="hello@hygge.se" className={k.input} suppressHydrationWarning />
      <p className="text-xs text-[#64748B]">Monthly interior design notes from Copenhagen</p>
    </div>
  );
}

export function BadgePreview({ mode }: { mode: Mode }) {
  const k = scandinavian(mode);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className={k.badge}>Pale Birch</span>
      <span className={k.badgeOutline}>Muted Sky</span>
      <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-[#A8C0D6] text-[#334155] rounded-full">
        Nordic Light
      </span>
    </div>
  );
}

export function ModalPreview({ mode }: { mode: Mode }) {
  const k = scandinavian(mode);
  return (
    <div className={`${k.panel} w-full max-w-md space-y-5`}>
      <div className="flex items-center justify-between">
        <h3 className={`${k.heading} text-lg font-normal`}>Welcome to Nordic Living</h3>
        <button className="text-slate-400 hover:text-slate-600"><X className="h-4 w-4" /></button>
      </div>
      <p className={`${k.muted} text-sm leading-relaxed`}>
        Join our quiet community of interior designers, woodworkers, and architects pursuing balance and warmth.
      </p>
      <div className="flex justify-end gap-3 pt-2">
        <button className={k.btnSecondary}>LATER</button>
        <button className={k.btnPrimary}>JOIN COMMUNITY</button>
      </div>
    </div>
  );
}

export function AccordionPreview({ mode }: { mode: Mode }) {
  const k = scandinavian(mode);
  const [open, setOpen] = useState(true);
  return (
    <div className={`${k.panel} w-full max-w-md divide-y divide-[#E8DCC8] p-0 overflow-hidden`}>
      <div className="p-5">
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left font-medium text-sm text-[#334155]">
          <span>What defines Scandinavian design?</span>
          <span className="text-[#A8C0D6] font-bold">{open ? "-" : "+"}</span>
        </button>
        {open && (
          <p className={`mt-3 ${k.muted} text-xs leading-relaxed`}>
            Simplicity, functionality, and connection to natural wood, light, and open whitespace.
          </p>
        )}
      </div>
      <div className="p-5">
        <button className="w-full flex items-center justify-between text-left font-medium text-sm text-[#64748B]">
          <span>Sustainably Sourced Birch</span>
          <span className="text-[#A8C0D6]">+</span>
        </button>
      </div>
    </div>
  );
}

export function TooltipPreview() {
  return (
    <div className="relative inline-block">
      <div className="bg-[#F5EFE6] text-[#334155] border border-[#E8DCC8] px-3 py-1.5 text-xs font-medium rounded-lg shadow-sm">
        Wood origin: Dalarna, Sweden
      </div>
    </div>
  );
}

export function TabsPreview({ mode }: { mode: Mode }) {
  const k = scandinavian(mode);
  const [active, setActive] = useState(0);
  const tabs = ["01. LIVING", "02. TIMBER", "03. LIGHT"];
  return (
    <div className="flex border-b border-[#E8DCC8] w-full max-w-md font-medium text-sm">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => setActive(i)}
          className={`px-5 py-2.5 ${
            active === i ? "border-b-2 border-[#A8C0D6] text-[#334155]" : `${k.muted} hover:text-[#334155]`
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export function DropdownPreview({ mode }: { mode: Mode }) {
  const k = scandinavian(mode);
  return (
    <div className={`${k.panel} w-56 p-2 space-y-1 text-sm font-medium`}>
      <a href="#" className="block px-3.5 py-2 rounded-xl bg-[#F5EFE6] text-[#334155]">Copenhagen Chair</a>
      <a href="#" className="block px-3.5 py-2 rounded-xl hover:bg-[#F5EFE6] text-[#64748B] transition-colors">Oslo Table</a>
      <a href="#" className="block px-3.5 py-2 rounded-xl hover:bg-[#F5EFE6] text-[#64748B] transition-colors">Stockholm Lamp</a>
    </div>
  );
}

export function SwitchPreview() {
  const [checked, setChecked] = useState(true);
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setChecked(!checked)}
        className="w-12 h-6 bg-[#A8C0D6] relative p-0.5 rounded-full flex items-center justify-end"
      >
        <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${checked ? '' : '-translate-x-6'}`}></div>
      </button>
      <span className="text-xs font-medium text-[#334155]">HYGGE LIGHTING: {checked ? 'ON' : 'OFF'}</span>
    </div>
  );
}

export function SkeletonPreview({ mode }: { mode: Mode }) {
  const k = scandinavian(mode);
  return (
    <div className={`${k.panel} w-full max-w-sm p-6 space-y-4`}>
      <div className="h-4 bg-[#A8C0D6]/40 animate-pulse rounded-full w-1/3"></div>
      <div className="h-8 bg-[#E8DCC8]/40 animate-pulse rounded-xl w-3/4"></div>
      <div className="space-y-2">
        <div className="h-3 bg-[#E8DCC8]/30 animate-pulse rounded-full w-full"></div>
        <div className="h-3 bg-[#E8DCC8]/30 animate-pulse rounded-full w-5/6"></div>
      </div>
    </div>
  );
}

export function ToastPreview({ mode }: { mode: Mode }) {
  const k = scandinavian(mode);
  return (
    <div className={`${k.panel} w-full max-w-sm p-4 border-l-4 border-l-[#A8C0D6] flex items-start gap-3`}>
      <span className="h-3 w-3 bg-[#A8C0D6] rounded-full mt-0.5 flex-shrink-0"></span>
      <div className="space-y-1">
        <p className="text-xs font-bold text-[#334155]">ITEM ADDED TO WISHLIST</p>
        <p className={`${k.muted} text-xs`}>Stockholm lounge chair saved to quiet mood board.</p>
      </div>
    </div>
  );
}

export function ProgressPreview() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="flex justify-between text-xs font-medium text-[#334155]">
        <span>Handcrafting timber</span>
        <span className="text-[#A8C0D6]">75%</span>
      </div>
      <div className="h-2 w-full bg-[#E8DCC8]/50 rounded-full overflow-hidden">
        <div className="h-full bg-[#A8C0D6] w-[75%] rounded-full"></div>
      </div>
    </div>
  );
}

export function AvatarPreview() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-[#E8DCC8] text-[#334155] rounded-full flex items-center justify-center font-medium text-sm">
        AL
      </div>
      <div>
        <p className="font-medium text-xs text-[#334155]">Astrid Lind</p>
        <p className="text-[10px] text-[#64748B]">Interior Stylist // Oslo</p>
      </div>
    </div>
  );
}
