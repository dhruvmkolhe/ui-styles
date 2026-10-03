import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";
import { COMPONENTS_CATALOG } from "@/lib/components-catalog";
import { ComponentsDocumentationShowcase } from "@/components/gallery/components-documentation-showcase";
import { siteUrl } from "@/lib/site";

const COUNT = COMPONENTS_CATALOG.length;

export async function generateMetadata() {
  const description = `Buttons, cards, forms, modals, tabs and more — ${COUNT} essential UI components with copy-ready Tailwind code in every Chameleon UI aesthetic.`;
  return {
    title: "Component catalog",
    description,
    alternates: {
      canonical: "/components",
    },
    openGraph: {
      url: "/components",
      title: "Component catalog — Chameleon UI",
      description,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: "Component catalog — Chameleon UI",
      description,
    },
  };
}

const LIVE = [
  { slug: "japandi", name: "Japandi" },
  { slug: "glassmorphism", name: "Glassmorphism" },
  { slug: "brutalist", name: "Brutalist" },
  { slug: "dark-tech", name: "Dark Tech" },
];

export default function ComponentsPage() {
  // ItemList of every catalog entry with deep-link anchors. The card grid
  // below renders `id={c.id}` on each card, so every `url` here resolves.
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Chameleon UI component catalog",
    numberOfItems: COUNT,
    itemListElement: COMPONENTS_CATALOG.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: siteUrl(`/components#${c.id}`),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <section className="container py-20 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/25 bg-teal-50 px-3.5 py-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-teal-700 dark:bg-teal-950/40 dark:text-teal-300">
            Component Directory
          </span>
          <h1 className="mt-5 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl">
            {COUNT} Essential Components
          </h1>
          <p className="mt-4 text-balance leading-relaxed text-muted-foreground text-base sm:text-lg">
            The complete suite of {COUNT} production UI components crafted authentically in each aesthetic.
            Preview in light or dark mode and copy clean HTML + Tailwind CSS.
          </p>
        </div>

        {/* Chakra Alert banner */}
        <div className="mx-auto mt-8 flex max-w-3xl items-start gap-3.5 rounded-xl border border-teal-500/30 bg-teal-50/70 dark:bg-teal-950/30 p-4.5 text-left text-sm text-teal-900 dark:text-teal-200">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-teal-600 dark:text-teal-400" />
          <p className="leading-relaxed">
            <strong className="font-semibold">100% Free &amp; Open Source:</strong> Every component across all 25 styles is fully unlocked with unwatermarked, production-ready code.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COMPONENTS_CATALOG.map((c, i) => (
            <div
              key={c.id}
              id={c.id}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:border-teal-500/50 hover:shadow-md scroll-mt-24"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-teal-500/20 bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400 transition-colors">
                  <c.icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-xs font-semibold text-muted-foreground">
                  #{String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h2 className="mt-4 text-base font-bold text-foreground">{c.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {c.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border pt-4">
                {LIVE.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/style/${s.slug}#${c.id}`}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-teal-500/40 hover:text-foreground"
                  >
                    {s.name}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
                <span className="ml-auto text-xs font-medium text-muted-foreground/60">
                  +21 styles
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Documentation & Showcase */}
        <ComponentsDocumentationShowcase />
      </section>
    </>
  );
}
