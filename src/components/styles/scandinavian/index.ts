import type { ComponentDef, StyleBundle } from "@/lib/styles/types";
import { scandinavian } from "./kit";
import { scandinavianCode } from "./code";
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

export const SCANDINAVIAN_DEFS: ComponentDef[] = [
  {
    id: "button",
    name: "Button",
    description: "Muted sky blue button with pale oat secondary action.",
    Preview: ButtonPreview,
    code: scandinavianCode.button,
  },
  {
    id: "card",
    name: "Card",
    description: "Minimalist pale wood card with sky blue status pill badge.",
    Preview: CardPreview,
    code: scandinavianCode.card,
  },
  {
    id: "navbar",
    name: "Navbar",
    description: "Nordic Form masthead with natural oat logo badge and thin link borders.",
    Preview: NavbarPreview,
    code: scandinavianCode.navbar,
  },
  {
    id: "input",
    name: "Input field",
    description: "Soft rounded form field with warm oat background tint.",
    Preview: InputPreview,
    code: scandinavianCode.input,
  },
  {
    id: "badge",
    name: "Badge / Tag",
    description: "Pale birch and sky blue soft rounded status tags.",
    Preview: BadgePreview,
    code: scandinavianCode.badge,
  },
  {
    id: "modal",
    name: "Modal",
    description: "Nordic living community invitation dialog with soft rounded corners.",
    Preview: ModalPreview,
    code: scandinavianCode.modal,
  },
  {
    id: "accordion",
    name: "Accordion",
    description: "Pale oat divider FAQ accordion container.",
    Preview: AccordionPreview,
    code: scandinavianCode.accordion,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: "Soft pale oat wood origin spec badge.",
    Preview: TooltipPreview,
    code: scandinavianCode.tooltip,
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "Muted sky blue active border tab bar.",
    Preview: TabsPreview,
    code: scandinavianCode.tabs,
  },
  {
    id: "dropdown",
    name: "Dropdown menu",
    description: "Soft oat background option menu with rounded items.",
    Preview: DropdownPreview,
    code: scandinavianCode.dropdown,
  },
  {
    id: "switch",
    name: "Toggle / Switch",
    description: "Muted sky blue toggle track with circular white thumb.",
    Preview: SwitchPreview,
    code: scandinavianCode.switch,
  },
  {
    id: "skeleton",
    name: "Skeleton loader",
    description: "Pulsing pale oat and sky blue shape placeholders.",
    Preview: SkeletonPreview,
    code: scandinavianCode.skeleton,
  },
  {
    id: "toast",
    name: "Toast / Notification",
    description: "Left sky blue border wishlist notification toast.",
    Preview: ToastPreview,
    code: scandinavianCode.toast,
  },
  {
    id: "progress",
    name: "Progress bar",
    description: "Pale oat track with sky blue fill bar.",
    Preview: ProgressPreview,
    code: scandinavianCode.progress,
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "Circular pale oat initial avatar with stylist label.",
    Preview: AvatarPreview,
    code: scandinavianCode.avatar,
  },
];

export const SCANDINAVIAN_BUNDLE: StyleBundle = {
  stage: (m) => scandinavian(m).stage,
  text: (m) => scandinavian(m).text,
  defs: SCANDINAVIAN_DEFS,
};
