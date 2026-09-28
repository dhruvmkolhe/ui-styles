import type { ComponentDef, StyleBundle } from "@/lib/styles/types";
import { artDeco } from "./kit";
import { artDecoCode } from "./code";
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

export const ART_DECO_DEFS: ComponentDef[] = [
  {
    id: "button",
    name: "Button",
    description: "Metallic gold button with high letter tracking and fine outline border.",
    Preview: ButtonPreview,
    code: artDecoCode.button,
  },
  {
    id: "card",
    name: "Card",
    description: "Double-ruled metallic gold luxury card with chevron motif header.",
    Preview: CardPreview,
    code: artDecoCode.card,
  },
  {
    id: "navbar",
    name: "Navbar",
    description: "Roaring twenties masthead with golden diamond icons and uppercase links.",
    Preview: NavbarPreview,
    code: artDecoCode.navbar,
  },
  {
    id: "input",
    name: "Input field",
    description: "Gold-bordered membership input with wide letter spacing.",
    Preview: InputPreview,
    code: artDecoCode.input,
  },
  {
    id: "badge",
    name: "Badge / Tag",
    description: "Solid gold and thin double-line geometric status badges.",
    Preview: BadgePreview,
    code: artDecoCode.badge,
  },
  {
    id: "modal",
    name: "Modal",
    description: "Luxury private gala invitation dialog with gold double outline.",
    Preview: ModalPreview,
    code: artDecoCode.modal,
  },
  {
    id: "accordion",
    name: "Accordion",
    description: "Golden chevron FAQ container with double border outlines.",
    Preview: AccordionPreview,
    code: artDecoCode.accordion,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: "Gold-gilded edition spec badge with double outline offset.",
    Preview: TooltipPreview,
    code: artDecoCode.tooltip,
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "Solid gold active tab bar with star symbol accents.",
    Preview: TabsPreview,
    code: artDecoCode.tabs,
  },
  {
    id: "dropdown",
    name: "Dropdown menu",
    description: "Gold header salon menu with metallic option highlights.",
    Preview: DropdownPreview,
    code: artDecoCode.dropdown,
  },
  {
    id: "switch",
    name: "Toggle / Switch",
    description: "Double-outlined rectangular gold slider switch.",
    Preview: SwitchPreview,
    code: artDecoCode.switch,
  },
  {
    id: "skeleton",
    name: "Skeleton loader",
    description: "Pulsing metallic gold line and card placeholders.",
    Preview: SkeletonPreview,
    code: artDecoCode.skeleton,
  },
  {
    id: "toast",
    name: "Toast / Notification",
    description: "Left gold border reservation alert toast with diamond star.",
    Preview: ToastPreview,
    code: artDecoCode.toast,
  },
  {
    id: "progress",
    name: "Progress bar",
    description: "Double-bordered gold gradient fill track with percentage label.",
    Preview: ProgressPreview,
    code: artDecoCode.progress,
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "Square gold monogram initial badge with patron metadata label.",
    Preview: AvatarPreview,
    code: artDecoCode.avatar,
  },
];

export const ART_DECO_BUNDLE: StyleBundle = {
  stage: (m) => artDeco(m).stage,
  text: (m) => artDeco(m).text,
  defs: ART_DECO_DEFS,
};
