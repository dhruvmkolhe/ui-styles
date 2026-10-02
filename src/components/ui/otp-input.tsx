"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface OtpInputProps {
  length?: number
  value?: string
  defaultValue?: string
  onChange?: (val: string) => void
  onComplete?: (val: string) => void
  type?: "number" | "text" | "password"
  mask?: boolean
  autoFocus?: boolean
  disabled?: boolean
  error?: boolean | string
  success?: boolean
  placeholder?: string
  className?: string
  id?: string
  ariaLabel?: string
}

export function OtpInput({
  length = 6,
  value: controlledValue,
  defaultValue = "",
  onChange,
  onComplete,
  type = "number",
  mask = false,
  autoFocus = false,
  disabled = false,
  error = false,
  success = false,
  placeholder = "○",
  className,
  id,
  ariaLabel = "One-time passcode",
}: OtpInputProps) {
  const isControlled = controlledValue !== undefined
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const otpString = isControlled ? controlledValue : uncontrolledValue

  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])
  const baseId = React.useId()
  const componentId = id || baseId

  // Extract individual digit values
  const digits = React.useMemo(() => {
    const arr = new Array(length).fill("")
    for (let i = 0; i < length; i++) {
      arr[i] = otpString[i] || ""
    }
    return arr
  }, [otpString, length])

  // Auto-focus first input on mount if requested
  React.useEffect(() => {
    if (autoFocus && !disabled) {
      inputRefs.current[0]?.focus()
    }
  }, [autoFocus, disabled])

  const isValidChar = (char: string) => {
    if (type === "number") {
      return /^[0-9]$/.test(char)
    }
    return /^[a-zA-Z0-9]$/.test(char)
  }

  const updateOtp = (newDigits: string[]) => {
    const combined = newDigits.join("")
    if (!isControlled) {
      setUncontrolledValue(combined)
    }
    onChange?.(combined)
    if (combined.length === length && !newDigits.some((d) => !d)) {
      onComplete?.(combined)
    }
  }

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    if (!raw) {
      // Cleared
      const next = [...digits]
      next[index] = ""
      updateOtp(next)
      return
    }

    // Take the last character typed
    const char = raw.slice(-1)
    if (isValidChar(char)) {
      const next = [...digits]
      next[index] = char
      updateOtp(next)

      // Move focus to next input
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return

    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        // Move back and clear previous
        e.preventDefault()
        const next = [...digits]
        next[index - 1] = ""
        updateOtp(next)
        inputRefs.current[index - 1]?.focus()
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault()
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault()
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (disabled) return

    const pasteData = e.clipboardData.getData("text/plain").trim()
    const validChars = pasteData
      .split("")
      .filter((ch) => isValidChar(ch))
      .slice(0, length)

    if (validChars.length === 0) return

    const next = [...digits]
    for (let i = 0; i < validChars.length; i++) {
      next[i] = validChars[i]
    }
    updateOtp(next)

    // Focus on next empty slot or last slot
    const nextEmptyIndex = next.findIndex((d) => !d)
    const focusTarget = nextEmptyIndex !== -1 ? nextEmptyIndex : length - 1
    inputRefs.current[focusTarget]?.focus()
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div
        role="group"
        aria-label={ariaLabel}
        className="flex items-center gap-2 sm:gap-2.5"
      >
        {digits.map((digit, index) => {
          const hasVal = digit !== ""

          return (
            <React.Fragment key={index}>
              <label htmlFor={`${componentId}-digit-${index}`} className="sr-only">
                {`Digit ${index + 1} of ${length}`}
              </label>
              <input
                ref={(el) => {
                  inputRefs.current[index] = el
                }}
                id={`${componentId}-digit-${index}`}
                name={`${componentId}_digit_${index}`}
                type={mask ? "password" : "text"}
                inputMode={type === "number" ? "numeric" : "text"}
                autoComplete="one-time-code"
                suppressHydrationWarning
                maxLength={2} // Allow 2 to detect new character on overwrite
              value={digit}
              disabled={disabled}
              placeholder={placeholder}
              aria-label={`Digit ${index + 1} of ${length}`}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              onFocus={(e) => e.target.select()}
              className={cn(
                "h-11 w-10 sm:h-12 sm:w-11 rounded-lg border text-center text-lg font-mono font-bold transition-all",
                "bg-background text-foreground shadow-xs",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                hasVal ? "border-primary/80 font-bold" : "border-input placeholder:text-muted-foreground/40",
                error && "border-destructive text-destructive focus:ring-destructive",
                success && "border-emerald-500 text-emerald-600 focus:ring-emerald-500",
                disabled && "opacity-50 pointer-events-none cursor-not-allowed bg-muted/40"
              )}
            />
          </React.Fragment>
        )
        })}
      </div>

      {typeof error === "string" && (
        <p className="text-xs text-destructive mt-1 font-medium">{error}</p>
      )}
    </div>
  )
}
