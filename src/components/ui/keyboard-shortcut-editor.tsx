"use client"

import * as React from "react"
import {
  Keyboard,
  Command,
  Search,
  AlertTriangle,
  RotateCcw,
  Check,
  Copy,
  Edit2,
  X,
  Plus,
  Trash2,
  ShieldAlert,
  Sparkles,
  Info,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type ShortcutCategory = "general" | "navigation" | "editing" | "view"

export interface ShortcutItem {
  id: string
  name: string
  description: string
  category: ShortcutCategory
  keys: string[]
  isCustomizable?: boolean
  isProtected?: boolean
}

export interface KeyboardShortcutEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  initialShortcuts?: ShortcutItem[]
  onShortcutsChange?: (shortcuts: ShortcutItem[]) => void
}

const DEFAULT_SHORTCUTS: ShortcutItem[] = [
  {
    id: "sc-1",
    name: "Command Palette",
    description: "Open the quick search command palette",
    category: "general",
    keys: ["Meta", "k"],
    isCustomizable: true,
  },
  {
    id: "sc-2",
    name: "Quick Save",
    description: "Commit unsaved changes in current editor",
    category: "editing",
    keys: ["Meta", "s"],
    isCustomizable: true,
  },
  {
    id: "sc-3",
    name: "Toggle Sidebar",
    description: "Expand or collapse navigation drawer",
    category: "view",
    keys: ["Meta", "b"],
    isCustomizable: true,
  },
  {
    id: "sc-4",
    name: "Undo Last Action",
    description: "Revert the most recent modification",
    category: "editing",
    keys: ["Meta", "z"],
    isCustomizable: true,
  },
  {
    id: "sc-5",
    name: "Redo Action",
    description: "Reapply previously reverted modification",
    category: "editing",
    keys: ["Meta", "Shift", "z"],
    isCustomizable: true,
  },
  {
    id: "sc-6",
    name: "Next Navigation Tab",
    description: "Cycle forward through active view panels",
    category: "navigation",
    keys: ["Control", "Tab"],
    isCustomizable: true,
  },
  {
    id: "sc-7",
    name: "Keyboard Help & Cheatsheet",
    description: "Display modal listing all active bindings",
    category: "general",
    keys: ["?"],
    isCustomizable: true,
  },
]

// System shortcuts that must not be hijacked by web applications
const SYSTEM_PROTECTED_COMBOS = [
  "Control+w",
  "Meta+w",
  "Control+t",
  "Meta+t",
  "Control+n",
  "Meta+n",
  "Control+q",
  "Meta+q",
  "Alt+F4",
  "Control+Alt+Delete",
]

function formatKey(key: string): string {
  switch (key.toLowerCase()) {
    case "meta":
      return "⌘"
    case "control":
    case "ctrl":
      return "⌃"
    case "alt":
      return "⌥"
    case "shift":
      return "⇧"
    case "enter":
      return "↵"
    case "arrowup":
      return "↑"
    case "arrowdown":
      return "↓"
    case "arrowleft":
      return "←"
    case "arrowright":
      return "→"
    case "escape":
      return "Esc"
    case "backspace":
      return "⌫"
    default:
      return key.toUpperCase()
  }
}

function normalizeKeyCombo(keys: string[]): string {
  const mods: string[] = []
  let char = ""

  keys.forEach((k) => {
    const lk = k.toLowerCase()
    if (["meta", "cmd"].includes(lk)) mods.push("Meta")
    else if (["control", "ctrl"].includes(lk)) mods.push("Control")
    else if (["alt", "option"].includes(lk)) mods.push("Alt")
    else if (lk === "shift") mods.push("Shift")
    else char = lk
  })

  mods.sort()
  return [...mods, char].filter(Boolean).join("+")
}

