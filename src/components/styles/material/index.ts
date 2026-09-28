import type { ComponentDef, StyleBundle } from "@/lib/styles/types";
import { material } from "./kit";
import { materialCode } from "./code";
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

export const MATERIAL_DEFS: ComponentDef[] = [
  {
    id: "button",
    name: "Button",
    description: "Deep purple pill button with material elevation shadows.",
    Preview: ButtonPreview,
    code: materialCode.button,
  },
  {
    id: "card",
    name: "Card",
    description: "Elevated paper surface card with soft shadow and material header.",
    Preview: CardPreview,
    code: materialCode.card,
  },
  {
    id: "navbar",
    name: "Navbar",
    description: "Material top app bar with circular brand badge and active link border.",
    Preview: NavbarPreview,
    code: materialCode.navbar,
  },
  {
    id: "input",
    name: "Input field",
    description: "Filled text input field with bottom accent border line.",
    Preview: InputPreview,
    code: materialCode.input,
  },
  {
    id: "badge",
    name: "Badge / Tag",
    description: "Rounded material chip tags in primary purple and secondary teal.",
    Preview: BadgePreview,
    code: materialCode.badge,
  },
  {
    id: "modal",
    name: "Modal",
    description: "Material alert dialog surface with rounded corners and action buttons.",
    Preview: ModalPreview,
    code: materialCode.modal,
  },
  {
    id: "accordion",
    name: "Accordion",
    description: "Material expansion panel with subtle divider rules.",
    Preview: AccordionPreview,
    code: materialCode.accordion,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: "Dark grey rounded material tooltip for contextual help.",
    Preview: TooltipPreview,
    code: materialCode.tooltip,
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "Material tab bar with deep purple active indicator line.",
    Preview: TabsPreview,
    code: materialCode.tabs,
  },
  {
    id: "dropdown",
    name: "Dropdown menu",
    description: "Floating paper menu surface with subtle hover states.",
    Preview: DropdownPreview,
    code: materialCode.dropdown,
  },
  {
    id: "switch",
    name: "Toggle / Switch",
    description: "Pill-shaped toggle track with circular material thumb button.",
    Preview: SwitchPreview,
    code: materialCode.switch,
  },
  {
    id: "skeleton",
    name: "Skeleton loader",
    description: "Pulsing rounded surface placeholders.",
    Preview: SkeletonPreview,
    code: materialCode.skeleton,
  },
  {
    id: "toast",
    name: "Toast / Notification",
    description: "Dark snackbar notification toast with secondary teal action text.",
    Preview: ToastPreview,
    code: materialCode.toast,
  },
  {
    id: "progress",
    name: "Progress bar",
    description: "Thin rounded track with solid purple progress fill.",
    Preview: ProgressPreview,
    code: materialCode.progress,
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "Circular initial badge in deep purple with shadow elevation.",
    Preview: AvatarPreview,
    code: materialCode.avatar,
  },
];

export const MATERIAL_BUNDLE: StyleBundle = {
  stage: (m) => material(m).stage,
  text: (m) => material(m).text,
  defs: MATERIAL_DEFS,
};
