import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MoonStar, Palette, Rocket, SquareTerminal } from "lucide-react";
import { PageTransition } from "@/components/shell/page-transition";
import { Hero } from "@/components/landing/hero";
import { Faq } from "@/components/landing/faq";
import { Reveal } from "@/components/motion/reveal";
import { StyleCard } from "@/components/styles/style-card";
import { STYLE_LIST } from "@/lib/styles/registry";
import { Button } from "@/components/ui/button";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, siteUrl } from "@/lib/site";
import { FAQ_ITEMS } from "@/lib/faq";

export const metadata: Metadata = {
  title: {
    absolute: `${SITE_NAME} — ${SITE_TAGLINE}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
};

// SoftwareApplication entity: Chameleon UI is a free tool, not an article or
// business, so this (plus the site-wide WebSite entity in `layout.tsx`) is
// the correct schema pick. No Article/Person/LocalBusiness schema applies.
// FAQPage below mirrors the visible <Faq/> section content verbatim.
const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  url: siteUrl("/"),
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: SITE_DESCRIPTION,
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />

      {/* ---------- style preview grid ---------- */}
      <section className="container py-20 sm:py-24">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/25 bg-teal-50 px-3.5 py-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-teal-700 dark:bg-teal-950/40 dark:text-teal-300">
            Aesthetic Directory
          </span>
          <h2 className="mt-5 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            25 Design Languages. Rendered Live.
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
            Every card below is rendered live in its authentic design language.
            Click through for the complete 15-component gallery with light and dark mode toggles.
          </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {STYLE_LIST.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 4) * 0.06} className="h-full">
              <StyleCard meta={s} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- feature strip ---------- */}
      <section className="container pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 4) * 0.06} className="h-full">
            <div
              className="h-full rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-teal-500/40"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-teal-500/20 bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-bold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.text}
              </p>
            </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <Reveal amount={0.1}>
        <Faq />
      </Reveal>

      {/* ---------- final CTA ---------- */}
      <section className="container pb-24">
        <Reveal variant="scale-in">
        <div className="rounded-2xl border border-border bg-card px-8 py-16 text-center shadow-sm sm:px-16">
          <div className="mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/25 bg-teal-50 px-3.5 py-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-teal-700 dark:bg-teal-950/40 dark:text-teal-300">
              Open Source
            </span>
            <h2 className="mt-5 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Ready to ship clean, authentic interfaces?
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
              Stop reinventing the wheel with generic templates. Pick an aesthetic,
              copy the Tailwind CSS code, and build something memorable today.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="h-12 rounded-lg bg-teal-600 px-8 text-base font-semibold text-white shadow-sm hover:bg-teal-700 active:bg-teal-800">
                <Link href="/explore">
                  Explore 25 Styles
                  <ArrowRight className="h-4.5 w-4.5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-lg border-border bg-card px-8 text-base font-semibold shadow-sm hover:bg-muted"
              >
                <Link href="/components">Component Catalog</Link>
              </Button>
            </div>
          </div>
        </div>
        </Reveal>
      </section>
    </PageTransition>
  );
}
