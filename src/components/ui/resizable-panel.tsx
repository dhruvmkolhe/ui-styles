"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { GripVertical, GripHorizontal } from "lucide-react"

interface ResizableContextValue {
  direction: "horizontal" | "vertical"
  sizes: number[]
  setPanelSize: (index: number, newSize: number) => void
  startDragging: (index: number, e: React.PointerEvent<HTMLDivElement>) => void
  activeHandle: number | null
}

const ResizableContext = React.createContext<ResizableContextValue | null>(null)

export interface ResizablePanelGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical"
  children: React.ReactNode
}

export function ResizablePanelGroup({
  direction = "horizontal",
  className,
  children,
  ...props
}: ResizablePanelGroupProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const isHorizontal = direction === "horizontal"

  // Count panels and extract initial sizes
  const validChildren = React.Children.toArray(children).filter(Boolean)
  const panelChildren = validChildren.filter(
    (c) => React.isValidElement(c) && (c.type as any).displayName === "ResizablePanel"
  )

  const [sizes, setSizes] = React.useState<number[]>(() => {
    const totalPanels = panelChildren.length || 2
    const defaultPercent = 100 / totalPanels
    return panelChildren.map(
      (c) => (React.isValidElement(c) && c.props.defaultSize) ?? defaultPercent
    )
  })

  const [activeHandle, setActiveHandle] = React.useState<number | null>(null)

  const handlePointerDown = (index: number, e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    setActiveHandle(index)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activeHandle === null || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pos = isHorizontal
      ? ((e.clientX - rect.left) / rect.width) * 100
      : ((e.clientY - rect.top) / rect.height) * 100

    setSizes((prev) => {
      const next = [...prev]
      const clamped = Math.max(15, Math.min(85, pos))
      next[activeHandle] = clamped
      if (next[activeHandle + 1] !== undefined) {
        next[activeHandle + 1] = 100 - clamped
      }
      return next
    })
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activeHandle !== null) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId)
      } catch {
        // ignore
      }
      setActiveHandle(null)
    }
  }

  const setPanelSize = (index: number, newSize: number) => {
    setSizes((prev) => {
      const next = [...prev]
      const clamped = Math.max(15, Math.min(85, newSize))
      next[index] = clamped
      if (next[index + 1] !== undefined) {
        next[index + 1] = 100 - clamped
      }
      return next
    })
  }

  let panelIdx = 0
  let handleIdx = 0

  return (
    <ResizableContext.Provider
      value={{
        direction,
        sizes,
        setPanelSize,
        startDragging: handlePointerDown,
        activeHandle,
      }}
    >
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={cn(
          "relative flex overflow-hidden rounded-lg border border-border bg-card w-full select-none",
          isHorizontal ? "flex-row h-72" : "flex-col h-96",
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child
          if ((child.type as any).displayName === "ResizablePanel") {
            const currentIdx = panelIdx++
            return React.cloneElement(child as React.ReactElement<any>, {
              _index: currentIdx,
              _size: sizes[currentIdx] ?? 50,
            })
          }
          if ((child.type as any).displayName === "ResizableHandle") {
            const currentHandle = handleIdx++
            return React.cloneElement(child as React.ReactElement<any>, {
              _index: currentHandle,
            })
          }
          return child
        })}
      </div>
    </ResizableContext.Provider>
  )
}

export interface ResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultSize?: number
  minSize?: number
  maxSize?: number
  collapsible?: boolean
  _index?: number
  _size?: number
}

export const ResizablePanel = React.forwardRef<HTMLDivElement, ResizablePanelProps>(
  (
    {
      className,
      defaultSize,
      minSize = 15,
      maxSize = 85,
      collapsible = false,
      _index = 0,
      _size = 50,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const ctx = React.useContext(ResizableContext)
    const isHorizontal = ctx?.direction === "horizontal"

    return (
      <div
        ref={ref}
        style={{
          [isHorizontal ? "width" : "height"]: `${_size}%`,
          ...style,
        }}
        className={cn("overflow-auto min-w-0 min-h-0", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ResizablePanel.displayName = "ResizablePanel"

export interface ResizableHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  withHandle?: boolean
  disabled?: boolean
  _index?: number
}

export const ResizableHandle = React.forwardRef<HTMLDivElement, ResizableHandleProps>(
  (
    {
      className,
      withHandle = true,
      disabled = false,
      _index = 0,
      ...props
    },
    ref
  ) => {
    const ctx = React.useContext(ResizableContext)
    if (!ctx) return null

    const isHorizontal = ctx.direction === "horizontal"
    const currentSize = ctx.sizes[_index] ?? 50

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return
      const step = 2
      if (
        (isHorizontal && e.key === "ArrowLeft") ||
        (!isHorizontal && e.key === "ArrowUp")
      ) {
        e.preventDefault()
        ctx.setPanelSize(_index, currentSize - step)
      } else if (
        (isHorizontal && e.key === "ArrowRight") ||
        (!isHorizontal && e.key === "ArrowDown")
      ) {
        e.preventDefault()
        ctx.setPanelSize(_index, currentSize + step)
      } else if (e.key === "Home") {
        e.preventDefault()
        ctx.setPanelSize(_index, 15)
      } else if (e.key === "End") {
        e.preventDefault()
        ctx.setPanelSize(_index, 85)
      }
    }

    return (
      <div
        ref={ref}
        role="separator"
        tabIndex={disabled ? -1 : 0}
        aria-orientation={ctx.direction}
        aria-valuenow={Math.round(currentSize)}
        aria-valuemin={15}
        aria-valuemax={85}
        aria-label="Panel resize handle"
        onPointerDown={(e) => ctx.startDragging(_index, e)}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative flex items-center justify-center bg-border transition-colors outline-none",
          isHorizontal
            ? "w-2 cursor-col-resize hover:bg-primary/40 focus-visible:bg-primary"
            : "h-2 cursor-row-resize hover:bg-primary/40 focus-visible:bg-primary",
          ctx.activeHandle === _index && "bg-primary text-primary-foreground",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        {...props}
      >
        {withHandle && (
          <div className="z-10 flex h-4 w-3 items-center justify-center rounded-xs bg-border">
            {isHorizontal ? (
              <GripVertical className="h-2.5 w-2.5 text-muted-foreground" />
            ) : (
              <GripHorizontal className="h-2.5 w-2.5 text-muted-foreground" />
            )}
          </div>
        )}
      </div>
    )
  }
)
ResizableHandle.displayName = "ResizableHandle"
