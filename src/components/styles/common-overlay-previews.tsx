"use client"

import React, { useState } from "react"
import {
  Calendar as CalendarIcon,
  Check,
  Clock,
  Copy,
  ExternalLink,
  Layers,
  LayoutGrid,
  Maximize2,
  MessageCircle,
  MessageSquare,
  MousePointer,
  PanelRight,
  Plus,
  Search,
  Settings,
  Share2,
  Sliders,
  Sparkles,
  Trash2,
  User,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Mode, StyleSlug } from "@/lib/styles/types"
import { getStyleFormKit } from "./common-form-kit"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator } from "@/components/ui/context-menu"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer"
import { CommandPalette, PaletteGroup } from "@/components/ui/command-palette"
import { DatePicker, formatDate } from "@/components/ui/date-picker"
import { TimePicker } from "@/components/ui/time-picker"
import { Calendar } from "@/components/ui/calendar"
import { MegaMenu } from "@/components/ui/mega-menu"
import { FloatingActionButton } from "@/components/ui/floating-action-button"

/* ========================================================================== */
/* 1 · Popover Preview                                                        */
/* ========================================================================== */
export function PopoverPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [width, setWidth] = useState("1280")
  const [height, setHeight] = useState("800")
  const [saved, setSaved] = useState(false)

  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Popover Positioning
        </span>
        {saved && (
          <span className="text-xs text-teal-600 dark:text-teal-400 font-semibold animate-in fade-in-0">
            Dimensions updated!
          </span>
        )}
      </div>

      <div className={cn("p-8 border flex flex-col items-center justify-center gap-3", k.panel, k.radius)}>
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={cn("px-4 py-2 text-xs font-bold rounded-lg shadow-xs flex items-center gap-2", k.btnPrimary)}
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>Canvas Dimensions</span>
            </button>
          </PopoverTrigger>

          <PopoverContent className={cn("w-72 p-4 border space-y-3.5 shadow-xl", k.panel, k.radius)}>
            <div className="space-y-1">
              <h4 className={cn("font-bold text-xs", k.strong)}>Canvas Settings</h4>
              <p className={cn("text-[11px]", k.muted)}>Configure resolution viewport boundaries.</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="space-y-1">
                <label className={cn("text-[10px] font-mono", k.muted)}>WIDTH (PX)</label>
                <input
                  type="text"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className={cn("w-full px-2 py-1 border text-xs", k.input, k.radius)}
                />
              </div>
              <div className="space-y-1">
                <label className={cn("text-[10px] font-mono", k.muted)}>HEIGHT (PX)</label>
                <input
                  type="text"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className={cn("w-full px-2 py-1 border text-xs", k.input, k.radius)}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSaved(true)
                setTimeout(() => setSaved(false), 2000)
              }}
              className={cn("w-full py-1.5 text-xs font-semibold rounded shadow-xs", k.btnPrimarySm)}
            >
              Apply Dimensions
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

/* ========================================================================== */
/* 2 · Context Menu Preview                                                   */
/* ========================================================================== */
export function ContextMenuPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [lastAction, setLastAction] = useState<string | null>(null)

  return (
    <div className="mx-auto w-full max-w-lg space-y-3">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Context Menu (Right-Click Zone)
        </span>
        <span className={cn("text-xs font-mono", k.muted)}>
          Action: <strong className={k.strong}>{lastAction || "None"}</strong>
        </span>
      </div>

      <ContextMenu>
        <ContextMenuTrigger className={cn("p-10 border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-context-menu text-center transition-colors hover:border-teal-500", k.panel, k.radius)}>
          <MousePointer className={cn("h-6 w-6 text-teal-600 dark:text-teal-400")} />
          <div className={cn("text-xs font-bold", k.strong)}>
            Right-click anywhere inside this target
          </div>
          <p className={cn("text-[11px]", k.muted)}>
            Opens pointer-anchored context menu with keyboard shortcuts.
          </p>
        </ContextMenuTrigger>

        <ContextMenuContent className={cn("w-52 border p-1 shadow-2xl space-y-0.5", k.panel, k.radius)}>
          <ContextMenuItem
            shortcut="⌘D"
            icon={<Copy className="h-3.5 w-3.5" />}
            onClick={() => setLastAction("Duplicated Component")}
          >
            Duplicate
          </ContextMenuItem>
          <ContextMenuItem
            shortcut="⌘C"
            icon={<Layers className="h-3.5 w-3.5" />}
            onClick={() => setLastAction("Copied CSS Tokens")}
          >
            Copy Tokens
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem
            shortcut="⌘E"
            icon={<ExternalLink className="h-3.5 w-3.5" />}
            onClick={() => setLastAction("Exported JSON")}
          >
            Export Spec
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem
            shortcut="⌫"
            icon={<Trash2 className="h-3.5 w-3.5" />}
            onClick={() => setLastAction("Deleted Item")}
            className="text-rose-500 hover:text-rose-600"
          >
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  )
}

