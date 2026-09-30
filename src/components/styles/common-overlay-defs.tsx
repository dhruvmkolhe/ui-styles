import React from "react";
import type { ComponentDef, Mode, StyleSlug } from "@/lib/styles/types";
import {
  PopoverPreview,
  ContextMenuPreview,
  HoverCardPreview,
  DrawerPreview,
  CommandPalettePreview,
  DatePickerPreview,
  TimePickerPreview,
  CalendarPreview,
  MegaMenuPreview,
  FloatingActionButtonPreview,
} from "./common-overlay-previews";
import { getOverlayCodeForStyle } from "./common-overlay-code";

export function getCommonOverlayDefs(slug: StyleSlug): ComponentDef[] {
  return [
    {
      id: "popover",
      name: "Popover",
      description:
        "Floating contextual panel anchored to a trigger with collision detection, focus restoration, and outside-click handling.",
      Preview: ({ mode }: { mode: Mode }) => <PopoverPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getOverlayCodeForStyle(slug, "popover", mode),
    },
    {
      id: "context-menu",
      name: "Context Menu",
      description:
        "Pointer-positioned right-click context menu with keyboard shortcuts, boundary checking, and WAI-ARIA menuitem semantics.",
      Preview: ({ mode }: { mode: Mode }) => <ContextMenuPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getOverlayCodeForStyle(slug, "context-menu", mode),
    },
    {
      id: "hover-card",
      name: "Hover Card",
      description:
        "Supplementary preview popover with enter/leave delay throttling, keyboard focus support, and mobile click handling.",
      Preview: ({ mode }: { mode: Mode }) => <HoverCardPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getOverlayCodeForStyle(slug, "hover-card", mode),
    },
    {
      id: "drawer",
      name: "Drawer / Sheet",
      description:
        "Sliding modal panel anchored to any viewport edge (left, right, top, bottom) with focus trap and backdrop blur.",
      Preview: ({ mode }: { mode: Mode }) => <DrawerPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getOverlayCodeForStyle(slug, "drawer", mode),
    },
    {
      id: "command-palette",
      name: "Command Palette",
      description:
        "Quick launcher modal with multi-category filtering, command descriptions, roving keyboard focus, and shortcut triggers.",
      Preview: ({ mode }: { mode: Mode }) => <CommandPalettePreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getOverlayCodeForStyle(slug, "command-palette", mode),
    },
    {
      id: "date-picker",
      name: "Date Picker",
      description:
        "Interactive date input connecting popover calendar grid with quick today selection, constraints, and localized formatting.",
      Preview: ({ mode }: { mode: Mode }) => <DatePickerPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getOverlayCodeForStyle(slug, "date-picker", mode),
    },
    {
      id: "time-picker",
      name: "Time Picker",
      description:
        "Accessible time input with hour, minute, and AM/PM steppers, keyboard interaction, and quick time presets.",
      Preview: ({ mode }: { mode: Mode }) => <TimePickerPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getOverlayCodeForStyle(slug, "time-picker", mode),
    },
    {
      id: "calendar",
      name: "Calendar",
      description:
        "Monthly grid calendar with day states (today, selected, outside, disabled), month navigation, and accessible date labels.",
      Preview: ({ mode }: { mode: Mode }) => <CalendarPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getOverlayCodeForStyle(slug, "calendar", mode),
    },
    {
      id: "mega-menu",
      name: "Mega Menu",
      description:
        "Enterprise-grade multi-column navigation menu with categorized sections, descriptive sub-links, and featured promo banner.",
      Preview: ({ mode }: { mode: Mode }) => <MegaMenuPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getOverlayCodeForStyle(slug, "mega-menu", mode),
    },
    {
      id: "floating-action-button",
      name: "Floating Action Button",
      description:
        "Corner-docked primary action trigger with extended labels, safe-area inset padding, and expandable speed-dial actions.",
      Preview: ({ mode }: { mode: Mode }) => <FloatingActionButtonPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getOverlayCodeForStyle(slug, "floating-action-button", mode),
    },
  ];
}
