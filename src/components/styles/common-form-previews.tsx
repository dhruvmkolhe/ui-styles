"use client";

import React, { useState, useRef } from "react";
import {
  Check,
  Minus,
  Calendar,
  X,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  Plus,
  Info,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Mode, StyleSlug } from "@/lib/styles/types";
import { getStyleFormKit } from "./common-form-kit";
import { DateInput, type DateDisplayFormat } from "@/components/ui/date-input";

/* ========================================================================== */
/* 1 · Checkbox Preview                                                       */
/* ========================================================================== */
export function CheckboxPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode);
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [indeterminate, setIndeterminate] = useState(true);
  const [termsChecked, setTermsChecked] = useState(false);
  const [showError, setShowError] = useState(true);

  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      {/* 1. Checked */}
      <label className="flex items-start gap-3 cursor-pointer select-none">
        <button
          type="button"
          role="checkbox"
          aria-checked={checked1}
          onClick={() => setChecked1(!checked1)}
          className={cn(
            "relative mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center border transition-all",
            k.radius,
            k.focusRing,
            checked1 ? k.checkboxAccent : k.checkboxUnchecked
          )}
        >
          {checked1 && <Check className="h-3.5 w-3.5 stroke-[2.5]" />}
        </button>
        <div className="grid gap-0.5">
          <span className={cn("text-xs font-semibold leading-tight", k.text)}>
            Enable weekly design digest
          </span>
          <span className={cn("text-[11px] leading-normal", k.muted)}>
            Receive curated UI kits and micro-interactions every Tuesday.
          </span>
        </div>
      </label>

      {/* 2. Unchecked */}
      <label className="flex items-start gap-3 cursor-pointer select-none">
        <button
          type="button"
          role="checkbox"
          aria-checked={checked2}
          onClick={() => setChecked2(!checked2)}
          className={cn(
            "relative mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center border transition-all",
            k.radius,
            k.focusRing,
            checked2 ? k.checkboxAccent : k.checkboxUnchecked
          )}
        >
          {checked2 && <Check className="h-3.5 w-3.5 stroke-[2.5]" />}
        </button>
        <div className="grid gap-0.5">
          <span className={cn("text-xs font-semibold leading-tight", k.text)}>
            SMS security verification
          </span>
          <span className={cn("text-[11px] leading-normal", k.muted)}>
            Send a 6-digit challenge code upon unfamiliar sign-in attempts.
          </span>
        </div>
      </label>

      {/* 3. Indeterminate */}
      <label className="flex items-start gap-3 cursor-pointer select-none">
        <button
          type="button"
          role="checkbox"
          aria-checked="mixed"
          onClick={() => setIndeterminate(!indeterminate)}
          className={cn(
            "relative mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center border transition-all",
            k.radius,
            k.focusRing,
            indeterminate ? k.checkboxAccent : k.checkboxUnchecked
          )}
        >
          {indeterminate && <Minus className="h-3.5 w-3.5 stroke-[2.5]" />}
        </button>
        <div className="grid gap-0.5">
          <span className={cn("text-xs font-semibold leading-tight", k.text)}>
            Mixed state notification channels (3 of 7 active)
          </span>
          <span className={cn("text-[11px] leading-normal", k.muted)}>
            Click to toggle between mixed and unchecked states.
          </span>
        </div>
      </label>

      {/* 4. Disabled */}
      <div className="flex items-start gap-3 select-none opacity-50 cursor-not-allowed">
        <button
          type="button"
          role="checkbox"
          aria-checked={true}
          disabled
          className={cn(
            "relative mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center border cursor-not-allowed",
            k.radius,
            k.checkboxAccent
          )}
        >
          <Check className="h-3.5 w-3.5 stroke-[2.5]" />
        </button>
        <div className="grid gap-0.5">
          <span className={cn("text-xs font-semibold leading-tight", k.text)}>
            Strict telemetry opt-out (Enforced by Admin)
          </span>
          <span className={cn("text-[11px] leading-normal", k.muted)}>
            Mandatory policy lock prevents modification.
          </span>
        </div>
      </div>

      {/* 5. Error state */}
      <div className="pt-2 border-t border-current/10">
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <button
            type="button"
            role="checkbox"
            aria-checked={termsChecked}
            aria-invalid={showError && !termsChecked}
            onClick={() => {
              setTermsChecked(!termsChecked);
              if (!termsChecked) setShowError(false);
            }}
            className={cn(
              "relative mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center border transition-all",
              k.radius,
              k.focusRing,
              termsChecked
                ? k.checkboxAccent
                : showError
                ? "border-rose-500 bg-rose-500/10 ring-2 ring-rose-500/30 text-rose-500"
                : k.checkboxUnchecked
            )}
          >
            {termsChecked && <Check className="h-3.5 w-3.5 stroke-[2.5]" />}
          </button>
          <div className="grid gap-0.5">
            <span className={cn("text-xs font-semibold leading-tight", k.text)}>
              I accept the Open License Agreement *
            </span>
            {showError && !termsChecked && (
              <span className="flex items-center gap-1 text-[11px] font-medium text-rose-500">
                <AlertCircle className="h-3 w-3" />
                You must accept terms to proceed.
              </span>
            )}
          </div>
        </label>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* 2 · Radio Group Preview                                                    */
