import type { ComponentDef, StyleBundle } from "@/lib/styles/types";
import { bentoGrid } from "./kit";
import { bentoGridCode } from "./code";
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

export const BENTO_GRID_DEFS: ComponentDef[] = [
  {
    id: "button",
    name: "Button",
    description: "Rounded indigo feature button with subtle glowing shadow.",
    Preview: ButtonPreview,
    code: bentoGridCode.button,
  },
  {
    id: "card",
    name: "Card",
    description: "Asymmetric bento module card with translucent border.",
    Preview: CardPreview,
    code: bentoGridCode.card,
  },
  {
    id: "navbar",
    name: "Navbar",
    description: "Editorial header bar with indigo logo mark and deploy CTA.",
    Preview: NavbarPreview,
    code: bentoGridCode.navbar,
  },
  {
    id: "input",
    name: "Input field",
    description: "Subtle translucent input field with indigo micro-label.",
    Preview: InputPreview,
    code: bentoGridCode.input,
  },
  {
    id: "badge",
    name: "Badge / Tag",
    description: "Indigo tinted editorial cell chips.",
    Preview: BadgePreview,
    code: bentoGridCode.badge,
  },
  {
    id: "modal",
    name: "Modal",
    description: "Clean bento config dialog with translucent backdrop.",
    Preview: ModalPreview,
    code: bentoGridCode.modal,
  },
  {
    id: "accordion",
    name: "Accordion",
    description: "Subtle editorial FAQ card.",
    Preview: AccordionPreview,
    code: bentoGridCode.accordion,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: "Subtle dark floating bento tooltip.",
    Preview: TooltipPreview,
    code: bentoGridCode.tooltip,
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "Segmented track with indigo active tab card.",
    Preview: TabsPreview,
    code: bentoGridCode.tabs,
  },
  {
    id: "dropdown",
    name: "Dropdown menu",
    description: "Floating bento menu with indigo hover highlights.",
    Preview: DropdownPreview,
    code: bentoGridCode.dropdown,
  },
  {
    id: "switch",
    name: "Toggle / Switch",
    description: "Indigo rounded toggle switch.",
    Preview: SwitchPreview,
    code: bentoGridCode.switch,
  },
  {
    id: "skeleton",
    name: "Skeleton loader",
    description: "Bento-grid shaped pulsing placeholders.",
    Preview: SkeletonPreview,
    code: bentoGridCode.skeleton,
  },
  {
    id: "toast",
    name: "Toast / Notification",
    description: "Subtle status notification pill.",
    Preview: ToastPreview,
    code: bentoGridCode.toast,
  },
  {
    id: "progress",
    name: "Progress bar",
    description: "Gradient indigo-to-cyan progress track.",
    Preview: ProgressPreview,
    code: bentoGridCode.progress,
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "Rounded square initials badge.",
    Preview: AvatarPreview,
    code: bentoGridCode.avatar,
  },
];

export const BENTO_GRID_BUNDLE: StyleBundle = {
  stage: (m) => bentoGrid(m).stage,
  text: (m) => bentoGrid(m).text,
  defs: BENTO_GRID_DEFS,
};
