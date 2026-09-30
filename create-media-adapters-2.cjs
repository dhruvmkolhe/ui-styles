const fs = require('fs');
const path = require('path');

const write = (filepath, content) => {
  fs.writeFileSync(path.join(__dirname, filepath), content.trim() + '\n', 'utf8');
};

write('src/components/styles/common-media-previews.tsx', `
import * as React from "react"
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
import { cn } from "@/lib/utils"

export const MediaPreviews = {
  Image: ({ className }: { className?: string }) => (
    <div className={cn("w-full max-w-sm", className)}>
      <Image src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80" alt="Gradient" className="w-full h-64 rounded-lg" fallbackText="Image failed to load" />
    </div>
  ),
  ImageGallery: ({ className }: { className?: string }) => (
    <div className={cn("w-full max-w-2xl", className)}>
      <ImageGallery columns={3}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ImageGalleryItem key={i}>
            <Image src={\`https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80&sig=\${i}\`} alt={\`Gallery image \${i}\`} />
          </ImageGalleryItem>
        ))}
      </ImageGallery>
    </div>
  ),
  Carousel: ({ className }: { className?: string }) => (
    <div className={cn("w-full max-w-2xl", className)}>
      <Carousel>
        {[1, 2, 3, 4].map((i) => (
          <CarouselItem key={i}>
            <Image src={\`https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80&sig=\${i}\`} alt={\`Slide \${i}\`} className="aspect-video rounded-xl" />
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  ),
  VideoPlayer: ({ className }: { className?: string }) => (
    <div className={cn("w-full max-w-2xl", className)}>
      <VideoPlayer src="https://www.w3schools.com/html/mov_bbb.mp4" className="w-full aspect-video rounded-xl" />
    </div>
  ),
  AudioPlayer: ({ className }: { className?: string }) => (
    <div className={cn("w-full max-w-md", className)}>
      <AudioPlayer src="https://www.w3schools.com/html/horse.ogg" className="w-full rounded-xl" />
    </div>
  ),
  Lightbox: ({ className }: { className?: string }) => (
    <div className={cn("w-64 h-64", className)}>
      <Lightbox alt="A beautiful landscape">
        <Image src="https://images.unsplash.com/photo-1506744626753-1fa7604eb466?w=1200&q=80" alt="Landscape" className="rounded-lg object-cover w-full h-full" />
      </Lightbox>
    </div>
  ),
  MediaCard: ({ className }: { className?: string }) => (
    <div className={cn("w-full max-w-sm", className)}>
      <MediaCard>
        <MediaCardImage>
          <Image src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=800&q=80" alt="Photography" className="aspect-video" />
        </MediaCardImage>
        <MediaCardContent>
          <h3 className="font-semibold text-lg">Creative Photography</h3>
          <p className="text-muted-foreground text-sm mt-2">Explore the art of capturing moments with precision and creativity.</p>
        </MediaCardContent>
      </MediaCard>
    </div>
  ),
  CodeBlock: ({ className }: { className?: string }) => (
    <div className={cn("w-full max-w-2xl", className)}>
      <CodeBlock language="typescript" code={\`function greet(name: string) {\\n  console.log(\\\`Hello, \\\${name}!\\\`);\\n}\`} />
    </div>
  ),
  MarkdownPreview: ({ className }: { className?: string }) => {
    const markdown = \`# Welcome to Markdown\\n\\nThis is a **bold** statement and this is *italic*.\\n\\n- Item 1\\n- Item 2\\n\\n> A blockquote goes here.\\n\\n\\\`\\\`\\\`javascript\\nconst test = true;\\nconsole.log(test);\\n\\\`\\\`\\\`\`
    return (
      <div className={cn("w-full max-w-2xl p-6 bg-card text-card-foreground rounded-lg border", className)}>
        <MarkdownPreview content={markdown} />
      </div>
    )
  },
  FilePreview: ({ className }: { className?: string }) => (
    <div className={cn("w-full max-w-md space-y-4", className)}>
      <FilePreview fileName="annual-report.pdf" fileSize="2.4 MB" fileType="document" onDownload={() => alert('Downloading...')} />
      <FilePreview fileName="presentation.key" fileSize="14.1 MB" fileType="unknown" />
      <FilePreview fileName="vacation.jpg" fileSize="4.2 MB" fileType="image" />
    </div>
  ),
}
`);

write('src/components/styles/common-media-defs.tsx', `
import * as React from "react"
import { mediaCodeSnippets } from "./common-media-code"
import { MediaPreviews } from "./common-media-previews"

export const mediaDefs = [
  {
    id: "Image",
    name: "Image",
    description: "Responsive image wrapper with loading and error states.",
    category: "Media & Content",
    codeSnippet: mediaCodeSnippets.Image,
    component: <MediaPreviews.Image />
  },
  {
    id: "ImageGallery",
    name: "Image Gallery",
    description: "A responsive grid layout for displaying a collection of images.",
    category: "Media & Content",
    codeSnippet: mediaCodeSnippets.ImageGallery,
    component: <MediaPreviews.ImageGallery />
  },
  {
    id: "Carousel",
    name: "Carousel",
    description: "A simple horizontal scrolling carousel using CSS scroll snap.",
    category: "Media & Content",
    codeSnippet: mediaCodeSnippets.Carousel,
    component: <MediaPreviews.Carousel />
  },
  {
    id: "VideoPlayer",
    name: "Video Player",
    description: "A responsive wrapper for HTML5 video with native controls.",
    category: "Media & Content",
    codeSnippet: mediaCodeSnippets.VideoPlayer,
    component: <MediaPreviews.VideoPlayer />
  },
  {
    id: "AudioPlayer",
    name: "Audio Player",
    description: "A styled wrapper for HTML5 audio playback.",
    category: "Media & Content",
    codeSnippet: mediaCodeSnippets.AudioPlayer,
    component: <MediaPreviews.AudioPlayer />
  },
  {
    id: "Lightbox",
    name: "Lightbox",
    description: "A modal overlay for viewing media in fullscreen mode.",
    category: "Media & Content",
    codeSnippet: mediaCodeSnippets.Lightbox,
    component: <MediaPreviews.Lightbox />
  },
  {
    id: "MediaCard",
    name: "Media Card",
    description: "A specialized card designed for highlighting media content.",
    category: "Media & Content",
    codeSnippet: mediaCodeSnippets.MediaCard,
    component: <MediaPreviews.MediaCard />
  },
  {
    id: "CodeBlock",
    name: "Code Block",
    description: "Syntax highlighting wrapper with a copy to clipboard button.",
    category: "Media & Content",
    codeSnippet: mediaCodeSnippets.CodeBlock,
    component: <MediaPreviews.CodeBlock />
  },
  {
    id: "MarkdownPreview",
    name: "Markdown Preview",
    description: "A basic safe markdown renderer returning React nodes.",
    category: "Media & Content",
    codeSnippet: mediaCodeSnippets.MarkdownPreview,
    component: <MediaPreviews.MarkdownPreview />
  },
  {
    id: "FilePreview",
    name: "File Preview",
    description: "A component to display file metadata with an optional download action.",
    category: "Media & Content",
    codeSnippet: mediaCodeSnippets.FilePreview,
    component: <MediaPreviews.FilePreview />
  }
]
`);
