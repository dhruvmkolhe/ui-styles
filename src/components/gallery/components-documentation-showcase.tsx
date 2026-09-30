"use client";

import React, { useState } from "react";
import {
  Check,
  Minus,
  Copy,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Cookie,
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
import { Alert } from "@/components/ui/alert";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { SuccessState } from "@/components/ui/success-state";
import { Callout } from "@/components/ui/callout";
import { NotificationCenter } from "@/components/ui/notification-center";
import { CookieBanner } from "@/components/ui/cookie-banner";
import { BreadcrumbNav } from "@/components/ui/breadcrumb";
import { PaginationNav } from "@/components/ui/pagination";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem as NavMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  MenuBar,
  MenuBarMenu,
  MenuBarItem,
  MenuBarSeparator,
} from "@/components/ui/menu-bar";
import { Stepper } from "@/components/ui/stepper";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { CommandMenu } from "@/components/ui/command-menu";
import { Link as CustomLink } from "@/components/ui/link";
import { BackToTop } from "@/components/ui/back-to-top";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bell,
  Compass,
  FolderKanban,
  Home,
  LayoutGrid,
  ListOrdered,
  Milestone,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings,
  Smartphone,
  Split,
  User,
  Waypoints,
  ExternalLink,
} from "lucide-react";

