export type ButtonMode = "light" | "dark";
export type ButtonSlug =
  | "corner-border" | "corner-button" | "creepy-button" | "radial-glow-button" | "border-beam"
  | "glow-button" | "marquee-hover" | "payment-transaction" | "magic-card-effect" | "rainbow-button"
  | "social-tooltip-hover-buttons" | "orbit-button" | "galaxy-button" | "interactive-hover-button" | "super-mario";

export const BUTTON_SLUGS: readonly ButtonSlug[] = ["corner-border","corner-button","creepy-button","radial-glow-button","border-beam","glow-button","marquee-hover","payment-transaction","magic-card-effect","rainbow-button","social-tooltip-hover-buttons","orbit-button","galaxy-button","interactive-hover-button","super-mario"] as const;

/** Shared presentation tokens. Preview and copied HTML both consume this object. */
export function buttonKit(mode: ButtonMode) {
  const dark = mode === "dark";
  return {
    canvas: dark ? "bg-[#080a12] text-white" : "bg-slate-50 text-slate-950",
    pane: dark ? "border-white/10 bg-white/[0.04]" : "border-slate-200 bg-white",
    muted: dark ? "text-white/55" : "text-slate-500",
    ink: dark ? "bg-white text-slate-950" : "bg-slate-950 text-white",
    line: dark ? "bg-white/20" : "bg-slate-950/20",
  };
}

export function isButtonSlug(slug: string): slug is ButtonSlug {
  return (BUTTON_SLUGS as readonly string[]).includes(slug);
}
