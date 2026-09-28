import type { VaultItem } from "./registry";
export type VaultMode = "light" | "dark";

/** One deterministic token source powers both the React preview and copied snippet. */
export function vaultTokens(item: VaultItem, mode: VaultMode) {
  const dark = mode === "dark";
  const base = dark ? "bg-[#08090e] text-white" : "bg-slate-50 text-slate-950";
  const accent = item.category === "Text Animations" ? "from-fuchsia-500 via-violet-500 to-cyan-400" : item.category.includes("Background") ? "from-cyan-400 via-violet-500 to-fuchsia-500" : "from-violet-500 to-cyan-400";
  return {
    canvas: `${base} relative isolate overflow-hidden rounded-2xl border ${dark ? "border-white/10" : "border-slate-200"}`,
    action: `group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r ${accent} px-5 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0`,
    glow: `absolute -inset-8 -z-10 rounded-full bg-gradient-to-r ${accent} opacity-30 blur-3xl`,
    surface: dark ? "border border-white/10 bg-white/[0.06]" : "border border-slate-200 bg-white/80",
    accent,
  };
}
