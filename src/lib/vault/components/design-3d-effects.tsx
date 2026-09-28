"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Layers, Box, Cpu, Sparkles, Orbit, Compass } from "lucide-react";
import type { VaultMode } from "../tokens";

export function Design3DEffect({ slug, mode }: { slug: string; mode: VaultMode }) {
  const reduced = useReducedMotion();
  const dark = mode === "dark";

  // 1. 3D Hero Stage (Multi-layered Floating UI Stage)
  if (slug === "3d-hero") {
    return (
      <div className="relative w-80 h-48 [perspective:1000px] flex items-center justify-center">
        {/* Background Glowing Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#8b5cf633_1px,transparent_1px)] [background-size:16px_16px] [transform:rotateX(60deg)_translateZ(-50px)] opacity-50" />
        
        {/* Back Layer Dashboard */}
        <motion.div
          animate={reduced ? {} : { rotateX: [12, 16, 12], rotateY: [-16, -12, -16] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-64 h-36 rounded-2xl bg-zinc-950/90 border border-violet-500/40 p-4 shadow-[0_20px_50px_rgba(139,92,246,0.3)] backdrop-blur-xl"
        >
          <div className="flex justify-between items-center mb-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-[10px] font-mono text-violet-400">HERO_STAGE_3D</span>
          </div>
          <div className="space-y-1.5">
            <div className="h-3 w-3/4 bg-violet-500/20 rounded" />
            <div className="h-2 w-1/2 bg-white/10 rounded" />
          </div>
        </motion.div>

        {/* Floating Foreground Badge */}
        <motion.div
          animate={reduced ? {} : { y: [-6, 6, -6], rotateZ: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-2 -right-2 z-20 px-3.5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs shadow-xl flex items-center gap-1.5 border border-white/20"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span>Realtime Metrics</span>
        </motion.div>
      </div>
    );
  }

  // 2. 3D Scroll Animation (Isometric Unfolding Viewport)
  if (slug === "3d-scroll-animation") {
    return (
      <div className="relative w-72 h-44 [perspective:900px] flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={reduced ? {} : { translateY: [i * -12, (i - 1) * -16, i * -12] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
            className="absolute w-52 h-28 rounded-xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-cyan-500/30 shadow-2xl p-3 flex flex-col justify-between"
            style={{
              transform: `rotateX(55deg) rotateZ(-30deg) translateZ(${i * 24}px)`,
              zIndex: 10 - i,
            }}
          >
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-mono text-cyan-400">LAYER_0{i + 1}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            </div>
            <div className="h-1.5 w-full bg-cyan-500/20 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-400 w-2/3" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  // 3. 3D Slider (Cube Prism)
  if (slug === "3d-slider") {
    return (
      <div className="relative w-64 h-40 [perspective:800px] flex items-center justify-center">
        <motion.div
          animate={reduced ? {} : { rotateY: [0, 90, 180, 270, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="relative w-36 h-36 [transform-style:preserve-3d]"
        >
          {/* Front */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 border border-white/30 flex items-center justify-center text-white font-bold text-xs [transform:translateZ(72px)] shadow-2xl">
            FACE · A
          </div>
          {/* Back */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 border border-white/30 flex items-center justify-center text-white font-bold text-xs [transform:rotateY(180deg)_translateZ(72px)] shadow-2xl">
            FACE · B
          </div>
          {/* Right */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 border border-white/30 flex items-center justify-center text-white font-bold text-xs [transform:rotateY(90deg)_translateZ(72px)] shadow-2xl">
            FACE · C
          </div>
          {/* Left */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 border border-white/30 flex items-center justify-center text-white font-bold text-xs [transform:rotateY(-90deg)_translateZ(72px)] shadow-2xl">
            FACE · D
          </div>
        </motion.div>
      </div>
    );
  }

  // 4. 3D Rubik's Cube
  if (slug === "3d-rubik-s-cube") {
    return <RubiksCubeComponent />;
  }

  // 5. Cards Beam (Luminous Beams Shooting Through Stack)
  if (slug === "cards-beam") {
    return (
      <div className="relative w-72 h-44 flex items-center justify-center [perspective:800px]">
        {/* Laser beam */}
        <div className="absolute -inset-y-4 w-1 bg-gradient-to-b from-cyan-400 via-violet-400 to-transparent shadow-[0_0_20px_#22d3ee] z-20 animate-pulse" />
        
        <div className="w-48 h-32 rounded-2xl bg-zinc-900 border border-cyan-500/40 shadow-2xl [transform:rotateX(45deg)] flex flex-col justify-between p-3.5">
          <span className="text-[10px] font-mono text-cyan-400 font-bold">BEAM EMITTER #01</span>
          <div className="h-1 bg-cyan-400/40 rounded-full" />
        </div>
      </div>
    );
  }

  // 6. Solar System
  if (slug === "solar-system") {
    return (
      <div className="relative w-64 h-44 flex items-center justify-center [perspective:600px]">
        {/* Sun Core */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 shadow-[0_0_25px_#f59e0b] animate-pulse z-10" />
        
        {/* Orbit Ring 1 */}
        <div className="absolute w-28 h-28 rounded-full border border-violet-500/30 [transform:rotateX(65deg)] animate-spin [animation-duration:5s]">
          <span className="absolute -top-1 left-1/2 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
        </div>

        {/* Orbit Ring 2 */}
        <div className="absolute w-44 h-44 rounded-full border border-pink-500/30 [transform:rotateX(65deg)] animate-spin [animation-duration:9s] [animation-direction:reverse]">
          <span className="absolute -bottom-1.5 left-1/2 w-3 h-3 rounded-full bg-pink-400 shadow-[0_0_10px_#f472b6]" />
        </div>
      </div>
    );
  }

  return <div>3D Effect</div>;
}

function RubiksCubeComponent() {
  return (
    <div className="relative w-64 h-44 flex items-center justify-center [perspective:800px]">
      <motion.div
        animate={{ rotateX: [15, 30, 15], rotateY: [0, 360] }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        className="relative w-24 h-24 [transform-style:preserve-3d]"
      >
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0.5 p-1 rounded-xl bg-black border border-white/20 [transform:translateZ(48px)]">
          {["#ef4444", "#3b82f6", "#22c55e", "#eab308", "#f97316", "#ffffff", "#ef4444", "#3b82f6", "#22c55e"].map((c, i) => (
            <div key={i} className="rounded-sm" style={{ backgroundColor: c }} />
          ))}
        </div>
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0.5 p-1 rounded-xl bg-black border border-white/20 [transform:rotateY(90deg)_translateZ(48px)]">
          {["#3b82f6", "#22c55e", "#eab308", "#ffffff", "#ef4444", "#3b82f6", "#22c55e", "#f97316", "#ffffff"].map((c, i) => (
            <div key={i} className="rounded-sm" style={{ backgroundColor: c }} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
