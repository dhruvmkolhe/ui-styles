import type { ComponentDef, StyleBundle } from "@/lib/styles/types";
import { japandi } from "./kit";
import { japandiCode } from "./code";
import {
  AccordionPreview,
  AvatarPreview,
  BadgePreview,
  ButtonPreview,
  CardPreview,
  DropdownPreview,
  InputPreview,
  ModalPreview,
  NavbarPreview,
  ProgressPreview,
  SkeletonPreview,
  SwitchPreview,
  TabsPreview,
  ToastPreview,
  TooltipPreview,
} from "./previews";

export const JAPANDI_DEFS: ComponentDef[] = [
  {
    id: "button",
    name: "Button",
    description: "Solid clay-toned primary and a hairline-outlined secondary — soft rounding, generous letter spacing, no shadows.",
    Preview: ButtonPreview,
    code: japandiCode.button,
  },
  {
    id: "card",
    name: "Card",
    description: "A quiet panel with serif title, warm image placeholder and thin 1px border — whitespace does the talking.",
    Preview: CardPreview,
    code: japandiCode.card,
  },
  {
    id: "navbar",
    name: "Navbar",
    description: "Letter-spaced serif wordmark, muted links and a small solid cart button.",
    Preview: NavbarPreview,
    code: japandiCode.navbar,
  },
  {
    id: "input",
    name: "Input field",
    description: "Hairline field with a wide-tracked uppercase micro-label and gentle focus darken.",
    Preview: InputPreview,
    code: japandiCode.input,
  },
  {
    id: "badge",
    name: "Badge / Tag",
    description: "Uppercase tracked pills — status dot, solid clay and outline material tags.",
    Preview: BadgePreview,
    code: japandiCode.badge,
  },
  {
    id: "modal",
    name: "Modal",
    description: "A calm dialog on a soft warm scrim. Click the trigger to open, backdrop or ✕ to close.",
    Preview: ModalPreview,
    code: japandiCode.modal,
  },
  {
    id: "accordion",
    name: "Accordion",
    description: "Three hairline-divided rows with slow, smooth grid-rows expansion.",
    Preview: AccordionPreview,
    code: japandiCode.accordion,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: "Hover the button — a small dark note drifts up with an arrow, pure CSS group-hover.",
    Preview: TooltipPreview,
    code: japandiCode.tooltip,
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "Underline tabs on a hairline rail — no pills, no fills, just a 2px accent.",
    Preview: TabsPreview,
    code: japandiCode.tabs,
  },
  {
    id: "dropdown",
    name: "Dropdown menu",
    description: "A paper-like floating menu with icon rows and a muted terracotta destructive action.",
    Preview: DropdownPreview,
    code: japandiCode.dropdown,
  },
  {
    id: "switch",
    name: "Toggle / Switch",
    description: "On state fills with clay brown; off state stays a quiet linen track.",
    Preview: SwitchPreview,
    code: japandiCode.switch,
  },
  {
    id: "skeleton",
    name: "Skeleton loader",
    description: "Card-shaped skeleton with soft clay-tinted pulsing blocks.",
    Preview: SkeletonPreview,
    code: japandiCode.skeleton,
  },
  {
    id: "toast",
    name: "Toast / Notification",
    description: "Success (matcha) and error (terracotta) notes with hairline countdown lines.",
    Preview: ToastPreview,
    code: japandiCode.toast,
  },
  {
    id: "progress",
    name: "Progress bar",
    description: "A 4px hairline track filling slowly to 64% with a mono counter.",
    Preview: ProgressPreview,
    code: japandiCode.progress,
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "Photo and serif-initials avatars with a thin ring and muted status dots.",
    Preview: AvatarPreview,
    code: japandiCode.avatar,
  },
];

export const JAPANDI_BUNDLE: StyleBundle = {
  stage: (m) => japandi(m).stage,
  text: (m) => japandi(m).text,
  defs: JAPANDI_DEFS,
};
