"use client"

import * as React from "react"
import { ChevronRight, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TreeNode {
  id: string
  label: React.ReactNode
  icon?: React.ReactNode
  badge?: React.ReactNode
  children?: TreeNode[]
  disabled?: boolean
  data?: any
}

export interface TreeViewProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  data: TreeNode[]
  selectedId?: string
  defaultSelectedId?: string
  onSelect?: (node: TreeNode) => void
  expandedIds?: string[]
  defaultExpandedIds?: string[]
  onExpandedChange?: (expandedIds: string[]) => void
  showCheckboxes?: boolean
  checkedIds?: string[]
  onCheckedChange?: (checkedIds: string[]) => void
}

export function TreeView({
  className,
  data,
  selectedId: controlledSelectedId,
  defaultSelectedId,
  onSelect,
  expandedIds: controlledExpandedIds,
  defaultExpandedIds = [],
  onExpandedChange,
  showCheckboxes = false,
  checkedIds = [],
  onCheckedChange,
  ...props
}: TreeViewProps) {
  const [uncontrolledSelectedId, setUncontrolledSelectedId] = React.useState(defaultSelectedId)
  const [uncontrolledExpandedIds, setUncontrolledExpandedIds] = React.useState<Set<string>>(
    () => new Set(defaultExpandedIds)
  )

  const isControlledSelected = controlledSelectedId !== undefined
  const selectedId = isControlledSelected ? controlledSelectedId : uncontrolledSelectedId

  const isControlledExpanded = controlledExpandedIds !== undefined
  const expandedSet = React.useMemo(() => {
    return isControlledExpanded
      ? new Set(controlledExpandedIds)
      : uncontrolledExpandedIds
  }, [isControlledExpanded, controlledExpandedIds, uncontrolledExpandedIds])

  const toggleExpand = (id: string) => {
    const next = new Set(expandedSet)
    if (next.has(id)) next.delete(id)
    else next.add(id)

    if (!isControlledExpanded) {
      setUncontrolledExpandedIds(next)
    }
    onExpandedChange?.(Array.from(next))
  }

  const handleSelectNode = (node: TreeNode) => {
    if (node.disabled) return
    if (!isControlledSelected) {
      setUncontrolledSelectedId(node.id)
    }
    onSelect?.(node)
  }

  const toggleCheck = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const nextChecked = checkedIds.includes(id)
      ? checkedIds.filter((item) => item !== id)
      : [...checkedIds, id]
    onCheckedChange?.(nextChecked)
  }

  const renderTree = (nodes: TreeNode[], level = 0) => {
    return (
      <ul role={level === 0 ? "tree" : "group"} className="space-y-0.5">
        {nodes.map((node) => {
          const hasChildren = node.children && node.children.length > 0
          const isExpanded = expandedSet.has(node.id)
          const isSelected = selectedId === node.id
          const isChecked = checkedIds.includes(node.id)

          return (
            <li
              key={node.id}
              role="treeitem"
              aria-expanded={hasChildren ? isExpanded : undefined}
              aria-selected={isSelected}
              aria-disabled={node.disabled}
              className="select-none"
            >
              <div
                onClick={() => handleSelectNode(node)}
                style={{ paddingLeft: `${level * 16 + 8}px` }}
                className={cn(
                  "flex items-center gap-1.5 rounded-md py-1.5 pr-2.5 text-xs font-medium transition-colors cursor-pointer outline-none",
                  isSelected
                    ? "bg-accent text-accent-foreground font-semibold shadow-2xs"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                  node.disabled && "opacity-40 cursor-not-allowed pointer-events-none",
                  "focus-visible:ring-1 focus-visible:ring-ring"
                )}
              >
                {/* Expand / Collapse trigger */}
                {hasChildren ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleExpand(node.id)
                    }}
                    className="p-0.5 hover:text-foreground text-muted-foreground rounded"
                    aria-label={isExpanded ? "Collapse" : "Expand"}
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5" />
                    )}
                  </button>
                ) : (
                  <span className="w-4 shrink-0" />
                )}

                {/* Optional Checkbox */}
                {showCheckboxes && (
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    onClick={(e) => toggleCheck(node.id, e)}
                    className="h-3.5 w-3.5 rounded border-border accent-primary cursor-pointer shrink-0"
                  />
                )}

                {/* Node Icon */}
                {node.icon && <span className="shrink-0">{node.icon}</span>}

                {/* Label */}
                <span className="truncate flex-1">{node.label}</span>

                {/* Badge */}
                {node.badge && <span className="shrink-0">{node.badge}</span>}
              </div>

              {/* Children Subtree */}
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
TreeView.displayName = "TreeView"
