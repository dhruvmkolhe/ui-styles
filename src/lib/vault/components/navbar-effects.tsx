"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Command, ArrowRight, Search, Bell, Menu, Volume2 } from "lucide-react";
import type { VaultMode } from "../tokens";

export function NavbarEffect({ slug, mode }: { slug: string; mode: VaultMode }) {
  const reduced = useReducedMotion();
  const [activeTab, setActiveTab] = useState("Explore");

  // 1. Cinematic Nav
  if (slug === "cinematic-nav") {
    return (
      <nav className="w-full max-w-lg px-5 py-3 rounded-full bg-zinc-950/80 border border-white/15 backdrop-blur-2xl shadow-2xl flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <span className="font-serif italic font-bold tracking-wider text-sm">CINEMA</span>
          <Volume2 className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
        </div>
        <div className="flex items-center gap-4 text-xs font-mono tracking-widest text-zinc-300">
          <span className="hover:text-white cursor-pointer transition-colors">STORY</span>
          <span className="hover:text-white cursor-pointer transition-colors">CAST</span>
          <span className="hover:text-white cursor-pointer transition-colors">GALLERY</span>
        </div>
        <button className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[10px] font-mono tracking-widest uppercase border border-white/10 transition-colors">
          Watch ↗
        </button>
      </nav>
    );
  }

  // 2. Floating Dark Capsule Nav (Magnetic Pill Slider)
  if (slug === "floating-dark-capsule-nav" || slug === "pill-navbar-nav") {
    const links = ["Explore", "Components", "Pricing", "Docs"];
    return (
      <nav className="w-full max-w-md p-1.5 rounded-full bg-zinc-900/90 border border-white/10 shadow-2xl backdrop-blur-xl flex items-center justify-between">
        <div className="flex items-center gap-1 w-full">
          {links.map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative flex-1 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                  isSelected ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 shadow-md"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  // 3. Minimal AI Capsule Nav
  if (slug === "minimal-ai-capsule-nav") {
    return (
      <nav className="w-full max-w-lg px-4 py-2.5 rounded-full bg-zinc-950 border border-violet-500/40 shadow-[0_0_25px_rgba(139,92,246,0.2)] flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-400 flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span className="font-bold text-xs">AI Studio</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
            GPT-4o Live
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs text-zinc-400">
            <Search className="w-3 h-3" />
            <span className="text-[11px]">Ask anything...</span>
          </div>
        </div>
      </nav>
    );
  }

  // 4. Modern Dark Nav (Linear / Raycast Style)
  if (slug === "modern-dark-nav") {
    return (
      <nav className="w-full max-w-xl px-5 py-3 rounded-2xl bg-zinc-950/95 border border-white/10 shadow-2xl flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-white/10 flex items-center justify-center font-bold text-xs">
            ▲
          </div>
          <span className="font-semibold text-xs tracking-tight">LINEAR_HUB</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-zinc-400">
          <span className="hover:text-white cursor-pointer">Projects</span>
          <span className="hover:text-white cursor-pointer">Roadmap</span>
          <span className="hover:text-white cursor-pointer">Insights</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-[10px] text-zinc-300 font-mono">
            <Command className="w-3 h-3" /> K
          </div>
        </div>
      </nav>
    );
  }

  // 5. Split Navigation Nav / Awwwards Nav
  return (
    <nav className="w-full max-w-xl px-6 py-3 rounded-2xl bg-zinc-900/90 border border-white/10 shadow-xl flex items-center justify-between text-white">
      <strong className="text-sm font-black tracking-tight">
        UI<span className="text-violet-400">HUB</span>
      </strong>
      <div className="flex items-center gap-4 text-xs font-medium text-zinc-300">
        <span className="hover:text-violet-400 cursor-pointer">Works</span>
        <span className="hover:text-violet-400 cursor-pointer">About</span>
        <span className="hover:text-violet-400 cursor-pointer">Contact</span>
      </div>
      <button className="px-4 py-1.5 rounded-full bg-violet-600 hover:bg-violet-500 text-xs font-semibold text-white shadow-lg transition-all">
        Launch ↗
      </button>
    </nav>
  );
}
