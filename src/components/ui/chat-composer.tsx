"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Send,
  Paperclip,
  Smile,
  X,
  FileText,
  Image as ImageIcon,
  Mic,
} from "lucide-react"

export interface ChatComposerAttachment {
  id: string
  file: File
  name: string
  size: number
  type: string
}

export interface ChatComposerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSend"> {
  onSend: (text: string, attachments: File[]) => void
  placeholder?: string
  disabled?: boolean
  maxFiles?: number
  acceptedFileTypes?: string
  onTypingChange?: (isTyping: boolean) => void
  onEmojiClick?: () => void
}

export const ChatComposer = React.forwardRef<HTMLDivElement, ChatComposerProps>(
  (
    {
      className,
      onSend,
      placeholder = "Type a message... (Press Enter to send, Shift+Enter for new line)",
      disabled = false,
      maxFiles = 5,
      acceptedFileTypes = "image/*,.pdf,.doc,.docx,.txt",
      onTypingChange,
      onEmojiClick,
      ...props
    },
    ref
  ) => {
    const [text, setText] = React.useState("")
    const [attachments, setAttachments] = React.useState<ChatComposerAttachment[]>([])
    const fileInputRef = React.useRef<HTMLInputElement | null>(null)
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)
    const typingTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = e.target.value
      setText(val)

      // Notify typing state
      if (onTypingChange) {
        onTypingChange(true)
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
        typingTimeoutRef.current = setTimeout(() => {
          onTypingChange(false)
        }, 1500)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || [])
      if (files.length === 0) return

      const newAtts: ChatComposerAttachment[] = files.slice(0, maxFiles - attachments.length).map((f) => ({
        id: `att-${Date.now()}-${Math.random()}`,
        file: f,
        name: f.name,
        size: f.size,
        type: f.type,
      }))

      setAttachments((prev) => [...prev, ...newAtts])
      if (fileInputRef.current) fileInputRef.current.value = ""
    }

    const removeAttachment = (id: string) => {
      setAttachments((prev) => prev.filter((a) => a.id !== id))
    }

    const handleSend = () => {
      const trimmed = text.trim()
      if (!trimmed && attachments.length === 0) return
      if (disabled) return

      const files = attachments.map((a) => a.file)
      onSend(trimmed, files)
      setText("")
      setAttachments([])
      if (onTypingChange) onTypingChange(false)
    }

    const canSend = text.trim().length > 0 || attachments.length > 0

    return (
      <div
        ref={ref}
        role="form"
        aria-label="Message Composer"
        className={cn(
          "flex flex-col rounded-xl border border-border bg-card p-2 sm:p-2.5 shadow-xs transition-colors focus-within:border-primary/60",
          disabled && "opacity-50 pointer-events-none",
          className
        )}
        {...props}
      >
        {/* Attachment chips row */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-border/50 mb-2">
            {attachments.map((att) => (
              <div
                key={att.id}
                className="flex items-center gap-1.5 rounded-lg border border-border bg-muted/60 pl-2 pr-1 py-1 text-[11px]"
              >
                {att.type.startsWith("image/") ? (
                  <ImageIcon className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                ) : (
                  <FileText className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                )}
                <span className="truncate max-w-[120px] font-medium text-foreground">
                  {att.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeAttachment(att.id)}
                  aria-label={`Remove attachment ${att.name}`}
                  className="rounded p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Text Input Row */}
        <textarea
          ref={textareaRef}
          rows={2}
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full resize-none bg-transparent px-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none scrollbar-none"
        />

        {/* Bottom Action Bar */}
        <div className="flex items-center justify-between pt-1 select-none">
          <div className="flex items-center gap-1">
            {/* Hidden native file input */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={acceptedFileTypes}
              onChange={handleFileSelect}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Attach files"
              aria-label="Attach files"
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Paperclip className="h-4 w-4" />
            </button>

            {onEmojiClick && (
              <button
                type="button"
                onClick={onEmojiClick}
                title="Insert emoji"
                aria-label="Insert emoji"
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <Smile className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground font-mono hidden sm:inline">
              Return ↵
            </span>

            <button
              type="button"
              disabled={!canSend || disabled}
              onClick={handleSend}
              aria-label="Send message"
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-lg transition-all",
                canSend && !disabled
                  ? "bg-primary text-primary-foreground shadow-2xs hover:bg-primary/90 scale-100"
                  : "bg-muted text-muted-foreground opacity-40 cursor-not-allowed"
              )}
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    )
  }
)
ChatComposer.displayName = "ChatComposer"
