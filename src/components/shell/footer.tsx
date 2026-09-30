import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { STYLE_LIST } from "@/lib/styles/registry";

const productLinks = [
  { href: "/explore", label: "Explore styles" },
  { href: "/components", label: "Components" },
  { href: "/component-vault", label: "Component Vault" },
];

const resourceLinks = [
  { href: "/style/glassmorphism", label: "Glassmorphism gallery" },
  { href: "/style/japandi", label: "Japandi gallery" },
  { href: "/components", label: "Component catalog" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card/40">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-teal-600 text-white shadow-sm">
                <LayoutGrid className="h-4 w-4" strokeWidth={2.4} />
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-bold tracking-tight text-foreground">
                  UI Hub
                </span>
                <span className="rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">
                  Free
                </span>
              </div>
            </Link>
            <p className="mt-3.5 max-w-xs text-xs leading-relaxed text-muted-foreground">
              Every UI style, one hub. Browse 25 authentic design aesthetics and copy clean,
              production-ready component code.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold">Product</h4>
            <ul className="mt-4 space-y-2.5">
              {productLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold">Resources</h4>
            <ul className="mt-4 space-y-2.5">
              {resourceLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Styles */}
          <div>
            <h4 className="text-sm font-semibold">Styles</h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {STYLE_LIST.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/style/${s.slug}`}
                    className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {s.name}
                    {s.status === "soon" && (
                      <span className="rounded-full border border-border px-1.5 py-px text-[9px] uppercase tracking-wide text-muted-foreground/70">
                        soon
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/70 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 UI Hub. Crafted for developers &amp; designers.</p>
          <p>Built with Next.js · Tailwind CSS · shadcn/ui</p>
        </div>
      </div>
    </footer>
  );
}
