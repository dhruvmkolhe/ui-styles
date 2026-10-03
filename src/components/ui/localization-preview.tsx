"use client"

import * as React from "react"
import {
  Languages,
  Globe2,
  Calendar,
  DollarSign,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Info,
  Check,
  Maximize2,
  Layers,
  Copy,
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface LocaleDefinition {
  code: string
  name: string
  currency: string
  dir: "ltr" | "rtl"
  translations: Record<string, string>
}

export interface LocalizationPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  initialLocale?: string
  onLocaleChange?: (localeCode: string) => void
}

const LOCALES: LocaleDefinition[] = [
  {
    code: "en-US",
    name: "English (United States)",
    currency: "USD",
    dir: "ltr",
    translations: {
      "nav.dashboard": "Dashboard Overview",
      "billing.title": "Subscription & Invoicing",
      "billing.description": "Manage your enterprise seats, payment methods, and automated billing cycle.",
      "billing.plan": "Enterprise Pro Plan",
      "billing.renewal": "Next renewal scheduled for",
      "billing.amount": "Total Billed",
      "billing.btn.upgrade": "Upgrade Subscription",
      "billing.btn.download": "Download Invoice",
      "status.active": "Active Plan",
    },
  },
  {
    code: "de-DE",
    name: "German (Deutschland)",
    currency: "EUR",
    dir: "ltr",
    translations: {
      "nav.dashboard": "Übersichts-Dashboard",
      "billing.title": "Abonnement & Rechnungsstellung",
      "billing.description": "Verwalten Sie Ihre Unternehmenslizenzen, Zahlungsmethoden und den automatischen Abrechnungszyklus.",
      "billing.plan": "Unternehmens-Profi-Abonnement",
      "billing.renewal": "Nächste planmäßige Verlängerung am",
      "billing.amount": "Gesamtbetrag",
      "billing.btn.upgrade": "Abonnement jetzt aktualisieren",
      "billing.btn.download": "Steuerrechnung herunterladen",
      "status.active": "Aktives Abonnement",
    },
  },
  {
    code: "ja-JP",
    name: "Japanese (日本)",
    currency: "JPY",
    dir: "ltr",
    translations: {
      "nav.dashboard": "ダッシュボード概要",
      "billing.title": "サブスクリプションと請求書",
      "billing.description": "企業シート、支払い方法、自動請求サイクルの管理を行います。",
      "billing.plan": "エンタープライズ・プロプラン",
      "billing.renewal": "次回の請求予定日：",
      "billing.amount": "請求合計額",
      "billing.btn.upgrade": "プランをアップグレード",
      "billing.btn.download": "請求書をダウンロード",
      "status.active": "利用中プラン",
    },
  },
  {
    code: "es-ES",
    name: "Spanish (España)",
    currency: "EUR",
    dir: "ltr",
    translations: {
      "nav.dashboard": "Panel de Control",
      "billing.title": "Suscripción y Facturación",
      "billing.description": "Administre sus licencias de empresa, métodos de pago y ciclo de facturación automática.",
      "billing.plan": "Plan Enterprise Profesional",
      "billing.renewal": "Próxima renovación programada para el",
      "billing.amount": "Total Facturado",
      "billing.btn.upgrade": "Actualizar Suscripción",
      "billing.btn.download": "Descargar Factura Oficial",
      "status.active": "Plan Activo",
    },
  },
  {
    code: "ar-SA",
    name: "Arabic (المملكة العربية السعودية)",
    currency: "SAR",
    dir: "rtl",
    translations: {
      "nav.dashboard": "نظرة عامة على لوحة القيادة",
      "billing.title": "الاشتراك والفوترة الشهرية",
      "billing.description": "إدارة مقاعد المؤسسة وطرق الدفع ودورة الفوترة المؤتمتة الخاصة بك بكل سهولة.",
      "billing.plan": "خطة المؤسسات الاحترافية",
      "billing.renewal": "موعد التجديد التلقائي القادم في",
      "billing.amount": "إجمالي المبلغ المطلوب",
      "billing.btn.upgrade": "ترقية الاشتراك الآن",
      "billing.btn.download": "تحميل الفاتورة الضريبية",
      "status.active": "الاشتراك مفعّل",
    },
  },
]

