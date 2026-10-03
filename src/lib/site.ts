/**
 * Central site configuration for SEO, metadata, sitemap, robots and JSON-LD.
 *
 * TODO(domain): Replace `SITE_URL` with your production domain
  * (e.g. "https://chameleon-ui.dev") before deploying, then:
 *   1. Point DNS to your host (Vercel / Netlify / Firebase Hosting —
 *      no deployment config is committed yet, see audit item #1).
 *   2. Set `NEXT_PUBLIC_SITE_URL` to the same value so build-time
 *      metadata, sitemap.xml, robots.txt and llms.txt use the real URL.
 *   3. Re-run `npm run build` so all absolute URLs regenerate.
 *
 * TODO(social): Set `SOCIAL_TWITTER_HANDLE` to your X/Twitter handle
  * (e.g. "@chameleonui") once created, for accurate `twitter:site` tags.
 */

// TODO(domain): replace the placeholder below with your production domain.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://chameleon-ui.example.com";

export const SITE_NAME = "Chameleon UI";

export const SITE_TAGLINE = "Every UI Style. One Hub.";

// TODO(social): replace with your real handle once created.
export const SOCIAL_TWITTER_HANDLE = "@chameleonui";

// TODO(search-console): after adding the property in Google Search Console,
// put the verification token here and reference it from `layout.tsx`
// metadata as `verification: { google: SITE_VERIFICATION_GOOGLE }`.
// export const SITE_VERIFICATION_GOOGLE = "your-token";

export const SITE_DESCRIPTION =
  "Free open-source gallery of 25 authentic UI aesthetics — 375+ copy-ready HTML + Tailwind components with light and dark modes.";

export const SITE_KEYWORDS = [
  "UI components",
  "Tailwind CSS",
  "design system",
  "UI gallery",
  "Japandi",
  "Glassmorphism",
  "Brutalist",
  "Minimalist",
  "Neomorphism",
  "copy paste UI",
  "free UI kit",
];

export const REPO_URL = "https://github.com/dhruvmkolhe/ui-styles";

/** Absolute URL helper for metadata, sitemap, robots and JSON-LD. */
export function siteUrl(path = "/"): string {
  return `${SITE_URL.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}
