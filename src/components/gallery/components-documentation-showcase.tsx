"use client";

import React, { useState } from "react";
import {
  Check,
  Minus,
  Copy,
  CheckCircle2,
  AlertCircle,
  Calendar,
  X,
  Plus,
  Info,
  ChevronDown,
  ShieldCheck,
  Keyboard,
  Layers,
  Sparkles,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { copyCode } from "@/lib/copy";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, NativeSelect } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormErrorSummary, FormSuccessAlert } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { FormField } from "@/components/ui/form-field";
import { DateInput } from "@/components/ui/date-input";
import { NumberInput } from "@/components/ui/number-input";
import { Button } from "@/components/ui/button";

const COMPONENTS_DOCS = [
  { id: "checkbox", name: "Checkbox", category: "Selection" },
  { id: "radio-group", name: "Radio Group", category: "Selection" },
  { id: "select", name: "Select", category: "Selection" },
  { id: "textarea", name: "Textarea", category: "Text Inputs" },
  { id: "form", name: "Form", category: "Structure" },
  { id: "label", name: "Label", category: "Typography" },
  { id: "form-field", name: "Form Field", category: "Structure" },
  { id: "date-input", name: "Date Input", category: "Specialized" },
  { id: "number-input", name: "Number Input", category: "Specialized" },
  { id: "playground", name: "Full Suite Playground", category: "Integration" },
];

