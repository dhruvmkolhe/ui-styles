import React from "react"
import type { ComponentDef, Mode, StyleSlug } from "@/lib/styles/types"
import {
  FileUploadDropzonePreview,
  FileUploadProgressPreview,
  FileManagerPreview,
  FolderTreePreview,
  TreeViewPreview,
  OrganizationChartPreview,
  KanbanBoardPreview,
  DragAndDropListPreview,
  TaskBoardCardPreview,
  CalendarEventCardPreview,
} from "./common-files-previews"
import { getFilesCodeForStyle } from "./common-files-code"

export function getCommonFilesHierarchyDefs(slug: StyleSlug): ComponentDef[] {
  return [
    {
      id: "file-upload-dropzone",
      name: "File Upload Dropzone",
      description: "Drag-and-drop file upload container with format validation, size guards, and file inspection.",
      Preview: ({ mode }: { mode: Mode }) => <FileUploadDropzonePreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getFilesCodeForStyle(slug, "file-upload-dropzone", mode),
    },
    {
      id: "file-upload-progress",
      name: "File Upload Progress List",
      description: "Multi-file transfer manager with progress tracking, pause/resume, retry, and client demo states.",
      Preview: ({ mode }: { mode: Mode }) => <FileUploadProgressPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getFilesCodeForStyle(slug, "file-upload-progress", mode),
    },
    {
      id: "file-manager",
      name: "File Manager",
      description: "Complete browser file explorer with folder navigation, search, grid/list modes, upload, and deletion.",
      Preview: ({ mode }: { mode: Mode }) => <FileManagerPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getFilesCodeForStyle(slug, "file-manager", mode),
    },
    {
      id: "folder-tree",
      name: "Folder Tree",
      description: "Collapsible directory navigation tree with nested hierarchy levels and folder item counts.",
      Preview: ({ mode }: { mode: Mode }) => <FolderTreePreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getFilesCodeForStyle(slug, "folder-tree", mode),
    },
    {
      id: "tree-view",
      name: "Tree View",
      description: "Multi-level hierarchical data viewer with keyboard roving navigation, checkboxes, and badge support.",
      Preview: ({ mode }: { mode: Mode }) => <TreeViewPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getFilesCodeForStyle(slug, "tree-view", mode),
    },
    {
      id: "organization-chart",
      name: "Organization Chart",
      description: "Visual reporting structure and company hierarchy diagram with branch expand/collapse.",
      Preview: ({ mode }: { mode: Mode }) => <OrganizationChartPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getFilesCodeForStyle(slug, "organization-chart", mode),
    },
    {
      id: "kanban-board",
      name: "Kanban Board",
      description: "Multi-column workflow board with interactive drag-and-drop task routing and column counters.",
      Preview: ({ mode }: { mode: Mode }) => <KanbanBoardPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getFilesCodeForStyle(slug, "kanban-board", mode),
    },
    {
      id: "drag-and-drop-list",
      name: "Drag-and-Drop List",
      description: "Interactive item reordering list with grip handles, keyboard step alternatives, and removal.",
      Preview: ({ mode }: { mode: Mode }) => <DragAndDropListPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getFilesCodeForStyle(slug, "drag-and-drop-list", mode),
    },
    {
      id: "task-board-card",
      name: "Task Board Card",
      description: "Workflow task card displaying priority badges, checklist counters, assignees, and due dates.",
      Preview: ({ mode }: { mode: Mode }) => <TaskBoardCardPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getFilesCodeForStyle(slug, "task-board-card", mode),
    },
    {
      id: "calendar-event-card",
      name: "Calendar Event Card",
      description: "Schedule appointment card with category palettes, virtual call links, attendees, and RSVP actions.",
      Preview: ({ mode }: { mode: Mode }) => <CalendarEventCardPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getFilesCodeForStyle(slug, "calendar-event-card", mode),
    },
  ]
}
