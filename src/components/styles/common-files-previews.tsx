"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import type { Mode, StyleSlug } from "@/lib/styles/types"
import { getStyleFormKit } from "./common-form-kit"
import { FileUploadDropzone } from "@/components/ui/file-upload-dropzone"
import { FileUploadProgressList, type UploadFileItem } from "@/components/ui/file-upload-progress-list"
import { FileManager, type FSItem } from "@/components/ui/file-manager"
import { FolderTree, type FolderNode } from "@/components/ui/folder-tree"
import { TreeView, type TreeNode } from "@/components/ui/tree-view"
import { OrganizationChart, type OrgNode } from "@/components/ui/organization-chart"
import { KanbanBoard, type KanbanColumn } from "@/components/ui/kanban-board"
import { DragAndDropList, type DndListItem } from "@/components/ui/drag-and-drop-list"
import { TaskBoardCard, type TaskCardData } from "@/components/ui/task-board-card"
import { CalendarEventCard, type CalendarEvent } from "@/components/ui/calendar-event-card"
import {
  FileText,
  FileCode,
  FileImage,
  Folder,
  Layers,
  Database,
  Server,
  Cloud,
} from "lucide-react"

export function FileUploadDropzonePreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [acceptedCount, setAcceptedCount] = useState<number>(0)

  return (
    <div className={cn("p-6 border space-y-4 max-w-xl mx-auto", k.panel, k.radius)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
        <span className="font-semibold text-foreground">File Upload Dropzone</span>
        <span>Accepted: <strong className="text-foreground">{acceptedCount} files</strong></span>
      </div>
      <FileUploadDropzone
        maxFiles={3}
        onFilesAccepted={(files) => setAcceptedCount(files.length)}
        className={k.radius}
      />
    </div>
  )
}

export function FileUploadProgressPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [demoFiles, setDemoFiles] = useState<UploadFileItem[]>([
    {
      id: "f-1",
      name: "design-system-tokens.json",
      size: 145000,
      progress: 100,
      status: "completed",
    },
    {
      id: "f-2",
      name: "app-architecture-diagram.png",
      size: 2840000,
      progress: 68,
      status: "uploading",
    },
    {
      id: "f-3",
      name: "bundle-archive.zip",
      size: 12500000,
      progress: 30,
      status: "paused",
    },
  ])

  return (
    <div className={cn("p-6 border space-y-4 max-w-xl mx-auto", k.panel, k.radius)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
        <span className="font-semibold text-foreground">Upload Progress List</span>
        <span className="text-[11px] font-mono text-primary font-medium">Multi-Transfer Queue</span>
      </div>
      <FileUploadProgressList
        files={demoFiles}
        onPause={(id) =>
          setDemoFiles((prev) =>
            prev.map((f) => (f.id === id ? { ...f, status: "paused" } : f))
          )
        }
        onResume={(id) =>
          setDemoFiles((prev) =>
            prev.map((f) => (f.id === id ? { ...f, status: "uploading" } : f))
          )
        }
        onRemove={(id) => setDemoFiles((prev) => prev.filter((f) => f.id !== id))}
        className={k.radius}
      />
    </div>
  )
}

export function FileManagerPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  return (
    <div className={cn("p-6 border space-y-4 max-w-3xl mx-auto", k.panel, k.radius)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
        <span className="font-semibold text-foreground">File Manager</span>
        <span>Selected: <strong className="text-foreground">{selectedFile || "None"}</strong></span>
      </div>
      <FileManager
        onItemSelect={(item) => setSelectedFile(item.name)}
        className={k.radius}
      />
    </div>
  )
}

export function FolderTreePreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [selectedFolder, setSelectedFolder] = useState<string>("src")

  const sampleTree: FolderNode[] = [
    {
      id: "root",
      name: "project-root",
      itemCount: 8,
      children: [
        {
          id: "src",
          name: "src",
          itemCount: 5,
          children: [
            {
              id: "components",
              name: "components",
              itemCount: 25,
              children: [
                { id: "ui", name: "ui", itemCount: 115 },
                { id: "styles", name: "styles", itemCount: 25 },
              ],
            },
            { id: "lib", name: "lib", itemCount: 6 },
            { id: "app", name: "app", itemCount: 4 },
          ],
        },
        { id: "public", name: "public", itemCount: 12 },
        { id: "package.json", name: "package.json", isLeafFile: true, fileType: "code" },
      ],
    },
  ]

  return (
    <div className={cn("p-6 border space-y-4 max-w-xl mx-auto", k.panel, k.radius)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
        <span className="font-semibold text-foreground">Folder Tree Navigation</span>
        <span>Active Node: <strong className="text-foreground">{selectedFolder}</strong></span>
      </div>
      <FolderTree
        data={sampleTree}
        selectedId={selectedFolder}
        onSelect={(n) => setSelectedFolder(n.name)}
        defaultExpandedIds={["root", "src", "components"]}
        className={k.radius}
      />
    </div>
  )
}

