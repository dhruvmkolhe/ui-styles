import type { Mode, StyleSlug } from "@/lib/styles/types";
import { getStyleFormKit } from "./common-form-kit";

export function getFormCodeForStyle(
  slug: StyleSlug,
  componentId: string,
  mode: Mode
): string {
  const k = getStyleFormKit(slug, mode);

  switch (componentId) {
    case "checkbox":
      return `<!-- ${k.styleName} · Checkbox -->
<!-- Accessible toggle box with checked, indeterminate, disabled, and error states -->

<!-- 1. Checked State -->
<label class="flex items-start gap-3 cursor-pointer">
  <button
    type="button"
    role="checkbox"
    aria-checked="true"
    class="${k.radius} ${k.checkboxAccent} ${k.focusRing} relative mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center border transition-all"
  >
    <svg class="h-3.5 w-3.5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
    </svg>
  </button>
  <div class="grid gap-0.5">
    <span class="text-xs font-semibold ${k.text}">Enable weekly design digest</span>
    <span class="text-[11px] ${k.muted}">Receive curated UI kits and micro-interactions every Tuesday.</span>
  </div>
</label>

<!-- 2. Unchecked State -->
<label class="flex items-start gap-3 cursor-pointer">
  <button
    type="button"
    role="checkbox"
    aria-checked="false"
    class="${k.radius} ${k.focusRing} ${k.checkboxUnchecked} relative mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center border transition-all"
  ></button>
  <div class="grid gap-0.5">
    <span class="text-xs font-semibold ${k.text}">SMS security verification</span>
    <span class="text-[11px] ${k.muted}">Send a 6-digit challenge code upon unfamiliar sign-in attempts.</span>
  </div>
</label>

<!-- 3. Error Validation State -->
<label class="flex items-start gap-3 cursor-pointer">
  <button
    type="button"
    role="checkbox"
    aria-checked="false"
    aria-invalid="true"
    class="${k.radius} relative mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center border border-rose-500 bg-rose-500/10 ring-2 ring-rose-500/30"
  ></button>
  <div class="grid gap-0.5">
    <span class="text-xs font-semibold ${k.text}">I accept the Open License Agreement *</span>
    <span class="text-[11px] font-medium text-rose-500">You must accept terms to proceed.</span>
  </div>
</label>`;

    case "radio-group":
      return `<!-- ${k.styleName} · Radio Group -->
<!-- Accessible single-selection group with keyboard navigation and card variants -->

<div role="radiogroup" aria-label="Select Plan" class="grid gap-2.5">
  <!-- Option 1: Selected -->
  <div
    role="radio"
    aria-checked="true"
    tabindex="0"
    class="${k.panel} ${k.radius} relative flex cursor-pointer items-start justify-between p-3.5 border ring-2 ring-current/40"
  >
    <div class="flex items-start gap-3">
      <span class="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-current">
        <span class="h-2 w-2 rounded-full bg-current"></span>
      </span>
      <div>
        <h4 class="text-xs font-bold leading-tight ${k.text}">Professional Plan</h4>
        <p class="mt-0.5 text-[11px] ${k.muted}">Unlimited workspaces, full token sync</p>
      </div>
    </div>
    <span class="text-xs font-mono font-bold ${k.strong}">$24/mo</span>
  </div>

  <!-- Option 2: Unselected -->
  <div
    role="radio"
    aria-checked="false"
    tabindex="-1"
    class="${k.panelSoft} ${k.radius} relative flex cursor-pointer items-start justify-between p-3.5 border opacity-80 hover:opacity-100"
  >
    <div class="flex items-start gap-3">
      <span class="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-current/40">
        <span class="h-2 w-2 rounded-full scale-0"></span>
      </span>
      <div>
        <h4 class="text-xs font-bold leading-tight ${k.text}">Hobbyist</h4>
        <p class="mt-0.5 text-[11px] ${k.muted}">Up to 3 projects, community support</p>
      </div>
    </div>
    <span class="text-xs font-mono font-bold ${k.strong}">$0/mo</span>
  </div>
</div>`;

    case "select":
      return `<!-- ${k.styleName} · Select -->
<!-- Custom dropdown selector with chevron, search filter, and placeholder -->

<div class="relative w-full max-w-sm">
  <label class="${k.label}" for="currency-select">Primary Billing Currency</label>

  <button
    id="currency-select"
    type="button"
    role="combobox"
    aria-expanded="false"
    class="${k.input} ${k.focusRing} flex w-full items-center justify-between px-3.5 py-2.5 text-xs text-left"
  >
    <span class="truncate font-medium">USD · United States Dollar ($)</span>
    <svg class="h-4 w-4 shrink-0 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  <!-- Dropdown Popover Listbox -->
  <ul
    role="listbox"
    class="${k.panel} ${k.radius} absolute z-30 mt-1 max-h-56 w-full overflow-auto p-1 shadow-xl border"
  >
    <li
      role="option"
      aria-selected="true"
      class="${k.radius} ${k.strong} flex items-center justify-between px-3 py-2 text-xs cursor-pointer bg-current/10 font-bold"
    >
      <span>USD · United States Dollar ($)</span>
      <svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
    </li>
    <li
      role="option"
      aria-selected="false"
      class="${k.radius} ${k.text} flex items-center justify-between px-3 py-2 text-xs cursor-pointer hover:bg-current/10"
    >
      <span>EUR · European Euro (€)</span>
    </li>
  </ul>
</div>`;

    case "textarea":
      return `<!-- ${k.styleName} · Textarea -->
<!-- Multi-line input field with character limit counter and auto-resize -->

<div class="w-full max-w-md space-y-1.5">
  <div class="flex items-center justify-between">
    <label class="${k.label}" for="bio-textarea">Project Manifesto</label>
    <span class="text-[11px] font-mono ${k.muted}">84 / 200</span>
  </div>

  <textarea
    id="bio-textarea"
    rows="4"
    maxlength="200"
    placeholder="Write a concise overview of your creative direction..."
    class="${k.input} ${k.focusRing} w-full resize-y text-xs transition-all"
  >Crafting clean, authentic interfaces inspired by historical design principles.</textarea>

  <p class="text-[11px] ${k.faint}">Markdown formatting supported</p>
</div>`;

    case "form":
      return `<!-- ${k.styleName} · Complete Form -->
<!-- Full validated form layout with actions and error alerts -->

<form class="${k.panel} ${k.radius} p-5 border space-y-4 max-w-md">
  <div class="border-b border-current/10 pb-3">
    <h3 class="text-sm font-bold tracking-tight ${k.strong}">Studio Collaboration Request</h3>
    <p class="mt-0.5 text-xs ${k.muted}">Complete the form fields below to initiate project scoping.</p>
  </div>

  <!-- Field 1: Name -->
  <div class="space-y-1">
    <label class="${k.label}" for="form-name">Full Name *</label>
    <input id="form-name" placeholder="Ada Lovelace" class="${k.input} w-full text-xs" required />
  </div>

  <!-- Field 2: Email -->
  <div class="space-y-1">
    <label class="${k.label}" for="form-email">Email Address *</label>
    <input id="form-email" type="email" placeholder="ada@domain.org" class="${k.input} w-full text-xs" required />
  </div>

  <!-- Field 3: Terms -->
  <label class="flex items-start gap-2.5 pt-1 cursor-pointer">
    <input type="checkbox" class="mt-0.5 h-4 w-4" required />
    <span class="text-xs leading-tight ${k.text}">I acknowledge studio privacy terms and NDAs. *</span>
  </label>

  <!-- Actions -->
  <div class="flex items-center gap-2.5 pt-2">
    <button type="submit" class="${k.btnPrimarySm}">Submit Inquiry</button>
    <button type="reset" class="${k.btnSecondary}">Reset</button>
  </div>
</form>`;

    case "label":
      return `<!-- ${k.styleName} · Label -->
<!-- Typography-aligned form labels with primary hierarchy, required indicators, and contextual badges -->

<!-- 1. Standard Field Label -->
<div class="space-y-1">
  <label class="${k.label}">Standard Field Label</label>
  <p class="text-[11px] ${k.muted}">Primary typographical visual weight with high contrast.</p>
</div>

<!-- 2. Required Field Label -->
<div class="space-y-1">
  <label class="${k.label} flex items-center gap-1.5">
    <span>Required Field Label</span>
    <span class="text-rose-500 font-bold" aria-hidden="true">*</span>
    <span class="sr-only">(required)</span>
  </label>
  <p class="text-[11px] ${k.muted}">Includes high-contrast semantic required marker.</p>
</div>

<!-- 3. Optional Field Label -->
<div class="space-y-1">
  <div class="flex items-center justify-between">
    <label class="${k.label}">Secondary Phone Number</label>
    <span class="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded border border-current/20 ${k.faint}">Optional</span>
  </div>
  <p class="text-[11px] ${k.muted}">Subtle metadata indicator clarifying non-mandatory nature.</p>
</div>

<!-- 4. Label with Tooltip & Action Link -->
<div class="space-y-1">
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-1.5">
      <label class="${k.label}">Tax Identification Number</label>
      <span title="VAT or EIN registered with revenue authority" class="cursor-help ${k.muted}">ⓘ</span>
    </div>
    <a href="#" class="text-[11px] font-medium underline ${k.strong}">Where to find?</a>
  </div>
  <p class="text-[11px] ${k.muted}">Integrated inline tooltip hint icon and contextual action link.</p>
</div>`;

    case "form-field":
      return `<!-- ${k.styleName} · Form Field Container -->
<!-- Integrated form group binding label, input control, helper message, and error alert -->

<!-- Normal Field with Description -->
<div class="space-y-1.5">
  <label class="${k.label}" for="workspace-id">Workspace Subdomain</label>
  <input id="workspace-id" value="acme-studio" class="${k.input} w-full text-xs font-mono" />
  <p class="text-[11px] ${k.faint}">Your team URL identifier. Lowercase alphanumeric only.</p>
</div>

<!-- Field with Validation Error -->
<div class="space-y-1.5">
  <label class="${k.label}" for="database-uri">
    Database Connection URI <span class="text-rose-500">*</span>
  </label>
  <input
    id="database-uri"
    value="postgres://localhost:5432"
    aria-invalid="true"
    class="${k.input} w-full text-xs font-mono border-rose-500 ring-2 ring-rose-500/20"
  />
  <div role="alert" class="flex items-center gap-1.5 text-xs font-medium text-rose-500">
    <svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    </svg>
    <span>Connection timed out: Missing authentication credentials.</span>
  </div>
</div>`;

    case "date-input":
      return `<!-- ${k.styleName} · Date Input -->
<!-- Reusable DateInput with displayFormat ('YYYY-MM-DD' | 'DD-MM-YYYY'), calendar trigger, clear action, and ISO-8601 state persistence -->

<div class="relative w-full max-w-sm space-y-2">
  <div class="flex items-center justify-between">
    <label class="${k.label}" for="date-input">Target Delivery Date</label>
    <div class="inline-flex items-center rounded border border-current/15 p-0.5 text-[10px]">
      <span class="px-1.5 py-0.5 font-mono font-semibold bg-foreground text-background rounded">YYYY-MM-DD</span>
      <span class="px-1.5 py-0.5 font-mono opacity-60">DD-MM-YYYY</span>
    </div>
  </div>

  <div class="relative flex items-center">
    <button
      type="button"
      aria-label="Open calendar picker"
      class="absolute left-3 z-10 flex items-center justify-center opacity-70 hover:opacity-100"
    >
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </button>

    <input
      id="date-input"
      type="text"
      inputmode="numeric"
      value="2026-10-15"
      placeholder="YYYY-MM-DD"
      class="${k.input} ${k.focusRing} w-full !pl-10 !pr-10 text-xs"
    />

    <button
      type="button"
      aria-label="Clear date"
      class="absolute right-3 z-10 flex h-4 w-4 items-center justify-center opacity-70 hover:opacity-100"
    >
      <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>

  <div class="flex items-center justify-between text-[11px]">
    <span class="${k.faint}">Format: ISO-8601 (YYYY-MM-DD)</span>
    <span class="font-mono font-medium ${k.muted}">Selected: 2026-10-15</span>
  </div>
</div>`;

    case "number-input":
      return `<!-- ${k.styleName} · Number Input -->
<!-- Stepper-controlled numeric input with increment (+), decrement (-), and min/max limits -->

<div class="w-full max-w-xs space-y-1.5">
  <label class="${k.label}" for="stepper-input">Border Radius Token (px)</label>

  <div class="${k.panelSoft} ${k.radius} inline-flex w-full items-center border">
    <button
      type="button"
      aria-label="Decrease"
      class="flex h-9 w-9 shrink-0 items-center justify-center border-r border-current/20 opacity-70 hover:opacity-100"
    >
      <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19.5 12h-15" />
      </svg>
    </button>

    <input
      id="stepper-input"
      type="number"
      value="16"
      min="0"
      max="64"
      class="h-9 w-full bg-transparent text-center font-mono text-xs font-bold outline-none [appearance:textfield]"
    />

    <button
      type="button"
      aria-label="Increase"
      class="flex h-9 w-9 shrink-0 items-center justify-center border-l border-current/20 opacity-70 hover:opacity-100"
    >
      <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </button>
  </div>

  <p class="text-[11px] ${k.faint}">Bounds: 0px – 64px</p>
</div>`;

    case "showcase":
    default:
      return `<!-- ${k.styleName} · Form Showcase Suite -->
<!-- Comprehensive integrated form controls and accessibility guarantees -->

<div class="${k.panel} ${k.radius} p-5 border space-y-4 max-w-xl">
  <h3 class="text-sm font-bold ${k.strong}">Component Showcase · ${k.styleName}</h3>
  <p class="text-xs ${k.muted}">
    Every form component in ${k.styleName} complies with WCAG AA/AAA guidelines,
    providing accessible keyboard navigation, explicit ARIA attributes, and aesthetic cohesion.
  </p>
</div>`;
  }
}
