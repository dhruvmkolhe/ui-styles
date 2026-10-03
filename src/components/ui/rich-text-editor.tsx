"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Unlink,
  Undo2,
  Redo2,
  RemoveFormatting,
} from "lucide-react"

/**
 * Deterministic plain-text extraction from an HTML string that produces identical
 * results on both server and client to guarantee 100% hydration consistency.
 */
export function extractPlainText(html: string): string {
  if (!html) return ""
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim()
}

/**
 * Lightweight safe HTML sanitizer that allows only a strict whitelist of tags and attributes.
 * Prevents XSS without external dependencies.
 */
export function sanitizeHtml(rawHtml: string): string {
  if (!rawHtml) return ""
  if (typeof window === "undefined") {
    // SSR fallback: regex cleanup of dangerous tags without inline script literal
    const scriptRegex = new RegExp("<script\\b[^<]*(?:(?!<\\/script>)<[^<]*)*<\\/script>", "gi")
    const iframeRegex = new RegExp("<iframe\\b[^<]*(?:(?!<\\/iframe>)<[^<]*)*<\\/iframe>", "gi")
    return rawHtml
      .replace(scriptRegex, "")
      .replace(iframeRegex, "")
      .replace(/on\w+="[^"]*"/gi, "")
      .replace(/on\w+='[^']*'/gi, "")
      .replace(/javascript:/gi, "")
  }

  const parser = new DOMParser()
  const doc = parser.parseFromString(rawHtml, "text/html")
  const allowedTags = new Set([
    "P",
    "B",
    "STRONG",
    "I",
    "EM",
    "U",
    "S",
    "STRIKE",
    "DEL",
    "H1",
    "H2",
    "H3",
    "H4",
    "UL",
    "OL",
    "LI",
    "BLOCKQUOTE",
    "CODE",
    "PRE",
    "A",
    "BR",
    "SPAN",
    "DIV",
  ])

  function sanitizeNode(node: Node) {
    const children = Array.from(node.childNodes)
    for (const child of children) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const el = child as HTMLElement
        const tagName = el.tagName.toUpperCase()

        if (!allowedTags.has(tagName)) {
          // Replace tag with its text or child contents
          while (el.firstChild) {
            el.parentNode?.insertBefore(el.firstChild, el)
          }
          el.parentNode?.removeChild(el)
        } else {
          // Clean attributes: allow safe href on <a>, clean all others
          const attrs = Array.from(el.attributes)
          for (const attr of attrs) {
            const attrName = attr.name.toLowerCase()
            if (attrName.startsWith("on")) {
              el.removeAttribute(attr.name)
            } else if (tagName === "A" && attrName === "href") {
              const val = attr.value.trim().toLowerCase()
              if (
                val.startsWith("javascript:") ||
                val.startsWith("vbscript:") ||
                val.startsWith("data:")
              ) {
                el.removeAttribute(attr.name)
              } else {
                el.setAttribute("rel", "noopener noreferrer")
                el.setAttribute("target", "_blank")
              }
            } else if (attrName !== "class" && attrName !== "style") {
              el.removeAttribute(attr.name)
            }
          }
          sanitizeNode(el)
        }
      }
    }
  }

  sanitizeNode(doc.body)
  return doc.body.innerHTML
}

export interface RichTextEditorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string
  defaultValue?: string
  onChange?: (html: string) => void
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  minHeight?: string
  showToolbar?: boolean
  showCounts?: boolean
}