/* ========================================================================== */
export function RadioGroupPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode);
  const [selected, setSelected] = useState("pro");
  const [layoutMode, setLayoutMode] = useState<"card" | "simple">("card");

  const plans = [
    { id: "free", name: "Hobbyist", price: "$0/mo", desc: "Up to 3 projects, community support" },
    { id: "pro", name: "Professional", price: "$24/mo", desc: "Unlimited workspaces, full token sync" },
    { id: "enterprise", name: "Enterprise", price: "$99/mo", desc: "Custom themes, SLA, dedicated support" },
  ];

  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Select Tier
        </span>
        <div className="flex items-center gap-1.5 text-[11px]">
          <button
            type="button"
            onClick={() => setLayoutMode("card")}
            className={cn(
              "px-2 py-0.5 rounded transition-colors",
              layoutMode === "card" ? k.btnPrimarySm : k.muted
            )}
          >
            Card Cards
          </button>
          <button
            type="button"
            onClick={() => setLayoutMode("simple")}
            className={cn(
              "px-2 py-0.5 rounded transition-colors",
              layoutMode === "simple" ? k.btnPrimarySm : k.muted
            )}
          >
            List
          </button>
        </div>
      </div>

      <div role="radiogroup" className="grid gap-2.5">
        {plans.map((plan) => {
          const isSelected = selected === plan.id;
          if (layoutMode === "card") {
            return (
              <div
                key={plan.id}
                role="radio"
                aria-checked={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setSelected(plan.id)}
                className={cn(
                  "relative flex cursor-pointer items-start justify-between p-3.5 border transition-all",
                  k.radius,
                  isSelected
                    ? cn(k.panel, "ring-2 ring-current/40 shadow-sm")
                    : cn(k.panelSoft, "opacity-80 hover:opacity-100")
                )}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all",
                      isSelected ? "border-current" : "border-current/40"
                    )}
                  >
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full transition-transform",
                        isSelected ? "scale-100 bg-current" : "scale-0"
                      )}
                    />
                  </span>
                  <div>
                    <h4 className={cn("text-xs font-bold leading-tight", k.text)}>
                      {plan.name}
                    </h4>
                    <p className={cn("mt-0.5 text-[11px] leading-tight", k.muted)}>
                      {plan.desc}
                    </p>
                  </div>
                </div>
                <span className={cn("text-xs font-mono font-bold shrink-0 pl-2", k.strong)}>
                  {plan.price}
                </span>
              </div>
            );
          }

          return (
            <label
              key={plan.id}
              role="radio"
              aria-checked={isSelected}
              onClick={() => setSelected(plan.id)}
              className="flex items-center gap-3 cursor-pointer py-1 select-none"
            >
              <span
                className={cn(
                  "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all",
                  isSelected ? "border-current" : "border-current/40"
                )}
              >
                <span
                  className={cn(
                    "h-2 w-2 rounded-full transition-transform",
                    isSelected ? "scale-100 bg-current" : "scale-0"
                  )}
                />
              </span>
              <span className={cn("text-xs font-medium", isSelected ? k.strong : k.text)}>
                {plan.name} — <strong className="font-mono">{plan.price}</strong>
              </span>
            </label>
          );
        })}

        {/* Disabled option */}
        <div className="flex items-center gap-3 py-1 opacity-40 cursor-not-allowed select-none">
          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-current/30">
            <span className="h-2 w-2 rounded-full scale-0" />
          </span>
          <span className={cn("text-xs font-medium", k.muted)}>
            Legacy Architecture (Grandfathered only)
          </span>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* 3 · Select Preview                                                         */
