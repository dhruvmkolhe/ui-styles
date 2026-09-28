"use client";

import React from "react";
import type { Mode } from "@/lib/styles/types";
import { typographyFirst } from "./kit";

function ArrowRightIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function ButtonPreview({ mode }: { mode: Mode }) {
  const t = typographyFirst(mode);
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <button className={t.btnPrimary}>
        <span>READ ARTICLE</span>
        <ArrowRightIcon />
      </button>
      <button className={t.btnSecondary}>
        <span>EXPLORE ARCHIVE</span>
      </button>
    </div>
  );
}

export function CardPreview({ mode }: { mode: Mode }) {
  const t = typographyFirst(mode);
  return (
    <div className={`${t.panel} w-full max-w-md space-y-4`}>
      <div className={`flex items-center justify-between border-b ${mode === 'dark' ? 'border-slate-800' : 'border-slate-200'} pb-3`}>
        <span className={`font-sans text-[10px] uppercase tracking-widest ${t.muted}`}>ISSUE N° 42 — ESSAY</span>
        <span className={t.badge}>12 Min Read</span>
      </div>
      <h3 className={`${t.heading} text-2xl leading-tight`}>The Architecture of Written Thought</h3>
      <p className={`${t.muted} font-sans text-xs leading-relaxed`}>
        Exploring typographic hierarchies, serif-sans contrasts, and delicate line rhythms in modern digital publishing systems.
      </p>
      <div className="pt-2 flex items-center justify-between">
        <span className={`font-serif italic text-xs ${t.muted}`}>By Helena Vance</span>
        <button className={t.btnPrimarySm}>
          <span>CONTINUE</span>
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}

export function NavbarPreview({ mode }: { mode: Mode }) {
  const t = typographyFirst(mode);
  return (
    <header className={`${t.bar} flex items-center justify-between px-6 py-4 w-full`}>
      <div className="flex items-baseline gap-3">
        <a href="#" className="font-serif text-lg font-bold tracking-tight">VERBUM.</a>
        <span className={`font-sans text-[10px] uppercase tracking-widest ${t.muted}`}>JOURNAL</span>
      </div>

      <nav className="hidden md:flex items-center gap-8 font-sans text-xs uppercase tracking-widest font-medium">
        <a href="#" className={`${t.text} border-b border-current pb-0.5`}>01. ESSAYS</a>
        <a href="#" className={`${t.muted} hover:${t.text}`}>02. MONOGRAPHS</a>
        <a href="#" className={`${t.muted} hover:${t.text}`}>03. ARCHIVE</a>
      </nav>

      <button className={t.btnPrimarySm}>SUBSCRIBE</button>
    </header>
  );
}

export function InputPreview({ mode }: { mode: Mode }) {
  const t = typographyFirst(mode);
  return (
    <div className="w-full max-w-sm space-y-1.5">
      <label className={t.label}>AUTHOR SEARCH</label>
      <input type="text" placeholder="e.g. Virginia Woolf" className={t.input} defaultValue="" />
      <p className={`font-serif italic text-[11px] ${t.muted}`}>Press enter to query repository</p>
    </div>
  );
}

export function BadgePreview({ mode }: { mode: Mode }) {
  const t = typographyFirst(mode);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className={t.badge}>Editorial Pick</span>
      <span className={t.badgeOutline}>CRITIQUE</span>
      <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-mono border-b ${mode === 'dark' ? 'border-slate-600 text-slate-400' : 'border-slate-400 text-slate-600'}`}>
        VOL. IX
      </span>
    </div>
  );
}

export function ModalPreview({ mode }: { mode: Mode }) {
  const t = typographyFirst(mode);
  return (
    <div className={`${t.panel} w-full max-w-md space-y-5`}>
      <div className={`flex items-center justify-between border-b ${mode === 'dark' ? 'border-slate-800' : 'border-slate-200'} pb-3`}>
        <span className={`font-sans text-[10px] uppercase tracking-widest ${t.muted}`}>CONFIRM SUBSCRIPTION</span>
        <button className={`${t.muted} hover:${t.text}`}><XIcon /></button>
      </div>
      <h3 className={`${t.heading} text-xl`}>Join the Literary Dispatch</h3>
      <p className={`${t.muted} font-sans text-xs leading-relaxed`}>
        Delivered weekly: curated essays, typographic analysis, and interviews with design scholars.
      </p>
      <div className="flex justify-end gap-3 pt-2">
        <button className={t.btnSecondary}>DISMISS</button>
        <button className={t.btnPrimary}>CONFIRM</button>
      </div>
    </div>
  );
}

export function AccordionPreview({ mode }: { mode: Mode }) {
  const t = typographyFirst(mode);
  return (
    <div className={`${t.panel} w-full max-w-md divide-y ${mode === 'dark' ? 'divide-slate-800' : 'divide-slate-200'} p-0`}>
      <div className="p-4">
        <button className="w-full flex items-center justify-between text-left font-serif text-sm font-bold">
          <span>01. Why prioritize typography?</span>
          <span className={`font-sans text-xs ${t.muted}`}>—</span>
        </button>
        <p className={`mt-3 ${t.muted} font-sans text-xs leading-relaxed`}>
          Text makes up over 95% of information on the web. Mastering typographic contrast yields unmatched clarity.
        </p>
      </div>
      <div className="p-4">
        <button className={`w-full flex items-center justify-between text-left font-serif text-sm font-bold ${t.muted}`}>
          <span>02. Serif vs. Sans pairing rules</span>
          <span className="font-sans text-xs">+</span>
        </button>
      </div>
    </div>
  );
}

export function TooltipPreview({ mode }: { mode: Mode }) {
  return (
    <div className="relative inline-block">
      <div className={`${mode === 'dark' ? 'bg-[#F8FAFC] text-[#111111]' : 'bg-[#0F172A] text-white'} px-3 py-1 font-serif text-[11px] italic`}>
        Citation: Oxford University Press (2024)
      </div>
    </div>
  );
}

export function TabsPreview({ mode }: { mode: Mode }) {
  const t = typographyFirst(mode);
  return (
    <div className={`flex border-b ${mode === 'dark' ? 'border-slate-800' : 'border-slate-200'} w-full max-w-md font-sans text-xs`}>
      <button className={`px-5 py-2.5 ${t.text} font-bold border-b-2 border-current`}>
        01. OVERVIEW
      </button>
      <button className={`px-5 py-2.5 ${t.muted} hover:${t.text}`}>
        02. BIBLIOGRAPHY
      </button>
      <button className={`px-5 py-2.5 ${t.muted} hover:${t.text}`}>
        03. CITATIONS
      </button>
    </div>
  );
}

export function DropdownPreview({ mode }: { mode: Mode }) {
  const t = typographyFirst(mode);
  return (
    <div className={`${t.panel} w-56 p-0 divide-y ${mode === 'dark' ? 'divide-slate-800' : 'divide-slate-200'} font-sans text-xs`}>
      <div className="p-3 font-serif font-bold text-xs flex justify-between items-center">
        <span>FILTER BY CATEGORY</span>
        <span>↓</span>
      </div>
      <a href="#" className={`block p-3 ${t.text} hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors`}>Essays & Criticism</a>
      <a href="#" className={`block p-3 ${t.muted} hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors`}>Typographic Studies</a>
      <a href="#" className={`block p-3 ${t.muted} hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors`}>Author Interviews</a>
    </div>
  );
}

export function SwitchPreview({ mode }: { mode: Mode }) {
  const t = typographyFirst(mode);
  return (
    <div className="flex items-center gap-4">
      <button className={`w-10 h-5 border ${mode === 'dark' ? 'border-slate-700 bg-slate-900' : 'border-slate-300 bg-slate-200'} relative p-0.5 rounded-none`}>
        <div className={`w-4 h-3.5 ${mode === 'dark' ? 'bg-[#F8FAFC]' : 'bg-[#0F172A]'} rounded-none`} />
      </button>
      <span className={`font-serif text-xs italic ${t.muted}`}>Serif Display Mode</span>
    </div>
  );
}

export function SkeletonPreview({ mode }: { mode: Mode }) {
  const t = typographyFirst(mode);
  return (
    <div className={`${t.panel} w-full max-w-sm p-6 space-y-4`}>
      <div className={`h-3 ${mode === 'dark' ? 'bg-slate-800' : 'bg-slate-200'} animate-pulse w-1/4`} />
      <div className={`h-6 ${mode === 'dark' ? 'bg-slate-700' : 'bg-slate-300'} animate-pulse w-3/4`} />
      <div className="space-y-2">
        <div className={`h-2.5 ${mode === 'dark' ? 'bg-slate-800' : 'bg-slate-200'} animate-pulse w-full`} />
        <div className={`h-2.5 ${mode === 'dark' ? 'bg-slate-800' : 'bg-slate-200'} animate-pulse w-5/6`} />
      </div>
    </div>
  );
}

export function ToastPreview({ mode }: { mode: Mode }) {
  const t = typographyFirst(mode);
  return (
    <div className={`${t.panel} w-full max-w-sm p-4 border-l-2 ${mode === 'dark' ? 'border-l-slate-200' : 'border-l-slate-900'} flex items-start gap-3`}>
      <div className="space-y-1">
        <p className="font-serif font-bold text-xs">ARTICLE BOOKMARKED</p>
        <p className={`${t.muted} font-sans text-xs`}>Saved to your editorial reading list.</p>
      </div>
    </div>
  );
}

export function ProgressPreview({ mode }: { mode: Mode }) {
  const t = typographyFirst(mode);
  return (
    <div className="w-full max-w-sm space-y-2">
      <div className={`flex justify-between font-sans text-[10px] uppercase tracking-widest ${t.muted}`}>
        <span>READING PROGRESS</span>
        <span>68%</span>
      </div>
      <div className={`h-1 w-full ${mode === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}`}>
        <div className={`h-full ${mode === 'dark' ? 'bg-[#F8FAFC]' : 'bg-[#0F172A]'} w-[68%]`} />
      </div>
    </div>
  );
}

export function AvatarPreview({ mode }: { mode: Mode }) {
  const t = typographyFirst(mode);
  return (
    <div className="flex items-center gap-3">
      <div className={`w-9 h-9 ${mode === 'dark' ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-slate-100 text-slate-800 border-slate-300'} border flex items-center justify-center font-serif font-bold text-sm`}>
        HV
      </div>
      <div>
        <p className="font-serif font-bold text-xs">Helena Vance</p>
        <p className={`font-sans text-[10px] uppercase tracking-widest ${t.muted}`}>SENIOR EDITOR</p>
      </div>
    </div>
  );
}