export const KeyboardShortcutEditor = React.forwardRef<HTMLDivElement, KeyboardShortcutEditorProps>(
  (
    {
      initialShortcuts = DEFAULT_SHORTCUTS,
      onShortcutsChange,
      className,
      ...props
    },
    ref
  ) => {
    const [shortcuts, setShortcuts] = React.useState<ShortcutItem[]>(initialShortcuts)
    const [selectedCategory, setSelectedCategory] = React.useState<string>("all")
    const [searchQuery, setSearchQuery] = React.useState("")
    const [recordingId, setRecordingId] = React.useState<string | null>(null)
    const [recordedKeys, setRecordedKeys] = React.useState<string[]>([])
    const [testQuery, setTestQuery] = React.useState("")
    const [matchedShortcut, setMatchedShortcut] = React.useState<ShortcutItem | null>(null)
    const [copied, setCopied] = React.useState(false)

    // Conflict detection engine
    const conflicts = React.useMemo(() => {
      const map = new Map<string, string[]>()
      shortcuts.forEach((sc) => {
        const combo = normalizeKeyCombo(sc.keys)
        const list = map.get(combo) || []
        list.push(sc.id)
        map.set(combo, list)
      })

      const conflictingIds = new Set<string>()
      map.forEach((ids) => {
        if (ids.length > 1) {
          ids.forEach((id) => conflictingIds.add(id))
        }
      })
      return conflictingIds
    }, [shortcuts])

    // Keydown listener when recording a shortcut
    React.useEffect(() => {
      if (!recordingId) return

      const handleKeyDown = (e: KeyboardEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (e.key === "Escape") {
          setRecordingId(null)
          setRecordedKeys([])
          return
        }

        const keys: string[] = []
        if (e.metaKey) keys.push("Meta")
        if (e.ctrlKey) keys.push("Control")
        if (e.altKey) keys.push("Alt")
        if (e.shiftKey) keys.push("Shift")

        const isModifier = ["Meta", "Control", "Alt", "Shift"].includes(e.key)
        if (!isModifier) {
          keys.push(e.key)
        }

        setRecordedKeys(keys)

        // If a non-modifier key was pressed, save immediately
        if (!isModifier && keys.length > 0) {
          const combo = normalizeKeyCombo(keys)
          if (SYSTEM_PROTECTED_COMBOS.includes(combo)) {
            alert(`Shortcut "${combo}" is protected by the browser or operating system and cannot be rebound.`)
            return
          }

          setShortcuts((prev) => {
            const next = prev.map((item) =>
              item.id === recordingId ? { ...item, keys } : item
            )
            onShortcutsChange?.(next)
            return next
          })
          setRecordingId(null)
          setRecordedKeys([])
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [recordingId, onShortcutsChange])

    const handleResetDefaults = () => {
      setShortcuts(DEFAULT_SHORTCUTS)
      onShortcutsChange?.(DEFAULT_SHORTCUTS)
      setRecordingId(null)
      setMatchedShortcut(null)
    }

    const handleCopyConfig = () => {
      const configJson = JSON.stringify(shortcuts, null, 2)
      navigator.clipboard.writeText(configJson)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    const handleTestKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      e.preventDefault()
      e.stopPropagation()

      const pressed: string[] = []
      if (e.metaKey) pressed.push("Meta")
      if (e.ctrlKey) pressed.push("Control")
      if (e.altKey) pressed.push("Alt")
      if (e.shiftKey) pressed.push("Shift")

      const isModifier = ["Meta", "Control", "Alt", "Shift"].includes(e.key)
      if (!isModifier) {
        pressed.push(e.key)
      }

      const comboStr = pressed.map(formatKey).join(" + ")
      setTestQuery(comboStr)

      const normalized = normalizeKeyCombo(pressed)
      const found = shortcuts.find((sc) => normalizeKeyCombo(sc.keys) === normalized)
      setMatchedShortcut(found || null)
    }

    const filteredShortcuts = React.useMemo(() => {
      return shortcuts.filter((sc) => {
        const matchesCategory =
          selectedCategory === "all" || sc.category === selectedCategory
        const matchesQuery =
          searchQuery === "" ||
          sc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sc.keys.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()))
        return matchesCategory && matchesQuery
      })
    }, [shortcuts, selectedCategory, searchQuery])

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Keyboard Shortcut Editor and Sandbox"
        className={cn(
          "w-full rounded-xl border border-border bg-card shadow-2xs p-4 space-y-4 select-none",
          className
        )}
        {...props}
      >
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-primary/10 text-primary">
              <Keyboard className="h-4 w-4" />
            </span>
            <div>
              <h4 className="font-semibold text-foreground">Keyboard Shortcut Editor</h4>
              <p className="text-[11px] text-muted-foreground">
                Configure key bindings, verify conflict safety, and test keystrokes live
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-background hover:bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="h-3 w-3" /> Reset Defaults
            </button>
            <button
              type="button"
              onClick={handleCopyConfig}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition-colors shadow-2xs"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copied JSON" : "Export JSON"}
            </button>
          </div>
        </div>

        {/* Safety Disclaimer */}
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-900 dark:text-blue-200">
          <Info className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="font-semibold">Conflict &amp; OS Protection:</strong> Essential browser keybindings (such as <code className="px-1 py-0.5 rounded bg-blue-500/20 font-mono">Ctrl+W</code> or <code className="px-1 py-0.5 rounded bg-blue-500/20 font-mono">Alt+F4</code>) are protected against remapping to guarantee user system stability.
          </p>
        </div>

        {/* Testing Sandbox & Recording Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3.5 rounded-lg border border-border bg-muted/30">
          {/* Keypress Test Field */}
          <div className="space-y-1.5 text-xs">
            <span className="font-semibold text-foreground flex items-center gap-1.5">
              <Command className="h-3.5 w-3.5 text-primary" />
              Live Shortcut Test Area
            </span>
            <input
              type="text"
              readOnly
              value={testQuery}
              onKeyDown={handleTestKeyDown}
              placeholder="Focus here and press any key combination..."
              className="w-full px-3 py-2 rounded-lg border border-input bg-background font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground/70"
            />
            {matchedShortcut ? (
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <Check className="h-3 w-3" /> Matched Action: <strong>{matchedShortcut.name}</strong> ({matchedShortcut.category})
              </p>
            ) : testQuery ? (
              <p className="text-[11px] text-amber-600 dark:text-amber-400">
                No active binding assigned to &quot;{testQuery}&quot;
              </p>
            ) : (
              <p className="text-[10px] text-muted-foreground">
                Type keys to verify how bindings resolve in the application
              </p>
            )}
          </div>

          {/* Active Status / Conflict Summary */}
          <div className="flex flex-col justify-between text-xs space-y-2 p-2 rounded bg-background/80 border border-border">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-[11px]">Configured Shortcuts:</span>
              <span className="font-mono font-bold text-foreground">{shortcuts.length} bindings</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-[11px]">Conflict Status:</span>
              {conflicts.size > 0 ? (
                <span className="font-mono font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1 text-[11px]">
                  <AlertTriangle className="h-3 w-3" /> {conflicts.size} Colliding Bindings
                </span>
              ) : (
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 text-[11px]">
                  <Check className="h-3 w-3" /> 0 Conflicts Detected
                </span>
              )}
            </div>
            {recordingId && (
              <div className="p-1.5 rounded bg-primary/10 border border-primary/30 text-primary text-[11px] animate-pulse">
                Recording keypress... Press your combination or <strong>Esc</strong> to cancel.
              </div>
            )}
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 bg-muted/40 p-1 rounded-lg border border-border text-xs">
            {(["all", "general", "navigation", "editing", "view"] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-2.5 py-1 rounded-md text-xs font-semibold capitalize transition-all",
                  selectedCategory === cat
                    ? "bg-background text-foreground shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[200px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search shortcuts..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-input bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Shortcuts Table / List */}
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
              <tr>
                <th className="py-2.5 px-3">Action Name</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Assigned Key Combination</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredShortcuts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-muted-foreground">
                    No shortcuts matched the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredShortcuts.map((sc) => {
                  const hasConflict = conflicts.has(sc.id)
                  const isRecordingThis = recordingId === sc.id

                  return (
                    <tr
                      key={sc.id}
                      className={cn(
                        "hover:bg-muted/20 transition-colors",
                        hasConflict && "bg-rose-500/5",
                        isRecordingThis && "bg-primary/5"
                      )}
                    >
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-foreground">{sc.name}</div>
                        <div className="text-[11px] text-muted-foreground">{sc.description}</div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold bg-muted text-muted-foreground">
                          {sc.category}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        {isRecordingThis ? (
                          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded border border-primary bg-primary/10 text-primary font-mono text-xs animate-pulse">
                            <span>Press keys...</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {sc.keys.map((k, i) => (
                              <kbd
                                key={i}
                                className="px-2 py-1 rounded bg-muted/80 border border-border/80 shadow-2xs font-mono font-semibold text-foreground text-xs"
                              >
                                {formatKey(k)}
                              </kbd>
                            ))}
                            {hasConflict && (
                              <span
                                title="Collision detected: This combination is already bound to another action."
                                className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold text-[10px]"
                              >
                                <AlertTriangle className="h-3 w-3" /> Conflict
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            if (isRecordingThis) {
                              setRecordingId(null)
                            } else {
                              setRecordingId(sc.id)
                            }
                          }}
                          className={cn(
                            "inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors",
                            isRecordingThis
                              ? "bg-rose-500 text-white border-rose-500"
                              : "border-border bg-background hover:bg-muted text-foreground"
                          )}
                        >
                          <Edit2 className="h-3 w-3" />
                          {isRecordingThis ? "Cancel" : "Rebind"}
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
)
KeyboardShortcutEditor.displayName = "KeyboardShortcutEditor"
