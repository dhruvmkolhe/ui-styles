import React from "react"
import type { ComponentDef, Mode, StyleSlug } from "@/lib/styles/types"
import {
  CommandButtonGroupPreview,
  ButtonGroupPreview,
  SplitButtonPreview,
  SegmentedControlPreview,
  ToolbarPreview,
  FloatingToolbarPreview,
  RichTextEditorPreview,
  MentionInputPreview,
  EmojiPickerPreview,
  TagEditorPreview,
} from "./common-actions-previews"
import { getActionsCodeForStyle } from "./common-actions-code"

export function getCommonActionsDefs(slug: StyleSlug): ComponentDef[] {
  return [
    {
      id: "command-button-group",
      name: "Command Button Group",
      description: "Group related actions with primary/secondary hierarchy, keyboard shortcuts, and responsive orientation.",
      Preview: ({ mode }: { mode: Mode }) => <CommandButtonGroupPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getActionsCodeForStyle(slug, "command-button-group", mode),
    },
    {
      id: "button-group",
      name: "Button Group",
      description: "Connected buttons with shared borders, seamless joined corners, and focus elevation.",
      Preview: ({ mode }: { mode: Mode }) => <ButtonGroupPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getActionsCodeForStyle(slug, "button-group", mode),
    },
    {
      id: "split-button",
      name: "Split Button",
      description: "Primary action button paired with a connected dropdown menu for secondary context actions.",
      Preview: ({ mode }: { mode: Mode }) => <SplitButtonPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getActionsCodeForStyle(slug, "split-button", mode),
    },
    {
      id: "segmented-control",
      name: "Segmented Control",
      description: "Interactive multi-option mode switcher with active pill indicator and keyboard roving navigation.",
      Preview: ({ mode }: { mode: Mode }) => <SegmentedControlPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getActionsCodeForStyle(slug, "segmented-control", mode),
    },
    {
      id: "toolbar",
      name: "Toolbar",
      description: "Compact responsive row of actions, toggle groups, and formatting buttons with overflow containment.",
      Preview: ({ mode }: { mode: Mode }) => <ToolbarPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getActionsCodeForStyle(slug, "toolbar", mode),
    },
    {
      id: "floating-toolbar",
      name: "Floating Toolbar",
      description: "Contextual actions that float near selected content with collision detection and keyboard escape.",
      Preview: ({ mode }: { mode: Mode }) => <FloatingToolbarPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getActionsCodeForStyle(slug, "floating-toolbar", mode),
    },
    {
      id: "rich-text-editor",
      name: "Rich Text Editor",
      description: "Feature-rich formatting editor supporting bold, lists, links, headings, blockquotes, and safe HTML sanitization.",
      Preview: ({ mode }: { mode: Mode }) => <RichTextEditorPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getActionsCodeForStyle(slug, "rich-text-editor", mode),
    },
    {
      id: "mention-input",
      name: "Mention Input",
      description: "Text input with trigger-based autocomplete popup for tagging users and team members.",
      Preview: ({ mode }: { mode: Mode }) => <MentionInputPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getActionsCodeForStyle(slug, "mention-input", mode),
    },
    {
      id: "emoji-picker",
      name: "Emoji Picker",
      description: "Searchable emoji picker with category tabs, recent history, and live preview.",
      Preview: ({ mode }: { mode: Mode }) => <EmojiPickerPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getActionsCodeForStyle(slug, "emoji-picker", mode),
    },
    {
      id: "tag-editor",
      name: "Mention / Tag Editor",
      description: "Inline chip manager for adding, editing, validating, and removing tags and user mentions.",
      Preview: ({ mode }: { mode: Mode }) => <TagEditorPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getActionsCodeForStyle(slug, "tag-editor", mode),
    },
  ]
}
