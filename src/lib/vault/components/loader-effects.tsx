"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Hourglass, Settings, TrendingUp, Sparkles, Activity } from "lucide-react";
import type { VaultMode } from "../tokens";

export function LoaderEffect({ slug, mode }: { slug: string; mode: VaultMode }) {
  const reduced = useReducedMotion();
  const dark = mode === "dark";

  // 1. Trading Candles Loader
  if (slug === "trading-candles") {
    return (
      <div className="flex items-end gap-2 h-20 p-3 bg-zinc-950 rounded-2xl border border-white/10 shadow-xl">
        {[
          { h: 35, up: true, delay: 0 },
          { h: 55, up: true, delay: 0.2 },
          { h: 25, up: false, delay: 0.4 },
          { h: 65, up: true, delay: 0.1 },
          { h: 40, up: false, delay: 0.3 },
        ].map((candle, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className={`w-[1.5px] h-3 ${candle.up ? "bg-emerald-400" : "bg-red-400"}`} />
            <motion.div
              animate={reduced ? {} : { height: [candle.h * 0.7, candle.h, candle.h * 0.7] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: candle.delay, ease: "easeInOut" }}
              className={`w-3.5 rounded-sm shadow-md ${candle.up ? "bg-emerald-500 shadow-emerald-500/30" : "bg-red-500 shadow-red-500/30"}`}
              style={{ height: `${candle.h}px` }}
            />
            <div className={`w-[1.5px] h-3 ${candle.up ? "bg-emerald-400" : "bg-red-400"}`} />
          </div>
        ))}
      </div>
    );
  }

  // 2. Generating Orb (AI Plasma Orb)
  if (slug === "generating-orb" || slug === "gradient-orb" || slug === "morphing-glow") {
    return (
      <div className="relative flex items-center justify-center">
        <div className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-cyan-400 blur-xl opacity-60 animate-pulse" />
        <motion.div
          animate={reduced ? {} : { rotate: 360, scale: [1, 1.08, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="relative w-20 h-20 rounded-full bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-400 p-1 shadow-[0_0_30px_rgba(168,85,247,0.5)] flex items-center justify-center"
        >
          <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center text-xs font-mono font-bold text-violet-300">
            <Sparkles className="w-5 h-5 text-cyan-300 animate-spin [animation-duration:8s]" />
          </div>
        </motion.div>
      </div>
    );
  }

  // 3. Hourglass
  if (slug === "hourglass") {
    return (
      <motion.div
        animate={reduced ? {} : { rotate: [0, 180, 180, 360] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="w-16 h-16 rounded-2xl bg-zinc-900 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
      >
        <Hourglass className="w-7 h-7" />
      </motion.div>
    );
  }

  // 4. Gear System
  if (slug === "gear-system") {
    return (
      <div className="relative flex items-center justify-center p-4">
        <motion.div
          animate={reduced ? {} : { rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="text-violet-400"
        >
          <Settings className="w-10 h-10" />
        </motion.div>
        <motion.div
          animate={reduced ? {} : { rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="text-cyan-400 -ml-2 -mt-4"
        >
          <Settings className="w-7 h-7" />
        </motion.div>
      </div>
    );
  }

  // 5. Aurora BPM Loader
  if (slug === "aurora-bpm-loader") {
    return (
      <div className="flex items-center gap-1.5 p-4 rounded-2xl bg-zinc-950 border border-violet-500/30">
        {[16, 32, 48, 24, 40, 56, 20, 36].map((h, i) => (
          <motion.div
            key={i}
            animate={reduced ? {} : { height: [8, h, 8] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
            className="w-1.5 rounded-full bg-gradient-to-t from-violet-600 to-cyan-400 shadow-[0_0_8px_#22d3ee]"
            style={{ height: `${h}px` }}
          />
        ))}
      </div>
    );
  }

  // Default Loader
  return (
    <div className="relative w-16 h-16 rounded-full border-4 border-violet-500/20 border-t-violet-500 animate-spin shadow-[0_0_20px_rgba(139,92,246,0.3)] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full bg-violet-600/30 animate-ping" />
    </div>
  );
}
