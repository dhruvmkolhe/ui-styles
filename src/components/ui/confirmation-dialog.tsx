"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface ConfirmationDialogProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void
  destructive?: boolean
  isLoading?: boolean
  children?: React.ReactNode
  className?: string
}

export function ConfirmationDialog({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  trigger,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  destructive = false,
  isLoading = false,
  children,
  className,
}: ConfirmationDialogProps) {
  const isControlled = controlledOpen !== undefined
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen

  const handleOpenChange = (nextOpen: boolean) => {
    if (isLoading) return // prevent closing while submitting
    if (!isControlled) {
      setUncontrolledOpen(nextOpen)
    }
    onOpenChange?.(nextOpen)
    if (!nextOpen) {
      onCancel?.()
    }
  }

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (isLoading) return
    await onConfirm?.()
    if (!isControlled) {
      setUncontrolledOpen(false)
    }
    onOpenChange?.(false)
  }

  const handleCancel = () => {
    if (isLoading) return
    if (!isControlled) {
      setUncontrolledOpen(false)
    }
    onOpenChange?.(false)
    onCancel?.()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className={cn("sm:max-w-[425px]", className)}
        onEscapeKeyDown={(e) => {
          if (isLoading) e.preventDefault()
        }}
        onPointerDownOutside={(e) => {
          if (isLoading) e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-xs leading-relaxed pt-1">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {children && <div className="py-2 text-sm">{children}</div>}

        <DialogFooter className="gap-2 sm:gap-0 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isLoading}
            onClick={handleCancel}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            size="sm"
            variant={destructive ? "destructive" : "default"}
            disabled={isLoading}
            onClick={handleConfirm}
          >
            {isLoading && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
