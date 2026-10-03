import type { Mode, StyleSlug } from "@/lib/styles/types"
import { getStyleFormKit } from "./common-form-kit"

export function getCollabCodeForStyle(slug: StyleSlug, componentId: string, mode: Mode): string {
  const k = getStyleFormKit(slug, mode)

  switch (componentId) {
    case "conversation-list":
      return `<!-- ${k.styleName} · Conversation List -->
<div class="flex flex-col ${k.radius} border border-border bg-card overflow-hidden shadow-xs">
  <div class="p-3 border-b border-border bg-muted/20 flex items-center justify-between">
    <span class="text-xs font-bold text-foreground">Conversations</span>
    <span class="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded-full">3 unread</span>
  </div>
  <div class="divide-y divide-border/40 p-1">
    <div class="flex items-center gap-3 p-2.5 ${k.radius} bg-accent/60 text-accent-foreground">
      <div class="relative h-9 w-9 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">
        SC
        <span class="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background"></span>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-foreground">Sarah Chen</span>
          <span class="text-[10px] text-muted-foreground">10:42 AM</span>
        </div>
        <p class="text-xs text-muted-foreground truncate">Batch 13 developer tools ready for review.</p>
      </div>
    </div>
  </div>
</div>`

    case "user-presence":
      return `<!-- ${k.styleName} · User Presence -->
<div class="inline-flex items-center gap-2 px-3 py-1.5 ${k.radius} border border-border bg-card text-xs font-medium text-foreground shadow-2xs">
  <span class="h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20"></span>
  <span class="font-semibold">Online & Available</span>
  <span class="text-muted-foreground text-[11px]">— Focusing on v2</span>
</div>`

    case "video-call-controls":
      return `<!-- ${k.styleName} · Video Call Controls -->
<div class="flex items-center justify-between p-3 px-4 ${k.radius} border border-border bg-card shadow-lg">
  <div class="flex items-center gap-2">
    <span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
    <span class="text-xs font-semibold text-foreground">Team Sync</span>
  </div>
  <div class="flex items-center gap-2">
    <button class="p-2.5 rounded-full bg-muted hover:bg-accent text-foreground transition-colors"><Mic class="h-4 w-4" /></button>
    <button class="p-2.5 rounded-full bg-muted hover:bg-accent text-foreground transition-colors"><Video class="h-4 w-4" /></button>
    <button class="p-2.5 rounded-full bg-teal-600 text-white shadow-xs"><ScreenShare class="h-4 w-4" /></button>
    <button class="p-2.5 rounded-full bg-rose-600 text-white shadow-xs"><PhoneOff class="h-4 w-4" /></button>
  </div>
</div>`

    case "activity-feed":
      return `<!-- ${k.styleName} · Activity Feed -->
<div class="p-4 ${k.radius} border border-border bg-card space-y-4 shadow-xs">
  <span class="text-xs font-mono font-bold uppercase text-muted-foreground">Recent Activity</span>
  <div class="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-border">
    <div class="relative flex items-start gap-3">
      <span class="absolute -left-6 mt-1 h-4 w-4 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px]">●</span>
      <div class="flex-1 text-xs">
        <span class="font-bold text-foreground">Dhruv Kolhe</span>
        <span class="text-muted-foreground"> deployed release v2.4.0</span>
        <div class="text-[10px] text-muted-foreground font-mono">10m ago</div>
      </div>
    </div>
  </div>
</div>`

    case "comment-thread":
      return `<!-- ${k.styleName} · Comment Thread -->
<div class="p-4 ${k.radius} border border-border bg-card space-y-3 shadow-xs">
  <div class="flex items-center justify-between text-xs">
    <div class="flex items-center gap-2">
      <span class="font-bold text-foreground">Sarah Chen</span>
      <span class="px-1.5 py-0.2 rounded bg-primary/10 text-primary text-[10px] font-semibold">Author</span>
    </div>
    <span class="text-[10px] text-muted-foreground font-mono">1h ago</span>
  </div>
  <p class="text-xs text-foreground leading-relaxed">Verified split diff comparison and terminal emulator command sandboxing.</p>
  <div class="flex items-center gap-2 pt-1 border-t border-border/50 text-[11px] text-muted-foreground">
    <button class="flex items-center gap-1 hover:text-foreground"><Heart class="h-3 w-3" /> 4</button>
    <button class="flex items-center gap-1 hover:text-foreground"><Reply class="h-3 w-3" /> Reply</button>
  </div>
</div>`

    case "review-feedback-panel":
      return `<!-- ${k.styleName} · Review & Feedback Panel -->
<div class="p-5 ${k.radius} border border-border bg-card space-y-4 shadow-sm">
  <div class="flex items-center justify-between">
    <span class="text-xs font-bold text-foreground">Rate Component Quality</span>
    <div class="flex items-center gap-1 text-amber-500">
      <Star class="h-4 w-4 fill-current" />
      <Star class="h-4 w-4 fill-current" />
      <Star class="h-4 w-4 fill-current" />
      <Star class="h-4 w-4 fill-current" />
      <Star class="h-4 w-4 fill-current" />
    </div>
  </div>
  <textarea placeholder="Write technical review..." class="w-full p-2.5 text-xs ${k.radius} border border-input bg-background" rows="3"></textarea>
  <button class="px-3.5 py-1.5 text-xs font-semibold ${k.radius} bg-primary text-primary-foreground shadow-xs">Submit Review</button>
</div>`

    case "diff-viewer":
      return `<!-- ${k.styleName} · Diff Viewer -->
<div class="${k.radius} border border-border bg-card overflow-hidden font-mono text-xs shadow-xs">
  <div class="flex items-center justify-between p-2.5 bg-muted/40 border-b border-border text-[11px]">
    <span class="font-bold text-foreground">metrics.ts</span>
    <span class="text-emerald-600 font-bold">+6 <span class="text-rose-600">-2</span></span>
  </div>
  <div class="divide-y divide-border/20">
    <div class="flex bg-rose-500/10 text-rose-900 p-1 px-2">
      <span class="w-6 select-none font-bold text-rose-600">-</span>
      <pre>const total = items.reduce((a, b) => a + b, 0);</pre>
    </div>
    <div class="flex bg-emerald-500/10 text-emerald-900 p-1 px-2">
      <span class="w-6 select-none font-bold text-emerald-600">+</span>
      <pre>const total = items.length ? items.reduce((a, b) => a + b, 0) : 0;</pre>
    </div>
  </div>
</div>`

    case "terminal-emulator":
      return `<!-- ${k.styleName} · Terminal Emulator -->
<div class="${k.radius} border border-slate-800 bg-slate-950 text-slate-100 p-3 font-mono text-xs shadow-xl space-y-2">
  <div class="flex items-center gap-1.5 pb-2 border-b border-slate-800">
    <span class="h-2.5 w-2.5 rounded-full bg-rose-500/80"></span>
    <span class="h-2.5 w-2.5 rounded-full bg-amber-500/80"></span>
    <span class="h-2.5 w-2.5 rounded-full bg-emerald-500/80"></span>
    <span class="text-[10px] text-slate-400 ml-2">bash — sandboxed</span>
  </div>
  <div class="text-teal-400">developer@chameleon-ui:~$ <span class="text-slate-100 font-semibold">whoami</span></div>
  <div class="text-emerald-400">developer (uid=1000) [Sandboxed execution]</div>
</div>`

    case "log-viewer":
      return `<!-- ${k.styleName} · Log Viewer -->
<div class="${k.radius} border border-border bg-card overflow-hidden font-mono text-xs shadow-xs">
  <div class="p-2.5 bg-muted/30 border-b border-border flex items-center justify-between text-[11px]">
    <span class="font-bold text-foreground">App Logs</span>
    <span class="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-bold">INFO</span>
  </div>
  <div class="p-2 space-y-1.5">
    <div class="flex items-center gap-2 text-[11px]">
      <span class="text-muted-foreground font-mono">10:42:01</span>
      <span class="px-1 rounded bg-teal-500/10 text-teal-600 font-bold text-[9px]">INFO</span>
      <span class="text-foreground">[auth] Access token refreshed.</span>
    </div>
  </div>
</div>`

    case "json-viewer":
      return `<!-- ${k.styleName} · JSON Viewer -->
<div class="${k.radius} border border-border bg-card p-3 font-mono text-xs shadow-xs space-y-1">
  <div class="text-muted-foreground font-bold">{</div>
  <div class="pl-4 text-indigo-600 font-semibold">"status": <span class="text-emerald-600">"active"</span>,</div>
  <div class="pl-4 text-indigo-600 font-semibold">"nodes": <span class="text-amber-600">4</span>,</div>
  <div class="pl-4 text-indigo-600 font-semibold">"healthy": <span class="text-sky-500">true</span></div>
  <div class="text-muted-foreground font-bold">}</div>
</div>`

    default:
      return `<!-- ${k.styleName} · ${componentId} -->\n<div class="${k.radius} border border-border bg-card p-4">Component: ${componentId}</div>`
  }
}
