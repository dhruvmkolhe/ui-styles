import type { ComponentDef, StyleBundle } from "@/lib/styles/types";
import { kinetic } from "./kit";
import { kineticCode } from "./code";
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

export const KINETIC_DEFS: ComponentDef[] = [
  {
    id: "button",
    name: "Button",
    description: "Slanted high-impact button with neon kinetic orange fill & electric cyan offset shadow.",
    Preview: ButtonPreview,
    code: kineticCode.button,
  },
  {
    id: "card",
    name: "Card",
    description: "High-speed angular motion container with velocity indicator lines.",
    Preview: CardPreview,
    code: kineticCode.card,
  },
  {
    id: "navbar",
    name: "Navbar",
    description: "Heavy kinetic header bar with angled brand mark & dynamic menu.",
    Preview: NavbarPreview,
    code: kineticCode.navbar,
  },
  {
    id: "input",
    name: "Input field",
    description: "Electric cyan bordered input field with slanted vector label.",
    Preview: InputPreview,
    code: kineticCode.input,
  },
  {
    id: "badge",
    name: "Badge / Tag",
    description: "Kinetic orange and electric cyan high-contrast status chips.",
    Preview: BadgePreview,
    code: kineticCode.badge,
  },
  {
    id: "modal",
    name: "Modal",
    description: "Max overdrive alert dialog with high contrast borders & vector buttons.",
    Preview: ModalPreview,
    code: kineticCode.modal,
  },
  {
    id: "accordion",
    name: "Accordion",
    description: "Angled FAQ panel with thick dividers and monospaced velocity headers.",
    Preview: AccordionPreview,
    code: kineticCode.accordion,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: "Slanted speed indicator tooltip with electric cyan shadow.",
    Preview: TooltipPreview,
    code: kineticCode.tooltip,
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "High-velocity tab bar with slanted orange and cyan active tab buttons.",
    Preview: TabsPreview,
    code: kineticCode.tabs,
  },
  {
    id: "dropdown",
    name: "Dropdown menu",
    description: "High-contrast speed selection menu with electric hover states.",
    Preview: DropdownPreview,
    code: kineticCode.dropdown,
  },
  {
    id: "switch",
    name: "Toggle / Switch",
    description: "Square slanted toggle switch with electric cyan background and orange knob.",
    Preview: SwitchPreview,
    code: kineticCode.switch,
  },
  {
    id: "skeleton",
    name: "Skeleton loader",
    description: "Pulsing orange and cyan slanted placeholder bars.",
    Preview: SkeletonPreview,
    code: kineticCode.skeleton,
  },
  {
    id: "toast",
    name: "Toast / Notification",
    description: "Thick kinetic orange left-border notification badge.",
    Preview: ToastPreview,
    code: kineticCode.toast,
  },
  {
    id: "progress",
    name: "Progress bar",
    description: "Linear gradient orange-to-cyan slanted fill progress track.",
    Preview: ProgressPreview,
    code: kineticCode.progress,
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "Angled pilot avatar badge with electric cyan border outline.",
    Preview: AvatarPreview,
    code: kineticCode.avatar,
  },
];

export const KINETIC_BUNDLE: StyleBundle = {
  stage: (m) => kinetic(m).stage,
  text: (m) => kinetic(m).text,
  defs: KINETIC_DEFS,
};
