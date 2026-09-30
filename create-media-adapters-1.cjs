const fs = require('fs');
const path = require('path');

const write = (filepath, content) => {
  fs.writeFileSync(path.join(__dirname, filepath), content.trim() + '\n', 'utf8');
};

write('src/components/styles/common-media-kit.ts', `
import { StyleTokens } from "./types"

export function getMediaTokens(tokens: StyleTokens) {
  const t = tokens

  return {
    image: {
      wrapper: "relative overflow-hidden " + t.radius.lg + " " + t.border.base,
      fallback: "flex flex-col items-center justify-center text-muted-foreground p-4 text-center h-full w-full bg-muted",
    },
    carousel: {
      wrapper: "relative group w-full",
      button: "absolute top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center " + t.radius.full + " bg-background/80 " + t.colors.foreground + " shadow-sm opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 " + t.border.base,
    },
    mediaCard: {
      base: t.radius.xl + " " + t.border.base + " bg-card text-card-foreground " + t.shadow.sm + " overflow-hidden flex flex-col",
      image: "relative w-full overflow-hidden",
      content: "p-4 flex flex-col flex-1",
    },
    codeBlock: {
      wrapper: "relative group " + t.radius.md + " overflow-hidden bg-slate-950 text-slate-50 " + t.border.base + " my-4",
      header: "flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 font-mono",
      button: "absolute top-2 right-2 p-2 " + t.radius.md + " bg-slate-800/50 hover:bg-slate-800 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity",
      pre: "p-4 overflow-x-auto text-sm font-mono leading-relaxed",
    },
    filePreview: {
      wrapper: "flex items-center gap-4 p-4 " + t.radius.lg + " " + t.border.base + " bg-card text-card-foreground " + t.shadow.sm + " transition-colors hover:bg-muted/50",
      iconWrapper: "flex items-center justify-center w-12 h-12 " + t.radius.md + " bg-muted",
      button: "p-2 " + t.radius.full + " hover:bg-background border shadow-sm transition-colors",
    },
    markdown: {
      wrapper: t.colors.foreground,
    }
  }
}
`);

write('src/components/styles/common-media-code.ts', `
export const mediaCodeSnippets = {
  Image: \`import { Image } from "@/components/ui/image"\\n\\nexport default function Example() {\\n  return (\\n    <Image src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80" alt="Gradient" className="w-full h-64 rounded-lg" fallbackText="Image failed to load" />\\n  )\\n}\`,
  ImageGallery: \`import { ImageGallery, ImageGalleryItem } from "@/components/ui/image-gallery"\\nimport { Image } from "@/components/ui/image"\\n\\nexport default function Example() {\\n  return (\\n    <ImageGallery columns={3}>\\n      {[1, 2, 3, 4, 5, 6].map((i) => (\\n        <ImageGalleryItem key={i}>\\n          <Image src={\\\`https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80&sig=\\\${i}\\\`} alt={\\\`Gallery image \\\${i}\\\`} />\\n        </ImageGalleryItem>\\n      ))}\\n    </ImageGallery>\\n  )\\n}\`,
  Carousel: \`import { Carousel, CarouselItem } from "@/components/ui/carousel"\\nimport { Image } from "@/components/ui/image"\\n\\nexport default function Example() {\\n  return (\\n    <Carousel>\\n      {[1, 2, 3, 4].map((i) => (\\n        <CarouselItem key={i}>\\n          <Image src={\\\`https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80&sig=\\\${i}\\\`} alt={\\\`Slide \\\${i}\\\`} className="aspect-video rounded-xl" />\\n        </CarouselItem>\\n      ))}\\n    </Carousel>\\n  )\\n}\`,
  VideoPlayer: \`import { VideoPlayer } from "@/components/ui/video-player"\\n\\nexport default function Example() {\\n  return (\\n    <VideoPlayer src="https://www.w3schools.com/html/mov_bbb.mp4" className="w-full aspect-video rounded-xl" />\\n  )\\n}\`,
  AudioPlayer: \`import { AudioPlayer } from "@/components/ui/audio-player"\\n\\nexport default function Example() {\\n  return (\\n    <AudioPlayer src="https://www.w3schools.com/html/horse.ogg" className="w-full max-w-md rounded-xl" />\\n  )\\n}\`,
  Lightbox: \`import { Lightbox } from "@/components/ui/lightbox"\\nimport { Image } from "@/components/ui/image"\\n\\nexport default function Example() {\\n  return (\\n    <div className="w-64 h-64">\\n      <Lightbox alt="A beautiful landscape">\\n        <Image src="https://images.unsplash.com/photo-1506744626753-1fa7604eb466?w=1200&q=80" alt="Landscape" className="rounded-lg" />\\n      </Lightbox>\\n    </div>\\n  )\\n}\`,
  MediaCard: \`import { MediaCard, MediaCardImage, MediaCardContent } from "@/components/ui/media-card"\\nimport { Image } from "@/components/ui/image"\\n\\nexport default function Example() {\\n  return (\\n    <MediaCard className="max-w-sm">\\n      <MediaCardImage>\\n        <Image src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=800&q=80" alt="Photography" className="aspect-video" />\\n      </MediaCardImage>\\n      <MediaCardContent>\\n        <h3 className="font-semibold text-lg">Creative Photography</h3>\\n        <p className="text-muted-foreground text-sm mt-2">Explore the art of capturing moments.</p>\\n      </MediaCardContent>\\n    </MediaCard>\\n  )\\n}\`,
  CodeBlock: \`import { CodeBlock } from "@/components/ui/code-block"\\n\\nexport default function Example() {\\n  return (\\n    <CodeBlock language="typescript" code={\`function greet(name: string) {\\n  console.log(\\\`Hello, \\\${name}!\\\`);\\n}\`} />\\n  )\\n}\`,
  MarkdownPreview: \`import { MarkdownPreview } from "@/components/ui/markdown-preview"\\n\\nexport default function Example() {\\n  const markdown = \`# Welcome to Markdown\\n\\nThis is a **bold** statement and this is *italic*.\\n\\n- Item 1\\n- Item 2\\n\\n> A blockquote goes here.\\n\\n\\\`\\\`\\\`javascript\\nconst test = true;\\n\\\`\\\`\\\`\`\\n  return (\\n    <MarkdownPreview content={markdown} />\\n  )\\n}\`,
  FilePreview: \`import { FilePreview } from "@/components/ui/file-preview"\\n\\nexport default function Example() {\\n  return (\\n    <FilePreview fileName="annual-report.pdf" fileSize="2.4 MB" fileType="document" onDownload={() => alert('Downloading...')} />\\n  )\\n}\`
}
`);
