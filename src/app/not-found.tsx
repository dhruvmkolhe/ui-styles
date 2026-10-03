import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STYLE_LIST } from "@/lib/styles/registry";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you requested does not exist. Explore 25 UI design aesthetics or browse the component catalog instead.",
  robots: {
    index: false,
    follow: true,
  },
};

// NOTE(analytics): once `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set (see
// `src/components/shell/analytics.tsx`), visits to this page are tracked as
// automatic pageviews — segment 404s in Plausible by filtering on the URL.
export default function NotFound() {
  const popular = STYLE_LIST.slice(0, 4);

  return (
      <section className="container flex flex-col items-center py-24 text-center sm:py-32">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-600/10 text-teal-600 dark:text-teal-400">
          <Compass className="h-7 w-7" />
        </span>
        <p className="mt-6 font-mono text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          404
        </p>
        <h1 className="mt-3 max-w-xl text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          This page drifted off the canvas
        </h1>
        <p className="mt-4 max-w-md text-balance text-base leading-relaxed text-muted-foreground">
          The link you followed doesn&apos;t exist or was moved. Head back home
          or jump straight into a live style gallery.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/" data-track="cta-404-home">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/explore" data-track="cta-404-explore">
              <LayoutGrid className="h-4 w-4 mr-2" />
              Explore styles
            </Link>
          </Button>
        </div>
        <div className="mt-12 w-full max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Popular galleries
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {popular.map((s) => (
              <Link
                key={s.slug}
                href={`/style/${s.slug}`}
                className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-teal-500/40 hover:text-foreground"
              >
                {s.name} · {s.tagline}
              </Link>
            ))}
          </div>
        </div>
      </section>
  );
}
