import type { Mode } from "@/lib/styles/types";

export function typographyFirst(mode: Mode) {
  const isDark = mode === "dark";

  return {
    stage: isDark ? "bg-[#111111]" : "bg-[#FAFAFA]",
    text: isDark ? "text-[#F8FAFC]" : "text-[#0F172A]",

    serif: "font-serif tracking-tight",
    sans: "font-sans leading-relaxed",

    heading: isDark
      ? "font-serif text-[#F8FAFC] tracking-tight font-bold"
      : "font-serif text-[#0F172A] tracking-tight font-bold",
    muted: isDark ? "text-slate-400" : "text-slate-500",
    faint: isDark ? "text-slate-600" : "text-slate-400",

    panel: isDark
      ? "bg-[#1A1A1A] border border-slate-800 rounded-none p-6 shadow-sm"
      : "bg-white border border-slate-200 rounded-none p-6 shadow-sm",

    bar: isDark
      ? "bg-[#111111] border-b border-slate-800 rounded-none"
      : "bg-[#FAFAFA] border-b border-slate-200 rounded-none",

    btnPrimary: isDark
      ? "bg-[#F8FAFC] text-[#111111] font-sans font-medium rounded-none px-6 py-2.5 hover:bg-slate-200 transition-all inline-flex items-center gap-2 text-xs border border-[#F8FAFC]"
      : "bg-[#0F172A] text-white font-sans font-medium rounded-none px-6 py-2.5 hover:bg-slate-800 transition-all inline-flex items-center gap-2 text-xs border border-[#0F172A]",

    btnSecondary: isDark
      ? "bg-transparent text-[#F8FAFC] font-sans font-medium rounded-none px-6 py-2.5 hover:bg-slate-900 transition-all inline-flex items-center gap-2 text-xs border border-slate-700"
      : "bg-transparent text-[#0F172A] font-sans font-medium rounded-none px-6 py-2.5 hover:bg-slate-100 transition-all inline-flex items-center gap-2 text-xs border border-slate-300",

    btnPrimarySm: isDark
      ? "bg-[#F8FAFC] text-[#111111] font-sans font-medium rounded-none px-4 py-1.5 hover:bg-slate-200 transition-all inline-flex items-center gap-1.5 text-xs"
      : "bg-[#0F172A] text-white font-sans font-medium rounded-none px-4 py-1.5 hover:bg-slate-800 transition-all inline-flex items-center gap-1.5 text-xs",

    input: isDark
      ? "bg-[#1A1A1A] border-b-2 border-slate-700 text-[#F8FAFC] rounded-none px-3 py-2 text-xs font-sans focus:outline-none focus:border-[#F8FAFC] w-full"
      : "bg-white border-b-2 border-slate-300 text-[#0F172A] rounded-none px-3 py-2 text-xs font-sans focus:outline-none focus:border-[#0F172A] w-full",

    label: isDark
      ? "block text-[10px] font-sans uppercase tracking-widest text-slate-400 mb-1 font-semibold"
      : "block text-[10px] font-sans uppercase tracking-widest text-slate-500 mb-1 font-semibold",

    badge: isDark
      ? "inline-flex items-center px-2.5 py-0.5 text-[10px] font-serif italic bg-slate-800 text-slate-200 rounded-none border border-slate-700"
      : "inline-flex items-center px-2.5 py-0.5 text-[10px] font-serif italic bg-slate-100 text-slate-800 rounded-none border border-slate-300",

    badgeOutline: isDark
      ? "inline-flex items-center px-2.5 py-0.5 text-[10px] font-sans uppercase tracking-widest border border-slate-700 text-slate-300 rounded-none"
      : "inline-flex items-center px-2.5 py-0.5 text-[10px] font-sans uppercase tracking-widest border border-slate-300 text-slate-700 rounded-none",
  };
}
