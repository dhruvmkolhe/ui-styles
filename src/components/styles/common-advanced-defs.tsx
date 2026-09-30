import React from "react"
import type { ComponentDef, Mode, StyleSlug } from "@/lib/styles/types"
import {
  CommandPalettePreview,
  SearchBarPreview,
  FilterPreview,
  SortMenuPreview,
  RangeSliderPreview,
  SliderPreview,
  ColorPickerPreview,
  ComboboxPreview,
  MultiSelectPreview,
  OtpInputPreview,
} from "./common-advanced-previews"
import { getAdvancedCodeForStyle } from "./common-advanced-code"

export function getCommonAdvancedDefs(slug: StyleSlug): ComponentDef[] {
  return [
    {
      id: "command-palette",
      name: "Command Palette",
      description: "Fast keyboard-driven command runner with filtering, categorised groups, and shortcut cues.",
      Preview: ({ mode }: { mode: Mode }) => <CommandPalettePreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getAdvancedCodeForStyle(slug, "command-palette", mode),
    },
    {
      id: "search-bar",
      name: "Search Bar",
      description: "Search input featuring clear actions, active query debouncing, and autocomplete suggestion dropdown.",
      Preview: ({ mode }: { mode: Mode }) => <SearchBarPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getAdvancedCodeForStyle(slug, "search-bar", mode),
    },
    {
      id: "filter",
      name: "Filter",
      description: "Modular filter toolbar supporting radios, multi-select checkboxes, keywords, and numeric ranges.",
      Preview: ({ mode }: { mode: Mode }) => <FilterPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getAdvancedCodeForStyle(slug, "filter", mode),
    },
    {
      id: "sort-menu",
      name: "Sort Menu",
      description: "Accessible dropdown selector for reordering records by directional criteria with indicator icons.",
      Preview: ({ mode }: { mode: Mode }) => <SortMenuPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getAdvancedCodeForStyle(slug, "sort-menu", mode),
    },
    {
      id: "range-slider",
      name: "Range Slider",
      description: "Dual-handled continuous track for selecting bounded interval minimums and maximums without handle overlap.",
      Preview: ({ mode }: { mode: Mode }) => <RangeSliderPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getAdvancedCodeForStyle(slug, "range-slider", mode),
    },
    {
      id: "slider",
      name: "Slider",
      description: "Single-point slider track with touch and mouse dragging, keyboard stepper increments, and scale marks.",
      Preview: ({ mode }: { mode: Mode }) => <SliderPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getAdvancedCodeForStyle(slug, "slider", mode),
    },
    {
      id: "color-picker",
      name: "Color Picker",
      description: "Hex-validated color selection interface with preset swatches, native color wheel integration, and live preview.",
      Preview: ({ mode }: { mode: Mode }) => <ColorPickerPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getAdvancedCodeForStyle(slug, "color-picker", mode),
    },
    {
      id: "combobox",
      name: "Combobox",
      description: "Searchable select input with listbox semantics, keyboard navigation, clear triggers, and check indicators.",
      Preview: ({ mode }: { mode: Mode }) => <ComboboxPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getAdvancedCodeForStyle(slug, "combobox", mode),
    },
    {
      id: "multi-select",
      name: "Multi-Select",
      description: "Composite tag selector supporting multiple item choices, filter search, individual chip removal, and batch reset.",
      Preview: ({ mode }: { mode: Mode }) => <MultiSelectPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getAdvancedCodeForStyle(slug, "multi-select", mode),
    },
    {
      id: "otp-input",
      name: "OTP / PIN Input",
      description: "Segmented security verification code input with auto-advance, backspace repositioning, paste splitting, and masking.",
      Preview: ({ mode }: { mode: Mode }) => <OtpInputPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getAdvancedCodeForStyle(slug, "otp-input", mode),
    },
  ]
}
