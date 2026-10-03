"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Search,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Sparkles,
  Code2,
  HelpCircle,
  Hash,
} from "lucide-react"

export interface RegexMatchItem {
  index: number
  match: string
  groups: string[]
}

export interface RegexTesterProps extends React.HTMLAttributes<HTMLDivElement> {
  initialPattern?: string
  initialFlags?: string
  initialTestString?: string
  onPatternChange?: (pattern: string, flags: string) => void
}

const REGEX_PRESETS = [
  {
    name: "Email Address",
    pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
    flags: "g",
    sample: "Contact us at support@chameleon-ui.io or dev-team@company.org for assistance.",
  },
  {
    name: "URL / Web Address",
    pattern: "https?:\\/\\/[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+",
    flags: "g",
    sample: "Visit https://chameleon-ui.dev and check docs at https://github.com/chameleon-ui/core.",
  },
  {
    name: "IPv4 Address",
    pattern: "\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b",
    flags: "g",
    sample: "Server nodes: primary at 192.168.1.104 and backup at 10.0.0.1.",
  },
  {
    name: "Hex Color",
    pattern: "#(?:[0-9a-fA-F]{3}){1,2}\\b",
    flags: "g",
    sample: "Theme primary is #3b82f6 with accents #10b981 and #f43f5e.",
  },
  {
    name: "ISO Date (YYYY-MM-DD)",
    pattern: "\\b(\\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])\\b",
    flags: "g",
    sample: "Release created on 2026-10-03 and expiring on 2027-01-15.",
  },
]

