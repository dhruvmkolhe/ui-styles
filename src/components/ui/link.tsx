import * as React from "react"
import NextLink, { LinkProps as NextLinkProps } from "next/link"
import { ExternalLink } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

export const linkVariants = cva(
  "inline-flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-xs font-medium cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "text-primary hover:text-primary/80 underline-offset-4 hover:underline",
        subtle:
          "text-muted-foreground hover:text-foreground underline-offset-4 hover:underline",
        underline:
          "text-foreground underline underline-offset-4 hover:opacity-80",
        ghost:
          "text-foreground hover:text-primary",
        destructive:
          "text-destructive hover:text-destructive/80 underline-offset-4 hover:underline",
      },
      underline: {
        always: "underline",
        hover: "hover:underline no-underline",
        none: "no-underline hover:no-underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  href: string
  isExternal?: boolean
  showExternalIcon?: boolean
  isActive?: boolean
  disabled?: boolean
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      isExternal,
      showExternalIcon = false,
      isActive = false,
      disabled = false,
      className,
      variant,
      underline,
      children,
      onClick,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    // Sanitize unsafe protocols (e.g. javascript:, data:, vbscript:) to prevent XSS
    const isUnsafeProtocol = /^(javascript|data|vbscript):/i.test(href.trim())
    const sanitizedHref = isUnsafeProtocol ? "#" : href

    // Detect external link if not explicitly provided
    const external =
      isExternal !== undefined
        ? isExternal
        : sanitizedHref.startsWith("http://") ||
          sanitizedHref.startsWith("https://") ||
          sanitizedHref.startsWith("//")

    const finalTarget = external ? (target || "_blank") : target
    const finalRel = external
      ? (rel || "noopener noreferrer")
      : rel

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled || isUnsafeProtocol) {
        e.preventDefault()
        return
      }
      onClick?.(e)
    }

    const content = (
      <>
        {children}
        {external && showExternalIcon && (
          <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden="true" />
        )}
        {finalTarget === "_blank" && (
          <span className="sr-only"> (opens in a new tab)</span>
        )}
      </>
    )

    const classes = cn(
      linkVariants({ variant, underline, className }),
      isActive && "font-bold text-foreground",
      disabled && "opacity-50 pointer-events-none cursor-not-allowed select-none"
    )

    if (external || sanitizedHref.startsWith("#") || disabled || isUnsafeProtocol) {
      return (
        <a
          ref={ref}
          href={disabled ? undefined : sanitizedHref}
          target={finalTarget}
          rel={finalRel}
          aria-current={isActive ? "page" : undefined}
          aria-disabled={disabled ? "true" : undefined}
          tabIndex={disabled ? -1 : props.tabIndex}
          onClick={handleClick}
          className={classes}
          {...props}
        >
          {content}
        </a>
      )
    }

    return (
      <NextLink
        ref={ref}
        href={sanitizedHref}
        aria-current={isActive ? "page" : undefined}
        aria-disabled={disabled ? "true" : undefined}
        tabIndex={disabled ? -1 : props.tabIndex}
        onClick={handleClick}
        className={classes}
        {...props}
      >
        {content}
      </NextLink>
    )
  }
)
Link.displayName = "Link"
