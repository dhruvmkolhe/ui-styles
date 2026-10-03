"use client"

import * as React from "react"
import {
  ArrowRight,
  ArrowLeft,
  Search,
  Check,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Sparkles,
  Info,
  ShieldCheck,
  Globe,
  TrendingUp,
  User,
  Bell,
  Sliders,
  Send,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type LayoutDirection = "ltr" | "rtl"

export interface RtlLanguagePreset {
  id: string
  name: string
  nativeName: string
  dir: LayoutDirection
  sampleHeading: string
  sampleSubheading: string
  searchPlaceholder: string
  actionLabel: string
  secondaryLabel: string
  metricLabel: string
}

export interface RtlLayoutPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  initialDirection?: LayoutDirection
  initialLanguage?: string
  onDirectionChange?: (dir: LayoutDirection) => void
}

const LANGUAGE_PRESETS: RtlLanguagePreset[] = [
  {
    id: "ar",
    name: "Arabic",
    nativeName: "العربية",
    dir: "rtl",
    sampleHeading: "لوحة تحكم التصميم المتقدمة",
    sampleSubheading: "نظام واجهات متكامل مع دعم الاتجاه من اليمين إلى اليسار والخطوط العربية",
    searchPlaceholder: "ابحث في المكونات والأنماط...",
    actionLabel: "حفظ التغييرات",
    secondaryLabel: "إلغاء",
    metricLabel: "إجمالي الزيارات الشهرية",
  },
  {
    id: "he",
    name: "Hebrew",
    nativeName: "עברית",
    dir: "rtl",
    sampleHeading: "לוח מחוונים מתקדם למערכת עיצוב",
    sampleSubheading: "רכיבי ממשק מותאמים מלאה לקריאה מימין לשמאל",
    searchPlaceholder: "חיפוש רכיבים והגדרות...",
    actionLabel: "שמור שינויים",
    secondaryLabel: "ביטול",
    metricLabel: "סה״כ צפיות פעילות",
  },
  {
    id: "fa",
    name: "Persian",
    nativeName: "فارسی",
    dir: "rtl",
    sampleHeading: "داشبورد سیستم طراحی مدرن",
    sampleSubheading: "پشتیبانی بومی از راست‌به‌چپ برای تایپوگرافی و المان‌های تعاملی",
    searchPlaceholder: "جستجو در کامپوننت‌ها...",
    actionLabel: "ذخیره تغییرات",
    secondaryLabel: "انصراف",
    metricLabel: "نرخ تعامل کاربران",
  },
  {
    id: "en",
    name: "English (Baseline LTR)",
    nativeName: "English",
    dir: "ltr",
    sampleHeading: "Modern Design System Dashboard",
    sampleSubheading: "Comprehensive interface suite with full bidirectional typography support",
    searchPlaceholder: "Search components and styles...",
    actionLabel: "Save Changes",
    secondaryLabel: "Cancel",
    metricLabel: "Total Monthly Active Views",
  },
]

