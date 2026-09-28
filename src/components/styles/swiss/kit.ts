import type { Mode } from "@/lib/styles/types";

export function swiss(mode: Mode) {
  const isDark = mode === "dark";

  return {
    stage: isDark ? "bg-[#0D0D0D]" : "bg-[#F4F4F4]",
    text: isDark ? "text-[#F4F4F4]" : "text-[#111111]",

    sans: "font-sans uppercase tracking-tight",
    mono: "font-mono text-xs uppercase tracking-widest",
    serif: "font-sans uppercase tracking-tighter", // Swiss style is strictly sans-serif

    heading: isDark ? "text-white font-black uppercase" : "text-[#111111] font-black uppercase",
    muted: isDark ? "text-neutral-400" : "text-neutral-600",
    faint: isDark ? "text-neutral-500" : "text-neutral-400",

    panel: isDark
      ? "bg-[#141414] border border-neutral-800 rounded-none"
      : "bg-white border border-neutral-900 rounded-none",

    bar: isDark
      ? "bg-[#141414] border-b border-neutral-800 rounded-none"
      : "bg-white border-b-2 border-neutral-900 rounded-none",

    btnPrimary: isDark
      ? "bg-[#E30613] text-white font-bold uppercase tracking-wider rounded-none px-5 py-2.5 hover:bg-[#c00510] transition-colors inline-flex items-center gap-2 text-xs"
      : "bg-[#E30613] text-white font-bold uppercase tracking-wider rounded-none px-5 py-2.5 hover:bg-[#c00510] transition-colors inline-flex items-center gap-2 text-xs",

    btnSecondary: isDark
      ? "bg-[#141414] text-white border border-neutral-700 font-bold uppercase tracking-wider rounded-none px-5 py-2.5 hover:bg-neutral-800 transition-colors inline-flex items-center gap-2 text-xs"
      : "bg-white text-[#111111] border border-neutral-900 font-bold uppercase tracking-wider rounded-none px-5 py-2.5 hover:bg-neutral-100 transition-colors inline-flex items-center gap-2 text-xs",

    btnPrimarySm: isDark
      ? "bg-[#E30613] text-white font-bold uppercase tracking-wider rounded-none px-3 py-1.5 hover:bg-[#c00510] transition-colors inline-flex items-center gap-1.5 text-[11px]"
      : "bg-[#E30613] text-white font-bold uppercase tracking-wider rounded-none px-3 py-1.5 hover:bg-[#c00510] transition-colors inline-flex items-center gap-1.5 text-[11px]",

    input: isDark
      ? "bg-[#1A1A1A] border border-neutral-700 text-white rounded-none px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#E30613] w-full"
      : "bg-white border border-neutral-900 text-[#111111] rounded-none px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#E30613] w-full",

    label: isDark
      ? "block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1"
      : "block text-[10px] font-bold uppercase tracking-widest text-neutral-700 mb-1",

    badge: isDark
      ? "inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-[#E30613] text-white rounded-none"
      : "inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-[#E30613] text-white rounded-none",

    badgeOutline: isDark
      ? "inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest border border-neutral-600 text-neutral-300 rounded-none"
      : "inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest border border-neutral-900 text-neutral-900 rounded-none",
  };
}
