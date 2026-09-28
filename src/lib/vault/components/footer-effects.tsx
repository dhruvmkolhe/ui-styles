"use client";

import { useState } from "react";
import { Check, ArrowRight, Shield, Globe, Clock, Activity } from "lucide-react";
import type { VaultMode } from "../tokens";

export function FooterEffect({ slug, mode }: { slug: string; mode: VaultMode }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // 1. HAUL! (Streetwear / Editorial)
  if (slug === "haul") {
    return (
      <footer className="w-full max-w-xl p-6 rounded-3xl bg-zinc-950 border border-zinc-800 text-white shadow-2xl">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
            HAUL! 2026
          </h2>
          <span className="text-[10px] font-mono border border-zinc-700 px-2 py-1 rounded text-zinc-400">
            LIMITED EDITION
          </span>
        </div>
        <p className="text-xs text-zinc-400 mb-4 max-w-sm">
          Next-generation apparel and digital collectibles designed for modern tastemakers.
        </p>
        <div className="flex gap-2">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="JOIN THE DROP LIST"
            className="flex-1 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-mono uppercase tracking-wider text-white outline-none focus:border-amber-400"
          />
          <button
            onClick={() => {
              if (email) setSubscribed(true);
            }}
            className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase transition-colors"
          >
            {subscribed ? "JOINED ✓" : "ACCESS"}
          </button>
        </div>
      </footer>
    );
  }

  // 2. Omniflow (Enterprise SaaS)
  if (slug === "omniflow") {
    return (
      <footer className="w-full max-w-xl p-6 rounded-2xl bg-zinc-900 border border-white/10 text-white shadow-2xl">
        <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-4">
          <strong className="text-base font-bold tracking-tight">OMNIFLOW ENTERPRISE</strong>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            99.99% UPTIME
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-xs text-zinc-400 mb-6">
          <div>
            <h6 className="font-bold text-white mb-2">Platform</h6>
            <p className="hover:text-white cursor-pointer">AI Pipelines</p>
            <p className="hover:text-white cursor-pointer mt-1">Global Mesh</p>
          </div>
          <div>
            <h6 className="font-bold text-white mb-2">Resources</h6>
            <p className="hover:text-white cursor-pointer">Security Whitepaper</p>
            <p className="hover:text-white cursor-pointer mt-1">API Docs</p>
          </div>
          <div>
            <h6 className="font-bold text-white mb-2">Compliance</h6>
            <p className="flex items-center gap-1 text-emerald-400">
              <Shield className="w-3 h-3" /> SOC-2 Type II
            </p>
            <p className="mt-1">GDPR Certified</p>
          </div>
        </div>
        <div className="text-[10px] text-zinc-500 flex justify-between">
          <span>© 2026 Omniflow Inc. All rights reserved.</span>
          <span>San Francisco · London · Tokyo</span>
        </div>
      </footer>
    );
  }

  // 3. Sōra (Japanese Zen Minimalist)
  if (slug === "sora") {
    return (
      <footer className="w-full max-w-xl p-6 rounded-2xl bg-[#0d0d11] border border-zinc-800 text-zinc-300 font-sans shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xl font-light tracking-[0.2em] text-white">S Ō R A</h4>
          <div className="flex gap-4 text-[10px] font-mono text-zinc-500">
            <span>TOKYO 23:42 JST</span>
            <span>SF 07:42 PST</span>
          </div>
        </div>
        <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-md mb-6">
          Quiet software crafted with intention. Exploring the intersection of digital serenity and computational precision.
        </p>
        <div className="flex justify-between items-center pt-4 border-t border-zinc-800/80 text-[10px] font-mono text-zinc-500">
          <span>35.6762° N, 139.6503° E</span>
          <span>© MMXXVI SŌRA STUDIO</span>
        </div>
      </footer>
    );
  }

  // 4. Community Newsletter
  if (slug === "community-newsletter") {
    return (
      <footer className="w-full max-w-xl p-6 rounded-2xl bg-gradient-to-br from-violet-950/60 via-zinc-950 to-zinc-950 border border-violet-500/30 text-white shadow-2xl">
        <div className="text-center mb-4">
          <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-[10px] font-bold tracking-wider uppercase border border-violet-500/30">
            ✦ JOIN 48,000+ DEVELOPERS
          </span>
          <h3 className="text-xl font-black mt-2">The UI Engineer Digest</h3>
          <p className="text-xs text-zinc-400 mt-1">Weekly deep dives into React 19, animations & design systems.</p>
        </div>
        <div className="flex gap-2 max-w-md mx-auto">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your work email..."
            className="flex-1 px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white outline-none focus:border-violet-400"
          />
          <button
            onClick={() => {
              if (email) setSubscribed(true);
            }}
            className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-lg transition-colors flex items-center gap-1.5"
          >
            {subscribed ? "Subscribed ✓" : "Subscribe"}
          </button>
        </div>
      </footer>
    );
  }

  // 5. Sui Foundation / Web3
  if (slug === "sui-foundation") {
    return (
      <footer className="w-full max-w-xl p-6 rounded-2xl bg-zinc-950 border border-cyan-500/30 text-white shadow-2xl">
        <div className="flex justify-between items-center pb-3 border-b border-white/10 mb-4">
          <strong className="text-cyan-400 font-mono text-sm tracking-wider">SUI NETWORK PROTOCOL</strong>
          <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
            <Activity className="w-3 h-3 text-cyan-400 animate-pulse" /> 297,410 TPS PEAK
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs mb-4">
          <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/5">
            <span className="text-[10px] text-zinc-400 block font-mono">GAS PRICE</span>
            <strong className="text-sm font-mono text-cyan-300">0.00012 SUI</strong>
          </div>
          <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/5">
            <span className="text-[10px] text-zinc-400 block font-mono">ACTIVE VALIDATORS</span>
            <strong className="text-sm font-mono text-violet-300">104 NODES</strong>
          </div>
        </div>
        <div className="text-[10px] text-zinc-500 flex justify-between font-mono">
          <span>MAINNET · V1.32.0</span>
          <span>© SUI FOUNDATION</span>
        </div>
      </footer>
    );
  }

  // Default Rich Footer
  return (
    <footer className="w-full max-w-xl p-6 rounded-2xl bg-zinc-950 border border-white/10 text-white shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <strong className="text-lg font-black tracking-tight">{slug.replace(/-/g, " ").toUpperCase()}</strong>
        <ArrowRight className="w-4 h-4 text-violet-400" />
      </div>
      <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
        Thoughtful digital experiences engineered with modern web standards and responsive aesthetics.
      </p>
      <div className="pt-3 border-t border-white/10 flex justify-between text-[10px] text-zinc-500 font-mono">
        <span>© 2026 UI Hub</span>
        <span>ALL RIGHTS RESERVED</span>
      </div>
    </footer>
  );
}
