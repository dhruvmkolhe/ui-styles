import React from "react"
import type { ComponentDef, Mode, StyleSlug } from "@/lib/styles/types"
import {
  SpinnerPreview,
  LoadingButtonPreview,
  StatusIndicatorPreview,
  StepProgressPreview,
  CircularProgressPreview,
  ShimmerPreview,
  ConnectionStatusPreview,
  SkeletonTextPreview,
  LoadingBarPreview,
  ProcessingIndicatorPreview,
} from "./common-status-previews"
import { getStatusCodeForStyle } from "./common-status-code"

export function getCommonStatusDefs(slug: StyleSlug): ComponentDef[] {
  return [
    {
      id: "spinner",
      name: "Spinner / Loader",
      description:
        "Indeterminate circular SVG loader with size variants, stroke scaling, color adaptations, and accessible status labels.",
      Preview: ({ mode }: { mode: Mode }) => <SpinnerPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getStatusCodeForStyle(slug, "spinner", mode),
    },
    {
      id: "loading-button",
      name: "Loading Button",
      description:
        "Interactive button with inline spinner, duplicate-click prevention, loading label transitions, and stable dimensions.",
      Preview: ({ mode }: { mode: Mode }) => <LoadingButtonPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getStatusCodeForStyle(slug, "loading-button", mode),
    },
    {
      id: "status-indicator",
      name: "Status Indicator",
      description:
        "Multi-state semantic indicator dot with animated ping pulse, accessible text labels, and color-independent status descriptors.",
      Preview: ({ mode }: { mode: Mode }) => <StatusIndicatorPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getStatusCodeForStyle(slug, "status-indicator", mode),
    },
    {
      id: "step-progress",
      name: "Step Progress",
      description:
        "Sequential progress indicator with completed checkmarks, current step rings, upcoming markers, and connecting progress track.",
      Preview: ({ mode }: { mode: Mode }) => <StepProgressPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getStatusCodeForStyle(slug, "step-progress", mode),
    },
    {
      id: "circular-progress",
      name: "Circular Progress",
      description:
        "Radial progress ring supporting determinate percentages, indeterminate rotation, and center percentage/icon content.",
      Preview: ({ mode }: { mode: Mode }) => <CircularProgressPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getStatusCodeForStyle(slug, "circular-progress", mode),
    },
    {
      id: "shimmer",
      name: "Shimmer",
      description:
        "Content-preserving placeholder container with gradient highlight sweep animation, eliminating cumulative layout shifts.",
      Preview: ({ mode }: { mode: Mode }) => <ShimmerPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getStatusCodeForStyle(slug, "shimmer", mode),
    },
    {
      id: "connection-status",
      name: "Connection Status",
      description:
        "Real-time network connectivity monitor displaying connected, connecting, disconnected, and offline states with latency and retry actions.",
      Preview: ({ mode }: { mode: Mode }) => <ConnectionStatusPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getStatusCodeForStyle(slug, "connection-status", mode),
    },
    {
      id: "skeleton-text",
      name: "Skeleton Text",
      description:
        "Multi-line paragraph and heading placeholders with realistic line-end width tapering and typography-matching line heights.",
      Preview: ({ mode }: { mode: Mode }) => <SkeletonTextPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getStatusCodeForStyle(slug, "skeleton-text", mode),
    },
    {
      id: "loading-bar",
      name: "Loading Bar",
      description:
        "Horizontal linear progress bar supporting determinate percentage updates, sliding indeterminate beams, and label readouts.",
      Preview: ({ mode }: { mode: Mode }) => <LoadingBarPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getStatusCodeForStyle(slug, "loading-bar", mode),
    },
    {
      id: "processing-indicator",
      name: "Processing Indicator",
      description:
        "Async background job state card managing idle, active, completed, and error states with progress bar and retry buttons.",
      Preview: ({ mode }: { mode: Mode }) => <ProcessingIndicatorPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getStatusCodeForStyle(slug, "processing-indicator", mode),
    },
  ]
}
