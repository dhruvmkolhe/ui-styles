import React from "react";
import type { ComponentDef, Mode, StyleSlug } from "@/lib/styles/types";
import {
  TablePreview,
  DataTablePreview,
  ListPreview,
  TimelinePreview,
  StatCardPreview,
  RatingPreview,
  ChipPreview,
  DescriptionListPreview,
  KeyValueListPreview,
  DataGridPreview,
  FaqPreview,
} from "./common-data-display-previews";
import { getDataDisplayCodeForStyle } from "./common-data-display-code";

export function getCommonDataDisplayDefs(slug: StyleSlug): ComponentDef[] {
  return [
    {
      id: "table",
      name: "Table",
      description:
        "Semantic tabular presentation for structured datasets with aligned headers, currency formatting, and interactive row selection.",
      Preview: ({ mode }: { mode: Mode }) => <TablePreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getDataDisplayCodeForStyle(slug, "table", mode),
    },
    {
      id: "data-table",
      name: "Data Table",
      description:
        "Full-featured interactive data table with live column sorting, multi-column search filtering, row selection, and client-side pagination.",
      Preview: ({ mode }: { mode: Mode }) => <DataTablePreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getDataDisplayCodeForStyle(slug, "data-table", mode),
    },
    {
      id: "list",
      name: "List",
      description:
        "Interactive bordered and divided item lists with leading avatars, descriptive subtext, status badges, and selection feedback.",
      Preview: ({ mode }: { mode: Mode }) => <ListPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getDataDisplayCodeForStyle(slug, "list", mode),
    },
    {
      id: "timeline",
      name: "Timeline",
      description:
        "Chronological activity tracking pipeline with completed, active pulsing, upcoming step indicators, and connector lines.",
      Preview: ({ mode }: { mode: Mode }) => <TimelinePreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getDataDisplayCodeForStyle(slug, "timeline", mode),
    },
    {
      id: "stat-card",
      name: "Stat / Metric Card",
      description:
        "Key performance indicator metric cards featuring large typography, percentage trend chips, supporting context, and icons.",
      Preview: ({ mode }: { mode: Mode }) => <StatCardPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getDataDisplayCodeForStyle(slug, "stat-card", mode),
    },
    {
      id: "rating",
      name: "Rating",
      description:
        "Interactive star rating with hover score preview, fractional half-star support, score readout, and keyboard navigation.",
      Preview: ({ mode }: { mode: Mode }) => <RatingPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getDataDisplayCodeForStyle(slug, "rating", mode),
    },
    {
      id: "chip",
      name: "Chip",
      description:
        "Compact tag and filter chips with multi-selection toggles, leading avatars, and dismissible remove buttons.",
      Preview: ({ mode }: { mode: Mode }) => <ChipPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getDataDisplayCodeForStyle(slug, "chip", mode),
    },
    {
      id: "description-list",
      name: "Description List",
      description:
        "Semantic term and definition list supporting responsive horizontal and two-column grid layouts with status indicators.",
      Preview: ({ mode }: { mode: Mode }) => <DescriptionListPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getDataDisplayCodeForStyle(slug, "description-list", mode),
    },
    {
      id: "key-value-list",
      name: "Key-Value List",
      description:
        "System and environment metadata inspection list featuring monospace values and instant one-click clipboard copying.",
      Preview: ({ mode }: { mode: Mode }) => <KeyValueListPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getDataDisplayCodeForStyle(slug, "key-value-list", mode),
    },
    {
      id: "data-grid",
      name: "Data Grid",
      description:
        "Spreadsheet-style 2D matrix featuring roving tabindex, active cell highlighting, and full directional arrow-key navigation.",
      Preview: ({ mode }: { mode: Mode }) => <DataGridPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getDataDisplayCodeForStyle(slug, "data-grid", mode),
    },
    {
      id: "faq",
      name: "FAQ Section",
      description:
        "Interactive frequently asked questions accordion with category badges, smooth toggle transitions, and stylized answers across light and dark modes.",
      Preview: ({ mode }: { mode: Mode }) => <FaqPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getDataDisplayCodeForStyle(slug, "faq", mode),
    },
  ];
}