/* ========================================================================== */
/* 3 · Hover Card Preview                                                     */
/* ========================================================================== */
export function HoverCardPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)

  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Hover Card Preview
        </span>
        <span className={cn("text-xs", k.muted)}>Hover or focus the username</span>
      </div>

      <div className={cn("p-8 border flex items-center justify-center text-xs", k.panel, k.radius)}>
        <p className={cn("leading-relaxed", k.muted)}>
          Designed by{" "}
          <HoverCard openDelay={150} closeDelay={150}>
            <HoverCardTrigger asChild>
              <span className={cn("font-bold cursor-pointer underline text-teal-600 dark:text-teal-400 hover:opacity-80")}>
                @ada_lovelace
              </span>
            </HoverCardTrigger>

            <HoverCardContent className={cn("w-80 p-4 border space-y-3 shadow-xl", k.panel, k.radius)}>
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center shrink-0">
                  AL
                </div>
                <div className="space-y-0.5 min-w-0 flex-1">
                  <h5 className={cn("font-bold text-xs truncate", k.strong)}>Ada Lovelace</h5>
                  <div className={cn("text-[11px] font-mono", k.muted)}>@ada_lovelace</div>
                  <p className={cn("text-[11px] mt-1 line-clamp-2", k.muted)}>
                    Lead Design Systems Architect. Specializing in responsive ergonomics and design token pipelines.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[11px] pt-2 border-t border-current/10">
                <div><strong className={k.strong}>55</strong> Components</div>
                <div><strong className={k.strong}>25</strong> Styles</div>
                <div><strong className={k.strong}>100%</strong> Free</div>
              </div>
            </HoverCardContent>
          </HoverCard>
          {" "}with full accessibility compliance.
        </p>
      </div>
    </div>
  )
}

/* ========================================================================== */
/* 4 · Drawer / Sheet Preview                                                 */
/* ========================================================================== */
export function DrawerPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [open, setOpen] = useState(false)
  const [projectName, setProjectName] = useState("Antigravity UI Hub")

  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Drawer / Sheet Panel
        </span>
        <span className={cn("text-xs font-mono", k.muted)}>Edge: Right</span>
      </div>

      <div className={cn("p-8 border flex flex-col items-center justify-center gap-3", k.panel, k.radius)}>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <button
              type="button"
              className={cn("px-4 py-2 text-xs font-bold rounded-lg shadow-xs flex items-center gap-2", k.btnPrimary)}
            >
              <PanelRight className="h-4 w-4" />
              <span>Open Project Drawer</span>
            </button>
          </DrawerTrigger>

          <DrawerContent side="right" className={cn("border-l", k.panel)}>
            <DrawerHeader>
              <DrawerTitle className={k.strong}>Project Configuration</DrawerTitle>
              <DrawerDescription className={k.muted}>
                Manage project metadata, build settings, and design token targets.
              </DrawerDescription>
            </DrawerHeader>

            <div className="space-y-4 py-4 text-xs">
              <div className="space-y-1.5">
                <label className={cn("font-semibold", k.strong)}>Project Name</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className={cn("w-full px-3 py-2 border text-xs", k.input, k.radius)}
                />
              </div>

              <div className="space-y-1.5">
                <label className={cn("font-semibold", k.strong)}>Design Tokens Output</label>
                <input
                  type="text"
                  readOnly
                  value="src/styles/tokens.json"
                  className={cn("w-full px-3 py-2 border text-xs font-mono opacity-80", k.input, k.radius)}
                />
              </div>

              <div className="p-3 rounded-lg border border-current/10 bg-current/5 space-y-1">
                <span className={cn("font-bold text-[11px]", k.strong)}>Edge Slide Animations</span>
                <p className={cn("text-[10px]", k.muted)}>
                  Supports right, left, top, and bottom edge anchors with focus trapping and ESC dismissal.
                </p>
              </div>
            </div>

            <DrawerFooter className="gap-2">
              <DrawerClose asChild>
                <button type="button" className={cn("px-3 py-1.5 text-xs rounded", k.btnSecondary)}>
                  Cancel
                </button>
              </DrawerClose>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={cn("px-3 py-1.5 text-xs font-semibold rounded shadow-xs", k.btnPrimarySm)}
              >
                Save Changes
              </button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  )
}

