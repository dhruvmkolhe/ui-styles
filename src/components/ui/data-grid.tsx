"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface DataGridColumn<T> {
  id: string
  header: React.ReactNode
  accessorKey?: keyof T
  cell?: (item: T, rowIdx: number, colIdx: number, isFocused: boolean) => React.ReactNode
  width?: string | number
  align?: "left" | "center" | "right"
}

export interface DataGridProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  data: T[]
  columns: DataGridColumn<T>[]
  caption?: string
  bordered?: boolean
  dense?: boolean
  onCellClick?: (rowIdx: number, colIdx: number, item: T) => void
}

export function DataGrid<T>({
  data,
  columns,
  caption,
  bordered = true,
  dense = false,
  onCellClick,
  className,
  ...props
}: DataGridProps<T>) {
  const [focusedCell, setFocusedCell] = React.useState<{ row: number; col: number } | null>(null)
  const gridRef = React.useRef<HTMLTableElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTableElement>) => {
    if (!focusedCell) {
      if (["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
        e.preventDefault()
        setFocusedCell({ row: 0, col: 0 })
      }
      return
    }

    const { row, col } = focusedCell
    const maxRow = data.length - 1
    const maxCol = columns.length - 1

    switch (e.key) {
      case "ArrowRight":
        e.preventDefault()
        setFocusedCell({ row, col: Math.min(maxCol, col + 1) })
        break
      case "ArrowLeft":
        e.preventDefault()
        setFocusedCell({ row, col: Math.max(0, col - 1) })
        break
      case "ArrowDown":
        e.preventDefault()
        setFocusedCell({ row: Math.min(maxRow, row + 1), col })
        break
      case "ArrowUp":
        e.preventDefault()
        setFocusedCell({ row: Math.max(0, row - 1), col })
        break
      case "Home":
        e.preventDefault()
        setFocusedCell({ row, col: 0 })
        break
      case "End":
        e.preventDefault()
        setFocusedCell({ row, col: maxCol })
        break
      case "PageDown":
        e.preventDefault()
        setFocusedCell({ row: Math.min(maxRow, row + 5), col })
        break
      case "PageUp":
        e.preventDefault()
        setFocusedCell({ row: Math.max(0, row - 5), col })
        break
      case "Enter":
      case " ":
        if (data[row]) {
          e.preventDefault()
          onCellClick?.(row, col, data[row])
        }
        break
    }
  }

  // Focus active cell element
  React.useEffect(() => {
    if (focusedCell && gridRef.current) {
      const cellEl = gridRef.current.querySelector(
        `[data-row="${focusedCell.row}"][data-col="${focusedCell.col}"]`
      ) as HTMLElement | null
      cellEl?.focus()
    }
  }, [focusedCell])

  return (
    <div
      className={cn(
        "relative w-full overflow-auto rounded-lg",
        bordered && "border border-border bg-card",
        className
      )}
      {...props}
    >
      <table
        ref={gridRef}
        role="grid"
        aria-label={caption ?? "Interactive data grid"}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="w-full border-collapse text-left text-xs select-none focus:outline-none"
      >
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr role="row" className="border-b border-border bg-muted/40">
            {columns.map((column, colIdx) => (
              <th
                key={column.id}
                role="columnheader"
                scope="col"
                style={{ width: column.width }}
                className={cn(
                  "font-semibold text-muted-foreground uppercase tracking-wider text-[11px]",
                  dense ? "px-2.5 py-1.5" : "px-3.5 py-2.5",
                  column.align === "center" && "text-center",
                  column.align === "right" && "text-right",
                  colIdx > 0 && "border-l border-border/40"
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody role="rowgroup">
          {data.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              role="row"
              className={cn(
                "border-b border-border/50 transition-colors hover:bg-muted/30 last:border-b-0",
                rowIdx % 2 === 1 && "bg-muted/10"
              )}
            >
              {columns.map((column, colIdx) => {
                const isFocused =
                  focusedCell?.row === rowIdx && focusedCell?.col === colIdx
                return (
                  <td
                    key={column.id}
                    role="gridcell"
                    tabIndex={isFocused ? 0 : -1}
                    data-row={rowIdx}
                    data-col={colIdx}
                    onClick={() => {
                      setFocusedCell({ row: rowIdx, col: colIdx })
                      onCellClick?.(rowIdx, colIdx, row)
                    }}
                    className={cn(
                      "transition-all font-mono",
                      dense ? "px-2.5 py-1.5" : "px-3.5 py-2",
                      column.align === "center" && "text-center",
                      column.align === "right" && "text-right",
                      colIdx > 0 && "border-l border-border/40",
                      isFocused &&
                        "outline-none ring-2 ring-primary ring-inset bg-primary/10 z-10 font-bold"
                    )}
                  >
                    {column.cell
                      ? column.cell(row, rowIdx, colIdx, isFocused)
                      : column.accessorKey
                      ? String(row[column.accessorKey] ?? "")
                      : null}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
