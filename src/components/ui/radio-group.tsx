"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface RadioGroupContextValue {
  name: string
  value?: string
  onChange: (value: string) => void
  disabled?: boolean
  error?: boolean
  orientation?: "vertical" | "horizontal"
  registerItem: (val: string, element: HTMLButtonElement | null) => void
  focusItem: (val: string) => void
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null)

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  error?: boolean
  name?: string
  orientation?: "vertical" | "horizontal"
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue,
      onValueChange,
      disabled = false,
      error = false,
      name: nameProp,
      orientation = "vertical",
      children,
      ...props
    },
    ref
  ) => {
    const generatedName = React.useId()
    const name = nameProp || generatedName
    const isControlled = controlledValue !== undefined
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string | undefined>(
      defaultValue
    )
    const currentValue = isControlled ? controlledValue : uncontrolledValue

    const itemRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map())

    const registerItem = React.useCallback(
      (val: string, element: HTMLButtonElement | null) => {
        if (element) {
          itemRefs.current.set(val, element)
        } else {
          itemRefs.current.delete(val)
        }
      },
      []
    )

    const handleChange = React.useCallback(
      (val: string) => {
        if (disabled) return
        if (!isControlled) {
          setUncontrolledValue(val)
        }
        onValueChange?.(val)
      },
      [disabled, isControlled, onValueChange]
    )

    const focusItem = React.useCallback((val: string) => {
      const el = itemRefs.current.get(val)
      el?.focus()
    }, [])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const keys = ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"]
      if (!keys.includes(e.key)) return

      const items = Array.from(itemRefs.current.entries())
        .filter(([, el]) => !el.disabled)
        .map(([val]) => val)

      if (items.length === 0) return

      e.preventDefault()
      const currentIndex = items.indexOf(currentValue || "")
      let nextIndex = 0

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1
      } else if (e.key === "Home") {
        nextIndex = 0
      } else if (e.key === "End") {
        nextIndex = items.length - 1
      }

      const nextVal = items[nextIndex]
      handleChange(nextVal)
      focusItem(nextVal)
    }

    return (
      <RadioGroupContext.Provider
        value={{
          name,
          value: currentValue,
          onChange: handleChange,
          disabled,
          error,
          orientation,
          registerItem,
          focusItem,
        }}
      >
        <div
          ref={ref}
          role="radiogroup"
          aria-orientation={orientation}
          aria-invalid={error ? "true" : undefined}
          onKeyDown={handleKeyDown}
          className={cn(
            "grid gap-2.5",
            orientation === "horizontal" && "flex flex-wrap items-center gap-4",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    )
  }
)
RadioGroup.displayName = "RadioGroup"

export interface RadioGroupItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  value: string
  label?: React.ReactNode
  description?: React.ReactNode
  card?: boolean
}

const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  (
    {
      className,
      value,
      disabled: disabledProp,
      label,
      description,
      card = false,
      id: idProp,
      ...props
    },
    forwardedRef
  ) => {
    const context = React.useContext(RadioGroupContext)
    if (!context) {
      throw new Error("RadioGroupItem must be used within a RadioGroup")
    }

    const generatedId = React.useId()
    const id = idProp || generatedId
    const isChecked = context.value === value
    const isDisabled = context.disabled || disabledProp
    const isError = context.error

    const innerRef = React.useRef<HTMLButtonElement | null>(null)

    React.useEffect(() => {
      context.registerItem(value, innerRef.current)
      return () => {
        context.registerItem(value, null)
      }
    }, [context, value])

    const handleRef = (el: HTMLButtonElement | null) => {
      innerRef.current = el
      if (typeof forwardedRef === "function") {
        forwardedRef(el)
      } else if (forwardedRef) {
        forwardedRef.current = el
      }
    }

    const handleClick = () => {
      if (isDisabled) return
      context.onChange(value)
    }

    // Accessible indicator button
    const indicator = (
      <button
        ref={handleRef}
        type="button"
        role="radio"
        id={id}
        name={context.name}
        value={value}
        aria-checked={isChecked}
        disabled={isDisabled}
        tabIndex={isChecked || (!context.value && !isDisabled) ? 0 : -1}
        onClick={handleClick}
        className={cn(
          "relative flex h-4.5 w-4.5 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-all duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Unchecked
          "border-input bg-background shadow-xs hover:border-foreground/40",
          // Checked
          isChecked && "border-primary text-primary",
          // Error
          isError && "border-destructive ring-destructive/20",
          card && "mt-0.5",
          className
        )}
        {...props}
      >
        <span
          className={cn(
            "h-2.5 w-2.5 rounded-full bg-current transition-transform duration-150",
            isChecked ? "scale-100" : "scale-0"
          )}
        />
      </button>
    )

    if (!label && !description) {
      return indicator
    }

    if (card) {
      return (
        <div
          onClick={handleClick}
          className={cn(
            "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-all duration-150",
            isChecked
              ? "border-primary bg-primary/5 shadow-xs"
              : "border-input bg-card hover:border-foreground/30",
            isDisabled && "cursor-not-allowed opacity-50",
            isError && "border-destructive bg-destructive/5"
          )}
        >
          {indicator}
          <div className="grid gap-1">
            <label
              htmlFor={id}
              className={cn(
                "text-sm font-semibold select-none cursor-pointer leading-tight text-foreground",
                isDisabled && "cursor-not-allowed"
              )}
            >
              {label}
            </label>
            {description && (
              <p className="text-xs text-muted-foreground leading-normal">
                {description}
              </p>
            )}
          </div>
        </div>
      )
    }

    return (
      <div className="flex items-start gap-2.5">
        <div className="pt-0.5">{indicator}</div>
        <div className="grid gap-1 leading-none">
          {label && (
            <label
              htmlFor={id}
              className={cn(
                "text-sm font-medium select-none cursor-pointer leading-tight text-foreground",
                isDisabled && "cursor-not-allowed opacity-70",
                isError && "text-destructive"
              )}
            >
              {label}
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
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
