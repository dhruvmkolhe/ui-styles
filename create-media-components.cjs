const fs = require('fs');
const path = require('path');

const write = (filepath, content) => {
  fs.writeFileSync(path.join(__dirname, filepath), content.trim() + '\n', 'utf8');
};

write('src/components/ui/image.tsx', `
import * as React from "react"
import { cn } from "@/lib/utils"
import { ImageIcon } from "lucide-react"

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, alt, fallbackText = "Failed to load", ...props }, ref) => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [hasError, setHasError] = React.useState(false)

    return (
      <div className={cn("relative overflow-hidden bg-muted flex items-center justify-center", className)}>
        {isLoading && !hasError && (
          <div className="absolute inset-0 animate-pulse bg-muted-foreground/10" />
        )}
        {hasError ? (
          <div className="flex flex-col items-center justify-center text-muted-foreground p-4 text-center h-full w-full">
            <ImageIcon className="h-8 w-8 mb-2 opacity-50" />
            <span className="text-xs">{fallbackText}</span>
          </div>
        ) : (
          <img
            ref={ref}
            alt={alt || "Image"}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300",
              isLoading ? "opacity-0" : "opacity-100"
            )}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false)
              setHasError(true)
            }}
            {...props}
          />
        )}
      </div>
    )
  }
)
Image.displayName = "Image"
`);

write('src/components/ui/image-gallery.tsx', `
import * as React from "react"
import { cn } from "@/lib/utils"

export interface ImageGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4
}

export const ImageGallery = React.forwardRef<HTMLDivElement, ImageGalleryProps>(
  ({ className, columns = 3, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid gap-4",
          {
            "grid-cols-1 sm:grid-cols-2": columns === 2,
            "grid-cols-1 sm:grid-cols-2 md:grid-cols-3": columns === 3,
            "grid-cols-1 sm:grid-cols-2 md:grid-cols-4": columns === 4,
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ImageGallery.displayName = "ImageGallery"

export const ImageGalleryItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative aspect-square overflow-hidden rounded-md group cursor-pointer", className)}
        {...props}
      >
        {children}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 pointer-events-none" />
      </div>
    )
  }
)
ImageGalleryItem.displayName = "ImageGalleryItem"
`);

write('src/components/ui/carousel.tsx', `
import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ className, children, ...props }, ref) => {
    const scrollRef = React.useRef<HTMLDivElement>(null)

    const scrollLeft = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
      }
    }

    const scrollRight = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
      }
    }

    return (
      <div className={cn("relative group", className)} ref={ref} {...props}>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {children}
        </div>
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-background/80 text-foreground shadow-sm opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-background/80 text-foreground shadow-sm opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    )
  }
)
Carousel.displayName = "Carousel"

export const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex-none w-[80%] sm:w-[60%] md:w-[40%] snap-center", className)}
      {...props}
    />
  )
)
CarouselItem.displayName = "CarouselItem"
`);

write('src/components/ui/video-player.tsx', `
import * as React from "react"
import { cn } from "@/lib/utils"

export interface VideoPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {}

export const VideoPlayer = React.forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ className, controls = true, ...props }, ref) => {
    return (
      <div className={cn("relative overflow-hidden rounded-md bg-black", className)}>
        <video
          ref={ref}
          className="w-full h-full object-contain"
          controls={controls}
          {...props}
        />
      </div>
    )
  }
)
VideoPlayer.displayName = "VideoPlayer"
`);

write('src/components/ui/audio-player.tsx', `
import * as React from "react"
import { cn } from "@/lib/utils"

export interface AudioPlayerProps extends React.AudioHTMLAttributes<HTMLAudioElement> {}

export const AudioPlayer = React.forwardRef<HTMLAudioElement, AudioPlayerProps>(
  ({ className, controls = true, ...props }, ref) => {
    return (
      <div className={cn("flex w-full items-center p-2 rounded-md bg-muted/50 border", className)}>
        <audio
          ref={ref}
          className="w-full h-10 outline-none"
          controls={controls}
          {...props}
        />
      </div>
    )
  }
)
AudioPlayer.displayName = "AudioPlayer"
`);

write('src/components/ui/lightbox.tsx', `
import * as React from "react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "./dialog"
import { X, Maximize2 } from "lucide-react"

export interface LightboxProps {
  children: React.ReactNode
  trigger?: React.ReactNode
  className?: string
  alt?: string
}

export const Lightbox = ({ children, trigger, className, alt = "Media" }: LightboxProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ? trigger : (
          <button className={cn("relative group overflow-hidden rounded-md cursor-zoom-in block w-full h-full", className)}>
            {children}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <Maximize2 className="text-white opacity-0 group-hover:opacity-100 w-8 h-8 drop-shadow-md transition-opacity" />
            </div>
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-fit h-fit p-0 overflow-hidden bg-transparent border-none shadow-none flex flex-col justify-center items-center">
        <DialogTitle className="sr-only">Lightbox: {alt}</DialogTitle>
        <DialogDescription className="sr-only">Viewing {alt} in fullscreen.</DialogDescription>
        <div className="relative w-full h-full flex items-center justify-center">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}
`);

