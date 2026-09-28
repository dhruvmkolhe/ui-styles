import type { ComponentDef, StyleBundle } from "@/lib/styles/types";
import { metropolitan } from "./kit";
import { metropolitanCode } from "./code";
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

export const METROPOLITAN_DEFS: ComponentDef[] = [
  {
    id: "button",
    name: "Button",
    description: "Transit line express button with crisp uppercase typography.",
    Preview: ButtonPreview,
    code: metropolitanCode.button,
  },
  {
    id: "card",
    name: "Card",
    description: "Urban station concourse card with platform indicators & schedule time.",
    Preview: CardPreview,
    code: metropolitanCode.card,
  },
  {
    id: "navbar",
    name: "Navbar",
    description: "Header bar with blue accent border and route line navigation links.",
    Preview: NavbarPreview,
    code: metropolitanCode.navbar,
  },
  {
    id: "input",
    name: "Input field",
    description: "Monospaced station code input field.",
    Preview: InputPreview,
    code: metropolitanCode.input,
  },
  {
    id: "badge",
    name: "Badge / Tag",
    description: "High-density subway line and platform status badges.",
    Preview: BadgePreview,
    code: metropolitanCode.badge,
  },
  {
    id: "modal",
    name: "Modal",
    description: "Transit ticket purchase confirmation dialog.",
    Preview: ModalPreview,
    code: metropolitanCode.modal,
  },
  {
    id: "accordion",
    name: "Accordion",
    description: "Monospaced transit tariff rules panel with clean line dividers.",
    Preview: AccordionPreview,
    code: metropolitanCode.accordion,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: "System optimal status indicator badge.",
    Preview: TooltipPreview,
    code: metropolitanCode.tooltip,
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "Bold blue transit line selection tabs.",
    Preview: TabsPreview,
    code: metropolitanCode.tabs,
  },
  {
    id: "dropdown",
    name: "Dropdown menu",
    description: "Transit route selection dropdown list.",
    Preview: DropdownPreview,
    code: metropolitanCode.dropdown,
  },
  {
    id: "switch",
    name: "Toggle / Switch",
    description: "Realtime alerts toggle switch with blue indicator.",
    Preview: SwitchPreview,
    code: metropolitanCode.switch,
  },
  {
    id: "skeleton",
    name: "Skeleton loader",
    description: "Pulsing transit board schedule line placeholders.",
    Preview: SkeletonPreview,
    code: metropolitanCode.skeleton,
  },
  {
    id: "toast",
    name: "Toast / Notification",
    description: "Blue left border track schedule update toast.",
    Preview: ToastPreview,
    code: metropolitanCode.toast,
  },
  {
    id: "progress",
    name: "Progress bar",
    description: "Solid blue transit capacity fill track.",
    Preview: ProgressPreview,
    code: metropolitanCode.progress,
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "Square operator initials avatar badge.",
    Preview: AvatarPreview,
    code: metropolitanCode.avatar,
  },
];

export const METROPOLITAN_BUNDLE: StyleBundle = {
  stage: (m) => metropolitan(m).stage,
  text: (m) => metropolitan(m).text,
  defs: METROPOLITAN_DEFS,
};
