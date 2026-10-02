"use client"

import * as React from "react"
import { Filter as FilterIcon, X, Check, ChevronDown, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

export interface FilterOption {
  label: string
  value: string
  count?: number
  disabled?: boolean
}

export type FilterValue = string | number | boolean | string[] | number[] | undefined | null;

export interface FilterConfig {
  id: string
  label: string
  type: "select" | "multi-select" | "checkbox" | "radio" | "range" | "text"
  options?: FilterOption[]
  min?: number
  max?: number
  step?: number
  placeholder?: string
  defaultValue?: FilterValue
}

export interface FilterProps {
  filters: FilterConfig[]
  values?: Record<string, FilterValue>
  defaultValues?: Record<string, FilterValue>
  onChange?: (values: Record<string, FilterValue>) => void
  onClearAll?: () => void
  onClearFilter?: (filterId: string) => void
  disabled?: boolean
  className?: string
  showClearAll?: boolean
  title?: string
}

export function Filter({
  filters,
  values: controlledValues,
  defaultValues = {},
  onChange,
  onClearAll,
  onClearFilter,
  disabled = false,
  className,
  showClearAll = true,
  title = "Filters",
}: FilterProps) {
  const instanceId = React.useId()
  const isControlled = controlledValues !== undefined
  const [uncontrolledValues, setUncontrolledValues] = React.useState<Record<string, FilterValue>>(() => {
    const initial: Record<string, FilterValue> = { ...defaultValues }
    filters.forEach((f) => {
      if (initial[f.id] === undefined && f.defaultValue !== undefined) {
        initial[f.id] = f.defaultValue
      }
    })
    return initial
  })

  const currentValues = isControlled ? controlledValues : uncontrolledValues
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)

  const activeCount = React.useMemo(() => {
    let count = 0
    filters.forEach((f) => {
      const val = currentValues[f.id]
      if (val !== undefined && val !== null && val !== "") {
        if (Array.isArray(val) && val.length > 0) count++
        else if (!Array.isArray(val)) count++
      }
    })
    return count
  }, [filters, currentValues])

  const updateValue = (id: string, nextVal: any) => {
    const updated = { ...currentValues, [id]: nextVal }
    if (!isControlled) {
      setUncontrolledValues(updated)
    }
    onChange?.(updated)
  }

  const handleClearSingle = (id: string) => {
    const updated = { ...currentValues }
    delete updated[id]
    if (!isControlled) {
      setUncontrolledValues(updated)
    }
    onChange?.(updated)
    onClearFilter?.(id)
  }

  const handleClearAll = () => {
    if (!isControlled) {
      setUncontrolledValues({})
    }
    onChange?.({})
    onClearAll?.()
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-4 shadow-xs space-y-4",
        disabled && "opacity-60 pointer-events-none cursor-not-allowed",
        className
      )}
    >
      {/* Filter Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <FilterIcon className="h-4 w-4 text-primary" aria-hidden="true" />
          <h4 className="text-sm font-semibold text-foreground">{title}</h4>
          {activeCount > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
              {activeCount} active
            </span>
          )}
        </div>

        {showClearAll && activeCount > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Reset all
          </button>
        )}
      </div>

      {/* Filter Controls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filters.map((filter) => {
          const val = currentValues[filter.id]
          const isFilterActive =
            val !== undefined &&
            val !== null &&
            val !== "" &&
            (!Array.isArray(val) || val.length > 0)

          return (
            <div
              key={filter.id}
              className={cn(
                "rounded-lg border p-2.5 transition-colors relative flex flex-col justify-between",
                isFilterActive ? "border-primary/50 bg-primary/5" : "border-border bg-background"
              )}
            >
              <div className="flex items-center justify-between gap-1 mb-1.5">
                {filter.type === "radio" || filter.type === "checkbox" || filter.type === "multi-select" ? (
                  <span className="text-xs font-semibold text-foreground line-clamp-1">
                    {filter.label}
                  </span>
                ) : (
                  <label htmlFor={`${instanceId}-${filter.id}`} className="text-xs font-semibold text-foreground line-clamp-1 cursor-pointer">
                    {filter.label}
                  </label>
                )}
                {isFilterActive && (
                  <button
                    type="button"
                    onClick={() => handleClearSingle(filter.id)}
                    className="text-muted-foreground hover:text-destructive p-0.5 rounded transition-colors"
                    aria-label={`Clear ${filter.label} filter`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Select */}
              {filter.type === "select" && (
                <div className="relative">
                  <select
                    id={`${instanceId}-${filter.id}`}
                    name={`${instanceId}-${filter.id}`}
                    aria-label={filter.label}
                    value={typeof val === "string" || typeof val === "number" ? val : ""}
                    onChange={(e) => updateValue(filter.id, e.target.value)}
                    disabled={disabled}
                    className="w-full h-8 text-xs rounded-md border border-input bg-background px-2 pr-7 text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="">{filter.placeholder || "All options"}</option>
                    {filter.options?.map((opt) => (
                      <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                        {opt.label} {opt.count !== undefined ? `(${opt.count})` : ""}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Radio */}
              {filter.type === "radio" && (
                <div className="space-y-1 mt-1">
                  {filter.options?.map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-2 text-xs text-foreground cursor-pointer select-none"
                    >
                      <input
                        type="radio"
                        id={`${instanceId}-${filter.id}-${opt.value}`}
                        name={`${instanceId}-${filter.id}`}
                        aria-label={opt.label}
                        value={opt.value}
                        suppressHydrationWarning
                        checked={val === opt.value}
                        onChange={() => updateValue(filter.id, opt.value)}
                        disabled={disabled || opt.disabled}
                        className="text-primary focus:ring-primary h-3.5 w-3.5"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Checkbox / Multi-Select Pills */}
              {(filter.type === "checkbox" || filter.type === "multi-select") && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {filter.options?.map((opt) => {
                    const selectedList: string[] = Array.isArray(val) ? (val as string[]) : []
                    const isSelected = selectedList.includes(opt.value)

                    return (
                      <button
                        key={opt.value}
                        type="button"
                        role="checkbox"
                        aria-checked={isSelected}
                        aria-label={opt.label}
                        onClick={() => {
                          const next = isSelected
                            ? selectedList.filter((v) => v !== opt.value)
                            : [...selectedList, opt.value]
                          updateValue(filter.id, next)
                        }}
                        disabled={disabled || opt.disabled}
                        className={cn(
                          "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors border",
                          isSelected
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-muted/40 text-muted-foreground border-border hover:bg-muted"
                        )}
                      >
                        {isSelected && <Check className="h-3 w-3" />}
                        {opt.label}
                        {opt.count !== undefined && (
                          <span className="opacity-70 text-[10px]">({opt.count})</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}

              {/* Range Slider */}
              {filter.type === "range" && (
                <div className="space-y-1.5 mt-1">
                  <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
                    <span>{filter.min ?? 0}</span>
                    <span className="font-bold text-foreground">
                      {val !== undefined ? val : filter.max ?? 100}
                    </span>
                    <span>{filter.max ?? 100}</span>
                  </div>
                  <input
                    type="range"
                    id={`${instanceId}-${filter.id}`}
                    name={`${instanceId}-${filter.id}`}
                    aria-label={filter.label}
                    suppressHydrationWarning
                    min={filter.min ?? 0}
                    max={filter.max ?? 100}
                    step={filter.step ?? 1}
                    value={typeof val === "number" ? val : filter.max ?? 100}
                    onChange={(e) => updateValue(filter.id, Number(e.target.value))}
                    disabled={disabled}
                    className="w-full accent-primary h-1.5 rounded-lg bg-muted cursor-pointer"
                  />
                </div>
              )}

              {/* Text Search */}
              {filter.type === "text" && (
                <input
                  type="text"
                  id={`${instanceId}-${filter.id}`}
                  name={`${instanceId}-${filter.id}`}
                  aria-label={filter.label || "Filter text"}
                  autoComplete="off"
                  suppressHydrationWarning
                  value={typeof val === "string" ? val : ""}
                  onChange={(e) => updateValue(filter.id, e.target.value)}
                  placeholder={filter.placeholder || "Filter by keyword..."}
                  disabled={disabled}
                  className="w-full h-8 text-xs rounded-md border border-input bg-background px-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
