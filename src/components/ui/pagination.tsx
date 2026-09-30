import * as React from "react"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-wrap items-center gap-1 sm:gap-1.5", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
  isDisabled?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">

const PaginationLink = ({
  className,
  isActive,
  isDisabled,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    aria-disabled={isDisabled ? true : undefined}
    tabIndex={isDisabled ? -1 : 0}
    className={cn(
      buttonVariants({
        variant: isActive ? "default" : "outline",
        size,
      }),
      "cursor-pointer select-none",
      isActive && "pointer-events-none font-semibold",
      isDisabled && "pointer-events-none opacity-40 cursor-not-allowed",
      className
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  label = "Previous",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { label?: string }) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5 sm:pl-3", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span className="hidden sm:inline">{label}</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  label = "Next",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { label?: string }) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5 sm:pr-3", className)}
    {...props}
  >
    <span className="hidden sm:inline">{label}</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationFirst = ({
  className,
  label = "First",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { label?: string }) => (
  <PaginationLink
    aria-label="Go to first page"
    size="icon"
    title={label}
    className={cn("h-9 w-9", className)}
    {...props}
  >
    <ChevronsLeft className="h-4 w-4" />
    <span className="sr-only">{label}</span>
  </PaginationLink>
)
PaginationFirst.displayName = "PaginationFirst"

const PaginationLast = ({
  className,
  label = "Last",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { label?: string }) => (
  <PaginationLink
    aria-label="Go to last page"
    size="icon"
    title={label}
    className={cn("h-9 w-9", className)}
    {...props}
  >
    <ChevronsRight className="h-4 w-4" />
    <span className="sr-only">{label}</span>
  </PaginationLink>
)
PaginationLast.displayName = "PaginationLast"

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center text-muted-foreground", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

/* -------------------------------------------------------------------------- */
/* High-Level All-in-One PaginationNav Component                              */
/* -------------------------------------------------------------------------- */

export interface PaginationNavProps extends React.ComponentProps<"nav"> {
  page: number
  totalPages: number
  onPageChange: (newPage: number) => void
  siblingCount?: number
  showFirstLast?: boolean
  compactOnMobile?: boolean
  disabled?: boolean
}

export function generatePaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number = 1
): (number | "ellipsis")[] {
  const totalPageNumbers = siblingCount * 2 + 5 // siblings + current + first + last + 2 ellipses

  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

  const shouldShowLeftEllipsis = leftSiblingIndex > 2
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1

  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1)
    return [...leftRange, "ellipsis", totalPages]
  }

  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    )
    return [1, "ellipsis", ...rightRange]
  }

  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i
  )
  return [1, "ellipsis", ...middleRange, "ellipsis", totalPages]
}

export function PaginationNav({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  compactOnMobile = true,
  disabled = false,
  className,
  ...props
}: PaginationNavProps) {
  const safeTotal = Math.max(1, totalPages)
  const safePage = Math.min(Math.max(1, page), safeTotal)
  const range = generatePaginationRange(safePage, safeTotal, siblingCount)

  const handlePage = (p: number) => {
    if (disabled || p < 1 || p > safeTotal || p === safePage) return
    onPageChange(p)
  }

  return (
    <Pagination className={className} {...props}>
      <PaginationContent>
        {/* First Button */}
        {showFirstLast && (
          <PaginationItem>
            <PaginationFirst
              isDisabled={disabled || safePage <= 1}
              onClick={(e) => {
                e.preventDefault()
                handlePage(1)
              }}
            />
          </PaginationItem>
        )}

        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            isDisabled={disabled || safePage <= 1}
            onClick={(e) => {
              e.preventDefault()
              handlePage(safePage - 1)
            }}
          />
        </PaginationItem>

        {/* Mobile View: Page X of Y */}
        {compactOnMobile && (
          <li className="flex sm:hidden items-center px-2 text-xs font-medium text-muted-foreground">
            Page {safePage} of {safeTotal}
          </li>
        )}

        {/* Desktop Number Buttons */}
        {range.map((item, index) => {
          if (item === "ellipsis") {
            return (
              <PaginationItem
                key={`ellipsis-${index}`}
                className={cn(compactOnMobile && "hidden sm:inline-block")}
              >
                <PaginationEllipsis />
              </PaginationItem>
            )
          }

          const isCurrent = item === safePage

          return (
            <PaginationItem
              key={`page-${item}`}
              className={cn(compactOnMobile && "hidden sm:inline-block")}
            >
              <PaginationLink
                isActive={isCurrent}
                isDisabled={disabled}
                onClick={(e) => {
                  e.preventDefault()
                  handlePage(item)
                }}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            isDisabled={disabled || safePage >= safeTotal}
            onClick={(e) => {
              e.preventDefault()
              handlePage(safePage + 1)
            }}
          />
        </PaginationItem>

        {/* Last Button */}
        {showFirstLast && (
          <PaginationItem>
            <PaginationLast
              isDisabled={disabled || safePage >= safeTotal}
              onClick={(e) => {
                e.preventDefault()
                handlePage(safeTotal)
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
  PaginationEllipsis,
}
