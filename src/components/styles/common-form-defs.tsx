import React from "react";
import type { ComponentDef, Mode, StyleSlug } from "@/lib/styles/types";
import {
  CheckboxPreview,
  RadioGroupPreview,
  SelectPreview,
  TextareaPreview,
  FormPreview,
  LabelPreview,
  FormFieldPreview,
  DateInputPreview,
  NumberInputPreview,
  ShowcasePreview,
} from "./common-form-previews";
import { getFormCodeForStyle } from "./common-form-code";

export function getCommonFormDefs(slug: StyleSlug): ComponentDef[] {
  return [
    {
      id: "checkbox",
      name: "Checkbox",
      description:
        "Accessible toggle box with checked, indeterminate, disabled, and error states. Supports keyboard Space toggling and custom accent fills.",
      Preview: ({ mode }: { mode: Mode }) => <CheckboxPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getFormCodeForStyle(slug, "checkbox", mode),
    },
    {
      id: "radio-group",
      name: "Radio Group",
      description:
        "Single-choice selection group with arrow key navigation, roving tabindex, card variants, and disabled states.",
      Preview: ({ mode }: { mode: Mode }) => <RadioGroupPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getFormCodeForStyle(slug, "radio-group", mode),
    },
    {
      id: "select",
      name: "Select",
      description:
        "Accessible dropdown selector with placeholder, search filtering, animated chevron, and disabled options.",
      Preview: ({ mode }: { mode: Mode }) => <SelectPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getFormCodeForStyle(slug, "select", mode),
    },
    {
      id: "textarea",
      name: "Textarea",
      description:
        "Multi-line text input with character limit counter, auto-resize handling, and error boundary states.",
      Preview: ({ mode }: { mode: Mode }) => <TextareaPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getFormCodeForStyle(slug, "textarea", mode),
    },
    {
      id: "form",
      name: "Form",
      description:
        "Complete validated form layout with submission handling, validation context, inline feedback, and error summaries.",
      Preview: ({ mode }: { mode: Mode }) => <FormPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getFormCodeForStyle(slug, "form", mode),
    },
    {
      id: "label",
      name: "Label",
      description:
        "Typography-aligned form labels with required indicator (*), optional badge, and helper description hints.",
      Preview: ({ mode }: { mode: Mode }) => <LabelPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getFormCodeForStyle(slug, "label", mode),
    },
    {
      id: "form-field",
      name: "Form Field",
      description:
        "Unified wrapper connecting label, control, helper text, and validation alerts with automatic ARIA descriptions.",
      Preview: ({ mode }: { mode: Mode }) => <FormFieldPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getFormCodeForStyle(slug, "form-field", mode),
    },
    {
      id: "date-input",
      name: "Date Input",
      description:
        "Semantic date input with calendar trigger icon, clear action, and min/max constraints.",
      Preview: ({ mode }: { mode: Mode }) => <DateInputPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getFormCodeForStyle(slug, "date-input", mode),
    },
    {
      id: "number-input",
      name: "Number Input",
      description:
        "Stepper-controlled numeric field with increment (+), decrement (-), and keyboard arrow navigation.",
      Preview: ({ mode }: { mode: Mode }) => <NumberInputPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getFormCodeForStyle(slug, "number-input", mode),
    },
    {
      id: "showcase",
      name: "Form Showcase & Playground",
      description:
        "Interactive testing suite allowing live switching between normal, error, disabled, and required states across all controls.",
      Preview: ({ mode }: { mode: Mode }) => <ShowcasePreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getFormCodeForStyle(slug, "showcase", mode),
    },
  ];
}
