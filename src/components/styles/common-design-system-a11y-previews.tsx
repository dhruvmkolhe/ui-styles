"use client"

import React from "react"
import type { Mode, StyleSlug } from "@/lib/styles/types"
import { DesignTokenEditor } from "@/components/ui/design-token-editor"
import { ResponsivePreviewSwitcher } from "@/components/ui/responsive-preview-switcher"
import { AccessibilityAuditPanel } from "@/components/ui/accessibility-audit-panel"
import { ContrastPairTester } from "@/components/ui/contrast-pair-tester"
import { VisualRegressionComparator } from "@/components/ui/visual-regression-comparator"
import { LiveComponentPlayground } from "@/components/ui/live-component-playground"
import { ComponentDependencyGraph } from "@/components/ui/component-dependency-graph"
import { StateMachineVisualizer } from "@/components/ui/state-machine-visualizer"
import { MockApiResponseGenerator } from "@/components/ui/mock-api-response-generator"
import { FormValidationPlayground } from "@/components/ui/form-validation-playground"

interface PreviewProps {
  slug: StyleSlug
  mode: Mode
}

export function DesignTokenEditorPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <DesignTokenEditor />
    </div>
  )
}

export function ResponsivePreviewSwitcherPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <ResponsivePreviewSwitcher />
    </div>
  )
}

export function AccessibilityAuditPanelPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <AccessibilityAuditPanel />
    </div>
  )
}

export function ContrastPairTesterPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <ContrastPairTester />
    </div>
  )
}

export function VisualRegressionComparatorPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <VisualRegressionComparator />
    </div>
  )
}

export function LiveComponentPlaygroundPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <LiveComponentPlayground />
    </div>
  )
}

export function ComponentDependencyGraphPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <ComponentDependencyGraph />
    </div>
  )
}

export function StateMachineVisualizerPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <StateMachineVisualizer />
    </div>
  )
}

export function MockApiResponseGeneratorPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <MockApiResponseGenerator />
    </div>
  )
}

export function FormValidationPlaygroundPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <FormValidationPlayground />
    </div>
  )
}
