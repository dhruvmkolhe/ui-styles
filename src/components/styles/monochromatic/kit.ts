import type { Mode } from "@/lib/styles/types";

export function monochromatic(mode: Mode) {
  const isDark = mode === "dark";

  return {
    stage: isDark ? "bg-[#0F172A]" : "bg-[#EFF6FF]",
    text: isDark ? "text-[#EFF6FF]" : "text-[#1E293B]",

    sans: "font-sans tracking-tight",
    mono: "font-mono text-xs tracking-wide",

    heading: isDark ? "text-white font-bold" : "text-[#1E40AF] font-bold",
    muted: isDark ? "text-[#93C5FD]" : "text-[#3B82F6]",
    faint: isDark ? "text-[#60A5FA]" : "text-[#60A5FA]",

    panel: isDark
      ? "bg-[#1E293B] border border-[#1E40AF] rounded-xl p-6 shadow-sm"
      : "bg-white border border-[#BFDBFE] rounded-xl p-6 shadow-sm",

    bar: isDark
      ? "bg-[#1E293B] border-b border-[#1E40AF] rounded-none"
      : "bg-white border-b border-[#BFDBFE] rounded-none",

    btnPrimary: isDark
      ? "bg-[#2563EB] text-white font-medium rounded-lg px-6 py-2.5 hover:bg-[#1D4ED8] transition-colors inline-flex items-center gap-2 text-sm shadow-sm"
      : "bg-[#2563EB] text-white font-medium rounded-lg px-6 py-2.5 hover:bg-[#1D4ED8] transition-colors inline-flex items-center gap-2 text-sm shadow-sm",

    btnSecondary: isDark
      ? "bg-[#1E293B] text-[#93C5FD] border border-[#2563EB] font-medium rounded-lg px-6 py-2.5 hover:bg-[#2563EB]/20 transition-colors inline-flex items-center gap-2 text-sm"
      : "bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE] font-medium rounded-lg px-6 py-2.5 hover:bg-[#DBEAFE] transition-colors inline-flex items-center gap-2 text-sm",

    btnPrimarySm: isDark
      ? "bg-[#2563EB] text-white font-medium rounded-lg px-4 py-1.5 hover:bg-[#1D4ED8] transition-colors inline-flex items-center gap-1.5 text-xs"
      : "bg-[#2563EB] text-white font-medium rounded-lg px-4 py-1.5 hover:bg-[#1D4ED8] transition-colors inline-flex items-center gap-1.5 text-xs",

    input: isDark
      ? "bg-[#0F172A] border border-[#1E40AF] text-[#EFF6FF] rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] w-full"
      : "bg-white border border-[#BFDBFE] text-[#1E293B] rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] w-full",

    label: isDark
      ? "block text-xs font-semibold text-[#93C5FD] mb-1"
      : "block text-xs font-semibold text-[#1E40AF] mb-1",

    badge: isDark
      ? "inline-flex items-center px-3 py-0.5 text-xs font-medium bg-[#2563EB] text-white rounded-full"
      : "inline-flex items-center px-3 py-0.5 text-xs font-medium bg-[#DBEAFE] text-[#1E40AF] rounded-full",

    badgeOutline: isDark
      ? "inline-flex items-center px-3 py-0.5 text-xs font-medium border border-[#1E40AF] text-[#93C5FD] rounded-full"
      : "inline-flex items-center px-3 py-0.5 text-xs font-medium border border-[#BFDBFE] text-[#1E40AF] rounded-full",
  };
}
