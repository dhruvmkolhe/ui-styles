"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import type { Mode, StyleSlug } from "@/lib/styles/types"
import { getStyleFormKit } from "./common-form-kit"
import { CommandPalette } from "@/components/ui/command-palette"
import { SearchBar } from "@/components/ui/search-bar"
import { Filter } from "@/components/ui/filter"
import { SortMenu } from "@/components/ui/sort-menu"
import { RangeSlider } from "@/components/ui/range-slider"
import { Slider } from "@/components/ui/slider"
import { ColorPicker } from "@/components/ui/color-picker"
import { Combobox } from "@/components/ui/combobox"
import { MultiSelect } from "@/components/ui/multi-select"
import { OtpInput } from "@/components/ui/otp-input"
import {
  FileText,
  Settings,
  FolderPlus,
  Copy,
  Terminal,
  Code2,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react"

export function CommandPalettePreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [lastExecuted, setLastExecuted] = useState<string | null>(null)

  const sampleGroups = [
    {
      category: "Suggestions",
      items: [
        {
          id: "new-file",
          label: "Create New File",
          description: "Initialize a new component in src/components",
          icon: <FileText className="h-4 w-4" />,
          shortcut: "⌘N",
          onSelect: () => setLastExecuted("Create New File"),
        },
        {
          id: "open-project",
          label: "Open Project...",
          description: "Browse existing workspaces",
          icon: <FolderPlus className="h-4 w-4" />,
          shortcut: "⌘O",
          onSelect: () => setLastExecuted("Open Project"),
        },
      ],
    },
    {
      category: "Tools & Settings",
      items: [
        {
          id: "format-code",
          label: "Format Document",
          description: "Run Prettier formatting",
          icon: <Code2 className="h-4 w-4" />,
          shortcut: "⌥⇧F",
          onSelect: () => setLastExecuted("Format Document"),
        },
        {
          id: "settings",
          label: "Preferences",
          description: "Configure workspace theme & tokens",
          icon: <Settings className="h-4 w-4" />,
          shortcut: "⌘,",
          onSelect: () => setLastExecuted("Preferences"),
        },
      ],
    },
  ]

  return (
    <div className={`p-6 ${k.panel} ${k.radius} border space-y-4 max-w-xl mx-auto`}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
        <span className="font-semibold text-foreground">Command Palette (Inline Demo)</span>
        <span>{lastExecuted ? `Executed: ${lastExecuted}` : "Press keys or click to run"}</span>
      </div>
      <CommandPalette
        open={true}
        onOpenChange={() => {}}
        inline={true}
        enableGlobalShortcut={false}
        groups={sampleGroups}
        className={k.radius}
      />
    </div>
  )
}

export function SearchBarPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [query, setQuery] = useState("")
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null)

  const suggestions = [
    { id: "1", label: "React Components", category: "Framework", description: "UI component hierarchy" },
    { id: "2", label: "Tailwind CSS Styling", category: "CSS", description: "Utility-first design tokens" },
    { id: "3", label: "TypeScript Interfaces", category: "Language", description: "Strict type contracts" },
    { id: "4", label: "Next.js App Router", category: "Framework", description: "Server components & layout" },
  ]

  return (
    <div className={`p-6 ${k.panel} ${k.radius} border space-y-4 max-w-md mx-auto`}>
      <SearchBar
        value={query}
        onChange={setQuery}
        onSearch={(q) => setSubmittedQuery(q)}
        suggestions={suggestions}
        placeholder="Search components, docs..."
        label="Quick Search"
        className={k.radius}
      />
      {submittedQuery && (
        <p className="text-xs text-muted-foreground">
          Submitted search query: <span className="font-mono font-bold text-foreground">{submittedQuery}</span>
        </p>
      )}
    </div>
  )
}

export function FilterPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [filters, setFilters] = useState<Record<string, any>>({
    status: "active",
    category: ["frontend"],
    rating: 80,
  })

  const filterConfigs = [
    {
      id: "status",
      label: "Status",
      type: "radio" as const,
      options: [
        { label: "Active", value: "active" },
        { label: "Archived", value: "archived" },
      ],
    },
    {
      id: "category",
      label: "Categories",
      type: "multi-select" as const,
      options: [
        { label: "Frontend", value: "frontend", count: 42 },
        { label: "Backend", value: "backend", count: 18 },
        { label: "Design", value: "design", count: 12 },
      ],
    },
    {
      id: "rating",
      label: "Min Score",
      type: "range" as const,
      min: 0,
      max: 100,
      step: 5,
    },
  ]

  return (
    <div className={`p-4 ${k.panel} ${k.radius} border space-y-4 max-w-xl mx-auto`}>
      <Filter
        filters={filterConfigs}
        values={filters}
        onChange={setFilters}
        className={k.radius}
      />
      <div className="text-[11px] font-mono text-muted-foreground bg-muted/30 p-2 rounded">
        Active filter state: {JSON.stringify(filters)}
      </div>
    </div>
  )
}

