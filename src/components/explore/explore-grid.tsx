"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { STYLE_LIST } from "@/lib/styles/registry";
import { StyleCard } from "@/components/styles/style-card";

export function ExploreGrid() {
  const [selectedTag, setSelectedTag] = useState<string>("all");

  const allTags = useMemo(() => {
    const set = new Set<string>();
    STYLE_LIST.forEach((s) => s.tags.forEach((t) => set.add(t.toLowerCase())));
    return ["all", ...Array.from(set)];
  }, []);

  const styles = useMemo(() => {
    if (selectedTag === "all") return STYLE_LIST;
    return STYLE_LIST.filter((s) =>
      s.tags.some((t) => t.toLowerCase() === selectedTag)
    );
  }, [selectedTag]);

  return (
    <div className="mt-12">
      {/* tag filter bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
        {allTags.map((tag) => {
          const active = selectedTag === tag;
          const count =
            tag === "all"
              ? STYLE_LIST.length
              : STYLE_LIST.filter((s) =>
                  s.tags.some((t) => t.toLowerCase() === tag)
                ).length;

          return (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-medium capitalize transition-all",
                active
                  ? "border-violet-500 bg-violet-500/20 text-violet-300 shadow-sm"
                  : "border-border bg-card/50 text-muted-foreground hover:border-violet-500/30 hover:text-foreground"
              )}
            >
              {tag}
              <span className="ml-1.5 text-[10px] opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {/* grid: 1 col mobile / 2 tablet / 3 desktop / 4 xl */}
      <motion.div
        layout
        className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {styles.map((s, i) => (
          <motion.div
            key={s.slug}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.3) }}
          >
            <StyleCard meta={s} variant="full" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
