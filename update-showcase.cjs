const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src/components/gallery/components-documentation-showcase.tsx');
let content = fs.readFileSync(targetPath, 'utf8');

const mediaContent = `
        {/* MEDIA & CONTENT TABS */}
        {activeTab === "image" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Image</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Responsive image wrapper with loading and error states.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card flex justify-center">
              <div className="w-full max-w-sm h-64">
                <Image src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80" alt="Gradient" className="w-full h-full rounded-lg" fallbackText="Image failed to load" />
              </div>
            </div>
          </div>
        )}

        {activeTab === "image-gallery" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Image Gallery</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Responsive grid layout for images.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card flex justify-center">
              <div className="w-full max-w-2xl">
                <ImageGallery columns={3}>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <ImageGalleryItem key={i}>
                      <Image src={\`https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80&sig=\${i}\`} alt={\`Gallery \${i}\`} />
                    </ImageGalleryItem>
                  ))}
                </ImageGallery>
              </div>
            </div>
          </div>
        )}

        {activeTab === "carousel" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Carousel</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Horizontal scrolling carousel with CSS scroll snap.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card flex justify-center">
              <div className="w-full max-w-2xl">
                <Carousel>
                  {[1, 2, 3, 4].map((i) => (
                    <CarouselItem key={i}>
                      <Image src={\`https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80&sig=\${i}\`} alt={\`Slide \${i}\`} className="aspect-video rounded-xl" />
                    </CarouselItem>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        )}

        {activeTab === "video-player" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Video Player</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Responsive wrapper for HTML5 video with native controls.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card flex justify-center">
              <div className="w-full max-w-2xl">
                <VideoPlayer src="https://www.w3schools.com/html/mov_bbb.mp4" className="w-full aspect-video rounded-xl" />
              </div>
            </div>
          </div>
        )}

        {activeTab === "audio-player" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Audio Player</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Styled wrapper for HTML5 audio playback.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card flex justify-center">
              <div className="w-full max-w-md">
                <AudioPlayer src="https://www.w3schools.com/html/horse.ogg" className="w-full rounded-xl" />
              </div>
            </div>
          </div>
        )}

        {activeTab === "lightbox" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Lightbox</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Modal overlay for viewing media in fullscreen.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card flex justify-center">
              <div className="w-64 h-64">
                <Lightbox alt="A beautiful landscape">
                  <Image src="https://images.unsplash.com/photo-1506744626753-1fa7604eb466?w=1200&q=80" alt="Landscape" className="rounded-lg object-cover w-full h-full" />
                </Lightbox>
              </div>
            </div>
          </div>
        )}

        {activeTab === "media-card" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Media Card</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Specialized card for highlighting media content.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card flex justify-center">
              <div className="w-full max-w-sm">
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
            </div>
          </div>
        )}

        {activeTab === "code-block" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Code Block</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Syntax highlighting wrapper with copy to clipboard.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card flex justify-center">
              <div className="w-full max-w-2xl">
                <CodeBlock language="typescript" code={\`function greet(name: string) {\\n  console.log(\\\`Hello, \\\${name}!\\\`);\\n}\`} />
              </div>
            </div>
          </div>
        )}

        {activeTab === "markdown-preview" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Markdown Preview</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Safe markdown renderer for basic formatting.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card flex justify-center">
              <div className="w-full max-w-2xl bg-muted/20 p-6 rounded-md">
                <MarkdownPreview content={\`# Welcome to Markdown\\n\\nThis is a **bold** statement and this is *italic*.\\n\\n- Item 1\\n- Item 2\\n\\n> A blockquote goes here.\\n\\n\\\`\\\`\\\`javascript\\nconst test = true;\\nconsole.log(test);\\n\\\`\\\`\\\`\`} />
              </div>
            </div>
          </div>
        )}

        {activeTab === "file-preview" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">File Preview</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Component to display file metadata with download action.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card flex justify-center">
              <div className="w-full max-w-md space-y-4">
                <FilePreview fileName="annual-report.pdf" fileSize="2.4 MB" fileType="document" onDownload={() => alert('Downloading...')} />
                <FilePreview fileName="presentation.key" fileSize="14.1 MB" fileType="unknown" />
                <FilePreview fileName="vacation.jpg" fileSize="4.2 MB" fileType="image" />
              </div>
            </div>
          </div>
        )}

`;

content = content.replace('{/* 70 · PLAYGROUND */}', mediaContent + '\\n        {/* 70 · PLAYGROUND */}');

// Add imports
const imports = `import { Image } from "@/components/ui/image";
import { ImageGallery, ImageGalleryItem } from "@/components/ui/image-gallery";
import { Carousel, CarouselItem } from "@/components/ui/carousel";
import { VideoPlayer } from "@/components/ui/video-player";
import { AudioPlayer } from "@/components/ui/audio-player";
import { Lightbox } from "@/components/ui/lightbox";
import { MediaCard, MediaCardImage, MediaCardContent } from "@/components/ui/media-card";
import { CodeBlock } from "@/components/ui/code-block";
import { MarkdownPreview } from "@/components/ui/markdown-preview";
import { FilePreview } from "@/components/ui/file-preview";
`;
content = content.replace('import { Button } from "@/components/ui/button";', imports + 'import { Button } from "@/components/ui/button";');

fs.writeFileSync(targetPath, content, 'utf8');
console.log("Injected media tabs into showcase.");
