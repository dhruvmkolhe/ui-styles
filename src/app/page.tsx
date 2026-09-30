import Link from "next/link";
import { ArrowRight, MoonStar, Palette, Rocket, SquareTerminal } from "lucide-react";
import { PageTransition } from "@/components/shell/page-transition";
import { Hero } from "@/components/landing/hero";
import { StyleCard } from "@/components/styles/style-card";
import { STYLE_LIST } from "@/lib/styles/registry";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: SquareTerminal,
    title: "Copy-ready code",
    text: "Every component ships as clean HTML + Tailwind — paste it anywhere, own it forever.",
  },
  {
    icon: MoonStar,
    title: "Light & dark previews",
    text: "Flip each style between light and dark and copy the exact variant you need.",
  },
  {
    icon: Palette,
    title: "Hand-tuned aesthetics",
    text: "Not themes with a color swap — each style is designed authentically, detail by detail.",
  },
  {
    icon: Rocket,
    title: "100% free & growing",
    text: "The hub keeps growing with new styles and components — completely free and open.",
  },
];

export default function LandingPage() {
  return (
    <PageTransition>
      <Hero />

      {/* ---------- style preview grid ---------- */}
      <section className="container py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-teal-500/20 bg-teal-50 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-teal-700 dark:bg-teal-950/40 dark:text-teal-300">
            Aesthetic Directory
          </span>
          <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            25 Design Languages. Rendered Live.
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
            Every card below is rendered live in its authentic design language.
            Click through for the complete 15-component gallery with light and dark mode toggles.
          </p>
        </div>

        <div className="mt-12 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {STYLE_LIST.map((s) => (
            <StyleCard key={s.slug} meta={s} />
          ))}
        </div>
      </section>

      {/* ---------- feature strip ---------- */}
      <section className="container pb-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-lg border border-border bg-card p-5 shadow-sm transition-colors hover:border-teal-500/40"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-teal-500/20 bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400">
                <f.icon className="h-4.5 w-4.5" />
              </span>
              <h3 className="mt-3.5 text-sm font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- final CTA ---------- */}
      <section className="container pb-20">
        <div className="rounded-xl border border-border bg-card px-6 py-12 text-center shadow-sm sm:px-12">
          <div className="mx-auto max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-teal-500/20 bg-teal-50 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-teal-700 dark:bg-teal-950/40 dark:text-teal-300">
              Open Source
            </span>
            <h2 className="mt-4 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Ready to ship clean, authentic interfaces?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Stop reinventing the wheel with generic templates. Pick an aesthetic,
              copy the Tailwind CSS code, and build something memorable today.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-md bg-teal-600 px-6 font-semibold text-white shadow-sm hover:bg-teal-700 active:bg-teal-800">
                <Link href="/explore">
                  Explore 25 Styles
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-md border-border bg-card px-6 font-semibold shadow-sm hover:bg-muted"
              >
                <Link href="/components">Component Catalog</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
