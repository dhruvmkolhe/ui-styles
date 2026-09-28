import type { Mode } from "@/lib/styles/types";

export function gradientModern(mode: Mode) {
  const isDark = mode === "dark";

  return {
    stage: isDark ? "bg-[#0B0F19]" : "bg-[#F8FAFC]",
    text: isDark ? "text-[#F8FAFC]" : "text-[#0F172A]",

    sans: "font-sans tracking-tight",
    mono: "font-mono text-xs tracking-wide",

    heading: "text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#EC4899] font-bold tracking-tight",
    muted: isDark ? "text-slate-400" : "text-slate-600",
    faint: isDark ? "text-slate-500" : "text-slate-400",

    panel: isDark
      ? "bg-[#141C2E]/80 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-xl"
      : "bg-white/80 border border-indigo-100 rounded-2xl p-6 shadow-lg backdrop-blur-xl",

    bar: isDark
      ? "bg-[#141C2E]/90 border-b border-white/10 rounded-none backdrop-blur-xl"
      : "bg-white/90 border-b border-indigo-100 rounded-none backdrop-blur-xl",

    btnPrimary: "bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#EC4899] text-white font-medium rounded-xl px-6 py-2.5 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] transition-all inline-flex items-center gap-2 text-sm",

    btnSecondary: isDark
      ? "bg-[#141C2E] text-slate-200 border border-white/10 font-medium rounded-xl px-6 py-2.5 hover:bg-white/5 transition-all inline-flex items-center gap-2 text-sm"
      : "bg-white text-slate-700 border border-indigo-200 font-medium rounded-xl px-6 py-2.5 hover:bg-indigo-50/50 transition-all inline-flex items-center gap-2 text-sm",

    btnPrimarySm: "bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#EC4899] text-white font-medium rounded-lg px-4 py-1.5 shadow-md shadow-purple-500/20 hover:scale-[1.02] transition-all inline-flex items-center gap-1.5 text-xs",

    input: isDark
      ? "bg-[#0F172A] border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] w-full"
      : "bg-white border border-indigo-200 text-[#0F172A] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] w-full",

    label: isDark
      ? "block text-xs font-medium text-purple-400 mb-1"
      : "block text-xs font-medium text-indigo-600 mb-1",

    badge: "inline-flex items-center px-3 py-1 text-xs font-medium bg-gradient-to-r from-[#6366F1] to-[#A855F7] text-white rounded-full shadow-sm",

    badgeOutline: isDark
      ? "inline-flex items-center px-3 py-1 text-xs font-medium border border-purple-400/50 text-purple-300 rounded-full"
      : "inline-flex items-center px-3 py-1 text-xs font-medium border border-indigo-300 text-indigo-700 rounded-full",
  };
}
