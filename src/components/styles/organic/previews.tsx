"use client";

import React, { useState } from "react";
import type { Mode } from "@/lib/styles/types";
import { organic } from "./kit";
import { ArrowRight, X, Leaf } from "lucide-react";

export function ButtonPreview({ mode }: { mode: Mode }) {
  const k = organic(mode);
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <button className={k.btnPrimary}>
        <span>SAGE HARVEST</span>
        <ArrowRight className="h-4 w-4" />
      </button>
      <button className={k.btnSecondary}>
        <span>CLAY TERRACOTTA</span>
      </button>
    </div>
  );
}

export function CardPreview({ mode }: { mode: Mode }) {
  const k = organic(mode);
  return (
    <div className={`${k.panel} w-full max-w-md space-y-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf className="h-4 w-4 text-[#6E8560]" />
          <span className="text-xs font-medium text-[#6E8560]">BIOPHILIC FORM</span>
        </div>
        <span className={k.badge}>SAGE GREEN</span>
      </div>
      <h3 className={`${k.heading} text-xl font-normal`}>Botanical Sanctuary</h3>
      <p className={`${k.muted} text-sm leading-relaxed`}>
        Soft flowing organic curves, warm stone textures, and natural terracotta clay accents inspired by living ecosystems.
      </p>
      <div className="pt-2 flex items-center justify-between border-t border-[#D4CEB8]">
        <span className="text-xs text-[#C87D55] font-medium">Terracotta Clay</span>
        <button className={k.btnPrimarySm}>
          <span>DISCOVER</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export function NavbarPreview({ mode }: { mode: Mode }) {
  const k = organic(mode);
  return (
    <header className={`${k.bar} flex items-center justify-between px-6 py-4 w-full`}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#6E8560] text-white flex items-center justify-center font-medium text-xs">
          🌿
        </div>
        <a href="#" className="font-medium text-base text-[#4A5D44]">FLORA &amp; STONE</a>
      </div>

      <nav className="hidden md:flex items-center gap-6 text-sm text-[#5C6E57]">
        <a href="#" className="text-[#4A5D44] border-b border-[#6E8560] pb-0.5">Sanctuary</a>
        <a href="#" className="hover:text-[#4A5D44]">Botanicals</a>
        <a href="#" className="hover:text-[#4A5D44]">Terracotta</a>
      </nav>

      <button className={k.btnPrimarySm}>EXPLORE</button>
    </header>
  );
}

export function InputPreview({ mode }: { mode: Mode }) {
  const k = organic(mode);
  return (
    <div className="w-full max-w-sm space-y-1">
      <label className={k.label}>SUBSCRIBE TO BOTANICAL DISPATCH</label>
      <input type="email" placeholder="nature@flora.org" className={k.input} />
      <p className="text-xs text-[#5C6E57]">Natural stone tones and organic rounded curves</p>
    </div>
  );
}

export function BadgePreview({ mode }: { mode: Mode }) {
  const k = organic(mode);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className={k.badge}>Sage Leaf</span>
      <span className={k.badgeOutline}>Terracotta Clay</span>
      <span className="inline-flex items-center px-3.5 py-1 text-xs font-medium bg-[#C87D55] text-white rounded-full">
        Earthy Clay
      </span>
    </div>
  );
}

export function ModalPreview({ mode }: { mode: Mode }) {
  const k = organic(mode);
  return (
    <div className={`${k.panel} w-full max-w-md space-y-5`}>
      <div className="flex items-center justify-between">
        <h3 className={`${k.heading} text-lg font-normal`}>Harmonize with nature?</h3>
        <button className="text-[#8D9E88] hover:text-[#4A5D44]"><X className="h-4 w-4" /></button>
      </div>
      <p className={`${k.muted} text-sm leading-relaxed`}>
        Embrace flowing organic shapes and earthy biophilic color palettes designed for peaceful digital wellbeing.
      </p>
      <div className="flex justify-end gap-3 pt-2">
        <button className={k.btnSecondary}>PAUSE</button>
        <button className={k.btnPrimary}>EMBRACE</button>
      </div>
    </div>
  );
}

export function AccordionPreview({ mode }: { mode: Mode }) {
  const k = organic(mode);
  const [open, setOpen] = useState(true);
  return (
    <div className={`${k.panel} w-full max-w-md divide-y divide-[#D4CEB8] p-0 overflow-hidden`}>
      <div className="p-5">
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left font-medium text-sm text-[#4A5D44]">
          <span>What is biophilic design?</span>
          <span className="text-[#C87D55] font-bold">{open ? "-" : "+"}</span>
        </button>
        {open && (
          <p className={`mt-3 ${k.muted} text-xs leading-relaxed`}>
            Designing environments that connect human beings to natural ecosystems through organic materials and shapes.
          </p>
        )}
      </div>
      <div className="p-5">
        <button className="w-full flex items-center justify-between text-left font-medium text-sm text-[#5C6E57]">
          <span>Earthy Terracotta Pigments</span>
          <span className="text-[#6E8560]">+</span>
        </button>
      </div>
    </div>
  );
}

export function TooltipPreview() {
  return (
    <div className="relative inline-block">
      <div className="bg-[#2C352B] text-[#F4F1EA] border border-[#6E8560] px-3.5 py-1.5 text-xs font-medium rounded-full shadow-sm">
        Material: Terracotta Clay &amp; Stone
      </div>
    </div>
  );
}

export function TabsPreview({ mode }: { mode: Mode }) {
  const k = organic(mode);
  const [active, setActive] = useState(0);
  const tabs = ["01. BOTANICAL", "02. TERRACOTTA", "03. STONE"];
  return (
    <div className="flex border-b border-[#D4CEB8] w-full max-w-md font-medium text-sm">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => setActive(i)}
          className={`px-5 py-2.5 ${
            active === i ? "border-b-2 border-[#6E8560] text-[#4A5D44]" : `${k.muted} hover:text-[#4A5D44]`
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export function DropdownPreview({ mode }: { mode: Mode }) {
  const k = organic(mode);
  return (
    <div className={`${k.panel} w-56 p-2 space-y-1 text-sm font-medium`}>
      <a href="#" className="block px-4 py-2.5 rounded-2xl bg-[#E3EADF] text-[#4A5D44]">Sage Leaf #8FA382</a>
      <a href="#" className="block px-4 py-2.5 rounded-2xl hover:bg-[#E3EADF] text-[#5C6E57] transition-colors">Terracotta #C87D55</a>
      <a href="#" className="block px-4 py-2.5 rounded-2xl hover:bg-[#E3EADF] text-[#5C6E57] transition-colors">Warm Stone #F4F1EA</a>
    </div>
  );
}

export function SwitchPreview() {
  const [checked, setChecked] = useState(true);
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setChecked(!checked)}
        className="w-12 h-6 bg-[#6E8560] relative p-0.5 rounded-full flex items-center justify-end"
      >
        <div className={`w-5 h-5 bg-[#F4F1EA] rounded-full shadow-sm transition-transform ${checked ? '' : '-translate-x-6'}`}></div>
      </button>
      <span className="text-xs font-medium text-[#4A5D44]">BIOPHILIC FLOW: {checked ? 'ACTIVE' : 'OFF'}</span>
    </div>
  );
}

export function SkeletonPreview({ mode }: { mode: Mode }) {
  const k = organic(mode);
  return (
    <div className={`${k.panel} w-full max-w-sm p-6 space-y-4`}>
      <div className="h-4 bg-[#6E8560]/30 animate-pulse rounded-full w-1/3"></div>
      <div className="h-8 bg-[#D4CEB8]/40 animate-pulse rounded-2xl w-3/4"></div>
      <div className="space-y-2">
        <div className="h-3 bg-[#D4CEB8]/30 animate-pulse rounded-full w-full"></div>
        <div className="h-3 bg-[#D4CEB8]/30 animate-pulse rounded-full w-5/6"></div>
      </div>
    </div>
  );
}

export function ToastPreview({ mode }: { mode: Mode }) {
  const k = organic(mode);
  return (
    <div className={`${k.panel} w-full max-w-sm p-4 border-l-4 border-l-[#C87D55] flex items-start gap-3`}>
      <span className="h-3 w-3 bg-[#C87D55] rounded-full mt-0.5 flex-shrink-0"></span>
      <div className="space-y-1">
        <p className="text-xs font-bold text-[#4A5D44]">SANCTUARY UPDATED</p>
        <p className={`${k.muted} text-xs`}>Botanical terracotta palette applied to workspace.</p>
      </div>
    </div>
  );
}

export function ProgressPreview() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="flex justify-between text-xs font-medium text-[#4A5D44]">
        <span>Ecosystem Growth</span>
        <span className="text-[#C87D55]">78%</span>
      </div>
      <div className="h-2 w-full bg-[#D4CEB8]/50 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#6E8560] to-[#C87D55] w-[78%] rounded-full"></div>
      </div>
    </div>
  );
}

export function AvatarPreview() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-[#6E8560] text-[#F4F1EA] rounded-full flex items-center justify-center font-medium text-sm">
        FS
      </div>
      <div>
        <p className="font-medium text-xs text-[#4A5D44]">Flora Solis</p>
        <p className="text-[10px] text-[#5C6E57]">Biophilic Architect</p>
      </div>
    </div>
  );
}
