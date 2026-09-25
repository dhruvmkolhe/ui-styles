import type { Mode } from "@/lib/styles/types";

/**
 * Dark Tech class kit — terminal glow, cyber precision.
 * Pure black canvas, phosphor green & neon cyan glow, monospace, grid overlays.
 */
export function darkTech(m: Mode) {
  // Dark tech defaults to dark, but supports both modes elegantly
  const d = m === "dark";
  return {
    /* ---------- text ---------- */
    text: d ? "text-[#00FF41] font-mono" : "text-[#052e16] font-mono",
    strong: d ? "text-[#00FFFF] font-mono font-bold" : "text-[#047857] font-mono font-bold",
    muted: d ? "text-[#00FF41]/70 font-mono" : "text-[#052e16]/70 font-mono",
    faint: d ? "text-[#00FF41]/40 font-mono" : "text-[#052e16]/40 font-mono",
    serif: "font-mono tracking-tight uppercase",

    /* ---------- stage ---------- */
    stage: d ? "bg-black" : "bg-[#f0fdf4]",

    /* ---------- panels ---------- */
    panel: d
      ? "rounded-sm border border-[#00FF41]/40 bg-[#050505] p-6 shadow-[0_0_16px_rgba(0,255,65,0.15)]"
      : "rounded-sm border border-emerald-500/40 bg-white p-6 shadow-[0_0_16px_rgba(16,185,129,0.1)]",
    panelSoft: d
      ? "rounded-sm border border-[#00FF41]/20 bg-[#0a0a0a]"
      : "rounded-sm border border-emerald-200 bg-emerald-50/50",
    bar: d
      ? "rounded-sm border border-[#00FF41]/40 bg-[#050505] shadow-[0_0_12px_rgba(0,255,65,0.15)]"
      : "rounded-sm border border-emerald-500/30 bg-white shadow-sm",
    menu: d
      ? "rounded-sm border border-[#00FFFF]/50 bg-[#050505] p-1.5 shadow-[0_0_20px_rgba(0,255,255,0.2)]"
      : "rounded-sm border border-emerald-500/50 bg-white p-1.5 shadow-lg",
    menuItem: d
      ? "flex w-full items-center gap-2.5 rounded-sm px-3 py-2 text-left font-mono text-xs uppercase text-[#00FF41] transition hover:bg-[#00FF41]/10 hover:text-[#00FFFF]"
      : "flex w-full items-center gap-2.5 rounded-sm px-3 py-2 text-left font-mono text-xs uppercase text-emerald-900 transition hover:bg-emerald-100 hover:text-emerald-700",
    overlay: "absolute inset-0 z-10 flex items-center justify-center bg-black/85 p-6 backdrop-blur-xs",
    tooltip: d
      ? "rounded-sm border border-[#00FFFF] bg-black px-3 py-1.5 font-mono text-xs text-[#00FFFF] shadow-[0_0_10px_rgba(0,255,255,0.4)]"
      : "rounded-sm border border-emerald-600 bg-emerald-950 px-3 py-1.5 font-mono text-xs text-emerald-200 shadow-sm",

    /* ---------- buttons ---------- */
    btnPrimary: d
      ? "inline-flex items-center justify-center gap-2 rounded-sm border border-[#00FF41] bg-[#00FF41]/10 px-6 py-2.5 font-mono text-xs font-bold uppercase text-[#00FF41] shadow-[0_0_12px_rgba(0,255,65,0.3)] transition-all hover:bg-[#00FF41] hover:text-black"
      : "inline-flex items-center justify-center gap-2 rounded-sm border border-emerald-600 bg-emerald-600 px-6 py-2.5 font-mono text-xs font-bold uppercase text-white shadow-sm transition-all hover:bg-emerald-700",
    btnPrimarySm: d
      ? "inline-flex items-center justify-center gap-1.5 rounded-sm border border-[#00FFFF] bg-[#00FFFF]/10 px-4 py-1.5 font-mono text-xs font-bold uppercase text-[#00FFFF] shadow-[0_0_10px_rgba(0,255,255,0.3)] transition-all hover:bg-[#00FFFF] hover:text-black"
      : "inline-flex items-center justify-center gap-1.5 rounded-sm border border-emerald-600 bg-emerald-600 px-4 py-1.5 font-mono text-xs font-bold uppercase text-white transition-all hover:bg-emerald-700",
    btnSecondary: d
      ? "inline-flex items-center justify-center gap-2 rounded-sm border border-[#00FF41]/30 bg-transparent px-6 py-2.5 font-mono text-xs font-medium uppercase text-[#00FF41]/80 transition-all hover:border-[#00FF41]/80 hover:text-[#00FF41]"
      : "inline-flex items-center justify-center gap-2 rounded-sm border border-emerald-300 bg-transparent px-6 py-2.5 font-mono text-xs font-medium uppercase text-emerald-800 transition-all hover:bg-emerald-50",
    iconBtn: d
      ? "inline-flex h-8 w-8 items-center justify-center rounded-sm border border-[#00FF41]/40 text-[#00FF41] transition hover:bg-[#00FF41]/20 hover:shadow-[0_0_10px_rgba(0,255,65,0.4)]"
      : "inline-flex h-8 w-8 items-center justify-center rounded-sm border border-emerald-300 text-emerald-700 transition hover:bg-emerald-100",

    /* ---------- form ---------- */
    label: d
      ? "mb-2 block font-mono text-[11px] font-bold uppercase tracking-widest text-[#00FFFF]"
      : "mb-2 block font-mono text-[11px] font-bold uppercase tracking-widest text-emerald-700",
    input: d
      ? "w-full rounded-sm border border-[#00FF41]/40 bg-[#050505] px-4 py-2.5 font-mono text-xs text-[#00FF41] placeholder-[#00FF41]/30 shadow-[0_0_8px_rgba(0,255,65,0.1)] outline-none focus:border-[#00FFFF] focus:shadow-[0_0_12px_rgba(0,255,255,0.3)]"
      : "w-full rounded-sm border border-emerald-300 bg-white px-4 py-2.5 font-mono text-xs text-emerald-900 placeholder-emerald-400 outline-none focus:border-emerald-600",

    /* ---------- badges ---------- */
    badge: d
      ? "inline-flex items-center gap-1.5 rounded-sm border border-[#00FF41]/50 bg-[#00FF41]/10 px-3 py-1 font-mono text-[10px] font-bold uppercase text-[#00FF41] shadow-[0_0_8px_rgba(0,255,65,0.2)]"
      : "inline-flex items-center gap-1.5 rounded-sm border border-emerald-300 bg-emerald-50 px-3 py-1 font-mono text-[10px] font-bold uppercase text-emerald-800",
    badgeSolid: d
      ? "inline-flex items-center gap-1.5 rounded-sm border border-[#00FFFF] bg-[#00FFFF]/20 px-3 py-1 font-mono text-[10px] font-bold uppercase text-[#00FFFF] shadow-[0_0_10px_rgba(0,255,255,0.3)]"
      : "inline-flex items-center gap-1.5 rounded-sm bg-emerald-600 px-3 py-1 font-mono text-[10px] font-bold uppercase text-white",

    /* ---------- tabs ---------- */
    tabList: d
      ? "inline-flex gap-2 border-b border-[#00FF41]/30 pb-1"
      : "inline-flex gap-2 border-b border-emerald-300 pb-1",
    tabActive: d
      ? "rounded-sm border border-[#00FFFF] bg-[#00FFFF]/10 px-4 py-1.5 font-mono text-xs font-bold uppercase text-[#00FFFF] shadow-[0_0_8px_rgba(0,255,255,0.3)]"
      : "rounded-sm border border-emerald-600 bg-emerald-600 px-4 py-1.5 font-mono text-xs font-bold uppercase text-white",
    tabIdle: d
      ? "rounded-sm border border-transparent px-4 py-1.5 font-mono text-xs uppercase text-[#00FF41]/50 hover:text-[#00FF41]"
      : "rounded-sm border border-transparent px-4 py-1.5 font-mono text-xs uppercase text-emerald-700 hover:text-emerald-900",

    /* ---------- switch ---------- */
    switchOn: d ? "border border-[#00FF41] bg-[#00FF41]/20 shadow-[0_0_10px_rgba(0,255,65,0.4)]" : "border border-emerald-600 bg-emerald-600",
    switchOff: d ? "border border-[#00FF41]/30 bg-black" : "border border-emerald-300 bg-gray-100",

    /* ---------- misc ---------- */
    track: d ? "border border-[#00FF41]/30 bg-black" : "border border-emerald-200 bg-emerald-50",
    fill: d ? "bg-[#00FF41] shadow-[0_0_10px_rgba(0,255,65,0.5)]" : "bg-emerald-600",
    skeleton: d ? "bg-[#00FF41]/10 border border-[#00FF41]/30 animate-pulse rounded-sm" : "bg-emerald-100 border border-emerald-200 animate-pulse rounded-sm",
    divider: d ? "divide-[#00FF41]/20" : "divide-emerald-200",
    hairline: d ? "border-[#00FF41]/30" : "border-emerald-200",
    dotRing: d ? "border-black" : "border-white",
    ring: "ring-[#00FF41]",
    imagePlaceholder: d
      ? "border border-[#00FF41]/40 bg-[#050505] text-[#00FF41]"
      : "border border-emerald-300 bg-emerald-50 text-emerald-700",
    successBg: d ? "border border-[#00FF41] bg-[#00FF41]/10 text-[#00FF41] shadow-[0_0_10px_rgba(0,255,65,0.3)]" : "border border-emerald-400 bg-emerald-50 text-emerald-800",
    errorBg: d ? "border border-rose-500 bg-rose-950/40 text-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.3)]" : "border border-rose-300 bg-rose-50 text-rose-800",
    successLine: "bg-[#00FF41]",
    errorLine: "bg-rose-500",
    dangerText: "!text-rose-400",
  };
}

export type DarkTechKit = ReturnType<typeof darkTech>;
