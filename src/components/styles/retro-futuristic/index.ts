import type { ComponentDef, StyleBundle } from "@/lib/styles/types";
import { retroFuturistic } from "./kit";
import { retroFuturisticCode } from "./code";
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

export const RETRO_FUTURISTIC_DEFS: ComponentDef[] = [
  {
    id: "button",
    name: "Button",
    description: "Synthwave gradient pink button with neon glow shadow.",
    Preview: ButtonPreview,
    code: retroFuturisticCode.button,
  },
  {
    id: "card",
    name: "Card",
    description: "Deep space purple card with neon cyan header line and hot pink tags.",
    Preview: CardPreview,
    code: retroFuturisticCode.card,
  },
  {
    id: "navbar",
    name: "Navbar",
    description: "Cyber navigation bar with glowing neon pink logo diamond and cyan links.",
    Preview: NavbarPreview,
    code: retroFuturisticCode.navbar,
  },
  {
    id: "input",
    name: "Input field",
    description: "Cyan-bordered terminal input with neon pink focus shadow.",
    Preview: InputPreview,
    code: retroFuturisticCode.input,
  },
  {
    id: "badge",
    name: "Badge / Tag",
    description: "Hot pink and glowing cyan status tags with wide letter spacing.",
    Preview: BadgePreview,
    code: retroFuturisticCode.badge,
  },
  {
    id: "modal",
    name: "Modal",
    description: "80s sci-fi system overheat dialog with high glow warnings.",
    Preview: ModalPreview,
    code: retroFuturisticCode.modal,
  },
  {
    id: "accordion",
    name: "Accordion",
    description: "Cyberpunk vector FAQ container with cyan divider grid lines.",
    Preview: AccordionPreview,
    code: retroFuturisticCode.accordion,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: "Neon-bordered retro matrix tooltip badge.",
    Preview: TooltipPreview,
    code: retroFuturisticCode.tooltip,
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "Glowing synthwave gradient active tab bar.",
    Preview: TabsPreview,
    code: retroFuturisticCode.tabs,
  },
  {
    id: "dropdown",
    name: "Dropdown menu",
    description: "Hot pink header menu with cyan illuminated list items.",
    Preview: DropdownPreview,
    code: retroFuturisticCode.dropdown,
  },
  {
    id: "switch",
    name: "Toggle / Switch",
    description: "Cyber toggle box with hot pink neon slider button.",
    Preview: SwitchPreview,
    code: retroFuturisticCode.switch,
  },
  {
    id: "skeleton",
    name: "Skeleton loader",
    description: "Pulsing neon pink and cyan vector shape loaders.",
    Preview: SkeletonPreview,
    code: retroFuturisticCode.skeleton,
  },
  {
    id: "toast",
    name: "Toast / Notification",
    description: "Heavy pink border alert toast with cyan signal text.",
    Preview: ToastPreview,
    code: retroFuturisticCode.toast,
  },
  {
    id: "progress",
    name: "Progress bar",
    description: "Cyan border progress track with pink-to-cyan gradient fill.",
    Preview: ProgressPreview,
    code: retroFuturisticCode.progress,
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "Hot pink gradient vector initial badge with neon glow.",
    Preview: AvatarPreview,
    code: retroFuturisticCode.avatar,
  },
];

export const RETRO_FUTURISTIC_BUNDLE: StyleBundle = {
  stage: (m) => retroFuturistic(m).stage,
  text: (m) => retroFuturistic(m).text,
  defs: RETRO_FUTURISTIC_DEFS,
};
