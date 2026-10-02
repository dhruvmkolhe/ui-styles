import * as React from "react"
import { cn } from "@/lib/utils"
import { ImageIcon } from "lucide-react"

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, alt, fallbackText = "Failed to load", ...props }, ref) => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [hasError, setHasError] = React.useState(false)

    return (
      <div className={cn("relative overflow-hidden bg-muted flex items-center justify-center", className)}>
        {isLoading && !hasError && (
          <div className="absolute inset-0 animate-pulse bg-muted-foreground/10" />
        )}
        {hasError ? (
          <div className="flex flex-col items-center justify-center text-muted-foreground p-4 text-center h-full w-full">
            <ImageIcon className="h-8 w-8 mb-2 opacity-50" />
            <span className="text-xs">{fallbackText}</span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={ref}
            alt={alt || "Image"}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300",
              isLoading ? "opacity-0" : "opacity-100"
            )}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false)
              setHasError(true)
            }}
            {...props}
          />
        )}
      </div>
    )
  }
)
Image.displayName = "Image"
