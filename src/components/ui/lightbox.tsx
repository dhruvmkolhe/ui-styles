import * as React from "react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "./dialog"
import { X, Maximize2 } from "lucide-react"

export interface LightboxProps {
  children: React.ReactNode
  trigger?: React.ReactNode
  className?: string
  alt?: string
}

export const Lightbox = ({ children, trigger, className, alt = "Media" }: LightboxProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ? trigger : (
          <button className={cn("relative group overflow-hidden rounded-md cursor-zoom-in block w-full h-full", className)}>
            {children}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <Maximize2 className="text-white opacity-0 group-hover:opacity-100 w-8 h-8 drop-shadow-md transition-opacity" />
            </div>
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-fit h-fit p-0 overflow-hidden bg-transparent border-none shadow-none flex flex-col justify-center items-center">
        <DialogTitle className="sr-only">Lightbox: {alt}</DialogTitle>
        <DialogDescription className="sr-only">Viewing {alt} in fullscreen.</DialogDescription>
        <div className="relative w-full h-full flex items-center justify-center">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}
