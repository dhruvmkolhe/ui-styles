import type { Mode } from "@/lib/styles/types";

export function retroFuturistic(mode: Mode) {
  const isDark = mode === "dark";

  return {
    stage: isDark ? "bg-[#090014]" : "bg-[#0F051D]",
    text: isDark ? "text-white" : "text-[#F0E6FF]",

    sans: "font-mono uppercase tracking-wider",
    serif: "font-sans uppercase tracking-widest font-black",
    mono: "font-mono text-xs uppercase tracking-widest",

    heading: "text-transparent bg-clip-text bg-gradient-to-r from-[#FF00AA] via-[#9D00FF] to-[#00F0FF] font-black uppercase tracking-widest",
    muted: "text-[#B399D4]",
    faint: "text-[#705299]",

    panel: "bg-[#14002B]/80 border border-[#FF00AA] shadow-[0_0_15px_rgba(255,0,170,0.3)] rounded-none p-6 backdrop-blur-md",

    bar: "bg-[#14002B]/90 border-b border-[#00F0FF] shadow-[0_4px_20px_rgba(0,240,255,0.2)] rounded-none",

    btnPrimary: "bg-gradient-to-r from-[#FF00AA] to-[#9D00FF] text-white font-mono font-bold uppercase tracking-widest rounded-none px-6 py-2.5 hover:shadow-[0_0_20px_rgba(255,0,170,0.8)] transition-all inline-flex items-center gap-2 text-xs border border-[#FF77D4]",

    btnSecondary: "bg-[#090014] text-[#00F0FF] border border-[#00F0FF] font-mono font-bold uppercase tracking-widest rounded-none px-6 py-2.5 hover:bg-[#00F0FF]/10 hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] transition-all inline-flex items-center gap-2 text-xs",

    btnPrimarySm: "bg-gradient-to-r from-[#FF00AA] to-[#9D00FF] text-white font-mono font-bold uppercase tracking-widest rounded-none px-4 py-1.5 hover:shadow-[0_0_15px_rgba(255,0,170,0.8)] transition-all inline-flex items-center gap-1.5 text-[11px] border border-[#FF77D4]",

    input: "bg-[#090014] border border-[#00F0FF] text-[#00F0FF] rounded-none px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#FF00AA] focus:shadow-[0_0_10px_rgba(255,0,170,0.5)] w-full placeholder-[#705299]",

    label: "block text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF00AA] mb-1",

    badge: "inline-flex items-center px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest bg-[#FF00AA] text-white shadow-[0_0_10px_rgba(255,0,170,0.6)] rounded-none",

    badgeOutline: "inline-flex items-center px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest border border-[#00F0FF] text-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.4)] rounded-none",
  };
}
