"use client"

import * as React from "react"
import { Check, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CheckboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "defaultChecked"> {
  checked?: boolean | "indeterminate"
  defaultChecked?: boolean | "indeterminate"
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  required?: boolean
  name?: string
  value?: string
  error?: boolean
  label?: React.ReactNode
  description?: React.ReactNode
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      className,
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      disabled = false,
      required = false,
      name,
      value = "on",
      error = false,
      label,
      description,
      id: idProp,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const id = idProp || generatedId
    const isControlled = controlledChecked !== undefined

    const [uncontrolledChecked, setUncontrolledChecked] = React.useState<
      boolean | "indeterminate"
    >(defaultChecked)

    const isChecked = isControlled ? controlledChecked : uncontrolledChecked

    const toggle = () => {
      if (disabled) return
      const nextChecked = isChecked === true ? false : true
      if (!isControlled) {
        setUncontrolledChecked(nextChecked)
      }
      onCheckedChange?.(nextChecked)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault()
        toggle()
      }
    }

    const isIndeterminate = isChecked === "indeterminate"
    const isTrue = isChecked === true

    const control = (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        id={id}
        name={name}
        value={value}
        aria-checked={isIndeterminate ? "mixed" : isTrue}
        aria-required={required}
        aria-invalid={error ? "true" : undefined}
        disabled={disabled}
        onClick={toggle}
        onKeyDown={handleKeyDown}
        className={cn(
          "peer relative inline-flex h-4.5 w-4.5 shrink-0 cursor-pointer items-center justify-center rounded-[4px] border transition-all duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Base unchecked
          "border-input bg-background shadow-xs hover:border-foreground/40",
          // Checked state
          (isTrue || isIndeterminate) &&
            "border-primary bg-primary text-primary-foreground hover:bg-primary/90",
          // Error state
          error && "border-destructive ring-destructive/20",
          className
        )}
        {...props}
      >
        {isTrue && <Check className="h-3.5 w-3.5 stroke-[2.5]" />}
        {isIndeterminate && <Minus className="h-3.5 w-3.5 stroke-[2.5]" />}
      </button>
    )

    if (!label && !description) {
      return control
    }

    return (
      <div className="flex items-start gap-2.5">
        <div className="pt-0.5">{control}</div>
        <div className="grid gap-1 leading-none">
          {label && (
            <label
              htmlFor={id}
              className={cn(
                "text-sm font-medium select-none cursor-pointer leading-tight",
                disabled && "cursor-not-allowed opacity-70",
                error && "text-destructive"
              )}
            >
              {label}
              {required && (
                <span className="text-destructive ml-0.5" aria-hidden="true">
                  *
                </span>
              )}
            </label>
          )}
          {description && (
            <p className="text-xs text-muted-foreground leading-normal">
              {description}
            </p>
          )}
        </div>
      </div>
    )
  }
)

Checkbox.displayName = "Checkbox"

export { Checkbox }