export function TreeViewPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [selectedItem, setSelectedItem] = useState("api")

  const sampleTreeData: TreeNode[] = [
    {
      id: "backend",
      label: "Cloud Infrastructure",
      icon: <Cloud className="h-4 w-4 text-sky-500" />,
      badge: <span className="text-[10px] bg-primary/10 text-primary px-1 rounded">Prod</span>,
      children: [
        {
          id: "api",
          label: "API Gateway (FastAPI)",
          icon: <Server className="h-4 w-4 text-emerald-500" />,
        },
        {
          id: "db",
          label: "Database Cluster (PostgreSQL)",
          icon: <Database className="h-4 w-4 text-indigo-500" />,
        },
      ],
    },
    {
      id: "frontend",
      label: "Next.js Web Client",
      icon: <Layers className="h-4 w-4 text-amber-500" />,
      children: [
        { id: "app-router", label: "App Router / (routes)" },
        { id: "shared-ui", label: "Design System UI Kit" },
      ],
    },
  ]

  return (
    <div className={cn("p-6 border space-y-4 max-w-xl mx-auto", k.panel, k.radius)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
        <span className="font-semibold text-foreground">Tree View Data Hierarchy</span>
        <span>Selected: <strong className="text-foreground">{selectedItem}</strong></span>
      </div>
      <TreeView
        data={sampleTreeData}
        selectedId={selectedItem}
        onSelect={(node) => setSelectedItem(node.id)}
        defaultExpandedIds={["backend", "frontend"]}
        className={k.radius}
      />
    </div>
  )
}

export function OrganizationChartPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [selectedMember, setSelectedMember] = useState("Dhruv Kolhe")

  const sampleOrgData: OrgNode = {
    id: "1",
    name: "Dhruv Kolhe",
    role: "VP of Product Engineering",
    department: "Executive",
    children: [
      {
        id: "2",
        name: "Sarah Chen",
        role: "Design Systems Lead",
        department: "Product Design",
        children: [
          { id: "4", name: "Elena Rostova", role: "UI Designer", department: "Design" },
          { id: "5", name: "Marcus Brody", role: "Design Technologist", department: "Design" },
        ],
      },
      {
        id: "3",
        name: "Alex Rivera",
        role: "Frontend Architect",
        department: "Core Web",
        children: [
          { id: "6", name: "Kenji Sato", role: "Performance Eng", department: "Infrastructure" },
        ],
      },
    ],
  }

  return (
    <div className={cn("p-6 border space-y-4 max-w-3xl mx-auto", k.panel, k.radius)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
        <span className="font-semibold text-foreground">Organization Hierarchy Chart</span>
        <span>Member: <strong className="text-foreground">{selectedMember}</strong></span>
      </div>
      <OrganizationChart
        data={sampleOrgData}
        onNodeClick={(node) => setSelectedMember(node.name)}
        className={k.radius}
      />
    </div>
  )
}

