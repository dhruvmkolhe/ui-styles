import Link from "next/link";
import { ArrowRight, MoonStar, Palette, Rocket, SquareTerminal } from "lucide-react";
import { PageTransition } from "@/components/shell/page-transition";
import { Hero } from "@/components/landing/hero";
import { Pricing } from "@/components/landing/pricing";
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
    title: "New styles monthly",
    text: "The hub keeps growing. Lifetime members get every future style on release day.",
  },
];

export default function LandingPage() {
  return (
    <PageTransition>
      <Hero />

      {/* ---------- style preview grid ---------- */}
      <section className="container border-t border-border/60 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            One hub. Eight aesthetics.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every card below is rendered live in its own design language. Click
            through for the full 15-component gallery.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STYLE_LIST.map((s) => (
            <StyleCard key={s.slug} meta={s} />
          ))}
        </div>
      </section>

      {/* ---------- feature strip ---------- */}
      <section className="container pb-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border bg-card/60 p-6 transition-colors hover:border-violet-500/30"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted/60 text-violet-400">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-sm font-semibold">{f.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- pricing ---------- */}
      <div className="border-t border-border/60">
        <Pricing />
      </div>

      {/* ---------- final CTA ---------- */}
      <section className="container pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card/50 px-6 py-16 text-center sm:px-16">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 left-1/2 h-64 w-[560px] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[100px]" />
            <div className="absolute -bottom-32 left-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-[90px]" />
          </div>
          <div className="relative">
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to ship <span className="text-gradient">beautiful UIs</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">
              Stop rebuilding the same components. Pick an aesthetic, copy the
              code, and launch something people remember.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="w-full rounded-xl sm:w-auto sm:px-7">
                <Link href="/explore">
                  Explore Styles
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full rounded-xl border-border sm:w-auto sm:px-7"
              >
                <Link href="/#pricing">View pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
