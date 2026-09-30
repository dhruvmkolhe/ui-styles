import * as React from "react"
import { ChevronRight, MoreHorizontal } from "lucide-react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  separator?: React.ReactNode
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ ...props }, ref) => <nav ref={ref} aria-label="Breadcrumb" {...props} />
)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    )}
    {...props}
  />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

export interface BreadcrumbLinkProps
  extends React.ComponentPropsWithoutRef<"a"> {
  asChild?: boolean
}

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "a"

    return (
      <Comp
        ref={ref}
        className={cn(
          "transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-xs cursor-pointer",
          className
        )}
        {...props}
      />
    )
  }
)
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-medium text-foreground", className)}
    {...props}
  />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:w-3.5 [&>svg]:h-3.5 text-muted-foreground/60 select-none", className)}
    {...props}
  >
    {children ?? <ChevronRight className="h-3.5 w-3.5" />}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-7 w-7 items-center justify-center rounded-md hover:bg-muted/60 transition-colors", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More breadcrumbs</span>
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

/* -------------------------------------------------------------------------- */
/* High-Level Convenient Breadcrumb Component                                  */
/* -------------------------------------------------------------------------- */

export interface BreadcrumbNavItem {
  label: string
  href?: string
  icon?: React.ReactNode
  isCurrent?: boolean
  disabled?: boolean
}

export interface BreadcrumbNavProps extends React.ComponentPropsWithoutRef<"nav"> {
  items: BreadcrumbNavItem[]
  separator?: React.ReactNode
  maxItems?: number
  itemsBeforeCollapse?: number
  itemsAfterCollapse?: number
  onItemClick?: (item: BreadcrumbNavItem, index: number) => void
}

export function BreadcrumbNav({
  items,
  separator,
  maxItems = 4,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 2,
  onItemClick,
  className,
  ...props
}: BreadcrumbNavProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)

  const shouldCollapse =
    !isExpanded && maxItems > 0 && items.length > maxItems

  let renderItems: Array<{ item: BreadcrumbNavItem; originalIndex: number } | "ellipsis"> = []

  if (shouldCollapse) {
    const head = items.slice(0, itemsBeforeCollapse).map((item, idx) => ({
      item,
      originalIndex: idx,
    }))
    const tailStart = items.length - itemsAfterCollapse
    const tail = items.slice(tailStart).map((item, idx) => ({
      item,
      originalIndex: tailStart + idx,
    }))
    renderItems = [...head, "ellipsis", ...tail]
  } else {
    renderItems = items.map((item, idx) => ({ item, originalIndex: idx }))
  }

  return (
    <Breadcrumb className={className} {...props}>
      <BreadcrumbList>
        {renderItems.map((entry, index) => {
          const isLast = index === renderItems.length - 1

          if (entry === "ellipsis") {
            return (
              <React.Fragment key={`ellipsis-${index}`}>
                <BreadcrumbItem>
                  <button
                    type="button"
                    onClick={() => setIsExpanded(true)}
                    className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded"
                    title="Show all breadcrumbs"
                  >
                    <BreadcrumbEllipsis />
                  </button>
                </BreadcrumbItem>
                <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
              </React.Fragment>
            )
          }

          const { item, originalIndex } = entry
          const isCurrentPage = item.isCurrent ?? isLast

          return (
            <React.Fragment key={`${item.label}-${originalIndex}`}>
              <BreadcrumbItem>
                {isCurrentPage ? (
                  <BreadcrumbPage className="flex items-center gap-1.5">
                    {item.icon}
                    <span className="truncate max-w-[200px] sm:max-w-xs">{item.label}</span>
                  </BreadcrumbPage>
                ) : item.disabled ? (
                  <span className="flex items-center gap-1.5 opacity-50 cursor-not-allowed">
                    {item.icon}
                    <span className="truncate max-w-[150px]">{item.label}</span>
                  </span>
                ) : (
                  <BreadcrumbLink
                    href={item.href || "#"}
                    onClick={(e) => {
                      if (onItemClick) {
                        e.preventDefault()
                        onItemClick(item, originalIndex)
                      }
                    }}
                    className="flex items-center gap-1.5"
                  >
                    {item.icon}
                    <span className="truncate max-w-[150px]">{item.label}</span>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
