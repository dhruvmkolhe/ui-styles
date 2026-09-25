import type { StyleMeta, StyleSlug } from "./types";

export const STYLE_LIST: StyleMeta[] = [
  {
    slug: "japandi",
    name: "Japandi",
    tagline: "Warm minimalism, quiet balance",
    description:
      "A serene fusion of Japanese and Scandinavian design. Warm neutrals, honest materials, thin 1px borders and generous whitespace — nothing extra, nothing missing.",
    tags: ["Warm neutrals", "Thin 1px borders", "Serif accents", "Whitespace", "No decoration"],
    palette: ["#F5F0E8", "#8B7355", "#3D3529", "#D8CBB6"],
    status: "live",
    defaultMode: "light",
  },
  {
    slug: "glassmorphism",
    name: "Glassmorphism",
    tagline: "Frosted glass, layered light",
    description:
      "Translucent frosted panels floating over vivid gradients. backdrop-blur, rgba borders and soft glows give interfaces a luminous sense of depth.",
    tags: ["Frosted blur", "RGBA borders", "Soft glow", "Purple & blue", "Depth"],
    palette: ["#8B5CF6", "#22D3EE", "#0B0A14", "#E0E7FF"],
    status: "live",
    defaultMode: "dark",
  },
  {
    slug: "brutalist",
    name: "Brutalist",
    tagline: "Raw, loud, unapologetic",
    description:
      "Thick black borders, hard offset shadows, oversized impact type and zero decoration. Brutalism strips design down to structure and shouts with contrast.",
    tags: ["Border-4 black", "Hard shadows", "High contrast", "Raw layout", "Impact type"],
    palette: ["#000000", "#FFFFFF", "#FFDE00", "#FF3B30"],
    status: "live",
    defaultMode: "light",
  },
  {
    slug: "minimalist",
    name: "Minimalist",
    tagline: "Less, but better",
    description:
      "Pure white space, a single muted accent and whisper-thin typography. Minimalism removes everything that is not the content itself.",
    tags: ["Pure white", "Single accent", "Thin type", "Max whitespace", "Zero decoration"],
    palette: ["#FFFFFF", "#111111", "#8A8A8A", "#F2F2F2"],
    status: "live",
    defaultMode: "light",
  },
  {
    slug: "neomorphism",
    name: "Neomorphism",
    tagline: "Soft UI, extruded surfaces",
    description:
      "Components appear pressed from the background itself — paired light and dark shadows on a same-hue canvas create a pillowy, tactile feel.",
    tags: ["Soft shadow pairs", "Same-hue bg", "No hard edges", "Muted palette", "Tactile"],
    palette: ["#E0E5EC", "#B8BEC7", "#FFFFFF", "#6D7DF2"],
    status: "live",
    defaultMode: "light",
  },
  {
    slug: "retro-y2k",
    name: "Retro / Y2K",
    tagline: "2000s chrome & candy",
    description:
      "Hot pink, electric blue and lime gradients. Bubbly type, star bursts, stickers, thick colorful borders and chaotic millennium-web joy.",
    tags: ["Hot gradients", "Bubble fonts", "Star bursts", "Chunky borders", "Chaotic fun"],
    palette: ["#FF2E93", "#00E5FF", "#B6FF00", "#7C4DFF"],
    status: "live",
    defaultMode: "light",
  },
  {
    slug: "dark-tech",
    name: "Dark Tech",
    tagline: "Terminal glow, cyber precision",
    description:
      "Pure black canvases, phosphor-green monospace type, scanning grid lines and glowing borders — the interface as a machine.",
    tags: ["Pure black", "Mono type", "Neon glow", "Grid overlays", "Terminal UI"],
    palette: ["#000000", "#00FF41", "#00FFFF", "#111111"],
    status: "live",
    defaultMode: "dark",
  },
  {
    slug: "bento-grid",
    name: "Bento Grid",
    tagline: "Editorial grids, mixed sizes",
    description:
      "An asymmetric bento of mixed-size cards with subtle borders — the modern editorial layout popularized by Apple, Linear and Vercel.",
    tags: ["Asymmetric grid", "Mixed card sizes", "Subtle borders", "Editorial", "Modern"],
    palette: ["#0F172A", "#1E293B", "#94A3B8", "#6366F1"],
    status: "live",
    defaultMode: "dark",
  },
];

export const STYLE_MAP: Record<StyleSlug, StyleMeta> = Object.fromEntries(
  STYLE_LIST.map((s) => [s.slug, s])
) as Record<StyleSlug, StyleMeta>;

export const LIVE_SLUGS: StyleSlug[] = STYLE_LIST.filter(
  (s) => s.status === "live"
).map((s) => s.slug);

export function getStyleMeta(slug: string): StyleMeta | undefined {
  return STYLE_MAP[slug as StyleSlug];
}
