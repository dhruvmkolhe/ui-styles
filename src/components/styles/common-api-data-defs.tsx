import React from "react"
import type { ComponentDef, Mode, StyleSlug } from "@/lib/styles/types"
import {
  ApiRequestBuilderPreview,
  ApiResponseViewerPreview,
  RegexTesterPreview,
  CronExpressionBuilderPreview,
  QueryBuilderPreview,
  FormulaEditorPreview,
  SpreadsheetGridPreview,
  ChartLegendPreview,
  ChartCrosshairTooltipPreview,
  HeatmapPreview,
} from "./common-api-data-previews"
import { getApiDataCodeForStyle } from "./common-api-data-code"

export function getCommonApiDataDefs(slug: StyleSlug): ComponentDef[] {
  return [
    {
      id: "api-request-builder",
      name: "API Request Builder",
      description: "Configure HTTP methods, endpoints, query params, headers, payload body, and authentication.",
      Preview: ({ mode }: { mode: Mode }) => <ApiRequestBuilderPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getApiDataCodeForStyle(slug, "api-request-builder", mode),
    },
    {
      id: "api-response-viewer",
      name: "API Response Viewer",
      description: "Inspect HTTP response status, latency, payload size, JSON body formatting, and headers table.",
      Preview: ({ mode }: { mode: Mode }) => <ApiResponseViewerPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getApiDataCodeForStyle(slug, "api-response-viewer", mode),
    },
    {
      id: "regex-tester",
      name: "Regex Tester",
      description: "Test regular expressions with flags, live match highlighting, capture groups, and presets.",
      Preview: ({ mode }: { mode: Mode }) => <RegexTesterPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getApiDataCodeForStyle(slug, "regex-tester", mode),
    },
    {
      id: "cron-expression-builder",
      name: "Cron Expression Builder",
      description: "Configure 5-part cron schedules with visual controls, human-readable explanations, and common presets.",
      Preview: ({ mode }: { mode: Mode }) => <CronExpressionBuilderPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getApiDataCodeForStyle(slug, "cron-expression-builder", mode),
    },
    {
      id: "query-builder",
      name: "Query Builder",
      description: "Construct database filters with condition groups (AND/OR), field operators, and SQL preview.",
      Preview: ({ mode }: { mode: Mode }) => <QueryBuilderPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getApiDataCodeForStyle(slug, "query-builder", mode),
    },
    {
      id: "formula-editor",
      name: "Formula Editor",
      description: "Spreadsheet-style formula bar with safe recursive evaluator (no eval), cell context, and syntax help.",
      Preview: ({ mode }: { mode: Mode }) => <FormulaEditorPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getApiDataCodeForStyle(slug, "formula-editor", mode),
    },
    {
      id: "spreadsheet-grid",
      name: "Spreadsheet Grid",
      description: "Editable spreadsheet grid with cell coordinates, keyboard navigation, and dynamic formula resolution.",
      Preview: ({ mode }: { mode: Mode }) => <SpreadsheetGridPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getApiDataCodeForStyle(slug, "spreadsheet-grid", mode),
    },
    {
      id: "chart-legend",
      name: "Chart Legend",
      description: "Toggle chart data series visibility with color swatches, metrics, and selection controls.",
      Preview: ({ mode }: { mode: Mode }) => <ChartLegendPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getApiDataCodeForStyle(slug, "chart-legend", mode),
    },
    {
      id: "chart-crosshair-tooltip",
      name: "Chart Crosshair / Tooltip",
      description: "Interactive dual hairline crosshair tracking cursor coordinates with contextual data tooltip.",
      Preview: ({ mode }: { mode: Mode }) => <ChartCrosshairTooltipPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getApiDataCodeForStyle(slug, "chart-crosshair-tooltip", mode),
    },
    {
      id: "heatmap",
      name: "Heatmap",
      description: "2D intensity matrix mapping values to color ramps with cell inspection and min/max scale legend.",
      Preview: ({ mode }: { mode: Mode }) => <HeatmapPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getApiDataCodeForStyle(slug, "heatmap", mode),
    },
  ]
}
