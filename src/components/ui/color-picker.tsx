"use client"

import * as React from "react"
import { Check, Pipette, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ColorPickerProps {
  value?: string
  defaultValue?: string
  onChange?: (color: string) => void
  presets?: string[]
  allowCustom?: boolean
  disabled?: boolean
  className?: string
  label?: string
  error?: boolean | string
  size?: "sm" | "md" | "lg"
}

const DEFAULT_PRESETS = [
  "#ef4444", // Red
  "#f97316", // Orange
  "#f59e0b", // Amber
  "#10b981", // Emerald
  "#06b6d4", // Cyan
  "#3b82f6", // Blue
  "#6366f1", // Indigo
  "#8b5cf6", // Purple
  "#ec4899", // Pink
  "#64748b", // Slate
  "#000000", // Black
  "#ffffff", // White
]

export function ColorPicker({
  value: controlledValue,
  defaultValue = "#3b82f6",
  onChange,
  presets = DEFAULT_PRESETS,
  allowCustom = true,
  disabled = false,
  className,
  label = "Color",
  error,
  size = "md",
}: ColorPickerProps) {
  const instanceId = React.useId()
  const isControlled = controlledValue !== undefined
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string>(defaultValue)
  const currentColor = (isControlled ? controlledValue : uncontrolledValue) || "#000000"

  const [hexInput, setHexInput] = React.useState(currentColor)
  const [open, setOpen] = React.useState(false)
  const [inputError, setInputError] = React.useState(false)

  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const nativeColorRef = React.useRef<HTMLInputElement | null>(null)

  // Keep hex input in sync when currentColor changes
  React.useEffect(() => {
    setHexInput(currentColor)
    setInputError(false)
  }, [currentColor])

  const isValidHex = (hex: string) => {
    return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex)
  }

  const normalizeToSixDigitHex = (hex: string): string => {
    if (!hex) return "#000000"
    const trimmed = hex.trim()
    if (/^#[0-9A-Fa-f]{3}$/.test(trimmed)) {
      return `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`
    }
    if (/^#[0-9A-Fa-f]{6}$/.test(trimmed)) {
      return trimmed
    }
    return "#000000"
  }

  const handleColorChange = (newColor: string) => {
    if (!isControlled) {
      setUncontrolledValue(newColor)
    }
    setHexInput(newColor)
    setInputError(false)
    onChange?.(newColor)
  }

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value
    if (!raw.startsWith("#") && raw.length > 0) raw = `#${raw}`
    setHexInput(raw)

    if (isValidHex(raw)) {
      setInputError(false)
      if (!isControlled) setUncontrolledValue(raw)
      onChange?.(raw)
    } else {
      setInputError(true)
    }
  }

  // Click outside and Escape key listeners
  React.useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [open])

  const swatchSizes = {
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-11 w-11",
  }[size]

  return (
    <div ref={containerRef} className={cn("relative inline-block text-left", className)}>
      {label && (
        <label className="block text-xs font-medium text-foreground mb-1">
          {label}
        </label>
      )}

      {/* Swatch & Hex Trigger Button */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label={`Pick color, current value is ${currentColor}`}
          onClick={() => !disabled && setOpen(!open)}
          disabled={disabled}
          className={cn(
            "rounded-lg border border-border bg-background p-1 shadow-xs transition-colors flex items-center gap-2 pr-3",
            "hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
            disabled && "opacity-50 pointer-events-none cursor-not-allowed bg-muted/40"
          )}
        >
          <div
            className={cn(
              "rounded-md border border-black/10 shadow-inner shrink-0",
              swatchSizes
            )}
            style={{ backgroundColor: currentColor }}
          />
          <span className="font-mono text-xs uppercase text-foreground">
            {currentColor}
          </span>
        </button>
      </div>

      {/* Popover Palette */}
      {open && (
        <div
          role="dialog"
          aria-label="Color Palette"
          className="absolute z-50 mt-2 w-64 rounded-xl border border-border bg-popover p-3 text-popover-foreground shadow-xl animate-in fade-in-0 zoom-in-95"
        >
          {/* Preset Swatches */}
          <div className="mb-3">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
              Presets
            </span>
            <div className="grid grid-cols-6 gap-1.5" role="group" aria-label="Preset colors">
              {presets.map((preset) => {
                const isSelected = preset.toLowerCase() === currentColor.toLowerCase()
                return (
                  <button
                    key={preset}
                    type="button"
                    role="button"
                    aria-label={`Select color ${preset}`}
                    aria-pressed={isSelected}
                    onClick={() => handleColorChange(preset)}
                    className={cn(
                      "h-7 w-7 rounded-md border border-black/10 shadow-xs flex items-center justify-center transition-transform hover:scale-110",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                      isSelected && "ring-2 ring-primary ring-offset-1 scale-105"
                    )}
                    style={{ backgroundColor: preset }}
                  >
                    {isSelected && (
                      <Check
                        className={cn(
                          "h-3.5 w-3.5 drop-shadow-sm",
                          preset.toLowerCase() === "#ffffff" ? "text-black" : "text-white"
                        )}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Custom Input */}
          {allowCustom && (
            <div className="border-t border-border/80 pt-3 space-y-2">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                Custom Color
              </span>

              <div className="flex items-center gap-2">
                {/* Native Picker Trigger */}
                <div className="relative shrink-0">
                  <input
                    ref={nativeColorRef}
                    type="color"
                    id={`${instanceId}-native-color-picker`}
                    name={`${instanceId}-nativeColorPicker`}
                    suppressHydrationWarning
                    value={normalizeToSixDigitHex(currentColor)}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="sr-only"
                    aria-label="Native color wheel"
                  />
                  <button
                    type="button"
                    onClick={() => nativeColorRef.current?.click()}
                    aria-label="Open native color wheel"
                    className="h-8 w-8 rounded-lg border border-border bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <Pipette className="h-4 w-4" />
                  </button>
                </div>

                {/* Hex Text Input */}
                <div className="flex-1">
                  <input
                    type="text"
                    id={`${instanceId}-hex-color-code`}
                    name={`${instanceId}-hexColorCode`}
                    autoComplete="off"
                    suppressHydrationWarning
                    value={hexInput}
                    onChange={handleHexInputChange}
                    placeholder="#000000"
                    maxLength={7}
                    aria-label="Hex color code"
                    className={cn(
                      "w-full h-8 rounded-md border bg-background px-2 font-mono text-xs text-foreground uppercase placeholder:text-muted-foreground",
                      "focus:outline-none focus:ring-1",
                      inputError
                        ? "border-destructive focus:ring-destructive text-destructive"
                        : "border-input focus:ring-ring"
                    )}
                  />
                </div>
              </div>

              {inputError && (
                <p className="text-[11px] text-destructive">
                  Please enter a valid 3 or 6-digit hex color.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {error && typeof error === "string" && (
        <p className="mt-1 text-xs text-destructive">{error}</p>
      )}
    </div>
  )
}