/* ========================================================================== */
/* 5 · Command Palette Preview                                                */
/* ========================================================================== */
export function CommandPalettePreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [open, setOpen] = useState(false)
  const [executed, setExecuted] = useState<string | null>(null)

  const paletteGroups: PaletteGroup[] = [
    {
      category: "Navigation",
      items: [
        {
          id: "p-comp",
          label: "Browse All Components",
          description: "Inspect 55 accessible UI primitives",
          shortcut: "G C",
          icon: <Layers className="h-4 w-4" />,
          onSelect: () => setExecuted("Navigated to Components"),
        },
        {
          id: "p-styles",
          label: "Explore 25 Design Styles",
          description: "Switch between Japandi, Brutalist, Retro, etc.",
          shortcut: "G S",
          icon: <LayoutGrid className="h-4 w-4" />,
          onSelect: () => setExecuted("Navigated to Style Explorer"),
        },
      ],
    },
    {
      category: "System Actions",
      items: [
        {
          id: "p-copy",
          label: "Copy React Import Syntax",
          description: "Fast clipboard export for current component",
          shortcut: "⌘C",
          icon: <Copy className="h-4 w-4" />,
          onSelect: () => setExecuted("Copied React Import"),
        },
        {
          id: "p-theme",
          label: "Toggle Color Scheme",
          description: "Switch preview between Light and Dark",
          shortcut: "⌘T",
          icon: <Sparkles className="h-4 w-4" />,
          onSelect: () => setExecuted("Toggled Theme Mode"),
        },
      ],
    },
  ]

  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Command Palette Modal
        </span>
        <span className={cn("text-xs font-mono", k.muted)}>
          Shortcut: <kbd className="px-1.5 py-0.5 rounded border border-current/20 bg-current/5">⌘K</kbd>
        </span>
      </div>

      <div className={cn("p-8 border flex flex-col items-center justify-center gap-3 text-center", k.panel, k.radius)}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={cn("w-full max-w-sm flex items-center justify-between px-3.5 py-2.5 rounded-lg border text-xs font-medium shadow-xs transition-colors hover:border-teal-500", k.input)}
        >
          <span className="flex items-center gap-2 text-muted-foreground">
            <Search className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            <span>Search commands or categories...</span>
          </span>
          <kbd className="rounded border border-current/20 bg-current/10 px-1.5 py-0.5 font-mono text-[10px]">
            ⌘K
          </kbd>
        </button>

        {executed && (
          <div className="text-xs text-teal-600 dark:text-teal-400 font-semibold flex items-center gap-1.5 animate-in fade-in-0">
            <Check className="h-3.5 w-3.5" />
            <span>Executed: {executed}</span>
          </div>
        )}

        <CommandPalette
          open={open}
          onOpenChange={setOpen}
          groups={paletteGroups}
        />
      </div>
    </div>
  )
}

/* ========================================================================== */
/* 6 · Date Picker Preview                                                    */
/* ========================================================================== */
export function DatePickerPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [date, setDate] = useState<Date | undefined>(() => new Date(2026, 9, 24))

  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Date Picker Input
        </span>
        <span className={cn("text-xs font-mono", k.muted)}>
          Selected: <strong className={k.strong}>{formatDate(date) || "None"}</strong>
        </span>
      </div>

      <div className={cn("p-8 border flex flex-col items-center justify-center gap-3", k.panel, k.radius)}>
        <div className="w-full max-w-xs space-y-1.5">
          <label className={cn("text-xs font-semibold", k.strong)}>Launch Date</label>
          <DatePicker value={date} onValueChange={setDate} />
        </div>
      </div>
    </div>
  )
}

/* ========================================================================== */
/* 7 · Time Picker Preview                                                    */
/* ========================================================================== */
export function TimePickerPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [time, setTime] = useState("02:30 PM")

  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Time Picker Input
        </span>
        <span className={cn("text-xs font-mono", k.muted)}>
          Time: <strong className={k.strong}>{time || "None"}</strong>
        </span>
      </div>

      <div className={cn("p-8 border flex flex-col items-center justify-center gap-3", k.panel, k.radius)}>
        <div className="w-full max-w-xs space-y-1.5">
          <label className={cn("text-xs font-semibold", k.strong)}>Scheduled Deployment</label>
          <TimePicker value={time} onValueChange={setTime} />
        </div>
      </div>
    </div>
  )
}

