import type { ComponentDef, StyleBundle } from "@/lib/styles/types";
import { darkTech } from "./kit";
import { darkTechCode } from "./code";
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

export const DARK_TECH_DEFS: ComponentDef[] = [
  {
    id: "button",
    name: "Button",
    description: "Phosphor-green glowing action button with sharp cyber borders.",
    Preview: ButtonPreview,
    code: darkTechCode.button,
  },
  {
    id: "card",
    name: "Card",
    description: "Cyber node card with glowing borders and terminal telemetry.",
    Preview: CardPreview,
    code: darkTechCode.card,
  },
  {
    id: "navbar",
    name: "Navbar",
    description: "Terminal prompt bar header with neon routing options.",
    Preview: NavbarPreview,
    code: darkTechCode.navbar,
  },
  {
    id: "input",
    name: "Input field",
    description: "Monospace prompt input with glowing cyan focus ring.",
    Preview: InputPreview,
    code: darkTechCode.input,
  },
  {
    id: "badge",
    name: "Badge / Tag",
    description: "Monospace telemetry status tags.",
    Preview: BadgePreview,
    code: darkTechCode.badge,
  },
  {
    id: "modal",
    name: "Modal",
    description: "Cyber prompt dialog for system confirmation.",
    Preview: ModalPreview,
    code: darkTechCode.modal,
  },
  {
    id: "accordion",
    name: "Accordion",
    description: "Terminal CLI inspect collapsible section.",
    Preview: AccordionPreview,
    code: darkTechCode.accordion,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: "Glowing cyan prompt tooltip.",
    Preview: TooltipPreview,
    code: darkTechCode.tooltip,
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "System environment tab switcher.",
    Preview: TabsPreview,
    code: darkTechCode.tabs,
  },
  {
    id: "dropdown",
    name: "Dropdown menu",
    description: "Cyan floating command menu with process actions.",
    Preview: DropdownPreview,
    code: darkTechCode.dropdown,
  },
  {
    id: "switch",
    name: "Toggle / Switch",
    description: "Binary 1/0 toggle switch with green glow.",
    Preview: SwitchPreview,
    code: darkTechCode.switch,
  },
  {
    id: "skeleton",
    name: "Skeleton loader",
    description: "Pulsing green wireframe placeholder blocks.",
    Preview: SkeletonPreview,
    code: darkTechCode.skeleton,
  },
  {
    id: "toast",
    name: "Toast / Notification",
    description: "System daemon online notification banner.",
    Preview: ToastPreview,
    code: darkTechCode.toast,
  },
  {
    id: "progress",
    name: "Progress bar",
    description: "Glowing phosphor progress bar.",
    Preview: ProgressPreview,
    code: darkTechCode.progress,
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "Square cyber initial badge with neon glow.",
    Preview: AvatarPreview,
    code: darkTechCode.avatar,
  },
];

export const DARK_TECH_BUNDLE: StyleBundle = {
  stage: (m) => darkTech(m).stage,
  text: (m) => darkTech(m).text,
  defs: DARK_TECH_DEFS,
};
