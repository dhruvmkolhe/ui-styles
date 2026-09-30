"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles, Layers, SquareTerminal, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { STYLE_LIST } from "@/lib/styles/registry";
import { COMPONENTS_CATALOG } from "@/lib/components-catalog";
import { cn } from "@/lib/utils";

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  const filteredStyles = React.useMemo(() => {
    if (!query.trim()) return STYLE_LIST.slice(0, 6);
    const q = query.toLowerCase();
    return STYLE_LIST.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 8);
  }, [query]);

  const filteredComponents = React.useMemo(() => {
    if (!query.trim()) return COMPONENTS_CATALOG.slice(0, 6);
    const q = query.toLowerCase();
    return COMPONENTS_CATALOG.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [query]);

  const handleSelect = (href: string) => {
    onOpenChange(false);
    setQuery("");
    router.push(href);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-0 gap-0 overflow-hidden border-border bg-card shadow-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Search UI Hub</DialogTitle>
        </DialogHeader>

        {/* Search input header */}
        <div className="flex items-center border-b border-border px-4 py-3 bg-card">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground mr-3" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 25 styles, 15 components..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground text-foreground"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs text-muted-foreground hover:text-foreground px-1.5 py-0.5 rounded bg-muted font-mono"
            >
              Clear
            </button>
          )}
        </div>

        {/* Results container */}
        <div className="max-h-[380px] overflow-y-auto p-3 space-y-4">
          {/* Styles section */}
          {filteredStyles.length > 0 && (
            <div>
              <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-teal-600 dark:text-teal-400" />
                Styles ({filteredStyles.length})
              </p>
              <div className="space-y-1">
                {filteredStyles.map((s) => (
                  <button
                    key={s.slug}
                    onClick={() => handleSelect(`/style/${s.slug}`)}
                    className="w-full flex items-center justify-between rounded-md px-3 py-2 text-left text-sm hover:bg-muted/70 transition-colors group"
                  >
                    <div>
                      <div className="font-medium text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 flex items-center gap-2">
                        {s.name}
                        {s.status === "live" && (
                          <span className="text-[10px] uppercase font-semibold text-teal-600 dark:text-teal-400 bg-teal-500/10 px-1.5 py-0.2 rounded border border-teal-500/20">
                            Live
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {s.tagline}
                      </p>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 text-muted-foreground transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Components section */}
          {filteredComponents.length > 0 && (
            <div>
              <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <SquareTerminal className="h-3 w-3 text-teal-600 dark:text-teal-400" />
                Components ({filteredComponents.length})
              </p>
              <div className="space-y-1">
                {filteredComponents.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelect(`/components#${c.id}`)}
                    className="w-full flex items-center justify-between rounded-md px-3 py-2 text-left text-sm hover:bg-muted/70 transition-colors group"
                  >
                    <div>
                      <div className="font-medium text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400">
                        {c.name}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {c.description}
                      </p>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 text-muted-foreground transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredStyles.length === 0 && filteredComponents.length === 0 && (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No matching styles or components found for &ldquo;{query}&rdquo;
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border px-4 py-2 bg-muted/40 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Navigate with arrows or click</span>
          <span className="font-mono">ESC to close</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
