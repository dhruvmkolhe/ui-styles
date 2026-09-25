"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { STYLE_LIST } from "@/lib/styles/registry";
import { StyleCard } from "@/components/styles/style-card";

const FILTERS = [
  { id: "all", label: "All styles" },
  { id: "live", label: "Live galleries" },
  { id: "soon", label: "Coming soon" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

export function ExploreGrid() {
  const [filter, setFilter] = useState<FilterId>("all");

  const styles = STYLE_LIST.filter((s) =>
    filter === "all" ? true : s.status === filter
  );

  const counts: Record<FilterId, number> = {
    all: STYLE_LIST.length,
    live: STYLE_LIST.filter((s) => s.status === "live").length,
    soon: STYLE_LIST.filter((s) => s.status === "soon").length,
  };

  return (
    <div className="mt-12">
      {/* filters */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
              filter === f.id
                ? "border-violet-500/50 bg-violet-500/15 text-violet-300"
                : "border-border bg-card/50 text-muted-foreground hover:text-foreground"
            )}
          >
            {f.label}
            <span className="ml-1.5 text-[10px] opacity-70">{counts[f.id]}</span>
          </button>
        ))}
      </div>

      {/* grid */}
      <motion.div
        layout
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {styles.map((s, i) => (
          <motion.div
            key={s.slug}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
          >
            <StyleCard meta={s} variant="full" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
