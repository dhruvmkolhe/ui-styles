import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StyleMeta } from "@/lib/styles/types";
import { StyleMiniPreview } from "@/components/styles/mini-previews";

export function StyleCard({
  meta,
  variant = "compact",
}: {
  meta: StyleMeta;
  variant?: "compact" | "full";
}) {
  const full = variant === "full";

  return (
    <Link
      href={`/style/${meta.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-[0_12px_40px_-12px_rgba(139,92,246,0.35)]"
    >
      {/* Mini preview rendered in the style's own aesthetic */}
      <div className={cn("overflow-hidden border-b border-border", full ? "h-44" : "h-36")}>
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]">
          <StyleMiniPreview slug={meta.slug} />
        </div>
      </div>

      <div className={cn("flex flex-1 flex-col", full ? "p-5" : "p-4")}>
        <div className="flex items-center justify-between gap-2">
          <h3 className={cn("font-semibold tracking-tight", full ? "text-base" : "text-sm")}>
            {meta.name}
          </h3>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-medium",
              meta.status === "live"
                ? "bg-emerald-500/15 text-emerald-400"
                : "bg-muted text-muted-foreground"
            )}
          >
            {meta.status === "live" ? "● Live" : "Soon"}
          </span>
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">{meta.tagline}</p>

        {full && (
          <>
            <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
              {meta.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {meta.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-muted/50 px-2 py-0.5 text-[10px] text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </>
        )}

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-[11px] text-muted-foreground">
            15 components · light &amp; dark
          </span>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-violet-400" />
        </div>
      </div>
    </Link>
  );
}
