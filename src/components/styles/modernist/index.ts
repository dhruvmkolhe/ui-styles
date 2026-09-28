import type { ComponentDef, StyleBundle } from "@/lib/styles/types";
import { modernist } from "./kit";
import { modernistCode } from "./code";
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

export const MODERNIST_DEFS: ComponentDef[] = [
  {
    id: "button",
    name: "Button",
    description: "Terracotta and olive green buttons with clean structural border.",
    Preview: ButtonPreview,
    code: modernistCode.button,
  },
  {
    id: "card",
    name: "Card",
    description: "Mid-century structural card with primary accent color swatches.",
    Preview: CardPreview,
    code: modernistCode.card,
  },
  {
    id: "navbar",
    name: "Navbar",
    description: "Modernist top bar with terracotta square logo and bold link rules.",
    Preview: NavbarPreview,
    code: modernistCode.navbar,
  },
  {
    id: "input",
    name: "Input field",
    description: "Charcoal bordered architectural input box with olive subtext.",
    Preview: InputPreview,
    code: modernistCode.input,
  },
  {
    id: "badge",
    name: "Badge / Tag",
    description: "Earthy terracotta, mustard gold, and olive green status tags.",
    Preview: BadgePreview,
    code: modernistCode.badge,
  },
  {
    id: "modal",
    name: "Modal",
    description: "Mid-century blueprint revision alert dialog with clean borders.",
    Preview: ModalPreview,
    code: modernistCode.modal,
  },
  {
    id: "accordion",
    name: "Accordion",
    description: "Terracotta FAQ accordion container with dark border divider lines.",
    Preview: AccordionPreview,
    code: modernistCode.accordion,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: "Mustard gold spec tooltip badge with charcoal border.",
    Preview: TooltipPreview,
    code: modernistCode.tooltip,
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "Earthy terracotta, olive, and mustard mid-century tab bar.",
    Preview: TabsPreview,
    code: modernistCode.tabs,
  },
  {
    id: "dropdown",
    name: "Dropdown menu",
    description: "Terracotta header designer menu with olive hover states.",
    Preview: DropdownPreview,
    code: modernistCode.dropdown,
  },
  {
    id: "switch",
    name: "Toggle / Switch",
    description: "Rectangular terracotta slider button inside charcoal border.",
    Preview: SwitchPreview,
    code: modernistCode.switch,
  },
  {
    id: "skeleton",
    name: "Skeleton loader",
    description: "Pulsing terracotta and mustard shape loaders.",
    Preview: SkeletonPreview,
    code: modernistCode.skeleton,
  },
  {
    id: "toast",
    name: "Toast / Notification",
    description: "Heavy left terracotta border toast alert with mustard square icon.",
    Preview: ToastPreview,
    code: modernistCode.toast,
  },
  {
    id: "progress",
    name: "Progress bar",
    description: "Charcoal bordered track with solid terracotta fill.",
    Preview: ProgressPreview,
    code: modernistCode.progress,
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "Square terracotta initial badge with olive metadata label.",
    Preview: AvatarPreview,
    code: modernistCode.avatar,
  },
];

export const MODERNIST_BUNDLE: StyleBundle = {
  stage: (m) => modernist(m).stage,
  text: (m) => modernist(m).text,
  defs: MODERNIST_DEFS,
};