/* ========================================================================== */
/* 8 · Calendar Preview                                                       */
/* ========================================================================== */
export function CalendarPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [date, setDate] = useState<Date | undefined>(() => new Date(2026, 9, 24))

  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Interactive Calendar Grid
        </span>
        <span className={cn("text-xs font-mono", k.muted)}>
          Day: <strong className={k.strong}>{formatDate(date)}</strong>
        </span>
      </div>

      <div className={cn("p-6 border flex items-center justify-center", k.panel, k.radius)}>
        <Calendar value={date} onValueChange={setDate} />
      </div>
    </div>
  )
}

/* ========================================================================== */
/* 9 · Mega Menu Preview                                                      */
/* ========================================================================== */
export function MegaMenuPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)

  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Mega Menu Multi-Column Flyout
        </span>
        <span className={cn("text-xs", k.muted)}>Click to expand menu</span>
      </div>

      <div className={cn("p-4 border flex items-center justify-between", k.panel, k.radius)}>
        <div className="flex items-center gap-2 font-bold text-xs">
          <LayoutGrid className="h-4 w-4 text-teal-600 dark:text-teal-400" />
          <span className={k.strong}>PLATFORM</span>
        </div>

        <MegaMenu
          label="Explore Architecture"
          columns={[
            {
              heading: "Components",
              items: [
                { title: "Inputs & Forms", description: "10 interactive controls", href: "#" },
                { title: "Feedback & Dialogs", description: "Alerts, modals & drawers", href: "#" },
                { title: "Navigation", description: "Breadcrumbs, pagination, menus", href: "#" },
              ],
            },
            {
              heading: "Design Systems",
              items: [
                { title: "Japandi", description: "Warm minimalism & quiet balance", href: "#" },
                { title: "Brutalist", description: "Bold borders and raw contrast", href: "#" },
                { title: "Glassmorphism", description: "Translucent frosted depth", href: "#" },
              ],
            },
          ]}
          featured={{
            title: "Zero Dependencies",
            description: "Built on native HTML semantics and Tailwind CSS tokens.",
            ctaText: "Browse All Styles",
            href: "/explore",
            tag: "FREE",
          }}
        />
      </div>
    </div>
  )
}

/* ========================================================================== */
/* 10 · Floating Action Button Preview                                        */
/* ========================================================================== */
export function FloatingActionButtonPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [fabStyle, setFabStyle] = useState<"standard" | "extended" | "speed-dial">("speed-dial")
  const [lastAction, setLastAction] = useState<string | null>(null)

  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Floating Action Button (FAB)
        </span>
        <div className="flex items-center gap-1.5 text-[11px]">
          {(["standard", "extended", "speed-dial"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFabStyle(s)}
              className={cn(
                "px-2 py-0.5 rounded capitalize transition-colors text-[10px] font-mono",
                fabStyle === s ? k.btnPrimarySm : k.muted
              )}
            >
              {s.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Simulated Device / Card Frame */}
      <div className={cn("border rounded-2xl p-6 h-56 relative flex flex-col justify-between overflow-hidden shadow-inner", k.panel)}>
        <div>
          <h5 className={cn("font-bold text-xs", k.strong)}>Canvas Workspace</h5>
          <p className={cn("text-[11px] mt-0.5", k.muted)}>
            Floating corner trigger operates smoothly without obscuring content.
          </p>
          {lastAction && (
            <div className="mt-2 text-xs text-teal-600 dark:text-teal-400 font-semibold animate-in fade-in-0">
              Triggered: {lastAction}
            </div>
          )}
        </div>

        {/* Embedded FAB */}
        <div className="self-end">
          {fabStyle === "standard" && (
            <FloatingActionButton
              position="inline"
              label="Create item"
              onClick={() => setLastAction("Standard FAB clicked")}
            />
          )}

          {fabStyle === "extended" && (
            <FloatingActionButton
              position="inline"
              extended
              label="New Project"
              onClick={() => setLastAction("Extended FAB clicked")}
            />
          )}

          {fabStyle === "speed-dial" && (
            <FloatingActionButton
              position="inline"
              label="Speed dial actions"
              actions={[
                { id: "edit", label: "Edit Layer", icon: <Sliders className="h-4 w-4" />, onClick: () => setLastAction("Edit Layer") },
                { id: "share", label: "Share Token", icon: <Share2 className="h-4 w-4" />, onClick: () => setLastAction("Share Token") },
                { id: "delete", label: "Clear Cache", icon: <Trash2 className="h-4 w-4" />, onClick: () => setLastAction("Clear Cache") },
              ]}
            />
          )}
        </div>
      </div>
    </div>
  )
}
