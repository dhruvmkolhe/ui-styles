"use client"

import * as React from "react"
import { FolderOpen, Inbox, Search, FileQuestion } from "lucide-react"
import { cn } from "@/lib/utils"

export type EmptyStatePreset = "generic" | "search" | "data" | "inbox"

const PRESET_CONFIG: Record<
  EmptyStatePreset,
  { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }
> = {
  generic: {
    icon: FolderOpen,
    title: "No content available",
    desc: "There are currently no items or resources to display in this view.",
  },
  search: {
    icon: Search,
    title: "No matching results",
    desc: "We couldn't find anything matching your query. Check spelling or adjust filters.",
  },
  data: {
    icon: FileQuestion,
    title: "No data recorded yet",
    desc: "Get started by creating your first entry or importing existing records.",
  },
  inbox: {
    icon: Inbox,
    title: "All caught up",
    desc: "No pending notifications or review tasks requiring your attention.",
  },
}

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  preset?: EmptyStatePreset
  icon?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  secondaryAction?: React.ReactNode
  compact?: boolean
}

export function EmptyState({
  preset = "generic",
  icon,
  title,
  description,
  action,
  secondaryAction,
  compact = false,
  className,
  children,
  ...props
}: EmptyStateProps) {
  const cfg = PRESET_CONFIG[preset] || PRESET_CONFIG.generic
  const IconComp = cfg.icon

  const resolvedTitle = title !== undefined ? title : cfg.title
  const resolvedDesc = description !== undefined ? description : cfg.desc

  return (
    <div
      role="region"
      aria-label="Empty state"
      className={cn(
        "flex flex-col items-center justify-center text-center",
        compact ? "p-4 sm:p-6" : "p-8 sm:p-12",
        className
      )}
      {...props}
    >
      <div className="mb-3.5 flex h-12 w-12 items-center justify-center rounded-full bg-muted/60 text-muted-foreground ring-8 ring-muted/20">
        {icon || <IconComp className="h-6 w-6 stroke-[1.75]" />}
      </div>

      {resolvedTitle && (
        <h4 className="text-base font-semibold tracking-tight text-foreground max-w-sm">
          {resolvedTitle}
        </h4>
      )}

      {resolvedDesc && (
        <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-muted-foreground">
          {resolvedDesc}
        </p>
      )}

      {children && <div className="mt-4">{children}</div>}

      {(action || secondaryAction) && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  )
}
