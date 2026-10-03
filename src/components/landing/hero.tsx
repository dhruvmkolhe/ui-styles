"use client";

import Link from "next/link";
import { ArrowRight, Code2, Palette, Sparkles, SquareTerminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "25", label: "Design Aesthetics", icon: Palette },
  { value: "15", label: "Components Per Style", icon: SquareTerminal },
  { value: "375+", label: "Copy-Ready Snippets", icon: Code2 },
  { value: "100%", label: "Free & Open Source", icon: Sparkles },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/80 bg-background py-14 sm:py-20 lg:py-24">
      {/* Ambient background: dot grid + aurora orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-60 dark:opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(rgba(20, 184, 166, 0.22) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(ellipse 75% 65% at 50% 35%, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 65% at 50% 35%, black 30%, transparent 75%)",
          }}
        />
        <div className="absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-teal-500/20 blur-[120px] dark:bg-teal-500/15" />
        <div className="absolute top-24 -left-32 h-72 w-72 rounded-full bg-violet-500/15 blur-[100px] dark:bg-violet-500/10" />
        <div className="absolute top-32 -right-32 h-72 w-72 rounded-full bg-cyan-500/15 blur-[100px] dark:bg-cyan-500/10" />
      </div>

      <div className="container relative flex flex-col items-center text-center">
        {/* Announcement badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/25 bg-teal-50 px-4 py-1.5 text-xs sm:text-sm font-medium text-teal-700 shadow-xs dark:bg-teal-950/40 dark:text-teal-300">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-500 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal-500" />
          </span>
          <span>Open Source UI Component Hub</span>
          <span className="text-muted-foreground/60">·</span>
          <span className="font-normal text-muted-foreground">375+ Components</span>
        </div>

        {/* Clean bold title */}
        <h1 className="mt-6 max-w-5xl text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl sm:leading-[1.1]">
          Every UI Style.{" "}
          <span className="text-gradient">Authentically Crafted.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 max-w-3xl text-balance text-base text-muted-foreground sm:text-xl sm:leading-relaxed">
          A curated collection of production-ready components crafted across 25
          authentic aesthetics — from Japandi and Glassmorphism to Neobrutalism
          and Minimalist. Copy clean HTML and Tailwind CSS snippets with zero setup.
        </p>

        {/* Button Group */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="h-12 rounded-lg bg-teal-600 px-8 text-base font-semibold text-white shadow-lg shadow-teal-600/25 hover:bg-teal-700 active:bg-teal-800">
            <Link href="/explore" data-track="cta-explore-styles">
              Explore Styles
              <ArrowRight className="h-4.5 w-4.5 ml-2" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-lg border-border bg-card px-8 text-base font-semibold shadow-sm hover:bg-muted"
          >
            <Link href="/components" data-track="cta-component-catalog">
              <SquareTerminal className="h-4.5 w-4.5 mr-2.5 text-teal-600 dark:text-teal-400" />
              Component Catalog
            </Link>
          </Button>
        </div>

        {/* Stat Strip */}
        <div className="mt-10 w-full max-w-5xl xl:max-w-6xl overflow-hidden rounded-2xl border border-border bg-border/50 shadow-sm">
          <div className="grid grid-cols-2 gap-px sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-3.5 bg-card px-5 py-4 sm:px-6 sm:py-5 transition-colors hover:bg-muted/40"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-teal-500/20 bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400">
                  <s.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-2xl font-extrabold tracking-tight text-foreground">
                    {s.value}
                  </p>
                  <p className="mt-0.5 truncate text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
