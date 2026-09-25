import type { ComponentDef, StyleBundle } from "@/lib/styles/types";
import { neomorphism } from "./kit";
import { neomorphismCode } from "./code";
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

export const NEOMORPHISM_DEFS: ComponentDef[] = [
  {
    id: "button",
    name: "Button",
    description: "Extruded button surface raised with dual light and dark shadow pairs.",
    Preview: ButtonPreview,
    code: neomorphismCode.button,
  },
  {
    id: "card",
    name: "Card",
    description: "Tactile card extruded seamlessly from the underlying same-hue background.",
    Preview: CardPreview,
    code: neomorphismCode.card,
  },
  {
    id: "navbar",
    name: "Navbar",
    description: "Extruded bar header with subtle soft surface buttons.",
    Preview: NavbarPreview,
    code: neomorphismCode.navbar,
  },
  {
    id: "input",
    name: "Input field",
    description: "Concave pressed input well with inset dual shadows.",
    Preview: InputPreview,
    code: neomorphismCode.input,
  },
  {
    id: "badge",
    name: "Badge / Tag",
    description: "Pill-shaped extruded surface chip.",
    Preview: BadgePreview,
    code: neomorphismCode.badge,
  },
  {
    id: "modal",
    name: "Modal",
    description: "Soft tactile modal floating above a translucent background layer.",
    Preview: ModalPreview,
    code: neomorphismCode.modal,
  },
  {
    id: "accordion",
    name: "Accordion",
    description: "Soft-edged FAQ panel extruded from canvas.",
    Preview: AccordionPreview,
    code: neomorphismCode.accordion,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: "Floating soft-ui pill tooltip.",
    Preview: TooltipPreview,
    code: neomorphismCode.tooltip,
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "Segmented recessed track with floating active surface pill.",
    Preview: TabsPreview,
    code: neomorphismCode.tabs,
  },
  {
    id: "dropdown",
    name: "Dropdown menu",
    description: "Extruded menu panel with soft rounded item surfaces.",
    Preview: DropdownPreview,
    code: neomorphismCode.dropdown,
  },
  {
    id: "switch",
    name: "Toggle / Switch",
    description: "Recessed toggle track with extruded sliding button thumb.",
    Preview: SwitchPreview,
    code: neomorphismCode.switch,
  },
  {
    id: "skeleton",
    name: "Skeleton loader",
    description: "Extruded pulsing placeholder shapes.",
    Preview: SkeletonPreview,
    code: neomorphismCode.skeleton,
  },
  {
    id: "toast",
    name: "Toast / Notification",
    description: "Soft pillowy notification bar.",
    Preview: ToastPreview,
    code: neomorphismCode.toast,
  },
  {
    id: "progress",
    name: "Progress bar",
    description: "Pressed track with smooth glowing fill.",
    Preview: ProgressPreview,
    code: neomorphismCode.progress,
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "Extruded circular initial badge.",
    Preview: AvatarPreview,
    code: neomorphismCode.avatar,
  },
];

export const NEOMORPHISM_BUNDLE: StyleBundle = {
  stage: (m) => neomorphism(m).stage,
  text: (m) => neomorphism(m).text,
  defs: NEOMORPHISM_DEFS,
};
