/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  experimental: {
    // `lucide-react` is already optimized by Next.js defaults (see
    // node_modules/next/dist/docs/.../optimizePackageImports.md), so only
    // `framer-motion` (used by the gallery toolbar, code panels and page
    // transitions) needs listing here. Analyze with:
    //   npx next experimental-analyze
    optimizePackageImports: ["framer-motion"],
  },
};

// TODO(bundle, audit #7): `StyleGallery` statically imports all 25 style
// bundles, so every `/style/[slug]` page ships every style's preview code.
// The correct fix is per-slug splitting, but the bundle objects hold closures
// (`stage`/`text`/`code`) that cannot cross the server→client boundary, so a
// naive `next/dynamic`/`React.lazy` split would push gallery content to
// client-only rendering and hurt SEO. If this becomes a measured problem
// (check the analyzer above), restructure to serializable per-slug page
// components instead of lazy-loading the shared client gallery.

export default nextConfig;
