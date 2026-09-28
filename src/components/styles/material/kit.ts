import type { Mode } from "@/lib/styles/types";

export function material(mode: Mode) {
  const isDark = mode === "dark";

  return {
    stage: isDark ? "bg-[#121212]" : "bg-[#F5F5F5]",
    text: isDark ? "text-white" : "text-[#121212]",

    sans: "font-sans tracking-normal",
    mono: "font-mono text-xs tracking-wide",

    heading: isDark ? "text-white font-medium" : "text-[#121212] font-medium",
    muted: isDark ? "text-neutral-400" : "text-neutral-600",
    faint: isDark ? "text-neutral-500" : "text-neutral-400",

    panel: isDark
      ? "bg-[#1E1E1E] shadow-lg rounded-2xl p-6 border border-white/5"
      : "bg-white shadow-md rounded-2xl p-6 border border-neutral-100",

    bar: isDark
      ? "bg-[#1E1E1E] shadow-md rounded-none border-b border-white/5"
      : "bg-white shadow-sm rounded-none border-b border-neutral-200",

    btnPrimary: isDark
      ? "bg-[#BB86FC] text-[#121212] font-medium rounded-full px-6 py-2.5 shadow-md hover:shadow-lg hover:bg-[#c89bfa] transition-all inline-flex items-center gap-2 text-sm"
      : "bg-[#6200EE] text-white font-medium rounded-full px-6 py-2.5 shadow-md hover:shadow-lg hover:bg-[#5200c7] transition-all inline-flex items-center gap-2 text-sm",

    btnSecondary: isDark
      ? "bg-transparent text-[#03DAC6] border border-[#03DAC6] font-medium rounded-full px-6 py-2.5 hover:bg-[#03DAC6]/10 transition-all inline-flex items-center gap-2 text-sm"
      : "bg-transparent text-[#6200EE] border border-[#6200EE] font-medium rounded-full px-6 py-2.5 hover:bg-[#6200EE]/5 transition-all inline-flex items-center gap-2 text-sm",

    btnPrimarySm: isDark
      ? "bg-[#BB86FC] text-[#121212] font-medium rounded-full px-4 py-1.5 shadow-sm hover:shadow-md transition-all inline-flex items-center gap-1.5 text-xs"
      : "bg-[#6200EE] text-white font-medium rounded-full px-4 py-1.5 shadow-sm hover:shadow-md transition-all inline-flex items-center gap-1.5 text-xs",

    input: isDark
      ? "bg-[#2C2C2C] border-b-2 border-[#BB86FC] text-white rounded-t-lg rounded-b-none px-4 py-2.5 text-sm focus:outline-none focus:bg-[#383838] w-full"
      : "bg-[#F1F3F4] border-b-2 border-[#6200EE] text-[#121212] rounded-t-lg rounded-b-none px-4 py-2.5 text-sm focus:outline-none focus:bg-[#E8EAED] w-full",

    label: isDark
      ? "block text-xs font-medium text-[#BB86FC] mb-1"
      : "block text-xs font-medium text-[#6200EE] mb-1",

    badge: isDark
      ? "inline-flex items-center px-3 py-1 text-xs font-medium bg-[#BB86FC] text-[#121212] rounded-full shadow-sm"
      : "inline-flex items-center px-3 py-1 text-xs font-medium bg-[#6200EE] text-white rounded-full shadow-sm",

    badgeOutline: isDark
      ? "inline-flex items-center px-3 py-1 text-xs font-medium border border-[#03DAC6] text-[#03DAC6] rounded-full"
      : "inline-flex items-center px-3 py-1 text-xs font-medium border border-[#6200EE] text-[#6200EE] rounded-full",
  };
}
