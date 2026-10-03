"use client"

import * as React from "react"
import {
  Folder,
  FolderPlus,
  FileText,
  FileImage,
  FileArchive,
  FileVideo,
  File,
  ChevronRight,
  ArrowLeft,
  LayoutGrid,
  List as ListIcon,
  Search,
  Trash2,
  Edit2,
  Download,
  Upload,
  ArrowUpDown,
  MoreVertical,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { formatFileSize } from "@/components/ui/file-upload-dropzone"
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog"

export interface FSItem {
  id: string
  name: string
  type: "folder" | "file"
  parentId: string | null
  size?: number
  updatedAt?: string
  fileType?: "image" | "document" | "archive" | "video" | "code" | "unknown"
}

const DEFAULT_FS: FSItem[] = [
  { id: "root-1", name: "Documents", type: "folder", parentId: null, updatedAt: "2026-10-01" },
  { id: "root-2", name: "Images", type: "folder", parentId: null, updatedAt: "2026-09-28" },
  { id: "root-3", name: "Source Code", type: "folder", parentId: null, updatedAt: "2026-10-02" },
  { id: "root-4", name: "project-spec.pdf", type: "file", parentId: null, size: 2450000, updatedAt: "2026-10-02", fileType: "document" },
  { id: "root-5", name: "branding-tokens.json", type: "file", parentId: null, size: 48000, updatedAt: "2026-10-01", fileType: "code" },

  // Inside Documents
  { id: "doc-1", name: "architecture-v2.md", type: "file", parentId: "root-1", size: 34000, updatedAt: "2026-10-01", fileType: "document" },
  { id: "doc-2", name: "release-notes-batch10.txt", type: "file", parentId: "root-1", size: 12500, updatedAt: "2026-10-02", fileType: "document" },

  // Inside Images
  { id: "img-1", name: "hero-showcase.png", type: "file", parentId: "root-2", size: 1840000, updatedAt: "2026-09-28", fileType: "image" },
  { id: "img-2", name: "style-palette.svg", type: "file", parentId: "root-2", size: 86000, updatedAt: "2026-09-29", fileType: "image" },

  // Inside Source Code
  { id: "src-1", name: "components.zip", type: "file", parentId: "root-3", size: 5200000, updatedAt: "2026-10-02", fileType: "archive" },
]

export interface FileManagerProps extends React.HTMLAttributes<HTMLDivElement> {
  initialItems?: FSItem[]
  onItemSelect?: (item: FSItem) => void
  readOnly?: boolean
}

export function FileManager({
  className,
  initialItems = DEFAULT_FS,
  onItemSelect,
  readOnly = false,
  ...props
}: FileManagerProps) {
  const [items, setItems] = React.useState<FSItem[]>(initialItems)
  const [currentFolderId, setCurrentFolderId] = React.useState<string | null>(null)
  const [selectedIds, setSelectedIds] = React.useState<string[]>([])
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [sortBy, setSortBy] = React.useState<"name" | "date" | "size">("name")

  // Modals / dialog states
  const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false)
  const [itemToDelete, setItemToDelete] = React.useState<FSItem | null>(null)
  const [editingItemId, setEditingItemId] = React.useState<string | null>(null)
  const [editingName, setEditingName] = React.useState("")

  // Breadcrumbs path
  const breadcrumbs = React.useMemo(() => {
    const crumbs: { id: string | null; name: string }[] = [{ id: null, name: "Home" }]
    let curr = currentFolderId
    const stack: { id: string; name: string }[] = []

    while (curr) {
      const folder = items.find((i) => i.id === curr)
      if (folder) {
        stack.unshift({ id: folder.id, name: folder.name })
        curr = folder.parentId
      } else {
        break
      }
    }
    return [...crumbs, ...stack]
  }, [items, currentFolderId])

  // Filtered and sorted items in current folder
  const currentItems = React.useMemo(() => {
    let list = items.filter((i) => i.parentId === currentFolderId)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      list = list.filter((i) => i.name.toLowerCase().includes(q))
    }

    return list.sort((a, b) => {
      // Folders always first
      if (a.type === "folder" && b.type !== "folder") return -1
      if (a.type !== "folder" && b.type === "folder") return 1

      if (sortBy === "name") {
        return a.name.localeCompare(b.name)
      }
      if (sortBy === "size") {
        return (b.size || 0) - (a.size || 0)
      }
      if (sortBy === "date") {
        return (b.updatedAt || "").localeCompare(a.updatedAt || "")
      }
      return 0
    })
  }, [items, currentFolderId, searchQuery, sortBy])

  const handleCreateFolder = () => {
    if (readOnly) return
    const folderName = prompt("Enter new folder name:", "New Folder")
    if (!folderName || !folderName.trim()) return

    const newFolder: FSItem = {
      id: `folder-${Date.now()}`,
      name: folderName.trim(),
      type: "folder",
      parentId: currentFolderId,
      updatedAt: new Date().toISOString().split("T")[0],
    }
    setItems((prev) => [...prev, newFolder])
  }

  const handleUploadSimulated = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    const uploaded = Array.from(e.target.files).map((f, i) => ({
      id: `upload-${Date.now()}-${i}`,
      name: f.name,
      type: "file" as const,
      parentId: currentFolderId,
      size: f.size,
      updatedAt: new Date().toISOString().split("T")[0],
      fileType: "document" as const,
    }))
    setItems((prev) => [...prev, ...uploaded])
  }

  const handleDeleteItem = (item: FSItem) => {
    setItemToDelete(item)
    setDeleteConfirmOpen(true)
  }

  const confirmDelete = () => {
    if (!itemToDelete) return
    // Recursive delete children if folder
    const toDeleteIds = new Set<string>([itemToDelete.id])
    let changed = true
    while (changed) {
      changed = false
      items.forEach((i) => {
        if (i.parentId && toDeleteIds.has(i.parentId) && !toDeleteIds.has(i.id)) {
          toDeleteIds.add(i.id)
          changed = true
        }
      })
    }

    setItems((prev) => prev.filter((i) => !toDeleteIds.has(i.id)))
    setSelectedIds((prev) => prev.filter((id) => !toDeleteIds.has(id)))
    setDeleteConfirmOpen(false)
    setItemToDelete(null)
  }

  const startRename = (item: FSItem) => {
    setEditingItemId(item.id)
    setEditingName(item.name)
  }

  const saveRename = () => {
    if (!editingItemId) return
    const trimmed = editingName.trim()
    if (trimmed) {
      setItems((prev) =>
        prev.map((i) => (i.id === editingItemId ? { ...i, name: trimmed } : i))
      )
    }
    setEditingItemId(null)
    setEditingName("")
  }

  const getIcon = (item: FSItem) => {
    if (item.type === "folder") {
      return <Folder className="h-5 w-5 text-amber-500 fill-amber-500/20" />
    }
    switch (item.fileType) {
      case "image":
        return <FileImage className="h-5 w-5 text-blue-500" />
      case "archive":
        return <FileArchive className="h-5 w-5 text-purple-500" />
      case "video":
        return <FileVideo className="h-5 w-5 text-rose-500" />
      case "code":
        return <File className="h-5 w-5 text-teal-500" />
      default:
        return <FileText className="h-5 w-5 text-emerald-500" />
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Top action header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/30 p-3 select-none">
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs">
          {currentFolderId && (
            <button
              type="button"
              onClick={() => {
                const parent = items.find((i) => i.id === currentFolderId)?.parentId ?? null
                setCurrentFolderId(parent)
              }}
              className="mr-1 rounded p-1 hover:bg-muted text-muted-foreground hover:text-foreground"
              aria-label="Back to parent folder"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
            </button>
          )}

          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.id ?? "root"}>
              {idx > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
              <button
                type="button"
                onClick={() => setCurrentFolderId(crumb.id)}
                className={cn(
                  "font-medium transition-colors hover:text-foreground",
                  idx === breadcrumbs.length - 1
                    ? "font-semibold text-foreground pointer-events-none"
                    : "text-muted-foreground"
                )}
              >
                {crumb.name}
              </button>
            </React.Fragment>
          ))}
        </div>

        {/* Toolbar right */}
        <div className="flex items-center gap-2">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search in folder..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-7.5 w-36 sm:w-48 rounded-md border border-input bg-card pl-8 pr-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="h-7.5 rounded-md border border-input bg-card px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="name">Name</option>
            <option value="size">Size</option>
            <option value="date">Date</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center rounded-md border border-border bg-card p-0.5">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={cn(
                "rounded p-1 text-xs transition-colors",
                viewMode === "grid" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
              )}
              aria-label="Grid View"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={cn(
                "rounded p-1 text-xs transition-colors",
                viewMode === "list" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
              )}
              aria-label="List View"
            >
              <ListIcon className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Create Folder & Upload */}
          {!readOnly && (
            <>
              <button
                type="button"
                onClick={handleCreateFolder}
                className="inline-flex h-7.5 items-center gap-1 rounded-md border border-border bg-card px-2.5 text-xs font-medium text-foreground hover:bg-muted transition-colors shadow-2xs"
              >
                <FolderPlus className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">New Folder</span>
              </button>

              <label className="inline-flex h-7.5 items-center gap-1 rounded-md bg-primary text-primary-foreground px-2.5 text-xs font-medium hover:bg-primary/90 transition-colors cursor-pointer shadow-2xs">
                <Upload className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Upload</span>
                <input
                  type="file"
                  multiple
                  onChange={handleUploadSimulated}
                  className="hidden"
                />
              </label>
            </>
          )}
        </div>
      </div>

      {/* Main File Explorer Container */}
      <div className="min-h-[260px] p-4">
        {currentItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
            <Folder className="h-10 w-10 stroke-[1.2] opacity-40 mb-2" />
            <p className="text-xs font-semibold">This folder is empty</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Upload files or create subfolders to organize your workspace.
            </p>
          </div>
        ) : viewMode === "grid" ? (
          /* Grid View */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {currentItems.map((item) => {
              const isSelected = selectedIds.includes(item.id)
              const isEditing = editingItemId === item.id

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedIds([item.id])
                    onItemSelect?.(item)
                  }}
                  onDoubleClick={() => {
                    if (item.type === "folder") {
                      setCurrentFolderId(item.id)
                      setSelectedIds([])
                    }
                  }}
                  className={cn(
                    "group relative flex flex-col items-center justify-center rounded-lg border p-3.5 text-center transition-all cursor-pointer select-none",
                    isSelected
                      ? "border-primary bg-primary/10 shadow-xs"
                      : "border-border bg-card/60 hover:bg-muted/40 hover:border-border/80"
                  )}
                >
                  <div className="mb-2">{getIcon(item)}</div>

                  {isEditing ? (
                    <input
                      type="text"
                      autoFocus
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onBlur={saveRename}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveRename()
                        if (e.key === "Escape") setEditingItemId(null)
                      }}
                      className="h-6 w-full rounded border border-primary bg-background px-1 text-center text-xs font-medium outline-none"
                    />
                  ) : (
                    <span className="w-full truncate text-xs font-medium text-foreground">
                      {item.name}
                    </span>
                  )}

                  <span className="text-[10px] text-muted-foreground mt-0.5">
                    {item.type === "folder" ? "Folder" : formatFileSize(item.size || 0)}
                  </span>

                  {/* Hover Quick Actions */}
                  {!readOnly && (
                    <div className="absolute top-1.5 right-1.5 hidden group-hover:flex items-center gap-0.5 bg-card/90 backdrop-blur-xs rounded p-0.5 border border-border shadow-xs">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          startRename(item)
                        }}
                        className="p-1 hover:text-primary text-muted-foreground"
                        aria-label={`Rename ${item.name}`}
                      >
                        <Edit2 className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteItem(item)
                        }}
                        className="p-1 hover:text-destructive text-muted-foreground"
                        aria-label={`Delete ${item.name}`}
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          /* List View */
          <div className="rounded-lg border border-border divide-y divide-border overflow-hidden">
            {currentItems.map((item) => {
              const isSelected = selectedIds.includes(item.id)
              const isEditing = editingItemId === item.id

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedIds([item.id])
                    onItemSelect?.(item)
                  }}
                  onDoubleClick={() => {
                    if (item.type === "folder") {
                      setCurrentFolderId(item.id)
                      setSelectedIds([])
                    }
                  }}
                  className={cn(
                    "group flex items-center justify-between p-2.5 text-xs transition-colors cursor-pointer select-none",
                    isSelected ? "bg-accent text-accent-foreground font-medium" : "hover:bg-muted/40"
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {getIcon(item)}
                    {isEditing ? (
                      <input
                        type="text"
                        autoFocus
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onBlur={saveRename}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveRename()
                          if (e.key === "Escape") setEditingItemId(null)
                        }}
                        className="h-6 rounded border border-primary bg-background px-1 text-xs font-medium outline-none"
                      />
                    ) : (
                      <span className="truncate">{item.name}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-muted-foreground font-mono text-[11px] shrink-0">
                    <span>{item.type === "folder" ? "—" : formatFileSize(item.size || 0)}</span>
                    <span className="hidden sm:inline">{item.updatedAt}</span>

                    {!readOnly && (
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            startRename(item)
                          }}
                          className="p-1 hover:text-foreground"
                          aria-label={`Rename ${item.name}`}
                        >
                          <Edit2 className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteItem(item)
                          }}
                          className="p-1 hover:text-destructive"
                          aria-label={`Delete ${item.name}`}
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Footer status bar */}
      <div className="flex items-center justify-between border-t border-border bg-muted/20 px-3 py-1.5 text-[11px] text-muted-foreground">
        <span>{currentItems.length} items in current folder</span>
        <span className="font-mono">In-Memory / Local Session Store</span>
      </div>

      {/* Confirmation Dialog for Delete */}
      <ConfirmationDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        destructive
        title="Delete Item"
        description={`Are you sure you want to delete "${itemToDelete?.name}"? ${
          itemToDelete?.type === "folder" ? "All enclosed files will also be removed." : ""
        }`}
        confirmLabel="Delete"
        onConfirm={confirmDelete}
      />
    </div>
  )
}
FileManager.displayName = "FileManager"
