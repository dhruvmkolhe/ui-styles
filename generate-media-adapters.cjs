const fs = require('fs');
const path = require('path');

const write = (filepath, content) => {
  fs.writeFileSync(path.join(__dirname, filepath), content.trim() + '\n', 'utf8');
};

write('src/components/styles/common-media-code.ts', `
import type { Mode, StyleSlug } from "@/lib/styles/types"
import { getStyleFormKit } from "./common-form-kit"

export function getMediaCodeForStyle(slug: StyleSlug, componentId: string, mode: Mode): string {
  const k = getStyleFormKit(slug, mode)

  switch (componentId) {
    case "image":
      return \`<!-- \${k.styleName} · Image -->\\n<div class="relative overflow-hidden \${k.radius} bg-muted w-full h-64">\\n  <img src="..." alt="Image" class="w-full h-full object-cover" />\\n</div>\`
    case "image-gallery":
      return \`<!-- \${k.styleName} · Image Gallery -->\\n<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">\\n  <div class="relative aspect-square overflow-hidden \${k.radius} group cursor-pointer">\\n    <img src="..." class="w-full h-full object-cover" />\\n  </div>\\n</div>\`
    case "carousel":
      return \`<!-- \${k.styleName} · Carousel -->\\n<div class="relative group w-full">\\n  <div class="flex overflow-x-auto snap-x snap-mandatory gap-4">\\n    <div class="flex-none w-[80%] snap-center \${k.radius}">...</div>\\n  </div>\\n</div>\`
    case "video-player":
      return \`<!-- \${k.styleName} · Video Player -->\\n<div class="relative overflow-hidden \${k.radius} bg-black w-full aspect-video">\\n  <video controls class="w-full h-full object-contain"></video>\\n</div>\`
    case "audio-player":
      return \`<!-- \${k.styleName} · Audio Player -->\\n<div class="flex w-full items-center p-2 \${k.radius} bg-muted/50 border">\\n  <audio controls class="w-full h-10 outline-none"></audio>\\n</div>\`
    case "lightbox":
      return \`<!-- \${k.styleName} · Lightbox -->\\n<button class="relative group overflow-hidden \${k.radius} cursor-zoom-in block w-full h-full">\\n  <img src="..." />\\n</button>\`
    case "media-card":
      return \`<!-- \${k.styleName} · Media Card -->\\n<div class="\${k.radius} border bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col">\\n  <div class="relative w-full overflow-hidden">...</div>\\n  <div class="p-4 flex flex-col flex-1">...</div>\\n</div>\`
    case "code-block":
      return \`<!-- \${k.styleName} · Code Block -->\\n<div class="relative group \${k.radius} overflow-hidden bg-slate-950 text-slate-50 border border-slate-800 my-4">\\n  <pre class="p-4 overflow-x-auto text-sm font-mono leading-relaxed">...</pre>\\n</div>\`
    case "markdown-preview":
      return \`<!-- \${k.styleName} · Markdown Preview -->\\n<div class="text-foreground">\\n  <h1 class="text-2xl font-bold mt-5 mb-3">...</h1>\\n</div>\`
    case "file-preview":
      return \`<!-- \${k.styleName} · File Preview -->\\n<div class="flex items-center gap-4 p-4 \${k.radius} border bg-card text-card-foreground shadow-sm transition-colors hover:bg-muted/50">\\n  <div class="flex items-center justify-center w-12 h-12 \${k.radius} bg-muted">...</div>\\n  <div class="flex-1 min-w-0">...</div>\\n</div>\`
    default:
      return \`<!-- \${k.styleName} · Media Component -->\`
  }
}
`);

