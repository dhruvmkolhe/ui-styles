import React from "react"
import type { ComponentDef, Mode, StyleSlug } from "@/lib/styles/types"
import {
  DesignTokenEditorPreview,
  ResponsivePreviewSwitcherPreview,
  AccessibilityAuditPanelPreview,
  ContrastPairTesterPreview,
  VisualRegressionComparatorPreview,
  LiveComponentPlaygroundPreview,
  ComponentDependencyGraphPreview,
  StateMachineVisualizerPreview,
  MockApiResponseGeneratorPreview,
  FormValidationPlaygroundPreview,
} from "./common-design-system-a11y-previews"
import { getDesignSystemA11yCodeForStyle } from "./common-design-system-a11y-code"

export function getCommonDesignSystemA11yDefs(slug: StyleSlug): ComponentDef[] {
  return [
    {
      id: "design-token-editor",
      name: "Design Token Editor",
      description: "Edit colors, typography, spacing, and corner radii safely in a scoped sandbox with CSS export.",
      Preview: ({ mode }: { mode: Mode }) => <DesignTokenEditorPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getDesignSystemA11yCodeForStyle(slug, "design-token-editor", mode),
    },
    {
      id: "responsive-preview-switcher",
      name: "Responsive Preview Switcher",
      description: "Preview components across mobile, tablet, and desktop viewports with device frames and orientation toggles.",
      Preview: ({ mode }: { mode: Mode }) => <ResponsivePreviewSwitcherPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getDesignSystemA11yCodeForStyle(slug, "responsive-preview-switcher", mode),
    },
    {
      id: "accessibility-audit-panel",
      name: "Accessibility Audit Panel",
      description: "Automated WCAG 2.1 rule checks and structured criteria for manual screen-reader testing.",
      Preview: ({ mode }: { mode: Mode }) => <AccessibilityAuditPanelPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getDesignSystemA11yCodeForStyle(slug, "accessibility-audit-panel", mode),
    },
    {
      id: "contrast-pair-tester",
      name: "Contrast Pair Tester",
      description: "Compare foreground and background colors with exact WCAG 2.1 relative luminance and compliance scoring.",
      Preview: ({ mode }: { mode: Mode }) => <ContrastPairTesterPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getDesignSystemA11yCodeForStyle(slug, "contrast-pair-tester", mode),
    },
    {
      id: "visual-regression-comparator",
      name: "Visual Regression Comparator",
      description: "Compare before-and-after screenshots with a draggable reveal slider, side-by-side mode, and onion-skin.",
      Preview: ({ mode }: { mode: Mode }) => <VisualRegressionComparatorPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getDesignSystemA11yCodeForStyle(slug, "visual-regression-comparator", mode),
    },
    {
      id: "live-component-playground",
      name: "Live Component Playground",
      description: "Expose supported component props, themes, and sizes safely without arbitrary code execution.",
      Preview: ({ mode }: { mode: Mode }) => <LiveComponentPlaygroundPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getDesignSystemA11yCodeForStyle(slug, "live-component-playground", mode),
    },
    {
      id: "component-dependency-graph",
      name: "Component Dependency Graph",
      description: "Visualize relationships between tokens, primitives, composites, and high-level features.",
      Preview: ({ mode }: { mode: Mode }) => <ComponentDependencyGraphPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getDesignSystemA11yCodeForStyle(slug, "component-dependency-graph", mode),
    },
    {
      id: "state-machine-visualizer",
      name: "State Machine Visualizer",
      description: "Finite state machine diagram with active node highlighting, event triggers, and transition log.",
      Preview: ({ mode }: { mode: Mode }) => <StateMachineVisualizerPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getDesignSystemA11yCodeForStyle(slug, "state-machine-visualizer", mode),
    },
    {
      id: "mock-api-response-generator",
      name: "Mock API Response Generator",
      description: "Produce configurable sample API responses with realistic status codes, headers, and bodies.",
      Preview: ({ mode }: { mode: Mode }) => <MockApiResponseGeneratorPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getDesignSystemA11yCodeForStyle(slug, "mock-api-response-generator", mode),
    },
    {
      id: "form-validation-playground",
      name: "Form Validation Playground",
      description: "Test and inspect regex, password complexity, boundary clamping, and async validation rules in real-time.",
      Preview: ({ mode }: { mode: Mode }) => <FormValidationPlaygroundPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getDesignSystemA11yCodeForStyle(slug, "form-validation-playground", mode),
    },
  ]
}
