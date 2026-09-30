"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, Moon, Sun, TerminalSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  ComponentDef,
  Mode,
  StyleBundle,
  StyleMeta,
  StyleSlug,
} from "@/lib/styles/types";
import { copyCode } from "@/lib/copy";
import { CodeBlock } from "@/components/gallery/code-block";
import { GLASSMORPHISM_BUNDLE } from "@/components/styles/glassmorphism";
import { JAPANDI_BUNDLE } from "@/components/styles/japandi";
import { BRUTALIST_BUNDLE } from "@/components/styles/brutalist";
import { MINIMALIST_BUNDLE } from "@/components/styles/minimalist";
import { NEOMORPHISM_BUNDLE } from "@/components/styles/neomorphism";
import { RETRO_Y2K_BUNDLE } from "@/components/styles/retro-y2k";
import { DARK_TECH_BUNDLE } from "@/components/styles/dark-tech";
import { BENTO_GRID_BUNDLE } from "@/components/styles/bento-grid";
import { NEOBRUTALIST_BUNDLE } from "@/components/styles/neobrutalist";
import { SWISS_BUNDLE } from "@/components/styles/swiss";
import { EDITORIAL_BUNDLE } from "@/components/styles/editorial";
import { RETRO_FUTURISTIC_BUNDLE } from "@/components/styles/retro-futuristic";
import { BAUHAUS_BUNDLE } from "@/components/styles/bauhaus";
import { ART_DECO_BUNDLE } from "@/components/styles/art-deco";
import { MATERIAL_BUNDLE } from "@/components/styles/material";
import { MONOCHROMATIC_BUNDLE } from "@/components/styles/monochromatic";
import { SCANDINAVIAN_BUNDLE } from "@/components/styles/scandinavian";
import { MODERNIST_BUNDLE } from "@/components/styles/modernist";
import { NEO_GEO_BUNDLE } from "@/components/styles/neo-geo";
import { ORGANIC_BUNDLE } from "@/components/styles/organic";
import { LUXURY_MINIMAL_BUNDLE } from "@/components/styles/luxury-minimal";
import { GRADIENT_MODERN_BUNDLE } from "@/components/styles/gradient-modern";
import { KINETIC_BUNDLE } from "@/components/styles/kinetic";
import { TYPOGRAPHY_FIRST_BUNDLE } from "@/components/styles/typography-first";
import { METROPOLITAN_BUNDLE } from "@/components/styles/metropolitan";
import { getCommonFormDefs } from "@/components/styles/common-form-defs";
import { getCommonFeedbackDefs } from "@/components/styles/common-feedback-defs";
import { getCommonNavigationDefs } from "@/components/styles/common-navigation-defs";
import { Button } from "@/components/ui/button";

const BUNDLES: Partial<Record<StyleSlug, StyleBundle>> = {
  glassmorphism: GLASSMORPHISM_BUNDLE,
  japandi: JAPANDI_BUNDLE,
  brutalist: BRUTALIST_BUNDLE,
  minimalist: MINIMALIST_BUNDLE,
  neomorphism: NEOMORPHISM_BUNDLE,
  "retro-y2k": RETRO_Y2K_BUNDLE,
  "dark-tech": DARK_TECH_BUNDLE,
  "bento-grid": BENTO_GRID_BUNDLE,
  neobrutalist: NEOBRUTALIST_BUNDLE,
  swiss: SWISS_BUNDLE,
  editorial: EDITORIAL_BUNDLE,
  "retro-futuristic": RETRO_FUTURISTIC_BUNDLE,
  bauhaus: BAUHAUS_BUNDLE,
  "art-deco": ART_DECO_BUNDLE,
  material: MATERIAL_BUNDLE,
  monochromatic: MONOCHROMATIC_BUNDLE,
  scandinavian: SCANDINAVIAN_BUNDLE,
  modernist: MODERNIST_BUNDLE,
  "neo-geo": NEO_GEO_BUNDLE,
  organic: ORGANIC_BUNDLE,
  "luxury-minimal": LUXURY_MINIMAL_BUNDLE,
  "gradient-modern": GRADIENT_MODERN_BUNDLE,
  kinetic: KINETIC_BUNDLE,
  "typography-first": TYPOGRAPHY_FIRST_BUNDLE,
  metropolitan: METROPOLITAN_BUNDLE,
};



/* ------------------------------------------------------------------ */

