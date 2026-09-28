import type { ComponentDef, StyleBundle } from "@/lib/styles/types";
import { organic } from "./kit";
import { organicCode } from "./code";
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

export const ORGANIC_DEFS: ComponentDef[] = [
  {
    id: "button",
    name: "Button",
    description: "Sage green pebble button with terracotta secondary action.",
    Preview: ButtonPreview,
    code: organicCode.button,
  },
  {
    id: "card",
    name: "Card",
    description: "Biophilic stone surface card with leaf icon and terracotta accent.",
    Preview: CardPreview,
    code: organicCode.card,
  },
  {
    id: "navbar",
    name: "Navbar",
    description: "Flora & Stone header bar with circular green logo badge.",
    Preview: NavbarPreview,
    code: organicCode.navbar,
  },
  {
    id: "input",
    name: "Input field",
    description: "Rounded pebble form field with warm stone background tint.",
    Preview: InputPreview,
    code: organicCode.input,
  },
  {
    id: "badge",
    name: "Badge / Tag",
    description: "Sage green and terracotta clay rounded status tags.",
    Preview: BadgePreview,
    code: organicCode.badge,
  },
  {
    id: "modal",
    name: "Modal",
    description: "Biophilic sanctuary invitation dialog with flowing rounded corners.",
    Preview: ModalPreview,
    code: organicCode.modal,
  },
  {
    id: "accordion",
    name: "Accordion",
    description: "Earthy stone divider FAQ accordion container.",
    Preview: AccordionPreview,
    code: organicCode.accordion,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: "Biophilic stone spec tooltip badge with sage border.",
    Preview: TooltipPreview,
    code: organicCode.tooltip,
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "Sage green active indicator tab bar with botanical labels.",
    Preview: TabsPreview,
    code: organicCode.tabs,
  },
  {
    id: "dropdown",
    name: "Dropdown menu",
    description: "Soft stone option list with rounded item highlights.",
    Preview: DropdownPreview,
    code: organicCode.dropdown,
  },
  {
    id: "switch",
    name: "Toggle / Switch",
    description: "Sage green toggle track with warm stone thumb button.",
    Preview: SwitchPreview,
    code: organicCode.switch,
  },
  {
    id: "skeleton",
    name: "Skeleton loader",
    description: "Pulsing sage green and stone shape placeholders.",
    Preview: SkeletonPreview,
    code: organicCode.skeleton,
  },
  {
    id: "toast",
    name: "Toast / Notification",
    description: "Left terracotta clay border alert toast with sage circle icon.",
    Preview: ToastPreview,
    code: organicCode.toast,
  },
  {
    id: "progress",
    name: "Progress bar",
    description: "Soft stone track with sage-to-terracotta gradient fill.",
    Preview: ProgressPreview,
    code: organicCode.progress,
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "Circular sage green initial badge with biophilic architect label.",
    Preview: AvatarPreview,
    code: organicCode.avatar,
  },
];

export const ORGANIC_BUNDLE: StyleBundle = {
  stage: (m) => organic(m).stage,
  text: (m) => organic(m).text,
  defs: ORGANIC_DEFS,
};
