"use client"

import * as React from "react"
import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

interface FormFieldContextValue {
  id: string
  name?: string
  error?: string
  required?: boolean
  disabled?: boolean
  descriptionId: string
  errorId: string
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null)

export function useFormField() {
  const context = React.useContext(FormFieldContext)
  if (!context) {
    throw new Error("useFormField must be used within a FormField")
  }
  return context
}

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string
  label?: React.ReactNode
  description?: React.ReactNode
  error?: string
  required?: boolean
  disabled?: boolean
  optional?: boolean
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      className,
      id: idProp,
      name,
      label,
      description,
      error,
      required = false,
      disabled = false,
      optional = false,
      children,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const id = idProp || generatedId
    const descriptionId = `${id}-description`
    const errorId = `${id}-error`

    return (
      <FormFieldContext.Provider
        value={{
          id,
          name,
          error,
          required,
          disabled,
          descriptionId,
          errorId,
        }}
      >
        <div ref={ref} className={cn("grid gap-1.5", className)} {...props}>
          {label && (
            <Label
              htmlFor={id}
              required={required}
              optional={optional}
              error={!!error}
              className={cn(disabled && "opacity-60")}
            >
              {label}
            </Label>
          )}
          {children}
          {description && !error && (
            <p
              id={descriptionId}
              className="text-xs text-muted-foreground leading-normal"
            >
              {description}
            </p>
          )}
          {error && (
            <div
              id={errorId}
              role="alert"
              aria-live="polite"
              className="flex items-center gap-1.5 text-xs font-medium text-destructive animate-in fade-in-50"
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </FormFieldContext.Provider>
    )
  }
)
FormField.displayName = "FormField"

export { FormField, FormFieldContext }
