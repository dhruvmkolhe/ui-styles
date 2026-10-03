import React from "react"
import type { ComponentDef, Mode, StyleSlug } from "@/lib/styles/types"
import {
  ConversationListPreview,
  UserPresencePreview,
  VideoCallControlsPreview,
  ActivityFeedPreview,
  CommentThreadPreview,
  ReviewFeedbackPanelPreview,
  DiffViewerPreview,
  TerminalEmulatorPreview,
  LogViewerPreview,
  JSONViewerPreview,
} from "./common-collab-previews"
import { getCollabCodeForStyle } from "./common-collab-code"

export function getCommonCollaborationDefs(slug: StyleSlug): ComponentDef[] {
  return [
    {
      id: "conversation-list",
      name: "Conversation List",
      description: "Browse chats and channels with search filtering, unread badges, presence, and selection.",
      Preview: ({ mode }: { mode: Mode }) => <ConversationListPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getCollabCodeForStyle(slug, "conversation-list", mode),
    },
    {
      id: "user-presence",
      name: "User Presence",
      description: "Configurable presence states (online, busy, away, offline, meeting) in badge, pill, and detailed modes.",
      Preview: ({ mode }: { mode: Mode }) => <UserPresencePreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getCollabCodeForStyle(slug, "user-presence", mode),
    },
    {
      id: "video-call-controls",
      name: "Video Call Controls",
      description: "Meeting dock with mute, camera, screen-share, hand raise, and safe simulation indicators.",
      Preview: ({ mode }: { mode: Mode }) => <VideoCallControlsPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getCollabCodeForStyle(slug, "video-call-controls", mode),
    },
    {
      id: "activity-feed",
      name: "Activity Feed",
      description: "Chronological event timeline for commits, PR reviews, deployments, comments, and releases.",
      Preview: ({ mode }: { mode: Mode }) => <ActivityFeedPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getCollabCodeForStyle(slug, "activity-feed", mode),
    },
    {
      id: "comment-thread",
      name: "Comment Thread",
      description: "Nested discussion threads with multi-level replies, inline editing, deletion, and reactions.",
      Preview: ({ mode }: { mode: Mode }) => <CommentThreadPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getCollabCodeForStyle(slug, "comment-thread", mode),
    },
    {
      id: "review-feedback-panel",
      name: "Review / Feedback Panel",
      description: "Collect technical ratings and reviews with criteria breakdown, tags, and validation feedback.",
      Preview: ({ mode }: { mode: Mode }) => <ReviewFeedbackPanelPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getCollabCodeForStyle(slug, "review-feedback-panel", mode),
    },
    {
      id: "diff-viewer",
      name: "Diff Viewer",
      description: "Compare code or text changes cleanly with split side-by-side and unified inline modes.",
      Preview: ({ mode }: { mode: Mode }) => <DiffViewerPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getCollabCodeForStyle(slug, "diff-viewer", mode),
    },
    {
      id: "terminal-emulator",
      name: "Terminal Emulator",
      description: "Interactive sandboxed terminal with safe built-in commands, history navigation, and ANSI styling.",
      Preview: ({ mode }: { mode: Mode }) => <TerminalEmulatorPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getCollabCodeForStyle(slug, "terminal-emulator", mode),
    },
    {
      id: "log-viewer",
      name: "Log Viewer",
      description: "Filter and inspect application logs with search, severity levels, auto-scroll, and metadata JSON.",
      Preview: ({ mode }: { mode: Mode }) => <LogViewerPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getCollabCodeForStyle(slug, "log-viewer", mode),
    },
    {
      id: "json-viewer",
      name: "JSON Viewer",
      description: "Expandable/collapsible JSON tree inspector with syntax colors, search, and raw error handling.",
      Preview: ({ mode }: { mode: Mode }) => <JSONViewerPreview slug={slug} mode={mode} />,
      code: (mode: Mode) => getCollabCodeForStyle(slug, "json-viewer", mode),
    },
  ]
}
