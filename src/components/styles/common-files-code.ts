import type { Mode, StyleSlug } from "@/lib/styles/types"
import { getStyleFormKit } from "./common-form-kit"

export function getFilesCodeForStyle(slug: StyleSlug, componentId: string, mode: Mode): string {
  const k = getStyleFormKit(slug, mode)

  switch (componentId) {
    case "file-upload-dropzone":
      return `<!-- ${k.styleName} · File Upload Dropzone -->
<div class="relative flex flex-col items-center justify-center ${k.radius} border-2 border-dashed border-border bg-card/60 p-8 text-center transition-all hover:border-primary">
  <div class="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
    <UploadCloud class="h-6 w-6" />
  </div>
  <p class="text-sm font-semibold text-foreground">Click to upload or drag & drop</p>
  <p class="text-xs text-muted-foreground mt-1">PNG, JPG, PDF up to 10MB</p>
</div>`

    case "file-upload-progress":
      return `<!-- ${k.styleName} · File Upload Progress List -->
<div class="w-full space-y-2">
  <div class="flex items-center justify-between text-xs text-muted-foreground">
    <span class="font-semibold text-foreground">Active Uploads (1)</span>
    <span class="text-[10px] font-mono">Client Demo</span>
  </div>
  <div class="p-3 ${k.radius} border border-border bg-card flex flex-col gap-1.5 shadow-xs">
    <div class="flex items-center justify-between">
      <span class="text-xs font-semibold truncate">document-specification.pdf</span>
      <span class="text-[11px] font-mono text-muted-foreground">75%</span>
    </div>
    <div class="h-1.5 w-full bg-muted rounded-full overflow-hidden">
      <div class="h-full bg-primary rounded-full transition-all" style="width: 75%;"></div>
    </div>
  </div>
</div>`

    case "file-manager":
      return `<!-- ${k.styleName} · File Manager -->
<div class="flex flex-col ${k.radius} border border-border bg-card overflow-hidden shadow-sm">
  <div class="flex items-center justify-between border-b border-border bg-muted/30 p-3 text-xs">
    <div class="flex items-center gap-1.5 font-semibold text-foreground">
      <span>Home</span> / <span>Documents</span>
    </div>
    <button class="${k.btnPrimarySm} ${k.radius} px-2.5 py-1 text-xs font-medium">New Folder</button>
  </div>
  <div class="grid grid-cols-3 gap-3 p-4">
    <div class="p-3 rounded-lg border border-border bg-card text-center hover:bg-muted/40 cursor-pointer">
      <Folder class="h-6 w-6 text-amber-500 mx-auto mb-1" />
      <span class="text-xs font-medium">Projects</span>
    </div>
  </div>
</div>`

    case "folder-tree":
      return `<!-- ${k.styleName} · Folder Tree -->
<div class="w-full ${k.radius} border border-border bg-card p-2 shadow-xs">
  <ul class="space-y-1 text-xs">
    <li class="flex items-center gap-1.5 py-1 px-2 rounded-md bg-accent text-accent-foreground font-semibold">
      <FolderOpen class="h-4 w-4 text-amber-500" />
      <span>src</span>
      <span class="ml-auto text-[10px] bg-muted px-1.5 py-0.2 rounded-full">12</span>
    </li>
    <li class="flex items-center gap-1.5 py-1 px-2 pl-6 rounded-md text-muted-foreground hover:bg-muted">
      <Folder class="h-4 w-4 text-amber-500" />
      <span>components</span>
    </li>
  </ul>
</div>`

    case "tree-view":
      return `<!-- ${k.styleName} · Tree View -->
<div class="w-full ${k.radius} border border-border bg-card p-3 shadow-xs">
  <ul class="space-y-1 text-xs">
    <li class="flex items-center gap-1.5 py-1 px-2 rounded-md hover:bg-muted font-medium">
      <ChevronDown class="h-3.5 w-3.5 text-muted-foreground" />
      <span>Corporate Department</span>
    </li>
    <li class="flex items-center gap-1.5 py-1 px-2 pl-6 rounded-md text-muted-foreground">
      <span>Engineering Unit</span>
    </li>
  </ul>
</div>`

    case "organization-chart":
      return `<!-- ${k.styleName} · Organization Chart -->
<div class="w-full overflow-x-auto p-4 flex justify-center">
  <div class="w-48 ${k.radius} border border-border bg-card p-3 text-center shadow-xs">
    <div class="h-10 w-10 rounded-full bg-primary/20 text-primary font-bold mx-auto mb-2 flex items-center justify-center">
      DK
    </div>
    <h4 class="text-xs font-bold text-foreground">Dhruv Kolhe</h4>
    <p class="text-[11px] text-primary">Chief Architect</p>
  </div>
</div>`

    case "kanban-board":
      return `<!-- ${k.styleName} · Kanban Board -->
<div class="flex gap-4 overflow-x-auto pb-2">
  <div class="w-72 shrink-0 ${k.radius} border border-border bg-card/60 p-3 space-y-2">
    <div class="flex items-center justify-between text-xs font-bold">
      <span>In Progress</span>
      <span class="rounded-full bg-muted px-2 py-0.5 text-[10px]">3</span>
    </div>
    <div class="p-3 rounded-lg border border-border bg-card shadow-xs">
      <h5 class="text-xs font-bold">Deploy Batch 11</h5>
    </div>
  </div>
</div>`

    case "drag-and-drop-list":
      return `<!-- ${k.styleName} · Drag-and-Drop List -->
<div class="w-full space-y-2">
  <div class="flex items-center justify-between p-2.5 ${k.radius} border border-border bg-card shadow-xs">
    <div class="flex items-center gap-2">
      <GripVertical class="h-4 w-4 text-muted-foreground cursor-grab" />
      <span class="text-xs font-medium">Priority Task Alpha</span>
    </div>
    <div class="flex items-center gap-1">
      <button class="p-1 rounded text-muted-foreground hover:bg-muted"><ChevronUp class="h-3.5 w-3.5" /></button>
      <button class="p-1 rounded text-muted-foreground hover:bg-muted"><ChevronDown class="h-3.5 w-3.5" /></button>
    </div>
  </div>
</div>`

    case "task-board-card":
      return `<!-- ${k.styleName} · Task Board Card -->
<div class="${k.radius} border border-border bg-card p-3 shadow-xs space-y-2">
  <div class="flex items-center justify-between">
    <span class="text-[10px] bg-muted px-1.5 py-0.2 rounded font-medium">Feature</span>
    <span class="text-[10px] bg-amber-500/15 text-amber-600 px-1.5 py-0.2 rounded font-bold uppercase">High</span>
  </div>
  <h4 class="text-xs font-bold text-foreground">Integrate Hierarchical Trees</h4>
  <div class="flex items-center justify-between border-t border-border/60 pt-2 text-[11px] text-muted-foreground">
    <span>Oct 24, 2026</span>
    <div class="h-5 w-5 rounded-full bg-primary/20 text-primary text-[9px] font-bold flex items-center justify-center">DK</div>
  </div>
</div>`

    case "calendar-event-card":
      return `<!-- ${k.styleName} · Calendar Event Card -->
<div class="${k.radius} border border-border bg-card p-4 shadow-xs space-y-3">
  <div class="flex items-center justify-between">
    <span class="text-[10px] bg-muted px-2 py-0.5 rounded font-bold uppercase tracking-wider">Engineering</span>
    <span class="text-xs text-muted-foreground font-mono">10:00 AM – 11:00 AM</span>
  </div>
  <h3 class="text-sm font-bold text-foreground">Architecture Sprint Sync</h3>
  <div class="flex items-center justify-between border-t border-border/60 pt-2">
    <span class="text-xs text-muted-foreground">4 attendees</span>
    <button class="${k.btnPrimarySm} ${k.radius} px-2.5 py-1 text-xs font-semibold">Join Call</button>
  </div>
</div>`

    default:
      return `<!-- ${k.styleName} · ${componentId} -->`
  }
}
