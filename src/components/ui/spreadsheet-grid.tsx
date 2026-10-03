"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Table, Copy, Check, RotateCcw, FunctionSquare } from "lucide-react"
import { evaluateSafeFormula } from "./formula-editor"

export interface SpreadsheetCell {
  raw: string // e.g. "120" or "=SUM(A1, B1)"
}

export type SpreadsheetGridData = Record<string, SpreadsheetCell>

export interface SpreadsheetGridProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  initialData?: SpreadsheetGridData
  rowsCount?: number
  colsCount?: number
  onChange?: (data: SpreadsheetGridData) => void
  readOnly?: boolean
}

const DEFAULT_COLS = ["A", "B", "C", "D"]
const DEFAULT_ROWS = [1, 2, 3, 4, 5]

const DEFAULT_DATA: SpreadsheetGridData = {
  A1: { raw: "150" },
  B1: { raw: "250" },
  C1: { raw: "=A1+B1" },
  D1: { raw: "Q1 Sales" },

  A2: { raw: "180" },
  B2: { raw: "320" },
  C2: { raw: "=A2+B2" },
  D2: { raw: "Q2 Sales" },

  A3: { raw: "=SUM(A1,A2)" },
  B3: { raw: "=SUM(B1,B2)" },
  C3: { raw: "=SUM(C1,C2)" },
  D3: { raw: "Total" },
}

