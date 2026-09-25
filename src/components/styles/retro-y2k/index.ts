import type { ComponentDef, StyleBundle } from "@/lib/styles/types";
import { retroY2k } from "./kit";
import { retroY2kCode } from "./code";
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

export const RETRO_Y2K_DEFS: ComponentDef[] = [
  {
    id: "button",
    name: "Button",
    description: "Chunky 2000s candy pills with starbursts and drop shadow accents.",
    Preview: ButtonPreview,
    code: retroY2kCode.button,
  },
  {
    id: "card",
    name: "Card",
    description: "Pop star sticker panel with vibrant gradients and chunky border.",
    Preview: CardPreview,
    code: retroY2kCode.card,
  },
  {
    id: "navbar",
    name: "Navbar",
    description: "Millennium website header with hot pink wordmark and cyan CTA.",
    Preview: NavbarPreview,
    code: retroY2kCode.navbar,
  },
  {
    id: "input",
    name: "Input field",
    description: "Chunky input field with star-decorated label.",
    Preview: InputPreview,
    code: retroY2kCode.input,
  },
  {
    id: "badge",
    name: "Badge / Tag",
    description: "Star burst and pop sticker pill tags.",
    Preview: BadgePreview,
    code: retroY2kCode.badge,
  },
  {
    id: "modal",
    name: "Modal",
    description: "Y2K iPod playlist dialog with vibrant borders.",
    Preview: ModalPreview,
    code: retroY2kCode.modal,
  },
  {
    id: "accordion",
    name: "Accordion",
    description: "Millennium FAQ section with star bursts.",
    Preview: AccordionPreview,
    code: retroY2kCode.accordion,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: "Glittering starburst tooltip pill.",
    Preview: TooltipPreview,
    code: retroY2kCode.tooltip,
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "Pop music tab switcher with rounded colorful pill tabs.",
    Preview: TabsPreview,
    code: retroY2kCode.tabs,
  },
  {
    id: "dropdown",
    name: "Dropdown menu",
    description: "Lime-green floating menu panel with chunky border.",
    Preview: DropdownPreview,
    code: retroY2kCode.dropdown,
  },
  {
    id: "switch",
    name: "Toggle / Switch",
    description: "Bubbly pink & lime toggle switch.",
    Preview: SwitchPreview,
    code: retroY2kCode.switch,
  },
  {
    id: "skeleton",
    name: "Skeleton loader",
    description: "Pulsing purple placeholder blocks.",
    Preview: SkeletonPreview,
    code: retroY2kCode.skeleton,
  },
  {
    id: "toast",
    name: "Toast / Notification",
    description: "Star music download notification banner.",
    Preview: ToastPreview,
    code: retroY2kCode.toast,
  },
  {
    id: "progress",
    name: "Progress bar",
    description: "Tri-color gradient candy progress bar.",
    Preview: ProgressPreview,
    code: retroY2kCode.progress,
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "Gradient pop star initial badge.",
    Preview: AvatarPreview,
    code: retroY2kCode.avatar,
  },
];

export const RETRO_Y2K_BUNDLE: StyleBundle = {
  stage: (m) => retroY2k(m).stage,
  text: (m) => retroY2k(m).text,
  defs: RETRO_Y2K_DEFS,
};
