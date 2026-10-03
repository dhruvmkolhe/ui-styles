import Link from "next/link";
import { ArrowRight, LayoutGrid, Mail } from "lucide-react";
import { REPO_URL } from "@/lib/site";

const productLinks = [
  { href: "/explore", label: "Explore styles" },
  { href: "/components", label: "Components" },
];

const resourceLinks = [
  { href: "/style/glassmorphism", label: "Glassmorphism gallery" },
  { href: "/style/japandi", label: "Japandi gallery" },
  { href: "/components", label: "Component catalog" },
];

const popularStyles = [
  { href: "/style/glassmorphism", label: "Glassmorphism" },
  { href: "/style/japandi", label: "Japandi" },
  { href: "/style/brutalist", label: "Brutalist" },
  { href: "/style/dark-tech", label: "Dark Tech" },
];

const linkCls =
  "text-sm text-muted-foreground transition-colors hover:text-foreground";

export function Footer() {
  return (
    <footer className="relative border-t border-border/70 bg-card/40">
      {/* Brand gradient hairline */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent"
      />
      <div className="container py-10 sm:py-12">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-teal-600 text-white shadow-sm">
                <LayoutGrid className="h-4 w-4" strokeWidth={2.4} />
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-bold tracking-tight text-foreground">
                  Chameleon UI
                </span>
                <span className="rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">
                  Free
                </span>
              </div>
            </Link>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted-foreground">
              Every UI style, one hub. Browse 25 authentic design aesthetics and copy clean,
              production-ready component code.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <a
                href="mailto:chameleonui@proton.me"
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-xs font-medium text-muted-foreground transition-colors hover:border-teal-500/40 hover:text-foreground"
              >
                <Mail className="h-3.5 w-3.5 shrink-0 text-teal-600 dark:text-teal-400" />
                chameleonui@proton.me
              </a>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chameleon UI on GitHub"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-teal-500/40 hover:text-foreground"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <nav aria-label="Product">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground/80">Product</h2>
            <ul className="mt-3.5 space-y-2.5">
              {productLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-label="Resources">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground/80">Resources</h2>
            <ul className="mt-3.5 space-y-2.5">
              {resourceLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Popular styles */}
          <nav aria-label="Popular styles">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground/80">Popular styles</h2>
            <ul className="mt-3.5 space-y-2.5">
              {popularStyles.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/explore"
                  className="group inline-flex items-center gap-1 text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300"
                >
                  All 25 styles
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-border/70 pt-5 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 Chameleon UI. Crafted for developers &amp; designers.</p>
          <p>Built with Next.js · Tailwind CSS · shadcn/ui</p>
        </div>
      </div>
    </footer>
  );
}
