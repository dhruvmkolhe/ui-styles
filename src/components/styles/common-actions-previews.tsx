"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import type { Mode, StyleSlug } from "@/lib/styles/types"
import { getStyleFormKit } from "./common-form-kit"
import { CommandButtonGroup, CommandButton } from "@/components/ui/command-button-group"
import { ButtonGroup } from "@/components/ui/button-group"
import { SplitButton } from "@/components/ui/split-button"
import { SegmentedControl } from "@/components/ui/segmented-control"
import {
  Toolbar,
  ToolbarGroup,
  ToolbarButton,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
} from "@/components/ui/toolbar"
import { FloatingToolbar } from "@/components/ui/floating-toolbar"
import { RichTextEditor } from "@/components/ui/rich-text-editor"
import { MentionInput } from "@/components/ui/mention-input"
import { EmojiPicker } from "@/components/ui/emoji-picker"
import { TagEditor } from "@/components/ui/tag-editor"
import {
  Save,
  Copy,
  Trash2,
  FileCode,
  LayoutGrid,
  List,
  Columns,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Sparkles,
  Link2,
  Smile,
  Send,
  Share2,
  Download,
  Settings,
  Flame,
} from "lucide-react"

export function CommandButtonGroupPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [lastAction, setLastAction] = useState<string>("Ready")

  const commands = [
    {
      id: "save",
      label: "Save",
      icon: <Save className="h-4 w-4" />,
      shortcut: "⌘S",
      variant: "default" as const,
      onClick: () => setLastAction("Saved changes"),
    },
    {
      id: "duplicate",
      label: "Duplicate",
      icon: <Copy className="h-4 w-4" />,
      shortcut: "⌘D",
      variant: "outline" as const,
      onClick: () => setLastAction("Duplicated item"),
    },
    {
      id: "export",
      label: "Export Code",
      icon: <FileCode className="h-4 w-4" />,
      shortcut: "⌥E",
      variant: "outline" as const,
      onClick: () => setLastAction("Exported code bundle"),
    },
    {
      id: "delete",
      label: "Delete",
      icon: <Trash2 className="h-4 w-4 text-destructive" />,
      shortcut: "⌫",
      variant: "outline" as const,
      onClick: () => setLastAction("Moved to trash"),
    },
  ]

  return (
    <div className={cn("p-6 border space-y-4 max-w-xl mx-auto", k.panel, k.radius)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
        <span className="font-semibold text-foreground">Command Button Group</span>
        <span className="font-mono text-primary font-medium">{lastAction}</span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 py-2">
        <CommandButtonGroup items={commands} size="sm" className={k.radius} />
      </div>
    </div>
  )
}

export function ButtonGroupPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [selectedView, setSelectedView] = useState("grid")

  const viewItems = [
    {
      id: "grid",
      label: "Grid",
      icon: <LayoutGrid className="h-4 w-4" />,
      active: selectedView === "grid",
      onClick: () => setSelectedView("grid"),
    },
    {
      id: "list",
      label: "List",
      icon: <List className="h-4 w-4" />,
      active: selectedView === "list",
      onClick: () => setSelectedView("list"),
    },
    {
      id: "columns",
      label: "Columns",
      icon: <Columns className="h-4 w-4" />,
      active: selectedView === "columns",
      onClick: () => setSelectedView("columns"),
    },
  ]

  return (
    <div className={cn("p-6 border space-y-4 max-w-xl mx-auto", k.panel, k.radius)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
        <span className="font-semibold text-foreground">Button Group (Shared Borders)</span>
        <span>Active: <strong className="text-foreground capitalize">{selectedView}</strong></span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 py-2">
        <ButtonGroup items={viewItems} size="default" className={k.radius} />
      </div>
    </div>
  )
}

