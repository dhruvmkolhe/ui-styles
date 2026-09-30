import React from "react";
import type { ComponentDef, Mode, StyleSlug } from "@/lib/styles/types";
import {
  CollapsiblePreview,
  DividerPreview,
  ContainerPreview,
  GridPreview,
  StackPreview,
  SplitPanePreview,
  AspectRatioPreview,
  ScrollAreaPreview,
  ResizablePanelPreview,
  MasonryPreview,
} from "./common-layout-previews";
import { getLayoutCodeForStyle } from "./common-layout-code";

export function getCommonLayoutDefs(slug: StyleSlug): ComponentDef[] {
  return [
    {
      id: "collapsible",
      name: "Collapsible",
      description:
        "Expandable disclosure section with smooth height transition, keyboard interaction, and accessible aria-expanded attributes.",
      Preview: ({ mode }: { mode: Mode }) => <CollapsiblePreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getLayoutCodeForStyle(slug, "collapsible", mode),
    },
    {
      id: "divider",
      name: "Divider / Separator",
      description:
        "Content division component supporting horizontal, vertical, labeled section headers, and decorative screen-reader modes.",
      Preview: ({ mode }: { mode: Mode }) => <DividerPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getLayoutCodeForStyle(slug, "divider", mode),
    },
    {
      id: "container",
      name: "Container",
      description:
        "Responsive centered layout wrapper providing standardized max-width constraints and horizontal padding presets across viewports.",
      Preview: ({ mode }: { mode: Mode }) => <ContainerPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getLayoutCodeForStyle(slug, "container", mode),
    },
    {
      id: "grid",
      name: "Grid",
      description:
        "CSS Grid-based layout primitive supporting configurable column counts, responsive breakpoints, gap tokens, and auto-fit repeat.",
      Preview: ({ mode }: { mode: Mode }) => <GridPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getLayoutCodeForStyle(slug, "grid", mode),
    },
    {
      id: "stack",
      name: "Stack",
      description:
        "Flexbox linear layout primitive for arranging elements horizontally or vertically with spacing, wrapping, alignment, and dividers.",
      Preview: ({ mode }: { mode: Mode }) => <StackPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getLayoutCodeForStyle(slug, "stack", mode),
    },
    {
      id: "split-pane",
      name: "Split Pane",
      description:
        "Functional dual-panel layout with draggable separator handle, keyboard resizing, pointer capture, and min/max constraints.",
      Preview: ({ mode }: { mode: Mode }) => <SplitPanePreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getLayoutCodeForStyle(slug, "split-pane", mode),
    },
    {
      id: "aspect-ratio",
      name: "Aspect Ratio",
      description:
        "Container maintaining strict visual proportions (16:9, 4:3, 1:1, 21:9) using native CSS aspect-ratio with overflow containment.",
      Preview: ({ mode }: { mode: Mode }) => <AspectRatioPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getLayoutCodeForStyle(slug, "aspect-ratio", mode),
    },
    {
      id: "scroll-area",
      name: "Scroll Area",
      description:
        "Keyboard-accessible scrollable viewport with custom scrollbar styling, directional overflow constraints, and smooth momentum scrolling.",
      Preview: ({ mode }: { mode: Mode }) => <ScrollAreaPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getLayoutCodeForStyle(slug, "scroll-area", mode),
    },
    {
      id: "resizable-panel",
      name: "Resizable Panel",
      description:
        "Multi-panel resizing system with drag handles, touch event support, minimum/maximum size thresholds, and keyboard controls.",
      Preview: ({ mode }: { mode: Mode }) => <ResizablePanelPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getLayoutCodeForStyle(slug, "resizable-panel", mode),
    },
    {
      id: "masonry",
      name: "Masonry",
      description:
        "Responsive multi-column waterfall grid placing variable-height cards with zero vertical gaps or layout shift.",
      Preview: ({ mode }: { mode: Mode }) => <MasonryPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getLayoutCodeForStyle(slug, "masonry", mode),
    },
  ];
}
