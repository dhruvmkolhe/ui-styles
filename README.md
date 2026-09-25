# UI Hub — Every UI Style. One Hub.

A SaaS web app where developers and designers browse UI design aesthetics and copy
ready-to-use component code in each style.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · shadcn/ui ·
lucide-react · next-themes · framer-motion · sonner

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (fully static / SSG)
```

## Pages

| Route              | What it does                                                                 |
| ------------------ | ---------------------------------------------------------------------------- |
| `/`                | Landing — hero, 8-style preview grid (each card styled in its own aesthetic), animated pricing (Monthly/Annual + "Save 40%" badge, Free / Pro $9/mo or $65/yr / Lifetime $49) |
| `/explore`         | Style Explorer — 8 style cards with live mini-previews, filters (All / Live / Coming soon) |
| `/components`      | Catalog of the 15 components with deep links into each live style gallery    |
| `/style/[slug]`    | Style page — vibe tags, palette, **Light/Dark preview toggle**, all 15 components rendered live with **Copy Code** (HTML + Tailwind, syntax-highlighted, success toast) |

## Styles

- **Live galleries (all 15 components each):** `glassmorphism`, `japandi`
- **Coming soon (styled teaser + notify form):** `brutalist`, `minimalist`,
  `neomorphism`, `retro-y2k`, `dark-tech`, `bento-grid`

Each of the 8 styles also gets an authentic mini-preview used on the landing
and explore grids.

## The 15 components per style

Button · Card · Navbar · Input · Badge/Tag · Modal · Accordion · Tooltip · Tabs ·
Dropdown · Switch · Skeleton · Toast (success + error) · Progress bar (animated,
% label) · Avatar (photo + initials fallback + status dot)

## Architecture

```
src/
├── app/
│   ├── page.tsx                  # landing (hero, style grid, pricing, CTA)
│   ├── explore/page.tsx          # style explorer
│   ├── components/page.tsx       # component catalog
│   └── style/[slug]/page.tsx     # style gallery / coming-soon (SSG for all 8)
├── components/
│   ├── shell/                    # navbar, footer, theme toggle, login dialog, transitions
│   ├── landing/                  # hero, pricing
│   ├── gallery/                  # StyleGallery + CodeBlock (highlight, copy)
│   ├── styles/
│   │   ├── mini-previews.tsx     # 8 authentic mini style previews
│   │   ├── style-card.tsx        # landing/explore card
│   │   ├── icons.tsx             # inline SVG icon set (keeps snippets self-contained)
│   │   ├── glassmorphism/        # kit.ts (class tokens) + previews.tsx + code.ts + index.ts
│   │   └── japandi/              # same structure
│   └── ui/                       # shadcn/ui base components
└── lib/
    ├── styles/registry.ts        # metadata for all 8 styles (single source of truth)
    ├── components-catalog.ts     # the 15 component definitions
    ├── highlight.ts              # dependency-free HTML/Tailwind highlighter
    └── copy.ts                   # clipboard + sonner toast feedback
```

### Key design decision — the "kit" pattern

Each style defines one class-token factory (`glass(mode)` / `japandi(mode)`).
The live React previews **and** the copyable HTML snippets both interpolate the
same tokens, so what you see in the preview is exactly what you copy — and the
Light/Dark toggle flips both consistently.

The UI Hub shell itself stays a clean, dark, modern SaaS (zinc tokens, default
dark via next-themes); the 8 aesthetics only ever appear **inside** preview
canvases and mini-previews.

## Adding a new style

1. Add its metadata to `src/lib/styles/registry.ts` (flip `status` to `"live"`).
2. Create `src/components/styles/<slug>/` with `kit.ts`, `previews.tsx`,
   `code.ts`, `index.ts` exporting a `StyleBundle` of the 15 `ComponentDef`s.
3. Register the bundle in `BUNDLES` inside `src/components/gallery/style-gallery.tsx`.
4. Add a mini-preview in `src/components/styles/mini-previews.tsx`.
