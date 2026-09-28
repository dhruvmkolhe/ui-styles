import type { ComponentType } from "react";

export type Mode = "light" | "dark";

export type StyleSlug =
  | "japandi"
  | "glassmorphism"
  | "brutalist"
  | "minimalist"
  | "neomorphism"
  | "retro-y2k"
  | "dark-tech"
  | "bento-grid"
  | "neobrutalist"
  | "swiss"
  | "editorial"
  | "retro-futuristic"
  | "bauhaus"
  | "art-deco"
  | "material"
  | "monochromatic"
  | "scandinavian"
  | "modernist"
  | "organic"
  | "luxury-minimal"
  | "neo-geo"
  | "kinetic"
  | "gradient-modern"
  | "typography-first"
  | "metropolitan";

export interface StyleTokens {
  bg: string;
  fg: string;
  accent: string;
  border: string;
}

export interface StyleMeta {
  slug: StyleSlug;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  palette: string[];
  status: "live" | "soon";
  defaultMode: Mode;
  tokens?: StyleTokens;
}

export interface ComponentDef {
  id: string;
  name: string;
  description: string;
  Preview: ComponentType<{ mode: Mode }>;
  code: (mode: Mode) => string;
}

export interface StyleBundle {
  /** Classes for the preview stage container (bg, border…) */
  stage: (mode: Mode) => string;
  /** Base text color applied inside the stage */
  text: (mode: Mode) => string;
  /** Optional decorative layer rendered behind previews (blobs, grid lines…) */
  Decor?: ComponentType<{ mode: Mode }>;
  defs: ComponentDef[];
}
