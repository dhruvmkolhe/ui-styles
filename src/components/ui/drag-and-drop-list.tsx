"use client"

import * as React from "react"
import {
  GripVertical,
  ChevronUp,
  ChevronDown,
  X,
  ArrowUpToLine,
  ArrowDownToLine,
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface DndListItem {
  id: string
  label: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}

export interface DragAndDropListProps extends React.HTMLAttributes<HTMLDivElement> {
  items: DndListItem[]
  onReorder?: (items: DndListItem[]) => void
  onRemove?: (itemId: string) => void
  showKeyboardControls?: boolean
}

export function DragAndDropList({
  className,
  items: initialItems,
  onReorder,
  onRemove,
  showKeyboardControls = true,
  ...props
}: DragAndDropListProps) {
  const [items, setItems] = React.useState<DndListItem[]>(initialItems)
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = React.useState<number | null>(null)

  React.useEffect(() => {
    setItems(initialItems)
  }, [initialItems])

  const moveItem = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= items.length) return
    const updated = [...items]
    const [moved] = updated.splice(fromIndex, 1)
    updated.splice(toIndex, 0, moved)
    setItems(updated)
    onReorder?.(updated)
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.setData("text/plain", index.toString())
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    setDragOverIndex(index)
  }

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault()
    setDragOverIndex(null)
    const sourceIndex = draggedIndex ?? parseInt(e.dataTransfer.getData("text/plain"), 10)
    if (!isNaN(sourceIndex) && sourceIndex !== targetIndex) {
      moveItem(sourceIndex, targetIndex)
    }
    setDraggedIndex(null)
  }

  return (
    <div
      role="list"
      aria-label="Reorderable list"
      className={cn("w-full space-y-2 select-none", className)}
      {...props}
    >
      {items.map((item, index) => {
        const isFirst = index === 0
        const isLast = index === items.length - 1
        const isDragging = draggedIndex === index
        const isOver = dragOverIndex === index

        return (
          <div
            key={item.id}
            role="listitem"
            draggable={!item.disabled}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={() => setDragOverIndex(null)}
            onDrop={(e) => handleDrop(e, index)}
            className={cn(
              "group flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-2.5 shadow-xs transition-all",
              isDragging && "opacity-40 scale-98",
              isOver && "border-primary bg-primary/5",
              item.disabled && "opacity-50 pointer-events-none"
            )}
          >
            {/* Left: Drag Grip Handle & Content */}
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground p-0.5"
                title="Drag to reorder"
                aria-label="Drag handle"
              >
                <GripVertical className="h-4 w-4" />
              </span>

              {item.icon && <span className="shrink-0">{item.icon}</span>}

              <div className="min-w-0">
                <div className="text-xs font-semibold text-foreground truncate">
                  {item.label}
                </div>
                {item.description && (
                  <div className="text-[11px] text-muted-foreground truncate">
                    {item.description}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Keyboard Move Controls & Remove */}
            <div className="flex items-center gap-1 shrink-0">
              {showKeyboardControls && (
                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    disabled={isFirst}
                    onClick={() => moveItem(index, index - 1)}
                    aria-label={`Move ${typeof item.label === "string" ? item.label : "item"} up`}
                    className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <ChevronUp className="h-3.5 w-3.5" />
                  </button>

                  <button
                    type="button"
                    disabled={isLast}
                    onClick={() => moveItem(index, index + 1)}
                    aria-label={`Move ${typeof item.label === "string" ? item.label : "item"} down`}
                    className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              {onRemove && (
                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  aria-label={`Remove ${typeof item.label === "string" ? item.label : "item"}`}
                  className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors ml-1"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
DragAndDropList.displayName = "DragAndDropList"
