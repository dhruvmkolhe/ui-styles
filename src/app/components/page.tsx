import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";
import { PageTransition } from "@/components/shell/page-transition";
import { COMPONENTS_CATALOG } from "@/lib/components-catalog";
import { ComponentsDocumentationShowcase } from "@/components/gallery/components-documentation-showcase";

export const metadata: Metadata = {
  title: "Component catalog",
  description:
    "25 essential UI components — buttons, cards, checkboxes, selects, forms, modals, tabs and more — crafted in every UI Hub aesthetic with copy-ready Tailwind code.",
};

const LIVE = [
  { slug: "japandi", name: "Japandi" },
  { slug: "glassmorphism", name: "Glassmorphism" },
  { slug: "brutalist", name: "Brutalist" },
  { slug: "dark-tech", name: "Dark Tech" },
];

export default function ComponentsPage() {
  return (
    <PageTransition>
      <section className="container py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-teal-500/20 bg-teal-50 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-teal-700 dark:bg-teal-950/40 dark:text-teal-300">
            Component Directory
          </span>
          <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            65 Essential Components
          </h1>
          <p className="mt-4 text-balance leading-relaxed text-muted-foreground text-sm sm:text-base">
            The complete suite of 65 production UI components crafted authentically in each aesthetic.
            Preview in light or dark mode and copy clean HTML + Tailwind CSS.
          </p>
        </div>

        {/* Chakra Alert banner */}
        <div className="mx-auto mt-8 flex max-w-2xl items-start gap-3 rounded-lg border border-teal-500/30 bg-teal-50/70 dark:bg-teal-950/30 p-4 text-left text-xs text-teal-900 dark:text-teal-200">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400" />
          <p className="leading-relaxed">
            <strong className="font-semibold">100% Free &amp; Open Source:</strong> Every component across all 25 styles is fully unlocked with unwatermarked, production-ready code.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COMPONENTS_CATALOG.map((c, i) => (
            <div
              key={c.id}
              className="group flex flex-col rounded-lg border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:border-teal-500/50 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-teal-500/20 bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400 transition-colors">
                  <c.icon className="h-4.5 w-4.5" />
                </span>
                <span className="font-mono text-[11px] font-semibold text-muted-foreground">
                  #{String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-3.5 text-sm font-bold text-foreground">{c.name}</h3>
              <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">
                {c.description}
              </p>
              <div className="mt-5 flex items-center gap-2 border-t border-border pt-3.5">
                {LIVE.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/style/${s.slug}#${c.id}`}
                    className="inline-flex items-center gap-1 rounded border border-border bg-muted/40 px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:border-teal-500/40 hover:text-foreground"
                  >
                    {s.name}
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                ))}
                <span className="ml-auto text-[10px] text-muted-foreground/60">
                  +21 styles
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Documentation & Showcase */}
        <ComponentsDocumentationShowcase />
      </section>
    </PageTransition>
  );
}
