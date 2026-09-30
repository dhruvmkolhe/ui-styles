import React from "react";
import type { ComponentDef, Mode, StyleSlug } from "@/lib/styles/types";
import {
  BreadcrumbPreview,
  PaginationPreview,
  SidebarPreview,
  NavigationMenuPreview,
  MenuBarPreview,
  StepperPreview,
  BottomNavigationPreview,
  CommandMenuPreview,
  LinkPreview,
  BackToTopPreview,
} from "./common-navigation-previews";
import { getNavigationCodeForStyle } from "./common-navigation-code";

export function getCommonNavigationDefs(slug: StyleSlug): ComponentDef[] {
  return [
    {
      id: "breadcrumb",
      name: "Breadcrumb",
      description:
        "Semantic trail navigation with links, custom separators, responsive ellipsis collapse, and aria-current='page' semantics.",
      Preview: ({ mode }: { mode: Mode }) => <BreadcrumbPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getNavigationCodeForStyle(slug, "breadcrumb", mode),
    },
    {
      id: "pagination",
      name: "Pagination",
      description:
        "Configurable page switcher with range ellipsis, first/last jumps, accessible labels, and mobile responsive controls.",
      Preview: ({ mode }: { mode: Mode }) => <PaginationPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getNavigationCodeForStyle(slug, "pagination", mode),
    },
    {
      id: "sidebar",
      name: "Sidebar",
      description:
        "Collapsible navigation drawer with nested submenus, mobile slide-out overlay, badges, active item states, and focus trap.",
      Preview: ({ mode }: { mode: Mode }) => <SidebarPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getNavigationCodeForStyle(slug, "sidebar", mode),
    },
    {
      id: "navigation-menu",
      name: "Navigation Menu",
      description:
        "Accessible site navigation with dropdown content panels, active state indicators, and full keyboard arrow accessibility.",
      Preview: ({ mode }: { mode: Mode }) => <NavigationMenuPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getNavigationCodeForStyle(slug, "navigation-menu", mode),
    },
    {
      id: "menu-bar",
      name: "Menu Bar",
      description:
        "Application-grade horizontal menu bar with nested cascading submenus, keyboard shortcuts, and ARIA menubar semantics.",
      Preview: ({ mode }: { mode: Mode }) => <MenuBarPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getNavigationCodeForStyle(slug, "menu-bar", mode),
    },
    {
      id: "stepper",
      name: "Stepper",
      description:
        "Process wizard with completed checkmarks, current highlights, error states, and responsive orientation modes.",
      Preview: ({ mode }: { mode: Mode }) => <StepperPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getNavigationCodeForStyle(slug, "stepper", mode),
    },
    {
      id: "bottom-navigation",
      name: "Bottom Navigation",
      description:
        "Mobile app bottom dock with badge indicators, safe-area padding, and accessible aria-current destination markers.",
      Preview: ({ mode }: { mode: Mode }) => <BottomNavigationPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getNavigationCodeForStyle(slug, "bottom-navigation", mode),
    },
    {
      id: "command-menu",
      name: "Command Menu",
      description:
        "Command palette modal with instant search filtering, keyboard roving focus, categories, and shortcut triggers.",
      Preview: ({ mode }: { mode: Mode }) => <CommandMenuPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getNavigationCodeForStyle(slug, "command-menu", mode),
    },
    {
      id: "link",
      name: "Link",
      description:
        "Polymorphic anchor with automatic external target/rel detection, visual underline styles, and accessible focus rings.",
      Preview: ({ mode }: { mode: Mode }) => <LinkPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getNavigationCodeForStyle(slug, "link", mode),
    },
    {
      id: "back-to-top",
      name: "Back to Top",
      description:
        "Floating action button with scroll threshold visibility, smooth scrolling animation, and accessible label.",
      Preview: ({ mode }: { mode: Mode }) => <BackToTopPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getNavigationCodeForStyle(slug, "back-to-top", mode),
    },
  ];
}
