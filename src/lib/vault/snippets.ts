import type { VaultItem } from "./registry";
import type { EffectTokens } from "./effect-tokens";

export function getBespokeSnippet(item: VaultItem, t: EffectTokens): string {
  const slug = item.slug;
  const name = item.name;

  // 1. Buttons
  if (slug === "corner-border") {
    return `"use client";

import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

export interface CornerBorderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  baseColor?: string;
  hoverColor?: string;
  borderColor?: string;
  style?: CSSProperties;
}

export function CornerBorderButton({
  children,
  className,
  baseColor = "#0b1a2a",
  hoverColor = "#ff3b4d",
  borderColor = "#60daff",
  style,
  ...props
}: CornerBorderButtonProps) {
  const strokeStyle = { backgroundColor: borderColor, boxShadow: "0 0 8px " + borderColor };

  return (
    <button
      {...props}
      className={cn(
        "group/btn relative isolate inline-flex min-h-[70px] min-w-[220px] items-center justify-center overflow-hidden p-4",
        "font-bold uppercase tracking-widest text-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 motion-reduce:transition-none",
        className
      )}
      style={{ backgroundColor: baseColor, ...style }}
    >
      <span aria-hidden="true" className="absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100 group-focus-visible/btn:opacity-100 motion-reduce:transition-none" style={{ backgroundColor: hoverColor }} />
      <span className="relative z-10 block w-full text-center">{children}</span>

      <span aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-20 h-1.5 w-1.5" style={{ backgroundColor: borderColor }} />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 z-20 h-1.5 w-1.5" style={{ backgroundColor: borderColor }} />

      <span aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-10 h-[2px] w-0 transition-[width] duration-300 ease-out group-hover/btn:w-full group-focus-visible/btn:w-full motion-reduce:transition-none" style={strokeStyle} />
      <span aria-hidden="true" className="pointer-events-none absolute right-0 top-0 z-10 h-0 w-[2px] transition-[height] delay-100 duration-300 ease-out group-hover/btn:h-full group-focus-visible/btn:h-full motion-reduce:transition-none" style={strokeStyle} />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 z-10 h-[2px] w-0 transition-[width] duration-300 ease-out group-hover/btn:w-full group-focus-visible/btn:w-full motion-reduce:transition-none" style={strokeStyle} />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 z-10 h-0 w-[2px] transition-[height] delay-100 duration-300 ease-out group-hover/btn:h-full group-focus-visible/btn:h-full motion-reduce:transition-none" style={strokeStyle} />
    </button>
  );
}`;
  }

  if (slug === "corner-button") {
    return `<!-- Cyberpunk Corner Button -->
<button 
  style="clip-path: polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px);"
  class="group relative px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-black tracking-wider text-xs uppercase transition-all duration-300 hover:scale-105 shadow-[0_0_25px_rgba(245,158,11,0.3)]"
>
  <div 
    style="clip-path: polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px);"
    class="absolute inset-[1.5px] bg-zinc-950 flex items-center justify-center transition-colors duration-300 group-hover:bg-transparent"
  >
    <span class="font-mono text-amber-400 group-hover:text-black font-bold tracking-widest transition-colors">
      TACTICAL OVERDRIVE ↗
    </span>
  </div>
  <span class="opacity-0 font-mono font-bold tracking-widest">
    TACTICAL OVERDRIVE ↗
  </span>
</button>`;
  }

  if (slug === "border-beam") {
    return `<!-- Border Beam Glowing Card / Button -->
<div class="relative p-[1px] overflow-hidden rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl inline-block">
  <div class="absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_280deg,#8b5cf6_340deg,#06b6d4_360deg)] animate-spin [animation-duration:4s]"></div>
  <button class="relative z-10 px-7 py-3.5 rounded-[15px] bg-zinc-950 text-white font-medium text-sm flex items-center gap-2.5 hover:bg-zinc-900 transition-colors">
    <span>Border Beam Effect</span>
    <span class="flex h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_10px_#8b5cf6]"></span>
  </button>
</div>`;
  }

  if (slug === "glow-button") {
    return `<!-- Luminous Ambient Glow Button -->
<div class="relative group inline-block">
  <div class="absolute -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
  <button class="relative px-7 py-3.5 bg-zinc-950 rounded-xl leading-none flex items-center divide-x divide-zinc-700 text-sm font-semibold text-white">
    <span class="pr-4 text-purple-200">✦ Luminous Core</span>
    <span class="pl-4 text-indigo-400 group-hover:text-indigo-200 transition duration-200">Activate &rarr;</span>
  </button>
</div>`;
  }

  // 2. 3D Hero
  if (slug === "3d-hero") {
    return `<!-- 3D Perspective Hero Stage -->
<div class="relative w-full max-w-lg h-64 [perspective:1000px] flex items-center justify-center">
  <!-- Glowing Background Grid -->
  <div class="absolute inset-0 bg-[radial-gradient(#8b5cf633_1px,transparent_1px)] [background-size:16px_16px] [transform:rotateX(60deg)_translateZ(-50px)] opacity-50"></div>
  
  <!-- Back Dashboard Layer -->
  <div class="w-72 h-44 rounded-2xl bg-zinc-950/90 border border-violet-500/40 p-4 shadow-[0_20px_50px_rgba(139,92,246,0.3)] backdrop-blur-xl [transform:rotateX(14deg)_rotateY(-14deg)] transition-transform duration-500 hover:[transform:rotateX(0deg)_rotateY(0deg)]">
    <div class="flex justify-between items-center mb-3">
      <div class="flex gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full bg-red-500"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
      </div>
      <span class="text-[10px] font-mono text-violet-400">HERO_STAGE_3D</span>
    </div>
    <div class="space-y-2">
      <div class="h-3 w-3/4 bg-violet-500/20 rounded"></div>
      <div class="h-2 w-1/2 bg-white/10 rounded"></div>
    </div>
  </div>

  <!-- Floating Foreground Metric Pill -->
  <div class="absolute -bottom-2 -right-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs shadow-xl flex items-center gap-2 border border-white/20">
    <span>✦ Realtime Analytics</span>
  </div>
</div>`;
  }

  // 3. Liquid Glass
  if (slug === "liquid-glass") {
    return `<!-- visionOS Translucent Liquid Glass Card -->
<div class="relative group p-1">
  <div class="absolute -inset-2 bg-gradient-to-r from-violet-600 via-pink-600 to-cyan-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-70 transition duration-500"></div>
  <div class="relative w-80 p-6 rounded-2xl bg-white/[0.08] backdrop-blur-2xl border border-white/[0.18] shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_1px_0_rgba(255,255,255,0.4)] text-white">
    <div class="flex justify-between items-center mb-4">
      <div class="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-cyan-300">✦</div>
      <span class="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-zinc-300">visionOS 2.0</span>
    </div>
    <h4 class="text-base font-bold text-white">Liquid Glass Refraction</h4>
    <p class="text-xs text-zinc-300 mt-1 leading-relaxed">
      Ultra-frosted specular lighting with tactile inner depth and chromatic rim lighting.
    </p>
  </div>
</div>`;
  }

  // 4. Matrix Rain
  if (slug === "matrix-rain" || slug === "hacker-background") {
    return `<!-- Cyberpunk Matrix Digital Rain -->
<div class="relative w-full max-w-lg h-48 rounded-2xl overflow-hidden bg-black border border-emerald-500/40 p-4 font-mono text-xs text-emerald-400 shadow-[inset_0_0_30px_rgba(16,185,129,0.2)]">
  <div class="space-y-1.5">
    <p class="text-emerald-300 font-bold">&gt; KERNEL_INIT: 0x8849F002 OK</p>
    <p class="opacity-80">&gt; DAEMON_ACTIVE: 4092 THREADS</p>
    <p class="opacity-60">&gt; DECRYPTING_STREAM: 100% COMPLETE</p>
    <p class="animate-pulse text-emerald-200">&gt; WAITING_FOR_INPUT _</p>
  </div>
</div>`;
  }

  // 5. OTP Code Input
  if (slug === "otp-code-input") {
    return `<!-- 6-Digit OTP Authentication Input -->
<div class="w-full max-w-sm p-5 rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl text-white">
  <h5 class="text-sm font-bold text-center mb-4">Two-Factor Authentication</h5>
  <div class="flex gap-2 justify-center">
    <input maxlength="1" class="w-10 h-12 rounded-xl bg-zinc-900 border border-zinc-700 text-center text-lg font-mono font-bold text-violet-300 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20" />
    <input maxlength="1" class="w-10 h-12 rounded-xl bg-zinc-900 border border-zinc-700 text-center text-lg font-mono font-bold text-violet-300 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20" />
    <input maxlength="1" class="w-10 h-12 rounded-xl bg-zinc-900 border border-zinc-700 text-center text-lg font-mono font-bold text-violet-300 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20" />
    <input maxlength="1" class="w-10 h-12 rounded-xl bg-zinc-900 border border-zinc-700 text-center text-lg font-mono font-bold text-violet-300 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20" />
    <input maxlength="1" class="w-10 h-12 rounded-xl bg-zinc-900 border border-zinc-700 text-center text-lg font-mono font-bold text-violet-300 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20" />
    <input maxlength="1" class="w-10 h-12 rounded-xl bg-zinc-900 border border-zinc-700 text-center text-lg font-mono font-bold text-violet-300 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20" />
  </div>
  <button class="w-full mt-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-lg transition-colors">
    Verify Code
  </button>
</div>`;
  }

  // 6. Floating Dark Capsule Nav
  if (slug === "floating-dark-capsule-nav" || slug === "pill-navbar-nav") {
    return `<!-- Floating Dark Capsule Navbar -->
<nav class="w-full max-w-md p-1.5 rounded-full bg-zinc-900/90 border border-white/10 shadow-2xl backdrop-blur-xl flex items-center justify-between">
  <div class="flex items-center gap-1 w-full">
    <button class="flex-1 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md">
      Explore
    </button>
    <button class="flex-1 py-1.5 text-xs font-semibold rounded-full text-zinc-400 hover:text-white transition-colors">
      Components
    </button>
    <button class="flex-1 py-1.5 text-xs font-semibold rounded-full text-zinc-400 hover:text-white transition-colors">
      Pricing
    </button>
  </div>
</nav>`;
  }

  // 7. Generic Fallback
  return `<!-- UI Hub Component Vault · ${name} -->
<div class="relative p-6 rounded-2xl bg-zinc-950 border border-white/10 text-white shadow-xl">
  <div class="flex items-center justify-between mb-2">
    <h3 class="text-sm font-bold">${name}</h3>
    <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/20 text-violet-300">${item.category}</span>
  </div>
  <p class="text-xs text-zinc-400">Production-grade ${item.category.toLowerCase()} kit with copy-ready Tailwind CSS.</p>
</div>`;
}
