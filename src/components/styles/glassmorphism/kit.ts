import type { Mode } from "@/lib/styles/types";

/**
 * Glassmorphism class kit.
 * One source of truth: the same class strings power the live React previews
 * AND the copyable HTML snippets, so what you see is what you copy.
 */
export function glass(m: Mode) {
  const d = m === "dark";
  return {
    /* ---------- text ---------- */
    text: d ? "text-white" : "text-slate-900",
    strong: d ? "text-white" : "text-slate-900",
    muted: d ? "text-white/60" : "text-slate-600",
    faint: d ? "text-white/40" : "text-slate-400",

    /* ---------- stage ---------- */
    stage: d ? "bg-[#0b0a14]" : "bg-[#e9edfa]",

    /* ---------- panels ---------- */
    panel: d
      ? "rounded-2xl border border-white/10 bg-white/[0.07] shadow-[0_8px_32px_rgba(2,6,23,0.45)] backdrop-blur-md"
      : "rounded-2xl border border-white/60 bg-white/50 shadow-[0_8px_32px_rgba(99,102,241,0.15)] backdrop-blur-md",
    panelSoft: d
      ? "rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur-md"
      : "rounded-xl border border-white/60 bg-white/40 backdrop-blur-md",
    bar: d
      ? "rounded-xl border border-white/10 bg-white/[0.06] shadow-[0_8px_32px_rgba(2,6,23,0.4)] backdrop-blur-md"
      : "rounded-xl border border-white/60 bg-white/50 shadow-[0_8px_32px_rgba(99,102,241,0.12)] backdrop-blur-md",
    menu: d
      ? "rounded-xl border border-white/15 bg-[#171426]/90 shadow-[0_16px_48px_rgba(2,6,23,0.6)] backdrop-blur-xl"
      : "rounded-xl border border-white/70 bg-white/85 shadow-[0_16px_48px_rgba(99,102,241,0.2)] backdrop-blur-xl",
    menuItem: d
      ? "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
      : "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-white/70 hover:text-slate-900",
    overlay: "absolute inset-0 z-10 flex items-center justify-center bg-black/40 p-6 backdrop-blur-sm",
    tooltip: d
      ? "rounded-lg border border-white/15 bg-[#171426]/90 px-3 py-1.5 text-xs text-white shadow-[0_8px_24px_rgba(2,6,23,0.5)] backdrop-blur-md"
      : "rounded-lg border border-white/70 bg-white/85 px-3 py-1.5 text-xs text-slate-800 shadow-[0_8px_24px_rgba(99,102,241,0.2)] backdrop-blur-md",

    /* ---------- buttons ---------- */
    btnPrimary: d
      ? "inline-flex items-center justify-center gap-2 rounded-xl border border-violet-300/30 bg-violet-500/70 px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_24px_rgba(139,92,246,0.45)] backdrop-blur-md transition hover:bg-violet-400/80 hover:shadow-[0_0_32px_rgba(139,92,246,0.6)]"
      : "inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-violet-600/80 px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_24px_rgba(124,58,237,0.35)] backdrop-blur-md transition hover:bg-violet-500/90 hover:shadow-[0_0_32px_rgba(124,58,237,0.5)]",
    btnPrimarySm: d
      ? "inline-flex items-center justify-center gap-1.5 rounded-lg border border-violet-300/30 bg-violet-500/70 px-4 py-2 text-xs font-medium text-white shadow-[0_0_18px_rgba(139,92,246,0.45)] backdrop-blur-md transition hover:bg-violet-400/80"
      : "inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/40 bg-violet-600/80 px-4 py-2 text-xs font-medium text-white shadow-[0_0_18px_rgba(124,58,237,0.35)] backdrop-blur-md transition hover:bg-violet-500/90",
    btnSecondary: d
      ? "inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20"
      : "inline-flex items-center justify-center gap-2 rounded-xl border border-white/70 bg-white/50 px-5 py-2.5 text-sm font-medium text-slate-800 backdrop-blur-md transition hover:bg-white/75",
    iconBtn: d
      ? "inline-flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/15 hover:text-white"
      : "inline-flex h-7 w-7 items-center justify-center rounded-lg border border-white/60 bg-white/40 text-slate-500 transition hover:bg-white/70 hover:text-slate-900",

    /* ---------- form ---------- */
    label: d
      ? "mb-2 block text-xs font-medium uppercase tracking-wider text-white/60"
      : "mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500",
    input: d
      ? "w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-2.5 text-sm text-white placeholder-white/40 shadow-inner backdrop-blur-md outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/25"
      : "w-full rounded-xl border border-white/70 bg-white/50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-inner backdrop-blur-md outline-none transition focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20",

    /* ---------- badges ---------- */
    badgeViolet: d
      ? "inline-flex items-center gap-1.5 rounded-full border border-violet-300/30 bg-violet-400/15 px-3 py-1 text-xs font-medium text-violet-200 backdrop-blur-md"
      : "inline-flex items-center gap-1.5 rounded-full border border-violet-400/40 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-700 backdrop-blur-md",
    badgeCyan: d
      ? "inline-flex items-center gap-1.5 rounded-full border border-cyan-300/30 bg-cyan-400/15 px-3 py-1 text-xs font-medium text-cyan-200 backdrop-blur-md"
      : "inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-700 backdrop-blur-md",
    badgeGhost: d
      ? "inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-md"
      : "inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/50 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur-md",

    /* ---------- tabs ---------- */
    tabList: d
      ? "inline-flex gap-1 rounded-xl border border-white/10 bg-white/[0.05] p-1 backdrop-blur-md"
      : "inline-flex gap-1 rounded-xl border border-white/60 bg-white/40 p-1 backdrop-blur-md",
    tabActive: d
      ? "rounded-lg bg-white/15 px-4 py-1.5 text-sm font-medium text-white shadow-[0_2px_12px_rgba(139,92,246,0.35)] transition"
      : "rounded-lg bg-white/85 px-4 py-1.5 text-sm font-medium text-slate-900 shadow-sm transition",
    tabIdle: d
      ? "rounded-lg px-4 py-1.5 text-sm text-white/55 transition hover:bg-white/10 hover:text-white"
      : "rounded-lg px-4 py-1.5 text-sm text-slate-500 transition hover:bg-white/60 hover:text-slate-900",

    /* ---------- switch ---------- */
    switchOn: d
      ? "border-violet-300/40 bg-violet-500/70 shadow-[0_0_16px_rgba(139,92,246,0.55)]"
      : "border-violet-400/50 bg-violet-500/80 shadow-[0_0_16px_rgba(124,58,237,0.4)]",
    switchOff: d ? "border-white/15 bg-white/10" : "border-white/70 bg-white/50",

    /* ---------- misc ---------- */
    track: d ? "bg-white/10" : "bg-slate-900/10",
    fill: "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 shadow-[0_0_12px_rgba(139,92,246,0.6)]",
    skeleton: d ? "bg-white/10" : "bg-slate-900/[0.08]",
    divider: d ? "divide-white/10" : "divide-white/60",
    hairline: d ? "border-white/10" : "border-white/60",
    dotRing: d ? "border-[#0b0a14]" : "border-[#e9edfa]",
    ring: d ? "ring-white/20" : "ring-white/70",
    successBg: d ? "bg-emerald-400/15 text-emerald-300" : "bg-emerald-500/10 text-emerald-600",
    errorBg: d ? "bg-rose-400/15 text-rose-300" : "bg-rose-500/10 text-rose-600",
    successLine: d ? "bg-emerald-400/60" : "bg-emerald-500/50",
    errorLine: d ? "bg-rose-400/60" : "bg-rose-500/50",
  };
}

export type GlassKit = ReturnType<typeof glass>;
