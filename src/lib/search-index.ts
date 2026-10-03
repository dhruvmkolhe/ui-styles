/**
 * search-index.ts
 *
 * Builds the canonical search index for the global SearchDialog.
 * Sources:
 *   - Design styles      (/style/:slug)
 *   - UI components      (/components#:id)
 *   - App pages          (top-level routes)
 *
 * No private or sensitive data is included.
 * All content is statically derived from existing public registries.
 */

import { STYLE_LIST } from "@/lib/styles/registry";
import { COMPONENTS_CATALOG } from "@/lib/components-catalog";

export type SearchCategory =
  | "Styles"
  | "Components"
  | "Pages";

export interface SearchEntry {
  id: string;
  title: string;
  description: string;
  category: SearchCategory;
  /** Extra tokens to boost matches (tags, keywords, aliases). */
  keywords: string[];
  href: string;
  /** Optional badge label shown next to the title. */
  badge?: string;
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styleEntries: SearchEntry[] = STYLE_LIST.map((s) => ({
  id: `style-${s.slug}`,
  title: s.name,
  description: s.tagline,
  category: "Styles",
  keywords: s.tags,
  href: `/style/${s.slug}`,
  badge: s.status === "live" ? "Live" : undefined,
}));

// ─── UI Components ───────────────────────────────────────────────────────────

const componentEntries: SearchEntry[] = COMPONENTS_CATALOG.map((c) => ({
  id: `comp-${c.id}`,
  title: c.name,
  description: c.description,
  category: "Components",
  keywords: c.id.split("-"),          // slug words as extra keywords
  href: `/components#${c.id}`,
  badge: (c as { isNew?: boolean }).isNew ? "New" : undefined,
}));

// ─── App Pages ───────────────────────────────────────────────────────────────

const pageEntries: SearchEntry[] = [
  {
    id: "page-home",
    title: "Home",
    description: "Chameleon UI landing page — every UI style in one hub",
    category: "Pages",
    keywords: ["home", "landing", "start"],
    href: "/",
  },
  {
    id: "page-explore",
    title: "Explore Styles",
    description: "Browse all 25 design aesthetics — Japandi, Brutalist, Glassmorphism, and more",
    category: "Pages",
    keywords: ["explore", "aesthetics", "design", "styles"],
    href: "/explore",
  },
  {
    id: "page-components",
    title: "Component Catalog",
    description: `${COMPONENTS_CATALOG.length} production-ready UI components with interactive documentation and showcase`,
    category: "Pages",
    keywords: ["components", "catalog", "documentation", "ui"],
    href: "/components",
  },
];

// ─── Full index ───────────────────────────────────────────────────────────────

export const SEARCH_INDEX: SearchEntry[] = [
  ...styleEntries,
  ...componentEntries,
  ...pageEntries,
];

// ─── Search helper ────────────────────────────────────────────────────────────

/**
 * Returns all entries matching `rawQuery`, grouped by category.
 * Matching is case-insensitive, partial-word, and keyword-aware.
 * Results within each category are relevance-sorted (title-start matches first).
 *
 * @param rawQuery   The user's raw input string.
 * @param maxPerCat  Max results per category (default 8).
 */
export function searchIndex(
  rawQuery: string,
  maxPerCat = 8
): Map<SearchCategory, SearchEntry[]> {
  const q = rawQuery.trim().toLowerCase();

  const score = (entry: SearchEntry): number => {
    if (!q) return 0;
    let s = 0;
    const titleL = entry.title.toLowerCase();
    const descL = entry.description.toLowerCase();
    if (titleL === q) s += 100;
    else if (titleL.startsWith(q)) s += 60;
    else if (titleL.includes(q)) s += 40;
    if (descL.includes(q)) s += 10;
    if (entry.keywords.some((k) => k.toLowerCase().includes(q))) s += 5;
    return s;
  };

  const matches = SEARCH_INDEX
    .map((entry) => ({ entry, score: q ? score(entry) : 1 }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  const result = new Map<SearchCategory, SearchEntry[]>();
  for (const { entry } of matches) {
    const cat = entry.category;
    if (!result.has(cat)) result.set(cat, []);
    const list = result.get(cat)!;
    if (list.length < maxPerCat) list.push(entry);
  }
  return result;
}

/**
 * Flat list of all results (across categories), capped at `maxTotal`.
 * Used for keyboard-navigation index calculation.
 */
export function flatSearchResults(
  grouped: Map<SearchCategory, SearchEntry[]>
): SearchEntry[] {
  return Array.from(grouped.values()).flat();
}
