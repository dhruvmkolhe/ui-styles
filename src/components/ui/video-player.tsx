import * as React from "react"
import { cn } from "@/lib/utils"

export interface VideoPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {}

export const VideoPlayer = React.forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ className, controls = true, ...props }, ref) => {
    return (
      <div className={cn("relative overflow-hidden rounded-md bg-black", className)}>
        <video
          ref={ref}
          className="w-full h-full object-contain"
          controls={controls}
          {...props}
        />
      </div>
    )
  }
)
VideoPlayer.displayName = "VideoPlayer"