/* ========================================================================== */
export function SelectPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVal, setSelectedVal] = useState("usd");

  const options = [
    { value: "usd", label: "USD · United States Dollar ($)", symbol: "$" },
    { value: "eur", label: "EUR · European Euro (€)", symbol: "€" },
    { value: "gbp", label: "GBP · British Pound (£)", symbol: "£" },
    { value: "jpy", label: "JPY · Japanese Yen (¥)", symbol: "¥" },
    { value: "chf", label: "CHF · Swiss Franc", symbol: "Fr" },
    { value: "crypto", label: "BTC · Bitcoin (Disabled)", disabled: true },
  ];

  const currentOption = options.find((o) => o.value === selectedVal);

  return (
    <div className="mx-auto w-full max-w-sm space-y-2 min-h-[300px] flex flex-col justify-start">
      <label className={k.label} htmlFor="currency-select">
        Primary Billing Currency
      </label>

      <div className="relative">
        <button
          id="currency-select"
          type="button"
          role="combobox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex w-full items-center justify-between px-3.5 py-2.5 text-xs text-left transition-all",
            k.input,
            k.focusRing
          )}
        >
          <span className="truncate font-medium">
            {currentOption?.label || "Select currency..."}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 opacity-70 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {isOpen && (
          <ul
            role="listbox"
            className={cn(
              "absolute z-30 mt-1 max-h-56 w-full overflow-auto p-1 shadow-xl border animate-in fade-in-50",
              k.panel,
              k.radius
            )}
          >
            {options.map((opt) => {
              const isSelected = opt.value === selectedVal;
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={opt.disabled}
                  onClick={() => {
                    if (!opt.disabled) {
                      setSelectedVal(opt.value);
                      setIsOpen(false);
                    }
                  }}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 text-xs cursor-pointer select-none transition-colors",
                    k.radius,
                    isSelected
                      ? cn("font-bold", k.strong, "bg-current/10")
                      : cn(k.text, "hover:bg-current/10"),
                    opt.disabled && "opacity-40 cursor-not-allowed pointer-events-none"
                  )}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check className="h-3.5 w-3.5 shrink-0" />}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <p className={cn("text-[11px] leading-tight", k.faint)}>
        All invoices, payouts, and taxes will be settled in this unit.
      </p>
    </div>
  );
}

