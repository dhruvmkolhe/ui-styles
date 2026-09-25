import type { Mode } from "@/lib/styles/types";

/**
 * Retro / Y2K class kit — 2000s chrome & candy.
 * Hot pink, cyan and lime gradients, chunky borders, tilted badges, starbursts.
 */
export function retroY2k(m: Mode) {
  const d = m === "dark";
  return {
    /* ---------- text ---------- */
    text: d ? "text-[#f3e8ff]" : "text-[#2b0a3d]",
    strong: d ? "text-white font-bold" : "text-[#2b0a3d] font-black",
    muted: d ? "text-fuchsia-200" : "text-[#6b21a8]",
    faint: d ? "text-purple-300/70" : "text-purple-600/70",
    serif: "font-sans font-black tracking-wide",

    /* ---------- stage ---------- */
    stage: d
      ? "bg-gradient-to-br from-[#1d0630] via-[#2d0945] to-[#071830]"
      : "bg-gradient-to-br from-[#fff0f7] via-[#f3e8ff] to-[#e6fcff]",

    /* ---------- panels ---------- */
    panel: d
      ? "rounded-2xl border-[3px] border-fuchsia-400 bg-[#25083d]/90 p-6 shadow-[6px_6px_0_#B6FF00]"
      : "rounded-2xl border-[3px] border-[#2b0a3d] bg-white p-6 shadow-[6px_6px_0_#FF2E93]",
    panelSoft: d
      ? "rounded-xl border-[3px] border-purple-400/50 bg-[#1d0630]"
      : "rounded-xl border-[3px] border-[#2b0a3d]/30 bg-[#FFF0F7]",
    bar: d
      ? "rounded-2xl border-[3px] border-cyan-400 bg-[#25083d] shadow-[4px_4px_0_#FF2E93]"
      : "rounded-2xl border-[3px] border-[#2b0a3d] bg-white shadow-[4px_4px_0_#00E5FF]",
    menu: d
      ? "rounded-2xl border-[3px] border-fuchsia-400 bg-[#25083d] p-2 shadow-[6px_6px_0_#00E5FF]"
      : "rounded-2xl border-[3px] border-[#2b0a3d] bg-[#B6FF00] p-2 shadow-[6px_6px_0_#FF2E93]",
    menuItem: d
      ? "flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left font-bold text-xs uppercase text-white hover:bg-[#FF2E93] hover:text-white"
      : "flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left font-bold text-xs uppercase text-[#2b0a3d] hover:bg-[#FF2E93] hover:text-white",
    overlay: "absolute inset-0 z-10 flex items-center justify-center bg-[#2b0a3d]/80 p-6 backdrop-blur-sm",
    tooltip: d
      ? "rounded-full border-[3px] border-white bg-[#FF2E93] px-4 py-1.5 font-bold text-xs text-white shadow-[3px_3px_0_#B6FF00]"
      : "rounded-full border-[3px] border-[#2b0a3d] bg-[#B6FF00] px-4 py-1.5 font-bold text-xs text-[#2b0a3d] shadow-[3px_3px_0_#FF2E93]",

    /* ---------- buttons ---------- */
    btnPrimary: d
      ? "inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-white bg-gradient-to-r from-[#FF2E93] to-[#7C4DFF] px-6 py-2.5 font-bold text-xs uppercase text-white shadow-[4px_4px_0_#B6FF00] transition-transform hover:-rotate-1 active:translate-y-0.5"
      : "inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-[#2b0a3d] bg-[#B6FF00] px-6 py-2.5 font-black text-xs uppercase text-[#2b0a3d] shadow-[4px_4px_0_#FF2E93] transition-transform hover:rotate-1 active:translate-y-0.5",
    btnPrimarySm: d
      ? "inline-flex items-center justify-center gap-1.5 rounded-full border-[3px] border-[#2b0a3d] bg-[#00E5FF] px-4 py-1.5 font-black text-xs uppercase text-[#2b0a3d] shadow-[3px_3px_0_#FF2E93] transition-transform hover:-rotate-1"
      : "inline-flex items-center justify-center gap-1.5 rounded-full border-[3px] border-[#2b0a3d] bg-[#00E5FF] px-4 py-1.5 font-black text-xs uppercase text-[#2b0a3d] shadow-[3px_3px_0_#2b0a3d] transition-transform hover:rotate-1",
    btnSecondary: d
      ? "inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-white bg-[#00E5FF] px-6 py-2.5 font-bold text-xs uppercase text-[#2b0a3d] shadow-[4px_4px_0_#FF2E93] transition-transform hover:rotate-1"
      : "inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-[#2b0a3d] bg-white px-6 py-2.5 font-bold text-xs uppercase text-[#2b0a3d] shadow-[4px_4px_0_#B6FF00] transition-transform hover:-rotate-1",
    iconBtn: d
      ? "inline-flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-white bg-[#FF2E93] text-white shadow-[2px_2px_0_#00E5FF] hover:bg-[#B6FF00] hover:text-black"
      : "inline-flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-[#2b0a3d] bg-[#FF2E93] text-white shadow-[2px_2px_0_#2b0a3d] hover:bg-[#B6FF00] hover:text-[#2b0a3d]",

    /* ---------- form ---------- */
    label: d
      ? "mb-2 block font-bold text-xs uppercase tracking-wider text-[#B6FF00]"
      : "mb-2 block font-black text-xs uppercase tracking-wider text-[#FF2E93]",
    input: d
      ? "w-full rounded-2xl border-[3px] border-fuchsia-400 bg-[#1d0630] px-4 py-2.5 font-bold text-xs text-white placeholder-purple-300/50 shadow-[3px_3px_0_#00E5FF] outline-none"
      : "w-full rounded-2xl border-[3px] border-[#2b0a3d] bg-white px-4 py-2.5 font-bold text-xs text-[#2b0a3d] placeholder-purple-400/50 shadow-[3px_3px_0_#B6FF00] outline-none",

    /* ---------- badges ---------- */
    badge: d
      ? "inline-flex items-center gap-1.5 rounded-full border-[2.5px] border-white bg-[#FF2E93] px-3.5 py-1 font-bold text-[10px] uppercase text-white shadow-[2px_2px_0_#00E5FF]"
      : "inline-flex items-center gap-1.5 rounded-full border-[2.5px] border-[#2b0a3d] bg-[#B6FF00] px-3.5 py-1 font-black text-[10px] uppercase text-[#2b0a3d] shadow-[2px_2px_0_#FF2E93]",
    badgeSolid: d
      ? "inline-flex items-center gap-1.5 rounded-full border-[2.5px] border-white bg-[#00E5FF] px-3.5 py-1 font-bold text-[10px] uppercase text-[#2b0a3d] shadow-[2px_2px_0_#FF2E93]"
      : "inline-flex items-center gap-1.5 rounded-full border-[2.5px] border-[#2b0a3d] bg-[#FF2E93] px-3.5 py-1 font-black text-[10px] uppercase text-white shadow-[2px_2px_0_#B6FF00]",

    /* ---------- tabs ---------- */
    tabList: d
      ? "inline-flex gap-2 rounded-full border-[3px] border-white bg-[#1d0630] p-1.5"
      : "inline-flex gap-2 rounded-full border-[3px] border-[#2b0a3d] bg-white p-1.5 shadow-[4px_4px_0_#B6FF00]",
    tabActive: d
      ? "rounded-full border-[2px] border-white bg-[#FF2E93] px-4 py-1.5 font-bold text-xs uppercase text-white shadow-[2px_2px_0_#B6FF00]"
      : "rounded-full border-[2px] border-[#2b0a3d] bg-[#FF2E93] px-4 py-1.5 font-black text-xs uppercase text-white shadow-[2px_2px_0_#2b0a3d]",
    tabIdle: d
      ? "rounded-full px-4 py-1.5 font-bold text-xs uppercase text-purple-200 hover:text-white"
      : "rounded-full px-4 py-1.5 font-bold text-xs uppercase text-[#2b0a3d] hover:text-[#FF2E93]",

    /* ---------- switch ---------- */
    switchOn: d ? "border-[3px] border-white bg-[#FF2E93]" : "border-[3px] border-[#2b0a3d] bg-[#FF2E93]",
    switchOff: d ? "border-[3px] border-white bg-[#1d0630]" : "border-[3px] border-[#2b0a3d] bg-white",

    /* ---------- misc ---------- */
    track: d ? "border-[2.5px] border-white bg-[#1d0630]" : "border-[2.5px] border-[#2b0a3d] bg-white",
    fill: "bg-gradient-to-r from-[#FF2E93] via-[#7C4DFF] to-[#00E5FF]",
    skeleton: d ? "bg-purple-900/60 border-[2px] border-fuchsia-400 animate-pulse rounded-2xl" : "bg-fuchsia-100 border-[2px] border-[#2b0a3d] animate-pulse rounded-2xl",
    divider: d ? "divide-y-[3px] divide-fuchsia-400" : "divide-y-[3px] divide-[#2b0a3d]",
    hairline: d ? "border-[3px] border-fuchsia-400" : "border-[3px] border-[#2b0a3d]",
    dotRing: d ? "border-[2.5px] border-white" : "border-[2.5px] border-[#2b0a3d]",
    ring: "ring-[#FF2E93]",
    imagePlaceholder: d
      ? "border-[3px] border-white bg-gradient-to-tr from-[#FF2E93] to-[#00E5FF] text-white"
      : "border-[3px] border-[#2b0a3d] bg-gradient-to-tr from-[#FF2E93] via-[#7C4DFF] to-[#00E5FF] text-white",
    successBg: d ? "border-[3px] border-white bg-[#B6FF00] text-[#2b0a3d] font-bold shadow-[4px_4px_0_#FF2E93]" : "border-[3px] border-[#2b0a3d] bg-[#B6FF00] text-[#2b0a3d] font-black shadow-[4px_4px_0_#FF2E93]",
    errorBg: d ? "border-[3px] border-white bg-[#FF2E93] text-white font-bold shadow-[4px_4px_0_#00E5FF]" : "border-[3px] border-[#2b0a3d] bg-[#FF2E93] text-white font-black shadow-[4px_4px_0_#B6FF00]",
    successLine: "bg-[#2b0a3d]",
    errorLine: "bg-white",
    dangerText: "!text-[#FF2E93]",
  };
}

export type RetroY2kKit = ReturnType<typeof retroY2k>;
