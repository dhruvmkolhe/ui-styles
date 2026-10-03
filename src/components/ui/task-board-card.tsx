"use client"

import * as React from "react"
import {
  Calendar,
  CheckSquare,
  Clock,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Trash2,
  AlertCircle,
  Flame,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type TaskPriority = "low" | "medium" | "high" | "urgent"

export interface TaskAssignee {
  id: string
  name: string
  avatar?: string
}

export interface TaskCardData {
  id: string
  title: string
  description?: string
  priority?: TaskPriority
  labels?: string[]
  assignees?: TaskAssignee[]
  dueDate?: string
  subtasks?: { total: number; completed: number }
  status?: string
}

export interface TaskBoardCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  task: TaskCardData
  onClick?: (task: TaskCardData) => void
  onMoveLeft?: (task: TaskCardData) => void
  onMoveRight?: (task: TaskCardData) => void
  onDelete?: (task: TaskCardData) => void
  canMoveLeft?: boolean
  canMoveRight?: boolean
  isDragging?: boolean
}

export function getPriorityBadge(priority?: TaskPriority) {
  switch (priority) {
    case "urgent":
      return (
        <span className="inline-flex items-center gap-1 rounded bg-rose-500/15 text-rose-600 dark:text-rose-400 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
          <Flame className="h-3 w-3" /> Urgent
        </span>
      )
    case "high":
      return (
        <span className="inline-flex items-center gap-1 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
          <AlertCircle className="h-3 w-3" /> High
        </span>
      )
    case "medium":
      return (
        <span className="rounded bg-blue-500/15 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
          Medium
        </span>
      )
    case "low":
    default:
      return (
        <span className="rounded bg-muted text-muted-foreground px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider">
          Low
        </span>
      )
  }
}

export const TaskBoardCard = React.forwardRef<HTMLDivElement, TaskBoardCardProps>(
  (
    {
      className,
      task,
      onClick,
      onMoveLeft,
      onMoveRight,
      onDelete,
      canMoveLeft = false,
      canMoveRight = false,
      isDragging = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="article"
        tabIndex={0}
        aria-label={`Task: ${task.title}`}
        onClick={() => onClick?.(task)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onClick?.(task)
          }
        }}
        className={cn(
          "group relative flex flex-col gap-2.5 rounded-lg border border-border bg-card p-3 shadow-xs transition-all cursor-pointer select-none outline-none",
          "hover:border-primary/50 hover:shadow-md",
          "focus-visible:ring-2 focus-visible:ring-ring",
          isDragging && "opacity-50 rotate-1 shadow-lg scale-95",
          className
        )}
        {...props}
      >
        {/* Top: Labels & Priority */}
        <div className="flex items-center justify-between gap-1.5">
          <div className="flex flex-wrap items-center gap-1">
            {task.labels?.map((label) => (
              <span
                key={label}
                className="rounded bg-muted/80 text-foreground/80 px-1.5 py-0.2 text-[10px] font-medium"
              >
                {label}
              </span>
            ))}
          </div>
          {getPriorityBadge(task.priority)}
        </div>

        {/* Title & Description */}
        <div>
          <h4 className="text-xs font-bold text-foreground leading-snug line-clamp-2">
            {task.title}
          </h4>
          {task.description && (
            <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1">
              {task.description}
            </p>
          )}
        </div>

        {/* Footer meta: Due date, subtasks, assignees */}
        <div className="mt-1 flex items-center justify-between gap-2 border-t border-border/60 pt-2 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-2.5">
            {task.dueDate && (
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span className="font-mono">{task.dueDate}</span>
              </span>
            )}

            {task.subtasks && (
              <span className="inline-flex items-center gap-1">
                <CheckSquare className="h-3 w-3" />
                <span>
                  {task.subtasks.completed}/{task.subtasks.total}
                </span>
              </span>
            )}
          </div>

          {/* Assignees avatars */}
          {task.assignees && task.assignees.length > 0 && (
            <div className="flex -space-x-1.5 overflow-hidden">
              {task.assignees.map((assignee) => (
                <div
                  key={assignee.id}
                  title={assignee.name}
                  className="flex h-5 w-5 items-center justify-center rounded-full border border-card bg-primary/20 text-[9px] font-bold text-primary ring-1 ring-background"
                >
                  {assignee.avatar ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={assignee.avatar} alt={assignee.name} className="h-full w-full rounded-full" />
                  ) : (
                    assignee.name.slice(0, 1)
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hover / Keyboard Move Action Controls */}
        <div className="absolute top-1.5 right-1.5 hidden group-hover:flex items-center gap-0.5 rounded bg-card/95 backdrop-blur-xs p-0.5 border border-border shadow-xs">
          {canMoveLeft && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onMoveLeft?.(task)
              }}
              title="Move left"
              className="p-1 hover:text-foreground text-muted-foreground"
            >
              <ChevronLeft className="h-3 w-3" />
            </button>
          )}
          {canMoveRight && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onMoveRight?.(task)
              }}
              title="Move right"
              className="p-1 hover:text-foreground text-muted-foreground"
            >
              <ChevronRight className="h-3 w-3" />
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(task)
              }}
              title="Delete task"
              className="p-1 hover:text-destructive text-muted-foreground"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    )
  }
)
TaskBoardCard.displayName = "TaskBoardCard"
