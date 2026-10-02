"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./table"
import { ChevronUp, ChevronDown, ChevronsUpDown, Search, ChevronLeft, ChevronRight } from "lucide-react"

export type SortDirection = "asc" | "desc" | null

export interface DataTableColumn<T> {
  id: string
  header: React.ReactNode | ((ctx: { sortDirection: SortDirection; toggleSort: () => void }) => React.ReactNode)
  accessorKey?: keyof T
  cell?: (item: T, index: number) => React.ReactNode
  sortable?: boolean
  align?: "left" | "center" | "right"
  width?: string
}

export interface DataTableProps<T extends { id?: string | number }> {
  data: T[]
  columns: DataTableColumn<T>[]
  searchable?: boolean
  searchPlaceholder?: string
  searchKey?: keyof T
  pageSize?: number
  selectable?: boolean
  selectedIds?: (string | number)[]
  onSelectionChange?: (selectedIds: (string | number)[]) => void
  getRowId?: (item: T, globalIndex: number) => string | number
  emptyMessage?: string
  isLoading?: boolean
  className?: string
  tableClassName?: string
}

export function DataTable<T extends { id?: string | number }>({
  data,
  columns,
  searchable = true,
  searchPlaceholder = "Search records...",
  searchKey,
  pageSize = 5,
  selectable = false,
  selectedIds: controlledSelectedIds,
  onSelectionChange,
  getRowId,
  emptyMessage = "No records found.",
  isLoading = false,
  className,
  tableClassName,
}: DataTableProps<T>) {
  const [internalSelectedIds, setInternalSelectedIds] = React.useState<(string | number)[]>([])
  const isSelectedControlled = controlledSelectedIds !== undefined
  const selectedIds = isSelectedControlled ? controlledSelectedIds : internalSelectedIds

  const [searchQuery, setSearchQuery] = React.useState("")
  const [sortColumnId, setSortColumnId] = React.useState<string | null>(null)
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null)
  const [currentPage, setCurrentPage] = React.useState(1)

  const getRowIdentifier = React.useCallback(
    (row: T, pageRelativeIndex: number): string | number => {
      const globalIndex = (currentPage - 1) * pageSize + pageRelativeIndex
      if (getRowId) return getRowId(row, globalIndex)
      if (row.id !== undefined && row.id !== null) return row.id
      return `row-${globalIndex}`
    },
    [getRowId, currentPage, pageSize]
  )

  const handleSelectionToggle = (id: string | number) => {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((item) => item !== id)
      : [...selectedIds, id]
    if (!isSelectedControlled) {
      setInternalSelectedIds(next)
    }
    onSelectionChange?.(next)
  }

  const handleSelectAll = (filteredRows: T[]) => {
    const rowIds = filteredRows.map((r, i) => getRowIdentifier(r, i))
    const allSelected = rowIds.length > 0 && rowIds.every((id) => selectedIds.includes(id))
    const next = allSelected
      ? selectedIds.filter((id) => !rowIds.includes(id))
      : Array.from(new Set([...selectedIds, ...rowIds]))
    if (!isSelectedControlled) {
      setInternalSelectedIds(next)
    }
    onSelectionChange?.(next)
  }

  // Filter
  const filteredData = React.useMemo(() => {
    if (!searchQuery.trim()) return data
    const query = searchQuery.toLowerCase()
    return data.filter((item) => {
      if (searchKey) {
        const val = item[searchKey]
        return val !== undefined && val !== null && String(val).toLowerCase().includes(query)
      }
      return Object.values(item).some(
        (val) => val !== null && val !== undefined && typeof val !== "object" && String(val).toLowerCase().includes(query)
      )
    })
  }, [data, searchQuery, searchKey])

  // Sort
  const sortedData = React.useMemo(() => {
    if (!sortColumnId || !sortDirection) return filteredData
    const column = columns.find((c) => c.id === sortColumnId)
    if (!column || !column.accessorKey) return filteredData

    const key = column.accessorKey
    return [...filteredData].sort((a, b) => {
      const valA = a[key]
      const valB = b[key]
      if (valA === valB) return 0
      if (valA === null || valA === undefined) return 1
      if (valB === null || valB === undefined) return -1
      if (typeof valA === "number" && typeof valB === "number") {
        return sortDirection === "asc" ? valA - valB : valB - valA
      }
      return sortDirection === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA))
    })
  }, [filteredData, sortColumnId, sortDirection, columns])

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize))
  const paginatedData = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return sortedData.slice(start, start + pageSize)
  }, [sortedData, currentPage, pageSize])

  // Reset page when filter/search changes
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  const toggleSort = (columnId: string) => {
    if (sortColumnId !== columnId) {
      setSortColumnId(columnId)
      setSortDirection("asc")
    } else if (sortDirection === "asc") {
      setSortDirection("desc")
    } else {
      setSortColumnId(null)
      setSortDirection(null)
    }
  }

  const allCurrentSelected =
    paginatedData.length > 0 &&
    paginatedData.every((row, i) => selectedIds.includes(getRowIdentifier(row, i)))
  const someCurrentSelected =
    paginatedData.some((row, i) => selectedIds.includes(getRowIdentifier(row, i))) && !allCurrentSelected

  return (
    <div className={cn("w-full space-y-3", className)}>
      {searchable && (
        <div className="flex items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <label htmlFor="data-table-search" className="sr-only">Filter records</label>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <input
              id="data-table-search"
              name="tableSearch"
              type="text"
              autoComplete="off"
              suppressHydrationWarning
              aria-label="Filter records"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full h-8 pl-8 pr-3 text-xs rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary/40 transition-colors"
            />
          </div>
          <div className="text-xs text-muted-foreground whitespace-nowrap">
            {filteredData.length} {filteredData.length === 1 ? "result" : "results"}
          </div>
        </div>
      )}

      <div className="rounded-md border border-border overflow-hidden bg-card">
        <Table className={tableClassName}>
          <TableHeader>
            <TableRow>
              {selectable && (
                <TableHead className="w-10 text-center">
                  <label className="inline-flex items-center justify-center cursor-pointer">
                    <span className="sr-only">Select all rows on this page</span>
                    <input
                      id="data-table-select-all"
                      name="selectAllTableRows"
                      type="checkbox"
                      suppressHydrationWarning
                      aria-label="Select all rows on this page"
                      checked={allCurrentSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = someCurrentSelected
                      }}
                      onChange={() => handleSelectAll(paginatedData)}
                      className="h-3.5 w-3.5 rounded border border-border text-primary focus:ring-1 focus:ring-primary/40 cursor-pointer"
                    />
                  </label>
                </TableHead>
              )}
              {columns.map((column) => {
                const isSorted = sortColumnId === column.id
                return (
                  <TableHead
                    key={column.id}
                    align={column.align}
                    style={{ width: column.width }}
                    aria-sort={
                      isSorted
                        ? sortDirection === "asc"
                          ? "ascending"
                          : "descending"
                        : undefined
                    }
                  >
                    {column.sortable ? (
                      <button
                        type="button"
                        onClick={() => toggleSort(column.id)}
                        className={cn(
                          "inline-flex items-center gap-1.5 font-semibold text-xs transition-colors hover:text-foreground group focus-visible:outline-none focus-visible:underline",
                          column.align === "right" && "justify-end",
                          column.align === "center" && "justify-center"
                        )}
                      >
                        <span>
                          {typeof column.header === "function"
                            ? column.header({
                                sortDirection: isSorted ? sortDirection : null,
                                toggleSort: () => toggleSort(column.id),
                              })
                            : column.header}
                        </span>
                        <span className="text-muted-foreground/60 group-hover:text-foreground">
                          {isSorted ? (
                            sortDirection === "asc" ? (
                              <ChevronUp className="h-3.5 w-3.5 text-primary" />
                            ) : (
                              <ChevronDown className="h-3.5 w-3.5 text-primary" />
                            )
                          ) : (
                            <ChevronsUpDown className="h-3.5 w-3.5 opacity-50" />
                          )}
                        </span>
                      </button>
                    ) : typeof column.header === "function" ? (
                      column.header({
                        sortDirection: null,
                        toggleSort: () => {},
                      })
                    ) : (
                      column.header
                    )}
                  </TableHead>
                )
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="h-24 text-center text-xs text-muted-foreground"
                >
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    <span>Loading data...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="h-24 text-center text-xs text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, index) => {
                const rowId = getRowIdentifier(row, index)
                const isSelected = selectedIds.includes(rowId)
                return (
                  <TableRow key={rowId} isSelected={isSelected}>
                    {selectable && (
                      <TableCell className="w-10 text-center">
                        <label className="inline-flex items-center justify-center cursor-pointer">
                          <span className="sr-only">{`Select row ${index + 1}`}</span>
                          <input
                            id={`data-table-select-row-${rowId}`}
                            name="selectTableRows"
                            type="checkbox"
                            suppressHydrationWarning
                            aria-label={`Select row ${index + 1}`}
                            checked={isSelected}
                            onChange={() => handleSelectionToggle(rowId)}
                            className="h-3.5 w-3.5 rounded border border-border text-primary focus:ring-1 focus:ring-primary/40 cursor-pointer"
                          />
                        </label>
                      </TableCell>
                    )}
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align}>
                        {column.cell
                          ? column.cell(row, index)
                          : column.accessorKey
                          ? String(row[column.accessorKey] ?? "")
                          : null}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-2 pt-1 text-xs">
          <div className="text-muted-foreground">
            Page {currentPage} of {totalPages} ({sortedData.length} items)
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded border border-border bg-background hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-3 w-3" />
              <span>Prev</span>
            </button>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded border border-border bg-background hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <span>Next</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
