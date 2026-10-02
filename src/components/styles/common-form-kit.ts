import type { Mode, StyleSlug } from "@/lib/styles/types";
import { STYLE_MAP } from "@/lib/styles/registry";

import { artDeco } from "./art-deco/kit";
import { bauhaus } from "./bauhaus/kit";
import { bentoGrid } from "./bento-grid/kit";
import { brutalist } from "./brutalist/kit";
import { darkTech } from "./dark-tech/kit";
import { editorial } from "./editorial/kit";
import { glass } from "./glassmorphism/kit";
import { gradientModern } from "./gradient-modern/kit";
import { japandi } from "./japandi/kit";
import { kinetic } from "./kinetic/kit";
import { luxuryMinimal } from "./luxury-minimal/kit";
import { material } from "./material/kit";
import { metropolitan } from "./metropolitan/kit";
import { minimalist } from "./minimalist/kit";
import { modernist } from "./modernist/kit";
import { monochromatic } from "./monochromatic/kit";
import { neoGeo } from "./neo-geo/kit";
import { neobrutalist } from "./neobrutalist/kit";
import { neomorphism } from "./neomorphism/kit";
import { organic } from "./organic/kit";
import { retroFuturistic } from "./retro-futuristic/kit";
import { retroY2k } from "./retro-y2k/kit";
import { scandinavian } from "./scandinavian/kit";
import { swiss } from "./swiss/kit";
import { typographyFirst } from "./typography-first/kit";

export interface ResolvedStyleFormKit {
  slug: StyleSlug;
  styleName: string;
  isDark: boolean;
  stage: string;
  text: string;
  strong: string;
  muted: string;
  faint: string;
  panel: string;
  panelSoft: string;
  input: string;
  label: string;
  btnPrimary: string;
  btnSecondary: string;
  btnPrimarySm: string;
  accentHex: string;
  borderHex: string;
  bgHex: string;
  fgHex: string;
  radius: string;
  focusRing: string;
  checkboxAccent: string;
  checkboxUnchecked: string;
  errorClasses: string;
}

const KIT_DISPATCH: Record<StyleSlug, (m: Mode) => any> = {
  "art-deco": artDeco,
  bauhaus: bauhaus,
  "bento-grid": bentoGrid,
  brutalist: brutalist,
  "dark-tech": darkTech,
  editorial: editorial,
  glassmorphism: glass,
  "gradient-modern": gradientModern,
  japandi: japandi,
  kinetic: kinetic,
  "luxury-minimal": luxuryMinimal,
  material: material,
  metropolitan: metropolitan,
  minimalist: minimalist,
  modernist: modernist,
  monochromatic: monochromatic,
  "neo-geo": neoGeo,
  neobrutalist: neobrutalist,
  neomorphism: neomorphism,
  organic: organic,
  "retro-futuristic": retroFuturistic,
  "retro-y2k": retroY2k,
  scandinavian: scandinavian,
  swiss: swiss,
  "typography-first": typographyFirst,
};

