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
    <div className={`p-6 ${k.panel} ${k.radius} border space-y-6 max-w-lg mx-auto`}>
      <Image src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80" alt="Gradient" className={`w-full h-64 ${k.radius}`} fallbackText="Image failed to load" />
    </div>
  )
}

export function ImageGalleryPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  return (
    <div className={`p-6 ${k.panel} ${k.radius} border space-y-6 max-w-2xl mx-auto`}>
      <ImageGallery columns={3}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ImageGalleryItem key={i} className={k.radius}>
            <Image src={`https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80&sig=${i}`} alt={`Gallery image ${i}`} className="w-full h-full object-cover" />
          </ImageGalleryItem>
        ))}
      </ImageGallery>
    </div>
  )
}

export function CarouselPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  return (
    <div className={`p-6 ${k.panel} ${k.radius} border space-y-6 max-w-2xl mx-auto`}>
      <Carousel>
        {[1, 2, 3, 4].map((i) => (
          <CarouselItem key={i}>
            <Image src={`https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80&sig=${i}`} alt={`Slide ${i}`} className={`aspect-video ${k.radius} w-full h-full`} />
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  )
}

export function VideoPlayerPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  return (
    <div className={`p-6 ${k.panel} ${k.radius} border space-y-6 max-w-2xl mx-auto`}>
      <VideoPlayer src="https://www.w3schools.com/html/mov_bbb.mp4" className={`w-full aspect-video ${k.radius}`} />
    </div>
  )
}

export function AudioPlayerPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  return (
    <div className={`p-6 ${k.panel} ${k.radius} border space-y-6 max-w-md mx-auto`}>
      <AudioPlayer src="https://www.w3schools.com/html/horse.ogg" className={`w-full ${k.radius}`} />
    </div>
  )
}

export function LightboxPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  return (
    <div className={`p-6 ${k.panel} ${k.radius} border space-y-6 max-w-md mx-auto flex justify-center`}>
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
    <div className={`p-6 ${k.panel} ${k.radius} border space-y-6 max-w-md mx-auto`}>
      <MediaCard className={k.radius}>
        <MediaCardImage>
          <Image src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=800&q=80" alt="Photography" className="aspect-video" />
        </MediaCardImage>
        <MediaCardContent>
          <h3 className={`font-semibold text-lg ${k.strong}`}>Creative Photography</h3>
          <p className={`text-sm mt-2 ${k.muted}`}>Explore the art of capturing moments with precision and creativity.</p>
        </MediaCardContent>
      </MediaCard>
    </div>
  )
}

export function CodeBlockPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  return (
    <div className={`p-6 ${k.panel} ${k.radius} border space-y-6 max-w-2xl mx-auto`}>
      <CodeBlock language="typescript" code={`function greet(name: string) {\n  console.log(\`Hello, \${name}!\`);\n}`} className={k.radius} />
    </div>
  )
}

export function MarkdownPreviewComponent({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const markdown = `# Welcome to Markdown\n\nThis is a **bold** statement and this is *italic*.\n\n- Item 1\n- Item 2\n\n> A blockquote goes here.\n\n\`\`\`javascript\nconst test = true;\nconsole.log(test);\n\`\`\``
  return (
    <div className={`p-6 ${k.panel} ${k.radius} border max-w-2xl mx-auto`}>
      <MarkdownPreview content={markdown} />
    </div>
  )
}

export function FilePreviewComponent({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  return (
    <div className={`p-6 ${k.panel} ${k.radius} border space-y-4 max-w-md mx-auto`}>
      <FilePreview fileName="annual-report.pdf" fileSize="2.4 MB" fileType="document" onDownload={() => alert('Downloading...')} className={k.radius} />
      <FilePreview fileName="presentation.key" fileSize="14.1 MB" fileType="unknown" className={k.radius} />
      <FilePreview fileName="vacation.jpg" fileSize="4.2 MB" fileType="image" className={k.radius} />
    </div>
  )
}
