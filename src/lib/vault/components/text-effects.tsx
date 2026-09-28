"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { VaultMode } from "../tokens";

export function TextEffect({ slug, mode }: { slug: string; mode: VaultMode }) {
  const reduced = useReducedMotion();
  const dark = mode === "dark";

  // 1. Mesh Text Hover
  if (slug === "mesh-text-hover") {
    return (
      <div className="group cursor-pointer text-center">
        <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-pink-500 to-amber-400 group-hover:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] group-hover:from-cyan-400 group-hover:via-fuchsia-500 group-hover:to-amber-300 transition-all duration-700 select-none">
          KINETIC MESH
        </h2>
        <p className="text-xs text-muted-foreground mt-2 font-mono">Hover to refract mesh gradient</p>
      </div>
    );
  }

  // 2. Pixel Drift
  if (slug === "pixel-drift") {
    return (
      <div className="text-center">
        <motion.div
          animate={reduced ? {} : { filter: ["blur(0px)", "blur(2px)", "blur(0px)"], letterSpacing: ["0px", "4px", "0px"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-4xl sm:text-5xl font-mono font-black text-cyan-400 tracking-wider drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]"
        >
          PIXEL_DRIFT
        </motion.div>
      </div>
    );
  }

  // 3. Random Letter Swap / Scramble
  if (slug === "random-letter-swap" || slug === "scramble-text") {
    return <ScrambleTextComponent target="CYBER_DECRYPT_2026" />;
  }

  // 4. Rolling Letters (Mechanical 3D Roll)
  if (slug === "rolling-letters") {
    return <RollingLettersComponent text="AVALANCHE" />;
  }

  // 5. Scroll Text Highlight
  if (slug === "scroll-text-highlight") {
    return (
      <div className="max-w-md text-center">
        <p className="text-xl sm:text-2xl font-bold leading-relaxed">
          Crafting{" "}
          <span className="relative inline-block text-white">
            <span className="relative z-10 px-1">digital aesthetics</span>
            <motion.span
              animate={reduced ? {} : { width: ["0%", "100%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-y-1 left-0 bg-violet-600/80 -rotate-1 rounded-sm -z-0"
            />
          </span>{" "}
          with absolute precision.
        </p>
      </div>
    );
  }

  // 6. Smoky Text
  if (slug === "smoky-text") {
    return (
      <div className="group cursor-pointer flex gap-1 justify-center text-4xl sm:text-5xl font-black">
        {"ETHEREAL".split("").map((c, i) => (
          <span
            key={i}
            className="inline-block transition-all duration-500 group-hover:blur-md group-hover:opacity-20 group-hover:-translate-y-4 group-hover:scale-125 text-indigo-400"
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            {c}
          </span>
        ))}
      </div>
    );
  }

  // 7. Text Carousel
  if (slug === "text-carousel") {
    return <TextCarouselComponent />;
  }

  // 8. Text Path
  if (slug === "text-path") {
    return (
      <div className="w-full max-w-sm flex justify-center">
        <svg viewBox="0 0 300 80" className="w-full h-24">
          <path id="wavePath" d="M 10,40 Q 80,10 150,40 T 290,40" fill="transparent" stroke="rgba(139,92,246,0.3)" strokeWidth="2" />
          <text fill="#a855f7" className="text-xs font-mono font-bold tracking-widest uppercase">
            <textPath href="#wavePath" startOffset="10%">
              ✦ Curving Velocity Through Space & Time ✦
            </textPath>
          </text>
        </svg>
      </div>
    );
  }

  // 9. Text Vaporize
  if (slug === "text-vaporize") {
    return (
      <div className="group cursor-pointer text-center">
        <h3 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-t from-zinc-700 via-zinc-300 to-white transition-all duration-700 group-hover:blur-lg group-hover:scale-110 group-hover:opacity-0">
          VAPORIZE
        </h3>
        <p className="text-xs text-muted-foreground mt-3 font-mono opacity-60">Hover to vaporize into mist</p>
      </div>
    );
  }

  // 10. Letter Pull Up
  if (slug === "letter-pull-up") {
    return (
      <div className="flex gap-1 justify-center text-4xl sm:text-5xl font-extrabold text-violet-400">
        {"PULL_UP".split("").map((c, i) => (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.08, duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          >
            {c}
          </motion.span>
        ))}
      </div>
    );
  }

  // 11. Scale Letter
  if (slug === "scale-letter") {
    return (
      <div className="flex gap-1 justify-center text-4xl sm:text-5xl font-black text-white cursor-pointer">
        {"ELASTIC".split("").map((c, i) => (
          <motion.span
            key={i}
            whileHover={{ scale: 1.6, color: "#ec4899", y: -10 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="inline-block"
          >
            {c}
          </motion.span>
        ))}
      </div>
    );
  }

  // 12. Separate Away
  if (slug === "separate-away") {
    return (
      <div className="group cursor-pointer flex justify-center text-4xl sm:text-6xl font-black tracking-tight text-amber-400">
        <span className="transition-transform duration-500 group-hover:-translate-x-12 group-hover:opacity-50">SEPA</span>
        <span className="transition-transform duration-500 group-hover:scale-125 text-white">✦</span>
        <span className="transition-transform duration-500 group-hover:translate-x-12 group-hover:opacity-50">RATE</span>
      </div>
    );
  }

  // 13. Wavy Text
  if (slug === "wavy-text") {
    return (
      <div className="flex gap-1 justify-center text-4xl sm:text-5xl font-black text-teal-400">
        {"OCEANIC_WAVE".split("").map((c, i) => (
          <motion.span
            key={i}
            animate={reduced ? {} : { y: [0, -12, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
          >
            {c}
          </motion.span>
        ))}
      </div>
    );
  }

  // 14. Word Pull Up
  if (slug === "word-pull-up") {
    const words = ["Design", "Without", "Limits."];
    return (
      <div className="flex gap-3 justify-center text-3xl sm:text-4xl font-extrabold text-white">
        {words.map((w, i) => (
          <motion.span
            key={i}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity, repeatDelay: 2.5 }}
            className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400"
          >
            {w}
          </motion.span>
        ))}
      </div>
    );
  }

  // 15. Crossfade Typewriter
  if (slug === "crossfade-typewriter") {
    return <TypewriterComponent />;
  }

  // 16. UI HUB Wordmark
  if (slug === "ui-hub-wordmark") {
    return (
      <div className="relative group cursor-pointer text-center">
        <div className="text-5xl sm:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-[linear-gradient(110deg,#ffffff_20%,#8b5cf6_50%,#22d3ee_70%,#ffffff_90%)] bg-[length:200%_100%] animate-shine">
          UI·HUB
        </div>
        <div className="mt-2 flex items-center justify-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400 group-hover:text-cyan-400 transition-colors">
          <span>THE COMPONENT VAULT</span>
          <span>✦</span>
          <span>EST. 2026</span>
        </div>
      </div>
    );
  }

  return (
    <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
      {slug.toUpperCase()}
    </h2>
  );
}

// Helpers
function ScrambleTextComponent({ target }: { target: string }) {
  const chars = "!@#$%^&*()_+-=<>?/{}[]~";
  const [text, setText] = useState(target);

  useEffect(() => {
    let iter = 0;
    const interval = setInterval(() => {
      setText(
        target
          .split("")
          .map((c, i) => {
            if (i < iter) return target[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iter >= target.length) {
        clearInterval(interval);
        setTimeout(() => {
          iter = 0;
        }, 1800);
      }
      iter += 1 / 3;
    }, 40);
    return () => clearInterval(interval);
  }, [target]);

  return (
    <div className="font-mono text-2xl sm:text-4xl font-black tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-6 py-3 rounded-xl shadow-[0_0_25px_rgba(16,185,129,0.2)]">
      {text}
    </div>
  );
}

function RollingLettersComponent({ text }: { text: string }) {
  return (
    <div className="group flex cursor-pointer overflow-hidden text-3xl sm:text-5xl font-black tracking-tight text-white">
      {text.split("").map((c, i) => (
        <div key={i} className="relative h-12 sm:h-14 overflow-hidden">
          <span
            className="block transition-transform duration-500 group-hover:-translate-y-full text-zinc-400"
            style={{ transitionDelay: `${i * 30}ms` }}
          >
            {c}
          </span>
          <span
            className="absolute top-0 left-0 block translate-y-full transition-transform duration-500 group-hover:translate-y-0 text-violet-400"
            style={{ transitionDelay: `${i * 30}ms` }}
          >
            {c}
          </span>
        </div>
      ))}
    </div>
  );
}

function TextCarouselComponent() {
  const words = ["INTERACTIVE", "SCALABLE", "DELIGHTFUL", "ACCESSIBLE"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(t);
  }, [words.length]);

  return (
    <div className="flex items-center gap-3 text-2xl sm:text-4xl font-extrabold text-white">
      <span>Built to be</span>
      <div className="h-10 sm:h-12 overflow-hidden">
        <motion.div
          key={words[index]}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-cyan-400 font-mono"
        >
          {words[index]}
        </motion.div>
      </div>
    </div>
  );
}

function TypewriterComponent() {
  const textToType = "Architecting the future of software.";
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(textToType.slice(0, i));
      i++;
      if (i > textToType.length + 10) {
        i = 0;
      }
    }, 90);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-lg sm:text-2xl font-bold text-zinc-100 flex items-center">
      <span>{displayed}</span>
      <span className="w-2.5 h-6 bg-violet-400 ml-1 animate-pulse" />
    </div>
  );
}
