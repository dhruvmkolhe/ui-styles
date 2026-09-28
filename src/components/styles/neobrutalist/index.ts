import type { ComponentDef, StyleBundle } from "@/lib/styles/types";
import { neobrutalist } from "./kit";
import { neobrutalistCode } from "./code";
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

export const NEOBRUTALIST_DEFS: ComponentDef[] = [
  {
    id: "button",
    name: "Button",
    description: "Yellow accent button with 4px border black and hard drop shadow.",
    Preview: ButtonPreview,
    code: neobrutalistCode.button,
  },
  {
    id: "card",
    name: "Card",
    description: "Thick outlined card with bright yellow fill and offset shadow.",
    Preview: CardPreview,
    code: neobrutalistCode.card,
  },
  {
    id: "navbar",
    name: "Navbar",
    description: "Raw neobrutalist top bar with yellow wordmark and hard CTA.",
    Preview: NavbarPreview,
    code: neobrutalistCode.navbar,
  },
  {
    id: "input",
    name: "Input field",
    description: "Monospace field with 4px black outline and bold label.",
    Preview: InputPreview,
    code: neobrutalistCode.input,
  },
  {
    id: "badge",
    name: "Badge / Tag",
    description: "Yellow and orange pop tags with black outlines.",
    Preview: BadgePreview,
    code: neobrutalistCode.badge,
  },
  {
    id: "modal",
    name: "Modal",
    description: "Bold neobrutalist alert dialog with hard shadow action buttons.",
    Preview: ModalPreview,
    code: neobrutalistCode.modal,
  },
  {
    id: "accordion",
    name: "Accordion",
    description: "Monospace FAQ module with 4px black border.",
    Preview: AccordionPreview,
    code: neobrutalistCode.accordion,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: "Sharp rectangular yellow tooltip.",
    Preview: TooltipPreview,
    code: neobrutalistCode.tooltip,
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "Blocky tab switcher with yellow active state.",
    Preview: TabsPreview,
    code: neobrutalistCode.tabs,
  },
  {
    id: "dropdown",
    name: "Dropdown menu",
    description: "Yellow-backed floating menu with sharp hover states.",
    Preview: DropdownPreview,
    code: neobrutalistCode.dropdown,
  },
  {
    id: "switch",
    name: "Toggle / Switch",
    description: "High contrast rectangular toggle switch.",
    Preview: SwitchPreview,
    code: neobrutalistCode.switch,
  },
  {
    id: "skeleton",
    name: "Skeleton loader",
    description: "Thick-bordered yellow pulsing loader blocks.",
    Preview: SkeletonPreview,
    code: neobrutalistCode.skeleton,
  },
  {
    id: "toast",
    name: "Toast / Notification",
    description: "Cyan pop alert toast with 4px border.",
    Preview: ToastPreview,
    code: neobrutalistCode.toast,
  },
  {
    id: "progress",
    name: "Progress bar",
    description: "Chunky progress track with orange fill.",
    Preview: ProgressPreview,
    code: neobrutalistCode.progress,
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "Square initial badge with 4px border black.",
    Preview: AvatarPreview,
    code: neobrutalistCode.avatar,
  },
];

export const NEOBRUTALIST_BUNDLE: StyleBundle = {
  stage: (m) => neobrutalist(m).stage,
  text: (m) => neobrutalist(m).text,
  defs: NEOBRUTALIST_DEFS,
};
