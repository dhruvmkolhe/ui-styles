"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface MentionUser {
  id: string
  name: string
  username: string
  avatar?: string
  role?: string
}

const DEFAULT_USERS: MentionUser[] = [
  { id: "1", name: "Dhruv Kolhe", username: "dhruvmkolhe", role: "Design Lead" },
  { id: "2", name: "Alex Rivera", username: "arivera", role: "Frontend Eng" },
  { id: "3", name: "Sarah Chen", username: "schen", role: "Product Manager" },
  { id: "4", name: "Marcus Brody", username: "mbrody", role: "Core Systems" },
  { id: "5", name: "Elena Rostova", username: "erostova", role: "UX Designer" },
  { id: "6", name: "Kenji Sato", username: "ksato", role: "DevOps Eng" },
]

export interface MentionInputProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  users?: MentionUser[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onMentionSelect?: (user: MentionUser) => void
  trigger?: string
  multiline?: boolean
  rows?: number
}

export const MentionInput = React.forwardRef<
  HTMLTextAreaElement | HTMLInputElement,
  MentionInputProps
>(
  (
    {
      className,
      users = DEFAULT_USERS,
      value: controlledValue,
      defaultValue = "",
      onChange,
      onMentionSelect,
      trigger = "@",
      multiline = true,
      rows = 3,
      disabled,
      placeholder = "Type @ to mention someone...",
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
    const textValue = isControlled ? controlledValue : uncontrolledValue

    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const [query, setQuery] = React.useState("")
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const [mentionStartIndex, setMentionStartIndex] = React.useState<number | null>(null)

    const inputRef = React.useRef<any>(null)
    const menuRef = React.useRef<HTMLDivElement | null>(null)

    // Filter users matching query
    const filteredUsers = React.useMemo(() => {
      if (!query) return users
      const q = query.toLowerCase()
      return users.filter(
        (u) =>
          u.username.toLowerCase().includes(q) ||
          u.name.toLowerCase().includes(q)
      )
    }, [users, query])

    const handleTextChange = (text: string, selectionEnd: number) => {
      if (!isControlled) {
        setUncontrolledValue(text)
      }
      onChange?.(text)

      // Check if we are right after trigger or in middle of a mention
      const textBeforeCursor = text.slice(0, selectionEnd)
      const lastTriggerIndex = textBeforeCursor.lastIndexOf(trigger)

      if (lastTriggerIndex !== -1) {
        // Ensure there is no space before cursor after the trigger or preceding character is boundary
        const charBeforeTrigger = lastTriggerIndex > 0 ? textBeforeCursor[lastTriggerIndex - 1] : " "
        const textAfterTrigger = textBeforeCursor.slice(lastTriggerIndex + 1)

        if ((charBeforeTrigger === " " || charBeforeTrigger === "\n" || lastTriggerIndex === 0) && !textAfterTrigger.includes(" ")) {
          setMentionStartIndex(lastTriggerIndex)
          setQuery(textAfterTrigger)
          setIsMenuOpen(true)
          setSelectedIndex(0)
          return
        }
      }

      setIsMenuOpen(false)
      setMentionStartIndex(null)
      setQuery("")
    }

    const selectUser = (user: MentionUser) => {
      if (mentionStartIndex === null) return
      const input = inputRef.current
      const cursor = input?.selectionEnd ?? textValue.length

      const beforeMention = textValue.slice(0, mentionStartIndex)
      const afterMention = textValue.slice(cursor)
      const insertedMention = `${trigger}${user.username} `
      const updatedText = beforeMention + insertedMention + afterMention

      if (!isControlled) {
        setUncontrolledValue(updatedText)
      }
      onChange?.(updatedText)
      onMentionSelect?.(user)

      setIsMenuOpen(false)
      setMentionStartIndex(null)
      setQuery("")

      // Restore focus and position cursor after inserted mention
      setTimeout(() => {
        if (input) {
          input.focus()
          const newCursorPos = beforeMention.length + insertedMention.length
          input.setSelectionRange(newCursorPos, newCursorPos)
        }
      }, 0)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!isMenuOpen || filteredUsers.length === 0) return

      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % filteredUsers.length)
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + filteredUsers.length) % filteredUsers.length)
      } else if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault()
        if (filteredUsers[selectedIndex]) {
          selectUser(filteredUsers[selectedIndex])
        }
      } else if (e.key === "Escape") {
        e.preventDefault()
        setIsMenuOpen(false)
      }
    }

    const setMergedRef = (element: any) => {
      inputRef.current = element
      if (typeof ref === "function") ref(element)
      else if (ref) (ref as any).current = element
    }

    return (
      <div className="relative w-full">
        {multiline ? (
          <textarea
            ref={setMergedRef}
            rows={rows}
            value={textValue}
            disabled={disabled}
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            onChange={(e) =>
              handleTextChange(e.target.value, e.target.selectionEnd ?? e.target.value.length)
            }
            className={cn(
              "flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-y",
              className
            )}
            {...(props as any)}
          />
        ) : (
          <input
            ref={setMergedRef}
            type="text"
            value={textValue}
            disabled={disabled}
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            onChange={(e) =>
              handleTextChange(e.target.value, e.target.selectionEnd ?? e.target.value.length)
            }
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            {...(props as any)}
          />
        )}

        {/* Suggestion Dropdown Popup */}
        {isMenuOpen && filteredUsers.length > 0 && (
          <div
            ref={menuRef}
            role="listbox"
            aria-label="Mention candidates"
            className="absolute z-50 left-0 mt-1 max-h-56 w-72 overflow-y-auto rounded-lg border border-border bg-popover p-1 shadow-lg animate-in fade-in-0 zoom-in-95 text-popover-foreground"
          >
            <div className="px-2 py-1 text-[11px] font-semibold text-muted-foreground uppercase">
              Members matching &ldquo;{query}&rdquo;
            </div>
            {filteredUsers.map((user, idx) => {
              const isSelected = selectedIndex === idx
              return (
                <div
                  key={user.id}
                  role="option"
                  aria-selected={isSelected}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    selectUser(user)
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-2 py-1.5 text-xs cursor-pointer select-none transition-colors",
                    isSelected
                      ? "bg-accent text-accent-foreground font-medium"
                      : "hover:bg-accent/60"
                  )}
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary uppercase">
                    {user.avatar ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      user.name.slice(0, 2)
                    )}
                  </div>
                  <div className="flex flex-col truncate flex-1">
                    <span className="font-semibold truncate">{user.name}</span>
                    <span className="text-[10px] text-muted-foreground truncate">
                      @{user.username} {user.role && `• ${user.role}`}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }
)
MentionInput.displayName = "MentionInput"
