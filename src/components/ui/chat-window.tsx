"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  MessageSquare,
  Search,
  Phone,
  Video,
  MoreVertical,
  Bot,
  User,
  CheckCircle2,
  Trash2,
  Sparkles,
} from "lucide-react"
import { ChatMessage, type ChatMessageData } from "@/components/ui/chat-message"
import { ChatComposer } from "@/components/ui/chat-composer"
import { TypingIndicator } from "@/components/ui/typing-indicator"

export interface ChatParticipant {
  id: string
  name: string
  avatar?: string
  status?: "online" | "away" | "offline"
  role?: string
}

export interface ChatWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  participant?: ChatParticipant
  initialMessages?: ChatMessageData[]
  currentUserId?: string
  onSendMessage?: (content: string, attachments?: File[]) => void
  simulateReplies?: boolean
  readOnly?: boolean
}

export const ChatWindow = React.forwardRef<HTMLDivElement, ChatWindowProps>(
  (
    {
      className,
      title = "Engineering Design Sync",
      participant = {
        id: "sarah",
        name: "Sarah Chen",
        status: "online",
        role: "Design System Lead",
      },
      initialMessages = [
        {
          id: "m-1",
          sender: { id: "sarah", name: "Sarah Chen", role: "Design Lead" },
          content: "Hey Dhruv! Did you review the Batch 12 Scheduling & Workflow components?",
          timestamp: "10:14 AM",
          status: "read",
        },
        {
          id: "m-2",
          sender: { id: "me", name: "Dhruv Kolhe", role: "VP Engineering" },
          content: "Yes! All 10 components are built with zero foreign dependencies and WAI-ARIA support.",
          timestamp: "10:16 AM",
          status: "read",
        },
        {
          id: "m-3",
          sender: { id: "sarah", name: "Sarah Chen", role: "Design Lead" },
          content: "Amazing work. The Gantt Chart and Dependency Graph cycle detection look super clean.",
          timestamp: "10:18 AM",
          status: "read",
        },
      ],
      currentUserId = "me",
      onSendMessage,
      simulateReplies = true,
      readOnly = false,
      ...props
    },
    ref
  ) => {
    const [messages, setMessages] = React.useState<ChatMessageData[]>(initialMessages)
    const [isTyping, setIsTyping] = React.useState(false)
    const [searchTerm, setSearchTerm] = React.useState("")
    const [isSearching, setIsSearching] = React.useState(false)
    const messagesEndRef = React.useRef<HTMLDivElement | null>(null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    React.useEffect(() => {
      scrollToBottom()
    }, [messages, isTyping])

    const handleSend = (text: string, files: File[]) => {
      const nowStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      const newMsg: ChatMessageData = {
        id: `msg-${Date.now()}`,
        sender: { id: currentUserId, name: "Dhruv Kolhe", role: "You" },
        content: text,
        timestamp: nowStr,
        status: "delivered",
        attachments: files.map((f, i) => ({
          id: `att-${Date.now()}-${i}`,
          name: f.name,
          size: f.size,
          type: f.type.startsWith("image/") ? "image" : "file",
        })),
      }

      setMessages((prev) => [...prev, newMsg])
      onSendMessage?.(text, files)

      // Simulated partner response
      if (simulateReplies && !readOnly) {
        setIsTyping(true)
        setTimeout(() => {
          setIsTyping(false)
          const replyMsg: ChatMessageData = {
            id: `reply-${Date.now()}`,
            sender: participant,
            content: `Thanks for the update on "${text.slice(0, 30)}${text.length > 30 ? "..." : ""}"! I will verify the changes in the gallery.`,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            status: "delivered",
          }
          setMessages((prev) => [...prev, replyMsg])
        }, 1800)
      }
    }

    const filteredMessages = React.useMemo(() => {
      if (!searchTerm) return messages
      return messages.filter((m) =>
        m.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }, [messages, searchTerm])

    const handleDeleteMessage = (id: string) => {
      setMessages((prev) => prev.filter((m) => m.id !== id))
    }

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Chat Conversation Window"
        className={cn(
          "flex flex-col h-[560px] rounded-xl border border-border bg-card text-card-foreground shadow-xs overflow-hidden select-none",
          className
        )}
        {...props}
      >
        {/* Chat Window Header */}
        <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/20 p-3 sm:px-4 shrink-0">
          <div className="flex items-center gap-2.5 truncate">
            {/* Status avatar */}
            <div className="relative shrink-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-primary/10 text-xs font-bold text-primary uppercase">
                {participant.name.slice(0, 2)}
              </div>
              {participant.status === "online" && (
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
              )}
            </div>

            <div className="truncate">
              <h3 className="text-xs font-bold text-foreground truncate">{title}</h3>
              <p className="text-[10px] text-muted-foreground flex items-center gap-1.5 truncate">
                <span>{participant.name}</span>
                {participant.role && <span>• {participant.role}</span>}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 text-muted-foreground shrink-0">
            <button
              type="button"
              onClick={() => setIsSearching(!isSearching)}
              title="Search conversation"
              aria-label="Search conversation"
              className={cn(
                "rounded-lg p-1.5 hover:bg-muted hover:text-foreground transition-colors",
                isSearching && "bg-accent text-accent-foreground"
              )}
            >
              <Search className="h-4 w-4" />
            </button>

            <button
              type="button"
              title="Voice call"
              aria-label="Voice call"
              className="rounded-lg p-1.5 hover:bg-muted hover:text-foreground transition-colors hidden sm:inline-flex"
            >
              <Phone className="h-4 w-4" />
            </button>

            <button
              type="button"
              title="Video call"
              aria-label="Video call"
              className="rounded-lg p-1.5 hover:bg-muted hover:text-foreground transition-colors hidden sm:inline-flex"
            >
              <Video className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Search Bar Input (toggled) */}
        {isSearching && (
          <div className="p-2 border-b border-border bg-muted/30">
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter messages in conversation..."
              className="h-8 w-full rounded-md border border-input bg-background px-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        )}

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 bg-card/60 scrollbar-thin">
          {/* Day separator badge */}
          <div className="flex items-center justify-center my-2 select-none">
            <span className="rounded-full bg-muted/60 px-3 py-0.5 text-[10px] font-mono text-muted-foreground border border-border/40">
              Today • Local Simulated Session
            </span>
          </div>

          {/* Messages stream */}
          {filteredMessages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              isOutgoing={msg.sender.id === currentUserId}
              onDelete={handleDeleteMessage}
            />
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="py-1">
              <TypingIndicator
                active
                name={participant.name}
                avatar={participant.avatar}
                variant="bubble"
              />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Message Composer Area */}
        <div className="p-3 border-t border-border bg-card/90">
          <ChatComposer
            onSend={handleSend}
            disabled={readOnly}
            placeholder={`Message ${participant.name}...`}
          />
        </div>
      </div>
    )
  }
)
ChatWindow.displayName = "ChatWindow"