export function getStyleFormKit(slug: StyleSlug, mode: Mode): ResolvedStyleFormKit {
  const isDark = mode === "dark";
  const meta = STYLE_MAP[slug];
  const kitFn = KIT_DISPATCH[slug];
  const raw = kitFn ? kitFn(mode) : {};

  const accentHex = meta?.tokens?.accent || meta?.palette[2] || (isDark ? "#ffffff" : "#000000");
  const borderHex = meta?.tokens?.border || meta?.palette[3] || (isDark ? "#333333" : "#e5e5e5");
  const bgHex = meta?.tokens?.bg || (isDark ? "#0a0a0a" : "#ffffff");
  const fgHex = meta?.tokens?.fg || (isDark ? "#ffffff" : "#111111");

  // Determine radius and focus style based on slug
  let radius = "rounded-md";
  if (["brutalist", "neobrutalist", "bauhaus", "art-deco", "swiss", "editorial"].includes(slug)) {
    radius = "rounded-none";
  } else if (["glassmorphism", "neomorphism", "organic", "retro-y2k", "neo-geo"].includes(slug)) {
    radius = "rounded-xl";
  } else if (["scandinavian", "material", "japandi", "bento-grid"].includes(slug)) {
    radius = "rounded-lg";
  }

  let focusRing = "focus:ring-2 focus:ring-offset-1";
  if (slug === "brutalist" || slug === "neobrutalist") {
    focusRing = "focus:ring-2 focus:ring-black dark:focus:ring-white";
  } else if (slug === "dark-tech") {
    focusRing = "focus:ring-1 focus:ring-[#00FF41] focus:shadow-[0_0_12px_rgba(0,255,65,0.4)]";
  } else if (slug === "glassmorphism") {
    focusRing = "focus:ring-2 focus:ring-violet-400/40";
  }

  let checkboxAccent = "bg-primary text-primary-foreground border-primary";
  if (slug === "brutalist" || slug === "neobrutalist") {
    checkboxAccent = "bg-[#FFDE00] text-black border-2 border-black shadow-[2px_2px_0_#000]";
  } else if (slug === "dark-tech") {
    checkboxAccent = "bg-[#00FF41] text-black border border-[#00FF41] shadow-[0_0_10px_rgba(0,255,65,0.5)]";
  } else if (slug === "swiss") {
    checkboxAccent = "bg-[#E30613] text-white border border-[#E30613]";
  } else if (slug === "art-deco") {
    checkboxAccent = "bg-[#C9A961] text-black border border-[#C9A961]";
  } else if (slug === "japandi") {
    checkboxAccent = isDark ? "bg-[#A98D6B] text-[#201B15] border-[#A98D6B]" : "bg-[#8B7355] text-white border-[#8B7355]";
  } else if (slug === "retro-y2k") {
    checkboxAccent = "bg-[#FF2E93] text-white border-2 border-[#00E5FF]";
  } else if (slug === "bauhaus") {
    checkboxAccent = "bg-[#D62828] text-white border-2 border-black";
  } else if (slug === "bento-grid") {
    checkboxAccent = "bg-indigo-600 text-white border-indigo-500 shadow-sm";
  } else if (slug === "editorial") {
    checkboxAccent = isDark ? "bg-[#D6D3D1] text-[#1C1917] border-[#D6D3D1]" : "bg-[#1C1917] text-white border-[#1C1917]";
  } else if (slug === "glassmorphism") {
    checkboxAccent = "bg-gradient-to-br from-violet-500 to-indigo-600 text-white border-white/40 shadow-sm backdrop-blur-xs";
  } else if (slug === "gradient-modern") {
    checkboxAccent = "bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white border-transparent";
  } else if (slug === "kinetic") {
    checkboxAccent = "bg-[#FF5500] text-white border-[#FF5500]";
  } else if (slug === "luxury-minimal") {
    checkboxAccent = isDark ? "bg-[#D4AF37] text-black border-[#D4AF37]" : "bg-[#996515] text-white border-[#996515]";
  } else if (slug === "material") {
    checkboxAccent = isDark ? "bg-[#D0BCFF] text-[#381E72] border-[#D0BCFF]" : "bg-[#6750A4] text-white border-[#6750A4]";
  } else if (slug === "metropolitan") {
    checkboxAccent = "bg-blue-600 text-white border-blue-600";
  } else if (slug === "minimalist") {
    checkboxAccent = isDark ? "bg-white text-black border-white" : "bg-neutral-900 text-white border-neutral-900";
  } else if (slug === "modernist") {
    checkboxAccent = "bg-[#C85A32] text-white border-[#C85A32]";
  } else if (slug === "monochromatic") {
    checkboxAccent = "bg-blue-600 text-white border-blue-600";
  } else if (slug === "neo-geo") {
    checkboxAccent = "bg-[#8A2BE2] text-white border-2 border-[#00F0FF]";
  } else if (slug === "neomorphism") {
    checkboxAccent = isDark ? "bg-[#2d3239] text-[#00e5ff] border-transparent shadow-[inset_2px_2px_4px_rgba(0,0,0,0.6),inset_-2px_-2px_4px_rgba(255,255,255,0.05)]" : "bg-[#e2e8f0] text-blue-600 border-transparent shadow-[inset_2px_2px_4px_rgba(0,0,0,0.15),inset_-2px_-2px_4px_rgba(255,255,255,0.7)]";
  } else if (slug === "organic") {
    checkboxAccent = "bg-[#52796F] text-white border-[#52796F]";
  } else if (slug === "retro-futuristic") {
    checkboxAccent = "bg-[#FF00AA] text-white border-[#FF00AA] shadow-[0_0_8px_#FF00AA]";
  } else if (slug === "scandinavian") {
    checkboxAccent = "bg-[#4A7C59] text-white border-[#4A7C59]";
  } else if (slug === "typography-first") {
    checkboxAccent = isDark ? "bg-white text-black border-white" : "bg-black text-white border-black";
  }

  let checkboxUnchecked = isDark
    ? "border-neutral-700 bg-neutral-900/60 hover:border-neutral-500"
    : "border-neutral-300 bg-white hover:border-neutral-400";

  if (slug === "japandi") {
    checkboxUnchecked = isDark
      ? "border-[#A98D6B]/30 bg-[#241E16] text-[#EDE6D8] hover:border-[#A98D6B]/60"
      : "border-[#8B7355]/30 bg-[#FBF8F1] text-[#3D3529] hover:border-[#8B7355]/60";
  } else if (slug === "brutalist" || slug === "neobrutalist") {
    checkboxUnchecked = isDark
      ? "border-2 border-white bg-black hover:bg-neutral-900"
      : "border-2 border-black bg-white shadow-[2px_2px_0_#000] hover:bg-neutral-50";
  } else if (slug === "dark-tech") {
    checkboxUnchecked = "border border-[#00FF41]/40 bg-black/80 hover:border-[#00FF41] hover:shadow-[0_0_6px_rgba(0,255,65,0.3)]";
  } else if (slug === "glassmorphism") {
    checkboxUnchecked = isDark
      ? "border border-white/20 bg-white/5 backdrop-blur-xs hover:border-white/40"
      : "border border-black/15 bg-white/40 backdrop-blur-xs hover:border-black/30";
  } else if (slug === "art-deco") {
    checkboxUnchecked = isDark
      ? "border border-[#C9A961]/40 bg-[#1A1813] hover:border-[#C9A961]"
      : "border border-[#8C7335]/40 bg-[#FAF7EE] hover:border-[#8C7335]";
  } else if (slug === "retro-y2k") {
    checkboxUnchecked = "border-2 border-[#00E5FF] bg-[#120024] hover:bg-[#20003b]";
  } else if (slug === "neomorphism") {
    checkboxUnchecked = isDark
      ? "border-transparent bg-[#1e232a] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.5),inset_-2px_-2px_4px_rgba(255,255,255,0.05)]"
      : "border-transparent bg-[#e6ecf4] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.6),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]";
  } else if (slug === "bauhaus") {
    checkboxUnchecked = isDark
      ? "border-2 border-[#F1FAEE] bg-transparent hover:bg-white/10"
      : "border-2 border-[#1D3557] bg-white hover:bg-neutral-100";
  } else if (slug === "swiss") {
    checkboxUnchecked = isDark
      ? "border border-white bg-transparent hover:bg-white/10"
      : "border border-black bg-white hover:bg-neutral-100";
  }

  const errorClasses = raw.errorBg || (isDark ? "border-rose-500 text-rose-400" : "border-rose-600 text-rose-600");

  return {
    slug,
    styleName: meta?.name || slug,
    isDark,
    stage: raw.stage || (isDark ? "bg-black" : "bg-white"),
    text: raw.text || (isDark ? "text-white" : "text-black"),
    strong: raw.strong || raw.heading || raw.text || (isDark ? "text-white font-bold" : "text-neutral-900 font-bold"),
    muted: raw.muted || (isDark ? "text-neutral-400" : "text-neutral-600"),
    faint: raw.faint || (isDark ? "text-neutral-500" : "text-neutral-400"),
    panel: raw.panel || "border p-5 rounded-lg",
    panelSoft: raw.panelSoft || raw.panel || "border p-4 rounded-md",
    input: raw.input || "border px-3 py-2 text-sm rounded-md",
    label: raw.label || "block text-xs font-semibold mb-1",
    btnPrimary: raw.btnPrimary || "bg-primary text-primary-foreground px-4 py-2 rounded-md",
    btnSecondary: raw.btnSecondary || "border border-border px-4 py-2 rounded-md",
    btnPrimarySm: raw.btnPrimarySm || raw.btnPrimary || "bg-primary text-primary-foreground px-3 py-1 text-xs rounded",
    accentHex,
    borderHex,
    bgHex,
    fgHex,
    radius,
    focusRing,
    checkboxAccent,
    checkboxUnchecked,
    errorClasses,
  };
}
