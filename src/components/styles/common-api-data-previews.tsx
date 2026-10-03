"use client"

import React from "react"
import type { Mode, StyleSlug } from "@/lib/styles/types"
import { APIRequestBuilder } from "@/components/ui/api-request-builder"
import { APIResponseViewer } from "@/components/ui/api-response-viewer"
import { RegexTester } from "@/components/ui/regex-tester"
import { CronExpressionBuilder } from "@/components/ui/cron-expression-builder"
import { QueryBuilder } from "@/components/ui/query-builder"
import { FormulaEditor } from "@/components/ui/formula-editor"
import { SpreadsheetGrid } from "@/components/ui/spreadsheet-grid"
import { ChartLegend } from "@/components/ui/chart-legend"
import { ChartCrosshairTooltip } from "@/components/ui/chart-crosshair-tooltip"
import { Heatmap } from "@/components/ui/heatmap"

interface PreviewProps {
  slug: StyleSlug
  mode: Mode
}

export function ApiRequestBuilderPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <APIRequestBuilder />
    </div>
  )
}

export function ApiResponseViewerPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <APIResponseViewer />
    </div>
  )
}

export function RegexTesterPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <RegexTester />
    </div>
  )
}

export function CronExpressionBuilderPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full flex justify-center p-2">
      <CronExpressionBuilder className="w-full max-w-xl" />
    </div>
  )
}

export function QueryBuilderPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <QueryBuilder />
    </div>
  )
}

export function FormulaEditorPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full flex justify-center p-2">
      <FormulaEditor className="w-full max-w-lg" />
    </div>
  )
}

export function SpreadsheetGridPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <SpreadsheetGrid />
    </div>
  )
}

export function ChartLegendPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full flex justify-center p-2">
      <ChartLegend className="w-full max-w-md" />
    </div>
  )
}

export function ChartCrosshairTooltipPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <ChartCrosshairTooltip />
    </div>
  )
}

export function HeatmapPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full flex justify-center p-2">
      <Heatmap className="w-full max-w-xl" />
    </div>
  )
}
