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

  let checkboxAccent = "bg-primary text-primary-foreground";
  if (slug === "brutalist" || slug === "neobrutalist") {
    checkboxAccent = "bg-[#FFDE00] text-black border-2 border-black shadow-[2px_2px_0_#000]";
  } else if (slug === "dark-tech") {
    checkboxAccent = "bg-[#00FF41] text-black border border-[#00FF41] shadow-[0_0_10px_rgba(0,255,65,0.5)]";
  } else if (slug === "swiss") {
    checkboxAccent = "bg-[#E30613] text-white border border-[#E30613]";
  } else if (slug === "art-deco") {
    checkboxAccent = "bg-[#C9A961] text-black border border-[#F3E5AB]";
  } else if (slug === "japandi") {
    checkboxAccent = isDark ? "bg-[#A98D6B] text-[#201B15]" : "bg-[#8B7355] text-white";
  } else if (slug === "retro-y2k") {
    checkboxAccent = "bg-[#FF2E93] text-white border-2 border-[#00E5FF]";
  }

  const errorClasses = raw.errorBg || (isDark ? "border-rose-500 text-rose-400" : "border-rose-600 text-rose-600");

  return {
    slug,
    styleName: meta?.name || slug,
    isDark,
    stage: raw.stage || (isDark ? "bg-black" : "bg-white"),
    text: raw.text || (isDark ? "text-white" : "text-black"),
    strong: raw.strong || raw.heading || "font-bold",
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
    errorClasses,
  };
}
