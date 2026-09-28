import type { Mode } from "@/lib/styles/types";

/**
 * Neobrutalist class kit — #FFE500 accent, border-4 black,
 * hard offset shadow (shadow-[4px_4px_0_#000]), bright flat fills, radius-0.
 */
export function neobrutalist(m: Mode) {
  const d = m === "dark";
  return {
    /* ---------- text ---------- */
    text: d ? "text-white font-mono font-bold" : "text-black font-mono font-bold",
    strong: d ? "text-white font-black" : "text-black font-black",
    muted: d ? "text-neutral-300 font-bold" : "text-neutral-700 font-bold",
    faint: d ? "text-neutral-400" : "text-neutral-600",
    serif: "font-mono font-black uppercase tracking-tight",

    /* ---------- stage ---------- */
    stage: d ? "bg-[#111111]" : "bg-[#FFE500]",

    /* ---------- panels ---------- */
    panel: d
      ? "rounded-none border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0_#FFE500]"
      : "rounded-none border-4 border-black bg-white p-6 text-black shadow-[6px_6px_0_#000]",
    panelSoft: d
      ? "rounded-none border-4 border-black bg-[#1A1A1A] p-4 shadow-[4px_4px_0_#FFE500]"
      : "rounded-none border-4 border-black bg-[#FFE500] p-4 shadow-[4px_4px_0_#000]",
    bar: d
      ? "rounded-none border-4 border-black bg-black p-4 shadow-[4px_4px_0_#FFE500]"
      : "rounded-none border-4 border-black bg-white p-4 shadow-[4px_4px_0_#000]",
    menu: d
      ? "rounded-none border-4 border-black bg-[#FFE500] p-2 text-black shadow-[6px_6px_0_#FFF]"
      : "rounded-none border-4 border-black bg-[#FFE500] p-2 text-black shadow-[6px_6px_0_#000]",
    menuItem: d
      ? "flex w-full items-center gap-2.5 rounded-none px-3 py-2 text-left font-mono text-xs font-black uppercase text-black hover:bg-black hover:text-white"
      : "flex w-full items-center gap-2.5 rounded-none px-3 py-2 text-left font-mono text-xs font-black uppercase text-black hover:bg-[#FF5C00] hover:text-white",
    overlay: "absolute inset-0 z-10 flex items-center justify-center bg-black/80 p-6 backdrop-blur-none",
    tooltip: d
      ? "rounded-none border-2 border-black bg-[#FF5C00] px-3.5 py-1.5 font-mono text-xs font-black uppercase text-white shadow-[3px_3px_0_#FFF]"
      : "rounded-none border-2 border-black bg-[#FFE500] px-3.5 py-1.5 font-mono text-xs font-black uppercase text-black shadow-[3px_3px_0_#000]",

    /* ---------- buttons ---------- */
    btnPrimary: d
      ? "inline-flex items-center justify-center gap-2 rounded-none border-4 border-black bg-[#FFE500] px-6 py-2.5 font-mono text-xs font-black uppercase text-black shadow-[4px_4px_0_#FFF] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#FFF]"
      : "inline-flex items-center justify-center gap-2 rounded-none border-4 border-black bg-[#FFE500] px-6 py-2.5 font-mono text-xs font-black uppercase text-black shadow-[4px_4px_0_#000] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000]",
    btnPrimarySm: d
      ? "inline-flex items-center justify-center gap-1.5 rounded-none border-2 border-black bg-[#FF5C00] px-4 py-1.5 font-mono text-xs font-black uppercase text-white shadow-[3px_3px_0_#FFF] transition-all hover:translate-x-[1px] hover:translate-y-[1px]"
      : "inline-flex items-center justify-center gap-1.5 rounded-none border-2 border-black bg-[#FF5C00] px-4 py-1.5 font-mono text-xs font-black uppercase text-white shadow-[3px_3px_0_#000] transition-all hover:translate-x-[1px] hover:translate-y-[1px]",
    btnSecondary: d
      ? "inline-flex items-center justify-center gap-2 rounded-none border-4 border-black bg-black px-6 py-2.5 font-mono text-xs font-black uppercase text-white shadow-[4px_4px_0_#FFE500] transition-all hover:bg-[#1A1A1A]"
      : "inline-flex items-center justify-center gap-2 rounded-none border-4 border-black bg-white px-6 py-2.5 font-mono text-xs font-black uppercase text-black shadow-[4px_4px_0_#000] transition-all hover:bg-[#FFE500]",
    iconBtn: d
      ? "inline-flex h-8 w-8 items-center justify-center rounded-none border-2 border-black bg-black text-white shadow-[2px_2px_0_#FFE500] hover:bg-[#FFE500] hover:text-black"
      : "inline-flex h-8 w-8 items-center justify-center rounded-none border-2 border-black bg-white text-black shadow-[2px_2px_0_#000] hover:bg-black hover:text-white",

    /* ---------- form ---------- */
    label: d
      ? "mb-2 block font-mono text-xs font-black uppercase tracking-wider text-[#FFE500]"
      : "mb-2 block font-mono text-xs font-black uppercase tracking-wider text-black",
    input: d
      ? "w-full rounded-none border-4 border-black bg-black px-4 py-2.5 font-mono text-xs font-bold text-white placeholder-neutral-500 shadow-[4px_4px_0_#FFE500] outline-none focus:bg-[#1A1A1A]"
      : "w-full rounded-none border-4 border-black bg-white px-4 py-2.5 font-mono text-xs font-bold text-black placeholder-neutral-400 shadow-[4px_4px_0_#000] outline-none focus:bg-[#FFE500]/40",

    /* ---------- badges ---------- */
    badge: d
      ? "inline-flex items-center gap-1.5 rounded-none border-2 border-black bg-[#FFE500] px-3 py-1 font-mono text-[10px] font-black uppercase text-black shadow-[2px_2px_0_#FFF]"
      : "inline-flex items-center gap-1.5 rounded-none border-2 border-black bg-[#FFE500] px-3 py-1 font-mono text-[10px] font-black uppercase text-black shadow-[2px_2px_0_#000]",
    badgeSolid: d
      ? "inline-flex items-center gap-1.5 rounded-none border-2 border-black bg-[#FF5C00] px-3 py-1 font-mono text-[10px] font-black uppercase text-white shadow-[2px_2px_0_#000]"
      : "inline-flex items-center gap-1.5 rounded-none border-2 border-black bg-[#FF5C00] px-3 py-1 font-mono text-[10px] font-black uppercase text-white shadow-[2px_2px_0_#000]",

    /* ---------- tabs ---------- */
    tabList: d
      ? "inline-flex gap-2 border-b-4 border-black pb-1"
      : "inline-flex gap-2 border-b-4 border-black pb-1",
    tabActive: d
      ? "rounded-none border-2 border-black bg-[#FFE500] px-4 py-2 font-mono text-xs font-black uppercase text-black shadow-[2px_2px_0_#FFF]"
      : "rounded-none border-2 border-black bg-[#FFE500] px-4 py-2 font-mono text-xs font-black uppercase text-black shadow-[2px_2px_0_#000]",
    tabIdle: d
      ? "rounded-none border-2 border-black bg-black px-4 py-2 font-mono text-xs font-bold uppercase text-white hover:bg-[#FF5C00]"
      : "rounded-none border-2 border-black bg-white px-4 py-2 font-mono text-xs font-bold uppercase text-black hover:bg-black hover:text-white",

    /* ---------- switch ---------- */
    switchOn: d ? "border-2 border-black bg-[#FFE500]" : "border-2 border-black bg-[#FFE500]",
    switchOff: d ? "border-2 border-black bg-black" : "border-2 border-black bg-white",

    /* ---------- misc ---------- */
    track: d ? "border-2 border-black bg-black" : "border-2 border-black bg-white",
    fill: d ? "bg-[#FFE500]" : "bg-[#FF5C00]",
    skeleton: d ? "bg-neutral-800 border-2 border-black animate-pulse rounded-none" : "bg-[#FFE500]/40 border-2 border-black animate-pulse rounded-none",
    divider: d ? "divide-y-4 divide-black" : "divide-y-4 divide-black",
    hairline: d ? "border-2 border-black" : "border-2 border-black",
    dotRing: d ? "border-2 border-black" : "border-2 border-black",
    ring: "ring-4 ring-black",
    imagePlaceholder: d
      ? "border-4 border-black bg-black text-[#FFE500]"
      : "border-4 border-black bg-[#FFE500] text-black",
    successBg: d ? "border-4 border-black bg-[#00E5FF] text-black font-mono font-black shadow-[4px_4px_0_#FFF]" : "border-4 border-black bg-[#00E5FF] text-black font-mono font-black shadow-[4px_4px_0_#000]",
    errorBg: d ? "border-4 border-black bg-[#FF007A] text-white font-mono font-black shadow-[4px_4px_0_#FFF]" : "border-4 border-black bg-[#FF007A] text-white font-mono font-black shadow-[4px_4px_0_#000]",
    successLine: "bg-black",
    errorLine: "bg-white",
    dangerText: "!text-[#FF007A]",
  };
}

export type NeobrutalistKit = ReturnType<typeof neobrutalist>;