export function SplitButtonPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [status, setStatus] = useState("Idle")

  const options = [
    {
      id: "prod",
      label: "Deploy to Production",
      description: "Trigger live main branch pipeline",
      shortcut: "⌘P",
      icon: <Flame className="h-4 w-4 text-amber-500" />,
      onClick: () => setStatus("Deployed to Production"),
    },
    {
      id: "staging",
      label: "Deploy to Staging",
      description: "Fast preview environment",
      shortcut: "⌘S",
      icon: <Sparkles className="h-4 w-4 text-blue-500" />,
      onClick: () => setStatus("Deployed to Staging"),
    },
    {
      id: "build",
      label: "Build Only (Dry Run)",
      description: "Verify compilation without publishing",
      onClick: () => setStatus("Build verification succeeded"),
    },
  ]

  return (
    <div className={cn("p-6 border space-y-4 max-w-xl mx-auto", k.panel, k.radius)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
        <span className="font-semibold text-foreground">Split Button (Primary + Caret)</span>
        <span className="font-mono text-primary">{status}</span>
      </div>
      <div className="flex items-center justify-center py-2">
        <SplitButton
          label="Publish Release"
          icon={<Send className="h-4 w-4" />}
          onClick={() => setStatus("Triggered standard release")}
          options={options}
          className={k.radius}
        />
      </div>
    </div>
  )
}

export function SegmentedControlPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [timeframe, setTimeframe] = useState("week")

  const options = [
    { value: "day", label: "Day" },
    { value: "week", label: "Week", badge: "Live" },
    { value: "month", label: "Month" },
    { value: "year", label: "Year" },
  ]

  return (
    <div className={cn("p-6 border space-y-4 max-w-xl mx-auto", k.panel, k.radius)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
        <span className="font-semibold text-foreground">Segmented Control</span>
        <span>Selected: <strong className="text-foreground capitalize">{timeframe}</strong></span>
      </div>
      <div className="flex items-center justify-center py-2">
        <SegmentedControl
          value={timeframe}
          onValueChange={setTimeframe}
          options={options}
          className={k.radius}
        />
      </div>
    </div>
  )
}

export function ToolbarPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [formatting, setFormatting] = useState<string[]>(["bold"])
  const [alignment, setAlignment] = useState<string>("left")

  return (
    <div className={cn("p-6 border space-y-4 max-w-xl mx-auto", k.panel, k.radius)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
        <span className="font-semibold text-foreground">Toolbar</span>
        <span>Align: {alignment} • Styles: {formatting.join(", ") || "none"}</span>
      </div>
      <div className="flex items-center justify-center py-2">
        <Toolbar className={k.radius}>
          <ToolbarToggleGroup
            type="multiple"
            value={formatting}
            onValueChange={setFormatting}
          >
            <ToolbarToggleItem value="bold" aria-label="Bold">
              <Bold className="h-4 w-4" />
            </ToolbarToggleItem>
            <ToolbarToggleItem value="italic" aria-label="Italic">
              <Italic className="h-4 w-4" />
            </ToolbarToggleItem>
            <ToolbarToggleItem value="underline" aria-label="Underline">
              <Underline className="h-4 w-4" />
            </ToolbarToggleItem>
          </ToolbarToggleGroup>

          <ToolbarSeparator />

          <ToolbarToggleGroup
            type="single"
            value={alignment}
            onValueChange={(v) => v && setAlignment(v)}
          >
            <ToolbarToggleItem value="left" aria-label="Align left">
              <AlignLeft className="h-4 w-4" />
            </ToolbarToggleItem>
            <ToolbarToggleItem value="center" aria-label="Align center">
              <AlignCenter className="h-4 w-4" />
            </ToolbarToggleItem>
            <ToolbarToggleItem value="right" aria-label="Align right">
              <AlignRight className="h-4 w-4" />
            </ToolbarToggleItem>
          </ToolbarToggleGroup>

          <ToolbarSeparator />

          <ToolbarButton iconOnly aria-label="Insert Link">
            <Link2 className="h-4 w-4" />
          </ToolbarButton>
        </Toolbar>
      </div>
    </div>
  )
}

