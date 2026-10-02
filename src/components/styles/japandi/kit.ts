import type { Mode } from "@/lib/styles/types";

/**
 * Japandi class kit — warm neutrals, thin 1px borders, serif accents,
 * generous whitespace and zero decoration.
 * Shared by the live previews and the copyable snippets.
 */
export function japandi(m: Mode) {
  const d = m === "dark";
  return {
    /* ---------- text ---------- */
    text: d ? "text-[#EDE6D8]" : "text-[#3D3529]",
    strong: d ? "text-[#F2ECDF]" : "text-[#33291D]",
    muted: d ? "text-[#C9BCA6]/75" : "text-[#6B5D4A]",
    faint: d ? "text-[#C9BCA6]/50" : "text-[#9A8A72]",
    serif: "font-serif",

    /* ---------- stage ---------- */
    stage: d ? "bg-[#1B1610]" : "bg-[#F5F0E8]",

    /* ---------- panels ---------- */
    panel: d
      ? "rounded-lg border border-[#A98D6B]/25 bg-[#241E16] shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
      : "rounded-lg border border-[#8B7355]/25 bg-[#FBF8F1] shadow-[0_1px_2px_rgba(61,53,41,0.05)]",
    panelSoft: d
      ? "rounded-md border border-[#A98D6B]/20 bg-[#211B14]"
      : "rounded-md border border-[#8B7355]/20 bg-[#FAF6EE]",
    bar: d
      ? "rounded-md border border-[#A98D6B]/25 bg-[#221C15]"
      : "rounded-md border border-[#8B7355]/25 bg-[#FBF8F1]",
    menu: d
      ? "rounded-md border border-[#A98D6B]/30 bg-[#262019] shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
      : "rounded-md border border-[#8B7355]/30 bg-[#FDFBF6] shadow-[0_8px_24px_rgba(61,53,41,0.12)]",
    menuItem: d
      ? "flex w-full items-center gap-2.5 rounded px-3 py-2 text-left text-sm text-[#C9BCA6]/80 transition hover:bg-[#A98D6B]/10 hover:text-[#EDE6D8]"
      : "flex w-full items-center gap-2.5 rounded px-3 py-2 text-left text-sm text-[#6B5D4A] transition hover:bg-[#8B7355]/[0.08] hover:text-[#3D3529]",
    overlay: "absolute inset-0 z-10 flex items-center justify-center bg-[#1B1610]/50 p-6",
    tooltip: d
      ? "rounded border border-[#A98D6B]/30 bg-[#2A231A] px-3 py-1.5 text-xs text-[#EDE6D8] shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
      : "rounded border border-[#8B7355]/30 bg-[#3D3529] px-3 py-1.5 text-xs text-[#F5F0E8] shadow-[0_4px_12px_rgba(61,53,41,0.2)]",

    /* ---------- buttons ---------- */
    btnPrimary: d
      ? "inline-flex items-center justify-center gap-2 rounded-md bg-[#A98D6B] px-6 py-2.5 text-sm tracking-wide text-[#201B15] transition-colors hover:bg-[#BCA182]"
      : "inline-flex items-center justify-center gap-2 rounded-md bg-[#8B7355] px-6 py-2.5 text-sm tracking-wide text-[#F5F0E8] transition-colors hover:bg-[#77603F]",
    btnPrimarySm: d
      ? "inline-flex items-center justify-center gap-1.5 rounded-md bg-[#A98D6B] px-4 py-2 text-xs tracking-wide text-[#201B15] transition-colors hover:bg-[#BCA182]"
      : "inline-flex items-center justify-center gap-1.5 rounded-md bg-[#8B7355] px-4 py-2 text-xs tracking-wide text-[#F5F0E8] transition-colors hover:bg-[#77603F]",
    btnSecondary: d
      ? "inline-flex items-center justify-center gap-2 rounded-md border border-[#A98D6B]/40 bg-transparent px-6 py-2.5 text-sm tracking-wide text-[#C9BCA6] transition-colors hover:bg-[#A98D6B]/10"
      : "inline-flex items-center justify-center gap-2 rounded-md border border-[#8B7355]/40 bg-transparent px-6 py-2.5 text-sm tracking-wide text-[#5C4A33] transition-colors hover:bg-[#8B7355]/[0.07]",
    iconBtn: d
      ? "inline-flex h-7 w-7 items-center justify-center rounded border border-[#A98D6B]/25 text-[#C9BCA6]/70 transition hover:bg-[#A98D6B]/10 hover:text-[#EDE6D8]"
      : "inline-flex h-7 w-7 items-center justify-center rounded border border-[#8B7355]/25 text-[#8B7355] transition hover:bg-[#8B7355]/[0.08] hover:text-[#3D3529]",

    /* ---------- form ---------- */
    label: d
      ? "mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-[#EDE6D8]"
      : "mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-[#33291D]",
    input: d
      ? "w-full rounded-md border border-[#A98D6B]/30 bg-[#201B15] px-4 py-2.5 text-sm text-[#EDE6D8] placeholder-[#C9BCA6]/35 outline-none transition-colors focus:border-[#A98D6B]/70"
      : "w-full rounded-md border border-[#8B7355]/30 bg-white/50 px-4 py-2.5 text-sm text-[#3D3529] placeholder-[#8B7355]/45 outline-none transition-colors focus:border-[#8B7355]",

    /* ---------- badges ---------- */
    badge: d
      ? "inline-flex items-center gap-1.5 rounded-full border border-[#A98D6B]/30 bg-[#A98D6B]/10 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-[#C8B394]"
      : "inline-flex items-center gap-1.5 rounded-full border border-[#8B7355]/30 bg-[#8B7355]/[0.07] px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-[#7A6449]",
    badgeSolid: d
      ? "inline-flex items-center gap-1.5 rounded-full bg-[#A98D6B] px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-[#201B15]"
      : "inline-flex items-center gap-1.5 rounded-full bg-[#8B7355] px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-[#F5F0E8]",

    /* ---------- tabs ---------- */
    tabList: d
      ? "inline-flex gap-6 border-b border-[#A98D6B]/25"
      : "inline-flex gap-6 border-b border-[#8B7355]/25",
    tabActive: d
      ? "-mb-px border-b-2 border-[#A98D6B] pb-2.5 text-sm tracking-wide text-[#F2ECDF] transition"
      : "-mb-px border-b-2 border-[#8B7355] pb-2.5 text-sm tracking-wide text-[#33291D] transition",
    tabIdle: d
      ? "-mb-px border-b-2 border-transparent pb-2.5 text-sm tracking-wide text-[#C9BCA6]/55 transition hover:text-[#C9BCA6]"
      : "-mb-px border-b-2 border-transparent pb-2.5 text-sm tracking-wide text-[#9A8A72] transition hover:text-[#5C4A33]",

    /* ---------- switch ---------- */
    switchOn: d ? "border-[#A98D6B] bg-[#A98D6B]" : "border-[#8B7355] bg-[#8B7355]",
    switchOff: d ? "border-[#A98D6B]/30 bg-[#2A231A]" : "border-[#8B7355]/30 bg-[#EFE8DA]",

    /* ---------- misc ---------- */
    track: d ? "bg-[#A98D6B]/15" : "bg-[#8B7355]/15",
    fill: d ? "bg-[#A98D6B]" : "bg-[#8B7355]",
    skeleton: d ? "bg-[#A98D6B]/15" : "bg-[#8B7355]/[0.12]",
    divider: d ? "divide-[#A98D6B]/20" : "divide-[#8B7355]/20",
    hairline: d ? "border-[#A98D6B]/25" : "border-[#8B7355]/25",
    dotRing: d ? "border-[#241E16]" : "border-[#FBF8F1]",
    ring: d ? "ring-[#A98D6B]/40" : "ring-[#8B7355]/30",
    imagePlaceholder: d
      ? "bg-[#2B241A] text-[#A98D6B]/60"
      : "bg-[#EDE4D3] text-[#8B7355]/60",
    successBg: d ? "bg-[#7C8F6B]/20 text-[#A8B897]" : "bg-[#7C8F6B]/15 text-[#5F7050]",
    errorBg: d ? "bg-[#B0705F]/20 text-[#D09C8B]" : "bg-[#B0705F]/15 text-[#9C5B49]",
    successLine: d ? "bg-[#7C8F6B]/60" : "bg-[#7C8F6B]/50",
    errorLine: d ? "bg-[#B0705F]/60" : "bg-[#B0705F]/50",
    dangerText: d ? "!text-[#D09C8B] hover:!bg-[#B0705F]/10" : "!text-[#9C5B49] hover:!bg-[#B0705F]/[0.08]",
  };
}

export type JapandiKit = ReturnType<typeof japandi>;
