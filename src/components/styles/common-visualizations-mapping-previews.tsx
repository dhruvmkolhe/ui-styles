"use client"

import React from "react"
import type { Mode, StyleSlug } from "@/lib/styles/types"
import { Treemap } from "@/components/ui/treemap"
import { SankeyDiagram } from "@/components/ui/sankey-diagram"
import { NetworkGraph } from "@/components/ui/network-graph"
import { MapMarkerCluster } from "@/components/ui/map-marker-cluster"
import { OnboardingTour } from "@/components/ui/onboarding-tour"
import { SpotlightSearch } from "@/components/ui/spotlight-search"
import { PermissionMatrix } from "@/components/ui/permission-matrix"
import { AuditLog } from "@/components/ui/audit-log"
import { FeatureFlagManager } from "@/components/ui/feature-flag-manager"
import { VersionHistory } from "@/components/ui/version-history"

interface PreviewProps {
  slug: StyleSlug
  mode: Mode
}

export function TreemapPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <Treemap />
    </div>
  )
}

export function SankeyDiagramPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <SankeyDiagram />
    </div>
  )
}

export function NetworkGraphPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <NetworkGraph />
    </div>
  )
}

export function MapMarkerClusterPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <MapMarkerCluster />
    </div>
  )
}

export function OnboardingTourPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <OnboardingTour />
    </div>
  )
}

export function SpotlightSearchPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <SpotlightSearch />
    </div>
  )
}

export function PermissionMatrixPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <PermissionMatrix />
    </div>
  )
}

export function AuditLogPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <AuditLog />
    </div>
  )
}

export function FeatureFlagManagerPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <FeatureFlagManager />
    </div>
  )
}

export function VersionHistoryPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <VersionHistory />
    </div>
  )
}
