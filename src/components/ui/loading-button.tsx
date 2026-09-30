import * as React from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

export interface LoadingButtonProps extends ButtonProps {
  loading?: boolean
  loadingText?: React.ReactNode
  spinnerPlacement?: "start" | "end"
  spinner?: React.ReactNode
}

export const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    {
      children,
      loading = false,
      loadingText,
      spinnerPlacement = "start",
      spinner,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const isSpinnerStart = spinnerPlacement === "start"
    const spinnerNode = spinner ?? <Spinner size="sm" variant="current" />

    return (
      <Button
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        className={cn(
          "relative transition-all duration-150",
          loading && "cursor-wait select-none",
          className
        )}
        {...props}
      >
        {loading && isSpinnerStart && (
          <span className="inline-flex shrink-0 items-center justify-center mr-2 animate-fadeIn">
            {spinnerNode}
          </span>
        )}

        <span className={cn("inline-flex items-center gap-1.5", loading && !loadingText && "opacity-80")}>
          {loading && loadingText ? loadingText : children}
        </span>

        {loading && !isSpinnerStart && (
          <span className="inline-flex shrink-0 items-center justify-center ml-2 animate-fadeIn">
            {spinnerNode}
          </span>
        )}
      </Button>
    )
  }
)

LoadingButton.displayName = "LoadingButton"
