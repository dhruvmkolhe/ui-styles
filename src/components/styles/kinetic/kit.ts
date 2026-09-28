import type { Mode } from "@/lib/styles/types";

export function kinetic(mode: Mode) {
  const isDark = mode === "dark";

  return {
    stage: isDark ? "bg-[#0A0E17]" : "bg-[#F4F6FB]",
    text: isDark ? "text-[#F4F6FB]" : "text-[#0A0E17]",

    sans: "font-sans uppercase font-black tracking-wider skew-x-[-4deg]",
    mono: "font-mono text-xs uppercase tracking-widest",

    heading: isDark ? "text-[#FF5500] font-black uppercase tracking-tight skew-x-[-4deg]" : "text-[#FF5500] font-black uppercase tracking-tight skew-x-[-4deg]",
    muted: isDark ? "text-slate-400" : "text-slate-600",
    faint: isDark ? "text-slate-500" : "text-slate-400",

    panel: isDark
      ? "bg-[#121824] border-2 border-[#FF5500] rounded-none p-6 shadow-[4px_4px_0_#00E5FF]"
      : "bg-white border-2 border-[#0A0E17] rounded-none p-6 shadow-[4px_4px_0_#FF5500]",

    bar: isDark
      ? "bg-[#121824] border-b-2 border-[#FF5500] rounded-none"
      : "bg-white border-b-2 border-[#0A0E17] rounded-none",

    btnPrimary: isDark
      ? "bg-[#FF5500] text-white font-black uppercase tracking-wider rounded-none px-6 py-2.5 hover:bg-[#e64c00] hover:skew-x-[-6deg] transition-all inline-flex items-center gap-2 text-xs border-2 border-[#00E5FF] shadow-[3px_3px_0_#00E5FF]"
      : "bg-[#FF5500] text-white font-black uppercase tracking-wider rounded-none px-6 py-2.5 hover:bg-[#e64c00] hover:skew-x-[-6deg] transition-all inline-flex items-center gap-2 text-xs border-2 border-[#0A0E17] shadow-[3px_3px_0_#0A0E17]",

    btnSecondary: isDark
      ? "bg-[#00E5FF] text-[#0A0E17] font-black uppercase tracking-wider rounded-none px-6 py-2.5 hover:bg-[#00cbe4] transition-all inline-flex items-center gap-2 text-xs border-2 border-white"
      : "bg-[#00E5FF] text-[#0A0E17] font-black uppercase tracking-wider rounded-none px-6 py-2.5 hover:bg-[#00cbe4] transition-all inline-flex items-center gap-2 text-xs border-2 border-[#0A0E17]",

    btnPrimarySm: isDark
      ? "bg-[#FF5500] text-white font-black uppercase tracking-wider rounded-none px-4 py-1.5 hover:bg-[#e64c00] transition-all inline-flex items-center gap-1.5 text-[11px] border border-[#00E5FF]"
      : "bg-[#FF5500] text-white font-black uppercase tracking-wider rounded-none px-4 py-1.5 hover:bg-[#e64c00] transition-all inline-flex items-center gap-1.5 text-[11px] border border-[#0A0E17]",

    input: isDark
      ? "bg-[#0A0E17] border-2 border-[#00E5FF] text-[#00E5FF] rounded-none px-3.5 py-2 text-xs font-mono focus:outline-none focus:border-[#FF5500] w-full"
      : "bg-white border-2 border-[#0A0E17] text-[#0A0E17] rounded-none px-3.5 py-2 text-xs font-mono focus:outline-none focus:border-[#FF5500] w-full",

    label: isDark
      ? "block text-[10px] font-black uppercase tracking-widest text-[#00E5FF] mb-1 skew-x-[-4deg]"
      : "block text-[10px] font-black uppercase tracking-widest text-[#FF5500] mb-1 skew-x-[-4deg]",

    badge: isDark
      ? "inline-flex items-center px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest bg-[#FF5500] text-white rounded-none border border-[#00E5FF]"
      : "inline-flex items-center px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest bg-[#FF5500] text-white rounded-none border border-[#0A0E17]",

    badgeOutline: isDark
      ? "inline-flex items-center px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest border-2 border-[#00E5FF] text-[#00E5FF] rounded-none"
      : "inline-flex items-center px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest border-2 border-[#0A0E17] text-[#0A0E17] rounded-none",
  };
}