write('src/components/styles/common-media-previews.tsx', `
import React from "react"
import type { Mode, StyleSlug } from "@/lib/styles/types"
import { getStyleFormKit } from "./common-form-kit"
import { Image } from "@/components/ui/image"
import { ImageGallery, ImageGalleryItem } from "@/components/ui/image-gallery"
import { Carousel, CarouselItem } from "@/components/ui/carousel"
import { VideoPlayer } from "@/components/ui/video-player"
import { AudioPlayer } from "@/components/ui/audio-player"
import { Lightbox } from "@/components/ui/lightbox"
import { MediaCard, MediaCardImage, MediaCardContent } from "@/components/ui/media-card"
import { CodeBlock } from "@/components/ui/code-block"
import { MarkdownPreview } from "@/components/ui/markdown-preview"
import { FilePreview } from "@/components/ui/file-preview"

export function ImagePreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  return (
    <div className={\`p-6 \${k.panel} \${k.radius} border space-y-6 max-w-lg mx-auto\`}>
      <Image src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80" alt="Gradient" className={\`w-full h-64 \${k.radius}\`} fallbackText="Image failed to load" />
    </div>
  )
}

export function ImageGalleryPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  return (
    <div className={\`p-6 \${k.panel} \${k.radius} border space-y-6 max-w-2xl mx-auto\`}>
      <ImageGallery columns={3}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ImageGalleryItem key={i} className={k.radius}>
            <Image src={\`https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80&sig=\${i}\`} alt={\`Gallery image \${i}\`} className="w-full h-full object-cover" />
          </ImageGalleryItem>
        ))}
      </ImageGallery>
    </div>
  )
}

export function CarouselPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  return (
    <div className={\`p-6 \${k.panel} \${k.radius} border space-y-6 max-w-2xl mx-auto\`}>
      <Carousel>
        {[1, 2, 3, 4].map((i) => (
          <CarouselItem key={i}>
            <Image src={\`https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80&sig=\${i}\`} alt={\`Slide \${i}\`} className={\`aspect-video \${k.radius} w-full h-full\`} />
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  )
}

export function VideoPlayerPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  return (
    <div className={\`p-6 \${k.panel} \${k.radius} border space-y-6 max-w-2xl mx-auto\`}>
      <VideoPlayer src="https://www.w3schools.com/html/mov_bbb.mp4" className={\`w-full aspect-video \${k.radius}\`} />
    </div>
  )
}

export function AudioPlayerPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  return (
    <div className={\`p-6 \${k.panel} \${k.radius} border space-y-6 max-w-md mx-auto\`}>
      <AudioPlayer src="https://www.w3schools.com/html/horse.ogg" className={\`w-full \${k.radius}\`} />
    </div>
  )
}

export function LightboxPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  return (
    <div className={\`p-6 \${k.panel} \${k.radius} border space-y-6 max-w-md mx-auto flex justify-center\`}>
      <div className="w-64 h-64">
        <Lightbox alt="A beautiful landscape" className={k.radius}>
          <Image src="https://images.unsplash.com/photo-1506744626753-1fa7604eb466?w=1200&q=80" alt="Landscape" className="object-cover w-full h-full" />
        </Lightbox>
      </div>
    </div>
  )
}

export function MediaCardPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  return (
    <div className={\`p-6 \${k.panel} \${k.radius} border space-y-6 max-w-md mx-auto\`}>
      <MediaCard className={k.radius}>
        <MediaCardImage>
          <Image src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=800&q=80" alt="Photography" className="aspect-video" />
        </MediaCardImage>
        <MediaCardContent>
          <h3 className={\`font-semibold text-lg \${k.strong}\`}>Creative Photography</h3>
          <p className={\`text-sm mt-2 \${k.muted}\`}>Explore the art of capturing moments with precision and creativity.</p>
        </MediaCardContent>
      </MediaCard>
    </div>
  )
}

export function CodeBlockPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  return (
    <div className={\`p-6 \${k.panel} \${k.radius} border space-y-6 max-w-2xl mx-auto\`}>
      <CodeBlock language="typescript" code={\`function greet(name: string) {\\n  console.log(\\\`Hello, \\\${name}!\\\`);\\n}\`} className={k.radius} />
    </div>
  )
}

export function MarkdownPreviewComponent({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const markdown = \`# Welcome to Markdown\\n\\nThis is a **bold** statement and this is *italic*.\\n\\n- Item 1\\n- Item 2\\n\\n> A blockquote goes here.\\n\\n\\\`\\\`\\\`javascript\\nconst test = true;\\nconsole.log(test);\\n\\\`\\\`\\\`\`
  return (
    <div className={\`p-6 \${k.panel} \${k.radius} border max-w-2xl mx-auto\`}>
      <MarkdownPreview content={markdown} />
    </div>
  )
}

export function FilePreviewComponent({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  return (
    <div className={\`p-6 \${k.panel} \${k.radius} border space-y-4 max-w-md mx-auto\`}>
      <FilePreview fileName="annual-report.pdf" fileSize="2.4 MB" fileType="document" onDownload={() => alert('Downloading...')} className={k.radius} />
      <FilePreview fileName="presentation.key" fileSize="14.1 MB" fileType="unknown" className={k.radius} />
      <FilePreview fileName="vacation.jpg" fileSize="4.2 MB" fileType="image" className={k.radius} />
    </div>
  )
}
`);