export const RichTextEditor = React.forwardRef<HTMLDivElement, RichTextEditorProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = "<p>Start typing rich text here...</p>",
      onChange,
      placeholder = "Write something brilliant...",
      disabled = false,
      readOnly = false,
      minHeight = "180px",
      showToolbar = true,
      showCounts = true,
      ...props
    },
    ref
  ) => {
    const editorRef = React.useRef<HTMLDivElement | null>(null)
    const isControlled = controlledValue !== undefined
    const [htmlContent, setHtmlContent] = React.useState<string>(() => {
      const initial = isControlled ? controlledValue : defaultValue
      return initial || ""
    })

    // Active formatting states
    const [isBold, setIsBold] = React.useState(false)
    const [isItalic, setIsItalic] = React.useState(false)
    const [isUnderline, setIsUnderline] = React.useState(false)
    const [isStrike, setIsStrike] = React.useState(false)
    const [isList, setIsList] = React.useState(false)
    const [isOrderedList, setIsOrderedList] = React.useState(false)
    const [isQuote, setIsQuote] = React.useState(false)

    // Sync controlled value
    React.useEffect(() => {
      if (isControlled && controlledValue !== undefined) {
        const sanitized = sanitizeHtml(controlledValue)
        if (editorRef.current && editorRef.current.innerHTML !== sanitized) {
          editorRef.current.innerHTML = sanitized
          setHtmlContent(sanitized)
        }
      }
    }, [isControlled, controlledValue])

    // Mount initial content
    React.useEffect(() => {
      if (editorRef.current && !editorRef.current.innerHTML) {
        editorRef.current.innerHTML = htmlContent
      }
    }, [])

    const updateFormattingState = () => {
      if (typeof document === "undefined") return
      try {
        setIsBold(document.queryCommandState("bold"))
        setIsItalic(document.queryCommandState("italic"))
        setIsUnderline(document.queryCommandState("underline"))
        setIsStrike(document.queryCommandState("strikeThrough"))
        setIsList(document.queryCommandState("insertUnorderedList"))
        setIsOrderedList(document.queryCommandState("insertOrderedList"))
      } catch {
        // Query command state may fail on edge selections
      }
    }

    const exec = (command: string, arg?: string) => {
      if (disabled || readOnly) return
      editorRef.current?.focus()
      document.execCommand(command, false, arg)
      handleInput()
      updateFormattingState()
    }

    const handleInput = () => {
      if (!editorRef.current) return
      const raw = editorRef.current.innerHTML
      const sanitized = sanitizeHtml(raw)
      setHtmlContent(sanitized)
      onChange?.(sanitized)
      updateFormattingState()
    }

    const handleInsertLink = () => {
      if (disabled || readOnly) return
      const currentUrl = prompt("Enter URL:", "https://")
      if (currentUrl && currentUrl.trim()) {
        exec("createLink", currentUrl.trim())
      }
    }

    // Counts - computed identically on server and client to prevent hydration mismatch
    const textOnly = React.useMemo(() => {
      return extractPlainText(htmlContent)
    }, [htmlContent])

    const charCount = textOnly.length
    const wordCount = textOnly ? textOnly.split(/\s+/).length : 0

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col rounded-lg border border-border bg-card text-card-foreground shadow-xs overflow-hidden",
          disabled && "opacity-50 pointer-events-none",
          className
        )}
        {...props}
      >
        {/* Formatting Toolbar */}
        {showToolbar && !readOnly && (
          <div className="flex flex-wrap items-center gap-1 border-b border-border bg-muted/30 p-1.5 text-muted-foreground select-none">
            <button
              type="button"
              title="Bold (Ctrl+B)"
              onClick={() => exec("bold")}
              className={cn(
                "inline-flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-muted hover:text-foreground",
                isBold && "bg-accent text-accent-foreground font-bold"
              )}
            >
              <Bold className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              title="Italic (Ctrl+I)"
              onClick={() => exec("italic")}
              className={cn(
                "inline-flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-muted hover:text-foreground",
                isItalic && "bg-accent text-accent-foreground font-bold"
              )}
            >
              <Italic className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              title="Underline (Ctrl+U)"
              onClick={() => exec("underline")}
              className={cn(
                "inline-flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-muted hover:text-foreground",
                isUnderline && "bg-accent text-accent-foreground font-bold"
              )}
            >
              <Underline className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              title="Strikethrough"
              onClick={() => exec("strikeThrough")}
              className={cn(
                "inline-flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-muted hover:text-foreground",
                isStrike && "bg-accent text-accent-foreground font-bold"
              )}
            >
              <Strikethrough className="h-3.5 w-3.5" />
            </button>

            <div className="mx-1 h-4 w-[1px] bg-border" />

            <button
              type="button"
              title="Heading 1"
              onClick={() => exec("formatBlock", "H1")}
              className="inline-flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-muted hover:text-foreground"
            >
              <Heading1 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              title="Heading 2"
              onClick={() => exec("formatBlock", "H2")}
              className="inline-flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-muted hover:text-foreground"
            >
              <Heading2 className="h-3.5 w-3.5" />
            </button>

            <div className="mx-1 h-4 w-[1px] bg-border" />

            <button
              type="button"
              title="Bullet List"
              onClick={() => exec("insertUnorderedList")}
              className={cn(
                "inline-flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-muted hover:text-foreground",
                isList && "bg-accent text-accent-foreground font-bold"
              )}
            >
              <List className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              title="Numbered List"
              onClick={() => exec("insertOrderedList")}
              className={cn(
                "inline-flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-muted hover:text-foreground",
                isOrderedList && "bg-accent text-accent-foreground font-bold"
              )}
            >
              <ListOrdered className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              title="Quote"
              onClick={() => exec("formatBlock", "BLOCKQUOTE")}
              className="inline-flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-muted hover:text-foreground"
            >
              <Quote className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              title="Code Block"
              onClick={() => exec("formatBlock", "PRE")}
              className="inline-flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-muted hover:text-foreground"
            >
              <Code className="h-3.5 w-3.5" />
            </button>

            <div className="mx-1 h-4 w-[1px] bg-border" />

            <button
              type="button"
              title="Insert Link"
              onClick={handleInsertLink}
              className="inline-flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-muted hover:text-foreground"
            >
              <LinkIcon className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              title="Remove Link"
              onClick={() => exec("unlink")}
              className="inline-flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-muted hover:text-foreground"
            >
              <Unlink className="h-3.5 w-3.5" />
            </button>

            <div className="mx-1 h-4 w-[1px] bg-border" />

            <button
              type="button"
              title="Undo (Ctrl+Z)"
              onClick={() => exec("undo")}
              className="inline-flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-muted hover:text-foreground"
            >
              <Undo2 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              title="Redo (Ctrl+Y)"
              onClick={() => exec("redo")}
              className="inline-flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-muted hover:text-foreground"
            >
              <Redo2 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              title="Clear Formatting"
              onClick={() => exec("removeFormat")}
              className="inline-flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-muted hover:text-foreground"
            >
              <RemoveFormatting className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* ContentEditable editing canvas */}
        <div
          ref={editorRef}
          contentEditable={!disabled && !readOnly}
          suppressContentEditableWarning
          onInput={handleInput}
          onKeyUp={updateFormattingState}
          onMouseUp={updateFormattingState}
          data-placeholder={placeholder}
          style={{ minHeight }}
          className={cn(
            "p-4 text-sm leading-relaxed outline-none focus:outline-none overflow-y-auto",
            "prose prose-sm dark:prose-invert max-w-none",
            "[&_p]:mb-2 [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mb-3 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mb-2",
            "[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-2",
            "[&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-muted-foreground",
            "[&_pre]:bg-muted/70 [&_pre]:p-2 [&_pre]:rounded [&_pre]:font-mono [&_pre]:text-xs [&_pre]:overflow-x-auto",
            "[&_a]:text-primary [&_a]:underline",
            "empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground empty:before:pointer-events-none"
          )}
        />

        {/* Word and Character Count Footer */}
        {showCounts && (
          <div
            suppressHydrationWarning
            className="flex items-center justify-between border-t border-border bg-muted/20 px-3 py-1.5 text-[11px] text-muted-foreground"
          >
            <span>{readOnly ? "Read-only view" : "Rich Text Editor"}</span>
            <div className="flex items-center gap-3">
              <span suppressHydrationWarning>{wordCount} words</span>
              <span suppressHydrationWarning>{charCount} characters</span>
            </div>
          </div>
        )}
      </div>
    )
  }
)
RichTextEditor.displayName = "RichTextEditor"
