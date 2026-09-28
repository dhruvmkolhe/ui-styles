import type { ComponentDef, StyleBundle } from "@/lib/styles/types";
import { monochromatic } from "./kit";
import { monochromaticCode } from "./code";
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

export const MONOCHROMATIC_DEFS: ComponentDef[] = [
  {
    id: "button",
    name: "Button",
    description: "Royal blue primary button with light blue tint secondary action.",
    Preview: ButtonPreview,
    code: monochromaticCode.button,
  },
  {
    id: "card",
    name: "Card",
    description: "Harmonious single-hue surface card with royal blue header line.",
    Preview: CardPreview,
    code: monochromaticCode.card,
  },
  {
    id: "navbar",
    name: "Navbar",
    description: "MonoBlue header navigation with active shade indicator border.",
    Preview: NavbarPreview,
    code: monochromaticCode.navbar,
  },
  {
    id: "input",
    name: "Input field",
    description: "Royal blue bordered form field with spectrum subtext label.",
    Preview: InputPreview,
    code: monochromaticCode.input,
  },
  {
    id: "badge",
    name: "Badge / Tag",
    description: "Light blue tint and deep royal shade status tags.",
    Preview: BadgePreview,
    code: monochromaticCode.badge,
  },
  {
    id: "modal",
    name: "Modal",
    description: "Harmonized single-hue confirmation dialog box.",
    Preview: ModalPreview,
    code: monochromaticCode.modal,
  },
  {
    id: "accordion",
    name: "Accordion",
    description: "Blue scale divider FAQ accordion container.",
    Preview: AccordionPreview,
    code: monochromaticCode.accordion,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: "Deep royal blue color spec tooltip badge.",
    Preview: TooltipPreview,
    code: monochromaticCode.tooltip,
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "Royal blue active bottom border tab bar.",
    Preview: TabsPreview,
    code: monochromaticCode.tabs,
  },
  {
    id: "dropdown",
    name: "Dropdown menu",
    description: "Single-hue blue tint option list with hover highlights.",
    Preview: DropdownPreview,
    code: monochromaticCode.dropdown,
  },
  {
    id: "switch",
    name: "Toggle / Switch",
    description: "Royal blue toggle track with smooth circular thumb.",
    Preview: SwitchPreview,
    code: monochromaticCode.switch,
  },
  {
    id: "skeleton",
    name: "Skeleton loader",
    description: "Pulsing light blue tint shape placeholders.",
    Preview: SkeletonPreview,
    code: monochromaticCode.skeleton,
  },
  {
    id: "toast",
    name: "Toast / Notification",
    description: "Left royal blue border alert toast with harmonized text.",
    Preview: ToastPreview,
    code: monochromaticCode.toast,
  },
  {
    id: "progress",
    name: "Progress bar",
    description: "Light blue track with solid royal blue fill.",
    Preview: ProgressPreview,
    code: monochromaticCode.progress,
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "Rounded royal blue initial badge with hue metadata label.",
    Preview: AvatarPreview,
    code: monochromaticCode.avatar,
  },
];

export const MONOCHROMATIC_BUNDLE: StyleBundle = {
  stage: (m) => monochromatic(m).stage,
  text: (m) => monochromatic(m).text,
  defs: MONOCHROMATIC_DEFS,
};
