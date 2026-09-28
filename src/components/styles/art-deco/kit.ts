import type { Mode } from "@/lib/styles/types";

export function artDeco(mode: Mode) {
  const isDark = mode === "dark";

  return {
    stage: isDark ? "bg-[#0A0A0A]" : "bg-[#121212]",
    text: isDark ? "text-[#E5D2A0]" : "text-[#C9A961]",

    sans: "font-sans uppercase tracking-[0.2em]",
    serif: "font-serif uppercase tracking-[0.15em]",
    mono: "font-mono text-xs uppercase tracking-widest",

    heading: "text-transparent bg-clip-text bg-gradient-to-r from-[#C9A961] via-[#F3E5AB] to-[#C9A961] font-sans uppercase tracking-[0.25em] font-bold",
    muted: "text-[#A38D56]",
    faint: "text-[#6E5E38]",

    panel: "bg-[#141414] border border-[#C9A961]/80 rounded-none p-6 relative outline outline-1 outline-[#C9A961]/40 outline-offset-2",

    bar: "bg-[#141414] border-b border-[#C9A961] rounded-none outline outline-1 outline-[#C9A961]/30 outline-offset-2",

    btnPrimary: "bg-[#C9A961] text-[#0A0A0A] font-sans font-bold uppercase tracking-[0.2em] rounded-none px-6 py-2.5 hover:bg-[#F3E5AB] transition-all inline-flex items-center gap-2 text-xs border border-[#F3E5AB]",

    btnSecondary: "bg-transparent text-[#C9A961] border border-[#C9A961] font-sans font-bold uppercase tracking-[0.2em] rounded-none px-6 py-2.5 hover:bg-[#C9A961]/10 transition-all inline-flex items-center gap-2 text-xs",

    btnPrimarySm: "bg-[#C9A961] text-[#0A0A0A] font-sans font-bold uppercase tracking-[0.2em] rounded-none px-4 py-1.5 hover:bg-[#F3E5AB] transition-all inline-flex items-center gap-1.5 text-[10px] border border-[#F3E5AB]",

    input: "bg-[#0A0A0A] border border-[#C9A961] text-[#E5D2A0] rounded-none px-3 py-2 text-xs font-sans tracking-widest focus:outline-none focus:border-[#F3E5AB] focus:ring-1 focus:ring-[#F3E5AB] w-full placeholder-[#6E5E38]",

    label: "block text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#C9A961] mb-1.5",

    badge: "inline-flex items-center px-3 py-0.5 text-[9px] font-sans font-bold uppercase tracking-[0.2em] bg-[#C9A961] text-[#0A0A0A] rounded-none",

    badgeOutline: "inline-flex items-center px-3 py-0.5 text-[9px] font-sans font-bold uppercase tracking-[0.2em] border border-[#C9A961] text-[#C9A961] rounded-none",
  };
}
