import type { Mode } from "@/lib/styles/types";

export function bauhaus(mode: Mode) {
  const isDark = mode === "dark";

  return {
    stage: isDark ? "bg-[#111827]" : "bg-[#F1FAEE]",
    text: isDark ? "text-[#F1FAEE]" : "text-[#1D3557]",

    sans: "font-sans uppercase font-bold tracking-wider",
    mono: "font-mono text-xs uppercase tracking-widest",

    heading: isDark ? "text-[#FFD60A] font-black uppercase tracking-tight" : "text-[#1D3557] font-black uppercase tracking-tight",
    muted: isDark ? "text-neutral-400" : "text-neutral-600",
    faint: isDark ? "text-neutral-500" : "text-neutral-400",

    panel: isDark
      ? "bg-[#1F2937] border-2 border-[#F1FAEE] rounded-none p-6"
      : "bg-white border-2 border-[#1D3557] rounded-none p-6",

    bar: isDark
      ? "bg-[#1F2937] border-b-2 border-[#F1FAEE] rounded-none"
      : "bg-white border-b-2 border-[#1D3557] rounded-none",

    btnPrimary: isDark
      ? "bg-[#E63946] text-white font-bold uppercase tracking-wider rounded-none px-6 py-2.5 hover:bg-[#d62828] transition-colors inline-flex items-center gap-2 text-xs border-2 border-[#F1FAEE]"
      : "bg-[#E63946] text-white font-bold uppercase tracking-wider rounded-none px-6 py-2.5 hover:bg-[#d62828] transition-colors inline-flex items-center gap-2 text-xs border-2 border-[#1D3557]",

    btnSecondary: isDark
      ? "bg-[#FFD60A] text-[#1D3557] font-bold uppercase tracking-wider rounded-none px-6 py-2.5 hover:bg-[#e6c200] transition-colors inline-flex items-center gap-2 text-xs border-2 border-[#F1FAEE]"
      : "bg-[#FFD60A] text-[#1D3557] font-bold uppercase tracking-wider rounded-none px-6 py-2.5 hover:bg-[#e6c200] transition-colors inline-flex items-center gap-2 text-xs border-2 border-[#1D3557]",

    btnPrimarySm: isDark
      ? "bg-[#E63946] text-white font-bold uppercase tracking-wider rounded-none px-4 py-1.5 hover:bg-[#d62828] transition-colors inline-flex items-center gap-1.5 text-[11px] border-2 border-[#F1FAEE]"
      : "bg-[#E63946] text-white font-bold uppercase tracking-wider rounded-none px-4 py-1.5 hover:bg-[#d62828] transition-colors inline-flex items-center gap-1.5 text-[11px] border-2 border-[#1D3557]",

    input: isDark
      ? "bg-[#1F2937] border-2 border-[#F1FAEE] text-[#F1FAEE] rounded-none px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#FFD60A] w-full"
      : "bg-white border-2 border-[#1D3557] text-[#1D3557] rounded-none px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#E63946] w-full",

    label: isDark
      ? "block text-[10px] font-bold uppercase tracking-widest text-[#FFD60A] mb-1"
      : "block text-[10px] font-bold uppercase tracking-widest text-[#1D3557] mb-1",

    badge: isDark
      ? "inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-[#E63946] text-white border border-[#F1FAEE] rounded-none"
      : "inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-[#E63946] text-white border border-[#1D3557] rounded-none",

    badgeOutline: isDark
      ? "inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest border-2 border-[#FFD60A] text-[#FFD60A] rounded-none"
      : "inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest border-2 border-[#1D3557] text-[#1D3557] rounded-none",
  };
}
