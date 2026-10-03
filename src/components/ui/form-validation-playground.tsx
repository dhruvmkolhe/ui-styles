"use client"

import * as React from "react"
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  KeyRound,
  Mail,
  User,
  Hash,
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface ValidationRuleState {
  id: string
  label: string
  valid: boolean
  error?: string
}

export interface FormValidationPlaygroundProps extends React.HTMLAttributes<HTMLDivElement> {
  onValidSubmit?: (data: Record<string, any>) => void
}

export const FormValidationPlayground = React.forwardRef<HTMLDivElement, FormValidationPlaygroundProps>(
  ({ onValidSubmit, className, ...props }, ref) => {
    const [username, setUsername] = React.useState("alex_dev")
    const [email, setEmail] = React.useState("alex@chameleon-ui.io")
    const [password, setPassword] = React.useState("StudioSecret!2026")
    const [age, setAge] = React.useState("24")
    const [terms, setTerms] = React.useState(true)
    const [submitAttempted, setSubmitAttempted] = React.useState(false)

    // Evaluate Rules
    const rules = React.useMemo<ValidationRuleState[]>(() => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const hasUpper = /[A-Z]/.test(password)
      const hasNumber = /[0-9]/.test(password)
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)
      const numAge = Number(age)

      return [
        {
          id: "username-length",
          label: "Username: 3 to 20 alphanumeric characters",
          valid: username.length >= 3 && username.length <= 20 && /^[a-zA-Z0-9_]+$/.test(username),
          error: "Username must be 3-20 characters without spaces or symbols",
        },
        {
          id: "email-format",
          label: "Email: Valid RFC 5322 format",
          valid: emailRegex.test(email),
          error: "Must contain valid user, @ sign, and domain suffix",
        },
        {
          id: "pwd-length",
          label: "Password: At least 8 characters",
          valid: password.length >= 8,
          error: "Must have 8+ characters",
        },
        {
          id: "pwd-complexity",
          label: "Password: Uppercase, digit, & special character",
          valid: hasUpper && hasNumber && hasSpecial,
          error: "Must include uppercase letter, number, and special character",
        },
        {
          id: "age-bounds",
          label: "Age: Numeric integer between 18 and 120",
          valid: !isNaN(numAge) && numAge >= 18 && numAge <= 120,
          error: "Must be at least 18 years old",
        },
        {
          id: "terms-checked",
          label: "Terms: Mandatory policy agreement check",
          valid: terms,
          error: "Terms of service must be accepted",
        },
      ]
    }, [username, email, password, age, terms])

    const allValid = rules.every((r) => r.valid)
    const passedCount = rules.filter((r) => r.valid).length

    // Password strength score (0 to 4)
    const passwordStrength = React.useMemo(() => {
      let score = 0
      if (password.length >= 8) score++
      if (/[A-Z]/.test(password)) score++
      if (/[0-9]/.test(password)) score++
      if (/[^A-Za-z0-9]/.test(password)) score++
      return score
    }, [password])

    const handleReset = () => {
      setUsername("alex_dev")
      setEmail("alex@chameleon-ui.io")
      setPassword("StudioSecret!2026")
      setAge("24")
      setTerms(true)
      setSubmitAttempted(false)
    }

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      setSubmitAttempted(true)
      if (allValid) {
        onValidSubmit?.({ username, email, password, age, terms })
      }
    }

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Interactive Form Validation Playground"
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
              <ShieldCheck className="h-4 w-4" />
            </span>
            <div>
              <h4 className="font-semibold text-foreground">Form Validation Playground</h4>
              <p className="text-[11px] text-muted-foreground">
                Real-time regex, boundary, and password complexity validation evaluator
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-background hover:bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="h-3 w-3" /> Reset Values
          </button>
        </div>

        {/* Validation Progress Metric */}
        <div className="p-3 rounded-lg bg-muted/30 border border-border flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-mono">
            <span className={cn("font-bold text-sm", allValid ? "text-emerald-500" : "text-amber-500")}>
              {passedCount} / {rules.length} Rules Passed
            </span>
            <span className="text-muted-foreground text-[11px]">
              ({Math.round((passedCount / rules.length) * 100)}% completeness)
            </span>
          </div>

          {submitAttempted && (
            <span
              className={cn(
                "px-2.5 py-0.5 rounded-full font-bold font-mono text-[10px] uppercase",
                allValid ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
              )}
            >
              {allValid ? "Submission Ready" : "Validation Errors Present"}
            </span>
          )}
        </div>

        {/* Form Grid & Live Rules Status */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Form Fields (6 cols) */}
          <form onSubmit={handleSubmit} className="lg:col-span-6 space-y-3 text-xs">
            {/* Username */}
            <div className="space-y-1">
              <label className="font-semibold text-foreground flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-muted-foreground" /> Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                suppressHydrationWarning
                autoComplete="off"
                className="w-full px-3 py-1.5 rounded-md border border-input bg-background text-foreground text-xs"
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="font-semibold text-foreground flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-muted-foreground" /> Work Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                suppressHydrationWarning
                autoComplete="off"
                className="w-full px-3 py-1.5 rounded-md border border-input bg-background text-foreground text-xs"
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="font-semibold text-foreground flex items-center gap-1.5">
                <KeyRound className="h-3.5 w-3.5 text-muted-foreground" /> Account Password
              </label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                suppressHydrationWarning
                autoComplete="new-password"
                data-lpignore="true"
                className="w-full px-3 py-1.5 rounded-md border border-input bg-background font-mono text-xs text-foreground"
              />

              {/* Password strength meter */}
              <div className="space-y-1 pt-1">
                <div className="grid grid-cols-4 gap-1 h-1.5">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={cn(
                        "rounded-full transition-all",
                        passwordStrength >= step
                          ? passwordStrength <= 2
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                          : "bg-muted"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Age */}
            <div className="space-y-1">
              <label className="font-semibold text-foreground flex items-center gap-1.5">
                <Hash className="h-3.5 w-3.5 text-muted-foreground" /> Minimum Age (18-120)
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                suppressHydrationWarning
                autoComplete="off"
                className="w-full px-3 py-1.5 rounded-md border border-input bg-background text-foreground text-xs"
              />
            </div>

            {/* Terms checkbox */}
            <label className="flex items-center gap-2 cursor-pointer font-medium text-foreground pt-1">
              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                suppressHydrationWarning
                className="rounded border-input text-primary"
              />
              <span>I acknowledge compliance with platform guidelines</span>
            </label>

            <button
              type="submit"
              className={cn(
                "w-full py-2 rounded-lg font-semibold text-xs transition-all shadow-xs",
                allValid
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
                  : "bg-muted text-muted-foreground cursor-not-allowed border border-border"
              )}
            >
              Test Form Submission
            </button>
          </form>

          {/* Validation Rules Checklist (6 cols) */}
          <div className="lg:col-span-6 rounded-xl border border-border bg-popover/40 p-4 space-y-2.5 text-xs">
            <span className="font-mono text-[10px] font-bold uppercase text-muted-foreground tracking-wider block">
              Active Validation Constraints
            </span>

            <div className="space-y-2">
              {rules.map((rule) => (
                <div
                  key={rule.id}
                  className={cn(
                    "p-2.5 rounded-lg border text-xs flex items-start gap-2.5 transition-colors",
                    rule.valid
                      ? "border-emerald-500/30 bg-emerald-500/5 text-foreground"
                      : "border-rose-500/30 bg-rose-500/5 text-foreground"
                  )}
                >
                  {rule.valid ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  )}

                  <div className="space-y-0.5">
                    <span className="font-semibold block leading-tight">{rule.label}</span>
                    {!rule.valid && (
                      <span className="text-[11px] text-rose-600 dark:text-rose-400 block">
                        {rule.error}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
)

FormValidationPlayground.displayName = "FormValidationPlayground"
