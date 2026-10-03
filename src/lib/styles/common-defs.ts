import type { ComponentDef, StyleSlug } from "@/lib/styles/types";
import { getCommonFormDefs } from "@/components/styles/common-form-defs";
import { getCommonFeedbackDefs } from "@/components/styles/common-feedback-defs";
import { getCommonNavigationDefs } from "@/components/styles/common-navigation-defs";
import { getCommonOverlayDefs } from "@/components/styles/common-overlay-defs";
import { getCommonDataDisplayDefs } from "@/components/styles/common-data-display-defs";
import { getCommonLayoutDefs } from "@/components/styles/common-layout-defs";
import { getCommonStatusDefs } from "@/components/styles/common-status-defs";
import { getCommonMediaDefs } from "@/components/styles/common-media-defs";
import { getCommonAdvancedDefs } from "@/components/styles/common-advanced-defs";
import { getCommonActionsDefs } from "@/components/styles/common-actions-defs";
import { getCommonFilesHierarchyDefs } from "@/components/styles/common-files-defs";
import { getCommonSchedulingDefs } from "@/components/styles/common-scheduling-defs";
import { getCommonCollaborationDefs } from "@/components/styles/common-collab-defs";
import { getCommonApiDataDefs } from "@/components/styles/common-api-data-defs";
import { getCommonVisualizationsMappingDefs } from "@/components/styles/common-visualizations-mapping-defs";
import { getCommonDesignSystemA11yDefs } from "@/components/styles/common-design-system-a11y-defs";
import { getCommonDxLocalizationDefs } from "@/components/styles/common-dx-localization-defs";

export type ComponentCategory =
  | "form"
  | "feedback"
  | "navigation"
  | "overlay"
  | "data-display"
  | "layout"
  | "status"
  | "media"
  | "advanced"
  | "actions"
  | "files-hierarchy"
  | "scheduling-workflows"
  | "collaboration-devtools"
  | "api-data-utilities"
  | "visualizations-mapping"
  | "design-system-a11y"
  | "dx-localization";

export interface ComponentCategoryGroup {
  id: ComponentCategory;
  name: string;
  getDefs: (slug: StyleSlug) => ComponentDef[];
}

export const COMPONENT_CATEGORY_GROUPS: readonly ComponentCategoryGroup[] = [
  { id: "form", name: "Forms & Inputs", getDefs: getCommonFormDefs },
  { id: "feedback", name: "Feedback & Alerts", getDefs: getCommonFeedbackDefs },
  { id: "navigation", name: "Navigation", getDefs: getCommonNavigationDefs },
  { id: "overlay", name: "Overlays & Modals", getDefs: getCommonOverlayDefs },
  { id: "data-display", name: "Data Display", getDefs: getCommonDataDisplayDefs },
  { id: "layout", name: "Layout & Containers", getDefs: getCommonLayoutDefs },
  { id: "status", name: "Status & Progress", getDefs: getCommonStatusDefs },
  { id: "media", name: "Media & Assets", getDefs: getCommonMediaDefs },
  { id: "advanced", name: "Advanced & Utilities", getDefs: getCommonAdvancedDefs },
  { id: "actions", name: "Actions & Rich Text", getDefs: getCommonActionsDefs },
  { id: "files-hierarchy", name: "Files & Hierarchy", getDefs: getCommonFilesHierarchyDefs },
  { id: "scheduling-workflows", name: "Scheduling & Workflows", getDefs: getCommonSchedulingDefs },
  { id: "collaboration-devtools", name: "Collaboration & DevTools", getDefs: getCommonCollaborationDefs },
  { id: "api-data-utilities", name: "API & Data Utilities", getDefs: getCommonApiDataDefs },
  { id: "visualizations-mapping", name: "Visualizations & Mapping", getDefs: getCommonVisualizationsMappingDefs },
  { id: "design-system-a11y", name: "Design System & a11y", getDefs: getCommonDesignSystemA11yDefs },
  { id: "dx-localization", name: "DevEx & Localization", getDefs: getCommonDxLocalizationDefs },
] as const;

/**
 * Resolves all category definitions for a style slug, deduplicated against base definitions.
 */
export function getAllCommonDefs(slug: StyleSlug): ComponentDef[] {
  const defs: ComponentDef[] = [];
  const seen = new Set<string>();

  for (const group of COMPONENT_CATEGORY_GROUPS) {
    const groupDefs = group.getDefs(slug);
    for (const def of groupDefs) {
      if (!seen.has(def.id)) {
        seen.add(def.id);
        defs.push(def);
      }
    }
  }

  return defs;
}

/**
 * Resolves the full merged suite of component definitions for a style.
 */
export function resolveStyleBundleDefs(
  baseDefs: ComponentDef[],
  slug: StyleSlug
): ComponentDef[] {
  const seen = new Set<string>();
  const combined: ComponentDef[] = [];

  // Base definitions take priority for style-specific identity
  for (const def of baseDefs) {
    if (!seen.has(def.id)) {
      seen.add(def.id);
      combined.push(def);
    }
  }

  // Common definitions augment with universal catalog components
  for (const def of getAllCommonDefs(slug)) {
    if (!seen.has(def.id)) {
      seen.add(def.id);
      combined.push(def);
    }
  }

  return combined;
}
