"use client"

import * as React from "react"
import {
  ToggleLeft,
  ToggleRight,
  Plus,
  Sliders,
  Users,
  Search,
  Server,
  Info,
  Check,
  Percent,
  SlidersHorizontal,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type FlagEnvironment = "production" | "staging" | "development"

export interface FeatureFlag {
  id: string
  key: string
  name: string
  description: string
  enabled: boolean
  rolloutPercentage: number // 0 to 100
  targetGroups: string[]
  environments: Record<FlagEnvironment, boolean>
  lastUpdated: string
}

export interface FeatureFlagManagerProps extends React.HTMLAttributes<HTMLDivElement> {
  initialFlags?: FeatureFlag[]
  initialEnvironment?: FlagEnvironment
  onFlagChange?: (flags: FeatureFlag[]) => void
}

const DEFAULT_FLAGS: FeatureFlag[] = [
  {
    id: "flag-1",
    key: "ai_smart_autocomplete",
    name: "AI Smart Autocomplete",
    description: "Real-time generative code suggestions in the formula and code editor",
    enabled: true,
    rolloutPercentage: 75,
    targetGroups: ["Internal Staff", "Beta Tier"],
    environments: { production: true, staging: true, development: true },
    lastUpdated: "Today at 09:30 AM",
  },
  {
    id: "flag-2",
    key: "dark_mode_tokens_v2",
    name: "High-Contrast Dark Tokens",
    description: "Revamped WCAG AAA contrast ratio palettes for all 25 styles",
    enabled: true,
    rolloutPercentage: 100,
    targetGroups: ["All Users"],
    environments: { production: true, staging: true, development: true },
    lastUpdated: "Yesterday",
  },
  {
    id: "flag-3",
    key: "webgl_network_acceleration",
    name: "WebGL 3D Graph Acceleration",
    description: "GPU-accelerated force directed canvas rendering for 1,000+ nodes",
    enabled: false,
    rolloutPercentage: 20,
    targetGroups: ["Internal Staff"],
    environments: { production: false, staging: true, development: true },
    lastUpdated: "3 days ago",
  },
  {
    id: "flag-4",
    key: "stripe_embedded_checkout",
    name: "Stripe Embedded Checkout",
    description: "In-dialog subscription checkout flow replacing full redirect page",
    enabled: true,
    rolloutPercentage: 50,
    targetGroups: ["Enterprise Tier", "Beta Tier"],
    environments: { production: true, staging: true, development: true },
    lastUpdated: "Oct 01, 2026",
  },
]

export const FeatureFlagManager = React.forwardRef<HTMLDivElement, FeatureFlagManagerProps>(
  (
    {
      initialFlags = DEFAULT_FLAGS,
      initialEnvironment = "production",
      onFlagChange,
      className,
      ...props
    },
    ref
  ) => {
    const [flags, setFlags] = React.useState<FeatureFlag[]>(initialFlags)
    const [env, setEnv] = React.useState<FlagEnvironment>(initialEnvironment)
    const [searchQuery, setSearchQuery] = React.useState("")
    const [isCreateOpen, setIsCreateOpen] = React.useState(false)
    const [newFlagKey, setNewFlagKey] = React.useState("")
    const [newFlagName, setNewFlagName] = React.useState("")
    const [newFlagDesc, setNewFlagDesc] = React.useState("")

    const toggleFlag = (flagId: string) => {
      const updated = flags.map((f) => {
        if (f.id === flagId) {
          const current = f.environments[env]
          const next = !current
          return {
            ...f,
            environments: {
              ...f.environments,
              [env]: next,
            },
            enabled: env === "production" ? next : f.enabled,
            lastUpdated: "Just now",
          }
        }
        return f
      })
      setFlags(updated)
      onFlagChange?.(updated)
    }

    const setRollout = (flagId: string, percentage: number) => {
      const updated = flags.map((f) => {
        if (f.id === flagId) {
          return { ...f, rolloutPercentage: percentage, lastUpdated: "Just now" }
        }
        return f
      })
      setFlags(updated)
      onFlagChange?.(updated)
    }

    const handleCreateFlag = (e: React.FormEvent) => {
      e.preventDefault()
      if (!newFlagKey.trim() || !newFlagName.trim()) return

      const created: FeatureFlag = {
        id: `flag-${Date.now()}`,
        key: newFlagKey.toLowerCase().replace(/[^a-z0-9_]/g, "_"),
        name: newFlagName.trim(),
        description: newFlagDesc.trim() || "Custom feature toggle flag",
        enabled: true,
        rolloutPercentage: 100,
        targetGroups: ["All Users"],
        environments: { production: false, staging: true, development: true },
        lastUpdated: "Just now",
      }

      const next = [created, ...flags]
      setFlags(next)
      onFlagChange?.(next)
      setIsCreateOpen(false)
      setNewFlagKey("")
      setNewFlagName("")
      setNewFlagDesc("")
    }

    const filteredFlags = React.useMemo(() => {
      return flags.filter((f) => {
        const q = searchQuery.toLowerCase().trim()
        return (
          q === "" ||
          f.key.toLowerCase().includes(q) ||
          f.name.toLowerCase().includes(q) ||
          f.description.toLowerCase().includes(q)
        )
      })
    }, [flags, searchQuery])

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Feature Flag Management Panel"
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
              <SlidersHorizontal className="h-4 w-4" />
            </span>
            <div>
              <h4 className="font-semibold text-foreground">Feature Flag &amp; Rollout Manager</h4>
              <p className="text-[11px] text-muted-foreground">
                Progressive delivery toggles, percentage rollout, and environment segmentation
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCreateOpen(!isCreateOpen)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors shadow-2xs"
          >
            <Plus className="h-3.5 w-3.5" /> New Feature Flag
          </button>
        </div>

        {/* Honest Security Disclaimer */}
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-900 dark:text-blue-200">
          <Info className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="font-semibold">Local State Sandbox:</strong> Feature flag state modifications take immediate effect in this local simulation session. Backend SDK evaluation (e.g. LaunchDarkly/Unleash) is required for persistent multi-tenant server rollout.
          </p>
        </div>

        {/* Environment Selector & Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center rounded-lg border border-border bg-muted/40 p-1 text-xs">
            {(["production", "staging", "development"] as FlagEnvironment[]).map((targetEnv) => (
              <button
                key={targetEnv}
                type="button"
                onClick={() => setEnv(targetEnv)}
                className={cn(
                  "px-3 py-1 rounded-md text-[11px] font-semibold capitalize transition-all",
                  env === targetEnv
                    ? "bg-background text-foreground shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {targetEnv}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-input bg-background text-xs w-full sm:w-64 focus-within:ring-1 focus-within:ring-ring">
            <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search flags by key or name..."
              className="w-full bg-transparent outline-hidden text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* New Feature Flag Inline Form Modal */}
        {isCreateOpen && (
          <form
            onSubmit={handleCreateFlag}
            className="p-4 rounded-xl border border-primary/30 bg-muted/20 space-y-3 text-xs animate-in fade-in duration-150"
          >
            <h5 className="font-bold text-foreground text-xs">Configure New Feature Flag</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-muted-foreground font-semibold block mb-1">
                  Flag Key (camel_case or snake_case)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. experimental_ai_chat"
                  value={newFlagKey}
                  onChange={(e) => setNewFlagKey(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-md border border-input bg-background text-foreground font-mono text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] text-muted-foreground font-semibold block mb-1">
                  Human Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Experimental AI Chat"
                  value={newFlagName}
                  onChange={(e) => setNewFlagName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-md border border-input bg-background text-foreground text-xs"
                />
              </div>
            </div>
            <div>
              <label className="text-[11px] text-muted-foreground font-semibold block mb-1">
                Description &amp; Intended Audience
              </label>
              <input
                type="text"
                placeholder="Explain the purpose of this toggle..."
                value={newFlagDesc}
                onChange={(e) => setNewFlagDesc(e.target.value)}
                className="w-full px-3 py-1.5 rounded-md border border-input bg-background text-foreground text-xs"
              />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="px-3 py-1 rounded-md border border-border text-xs hover:bg-muted"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 rounded-md bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90"
              >
                Create Flag
              </button>
            </div>
          </form>
        )}

        {/* Flag Cards List */}
        <div className="space-y-2.5">
          {filteredFlags.map((flag) => {
            const isFlagActive = flag.environments[env]

            return (
              <div
                key={flag.id}
                className={cn(
                  "p-4 rounded-xl border transition-all duration-150 space-y-3",
                  isFlagActive
                    ? "border-primary/40 bg-card shadow-2xs"
                    : "border-border bg-card/60 opacity-80"
                )}
              >
                {/* Title & Toggle Switch */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h5 className="font-bold text-foreground text-xs">
                        {flag.name}
                      </h5>
                      <code className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                        {flag.key}
                      </code>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {flag.description}
                    </p>
                  </div>

                  {/* Quick Toggle Button */}
                  <button
                    type="button"
                    onClick={() => toggleFlag(flag.id)}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer",
                      isFlagActive
                        ? "bg-emerald-500 text-white"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {isFlagActive ? (
                      <>
                        <ToggleRight className="h-4 w-4" /> Enabled ({env})
                      </>
                    ) : (
                      <>
                        <ToggleLeft className="h-4 w-4" /> Disabled ({env})
                      </>
                    )}
                  </button>
                </div>

                {/* Rollout slider & Audience tags */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-border/60 text-xs">
                  {/* Rollout percentage */}
                  <div className="flex items-center gap-2.5">
                    <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
                      <Percent className="h-3 w-3" /> Rollout:
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={5}
                      value={flag.rolloutPercentage}
                      onChange={(e) => setRollout(flag.id, Number(e.target.value))}
                      className="w-28 accent-primary h-1.5 cursor-pointer"
                    />
                    <span className="font-mono text-xs font-bold text-foreground w-8">
                      {flag.rolloutPercentage}%
                    </span>
                  </div>

                  {/* Target User Groups */}
                  <div className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <div className="flex flex-wrap gap-1">
                      {flag.targetGroups.map((grp) => (
                        <span
                          key={grp}
                          className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium text-[10px]"
                        >
                          {grp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span className="text-[10px] text-muted-foreground font-mono ml-auto">
                    Updated {flag.lastUpdated}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)

FeatureFlagManager.displayName = "FeatureFlagManager"