const COMPONENTS_DOCS = [
  { id: "checkbox", name: "Checkbox", category: "Form" },
  { id: "radio-group", name: "Radio Group", category: "Form" },
  { id: "select", name: "Select", category: "Form" },
  { id: "textarea", name: "Textarea", category: "Form" },
  { id: "form", name: "Form", category: "Form" },
  { id: "label", name: "Label", category: "Form" },
  { id: "form-field", name: "Form Field", category: "Form" },
  { id: "date-input", name: "Date Input", category: "Form" },
  { id: "number-input", name: "Number Input", category: "Form" },
  { id: "alert", name: "Alert / Banner", category: "Feedback" },
  { id: "confirmation-dialog", name: "Confirmation Dialog", category: "Feedback" },
  { id: "alert-dialog", name: "Alert Dialog", category: "Feedback" },
  { id: "loading-overlay", name: "Loading Overlay", category: "Feedback" },
  { id: "empty-state", name: "Empty State", category: "Feedback" },
  { id: "error-state", name: "Error State", category: "Feedback" },
  { id: "success-state", name: "Success State", category: "Feedback" },
  { id: "callout", name: "Callout", category: "Feedback" },
  { id: "notification-center", name: "Notification Center", category: "Feedback" },
  { id: "cookie-banner", name: "Cookie Banner", category: "Feedback" },
  { id: "breadcrumb", name: "Breadcrumb", category: "Navigation" },
  { id: "pagination", name: "Pagination", category: "Navigation" },
  { id: "sidebar", name: "Sidebar", category: "Navigation" },
  { id: "navigation-menu", name: "Navigation Menu", category: "Navigation" },
  { id: "menu-bar", name: "Menu Bar", category: "Navigation" },
  { id: "stepper", name: "Stepper", category: "Navigation" },
  { id: "bottom-navigation", name: "Bottom Navigation", category: "Navigation" },
  { id: "command-menu", name: "Command Menu", category: "Navigation" },
  { id: "link", name: "Link", category: "Navigation" },
  { id: "back-to-top", name: "Back to Top", category: "Navigation" },
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

  // Batch 2 interactive states
  const [alertFormat, setAlertFormat] = useState<"card" | "banner">("card");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmResult, setConfirmResult] = useState<string | null>(null);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [loadingActive, setLoadingActive] = useState(false);
  const [emptyPreset, setEmptyPreset] = useState<"search" | "data" | "inbox" | "generic">("search");
  const [isRetrying, setIsRetrying] = useState(false);
  const [cookieConsent, setCookieConsent] = useState<string | null>(null);

  // Batch 3 Navigation interactive states
  const [breadcrumbSep, setBreadcrumbSep] = useState<"chevron" | "slash" | "dot">("chevron");
  const [navPage, setNavPage] = useState(3);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarActive, setSidebarActive] = useState("overview");
  const [stepperStep, setStepperStep] = useState(1);
  const [stepperOrientation, setStepperOrientation] = useState<"horizontal" | "vertical">("horizontal");
  const [bottomNavVal, setBottomNavVal] = useState("home");
  const [cmdOpen, setCmdOpen] = useState(false);
  const [cmdResult, setCmdResult] = useState<string | null>(null);
  const [navMenuVal, setNavMenuVal] = useState<string | null>(null);
  const [menuBarAction, setMenuBarAction] = useState<string | null>(null);

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

        {/* 10 · ALERT / BANNER */}
        {activeTab === "alert" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Alert / Banner</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Contextual messaging for informational, success, warning, and destructive situations with dismissibility.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setAlertFormat(alertFormat === "card" ? "banner" : "card")}
                >
                  Format: {alertFormat === "card" ? "Card" : "Banner"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    handleCopy(
                      `<Alert\n  variant="info"\n  format="${alertFormat}"\n  title="Update Available"\n  description="New security patches are ready to apply."\n  dismissible\n/>`,
                      "Alert"
                    )
                  }
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                  {copied ? "Copied" : "Copy Code"}
                </Button>
              </div>
            </div>

            <div className="space-y-3 max-w-2xl mx-auto">
              <Alert
                variant="info"
                format={alertFormat}
                title="Informational Notice"
                description="Your workspace configuration has been backed up to secondary storage."
                dismissible
              />
              <Alert
                variant="success"
                format={alertFormat}
                title="SSL Certificate Issued"
                description="Wildcard certificate verified and applied across all edge nodes."
                dismissible
              />
              <Alert
                variant="warning"
                format={alertFormat}
                title="Usage Threshold Approaching"
                description="85% of monthly bandwidth allowance consumed. Quota resets in 4 days."
                dismissible
              />
              <Alert
                variant="destructive"
                format={alertFormat}
                title="Database Connectivity Failure"
                description="Failed to contact primary replica. Swapping to hot standby pool."
                dismissible
              />
            </div>
          </div>
        )}

        {/* 11 · CONFIRMATION DIALOG */}
        {activeTab === "confirmation-dialog" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Confirmation Dialog</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Modal confirmation flow with focus trapping, backdrop overlay, keyboard Escape, and loading lock.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<ConfirmationDialog\n  trigger={<Button>Publish Changes</Button>}\n  title="Publish to Global CDN?"\n  description="This action will propagate tokens to 25 edge nodes."\n  confirmLabel="Confirm Publish"\n  onConfirm={async () => await syncTokens()}\n/>`,
                    "ConfirmationDialog"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-background p-6 text-center space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground block text-left">
                  Interactive Trigger
                </span>

                <div className="py-6">
                  <ConfirmationDialog
                    open={confirmOpen}
                    onOpenChange={setConfirmOpen}
                    trigger={<Button disabled={isDisabled}>Open Confirmation Flow</Button>}
                    title="Publish Design System to Production?"
                    description="This will deploy 35 components across all 25 design styles. Active sessions will automatically receive updated token manifests."
                    confirmLabel="Yes, Deploy Now"
                    cancelLabel="Return to Staging"
                    destructive={isError}
                    onConfirm={() => {
                      setConfirmResult("Confirmed! Deployment dispatched at " + new Date().toLocaleTimeString());
                    }}
                  />
                </div>

                {confirmResult && (
                  <p className="text-xs text-emerald-600 font-medium">
                    {confirmResult}
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-border bg-muted/20 p-6 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Focus Management &amp; Semantics
                </span>
                <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground leading-normal">
                  <li>Focus is trapped inside the dialog container while open.</li>
                  <li>Pressing <kbd className="px-1 py-0.5 border rounded bg-background">Escape</kbd> gracefully closes without submission.</li>
                  <li>Focus returns directly to triggering button upon dismissal.</li>
                  <li>Submit action disables buttons to prevent accidental double submissions.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 12 · ALERT DIALOG */}
        {activeTab === "alert-dialog" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Alert Dialog</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Critical modal dialog implementing role=&quot;alertdialog&quot; and safe cancel-first focus default.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<AlertDialog\n  trigger={<Button variant="destructive">Purge Database</Button>}\n  title="Purge Entire Cluster?"\n  description="This action is irreversible and permanently deletes all tokens."\n  confirmLabel="Purge Everything"\n  destructive\n/>`,
                    "AlertDialog"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-background p-6 text-center space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground block text-left">
                  Destructive Action Simulation
                </span>

                <div className="py-6">
                  <AlertDialog
                    open={alertModalOpen}
                    onOpenChange={setAlertModalOpen}
                    trigger={
                      <Button variant="destructive" disabled={isDisabled}>
                        Purge Production Cluster
                      </Button>
                    }
                    title="Irreversible Action: Purge Cluster?"
                    description="Are you absolutely certain? This will delete all 35 component manifests and reset all theme tokens to factory defaults. This action cannot be undone."
                    confirmLabel="Confirm Permanent Purge"
                    cancelLabel="Abort Action"
                    destructive
                  />
                </div>
              </div>

              <div className="rounded-xl border border-border bg-muted/20 p-6 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  WCAG Safe Focus Pattern
                </span>
                <p className="text-xs text-muted-foreground leading-normal">
                  In accordance with W3C guidelines for destructive actions, initial keyboard focus lands on the{" "}
                  <strong>Cancel button</strong> rather than the Destructive Confirm action, preventing accidental trigger on rapid keystrokes.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 13 · LOADING OVERLAY */}
        {activeTab === "loading-overlay" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Loading Overlay</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Blocking indicator overlay with spinner, custom messages, aria-busy status, and backdrop blur.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<LoadingOverlay\n  visible={isLoading}\n  message="Reindexing Search Shards..."\n  description="Please wait while document embeddings are regenerated."\n  blur\n/>`,
                    "LoadingOverlay"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="max-w-xl mx-auto space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Interactive Container Simulation</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setLoadingActive(true);
                    setTimeout(() => setLoadingActive(false), 2500);
                  }}
                >
                  {loadingActive ? "Processing..." : "Trigger 2.5s Loading Overlay"}
                </Button>
              </div>

              <div className="relative rounded-xl border border-border bg-background p-6 min-h-[180px] flex flex-col justify-between overflow-hidden shadow-xs">
                <div>
                  <h4 className="text-sm font-bold text-foreground">Edge Deployment Cluster</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Nodes: 24 active · Region: Global Anycast · Protocol: HTTP/3 enabled
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  <span>Status: Operational</span>
                  <span className="font-mono text-emerald-600 font-semibold">99.99% SLA</span>
                </div>

                <LoadingOverlay
                  visible={loadingActive}
                  message="Rebuilding Static Artifacts..."
                  description="Pre-rendering 35 components across 25 design styles."
                  blur
                />
              </div>
            </div>
          </div>
        )}

        {/* 14 · EMPTY STATE */}
        {activeTab === "empty-state" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Empty State</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Zero-data states for search, datasets, inbox, and first-use onboarding.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    setEmptyPreset(
                      emptyPreset === "search" ? "data" : emptyPreset === "data" ? "inbox" : "search"
                    )
                  }
                >
                  Preset: {emptyPreset.toUpperCase()}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    handleCopy(
                      `<EmptyState\n  preset="${emptyPreset}"\n  action={<Button size="sm">Create New Entry</Button>}\n/>`,
                      "EmptyState"
                    )
                  }
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                  {copied ? "Copied" : "Copy Code"}
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-lg mx-auto">
              <EmptyState
                preset={emptyPreset}
                action={<Button size="sm">Primary Action</Button>}
                secondaryAction={<Button size="sm" variant="outline">Learn More</Button>}
              />
            </div>
          </div>
        )}

        {/* 15 · ERROR STATE */}
        {activeTab === "error-state" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Error State</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Failure boundary display with retry CTA, loading retry feedback, and technical diagnostics disclosure.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<ErrorState\n  title="Connection Failure"\n  description="Failed to synchronize style tokens."\n  onRetry={async () => await retrySync()}\n  errorDetails="Error: 504 Gateway Timeout at api/tokens"\n/>`,
                    "ErrorState"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-lg mx-auto">
              <ErrorState
                title="Remote Manifest Unreachable"
                description="Unable to establish secure handshake with upstream token repository."
                errorDetails="FetchError: connect ETIMEDOUT 198.51.100.42:443\n  at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1146:16)"
                isRetrying={isRetrying}
                onRetry={() => {
                  setIsRetrying(true);
                  setTimeout(() => setIsRetrying(false), 1500);
                }}
                secondaryAction={<Button size="sm" variant="outline">Status Page</Button>}
              />
            </div>
          </div>
        )}

        {/* 16 · SUCCESS STATE */}
        {activeTab === "success-state" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Success State</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Positive completion feedback with checkmark visual, receipt key-values, and primary actions.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<SuccessState\n  title="Export Complete"\n  description="35 components ready for download."\n  details={[\n    { label: "Batch", value: "Batch 2 Completed" },\n    { label: "Styles", value: "25 Styles Active" },\n  ]}\n  action={<Button size="sm">Download Bundle</Button>}\n/>`,
                    "SuccessState"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-lg mx-auto">
              <SuccessState
                title="Design System Export Complete"
                description="All 35 components have been validated, bundled with Tailwind CSS, and verified against WCAG AAA contrast."
                details={[
                  { label: "Artifact", value: "ui-hub-batch-2.tar.gz" },
                  { label: "Components", value: "35 Components" },
                  { label: "Design Styles", value: "25 Aesthetics" },
                ]}
                action={<Button size="sm">Download Package</Button>}
                secondaryAction={<Button size="sm" variant="outline">Explore Vault</Button>}
              />
            </div>
          </div>
        )}

        {/* 17 · CALLOUT */}
        {activeTab === "callout" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Callout</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Contextual editorial aside with left accent rule, tips, warning notes, and optional dismiss action.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Callout variant="info" title="Performance Optimization">\n  All components use native CSS variables for zero JavaScript runtime styling overhead.\n</Callout>`,
                    "Callout"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="space-y-3 max-w-2xl mx-auto">
              <Callout variant="info" title="Pro-Tip · Zero CSS Overhead">
                Every style in UI Hub is generated exclusively with utility classes. No external stylesheets or runtime CSS-in-JS dependencies are needed.
              </Callout>

              <Callout variant="success" title="Production Ready">
                Components comply with Section 508 and WCAG 2.2 AA / AAA keyboard focus guidelines.
              </Callout>

              <Callout variant="warning" title="Hydration Notice">
                When embedding custom dialogs inside server component pages, ensure client boundary declarations are preserved.
              </Callout>

              <Callout variant="neutral" title="Editorial Note" dismissible>
                Designed for high readability across both light and dark canvas modes.
              </Callout>
            </div>
          </div>
        )}

        {/* 18 · NOTIFICATION CENTER */}
        {activeTab === "notification-center" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Notification Center</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Notification drawer with read/unread tracking, filter tabs (All/Unread), mark all read, and badge counters.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<NotificationCenter\n  notifications={[\n    {\n      id: "1",\n      title: "Tokens Updated",\n      description: "Updated 14 palette tokens.",\n      timestamp: "5m ago",\n      read: false,\n      type: "info",\n    },\n  ]}\n/>`,
                    "NotificationCenter"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-md mx-auto text-center space-y-4">
              <span className="text-xs text-muted-foreground block">
                Click bell trigger to test popover drawer:
              </span>

              <div className="flex justify-center py-4">
                <NotificationCenter
                  notifications={[
                    {
                      id: "n-1",
                      title: "Batch 2 Components Released",
                      description: "10 new feedback and dialog components now live.",
                      timestamp: "Just now",
                      read: false,
                      type: "success",
                    },
                    {
                      id: "n-2",
                      title: "Style Manifest Revalidated",
                      description: "All 25 design styles synchronized across edge nodes.",
                      timestamp: "12m ago",
                      read: false,
                      type: "info",
                    },
                    {
                      id: "n-3",
                      title: "Bandwidth Threshold Warning",
                      description: "Approaching 85% of monthly request quota.",
                      timestamp: "1h ago",
                      read: true,
                      type: "warning",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        )}

        {/* 19 · COOKIE BANNER */}
        {activeTab === "cookie-banner" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Cookie Banner</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Privacy compliance banner with granular category preferences and persistent localStorage state.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<CookieBanner\n  title="We respect your privacy"\n  description="We use cookies to analyze usage and customize themes."\n  onAcceptAll={(prefs) => console.log(prefs)}\n/>`,
                    "CookieBanner"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Embedded Consent Preview</span>
                {cookieConsent && (
                  <button
                    type="button"
                    onClick={() => setCookieConsent(null)}
                    className="underline text-teal-600 font-mono"
                  >
                    Reset Storage
                  </button>
                )}
              </div>

              {!cookieConsent ? (
                <div className="p-4 rounded-xl border border-border bg-card space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="p-2 rounded-lg bg-amber-500/10 text-amber-600">
                      <Cookie className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">We value your privacy</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        We use essential cookies to maintain secure sessions, plus optional analytics to optimize UI component rendering.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-border">
                    <Button size="sm" variant="outline" onClick={() => setCookieConsent("Custom Preferences Saved")}>
                      Customize
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => setCookieConsent("Essential Only Accepted")}>
                      Essential Only
                    </Button>
                    <Button size="sm" onClick={() => setCookieConsent("All Cookies Accepted")}>
                      Accept All
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-lg border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="font-semibold">{cookieConsent}</span>
                  </div>
                  <span className="font-mono text-[11px] opacity-70">localStorage updated</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 20 · BREADCRUMB */}
        {activeTab === "breadcrumb" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Breadcrumb</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Semantic trail navigation with icons, custom separators, responsive collapse, and active page semantics.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<BreadcrumbNav\n  items={[\n    { label: "Home", href: "/", icon: <Home className="h-3.5 w-3.5" /> },\n    { label: "Settings", href: "/settings" },\n    { label: "Team", isCurrent: true },\n  ]}\n  separator="/"\n/>`,
                    "Breadcrumb"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-6">
              {/* Interactive Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4 text-xs">
                <span className="font-semibold text-muted-foreground">Separator Style:</span>
                <div className="flex items-center gap-1.5">
                  {(["chevron", "slash", "dot"] as const).map((sep) => (
                    <Button
                      key={sep}
                      size="sm"
                      variant={breadcrumbSep === sep ? "default" : "outline"}
                      onClick={() => setBreadcrumbSep(sep)}
                      className="h-7 text-xs capitalize"
                    >
                      {sep}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Breadcrumb Display */}
              <div className="p-4 rounded-xl border border-border bg-card">
                <BreadcrumbNav
                  items={[
                    { label: "Home", href: "#", icon: <Home className="h-3.5 w-3.5" /> },
                    { label: "Dashboard", href: "#" },
                    { label: "Components", href: "#", icon: <Layers className="h-3.5 w-3.5" /> },
                    { label: "Navigation", href: "#" },
                    { label: "Breadcrumb", isCurrent: true },
                  ]}
                  separator={
                    breadcrumbSep === "slash" ? (
                      <span className="opacity-40">/</span>
                    ) : breadcrumbSep === "dot" ? (
                      <span className="opacity-40">•</span>
                    ) : undefined
                  }
                />
              </div>

              <div className="rounded-lg border border-border bg-muted/20 p-4 text-xs space-y-2">
                <div className="font-semibold text-foreground">Accessibility Specifications:</div>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Wrapped in semantic <code className="font-mono text-[11px]">&lt;nav aria-label=&quot;Breadcrumb&quot;&gt;</code>.</li>
                  <li>Ordered list <code className="font-mono text-[11px]">&lt;ol&gt;</code> structure communicates chronological hierarchy.</li>
                  <li>Current destination marked with <code className="font-mono text-[11px]">aria-current=&quot;page&quot;</code> and disabled link cursor.</li>
                  <li>Separators marked with <code className="font-mono text-[11px]">aria-hidden=&quot;true&quot;</code> to prevent screen-reader clutter.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 21 · PAGINATION */}
        {activeTab === "pagination" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Pagination</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Accessible page switcher with range ellipsis, jump controls, and mobile responsive layout.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<PaginationNav\n  page={currentPage}\n  totalPages={16}\n  onPageChange={setCurrentPage}\n  siblingCount={1}\n  showFirstLast\n/>`,
                    "Pagination"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-3">
                <span>Active Page: <strong className="text-foreground">{navPage}</strong> of 16</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px]">Jump:</span>
                  {[1, 5, 8, 16].map((p) => (
                    <Button
                      key={p}
                      size="sm"
                      variant={navPage === p ? "default" : "outline"}
                      onClick={() => setNavPage(p)}
                      className="h-6 w-7 text-[11px] p-0"
                    >
                      {p}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl border border-border bg-card flex justify-center">
                <PaginationNav
                  page={navPage}
                  totalPages={16}
                  onPageChange={setNavPage}
                  siblingCount={1}
                  showFirstLast
                  disabled={isDisabled}
                />
              </div>

              <div className="rounded-lg border border-border bg-muted/20 p-4 text-xs space-y-2">
                <div className="font-semibold text-foreground">Keyboard &amp; Assistive Controls:</div>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Previous/Next buttons properly set <code className="font-mono text-[11px]">aria-disabled=&quot;true&quot;</code> at boundaries.</li>
                  <li>Active page communicates status via <code className="font-mono text-[11px]">aria-current=&quot;page&quot;</code>.</li>
                  <li>Responsive mobile mode collapses page numbers to <code className="font-mono text-[11px]">Page X of Y</code> automatically.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 22 · SIDEBAR */}
        {activeTab === "sidebar" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Sidebar</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Collapsible navigation drawer with nested submenus, mobile slide-out overlay, badges, and focus trap.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Sidebar collapsed={isCollapsed}>\n  <SidebarHeader>UI Hub</SidebarHeader>\n  <SidebarContent>\n    <SidebarMenu>\n      <SidebarMenuItem>\n        <SidebarMenuButton icon={<Home />} isActive>Overview</SidebarMenuButton>\n      </SidebarMenuItem>\n    </SidebarMenu>\n  </SidebarContent>\n</Sidebar>`,
                    "Sidebar"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-xs text-muted-foreground">
                  Mode: <strong className="text-foreground">{sidebarCollapsed ? "Collapsed (Icon-Only)" : "Expanded (Full)"}</strong>
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="h-7 text-xs flex items-center gap-1.5"
                >
                  {sidebarCollapsed ? <PanelLeftOpen className="h-3.5 w-3.5" /> : <PanelLeftClose className="h-3.5 w-3.5" />}
                  <span>{sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}</span>
                </Button>
              </div>

              {/* Embedded Sidebar Demonstration */}
              <div className="flex justify-center p-2 rounded-xl bg-muted/20 border border-border">
                <div
                  className={cn(
                    "border border-border bg-card rounded-xl transition-all duration-300 flex flex-col h-[360px] select-none shadow-md",
                    sidebarCollapsed ? "w-16" : "w-64"
                  )}
                >
                  <div className={cn("h-14 border-b border-border flex items-center px-3.5 gap-2 shrink-0", sidebarCollapsed && "justify-center")}>
                    <div className="h-7 w-7 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      UI
                    </div>
                    {!sidebarCollapsed && (
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold truncate text-foreground">Workspace Studio</div>
                        <div className="text-[10px] font-mono text-muted-foreground">Pro Tier</div>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 overflow-y-auto p-2 space-y-3">
                    {!sidebarCollapsed && (
                      <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Platform
                      </div>
                    )}
                    <div className="space-y-1">
                      {[
                        { id: "overview", label: "Overview", icon: <LayoutGrid className="h-4 w-4" /> },
                        { id: "components", label: "Components", icon: <Layers className="h-4 w-4" />, badge: "45" },
                        { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSidebarActive(item.id)}
                          title={sidebarCollapsed ? item.label : undefined}
                          className={cn(
                            "w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors text-left",
                            sidebarActive === item.id
                              ? "bg-teal-600 text-white font-semibold shadow-xs"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground",
                            sidebarCollapsed && "justify-center px-0"
                          )}
                        >
                          <span className="shrink-0">{item.icon}</span>
                          {!sidebarCollapsed && <span className="flex-1 truncate">{item.label}</span>}
                          {!sidebarCollapsed && item.badge && (
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-white/20">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={cn("border-t border-border p-2.5 flex items-center gap-2.5 shrink-0", sidebarCollapsed && "justify-center")}>
                    <div className="h-7 w-7 rounded-full bg-teal-500/10 text-teal-600 flex items-center justify-center font-bold text-xs shrink-0">
                      JD
                    </div>
                    {!sidebarCollapsed && (
                      <div className="flex-1 min-w-0 text-left">
                        <div className="text-xs font-semibold text-foreground truncate">Jane Doe</div>
                        <div className="text-[10px] text-muted-foreground truncate">admin@uihub.dev</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 23 · NAVIGATION MENU */}
        {activeTab === "navigation-menu" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Navigation Menu</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Accessible site navigation with dropdown content panels, active state indicators, and keyboard arrows.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<NavigationMenu>\n  <NavigationMenuList>\n    <NavigationMenuItem>\n      <NavigationMenuTrigger value="products">Products</NavigationMenuTrigger>\n      <NavigationMenuContent value="products">\n        <NavigationMenuLink href="/ui">UI Hub</NavigationMenuLink>\n      </NavigationMenuContent>\n    </NavigationMenuItem>\n  </NavigationMenuList>\n</NavigationMenu>`,
                    "NavigationMenu"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-6">
              <div className="p-3 rounded-xl border border-border bg-card">
                <NavigationMenu value={navMenuVal} onValueChange={setNavMenuVal}>
                  <NavigationMenuList>
                    <NavMenuItem>
                      <NavigationMenuTrigger value="solutions">Solutions</NavigationMenuTrigger>
                      <NavigationMenuContent value="solutions">
                        <div className="grid gap-2 w-64 p-1">
                          <NavigationMenuLink href="#design-systems" isActive>
                            <div className="text-xs font-bold">25 Design Systems</div>
                            <div className="text-[11px] text-muted-foreground">Authentic design styles rendered live</div>
                          </NavigationMenuLink>
                          <NavigationMenuLink href="#cli">
                            <div className="text-xs font-bold">CLI Code Generator</div>
                            <div className="text-[11px] text-muted-foreground">Zero-dependency component export</div>
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavMenuItem>

                    <NavMenuItem>
                      <NavigationMenuTrigger value="developers">Developers</NavigationMenuTrigger>
                      <NavigationMenuContent value="developers">
                        <div className="grid gap-2 w-64 p-1">
                          <NavigationMenuLink href="#api-reference">
                            <div className="text-xs font-bold">API Reference</div>
                            <div className="text-[11px] text-muted-foreground">Radix UI and Tailwind CSS bindings</div>
                          </NavigationMenuLink>
                          <NavigationMenuLink href="#github">
                            <div className="text-xs font-bold">Open Source Core</div>
                            <div className="text-[11px] text-muted-foreground">MIT Licensed components suite</div>
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavMenuItem>

                    <NavMenuItem>
                      <NavigationMenuLink href="/components" isActive>
                        Components
                      </NavigationMenuLink>
                    </NavMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              <div className="rounded-lg border border-border bg-muted/20 p-4 text-xs space-y-2">
                <div className="font-semibold text-foreground">Interaction &amp; Accessibility Highlights:</div>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Never depends solely on hover: operable via click, Space, or Enter key.</li>
                  <li>Pressing <code className="font-mono text-[11px]">Escape</code> closes active submenus and restores focus to the trigger.</li>
                  <li>Exposes <code className="font-mono text-[11px]">aria-expanded</code> and <code className="font-mono text-[11px]">aria-haspopup=&quot;true&quot;</code> states to screen readers.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 24 · MENU BAR */}
        {activeTab === "menu-bar" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Menu Bar</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Application-grade horizontal menu bar with nested cascading submenus, shortcuts, and ARIA menubar semantics.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<MenuBar>\n  <MenuBarMenu id="file" label="File">\n    <MenuBarItem shortcut="⌘N">New Project</MenuBarItem>\n    <MenuBarSeparator />\n    <MenuBarItem shortcut="⌘S">Save</MenuBarItem>\n  </MenuBarMenu>\n</MenuBar>`,
                    "MenuBar"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-3">
                <span>Application Menu</span>
                <span>Last Action: <strong className="text-foreground">{menuBarAction || "None"}</strong></span>
              </div>

              <div className="p-3 rounded-xl border border-border bg-card">
                <MenuBar>
                  <MenuBarMenu id="file" label="File">
                    <MenuBarItem shortcut="⌘N" onClick={() => setMenuBarAction("New File")}>New File</MenuBarItem>
                    <MenuBarItem shortcut="⌘O" onClick={() => setMenuBarAction("Open File")}>Open...</MenuBarItem>
                    <MenuBarSeparator />
                    <MenuBarItem shortcut="⌘S" onClick={() => setMenuBarAction("Save File")}>Save</MenuBarItem>
                    <MenuBarItem disabled>Export as PDF</MenuBarItem>
                  </MenuBarMenu>

                  <MenuBarMenu id="edit" label="Edit">
                    <MenuBarItem shortcut="⌘Z" onClick={() => setMenuBarAction("Undo")}>Undo</MenuBarItem>
                    <MenuBarItem shortcut="⇧⌘Z" onClick={() => setMenuBarAction("Redo")}>Redo</MenuBarItem>
                    <MenuBarSeparator />
                    <MenuBarItem shortcut="⌘X" onClick={() => setMenuBarAction("Cut")}>Cut</MenuBarItem>
                    <MenuBarItem shortcut="⌘C" onClick={() => setMenuBarAction("Copy")}>Copy</MenuBarItem>
                    <MenuBarItem shortcut="⌘V" onClick={() => setMenuBarAction("Paste")}>Paste</MenuBarItem>
                  </MenuBarMenu>

                  <MenuBarMenu id="view" label="View">
                    <MenuBarItem shortcut="⌘+" onClick={() => setMenuBarAction("Zoom In")}>Zoom In</MenuBarItem>
                    <MenuBarItem shortcut="⌘-" onClick={() => setMenuBarAction("Zoom Out")}>Zoom Out</MenuBarItem>
                    <MenuBarSeparator />
                    <MenuBarItem shortcut="⌘0" onClick={() => setMenuBarAction("Reset Zoom")}>Actual Size</MenuBarItem>
                  </MenuBarMenu>

                  <MenuBarMenu id="help" label="Help">
                    <MenuBarItem shortcut="F1" onClick={() => setMenuBarAction("Open Docs")}>Documentation</MenuBarItem>
                    <MenuBarItem onClick={() => setMenuBarAction("Release Notes")}>Release Notes</MenuBarItem>
                  </MenuBarMenu>
                </MenuBar>
              </div>

              <div className="rounded-lg border border-border bg-muted/20 p-4 text-xs space-y-2">
                <div className="font-semibold text-foreground">W3C Menubar Pattern Compliance:</div>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Uses <code className="font-mono text-[11px]">role=&quot;menubar&quot;</code> and <code className="font-mono text-[11px]">role=&quot;menuitem&quot;</code> attributes.</li>
                  <li>Roving mouse enter opens adjacent menus when a menu is already active.</li>
                  <li>Keyboard shortcut indicators are visually aligned with monospace typography.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 25 · STEPPER */}
        {activeTab === "stepper" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Stepper</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Process wizard with completed checkmarks, current highlights, error states, and responsive orientation modes.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Stepper\n  steps={[\n    { id: 1, title: "Account", description: "Email & security" },\n    { id: 2, title: "Billing", description: "Credit card info" },\n    { id: 3, title: "Confirm", description: "Review and launch" },\n  ]}\n  currentStep={currentStep}\n  onStepClick={setCurrentStep}\n/>`,
                    "Stepper"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-3 text-xs">
                <span className="text-muted-foreground">Orientation:</span>
                <div className="flex items-center gap-1.5">
                  <Button
                    size="sm"
                    variant={stepperOrientation === "horizontal" ? "default" : "outline"}
                    onClick={() => setStepperOrientation("horizontal")}
                    className="h-7 text-xs"
                  >
                    Horizontal
                  </Button>
                  <Button
                    size="sm"
                    variant={stepperOrientation === "vertical" ? "default" : "outline"}
                    onClick={() => setStepperOrientation("vertical")}
                    className="h-7 text-xs"
                  >
                    Vertical
                  </Button>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-border bg-card">
                <Stepper
                  steps={[
                    { id: 1, title: "Account", description: "Identity verification" },
                    { id: 2, title: "Billing Details", description: "Invoice address" },
                    { id: 3, title: "Preferences", description: "Custom configurations", optional: true },
                    { id: 4, title: "Review", description: "Final confirmation" },
                  ]}
                  currentStep={stepperStep}
                  onStepClick={setStepperStep}
                  orientation={stepperOrientation}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={stepperStep === 0}
                  onClick={() => setStepperStep((p) => Math.max(0, p - 1))}
                  className="flex items-center gap-1.5"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Previous</span>
                </Button>
                <span className="text-xs font-mono text-muted-foreground">
                  Step {stepperStep + 1} of 4
                </span>
                <Button
                  size="sm"
                  disabled={stepperStep >= 3}
                  onClick={() => setStepperStep((p) => Math.min(3, p + 1))}
                  className="flex items-center gap-1.5"
                >
                  <span>Next Step</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* 26 · BOTTOM NAVIGATION */}
        {activeTab === "bottom-navigation" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Bottom Navigation</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Mobile app bottom dock with badge indicators, safe-area padding, and accessible aria-current destination markers.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<BottomNavigation\n  items={[\n    { id: "home", label: "Home", icon: <Home /> },\n    { id: "search", label: "Search", icon: <Search /> },\n    { id: "activity", label: "Activity", icon: <Bell />, badge: "3" },\n    { id: "profile", label: "Profile", icon: <User /> },\n  ]}\n  value={activeTab}\n  onValueChange={setActiveTab}\n/>`,
                    "BottomNavigation"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-sm mx-auto space-y-4">
              <div className="border border-border overflow-hidden rounded-2xl shadow-lg flex flex-col h-[240px] bg-card">
                <div className="flex-1 p-4 flex flex-col items-center justify-center text-center">
                  <div className="h-10 w-10 rounded-full bg-teal-500/10 text-teal-600 flex items-center justify-center mb-2">
                    {bottomNavVal === "home" && <Home className="h-5 w-5" />}
                    {bottomNavVal === "search" && <Search className="h-5 w-5" />}
                    {bottomNavVal === "activity" && <Bell className="h-5 w-5" />}
                    {bottomNavVal === "profile" && <User className="h-5 w-5" />}
                  </div>
                  <div className="text-sm font-bold capitalize text-foreground">
                    {bottomNavVal} Destination
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Touch-friendly targets with active indicator pill.
                  </p>
                </div>

                <BottomNavigation
                  items={[
                    { id: "home", label: "Home", icon: <Home className="h-4 w-4" /> },
                    { id: "search", label: "Search", icon: <Search className="h-4 w-4" /> },
                    { id: "activity", label: "Activity", icon: <Bell className="h-4 w-4" />, badge: "3" },
                    { id: "profile", label: "Profile", icon: <User className="h-4 w-4" /> },
                  ]}
                  value={bottomNavVal}
                  onValueChange={setBottomNavVal}
                />
              </div>
            </div>
          </div>
        )}

        {/* 27 · COMMAND MENU */}
        {activeTab === "command-menu" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Command Menu</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Command palette modal with instant search filtering, keyboard roving focus, categories, and shortcut triggers.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<CommandMenu\n  open={isOpen}\n  onOpenChange={setIsOpen}\n  groups={[\n    {\n      heading: "Navigation",\n      items: [\n        { id: "home", label: "Go to Home", shortcut: "G H" },\n      ],\n    },\n  ]}\n/>`,
                    "CommandMenu"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-6 text-center">
              <p className="text-xs text-muted-foreground">
                Click below to launch the modal command palette or test keyboard shortcuts.
              </p>

              <Button
                onClick={() => setCmdOpen(true)}
                className="mx-auto flex items-center gap-2 h-10 px-6"
              >
                <Search className="h-4 w-4" />
                <span>Open Command Palette</span>
                <kbd className="ml-2 rounded border border-white/20 bg-white/10 px-1.5 py-0.5 font-mono text-[10px]">
                  ⌘K
                </kbd>
              </Button>

              {cmdResult && (
                <div className="text-xs text-teal-600 dark:text-teal-400 font-semibold flex items-center justify-center gap-1.5 animate-in fade-in-0">
                  <Check className="h-4 w-4" />
                  <span>Executed: {cmdResult}</span>
                </div>
              )}

              <CommandMenu
                open={cmdOpen}
                onOpenChange={setCmdOpen}
                groups={[
                  {
                    heading: "Navigation",
                    items: [
                      {
                        id: "components",
                        label: "Go to Component Catalog",
                        shortcut: "G C",
                        icon: <Layers className="h-4 w-4" />,
                        onSelect: () => setCmdResult("Navigated to Components"),
                      },
                      {
                        id: "docs",
                        label: "View Style Guides",
                        shortcut: "G S",
                        icon: <Milestone className="h-4 w-4" />,
                        onSelect: () => setCmdResult("Opened Style Guides"),
                      },
                    ],
                  },
                  {
                    heading: "Quick Actions",
                    items: [
                      {
                        id: "copy-all",
                        label: "Copy React Import Syntax",
                        shortcut: "⌘I",
                        icon: <Copy className="h-4 w-4" />,
                        onSelect: () => setCmdResult("Copied React Import Syntax"),
                      },
                      {
                        id: "report",
                        label: "Send User Feedback",
                        shortcut: "⌘F",
                        icon: <Sparkles className="h-4 w-4" />,
                        onSelect: () => setCmdResult("Opened Feedback Modal"),
                      },
                    ],
                  },
                ]}
              />
            </div>
          </div>
        )}

        {/* 28 · LINK */}
        {activeTab === "link" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Link</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Polymorphic anchor with automatic external target/rel detection, visual underline styles, and accessible focus rings.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<CustomLink href="/components" variant="default">Documentation</CustomLink>\n<CustomLink href="https://github.com" isExternal showExternalIcon>GitHub</CustomLink>`,
                    "Link"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-card">
                <span className="text-muted-foreground">Default Link:</span>
                <CustomLink href="#">
                  Explore Design Tokens
                </CustomLink>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-card">
                <span className="text-muted-foreground">Subtle Muted Link:</span>
                <CustomLink href="#" variant="subtle">
                  View Project Changelog
                </CustomLink>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-card">
                <span className="text-muted-foreground">External Target (_blank):</span>
                <CustomLink href="https://github.com" isExternal showExternalIcon>
                  GitHub Repository
                </CustomLink>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-card">
                <span className="text-muted-foreground">Always Underlined:</span>
                <CustomLink href="#" variant="underline" underline="always">
                  Terms of Service &amp; Licensing
                </CustomLink>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-card">
                <span className="text-muted-foreground">Disabled Anchor:</span>
                <CustomLink href="#" disabled>
                  Premium Features (Restricted)
                </CustomLink>
              </div>
            </div>
          </div>
        )}

        {/* 29 · BACK TO TOP */}
        {activeTab === "back-to-top" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Back to Top</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Floating action button with scroll threshold visibility, smooth scrolling animation, and accessible label.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<BackToTop threshold={300} smooth position="bottom-right" />`,
                    "BackToTop"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-4">
              <p className="text-xs text-muted-foreground">
                The global <code className="font-mono text-[11px]">&lt;BackToTop /&gt;</code> component monitors window scroll position. Below is an interactive demonstration embedded in a scrollable frame:
              </p>

              <div className="relative border border-border rounded-xl overflow-hidden shadow-inner bg-card h-48">
                <div
                  id="demo-scroll-box"
                  className="h-full overflow-y-auto p-4 space-y-3 text-xs"
                >
                  <div className="p-3 rounded-lg bg-muted/40 border border-border">
                    <h5 className="font-bold text-foreground">Top of Document</h5>
                    <p className="text-[11px] text-muted-foreground mt-1">
                      Scroll down inside this box to trigger the return-to-top button.
                    </p>
                  </div>

                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="p-3 rounded-lg bg-muted/20 border border-border">
                      <div className="font-semibold text-foreground">Paragraph Block #{i + 1}</div>
                      <p className="text-muted-foreground text-[11px]">
                        Continuous content section testing passive scroll handlers.
                      </p>
                    </div>
                  ))}

                  <div className="p-3 rounded-lg bg-muted/40 border border-border text-center">
                    <span className="font-semibold text-foreground">End of content</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("demo-scroll-box")
                    el?.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                  className="absolute bottom-3 right-3 p-2.5 rounded-full bg-teal-600 text-white shadow-lg hover:bg-teal-700 transition-all flex items-center gap-1.5 text-xs font-bold"
                  aria-label="Back to top of section"
                >
                  <ArrowUp className="h-4 w-4" />
                  <span>Top</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 30 · PLAYGROUND */}
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
