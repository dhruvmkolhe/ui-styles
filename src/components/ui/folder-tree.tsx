"use client"

import * as React from "react"
import {
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  File,
  FileText,
  FileCode,
  FileImage,
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface FolderNode {
  id: string
  name: string
  itemCount?: number
  children?: FolderNode[]
  isLeafFile?: boolean
  fileType?: "document" | "code" | "image" | "default"
}

export interface FolderTreeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  data: FolderNode[]
  selectedId?: string
  defaultSelectedId?: string
  onSelect?: (node: FolderNode) => void
  defaultExpandedIds?: string[]
}

export function FolderTree({
  className,
  data,
  selectedId: controlledSelectedId,
  defaultSelectedId,
  onSelect,
  defaultExpandedIds = ["root"],
  ...props
}: FolderTreeProps) {
  const [uncontrolledSelectedId, setUncontrolledSelectedId] = React.useState<string | undefined>(
    defaultSelectedId || data[0]?.id
  )
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(
    () => new Set(defaultExpandedIds)
  )

  const isControlled = controlledSelectedId !== undefined
  const selectedId = isControlled ? controlledSelectedId : uncontrolledSelectedId

  const toggleExpand = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleSelectNode = (node: FolderNode) => {
    if (!isControlled) {
      setUncontrolledSelectedId(node.id)
    }
    onSelect?.(node)
  }

  const renderTree = (nodes: FolderNode[], level = 0) => {
    return (
      <ul role={level === 0 ? "tree" : "group"} className="space-y-0.5">
        {nodes.map((node) => {
          const hasChildren = node.children && node.children.length > 0
          const isExpanded = expandedIds.has(node.id)
          const isSelected = selectedId === node.id

          return (
            <li
              key={node.id}
              role="treeitem"
              aria-expanded={hasChildren ? isExpanded : undefined}
              aria-selected={isSelected}
              className="select-none"
            >
              <div
                onClick={() => {
                  handleSelectNode(node)
                  if (hasChildren && !isExpanded) {
                    toggleExpand(node.id)
                  }
                }}
                style={{ paddingLeft: `${level * 16 + 8}px` }}
                className={cn(
                  "flex items-center gap-1.5 rounded-md py-1.5 pr-2 text-xs font-medium transition-colors cursor-pointer outline-none",
                  isSelected
                    ? "bg-accent text-accent-foreground font-semibold shadow-2xs"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  "focus-visible:ring-1 focus-visible:ring-ring"
                )}
              >
                {/* Expand / Collapse Chevron */}
                {hasChildren ? (
                  <button
                    type="button"
                    onClick={(e) => toggleExpand(node.id, e)}
                    className="p-0.5 hover:text-foreground text-muted-foreground rounded"
                    aria-label={isExpanded ? `Collapse ${node.name}` : `Expand ${node.name}`}
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-3.5 w-3.5 shrink-0" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                    )}
                  </button>
                ) : (
                  <span className="w-4 shrink-0" />
                )}

                {/* Folder/File Icon */}
                {node.isLeafFile ? (
                  node.fileType === "code" ? (
                    <FileCode className="h-4 w-4 text-blue-500 shrink-0" />
                  ) : node.fileType === "image" ? (
                    <FileImage className="h-4 w-4 text-purple-500 shrink-0" />
                  ) : (
                    <FileText className="h-4 w-4 text-emerald-500 shrink-0" />
                  )
                ) : isExpanded ? (
                  <FolderOpen className="h-4 w-4 text-amber-500 fill-amber-500/20 shrink-0" />
                ) : (
                  <Folder className="h-4 w-4 text-amber-500 fill-amber-500/20 shrink-0" />
                )}

                <span className="truncate flex-1">{node.name}</span>

                {node.itemCount !== undefined && (
                  <span className="rounded-full bg-muted px-1.5 py-0.2 text-[10px] font-mono text-muted-foreground">
                    {node.itemCount}
                  </span>
                )}
              </div>

              {/* Recursive child subtree */}
              {hasChildren && isExpanded && renderTree(node.children!, level + 1)}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div
      className={cn(
        "w-full rounded-xl border border-border bg-card p-2 text-card-foreground shadow-xs",
        className
      )}
      {...props}
    >
      {renderTree(data)}
    </div>
  )
}
FolderTree.displayName = "FolderTree"