export function FloatingToolbarPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [demoActive, setDemoActive] = useState(false)
  const [selectionAction, setSelectionAction] = useState<string | null>(null)

  const actions = [
    {
      id: "bold",
      label: "Bold",
      icon: <Bold className="h-3.5 w-3.5" />,
      onClick: () => setSelectionAction("Bold applied"),
    },
    {
      id: "italic",
      label: "Italic",
      icon: <Italic className="h-3.5 w-3.5" />,
      onClick: () => setSelectionAction("Italic applied"),
    },
    {
      id: "link",
      label: "Link",
      icon: <Link2 className="h-3.5 w-3.5" />,
      onClick: () => setSelectionAction("Link prompt opened"),
    },
    {
      id: "ai",
      label: "AI Rewrite",
      icon: <Sparkles className="h-3.5 w-3.5 text-primary" />,
      onClick: () => setSelectionAction("AI Rewrite triggered"),
    },
  ]

  return (
    <div className={cn("p-6 border space-y-4 max-w-xl mx-auto relative", k.panel, k.radius)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
        <span className="font-semibold text-foreground">Floating Toolbar</span>
        <span>{selectionAction ? `Action: ${selectionAction}` : "Click or highlight demo text"}</span>
      </div>
      <div className="space-y-3">
        <div
          onClick={() => setDemoActive(!demoActive)}
          className={cn(
            "p-3 rounded-md border text-sm leading-relaxed cursor-pointer select-text transition-colors",
            demoActive ? "bg-accent/40 border-primary" : "bg-muted/20 border-border"
          )}
        >
          &ldquo;Design is not just what it looks like and feels like. Design is how it works.&rdquo;
        </div>
        <p className="text-[11px] text-muted-foreground text-center">
          {demoActive ? "Toolbar active! Press Esc to dismiss." : "Click text above to simulate selection"}
        </p>
      </div>

      {demoActive && (
        <div className="flex justify-center pt-2">
          <div className="inline-flex items-center gap-1 rounded-lg border border-border bg-popover p-1 shadow-lg">
            {actions.map((act) => (
              <button
                key={act.id}
                type="button"
                onClick={act.onClick}
                title={act.label}
                className="h-7 w-7 inline-flex items-center justify-center rounded hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                {act.icon}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function RichTextEditorPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [content, setContent] = useState(
    "<p>Explore <strong>bespoke typography</strong> and interactive elements designed with unified tokens.</p>"
  )

  return (
    <div className={cn("p-6 border space-y-4 max-w-xl mx-auto", k.panel, k.radius)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
        <span className="font-semibold text-foreground">Rich Text Editor</span>
        <span>Live Formatting & Sanitization</span>
      </div>
      <RichTextEditor
        value={content}
        onChange={setContent}
        minHeight="120px"
        className={k.radius}
      />
    </div>
  )
}

export function MentionInputPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [val, setVal] = useState("Hey @dhruvmkolhe, take a look at the Batch 10 component updates!")

  return (
    <div className={cn("p-6 border space-y-4 max-w-xl mx-auto", k.panel, k.radius)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
        <span className="font-semibold text-foreground">Mention Input</span>
        <span>Type &lsquo;@&rsquo; to trigger team suggestion menu</span>
      </div>
      <MentionInput
        value={val}
        onChange={setVal}
        rows={3}
        className={k.radius}
      />
    </div>
  )
}

export function EmojiPickerPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [chosenEmoji, setChosenEmoji] = useState("🚀")

  return (
    <div className={cn("p-6 border space-y-4 max-w-xl mx-auto", k.panel, k.radius)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
        <span className="font-semibold text-foreground">Emoji Picker</span>
        <span>Last Selected: <span className="text-base">{chosenEmoji}</span></span>
      </div>
      <div className="flex justify-center py-2">
        <EmojiPicker
          onSelect={(emoji) => setChosenEmoji(emoji)}
          className={k.radius}
        />
      </div>
    </div>
  )
}

export function TagEditorPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [tags, setTags] = useState<string[]>([
    "typescript",
    "@dhruvmkolhe",
    "#design-tokens",
    "batch-10",
  ])

  return (
    <div className={cn("p-6 border space-y-4 max-w-xl mx-auto", k.panel, k.radius)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
        <span className="font-semibold text-foreground">Mention / Tag Editor</span>
        <span>{tags.length} active tags</span>
      </div>
      <TagEditor
        value={tags}
        onChange={setTags}
        className={k.radius}
      />
      <p className="text-[11px] text-muted-foreground">
        Press Enter or comma to create new tags. Double click existing tags to edit.
      </p>
    </div>
  )
}