write('src/components/ui/media-card.tsx', `
import * as React from "react"
import { cn } from "@/lib/utils"

export interface MediaCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MediaCard = React.forwardRef<HTMLDivElement, MediaCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
MediaCard.displayName = "MediaCard"

export const MediaCardImage = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("relative w-full overflow-hidden", className)} {...props}>
        {children}
      </div>
    )
  }
)
MediaCardImage.displayName = "MediaCardImage"

export const MediaCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("p-4 flex flex-col flex-1", className)} {...props}>
        {children}
      </div>
    )
  }
)
MediaCardContent.displayName = "MediaCardContent"
`);

write('src/components/ui/code-block.tsx', `
import * as React from "react"
import { cn } from "@/lib/utils"
import { Check, Copy } from "lucide-react"

export interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  code: string
  language?: string
}

export const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ className, code, language, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = () => {
      navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    return (
      <div className="relative group rounded-md overflow-hidden bg-slate-950 text-slate-50 border border-slate-800 my-4">
        {language && (
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 font-mono">
            <span>{language}</span>
          </div>
        )}
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 rounded-md bg-slate-800/50 hover:bg-slate-800 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Copy code"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </button>
        <pre
          ref={ref}
          className={cn("p-4 overflow-x-auto text-sm font-mono leading-relaxed", className)}
          {...props}
        >
          <code>{code}</code>
        </pre>
      </div>
    )
  }
)
CodeBlock.displayName = "CodeBlock"
`);

write('src/components/ui/markdown-preview.tsx', `
import * as React from "react"
import { cn } from "@/lib/utils"

export interface MarkdownPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string
}

const parseMarkdown = (text: string) => {
  // A very basic Markdown parser returning React nodes.
  // We use this because the environment lacks a full markdown library and we cannot execute arbitrary HTML safely.
  const blocks = text.split(/\\n\\n+/);
  
  return blocks.map((block, i) => {
    // Headers
    const headerMatch = block.match(/^(#{1,6})\\s+(.+)$/);
    if (headerMatch) {
      const level = headerMatch[1].length;
      const content = headerMatch[2];
      const Tag = \`h\${level}\` as keyof JSX.IntrinsicElements;
      const classes = [
        "text-3xl font-bold mt-6 mb-4",
        "text-2xl font-bold mt-5 mb-3",
        "text-xl font-bold mt-4 mb-2",
        "text-lg font-bold mt-4 mb-2",
        "text-base font-bold mt-3 mb-1",
        "text-sm font-bold mt-3 mb-1"
      ][level - 1];
      
      return <Tag key={i} className={classes}>{parseInline(content)}</Tag>;
    }

    // Blockquote
    if (block.startsWith('> ')) {
      const content = block.replace(/^>\\s+/gm, '');
      return (
        <blockquote key={i} className="border-l-4 border-primary/30 pl-4 py-1 my-4 italic text-muted-foreground bg-muted/20 rounded-r">
          {parseInline(content)}
        </blockquote>
      )
    }

    // Lists (simplified)
    if (block.match(/^(?:-|\\*|\\d+\\.)\\s+/m)) {
      const items = block.split(/\\n/);
      const isOrdered = /^\\d+\\./.test(items[0]);
      const ListTag = isOrdered ? 'ol' : 'ul';
      const listClass = isOrdered ? 'list-decimal list-inside my-4 space-y-1' : 'list-disc list-inside my-4 space-y-1';
      
      return (
        <ListTag key={i} className={listClass}>
          {items.map((item, j) => {
            const cleanItem = item.replace(/^(?:-|\\*|\\d+\\.)\\s+/, '');
            return <li key={j}>{parseInline(cleanItem)}</li>
          })}
        </ListTag>
      )
    }
    
    // Code block
    if (block.startsWith('\`\`\`')) {
      const lines = block.split('\\n');
      const lang = lines[0].replace('\`\`\`', '').trim();
      const code = lines.slice(1, -1).join('\\n'); // remove last \`\`\`
      return (
        <div key={i} className="my-4 rounded-md bg-slate-950 p-4 overflow-x-auto">
          {lang && <div className="text-xs text-slate-400 mb-2 font-mono">{lang}</div>}
          <pre className="text-sm font-mono text-slate-50"><code>{code}</code></pre>
        </div>
      )
    }

    // Default Paragraph
    return (
      <p key={i} className="my-2 leading-relaxed">
        {parseInline(block)}
      </p>
    )
  });
};

const parseInline = (text: string) => {
  // Simple bold, italic, code
  const parts = text.split(/(\\*\\*.*?\\*\\*|\\*.*?\\*|\`.*?\`|\\[.*?\\]\\(.*?\\))/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i} className="italic">{part.slice(1, -1)}</em>
    }
    if (part.startsWith('\`') && part.endsWith('\`')) {
      return <code key={i} className="bg-muted px-1.5 py-0.5 rounded-sm font-mono text-sm">{part.slice(1, -1)}</code>
    }
    const linkMatch = part.match(/\\[(.*?)\\]\\((.*?)\\)/);
    if (linkMatch) {
      return <a key={i} href={linkMatch[2]} className="text-primary hover:underline underline-offset-4" target="_blank" rel="noopener noreferrer">{linkMatch[1]}</a>
    }
    return <React.Fragment key={i}>{part}</React.Fragment>
  });
};

export const MarkdownPreview = React.forwardRef<HTMLDivElement, MarkdownPreviewProps>(
  ({ className, content, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("text-foreground", className)} {...props}>
        {parseMarkdown(content)}
      </div>
    )
  }
)
MarkdownPreview.displayName = "MarkdownPreview"
`);

write('src/components/ui/file-preview.tsx', `
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
`);

console.log("Created 10 UI components successfully.");
