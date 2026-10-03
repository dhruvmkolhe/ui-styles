"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import type { Mode, StyleSlug } from "@/lib/styles/types"
import { getStyleFormKit } from "./common-form-kit"
import { AgendaView, type AgendaEvent } from "@/components/ui/agenda-view"
import { GanttChart, type GanttTask } from "@/components/ui/gantt-chart"
import { DependencyGraph, type DependencyNode, type DependencyEdge } from "@/components/ui/dependency-graph"
import { FlowchartEditor, type FlowNode, type FlowEdge } from "@/components/ui/flowchart-editor"
import { NodeBasedEditor, type GraphEditorNode, type NodeConnection } from "@/components/ui/node-based-editor"
import { WorkflowBuilder, type WorkflowStep } from "@/components/ui/workflow-builder"
import { ChatMessage, type ChatMessageData } from "@/components/ui/chat-message"
import { ChatWindow } from "@/components/ui/chat-window"
import { ChatComposer } from "@/components/ui/chat-composer"
import { TypingIndicator } from "@/components/ui/typing-indicator"

export function AgendaViewPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [selectedEvent, setSelectedEvent] = useState<string>("Sprint Review")

  const sampleEvents: AgendaEvent[] = [
    {
      id: "ev-1",
      title: "Sprint Review & Architecture Audit",
      date: "2026-10-24",
      startTime: "10:00 AM",
      endTime: "11:30 AM",
      category: "Engineering",
      color: "#6366f1",
      location: "Studio Conference 4B",
      status: "confirmed",
      attendees: [{ name: "Dhruv" }, { name: "Sarah" }, { name: "Alex" }],
    },
    {
      id: "ev-2",
      title: "Design System Tokens Sync",
      date: "2026-10-24",
      startTime: "02:00 PM",
      endTime: "03:00 PM",
      category: "Design",
      color: "#10b981",
      isVirtual: true,
      status: "confirmed",
      attendees: [{ name: "Sarah" }, { name: "Elena" }],
    },
    {
      id: "ev-3",
      title: "Executive Roadmap Planning",
      date: "2026-10-25",
      startTime: "09:30 AM",
      endTime: "11:00 AM",
      category: "Product",
      color: "#f59e0b",
      location: "Boardroom A",
      status: "tentative",
      attendees: [{ name: "Dhruv" }, { name: "Marcus" }],
    },
  ]

  return (
    <div className={cn("p-6 border space-y-4 max-w-2xl mx-auto", k.panel, k.radius)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
        <span className="font-semibold text-foreground">Agenda View</span>
        <span>Selected: <strong className="text-foreground">{selectedEvent}</strong></span>
      </div>
      <AgendaView
        events={sampleEvents}
        onEventClick={(ev) => setSelectedEvent(ev.title)}
        className={k.radius}
      />
    </div>
  )
}

export function GanttChartPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [activeTask, setActiveTask] = useState<string>("Batch 12 Frontend")

  const sampleTasks: GanttTask[] = [
    {
      id: "t-1",
      name: "API & Data Schema",
      startDate: "2026-10-02",
      endDate: "2026-10-08",
      progress: 100,
      color: "#3b82f6",
      assignee: "Alex",
    },
    {
      id: "t-2",
      name: "Batch 12 Frontend",
      startDate: "2026-10-06",
      endDate: "2026-10-18",
      progress: 65,
      color: "#6366f1",
      assignee: "Dhruv",
      dependencies: ["t-1"],
    },
    {
      id: "t-3",
      name: "Design Token Sync",
      startDate: "2026-10-12",
      endDate: "2026-10-22",
      progress: 40,
      color: "#10b981",
      assignee: "Sarah",
      dependencies: ["t-2"],
    },
    {
      id: "t-4",
      name: "Production Release",
      startDate: "2026-10-24",
      endDate: "2026-10-24",
      progress: 0,
      isMilestone: true,
      dependencies: ["t-2", "t-3"],
    },
  ]

  return (
    <div className={cn("p-6 border space-y-4 max-w-3xl mx-auto", k.panel, k.radius)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
        <span className="font-semibold text-foreground">Gantt Chart Roadmap</span>
        <span>Active: <strong className="text-foreground">{activeTask}</strong></span>
      </div>
      <GanttChart
        tasks={sampleTasks}
        startDate="2026-10-01"
        endDate="2026-10-31"
        onTaskClick={(t) => setActiveTask(t.name)}
        className={k.radius}
      />
    </div>
  )
}