export const SpreadsheetGrid = React.forwardRef<HTMLDivElement, SpreadsheetGridProps>(
  (
    {
      className,
      initialData = DEFAULT_DATA,
      rowsCount = 5,
      colsCount = 4,
      onChange,
      readOnly = false,
      ...props
    },
    ref
  ) => {
    const [gridData, setGridData] = React.useState<SpreadsheetGridData>(initialData)
    const [selectedCell, setSelectedCell] = React.useState<string>("C1")
    const [isEditing, setIsEditing] = React.useState<boolean>(false)
    const [editValue, setEditValue] = React.useState<string>("")
    const [copied, setCopied] = React.useState<boolean>(false)

    const columns = DEFAULT_COLS.slice(0, colsCount)
    const rows = Array.from({ length: rowsCount }, (_, i) => i + 1)

    // Compute cell values with formula resolution
    const computedValues = React.useMemo(() => {
      const resolved: Record<string, any> = {}

      // First pass: extract numerical literals and strings
      for (const [coord, cell] of Object.entries(gridData)) {
        if (!cell.raw.startsWith("=")) {
          resolved[coord] = isNaN(Number(cell.raw)) ? cell.raw : Number(cell.raw)
        }
      }

      // Second pass: evaluate formulas
      for (const [coord, cell] of Object.entries(gridData)) {
        if (cell.raw.startsWith("=")) {
          const evalResult = evaluateSafeFormula(cell.raw, resolved)
          resolved[coord] = evalResult.error ? "#ERROR!" : evalResult.result
        }
      }

      return resolved
    }, [gridData])

    const startEditing = (coord: string) => {
      if (readOnly) return
      setSelectedCell(coord)
      setEditValue(gridData[coord]?.raw || "")
      setIsEditing(true)
    }

    const saveCellEdit = () => {
      if (!isEditing) return
      const nextData = {
        ...gridData,
        [selectedCell]: { raw: editValue },
      }
      setGridData(nextData)
      onChange?.(nextData)
      setIsEditing(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (isEditing) {
        if (e.key === "Enter") {
          e.preventDefault()
          saveCellEdit()
        } else if (e.key === "Escape") {
          setIsEditing(false)
        }
        return
      }

      // Parse current column and row
      const colLetter = selectedCell.charAt(0)
      const rowNum = parseInt(selectedCell.slice(1), 10)
      const colIdx = columns.indexOf(colLetter)

      if (e.key === "Enter") {
        e.preventDefault()
        startEditing(selectedCell)
      } else if (e.key === "ArrowUp" && rowNum > 1) {
        e.preventDefault()
        setSelectedCell(`${colLetter}${rowNum - 1}`)
      } else if (e.key === "ArrowDown" && rowNum < rows.length) {
        e.preventDefault()
        setSelectedCell(`${colLetter}${rowNum + 1}`)
      } else if (e.key === "ArrowLeft" && colIdx > 0) {
        e.preventDefault()
        setSelectedCell(`${columns[colIdx - 1]}${rowNum}`)
      } else if (e.key === "ArrowRight" && colIdx < columns.length - 1) {
        e.preventDefault()
        setSelectedCell(`${columns[colIdx + 1]}${rowNum}`)
      }
    }

    const handleCopyTSV = () => {
      const lines = rows.map((r) =>
        columns.map((c) => computedValues[`${c}${r}`] ?? "").join("\t")
      )
      navigator.clipboard.writeText(lines.join("\n"))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    return (
      <div
        ref={ref}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className={cn(
          "w-full max-w-3xl rounded-xl border border-border bg-card shadow-sm overflow-hidden text-card-foreground text-xs font-mono outline-hidden focus:ring-1 focus:ring-ring",
          className
        )}
        {...props}
      >
        {/* Top Formula Bar Sync */}
        <div className="flex items-center gap-2 p-2.5 bg-muted/40 border-b border-border">
          <div className="w-12 text-center py-1 px-1.5 rounded bg-background border border-border font-bold text-primary select-none shrink-0">
            {selectedCell}
          </div>

          <span className="text-primary font-bold italic select-none">fx</span>

          {isEditing ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={saveCellEdit}
              autoFocus
              className="flex-1 px-2 py-1 rounded border border-primary bg-background text-foreground text-xs font-semibold outline-hidden"
            />
          ) : (
            <div
              onClick={() => startEditing(selectedCell)}
              className="flex-1 px-2 py-1 rounded bg-background border border-border/80 text-foreground cursor-text truncate"
            >
              {gridData[selectedCell]?.raw || ""}
            </div>
          )}

          <button
            type="button"
            onClick={handleCopyTSV}
            className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-sans text-muted-foreground hover:text-foreground transition-colors shrink-0"
            title="Copy as TSV"
          >
            {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
            <span>{copied ? "Copied" : "Copy TSV"}</span>
          </button>
        </div>

        {/* Spreadsheet Grid Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse select-none">
            <thead>
              <tr className="bg-muted/30 border-b border-border">
                {/* Top-left corner */}
                <th className="w-10 p-1.5 border-r border-border text-center text-muted-foreground font-semibold text-[10px]">
                  #
                </th>
                {columns.map((c) => (
                  <th
                    key={c}
                    className="p-1.5 border-r border-border text-center text-muted-foreground font-bold text-xs uppercase"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((r) => (
                <tr key={r} className="hover:bg-muted/10">
                  {/* Row Number header */}
                  <td className="w-10 p-1.5 border-r border-border bg-muted/20 text-center text-muted-foreground font-bold text-[11px]">
                    {r}
                  </td>

                  {/* Columns */}
                  {columns.map((c) => {
                    const coord = `${c}${r}`
                    const isSelected = selectedCell === coord
                    const val = computedValues[coord]
                    const rawVal = gridData[coord]?.raw || ""
                    const isFormula = rawVal.startsWith("=")

                    return (
                      <td
                        key={coord}
                        onClick={() => setSelectedCell(coord)}
                        onDoubleClick={() => startEditing(coord)}
                        className={cn(
                          "p-2 border-r border-border text-right cursor-cell transition-all font-mono relative",
                          isSelected
                            ? "ring-2 ring-primary ring-inset bg-accent/30 font-semibold"
                            : "hover:bg-muted/30",
                          isFormula && "text-primary"
                        )}
                      >
                        {isEditing && isSelected ? (
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={saveCellEdit}
                            autoFocus
                            className="w-full text-right bg-transparent outline-hidden font-mono text-xs font-bold"
                          />
                        ) : (
                          <span>{val !== undefined ? String(val) : ""}</span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
)

SpreadsheetGrid.displayName = "SpreadsheetGrid"
