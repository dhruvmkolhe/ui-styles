import type { Mode } from "@/lib/styles/types";

export function luxuryMinimal(mode: Mode) {
  const isDark = mode === "dark";

  return {
    stage: isDark ? "bg-[#050505]" : "bg-[#FAFAFA]",
    text: isDark ? "text-[#F5F5F5]" : "text-[#0F0F0F]",

    sans: "font-sans uppercase tracking-[0.25em]",
    serif: "font-serif tracking-normal",
    italic: "font-serif italic",
    mono: "font-mono text-xs uppercase tracking-widest",

    heading: isDark ? "text-white font-serif font-light" : "text-[#0F0F0F] font-serif font-light",
    muted: isDark ? "text-neutral-400" : "text-neutral-500",
    faint: isDark ? "text-neutral-600" : "text-neutral-400",

    panel: isDark
      ? "bg-[#0A0A0A] border border-neutral-800 rounded-none p-8"
      : "bg-white border border-neutral-200 rounded-none p-8 shadow-sm",

    bar: isDark
      ? "bg-[#0A0A0A] border-b border-neutral-800 rounded-none"
      : "bg-white border-b border-neutral-200 rounded-none",

    btnPrimary: isDark
      ? "bg-[#F5F5F5] text-[#050505] font-sans font-medium uppercase tracking-[0.2em] rounded-none px-7 py-3 hover:bg-white transition-colors inline-flex items-center gap-2 text-xs"
      : "bg-[#0F0F0F] text-[#FAFAFA] font-sans font-medium uppercase tracking-[0.2em] rounded-none px-7 py-3 hover:bg-black transition-colors inline-flex items-center gap-2 text-xs",

    btnSecondary: isDark
      ? "bg-transparent text-[#C5A059] border border-[#C5A059]/60 font-sans font-medium uppercase tracking-[0.2em] rounded-none px-7 py-3 hover:border-[#C5A059] transition-colors inline-flex items-center gap-2 text-xs"
      : "bg-transparent text-[#0F0F0F] border border-neutral-300 font-sans font-medium uppercase tracking-[0.2em] rounded-none px-7 py-3 hover:border-neutral-900 transition-colors inline-flex items-center gap-2 text-xs",

    btnPrimarySm: isDark
      ? "bg-[#F5F5F5] text-[#050505] font-sans font-medium uppercase tracking-[0.2em] rounded-none px-4 py-1.5 hover:bg-white transition-colors inline-flex items-center gap-1.5 text-[10px]"
      : "bg-[#0F0F0F] text-[#FAFAFA] font-sans font-medium uppercase tracking-[0.2em] rounded-none px-4 py-1.5 hover:bg-black transition-colors inline-flex items-center gap-1.5 text-[10px]",

    input: isDark
      ? "bg-[#0A0A0A] border-b border-neutral-700 text-[#F5F5F5] rounded-none px-3 py-2 text-xs font-sans tracking-widest focus:outline-none focus:border-[#C5A059] w-full"
      : "bg-transparent border-b border-neutral-300 text-[#0F0F0F] rounded-none px-3 py-2 text-xs font-sans tracking-widest focus:outline-none focus:border-[#0F0F0F] w-full",

    label: isDark
      ? "block text-[10px] font-sans uppercase tracking-[0.25em] text-[#C5A059] mb-1"
      : "block text-[10px] font-sans uppercase tracking-[0.25em] text-neutral-500 mb-1",

    badge: isDark
      ? "inline-flex items-center px-3 py-0.5 text-[9px] font-sans uppercase tracking-[0.2em] bg-neutral-800 text-[#C5A059] rounded-none border border-neutral-700"
      : "inline-flex items-center px-3 py-0.5 text-[9px] font-sans uppercase tracking-[0.2em] bg-neutral-100 text-[#0F0F0F] rounded-none border border-neutral-200",

    badgeOutline: isDark
      ? "inline-flex items-center px-3 py-0.5 text-[9px] font-sans uppercase tracking-[0.2em] border border-[#C5A059] text-[#C5A059] rounded-none"
      : "inline-flex items-center px-3 py-0.5 text-[9px] font-sans uppercase tracking-[0.2em] border border-neutral-400 text-neutral-800 rounded-none",
  };
}
