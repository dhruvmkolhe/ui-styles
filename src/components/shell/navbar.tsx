"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutGrid, Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shell/theme-toggle";
import { SearchDialog } from "@/components/shell/search-dialog";

const links = [
  { href: "/explore", label: "Explore Styles" },
  { href: "/components", label: "Components" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Subtle shadow once the sticky bar floats over content. Single passive
  // listener, boolean state only — no per-frame updates.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <>
      <header
        className={cn(
          // Solid background (no backdrop-blur): blurred sticky bars force
          // full repaints on every scroll frame. Keep blur for overlays only.
          "sticky top-0 z-50 w-full border-b border-border bg-background transition-shadow duration-300",
          scrolled && "shadow-md shadow-black/5 dark:shadow-black/30"
        )}
      >
        <div className="container flex h-16 sm:h-18 items-center justify-between gap-6">
          {/* Brand + Left-aligned navigation */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-white shadow-sm transition-transform group-hover:scale-105">
                <LayoutGrid className="h-5 w-5" strokeWidth={2.4} />
              </span>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold tracking-tight text-foreground">
                  Chameleon UI
                </span>
                <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                  Free
                </span>
              </div>
            </Link>

            {/* Desktop links - right beside brand */}
            <nav className="hidden items-center gap-1.5 md:flex">
              {links.map((l) => {
                const active = isActive(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={cn(
                      "px-3.5 py-2 text-sm sm:text-base font-medium transition-colors rounded-lg",
                      active
                        ? "text-teal-600 dark:text-teal-400 font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right cluster: Chakra-style Search Bar + GitHub + Theme */}
          <div className="flex items-center gap-3">
            {/* Quick search button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2.5 rounded-lg border border-border bg-muted/40 hover:bg-muted px-3.5 py-2 text-sm text-muted-foreground transition-colors w-56 lg:w-64"
              aria-label="Search styles and components"
            >
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="truncate">Search everything...</span>
              <kbd className="ml-auto rounded border border-border bg-card px-2 py-0.5 text-xs font-mono text-muted-foreground">
                ⌘K
              </kbd>
            </button>

            {/* GitHub icon link */}
            <a
              href="https://github.com/dhruvmkolhe/ui-styles"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="GitHub repository"
            >
              <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            <ThemeToggle />

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-border bg-background md:hidden">
            <nav className="container flex flex-col gap-1 py-4">
              <button
                onClick={() => {
                  setOpen(false);
                  setSearchOpen(true);
                }}
                className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-muted-foreground bg-muted/50 mb-2"
              >
                <Search className="h-4 w-4" />
                <span>Search everything...</span>
              </button>
              {links.map((l) => {
                const active = isActive(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      active
                        ? "text-teal-600 dark:text-teal-400 font-semibold bg-muted/40"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
