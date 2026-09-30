"use client"

import * as React from "react"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormContextValue {
  errors: Record<string, string>
  setFieldError: (field: string, error: string | null) => void
  isSubmitting?: boolean
  clearErrors: () => void
}

const FormContext = React.createContext<FormContextValue | null>(null)

export function useFormContext() {
  const context = React.useContext(FormContext)
  if (!context) {
    throw new Error("useFormContext must be used within a Form component")
  }
  return context
}

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmitForm?: (
    values: FormData,
    event: React.FormEvent<HTMLFormElement>
  ) => void | Promise<void>
  initialErrors?: Record<string, string>
  isSubmitting?: boolean
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  (
    {
      className,
      onSubmit,
      onSubmitForm,
      initialErrors = {},
      isSubmitting = false,
      children,
      ...props
    },
    ref
  ) => {
    const [errors, setErrors] = React.useState<Record<string, string>>(initialErrors)

    const setFieldError = React.useCallback((field: string, error: string | null) => {
      setErrors((prev) => {
        const next = { ...prev }
        if (!error) {
          delete next[field]
        } else {
          next[field] = error
        }
        return next
      })
    }, [])

    const clearErrors = React.useCallback(() => {
      setErrors({})
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      if (onSubmitForm) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        await onSubmitForm(formData, e)
      } else if (onSubmit) {
        onSubmit(e)
      }
    }

    return (
      <FormContext.Provider
        value={{
          errors,
          setFieldError,
          isSubmitting,
          clearErrors,
        }}
      >
        <form
          ref={ref}
          onSubmit={handleSubmit}
          noValidate
          className={cn("space-y-4", className)}
          {...props}
        >
          {children}
        </form>
      </FormContext.Provider>
    )
  }
)
Form.displayName = "Form"

export interface FormErrorSummaryProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  errors?: Record<string, string>
}

export function FormErrorSummary({
  className,
  title = "Please correct the following errors:",
  errors: explicitErrors,
  ...props
}: FormErrorSummaryProps) {
  const formCtx = React.useContext(FormContext)
  const errors = explicitErrors || formCtx?.errors || {}
  const errorList = Object.entries(errors).filter(([, msg]) => Boolean(msg))

  if (errorList.length === 0) return null

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        "rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive dark:bg-destructive/20",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 font-medium">
        <AlertCircle className="h-4 w-4 shrink-0" />
        <span>{title}</span>
      </div>
      <ul className="mt-2 list-disc pl-5 space-y-1 text-xs">
        {errorList.map(([field, msg]) => (
          <li key={field}>
            <strong className="capitalize">{field.replace(/_/g, " ")}:</strong>{" "}
            {msg}
          </li>
        ))}
      </ul>
    </div>
  )
}

export interface FormSuccessAlertProps
  extends React.HTMLAttributes<HTMLDivElement> {
  message: string
}

export function FormSuccessAlert({
  className,
  message,
  ...props
}: FormSuccessAlertProps) {
  return (
    <div
      role="status"
      className={cn(
        "flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-50 p-3 text-sm text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300",
        className
      )}
      {...props}
    >
      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
      <span>{message}</span>
    </div>
  )
}

export { Form, FormContext }
