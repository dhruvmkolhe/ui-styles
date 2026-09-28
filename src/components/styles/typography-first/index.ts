import type { ComponentDef, StyleBundle } from "@/lib/styles/types";
import { typographyFirst } from "./kit";
import { typographyFirstCode } from "./code";
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

export const TYPOGRAPHY_FIRST_DEFS: ComponentDef[] = [
  {
    id: "button",
    name: "Button",
    description: "Refined editorial text button with solid primary background & fine border outlines.",
    Preview: ButtonPreview,
    code: typographyFirstCode.button,
  },
  {
    id: "card",
    name: "Card",
    description: "Classic publishing card with serif headline, monospaced issue numbers & line rules.",
    Preview: CardPreview,
    code: typographyFirstCode.card,
  },
  {
    id: "navbar",
    name: "Navbar",
    description: "Monograph header bar with serif logo branding and uppercase editorial navigation.",
    Preview: NavbarPreview,
    code: typographyFirstCode.navbar,
  },
  {
    id: "input",
    name: "Input field",
    description: "Delicate bottom-bordered search field with italic serif helper text.",
    Preview: InputPreview,
    code: typographyFirstCode.input,
  },
  {
    id: "badge",
    name: "Badge / Tag",
    description: "Italic serif chips and monospaced volume indicators.",
    Preview: BadgePreview,
    code: typographyFirstCode.badge,
  },
  {
    id: "modal",
    name: "Modal",
    description: "Editorial subscription dialog with serif title and minimalist primary action.",
    Preview: ModalPreview,
    code: typographyFirstCode.modal,
  },
  {
    id: "accordion",
    name: "Accordion",
    description: "Clean literary FAQ panel with serif question titles and subtle divider lines.",
    Preview: AccordionPreview,
    code: typographyFirstCode.accordion,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: "Minimalist italic citation badge tooltip.",
    Preview: TooltipPreview,
    code: typographyFirstCode.tooltip,
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "Uppercase tracking tab bar with active border-b indicator.",
    Preview: TabsPreview,
    code: typographyFirstCode.tabs,
  },
  {
    id: "dropdown",
    name: "Dropdown menu",
    description: "Editorial category dropdown list with serif header label.",
    Preview: DropdownPreview,
    code: typographyFirstCode.dropdown,
  },
  {
    id: "switch",
    name: "Toggle / Switch",
    description: "Minimalist rectangular toggle switch with italic serif description.",
    Preview: SwitchPreview,
    code: typographyFirstCode.switch,
  },
  {
    id: "skeleton",
    name: "Skeleton loader",
    description: "Clean placeholder bars mimicking article headlines and paragraph text.",
    Preview: SkeletonPreview,
    code: typographyFirstCode.skeleton,
  },
  {
    id: "toast",
    name: "Toast / Notification",
    description: "Subtle 2px left border notification with serif title.",
    Preview: ToastPreview,
    code: typographyFirstCode.toast,
  },
  {
    id: "progress",
    name: "Progress bar",
    description: "Thin 1px reading progress bar with tracking text percentage.",
    Preview: ProgressPreview,
    code: typographyFirstCode.progress,
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "Square initials avatar badge with author title.",
    Preview: AvatarPreview,
    code: typographyFirstCode.avatar,
  },
];

export const TYPOGRAPHY_FIRST_BUNDLE: StyleBundle = {
  stage: (m) => typographyFirst(m).stage,
  text: (m) => typographyFirst(m).text,
  defs: TYPOGRAPHY_FIRST_DEFS,
};
