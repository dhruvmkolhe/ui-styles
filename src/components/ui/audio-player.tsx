import * as React from "react"
import { cn } from "@/lib/utils"

export interface AudioPlayerProps extends React.AudioHTMLAttributes<HTMLAudioElement> {}

export const AudioPlayer = React.forwardRef<HTMLAudioElement, AudioPlayerProps>(
  ({ className, controls = true, ...props }, ref) => {
    return (
      <div className={cn("flex w-full items-center p-2 rounded-md bg-muted/50 border", className)}>
        <audio
          ref={ref}
          className="w-full h-10 outline-none"
          controls={controls}
          {...props}
        />
      </div>
    )
  }
)
AudioPlayer.displayName = "AudioPlayer"
