"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Terminal as TerminalIcon, Copy, Check, Trash2, Shield, Info } from "lucide-react"

export interface TerminalOutputLine {
  id: string
  type: "input" | "output" | "error" | "info" | "success" | "system"
  text: string
  timestamp?: string
}

export interface TerminalEmulatorProps extends React.HTMLAttributes<HTMLDivElement> {
  initialHistory?: TerminalOutputLine[]
  promptPrefix?: string
  title?: string
  welcomeMessage?: string
  readOnly?: boolean
  maxLines?: number
  onExecuteCommand?: (cmd: string) => void
}

const DEFAULT_WELCOME = `Chameleon UI Sandboxed Terminal [Version 2.4.0]
(c) Chameleon UI Open Source Design System. Safe client-side sandbox.
Type "help" to see available simulated commands.
`

export const TerminalEmulator = React.forwardRef<HTMLDivElement, TerminalEmulatorProps>(
  (
    {
      className,
      initialHistory,
      promptPrefix = "developer@chameleon-ui:~$",
      title = "sandboxed-bash — 80x24",
      welcomeMessage = DEFAULT_WELCOME,
      readOnly = false,
      maxLines = 150,
      onExecuteCommand,
      ...props
    },
    ref
  ) => {
    const [lines, setLines] = React.useState<TerminalOutputLine[]>(() => {
      if (initialHistory) return initialHistory
      return [
        {
          id: "w-1",
          type: "system",
          text: welcomeMessage,
        },
      ]
    })
    const [inputVal, setInputVal] = React.useState("")
    const [historyList, setHistoryList] = React.useState<string[]>([])
    const [historyIdx, setHistoryIdx] = React.useState<number>(-1)
    const [copied, setCopied] = React.useState(false)

    const scrollContainerRef = React.useRef<HTMLDivElement>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)

    // Auto-scroll on new output
    React.useEffect(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
      }
    }, [lines])

    const handleCopyAll = () => {
      const fullText = lines.map((l) => (l.type === "input" ? `${promptPrefix} ${l.text}` : l.text)).join("\n")
      navigator.clipboard.writeText(fullText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    const handleClear = () => {
      setLines([])
    }

    // Pure safe in-browser sandbox command interpreter
    const executeSimulatedCommand = (rawCmd: string) => {
      const trimmed = rawCmd.trim()
      if (!trimmed) {
        setLines((prev) => [
          ...prev,
          { id: `in-${Date.now()}`, type: "input", text: "" },
        ])
        return
      }

      // Add to command history
      setHistoryList((prev) => [...prev, trimmed])
      setHistoryIdx(-1)

      // Add input line
      const inputEntry: TerminalOutputLine = {
        id: `in-${Date.now()}`,
        type: "input",
        text: trimmed,
      }

      const args = trimmed.split(" ")
      const root = args[0].toLowerCase()
      const param = args.slice(1).join(" ")

      const outputEntries: TerminalOutputLine[] = []

      switch (root) {
        case "help":
          outputEntries.push({
            id: `out-${Date.now()}-1`,
            type: "info",
            text: `Available Sandboxed Commands:
  help       - Print this help message
  clear      - Clear terminal screen
  echo [msg] - Print message to terminal
  whoami     - Display current user context
  date       - Print current local time
  version    - Display Chameleon UI framework version
  ls         - List simulated project files
  cat [file] - View file contents
  ping [host]- Simulate ICMP network latency
  stats      - Display design system metrics`,
          })
          break

        case "clear":
          setLines([])
          onExecuteCommand?.(trimmed)
          return

        case "echo":
          outputEntries.push({
            id: `out-${Date.now()}-echo`,
            type: "output",
            text: param,
          })
          break

        case "whoami":
          outputEntries.push({
            id: `out-${Date.now()}-who`,
            type: "success",
            text: "developer (uid=1000, gid=1000) [Permissions: Client-Side Sandbox]",
          })
          break

        case "date":
          outputEntries.push({
            id: `out-${Date.now()}-date`,
            type: "output",
            text: new Date().toString(),
          })
          break

        case "version":
          outputEntries.push({
            id: `out-${Date.now()}-ver`,
            type: "info",
            text: "Chameleon UI Design System v2.4.0 (Batch 13: Collaboration & Developer Tools)",
          })
          break

        case "ls":
          outputEntries.push({
            id: `out-${Date.now()}-ls`,
            type: "output",
            text: `package.json  components/  styles/  diff-viewer.tsx  terminal-emulator.tsx  log-viewer.tsx`,
          })
          break

        case "cat":
          if (!param) {
            outputEntries.push({
              id: `out-${Date.now()}-cat-err`,
              type: "error",
              text: "cat: missing file operand. Example: cat package.json",
            })
          } else {
            outputEntries.push({
              id: `out-${Date.now()}-cat-ok`,
              type: "output",
              text: `{\n  "name": "chameleon-ui",\n  "file": "${param}",\n  "status": "ready"\n}`,
            })
          }
          break

        case "ping":
          outputEntries.push({
            id: `out-${Date.now()}-ping`,
            type: "success",
            text: `PING ${param || "localhost"} (127.0.0.1): 56 data bytes\n64 bytes: icmp_seq=0 ttl=64 time=0.421 ms\n64 bytes: icmp_seq=1 ttl=64 time=0.388 ms\n--- simulated ping statistics ---`,
          })
          break

        case "stats":
          outputEntries.push({
            id: `out-${Date.now()}-stats`,
            type: "info",
            text: `Design System Metrics:\n• 144 Production Components across 13 Batches\n• 25 Aesthetic Styles Supported\n• 0 Foreign Dependencies (Pure React + Tailwind CSS)`,
          })
          break

        default:
          outputEntries.push({
            id: `out-${Date.now()}-err`,
            type: "error",
            text: `bash: command not found: ${root}. Type "help" for a list of safe simulated commands.`,
          })
          break
      }

      setLines((prev) => {
        const combined = [...prev, inputEntry, ...outputEntries]
        return combined.slice(-maxLines)
      })

      onExecuteCommand?.(trimmed)
    }

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      executeSimulatedCommand(inputVal)
      setInputVal("")
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp") {
        e.preventDefault()
        if (historyList.length === 0) return
        const nextIdx = historyIdx === -1 ? historyList.length - 1 : Math.max(0, historyIdx - 1)
        setHistoryIdx(nextIdx)
        setInputVal(historyList[nextIdx] || "")
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        if (historyList.length === 0 || historyIdx === -1) return
        const nextIdx = historyIdx + 1
        if (nextIdx >= historyList.length) {
          setHistoryIdx(-1)
          setInputVal("")
        } else {
          setHistoryIdx(nextIdx)
          setInputVal(historyList[nextIdx] || "")
        }
      }
    }

    return (
      <div
        ref={ref}
        onClick={() => inputRef.current?.focus()}
        className={cn(
          "w-full rounded-xl border border-border bg-slate-950 text-slate-100 shadow-xl overflow-hidden font-mono text-xs flex flex-col h-[400px]",
          className
        )}
        {...props}
      >
        {/* Window Chrome Header Bar */}
        <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900 border-b border-slate-800 select-none shrink-0">
          <div className="flex items-center gap-2">
            {/* Window control dots */}
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>

            <div className="flex items-center gap-1.5 ml-2 text-slate-400">
              <TerminalIcon className="h-3.5 w-3.5" />
              <span className="font-semibold text-[11px]">{title}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Safe simulation badge */}
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400">
              <Shield className="h-2.5 w-2.5 text-teal-400" />
              <span>Safe Sandbox</span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleClear()
              }}
              className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              title="Clear terminal output"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleCopyAll()
              }}
              className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              title="Copy terminal session"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Scrollable Terminal Screen */}
        <div
          ref={scrollContainerRef}
          className="flex-1 p-3.5 overflow-y-auto space-y-1.5 leading-relaxed selection:bg-slate-700"
        >
          {lines.map((line) => {
            if (line.type === "input") {
              return (
                <div key={line.id} className="flex items-start gap-2 text-slate-200">
                  <span className="text-teal-400 font-bold shrink-0">{promptPrefix}</span>
                  <span className="font-semibold">{line.text}</span>
                </div>
              )
            }

            if (line.type === "error") {
              return (
                <div key={line.id} className="text-rose-400 whitespace-pre-wrap">
                  {line.text}
                </div>
              )
            }

            if (line.type === "success") {
              return (
                <div key={line.id} className="text-emerald-400 whitespace-pre-wrap">
                  {line.text}
                </div>
              )
            }

            if (line.type === "info") {
              return (
                <div key={line.id} className="text-sky-300 whitespace-pre-wrap">
                  {line.text}
                </div>
              )
            }

            return (
              <div key={line.id} className="text-slate-300 whitespace-pre-wrap">
                {line.text}
              </div>
            )
          })}

          {/* Active Interactive Prompt */}
          {!readOnly && (
            <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
              <span className="text-teal-400 font-bold shrink-0">{promptPrefix}</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-slate-100 outline-hidden font-mono text-xs border-none p-0 focus:ring-0"
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
            </form>
          )}
        </div>
      </div>
    )
  }
)

TerminalEmulator.displayName = "TerminalEmulator"
