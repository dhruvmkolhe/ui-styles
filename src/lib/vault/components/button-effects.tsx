"use client";

import { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Loader2, ArrowRight, Share2, Send, Globe, MessageSquare, Sparkles, CreditCard } from "lucide-react";
import type { VaultMode } from "../tokens";

export function ButtonEffect({ slug, mode }: { slug: string; mode: VaultMode }) {
  const reduced = useReducedMotion();
  const dark = mode === "dark";

  // 1. Corner Border
  if (slug === "corner-border") {
    return (
      <button
        className={`group/btn relative isolate inline-flex min-h-[70px] min-w-[220px] items-center justify-center overflow-hidden border border-cyan-400/20 p-4 font-mono text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_22px_rgba(6,182,212,0.12)] transition-[border-color,box-shadow,color] duration-300 hover:border-cyan-300/70 hover:text-white hover:shadow-[0_0_30px_rgba(6,182,212,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#07090e] motion-reduce:transition-none ${dark ? "text-cyan-100" : "text-slate-900"}`}
        style={{ backgroundColor: dark ? "#0b1a2a" : "#f1f8fb" }}
      >
        <span aria-hidden="true" className="absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100 group-focus-visible/btn:opacity-100 motion-reduce:transition-none" style={{ backgroundColor: "#ff3b4d" }} />
        <span className="relative z-10 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]" />
          INITIALIZE_SYSTEM
        </span>
        <span aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-20 h-1.5 w-1.5 bg-cyan-300" />
        <span aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 z-20 h-1.5 w-1.5 bg-cyan-300" />
        <span aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-10 h-[2px] w-0 bg-cyan-300 shadow-[0_0_8px_#60daff] transition-[width] duration-300 ease-out group-hover/btn:w-full group-focus-visible/btn:w-full motion-reduce:transition-none" />
        <span aria-hidden="true" className="pointer-events-none absolute right-0 top-0 z-10 h-0 w-[2px] bg-cyan-300 shadow-[0_0_8px_#60daff] transition-[height] delay-100 duration-300 ease-out group-hover/btn:h-full group-focus-visible/btn:h-full motion-reduce:transition-none" />
        <span aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 z-10 h-[2px] w-0 bg-cyan-300 shadow-[0_0_8px_#60daff] transition-[width] duration-300 ease-out group-hover/btn:w-full group-focus-visible/btn:w-full motion-reduce:transition-none" />
        <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 z-10 h-0 w-[2px] bg-cyan-300 shadow-[0_0_8px_#60daff] transition-[height] delay-100 duration-300 ease-out group-hover/btn:h-full group-focus-visible/btn:h-full motion-reduce:transition-none" />
      </button>
    );
  }

  // 2. Corner Button (Cyberpunk Angled Cut)
  if (slug === "corner-button") {
    return (
      <button 
        style={{ clipPath: "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)" }}
        className="group relative px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-black tracking-wider text-xs uppercase transition-all duration-300 hover:scale-105 hover:from-amber-400 hover:to-orange-500 shadow-[0_0_25px_rgba(245,158,11,0.3)]"
      >
        <div 
          style={{ clipPath: "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)" }}
          className="absolute inset-[1.5px] bg-zinc-950 flex items-center justify-center transition-colors duration-300 group-hover:bg-transparent"
        >
          <span className="font-mono text-amber-400 group-hover:text-black font-bold tracking-widest transition-colors flex items-center gap-2">
            TACTICAL OVERDRIVE ↗
          </span>
        </div>
        <span className="opacity-0 font-mono font-bold tracking-widest flex items-center gap-2">
          TACTICAL OVERDRIVE ↗
        </span>
      </button>
    );
  }

  // 3. Creepy Button (Interactive Tracking Eyes)
  if (slug === "creepy-button") {
    return <CreepyButtonComponent />;
  }

  // 4. Radial Glow Button (Mouse Follower Glow)
  if (slug === "radial-glow-button") {
    return <RadialGlowButtonComponent />;
  }

  // 5. Border Beam
  if (slug === "border-beam") {
    return (
      <div className="relative p-[1px] overflow-hidden rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl">
        <motion.div
          animate={reduced ? {} : { rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_280deg,#8b5cf6_340deg,#06b6d4_360deg)]"
        />
        <button className="relative z-10 px-7 py-3.5 rounded-[15px] bg-zinc-950 text-white font-medium text-sm flex items-center gap-2.5 hover:bg-zinc-900 transition-colors">
          <span>Border Beam Effect</span>
          <span className="flex h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_10px_#8b5cf6]" />
        </button>
      </div>
    );
  }

  // 6. Glow Button
  if (slug === "glow-button") {
    return (
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse" />
        <button className="relative px-7 py-3.5 bg-zinc-950 rounded-xl leading-none flex items-center divide-x divide-zinc-700 text-sm font-semibold text-white">
          <span className="flex items-center gap-2 pr-4 text-purple-200">
            <Sparkles className="w-4 h-4 text-purple-400" />
            Luminous Core
          </span>
          <span className="pl-4 text-indigo-400 group-hover:text-indigo-200 transition duration-200">
            Activate &rarr;
          </span>
        </button>
      </div>
    );
  }

  // 7. Marquee Hover Button
  if (slug === "marquee-hover") {
    return (
      <button className="group relative overflow-hidden rounded-full border border-violet-500/30 bg-zinc-950 px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-violet-500 hover:shadow-[0_0_25px_rgba(139,92,246,0.3)]">
        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-[150%]">
          Explore Library ✦
        </span>
        <div className="absolute inset-0 flex items-center overflow-hidden translate-y-[150%] transition-transform duration-300 group-hover:translate-y-0">
          <div className="flex animate-marquee whitespace-nowrap text-xs font-mono tracking-widest text-violet-300">
            <span>EXPLORE UI HUB · SHIP FASTER · COPY TOKENS ·&nbsp;</span>
            <span>EXPLORE UI HUB · SHIP FASTER · COPY TOKENS ·&nbsp;</span>
          </div>
        </div>
      </button>
    );
  }

  // 8. Payment Transaction Button
  if (slug === "payment-transaction") {
    return <PaymentTransactionComponent />;
  }

  // 9. Magic Card Effect
  if (slug === "magic-card-effect") {
    return <MagicCardComponent />;
  }

  // 10. Rainbow Button
  if (slug === "rainbow-button") {
    return (
      <button className="group relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-bold uppercase tracking-wider rounded-xl hover:scale-105 transition-transform duration-200">
        <span className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-400 via-green-500 via-blue-500 to-purple-600 animate-spin [animation-duration:3s]" />
        <span className="relative px-6 py-3 rounded-[10px] bg-zinc-950 text-white transition-colors duration-200 group-hover:bg-transparent group-hover:text-black">
          Rainbow Prism 🌈
        </span>
      </button>
    );
  }

  // 11. Social Tooltip Hover Buttons
  if (slug === "social-tooltip-hover-buttons") {
    return (
      <div className="flex items-center gap-3">
        {[
          { icon: Globe, label: "Website", color: "hover:bg-zinc-800" },
          { icon: Send, label: "Telegram", color: "hover:bg-sky-600" },
          { icon: MessageSquare, label: "Discord", color: "hover:bg-indigo-600" },
          { icon: Share2, label: "Share", color: "hover:bg-pink-600" },
        ].map((item) => (
          <div key={item.label} className="group relative">
            <button className={`w-11 h-11 rounded-2xl border border-white/10 bg-zinc-900 flex items-center justify-center text-zinc-300 transition-all duration-300 ${item.color} hover:text-white hover:-translate-y-1 shadow-lg`}>
              <item.icon className="w-4 h-4" />
            </button>
            <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-top-10 transition-all duration-200 px-2 py-1 rounded bg-zinc-800 text-[10px] font-medium text-white shadow-xl whitespace-nowrap">
              {item.label}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 12. Orbit Button
  if (slug === "orbit-button") {
    return (
      <div className="relative flex items-center justify-center p-8">
        <div className="absolute w-28 h-28 rounded-full border border-violet-500/20 animate-spin [animation-duration:6s]" />
        <div className="absolute w-28 h-28 rounded-full animate-spin [animation-duration:6s]">
          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
        </div>
        <div className="absolute w-36 h-36 rounded-full border border-pink-500/20 animate-spin [animation-duration:9s] [animation-direction:reverse]" />
        <div className="absolute w-36 h-36 rounded-full animate-spin [animation-duration:9s] [animation-direction:reverse]">
          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-pink-400 shadow-[0_0_12px_#f472b6]" />
        </div>
        <button className="relative z-10 px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-xs shadow-lg hover:shadow-violet-500/30 transition-all">
          Orbital Node
        </button>
      </div>
    );
  }

  // 13. Galaxy Button
  if (slug === "galaxy-button") {
    return (
      <button className="relative px-8 py-3.5 rounded-full overflow-hidden border border-purple-500/40 bg-zinc-950 text-white font-medium text-xs tracking-wider uppercase group shadow-[0_0_30px_rgba(168,85,247,0.25)] hover:border-purple-400 transition-all duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#a855f733,transparent_70%),radial-gradient(ellipse_at_bottom,#3b82f633,transparent_70%)] group-hover:scale-125 transition-transform duration-500" />
        <span className="relative z-10 flex items-center gap-2 text-purple-200">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin [animation-duration:4s]" />
          ENTER THE COSMOS
        </span>
      </button>
    );
  }

  // 14. Interactive Hover Button
  if (slug === "interactive-hover-button") {
    return (
      <button className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/10 bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-xl transition-all duration-300 hover:bg-violet-600 hover:pr-10">
        <span>Get Started</span>
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover:translate-x-2 group-hover:bg-white group-hover:text-violet-600">
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </button>
    );
  }

  // 15. Super Mario
  if (slug === "super-mario") {
    return <SuperMarioComponent />;
  }

  return (
    <button className="px-6 py-3 rounded-xl bg-violet-600 text-white font-semibold text-sm shadow-lg hover:bg-violet-500 transition-all">
      Interactive Button
    </button>
  );
}

// Helpers
function CreepyButtonComponent() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setPos({ x: x * 6, y: y * 6 });
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      className="group relative px-7 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-700 text-white font-semibold text-sm flex items-center gap-3 shadow-xl hover:border-purple-500 transition-all"
    >
      <div className="flex gap-1.5 items-center bg-zinc-800 p-1.5 rounded-lg border border-zinc-700">
        <div className="w-3.5 h-3.5 rounded-full bg-white relative overflow-hidden">
          <div 
            className="w-1.5 h-1.5 rounded-full bg-black absolute top-1 left-1 transition-transform duration-75"
            style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
          />
        </div>
        <div className="w-3.5 h-3.5 rounded-full bg-white relative overflow-hidden">
          <div 
            className="w-1.5 h-1.5 rounded-full bg-black absolute top-1 left-1 transition-transform duration-75"
            style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
          />
        </div>
      </div>
      <span>Watching You</span>
    </button>
  );
}

function RadialGlowButtonComponent() {
  const [coord, setCoord] = useState({ x: 50, y: 50 });
  return (
    <button
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setCoord({
          x: ((e.clientX - r.left) / r.width) * 100,
          y: ((e.clientY - r.top) / r.height) * 100,
        });
      }}
      style={{
        backgroundImage: `radial-gradient(120px circle at ${coord.x}% ${coord.y}%, rgba(139, 92, 246, 0.4), transparent 80%)`,
      }}
      className="relative px-8 py-3.5 rounded-2xl bg-zinc-900 border border-violet-500/40 text-white font-semibold text-sm shadow-[0_0_20px_rgba(139,92,246,0.15)] hover:border-violet-400 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all"
    >
      Radial Glow Cursor
    </button>
  );
}

function PaymentTransactionComponent() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const trigger = () => {
    if (status !== "idle") return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2400);
    }, 1400);
  };

  return (
    <button
      onClick={trigger}
      disabled={status !== "idle"}
      className="relative min-w-[190px] h-12 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-sm shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all flex items-center justify-center gap-2"
    >
      {status === "idle" && (
        <>
          <CreditCard className="w-4 h-4" />
          <span>Pay \$49.00</span>
        </>
      )}
      {status === "loading" && (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Processing...</span>
        </>
      )}
      {status === "success" && (
        <>
          <Check className="w-4 h-4" />
          <span>Payment Complete!</span>
        </>
      )}
    </button>
  );
}

function MagicCardComponent() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      className="relative w-64 p-5 rounded-2xl bg-zinc-950 border border-white/10 overflow-hidden shadow-2xl group"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(250px circle at ${pos.x}px ${pos.y}px, rgba(139, 92, 246, 0.25), transparent 70%)`,
        }}
      />
      <div className="relative z-10">
        <div className="w-8 h-8 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center mb-3">
          ✦
        </div>
        <h4 className="text-sm font-bold text-white">Magic Card</h4>
        <p className="text-xs text-zinc-400 mt-1">
          Spotlight border and reactive surface illumination.
        </p>
      </div>
    </div>
  );
}

function SuperMarioComponent() {
  const [coins, setCoins] = useState<number[]>([]);
  const triggerCoin = () => {
    const id = Date.now();
    setCoins((prev) => [...prev, id]);
    setTimeout(() => {
      setCoins((prev) => prev.filter((c) => c !== id));
    }, 800);
  };

  return (
    <div className="relative flex flex-col items-center">
      {coins.map((c) => (
        <motion.div
          key={c}
          initial={{ y: 0, opacity: 1, scale: 0.8 }}
          animate={{ y: -45, opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.7 }}
          className="absolute -top-3 font-mono font-black text-amber-400 text-xs shadow-black drop-shadow-[0_2px_2px_rgba(0,0,0,1)]"
        >
          🪙 +200
        </motion.div>
      ))}
      <motion.button
        whileTap={{ y: -4 }}
        onClick={triggerCoin}
        className="w-14 h-14 rounded-md bg-amber-500 border-4 border-amber-600 border-t-amber-300 border-l-amber-300 shadow-[0_6px_0_#b45309] active:translate-y-1 active:shadow-none flex items-center justify-center text-white font-mono text-2xl font-black select-none"
      >
        ?
      </motion.button>
    </div>
  );
}
