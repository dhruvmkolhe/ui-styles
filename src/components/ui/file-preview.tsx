import * as React from "react"
import { cn } from "@/lib/utils"
import { File, Download, FileText, FileImage, FileAudio, FileVideo, FileArchive } from "lucide-react"

export interface FilePreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  fileName: string
  fileSize?: string
  fileType?: "image" | "video" | "audio" | "document" | "archive" | "unknown"
  onDownload?: () => void
}

export const FilePreview = React.forwardRef<HTMLDivElement, FilePreviewProps>(
  ({ className, fileName, fileSize, fileType = "unknown", onDownload, ...props }, ref) => {
    
    const getIcon = () => {
      switch (fileType) {
        case "image": return <FileImage className="w-8 h-8 text-blue-500" />
        case "video": return <FileVideo className="w-8 h-8 text-purple-500" />
        case "audio": return <FileAudio className="w-8 h-8 text-yellow-500" />
        case "document": return <FileText className="w-8 h-8 text-green-500" />
        case "archive": return <FileArchive className="w-8 h-8 text-red-500" />
        default: return <File className="w-8 h-8 text-muted-foreground" />
      }
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-4 p-4 rounded-lg border bg-card text-card-foreground shadow-sm transition-colors hover:bg-muted/50", className)}
        {...props}
      >
        <div className="flex items-center justify-center w-12 h-12 rounded-md bg-muted">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium truncate">{fileName}</h4>
          {fileSize && (
            <p className="text-xs text-muted-foreground mt-1">{fileSize}</p>
          )}
        </div>
        {onDownload && (
          <button
            onClick={onDownload}
            className="p-2 rounded-full hover:bg-background border shadow-sm transition-colors"
            aria-label="Download file"
          >
            <Download className="w-4 h-4 text-foreground" />
          </button>
        )}
      </div>
    )
  }
)
FilePreview.displayName = "FilePreview"
