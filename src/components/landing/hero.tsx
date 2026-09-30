"use client";

import Link from "next/link";
import { ArrowRight, Code2, Layers, Palette, Sparkles, SquareTerminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "25", label: "Design Aesthetics", icon: Palette },
  { value: "15", label: "Components Per Style", icon: SquareTerminal },
  { value: "375+", label: "Copy-Ready Snippets", icon: Code2 },
  { value: "100%", label: "Free & Open Source", icon: Sparkles },
];

export function Hero() {
  return (
    <section className="relative border-b border-border/80 bg-background/50 py-16 sm:py-24">
      <div className="container flex flex-col items-center text-center">
        {/* Chakra style announcement badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/25 bg-teal-50 px-3.5 py-1 text-xs font-semibold text-teal-700 dark:bg-teal-950/40 dark:text-teal-300">
          <span className="flex h-2 w-2 rounded-full bg-teal-500" />
          <span>Open Source UI Component Hub</span>
          <span className="text-muted-foreground/60">·</span>
          <span className="font-normal text-muted-foreground">375+ Components</span>
        </div>

        {/* Chakra clean bold title */}
        <h1 className="mt-6 max-w-4xl text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl sm:leading-[1.12]">
          Every UI Style.{" "}
          <span className="text-teal-600 dark:text-teal-400">Authentically Crafted.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg sm:leading-relaxed">
          A curated collection of production-ready components crafted across 25
          authentic aesthetics — from Japandi and Glassmorphism to Neobrutalism
          and Minimalist. Copy clean HTML and Tailwind CSS snippets with zero setup.
        </p>

        {/* Chakra Button Group */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="rounded-md bg-teal-600 px-6 font-semibold text-white shadow-sm hover:bg-teal-700 active:bg-teal-800">
            <Link href="/explore">
              Explore Styles
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-md border-border bg-card px-6 font-semibold shadow-sm hover:bg-muted"
          >
            <Link href="/components">
              <SquareTerminal className="h-4 w-4 mr-2 text-teal-600 dark:text-teal-400" />
              Component Catalog
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="ghost"
            className="rounded-md px-4 font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Link href="/component-vault">
              <Layers className="h-4 w-4 mr-2" />
              Component Vault
            </Link>
          </Button>
        </div>

        {/* Chakra Stat Cards */}
        <div className="mt-14 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-border bg-card p-4 text-left shadow-sm transition-all hover:border-teal-500/50 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {s.value}
                </p>
                <s.icon className="h-4 w-4 text-teal-600 dark:text-teal-400" />
              </div>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
