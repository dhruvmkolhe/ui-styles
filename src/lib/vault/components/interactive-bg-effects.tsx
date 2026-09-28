"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { VaultMode } from "../tokens";

export function InteractiveBgEffect({ slug, mode }: { slug: string; mode: VaultMode }) {
  const reduced = useReducedMotion();
  const dark = mode === "dark";

  // 1. Matrix Rain
  if (slug === "matrix-rain") {
    return <MatrixRainCanvas />;
  }

  // 2. Spider Web (Interactive Proximity Mesh)
  if (slug === "spider-web") {
    return <SpiderWebCanvas />;
  }

  // 3. Ascii Water
  if (slug === "ascii-water") {
    return (
      <div className="w-full h-44 rounded-2xl bg-black border border-cyan-500/30 flex items-center justify-center font-mono text-cyan-400 text-xs select-none p-2 overflow-hidden">
        <div className="leading-none text-center space-y-1">
          <p className="opacity-40">~ ~ ~ ~ ~ . . . ~ ~ ~ ~ ~</p>
          <p className="opacity-70">~ ~ ~ ~ @ @ @ @ ~ ~ ~ ~ ~</p>
          <p className="opacity-100 font-bold text-cyan-300">~ ~ @ @ @ O O O @ @ ~ ~</p>
          <p className="opacity-70">~ ~ ~ ~ @ @ @ @ ~ ~ ~ ~ ~</p>
          <p className="opacity-40">~ ~ ~ ~ ~ . . . ~ ~ ~ ~ ~</p>
        </div>
      </div>
    );
  }

  // 4. Point DNA Helix
  if (slug === "point-dna-helix") {
    return (
      <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-zinc-950 border border-violet-500/30 flex items-center justify-center">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={reduced ? {} : { y: [Math.sin(i) * 25, -Math.sin(i) * 25, Math.sin(i) * 25] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
            className="flex flex-col items-center gap-4 mx-1.5"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            <div className="w-0.5 h-10 bg-gradient-to-b from-cyan-400 to-pink-500 opacity-50" />
            <span className="w-2.5 h-2.5 rounded-full bg-pink-400 shadow-[0_0_8px_#f472b6]" />
          </motion.div>
        ))}
        <div className="absolute bottom-2 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
          DNA HELIX STRUCTURE
        </div>
      </div>
    );
  }

  // 5. Rain Storm
  if (slug === "rain-storm") {
    return (
      <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-gradient-to-b from-slate-950 via-zinc-950 to-slate-900 border border-sky-500/30 p-3">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={reduced ? {} : { y: [-20, 160], x: [-10, 10], opacity: [0, 1, 0] }}
            transition={{ duration: 0.6 + (i % 4) * 0.1, repeat: Infinity, delay: i * 0.1, ease: "linear" }}
            className="absolute top-0 w-0.5 h-10 bg-gradient-to-b from-transparent to-sky-300 -rotate-12"
            style={{ left: `${10 + i * 12}%` }}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-sky-300 uppercase tracking-widest">
          THUNDERSTORM PARTICLES
        </div>
      </div>
    );
  }

  // Default interactive background
  return (
    <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-zinc-950 border border-violet-500/30 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#8b5cf633,transparent_60%)] animate-pulse" />
      <span className="relative z-10 text-xs font-mono font-bold text-violet-300 uppercase tracking-widest">
        {slug.replace(/-/g, " ").toUpperCase()}
      </span>
    </div>
  );
}

function MatrixRainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 300;
    canvas.height = 160;

    const chars = "0123456789ABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ";
    const cols = 20;
    const drops: number[] = Array(cols).fill(1);

    const interval = setInterval(() => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#10b981";
      ctx.font = "10px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * 15, drops[i] * 12);

        if (drops[i] * 12 > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-black border border-emerald-500/40 flex items-center justify-center shadow-[inset_0_0_30px_rgba(16,185,129,0.2)]">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

function SpiderWebCanvas() {
  const [mouse, setMouse] = useState({ x: 150, y: 80 });

  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      className="relative w-full h-44 rounded-2xl overflow-hidden bg-zinc-950 border border-violet-500/30 flex items-center justify-center cursor-crosshair"
    >
      <svg className="w-full h-full absolute inset-0">
        {[
          { x: 40, y: 30 },
          { x: 260, y: 40 },
          { x: 60, y: 130 },
          { x: 240, y: 130 },
          { x: 150, y: 20 },
        ].map((node, i) => (
          <g key={i}>
            <line
              x1={node.x}
              y1={node.y}
              x2={mouse.x}
              y2={mouse.y}
              stroke="rgba(139,92,246,0.6)"
              strokeWidth="1.5"
            />
            <circle cx={node.x} cy={node.y} r="3" fill="#a855f7" />
          </g>
        ))}
        <circle cx={mouse.x} cy={mouse.y} r="5" fill="#22d3ee" className="animate-ping" />
      </svg>
      <span className="relative z-10 text-[10px] font-mono text-zinc-500 uppercase tracking-widest pointer-events-none">
        Hover to Connect Nodes
      </span>
    </div>
  );
}
