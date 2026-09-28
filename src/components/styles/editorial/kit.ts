import type { Mode } from "@/lib/styles/types";

export function editorial(mode: Mode) {
  const isDark = mode === "dark";

  return {
    stage: isDark ? "bg-[#1C1917]" : "bg-[#FAF7F2]",
    text: isDark ? "text-[#FAF7F2]" : "text-[#1C1917]",

    sans: "font-sans tracking-tight",
    serif: "font-serif tracking-normal",
    italic: "font-serif italic",
    mono: "font-mono text-xs uppercase tracking-widest",

    heading: isDark ? "text-white font-serif font-normal" : "text-[#1C1917] font-serif font-normal",
    muted: isDark ? "text-[#A8A29E]" : "text-[#78716C]",
    faint: isDark ? "text-[#78716C]" : "text-[#A8A29E]",

    panel: isDark
      ? "bg-[#262320] border border-[#44403C] rounded-none p-6"
      : "bg-[#FFFDF9] border border-[#D6D3D1] rounded-none p-6 shadow-sm",

    bar: isDark
      ? "bg-[#262320] border-b border-[#44403C] rounded-none"
      : "bg-[#FFFDF9] border-b border-[#D6D3D1] rounded-none",

    btnPrimary: isDark
      ? "bg-[#FAF7F2] text-[#1C1917] font-serif italic rounded-none px-6 py-2.5 hover:bg-white transition-colors inline-flex items-center gap-2 text-sm"
      : "bg-[#1C1917] text-[#FAF7F2] font-serif italic rounded-none px-6 py-2.5 hover:bg-black transition-colors inline-flex items-center gap-2 text-sm",

    btnSecondary: isDark
      ? "bg-[#262320] text-[#FAF7F2] border border-[#44403C] font-serif rounded-none px-6 py-2.5 hover:bg-[#322E2B] transition-colors inline-flex items-center gap-2 text-sm"
      : "bg-[#FFFDF9] text-[#1C1917] border border-[#1C1917] font-serif rounded-none px-6 py-2.5 hover:bg-[#FAF7F2] transition-colors inline-flex items-center gap-2 text-sm",

    btnPrimarySm: isDark
      ? "bg-[#FAF7F2] text-[#1C1917] font-serif italic rounded-none px-4 py-1.5 hover:bg-white transition-colors inline-flex items-center gap-1.5 text-xs"
      : "bg-[#1C1917] text-[#FAF7F2] font-serif italic rounded-none px-4 py-1.5 hover:bg-black transition-colors inline-flex items-center gap-1.5 text-xs",

    input: isDark
      ? "bg-[#262320] border-b-2 border-[#A8A29E] text-[#FAF7F2] rounded-none px-3 py-2 text-sm font-serif focus:outline-none focus:border-[#FAF7F2] w-full"
      : "bg-transparent border-b-2 border-[#1C1917] text-[#1C1917] rounded-none px-3 py-2 text-sm font-serif focus:outline-none focus:border-[#78716C] w-full",

    label: isDark
      ? "block text-xs font-mono uppercase tracking-widest text-[#A8A29E] mb-1"
      : "block text-xs font-mono uppercase tracking-widest text-[#78716C] mb-1",

    badge: isDark
      ? "inline-flex items-center px-2.5 py-0.5 text-xs font-serif italic bg-[#44403C] text-[#FAF7F2] rounded-none"
      : "inline-flex items-center px-2.5 py-0.5 text-xs font-serif italic bg-[#E7E5E4] text-[#1C1917] rounded-none",

    badgeOutline: isDark
      ? "inline-flex items-center px-2.5 py-0.5 text-xs font-serif border border-[#44403C] text-[#A8A29E] rounded-none"
      : "inline-flex items-center px-2.5 py-0.5 text-xs font-serif border border-[#D6D3D1] text-[#78716C] rounded-none",
  };
}
