"use client"

import * as React from "react"
import { Cookie, ShieldCheck, Sliders, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export interface CookiePreferences {
  essential: boolean
  analytics: boolean
  marketing: boolean
  timestamp: string
}

export interface CookieBannerProps {
  storageKey?: string
  title?: React.ReactNode
  description?: React.ReactNode
  onAcceptAll?: (prefs: CookiePreferences) => void
  onDeclineAll?: (prefs: CookiePreferences) => void
  onSaveCustom?: (prefs: CookiePreferences) => void
  forceOpen?: boolean
  className?: string
}

const STORAGE_KEY = "ui-hub-cookie-consent"

export function CookieBanner({
  storageKey = STORAGE_KEY,
  title = "We value your privacy",
  description = "We use essential cookies to make our platform operate properly. With your consent, we also use analytical and marketing cookies to enhance your experience and analyze product usage.",
  onAcceptAll,
  onDeclineAll,
  onSaveCustom,
  forceOpen = false,
  className,
}: CookieBannerProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const [isPreferencesOpen, setIsPreferencesOpen] = React.useState(false)

  const [analytics, setAnalytics] = React.useState(true)
  const [marketing, setMarketing] = React.useState(false)

  // Check persisted consent upon mounting
  React.useEffect(() => {
    if (forceOpen) {
      setIsVisible(true)
      return
    }

    try {
      const stored = localStorage.getItem(storageKey)
      if (!stored) {
        setIsVisible(true)
      } else {
        const parsed = JSON.parse(stored) as CookiePreferences
        setAnalytics(parsed.analytics ?? true)
        setMarketing(parsed.marketing ?? false)
      }
    } catch {
      setIsVisible(true)
    }
  }, [storageKey, forceOpen])

  const saveConsent = (prefs: CookiePreferences) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(prefs))
    } catch {
      // Storage unavailable fallback
    }
    setIsVisible(false)
    setIsPreferencesOpen(false)
  }

  const handleAcceptAll = () => {
    const prefs: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    }
    saveConsent(prefs)
    onAcceptAll?.(prefs)
  }

  const handleDeclineAll = () => {
    const prefs: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    }
    saveConsent(prefs)
    onDeclineAll?.(prefs)
  }

  const handleSaveCustom = () => {
    const prefs: CookiePreferences = {
      essential: true,
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
    }
    saveConsent(prefs)
    onSaveCustom?.(prefs)
  }

  if (!isVisible && !forceOpen) return null

  return (
    <aside
      role="dialog"
      aria-label="Cookie consent banner"
      aria-modal={isPreferencesOpen ? "true" : undefined}
      className={cn(
        "fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-2xl rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xl text-card-foreground animate-in slide-in-from-bottom-5 duration-300",
        className
      )}
    >
      {!isPreferencesOpen ? (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3.5">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Cookie className="h-5 w-5" />
            </span>
            <div className="space-y-1">
              <h4 className="text-sm font-bold tracking-tight text-foreground">
                {title}
              </h4>
              <p className="text-xs leading-relaxed text-muted-foreground max-w-lg">
                {description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsPreferencesOpen(true)}
              className="text-xs"
            >
              <Sliders className="h-3.5 w-3.5 mr-1.5" />
              Customize
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleDeclineAll}
              className="text-xs"
            >
              Essential only
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleAcceptAll}
              className="text-xs font-semibold"
            >
              Accept all
            </Button>
          </div>
        </div>
      ) : (
        /* Preferences Drawer */
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-bold text-foreground">
                Consent Preferences
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setIsPreferencesOpen(false)}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Close preferences"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3 divide-y divide-border text-xs">
            {/* Essential */}
            <div className="pt-2 first:pt-0">
              <Checkbox
                label="Strictly Essential Cookies"
                description="Necessary for core system operations, security, session tokens, and checkout state. Cannot be disabled."
                checked={true}
                disabled
              />
            </div>

            {/* Analytics */}
            <div className="pt-3">
              <Checkbox
                label="Analytics &amp; Performance"
                description="Helps us understand component popularity, interaction latencies, and user flows to optimize UI rendering."
                checked={analytics}
                onCheckedChange={setAnalytics}
              />
            </div>

            {/* Marketing */}
            <div className="pt-3">
              <Checkbox
                label="Marketing &amp; Personalization"
                description="Remembers your preferred design themes, palette accents, and custom workspace preferences across visits."
                checked={marketing}
                onCheckedChange={setMarketing}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDeclineAll}
              className="text-xs"
            >
              Reject all
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleSaveCustom}
              className="text-xs font-semibold"
            >
              Save preferences
            </Button>
          </div>
        </div>
      )}
    </aside>
  )
}
