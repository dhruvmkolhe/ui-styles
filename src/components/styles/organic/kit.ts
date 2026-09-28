import type { Mode } from "@/lib/styles/types";

export function organic(mode: Mode) {
  const isDark = mode === "dark";

  return {
    stage: isDark ? "bg-[#1C241B]" : "bg-[#F4F1EA]",
    text: isDark ? "text-[#F4F1EA]" : "text-[#2C352B]",

    sans: "font-sans tracking-tight",
    mono: "font-mono text-xs tracking-wide",

    heading: isDark ? "text-[#A3B899] font-medium" : "text-[#4A5D44] font-medium",
    muted: isDark ? "text-[#9EB097]" : "text-[#5C6E57]",
    faint: isDark ? "text-[#697B63]" : "text-[#8D9E88]",

    panel: isDark
      ? "bg-[#253024] border border-[#344233] rounded-3xl p-6 shadow-sm"
      : "bg-[#FBF9F4] border border-[#D4CEB8] rounded-3xl p-6 shadow-sm",

    bar: isDark
      ? "bg-[#253024] border-b border-[#344233] rounded-none"
      : "bg-[#FBF9F4] border-b border-[#D4CEB8] rounded-none",

    btnPrimary: isDark
      ? "bg-[#8FA382] text-[#1C241B] font-medium rounded-full px-6 py-2.5 hover:bg-[#a1b594] transition-all inline-flex items-center gap-2 text-sm shadow-sm"
      : "bg-[#6E8560] text-white font-medium rounded-full px-6 py-2.5 hover:bg-[#5f7452] transition-all inline-flex items-center gap-2 text-sm shadow-sm",

    btnSecondary: isDark
      ? "bg-[#253024] text-[#C87D55] border border-[#C87D55] font-medium rounded-full px-6 py-2.5 hover:bg-[#C87D55]/10 transition-all inline-flex items-center gap-2 text-sm"
      : "bg-[#F4F1EA] text-[#C87D55] border border-[#C87D55] font-medium rounded-full px-6 py-2.5 hover:bg-[#C87D55]/10 transition-all inline-flex items-center gap-2 text-sm",

    btnPrimarySm: isDark
      ? "bg-[#8FA382] text-[#1C241B] font-medium rounded-full px-4 py-1.5 hover:bg-[#a1b594] transition-all inline-flex items-center gap-1.5 text-xs"
      : "bg-[#6E8560] text-white font-medium rounded-full px-4 py-1.5 hover:bg-[#5f7452] transition-all inline-flex items-center gap-1.5 text-xs",

    input: isDark
      ? "bg-[#1C241B] border border-[#344233] text-[#F4F1EA] rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#8FA382] w-full"
      : "bg-[#F4F1EA] border border-[#D4CEB8] text-[#2C352B] rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#6E8560] w-full",

    label: isDark
      ? "block text-xs font-medium text-[#A3B899] mb-1"
      : "block text-xs font-medium text-[#6E8560] mb-1",

    badge: isDark
      ? "inline-flex items-center px-3.5 py-1 text-xs font-medium bg-[#8FA382] text-[#1C241B] rounded-full"
      : "inline-flex items-center px-3.5 py-1 text-xs font-medium bg-[#E3EADF] text-[#4A5D44] rounded-full",

    badgeOutline: isDark
      ? "inline-flex items-center px-3.5 py-1 text-xs font-medium border border-[#C87D55] text-[#C87D55] rounded-full"
      : "inline-flex items-center px-3.5 py-1 text-xs font-medium border border-[#C87D55] text-[#C87D55] rounded-full",
  };
}
