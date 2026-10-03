"use client"

import React from "react"
import type { Mode, StyleSlug } from "@/lib/styles/types"
import { ConversationList } from "@/components/ui/conversation-list"
import { UserPresence } from "@/components/ui/user-presence"
import { VideoCallControls } from "@/components/ui/video-call-controls"
import { ActivityFeed } from "@/components/ui/activity-feed"
import { CommentThread } from "@/components/ui/comment-thread"
import { ReviewFeedbackPanel } from "@/components/ui/review-feedback-panel"
import { DiffViewer } from "@/components/ui/diff-viewer"
import { TerminalEmulator } from "@/components/ui/terminal-emulator"
import { LogViewer } from "@/components/ui/log-viewer"
import { JSONViewer } from "@/components/ui/json-viewer"

interface PreviewProps {
  slug: StyleSlug
  mode: Mode
}

export function ConversationListPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full flex justify-center p-2">
      <ConversationList className="w-full max-w-sm" />
    </div>
  )
}

export function UserPresencePreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full flex flex-col items-center gap-4 p-2">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <UserPresence status="online" variant="pill" />
        <UserPresence status="busy" variant="pill" />
        <UserPresence status="away" variant="pill" />
        <UserPresence status="in-meeting" variant="pill" />
      </div>
      <UserPresence
        status="online"
        variant="detailed"
        userName="Dhruv Kolhe"
        userRole="Staff Architect"
        customMessage="Reviewing Batch 13 Collaboration & DevTools"
        className="w-full max-w-md"
      />
    </div>
  )
}

export function VideoCallControlsPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <VideoCallControls />
    </div>
  )
}

export function ActivityFeedPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full flex justify-center p-2">
      <ActivityFeed className="w-full max-w-md" />
    </div>
  )
}

export function CommentThreadPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full flex justify-center p-2">
      <CommentThread className="w-full max-w-lg" />
    </div>
  )
}

export function ReviewFeedbackPanelPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full flex justify-center p-2">
      <ReviewFeedbackPanel className="w-full max-w-lg" />
    </div>
  )
}

export function DiffViewerPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <DiffViewer />
    </div>
  )
}

export function TerminalEmulatorPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <TerminalEmulator />
    </div>
  )
}

export function LogViewerPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <LogViewer />
    </div>
  )
}

export function JSONViewerPreview({ slug, mode }: PreviewProps) {
  return (
    <div className="w-full p-2">
      <JSONViewer />
    </div>
  )
}
