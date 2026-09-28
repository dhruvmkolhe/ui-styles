"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, SquareTerminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "25", label: "design aesthetics" },
  { value: "15", label: "components per style" },
  { value: "375", label: "copy-ready snippets" },
  { value: "2×", label: "light & dark modes" },
];

const float = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.08, duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] as const },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* backdrop: glow orbs + faint grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px] animate-blob" />
        <div className="absolute -top-24 left-[18%] h-72 w-72 rounded-full bg-cyan-500/15 blur-[100px] animate-blob-slow" />
        <div className="absolute -top-24 right-[18%] h-72 w-72 rounded-full bg-fuchsia-500/10 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.35] dark:opacity-[0.25]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 30%, transparent 75%)",
          }}
        />
      </div>

      <div className="container relative flex flex-col items-center pb-20 pt-20 text-center sm:pt-28">
        <motion.div variants={float} initial="hidden" animate="show" custom={0}>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            25 aesthetics · 375 components · one hub
          </span>
        </motion.div>

        <motion.h1
          variants={float}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-7 max-w-3xl text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl"
        >
          Every UI Style. <span className="text-gradient">One Hub.</span>
        </motion.h1>

        <motion.p
          variants={float}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-6 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Browse 25 design aesthetics. Copy clean code. Ship faster.
        </motion.p>

        <motion.div
          variants={float}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
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
            className="w-full rounded-xl border-border bg-card/50 backdrop-blur sm:w-auto sm:px-7"
          >
            <Link href="/components">
              <SquareTerminal className="h-4 w-4" />
              View Components
            </Link>
          </Button>
        </motion.div>

        {/* stats */}
        <motion.div
          variants={float}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-16 grid w-full max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-card/80 px-4 py-5 backdrop-blur">
              <p className="text-2xl font-semibold tracking-tight">{s.value}</p>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
