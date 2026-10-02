"use client";

import React, { useState } from "react";
import type { Mode } from "@/lib/styles/types";
import { metropolitan } from "./kit";

function ArrowRightIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

export function ButtonPreview({ mode }: { mode: Mode }) {
  const mkt = metropolitan(mode);
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <button className={mkt.btnPrimary}>
        <span>LINE 4 EXPRESS</span>
        <ArrowRightIcon />
      </button>
      <button className={mkt.btnSecondary}>
        <span>CONCOURSE MAP</span>
      </button>
    </div>
  );
}

export function CardPreview({ mode }: { mode: Mode }) {
  const mkt = metropolitan(mode);
  return (
    <div className={`${mkt.panel} w-full max-w-md space-y-4`}>
      <div className={`flex items-center justify-between border-b ${mode === 'dark' ? 'border-slate-700' : 'border-slate-300'} pb-3`}>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-600 inline-block" />
          <span className="font-mono text-xs font-bold text-blue-600">STATION #409</span>
        </div>
        <span className={mkt.badge}>ON SCHEDULE</span>
      </div>
      <h3 className={`${mkt.heading} text-2xl leading-none`}>GRAND CENTRAL CONCOURSE</h3>
      <p className={`${mkt.muted} font-sans text-xs leading-relaxed`}>
        High-density urban transit board with real-time schedule indicators and monospaced platform codes.
      </p>
      <div className="pt-2 flex items-center justify-between font-mono text-xs">
        <span className={mkt.muted}>TRACK 14 // DEPART 08:45</span>
        <button className={mkt.btnPrimarySm}>
          <span>BOARD</span>
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}

export function NavbarPreview({ mode }: { mode: Mode }) {
  const mkt = metropolitan(mode);
  const [open, setOpen] = useState(false);
  return (
    <header className={`${mkt.bar} flex flex-col justify-center px-4 py-3 sm:px-6 sm:py-4 w-full transition-all`}>
      <div className="flex items-center justify-between gap-3 w-full">
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-6 h-6 bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center">
            M
          </div>
          <a href="#" className="font-bold text-xs sm:text-sm uppercase tracking-tight text-blue-600">METRO_NET</a>
        </div>

        <nav className="hidden md:flex nav-desktop-links items-center gap-6 sm:gap-8 font-mono text-xs uppercase tracking-wider font-bold">
          <a href="#" className="text-blue-600 border-b-2 border-blue-600 pb-0.5">01. LINES</a>
          <a href="#" className={`${mkt.muted} hover:text-blue-600`}>02. SCHEDULES</a>
          <a href="#" className={`${mkt.muted} hover:text-blue-600`}>03. FARES</a>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button className={`${mkt.btnPrimarySm} text-xs px-2.5 py-1.5`}>BUY PASS</button>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="md:hidden nav-mobile-toggle p-1.5 border border-blue-600/40 text-blue-600 hover:bg-blue-600/10 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="pt-3 mt-3 border-t border-blue-600/20 flex flex-col gap-2 font-mono text-xs uppercase tracking-wider font-bold animate-in fade-in-0">
          <a href="#" className="py-1 text-blue-600">01. LINES</a>
          <a href="#" className={`py-1 ${mkt.muted} hover:text-blue-600`}>02. SCHEDULES</a>
          <a href="#" className={`py-1 ${mkt.muted} hover:text-blue-600`}>03. FARES</a>
        </nav>
      )}
    </header>
  );
}

export function InputPreview({ mode }: { mode: Mode }) {
  const mkt = metropolitan(mode);
  return (
    <div className="w-full max-w-sm space-y-1.5">
      <label className={mkt.label} htmlFor="metro-station-code">DESTINATION STATION CODE</label>
      <input
        id="metro-station-code"
        name="destinationStationCode"
        aria-label="Destination Station Code"
        type="text"
        autoComplete="off"
        suppressHydrationWarning
        placeholder="NYC-GCT-409"
        className={mkt.input}
        defaultValue=""
      />
      <p className={`font-mono text-[10px] ${mkt.muted}`}>Enter 6-character terminal identifier</p>
    </div>
  );
}

export function BadgePreview({ mode }: { mode: Mode }) {
  const mkt = metropolitan(mode);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className={mkt.badge}>EXPRESS LINE</span>
      <span className={mkt.badgeOutline}>PLATFORM 3B</span>
      <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-bold bg-amber-500 text-black">
        DELAY 4 MIN
      </span>
    </div>
  );
}

export function ModalPreview({ mode }: { mode: Mode }) {
  const mkt = metropolitan(mode);
  return (
    <div className={`${mkt.panel} w-full max-w-md space-y-5`}>
      <div className={`flex items-center justify-between border-b ${mode === 'dark' ? 'border-slate-700' : 'border-slate-300'} pb-3`}>
        <span className="font-mono text-xs font-bold text-blue-600">TICKET CONFIRMATION</span>
        <button className={`${mkt.muted} hover:text-blue-600`}><XIcon /></button>
      </div>
      <h3 className={`${mkt.heading} text-xl`}>CONFIRM UNLIMITED METRO PASS</h3>
      <p className={`${mkt.muted} font-sans text-xs leading-relaxed`}>
        30-day all-access transit pass across all subway, light rail, and regional express networks.
      </p>
      <div className="flex justify-end gap-3 pt-2">
        <button className={mkt.btnSecondary}>CANCEL</button>
        <button className={mkt.btnPrimary}>PURCHASE $127</button>
      </div>
    </div>
  );
}

