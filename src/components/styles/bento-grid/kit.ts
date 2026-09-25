import type { Mode } from "@/lib/styles/types";

/**
 * Bento Grid class kit — editorial grids, mixed card sizes.
 * Modern layout popularized by Apple, Linear and Vercel. Subtle borders, indigo accents.
 */
export function bentoGrid(m: Mode) {
  const d = m === "dark";
  return {
    /* ---------- text ---------- */
    text: d ? "text-slate-200" : "text-slate-800",
    strong: d ? "text-white font-semibold" : "text-slate-900 font-semibold",
    muted: d ? "text-slate-400" : "text-slate-500",
    faint: d ? "text-slate-500" : "text-slate-400",
    serif: "font-sans font-semibold tracking-tight",

    /* ---------- stage ---------- */
    stage: d ? "bg-[#0b0f19]" : "bg-[#f8fafc]",

    /* ---------- panels ---------- */
    panel: d
      ? "rounded-2xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-md shadow-xl"
      : "rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm",
    panelSoft: d
      ? "rounded-xl border border-white/10 bg-white/[0.03]"
      : "rounded-xl border border-slate-200/60 bg-slate-50",
    bar: d
      ? "rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-lg"
      : "rounded-2xl border border-slate-200 bg-white/90 shadow-xs",
    menu: d
      ? "rounded-2xl border border-white/10 bg-slate-900 p-2 shadow-2xl backdrop-blur-xl"
      : "rounded-2xl border border-slate-200 bg-white p-2 shadow-xl",
    menuItem: d
      ? "flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-xs font-medium text-slate-300 transition hover:bg-indigo-500/20 hover:text-white"
      : "flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-xs font-medium text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600",
    overlay: "absolute inset-0 z-10 flex items-center justify-center bg-slate-950/75 p-6 backdrop-blur-md",
    tooltip: d
      ? "rounded-xl border border-white/15 bg-slate-900 px-3.5 py-2 text-xs font-medium text-slate-200 shadow-lg"
      : "rounded-xl border border-slate-200 bg-slate-900 px-3.5 py-2 text-xs font-medium text-white shadow-md",

    /* ---------- buttons ---------- */
    btnPrimary: d
      ? "inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-medium text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500"
      : "inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-medium text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700",
    btnPrimarySm: d
      ? "inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-medium text-white shadow-md shadow-indigo-600/25 transition-all hover:bg-indigo-500"
      : "inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-indigo-700",
    btnSecondary: d
      ? "inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-6 py-2.5 text-xs font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white"
      : "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-6 py-2.5 text-xs font-medium text-slate-700 transition-all hover:bg-slate-200 hover:text-slate-900",
    iconBtn: d
      ? "inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-slate-300 transition hover:bg-white/10 hover:text-white"
      : "inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900",

    /* ---------- form ---------- */
    label: d
      ? "mb-2 block text-xs font-semibold tracking-wider text-indigo-400 uppercase"
      : "mb-2 block text-xs font-semibold tracking-wider text-indigo-600 uppercase",
    input: d
      ? "w-full rounded-xl border border-white/10 bg-slate-900/90 px-4 py-2.5 text-xs font-medium text-white placeholder-slate-500 outline-none transition-colors focus:border-indigo-500"
      : "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-indigo-500",

    /* ---------- badges ---------- */
    badge: d
      ? "inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1.5 text-[11px] font-medium text-indigo-300"
      : "inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 text-[11px] font-medium text-indigo-700",
    badgeSolid: d
      ? "inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-3.5 py-1.5 text-[11px] font-semibold text-white"
      : "inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-3.5 py-1.5 text-[11px] font-semibold text-white",

    /* ---------- tabs ---------- */
    tabList: d
      ? "inline-flex gap-2 rounded-2xl border border-white/10 bg-slate-900/80 p-1.5"
      : "inline-flex gap-2 rounded-2xl border border-slate-200 bg-slate-100 p-1.5",
    tabActive: d
      ? "rounded-xl bg-indigo-600 px-4 py-2 text-xs font-medium text-white shadow-md"
      : "rounded-xl bg-white px-4 py-2 text-xs font-medium text-slate-900 shadow-sm",
    tabIdle: d
      ? "rounded-xl px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
      : "rounded-xl px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900",

    /* ---------- switch ---------- */
    switchOn: d ? "bg-indigo-600" : "bg-indigo-600",
    switchOff: d ? "bg-slate-800" : "bg-slate-300",

    /* ---------- misc ---------- */
    track: d ? "bg-slate-800" : "bg-slate-200",
    fill: "bg-gradient-to-r from-indigo-500 to-cyan-400",
    skeleton: d ? "bg-slate-800/70 animate-pulse rounded-xl" : "bg-slate-200/70 animate-pulse rounded-xl",
    divider: d ? "divide-slate-800" : "divide-slate-200",
    hairline: d ? "border-slate-800" : "border-slate-200",
    dotRing: d ? "border-slate-900" : "border-white",
    ring: "ring-indigo-500",
    imagePlaceholder: d
      ? "border border-white/10 bg-gradient-to-b from-indigo-500/10 to-transparent text-indigo-400"
      : "border border-slate-200 bg-gradient-to-b from-indigo-50 to-transparent text-indigo-600",
    successBg: d ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : "border border-emerald-200 bg-emerald-50 text-emerald-700",
    errorBg: d ? "border border-rose-500/30 bg-rose-500/10 text-rose-300" : "border border-rose-200 bg-rose-50 text-rose-700",
    successLine: "bg-emerald-500",
    errorLine: "bg-rose-500",
    dangerText: "!text-rose-500",
  };
}

export type BentoGridKit = ReturnType<typeof bentoGrid>;
