"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Layers, ShieldCheck, Zap } from "lucide-react";
import type { VaultMode } from "../tokens";

export function VisualEffect({ slug, mode }: { slug: string; mode: VaultMode }) {
  const reduced = useReducedMotion();
  const dark = mode === "dark";

  // 1. Liquid Glass (visionOS Refractive Glass)
  if (slug === "liquid-glass") {
    return (
      <div className="relative group p-1">
        <div className="absolute -inset-2 bg-gradient-to-r from-violet-600 via-pink-600 to-cyan-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-70 transition duration-500" />
        <div className="relative w-80 p-6 rounded-2xl bg-white/[0.08] backdrop-blur-2xl border border-white/[0.18] shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_1px_0_rgba(255,255,255,0.4)] text-white">
          <div className="flex justify-between items-center mb-4">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-300" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-zinc-300">
              visionOS 2.0
            </span>
          </div>
          <h4 className="text-base font-bold text-white">Liquid Glass Refraction</h4>
          <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
            Ultra-frosted specular lighting with tactile inner depth and chromatic rim lighting.
          </p>
        </div>
      </div>
    );
  }

  // 2. Spotlight Cards (Coordinated Multi-card Grid)
  if (slug === "spotlight-cards") {
    return <SpotlightCardsComponent />;
  }

  // 3. Image Reveal
  if (slug === "image-reveal") {
    return (
      <div className="group relative w-72 h-44 rounded-2xl overflow-hidden border border-white/10 shadow-2xl cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-6 text-center">
          <div>
            <h5 className="text-base font-extrabold text-white">Editorial Artwork</h5>
            <p className="text-[11px] text-pink-200 mt-1">Curated Design Asset #409</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-zinc-950 flex items-center justify-center transition-transform duration-700 ease-out group-hover:-translate-y-full">
          <span className="font-mono text-xs text-violet-400 font-bold uppercase tracking-widest flex items-center gap-2">
            HOVER TO REVEAL ↗
          </span>
        </div>
      </div>
    );
  }

  // 4. Neon Border
  if (slug === "neon-border") {
    return (
      <div className="relative p-1 rounded-2xl group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 rounded-2xl blur-md opacity-80 group-hover:opacity-100 group-hover:blur-lg transition-all duration-300 animate-pulse" />
        <div className="relative px-8 py-5 rounded-2xl bg-zinc-950 border border-cyan-400/80 text-center shadow-[0_0_20px_rgba(6,182,212,0.4)]">
          <span className="font-mono text-xs font-black tracking-[0.25em] text-cyan-300 uppercase drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
            ⚡ NEON_CYBER_MATRIX ⚡
          </span>
        </div>
      </div>
    );
  }

  return <div>Visual Effect</div>;
}

function SpotlightCardsComponent() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      className="relative flex gap-3 p-2 group"
    >
      {[
        { title: "Ultra Scalable", icon: Zap, text: "Sub-millisecond latency" },
        { title: "Bank Security", icon: ShieldCheck, text: "End-to-end encrypted" },
      ].map((card, i) => (
        <div
          key={card.title}
          className="relative w-40 p-4 rounded-xl bg-zinc-900/90 border border-white/10 overflow-hidden shadow-xl"
        >
          <div
            className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(300px circle at ${pos.x - i * 170}px ${pos.y}px, rgba(139, 92, 246, 0.35), transparent 70%)`,
            }}
          />
          <div className="relative z-10">
            <card.icon className="w-5 h-5 text-violet-400 mb-2" />
            <h5 className="text-xs font-bold text-white">{card.title}</h5>
            <p className="text-[10px] text-zinc-400 mt-1">{card.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
