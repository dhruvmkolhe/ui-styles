"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Copy, Moon, Search, Sun, X } from "lucide-react";
import { CodeBlock } from "@/components/gallery/code-block";
import { VaultPreview } from "./previews";
import { VAULT_CATEGORIES, VAULT_ITEMS, type VaultItem } from "@/lib/vault/registry";
import { vaultCode } from "@/lib/vault/code";
import { VAULT_MOTION } from "@/lib/vault/effect-tokens";
import { copyCode } from "@/lib/copy";

export function VaultBrowser() {
  const reducedMotion = useReducedMotion();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<VaultItem | null>(null);
  const [mode, setMode] = useState<"dark" | "light">("dark");
  const [copied, setCopied] = useState(false);
  const [code, setCode] = useState("");

  const items = useMemo(
    () =>
      VAULT_ITEMS.filter(
        (i) =>
          (category === "All" || i.category === category) &&
          `${i.name} ${i.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())
      ),
    [category, query]
  );

  useEffect(() => {
    let current = true;
    if (!selected) {
      setCode("");
      return;
    }
    void vaultCode(selected, mode).then((value) => {
      if (current) setCode(value);
    });
    return () => {
      current = false;
    };
  }, [selected, mode]);

  useEffect(() => {
    if (!selected) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  const copy = async () => {
    if (!selected || !code) return;
    if (await copyCode(code, `Component Vault · ${selected.name}`)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div className="container py-14 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <span className="rounded-md border border-teal-500/25 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-700 dark:bg-teal-950/40 dark:text-teal-300">
          {VAULT_ITEMS.length} Interactive Kits
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
          Component <span className="text-teal-600 dark:text-teal-400">Vault</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-sm sm:text-base leading-relaxed">
          Advanced interaction patterns, presented as live React kits with copy-ready Tailwind tokens.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search interactive kits by name, category, or effect..."
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm outline-none shadow-sm transition-colors focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          />
        </label>
        <div className="flex rounded-lg border border-border bg-card p-1">
          <button
            aria-pressed={mode === "light"}
            onClick={() => setMode("light")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${mode === "light" ? "bg-muted text-foreground" : "text-muted-foreground"}`}
          >
            <Sun className="inline h-3.5 w-3.5 mr-1" /> Light
          </button>
          <button
            aria-pressed={mode === "dark"}
            onClick={() => setMode("dark")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${mode === "dark" ? "bg-muted text-foreground" : "text-muted-foreground"}`}
          >
            <Moon className="inline h-3.5 w-3.5 mr-1" /> Dark
          </button>
        </div>
      </div>

      <div className="code-scroll mt-4 flex gap-2 overflow-x-auto pb-2">
        <button
          key="category-all"
          onClick={() => setCategory("All")}
          className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
            category === "All" ? "border-teal-600 bg-teal-600 text-white shadow-sm" : "border border-border bg-card text-muted-foreground hover:border-teal-500/40 hover:text-foreground"
          }`}
        >
          All
        </button>
        {VAULT_CATEGORIES.map((c) => (
          <button
            key={`category-${c}`}
            onClick={() => setCategory(c)}
            className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              category === c ? "border-teal-600 bg-teal-600 text-white shadow-sm" : "border border-border bg-card text-muted-foreground hover:border-teal-500/40 hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="mt-5 text-xs text-muted-foreground border-b border-border pb-3">
        Showing {items.length} of {VAULT_ITEMS.length} interactive kits · Click any card to inspect code and preview
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <motion.button
            layout={!reducedMotion}
            key={`vault-card-${item.slug}`}
            onClick={() => {
              setSelected(item);
              setCopied(false);
            }}
            className="group rounded-lg border border-border bg-card p-5 text-left shadow-sm transition-all hover:border-teal-500/50 hover:shadow-md motion-reduce:transition-none"
            whileHover={reducedMotion ? undefined : { y: -2 }}
            transition={{ duration: VAULT_MOTION.fast, ease: VAULT_MOTION.ease }}
          >
            <div className="flex justify-between items-center">
              <span className="font-mono text-[10px] text-muted-foreground font-semibold">#{String(i + 1).padStart(3, "0")}</span>
              {item.isNew && (
                <span className="rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">
                  New
                </span>
              )}
            </div>
            <h2 className="mt-4 text-sm font-bold text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{item.name}</h2>
            <p className="mt-1 text-xs text-muted-foreground">{item.category}</p>
            <div className="mt-3.5 flex gap-1.5 flex-wrap">
              {item.tags.slice(0, 3).map((t, tIdx) => (
                <span key={`tag-${item.slug}-${t}-${tIdx}`} className="rounded border border-border bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.24, ease: VAULT_MOTION.ease }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelected(null);
            }}
            className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-[#050506]/85 px-3 py-4 backdrop-blur-md sm:px-6 sm:py-8"
          >
            <motion.div
              initial={reducedMotion ? false : { y: 18, scale: 0.985, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reducedMotion ? undefined : { y: 10, scale: 0.99, opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="vault-dialog-title"
              onMouseDown={(event) => event.stopPropagation()}
              className="relative my-auto w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#09090b] p-5 text-zinc-100 shadow-[0_32px_120px_rgba(0,0,0,0.7)] sm:p-8 lg:p-10"
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_50%_0%,rgba(49,151,149,0.08),transparent_68%)]" />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-medium">
                      <span className="text-teal-400">{selected.category.split(" / ")[0]}</span>
                      {selected.category.split(" / ")[1] && (
                        <>
                          <span aria-hidden="true" className="text-zinc-700">/</span>
                          <span className="text-zinc-500">{selected.category.split(" / ")[1]}</span>
                        </>
                      )}
                    </div>
                    <h2 id="vault-dialog-title" className="mt-2 text-2xl font-semibold tracking-tight sm:text-[30px]">
                      {selected.name}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="-mr-2 -mt-2 grid h-10 w-10 shrink-0 place-items-center rounded-full text-zinc-400 transition hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 motion-reduce:transition-none"
                    aria-label="Close component preview"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <motion.div
                  initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reducedMotion ? 0 : 0.08, duration: reducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-7"
                >
                  <VaultPreview item={selected} mode={mode} />
                </motion.div>

                <motion.div
                  initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reducedMotion ? 0 : 0.14, duration: reducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mt-5 flex justify-end">
                    <button
                      onClick={copy}
                      disabled={!code}
                      className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 disabled:cursor-wait disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b] motion-reduce:transition-none"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copied" : "Copy code"}
                    </button>
                  </div>

                  <CodeBlock
                    className="mt-4"
                    code={code}
                    filename={`${selected.slug}.${selected.slug === "corner-border" ? "tsx" : "html"}`}
                    label={`Component Vault · ${selected.name}`}
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
