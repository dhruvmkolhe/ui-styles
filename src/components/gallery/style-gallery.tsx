"use client";

import { useMemo, useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Maximize2,
  Minimize2,
  Moon,
  Monitor,
  Search,
  Smartphone,
  Sun,
  Tablet,
  TerminalSquare,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  ComponentDef,
  Mode,
  StyleBundle,
  StyleMeta,
  StyleSlug,
} from "@/lib/styles/types";
import { STYLE_LIST } from "@/lib/styles/registry";
import { copyCode } from "@/lib/copy";
import { CodeBlock } from "@/components/gallery/code-block";
import { Button } from "@/components/ui/button";
import { ComingSoon } from "@/components/shell/coming-soon";

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
import { resolveStyleBundleDefs } from "@/lib/styles/common-defs";

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

type ViewportSize = "full" | "desktop" | "tablet" | "mobile";

const VIEWPORT_CONTAINER_WIDTHS: Record<ViewportSize, string> = {
  full: "w-full max-w-6xl",
  desktop: "w-full max-w-4xl",
  tablet: "w-full max-w-2xl",
  mobile: "w-full max-w-sm",
};

function FullScreenPreviewOverlay({
  defs,
  currentIndex,
  bundle,
  styleName,
  initialMode,
  onClose,
  onNavigate,
}: {
  defs: ComponentDef[];
  currentIndex: number;
  bundle: StyleBundle;
  styleName: string;
  initialMode: Mode;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}) {
  const [viewport, setViewport] = useState<ViewportSize>("desktop");
  const [previewMode, setPreviewMode] = useState<Mode>(initialMode);
  const [copied, setCopied] = useState(false);

  const def = defs[currentIndex] || defs[0];
  const Preview = def?.Preview;
  const Decor = bundle.Decor;
  const code = useMemo(() => (def ? def.code(previewMode) : ""), [def, previewMode]);

  const handleCopy = async () => {
    if (!def) return;
    const ok = await copyCode(code, `${styleName} · ${def.name}`);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Keyboard navigation & Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        e.preventDefault();
        onNavigate(currentIndex - 1);
      } else if (e.key === "ArrowRight" && currentIndex < defs.length - 1) {
        e.preventDefault();
        onNavigate(currentIndex + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, defs.length, onClose, onNavigate]);

  // Lock background scroll
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  if (!def || !Preview) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Full screen preview for ${def.name}`}
      className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-md text-foreground transition-all duration-200"
    >
      {/* Top Navbar */}
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 bg-background/80 px-4 py-3 sm:px-6">
        {/* Left: Component Info */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center rounded-md border border-border bg-muted/60 px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {styleName}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-xs text-muted-foreground/70">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <h2 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
              {def.name}
            </h2>
          </div>
        </div>

        {/* Center: Viewport & Mode Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Viewport switchers */}
          <div className="hidden sm:flex items-center rounded-lg border border-border bg-muted/40 p-1">
            <button
              type="button"
              onClick={() => setViewport("mobile")}
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors",
                viewport === "mobile" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
              )}
              title="Mobile width (384px)"
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Mobile</span>
            </button>
            <button
              type="button"
              onClick={() => setViewport("tablet")}
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors",
                viewport === "tablet" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
              )}
              title="Tablet width (672px)"
            >
              <Tablet className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Tablet</span>
            </button>
            <button
              type="button"
              onClick={() => setViewport("desktop")}
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors",
                viewport === "desktop" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
              )}
              title="Desktop width (896px)"
            >
              <Monitor className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => setViewport("full")}
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors",
                viewport === "full" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
              )}
              title="Full width (1152px)"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Full</span>
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center rounded-lg border border-border bg-muted/40 p-1">
            <button
              type="button"
              onClick={() => setPreviewMode("light")}
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors",
                previewMode === "light" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Sun className="h-3.5 w-3.5" /> Light
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode("dark")}
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors",
                previewMode === "dark" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Moon className="h-3.5 w-3.5" /> Dark
            </button>
          </div>
        </div>

        {/* Right: Navigation & Actions */}
        <div className="flex items-center gap-2">
          {/* Prev / Next controls */}
          <div className="flex items-center rounded-lg border border-border bg-muted/30 p-0.5">
            <Button
              variant="ghost"
              size="icon"
              disabled={currentIndex === 0}
              onClick={() => onNavigate(currentIndex - 1)}
              className="h-7 w-7 rounded-md p-0"
              title="Previous component (←)"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="px-2 font-mono text-[11px] text-muted-foreground">
              {currentIndex + 1} / {defs.length}
            </span>
            <Button
              variant="ghost"
              size="icon"
              disabled={currentIndex === defs.length - 1}
              onClick={() => onNavigate(currentIndex + 1)}
              className="h-7 w-7 rounded-md p-0"
              title="Next component (→)"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            data-track="copy-code"
            className={cn("h-8 text-xs", copied && "border-emerald-500 text-emerald-500")}
          >
            {copied ? <Check className="h-3.5 w-3.5 mr-1 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
            {copied ? "Copied!" : "Copy Code"}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 text-xs text-muted-foreground hover:text-foreground"
            title="Close full screen (Esc)"
          >
            <X className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Close</span>
          </Button>
        </div>
      </header>

      {/* Main Canvas Viewport */}
      <div className="relative flex-1 overflow-y-auto p-4 sm:p-8 md:p-12 flex items-center justify-center">
        <div
          data-viewport={viewport}
          className={cn(
            "relative transition-all duration-300 rounded-2xl border border-border/80 shadow-2xl min-h-[380px] flex flex-col items-center justify-center overflow-hidden",
            VIEWPORT_CONTAINER_WIDTHS[viewport],
            previewMode === "dark" ? "dark" : "light",
            bundle.stage(previewMode)
          )}
        >
          {/* Subtle Canvas Dot Grid Background */}
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl opacity-40 dark:opacity-25"
            style={{
              backgroundImage:
                previewMode === "dark"
                  ? "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)"
                  : "radial-gradient(rgba(0, 0, 0, 0.12) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          {Decor && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
              <Decor mode={previewMode} />
            </div>
          )}

          <div
            className={cn(
              "relative w-full flex items-center justify-center transition-colors duration-300 overflow-x-auto max-w-full",
              viewport === "mobile" ? "p-3 sm:p-4" : "p-4 sm:p-8 md:p-12",
              bundle.text(previewMode)
            )}
          >
            <div className="w-full flex items-center justify-center max-w-full">
              <Preview mode={previewMode} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Hint Bar */}
      <footer className="border-t border-border/60 bg-background/80 px-4 py-2 text-center text-[11px] text-muted-foreground flex items-center justify-between sm:px-6">
        <p className="truncate text-left max-w-xl">
          <span className="font-semibold text-foreground">{def.name}:</span> {def.description}
        </p>
        <div className="hidden sm:flex items-center gap-3 font-mono text-[10px] text-muted-foreground/80 shrink-0">
          <span>← / → Switch component</span>
          <span>ESC Close</span>
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */

// Memoized: the parent re-renders on every scroll-spy update while scrolling,
// but a section only needs to re-render when its own props change (mode,
// isOpen, data). Callbacks below are stabilized with useCallback so memo holds.
const GallerySection = memo(function GallerySection({
  def,
  index,
  bundle,
  styleName,
  mode,
  isOpen,
  onToggleCode,
  onFullScreen,
}: {
  def: ComponentDef;
  index: number;
  bundle: StyleBundle;
  styleName: string;
  mode: Mode;
  isOpen: boolean;
  onToggleCode: (id: string) => void;
  onFullScreen: (index: number) => void;
}) {
  const [copied, setCopied] = useState(false);
  const code = useMemo(() => (isOpen ? def.code(mode) : ""), [isOpen, def, mode]);
  const Preview = def.Preview;
  const Decor = bundle.Decor;

  const handleCopy = async () => {
    const textToCopy = code || def.code(mode);
    const ok = await copyCode(textToCopy, `${styleName} · ${def.name}`);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id={def.id} className="scroll-mt-36">
      {/* header */}
      <div className="mb-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-baseline gap-2.5">
          <span className="font-mono text-sm font-semibold text-muted-foreground/70">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h2 className="text-xl font-bold tracking-tight text-foreground">{def.name}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFullScreen(index)}
            className="h-9 px-3 text-xs sm:text-sm text-muted-foreground hover:text-foreground"
            title="Full screen preview"
          >
            <Maximize2 className="h-4 w-4 mr-1.5" />
            Full screen
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleCode(def.id)}
            className="h-9 px-3 text-xs sm:text-sm text-muted-foreground hover:text-foreground"
          >
            <TerminalSquare className="h-4 w-4 mr-1.5" />
            {isOpen ? "Hide code" : "View code"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            data-track="copy-code"
            className={cn(
              "h-9 px-3.5 text-xs sm:text-sm transition-all",
              copied && "border-emerald-500 text-emerald-500"
            )}
          >
            {copied ? <Check className="h-4 w-4 mr-1.5 text-emerald-500" /> : <Copy className="h-4 w-4 mr-1.5" />}
            {copied ? "Copied!" : "Copy Code"}
          </Button>
        </div>
      </div>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        {def.description}
      </p>

      {/* preview stage */}
      <div
        className={cn(
          "group/stage relative rounded-2xl border border-border/80 shadow-xs overflow-hidden",
          mode === "dark" ? "dark" : "light",
          bundle.stage(mode)
        )}
      >
        {/* Subtle Canvas Dot Grid Background */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl opacity-40 dark:opacity-25"
          style={{
            backgroundImage:
              mode === "dark"
                ? "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)"
                : "radial-gradient(rgba(0, 0, 0, 0.12) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        {/* Quick floating full-screen button */}
        <button
          type="button"
          onClick={() => onFullScreen(index)}
          aria-label={`Full screen preview for ${def.name}`}
          className="absolute top-3.5 right-3.5 z-10 inline-flex items-center justify-center h-8 w-8 rounded-lg border border-border/60 bg-background/60 backdrop-blur-xs text-muted-foreground hover:text-foreground hover:bg-background/90 opacity-60 group-hover/stage:opacity-100 transition-all shadow-xs"
          title="Full screen preview"
        >
          <Maximize2 className="h-4 w-4" />
        </button>

        {Decor && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            <Decor mode={mode} />
          </div>
        )}
        <div
          className={cn(
            "relative min-h-[260px] sm:min-h-[300px] p-6 sm:p-10 md:p-14 flex items-center justify-center transition-colors duration-300 overflow-x-auto max-w-full",
            bundle.text(mode)
          )}
        >
          <div className="w-full max-w-4xl flex items-center justify-center max-w-full">
            <Preview mode={mode} />
          </div>
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
});

/* ------------------------------------------------------------------ */

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
    return {
      ...baseBundle,
      defs: resolveStyleBundleDefs(baseBundle.defs, slug),
    };
  }, [baseBundle, slug]);

  const [mode, setMode] = useState<Mode>(meta.defaultMode);
  const [openCode, setOpenCode] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [activeId, setActiveId] = useState<string>(bundle?.defs[0]?.id || "");
  const [fullScreenIndex, setFullScreenIndex] = useState<number | null>(null);

  // Scroll spy tracking active component in viewport with IntersectionObserver
  useEffect(() => {
    if (!bundle?.defs?.length) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length > 0) {
          intersecting.sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top - 160) -
              Math.abs(b.boundingClientRect.top - 160)
          );
          setActiveId(intersecting[0].target.id);
        }
      },
      {
        rootMargin: "-120px 0px -50% 0px",
        threshold: [0, 0.2],
      }
    );

    bundle.defs.forEach((d) => {
      const el = document.getElementById(d.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [bundle?.defs]);

  const filteredDefs = useMemo(() => {
    if (!bundle?.defs) return [];
    if (!searchQuery.trim()) return bundle.defs;
    const q = searchQuery.toLowerCase().trim();
    return bundle.defs.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q) ||
        d.description?.toLowerCase().includes(q)
    );
  }, [bundle?.defs, searchQuery]);

  if (!bundle) return <ComingSoon meta={meta} />;

  // Stable callbacks so memoized sections skip re-renders on scroll-spy updates.
  const toggleCode = useCallback(
    (id: string) => setOpenCode((prev) => ({ ...prev, [id]: !prev[id] })),
    []
  );
  const handleFullScreen = useCallback(
    (index: number) => setFullScreenIndex(index),
    []
  );

  const modeBtn = (m: Mode) =>
    cn(
      "relative inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
      mode === m ? "text-foreground" : "text-muted-foreground hover:text-foreground"
    );

  const activeIndex = bundle.defs.findIndex((d) => d.id === activeId);
  const activeDef = bundle.defs[activeIndex] || bundle.defs[0];
  const activeNumberStr = String(Math.max(1, activeIndex + 1)).padStart(2, "0");

  // Related styles for internal linking: the next 4 aesthetics after the
  // current one (cyclical), so every gallery page links deeper into the hub.
  const relatedStyles = useMemo(() => {
    const start = STYLE_LIST.findIndex((s) => s.slug === slug);
    return Array.from({ length: 4 }, (_, n) => {
      const s = STYLE_LIST[(start + 1 + n + STYLE_LIST.length) % STYLE_LIST.length];
      return s;
    }).filter((s) => s.slug !== slug);
  }, [slug]);

  return (
    <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <div className="flex gap-8 lg:gap-12 items-start">
        {/* ================================================================== */}
        {/* LEFT SIDEBAR: Sticky from top to bottom (Desktop)                   */}
        {/* ================================================================== */}
        <aside className="hidden lg:flex w-72 xl:w-80 shrink-0 flex-col sticky top-20 h-[calc(100vh-5.5rem)] pb-4 pr-6 border-r border-border/40">
          {/* Search Filter Box */}
          <div className="relative mb-3.5">
            <label htmlFor="component-filter-search" className="sr-only">Filter components</label>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 pointer-events-none" />
            <input
              id="component-filter-search"
              name="componentFilter"
              aria-label="Filter components"
              type="text"
              autoComplete="off"
              suppressHydrationWarning
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter components (e.g. Button)"
              className="w-full rounded-lg border border-border/70 bg-card/60 pl-9 pr-8 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="Clear filter"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            )}
          </div>

          {/* Directory Count Header */}
          <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-border/40">
            <span className="text-sm font-semibold text-foreground/90">Component Directory</span>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-muted/60 text-muted-foreground font-medium">
              {filteredDefs.length} items
            </span>
          </div>

          {/* Section Category Header */}
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
              Components
            </span>
            <span className="text-[10px] font-mono text-muted-foreground/60 uppercase">
              {searchQuery ? "FILTERED" : "ALL"}
            </span>
          </div>

          {/* Scrollable Component List */}
          <nav className="flex-1 overflow-y-auto space-y-1 pr-1 scrollbar-thin">
            {filteredDefs.map((d) => {
              const originalIndex = bundle.defs.findIndex((item) => item.id === d.id);
              const isActive = d.id === activeId;

              return (
                <a
                  key={d.id}
                  href={`#${d.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(d.id);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                      setActiveId(d.id);
                    }
                  }}
                  className={cn(
                    "group flex items-center justify-between gap-2.5 rounded-lg px-3 py-2 text-sm transition-all",
                    isActive
                      ? "bg-accent text-accent-foreground font-semibold border border-border/60 shadow-xs"
                      : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={cn(
                        "w-5 font-mono text-xs",
                        isActive ? "text-foreground font-bold" : "text-muted-foreground/60"
                      )}
                    >
                      {String(originalIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate">{d.name}</span>
                  </div>
                </a>
              );
            })}
            {filteredDefs.length === 0 && (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No components match &quot;{searchQuery}&quot;
              </div>
            )}
          </nav>

          {/* Bottom Status Pill: Closest to viewport */}
          <div className="pt-3 border-t border-border/40 mt-auto flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Closest to viewport</span>
            </div>
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/40 uppercase truncate max-w-[130px]">
              {activeNumberStr}. {activeDef?.name || "BUTTON"}
            </span>
          </div>
        </aside>

        {/* ================================================================== */}
        {/* RIGHT COLUMN: Header, Toolbar, & Component Showcase                */}
        {/* ================================================================== */}
        <main className="flex-1 min-w-0 pb-20">
          {/* Header */}
          <div className="pb-8">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm">
                <li>
                  <Link
                    href="/"
                    className="font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
                </li>
                <li>
                  <Link
                    href="/explore"
                    className="font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Explore
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
                </li>
                <li aria-current="page" className="font-semibold text-foreground">
                  {meta.name}
                </li>
              </ol>
            </nav>

            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
                {meta.name}
              </h1>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-3.5 py-1 text-xs sm:text-sm font-semibold text-muted-foreground">
                {bundle.defs.length} Components
              </span>
            </div>

            <p className="mt-2 text-lg sm:text-xl font-semibold text-foreground/90">{meta.tagline}</p>
            <p className="mt-2.5 max-w-3xl text-sm sm:text-base leading-relaxed text-muted-foreground">
              {meta.description}
            </p>

            {/* Vibe tags + Palette */}
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
              <div className="flex flex-wrap gap-2">
                {meta.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border/70 bg-card/60 px-3.5 py-1 text-xs sm:text-sm font-medium text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {meta.palette.map((hex) => (
                  <span key={hex} className="group/pal relative">
                    <span
                      className="block h-6 w-6 rounded-full border border-border/80 shadow-xs"
                      style={{ backgroundColor: hex }}
                      title={hex}
                    />
                    <span className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-popover px-1.5 py-0.5 font-mono text-[10px] text-popover-foreground opacity-0 shadow transition-opacity group-hover/pal:opacity-100">
                      {hex}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Toolbar: Preview mode Light/Dark toggle */}
          <div className="sticky top-16 z-30 -mx-4 mb-10 border-y border-border/70 bg-background px-4 py-3 sm:-mx-6 sm:px-6">
            <div className="flex items-center justify-between gap-4">
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <TerminalSquare className="h-4 w-4 shrink-0" />
                <span>
                  {bundle.defs.length} components · rendered live · copy-ready HTML + Tailwind
                </span>
              </p>
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="hidden text-sm text-muted-foreground sm:inline">
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
                      <Sun className="h-4 w-4" /> Light
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
                      <Moon className="h-4 w-4" /> Dark
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile chips */}
          <div className="code-scroll -mx-2 mb-8 flex gap-2 overflow-x-auto px-2 pb-1 lg:hidden">
            {bundle.defs.map((d) => (
              <a
                key={d.id}
                href={`#${d.id}`}
                className={cn(
                  "whitespace-nowrap rounded-full border px-3 py-1 text-xs transition-colors",
                  d.id === activeId
                    ? "border-primary bg-primary text-primary-foreground font-semibold"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                )}
              >
                {d.name}
              </a>
            ))}
          </div>

          {/* Component Showcase Sections */}
          <div className="min-w-0 space-y-14">
            {bundle.defs.map((d, i) => (
              <GallerySection
                key={d.id}
                def={d}
                index={i}
                bundle={bundle}
                styleName={meta.name}
                mode={mode}
                isOpen={Boolean(openCode[d.id])}
                onToggleCode={toggleCode}
                onFullScreen={handleFullScreen}
              />
            ))}
          </div>

          {/* Related styles: internal link hub at the foot of every gallery */}
          <section aria-labelledby="related-styles-heading" className="mt-20 border-t border-border/60 pt-10">
            <h2 id="related-styles-heading" className="text-2xl font-bold tracking-tight text-foreground">
              Keep exploring
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Liked {meta.name}? Each aesthetic below is its own complete gallery of
              copy-ready components in light and dark modes.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {relatedStyles.map((s) => (
                <Link
                  key={s.slug}
                  href={`/style/${s.slug}`}
                  className="group rounded-xl border border-border bg-card p-5 shadow-xs transition-all hover:border-teal-500/50 hover:shadow-md"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-base font-bold text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400">
                      {s.name}
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {s.tagline}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Full Screen Preview Modal */}
      {fullScreenIndex !== null && (
        <FullScreenPreviewOverlay
          defs={bundle.defs}
          currentIndex={fullScreenIndex}
          bundle={bundle}
          styleName={meta.name}
          initialMode={mode}
          onClose={() => setFullScreenIndex(null)}
          onNavigate={(newIndex) => setFullScreenIndex(newIndex)}
        />
      )}
    </div>
  );
}