write('src/components/styles/common-media-defs.tsx', `
import React from "react"
import type { ComponentDef, Mode, StyleSlug } from "@/lib/styles/types"
import {
  ImagePreview,
  ImageGalleryPreview,
  CarouselPreview,
  VideoPlayerPreview,
  AudioPlayerPreview,
  LightboxPreview,
  MediaCardPreview,
  CodeBlockPreview,
  MarkdownPreviewComponent,
  FilePreviewComponent
} from "./common-media-previews"
import { getMediaCodeForStyle } from "./common-media-code"

export function getCommonMediaDefs(slug: StyleSlug): ComponentDef[] {
  return [
    {
      id: "image",
      name: "Image",
      description: "Responsive image wrapper with loading and error states.",
      Preview: ({ mode }: { mode: Mode }) => <ImagePreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getMediaCodeForStyle(slug, "image", mode),
    },
    {
      id: "image-gallery",
      name: "Image Gallery",
      description: "A responsive grid layout for displaying a collection of images.",
      Preview: ({ mode }: { mode: Mode }) => <ImageGalleryPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getMediaCodeForStyle(slug, "image-gallery", mode),
    },
    {
      id: "carousel",
      name: "Carousel",
      description: "A simple horizontal scrolling carousel using CSS scroll snap.",
      Preview: ({ mode }: { mode: Mode }) => <CarouselPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getMediaCodeForStyle(slug, "carousel", mode),
    },
    {
      id: "video-player",
      name: "Video Player",
      description: "A responsive wrapper for HTML5 video with native controls.",
      Preview: ({ mode }: { mode: Mode }) => <VideoPlayerPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getMediaCodeForStyle(slug, "video-player", mode),
    },
    {
      id: "audio-player",
      name: "Audio Player",
      description: "A styled wrapper for HTML5 audio playback.",
      Preview: ({ mode }: { mode: Mode }) => <AudioPlayerPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getMediaCodeForStyle(slug, "audio-player", mode),
    },
    {
      id: "lightbox",
      name: "Lightbox",
      description: "A modal overlay for viewing media in fullscreen mode.",
      Preview: ({ mode }: { mode: Mode }) => <LightboxPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getMediaCodeForStyle(slug, "lightbox", mode),
    },
    {
      id: "media-card",
      name: "Media Card",
      description: "A specialized card designed for highlighting media content.",
      Preview: ({ mode }: { mode: Mode }) => <MediaCardPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getMediaCodeForStyle(slug, "media-card", mode),
    },
    {
      id: "code-block",
      name: "Code Block",
      description: "Syntax highlighting wrapper with a copy to clipboard button.",
      Preview: ({ mode }: { mode: Mode }) => <CodeBlockPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getMediaCodeForStyle(slug, "code-block", mode),
    },
    {
      id: "markdown-preview",
      name: "Markdown Preview",
      description: "A basic safe markdown renderer returning React nodes.",
      Preview: ({ mode }: { mode: Mode }) => <MarkdownPreviewComponent slug={slug} mode={mode} />,
      code: (mode: Mode) => getMediaCodeForStyle(slug, "markdown-preview", mode),
    },
    {
      id: "file-preview",
      name: "File Preview",
      description: "A component to display file metadata with an optional download action.",
      Preview: ({ mode }: { mode: Mode }) => <FilePreviewComponent slug={slug} mode={mode} />,
      code: (mode: Mode) => getMediaCodeForStyle(slug, "file-preview", mode),
    }
  ]
}
`);
