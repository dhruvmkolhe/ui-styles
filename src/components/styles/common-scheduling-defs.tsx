import React from "react"
import type { ComponentDef, Mode, StyleSlug } from "@/lib/styles/types"
import {
  AgendaViewPreview,
  GanttChartPreview,
  DependencyGraphPreview,
  FlowchartEditorPreview,
  NodeBasedEditorPreview,
  WorkflowBuilderPreview,
  ChatMessagePreview,
  ChatWindowPreview,
  ChatComposerPreview,
  TypingIndicatorPreview,
} from "./common-scheduling-previews"
import { getSchedulingCodeForStyle } from "./common-scheduling-code"

export function getCommonSchedulingDefs(slug: StyleSlug): ComponentDef[] {
  return [
    {
      id: "agenda-view",
      name: "Agenda View",
      description: "Chronological event schedule grouped by date with timeframe filters, time slots, and empty state.",
      Preview: ({ mode }: { mode: Mode }) => <AgendaViewPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getSchedulingCodeForStyle(slug, "agenda-view", mode),
    },
    {
      id: "gantt-chart",
      name: "Gantt Chart",
      description: "Project roadmap timeline with configurable dependency curves, progress bars, and milestones.",
      Preview: ({ mode }: { mode: Mode }) => <GanttChartPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getSchedulingCodeForStyle(slug, "gantt-chart", mode),
    },
    {
      id: "dependency-graph",
      name: "Dependency Graph",
      description: "Entity relationship topology map with cycle detection, orphan edge protection, and node selection.",
      Preview: ({ mode }: { mode: Mode }) => <DependencyGraphPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getSchedulingCodeForStyle(slug, "dependency-graph", mode),
    },
    {
      id: "flowchart-editor",
      name: "Flowchart Editor",
      description: "Editable process diagram builder with process, decision, and terminal nodes on a dot canvas grid.",
      Preview: ({ mode }: { mode: Mode }) => <FlowchartEditorPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getSchedulingCodeForStyle(slug, "flowchart-editor", mode),
    },
    {
      id: "node-based-editor",
      name: "Node-Based Editor",
      description: "Visual node graph with typed I/O ports, bezier cables, keyboard movement, and connection routing.",
      Preview: ({ mode }: { mode: Mode }) => <NodeBasedEditorPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getSchedulingCodeForStyle(slug, "node-based-editor", mode),
    },
    {
      id: "workflow-builder",
      name: "Workflow Builder",
      description: "Multistep automation pipeline configuration with trigger, action, delay, and branch steps.",
      Preview: ({ mode }: { mode: Mode }) => <WorkflowBuilderPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getSchedulingCodeForStyle(slug, "workflow-builder", mode),
    },
    {
      id: "chat-message",
      name: "Chat Message",
      description: "Individual conversation message with sender avatar, timestamp, status checkmarks, and attachments.",
      Preview: ({ mode }: { mode: Mode }) => <ChatMessagePreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getSchedulingCodeForStyle(slug, "chat-message", mode),
    },
    {
      id: "chat-window",
      name: "Chat Window",
      description: "Full messaging interface with conversation stream, presence indicator, search filter, and composer.",
      Preview: ({ mode }: { mode: Mode }) => <ChatWindowPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getSchedulingCodeForStyle(slug, "chat-window", mode),
    },
    {
      id: "chat-composer",
      name: "Chat Composer",
      description: "Message input bar with auto-resizing textarea, attachment chips, emoji shortcut, and send trigger.",
      Preview: ({ mode }: { mode: Mode }) => <ChatComposerPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getSchedulingCodeForStyle(slug, "chat-composer", mode),
    },
    {
      id: "typing-indicator",
      name: "Typing Indicator",
      description: "Smooth bouncing dots presence indicator with bubble and text variants and reduced-motion fallback.",
      Preview: ({ mode }: { mode: Mode }) => <TypingIndicatorPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getSchedulingCodeForStyle(slug, "typing-indicator", mode),
    },
  ]
}
