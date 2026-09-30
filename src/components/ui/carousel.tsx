import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ className, children, ...props }, ref) => {
    const scrollRef = React.useRef<HTMLDivElement>(null)

    const scrollLeft = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
      }
    }

    const scrollRight = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
      }
    }

    return (
      <div className={cn("relative group", className)} ref={ref} {...props}>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {children}
        </div>
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-background/80 text-foreground shadow-sm opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-background/80 text-foreground shadow-sm opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    )
  }
)
Carousel.displayName = "Carousel"

export const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex-none w-[80%] sm:w-[60%] md:w-[40%] snap-center", className)}
      {...props}
    />
  )
)
CarouselItem.displayName = "CarouselItem"
