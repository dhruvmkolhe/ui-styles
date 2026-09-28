import type { Mode } from "@/lib/styles/types";

export function metropolitan(mode: Mode) {
  const isDark = mode === "dark";

  return {
    stage: isDark ? "bg-[#0F172A]" : "bg-[#F1F5F9]",
    text: isDark ? "text-[#F8FAFC]" : "text-[#0F172A]",

    sans: "font-sans tracking-tight",
    mono: "font-mono text-xs uppercase tracking-wider",

    heading: isDark
      ? "font-sans text-[#F8FAFC] tracking-tight font-black uppercase"
      : "font-sans text-[#0F172A] tracking-tight font-black uppercase",
    muted: isDark ? "text-slate-400" : "text-slate-500",
    faint: isDark ? "text-slate-600" : "text-slate-400",

    panel: isDark
      ? "bg-[#1E293B] border border-slate-700 rounded-none p-6 shadow-md"
      : "bg-white border border-slate-300 rounded-none p-6 shadow-md",

    bar: isDark
      ? "bg-[#0F172A] border-b-2 border-blue-500 rounded-none"
      : "bg-[#F1F5F9] border-b-2 border-blue-600 rounded-none",

    btnPrimary: isDark
      ? "bg-blue-600 text-white font-sans font-bold uppercase tracking-wider rounded-none px-6 py-2.5 hover:bg-blue-500 transition-all inline-flex items-center gap-2 text-xs border border-blue-500"
      : "bg-blue-600 text-white font-sans font-bold uppercase tracking-wider rounded-none px-6 py-2.5 hover:bg-blue-700 transition-all inline-flex items-center gap-2 text-xs border border-blue-700",

    btnSecondary: isDark
      ? "bg-slate-800 text-slate-200 font-sans font-semibold uppercase tracking-wider rounded-none px-6 py-2.5 hover:bg-slate-700 transition-all inline-flex items-center gap-2 text-xs border border-slate-700"
      : "bg-slate-200 text-slate-800 font-sans font-semibold uppercase tracking-wider rounded-none px-6 py-2.5 hover:bg-slate-300 transition-all inline-flex items-center gap-2 text-xs border border-slate-300",

    btnPrimarySm: isDark
      ? "bg-blue-600 text-white font-sans font-bold uppercase tracking-wider rounded-none px-4 py-1.5 hover:bg-blue-500 transition-all inline-flex items-center gap-1.5 text-xs"
      : "bg-blue-600 text-white font-sans font-bold uppercase tracking-wider rounded-none px-4 py-1.5 hover:bg-blue-700 transition-all inline-flex items-center gap-1.5 text-xs",

    input: isDark
      ? "bg-[#1E293B] border border-slate-700 text-[#F8FAFC] rounded-none px-3.5 py-2 text-xs font-mono focus:outline-none focus:border-blue-500 w-full"
      : "bg-white border border-slate-300 text-[#0F172A] rounded-none px-3.5 py-2 text-xs font-mono focus:outline-none focus:border-blue-600 w-full",

    label: isDark
      ? "block text-[10px] font-mono uppercase tracking-widest text-blue-400 mb-1 font-bold"
      : "block text-[10px] font-mono uppercase tracking-widest text-blue-600 mb-1 font-bold",

    badge: isDark
      ? "inline-flex items-center px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-950 text-blue-300 rounded-none border border-blue-700"
      : "inline-flex items-center px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-50 text-blue-700 rounded-none border border-blue-300",

    badgeOutline: isDark
      ? "inline-flex items-center px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider border border-slate-700 text-slate-300 rounded-none"
      : "inline-flex items-center px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider border border-slate-300 text-slate-700 rounded-none",
  };
}
