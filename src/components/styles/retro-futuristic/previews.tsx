"use client";

import React, { useState } from "react";
import type { Mode } from "@/lib/styles/types";
import { retroFuturistic } from "./kit";
import { ArrowRight, ChevronDown, Menu, X, Zap } from "lucide-react";

export function ButtonPreview({ mode }: { mode: Mode }) {
  const k = retroFuturistic(mode);
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <button className={k.btnPrimary}>
        <span>ENGAGE HYPERDRIVE</span>
        <Zap className="h-4 w-4" />
      </button>
      <button className={k.btnSecondary}>
        <span>GRID INITIALIZE</span>
      </button>
    </div>
  );
}

export function CardPreview({ mode }: { mode: Mode }) {
  const k = retroFuturistic(mode);
  return (
    <div className={`${k.panel} w-full max-w-md space-y-4`}>
      <div className="flex items-center justify-between border-b border-[#00F0FF]/30 pb-3">
        <span className="font-mono text-xs font-bold text-[#00F0FF] tracking-widest">{"// SECTOR 084"}</span>
        <span className={k.badge}>SYNTHWAVE</span>
      </div>
      <h3 className={`${k.heading} text-2xl leading-none`}>CYBER HORIZON 1984</h3>
      <p className={`${k.muted} font-mono text-xs leading-relaxed`}>
        Neon grid horizons, chrome reflections, and vector speed lines radiating into the retro cosmic void.
      </p>
      <div className="pt-2 flex items-center justify-between">
        <span className="font-mono text-[10px] text-[#FF00AA]">FREQ: 108.4 MHZ</span>
        <button className={k.btnPrimarySm}>
          <span>LAUNCH</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export function NavbarPreview({ mode }: { mode: Mode }) {
  const k = retroFuturistic(mode);
  const [open, setOpen] = useState(false);
  return (
    <header className={`${k.bar} flex flex-col justify-center px-4 py-3 sm:px-6 sm:py-4 w-full transition-all`}>
      <div className="flex items-center justify-between gap-3 w-full">
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 bg-[#FF00AA] shadow-[0_0_10px_#FF00AA] inline-block rotate-45"></span>
          <a href="#" className="font-mono font-black text-xs sm:text-sm text-[#00F0FF] tracking-widest">NEON_PROTOCOL_</a>
        </div>

        <nav className="hidden md:flex nav-desktop-links items-center gap-6 sm:gap-8 font-mono text-xs text-[#B399D4] tracking-widest">
          <a href="#" className="text-[#FF00AA] shadow-sm hover:text-white transition-colors">[GRID]</a>
          <a href="#" className="hover:text-[#00F0FF] transition-colors">[SYNTH]</a>
          <a href="#" className="hover:text-[#00F0FF] transition-colors">[CHROME]</a>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button className={`${k.btnPrimarySm} text-xs px-2.5 py-1.5`}>SYSTEM LOGIN</button>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="md:hidden nav-mobile-toggle p-1.5 border border-[#00F0FF]/40 text-[#00F0FF] hover:bg-[#00F0FF]/10 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="pt-3 mt-3 border-t border-[#00F0FF]/30 flex flex-col gap-2 font-mono text-xs text-[#B399D4] tracking-widest animate-in fade-in-0">
          <a href="#" className="py-1 text-[#FF00AA]">[GRID]</a>
          <a href="#" className="py-1 hover:text-[#00F0FF] transition-colors">[SYNTH]</a>
          <a href="#" className="py-1 hover:text-[#00F0FF] transition-colors">[CHROME]</a>
        </nav>
      )}
    </header>
  );
}

export function InputPreview({ mode }: { mode: Mode }) {
  const k = retroFuturistic(mode);
  return (
    <div className="w-full max-w-sm space-y-1.5">
      <label className={k.label} htmlFor="retro-vector-code">INPUT VECTOR CODE</label>
      <input
        id="retro-vector-code"
        name="vectorCode"
        aria-label="Input Vector Code"
        type="text"
        autoComplete="off"
        suppressHydrationWarning
        placeholder="SYNTH-8492-X"
        className={k.input}
      />
      <p className="font-mono text-[10px] text-[#00F0FF] tracking-widest">TRANSMISSION ENCRYPTED 256-BIT</p>
    </div>
  );
}

export function BadgePreview({ mode }: { mode: Mode }) {
  const k = retroFuturistic(mode);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className={k.badge}>NEON ACTIVE</span>
      <span className={k.badgeOutline}>GRID ONLINE</span>
      <span className="inline-flex items-center px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest bg-[#9D00FF] text-white shadow-[0_0_10px_#9D00FF]">
        OVERDRIVE
      </span>
    </div>
  );
}

export function ModalPreview({ mode }: { mode: Mode }) {
  const k = retroFuturistic(mode);
  return (
    <div className={`${k.panel} w-full max-w-md space-y-5`}>
      <div className="flex items-center justify-between border-b border-[#FF00AA]/40 pb-3">
        <span className="font-mono text-xs font-bold text-[#FF00AA] tracking-widest">! OVERHEAT ALERT !</span>
        <button className="text-[#00F0FF] hover:text-[#FF00AA]"><X className="h-3.5 w-3.5" /></button>
      </div>
      <h3 className={`${k.heading} text-xl`}>CRITICAL MATRIX CORE OVERLOAD</h3>
      <p className={`${k.muted} font-mono text-xs leading-relaxed`}>
        Grid frequency exceeds 88.4 gigahertz. Coolant injection required to prevent total digital singularity.
      </p>
      <div className="flex justify-end gap-3 pt-2">
        <button className={k.btnSecondary}>ABORT</button>
        <button className={k.btnPrimary}>ENGAGE COOLANT</button>
      </div>
    </div>
  );
}

export function AccordionPreview({ mode }: { mode: Mode }) {
  const k = retroFuturistic(mode);
  const [open, setOpen] = useState(true);
  return (
    <div className={`${k.panel} w-full max-w-md divide-y divide-[#00F0FF]/20 p-0`}>
      <div className="p-4">
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left font-mono text-xs font-bold text-[#00F0FF] tracking-widest">
          <span>01 // WHAT IS RETRO FUTURISM?</span>
          <span className="text-[#FF00AA] font-black">{open ? "-" : "+"}</span>
        </button>
        {open && (
          <p className={`mt-3 ${k.muted} font-mono text-xs leading-relaxed`}>
            A nostalgic aesthetic celebrating how the 1980s envisioned the distant cyberpunk future of 2026.
          </p>
        )}
      </div>
      <div className="p-4">
        <button className="w-full flex items-center justify-between text-left font-mono text-xs font-bold text-[#B399D4] tracking-widest">
          <span>02 // SYNTHWAVE AUDIO CHANNELS</span>
          <span className="text-[#00F0FF]">+</span>
        </button>
      </div>
    </div>
  );
}

export function TooltipPreview() {
  return (
    <div className="relative inline-block">
      <div className="bg-[#090014] text-[#00F0FF] border border-[#FF00AA] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest shadow-[0_0_12px_#FF00AA]">
        GRID MATRIX: 1984-X
      </div>
    </div>
  );
}

export function TabsPreview({ mode }: { mode: Mode }) {
  const k = retroFuturistic(mode);
  const [active, setActive] = useState(0);
  const tabs = ["01. GRID", "02. SYNTH", "03. VECTOR"];
  return (
    <div className="flex border-b border-[#00F0FF]/40 w-full max-w-md font-mono text-xs">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => setActive(i)}
          className={`px-5 py-2.5 font-bold tracking-widest ${
            active === i
              ? "bg-gradient-to-r from-[#FF00AA] to-[#9D00FF] text-white shadow-[0_0_10px_#FF00AA]"
              : `${k.muted} hover:text-[#00F0FF]`
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export function DropdownPreview({ mode }: { mode: Mode }) {
  const k = retroFuturistic(mode);
  return (
    <div className={`${k.panel} w-56 p-0 divide-y divide-[#00F0FF]/30 font-mono text-xs tracking-widest`}>
      <div className="p-3 bg-[#FF00AA] text-white font-bold flex justify-between items-center shadow-[0_0_10px_#FF00AA]">
        <span>SELECT VECTOR</span>
        <ChevronDown className="h-3.5 w-3.5" />
      </div>
      <a href="#" className="block p-3 text-[#00F0FF] hover:bg-[#00F0FF]/10 hover:text-white transition-colors">ALPHA SECTOR</a>
      <a href="#" className="block p-3 text-[#00F0FF] hover:bg-[#00F0FF]/10 hover:text-white transition-colors">CYBER HORIZON</a>
      <a href="#" className="block p-3 text-[#00F0FF] hover:bg-[#00F0FF]/10 hover:text-white transition-colors">NEON WASTELAND</a>
    </div>
  );
}

export function SwitchPreview() {
  const [checked, setChecked] = useState(true);
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setChecked(!checked)}
        className="w-12 h-6 border border-[#00F0FF] bg-[#090014] relative p-0.5 shadow-[0_0_10px_rgba(0,240,255,0.4)] flex items-center justify-start"
      >
        <div className={`w-5 h-4.5 bg-[#FF00AA] shadow-[0_0_10px_#FF00AA] transition-transform ${checked ? 'translate-x-5.5' : ''}`}></div>
      </button>
      <span className="font-mono text-xs font-bold text-[#FF00AA] tracking-widest">NEON GLOW: {checked ? 'ONLINE' : 'OFFLINE'}</span>
    </div>
  );
}

export function SkeletonPreview({ mode }: { mode: Mode }) {
  const k = retroFuturistic(mode);
  return (
    <div className={`${k.panel} w-full max-w-sm p-6 space-y-4`}>
      <div className="h-4 bg-[#FF00AA] animate-pulse shadow-[0_0_10px_#FF00AA] w-1/3"></div>
      <div className="h-8 bg-[#00F0FF]/30 animate-pulse w-3/4 border border-[#00F0FF]/50"></div>
      <div className="space-y-2">
        <div className="h-3 bg-[#9D00FF]/30 animate-pulse w-full"></div>
        <div className="h-3 bg-[#9D00FF]/30 animate-pulse w-5/6"></div>
      </div>
    </div>
  );
}

export function ToastPreview({ mode }: { mode: Mode }) {
  const k = retroFuturistic(mode);
  return (
    <div className={`${k.panel} w-full max-w-sm p-4 border-l-4 border-l-[#FF00AA] shadow-[0_0_20px_rgba(255,0,170,0.4)] flex items-start gap-3`}>
      <span className="h-3 w-3 bg-[#FF00AA] shadow-[0_0_8px_#FF00AA] mt-0.5 flex-shrink-0"></span>
      <div className="space-y-1">
        <p className="font-mono text-xs font-bold text-[#00F0FF] tracking-widest">{"// SIGNAL RECEIVED"}</p>
        <p className={`${k.muted} font-mono text-xs`}>Synthwave vector link established at 1.21 gigawatts.</p>
      </div>
    </div>
  );
}

export function ProgressPreview() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="flex justify-between font-mono text-xs font-bold tracking-widest">
        <span className="text-[#00F0FF]">NEON FREQUENCY</span>
        <span className="text-[#FF00AA]">88%</span>
      </div>
      <div className="h-3 w-full border border-[#00F0FF] bg-[#090014] p-0.5 shadow-[0_0_10px_rgba(0,240,255,0.3)]">
        <div className="h-full bg-gradient-to-r from-[#FF00AA] to-[#00F0FF] w-[88%] shadow-[0_0_12px_#FF00AA]"></div>
      </div>
    </div>
  );
}

export function AvatarPreview() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-br from-[#FF00AA] to-[#00F0FF] text-white flex items-center justify-center font-mono font-black text-sm shadow-[0_0_15px_#FF00AA] border border-white">
        84
      </div>
      <div>
        <p className="font-mono font-bold text-xs text-[#00F0FF] tracking-widest">VECTOR RIDER</p>
        <p className="font-mono text-[10px] text-[#FF00AA] tracking-widest">LEVEL 99 SYNTH</p>
      </div>
    </div>
  );
}
