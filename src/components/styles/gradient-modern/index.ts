import type { ComponentDef, StyleBundle } from "@/lib/styles/types";
import { gradientModern } from "./kit";
import { gradientModernCode } from "./code";
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

export const GRADIENT_MODERN_DEFS: ComponentDef[] = [
  {
    id: "button",
    name: "Button",
    description: "Multi-color mesh gradient button with subtle glow hover states.",
    Preview: ButtonPreview,
    code: gradientModernCode.button,
  },
  {
    id: "card",
    name: "Card",
    description: "Translucent frosted glass card with glowing gradient headlines.",
    Preview: CardPreview,
    code: gradientModernCode.card,
  },
  {
    id: "navbar",
    name: "Navbar",
    description: "PrismUI gradient header bar with colorful brand badge.",
    Preview: NavbarPreview,
    code: gradientModernCode.navbar,
  },
  {
    id: "input",
    name: "Input field",
    description: "Sleek translucent form input with purple focus ring.",
    Preview: InputPreview,
    code: gradientModernCode.input,
  },
  {
    id: "badge",
    name: "Badge / Tag",
    description: "Vibrant indigo-to-fuchsia mesh gradient status chips.",
    Preview: BadgePreview,
    code: gradientModernCode.badge,
  },
  {
    id: "modal",
    name: "Modal",
    description: "Spectral shader deployment dialog with frosted backdrop blur.",
    Preview: ModalPreview,
    code: gradientModernCode.modal,
  },
  {
    id: "accordion",
    name: "Accordion",
    description: "Glassmorphic mesh FAQ container with glowing divider lines.",
    Preview: AccordionPreview,
    code: gradientModernCode.accordion,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: "Linear gradient indigo-purple spec tooltip badge.",
    Preview: TooltipPreview,
    code: gradientModernCode.tooltip,
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "Glowing purple active tab bar with spectral options.",
    Preview: TabsPreview,
    code: gradientModernCode.tabs,
  },
  {
    id: "dropdown",
    name: "Dropdown menu",
    description: "Floating frosted paper menu with mesh option highlights.",
    Preview: DropdownPreview,
    code: gradientModernCode.dropdown,
  },
  {
    id: "switch",
    name: "Toggle / Switch",
    description: "Indigo-to-pink gradient toggle track with smooth white thumb.",
    Preview: SwitchPreview,
    code: gradientModernCode.switch,
  },
  {
    id: "skeleton",
    name: "Skeleton loader",
    description: "Pulsing gradient mesh line and card placeholders.",
    Preview: SkeletonPreview,
    code: gradientModernCode.skeleton,
  },
  {
    id: "toast",
    name: "Toast / Notification",
    description: "Heavy left fuchsia border toast with glowing gradient icon.",
    Preview: ToastPreview,
    code: gradientModernCode.toast,
  },
  {
    id: "progress",
    name: "Progress bar",
    description: "Indigo-fuchsia-pink gradient fill track with percentage label.",
    Preview: ProgressPreview,
    code: gradientModernCode.progress,
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "Square gradient mesh initial badge with GPU engineer label.",
    Preview: AvatarPreview,
    code: gradientModernCode.avatar,
  },
];

export const GRADIENT_MODERN_BUNDLE: StyleBundle = {
  stage: (m) => gradientModern(m).stage,
  text: (m) => gradientModern(m).text,
  defs: GRADIENT_MODERN_DEFS,
};
