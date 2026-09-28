import type { ComponentDef, StyleBundle } from "@/lib/styles/types";
import { editorial } from "./kit";
import { editorialCode } from "./code";
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

export const EDITORIAL_DEFS: ComponentDef[] = [
  {
    id: "button",
    name: "Button",
    description: "Cream paper and rich ink black button with italic serif font.",
    Preview: ButtonPreview,
    code: editorialCode.button,
  },
  {
    id: "card",
    name: "Card",
    description: "Longform article card with issue number, italic quote, and subtle borders.",
    Preview: CardPreview,
    code: editorialCode.card,
  },
  {
    id: "navbar",
    name: "Navbar",
    description: "Classic newspaper masthead with established date, centered links, and rules.",
    Preview: NavbarPreview,
    code: editorialCode.navbar,
  },
  {
    id: "input",
    name: "Input field",
    description: "Underlined serif text input with publication subscription label.",
    Preview: InputPreview,
    code: editorialCode.input,
  },
  {
    id: "badge",
    name: "Badge / Tag",
    description: "Soft gray and outlined editorial tags with italic serif typography.",
    Preview: BadgePreview,
    code: editorialCode.badge,
  },
  {
    id: "modal",
    name: "Modal",
    description: "Elegantly padded membership invitation dialog with thin rules.",
    Preview: ModalPreview,
    code: editorialCode.modal,
  },
  {
    id: "accordion",
    name: "Accordion",
    description: "FAQ container with thin divider rules and serif headline titles.",
    Preview: AccordionPreview,
    code: editorialCode.accordion,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: "Single-line citation badge with thin ink outline.",
    Preview: TooltipPreview,
    code: editorialCode.tooltip,
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "Underlined serif section switcher with active bottom border.",
    Preview: TabsPreview,
    code: editorialCode.tabs,
  },
  {
    id: "dropdown",
    name: "Dropdown menu",
    description: "Floating genre filter menu with italic item hover states.",
    Preview: DropdownPreview,
    code: editorialCode.dropdown,
  },
  {
    id: "switch",
    name: "Toggle / Switch",
    description: "Square-edged toggle for reading typography preferences.",
    Preview: SwitchPreview,
    code: editorialCode.switch,
  },
  {
    id: "skeleton",
    name: "Skeleton loader",
    description: "Soft warm gray text line placeholders for loading articles.",
    Preview: SkeletonPreview,
    code: editorialCode.skeleton,
  },
  {
    id: "toast",
    name: "Toast / Notification",
    description: "Left ink border dispatch notification with italic body text.",
    Preview: ToastPreview,
    code: editorialCode.toast,
  },
  {
    id: "progress",
    name: "Progress bar",
    description: "Thin 1px reading progress bar with italic percentage label.",
    Preview: ProgressPreview,
    code: editorialCode.progress,
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "Monogram author initial badge with serif editorial title.",
    Preview: AvatarPreview,
    code: editorialCode.avatar,
  },
];

export const EDITORIAL_BUNDLE: StyleBundle = {
  stage: (m) => editorial(m).stage,
  text: (m) => editorial(m).text,
  defs: EDITORIAL_DEFS,
};
