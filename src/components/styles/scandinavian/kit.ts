import type { Mode } from "@/lib/styles/types";

export function scandinavian(mode: Mode) {
  const isDark = mode === "dark";

  return {
    stage: isDark ? "bg-[#1E293B]" : "bg-[#FDFBF7]",
    text: isDark ? "text-[#F8FAFC]" : "text-[#334155]",

    sans: "font-sans tracking-tight",
    mono: "font-mono text-xs tracking-wide",

    heading: isDark ? "text-white font-medium" : "text-[#334155] font-medium",
    muted: isDark ? "text-slate-400" : "text-[#64748B]",
    faint: isDark ? "text-slate-500" : "text-slate-400",

    panel: isDark
      ? "bg-[#0F172A] border border-slate-700 rounded-2xl p-6 shadow-sm"
      : "bg-white border border-[#E8DCC8] rounded-2xl p-6 shadow-sm",

    bar: isDark
      ? "bg-[#0F172A] border-b border-slate-700 rounded-none"
      : "bg-[#FDFBF7] border-b border-[#E8DCC8] rounded-none",

    btnPrimary: isDark
      ? "bg-[#7DA0C0] text-slate-900 font-medium rounded-xl px-6 py-2.5 hover:bg-[#91b2cf] transition-colors inline-flex items-center gap-2 text-sm"
      : "bg-[#A8C0D6] text-[#334155] font-medium rounded-xl px-6 py-2.5 hover:bg-[#96b0c8] transition-colors inline-flex items-center gap-2 text-sm",

    btnSecondary: isDark
      ? "bg-[#1E293B] text-[#F8FAFC] border border-slate-600 font-medium rounded-xl px-6 py-2.5 hover:bg-slate-800 transition-colors inline-flex items-center gap-2 text-sm"
      : "bg-[#F5EFE6] text-[#334155] border border-[#E8DCC8] font-medium rounded-xl px-6 py-2.5 hover:bg-[#ebdcc9] transition-colors inline-flex items-center gap-2 text-sm",

    btnPrimarySm: isDark
      ? "bg-[#7DA0C0] text-slate-900 font-medium rounded-lg px-4 py-1.5 hover:bg-[#91b2cf] transition-colors inline-flex items-center gap-1.5 text-xs"
      : "bg-[#A8C0D6] text-[#334155] font-medium rounded-lg px-4 py-1.5 hover:bg-[#96b0c8] transition-colors inline-flex items-center gap-1.5 text-xs",

    input: isDark
      ? "bg-[#0F172A] border border-slate-700 text-[#F8FAFC] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#7DA0C0] w-full"
      : "bg-[#F5EFE6]/50 border border-[#E8DCC8] text-[#334155] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#A8C0D6] w-full",

    label: isDark
      ? "block text-xs font-medium text-slate-400 mb-1"
      : "block text-xs font-medium text-[#64748B] mb-1",

    badge: isDark
      ? "inline-flex items-center px-3 py-1 text-xs font-medium bg-[#7DA0C0] text-slate-900 rounded-full"
      : "inline-flex items-center px-3 py-1 text-xs font-medium bg-[#E8DCC8] text-[#334155] rounded-full",

    badgeOutline: isDark
      ? "inline-flex items-center px-3 py-1 text-xs font-medium border border-slate-600 text-slate-300 rounded-full"
      : "inline-flex items-center px-3 py-1 text-xs font-medium border border-[#A8C0D6] text-[#334155] rounded-full",
  };
}
