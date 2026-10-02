"use client";

import { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star, CheckCircle, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import type { VaultMode } from "../tokens";

export function ImageInteractionEffect({ slug, mode }: { slug: string; mode: VaultMode }) {
  const reduced = useReducedMotion();
  const dark = mode === "dark";

  // 1. Spiral Images (3D Fan Spiral)
  if (slug === "spiral-images") {
    return (
      <div className="relative h-44 w-64 flex items-center justify-center group cursor-pointer">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute w-24 h-32 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 border border-white/20 shadow-xl transition-all duration-500 origin-bottom"
            style={{
              transform: `rotate(${i * 8 - 16}deg) translateY(${i * -4}px) scale(${1 - i * 0.05})`,
              zIndex: 10 - i,
            }}
          >
            <div className="absolute inset-0 bg-black/20 rounded-xl flex items-end p-2">
              <span className="text-[9px] font-bold text-white">0{i + 1}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 2. Infinity Image (Continuous Marquee Strip)
  if (slug === "infinity-image" || slug === "diagonal-carousel") {
    return (
      <div className="relative w-80 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-2">
        <div className="flex gap-2 animate-marquee whitespace-nowrap">
          {["#6366f1", "#ec4899", "#14b8a6", "#f59e0b", "#8b5cf6"].map((color, i) => (
            <div
              key={i}
              className="inline-block w-24 h-28 rounded-xl shrink-0 shadow-lg border border-white/10"
              style={{ backgroundColor: color }}
            >
              <div className="w-full h-full flex items-end p-2 bg-gradient-to-t from-black/60 to-transparent rounded-xl text-white font-mono text-[10px] font-bold">
                IMG_{i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3. Card Cascade (Fanning Deck)
  if (slug === "card-cascade") {
    return (
      <div className="relative h-44 w-64 flex items-center justify-center group cursor-pointer">
        {[-20, -10, 0, 10, 20].map((rot, i) => (
          <div
            key={i}
            className="absolute w-24 h-36 rounded-xl bg-gradient-to-b from-zinc-800 to-zinc-950 border border-violet-500/40 shadow-2xl transition-all duration-500 group-hover:translate-x-[calc(var(--offset)*30px)] group-hover:rotate-[calc(var(--rot)*1.2deg)] flex flex-col justify-between p-2.5"
            style={{
              ["--offset" as any]: i - 2,
              ["--rot" as any]: rot,
              transform: `rotate(${rot}deg) translateX(${(i - 2) * 12}px)`,
              zIndex: i,
            }}
          >
            <span className="text-[10px] font-mono text-violet-400 font-bold">♠ 0{i + 1}</span>
            <div className="w-full h-12 rounded bg-violet-500/20 flex items-center justify-center text-xs">✦</div>
            <span className="text-[9px] text-zinc-500 text-right font-mono">KIT</span>
          </div>
        ))}
      </div>
    );
  }

  // 4. Image Trail
  if (slug === "image-trail") {
    return <ImageTrailComponent />;
  }

  // 5. Perspective Carousel
  if (slug === "perspective-carousel") {
    return (
      <div className="relative w-80 h-44 flex items-center justify-center [perspective:800px]">
        {[-1, 0, 1].map((pos) => (
          <div
            key={pos}
            className="absolute w-36 h-40 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 border border-white/20 shadow-2xl transition-transform duration-500 flex flex-col justify-end p-3 text-white"
            style={{
              transform: `translateX(${pos * 85}px) scale(${pos === 0 ? 1 : 0.82}) rotateY(${pos * -25}deg)`,
              zIndex: pos === 0 ? 10 : 5,
              opacity: pos === 0 ? 1 : 0.65,
            }}
          >
            <span className="text-xs font-bold">{pos === 0 ? "Featured Hero" : "Archive"}</span>
            <span className="text-[10px] text-purple-200">Perspective 3D</span>
          </div>
        ))}
      </div>
    );
  }

  // 6. Testimonials Card
  if (slug === "testimonials-card") {
    return (
      <div className="relative w-72 p-5 rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl">
        <div className="flex items-center gap-1 text-amber-400 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
          ))}
        </div>
        <p className="text-xs text-zinc-300 leading-relaxed font-medium">
          &ldquo;UI Hub completely transformed our workflow. The design quality and copy-paste ready code are unmatched.&rdquo;
        </p>
        <div className="mt-4 flex items-center gap-2.5 pt-3 border-t border-white/5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-400 flex items-center justify-center text-xs font-bold text-white">
            SK
          </div>
          <div>
            <h6 className="text-xs font-bold text-white flex items-center gap-1">
              Sarah Jenkins <CheckCircle className="w-3 h-3 text-emerald-400 inline" />
            </h6>
            <p className="text-[10px] text-zinc-400">Head of Product · Stripe</p>
          </div>
        </div>
      </div>
    );
  }

  // 7. Image Collage
  if (slug === "image-collage") {
    return (
      <div className="grid grid-cols-3 gap-1.5 w-64 p-1.5 rounded-2xl bg-zinc-900 border border-white/10 shadow-xl">
        <div className="col-span-2 h-24 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-transform duration-300" />
        <div className="col-span-1 h-24 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 hover:scale-105 transition-transform duration-300" />
        <div className="col-span-1 h-14 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 hover:scale-105 transition-transform duration-300" />
        <div className="col-span-2 h-14 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-600 hover:scale-105 transition-transform duration-300" />
      </div>
    );
  }

  // 8. Image Lens Magnifier
  if (slug === "image-lens-magnifier") {
    return <ImageLensMagnifierComponent />;
  }

  // 9. Image Compare Slider
  if (slug === "image-compare-slider") {
    return <ImageCompareSliderComponent />;
  }

  // 10. Ripple Signature / Driftwood Gallery
  return (
    <div className="relative w-64 h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-purple-950 to-indigo-900 border border-white/10 flex items-center justify-center text-white shadow-2xl p-4 text-center">
      <div>
        <h5 className="text-sm font-bold">Interactive Gallery</h5>
        <p className="text-[11px] text-purple-300 mt-1">Physics-driven kinetic canvas</p>
      </div>
    </div>
  );
}

// Helpers
function ImageTrailComponent() {
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const newPoint = { x: e.clientX - r.left, y: e.clientY - r.top, id: Date.now() };
    setTrail((prev) => [...prev.slice(-4), newPoint]);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-72 h-44 rounded-2xl bg-zinc-950 border border-white/10 overflow-hidden flex items-center justify-center cursor-crosshair"
    >
      <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest pointer-events-none">
        Move Cursor Here
      </span>
      {trail.map((p, idx) => (
        <motion.div
          key={p.id}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute w-14 h-18 rounded-lg bg-gradient-to-tr from-violet-500 to-pink-500 border border-white/40 shadow-xl"
          style={{ left: p.x - 28, top: p.y - 36 }}
        />
      ))}
    </div>
  );
}

function ImageCompareSliderComponent() {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative w-72 h-44 rounded-2xl overflow-hidden border border-white/10 shadow-2xl select-none">
      {/* Before */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-600 via-orange-600 to-red-600 flex items-center justify-start p-4">
        <span className="text-xs font-bold text-white bg-black/40 px-2 py-1 rounded">AFTER</span>
      </div>
      {/* After (clipped) */}
      <div
        className="absolute inset-y-0 left-0 bg-gradient-to-tr from-indigo-700 via-purple-700 to-pink-600 border-r-2 border-white flex items-center justify-start p-4 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <span className="text-xs font-bold text-white bg-black/40 px-2 py-1 rounded">BEFORE</span>
      </div>
      <input
        type="range"
        aria-label="Image comparison split position"
        suppressHydrationWarning
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-x-3 bottom-3 z-10 w-[calc(100%-1.5rem)] accent-white cursor-ew-resize"
      />
    </div>
  );
}

function ImageLensMagnifierComponent() {
  const [mouse, setMouse] = useState({ x: 100, y: 70 });
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-72 h-44 rounded-2xl bg-gradient-to-br from-cyan-900 via-blue-950 to-indigo-950 border border-white/10 overflow-hidden flex items-center justify-center cursor-none p-4"
    >
      <div className="text-center">
        <h5 className="text-sm font-black text-cyan-300">MACRO LENS ZOOM</h5>
        <p className="text-[10px] text-zinc-400">Micro-texture inspection</p>
      </div>
      {hovered && (
        <div
          className="pointer-events-none absolute w-20 h-20 rounded-full border-2 border-cyan-400 bg-white/20 backdrop-blur-sm shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center justify-center text-[10px] font-bold text-white font-mono"
          style={{ left: mouse.x - 40, top: mouse.y - 40 }}
        >
          2.5× ZOOM
        </div>
      )}
    </div>
  );
}
