"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
  showCount?: boolean
  resize?: "none" | "vertical" | "horizontal" | "both"
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      error = false,
      showCount = false,
      maxLength,
      resize = "vertical",
      value: controlledValue,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = React.useState<number>(() => {
      if (typeof controlledValue === "string") return controlledValue.length
      if (typeof defaultValue === "string") return defaultValue.length
      return 0
    })

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length)
      onChange?.(e)
    }

    React.useEffect(() => {
      if (typeof controlledValue === "string") {
        setCharCount(controlledValue.length)
      }
    }, [controlledValue])

    const resizeClass = {
      none: "resize-none",
      vertical: "resize-y",
      horizontal: "resize-x",
      both: "resize",
    }[resize]

    return (
      <div className="relative w-full">
        <textarea
          ref={ref}
          value={controlledValue}
          defaultValue={defaultValue}
          maxLength={maxLength}
          onChange={handleChange}
          aria-invalid={error ? "true" : undefined}
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs transition-colors placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive text-destructive ring-destructive/20",
            resizeClass,
            className
          )}
          {...props}
        />
        {showCount && (
          <div className="mt-1 flex justify-end text-[11px] font-mono text-muted-foreground">
            {maxLength ? `${charCount} / ${maxLength}` : `${charCount} chars`}
          </div>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
