import React from "react"
import type { ComponentDef, Mode, StyleSlug } from "@/lib/styles/types"
import {
  TreemapPreview,
  SankeyDiagramPreview,
  NetworkGraphPreview,
  MapMarkerClusterPreview,
  OnboardingTourPreview,
  SpotlightSearchPreview,
  PermissionMatrixPreview,
  AuditLogPreview,
  FeatureFlagManagerPreview,
  VersionHistoryPreview,
} from "./common-visualizations-mapping-previews"
import { getVisualizationsMappingCodeForStyle } from "./common-visualizations-mapping-code"

export function getCommonVisualizationsMappingDefs(slug: StyleSlug): ComponentDef[] {
  return [
    {
      id: "treemap",
      name: "Treemap",
      description: "Visualize hierarchical proportions accurately with nested squarified rectangles, labels, and drill-down.",
      Preview: ({ mode }: { mode: Mode }) => <TreemapPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getVisualizationsMappingCodeForStyle(slug, "treemap", mode),
    },
    {
      id: "sankey-diagram",
      name: "Sankey Diagram",
      description: "Visualize weighted flows between categories with smooth cubic Bézier ribbons and invalid link tolerance.",
      Preview: ({ mode }: { mode: Mode }) => <SankeyDiagramPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getVisualizationsMappingCodeForStyle(slug, "sankey-diagram", mode),
    },
    {
      id: "network-graph",
      name: "Network Graph",
      description: "Display connected entities with interactive draggable nodes, selection, zoom/pan, and node inspector.",
      Preview: ({ mode }: { mode: Mode }) => <NetworkGraphPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getVisualizationsMappingCodeForStyle(slug, "network-graph", mode),
    },
    {
      id: "map-marker-cluster",
      name: "Map Marker / Cluster",
      description: "Group geographic points into proximity clusters across zoom levels with interactive pin details.",
      Preview: ({ mode }: { mode: Mode }) => <MapMarkerClusterPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getVisualizationsMappingCodeForStyle(slug, "map-marker-cluster", mode),
    },
    {
      id: "onboarding-tour",
      name: "Onboarding Tour",
      description: "Step-by-step guided product walkthrough with spotlight targets, keyboard navigation, and completion state.",
      Preview: ({ mode }: { mode: Mode }) => <OnboardingTourPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getVisualizationsMappingCodeForStyle(slug, "onboarding-tour", mode),
    },
    {
      id: "spotlight-search",
      name: "Spotlight Search",
      description: "Global command search palette (⌘K) with category filtering, keyboard navigation, and quick preview.",
      Preview: ({ mode }: { mode: Mode }) => <SpotlightSearchPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getVisualizationsMappingCodeForStyle(slug, "spotlight-search", mode),
    },
    {
      id: "permission-matrix",
      name: "Permission Matrix",
      description: "Configure roles, permissions, and access levels using an interactive RBAC grid with client sandbox declaration.",
      Preview: ({ mode }: { mode: Mode }) => <PermissionMatrixPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getVisualizationsMappingCodeForStyle(slug, "permission-matrix", mode),
    },
    {
      id: "audit-log",
      name: "Audit Log",
      description: "Security and administrative audit trail with actor filtering, status filters, and changed state diff modal.",
      Preview: ({ mode }: { mode: Mode }) => <AuditLogPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getVisualizationsMappingCodeForStyle(slug, "audit-log", mode),
    },
    {
      id: "feature-flag-manager",
      name: "Feature Flag Manager",
      description: "Progressive delivery toggles by environment and audience group with rollout percentage sliders.",
      Preview: ({ mode }: { mode: Mode }) => <FeatureFlagManagerPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getVisualizationsMappingCodeForStyle(slug, "feature-flag-manager", mode),
    },
    {
      id: "version-history",
      name: "Version History",
      description: "Compare revision differences with line diffs and safe functional rollback restoration.",
      Preview: ({ mode }: { mode: Mode }) => <VersionHistoryPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getVisualizationsMappingCodeForStyle(slug, "version-history", mode),
    },
  ]
}
