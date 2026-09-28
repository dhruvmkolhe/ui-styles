"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Crosshair, Heart, MousePointer2 } from "lucide-react";
import type { VaultMode } from "../tokens";

export function CursorEffect({ slug, mode }: { slug: string; mode: VaultMode }) {
  const reduced = useReducedMotion();
  const dark = mode === "dark";

  // 1. Target Cursor (Tactical HUD)
  if (slug === "target-cursor") {
    return <TargetCursorComponent />;
  }

  // 2. User Cursor (Figma Multiplayer)
  if (slug === "user-cursor") {
    return (
      <div className="relative w-72 h-44 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center p-4 overflow-hidden">
        <motion.div
          animate={reduced ? {} : { x: [-30, 40, -10, -30], y: [-20, 20, -15, -20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex items-start gap-1"
        >
          <MousePointer2 className="w-5 h-5 text-indigo-400 fill-indigo-400" />
          <div className="px-2.5 py-1 rounded-full bg-indigo-500 text-white font-mono text-[10px] font-bold shadow-lg flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping" />
            Sarah K. (Product)
          </div>
        </motion.div>
      </div>
    );
  }

  // 3. Heart Cursor
  if (slug === "heart-cursor") {
    return (
      <div className="relative w-72 h-44 rounded-2xl bg-zinc-950 border border-pink-500/30 flex items-center justify-center overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={reduced ? {} : { y: [20, -70], opacity: [1, 0], scale: [0.6, 1.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            className="absolute text-pink-500"
            style={{ left: `${30 + i * 10}%` }}
          >
            💜
          </motion.div>
        ))}
        <span className="text-xs font-mono font-bold text-pink-300 uppercase tracking-widest">
          FLOATING HEART EMITTER
        </span>
      </div>
    );
  }

  // Default Cursor Canvas
  return <InteractiveCursorCanvas slug={slug} />;
}

function TargetCursorComponent() {
  const [pos, setPos] = useState({ x: 140, y: 80 });

  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      className="relative w-72 h-44 rounded-2xl bg-zinc-950 border border-cyan-500/40 overflow-hidden flex items-center justify-center cursor-none"
    >
      <div
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
        style={{ left: pos.x, top: pos.y }}
      >
        <Crosshair className="w-8 h-8 text-cyan-400 animate-spin [animation-duration:10s]" />
        <span className="font-mono text-[8px] text-cyan-300 bg-cyan-950/80 px-1 rounded border border-cyan-500/40 mt-1">
          X:{Math.round(pos.x)} Y:{Math.round(pos.y)}
        </span>
      </div>
      <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
        HUD TARGET ACQUISITION
      </span>
    </div>
  );
}

function InteractiveCursorCanvas({ slug }: { slug: string }) {
  const [pos, setPos] = useState({ x: 140, y: 80 });

  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      className="relative w-72 h-44 rounded-2xl bg-zinc-950 border border-violet-500/30 overflow-hidden flex items-center justify-center cursor-none"
    >
      <div
        className="pointer-events-none absolute w-16 h-16 rounded-full bg-violet-500/30 blur-md -translate-x-1/2 -translate-y-1/2 transition-all duration-75"
        style={{ left: pos.x, top: pos.y }}
      />
      <div
        className="pointer-events-none absolute w-3 h-3 rounded-full bg-violet-400 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#8b5cf6]"
        style={{ left: pos.x, top: pos.y }}
      />
      <span className="text-xs font-mono font-bold text-violet-300 uppercase tracking-widest">
        {slug.replace(/-/g, " ").toUpperCase()}
      </span>
    </div>
  );
}
