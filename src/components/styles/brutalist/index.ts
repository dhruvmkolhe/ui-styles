import type { ComponentDef, StyleBundle } from "@/lib/styles/types";
import { brutalist } from "./kit";
import { brutalistCode } from "./code";
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

export const BRUTALIST_DEFS: ComponentDef[] = [
  {
    id: "button",
    name: "Button",
    description: "Raw thick borders with hard 4px offset shadow and bold uppercase impact typography.",
    Preview: ButtonPreview,
    code: brutalistCode.button,
  },
  {
    id: "card",
    name: "Card",
    description: "High contrast panel with bright yellow highlights, sharp corners and offset drop shadow.",
    Preview: CardPreview,
    code: brutalistCode.card,
  },
  {
    id: "navbar",
    name: "Navbar",
    description: "Thick outlined header with monospace logo, raw links and smash CTA button.",
    Preview: NavbarPreview,
    code: brutalistCode.navbar,
  },
  {
    id: "input",
    name: "Input field",
    description: "Monospace input with thick 4px border and bold uppercase label.",
    Preview: InputPreview,
    code: brutalistCode.input,
  },
  {
    id: "badge",
    name: "Badge / Tag",
    description: "Chunky high-contrast status tags with hard offset shadow.",
    Preview: BadgePreview,
    code: brutalistCode.badge,
  },
  {
    id: "modal",
    name: "Modal",
    description: "Raw confirmation dialog with thick top border and prominent action buttons.",
    Preview: ModalPreview,
    code: brutalistCode.modal,
  },
  {
    id: "accordion",
    name: "Accordion",
    description: "Monospace FAQ block with sharp toggle and bold headers.",
    Preview: AccordionPreview,
    code: brutalistCode.accordion,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: "Hard-edged yellow tooltip with bold uppercase text.",
    Preview: TooltipPreview,
    code: brutalistCode.tooltip,
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "Chunky tab switcher with thick black baseline and contrasting active state.",
    Preview: TabsPreview,
    code: brutalistCode.tabs,
  },
  {
    id: "dropdown",
    name: "Dropdown menu",
    description: "Yellow-backed floating menu with thick outline and sharp hover states.",
    Preview: DropdownPreview,
    code: brutalistCode.dropdown,
  },
  {
    id: "switch",
    name: "Toggle / Switch",
    description: "Blocky rectangular toggle switch with contrasting slider thumb.",
    Preview: SwitchPreview,
    code: brutalistCode.switch,
  },
  {
    id: "skeleton",
    name: "Skeleton loader",
    description: "Thick-bordered pulsing loading blocks.",
    Preview: SkeletonPreview,
    code: brutalistCode.skeleton,
  },
  {
    id: "toast",
    name: "Toast / Notification",
    description: "High-contrast alert toast with hard offset shadow and bold typography.",
    Preview: ToastPreview,
    code: brutalistCode.toast,
  },
  {
    id: "progress",
    name: "Progress bar",
    description: "Chunky progress track with solid block fill.",
    Preview: ProgressPreview,
    code: brutalistCode.progress,
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "Square initials avatars with thick outline and hard drop shadow.",
    Preview: AvatarPreview,
    code: brutalistCode.avatar,
  },
];

export const BRUTALIST_BUNDLE: StyleBundle = {
  stage: (m) => brutalist(m).stage,
  text: (m) => brutalist(m).text,
  defs: BRUTALIST_DEFS,
};
