"use client"

import * as React from "react"
import { ChevronDown, ChevronUp, User, Building, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

export interface OrgNode {
  id: string
  name: string
  role: string
  department?: string
  avatar?: string
  email?: string
  children?: OrgNode[]
}

export interface OrganizationChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: OrgNode
  onNodeClick?: (node: OrgNode) => void
  defaultExpanded?: boolean
}

export function OrgChartCard({
  node,
  hasChildren,
  isExpanded,
  onToggle,
  onNodeClick,
}: {
  node: OrgNode
  hasChildren: boolean
  isExpanded: boolean
  onToggle: () => void
  onNodeClick?: (node: OrgNode) => void
}) {
  return (
    <div className="relative inline-flex flex-col items-center">
      <div
        onClick={() => onNodeClick?.(node)}
        className={cn(
          "w-48 rounded-xl border border-border bg-card p-3 shadow-xs transition-all text-center cursor-pointer select-none",
          "hover:border-primary/60 hover:shadow-md hover:-translate-y-0.5",
          "focus-visible:ring-2 focus-visible:ring-ring"
        )}
      >
        <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs uppercase overflow-hidden">
          {node.avatar ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={node.avatar} alt={node.name} className="h-full w-full object-cover" />
          ) : (
            node.name.slice(0, 2)
          )}
        </div>

        <h4 className="text-xs font-bold text-foreground truncate">{node.name}</h4>
        <p className="text-[11px] font-medium text-primary truncate mt-0.5">{node.role}</p>

        {node.department && (
          <span className="mt-1.5 inline-flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
            <Building className="h-2.5 w-2.5" />
            <span className="truncate">{node.department}</span>
          </span>
        )}
      </div>

      {/* Expand / Collapse Button if has reports */}
      {hasChildren && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onToggle()
          }}
          className="relative z-10 -mt-2.5 flex h-5 w-5 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-xs hover:bg-muted hover:text-foreground transition-colors"
          aria-label={isExpanded ? "Collapse reporting subtree" : "Expand reporting subtree"}
        >
          {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </button>
      )}
    </div>
  )
}

export function OrgSubtree({
  node,
  onNodeClick,
  defaultExpanded,
}: {
  node: OrgNode
  onNodeClick?: (node: OrgNode) => void
  defaultExpanded?: boolean
}) {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded ?? true)
  const hasChildren = Boolean(node.children && node.children.length > 0)

  return (
    <div className="flex flex-col items-center">
      <OrgChartCard
        node={node}
        hasChildren={hasChildren}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
        onNodeClick={onNodeClick}
      />

      {hasChildren && isExpanded && (
        <div className="flex flex-col items-center">
          {/* Vertical stem down from parent to the horizontal crossbar */}
          <div className="h-6 w-[2px] bg-border" />

          {/* Children container with connecting crossbars */}
          <div className="flex justify-center">
            {node.children!.map((child, index) => {
              const isFirst = index === 0
              const isLast = index === node.children!.length - 1
              const isOnly = node.children!.length === 1

              return (
                <div key={child.id} className="relative flex flex-col items-center px-4">
                  {/* Top horizontal crossbar */}
                  {!isOnly && (
                    <>
                      {/* Left half: connects to left sibling */}
                      {!isFirst && (
                        <div className="absolute top-0 left-0 right-1/2 h-[2px] bg-border" />
                      )}
                      {/* Right half: connects to right sibling */}
                      {!isLast && (
                        <div className="absolute top-0 left-1/2 right-0 h-[2px] bg-border" />
                      )}
                    </>
                  )}

                  {/* Vertical stem down to child card */}
                  <div className="h-6 w-[2px] bg-border" />

                  <OrgSubtree
                    node={child}
                    onNodeClick={onNodeClick}
                    defaultExpanded={defaultExpanded}
                  />
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export const OrganizationChart = React.forwardRef<HTMLDivElement, OrganizationChartProps>(
  ({ className, data, onNodeClick, defaultExpanded = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="region"
        aria-label="Organization hierarchy chart"
        className={cn(
          "w-full overflow-x-auto p-6 rounded-xl border border-border bg-card/40 shadow-xs scrollbar-thin select-none",
          className
        )}
        {...props}
      >
        <div className="min-w-fit flex justify-center py-4">
          <OrgSubtree
            node={data}
            onNodeClick={onNodeClick}
            defaultExpanded={defaultExpanded}
          />
        </div>
      </div>
    )
  }
)
OrganizationChart.displayName = "OrganizationChart"
