/**
 * Privacy-friendly analytics (audit items #37–#39).
 *
 * Uses Plausible (no cookies, GDPR-friendly) so no consent banner is needed
 * for this static, account-free gallery.
 *
 * TODO(analytics): to activate tracking:
 *   1. Create a site at https://plausible.io (or self-host) and note the domain.
 *   2. Add to `.env.local` (never commit real values):
  *        NEXT_PUBLIC_PLAUSIBLE_DOMAIN=chameleon-ui.dev
  *        NEXT_PUBLIC_SITE_URL=https://chameleon-ui.dev
 *   3. Rebuild. Until the env var is set this component renders nothing.
 *
 * What gets tracked once active:
 *   - Pageviews automatically, INCLUDING the custom 404 page
 *     (`src/app/not-found.tsx`) — filter 404s in Plausible via the page URL.
 *   - Key CTA / copy-code clicks via `data-track` attributes, captured by the
 *     delegated listener below (no per-button wiring needed). Just add
 *     `data-track="event-name"` to any clickable element.
 *     Current instrumented elements: homepage hero CTAs (`src/app/page.tsx`
 *     via `Hero`), gallery copy buttons (`style-gallery.tsx`, `code-block.tsx`).
 */

"use client";

import Script from "next/script";
import { useEffect } from "react";

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

export function trackEvent(event: string, props?: Record<string, string>) {
  if (typeof window !== "undefined" && window.plausible) {
    window.plausible(event, props ? { props } : undefined);
  }
}

function TrackClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest?.("[data-track]");
      if (!el) return;
      const event = el.getAttribute("data-track");
      if (event) trackEvent(event);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}

export function Analytics() {
  if (!PLAUSIBLE_DOMAIN) return null;
  return (
    <>
      <Script
        data-domain={PLAUSIBLE_DOMAIN}
        src="https://plausible.io/js/script.js"
        strategy="afterInteractive"
      />
      <TrackClicks />
    </>
  );
}
