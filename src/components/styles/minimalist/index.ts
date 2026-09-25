import type { ComponentDef, StyleBundle } from "@/lib/styles/types";
import { minimalist } from "./kit";
import { minimalistCode } from "./code";
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

export const MINIMALIST_DEFS: ComponentDef[] = [
  {
    id: "button",
    name: "Button",
    description: "Whisper-thin rounded pills with monochrome palette and serene interaction.",
    Preview: ButtonPreview,
    code: minimalistCode.button,
  },
  {
    id: "card",
    name: "Card",
    description: "Pure white surface with quiet micro-labels and hairline border.",
    Preview: CardPreview,
    code: minimalistCode.card,
  },
  {
    id: "navbar",
    name: "Navbar",
    description: "Letter-spaced studio mark with unadorned navigation links.",
    Preview: NavbarPreview,
    code: minimalistCode.navbar,
  },
  {
    id: "input",
    name: "Input field",
    description: "Hairline field with wide tracking uppercase micro-label.",
    Preview: InputPreview,
    code: minimalistCode.input,
  },
  {
    id: "badge",
    name: "Badge / Tag",
    description: "Unadorned neutral pills for clean content categorization.",
    Preview: BadgePreview,
    code: minimalistCode.badge,
  },
  {
    id: "modal",
    name: "Modal",
    description: "Serene dialog card on a soft blurred backdrop.",
    Preview: ModalPreview,
    code: minimalistCode.modal,
  },
  {
    id: "accordion",
    name: "Accordion",
    description: "Subtle collapsible row with light typography and delicate chevron.",
    Preview: AccordionPreview,
    code: minimalistCode.accordion,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: "Compact floating tip with zero ornament.",
    Preview: TooltipPreview,
    code: minimalistCode.tooltip,
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "Quiet text tabs on an ultra-thin baseline.",
    Preview: TabsPreview,
    code: minimalistCode.tabs,
  },
  {
    id: "dropdown",
    name: "Dropdown menu",
    description: "Clean floating menu with hairline rows.",
    Preview: DropdownPreview,
    code: minimalistCode.dropdown,
  },
  {
    id: "switch",
    name: "Toggle / Switch",
    description: "Smooth pill toggle with subtle indicator thumb.",
    Preview: SwitchPreview,
    code: minimalistCode.switch,
  },
  {
    id: "skeleton",
    name: "Skeleton loader",
    description: "Quiet pulsing placeholder blocks.",
    Preview: SkeletonPreview,
    code: minimalistCode.skeleton,
  },
  {
    id: "toast",
    name: "Toast / Notification",
    description: "Slim notification pill with subtle status icon.",
    Preview: ToastPreview,
    code: minimalistCode.toast,
  },
  {
    id: "progress",
    name: "Progress bar",
    description: "1px razor progress line.",
    Preview: ProgressPreview,
    code: minimalistCode.progress,
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "Clean circular initials badge.",
    Preview: AvatarPreview,
    code: minimalistCode.avatar,
  },
];

export const MINIMALIST_BUNDLE: StyleBundle = {
  stage: (m) => minimalist(m).stage,
  text: (m) => minimalist(m).text,
  defs: MINIMALIST_DEFS,
};
