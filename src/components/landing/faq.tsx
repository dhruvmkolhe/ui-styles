import { MessageCircleQuestion } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/faq";

/**
 * Homepage FAQ. Uses native `<details>`/`<summary>` so questions AND answers
 * are present in the server-rendered HTML with zero JavaScript — crawlers
 * and no-JS users get the full content. Text must stay identical to
 * `FAQ_ITEMS` (it renders from it) to keep the `FAQPage` JSON-LD valid.
 */
export function Faq() {
  return (
    <section aria-labelledby="faq-heading" className="container pb-24">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/25 bg-teal-50 px-3.5 py-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-teal-700 dark:bg-teal-950/40 dark:text-teal-300">
          <MessageCircleQuestion className="h-4 w-4" />
          FAQ
        </span>
        <h2 id="faq-heading" className="mt-5 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Frequently asked questions
        </h2>
      </div>
      <div className="mx-auto mt-10 max-w-3xl space-y-3">
        {FAQ_ITEMS.map((f) => (
          <details
            key={f.question}
            className="group rounded-xl border border-border bg-card px-5 py-4 shadow-xs transition-colors open:border-teal-500/40"
          >
            <summary className="cursor-pointer list-none text-base font-bold text-foreground marker:hidden [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-4">
                {f.question}
                <span className="font-mono text-lg leading-none text-teal-600 transition-transform group-open:rotate-45 dark:text-teal-400">
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {f.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
