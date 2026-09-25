import type { Mode } from "@/lib/styles/types";

/**
 * Neomorphism class kit — soft UI, extruded surfaces.
 * Dual light/dark shadow pairs on same-hue canvas, pressed inset states.
 */
export function neomorphism(m: Mode) {
  const d = m === "dark";
  return {
    /* ---------- text ---------- */
    text: d ? "text-[#a0aab8]" : "text-[#5a6781]",
    strong: d ? "text-[#e2e8f0]" : "text-[#2d3748]",
    muted: d ? "text-[#718096]" : "text-[#8a94a6]",
    faint: d ? "text-[#4a5568]" : "text-[#a0aec0]",
    serif: "font-sans font-medium",

    /* ---------- stage ---------- */
    stage: d ? "bg-[#1c2026]" : "bg-[#e0e5ec]",

    /* ---------- panels ---------- */
    panel: d
      ? "rounded-2xl bg-[#1c2026] p-7 shadow-[8px_8px_16px_#14171c,-8px_-8px_16px_#242930]"
      : "rounded-2xl bg-[#e0e5ec] p-7 shadow-[8px_8px_16px_#b8bec7,-8px_-8px_16px_#ffffff]",
    panelSoft: d
      ? "rounded-xl bg-[#1c2026] shadow-[inset_4px_4px_8px_#14171c,inset_-4px_-4px_8px_#242930]"
      : "rounded-xl bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#b8bec7,inset_-4px_-4px_8px_#ffffff]",
    bar: d
      ? "rounded-2xl bg-[#1c2026] shadow-[6px_6px_12px_#14171c,-6px_-6px_12px_#242930]"
      : "rounded-2xl bg-[#e0e5ec] shadow-[6px_6px_12px_#b8bec7,-6px_-6px_12px_#ffffff]",
    menu: d
      ? "rounded-2xl bg-[#1c2026] p-2 shadow-[8px_8px_16px_#14171c,-8px_-8px_16px_#242930]"
      : "rounded-2xl bg-[#e0e5ec] p-2 shadow-[8px_8px_16px_#b8bec7,-8px_-8px_16px_#ffffff]",
    menuItem: d
      ? "flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-xs font-medium text-[#a0aab8] transition hover:bg-[#1c2026] hover:shadow-[inset_3px_3px_6px_#14171c,inset_-3px_-3px_6px_#242930] hover:text-[#6d7df2]"
      : "flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-xs font-medium text-[#5a6781] transition hover:bg-[#e0e5ec] hover:shadow-[inset_3px_3px_6px_#b8bec7,inset_-3px_-3px_6px_#ffffff] hover:text-[#6d7df2]",
    overlay: "absolute inset-0 z-10 flex items-center justify-center bg-[#1c2026]/70 p-6 backdrop-blur-sm",
    tooltip: d
      ? "rounded-xl bg-[#1c2026] px-3.5 py-2 text-xs font-medium text-[#6d7df2] shadow-[4px_4px_8px_#14171c,-4px_-4px_8px_#242930]"
      : "rounded-xl bg-[#e0e5ec] px-3.5 py-2 text-xs font-medium text-[#6d7df2] shadow-[4px_4px_8px_#b8bec7,-4px_-4px_8px_#ffffff]",

    /* ---------- buttons ---------- */
    btnPrimary: d
      ? "inline-flex items-center justify-center gap-2 rounded-xl bg-[#6d7df2] px-6 py-2.5 text-xs font-semibold text-white shadow-[4px_4px_10px_#14171c,-4px_-4px_10px_#242930] transition-all hover:bg-[#5c6ce0] active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.3)]"
      : "inline-flex items-center justify-center gap-2 rounded-xl bg-[#6d7df2] px-6 py-2.5 text-xs font-semibold text-white shadow-[4px_4px_10px_#b8bec7,-4px_-4px_10px_#ffffff] transition-all hover:bg-[#5c6ce0] active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2)]",
    btnPrimarySm: d
      ? "inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#6d7df2] px-4 py-2 text-xs font-semibold text-white shadow-[3px_3px_8px_#14171c,-3px_-3px_8px_#242930] transition-all hover:bg-[#5c6ce0]"
      : "inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#6d7df2] px-4 py-2 text-xs font-semibold text-white shadow-[3px_3px_8px_#b8bec7,-3px_-3px_8px_#ffffff] transition-all hover:bg-[#5c6ce0]",
    btnSecondary: d
      ? "inline-flex items-center justify-center gap-2 rounded-xl bg-[#1c2026] px-6 py-2.5 text-xs font-medium text-[#a0aab8] shadow-[5px_5px_10px_#14171c,-5px_-5px_10px_#242930] transition-all hover:text-white active:shadow-[inset_3px_3px_6px_#14171c,inset_-3px_-3px_6px_#242930]"
      : "inline-flex items-center justify-center gap-2 rounded-xl bg-[#e0e5ec] px-6 py-2.5 text-xs font-medium text-[#5a6781] shadow-[5px_5px_10px_#b8bec7,-5px_-5px_10px_#ffffff] transition-all hover:text-[#2d3748] active:shadow-[inset_3px_3px_6px_#b8bec7,inset_-3px_-3px_6px_#ffffff]",
    iconBtn: d
      ? "inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#1c2026] text-[#a0aab8] shadow-[4px_4px_8px_#14171c,-4px_-4px_8px_#242930] hover:text-[#6d7df2] active:shadow-[inset_2px_2px_5px_#14171c,inset_-2px_-2px_5px_#242930]"
      : "inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#e0e5ec] text-[#5a6781] shadow-[4px_4px_8px_#b8bec7,-4px_-4px_8px_#ffffff] hover:text-[#6d7df2] active:shadow-[inset_2px_2px_5px_#b8bec7,inset_-2px_-2px_5px_#ffffff]",

    /* ---------- form ---------- */
    label: d
      ? "mb-2 block text-xs font-semibold tracking-wider text-[#6d7df2]"
      : "mb-2 block text-xs font-semibold tracking-wider text-[#6d7df2]",
    input: d
      ? "w-full rounded-xl bg-[#1c2026] px-4 py-2.5 text-xs font-medium text-white placeholder-[#718096] shadow-[inset_3px_3px_6px_#14171c,inset_-3px_-3px_6px_#242930] outline-none"
      : "w-full rounded-xl bg-[#e0e5ec] px-4 py-2.5 text-xs font-medium text-[#2d3748] placeholder-[#8a94a6] shadow-[inset_3px_3px_6px_#b8bec7,inset_-3px_-3px_6px_#ffffff] outline-none",

    /* ---------- badges ---------- */
    badge: d
      ? "inline-flex items-center gap-1.5 rounded-full bg-[#1c2026] px-3.5 py-1.5 text-[11px] font-medium text-[#6d7df2] shadow-[3px_3px_6px_#14171c,-3px_-3px_6px_#242930]"
      : "inline-flex items-center gap-1.5 rounded-full bg-[#e0e5ec] px-3.5 py-1.5 text-[11px] font-medium text-[#6d7df2] shadow-[3px_3px_6px_#b8bec7,-3px_-3px_6px_#ffffff]",
    badgeSolid: d
      ? "inline-flex items-center gap-1.5 rounded-full bg-[#6d7df2] px-3.5 py-1.5 text-[11px] font-semibold text-white shadow-[3px_3px_6px_#14171c,-3px_-3px_6px_#242930]"
      : "inline-flex items-center gap-1.5 rounded-full bg-[#6d7df2] px-3.5 py-1.5 text-[11px] font-semibold text-white shadow-[3px_3px_6px_#b8bec7,-3px_-3px_6px_#ffffff]",

    /* ---------- tabs ---------- */
    tabList: d
      ? "inline-flex gap-2 rounded-2xl bg-[#1c2026] p-1.5 shadow-[inset_3px_3px_6px_#14171c,inset_-3px_-3px_6px_#242930]"
      : "inline-flex gap-2 rounded-2xl bg-[#e0e5ec] p-1.5 shadow-[inset_3px_3px_6px_#b8bec7,inset_-3px_-3px_6px_#ffffff]",
    tabActive: d
      ? "rounded-xl bg-[#1c2026] px-4 py-2 text-xs font-semibold text-[#6d7df2] shadow-[3px_3px_6px_#14171c,-3px_-3px_6px_#242930]"
      : "rounded-xl bg-[#e0e5ec] px-4 py-2 text-xs font-semibold text-[#6d7df2] shadow-[3px_3px_6px_#b8bec7,-3px_-3px_6px_#ffffff]",
    tabIdle: d
      ? "rounded-xl bg-transparent px-4 py-2 text-xs font-medium text-[#718096] hover:text-[#a0aab8]"
      : "rounded-xl bg-transparent px-4 py-2 text-xs font-medium text-[#8a94a6] hover:text-[#5a6781]",

    /* ---------- switch ---------- */
    switchOn: d
      ? "bg-[#1c2026] shadow-[inset_3px_3px_6px_#14171c,inset_-3px_-3px_6px_#242930]"
      : "bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#b8bec7,inset_-3px_-3px_6px_#ffffff]",
    switchOff: d
      ? "bg-[#1c2026] shadow-[inset_3px_3px_6px_#14171c,inset_-3px_-3px_6px_#242930]"
      : "bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#b8bec7,inset_-3px_-3px_6px_#ffffff]",

    /* ---------- misc ---------- */
    track: d ? "bg-[#1c2026] shadow-[inset_2px_2px_4px_#14171c,inset_-2px_-2px_4px_#242930]" : "bg-[#e0e5ec] shadow-[inset_2px_2px_4px_#b8bec7,inset_-2px_-2px_4px_#ffffff]",
    fill: "bg-[#6d7df2]",
    skeleton: d ? "bg-[#1c2026] shadow-[3px_3px_6px_#14171c,-3px_-3px_6px_#242930] animate-pulse rounded-xl" : "bg-[#e0e5ec] shadow-[3px_3px_6px_#b8bec7,-3px_-3px_6px_#ffffff] animate-pulse rounded-xl",
    divider: d ? "divide-[#14171c]" : "divide-[#b8bec7]",
    hairline: d ? "border-[#14171c]" : "border-[#b8bec7]",
    dotRing: d ? "border-[#1c2026]" : "border-[#e0e5ec]",
    ring: "ring-[#6d7df2]",
    imagePlaceholder: d
      ? "bg-[#1c2026] shadow-[inset_4px_4px_8px_#14171c,inset_-4px_-4px_8px_#242930] text-[#6d7df2]"
      : "bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#b8bec7,inset_-4px_-4px_8px_#ffffff] text-[#6d7df2]",
    successBg: d ? "bg-[#1c2026] text-emerald-400 shadow-[4px_4px_8px_#14171c,-4px_-4px_8px_#242930]" : "bg-[#e0e5ec] text-emerald-600 shadow-[4px_4px_8px_#b8bec7,-4px_-4px_8px_#ffffff]",
    errorBg: d ? "bg-[#1c2026] text-rose-400 shadow-[4px_4px_8px_#14171c,-4px_-4px_8px_#242930]" : "bg-[#e0e5ec] text-rose-600 shadow-[4px_4px_8px_#b8bec7,-4px_-4px_8px_#ffffff]",
    successLine: "bg-emerald-500",
    errorLine: "bg-rose-500",
    dangerText: "!text-rose-500",
  };
}

export type NeomorphismKit = ReturnType<typeof neomorphism>;
