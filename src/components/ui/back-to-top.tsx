"use client"

import * as React from "react"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

export interface BackToTopProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  threshold?: number
  smooth?: boolean
  showLabel?: boolean
  label?: string
  position?: "bottom-right" | "bottom-left" | "bottom-center"
}

export function BackToTop({
  threshold = 300,
  smooth = true,
  showLabel = false,
  label = "Back to top",
  position = "bottom-right",
  className,
  ...props
}: BackToTopProps) {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setVisible(window.scrollY > threshold)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    // Initial check
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [threshold])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: smooth ? "smooth" : "auto",
    })
  }

  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
  }[position]

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={label}
      title={label}
      className={cn(
        "fixed z-40 inline-flex items-center justify-center gap-1.5 rounded-full p-3 shadow-lg transition-all duration-300 outline-none select-none",
        "bg-teal-600 text-white hover:bg-teal-700 active:scale-95",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        positionClasses,
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none",
        showLabel && "px-4 rounded-xl",
        className
      )}
      {...props}
    >
      <ArrowUp className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
      {showLabel && <span className="text-xs font-semibold">{label}</span>}
    </button>
  )
}
