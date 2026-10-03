"use client"

import * as React from "react"
import { UploadCloud, File, AlertCircle, X, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface FileRejection {
  file: File
  errors: string[]
}

export interface FileUploadDropzoneProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrop"> {
  onFilesAccepted?: (files: File[]) => void
  onFilesRejected?: (rejections: FileRejection[]) => void
  accept?: string[] // e.g. ["image/*", ".pdf", "application/pdf"]
  maxSize?: number // in bytes (e.g. 5 * 1024 * 1024 for 5MB)
  minSize?: number // in bytes
  maxFiles?: number
  multiple?: boolean
  disabled?: boolean
  helperText?: string
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`
}

export const FileUploadDropzone = React.forwardRef<HTMLDivElement, FileUploadDropzoneProps>(
  (
    {
      className,
      onFilesAccepted,
      onFilesRejected,
      accept,
      maxSize = 10 * 1024 * 1024, // 10MB default
      minSize = 0,
      maxFiles = 5,
      multiple = true,
      disabled = false,
      helperText,
      children,
      ...props
    },
    ref
  ) => {
    const [isDragOver, setIsDragOver] = React.useState(false)
    const [isDragReject, setIsDragReject] = React.useState(false)
    const [recentFiles, setRecentFiles] = React.useState<File[]>([])
    const [rejections, setRejections] = React.useState<FileRejection[]>([])

    const inputRef = React.useRef<HTMLInputElement | null>(null)

    const validateFile = (file: File): string[] => {
      const errors: string[] = []

      if (maxSize && file.size > maxSize) {
        errors.push(`File exceeds maximum size of ${formatFileSize(maxSize)}`)
      }
      if (minSize && file.size < minSize) {
        errors.push(`File is smaller than minimum size of ${formatFileSize(minSize)}`)
      }

      if (accept && accept.length > 0) {
        const fileExt = `.${file.name.split(".").pop()?.toLowerCase()}`
        const fileType = file.type.toLowerCase()

        const isAccepted = accept.some((pattern) => {
          const p = pattern.toLowerCase()
          if (p.startsWith(".")) {
            return fileExt === p
          }
          if (p.endsWith("/*")) {
            const prefix = p.replace("/*", "")
            return fileType.startsWith(prefix)
          }
          return fileType === p
        })

        if (!isAccepted) {
          errors.push(`File type not allowed (expected: ${accept.join(", ")})`)
        }
      }

      return errors
    }

    const processFiles = (fileList: FileList | File[]) => {
      if (disabled) return
      const rawFiles = Array.from(fileList)

      if (maxFiles && rawFiles.length > maxFiles) {
        const err: FileRejection = {
          file: rawFiles[0],
          errors: [`Cannot upload more than ${maxFiles} files at once`],
        }
        setRejections([err])
        onFilesRejected?.([err])
        return
      }

      const validFiles: File[] = []
      const invalidFiles: FileRejection[] = []

      rawFiles.forEach((file) => {
        const errors = validateFile(file)
        if (errors.length > 0) {
          invalidFiles.push({ file, errors })
        } else {
          validFiles.push(file)
        }
      })

      setRecentFiles(validFiles)
      setRejections(invalidFiles)

      if (validFiles.length > 0) {
        onFilesAccepted?.(validFiles)
      }
      if (invalidFiles.length > 0) {
        onFilesRejected?.(invalidFiles)
      }
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      if (disabled) return
      setIsDragOver(true)
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragOver(false)
      setIsDragReject(false)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragOver(false)
      setIsDragReject(false)
      if (disabled) return

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files)
      }
    }

    const handleClick = () => {
      if (disabled) return
      inputRef.current?.click()
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        handleClick()
      }
    }

    const removeFile = (idx: number) => {
      const updated = recentFiles.filter((_, i) => i !== idx)
      setRecentFiles(updated)
      onFilesAccepted?.(updated)
    }

    return (
      <div className="w-full space-y-3">
        <div
          ref={ref}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label="Upload files dropzone"
          aria-disabled={disabled}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-card/60 p-8 text-center transition-all cursor-pointer select-none outline-none",
            "hover:border-primary/60 hover:bg-muted/40",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            isDragOver && "border-primary bg-primary/5 scale-[1.005]",
            isDragReject && "border-destructive bg-destructive/5",
            disabled && "cursor-not-allowed opacity-50 pointer-events-none",
            className
          )}
          {...props}
        >
          <input
            ref={inputRef}
            type="file"
            multiple={multiple}
            accept={accept?.join(",")}
            onChange={(e) => {
              if (e.target.files) {
                processFiles(e.target.files)
              }
            }}
            className="hidden"
          />

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
            <UploadCloud className="h-6 w-6" />
          </div>

          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">
              {isDragOver ? "Drop files here to upload" : "Click to upload or drag and drop"}
            </p>
            <p className="text-xs text-muted-foreground">
              {helperText || `Up to ${maxFiles} files, max ${formatFileSize(maxSize)} each.`}
            </p>
            {accept && accept.length > 0 && (
              <p className="text-[11px] font-mono text-muted-foreground">
                Supported: {accept.join(", ")}
              </p>
            )}
          </div>
        </div>

        {/* Accepted files chips */}
        {recentFiles.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-muted-foreground">Selected Files ({recentFiles.length})</span>
            <div className="flex flex-wrap gap-2">
              {recentFiles.map((f, i) => (
                <div
                  key={`${f.name}-${i}`}
                  className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1 text-xs shadow-2xs"
                >
                  <File className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="font-medium max-w-[150px] truncate">{f.name}</span>
                  <span className="text-[10px] text-muted-foreground">({formatFileSize(f.size)})</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFile(i)
                    }}
                    className="ml-1 text-muted-foreground hover:text-foreground"
                    aria-label={`Remove ${f.name}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rejection errors */}
        {rejections.length > 0 && (
          <div className="space-y-1 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive">
            <div className="flex items-center gap-1.5 font-semibold">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>Some files could not be added:</span>
            </div>
            <ul className="list-disc pl-5 space-y-0.5 text-[11px]">
              {rejections.map((rej, i) => (
                <li key={i}>
                  <strong className="font-medium">{rej.file.name}:</strong> {rej.errors.join("; ")}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
)
FileUploadDropzone.displayName = "FileUploadDropzone"
