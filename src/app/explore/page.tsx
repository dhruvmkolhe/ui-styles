import type { Metadata } from "next";
import { PageTransition } from "@/components/shell/page-transition";
import { ExploreGrid } from "@/components/explore/explore-grid";

export const metadata: Metadata = {
  title: "Explore styles",
  description:
    "Browse 8 UI design aesthetics — Japandi, Glassmorphism, Brutalist, Minimalist, Neomorphism, Retro/Y2K, Dark Tech and Bento Grid.",
};

export default function ExplorePage() {
  return (
    <PageTransition>
      <section className="container py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs text-muted-foreground">
            Style Explorer
          </span>
          <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Explore 8 design <span className="text-gradient">aesthetics</span>
          </h1>
          <p className="mt-5 text-balance leading-relaxed text-muted-foreground">
            Each style is a complete design language — rendered live below in
            its own visual voice. Open one for its full gallery of 15
            copy-ready components.
          </p>
        </div>

        <ExploreGrid />
      </section>
    </PageTransition>
  );
}