export function SortMenuPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [currentSort, setCurrentSort] = useState("name-asc")

  const sortOptions = [
    { id: "name-asc", label: "Name (A → Z)", direction: "asc" as const },
    { id: "name-desc", label: "Name (Z → A)", direction: "desc" as const },
    { id: "newest", label: "Newest First", direction: "desc" as const },
    { id: "oldest", label: "Oldest First", direction: "asc" as const },
    { id: "rating", label: "Highest Rated", direction: "desc" as const },
  ]

  return (
    <div className={`p-6 ${k.panel} ${k.radius} border space-y-4 max-w-md mx-auto flex flex-col items-center`}>
      <SortMenu
        options={sortOptions}
        value={currentSort}
        onChange={(opt) => setCurrentSort(opt.id)}
        className={k.radius}
      />
      <p className="text-xs text-muted-foreground">
        Active order: <span className="font-mono font-bold text-foreground">{currentSort}</span>
      </p>
    </div>
  )
}

export function RangeSliderPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [range, setRange] = useState<[number, number]>([25, 75])

  return (
    <div className={`p-6 ${k.panel} ${k.radius} border space-y-4 max-w-md mx-auto`}>
      <div className="flex items-center justify-between text-xs font-semibold text-foreground">
        <span>Price Filter</span>
        <span className="font-mono text-primary">${range[0]} – ${range[1]}</span>
      </div>
      <RangeSlider
        min={0}
        max={100}
        step={1}
        value={range}
        onChange={setRange}
        formatValue={(val) => `$${val}`}
        className={k.radius}
      />
    </div>
  )
}

export function SliderPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [val, setVal] = useState(65)

  return (
    <div className={`p-6 ${k.panel} ${k.radius} border space-y-4 max-w-md mx-auto`}>
      <div className="flex items-center justify-between text-xs font-semibold text-foreground">
        <span>Volume Intensity</span>
        <span className="font-mono text-primary">{val}%</span>
      </div>
      <Slider
        min={0}
        max={100}
        step={1}
        value={val}
        onChange={setVal}
        formatValue={(v) => `${v}%`}
        className={k.radius}
      />
    </div>
  )
}

export function ColorPickerPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [color, setColor] = useState("#3b82f6")

  return (
    <div className={cn("p-6 border space-y-4 max-w-md mx-auto flex flex-col items-center min-h-[290px] justify-start", k.panel, k.radius)}>
      <ColorPicker
        value={color}
        onChange={setColor}
        label="Accent Theme Color"
        className={k.radius}
      />
      <div
        className="w-full h-8 rounded-lg border shadow-inner transition-colors mt-2"
        style={{ backgroundColor: color }}
      />
    </div>
  )
}

export function ComboboxPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [selected, setSelected] = useState("nextjs")

  const frameworks = [
    { value: "react", label: "React", description: "Declarative UI library" },
    { value: "nextjs", label: "Next.js", description: "The React Framework for the Web" },
    { value: "vue", label: "Vue.js", description: "Progressive JavaScript framework" },
    { value: "svelte", label: "SvelteKit", description: "Cybernetically enhanced web apps" },
    { value: "astro", label: "Astro", description: "Content-focused static site generator" },
  ]

  return (
    <div className={cn("p-6 border space-y-4 max-w-md mx-auto min-h-[300px] flex flex-col justify-start", k.panel, k.radius)}>
      <Combobox
        options={frameworks}
        value={selected}
        onChange={setSelected}
        placeholder="Select framework..."
        searchPlaceholder="Filter frameworks..."
        className={k.radius}
      />
      <p className="text-xs text-muted-foreground">
        Selected: <span className="font-mono font-bold text-foreground">{selected}</span>
      </p>
    </div>
  )
}

export function MultiSelectPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [selected, setSelected] = useState<string[]>(["react", "typescript"])

  const techStack = [
    { value: "react", label: "React 19" },
    { value: "typescript", label: "TypeScript 5" },
    { value: "tailwind", label: "Tailwind CSS v4" },
    { value: "turbopack", label: "Turbopack" },
    { value: "radix", label: "Radix Primitives" },
  ]

  return (
    <div className={cn("p-6 border space-y-4 max-w-md mx-auto min-h-[300px] flex flex-col justify-start", k.panel, k.radius)}>
      <MultiSelect
        options={techStack}
        value={selected}
        onChange={setSelected}
        placeholder="Select technologies..."
        searchPlaceholder="Search stack..."
        className={k.radius}
      />
      <div className="text-[11px] font-mono text-muted-foreground">
        Tags count: {selected.length} items selected
      </div>
    </div>
  )
}

export function OtpInputPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [pin, setPin] = useState("")
  const [completedPin, setCompletedPin] = useState<string | null>(null)

  return (
    <div className={`p-6 ${k.panel} ${k.radius} border space-y-4 max-w-md mx-auto flex flex-col items-center`}>
      <div className="text-center space-y-1">
        <h4 className="text-sm font-semibold text-foreground">Authentication Code</h4>
        <p className="text-xs text-muted-foreground">Enter the 6-digit security code</p>
      </div>

      <OtpInput
        length={6}
        value={pin}
        onChange={setPin}
        onComplete={(code) => setCompletedPin(code)}
        className={k.radius}
      />

      {completedPin && (
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-md">
          <Sparkles className="h-3 w-3" /> Code Verified
        </span>
      )}
    </div>
  )
}
