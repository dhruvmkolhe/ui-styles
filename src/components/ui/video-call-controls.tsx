"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  ScreenShare,
  ScreenShareOff,
  Hand,
  MessageSquare,
  Users,
  Settings,
  PhoneOff,
  MoreVertical,
  Volume2,
  Info,
} from "lucide-react"

export interface VideoCallControlsProps extends React.HTMLAttributes<HTMLDivElement> {
  initialMuted?: boolean
  initialVideoOff?: boolean
  initialScreenSharing?: boolean
  initialHandRaised?: boolean
  callDuration?: string
  roomName?: string
  participantCount?: number
  onToggleMic?: (muted: boolean) => void
  onToggleVideo?: (videoOff: boolean) => void
  onToggleScreenShare?: (sharing: boolean) => void
  onToggleHand?: (raised: boolean) => void
  onToggleChat?: () => void
  onToggleParticipants?: () => void
  onEndCall?: () => void
  disabled?: boolean
  compact?: boolean
}

export const VideoCallControls = React.forwardRef<HTMLDivElement, VideoCallControlsProps>(
  (
    {
      className,
      initialMuted = false,
      initialVideoOff = false,
      initialScreenSharing = false,
      initialHandRaised = false,
      callDuration = "24:18",
      roomName = "Design Systems Sync",
      participantCount = 6,
      onToggleMic,
      onToggleVideo,
      onToggleScreenShare,
      onToggleHand,
      onToggleChat,
      onToggleParticipants,
      onEndCall,
      disabled = false,
      compact = false,
      ...props
    },
    ref
  ) => {
    const [isMuted, setIsMuted] = React.useState(initialMuted)
    const [isVideoOff, setIsVideoOff] = React.useState(initialVideoOff)
    const [isScreenSharing, setIsScreenSharing] = React.useState(initialScreenSharing)
    const [isHandRaised, setIsHandRaised] = React.useState(initialHandRaised)
    const [chatOpen, setChatOpen] = React.useState(false)
    const [participantsOpen, setParticipantsOpen] = React.useState(false)
    const [callEnded, setCallEnded] = React.useState(false)

    const handleMicToggle = () => {
      if (disabled || callEnded) return
      const next = !isMuted
      setIsMuted(next)
      onToggleMic?.(next)
    }

    const handleVideoToggle = () => {
      if (disabled || callEnded) return
      const next = !isVideoOff
      setIsVideoOff(next)
      onToggleVideo?.(next)
    }

    const handleScreenShareToggle = () => {
      if (disabled || callEnded) return
      const next = !isScreenSharing
      setIsScreenSharing(next)
      onToggleScreenShare?.(next)
    }

    const handleHandToggle = () => {
      if (disabled || callEnded) return
      const next = !isHandRaised
      setIsHandRaised(next)
      onToggleHand?.(next)
    }

    const handleEndCall = () => {
      if (disabled) return
      setCallEnded(true)
      onEndCall?.()
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-2xl mx-auto rounded-2xl border border-border bg-card/95 backdrop-blur-md shadow-lg overflow-hidden flex flex-col items-center text-card-foreground",
          disabled && "opacity-60 pointer-events-none",
          className
        )}
        {...props}
      >
        {/* Header bar with Room Name, Duration & Safe Simulation notice */}
        <div className="w-full px-4 py-2.5 border-b border-border bg-muted/40 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-foreground">{roomName}</span>
            <span className="font-mono text-muted-foreground">({callDuration})</span>
          </div>

          {/* Explicit client simulation disclaimer badge */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[11px] font-medium">
            <Info className="h-3 w-3 shrink-0" />
            <span>Simulated Call UI (No real hardware access)</span>
          </div>
        </div>

        {/* Video / Call State Stage Indicator */}
        <div className="w-full p-4 bg-background/50 flex flex-col items-center justify-center min-h-[140px] text-center border-b border-border/50">
          {callEnded ? (
            <div className="space-y-1">
              <p className="text-sm font-semibold text-rose-500">Call Ended</p>
              <p className="text-xs text-muted-foreground">You left the session.</p>
              <button
                type="button"
                onClick={() => setCallEnded(false)}
                className="mt-2 text-xs font-semibold text-primary underline underline-offset-4"
              >
                Rejoin Simulated Call
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <div className="relative">
                <div className="h-16 w-16 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center font-bold text-lg text-primary">
                  DK
                </div>
                {isMuted && (
                  <span
                    className="absolute -bottom-1 -right-1 p-1 rounded-full bg-rose-500 text-white shadow-xs"
                    title="Microphone muted"
                  >
                    <MicOff className="h-3.5 w-3.5" />
                  </span>
                )}
                {isHandRaised && (
                  <span
                    className="absolute -top-1 -right-1 p-1 rounded-full bg-amber-500 text-white shadow-xs animate-bounce"
                    title="Hand is raised"
                  >
                    <Hand className="h-3.5 w-3.5" />
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Dhruv Kolhe (You)</span>
                <span>•</span>
                <span>Camera: {isVideoOff ? "Off" : "Active"}</span>
                <span>•</span>
                <span>Screen Share: {isScreenSharing ? "Presenting" : "Off"}</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Control Dock / Toolbar */}
        <div
          role="toolbar"
          aria-label="Video call controls"
          className="w-full p-3 px-4 flex flex-wrap items-center justify-center sm:justify-between gap-3 bg-card"
        >
          {/* Left quick indicators */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
            <Volume2 className="h-4 w-4" />
            <span>High Quality Audio</span>
          </div>

          {/* Center main action buttons */}
          <div className="flex items-center gap-2">
            {/* 1. Mic button */}
            <button
              type="button"
              aria-label={isMuted ? "Unmute microphone" : "Mute microphone"}
              aria-pressed={!isMuted}
              onClick={handleMicToggle}
              className={cn(
                "p-3 rounded-full transition-all shadow-xs focus:outline-hidden focus:ring-2 focus:ring-ring",
                isMuted
                  ? "bg-rose-500 hover:bg-rose-600 text-white"
                  : "bg-muted hover:bg-accent text-foreground"
              )}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <MicOff className="h-4.5 w-4.5" /> : <Mic className="h-4.5 w-4.5" />}
            </button>

            {/* 2. Video button */}
            <button
              type="button"
              aria-label={isVideoOff ? "Turn on camera" : "Turn off camera"}
              aria-pressed={!isVideoOff}
              onClick={handleVideoToggle}
              className={cn(
                "p-3 rounded-full transition-all shadow-xs focus:outline-hidden focus:ring-2 focus:ring-ring",
                isVideoOff
                  ? "bg-rose-500 hover:bg-rose-600 text-white"
                  : "bg-muted hover:bg-accent text-foreground"
              )}
              title={isVideoOff ? "Turn on camera" : "Turn off camera"}
            >
              {isVideoOff ? <VideoOff className="h-4.5 w-4.5" /> : <Video className="h-4.5 w-4.5" />}
            </button>

            {/* 3. Screen Share button */}
            <button
              type="button"
              aria-label={isScreenSharing ? "Stop sharing screen" : "Share screen"}
              aria-pressed={isScreenSharing}
              onClick={handleScreenShareToggle}
              className={cn(
                "p-3 rounded-full transition-all shadow-xs focus:outline-hidden focus:ring-2 focus:ring-ring",
                isScreenSharing
                  ? "bg-teal-600 hover:bg-teal-700 text-white"
                  : "bg-muted hover:bg-accent text-foreground"
              )}
              title={isScreenSharing ? "Stop sharing" : "Share screen"}
            >
              {isScreenSharing ? (
                <ScreenShareOff className="h-4.5 w-4.5" />
              ) : (
                <ScreenShare className="h-4.5 w-4.5" />
              )}
            </button>

            {/* 4. Raise Hand button */}
            <button
              type="button"
              aria-label={isHandRaised ? "Lower hand" : "Raise hand"}
              aria-pressed={isHandRaised}
              onClick={handleHandToggle}
              className={cn(
                "p-3 rounded-full transition-all shadow-xs focus:outline-hidden focus:ring-2 focus:ring-ring",
                isHandRaised
                  ? "bg-amber-500 hover:bg-amber-600 text-white"
                  : "bg-muted hover:bg-accent text-foreground"
              )}
              title={isHandRaised ? "Lower hand" : "Raise hand"}
            >
              <Hand className="h-4.5 w-4.5" />
            </button>

            {/* 5. End Call button */}
            <button
              type="button"
              aria-label="End call"
              onClick={handleEndCall}
              className="p-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white transition-all shadow-md ml-1 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
              title="Leave call"
            >
              <PhoneOff className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Right auxiliary buttons (chat, participants, settings) */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Toggle participants panel"
              aria-pressed={participantsOpen}
              onClick={() => {
                const next = !participantsOpen
                setParticipantsOpen(next)
                onToggleParticipants?.()
              }}
              className={cn(
                "p-2.5 rounded-lg transition-colors relative focus:outline-hidden",
                participantsOpen
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              title="Participants"
            >
              <Users className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 text-[9px] bg-primary text-primary-foreground font-bold px-1 rounded-full">
                {participantCount}
              </span>
            </button>

            <button
              type="button"
              aria-label="Toggle in-call chat"
              aria-pressed={chatOpen}
              onClick={() => {
                const next = !chatOpen
                setChatOpen(next)
                onToggleChat?.()
              }}
              className={cn(
                "p-2.5 rounded-lg transition-colors focus:outline-hidden",
                chatOpen
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              title="Chat"
            >
              <MessageSquare className="h-4 w-4" />
            </button>

            <button
              type="button"
              aria-label="Meeting settings"
              className="p-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus:outline-hidden"
              title="Settings"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    )
  }
)

VideoCallControls.displayName = "VideoCallControls"
