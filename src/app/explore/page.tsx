import type { Metadata } from "next";
import { ExploreGrid } from "@/components/explore/explore-grid";
import { STYLE_LIST } from "@/lib/styles/registry";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Explore styles",
  description:
    "Browse 25 UI design aesthetics — Japandi, Glassmorphism, Brutalist, Minimalist, Neomorphism, Retro Y2K, Dark Tech and more — rendered live.",
  alternates: {
    canonical: "/explore",
  },
  openGraph: {
    url: "/explore",
    title: "Explore 25 design aesthetics — Chameleon UI",
    description:
      "Browse 25 UI design aesthetics — Japandi, Glassmorphism, Brutalist, Minimalist, Neomorphism, Retro Y2K, Dark Tech and more — rendered live.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore 25 design aesthetics — Chameleon UI",
    description:
      "Browse 25 UI design aesthetics — Japandi, Glassmorphism, Brutalist, Minimalist, Neomorphism, Retro Y2K, Dark Tech and more — rendered live.",
  },
};

export default function ExplorePage() {
  // ItemList of every aesthetic so crawlers see the directory structure.
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Chameleon UI design aesthetics",
    numberOfItems: STYLE_LIST.length,
    itemListElement: STYLE_LIST.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      url: siteUrl(`/style/${s.slug}`),
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
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/25 bg-teal-50 px-4 py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-teal-700 dark:bg-teal-950/40 dark:text-teal-300">
            Style Explorer
          </span>
          <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight sm:text-6xl text-foreground">
            Explore 25 design <span className="text-gradient">aesthetics</span>
          </h1>
          <p className="mt-5 text-balance text-base sm:text-lg leading-relaxed text-muted-foreground">
            Each style is a complete design language — rendered live below in
            its own visual voice. Open one for its full gallery of 15
            copy-ready components.
          </p>
        </div>

        <ExploreGrid />
      </section>
    </>
  );
}
