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
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-500/50 hover:shadow-md",
        full ? "h-80" : "h-60"
      )}
    >
      {/* Full-bleed live preview in the style's own aesthetic */}
      <div className="absolute inset-0">
        <div className="h-full w-full transition-transform duration-300 group-hover:scale-[1.03]">
          <StyleMiniPreview slug={meta.slug} />
        </div>
      </div>

      {/* Bottom scrim with style info */}
      <div className="relative mt-auto bg-gradient-to-t from-black/90 via-black/60 to-transparent px-5 pb-5 pt-12">
        <h3 className="font-bold tracking-tight text-white text-lg">
          {meta.name}
        </h3>
        <p className="mt-0.5 truncate text-sm text-white/70">{meta.tagline}</p>

        {full && (
          <>
            <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-white/60">
              {meta.description}
            </p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {meta.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="rounded border border-white/15 bg-white/10 px-2 py-0.5 text-[11px] font-medium text-white/75 backdrop-blur-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </>
        )}

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs font-medium text-white/60">
            15 components · light &amp; dark
          </span>
          <ArrowUpRight className="h-4.5 w-4.5 text-white/60 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-teal-300" />
        </div>
      </div>
    </Link>
  );
}
