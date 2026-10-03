"use client"

import React from "react"
import type { Mode, StyleSlug } from "@/lib/styles/types"
import { KeyboardShortcutEditor } from "@/components/ui/keyboard-shortcut-editor"
import { ThemeTokenDiff } from "@/components/ui/theme-token-diff"
import { RtlLayoutPreview } from "@/components/ui/rtl-layout-preview"
import { LocalizationPreview } from "@/components/ui/localization-preview"
import { AnimationTimelineEditor } from "@/components/ui/animation-timeline-editor"
import { ComponentUsageAnalytics } from "@/components/ui/component-usage-analytics"

interface PreviewProps {
  slug: StyleSlug
  mode: Mode
}

export function KeyboardShortcutEditorPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <KeyboardShortcutEditor />
    </div>
  )
}

export function ThemeTokenDiffPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <ThemeTokenDiff />
    </div>
  )
}

export function RtlLayoutPreviewPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <RtlLayoutPreview />
    </div>
  )
}

export function LocalizationPreviewPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <LocalizationPreview />
    </div>
  )
}

export function AnimationTimelineEditorPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <AnimationTimelineEditor />
    </div>
  )
}

export function ComponentUsageAnalyticsPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <ComponentUsageAnalytics />
    </div>
  )
}
