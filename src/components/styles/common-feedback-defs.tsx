import React from "react";
import type { ComponentDef, Mode, StyleSlug } from "@/lib/styles/types";
import {
  AlertPreview,
  ConfirmationDialogPreview,
  AlertDialogPreview,
  LoadingOverlayPreview,
  EmptyStatePreview,
  ErrorStatePreview,
  SuccessStatePreview,
  CalloutPreview,
  NotificationCenterPreview,
  CookieBannerPreview,
} from "./common-feedback-previews";
import { getFeedbackCodeForStyle } from "./common-feedback-code";

export function getCommonFeedbackDefs(slug: StyleSlug): ComponentDef[] {
  return [
    {
      id: "alert",
      name: "Alert / Banner",
      description:
        "Contextual messages with informational, success, warning, and destructive variants. Supports card and full-width banner formats with accessible dismiss action.",
      Preview: ({ mode }: { mode: Mode }) => <AlertPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getFeedbackCodeForStyle(slug, "alert", mode),
    },
    {
      id: "confirmation-dialog",
      name: "Confirmation Dialog",
      description:
        "Accessible modal dialog for verifying user actions with focus trap, loading submission state, backdrop dismissal, and focus restoration.",
      Preview: ({ mode }: { mode: Mode }) => <ConfirmationDialogPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getFeedbackCodeForStyle(slug, "confirmation-dialog", mode),
    },
    {
      id: "alert-dialog",
      name: "Alert Dialog",
      description:
        "Modal alert dialog with role='alertdialog' semantics, safe cancel-first focus management, and destructive action protections.",
      Preview: ({ mode }: { mode: Mode }) => <AlertDialogPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getFeedbackCodeForStyle(slug, "alert-dialog", mode),
    },
    {
      id: "loading-overlay",
      name: "Loading Overlay",
      description:
        "Blocking indicator overlay with spinner, custom messages, aria-busy status, and backdrop blur for long-running operations.",
      Preview: ({ mode }: { mode: Mode }) => <LoadingOverlayPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getFeedbackCodeForStyle(slug, "loading-overlay", mode),
    },
    {
      id: "empty-state",
      name: "Empty State",
      description:
        "Reusable zero-data view with iconography, title, descriptive hint, and primary/secondary call-to-action buttons.",
      Preview: ({ mode }: { mode: Mode }) => <EmptyStatePreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getFeedbackCodeForStyle(slug, "empty-state", mode),
    },
    {
      id: "error-state",
      name: "Error State",
      description:
        "Failure state boundary with retry action, simulated loading during retry, role='alert', and collapsible technical error details disclosure.",
      Preview: ({ mode }: { mode: Mode }) => <ErrorStatePreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getFeedbackCodeForStyle(slug, "error-state", mode),
    },
    {
      id: "success-state",
      name: "Success State",
      description:
        "Positive completion feedback with animated checkmark badge, key-value receipt details summary, and next-step actions.",
      Preview: ({ mode }: { mode: Mode }) => <SuccessStatePreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getFeedbackCodeForStyle(slug, "success-state", mode),
    },
    {
      id: "callout",
      name: "Callout",
      description:
        "Contextual aside with editorial left-accent border, tips, warning notes, and optional dismiss action.",
      Preview: ({ mode }: { mode: Mode }) => <CalloutPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getFeedbackCodeForStyle(slug, "callout", mode),
    },
    {
      id: "notification-center",
      name: "Notification Center",
      description:
        "Notification drawer with unread tracking, filter tabs (All/Unread), mark all read, individual dismissal, and badge counters.",
      Preview: ({ mode }: { mode: Mode }) => <NotificationCenterPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getFeedbackCodeForStyle(slug, "notification-center", mode),
    },
    {
      id: "cookie-banner",
      name: "Cookie Banner",
      description:
        "Consent compliance banner with granular category preferences, persistent localStorage state, and responsive layouts.",
      Preview: ({ mode }: { mode: Mode }) => <CookieBannerPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getFeedbackCodeForStyle(slug, "cookie-banner", mode),
    },
  ];
}
