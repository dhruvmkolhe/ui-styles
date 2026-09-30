import type { Mode, StyleSlug } from "@/lib/styles/types"
import { getStyleFormKit } from "./common-form-kit"

export function getMediaCodeForStyle(slug: StyleSlug, componentId: string, mode: Mode): string {
  const k = getStyleFormKit(slug, mode)

  switch (componentId) {
    case "image":
      return `<!-- ${k.styleName} · Image -->\n<div class="relative overflow-hidden ${k.radius} bg-muted w-full h-64">\n  <img src="..." alt="Image" class="w-full h-full object-cover" />\n</div>`
    case "image-gallery":
      return `<!-- ${k.styleName} · Image Gallery -->\n<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">\n  <div class="relative aspect-square overflow-hidden ${k.radius} group cursor-pointer">\n    <img src="..." class="w-full h-full object-cover" />\n  </div>\n</div>`
    case "carousel":
      return `<!-- ${k.styleName} · Carousel -->\n<div class="relative group w-full">\n  <div class="flex overflow-x-auto snap-x snap-mandatory gap-4">\n    <div class="flex-none w-[80%] snap-center ${k.radius}">...</div>\n  </div>\n</div>`
    case "video-player":
      return `<!-- ${k.styleName} · Video Player -->\n<div class="relative overflow-hidden ${k.radius} bg-black w-full aspect-video">\n  <video controls class="w-full h-full object-contain"></video>\n</div>`
    case "audio-player":
      return `<!-- ${k.styleName} · Audio Player -->\n<div class="flex w-full items-center p-2 ${k.radius} bg-muted/50 border">\n  <audio controls class="w-full h-10 outline-none"></audio>\n</div>`
    case "lightbox":
      return `<!-- ${k.styleName} · Lightbox -->\n<button class="relative group overflow-hidden ${k.radius} cursor-zoom-in block w-full h-full">\n  <img src="..." />\n</button>`
    case "media-card":
      return `<!-- ${k.styleName} · Media Card -->\n<div class="${k.radius} border bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col">\n  <div class="relative w-full overflow-hidden">...</div>\n  <div class="p-4 flex flex-col flex-1">...</div>\n</div>`
    case "code-block":
      return `<!-- ${k.styleName} · Code Block -->\n<div class="relative group ${k.radius} overflow-hidden bg-slate-950 text-slate-50 border border-slate-800 my-4">\n  <pre class="p-4 overflow-x-auto text-sm font-mono leading-relaxed">...</pre>\n</div>`
    case "markdown-preview":
      return `<!-- ${k.styleName} · Markdown Preview -->\n<div class="text-foreground">\n  <h1 class="text-2xl font-bold mt-5 mb-3">...</h1>\n</div>`
    case "file-preview":
      return `<!-- ${k.styleName} · File Preview -->\n<div class="flex items-center gap-4 p-4 ${k.radius} border bg-card text-card-foreground shadow-sm transition-colors hover:bg-muted/50">\n  <div class="flex items-center justify-center w-12 h-12 ${k.radius} bg-muted">...</div>\n  <div class="flex-1 min-w-0">...</div>\n</div>`
    default:
      return `<!-- ${k.styleName} · Media Component -->`
  }
}