export function KanbanBoardPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)

  const columns: KanbanColumn[] = [
    { id: "todo", title: "To Do", color: "#64748b", taskIds: ["t-1", "t-2"] },
    { id: "progress", title: "In Progress", color: "#3b82f6", taskIds: ["t-3"] },
    { id: "done", title: "Completed", color: "#10b981", taskIds: ["t-4"] },
  ]

  const tasks: Record<string, TaskCardData> = {
    "t-1": {
      id: "t-1",
      title: "Folder Tree Integration",
      description: "Implement collapsible file tree with ARIA tree semantics.",
      priority: "high",
      labels: ["Component", "A11y"],
      dueDate: "Oct 24",
      subtasks: { completed: 2, total: 3 },
    },
    "t-2": {
      id: "t-2",
      title: "File Upload Drag & Drop",
      description: "Add MIME and size guard validation.",
      priority: "medium",
      labels: ["Upload"],
      dueDate: "Oct 26",
    },
    "t-3": {
      id: "t-3",
      title: "Design System Showcase",
      description: "Expose all 10 Batch 11 components in interactive documentation.",
      priority: "urgent",
      labels: ["Showcase"],
      dueDate: "Oct 22",
      subtasks: { completed: 5, total: 10 },
    },
    "t-4": {
      id: "t-4",
      title: "Batch 10 Actions Suite",
      description: "Completed rich text editing and command button group.",
      priority: "low",
      labels: ["Verified"],
      dueDate: "Oct 18",
      subtasks: { completed: 4, total: 4 },
    },
  }

  return (
    <div className={cn("p-6 border space-y-4 max-w-3xl mx-auto", k.panel, k.radius)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
        <span className="font-semibold text-foreground">Kanban Workflow Board</span>
        <span className="text-[11px] font-mono text-primary font-medium">Interactive Drag & Drop</span>
      </div>
      <KanbanBoard columns={columns} tasks={tasks} className={k.radius} />
    </div>
  )
}

export function DragAndDropListPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [items, setItems] = useState<DndListItem[]>([
    {
      id: "1",
      label: "Component Architecture Review",
      description: "Ensure composable Radix primitives and pure styling.",
    },
    {
      id: "2",
      label: "Automated Browser Verification",
      description: "Run Playwright / Puppeteer interaction tests.",
    },
    {
      id: "3",
      label: "Cross-Style 25 Theme Audit",
      description: "Check Japandi, Retro, and Material palettes.",
    },
  ])

  return (
    <div className={cn("p-6 border space-y-4 max-w-xl mx-auto", k.panel, k.radius)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
        <span className="font-semibold text-foreground">Drag-and-Drop Reorderable List</span>
        <span>Order: {items.map((i) => i.id).join(" → ")}</span>
      </div>
      <DragAndDropList
        items={items}
        onReorder={setItems}
        onRemove={(id) => setItems((prev) => prev.filter((i) => i.id !== id))}
        className={k.radius}
      />
    </div>
  )
}

export function TaskBoardCardPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)

  const sampleTask: TaskCardData = {
    id: "card-demo",
    title: "Implement File Manager & Folder Tree Suite",
    description: "Provide interactive folder navigation with recursive tree hierarchy and confirmation dialogs.",
    priority: "urgent",
    labels: ["Batch 11", "Files"],
    dueDate: "2026-10-24",
    subtasks: { completed: 8, total: 10 },
    assignees: [
      { id: "1", name: "Dhruv Kolhe" },
      { id: "2", name: "Alex Rivera" },
    ],
  }

  return (
    <div className={cn("p-6 border space-y-4 max-w-md mx-auto", k.panel, k.radius)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
        <span className="font-semibold text-foreground">Task Board Card</span>
        <span className="text-[11px] font-mono text-primary">Priority Badge & Meta</span>
      </div>
      <TaskBoardCard task={sampleTask} canMoveLeft canMoveRight className={k.radius} />
    </div>
  )
}

export function CalendarEventCardPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)

  const sampleEvent: CalendarEvent = {
    id: "event-1",
    title: "Chameleon UI Architecture & Batch 11 Sprint Review",
    description: "Walkthrough of new hierarchical navigation primitives, tree views, and drag-and-drop mechanics.",
    date: "2026-10-24",
    startTime: "02:00 PM",
    endTime: "03:30 PM",
    category: "Architecture",
    color: "#6366f1",
    location: "Studio Conference Room 4B / Google Meet",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    attendees: [
      { id: "1", name: "Dhruv Kolhe" },
      { id: "2", name: "Sarah Chen" },
      { id: "3", name: "Alex Rivera" },
    ],
    status: "confirmed",
  }

  return (
    <div className={cn("p-6 border space-y-4 max-w-lg mx-auto", k.panel, k.radius)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
        <span className="font-semibold text-foreground">Calendar Event Card</span>
        <span className="text-[11px] font-mono text-primary">Schedule Card</span>
      </div>
      <CalendarEventCard event={sampleEvent} className={k.radius} />
    </div>
  )
}
