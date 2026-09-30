import * as React from "react"
import { cn } from "@/lib/utils"

export interface MediaCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MediaCard = React.forwardRef<HTMLDivElement, MediaCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
MediaCard.displayName = "MediaCard"

export const MediaCardImage = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("relative w-full overflow-hidden", className)} {...props}>
        {children}
      </div>
    )
  }
)
MediaCardImage.displayName = "MediaCardImage"

export const MediaCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("p-4 flex flex-col flex-1", className)} {...props}>
        {children}
      </div>
    )
  }
)
MediaCardContent.displayName = "MediaCardContent"