export function DependencyGraphPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [selectedNode, setSelectedNode] = useState<string>("Core Engine")

  const sampleNodes: DependencyNode[] = [
    { id: "core", label: "Core Engine", category: "Core", version: "v2.4", x: 40, y: 80 },
    { id: "auth", label: "Auth Provider", category: "Security", version: "v1.8", x: 260, y: 30 },
    { id: "db", label: "PostgreSQL DB", category: "Data", version: "v15", x: 260, y: 140 },
    { id: "gateway", label: "API Gateway", category: "Network", version: "v3.0", x: 480, y: 80 },
  ]

  const sampleEdges: DependencyEdge[] = [
    { id: "e1", from: "core", to: "auth" },
    { id: "e2", from: "core", to: "db" },
    { id: "e3", from: "auth", to: "gateway" },
    { id: "e4", from: "db", to: "gateway" },
  ]

  return (
    <div className={cn("p-6 border space-y-4 max-w-3xl mx-auto", k.panel, k.radius)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
        <span className="font-semibold text-foreground">Dependency Graph Topology</span>
        <span>Selected: <strong className="text-foreground">{selectedNode}</strong></span>
      </div>
      <DependencyGraph
        nodes={sampleNodes}
        edges={sampleEdges}
        selectedNodeId="core"
        onNodeSelect={(n) => setSelectedNode(n ? n.label : "None")}
        className={k.radius}
      />
    </div>
  )
}

export function FlowchartEditorPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)

  return (
    <div className={cn("p-6 border space-y-4 max-w-3xl mx-auto", k.panel, k.radius)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
        <span className="font-semibold text-foreground">Flowchart Diagram Builder</span>
        <span className="text-[11px] font-mono">Interactive Nodes &amp; Edges</span>
      </div>
      <FlowchartEditor className={k.radius} />
    </div>
  )
}

export function NodeBasedEditorPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)

  return (
    <div className={cn("p-6 border space-y-4 max-w-3xl mx-auto", k.panel, k.radius)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
        <span className="font-semibold text-foreground">Node-Based Graph Editor</span>
        <span className="text-[11px] font-mono">Typed Ports &amp; Cable Routing</span>
      </div>
      <NodeBasedEditor className={k.radius} />
    </div>
  )
}

export function WorkflowBuilderPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)

  return (
    <div className={cn("p-6 border space-y-4 max-w-3xl mx-auto", k.panel, k.radius)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
        <span className="font-semibold text-foreground">Workflow Automation Builder</span>
        <span className="text-[11px] font-mono">Sequential Pipeline</span>
      </div>
      <WorkflowBuilder className={k.radius} />
    </div>
  )
}

export function ChatMessagePreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)

  return (
    <div className={cn("p-6 border space-y-4 max-w-xl mx-auto", k.panel, k.radius)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
        <span className="font-semibold text-foreground">Chat Message</span>
        <span className="text-[11px] font-mono">Bubble States</span>
      </div>
      <div className="space-y-4">
        <ChatMessage
          isOutgoing={false}
          message={{
            id: "msg-1",
            sender: { id: "sarah", name: "Sarah Chen", role: "Design Lead" },
            content: "Hey team! Batch 12 Scheduling & Workflow components are now ready for review.",
            timestamp: "10:14 AM",
            status: "read",
            attachments: [
              { id: "a-1", name: "workflow-spec.pdf", size: 245000, type: "file" },
            ],
          }}
        />

        <ChatMessage
          isOutgoing={true}
          message={{
            id: "msg-2",
            sender: { id: "dhruv", name: "Dhruv Kolhe", role: "VP Engineering" },
            content: "Super clean! I especially love the cycle detection in the Dependency Graph.",
            timestamp: "10:16 AM",
            status: "read",
          }}
        />
      </div>
    </div>
  )
}

export function ChatWindowPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)

  return (
    <div className={cn("p-6 border space-y-4 max-w-2xl mx-auto", k.panel, k.radius)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
        <span className="font-semibold text-foreground">Chat Window</span>
        <span className="text-[11px] font-mono">Interactive Conversation Interface</span>
      </div>
      <ChatWindow className={k.radius} />
    </div>
  )
}

export function ChatComposerPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [lastSent, setLastSent] = useState<string>("Ready")

  return (
    <div className={cn("p-6 border space-y-4 max-w-xl mx-auto", k.panel, k.radius)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
        <span className="font-semibold text-foreground">Chat Composer</span>
        <span>Last Sent: <strong className="text-foreground">{lastSent}</strong></span>
      </div>
      <ChatComposer
        onSend={(text) => setLastSent(text)}
        placeholder="Type a message or attach design files..."
        className={k.radius}
      />
    </div>
  )
}

export function TypingIndicatorPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [active, setActive] = useState(true)

  return (
    <div className={cn("p-6 border space-y-4 max-w-xl mx-auto", k.panel, k.radius)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
        <span className="font-semibold text-foreground">Typing Indicator</span>
        <button
          type="button"
          onClick={() => setActive(!active)}
          className="text-xs text-primary font-semibold hover:underline"
        >
          {active ? "Pause Animation" : "Resume Animation"}
        </button>
      </div>
      <div className="flex flex-col gap-4 py-2">
        <div className="space-y-1">
          <span className="text-[10px] text-muted-foreground font-mono">Bubble Variant:</span>
          <TypingIndicator active={active} variant="bubble" />
        </div>
        <div className="space-y-1">
          <span className="text-[10px] text-muted-foreground font-mono">Text Variant:</span>
          <TypingIndicator active={active} name="Sarah Chen" variant="text" />
        </div>
      </div>
    </div>
  )
}