export function AccordionPreview({ mode }: { mode: Mode }) {
  const mkt = metropolitan(mode);
  return (
    <div className={`${mkt.panel} w-full max-w-md divide-y ${mode === 'dark' ? 'divide-slate-700' : 'divide-slate-300'} p-0`}>
      <div className="p-4">
        <button className="w-full flex items-center justify-between text-left font-mono text-xs font-bold uppercase tracking-wider text-blue-600">
          <span>01 // TRANSIT TARIFF RULES</span>
          <span className="font-bold">-</span>
        </button>
        <p className={`mt-3 ${mkt.muted} font-sans text-xs leading-relaxed`}>
          Fares are calculated by zone density. Free transfers available within 120 minutes across all interconnect lines.
        </p>
      </div>
      <div className="p-4">
        <button className={`w-full flex items-center justify-between text-left font-mono text-xs font-bold uppercase tracking-wider ${mkt.muted}`}>
          <span>02 // NIGHT SERVICE SCHEDULE</span>
          <span className="font-bold">+</span>
        </button>
      </div>
    </div>
  );
}

export function TooltipPreview({ mode }: { mode: Mode }) {
  return (
    <div className="relative inline-block">
      <div className={`bg-blue-600 text-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider ${mode === 'dark' ? 'shadow-sm shadow-blue-500/30' : 'shadow-sm'}`}>
        SYS_STATUS: OPTIMAL 99.8%
      </div>
    </div>
  );
}

export function TabsPreview({ mode }: { mode: Mode }) {
  const mkt = metropolitan(mode);
  return (
    <div className={`flex border-b-2 ${mode === 'dark' ? 'border-blue-500' : 'border-blue-600'} w-full max-w-md font-mono text-xs`}>
      <button className="px-5 py-2.5 bg-blue-600 text-white font-bold tracking-wider">
        01. EXPRESS
      </button>
      <button className={`px-5 py-2.5 ${mkt.muted} font-bold tracking-wider hover:text-blue-600`}>
        02. LOCAL
      </button>
      <button className={`px-5 py-2.5 ${mkt.muted} font-bold tracking-wider hover:text-blue-600`}>
        03. NIGHT
      </button>
    </div>
  );
}

export function DropdownPreview({ mode }: { mode: Mode }) {
  const mkt = metropolitan(mode);
  return (
    <div className={`${mkt.panel} w-56 p-0 divide-y ${mode === 'dark' ? 'divide-slate-700' : 'divide-slate-300'} font-mono text-xs uppercase`}>
      <div className="p-3 bg-blue-600 text-white font-bold flex justify-between items-center">
        <span>SELECT ROUTE</span>
        <span>▼</span>
      </div>
      <a href="#" className="block p-3 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors">LINE A — DOWNTOWN</a>
      <a href="#" className={`block p-3 ${mkt.muted} hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors`}>LINE B — CROSSTOWN</a>
      <a href="#" className={`block p-3 ${mkt.muted} hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors`}>LINE C — AIRPORT EXPR</a>
    </div>
  );
}

export function SwitchPreview({ mode }: { mode: Mode }) {
  return (
    <div className="flex items-center gap-4">
      <button className={`w-11 h-6 border ${mode === 'dark' ? 'border-slate-600 bg-slate-800' : 'border-slate-300 bg-slate-200'} relative p-0.5 rounded-none`}>
        <div className="w-5 h-4.5 bg-blue-600 rounded-none" />
      </button>
      <span className="font-mono text-xs font-bold text-blue-600 tracking-wider">REALTIME ALERTS: ON</span>
    </div>
  );
}

export function SkeletonPreview({ mode }: { mode: Mode }) {
  const mkt = metropolitan(mode);
  return (
    <div className={`${mkt.panel} w-full max-w-sm p-6 space-y-4`}>
      <div className="h-4 bg-blue-600/40 animate-pulse w-1/3" />
      <div className={`h-7 ${mode === 'dark' ? 'bg-slate-700' : 'bg-slate-300'} animate-pulse w-3/4`} />
      <div className="space-y-2">
        <div className={`h-3 ${mode === 'dark' ? 'bg-slate-800' : 'bg-slate-200'} animate-pulse w-full`} />
        <div className={`h-3 ${mode === 'dark' ? 'bg-slate-800' : 'bg-slate-200'} animate-pulse w-5/6`} />
      </div>
    </div>
  );
}

export function ToastPreview({ mode }: { mode: Mode }) {
  const mkt = metropolitan(mode);
  return (
    <div className={`${mkt.panel} w-full max-w-sm p-4 border-l-4 border-l-blue-600 flex items-start gap-3`}>
      <div className="w-2.5 h-2.5 bg-blue-600 mt-1 flex-shrink-0" />
      <div className="space-y-1">
        <p className="font-mono text-xs font-bold text-blue-600">SCHEDULE UPDATE</p>
        <p className={`${mkt.muted} font-sans text-xs`}>Train #409 now boarding Track 14.</p>
      </div>
    </div>
  );
}

export function ProgressPreview({ mode }: { mode: Mode }) {
  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="flex justify-between font-mono text-xs font-bold uppercase">
        <span className="text-blue-600">TRANSIT CAPACITY</span>
        <span className="text-blue-600">82%</span>
      </div>
      <div className={`h-3 w-full border border-slate-400 ${mode === 'dark' ? 'bg-slate-800' : 'bg-slate-200'} p-0.5`}>
        <div className="h-full bg-blue-600 w-[82%]" />
      </div>
    </div>
  );
}

export function AvatarPreview({ mode }: { mode: Mode }) {
  const mkt = metropolitan(mode);
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 bg-blue-600 text-white font-mono font-bold flex items-center justify-center text-xs">
        MN
      </div>
      <div>
        <p className="font-sans font-bold text-xs uppercase">METRO NAVIGATOR</p>
        <p className={`font-mono text-[10px] ${mkt.muted}`}>OPERATOR #9042</p>
      </div>
    </div>
  );
}
