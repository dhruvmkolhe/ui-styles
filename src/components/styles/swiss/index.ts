import type { ComponentDef, StyleBundle } from "@/lib/styles/types";
import { swiss } from "./kit";
import { swissCode } from "./code";
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

export const SWISS_DEFS: ComponentDef[] = [
  {
    id: "button",
    name: "Button",
    description: "Swiss Red accent button with strict rectangular layout and bold typography.",
    Preview: ButtonPreview,
    code: swissCode.button,
  },
  {
    id: "card",
    name: "Card",
    description: "Grid-aligned informational card with high contrast border and metadata header.",
    Preview: CardPreview,
    code: swissCode.card,
  },
  {
    id: "navbar",
    name: "Navbar",
    description: "Clean top header with red accent square, sans-serif wordmark, and grid nav.",
    Preview: NavbarPreview,
    code: swissCode.navbar,
  },
  {
    id: "input",
    name: "Input field",
    description: "Sharp rectangular form input with monospace text and red accent focus border.",
    Preview: InputPreview,
    code: swissCode.input,
  },
  {
    id: "badge",
    name: "Badge / Tag",
    description: "Swiss Red and outlined rectangular status tags with bold typography.",
    Preview: BadgePreview,
    code: swissCode.badge,
  },
  {
    id: "modal",
    name: "Modal",
    description: "High-contrast alert modal with clear visual hierarchy and red system indicator.",
    Preview: ModalPreview,
    code: swissCode.modal,
  },
  {
    id: "accordion",
    name: "Accordion",
    description: "Minimalist FAQ accordion with clean border grid lines and monospace titles.",
    Preview: AccordionPreview,
    code: swissCode.accordion,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: "Rectangular solid red tooltip for quick technical spec badges.",
    Preview: TooltipPreview,
    code: swissCode.tooltip,
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "Blocky tab control with solid Swiss Red active tab state.",
    Preview: TabsPreview,
    code: swissCode.tabs,
  },
  {
    id: "dropdown",
    name: "Dropdown menu",
    description: "Swiss Red header menu with clean black options and hover states.",
    Preview: DropdownPreview,
    code: swissCode.dropdown,
  },
  {
    id: "switch",
    name: "Toggle / Switch",
    description: "Rectangular toggle box with Swiss Red slider position indicator.",
    Preview: SwitchPreview,
    code: swissCode.switch,
  },
  {
    id: "skeleton",
    name: "Skeleton loader",
    description: "Swiss Red pulsing headline block with neutral body text placeholders.",
    Preview: SkeletonPreview,
    code: swissCode.skeleton,
  },
  {
    id: "toast",
    name: "Toast / Notification",
    description: "Thick left red border toast alert with clear objective message text.",
    Preview: ToastPreview,
    code: swissCode.toast,
  },
  {
    id: "progress",
    name: "Progress bar",
    description: "Swiss Red progress fill track with uppercase monospace percentage indicator.",
    Preview: ProgressPreview,
    code: swissCode.progress,
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "Sharp square initials avatar in Swiss Red with metadata label.",
    Preview: AvatarPreview,
    code: swissCode.avatar,
  },
];

export const SWISS_BUNDLE: StyleBundle = {
  stage: (m) => swiss(m).stage,
  text: (m) => swiss(m).text,
  defs: SWISS_DEFS,
};
