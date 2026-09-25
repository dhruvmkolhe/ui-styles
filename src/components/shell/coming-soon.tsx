"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, BellRing, Check } from "lucide-react";
import type { StyleMeta } from "@/lib/styles/types";
import { StyleMiniPreview } from "@/components/styles/mini-previews";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PROMISES = [
  "All 15 components, designed authentically in this style",
  "Light & dark preview modes with one-click copy",
  "Clean HTML + Tailwind — no frameworks required",
];

export function ComingSoon({ meta }: { meta: StyleMeta }) {
  const [email, setEmail] = useState("");

  return (
    <div className="container grid gap-10 py-4 lg:grid-cols-2 lg:items-center lg:gap-16">
      {/* big preview */}
      <div className="relative">
        <div className="overflow-hidden rounded-2xl border border-border shadow-2xl">
          <div className="h-72 sm:h-96">
            <StyleMiniPreview slug={meta.slug} />
          </div>
        </div>
        <span className="absolute -right-2 -top-3 rounded-full border border-amber-500/40 bg-amber-500/15 px-3 py-1 text-[11px] font-semibold text-amber-400 backdrop-blur">
          In the studio
        </span>
      </div>

      {/* copy + notify */}
      <div>
        <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
          The {meta.name} gallery is being hand-crafted
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {meta.description}
        </p>

        <ul className="mt-6 space-y-3 text-sm">
          {PROMISES.map((p) => (
            <li key={p} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-violet-400">
                <Check className="h-3 w-3" strokeWidth={2.6} />
              </span>
              <span className="text-muted-foreground">{p}</span>
            </li>
          ))}
        </ul>

        <form
          className="mt-8 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            if (!email) return;
            toast.success("You're on the list!", {
              description: `We'll email you the day ${meta.name} goes live.`,
            });
            setEmail("");
          }}
        >
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@studio.com"
            className="rounded-xl sm:max-w-xs"
          />
          <Button type="submit" className="rounded-xl">
            <BellRing className="h-4 w-4" />
            Notify me
          </Button>
        </form>

        <div className="mt-10 rounded-2xl border border-border bg-card/50 p-5">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Live right now
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <Link
              href="/style/glassmorphism"
              className="group inline-flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm transition-colors hover:border-violet-500/40"
            >
              Glassmorphism · 15 components
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/style/japandi"
              className="group inline-flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm transition-colors hover:border-violet-500/40"
            >
              Japandi · 15 components
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
