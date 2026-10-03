/**
 * Shared artwork for the generated social share images
 * (`src/app/opengraph-image.tsx` and `src/app/twitter-image.tsx`).
 *
 * Rendered with Satori via `ImageResponse`, so only a subset of CSS is
 * supported: flexbox layout, solid colors, borders, border-radius.
 * (No gradients, shadows or webfonts — system font stack only.)
 */

export const SHARE_IMAGE_SIZE = { width: 1200, height: 630 };

export const SHARE_IMAGE_ALT =
  "Chameleon UI — Every UI Style. One Hub. 25 authentic aesthetics, 375+ free copy-ready components.";

export function ShareImageArt() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "#0B0A14",
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
          color: "#14b8a6",
          letterSpacing: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            borderRadius: 14,
            background: "#0d9488",
            color: "#ffffff",
            fontSize: 32,
            fontWeight: 800,
            marginRight: 18,
          }}
        >
          {"C"}
        </div>
        {"CHAMELEON UI · FREE & OPEN SOURCE"}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 84,
          fontWeight: 800,
          lineHeight: 1.05,
          color: "#ffffff",
          marginTop: 32,
        }}
      >
        Every UI Style.
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 84,
          fontWeight: 800,
          lineHeight: 1.05,
          color: "#2dd4bf",
        }}
      >
        Authentically Crafted.
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 30,
          color: "#a1a1aa",
          marginTop: 28,
        }}
      >
        25 aesthetics · 375+ components · HTML + Tailwind · Light & dark
      </div>
    </div>
  );
}
