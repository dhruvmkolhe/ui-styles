import type { Mode } from "@/lib/styles/types";

export function modernist(mode: Mode) {
  const isDark = mode === "dark";

  return {
    stage: isDark ? "bg-[#1C1917]" : "bg-[#F4F0EA]",
    text: isDark ? "text-[#F4F0EA]" : "text-[#2B2B2B]",

    sans: "font-sans uppercase font-bold tracking-wider",
    serif: "font-serif tracking-tight",
    mono: "font-mono text-xs uppercase tracking-widest",

    heading: isDark ? "text-[#DAA520] font-bold uppercase tracking-wide" : "text-[#C85A32] font-bold uppercase tracking-wide",
    muted: isDark ? "text-neutral-400" : "text-neutral-600",
    faint: isDark ? "text-neutral-500" : "text-neutral-400",

    panel: isDark
      ? "bg-[#292524] border border-[#44403C] rounded-none p-6 shadow-sm"
      : "bg-[#FFFDF9] border border-[#2B2B2B] rounded-none p-6 shadow-sm",

    bar: isDark
      ? "bg-[#292524] border-b border-[#44403C] rounded-none"
      : "bg-[#FFFDF9] border-b-2 border-[#2B2B2B] rounded-none",

    btnPrimary: isDark
      ? "bg-[#C85A32] text-white font-bold uppercase tracking-wider rounded-none px-6 py-2.5 hover:bg-[#b04a25] transition-colors inline-flex items-center gap-2 text-xs border border-[#2B2B2B]"
      : "bg-[#C85A32] text-white font-bold uppercase tracking-wider rounded-none px-6 py-2.5 hover:bg-[#b04a25] transition-colors inline-flex items-center gap-2 text-xs border border-[#2B2B2B]",

    btnSecondary: isDark
      ? "bg-[#292524] text-[#DAA520] border border-[#DAA520] font-bold uppercase tracking-wider rounded-none px-6 py-2.5 hover:bg-[#DAA520]/10 transition-colors inline-flex items-center gap-2 text-xs"
      : "bg-[#556B2F] text-white border border-[#2B2B2B] font-bold uppercase tracking-wider rounded-none px-6 py-2.5 hover:bg-[#475a27] transition-colors inline-flex items-center gap-2 text-xs",

    btnPrimarySm: isDark
      ? "bg-[#C85A32] text-white font-bold uppercase tracking-wider rounded-none px-4 py-1.5 hover:bg-[#b04a25] transition-colors inline-flex items-center gap-1.5 text-[11px] border border-[#2B2B2B]"
      : "bg-[#C85A32] text-white font-bold uppercase tracking-wider rounded-none px-4 py-1.5 hover:bg-[#b04a25] transition-colors inline-flex items-center gap-1.5 text-[11px] border border-[#2B2B2B]",

    input: isDark
      ? "bg-[#1C1917] border border-[#44403C] text-[#F4F0EA] rounded-none px-3.5 py-2 text-xs font-mono focus:outline-none focus:border-[#DAA520] w-full"
      : "bg-[#F4F0EA] border border-[#2B2B2B] text-[#2B2B2B] rounded-none px-3.5 py-2 text-xs font-mono focus:outline-none focus:border-[#C85A32] w-full",

    label: isDark
      ? "block text-[10px] font-bold uppercase tracking-widest text-[#DAA520] mb-1"
      : "block text-[10px] font-bold uppercase tracking-widest text-[#C85A32] mb-1",

    badge: isDark
      ? "inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-[#C85A32] text-white rounded-none"
      : "inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-[#C85A32] text-white rounded-none",

    badgeOutline: isDark
      ? "inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest border border-[#DAA520] text-[#DAA520] rounded-none"
      : "inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest border border-[#556B2F] text-[#556B2F] rounded-none",
  };
}
