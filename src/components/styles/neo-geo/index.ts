import type { ComponentDef, StyleBundle } from "@/lib/styles/types";
import { neoGeo } from "./kit";
import { neoGeoCode } from "./code";
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

export const NEO_GEO_DEFS: ComponentDef[] = [
  {
    id: "button",
    name: "Button",
    description: "Electric purple button with hard lemon yellow offset shadow.",
    Preview: ButtonPreview,
    code: neoGeoCode.button,
  },
  {
    id: "card",
    name: "Card",
    description: "Multi-color post-modern card with neon cyan border and offset shadow.",
    Preview: CardPreview,
    code: neoGeoCode.card,
  },
  {
    id: "navbar",
    name: "Navbar",
    description: "Neo-Geo top header with yellow diamond logo and neon cyan links.",
    Preview: NavbarPreview,
    code: neoGeoCode.navbar,
  },
  {
    id: "input",
    name: "Input field",
    description: "Cyan-bordered geometric form input with coral pink subtext.",
    Preview: InputPreview,
    code: neoGeoCode.input,
  },
  {
    id: "badge",
    name: "Badge / Tag",
    description: "Coral pink, neon cyan, and lemon yellow pop status tags.",
    Preview: BadgePreview,
    code: neoGeoCode.badge,
  },
  {
    id: "modal",
    name: "Modal",
    description: "Asymmetric electric color block alert dialog.",
    Preview: ModalPreview,
    code: neoGeoCode.modal,
  },
  {
    id: "accordion",
    name: "Accordion",
    description: "Post-modern FAQ container with neon cyan double-line dividers.",
    Preview: AccordionPreview,
    code: neoGeoCode.accordion,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: "Lemon yellow spec tooltip block with purple drop shadow.",
    Preview: TooltipPreview,
    code: neoGeoCode.tooltip,
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "Electric purple, neon cyan, and lemon yellow tab switcher.",
    Preview: TabsPreview,
    code: neoGeoCode.tabs,
  },
  {
    id: "dropdown",
    name: "Dropdown menu",
    description: "Electric purple header menu with neon pop item highlights.",
    Preview: DropdownPreview,
    code: neoGeoCode.dropdown,
  },
  {
    id: "switch",
    name: "Toggle / Switch",
    description: "Neon cyan toggle box with electric purple slider button.",
    Preview: SwitchPreview,
    code: neoGeoCode.switch,
  },
  {
    id: "skeleton",
    name: "Skeleton loader",
    description: "Pulsing electric purple and neon cyan geometric block loaders.",
    Preview: SkeletonPreview,
    code: neoGeoCode.skeleton,
  },
  {
    id: "toast",
    name: "Toast / Notification",
    description: "Thick left electric purple border toast with yellow square icon.",
    Preview: ToastPreview,
    code: neoGeoCode.toast,
  },
  {
    id: "progress",
    name: "Progress bar",
    description: "Neon cyan border track with purple-to-yellow gradient fill.",
    Preview: ProgressPreview,
    code: neoGeoCode.progress,
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "Square electric purple monogram avatar with coral drop shadow.",
    Preview: AvatarPreview,
    code: neoGeoCode.avatar,
  },
];

export const NEO_GEO_BUNDLE: StyleBundle = {
  stage: (m) => neoGeo(m).stage,
  text: (m) => neoGeo(m).text,
  defs: NEO_GEO_DEFS,
};
