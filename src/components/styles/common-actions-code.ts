import type { Mode, StyleSlug } from "@/lib/styles/types"
import { getStyleFormKit } from "./common-form-kit"

export function getActionsCodeForStyle(slug: StyleSlug, componentId: string, mode: Mode): string {
  const k = getStyleFormKit(slug, mode)

  switch (componentId) {
    case "command-button-group":
      return `<!-- ${k.styleName} · Command Button Group -->
<div class="inline-flex items-center isolate ${k.radius} shadow-xs">
  <button type="button" class="inline-flex items-center gap-1.5 ${k.btnPrimary} ${k.radius} rounded-r-none px-3.5 py-1.5 text-xs font-semibold ${k.focusRing}">
    <span>Save Changes</span>
    <kbd class="ml-1 rounded bg-black/20 dark:bg-white/20 px-1 py-0.5 font-mono text-[9px]">⌘S</kbd>
  </button>
  <button type="button" class="inline-flex items-center gap-1.5 border border-border bg-card px-3.5 py-1.5 text-xs font-semibold -ml-px hover:bg-muted ${k.focusRing}">
    <span>Duplicate</span>
    <kbd class="ml-1 rounded bg-muted px-1 py-0.5 font-mono text-[9px]">⌘D</kbd>
  </button>
  <button type="button" class="inline-flex items-center gap-1.5 border border-border bg-card ${k.radius} rounded-l-none px-3.5 py-1.5 text-xs font-semibold -ml-px hover:bg-muted ${k.focusRing}">
    <span>Archive</span>
    <kbd class="ml-1 rounded bg-muted px-1 py-0.5 font-mono text-[9px]">⌘E</kbd>
  </button>
</div>`

    case "button-group":
      return `<!-- ${k.styleName} · Button Group -->
<div class="inline-flex items-center isolate">
  <button class="px-4 py-2 text-sm font-medium border border-border bg-card text-foreground ${k.radius} rounded-r-none hover:bg-muted ${k.focusRing}">
    Left
  </button>
  <button class="px-4 py-2 text-sm font-medium border border-border bg-card text-foreground -ml-px hover:bg-muted ${k.focusRing}">
    Center
  </button>
  <button class="px-4 py-2 text-sm font-medium border border-border bg-card text-foreground ${k.radius} rounded-l-none -ml-px hover:bg-muted ${k.focusRing}">
    Right
  </button>
</div>`

    case "split-button":
      return `<!-- ${k.styleName} · Split Button -->
<div class="inline-flex items-center isolate relative">
  <button class="${k.btnPrimary} ${k.radius} rounded-r-none px-4 py-2 text-sm font-medium z-10 hover:z-20">
    Deploy Application
  </button>
  <button class="${k.btnPrimary} ${k.radius} rounded-l-none border-l border-white/20 px-2 py-2 text-sm z-10 hover:z-20" aria-label="More deployment actions">
    <ChevronDown class="h-4 w-4" />
  </button>
</div>`

    case "segmented-control":
      return `<!-- ${k.styleName} · Segmented Control -->
<div class="inline-flex items-center ${k.radius} bg-muted p-1 text-muted-foreground">
  <button class="px-3 py-1.5 text-xs font-semibold ${k.radius} bg-card text-foreground shadow-xs">
    Overview
  </button>
  <button class="px-3 py-1.5 text-xs font-medium hover:text-foreground">
    Analytics
  </button>
  <button class="px-3 py-1.5 text-xs font-medium hover:text-foreground">
    Settings
  </button>
</div>`

    case "toolbar":
      return `<!-- ${k.styleName} · Toolbar -->
<div class="flex items-center gap-1 ${k.radius} ${k.panel} border border-border p-1 shadow-xs">
  <button class="h-8 w-8 inline-flex items-center justify-center ${k.radius} text-muted-foreground hover:bg-muted hover:text-foreground">
    <Bold class="h-4 w-4" />
  </button>
  <button class="h-8 w-8 inline-flex items-center justify-center ${k.radius} text-muted-foreground hover:bg-muted hover:text-foreground">
    <Italic class="h-4 w-4" />
  </button>
  <div class="h-4 w-[1px] bg-border mx-1"></div>
  <button class="h-8 w-8 inline-flex items-center justify-center ${k.radius} text-muted-foreground hover:bg-muted hover:text-foreground">
    <List class="h-4 w-4" />
  </button>
</div>`

    case "floating-toolbar":
      return `<!-- ${k.styleName} · Floating Toolbar -->
<div class="fixed top-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 ${k.radius} border border-border bg-popover/95 backdrop-blur-md p-1 shadow-xl">
  <button class="h-7 w-7 inline-flex items-center justify-center ${k.radius} hover:bg-muted">
    <Bold class="h-3.5 w-3.5" />
  </button>
  <button class="h-7 w-7 inline-flex items-center justify-center ${k.radius} hover:bg-muted">
    <Italic class="h-3.5 w-3.5" />
  </button>
  <button class="h-7 w-7 inline-flex items-center justify-center ${k.radius} hover:bg-muted">
    <Link class="h-3.5 w-3.5" />
  </button>
</div>`

    case "rich-text-editor":
      return `<!-- ${k.styleName} · Rich Text Editor -->
<div class="flex flex-col ${k.radius} border border-border bg-card overflow-hidden">
  <div class="flex items-center gap-1 border-b border-border bg-muted/40 p-1.5">
    <button class="h-7 w-7 inline-flex items-center justify-center rounded hover:bg-muted"><Bold class="h-3.5 w-3.5" /></button>
    <button class="h-7 w-7 inline-flex items-center justify-center rounded hover:bg-muted"><Italic class="h-3.5 w-3.5" /></button>
    <button class="h-7 w-7 inline-flex items-center justify-center rounded hover:bg-muted"><List class="h-3.5 w-3.5" /></button>
  </div>
  <div class="p-4 min-h-[140px] text-sm focus:outline-none" contenteditable="true">
    <p>Craft bespoke interface experiences with our multi-style architecture.</p>
  </div>
</div>`

    case "mention-input":
      return `<!-- ${k.styleName} · Mention Input -->
<div class="relative w-full">
  <textarea placeholder="Type @ to tag a team member..." class="w-full ${k.radius} border border-input bg-transparent p-3 text-sm placeholder:text-muted-foreground ${k.focusRing}"></textarea>
</div>`

    case "emoji-picker":
      return `<!-- ${k.styleName} · Emoji Picker -->
<div class="w-72 ${k.radius} border border-border bg-card p-2 shadow-lg">
  <div class="relative mb-2">
    <input type="text" placeholder="Search emojis..." class="w-full ${k.radius} border border-input bg-muted/30 px-3 py-1.5 text-xs" />
  </div>
  <div class="grid grid-cols-8 gap-1">
    <button class="h-7 w-7 text-base hover:scale-125 transition-transform">😀</button>
    <button class="h-7 w-7 text-base hover:scale-125 transition-transform">🚀</button>
    <button class="h-7 w-7 text-base hover:scale-125 transition-transform">✨</button>
    <button class="h-7 w-7 text-base hover:scale-125 transition-transform">🔥</button>
  </div>
</div>`

    case "tag-editor":
      return `<!-- ${k.styleName} · Mention / Tag Editor -->
<div class="flex flex-wrap items-center gap-1.5 ${k.radius} border border-input bg-background p-2">
  <span class="inline-flex items-center gap-1 px-2 py-0.5 ${k.radius} text-xs bg-primary/10 text-primary">
    @dhruvmkolhe <X class="h-3 w-3 cursor-pointer" />
  </span>
  <span class="inline-flex items-center gap-1 px-2 py-0.5 ${k.radius} text-xs bg-muted text-foreground">
    design-system <X class="h-3 w-3 cursor-pointer" />
  </span>
  <input type="text" placeholder="Add tag..." class="bg-transparent text-xs outline-none" />
</div>`

    default:
      return `<!-- ${k.styleName} · ${componentId} -->`
  }
}
