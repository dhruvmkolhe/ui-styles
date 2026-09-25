import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { STYLE_LIST } from "@/lib/styles/registry";

const productLinks = [
  { href: "/explore", label: "Explore styles" },
  { href: "/components", label: "Components" },
  { href: "/#pricing", label: "Pricing" },
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
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400">
                <LayoutGrid className="h-4 w-4 text-white" strokeWidth={2.4} />
              </span>
              <span className="text-[15px] font-semibold tracking-tight">
                UI Hub
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Every UI style, one hub. Browse design aesthetics and copy clean,
              ready-to-ship component code.
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
