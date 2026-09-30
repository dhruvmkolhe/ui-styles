"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Copy, Check } from "lucide-react"

export interface KeyValueItem {
  id?: string
  key: React.ReactNode
  value: React.ReactNode
  copyable?: boolean
  copyText?: string
  mono?: boolean
  badge?: React.ReactNode
}

export interface KeyValueListProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: KeyValueItem[]
  divided?: boolean
  size?: "sm" | "md"
}

export const KeyValueList = React.forwardRef<HTMLDivElement, KeyValueListProps>(
  ({ className, items, divided = true, size = "md", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="region"
        aria-label="Key value list"
        className={cn(
          "w-full rounded-lg border border-border/80 bg-card overflow-hidden text-xs",
          divided && "divide-y divide-border/60",
          size === "sm" && "text-xs",
          size === "md" && "text-sm",
          className
        )}
        {...props}
      >
        {items
          ? items.map((item, idx) => (
              <KeyValueRow
                key={item.id ?? idx}
                label={item.key}
                copyable={item.copyable}
                copyText={item.copyText}
                mono={item.mono}
                badge={item.badge}
              >
                {item.value}
              </KeyValueRow>
            ))
          : children}
      </div>
    )
  }
)
KeyValueList.displayName = "KeyValueList"

export interface KeyValueRowProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode
  copyable?: boolean
  copyText?: string
  mono?: boolean
  badge?: React.ReactNode
}

export const KeyValueRow = React.forwardRef<HTMLDivElement, KeyValueRowProps>(
  (
    {
      className,
      label,
      copyable = false,
      copyText,
      mono = false,
      badge,
      children,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = async () => {
      const textToCopy =
        copyText ?? (typeof children === "string" ? children : String(children))
      if (!textToCopy) return
      try {
        await navigator.clipboard.writeText(textToCopy)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        // clipboard permission or fallback
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between gap-3 px-3.5 py-2.5 transition-colors hover:bg-muted/30",
          className
        )}
        {...props}
      >
        <span className="text-xs font-medium text-muted-foreground shrink-0 max-w-[40%] truncate">
          {label}
        </span>
        <div className="flex items-center gap-2 min-w-0 justify-end flex-1">
          {badge}
          <span
            className={cn(
              "text-xs text-foreground truncate text-right",
              mono && "font-mono font-medium tracking-tight bg-muted/60 px-1.5 py-0.5 rounded text-[11px]"
            )}
          >
            {children}
          </span>
          {copyable && (
            <button
              type="button"
              aria-label="Copy value"
              onClick={handleCopy}
              className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
            >
              {copied ? (
                <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </button>
          )}
        </div>
      </div>
    )
  }
)
KeyValueRow.displayName = "KeyValueRow"