// Pseudolocalize string for stress testing
function pseudolocalize(text: string, expansionPercent: number = 40): string {
  const charMap: Record<string, string> = {
    a: "ά",
    e: "ē",
    i: "ḯ",
    o: "õ",
    u: "ũ",
    c: "ċ",
    d: "đ",
    n: "ň",
    s: "š",
    r: "ř",
    A: "Å",
    E: "Ē",
    I: "Ḯ",
    O: "Õ",
    U: "Ũ",
  }

  const converted = text
    .split("")
    .map((c) => charMap[c] || c)
    .join("")

  const extraLen = Math.round((text.length * expansionPercent) / 100)
  const padding = " " + "•".repeat(Math.max(0, extraLen))
  return `[ !!! ${converted}${padding} !!! ]`
}

export const LocalizationPreview = React.forwardRef<HTMLDivElement, LocalizationPreviewProps>(
  (
    {
      initialLocale = "de-DE",
      onLocaleChange,
      className,
      ...props
    },
    ref
  ) => {
    const [selectedLocaleCode, setSelectedLocaleCode] = React.useState(initialLocale)
    const [stressMode, setStressMode] = React.useState<"normal" | "expanded" | "pseudo">("normal")
    const [expansionPercent, setExpansionPercent] = React.useState(40)
    const [copied, setCopied] = React.useState(false)

    const activeLocale =
      LOCALES.find((l) => l.code === selectedLocaleCode) || LOCALES[0]

    const handleSelectLocale = (code: string) => {
      setSelectedLocaleCode(code)
      onLocaleChange?.(code)
    }

    const handleReset = () => {
      setSelectedLocaleCode("de-DE")
      setStressMode("normal")
      setExpansionPercent(40)
      onLocaleChange?.("de-DE")
    }

    // Translate string with stress test conversion
    const t = (key: string): string => {
      const raw = activeLocale.translations[key] || LOCALES[0].translations[key] || key

      if (stressMode === "pseudo") {
        return pseudolocalize(raw, expansionPercent)
      } else if (stressMode === "expanded") {
        const extraLen = Math.round((raw.length * expansionPercent) / 100)
        return `${raw} ${"―".repeat(Math.max(2, Math.floor(extraLen / 2)))}`
      }
      return raw
    }

    // Locale-sensitive formatters using native browser Intl
    const formattedCurrency = React.useMemo(() => {
      try {
        const amount = activeLocale.currency === "JPY" ? 289000 : 2490.5
        return new Intl.NumberFormat(activeLocale.code, {
          style: "currency",
          currency: activeLocale.currency,
        }).format(amount)
      } catch (e) {
        return `$2,490.50`
      }
    }, [activeLocale])

    const formattedDate = React.useMemo(() => {
      try {
        const date = new Date(2026, 9, 15) // Oct 15, 2026
        return new Intl.DateTimeFormat(activeLocale.code, {
          dateStyle: "full",
        }).format(date)
      } catch (e) {
        return "Thursday, October 15, 2026"
      }
    }, [activeLocale])

    const formattedCompactCount = React.useMemo(() => {
      try {
        return new Intl.NumberFormat(activeLocale.code, {
          notation: "compact",
          compactDisplay: "short",
        }).format(142900)
      } catch (e) {
        return "143K"
      }
    }, [activeLocale])

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Localization and Text Expansion Previewer"
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
              <Languages className="h-4 w-4" />
            </span>
            <div>
              <h4 className="font-semibold text-foreground">Localization &amp; Text Stress Previewer</h4>
              <p className="text-[11px] text-muted-foreground">
                Test localized strings, Intl currency/date formats, and layout expansion boundaries
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-background hover:bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="h-3 w-3" /> Reset Defaults
            </button>
          </div>
        </div>

        {/* Locale & Stress Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 rounded-lg border border-border bg-muted/30 text-xs">
          {/* Locale Picker */}
          <div className="space-y-1.5">
            <label className="font-semibold text-foreground block">Target Locale</label>
            <div className="flex flex-wrap gap-1.5">
              {LOCALES.map((loc) => (
                <button
                  key={loc.code}
                  type="button"
                  onClick={() => handleSelectLocale(loc.code)}
                  className={cn(
                    "px-2.5 py-1 rounded-md border text-xs font-medium transition-colors",
                    selectedLocaleCode === loc.code
                      ? "bg-primary text-primary-foreground border-primary font-bold shadow-2xs"
                      : "border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  {loc.name.split(" ")[0]} ({loc.code})
                </button>
              ))}
            </div>
          </div>

          {/* Stress Testing Modes */}
          <div className="space-y-1.5">
            <label className="font-semibold text-foreground block">
              Text Length Stress Simulation
            </label>
            <div className="flex items-center gap-1.5 flex-wrap">
              {(
                [
                  { id: "normal", label: "Normal (100%)" },
                  { id: "expanded", label: "+40% Length Expansion" },
                  { id: "pseudo", label: "Pseudolocalization [ !!! ]" },
                ] as const
              ).map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setStressMode(mode.id)}
                  className={cn(
                    "px-2.5 py-1 rounded-md border text-xs font-medium transition-colors",
                    stressMode === mode.id
                      ? "bg-amber-500 text-black border-amber-500 font-bold shadow-2xs"
                      : "border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Localized Component Preview (Billing Card) */}
        <div
          dir={activeLocale.dir}
          className={cn(
            "p-6 rounded-xl border border-border bg-background/60 shadow-inner space-y-6 transition-all",
            activeLocale.dir === "rtl" ? "text-right" : "text-left"
          )}
        >
          {/* Card Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border/80 pb-4">
            <div className="space-y-1 max-w-xl">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold text-[11px]">
                <Check className="h-3 w-3" /> {t("status.active")}
              </span>
              <h3 className="text-lg font-bold text-foreground tracking-tight">
                {t("billing.title")}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t("billing.description")}
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border bg-card space-y-1 shrink-0 min-w-[160px]">
              <span className="text-[10px] uppercase font-mono font-semibold text-muted-foreground block">
                {t("billing.amount")}
              </span>
              <div className="text-xl font-bold font-mono text-foreground">
                {formattedCurrency}
              </div>
              <span className="text-[10px] text-muted-foreground block font-mono">
                {formattedCompactCount} active seats
              </span>
            </div>
          </div>

          {/* Plan Info and Renewal Schedule */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-border bg-card space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <Globe2 className="h-4 w-4 text-primary" />
                <span>{t("billing.plan")}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Includes automated CI localization scans, font subsetting, and bidirectional RTL layout verification.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-card space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{t("billing.renewal")}</span>
              </div>
              <div className="text-xs font-medium text-foreground font-mono">
                {formattedDate}
              </div>
            </div>
          </div>

          {/* Action Buttons (Crucial for button label truncation stress tests) */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition-colors shadow-2xs whitespace-normal max-w-full text-center"
            >
              {t("billing.btn.upgrade")}
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-border bg-card hover:bg-muted text-foreground font-semibold text-xs transition-colors whitespace-normal max-w-full text-center"
            >
              {t("billing.btn.download")}
            </button>
          </div>
        </div>

        {/* Translation Keys Inspector Table */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-foreground">Active Translation Key Mappings</span>
            <span className="text-muted-foreground text-[11px] font-mono">
              Locale: {activeLocale.code} | Currency: {activeLocale.currency}
            </span>
          </div>

          <div className="rounded-lg border border-border overflow-hidden max-h-48 overflow-y-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold sticky top-0">
                <tr>
                  <th className="py-2 px-3">Translation Key</th>
                  <th className="py-2 px-3">Resolved String</th>
                  <th className="py-2 px-3 text-right">Length (Chars)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {Object.entries(activeLocale.translations).map(([k, v]) => {
                  const resolved = t(k)
                  return (
                    <tr key={k} className="hover:bg-muted/20 transition-colors">
                      <td className="py-2 px-3 font-mono text-muted-foreground text-[11px]">{k}</td>
                      <td className="py-2 px-3 font-medium text-foreground">{resolved}</td>
                      <td className="py-2 px-3 font-mono text-right text-muted-foreground text-[11px]">
                        {resolved.length}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
)
LocalizationPreview.displayName = "LocalizationPreview"
