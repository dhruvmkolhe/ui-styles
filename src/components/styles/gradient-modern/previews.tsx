"use client";

import React, { useState } from "react";
import type { Mode } from "@/lib/styles/types";
import { gradientModern } from "./kit";
import { ArrowRight, X, Sparkles } from "lucide-react";

export function ButtonPreview({ mode }: { mode: Mode }) {
  const k = gradientModern(mode);
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <button className={k.btnPrimary}>
        <span>GENERATE MESH</span>
        <Sparkles className="h-4 w-4" />
      </button>
      <button className={k.btnSecondary}>
        <span>VIEW SHADERS</span>
      </button>
    </div>
  );
}

export function CardPreview({ mode }: { mode: Mode }) {
  const k = gradientModern(mode);
  return (
    <div className={`${k.panel} w-full max-w-md space-y-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-400" />
          <span className="text-xs font-semibold text-purple-400">SHADER v4.2</span>
        </div>
        <span className={k.badge}>MESH GRADIENT</span>
      </div>
      <h3 className={`${k.heading} text-2xl font-bold`}>Luminous Prism Surfaces</h3>
      <p className={`${k.muted} text-sm leading-relaxed`}>
        Rich indigo-to-fuchsia mesh gradients radiating through frosted glass panels with smooth lighting highlights.
      </p>
      <div className="pt-2 flex items-center justify-between border-t border-white/10">
        <span className="text-xs text-indigo-400 font-medium">Spectrum Shift</span>
        <button className={k.btnPrimarySm}>
          <span>LAUNCH</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export function NavbarPreview({ mode }: { mode: Mode }) {
  const k = gradientModern(mode);
  return (
    <header className={`${k.bar} flex items-center justify-between px-6 py-4 w-full`}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#EC4899] text-white flex items-center justify-center font-bold text-xs shadow-md">
          GM
        </div>
        <a href="#" className="font-bold text-base text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#EC4899]">PrismUI</a>
      </div>

      <nav className="hidden md:flex items-center gap-6 text-sm text-slate-400 font-medium">
        <a href="#" className="text-purple-400 border-b-2 border-purple-500 pb-0.5">Shaders</a>
        <a href="#" className="hover:text-purple-300">Gradients</a>
        <a href="#" className="hover:text-purple-300">Prisms</a>
      </nav>

      <button className={k.btnPrimarySm}>GET STARTED</button>
    </header>
  );
}

export function InputPreview({ mode }: { mode: Mode }) {
  const k = gradientModern(mode);
  return (
    <div className="w-full max-w-sm space-y-1">
      <label className={k.label}>SPECTRAL PROMPT</label>
      <input type="text" placeholder="indigo-fuchsia-glow-mesh" className={k.input} />
      <p className="text-xs text-slate-400">Enter custom CSS gradient parameters</p>
    </div>
  );
}

export function BadgePreview({ mode }: { mode: Mode }) {
  const k = gradientModern(mode);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className={k.badge}>Prism Mesh</span>
      <span className={k.badgeOutline}>Electric Cyan</span>
      <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] text-white rounded-full shadow-sm">
        Fuchsia Glow
      </span>
    </div>
  );
}

export function ModalPreview({ mode }: { mode: Mode }) {
  const k = gradientModern(mode);
  return (
    <div className={`${k.panel} w-full max-w-md space-y-5`}>
      <div className="flex items-center justify-between">
        <h3 className={`${k.heading} text-xl font-bold`}>Deploy Spectral Shader?</h3>
        <button className="text-slate-400 hover:text-white"><X className="h-4 w-4" /></button>
      </div>
      <p className={`${k.muted} text-sm leading-relaxed`}>
        This action will compile 3D mesh gradient shaders and project smooth color glows across all active components.
      </p>
      <div className="flex justify-end gap-3 pt-2">
        <button className={k.btnSecondary}>CANCEL</button>
        <button className={k.btnPrimary}>DEPLOY SHADER</button>
      </div>
    </div>
  );
}

export function AccordionPreview({ mode }: { mode: Mode }) {
  const k = gradientModern(mode);
  const [open, setOpen] = useState(true);
  return (
    <div className={`${k.panel} w-full max-w-md divide-y divide-white/10 p-0 overflow-hidden`}>
      <div className="p-5">
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left font-semibold text-sm text-purple-400">
          <span>What are mesh gradient shaders?</span>
          <span className="text-purple-400 font-bold">{open ? "-" : "+"}</span>
        </button>
        {open && (
          <p className={`mt-3 ${k.muted} text-xs leading-relaxed`}>
            Multi-point color interpolations rendering smooth continuous spectrum transitions across translucent UI surfaces.
          </p>
        )}
      </div>
      <div className="p-5">
        <button className="w-full flex items-center justify-between text-left font-semibold text-sm text-slate-300">
          <span>Hardware Acceleration &amp; Performance</span>
          <span className="text-purple-400">+</span>
        </button>
      </div>
    </div>
  );
}

export function TooltipPreview() {
  return (
    <div className="relative inline-block">
      <div className="bg-gradient-to-r from-[#6366F1] to-[#A855F7] text-white px-3.5 py-1.5 text-xs font-medium rounded-lg shadow-lg">
        Shader: Indigo-Fuchsia-Mesh-04
      </div>
    </div>
  );
}

export function TabsPreview({ mode }: { mode: Mode }) {
  const k = gradientModern(mode);
  const [active, setActive] = useState(0);
  const tabs = ["01. MESH", "02. SHADERS", "03. PRISMS"];
  return (
    <div className="flex border-b border-white/10 w-full max-w-md font-medium text-sm">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => setActive(i)}
          className={`px-5 py-2.5 ${
            active === i ? "border-b-2 border-purple-500 text-purple-400 font-bold" : `${k.muted} hover:text-purple-300`
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export function DropdownPreview({ mode }: { mode: Mode }) {
  const k = gradientModern(mode);
  return (
    <div className={`${k.panel} w-56 p-2 space-y-1 text-sm font-medium`}>
      <a href="#" className="block px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#6366F1]/20 to-[#A855F7]/20 text-purple-300">Indigo Fuchsia Shader</a>
      <a href="#" className="block px-4 py-2.5 rounded-xl hover:bg-white/5 text-slate-300 transition-colors">Electric Cyan Mesh</a>
      <a href="#" className="block px-4 py-2.5 rounded-xl hover:bg-white/5 text-slate-300 transition-colors">Sunset Aurora Mesh</a>
    </div>
  );
}

export function SwitchPreview() {
  const [checked, setChecked] = useState(true);
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setChecked(!checked)}
        className="w-12 h-6 bg-gradient-to-r from-[#6366F1] to-[#EC4899] relative p-0.5 rounded-full shadow-md flex items-center justify-end"
      >
        <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${checked ? '' : '-translate-x-6'}`}></div>
      </button>
      <span className="text-xs font-bold text-purple-400">GRADIENT SHADOWS: {checked ? 'ACTIVE' : 'OFF'}</span>
    </div>
  );
}

export function SkeletonPreview({ mode }: { mode: Mode }) {
  const k = gradientModern(mode);
  return (
    <div className={`${k.panel} w-full max-w-sm p-6 space-y-4`}>
      <div className="h-4 bg-gradient-to-r from-[#6366F1]/40 to-[#EC4899]/40 animate-pulse rounded-full w-1/3"></div>
      <div className="h-8 bg-white/10 animate-pulse rounded-xl w-3/4"></div>
      <div className="space-y-2">
        <div className="h-3 bg-white/10 animate-pulse rounded-full w-full"></div>
        <div className="h-3 bg-white/10 animate-pulse rounded-full w-5/6"></div>
      </div>
    </div>
  );
}

export function ToastPreview({ mode }: { mode: Mode }) {
  const k = gradientModern(mode);
  return (
    <div className={`${k.panel} w-full max-w-sm p-4 border-l-4 border-l-[#EC4899] shadow-xl flex items-start gap-3`}>
      <span className="h-3 w-3 bg-gradient-to-r from-[#6366F1] to-[#EC4899] rounded-full mt-0.5 flex-shrink-0"></span>
      <div className="space-y-1">
        <p className="text-xs font-bold text-purple-300">SHADER COMPILED</p>
        <p className={`${k.muted} text-xs`}>Gradient mesh parameters saved to GPU cache.</p>
      </div>
    </div>
  );
}

export function ProgressPreview() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="flex justify-between text-xs font-bold text-purple-400">
        <span>Compiling Mesh Shaders</span>
        <span className="text-pink-400">88%</span>
      </div>
      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#EC4899] w-[88%] rounded-full shadow-lg"></div>
      </div>
    </div>
  );
}

export function AvatarPreview() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-tr from-[#6366F1] via-[#A855F7] to-[#EC4899] text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-md">
        GM
      </div>
      <div>
        <p className="font-bold text-xs text-purple-300">Prism Developer</p>
        <p className="text-[10px] text-slate-400">GPU Shader Engineer</p>
      </div>
    </div>
  );
}
