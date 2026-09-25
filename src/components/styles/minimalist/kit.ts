import type { Mode } from "@/lib/styles/types";

/**
 * Minimalist class kit — less, but better.
 * Pure whitespace, ultra-thin hairlines, light typography, zero unnecessary decoration.
 */
export function minimalist(m: Mode) {
  const d = m === "dark";
  return {
    /* ---------- text ---------- */
    text: d ? "text-neutral-200 font-light" : "text-neutral-900 font-light",
    strong: d ? "text-white font-normal" : "text-black font-normal",
    muted: d ? "text-neutral-400 font-light" : "text-neutral-500 font-light",
    faint: d ? "text-neutral-500 font-light" : "text-neutral-400 font-light",
    serif: "font-sans tracking-tight",

    /* ---------- stage ---------- */
    stage: d ? "bg-neutral-950" : "bg-white",

    /* ---------- panels ---------- */
    panel: d
      ? "rounded-xl border border-neutral-800 bg-neutral-900/60 p-8 shadow-none"
      : "rounded-xl border border-neutral-100 bg-neutral-50/50 p-8 shadow-none",
    panelSoft: d
      ? "rounded-lg border border-neutral-800/80 bg-neutral-900/40"
      : "rounded-lg border border-neutral-100 bg-neutral-50",
    bar: d
      ? "rounded-xl border border-neutral-800 bg-neutral-900/80"
      : "rounded-xl border border-neutral-100 bg-neutral-50/80",
    menu: d
      ? "rounded-xl border border-neutral-800 bg-neutral-900 p-1.5 shadow-xl"
      : "rounded-xl border border-neutral-100 bg-white p-1.5 shadow-lg shadow-neutral-100",
    menuItem: d
      ? "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-light text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
      : "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-light text-neutral-600 transition hover:bg-neutral-100 hover:text-black",
    overlay: "absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-sm p-6",
    tooltip: d
      ? "rounded-md border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs text-neutral-300"
      : "rounded-md border border-neutral-200 bg-black px-3 py-1.5 text-xs text-white",

    /* ---------- buttons ---------- */
    btnPrimary: d
      ? "inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-normal tracking-wide text-black transition-colors hover:bg-neutral-200"
      : "inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 py-2.5 text-xs font-normal tracking-wide text-white transition-colors hover:bg-black",
    btnPrimarySm: d
      ? "inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-normal tracking-wide text-black transition-colors hover:bg-neutral-200"
      : "inline-flex items-center justify-center gap-1.5 rounded-full bg-neutral-900 px-4 py-1.5 text-xs font-normal tracking-wide text-white transition-colors hover:bg-black",
    btnSecondary: d
      ? "inline-flex items-center justify-center gap-2 rounded-full border border-neutral-800 bg-transparent px-6 py-2.5 text-xs font-light tracking-wide text-neutral-300 transition-colors hover:border-neutral-700 hover:text-white"
      : "inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-transparent px-6 py-2.5 text-xs font-light tracking-wide text-neutral-600 transition-colors hover:border-neutral-300 hover:text-black",
    iconBtn: d
      ? "inline-flex h-8 w-8 items-center justify-center rounded-full border border-neutral-800 text-neutral-400 transition hover:border-neutral-700 hover:text-white"
      : "inline-flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition hover:border-neutral-300 hover:text-black",

    /* ---------- form ---------- */
    label: d
      ? "mb-2 block text-[11px] font-light uppercase tracking-[0.25em] text-neutral-400"
      : "mb-2 block text-[11px] font-light uppercase tracking-[0.25em] text-neutral-500",
    input: d
      ? "w-full rounded-lg border border-neutral-800 bg-neutral-900/50 px-4 py-2.5 text-xs font-light text-white placeholder-neutral-600 outline-none transition-colors focus:border-neutral-600"
      : "w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-xs font-light text-black placeholder-neutral-400 outline-none transition-colors focus:border-neutral-400",

    /* ---------- badges ---------- */
    badge: d
      ? "inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1 text-[10px] font-light tracking-widest uppercase text-neutral-300"
      : "inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-[10px] font-light tracking-widest uppercase text-neutral-600",
    badgeSolid: d
      ? "inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[10px] font-normal tracking-widest uppercase text-black"
      : "inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-3 py-1 text-[10px] font-normal tracking-widest uppercase text-white",

    /* ---------- tabs ---------- */
    tabList: d
      ? "inline-flex gap-8 border-b border-neutral-800"
      : "inline-flex gap-8 border-b border-neutral-200",
    tabActive: d
      ? "-mb-px border-b border-white pb-3 text-xs font-normal tracking-wide text-white"
      : "-mb-px border-b border-black pb-3 text-xs font-normal tracking-wide text-black",
    tabIdle: d
      ? "-mb-px border-b border-transparent pb-3 text-xs font-light tracking-wide text-neutral-500 hover:text-neutral-300"
      : "-mb-px border-b border-transparent pb-3 text-xs font-light tracking-wide text-neutral-400 hover:text-black",

    /* ---------- switch ---------- */
    switchOn: d ? "bg-white border-transparent" : "bg-neutral-900 border-transparent",
    switchOff: d ? "bg-neutral-800 border-transparent" : "bg-neutral-200 border-transparent",

    /* ---------- misc ---------- */
    track: d ? "bg-neutral-800" : "bg-neutral-100",
    fill: d ? "bg-white" : "bg-neutral-900",
    skeleton: d ? "bg-neutral-800/60 animate-pulse rounded-md" : "bg-neutral-100 animate-pulse rounded-md",
    divider: d ? "divide-neutral-800" : "divide-neutral-100",
    hairline: d ? "border-neutral-800" : "border-neutral-100",
    dotRing: d ? "border-neutral-950" : "border-white",
    ring: d ? "ring-neutral-700" : "ring-neutral-300",
    imagePlaceholder: d
      ? "bg-neutral-900 text-neutral-600"
      : "bg-neutral-100 text-neutral-400",
    successBg: d ? "bg-neutral-900 text-emerald-400 border border-emerald-900/40" : "bg-neutral-50 text-emerald-700 border border-emerald-200/60",
    errorBg: d ? "bg-neutral-900 text-rose-400 border border-rose-900/40" : "bg-neutral-50 text-rose-700 border border-rose-200/60",
    successLine: "bg-emerald-500",
    errorLine: "bg-rose-500",
    dangerText: d ? "!text-rose-400 hover:!bg-rose-950/40" : "!text-rose-600 hover:!bg-rose-50",
  };
}

export type MinimalistKit = ReturnType<typeof minimalist>;