export const RtlLayoutPreview = React.forwardRef<HTMLDivElement, RtlLayoutPreviewProps>(
  (
    {
      initialDirection = "rtl",
      initialLanguage = "ar",
      onDirectionChange,
      className,
      ...props
    },
    ref
  ) => {
    const [direction, setDirection] = React.useState<LayoutDirection>(initialDirection)
    const [selectedLangId, setSelectedLangId] = React.useState(initialLanguage)
    const [inputValue, setInputValue] = React.useState("")
    const [stepIndex, setStepIndex] = React.useState(2)

    const activeLang =
      LANGUAGE_PRESETS.find((l) => l.id === selectedLangId) || LANGUAGE_PRESETS[0]

    const handleSelectLanguage = (lang: RtlLanguagePreset) => {
      setSelectedLangId(lang.id)
      setDirection(lang.dir)
      onDirectionChange?.(lang.dir)
    }

    const handleToggleDirection = (dir: LayoutDirection) => {
      setDirection(dir)
      onDirectionChange?.(dir)
    }

    const handleReset = () => {
      setDirection("rtl")
      setSelectedLangId("ar")
      setInputValue("")
      setStepIndex(2)
      onDirectionChange?.("rtl")
    }

    return (
      <div
        ref={ref}
        role="region"
        aria-label="RTL and Bidirectional Layout Previewer"
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
              <Globe className="h-4 w-4" />
            </span>
            <div>
              <h4 className="font-semibold text-foreground">RTL Layout &amp; Direction Previewer</h4>
              <p className="text-[11px] text-muted-foreground">
                Safely inspect Right-to-Left components and bidirectional mirrors in an isolated sandbox
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-background hover:bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="h-3 w-3" /> Reset Preview
            </button>
          </div>
        </div>

        {/* Safety Disclaimer */}
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-900 dark:text-blue-200">
          <Info className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="font-semibold">Scoped Direction Boundary:</strong> Direction attribute (<code className="px-1 py-0.5 rounded bg-blue-500/20 font-mono">dir=&quot;{direction}&quot;</code>) is applied exclusively to the test canvas below and does not mutate the document root or alter other application tabs.
          </p>
        </div>

        {/* Controls: Direction Toggle & Language Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg border border-border bg-muted/30 text-xs">
          {/* LTR / RTL Mode Buttons */}
          <div className="flex items-center gap-1 bg-background p-1 rounded-lg border border-border">
            <button
              type="button"
              onClick={() => handleToggleDirection("ltr")}
              className={cn(
                "px-3 py-1.5 rounded-md font-semibold text-xs transition-all",
                direction === "ltr"
                  ? "bg-foreground text-background shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              LTR (Left-to-Right)
            </button>
            <button
              type="button"
              onClick={() => handleToggleDirection("rtl")}
              className={cn(
                "px-3 py-1.5 rounded-md font-semibold text-xs transition-all",
                direction === "rtl"
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              RTL (Right-to-Left)
            </button>
          </div>

          {/* Language Presets */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-semibold text-muted-foreground">Sample Locale:</span>
            {LANGUAGE_PRESETS.map((lp) => (
              <button
                key={lp.id}
                type="button"
                onClick={() => handleSelectLanguage(lp)}
                className={cn(
                  "px-2.5 py-1 rounded-md border text-xs font-medium transition-colors",
                  selectedLangId === lp.id
                    ? "bg-primary/10 border-primary text-primary font-bold"
                    : "border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {lp.nativeName} ({lp.name.split(" ")[0]})
              </button>
            ))}
          </div>
        </div>

        {/* Scoped RTL/LTR Interactive Canvas */}
        <div
          dir={direction}
          className={cn(
            "p-6 rounded-xl border border-border bg-background/50 shadow-inner space-y-6 transition-all duration-300",
            direction === "rtl" ? "text-right" : "text-left"
          )}
        >
          {/* Navigation Bar in Sandbox */}
          <div className="p-3.5 rounded-xl border border-border bg-card flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Back / Forward arrows that flip meaning in RTL */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  title={direction === "rtl" ? "Forward in RTL" : "Back in LTR"}
                  className="p-1.5 rounded-md border border-border bg-background hover:bg-muted text-foreground"
                >
                  {direction === "rtl" ? (
                    <ArrowRight className="h-4 w-4" />
                  ) : (
                    <ArrowLeft className="h-4 w-4" />
                  )}
                </button>
                <button
                  type="button"
                  title={direction === "rtl" ? "Back in RTL" : "Forward in LTR"}
                  className="p-1.5 rounded-md border border-border bg-background hover:bg-muted text-foreground"
                >
                  {direction === "rtl" ? (
                    <ArrowLeft className="h-4 w-4" />
                  ) : (
                    <ArrowRight className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Breadcrumb Items */}
              <nav aria-label="Sample Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="hover:text-foreground cursor-pointer">
                  {direction === "rtl" ? "الرئيسية" : "Home"}
                </span>
                {direction === "rtl" ? (
                  <ChevronLeft className="h-3.5 w-3.5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                )}
                <span className="hover:text-foreground cursor-pointer">
                  {direction === "rtl" ? "الإعدادات" : "Settings"}
                </span>
                {direction === "rtl" ? (
                  <ChevronLeft className="h-3.5 w-3.5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                )}
                <span className="font-semibold text-foreground">
                  {direction === "rtl" ? "الملف الشخصي" : "Profile"}
                </span>
              </nav>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold bg-primary/10 text-primary">
                DIR: {direction.toUpperCase()}
              </span>
              <button
                type="button"
                className="p-1.5 rounded-full border border-border bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <Bell className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Hero / Heading Section */}
          <div className="space-y-1.5">
            <h3 className="text-xl font-extrabold text-foreground tracking-tight">
              {activeLang.sampleHeading}
            </h3>
            <p className="text-xs text-muted-foreground max-w-2xl leading-relaxed">
              {activeLang.sampleSubheading}
            </p>
          </div>

          {/* Form & Search Card */}
          <div className="p-4 rounded-xl border border-border bg-card space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              {/* Search with logical start icon */}
              <div className="sm:col-span-8 relative">
                <div
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none",
                    direction === "rtl" ? "right-3" : "left-3"
                  )}
                >
                  <Search className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={activeLang.searchPlaceholder}
                  className={cn(
                    "w-full py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
                    direction === "rtl" ? "pr-9 pl-3 text-right" : "pl-9 pr-3 text-left"
                  )}
                />
              </div>

              {/* Action Buttons */}
              <div className="sm:col-span-4 flex items-center gap-2 justify-end">
                <button
                  type="button"
                  className="flex-1 sm:flex-none px-3 py-2 rounded-lg border border-border bg-background hover:bg-muted text-xs font-semibold text-foreground transition-colors"
                >
                  {activeLang.secondaryLabel}
                </button>
                <button
                  type="button"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors shadow-2xs"
                >
                  <Send className={cn("h-3.5 w-3.5", direction === "rtl" && "scale-x-[-1]")} />
                  <span>{activeLang.actionLabel}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Step Progress Sequence */}
          <div className="p-4 rounded-xl border border-border bg-card space-y-3">
            <span className="text-xs font-semibold text-foreground block">
              {direction === "rtl" ? "مراحل الإنجاز (يمين إلى يسار)" : "Progress Milestones (Left-to-Right)"}
            </span>
            <div className="flex items-center justify-between gap-2">
              {[1, 2, 3, 4].map((step) => {
                const isCompleted = step < stepIndex
                const isCurrent = step === stepIndex

                return (
                  <React.Fragment key={step}>
                    <button
                      type="button"
                      onClick={() => setStepIndex(step)}
                      className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold font-mono transition-all shrink-0",
                        isCompleted
                          ? "bg-emerald-500 text-white"
                          : isCurrent
                          ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {isCompleted ? <Check className="h-4 w-4" /> : step}
                    </button>
                    {step < 4 && (
                      <div
                        className={cn(
                          "flex-1 h-1 rounded-full transition-colors",
                          step < stepIndex ? "bg-emerald-500" : "bg-muted"
                        )}
                      />
                    )}
                  </React.Fragment>
                )
              })}
            </div>
          </div>

          {/* Metric / Stat Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-border bg-card space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-muted-foreground">{activeLang.metricLabel}</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="h-3.5 w-3.5" /> +18.4%
                </span>
              </div>
              <div className="text-2xl font-bold font-mono text-foreground">
                {direction === "rtl" ? "٩٤,٢١٠" : "94,210"}
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-muted-foreground">
                  {direction === "rtl" ? "حالة التوافق المنطقي" : "Logical CSS Compliance"}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                  98% Pass
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-normal">
                {direction === "rtl"
                  ? "تستخدم واجهات العرض الخصائص المنطقية (inline-start / inline-end) لضمان المحاذاة التلقائية."
                  : "All components use logical margin/padding (ms/me/ps/pe) to support bidirectional mirroring automatically."}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
)
RtlLayoutPreview.displayName = "RtlLayoutPreview"
