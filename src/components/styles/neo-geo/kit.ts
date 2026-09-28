import type { Mode } from "@/lib/styles/types";

export function neoGeo(mode: Mode) {
  const isDark = mode === "dark";

  return {
    stage: isDark ? "bg-[#0D0614]" : "bg-[#F9F6FF]",
    text: isDark ? "text-white" : "text-[#140029]",

    sans: "font-sans uppercase font-black tracking-wider",
    mono: "font-mono text-xs uppercase tracking-widest",

    heading: isDark ? "text-[#00F0FF] font-black uppercase tracking-tight" : "text-[#8A2BE2] font-black uppercase tracking-tight",
    muted: isDark ? "text-[#B8A6DB]" : "text-[#6B4C9A]",
    faint: isDark ? "text-[#7B61A8]" : "text-[#A186C9]",

    panel: isDark
      ? "bg-[#180A28] border-2 border-[#00F0FF] rounded-none p-6 shadow-[4px_4px_0_#FFD700]"
      : "bg-white border-2 border-[#8A2BE2] rounded-none p-6 shadow-[4px_4px_0_#00F0FF]",

    bar: isDark
      ? "bg-[#180A28] border-b-2 border-[#00F0FF] rounded-none"
      : "bg-white border-b-2 border-[#8A2BE2] rounded-none",

    btnPrimary: isDark
      ? "bg-[#8A2BE2] text-white font-black uppercase tracking-wider rounded-none px-6 py-2.5 hover:bg-[#7620c8] transition-all inline-flex items-center gap-2 text-xs border-2 border-[#00F0FF] shadow-[3px_3px_0_#FFD700]"
      : "bg-[#8A2BE2] text-white font-black uppercase tracking-wider rounded-none px-6 py-2.5 hover:bg-[#7620c8] transition-all inline-flex items-center gap-2 text-xs border-2 border-[#140029] shadow-[3px_3px_0_#00F0FF]",

    btnSecondary: isDark
      ? "bg-[#FFD700] text-[#140029] font-black uppercase tracking-wider rounded-none px-6 py-2.5 hover:bg-[#e6c200] transition-all inline-flex items-center gap-2 text-xs border-2 border-[#00F0FF]"
      : "bg-[#FFD700] text-[#140029] font-black uppercase tracking-wider rounded-none px-6 py-2.5 hover:bg-[#e6c200] transition-all inline-flex items-center gap-2 text-xs border-2 border-[#8A2BE2]",

    btnPrimarySm: isDark
      ? "bg-[#8A2BE2] text-white font-black uppercase tracking-wider rounded-none px-4 py-1.5 hover:bg-[#7620c8] transition-all inline-flex items-center gap-1.5 text-[11px] border-2 border-[#00F0FF]"
      : "bg-[#8A2BE2] text-white font-black uppercase tracking-wider rounded-none px-4 py-1.5 hover:bg-[#7620c8] transition-all inline-flex items-center gap-1.5 text-[11px] border-2 border-[#140029]",

    input: isDark
      ? "bg-[#0D0614] border-2 border-[#00F0FF] text-[#00F0FF] rounded-none px-3.5 py-2 text-xs font-mono focus:outline-none focus:border-[#FFD700] w-full"
      : "bg-white border-2 border-[#8A2BE2] text-[#140029] rounded-none px-3.5 py-2 text-xs font-mono focus:outline-none focus:border-[#FF6B6B] w-full",

    label: isDark
      ? "block text-[10px] font-black uppercase tracking-widest text-[#FFD700] mb-1"
      : "block text-[10px] font-black uppercase tracking-widest text-[#8A2BE2] mb-1",

    badge: isDark
      ? "inline-flex items-center px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest bg-[#FF6B6B] text-white border border-[#00F0FF] rounded-none"
      : "inline-flex items-center px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest bg-[#FF6B6B] text-white border border-[#8A2BE2] rounded-none",

    badgeOutline: isDark
      ? "inline-flex items-center px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest border-2 border-[#00F0FF] text-[#00F0FF] rounded-none"
      : "inline-flex items-center px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest border-2 border-[#8A2BE2] text-[#8A2BE2] rounded-none",
  };
}
