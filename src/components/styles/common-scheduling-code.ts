import type { Mode, StyleSlug } from "@/lib/styles/types"
import { getStyleFormKit } from "./common-form-kit"

export function getSchedulingCodeForStyle(slug: StyleSlug, componentId: string, mode: Mode): string {
  const k = getStyleFormKit(slug, mode)

  switch (componentId) {
    case "agenda-view":
      return `<!-- ${k.styleName} · Agenda View -->
<div class="flex flex-col ${k.radius} border border-border bg-card overflow-hidden shadow-xs">
  <div class="flex items-center justify-between border-b border-border bg-muted/20 p-3 text-xs">
    <div class="flex items-center gap-2">
      <Calendar class="h-4 w-4 text-primary" />
      <span class="font-bold text-foreground">Agenda Schedule</span>
    </div>
    <span class="text-[11px] text-muted-foreground font-mono">Today</span>
  </div>
  <div class="p-4 space-y-2.5">
    <div class="flex items-center justify-between p-3 ${k.radius} border border-border bg-card hover:bg-muted/30">
      <div class="flex flex-col gap-0.5">
        <span class="text-xs font-bold text-foreground">Sprint Architecture Review</span>
        <span class="text-[11px] text-muted-foreground">10:00 AM – 11:30 AM • Studio 4B</span>
      </div>
      <span class="rounded bg-emerald-500/10 text-emerald-600 px-2 py-0.5 text-[10px] font-semibold">Confirmed</span>
    </div>
  </div>
</div>`

    case "gantt-chart":
      return `<!-- ${k.styleName} · Gantt Chart -->
<div class="flex flex-col ${k.radius} border border-border bg-card overflow-hidden shadow-xs">
  <div class="flex items-center justify-between border-b border-border bg-muted/20 p-3 text-xs">
    <span class="font-bold text-foreground">Project Roadmap</span>
    <span class="text-[11px] font-mono text-muted-foreground">October 2026</span>
  </div>
  <div class="p-4 space-y-3">
    <div class="flex items-center justify-between text-xs">
      <span class="font-medium text-foreground">Frontend Delivery</span>
      <div class="w-2/3 h-5 bg-muted/50 rounded-md overflow-hidden relative">
        <div class="h-full bg-primary/80 rounded-md" style="width: 65%;"></div>
      </div>
    </div>
  </div>
</div>`

    case "dependency-graph":
      return `<!-- ${k.styleName} · Dependency Graph -->
<div class="flex flex-col ${k.radius} border border-border bg-card overflow-hidden shadow-xs">
  <div class="flex items-center justify-between border-b border-border bg-muted/20 p-3 text-xs">
    <span class="font-bold text-foreground">Topology & Relationships</span>
    <span class="text-[10px] font-mono text-emerald-600 font-semibold">DAG Validated</span>
  </div>
  <div class="p-6 flex items-center justify-center gap-6">
    <div class="p-3 ${k.radius} border border-primary bg-primary/10 text-center text-xs font-bold">API Gateway</div>
    <div class="h-[2px] w-8 bg-border"></div>
    <div class="p-3 ${k.radius} border border-border bg-card text-center text-xs font-bold">Auth Service</div>
  </div>
</div>`

    case "flowchart-editor":
      return `<!-- ${k.styleName} · Flowchart Editor -->
<div class="flex flex-col ${k.radius} border border-border bg-card overflow-hidden shadow-xs">
  <div class="flex items-center justify-between border-b border-border bg-muted/20 p-3 text-xs">
    <span class="font-bold text-foreground">Flowchart Diagram</span>
    <div class="flex gap-1">
      <button class="${k.btnPrimarySm} ${k.radius} px-2 py-0.5 text-xs">Add Node</button>
    </div>
  </div>
  <div class="p-6 flex items-center justify-center gap-4 bg-muted/10">
    <div class="px-4 py-2 rounded-full border-2 border-emerald-500 bg-emerald-500/10 text-xs font-bold">Start</div>
    <div class="h-[2px] w-6 bg-border"></div>
    <div class="px-4 py-2 ${k.radius} border border-border bg-card text-xs font-bold">Process Input</div>
  </div>
</div>`

    case "node-based-editor":
      return `<!-- ${k.styleName} · Node-Based Editor -->
<div class="flex flex-col ${k.radius} border border-border bg-card overflow-hidden shadow-xs">
  <div class="flex items-center justify-between border-b border-border bg-muted/20 p-3 text-xs">
    <span class="font-bold text-foreground">Visual Node Graph</span>
    <span class="text-[10px] font-mono text-primary font-semibold">3 Nodes • 2 Cables</span>
  </div>
  <div class="p-6 flex items-center justify-center gap-8 bg-muted/15">
    <div class="p-3 ${k.radius} border border-border bg-card shadow-sm text-xs font-bold">
      <div class="border-b pb-1 mb-2 font-mono text-[10px] text-muted-foreground">Oscillator</div>
      <div class="flex justify-between items-center gap-4 text-[10px]">
        <span>Out</span>
        <span class="h-2.5 w-2.5 rounded-full bg-blue-500"></span>
      </div>
    </div>
  </div>
</div>`

    case "workflow-builder":
      return `<!-- ${k.styleName} · Workflow Builder -->
<div class="flex flex-col ${k.radius} border border-border bg-card overflow-hidden shadow-xs">
  <div class="flex items-center justify-between border-b border-border bg-muted/20 p-3 text-xs">
    <span class="font-bold text-foreground">Automation Pipeline</span>
    <span class="text-[10px] font-mono text-muted-foreground">Client Configuration</span>
  </div>
  <div class="p-4 space-y-2">
    <div class="p-3 ${k.radius} border border-primary bg-primary/5 flex items-center justify-between">
      <div class="flex items-center gap-2 text-xs">
        <Zap class="h-4 w-4 text-amber-500" />
        <span class="font-bold">Webhook Trigger: New Lead</span>
      </div>
      <span class="text-[10px] text-primary font-mono">Active</span>
    </div>
  </div>
</div>`

    case "chat-message":
      return `<!-- ${k.styleName} · Chat Message -->
<div class="flex items-start gap-2.5 text-xs py-1">
  <div class="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold text-xs uppercase">
    SC
  </div>
  <div class="flex flex-col space-y-1 max-w-[70%]">
    <span class="text-[11px] font-semibold text-foreground">Sarah Chen • 10:14 AM</span>
    <div class="p-3 rounded-2xl rounded-tl-xs border border-border/60 bg-muted/70 text-foreground leading-relaxed">
      Welcome to Chameleon UI! All scheduling and workflow components are fully responsive.
    </div>
  </div>
</div>`

    case "chat-window":
      return `<!-- ${k.styleName} · Chat Window -->
<div class="flex flex-col h-80 ${k.radius} border border-border bg-card overflow-hidden shadow-xs">
  <div class="flex items-center justify-between border-b border-border bg-muted/20 p-3 text-xs">
    <span class="font-bold text-foreground">Team Discussion</span>
    <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
  </div>
  <div class="flex-1 p-4 space-y-3 overflow-y-auto">
    <div class="text-center text-[10px] text-muted-foreground">Conversation Session</div>
  </div>
  <div class="p-2.5 border-t border-border bg-card flex gap-2">
    <input class="flex-1 h-8 rounded-md border border-input px-2 text-xs" placeholder="Write a message..." />
    <button class="${k.btnPrimarySm} ${k.radius} px-3 py-1 text-xs">Send</button>
  </div>
</div>`

    case "chat-composer":
      return `<!-- ${k.styleName} · Chat Composer -->
<div class="flex flex-col ${k.radius} border border-border bg-card p-2.5 shadow-xs">
  <textarea rows="2" class="w-full bg-transparent px-1.5 text-xs resize-none outline-none" placeholder="Type a message..."></textarea>
  <div class="flex items-center justify-between pt-1">
    <button class="p-1 text-muted-foreground hover:text-foreground"><Paperclip class="h-4 w-4" /></button>
    <button class="${k.btnPrimarySm} ${k.radius} px-3 py-1 text-xs font-semibold">Send</button>
  </div>
</div>`

    case "typing-indicator":
      return `<!-- ${k.styleName} · Typing Indicator -->
<div class="inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl rounded-tl-xs border border-border bg-muted/70 text-foreground shadow-2xs">
  <span class="h-2 w-2 rounded-full bg-primary animate-bounce"></span>
  <span class="h-2 w-2 rounded-full bg-primary animate-bounce" style="animation-delay: 150ms;"></span>
  <span class="h-2 w-2 rounded-full bg-primary animate-bounce" style="animation-delay: 300ms;"></span>
</div>`

    default:
      return ""
  }
}
