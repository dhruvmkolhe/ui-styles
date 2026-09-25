import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";
import { PageTransition } from "@/components/shell/page-transition";
import { COMPONENTS_CATALOG } from "@/lib/components-catalog";

export const metadata: Metadata = {
  title: "Component catalog",
  description:
    "15 essential UI components — buttons, cards, navbars, modals, tabs and more — crafted in every UI Hub aesthetic with copy-ready Tailwind code.",
};

const LIVE = [
  { slug: "glassmorphism", name: "Glassmorphism" },
  { slug: "japandi", name: "Japandi" },
];

export default function ComponentsPage() {
  return (
    <PageTransition>
      <section className="container py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs text-muted-foreground">
            15 components · every style
          </span>
          <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            The component <span className="text-gradient">catalog</span>
          </h1>
          <p className="mt-5 text-balance leading-relaxed text-muted-foreground">
            The same 15 essentials, re-imagined in each aesthetic. Open any
            component in a live style gallery, preview it in light or dark, and
            copy the exact HTML + Tailwind.
          </p>
        </div>

        {/* free-tier note */}
        <div className="mx-auto mt-10 flex max-w-xl items-start gap-3 rounded-xl border border-border bg-card/50 p-4 text-left text-[13px] text-muted-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
          <p>
            The Free plan unlocks 5 components per style (with a small
            watermark in copied code).{" "}
            <Link href="/#pricing" className="text-foreground underline underline-offset-2">
              Pro &amp; Lifetime
            </Link>{" "}
            unlock all 15 in every style, clean.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COMPONENTS_CATALOG.map((c, i) => (
            <div
              key={c.id}
              className="group flex flex-col rounded-2xl border border-border bg-card/60 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-500/35 hover:shadow-[0_12px_36px_-14px_rgba(139,92,246,0.3)]"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted/60 text-violet-400 transition-colors group-hover:border-violet-500/30">
                  <c.icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-[10px] text-muted-foreground/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 text-sm font-semibold">{c.name}</h3>
              <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-muted-foreground">
                {c.description}
              </p>
              <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
                {LIVE.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/style/${s.slug}#${c.id}`}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/40 px-3 py-1 text-[11px] text-muted-foreground transition-colors hover:border-violet-500/40 hover:text-foreground"
                  >
                    {s.name}
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                ))}
                <span className="ml-auto text-[10px] text-muted-foreground/60">
                  +6 styles soon
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
