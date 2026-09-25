import type { Mode } from "@/lib/styles/types";

/**
 * Brutalist class kit — raw, loud, unapologetic.
 * Thick black borders, hard offset shadows, high contrast, sharp corners.
 */
export function brutalist(m: Mode) {
  const d = m === "dark";
  return {
    /* ---------- text ---------- */
    text: d ? "text-white" : "text-black",
    strong: d ? "text-white font-bold" : "text-black font-bold",
    muted: d ? "text-neutral-300" : "text-neutral-700",
    faint: d ? "text-neutral-400" : "text-neutral-500",
    serif: "font-mono font-bold uppercase",

    /* ---------- stage ---------- */
    stage: d ? "bg-[#121212]" : "bg-[#FAF7F2]",

    /* ---------- panels ---------- */
    panel: d
      ? "rounded-none border-4 border-white bg-black p-6 shadow-[6px_6px_0_#FFDE00]"
      : "rounded-none border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]",
    panelSoft: d
      ? "rounded-none border-2 border-white bg-[#1a1a1a] shadow-[4px_4px_0_#FFDE00]"
      : "rounded-none border-2 border-black bg-[#FFDE00]/10 shadow-[4px_4px_0_#000]",
    bar: d
      ? "rounded-none border-4 border-white bg-black shadow-[4px_4px_0_#FFDE00]"
      : "rounded-none border-4 border-black bg-white shadow-[4px_4px_0_#000]",
    menu: d
      ? "rounded-none border-4 border-white bg-black shadow-[6px_6px_0_#FFDE00]"
      : "rounded-none border-4 border-black bg-[#FFDE00] shadow-[6px_6px_0_#000]",
    menuItem: d
      ? "flex w-full items-center gap-2.5 rounded-none px-3 py-2 text-left font-mono text-sm uppercase text-white hover:bg-[#FFDE00] hover:text-black font-bold"
      : "flex w-full items-center gap-2.5 rounded-none px-3 py-2 text-left font-mono text-sm uppercase text-black hover:bg-black hover:text-white font-bold",
    overlay: "absolute inset-0 z-10 flex items-center justify-center bg-black/75 p-6 backdrop-blur-none",
    tooltip: d
      ? "rounded-none border-2 border-white bg-[#FFDE00] px-3 py-1.5 font-mono text-xs uppercase font-bold text-black shadow-[3px_3px_0_#fff]"
      : "rounded-none border-2 border-black bg-[#FFDE00] px-3 py-1.5 font-mono text-xs uppercase font-bold text-black shadow-[3px_3px_0_#000]",

    /* ---------- buttons ---------- */
    btnPrimary: d
      ? "inline-flex items-center justify-center gap-2 rounded-none border-4 border-white bg-[#FFDE00] px-6 py-2.5 font-mono text-sm font-black uppercase text-black shadow-[4px_4px_0_#fff] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#fff]"
      : "inline-flex items-center justify-center gap-2 rounded-none border-4 border-black bg-[#FFDE00] px-6 py-2.5 font-mono text-sm font-black uppercase text-black shadow-[4px_4px_0_#000] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000]",
    btnPrimarySm: d
      ? "inline-flex items-center justify-center gap-1.5 rounded-none border-2 border-white bg-[#FFDE00] px-4 py-2 font-mono text-xs font-black uppercase text-black shadow-[3px_3px_0_#fff] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#fff]"
      : "inline-flex items-center justify-center gap-1.5 rounded-none border-2 border-black bg-[#FFDE00] px-4 py-2 font-mono text-xs font-black uppercase text-black shadow-[3px_3px_0_#000] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#000]",
    btnSecondary: d
      ? "inline-flex items-center justify-center gap-2 rounded-none border-4 border-white bg-black px-6 py-2.5 font-mono text-sm font-bold uppercase text-white shadow-[4px_4px_0_#FFDE00] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#FFDE00]"
      : "inline-flex items-center justify-center gap-2 rounded-none border-4 border-black bg-white px-6 py-2.5 font-mono text-sm font-bold uppercase text-black shadow-[4px_4px_0_#000] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000]",
    iconBtn: d
      ? "inline-flex h-8 w-8 items-center justify-center rounded-none border-2 border-white bg-black text-white shadow-[2px_2px_0_#FFDE00] hover:bg-[#FFDE00] hover:text-black"
      : "inline-flex h-8 w-8 items-center justify-center rounded-none border-2 border-black bg-white text-black shadow-[2px_2px_0_#000] hover:bg-black hover:text-white",

    /* ---------- form ---------- */
    label: d
      ? "mb-2 block font-mono text-xs font-black uppercase tracking-wider text-[#FFDE00]"
      : "mb-2 block font-mono text-xs font-black uppercase tracking-wider text-black",
    input: d
      ? "w-full rounded-none border-4 border-white bg-black px-4 py-2.5 font-mono text-sm font-bold text-white placeholder-neutral-500 shadow-[4px_4px_0_#FFDE00] outline-none focus:bg-[#1a1a1a]"
      : "w-full rounded-none border-4 border-black bg-white px-4 py-2.5 font-mono text-sm font-bold text-black placeholder-neutral-400 shadow-[4px_4px_0_#000] outline-none focus:bg-[#FFDE00]/20",

    /* ---------- badges ---------- */
    badge: d
      ? "inline-flex items-center gap-1.5 rounded-none border-2 border-white bg-black px-3 py-1 font-mono text-[11px] font-black uppercase text-white shadow-[2px_2px_0_#FFDE00]"
      : "inline-flex items-center gap-1.5 rounded-none border-2 border-black bg-[#FFDE00] px-3 py-1 font-mono text-[11px] font-black uppercase text-black shadow-[2px_2px_0_#000]",
    badgeSolid: d
      ? "inline-flex items-center gap-1.5 rounded-none border-2 border-white bg-[#FF3B30] px-3 py-1 font-mono text-[11px] font-black uppercase text-white shadow-[2px_2px_0_#fff]"
      : "inline-flex items-center gap-1.5 rounded-none border-2 border-black bg-[#FF3B30] px-3 py-1 font-mono text-[11px] font-black uppercase text-white shadow-[2px_2px_0_#000]",

    /* ---------- tabs ---------- */
    tabList: d
      ? "inline-flex gap-2 border-b-4 border-white pb-1"
      : "inline-flex gap-2 border-b-4 border-black pb-1",
    tabActive: d
      ? "rounded-none border-2 border-white bg-[#FFDE00] px-4 py-2 font-mono text-xs font-black uppercase text-black shadow-[2px_2px_0_#fff]"
      : "rounded-none border-2 border-black bg-black px-4 py-2 font-mono text-xs font-black uppercase text-white shadow-[2px_2px_0_#FFDE00]",
    tabIdle: d
      ? "rounded-none border-2 border-white bg-black px-4 py-2 font-mono text-xs font-bold uppercase text-white hover:bg-[#FFDE00] hover:text-black"
      : "rounded-none border-2 border-black bg-white px-4 py-2 font-mono text-xs font-bold uppercase text-black hover:bg-black hover:text-white",

    /* ---------- switch ---------- */
    switchOn: d ? "border-2 border-white bg-[#FFDE00]" : "border-2 border-black bg-[#FFDE00]",
    switchOff: d ? "border-2 border-white bg-black" : "border-2 border-black bg-white",

    /* ---------- misc ---------- */
    track: d ? "border-2 border-white bg-black" : "border-2 border-black bg-neutral-200",
    fill: d ? "bg-[#FFDE00]" : "bg-black",
    skeleton: d ? "bg-neutral-800 animate-pulse border-2 border-white" : "bg-neutral-300 animate-pulse border-2 border-black",
    divider: d ? "divide-y-4 divide-white" : "divide-y-4 divide-black",
    hairline: d ? "border-2 border-white" : "border-2 border-black",
    dotRing: d ? "border-2 border-white" : "border-2 border-black",
    ring: d ? "ring-4 ring-black" : "ring-4 ring-black",
    imagePlaceholder: d
      ? "border-4 border-white bg-[#222] text-[#FFDE00]"
      : "border-4 border-black bg-[#FFDE00] text-black",
    successBg: d ? "border-2 border-white bg-emerald-400 text-black font-mono font-bold" : "border-2 border-black bg-emerald-300 text-black font-mono font-bold shadow-[4px_4px_0_#000]",
    errorBg: d ? "border-2 border-white bg-[#FF3B30] text-white font-mono font-bold" : "border-2 border-black bg-[#FF3B30] text-white font-mono font-bold shadow-[4px_4px_0_#000]",
    successLine: "bg-black",
    errorLine: "bg-white",
    dangerText: d ? "!text-[#FF3B30] hover:!bg-[#FF3B30] hover:!text-white" : "!text-[#FF3B30] hover:!bg-[#FF3B30] hover:!text-white",
  };
}

export type BrutalistKit = ReturnType<typeof brutalist>;