export function ComponentsDocumentationShowcase() {
  const [activeTab, setActiveTab] = useState("checkbox");
  const [copied, setCopied] = useState(false);

  // Global interactive modifiers
  const [isDisabled, setIsDisabled] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isRequired, setIsRequired] = useState(false);

  // Component-specific interactive states
  const [cbChecked, setCbChecked] = useState(true);
  const [radioVal, setRadioVal] = useState("pro");
  const [radioVariant, setRadioVariant] = useState<"card" | "standard">("card");
  const [selectVal, setSelectVal] = useState("react");
  const [textareaVal, setTextareaVal] = useState("Antigravity UI Hub with clean Chakra-style ergonomics.");
  const [dateVal, setDateVal] = useState("2026-10-24");
  const [numberVal, setNumberVal] = useState<number | undefined>(24);
  const [numberStepper, setNumberStepper] = useState<"inline" | "buttons">("buttons");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleCopy = async (code: string, label: string) => {
    const ok = await copyCode(code, label);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="mt-16 rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      {/* Header banner */}
      <div className="border-b border-border bg-muted/40 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-teal-500/20 bg-teal-50 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-teal-700 dark:bg-teal-950/40 dark:text-teal-300">
              Interactive Component Documentation &amp; Showcase
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl text-foreground">
              Form Components Suite
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Test states, variants, keyboard accessibility, and copy production React code.
            </p>
          </div>

          {/* Interactive modifiers */}
          <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-background p-1.5 shadow-xs">
            <button
              type="button"
              onClick={() => setIsError(!isError)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors",
                isError ? "bg-rose-500 text-white" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <AlertCircle className="h-3.5 w-3.5" />
              Error: {isError ? "ON" : "OFF"}
            </button>
            <button
              type="button"
              onClick={() => setIsDisabled(!isDisabled)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors",
                isDisabled ? "bg-amber-500 text-black font-semibold" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Disabled: {isDisabled ? "ON" : "OFF"}
            </button>
            <button
              type="button"
              onClick={() => setIsRequired(!isRequired)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors",
                isRequired ? "bg-teal-600 text-white" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Required: {isRequired ? "ON" : "OFF"}
            </button>
          </div>
        </div>

        {/* Tab Pills */}
        <div className="mt-6 -mx-2 flex gap-1.5 overflow-x-auto px-2 pb-1 scrollbar-none">
          {COMPONENTS_DOCS.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveTab(c.id)}
              className={cn(
                "whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all",
                activeTab === c.id
                  ? "bg-foreground text-background shadow-xs"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main interactive showcase canvas */}
      <div className="p-6 sm:p-10">
        {/* 1 · CHECKBOX */}
        {activeTab === "checkbox" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Checkbox</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Controlled and uncontrolled toggle with checked, indeterminate, disabled, and error states.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Checkbox\n  label="Subscribe to weekly releases"\n  description="Sent every Tuesday morning."\n  checked={checked}\n  onCheckedChange={setChecked}\n  error={${isError}}\n  disabled={${isDisabled}}\n  required={${isRequired}}\n/>`,
                    "Checkbox"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Live interactive playground */}
              <div className="rounded-xl border border-border bg-background p-6 space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Interactive Preview
                </span>

                <Checkbox
                  id="interactive-cb"
                  label="Subscribe to weekly UI Hub updates"
                  description="Curated components, tokens, and design recipes delivered straight to your inbox."
                  checked={cbChecked}
                  onCheckedChange={(val) => setCbChecked(val)}
                  disabled={isDisabled}
                  error={isError}
                  required={isRequired}
                />

                <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
                  <Checkbox
                    id="indeterminate-cb"
                    label="Indeterminate selection state"
                    description="Useful for nested tree lists or partial select-all sets."
                    checked="indeterminate"
                    disabled={isDisabled}
                  />
                </div>
              </div>

              {/* State matrix */}
              <div className="rounded-xl border border-border bg-muted/20 p-6 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  States Matrix
                </span>
                <div className="grid gap-2.5 text-xs">
                  <div className="flex items-center justify-between p-2 rounded bg-background border">
                    <span>Default Checked</span>
                    <Checkbox defaultChecked disabled={false} />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-background border">
                    <span>Default Unchecked</span>
                    <Checkbox defaultChecked={false} />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-background border">
                    <span>Indeterminate</span>
                    <Checkbox checked="indeterminate" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-background border">
                    <span>Disabled (Checked)</span>
                    <Checkbox checked disabled />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-background border">
                    <span className="text-destructive font-medium">Validation Error</span>
                    <Checkbox error />
                  </div>
                </div>
              </div>
            </div>

            {/* Accessibility & Edge cases */}
            <div className="grid gap-4 sm:grid-cols-2 text-xs">
              <div className="rounded-lg border border-border p-4 space-y-1.5 bg-card">
                <div className="flex items-center gap-1.5 font-bold text-foreground">
                  <Keyboard className="h-4 w-4 text-teal-600" />
                  <span>Keyboard Navigation</span>
                </div>
                <p className="text-muted-foreground leading-normal">
                  Full keyboard control with <kbd className="px-1 py-0.5 border rounded bg-muted">Tab</kbd> to focus,{" "}
                  <kbd className="px-1 py-0.5 border rounded bg-muted">Space</kbd> or{" "}
                  <kbd className="px-1 py-0.5 border rounded bg-muted">Enter</kbd> to toggle. Focus ring adheres to WCAG 2.4.7.
                </p>
              </div>

              <div className="rounded-lg border border-border p-4 space-y-1.5 bg-card">
                <div className="flex items-center gap-1.5 font-bold text-foreground">
                  <ShieldCheck className="h-4 w-4 text-teal-600" />
                  <span>ARIA Compliance</span>
                </div>
                <p className="text-muted-foreground leading-normal">
                  Renders <code>role=&quot;checkbox&quot;</code> with dynamic <code>aria-checked=&quot;true | false | mixed&quot;</code>,{" "}
                  <code>aria-required</code>, and <code>aria-invalid</code> attributes.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 2 · RADIO GROUP */}
        {activeTab === "radio-group" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Radio Group</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Single-choice selection with keyboard arrow navigation, roving tabindex, and card layouts.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setRadioVariant(radioVariant === "card" ? "standard" : "card")}
                >
                  Layout: {radioVariant === "card" ? "Cards" : "Simple"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    handleCopy(
                      `<RadioGroup value={plan} onValueChange={setPlan}>\n  <RadioGroupItem value="free" label="Hobbyist" description="For personal tools" />\n  <RadioGroupItem value="pro" label="Professional" description="Unlimited team access" />\n</RadioGroup>`,
                      "Radio Group"
                    )
                  }
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                  {copied ? "Copied" : "Copy Code"}
                </Button>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-background p-6 space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Interactive Selection
                </span>

                <RadioGroup
                  value={radioVal}
                  onValueChange={setRadioVal}
                  disabled={isDisabled}
                  error={isError}
                >
                  <RadioGroupItem
                    value="starter"
                    label="Starter Tier"
                    description="Basic design kits, personal projects ($0/mo)"
                    card={radioVariant === "card"}
                  />
                  <RadioGroupItem
                    value="pro"
                    label="Professional Studio"
                    description="All 25 styles unlocked, unwatermarked exports ($24/mo)"
                    card={radioVariant === "card"}
                  />
                  <RadioGroupItem
                    value="enterprise"
                    label="Enterprise Scale"
                    description="Custom tokens, SLA, multi-seat team management ($99/mo)"
                    card={radioVariant === "card"}
                  />
                  <RadioGroupItem
                    value="disabled-opt"
                    label="Deprecated Tier"
                    description="Grandfathered licenses only"
                    disabled
                    card={radioVariant === "card"}
                  />
                </RadioGroup>
              </div>

              <div className="rounded-xl border border-border bg-muted/20 p-6 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Keyboard &amp; Roving Focus
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The Radio Group implements the W3C Roving Tabindex pattern. Only the selected radio button is reachable via Tab.
                  Once focused:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted-foreground">
                  <li><kbd className="px-1 py-0.5 border rounded bg-background">↓</kbd> or <kbd className="px-1 py-0.5 border rounded bg-background">→</kbd> selects the next item</li>
                  <li><kbd className="px-1 py-0.5 border rounded bg-background">↑</kbd> or <kbd className="px-1 py-0.5 border rounded bg-background">←</kbd> selects the previous item</li>
                  <li><kbd className="px-1 py-0.5 border rounded bg-background">Home</kbd> jumps to the first active item</li>
                  <li><kbd className="px-1 py-0.5 border rounded bg-background">End</kbd> jumps to the last active item</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 3 · SELECT */}
        {activeTab === "select" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Select</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Single-choice dropdown with listbox popover, keyboard traps, and hidden native input integration.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Select\n  options={[\n    { value: "react", label: "React 19" },\n    { value: "next", label: "Next.js App Router" },\n  ]}\n  value={val}\n  onValueChange={setVal}\n  error={${isError}}\n  disabled={${isDisabled}}\n/>`,
                    "Select"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-background p-6 space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Custom Accessible Dropdown
                </span>

                <div className="space-y-1.5">
                  <Label required={isRequired} error={isError}>Framework Ecosystem</Label>
                  <Select
                    options={[
                      { value: "react", label: "React 19 (Server Components)", description: "Standard modern ecosystem" },
                      { value: "next", label: "Next.js (App Router)", description: "Fullstack production framework" },
                      { value: "vue", label: "Vue 3 (Composition API)", description: "Reactive declarative frontend" },
                      { value: "svelte", label: "Svelte 5 (Runes)", description: "Compiler-based reactivity" },
                      { value: "angular", label: "Angular 18", disabled: true, description: "Enterprise batteries-included (Disabled)" },
                    ]}
                    value={selectVal}
                    onValueChange={setSelectVal}
                    error={isError}
                    disabled={isDisabled}
                  />
                  <p className="text-xs text-muted-foreground">
                    Selected value: <strong className="font-mono text-foreground">{selectVal}</strong>
                  </p>
                </div>

                <div className="pt-4 border-t border-border space-y-1.5">
                  <Label>Native Browser Fallback Select</Label>
                  <NativeSelect disabled={isDisabled} error={isError}>
                    <option value="light">Light Theme Mode</option>
                    <option value="dark">Dark Theme Mode</option>
                    <option value="system">System Preference</option>
                  </NativeSelect>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-muted/20 p-6 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Keyboard &amp; Form Features
                </span>
                <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground leading-normal">
                  <li>Press <kbd className="px-1 py-0.5 border rounded bg-background">Space</kbd> or <kbd className="px-1 py-0.5 border rounded bg-background">Enter</kbd> to open/close popover</li>
                  <li>Press <kbd className="px-1 py-0.5 border rounded bg-background">↓</kbd> or <kbd className="px-1 py-0.5 border rounded bg-background">↑</kbd> to cycle highlighted option</li>
                  <li>Press <kbd className="px-1 py-0.5 border rounded bg-background">Escape</kbd> to dismiss</li>
                  <li>Includes hidden <code>&lt;input type=&quot;hidden&quot;&gt;</code> ensuring standard HTML form submission compatibility</li>
                  <li>Clicking outside automatically closes listbox</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 4 · TEXTAREA */}
        {activeTab === "textarea" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Textarea</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Multi-line input with character counter indicator, resize constraints, and error boundaries.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Textarea\n  value={bio}\n  onChange={(e) => setBio(e.target.value)}\n  maxLength={200}\n  showCount\n  resize="vertical"\n  error={${isError}}\n  disabled={${isDisabled}}\n/>`,
                    "Textarea"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-background p-6 space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Interactive Textarea
                </span>

                <div className="space-y-1.5">
                  <Label htmlFor="demo-textarea" required={isRequired} error={isError}>
                    Style Philosophy &amp; Manifesto
                  </Label>
                  <Textarea
                    id="demo-textarea"
                    rows={4}
                    maxLength={160}
                    showCount
                    resize="vertical"
                    value={textareaVal}
                    onChange={(e) => setTextareaVal(e.target.value)}
                    error={isError}
                    disabled={isDisabled}
                    placeholder="Enter project rationale or notes..."
                  />
                </div>
              </div>

              <div className="rounded-xl border border-border bg-muted/20 p-6 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Options &amp; Edge Cases
                </span>
                <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground leading-normal">
                  <li><strong>Resize props:</strong> <code>&quot;none&quot;</code>, <code>&quot;vertical&quot;</code>, <code>&quot;horizontal&quot;</code>, <code>&quot;both&quot;</code></li>
                  <li><strong>Character counter:</strong> Real-time <code>showCount</code> bound to <code>maxLength</code></li>
                  <li><strong>Overflow edge case:</strong> Automatically prevents input beyond limit when <code>maxLength</code> is set</li>
                  <li><strong>Screen readers:</strong> Receives <code>aria-invalid</code> when error is active</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 5 · FORM */}
        {activeTab === "form" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Form</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Unified form wrapper managing submission state, error dictionaries, and accessible summaries.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Form onSubmitForm={async (data) => console.log(data)}>\n  <FormErrorSummary />\n  <FormField label="Full Name" name="name" required>\n    <Input name="name" />\n  </FormField>\n  <Button type="submit">Submit</Button>\n</Form>`,
                    "Form"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="max-w-xl mx-auto rounded-xl border border-border bg-background p-6 sm:p-8 space-y-5">
              <Form
                onSubmitForm={async () => {
                  setFormSubmitted(true);
                }}
              >
                {isError && (
                  <FormErrorSummary
                    errors={{
                      email: "Please provide a valid work address.",
                      terms: "You must accept terms of service.",
                    }}
                  />
                )}

                {formSubmitted && !isError && (
                  <FormSuccessAlert message="Form validation passed! Application submitted cleanly." />
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="First Name" required={isRequired} error={isError ? "First name required" : undefined}>
                    <input
                      name="firstName"
                      defaultValue="Margaret"
                      disabled={isDisabled}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs outline-none focus:ring-1 focus:ring-ring"
                    />
                  </FormField>

                  <FormField label="Last Name" required={isRequired}>
                    <input
                      name="lastName"
                      defaultValue="Hamilton"
                      disabled={isDisabled}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs outline-none focus:ring-1 focus:ring-ring"
                    />
                  </FormField>
                </div>

                <FormField label="Email" description="Used strictly for account alerts." required>
                  <input
                    type="email"
                    name="email"
                    defaultValue="margaret@apollo.nasa.gov"
                    disabled={isDisabled}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs outline-none focus:ring-1 focus:ring-ring"
                  />
                </FormField>

                <div className="pt-2 flex items-center justify-between">
                  <Button type="submit" disabled={isDisabled}>
                    Submit Application
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setFormSubmitted(false)}>
                    Reset
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        )}

        {/* 6 · LABEL */}
        {activeTab === "label" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Label</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Semantic label component with required asterisk, optional badge, and tooltip hints.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Label htmlFor="email" required>Work Email</Label>\n<Label htmlFor="notes" optional>Project Notes</Label>`,
                    "Label"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-border p-5 space-y-2 bg-background">
                <span className="text-[11px] font-mono text-muted-foreground">01 Standard</span>
                <div>
                  <Label htmlFor="ex-std">Standard Field</Label>
                </div>
                <p className="text-xs text-muted-foreground">Font-medium with muted fallback color.</p>
              </div>

              <div className="rounded-lg border border-border p-5 space-y-2 bg-background">
                <span className="text-[11px] font-mono text-muted-foreground">02 Required</span>
                <div>
                  <Label htmlFor="ex-req" required>Required Field</Label>
                </div>
                <p className="text-xs text-muted-foreground">Appends semantic asterisk with aria-hidden.</p>
              </div>

              <div className="rounded-lg border border-border p-5 space-y-2 bg-background">
                <span className="text-[11px] font-mono text-muted-foreground">03 Optional</span>
                <div>
                  <Label htmlFor="ex-opt" optional>Phone Extension</Label>
                </div>
                <p className="text-xs text-muted-foreground">Clarifies non-mandatory input cleanly.</p>
              </div>

              <div className="rounded-lg border border-border p-5 space-y-2 bg-background">
                <span className="text-[11px] font-mono text-muted-foreground">04 With Tooltip Hint</span>
                <div>
                  <Label htmlFor="ex-hint" hint="EIN or VAT number">Tax Identification</Label>
                </div>
                <p className="text-xs text-muted-foreground">Interactive contextual guidance.</p>
              </div>
            </div>
          </div>
        )}

        {/* 7 · FORM FIELD */}
        {activeTab === "form-field" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Form Field</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Integrated container binding Label, Input, Helper text, and Error alert with automatic ID generation.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<FormField\n  label="Domain Name"\n  description="Must be valid FQDN."\n  error={isError ? "Domain already registered." : undefined}\n  required\n>\n  <Input placeholder="acme.org" />\n</FormField>`,
                    "FormField"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-background p-6 space-y-5">
                <FormField
                  label="API Token Key"
                  description="Found in developer settings under Credentials."
                  required={isRequired}
                  disabled={isDisabled}
                  error={isError ? "Token invalid or expired." : undefined}
                >
                  <input
                    defaultValue="sec_live_94827103984"
                    disabled={isDisabled}
                    className={cn(
                      "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 font-mono text-xs shadow-xs outline-none focus:ring-1 focus:ring-ring",
                      isError && "border-destructive text-destructive"
                    )}
                  />
                </FormField>
              </div>

              <div className="rounded-xl border border-border bg-muted/20 p-6 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Automated ARIA Linking
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  FormField generates matching IDs and attaches <code>aria-describedby</code> to helper descriptions and{" "}
                  <code>role=&quot;alert&quot;</code> to validation error banners so screen readers announce changes immediately.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 8 · DATE INPUT */}
        {activeTab === "date-input" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Date Input</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Semantic date picker with calendar trigger icon, clear action, and min/max limits.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<DateInput\n  value={date}\n  onChange={setDate}\n  min="2026-01-01"\n  max="2030-12-31"\n  error={${isError}}\n  disabled={${isDisabled}}\n/>`,
                    "DateInput"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-background p-6 space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Interactive Date Picker
                </span>

                <div className="space-y-1.5 max-w-sm">
                  <Label required={isRequired} error={isError}>Release Cutoff Date</Label>
                  <DateInput
                    value={dateVal}
                    onChange={setDateVal}
                    min="2026-01-01"
                    max="2030-12-31"
                    disabled={isDisabled}
                    error={isError}
                  />
                  <p className="text-xs text-muted-foreground">
                    Selected ISO date: <strong className="font-mono text-foreground">{dateVal || "none"}</strong>
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-muted/20 p-6 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Features &amp; Edge Cases
                </span>
                <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground leading-normal">
                  <li>Integrated calendar icon prefix and one-click clear button</li>
                  <li>Cross-browser calendar picker indicator styling (supports dark mode invert)</li>
                  <li>Min/Max constraints clamp out-of-range dates natively</li>
                  <li>Supports standard ISO-8601 strings (YYYY-MM-DD)</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 9 · NUMBER INPUT */}
        {activeTab === "number-input" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Number Input</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Numeric stepper with buttons (+ / -), arrow key navigation, Shift+Arrow 10x step, and bounds clamping.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setNumberStepper(numberStepper === "buttons" ? "inline" : "buttons")}
                >
                  Stepper: {numberStepper === "buttons" ? "Buttons" : "Inline Chevrons"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    handleCopy(
                      `<NumberInput\n  value={num}\n  onValueChange={setNum}\n  min={0}\n  max={100}\n  step={1}\n  stepperType="${numberStepper}"\n  error={${isError}}\n  disabled={${isDisabled}}\n/>`,
                      "NumberInput"
                    )
                  }
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                  {copied ? "Copied" : "Copy Code"}
                </Button>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-background p-6 space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Interactive Stepper
                </span>

                <div className="space-y-1.5 max-w-xs">
                  <Label required={isRequired} error={isError}>Cache TTL (Seconds)</Label>
                  <NumberInput
                    value={numberVal}
                    onValueChange={setNumberVal}
                    min={0}
                    max={120}
                    step={1}
                    stepperType={numberStepper}
                    disabled={isDisabled}
                    error={isError}
                  />
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                    <span>Min: 0 · Max: 120</span>
                    <button
                      type="button"
                      onClick={() => setNumberVal(60)}
                      className="underline text-teal-600 hover:text-teal-700"
                    >
                      Set to 60s
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-muted/20 p-6 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Controls &amp; Keyboard
                </span>
                <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground leading-normal">
                  <li><kbd className="px-1 py-0.5 border rounded bg-background">↑</kbd> increments by <code>step</code></li>
                  <li><kbd className="px-1 py-0.5 border rounded bg-background">↓</kbd> decrements by <code>step</code></li>
                  <li><kbd className="px-1 py-0.5 border rounded bg-background">Shift + ↑ / ↓</kbd> steps by 10x</li>
                  <li>Typing invalid numbers automatically clamps to <code>min</code> / <code>max</code> upon blur</li>
                  <li>Buttons auto-disable when value reaches bounds</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 10 · PLAYGROUND */}
        {activeTab === "playground" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Integrated Suite Playground</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  All 10 components reacting dynamically in concert.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                <Sparkles className="h-4 w-4" /> Ready for production
              </span>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 rounded-xl border border-border bg-background p-6 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="Member Name" required={isRequired} error={isError ? "Required field" : undefined}>
                    <input
                      defaultValue="Ada Lovelace"
                      disabled={isDisabled}
                      className="h-9 w-full rounded-md border border-input px-3 text-xs shadow-xs"
                    />
                  </FormField>

                  <div className="space-y-1.5">
                    <Label required={isRequired}>Billing Currency</Label>
                    <Select
                      options={[
                        { value: "usd", label: "USD ($)" },
                        { value: "eur", label: "EUR (€)" },
                        { value: "gbp", label: "GBP (£)" },
                      ]}
                      value="usd"
                      disabled={isDisabled}
                      error={isError}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label required={isRequired}>Deployment Date</Label>
                    <DateInput value={dateVal} onChange={setDateVal} disabled={isDisabled} error={isError} />
                  </div>

                  <div className="space-y-1.5">
                    <Label required={isRequired}>Max Workers</Label>
                    <NumberInput value={numberVal} onValueChange={setNumberVal} min={1} max={32} disabled={isDisabled} error={isError} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label required={isRequired}>Project Description</Label>
                  <Textarea
                    rows={3}
                    maxLength={140}
                    showCount
                    value={textareaVal}
                    onChange={(e) => setTextareaVal(e.target.value)}
                    disabled={isDisabled}
                    error={isError}
                  />
                </div>

                <Checkbox
                  label="I verify the server specifications comply with company policies"
                  checked={cbChecked}
                  onCheckedChange={setCbChecked}
                  disabled={isDisabled}
                  error={isError}
                  required={isRequired}
                />
              </div>

              <div className="rounded-xl border border-border bg-muted/20 p-6 space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Architecture Highlights
                </span>
                <div className="space-y-3 text-xs text-muted-foreground leading-normal">
                  <p>
                    <strong className="text-foreground block">Zero Foreign Dependencies:</strong> Form components rely exclusively on semantic HTML, Radix primitives already present, and Tailwind CSS.
                  </p>
                  <p>
                    <strong className="text-foreground block">Controlled &amp; Uncontrolled:</strong> Every input supports standard React state hooks or native FormData forms.
                  </p>
                  <p>
                    <strong className="text-foreground block">25 Styles Synchronization:</strong> Seamlessly ported to every aesthetic in UI Hub with matching tokens, fonts, and dark mode.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
