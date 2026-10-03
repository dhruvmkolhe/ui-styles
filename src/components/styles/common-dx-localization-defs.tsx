import React from "react"
import type { ComponentDef, Mode, StyleSlug } from "@/lib/styles/types"
import {
  KeyboardShortcutEditorPreview,
  ThemeTokenDiffPreview,
  RtlLayoutPreviewPreview,
  LocalizationPreviewPreview,
  AnimationTimelineEditorPreview,
  ComponentUsageAnalyticsPreview,
} from "./common-dx-localization-previews"
import { getDxLocalizationCodeForStyle } from "./common-dx-localization-code"

export function getCommonDxLocalizationDefs(slug: StyleSlug): ComponentDef[] {
  return [
    {
      id: "keyboard-shortcut-editor",
      name: "Keyboard Shortcut Editor",
      description: "Configure key bindings, verify conflict safety, and test keystrokes live.",
      Preview: ({ mode }: { mode: Mode }) => <KeyboardShortcutEditorPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getDxLocalizationCodeForStyle(slug, "keyboard-shortcut-editor", mode),
    },
    {
      id: "theme-token-diff",
      name: "Theme Token Diff",
      description: "Compare two theme configurations and identify added, removed, and modified design tokens.",
      Preview: ({ mode }: { mode: Mode }) => <ThemeTokenDiffPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getDxLocalizationCodeForStyle(slug, "theme-token-diff", mode),
    },
    {
      id: "rtl-layout-preview",
      name: "RTL Layout Preview",
      description: "Preview components in Right-to-Left direction in a safe scoped sandbox without mutating global app state.",
      Preview: ({ mode }: { mode: Mode }) => <RtlLayoutPreviewPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getDxLocalizationCodeForStyle(slug, "rtl-layout-preview", mode),
    },
    {
      id: "localization-preview",
      name: "Localization Preview",
      description: "Preview localized strings, native Intl date/currency formatting, and text expansion stress tests.",
      Preview: ({ mode }: { mode: Mode }) => <LocalizationPreviewPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getDxLocalizationCodeForStyle(slug, "localization-preview", mode),
    },
    {
      id: "animation-timeline-editor",
      name: "Animation Timeline Editor",
      description: "Scrub animation timelines, adjust easing curves, and export CSS keyframe rules.",
      Preview: ({ mode }: { mode: Mode }) => <AnimationTimelineEditorPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getDxLocalizationCodeForStyle(slug, "animation-timeline-editor", mode),
    },
    {
      id: "component-usage-analytics",
      name: "Component Usage Analytics",
      description: "Inspect component adoption counts, dominant variants, and prop distributions with honest telemetry framing.",
      Preview: ({ mode }: { mode: Mode }) => <ComponentUsageAnalyticsPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getDxLocalizationCodeForStyle(slug, "component-usage-analytics", mode),
    },
  ]
}
