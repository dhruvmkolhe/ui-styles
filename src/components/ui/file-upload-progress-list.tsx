"use client"

import * as React from "react"
import {
  FileText,
  FileImage,
  FileArchive,
  FileVideo,
  File,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  X,
  Pause,
  Play,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { formatFileSize } from "@/components/ui/file-upload-dropzone"

export type UploadStatus = "uploading" | "completed" | "error" | "paused" | "cancelled"

export interface UploadFileItem {
  id: string
  name: string
  size: number
  progress: number // 0 to 100
  status: UploadStatus
  errorMessage?: string
  simulated?: boolean
}

export interface FileUploadProgressListProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onPause"> {
  files: UploadFileItem[]
  onRetry?: (fileId: string) => void
  onCancel?: (fileId: string) => void
  onPause?: (fileId: string) => void
  onResume?: (fileId: string) => void
  onRemove?: (fileId: string) => void
  onClearCompleted?: () => void
  showSimulatedBadge?: boolean
}

function getFileIcon(filename: string) {
  const ext = filename.split(".").pop()?.toLowerCase() || ""
  if (["png", "jpg", "jpeg", "svg", "webp", "gif"].includes(ext)) {
    return <FileImage className="h-4 w-4 text-blue-500" />
  }
  if (["zip", "tar", "gz", "rar", "7z"].includes(ext)) {
    return <FileArchive className="h-4 w-4 text-amber-500" />
  }
  if (["mp4", "mov", "webm", "avi"].includes(ext)) {
    return <FileVideo className="h-4 w-4 text-purple-500" />
  }
  if (["pdf", "doc", "docx", "txt", "md"].includes(ext)) {
    return <FileText className="h-4 w-4 text-emerald-500" />
  }
  return <File className="h-4 w-4 text-muted-foreground" />
}

export const FileUploadProgressList = React.forwardRef<
  HTMLDivElement,
  FileUploadProgressListProps
>(
  (
    {
      className,
      files = [],
      onRetry,
      onCancel,
      onPause,
      onResume,
      onRemove,
      onClearCompleted,
      showSimulatedBadge = true,
      ...props
    },
    ref
  ) => {
    const hasCompleted = files.some((f) => f.status === "completed")

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Upload progress tracker"
        className={cn("w-full space-y-3", className)}
        {...props}
      >
        {/* Header toolbar */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">Upload Queue ({files.length})</span>
            {showSimulatedBadge && (
              <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                Client-Side Demo
              </span>
            )}
          </div>
          {hasCompleted && onClearCompleted && (
            <button
              type="button"
              onClick={onClearCompleted}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear Completed
            </button>
          )}
        </div>

        {/* Empty state */}
        {files.length === 0 && (
          <div className="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
            No files currently in the upload queue.
          </div>
        )}

        {/* List of files */}
        <div className="space-y-2">
          {files.map((file) => {
            const isUploading = file.status === "uploading"
            const isCompleted = file.status === "completed"
            const isError = file.status === "error"
            const isPaused = file.status === "paused"

            return (
              <div
                key={file.id}
                className={cn(
                  "flex flex-col gap-1.5 rounded-lg border border-border bg-card p-3 shadow-xs transition-all",
                  isCompleted && "border-emerald-500/20 bg-emerald-500/5",
                  isError && "border-destructive/30 bg-destructive/5"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-muted/60">
                      {getFileIcon(file.name)}
                    </div>
                    <div className="min-w-0 truncate">
                      <p className="text-xs font-semibold truncate text-foreground">
                        {file.name}
                      </p>
                      <p className="text-[11px] text-muted-foreground font-mono">
                        {formatFileSize(file.size)}
                        {isUploading && ` • ${file.progress}%`}
                        {isPaused && " • Paused"}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Status badge */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {isUploading && (
                      <>
                        {onPause && (
                          <button
                            type="button"
                            onClick={() => onPause(file.id)}
                            aria-label={`Pause upload of ${file.name}`}
                            className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                          >
                            <Pause className="h-3.5 w-3.5" />
                          </button>
                        )}
                        {onCancel && (
                          <button
                            type="button"
                            onClick={() => onCancel(file.id)}
                            aria-label={`Cancel upload of ${file.name}`}
                            className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </>
                    )}

                    {isPaused && onResume && (
                      <button
                        type="button"
                        onClick={() => onResume(file.id)}
                        aria-label={`Resume upload of ${file.name}`}
                        className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        <Play className="h-3.5 w-3.5" />
                      </button>
                    )}

                    {isError && onRetry && (
                      <button
                        type="button"
                        onClick={() => onRetry(file.id)}
                        aria-label={`Retry upload of ${file.name}`}
                        className="inline-flex items-center gap-1 rounded bg-destructive/10 px-2 py-0.5 text-[11px] font-medium text-destructive hover:bg-destructive/20"
                      >
                        <RotateCcw className="h-3 w-3" />
                        <span>Retry</span>
                      </button>
                    )}

                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Done</span>
                      </span>
                    )}

                    {onRemove && (
                      <button
                        type="button"
                        onClick={() => onRemove(file.id)}
                        aria-label={`Remove ${file.name} from list`}
                        className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                {(isUploading || isPaused) && (
                  <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-300",
                        isPaused ? "bg-amber-500" : "bg-primary"
                      )}
                      style={{ width: `${Math.min(100, Math.max(0, file.progress))}%` }}
                    />
                  </div>
                )}

                {/* Error message */}
                {isError && file.errorMessage && (
                  <div className="flex items-center gap-1 text-[11px] text-destructive">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    <span className="truncate">{file.errorMessage}</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
FileUploadProgressList.displayName = "FileUploadProgressList"
