"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Layers, Sparkles } from "lucide-react";
import type { VaultMode } from "../tokens";

export function ScrollEffect({ slug, mode }: { slug: string; mode: VaultMode }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);

  // 1. SVG Page Transition
  if (slug === "svg-page-transition") {
    return (
      <div className="relative w-72 h-44 rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 flex flex-col items-center justify-center p-4">
        <motion.path
          animate={{ d: ["M 0 0 Q 50 20 100 0 L 100 100 L 0 100 Z", "M 0 0 Q 50 -20 100 0 L 100 100 L 0 100 Z", "M 0 0 Q 50 20 100 0 L 100 100 L 0 100 Z"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="text-xs font-mono font-bold text-violet-400 uppercase tracking-widest">
          SVG CURVED TRANSITION
        </span>
        <p className="text-[10px] text-zinc-400 mt-1">Bezier liquid page transition</p>
      </div>
    );
  }

  // 2. Infinite Marquee
  if (slug === "infinite-marquee") {
    return (
      <div className="w-80 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 py-3">
        <div className="flex gap-4 animate-marquee whitespace-nowrap text-xs font-mono font-bold text-violet-300">
          <span>REACT 19 · NEXT.JS 16 · TAILWIND CSS · FRAMER MOTION ·&nbsp;</span>
          <span>REACT 19 · NEXT.JS 16 · TAILWIND CSS · FRAMER MOTION ·&nbsp;</span>
        </div>
      </div>
    );
  }

  // Default Scroll
  return (
    <button
      onClick={() => setActive(!active)}
      className="w-72 p-4 rounded-2xl bg-zinc-900 border border-white/10 text-left hover:border-violet-500/50 transition-all shadow-xl"
    >
      <div className="flex justify-between text-[10px] font-mono text-zinc-400">
        <span>TIMELINE SCROLL</span>
        <span>{active ? "STAGE 02/02" : "STAGE 01/02"}</span>
      </div>
      <h5 className="text-sm font-bold text-white mt-2">
        {active ? "Expanded Stage Content" : "Scroll to Expand"}
      </h5>
      <div className="mt-3 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div
          animate={{ width: active ? "100%" : "40%" }}
          className="h-full bg-violet-500 rounded-full"
        />
      </div>
    </button>
  );
}