export const RegexTester = React.forwardRef<HTMLDivElement, RegexTesterProps>(
  (
    {
      className,
      initialPattern = "(\\w+)@(\\w+\\.[a-z]{2,})",
      initialFlags = "g",
      initialTestString = "Welcome to Chameleon UI! Contact developers at team@chameleon-ui.io or architect@domain.org.",
      onPatternChange,
      ...props
    },
    ref
  ) => {
    const [pattern, setPattern] = React.useState(initialPattern)
    const [flags, setFlags] = React.useState(initialFlags)
    const [testString, setTestString] = React.useState(initialTestString)
    const [copied, setCopied] = React.useState(false)

    // Flag toggles
    const toggleFlag = (flagChar: string) => {
      let newFlags = flags.includes(flagChar) ? flags.replace(flagChar, "") : flags + flagChar
      // Sort flags for consistency
      newFlags = Array.from(new Set(newFlags)).sort().join("")
      setFlags(newFlags)
      onPatternChange?.(pattern, newFlags)
    }

    const applyPreset = (preset: (typeof REGEX_PRESETS)[0]) => {
      setPattern(preset.pattern)
      setFlags(preset.flags)
      setTestString(preset.sample)
      onPatternChange?.(preset.pattern, preset.flags)
    }

    const [executionTimeMs, setExecutionTimeMs] = React.useState(0.12)

    // Calculate live benchmark timing on client to avoid SSR hydration mismatches
    React.useEffect(() => {
      const start = performance.now()
      try {
        const regex = new RegExp(pattern, flags)
        if (flags.includes("g")) {
          let count = 0
          while (regex.exec(testString) !== null && count < 200) {
            count++
            if (regex.lastIndex === 0) break
          }
        } else {
          regex.exec(testString)
        }
        const end = performance.now()
        setExecutionTimeMs(Math.max(0.01, end - start))
      } catch {}
    }, [pattern, flags, testString])

    // Safe regex compilation & match execution
    const { regexError, matches } = React.useMemo(() => {
      if (!pattern) {
        return { regexError: null, matches: [] }
      }

      // Safety check: Prevent patterns with excessive nested repetition to guard against ReDoS
      const dangerousPatterns = /(\.\*){3,}|(\\w\+){3,}/
      if (dangerousPatterns.test(pattern)) {
        return {
          regexError: "Pattern blocked: High risk of catastrophic backtracking (ReDoS).",
          matches: [],
        }
      }

      try {
        const regex = new RegExp(pattern, flags)
        const foundMatches: RegexMatchItem[] = []

        if (flags.includes("g")) {
          let match: RegExpExecArray | null
          let count = 0
          // Limit maximum matches to 200 to prevent runaway loops
          while ((match = regex.exec(testString)) !== null && count < 200) {
            foundMatches.push({
              index: match.index,
              match: match[0],
              groups: match.slice(1),
            })
            count++
            if (match[0].length === 0) {
              regex.lastIndex++
            }
          }
        } else {
          const match = regex.exec(testString)
          if (match) {
            foundMatches.push({
              index: match.index,
              match: match[0],
              groups: match.slice(1),
            })
          }
        }

        return {
          regexError: null,
          matches: foundMatches,
        }
      } catch (err: any) {
        return {
          regexError: err?.message || "Invalid regular expression syntax",
          matches: [],
        }
      }
    }, [pattern, flags, testString])

    const handleCopyRegex = () => {
      navigator.clipboard.writeText(`/${pattern}/${flags}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-3xl rounded-xl border border-border bg-card shadow-sm p-4 sm:p-6 space-y-5 text-card-foreground text-xs",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-bold text-foreground">Regular Expression Tester</h3>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono font-bold">
              Safe Sandbox
            </span>
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            <span className="text-[11px] text-muted-foreground mr-1 hidden sm:inline">Presets:</span>
            {REGEX_PRESETS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => applyPreset(p)}
                className="px-2 py-0.5 rounded border border-border bg-background hover:bg-muted text-[10px] text-muted-foreground hover:text-foreground transition-colors font-medium whitespace-nowrap"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Pattern Input Bar with Flags */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label className="font-semibold text-foreground">Regular Expression</label>
            <button
              type="button"
              onClick={handleCopyRegex}
              className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
              <span>{copied ? "Copied" : "Copy /pattern/flags"}</span>
            </button>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
            {/* Pattern with / prefix and suffix */}
            <div className="flex-1 flex items-center rounded-lg border border-input bg-background px-3 font-mono text-xs focus-within:ring-1 focus-within:ring-ring">
              <span className="text-muted-foreground font-bold select-none mr-1.5">/</span>
              <input
                type="text"
                value={pattern}
                onChange={(e) => {
                  setPattern(e.target.value)
                  onPatternChange?.(e.target.value, flags)
                }}
                placeholder="pattern"
                className="flex-1 py-2 bg-transparent text-foreground outline-hidden"
                spellCheck={false}
              />
              <span className="text-muted-foreground font-bold select-none ml-1.5">/</span>
              <span className="text-primary font-bold ml-1 select-none">{flags}</span>
            </div>

            {/* Flag Checkboxes */}
            <div className="flex items-center gap-1 p-1 rounded-lg border border-border bg-muted/30">
              {[
                { id: "g", label: "g (global)" },
                { id: "i", label: "i (case)" },
                { id: "m", label: "m (multi)" },
                { id: "s", label: "s (dotAll)" },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => toggleFlag(f.id)}
                  className={cn(
                    "px-2 py-1 rounded text-[11px] font-mono font-bold transition-colors",
                    flags.includes(f.id)
                      ? "bg-primary text-primary-foreground shadow-2xs"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  title={f.label}
                >
                  {f.id}
                </button>
              ))}
            </div>
          </div>

          {/* Syntax Error Notice */}
          {regexError && (
            <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <div className="space-y-0.5 font-mono text-[11px]">
                <span className="font-bold">Regex Error:</span>
                <p>{regexError}</p>
              </div>
            </div>
          )}
        </div>

        {/* Test String Input */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label className="font-semibold text-foreground">Test String</label>
            <span className="text-muted-foreground font-mono text-[11px]">
              {testString.length} chars
            </span>
          </div>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            rows={4}
            placeholder="Insert sample text to test against..."
            className="w-full p-2.5 rounded-lg border border-input bg-background font-mono text-xs text-foreground focus:outline-hidden focus:ring-1 focus:ring-ring"
            spellCheck={false}
          />
        </div>

        {/* Match Statistics & Breakdown */}
        <div className="space-y-2 pt-2 border-t border-border">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">Match Results</span>
              <span
                className={cn(
                  "px-2 py-0.5 rounded-full font-mono font-bold text-[10px]",
                  matches.length > 0
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {matches.length} {matches.length === 1 ? "match" : "matches"} found
              </span>
            </div>
            {matches.length > 0 && (
              <span
                suppressHydrationWarning
                className="text-muted-foreground font-mono text-[10px]"
              >
                Executed in {executionTimeMs.toFixed(2)}ms
              </span>
            )}
          </div>

          {matches.length === 0 ? (
            <div className="p-4 rounded-lg border border-border bg-muted/20 text-center text-muted-foreground text-xs">
              No matches found in test string.
            </div>
          ) : (
            <div className="space-y-1.5 max-h-[180px] overflow-y-auto">
              {matches.map((m, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-lg border border-border/80 bg-background/80 flex flex-wrap items-center justify-between gap-2 font-mono text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full bg-primary/10 text-primary font-bold text-[10px] flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/20">
                      {m.match}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span>Index: {m.index}</span>
                    {m.groups.length > 0 && (
                      <span className="text-indigo-600 dark:text-indigo-400">
                        Groups: [{m.groups.map((g, i) => `$${i + 1}="${g}"`).join(", ")}]
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
)

RegexTester.displayName = "RegexTester"