function GallerySection({
  def,
  index,
  bundle,
  styleName,
  mode,
  isOpen,
  onToggleCode,
}: {
  def: ComponentDef;
  index: number;
  bundle: StyleBundle;
  styleName: string;
  mode: Mode;
  isOpen: boolean;
  onToggleCode: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const code = useMemo(() => def.code(mode), [def, mode]);
  const Preview = def.Preview;
  const Decor = bundle.Decor;

  const handleCopy = async () => {
    const ok = await copyCode(code, `${styleName} · ${def.name}`);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id={def.id} className="scroll-mt-40">
      {/* header */}
      <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-muted-foreground/70">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-lg font-semibold tracking-tight">{def.name}</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCode}
            className="text-muted-foreground hover:text-foreground"
          >
            <TerminalSquare className="h-3.5 w-3.5" />
            {isOpen ? "Hide code" : "View code"}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={handleCopy}
            className={cn(
              "transition-all",
              copied && "bg-emerald-500 text-white hover:bg-emerald-500"
            )}
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied!" : "Copy Code"}
          </Button>
        </div>
      </div>
      <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
        {def.description}
      </p>

      {/* preview stage */}
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-border",
          bundle.stage(mode)
        )}
      >
        {Decor && <Decor mode={mode} />}
        <div
          className={cn(
            "relative min-h-[180px] p-5 transition-colors duration-300 sm:p-10",
            bundle.text(mode)
          )}
        >
          <Preview mode={mode} />
        </div>
      </div>

      {/* code panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden"
          >
            <CodeBlock
              code={code}
              filename={`${def.id}.html`}
              label={`${styleName} · ${def.name}`}
              className="mt-4"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------ */

import { ComingSoon } from "@/components/shell/coming-soon";

export function StyleGallery({
  slug,
  meta,
}: {
  slug: StyleSlug;
  meta: StyleMeta;
}) {
  const baseBundle = BUNDLES[slug];
  const bundle = useMemo(() => {
    if (!baseBundle) return undefined;
    const formDefs = getCommonFormDefs(slug);
    const feedbackDefs = getCommonFeedbackDefs(slug);
    const navigationDefs = getCommonNavigationDefs(slug);
    return {
      ...baseBundle,
      defs: [...baseBundle.defs, ...formDefs, ...feedbackDefs, ...navigationDefs],
    };
  }, [baseBundle, slug]);

  const [mode, setMode] = useState<Mode>(meta.defaultMode);
  const [openCode, setOpenCode] = useState<Record<string, boolean>>({});

  if (!bundle) return <ComingSoon meta={meta} />;

  const toggleCode = (id: string) =>
    setOpenCode((prev) => ({ ...prev, [id]: !prev[id] }));

  const modeBtn = (m: Mode) =>
    cn(
      "relative inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
      mode === m ? "text-foreground" : "text-muted-foreground hover:text-foreground"
    );

  return (
    <div>
      {/* ---- sticky toolbar: light/dark preview toggle ---- */}
      <div className="sticky top-16 z-40 -mx-4 mb-10 border-b border-border/70 bg-background/95 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
        <div className="container flex items-center justify-between gap-4 !px-0">
          <p className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
            <TerminalSquare className="h-3.5 w-3.5" />
            {bundle.defs.length} components · rendered live · copy-ready HTML + Tailwind
          </p>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-muted-foreground sm:inline">
              Preview mode
            </span>
            <div className="inline-flex items-center rounded-lg border border-border bg-card p-1">
              <button onClick={() => setMode("light")} className={modeBtn("light")}>
                {mode === "light" && (
                  <motion.span
                    layoutId="mode-pill"
                    className="absolute inset-0 rounded-md bg-accent"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Sun className="h-3.5 w-3.5" /> Light
                </span>
              </button>
              <button onClick={() => setMode("dark")} className={modeBtn("dark")}>
                {mode === "dark" && (
                  <motion.span
                    layoutId="mode-pill"
                    className="absolute inset-0 rounded-md bg-accent"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Moon className="h-3.5 w-3.5" /> Dark
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container grid gap-10 !px-0 lg:grid-cols-[210px_1fr] lg:gap-14">
        {/* ---- sidebar nav (desktop) ---- */}
        <aside className="hidden lg:block">
          <nav className="sticky top-36 space-y-0.5">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Components
            </p>
            {bundle.defs.map((d, i) => (
              <a
                key={d.id}
                href={`#${d.id}`}
                className="flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <span className="w-4 font-mono text-[10px] text-muted-foreground/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {d.name}
              </a>
            ))}
          </nav>
        </aside>

        {/* ---- mobile chips ---- */}
        <div className="code-scroll -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:hidden">
          {bundle.defs.map((d) => (
            <a
              key={d.id}
              href={`#${d.id}`}
              className="whitespace-nowrap rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {d.name}
            </a>
          ))}
        </div>

        {/* ---- component sections ---- */}
        <div className="min-w-0 space-y-16 lg:col-start-2 lg:row-start-1">
          {bundle.defs.map((d, i) => (
            <GallerySection
              key={d.id}
              def={d}
              index={i}
              bundle={bundle}
              styleName={meta.name}
              mode={mode}
              isOpen={Boolean(openCode[d.id])}
              onToggleCode={() => toggleCode(d.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
