import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageTransition } from "@/components/shell/page-transition";
import { STYLE_LIST, getStyleMeta } from "@/lib/styles/registry";
import { StyleGallery } from "@/components/gallery/style-gallery";
import { ComingSoon } from "@/components/shell/coming-soon";

export function generateStaticParams() {
  return STYLE_LIST.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getStyleMeta(slug);
  if (!meta) return { title: "Style not found" };
  return {
    title: `${meta.name} UI style`,
    description: meta.description,
  };
}

export default async function StylePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = getStyleMeta(slug);
  if (!meta) notFound();

  const live = meta.status === "live";

  return (
    <PageTransition>
      {/* ---------- header ---------- */}
      <section className="container pb-10 pt-12 sm:pt-16">
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          All styles
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {meta.name}
          </h1>
          <span
            className={
              live
                ? "inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-semibold text-emerald-400"
                : "inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-[11px] font-semibold text-amber-400"
            }
          >
            <span className={live ? "h-1.5 w-1.5 rounded-full bg-emerald-400" : "h-1.5 w-1.5 rounded-full bg-amber-400"} />
            {live ? "Live · 65 components" : "Coming soon"}
          </span>
        </div>

        <p className="mt-3 text-lg text-muted-foreground">{meta.tagline}</p>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
          {meta.description}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
          {/* vibe tags */}
          <div className="flex flex-wrap gap-2">
            {meta.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          {/* palette */}
          <div className="flex items-center gap-2">
            {meta.palette.map((hex) => (
              <span key={hex} className="group/pal relative">
                <span
                  className="block h-6 w-6 rounded-full border border-border shadow-sm"
                  style={{ backgroundColor: hex }}
                  title={hex}
                />
                <span className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-popover px-1.5 py-0.5 font-mono text-[9px] text-popover-foreground opacity-0 shadow transition-opacity group-hover/pal:opacity-100">
                  {hex}
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- gallery or coming soon ---------- */}
      {live ? (
        <StyleGallery slug={meta.slug} meta={meta} />
      ) : (
        <ComingSoon meta={meta} />
      )}

      <div className="h-16" />
    </PageTransition>
  );
}
