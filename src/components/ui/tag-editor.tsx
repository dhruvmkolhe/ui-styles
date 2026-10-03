"use client"

import * as React from "react"
import { X, Tag as TagIcon, AtSign, Check, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TagEditorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string[]
  defaultValue?: string[]
  onChange?: (tags: string[]) => void
  placeholder?: string
  maxTags?: number
  allowDuplicates?: boolean
  disabled?: boolean
  readOnly?: boolean
  validateTag?: (tag: string) => boolean | string
  enableInlineEdit?: boolean
}

export const TagEditor = React.forwardRef<HTMLDivElement, TagEditorProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = ["react", "nextjs", "@dhruvmkolhe", "chameleon-ui"],
      onChange,
      placeholder = "Add tags (press Enter or comma)...",
      maxTags,
      allowDuplicates = false,
      disabled = false,
      readOnly = false,
      validateTag,
      enableInlineEdit = true,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined
    const [uncontrolledTags, setUncontrolledTags] = React.useState<string[]>(defaultValue)
    const tags = isControlled ? controlledValue : uncontrolledTags

    const [inputValue, setInputValue] = React.useState("")
    const [editingIndex, setEditingIndex] = React.useState<number | null>(null)
    const [editingValue, setEditingValue] = React.useState("")
    const [error, setError] = React.useState<string | null>(null)

    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const editInputRef = React.useRef<HTMLInputElement | null>(null)

    const updateTags = (newTags: string[]) => {
      if (!isControlled) {
        setUncontrolledTags(newTags)
      }
      onChange?.(newTags)
    }

    const addTag = (rawText: string) => {
      const trimmed = rawText.trim()
      if (!trimmed) return

      if (maxTags && tags.length >= maxTags) {
        setError(`Maximum of ${maxTags} tags reached.`)
        return
      }

      if (!allowDuplicates && tags.includes(trimmed)) {
        setError(`Tag "${trimmed}" already exists.`)
        return
      }

      if (validateTag) {
        const validation = validateTag(trimmed)
        if (validation !== true) {
          setError(typeof validation === "string" ? validation : "Invalid tag format.")
          return
        }
      }

      setError(null)
      updateTags([...tags, trimmed])
      setInputValue("")
    }

    const removeTag = (index: number) => {
      if (disabled || readOnly) return
      setError(null)
      const nextTags = tags.filter((_, i) => i !== index)
      updateTags(nextTags)
      inputRef.current?.focus()
    }

    const startEditing = (index: number) => {
      if (!enableInlineEdit || disabled || readOnly) return
      setEditingIndex(index)
      setEditingValue(tags[index])
      setTimeout(() => {
        editInputRef.current?.focus()
        editInputRef.current?.select()
      }, 10)
    }

    const saveEditing = () => {
      if (editingIndex === null) return
      const trimmed = editingValue.trim()

      if (!trimmed) {
        removeTag(editingIndex)
      } else {
        const nextTags = [...tags]
        nextTags[editingIndex] = trimmed
        updateTags(nextTags)
      }

      setEditingIndex(null)
      setEditingValue("")
      inputRef.current?.focus()
    }

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault()
        addTag(inputValue)
      } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
        e.preventDefault()
        removeTag(tags.length - 1)
      }
    }

    const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault()
        saveEditing()
      } else if (e.key === "Escape") {
        e.preventDefault()
        setEditingIndex(null)
        setEditingValue("")
        inputRef.current?.focus()
      }
    }

    return (
      <div className="w-full space-y-1.5">
        <div
          ref={ref}
          onClick={() => {
            if (editingIndex === null) inputRef.current?.focus()
          }}
          className={cn(
            "flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-lg border border-input bg-background p-1.5 text-sm ring-offset-background transition-colors focus-within:ring-1 focus-within:ring-ring",
            disabled && "cursor-not-allowed opacity-50 bg-muted/40",
            readOnly && "cursor-default bg-muted/20",
            error && "border-destructive focus-within:ring-destructive",
            className
          )}
          {...props}
        >
          {tags.map((tag, idx) => {
            const isMention = tag.startsWith("@")
            const isTopic = tag.startsWith("#")
            const isEditing = editingIndex === idx

            if (isEditing) {
              return (
                <div key={idx} className="flex items-center gap-1 rounded bg-accent px-1.5 py-0.5">
                  <input
                    ref={editInputRef}
                    type="text"
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                    onBlur={saveEditing}
                    onKeyDown={handleEditKeyDown}
                    className="h-5 w-24 bg-transparent text-xs font-medium outline-none"
                  />
                  <button
                    type="button"
                    onClick={saveEditing}
                    className="text-primary hover:text-primary/80"
                  >
                    <Check className="h-3 w-3" />
                  </button>
                </div>
              )
            }

            return (
              <span
                key={`${tag}-${idx}`}
                onDoubleClick={() => startEditing(idx)}
                className={cn(
                  "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium transition-all select-none",
                  isMention
                    ? "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15"
                    : isTopic
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                    : "bg-muted text-foreground border border-border hover:bg-muted/80",
                  !disabled && !readOnly && "cursor-pointer"
                )}
                title={enableInlineEdit ? "Double click to edit tag" : undefined}
              >
                {isMention ? (
                  <AtSign className="h-3 w-3 opacity-70 shrink-0" />
                ) : isTopic ? (
                  <span className="font-bold opacity-70">#</span>
                ) : (
                  <TagIcon className="h-3 w-3 opacity-60 shrink-0" />
                )}
                <span>{isTopic ? tag.slice(1) : tag}</span>
                {!disabled && !readOnly && (
                  <button
                    type="button"
                    tabIndex={0}
                    aria-label={`Remove tag ${tag}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      removeTag(idx)
                    }}
                    className="ml-0.5 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </span>
            )
          })}

          {!disabled && !readOnly && (
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value)
                setError(null)
              }}
              onKeyDown={handleInputKeyDown}
              onPaste={(e) => {
                const paste = e.clipboardData.getData("text")
                if (paste.includes(",")) {
                  e.preventDefault()
                  paste.split(",").forEach((item) => addTag(item))
                }
              }}
              placeholder={tags.length === 0 ? placeholder : "Add tag..."}
              className="flex-1 min-w-[120px] bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none px-1 py-1"
            />
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="flex items-center gap-1 text-[11px] font-medium text-destructive">
            <AlertCircle className="h-3 w-3" />
            <span>{error}</span>
          </div>
        )}
      </div>
    )
  }
)
TagEditor.displayName = "TagEditor"