/* ========================================================================== */
/* 4 · Textarea Preview                                                       */
/* ========================================================================== */
export function TextareaPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode);
  const [text, setText] = useState(
    "Crafting clean, authentic interfaces inspired by historical and modern design principles."
  );
  const [hasError, setHasError] = useState(false);
  const max = 180;

  return (
    <div className="mx-auto w-full max-w-md space-y-2">
      <div className="flex items-center justify-between">
        <label className={k.label} htmlFor="bio-textarea">
          Project Manifesto / Bio
        </label>
        <button
          type="button"
          onClick={() => setHasError(!hasError)}
          className={cn("text-[10px] font-mono underline opacity-70 hover:opacity-100", k.muted)}
        >
          {hasError ? "Reset Error" : "Test Error"}
        </button>
      </div>

      <textarea
        id="bio-textarea"
        name="bioTextarea"
        rows={4}
        value={text}
        maxLength={max}
        onChange={(e) => setText(e.target.value)}
        aria-invalid={hasError}
        className={cn(
          "w-full resize-y text-xs transition-all",
          k.input,
          k.focusRing,
          hasError && "border-rose-500 ring-2 ring-rose-500/30"
        )}
        placeholder="Write a concise overview of your creative direction..."
      />

      <div className="flex items-center justify-between text-[11px]">
        {hasError ? (
          <span className="flex items-center gap-1 text-rose-500 font-medium">
            <AlertCircle className="h-3.5 w-3.5" />
            Character density exceeds style limit.
          </span>
        ) : (
          <span className={k.faint}>Markdown formatting supported</span>
        )}
        <span
          className={cn(
            "font-mono ml-auto",
            text.length >= max ? "text-rose-500 font-bold" : k.muted
          )}
        >
          {text.length} / {max}
        </span>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* 5 · Form Preview                                                           */
/* ========================================================================== */
export function FormPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("designer");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !agreed) {
      setStatus("error");
    } else {
      setStatus("success");
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setAgreed(false);
    setStatus("idle");
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <form onSubmit={handleSubmit} className={cn("p-5 border space-y-4", k.panel, k.radius)}>
        <div className="border-b border-current/10 pb-3">
          <h3 className={cn("text-sm font-bold tracking-tight", k.strong)}>
            Studio Collaboration Request
          </h3>
          <p className={cn("mt-0.5 text-xs leading-normal", k.muted)}>
            Complete the form fields below to initiate project scoping.
          </p>
        </div>

        {/* Error Alert */}
        {status === "error" && (
          <div className="flex items-start gap-2.5 rounded border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-rose-600 dark:text-rose-400">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">Submission halted:</strong>
              <p className="mt-0.5 text-[11px]">
                Please complete your name, email, and agree to studio terms.
              </p>
            </div>
          </div>
        )}

        {/* Success Alert */}
        {status === "success" && (
          <div className="flex items-center gap-2 rounded border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>Form dispatched successfully! We will reply within 24 hours.</span>
          </div>
        )}

        {/* Field 1: Name */}
        <div className="space-y-1">
          <label className={k.label} htmlFor="form-name">
            Full Name *
          </label>
          <input
            id="form-name"
            name="fullName"
            aria-label="Full Name"
            suppressHydrationWarning
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ada Lovelace"
            className={cn(
              "w-full text-xs",
              k.input,
              status === "error" && !name.trim() && "border-rose-500"
            )}
          />
        </div>

        {/* Field 2: Email */}
        <div className="space-y-1">
          <label className={k.label} htmlFor="form-email">
            Email Address *
          </label>
          <input
            id="form-email"
            name="emailAddress"
            aria-label="Email Address"
            type="email"
            suppressHydrationWarning
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ada@domain.org"
            className={cn(
              "w-full text-xs",
              k.input,
              status === "error" && !email.trim() && "border-rose-500"
            )}
          />
        </div>

        {/* Field 3: Role */}
        <div className="space-y-1">
          <label className={k.label} htmlFor="form-role">
            Project Discipline
          </label>
          <select
            id="form-role"
            name="projectRole"
            aria-label="Project Discipline"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={cn("w-full text-xs appearance-none", k.input)}
          >
            <option value="designer">Visual &amp; System Design</option>
            <option value="frontend">Frontend Architecture</option>
            <option value="fullstack">Fullstack Development</option>
          </select>
        </div>

        {/* Field 4: Checkbox */}
        <label className="flex items-start gap-2.5 pt-1 cursor-pointer select-none">
          <button
            type="button"
            role="checkbox"
            aria-checked={agreed}
            onClick={() => setAgreed(!agreed)}
            className={cn(
              "relative mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border transition-all",
              k.radius,
              agreed
                ? k.checkboxAccent
                : status === "error" && !agreed
                ? "border-rose-500 bg-rose-500/10"
                : "border-current/40"
            )}
          >
            {agreed && <Check className="h-3 w-3 stroke-[2.5]" />}
          </button>
          <span className={cn("text-xs leading-tight", k.text)}>
            I acknowledge studio privacy terms and NDAs. *
          </span>
        </label>

        {/* Actions */}
        <div className="flex items-center gap-2.5 pt-2">
          <button type="submit" className={k.btnPrimarySm}>
            Submit Inquiry
          </button>
          <button type="button" onClick={handleReset} className={k.btnSecondary}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

/* ========================================================================== */
/* 6 · Label Preview                                                          */
/* ========================================================================== */
export function LabelPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode);

  return (
    <div className={cn(k.panel, "mx-auto w-full max-w-md p-5 sm:p-6 shadow-sm space-y-6")}>
      {/* Component Header */}
      <div className="flex items-center justify-between border-b border-current/10 pb-3">
        <span className={cn("text-xs font-mono font-bold uppercase tracking-wider", k.muted)}>
          Label Anatomy & Hierarchy
        </span>
        <span className={cn("text-[10px] font-mono px-2 py-0.5 rounded-full border border-current/20", k.faint)}>
          Form Primitives
        </span>
      </div>

      {/* 1. Standard Field Label */}
      <div className="space-y-1">
        <label className={cn(k.label, "!mb-0 cursor-default")}>
          Standard Field Label
        </label>
        <p className={cn("text-[11px] leading-relaxed", k.muted)}>
          Primary typographical visual weight with high contrast and balanced letterspacing.
        </p>
      </div>

      {/* 2. Required Field Label */}
      <div className="space-y-1 pt-4 border-t border-current/10">
        <label className={cn(k.label, "!mb-0 cursor-default flex items-center gap-1.5")}>
          <span>Required Field Label</span>
          <span className="text-rose-500 font-bold text-sm leading-none" aria-hidden="true">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <p className={cn("text-[11px] leading-relaxed", k.muted)}>
          Includes high-contrast semantic required marker for mandatory form inputs.
        </p>
      </div>

      {/* 3. Optional Field Label */}
      <div className="space-y-1 pt-4 border-t border-current/10">
        <div className="flex items-center justify-between gap-2">
          <label className={cn(k.label, "!mb-0 cursor-default")}>
            Secondary Phone Number
          </label>
          <span className={cn("text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-current/20", k.faint)}>
            Optional
          </span>
        </div>
        <p className={cn("text-[11px] leading-relaxed", k.muted)}>
          Subtle metadata indicator clarifying non-mandatory nature without visual clutter.
        </p>
      </div>

      {/* 4. Label with Contextual Info & Action */}
      <div className="space-y-1 pt-4 border-t border-current/10">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <label className={cn(k.label, "!mb-0 cursor-default")}>
              Tax Identification Number
            </label>
            <span
              title="VAT or EIN registered with local revenue authority"
              className={cn("cursor-help inline-flex items-center opacity-65 transition-opacity hover:opacity-100", k.muted)}
            >
              <Info className="h-3.5 w-3.5" />
            </span>
          </div>
          <button
            type="button"
            className={cn("text-[11px] font-medium hover:underline transition-colors shrink-0", k.strong)}
          >
            Where to find?
          </button>
        </div>
        <p className={cn("text-[11px] leading-relaxed", k.muted)}>
          Integrated inline tooltip hint icon and baseline-aligned contextual action link.
        </p>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* 7 · Form Field Preview                                                     */
/* ========================================================================== */
export function FormFieldPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode);

  return (
    <div className="mx-auto w-full max-w-md space-y-5">
      {/* Field A: Normal state with hint */}
      <div className="space-y-1.5">
        <label className={k.label} htmlFor="demo-subdomain">
          Workspace Subdomain
        </label>
        <div className="relative flex items-center">
          <input
            id="demo-subdomain"
            name="workspaceSubdomain"
            aria-label="Workspace Subdomain"
            suppressHydrationWarning
            defaultValue="acme-studio"
            className={cn("w-full text-xs font-mono", k.input)}
          />
          <span className={cn("absolute right-3 text-xs font-mono opacity-50")}>
            .chameleon-ui.dev
          </span>
        </div>
        <p className={cn("text-[11px] leading-tight", k.faint)}>
          Your team URL identifier. Lowercase alphanumeric and hyphens only.
        </p>
      </div>

      {/* Field B: Validation Error state */}
      <div className="space-y-1.5">
        <label className={k.label} htmlFor="demo-error">
          Database Connection URI <span className="text-rose-500">*</span>
        </label>
        <input
          id="demo-error"
          name="databaseConnectionUri"
          aria-label="Database Connection URI"
          suppressHydrationWarning
          defaultValue="postgres://localhost:5432"
          aria-invalid="true"
          className={cn("w-full text-xs font-mono border-rose-500 ring-2 ring-rose-500/20", k.input)}
        />
        <div className="flex items-center gap-1.5 text-xs font-medium text-rose-500">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>Connection timed out: Missing authentication credentials.</span>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* 8 · Date Input Preview                                                     */
/* ========================================================================== */
export function DateInputPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode);
  const [date, setDate] = useState("2026-10-15");
  const [displayFormat, setDisplayFormat] = useState<DateDisplayFormat>("YYYY-MM-DD");

  return (
    <div className="mx-auto w-full max-w-sm space-y-2">
      <div className="flex items-center justify-between">
        <label className={k.label} htmlFor="date-input-field">
          Target Delivery Date
        </label>
        {/* Format toggle: YYYY-MM-DD vs DD-MM-YYYY */}
        <div className="inline-flex items-center rounded-md border border-current/15 bg-current/5 p-0.5 text-[10px]">
          <button
            type="button"
            onClick={() => setDisplayFormat("YYYY-MM-DD")}
            className={cn(
              "px-1.5 py-0.5 rounded font-mono transition-all",
              displayFormat === "YYYY-MM-DD"
                ? "bg-foreground text-background font-semibold shadow-xs"
                : "opacity-60 hover:opacity-100"
            )}
            aria-label="Format YYYY-MM-DD"
            aria-pressed={displayFormat === "YYYY-MM-DD"}
          >
            YYYY-MM-DD
          </button>
          <button
            type="button"
            onClick={() => setDisplayFormat("DD-MM-YYYY")}
            className={cn(
              "px-1.5 py-0.5 rounded font-mono transition-all",
              displayFormat === "DD-MM-YYYY"
                ? "bg-foreground text-background font-semibold shadow-xs"
                : "opacity-60 hover:opacity-100"
            )}
            aria-label="Format DD-MM-YYYY"
            aria-pressed={displayFormat === "DD-MM-YYYY"}
          >
            DD-MM-YYYY
          </button>
        </div>
      </div>

      <DateInput
        id="date-input-field"
        name="targetDeliveryDate"
        aria-label="Target Delivery Date"
        value={date}
        onChange={setDate}
        displayFormat={displayFormat}
        min="2026-01-01"
        max="2030-12-31"
        className={cn(
          k.input,
          k.focusRing,
          "!pl-10 !pr-10 text-xs transition-colors"
        )}
      />

      <div className="flex items-center justify-between text-[11px]">
        <span className={k.faint}>
          {displayFormat === "YYYY-MM-DD"
            ? "Format: ISO-8601 (YYYY-MM-DD)"
            : "Format: Localized (DD-MM-YYYY)"}
        </span>
        <span className={cn("font-mono font-medium", k.muted)}>
          {date ? `Selected: ${date}` : "No date chosen"}
        </span>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* 9 · Number Input Preview                                                   */
/* ========================================================================== */
export function NumberInputPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode);
  const [val, setVal] = useState(16);
  const min = 0;
  const max = 64;

  const inc = (delta: number) => {
    setVal((prev) => Math.min(Math.max(prev + delta, min), max));
  };

  return (
    <div className="mx-auto w-full max-w-xs space-y-2">
      <label className={k.label} htmlFor="number-stepper">
        Border Radius Token (px)
      </label>

      <div className={cn("inline-flex w-full items-center border", k.radius, k.panelSoft)}>
        <button
          type="button"
          disabled={val <= min}
          onClick={() => inc(-1)}
          className="flex h-9 w-9 shrink-0 items-center justify-center border-r border-current/20 opacity-70 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
          aria-label="Decrease"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>

        <input
          id="number-stepper"
          name="numberStepper"
          aria-label="Border Radius Token (px)"
          type="number"
          autoComplete="off"
          suppressHydrationWarning
          value={val}
          min={min}
          max={max}
          onChange={(e) => {
            const p = parseInt(e.target.value, 10);
            if (!isNaN(p)) setVal(Math.min(Math.max(p, min), max));
          }}
          className="h-9 w-full bg-transparent text-center font-mono text-xs font-bold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
        />

        <button
          type="button"
          disabled={val >= max}
          onClick={() => inc(1)}
          className="flex h-9 w-9 shrink-0 items-center justify-center border-l border-current/20 opacity-70 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
          aria-label="Increase"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex items-center justify-between text-[11px]">
        <span className={k.faint}>Bounds: {min}px – {max}px</span>
        <button
          type="button"
          onClick={() => inc(8)}
          className={cn("underline text-[10px] font-mono", k.muted)}
        >
          +8px Step
        </button>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* 10 · Showcase / Playground Preview                                         */
/* ========================================================================== */
export function ShowcasePreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode);
  const [simError, setSimError] = useState(false);
  const [simDisabled, setSimDisabled] = useState(false);
  const [simRequired, setSimRequired] = useState(true);

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      {/* Playground toolbar */}
      <div className={cn("flex flex-wrap items-center justify-between gap-3 p-3 border", k.panelSoft, k.radius)}>
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span>Interactive Form State Tester</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setSimError(!simError)}
            className={cn(
              "px-2.5 py-1 rounded text-[11px] font-mono transition-colors",
              simError
                ? "bg-rose-500 text-white"
                : "border border-current/20 opacity-70 hover:opacity-100"
            )}
          >
            Error: {simError ? "ON" : "OFF"}
          </button>
          <button
            type="button"
            onClick={() => setSimDisabled(!simDisabled)}
            className={cn(
              "px-2.5 py-1 rounded text-[11px] font-mono transition-colors",
              simDisabled
                ? "bg-amber-500 text-black"
                : "border border-current/20 opacity-70 hover:opacity-100"
            )}
          >
            Disabled: {simDisabled ? "ON" : "OFF"}
          </button>
          <button
            type="button"
            onClick={() => setSimRequired(!simRequired)}
            className={cn(
              "px-2.5 py-1 rounded text-[11px] font-mono transition-colors",
              simRequired
                ? k.btnPrimarySm
                : "border border-current/20 opacity-70 hover:opacity-100"
            )}
          >
            Required: {simRequired ? "ON" : "OFF"}
          </button>
        </div>
      </div>

      {/* Grid of form elements reacting to playground states */}
      <div className={cn("grid gap-4 p-5 border sm:grid-cols-2", k.panel, k.radius)}>
        {/* Input */}
        <div className="space-y-1">
          <label htmlFor="showcase-api-endpoint" className={k.label}>
            API Endpoint Name {simRequired && <span className="text-rose-500">*</span>}
          </label>
          <input
            id="showcase-api-endpoint"
            name="apiEndpoint"
            suppressHydrationWarning
            disabled={simDisabled}
            defaultValue="production-v3-cluster"
            aria-invalid={simError}
            className={cn(
              "w-full text-xs font-mono",
              k.input,
              simError && "border-rose-500 ring-2 ring-rose-500/20",
              simDisabled && "opacity-50 cursor-not-allowed"
            )}
          />
        </div>

        {/* Date */}
        <div className="space-y-1">
          <label htmlFor="showcase-deployment-window" className={k.label}>
            Deployment Window {simRequired && <span className="text-rose-500">*</span>}
          </label>
          <input
            id="showcase-deployment-window"
            name="deploymentWindow"
            type="date"
            suppressHydrationWarning
            disabled={simDisabled}
            defaultValue="2026-10-31"
            aria-invalid={simError}
            className={cn(
              "w-full text-xs",
              k.input,
              simError && "border-rose-500 ring-2 ring-rose-500/20",
              simDisabled && "opacity-50 cursor-not-allowed"
            )}
          />
        </div>

        {/* Checkbox */}
        <div className="space-y-1 sm:col-span-2">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <span
              className={cn(
                "flex h-4 w-4 shrink-0 items-center justify-center border",
                k.radius,
                k.checkboxAccent,
                simDisabled && "opacity-50 cursor-not-allowed",
                simError && "border-rose-500"
              )}
            >
              <Check className="h-3 w-3 stroke-[2.5]" />
            </span>
            <span className={cn("text-xs font-medium", k.text)}>
              Automated zero-downtime blue/green failover
            </span>
          </label>
          {simError && (
            <p className="text-[11px] text-rose-500 font-medium pl-6">
              Failover protocol rejected: Secondary zone unreachable.
            </p>
          )}
        </div>
      </div>

      {/* Accessibility card */}
      <div className={cn("p-4 border text-xs leading-relaxed space-y-1.5", k.panelSoft, k.radius)}>
        <strong className={cn("font-bold block", k.strong)}>
          WCAG 2.2 AA / AAA Accessibility Guarantee
        </strong>
        <p className={k.muted}>
          Every component in {k.styleName} enforces semantic HTML tags, keyboard navigation
          (Arrow keys, Tab, Enter, Space), explicit ARIA states (<code>aria-checked</code>,{" "}
          <code>aria-invalid</code>, <code>aria-disabled</code>), and high-contrast focus rings.
        </p>
      </div>
    </div>
  );
}
