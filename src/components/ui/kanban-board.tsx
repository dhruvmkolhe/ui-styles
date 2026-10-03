"use client"

import * as React from "react"
import { Plus, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { TaskBoardCard, type TaskCardData } from "@/components/ui/task-board-card"

export interface KanbanColumn {
  id: string
  title: string
  color?: string
  taskIds: string[]
}

export interface KanbanBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: KanbanColumn[]
  tasks: Record<string, TaskCardData>
  onTaskMove?: (taskId: string, targetColumnId: string) => void
  onTaskClick?: (task: TaskCardData) => void
  onAddTask?: (columnId: string) => void
  onDeleteTask?: (taskId: string) => void
}

export function KanbanBoard({
  className,
  columns: initialColumns,
  tasks: initialTasks,
  onTaskMove,
  onTaskClick,
  onAddTask,
  onDeleteTask,
  ...props
}: KanbanBoardProps) {
  const [columns, setColumns] = React.useState<KanbanColumn[]>(initialColumns)
  const [tasks, setTasks] = React.useState<Record<string, TaskCardData>>(initialTasks)
  const [draggedTaskId, setDraggedTaskId] = React.useState<string | null>(null)
  const [dragOverColId, setDragOverColId] = React.useState<string | null>(null)

  // Sync props if changed
  React.useEffect(() => {
    setColumns(initialColumns)
  }, [initialColumns])

  React.useEffect(() => {
    setTasks(initialTasks)
  }, [initialTasks])

  const moveTask = (taskId: string, targetColId: string) => {
    setColumns((prev) => {
      const next = prev.map((col) => {
        const hasTask = col.taskIds.includes(taskId)
        const isTarget = col.id === targetColId

        if (hasTask && !isTarget) {
          return { ...col, taskIds: col.taskIds.filter((id) => id !== taskId) }
        }
        if (!hasTask && isTarget) {
          return { ...col, taskIds: [...col.taskIds, taskId] }
        }
        return col
      })
      return next
    })
    onTaskMove?.(taskId, targetColId)
  }

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("text/plain", taskId)
    setDraggedTaskId(taskId)
  }

  const handleDragOver = (e: React.DragEvent, colId: string) => {
    e.preventDefault()
    setDragOverColId(colId)
  }

  const handleDrop = (e: React.DragEvent, colId: string) => {
    e.preventDefault()
    setDragOverColId(null)
    const taskId = e.dataTransfer.getData("text/plain") || draggedTaskId
    if (taskId) {
      moveTask(taskId, colId)
    }
    setDraggedTaskId(null)
  }

  return (
    <div
      role="region"
      aria-label="Kanban task board"
      className={cn(
        "flex w-full gap-4 overflow-x-auto pb-4 pt-1 scrollbar-thin select-none",
        className
      )}
      {...props}
    >
      {columns.map((col, colIdx) => {
        const isFirst = colIdx === 0
        const isLast = colIdx === columns.length - 1
        const columnTasks = col.taskIds.map((id) => tasks[id]).filter(Boolean)
        const isDragTarget = dragOverColId === col.id

        return (
          <div
            key={col.id}
            onDragOver={(e) => handleDragOver(e, col.id)}
            onDragLeave={() => setDragOverColId(null)}
            onDrop={(e) => handleDrop(e, col.id)}
            className={cn(
              "flex w-72 shrink-0 flex-col rounded-xl border border-border bg-card/60 p-3 shadow-xs transition-colors",
              isDragTarget && "border-primary/60 bg-primary/5 ring-2 ring-primary/20"
            )}
          >
            {/* Column Header */}
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {col.color && (
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: col.color }}
                  />
                )}
                <h3 className="text-xs font-bold text-foreground">{col.title}</h3>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-mono font-semibold text-muted-foreground">
                  {columnTasks.length}
                </span>
              </div>

              {onAddTask && (
                <button
                  type="button"
                  onClick={() => onAddTask(col.id)}
                  aria-label={`Add task to ${col.title}`}
                  className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Task Cards Column Body */}
            <div className="flex flex-col gap-2 min-h-[160px]">
              {columnTasks.length === 0 ? (
                <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-border/70 p-4 text-center text-xs text-muted-foreground">
                  Drop tasks here
                </div>
              ) : (
                columnTasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                  >
                    <TaskBoardCard
                      task={task}
                      onClick={onTaskClick}
                      canMoveLeft={!isFirst}
                      canMoveRight={!isLast}
                      isDragging={draggedTaskId === task.id}
                      onMoveLeft={() => {
                        const prevCol = columns[colIdx - 1]
                        if (prevCol) moveTask(task.id, prevCol.id)
                      }}
                      onMoveRight={() => {
                        const nextCol = columns[colIdx + 1]
                        if (nextCol) moveTask(task.id, nextCol.id)
                      }}
                      onDelete={(t) => onDeleteTask?.(t.id)}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
KanbanBoard.displayName = "KanbanBoard"
