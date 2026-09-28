"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Billing = "monthly" | "annual";

interface Tier {
  name: string;
  blurb: string;
  monthly: { price: string; period: string; note: string };
  annual: { price: string; period: string; note: string };
  cta: string;
  features: string[];
  featured?: boolean;
}

const TIERS: Tier[] = [
  {
    name: "Free",
    blurb: "For trying things out",
    monthly: { price: "$0", period: "forever", note: "no credit card needed" },
    annual: { price: "$0", period: "forever", note: "no credit card needed" },
    cta: "Start for free",
    features: [
      "5 styles unlocked",
      "5 components per style",
      "Watermarked code",
      "Community support",
    ],
  },
  {
    name: "Pro",
    blurb: "For shipping every week",
    monthly: { price: "$9", period: "/month", note: "billed monthly · cancel anytime" },
    annual: { price: "$65", period: "/year", note: "≈ $5.42/mo · billed yearly" },
    cta: "Go Pro",
    featured: true,
    features: [
      "All 25 styles unlocked",
      "All 15 components per style",
      "Clean, unwatermarked code",
      "Collections & favorites",
      "Priority support",
    ],
  },
  {
    name: "Lifetime",
    blurb: "Pay once, own it forever",
    monthly: { price: "$49", period: "one-time", note: "never another bill" },
    annual: { price: "$49", period: "one-time", note: "never another bill" },
    cta: "Buy Lifetime",
    features: [
      "Everything in Pro — forever",
      "All future styles & components",
      "Lifetime updates & early access",
      "Priority support",
    ],
  },
];

export function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const annual = billing === "annual";

  const choose = (tier: Tier) => {
    toast.info(`${tier.name} plan selected`, {
      description:
        tier.name === "Free"
          ? "Demo checkout — the Free tier is yours the moment we launch."
          : "Demo checkout — payments go live at launch.",
    });
  };

  return (
    <section id="pricing" className="container scroll-mt-24 py-24">
      {/* heading */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          Pricing
        </span>
        <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          Simple, honest pricing
        </h2>
        <p className="mt-4 text-muted-foreground">
          Start free. Upgrade when you&apos;re shipping. Keep it forever if you want.
        </p>
      </div>

      {/* billing toggle */}
      <div className="mt-10 flex items-center justify-center gap-4">
        <div className="relative inline-flex items-center rounded-xl border border-border bg-card p-1">
          {(["monthly", "annual"] as const).map((b) => (
            <button
              key={b}
              onClick={() => setBilling(b)}
              className={cn(
                "relative rounded-lg px-5 py-2 text-sm font-medium capitalize transition-colors",
                billing === b ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {billing === b && (
                <motion.span
                  layoutId="billing-pill"
                  className="absolute inset-0 rounded-lg bg-accent"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.55 }}
                />
              )}
              <span className="relative z-10">{b}</span>
            </button>
          ))}
        </div>

        <AnimatePresence>
          {annual && (
            <motion.span
              initial={{ opacity: 0, scale: 0.7, x: -8 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.7, x: -8 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
              className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-3 py-1 text-[11px] font-semibold text-white shadow-[0_0_18px_rgba(139,92,246,0.4)]"
            >
              Save 40%
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* tiers */}
      <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
        {TIERS.map((tier) => {
          const shown = annual ? tier.annual : tier.monthly;
          return (
            <div
              key={tier.name}
              className={cn(
                "relative flex h-full flex-col rounded-2xl border bg-card p-7 transition-all duration-300",
                tier.featured
                  ? "border-violet-500/50 shadow-[0_0_50px_-12px_rgba(139,92,246,0.45)] lg:-mt-4 lg:pb-11"
                  : "border-border hover:border-border/80"
              )}
            >
              {tier.featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-3.5 py-1 text-[11px] font-semibold tracking-wide text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-base font-semibold">{tier.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{tier.blurb}</p>
              </div>

              <div className="mt-6 flex items-end gap-2">
                <div className="relative h-14">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={shown.price + shown.period}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className="absolute inset-x-0 flex items-baseline gap-1.5 whitespace-nowrap"
                    >
                      <span className="text-5xl font-bold tracking-tight">{shown.price}</span>
                      <span className="text-sm text-muted-foreground">{shown.period}</span>
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{shown.note}</p>

              <Button
                className={cn(
                  "mt-6 w-full rounded-xl",
                  tier.featured &&
                    "bg-gradient-to-r from-violet-500 to-cyan-500 text-white shadow-[0_0_24px_rgba(139,92,246,0.35)] hover:from-violet-400 hover:to-cyan-400"
                )}
                variant={tier.featured ? "default" : "outline"}
                onClick={() => choose(tier)}
              >
                {tier.cta}
              </Button>

              <ul className="mt-7 space-y-3 border-t border-border pt-6 text-sm">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span
                      className={cn(
                        "mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full",
                        tier.featured
                          ? "bg-violet-500/15 text-violet-400"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      <Check className="h-3 w-3" strokeWidth={2.6} />
                    </span>
                    <span className={cn(tier.featured ? "text-foreground" : "text-muted-foreground")}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <p className="mt-10 text-center text-xs text-muted-foreground">
        14-day money-back guarantee · Cancel anytime · Prices in USD
      </p>
    </section>
  );
}
