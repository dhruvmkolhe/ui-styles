"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { VaultMode } from "../tokens";

export function BackgroundEffect({ slug, mode }: { slug: string; mode: VaultMode }) {
  const reduced = useReducedMotion();
  const dark = mode === "dark";

  // 1. Hacker Background (Phosphor Green Matrix Stream)
  if (slug === "hacker-background") {
    return (
      <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-black border border-emerald-500/40 p-3 font-mono text-[10px] text-emerald-400 select-none shadow-[inset_0_0_30px_rgba(16,185,129,0.2)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle,#10b98115_1px,transparent_1px)] [background-size:12px_12px]" />
        <div className="relative z-10 leading-relaxed space-y-1">
          <p className="text-emerald-300 font-bold">&gt; KERNEL_INIT: 0x8849F002 OK</p>
          <p className="opacity-80">&gt; SYNC_DAEMON [PID: 4092] ACTIVE</p>
          <p className="opacity-60">&gt; INJECT_PAYLOAD: 100% COMPLETE</p>
          <p className="opacity-40">&gt; QUANTUM_ENTANGLEMENT_ESTABLISHED</p>
          <p className="animate-pulse text-emerald-200">&gt; READY_FOR_COMMAND _</p>
        </div>
      </div>
    );
  }

  // 2. Beam Grid Background
  if (slug === "beam-grid-background" || slug === "kinetic-grid") {
    return (
      <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-zinc-950 border border-violet-500/30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8b5cf618_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf618_1px,transparent_1px)] [background-size:24px_24px]" />
        <motion.div
          animate={reduced ? {} : { x: ["-100%", "200%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute top-12 left-0 h-[2px] w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#06b6d4]"
        />
        <motion.div
          animate={reduced ? {} : { y: ["-100%", "200%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
          className="absolute top-0 left-24 w-[2px] h-32 bg-gradient-to-b from-transparent via-violet-400 to-transparent shadow-[0_0_15px_#8b5cf6]"
        />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-violet-300 uppercase tracking-widest">
          BEAM GRID SYSTEM
        </div>
      </div>
    );
  }

  // 3. Fall Beam Background
  if (slug === "fall-beam-background") {
    return (
      <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 flex justify-around">
        {[20, 45, 70, 85].map((left, i) => (
          <motion.div
            key={i}
            animate={reduced ? {} : { y: ["-50px", "200px"], opacity: [0, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
            className="w-0.5 h-20 bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_#22d3ee]"
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest">
          CASCADE BEAMS
        </div>
      </div>
    );
  }

  // 4. Hell Background (Ember Magma)
  if (slug === "hell-background") {
    return (
      <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-gradient-to-t from-red-950 via-zinc-950 to-black border border-red-500/40 p-4">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(ellipse_at_bottom,#ef444455,transparent_70%)] animate-pulse" />
        {[...Array(6)].map((_, i) => (
          <motion.span
            key={i}
            animate={reduced ? {} : { y: [0, -90], x: [0, (i % 2 ? 1 : -1) * 20], opacity: [1, 0], scale: [1, 0.4] }}
            transition={{ duration: 2.2 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
            className="absolute bottom-2 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b]"
            style={{ left: `${15 + i * 14}%`, width: `${4 + (i % 3) * 2}px`, height: `${4 + (i % 3) * 2}px` }}
          />
        ))}
        <div className="relative z-10 text-center flex flex-col items-center justify-center h-full">
          <span className="text-xs font-black tracking-widest text-red-400 uppercase font-mono">
            INFERNO VOLCANIC ABYSS
          </span>
        </div>
      </div>
    );
  }

  // 5. Star Burst
  if (slug === "star-burst") {
    return (
      <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 flex items-center justify-center">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={reduced ? {} : { scale: [0.2, 2.5], opacity: [1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.15, ease: "easeOut" }}
            className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_15px_#ffffff]"
            style={{
              transform: `rotate(${i * 30}deg) translateX(${30 + i * 4}px)`,
            }}
          />
        ))}
        <span className="relative z-10 text-xs font-mono font-black text-white uppercase tracking-widest">
          WARP SPEED STAR BURST
        </span>
      </div>
    );
  }

  // Default rich background
  return (
    <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#8b5cf622,transparent_50%),radial-gradient(circle_at_70%_70%,#06b6d422,transparent_50%)]" />
      <span className="relative z-10 text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest">
        {slug.replace(/-/g, " ").toUpperCase()}
      </span>
    </div>
  );
}
