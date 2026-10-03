"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Reusable scroll-triggered reveal wrappers.
 *
 * - Client-only leaf components: Server Components stay server; wrap them
 *   with `<Reveal>` at usage sites instead of converting whole pages.
 * - `whileInView` + `once: true`: animates the first time an element enters
 *   the viewport, never replays on parent re-renders (e.g. gallery mode
 *   toggles, search filtering keeps per-mount behavior only).
 * - Transform + opacity only (GPU-friendly, no layout dimensions change).
 * - Reduced motion is handled globally via `<MotionConfig reducedMotion="user">`
 *   in `src/components/providers.tsx` — movement is auto-disabled there.
 *
 * For grids, pass an index-capped `delay` (e.g. `(i % 4) * 0.06`) so items
 * stagger without ever introducing long waits.
 */

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export type RevealVariant =
  | "fade-up"
  | "fade-in"
  | "slide-left"
  | "slide-right"
  | "scale-in";

interface RevealProps {
  children: ReactNode;
  /** Entrance preset. Default: "fade-up" (opacity 0→1, y 20→0). */
  variant?: RevealVariant;
  /** Stagger delay in seconds. Keep ≤ 0.2. */
  delay?: number;
  /** Vertical offset in px for "fade-up". Default 20. */
  y?: number;
  /** Horizontal offset in px for slide variants. Default 24. */
  x?: number;
  /** Starting scale for "scale-in". Default 0.98. */
  scale?: number;
  /** Fraction of the element that must be visible before animating. Default 0.2. */
  amount?: number;
  className?: string;
}

function initialFor(
  variant: RevealVariant,
  x: number,
  y: number,
  scale: number
): Record<string, number> {
  switch (variant) {
    case "fade-in":
      return { opacity: 0 };
    case "slide-left":
      return { opacity: 0, x };
    case "slide-right":
      return { opacity: 0, x: -x };
    case "scale-in":
      return { opacity: 0, scale };
    case "fade-up":
    default:
      return { opacity: 0, y };
  }
}

export function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  y = 20,
  x = 24,
  scale = 0.98,
  amount = 0.2,
  className,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={initialFor(variant, x, y, scale)}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.45, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
