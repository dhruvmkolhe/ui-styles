import type { ComponentDef, StyleBundle } from "@/lib/styles/types";
import { luxuryMinimal } from "./kit";
import { luxuryMinimalCode } from "./code";
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

export const LUXURY_MINIMAL_DEFS: ComponentDef[] = [
  {
    id: "button",
    name: "Button",
    description: "High fashion monochrome button with extreme tracking and champagne gold secondary.",
    Preview: ButtonPreview,
    code: luxuryMinimalCode.button,
  },
  {
    id: "card",
    name: "Card",
    description: "Atelier editorial card with thin borders and champagne gold pricing badge.",
    Preview: CardPreview,
    code: luxuryMinimalCode.card,
  },
  {
    id: "navbar",
    name: "Navbar",
    description: "Maison V couture masthead with high-tracking navigation links.",
    Preview: NavbarPreview,
    code: luxuryMinimalCode.navbar,
  },
  {
    id: "input",
    name: "Input field",
    description: "Underlined input with champagne gold label and haute couture subtext.",
    Preview: InputPreview,
    code: luxuryMinimalCode.input,
  },
  {
    id: "badge",
    name: "Badge / Tag",
    description: "Champagne gold and refined haute couture status tags.",
    Preview: BadgePreview,
    code: luxuryMinimalCode.badge,
  },
  {
    id: "modal",
    name: "Modal",
    description: "Confidential private viewing reservation dialog.",
    Preview: ModalPreview,
    code: luxuryMinimalCode.modal,
  },
  {
    id: "accordion",
    name: "Accordion",
    description: "Refined FAQ container with thin divider lines and italic headers.",
    Preview: AccordionPreview,
    code: luxuryMinimalCode.accordion,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: "Single-line Place Vendôme spec badge with thin outline.",
    Preview: TooltipPreview,
    code: luxuryMinimalCode.tooltip,
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "High-tracking couture tab switcher with champagne active border.",
    Preview: TabsPreview,
    code: luxuryMinimalCode.tabs,
  },
  {
    id: "dropdown",
    name: "Dropdown menu",
    description: "Floating collection season selector menu.",
    Preview: DropdownPreview,
    code: luxuryMinimalCode.dropdown,
  },
  {
    id: "switch",
    name: "Toggle / Switch",
    description: "Thin-bordered square slider switch with champagne gold thumb.",
    Preview: SwitchPreview,
    code: luxuryMinimalCode.switch,
  },
  {
    id: "skeleton",
    name: "Skeleton loader",
    description: "Whisper-thin grey line placeholders.",
    Preview: SkeletonPreview,
    code: luxuryMinimalCode.skeleton,
  },
  {
    id: "toast",
    name: "Toast / Notification",
    description: "Left champagne gold border concierge appointment notification.",
    Preview: ToastPreview,
    code: luxuryMinimalCode.toast,
  },
  {
    id: "progress",
    name: "Progress bar",
    description: "Ultra-thin 0.5px line with solid champagne gold progress fill.",
    Preview: ProgressPreview,
    code: luxuryMinimalCode.progress,
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "Gold outlined monogram initial badge with Paris atelier label.",
    Preview: AvatarPreview,
    code: luxuryMinimalCode.avatar,
  },
];

export const LUXURY_MINIMAL_BUNDLE: StyleBundle = {
  stage: (m) => luxuryMinimal(m).stage,
  text: (m) => luxuryMinimal(m).text,
  defs: LUXURY_MINIMAL_DEFS,
};
