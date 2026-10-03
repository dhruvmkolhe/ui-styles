import { ImageResponse } from "next/og";
import { STYLE_LIST, getStyleMeta } from "@/lib/styles/registry";

export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

// NOTE: `alt` must be a static export, so per-style images share one
// accurate generic alt describing what every gallery image shows.
export const alt =
  "Chameleon UI style gallery preview — 15 copy-ready components in light and dark modes.";

export function generateStaticParams() {
  return STYLE_LIST.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = getStyleMeta(slug);

  const name = meta?.name ?? "UI Style";
  const tagline = meta?.tagline ?? "Authentically crafted components";
  const bg = meta?.tokens?.bg ?? "#0B0A14";
  const fg = meta?.tokens?.fg ?? "#FFFFFF";
  const accent = meta?.tokens?.accent ?? "#14b8a6";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: bg,
          padding: "80px 90px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 28,
            fontWeight: 700,
            color: accent,
            letterSpacing: 2,
          }}
        >
          {"CHAMELEON UI · FREE & OPEN SOURCE"}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 800,
            lineHeight: 1.05,
            color: fg,
            marginTop: 24,
          }}
        >
          {name}
        </div>
        <div style={{ display: "flex", fontSize: 36, color: fg, opacity: 0.75, marginTop: 12 }}>
          {tagline}
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 36 }}>
          {["15 components", "Light + Dark", "HTML + Tailwind"].map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                fontSize: 26,
                fontWeight: 700,
                color: bg,
                background: accent,
                borderRadius: 999,
                padding: "10px 28px",
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
