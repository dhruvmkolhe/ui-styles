import * as React from "react"
import { cn } from "@/lib/utils"

export interface ImageGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4
}

export const ImageGallery = React.forwardRef<HTMLDivElement, ImageGalleryProps>(
  ({ className, columns = 3, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid gap-4",
          {
            "grid-cols-1 sm:grid-cols-2": columns === 2,
            "grid-cols-1 sm:grid-cols-2 md:grid-cols-3": columns === 3,
            "grid-cols-1 sm:grid-cols-2 md:grid-cols-4": columns === 4,
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ImageGallery.displayName = "ImageGallery"

export const ImageGalleryItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative aspect-square overflow-hidden rounded-md group cursor-pointer", className)}
        {...props}
      >
        {children}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 pointer-events-none" />
      </div>
    )
  }
)
ImageGalleryItem.displayName = "ImageGalleryItem"
