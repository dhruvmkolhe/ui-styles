"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { STYLE_LIST } from "@/lib/styles/registry";
import { StyleCard } from "@/components/styles/style-card";

const CATEGORIES = [
  { id: "all", label: "All Styles" },
  { id: "live", label: "Live Galleries" },
  { id: "minimal", label: "Minimal & Clean" },
  { id: "tech", label: "Dark & Tech" },
  { id: "retro", label: "Retro & Nostalgia" },
  { id: "expressive", label: "Glass & Vibrant" },
];

export function ExploreGrid() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const styles = useMemo(() => {
    return STYLE_LIST.filter((s) => {
      // Category filter
      let matchesCat = true;
      if (category === "live") {
        matchesCat = s.status === "live";
      } else if (category === "minimal") {
        matchesCat = ["japandi", "minimalist", "luxury-minimal", "scandinavian", "monochromatic"].includes(s.slug);
      } else if (category === "tech") {
        matchesCat = ["dark-tech", "brutalist", "neobrutalist", "swiss", "metropolitan", "bento-grid"].includes(s.slug);
      } else if (category === "retro") {
        matchesCat = ["retro-y2k", "retro-futuristic", "art-deco", "bauhaus"].includes(s.slug);
      } else if (category === "expressive") {
        matchesCat = ["glassmorphism", "gradient-modern", "kinetic", "neo-geo", "organic", "neomorphism"].includes(s.slug);
      }

      // Query filter
      const q = query.trim().toLowerCase();
      const matchesQuery = !q ||
        s.name.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCat && matchesQuery;
    });
  }, [category, query]);

  return (
    <div className="mt-8 space-y-8">
      {/* Search and Category Filter Bar */}
      <div className="mx-auto max-w-3xl space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
          <input
            id="explore-search-input"
            name="exploreSearch"
            aria-label="Search styles by name, vibe, or keyword"
            type="text"
            autoComplete="off"
            suppressHydrationWarning
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search styles by name, vibe, or keyword (e.g. glass, retro, minimal)..."
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-10 text-sm shadow-sm outline-none placeholder:text-muted-foreground focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((c) => {
            const active = category === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={cn(
                  "rounded-md border px-3.5 py-1.5 text-xs font-semibold transition-all",
                  active
                    ? "border-teal-600 bg-teal-600 text-white shadow-sm"
                    : "border-border bg-card text-muted-foreground hover:border-teal-500/40 hover:text-foreground"
                )}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results count status */}
      <div className="flex items-center justify-between border-b border-border pb-3 text-xs text-muted-foreground">
        <span>Showing {styles.length} of {STYLE_LIST.length} aesthetics</span>
        {(query || category !== "all") && (
          <button
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
            className="text-teal-600 dark:text-teal-400 hover:underline font-medium"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Grid */}
      {styles.length > 0 ? (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {styles.map((s) => (
            <StyleCard key={s.slug} meta={s} variant="full" />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-base font-semibold text-foreground">No matching styles found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your search query or reset the filters.
          </p>
        </div>
      )}
    </div>
  );
}
