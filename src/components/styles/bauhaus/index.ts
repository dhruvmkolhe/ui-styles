import type { ComponentDef, StyleBundle } from "@/lib/styles/types";
import { bauhaus } from "./kit";
import { bauhausCode } from "./code";
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

export const BAUHAUS_DEFS: ComponentDef[] = [
  {
    id: "button",
    name: "Button",
    description: "Primary Red and Yellow geometric buttons with thick dark navy border.",
    Preview: ButtonPreview,
    code: bauhausCode.button,
  },
  {
    id: "card",
    name: "Card",
    description: "Primary shape indicator card with high contrast border and manifesto text.",
    Preview: CardPreview,
    code: bauhausCode.card,
  },
  {
    id: "navbar",
    name: "Navbar",
    description: "Modernist top bar with primary red circle icon and bold link rules.",
    Preview: NavbarPreview,
    code: bauhausCode.navbar,
  },
  {
    id: "input",
    name: "Input field",
    description: "High-contrast thick bordered input box with red warning subtext.",
    Preview: InputPreview,
    code: bauhausCode.input,
  },
  {
    id: "badge",
    name: "Badge / Tag",
    description: "Primary red, yellow, and blue geometric classification tags.",
    Preview: BadgePreview,
    code: bauhausCode.badge,
  },
  {
    id: "modal",
    name: "Modal",
    description: "Bauhaus exhibition proposal alert dialog with thick outer borders.",
    Preview: ModalPreview,
    code: bauhausCode.modal,
  },
  {
    id: "accordion",
    name: "Accordion",
    description: "Thick double-bordered movement FAQ accordion container.",
    Preview: AccordionPreview,
    code: bauhausCode.accordion,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: "Bright primary yellow technical spec tooltip block.",
    Preview: TooltipPreview,
    code: bauhausCode.tooltip,
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "Primary color palette tab bar with thick border separation.",
    Preview: TabsPreview,
    code: bauhausCode.tabs,
  },
  {
    id: "dropdown",
    name: "Dropdown menu",
    description: "Deep navy header menu with primary color hover highlights.",
    Preview: DropdownPreview,
    code: bauhausCode.dropdown,
  },
  {
    id: "switch",
    name: "Toggle / Switch",
    description: "Rectangular primary red slider switch inside thick black outline.",
    Preview: SwitchPreview,
    code: bauhausCode.switch,
  },
  {
    id: "skeleton",
    name: "Skeleton loader",
    description: "Pulsing primary red and yellow block placeholders.",
    Preview: SkeletonPreview,
    code: bauhausCode.skeleton,
  },
  {
    id: "toast",
    name: "Toast / Notification",
    description: "Heavy left red border toast alert with primary yellow circle icon.",
    Preview: ToastPreview,
    code: bauhausCode.toast,
  },
  {
    id: "progress",
    name: "Progress bar",
    description: "Thick bordered track with solid primary red fill.",
    Preview: ProgressPreview,
    code: bauhausCode.progress,
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "Circular primary red initials avatar with dark navy border.",
    Preview: AvatarPreview,
    code: bauhausCode.avatar,
  },
];

export const BAUHAUS_BUNDLE: StyleBundle = {
  stage: (m) => bauhaus(m).stage,
  text: (m) => bauhaus(m).text,
  defs: BAUHAUS_DEFS,
};
