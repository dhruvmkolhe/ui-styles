"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Plus,
  Trash2,
  Copy,
  Check,
  Filter,
  Layers,
  Code2,
  Database,
  ChevronDown,
} from "lucide-react"

export type QueryOperator =
  | "equals"
  | "not_equals"
  | "contains"
  | "greater_than"
  | "less_than"
  | "in"
  | "is_null"

export interface QueryRule {
  id: string
  type: "rule"
  field: string
  operator: QueryOperator
  value: string
}

export interface QueryGroup {
  id: string
  type: "group"
  combinator: "AND" | "OR"
  rules: (QueryRule | QueryGroup)[]
}

export interface QueryBuilderField {
  id: string
  label: string
  type: "string" | "number" | "boolean" | "date"
}

export interface QueryBuilderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  fields?: QueryBuilderField[]
  initialQuery?: QueryGroup
  onChange?: (query: QueryGroup) => void
  showOutputPreview?: boolean
}

const DEFAULT_FIELDS: QueryBuilderField[] = [
  { id: "status", label: "User Status", type: "string" },
  { id: "role", label: "Account Role", type: "string" },
  { id: "credits", label: "Balance Credits", type: "number" },
  { id: "createdAt", label: "Sign-up Date", type: "date" },
  { id: "isVerified", label: "Email Verified", type: "boolean" },
]

const OPERATOR_LABELS: Record<QueryOperator, string> = {
  equals: "=",
  not_equals: "!=",
  contains: "CONTAINS",
  greater_than: ">",
  less_than: "<",
  in: "IN",
  is_null: "IS NULL",
}

const DEFAULT_QUERY: QueryGroup = {
  id: "root-group",
  type: "group",
  combinator: "AND",
  rules: [
    {
      id: "r-1",
      type: "rule",
      field: "status",
      operator: "equals",
      value: "active",
    },
    {
      id: "r-2",
      type: "rule",
      field: "credits",
      operator: "greater_than",
      value: "100",
    },
    {
      id: "g-nested-1",
      type: "group",
      combinator: "OR",
      rules: [
        {
          id: "r-3",
          type: "rule",
          field: "role",
          operator: "equals",
          value: "admin",
        },
        {
          id: "r-4",
          type: "rule",
          field: "isVerified",
          operator: "equals",
          value: "true",
        },
      ],
    },
  ],
}

// Convert QueryGroup into safe simulated SQL WHERE clause
function queryToSQL(group: QueryGroup): string {
  if (!group.rules || group.rules.length === 0) return "1 = 1"

  const parts: string[] = []
  for (const item of group.rules) {
    if (item.type === "rule") {
      const op = OPERATOR_LABELS[item.operator]
      if (item.operator === "is_null") {
        parts.push(`${item.field} IS NULL`)
      } else if (item.operator === "contains") {
        parts.push(`${item.field} LIKE '%${item.value}%'`)
      } else if (item.operator === "in") {
        parts.push(`${item.field} IN (${item.value})`)
      } else {
        parts.push(`${item.field} ${op} '${item.value}'`)
      }
    } else {
      parts.push(`(${queryToSQL(item)})`)
    }
  }

  return parts.join(` ${group.combinator} `)
}

export const QueryBuilder = React.forwardRef<HTMLDivElement, QueryBuilderProps>(
  (
    {
      className,
      fields = DEFAULT_FIELDS,
      initialQuery = DEFAULT_QUERY,
      onChange,
      showOutputPreview = true,
      ...props
    },
    ref
  ) => {
    const [query, setQuery] = React.useState<QueryGroup>(initialQuery)
    const [copied, setCopied] = React.useState(false)

    const updateAndNotify = (newQuery: QueryGroup) => {
      setQuery(newQuery)
      onChange?.(newQuery)
    }

    // Helper: update combinator of a group
    const setGroupCombinator = (groupId: string, combinator: "AND" | "OR") => {
      const updateRecursive = (g: QueryGroup): QueryGroup => {
        if (g.id === groupId) {
          return { ...g, combinator }
        }
        return {
          ...g,
          rules: g.rules.map((r) => (r.type === "group" ? updateRecursive(r) : r)),
        }
      }
      updateAndNotify(updateRecursive(query))
    }

    // Helper: add rule to a group
    const addRuleToGroup = (groupId: string) => {
      const newRule: QueryRule = {
        id: `rule-${Date.now()}`,
        type: "rule",
        field: fields[0]?.id || "status",
        operator: "equals",
        value: "",
      }

      const updateRecursive = (g: QueryGroup): QueryGroup => {
        if (g.id === groupId) {
          return { ...g, rules: [...g.rules, newRule] }
        }
        return {
          ...g,
          rules: g.rules.map((r) => (r.type === "group" ? updateRecursive(r) : r)),
        }
      }
      updateAndNotify(updateRecursive(query))
    }

    // Helper: add sub-group to a group
    const addSubGroup = (parentGroupId: string) => {
      const newSubGroup: QueryGroup = {
        id: `group-${Date.now()}`,
        type: "group",
        combinator: "AND",
        rules: [
          {
            id: `rule-${Date.now()}`,
            type: "rule",
            field: fields[0]?.id || "status",
            operator: "equals",
            value: "",
          },
        ],
      }

      const updateRecursive = (g: QueryGroup): QueryGroup => {
        if (g.id === parentGroupId) {
          return { ...g, rules: [...g.rules, newSubGroup] }
        }
        return {
          ...g,
          rules: g.rules.map((r) => (r.type === "group" ? updateRecursive(r) : r)),
        }
      }
      updateAndNotify(updateRecursive(query))
    }

    // Helper: update rule fields
    const updateRule = (ruleId: string, updates: Partial<QueryRule>) => {
      const updateRecursive = (g: QueryGroup): QueryGroup => {
        return {
          ...g,
          rules: g.rules.map((r) => {
            if (r.type === "rule") {
              return r.id === ruleId ? { ...r, ...updates } : r
            }
            return updateRecursive(r)
          }),
        }
      }
      updateAndNotify(updateRecursive(query))
    }

    // Helper: remove item from a group
    const removeItem = (targetId: string) => {
      const updateRecursive = (g: QueryGroup): QueryGroup => {
        return {
          ...g,
          rules: g.rules
            .filter((r) => r.id !== targetId)
            .map((r) => (r.type === "group" ? updateRecursive(r) : r)),
        }
      }
      updateAndNotify(updateRecursive(query))
    }

    const sqlPreview = React.useMemo(() => queryToSQL(query), [query])

    const handleCopySQL = () => {
      navigator.clipboard.writeText(`WHERE ${sqlPreview}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    // Recursive group renderer
    const renderGroup = (g: QueryGroup, isRoot = false) => {
      return (
        <div
          key={g.id}
          className={cn(
            "p-3 rounded-xl border border-border space-y-3 transition-colors",
            isRoot ? "bg-card shadow-xs" : "bg-muted/30 ml-4 border-dashed"
          )}
        >
          {/* Group Header Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              {/* Combinator Toggle (AND / OR) */}
              <div className="flex items-center rounded-lg border border-border bg-background p-0.5 shadow-2xs text-[11px] font-bold font-mono">
                <button
                  type="button"
                  onClick={() => setGroupCombinator(g.id, "AND")}
                  className={cn(
                    "px-2 py-0.5 rounded transition-colors",
                    g.combinator === "AND"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  AND
                </button>
                <button
                  type="button"
                  onClick={() => setGroupCombinator(g.id, "OR")}
                  className={cn(
                    "px-2 py-0.5 rounded transition-colors",
                    g.combinator === "OR"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  OR
                </button>
              </div>

              <span className="text-[11px] text-muted-foreground font-sans">
                Match {g.combinator === "AND" ? "all" : "any"} of the following:
              </span>
            </div>

            {/* Actions: Add Rule / Add Group / Delete Group */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => addRuleToGroup(g.id)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-background border border-border hover:bg-muted text-foreground transition-colors shadow-2xs"
              >
                <Plus className="h-3 w-3 text-primary" />
                <span>Add Rule</span>
              </button>
              <button
                type="button"
                onClick={() => addSubGroup(g.id)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-background border border-border hover:bg-muted text-foreground transition-colors shadow-2xs"
              >
                <Layers className="h-3 w-3 text-muted-foreground" />
                <span>Add Group</span>
              </button>
              {!isRoot && (
                <button
                  type="button"
                  onClick={() => removeItem(g.id)}
                  className="p-1 rounded text-muted-foreground hover:text-rose-500 transition-colors"
                  title="Remove group"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Group Rules Container */}
          <div className="space-y-2">
            {g.rules.length === 0 ? (
              <div className="py-4 text-center text-xs text-muted-foreground">
                No rules in this group. Click &quot;Add Rule&quot; to begin.
              </div>
            ) : (
              g.rules.map((item) => {
                if (item.type === "group") {
                  return renderGroup(item, false)
                }

                // Single rule row
                return (
                  <div
                    key={item.id}
                    className="flex flex-wrap sm:flex-nowrap items-center gap-2 p-2 rounded-lg border border-border bg-background shadow-2xs text-xs font-sans"
                  >
                    {/* Field Dropdown */}
                    <div className="relative min-w-[130px]">
                      <select
                        value={item.field}
                        onChange={(e) => updateRule(item.id, { field: e.target.value })}
                        className="w-full h-8 px-2.5 pr-7 rounded-md border border-input bg-card text-foreground font-medium appearance-none focus:outline-hidden focus:ring-1 focus:ring-ring text-xs"
                      >
                        {fields.map((f) => (
                          <option key={f.id} value={f.id}>
                            {f.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                    </div>

                    {/* Operator Dropdown */}
                    <div className="relative min-w-[110px]">
                      <select
                        value={item.operator}
                        onChange={(e) =>
                          updateRule(item.id, { operator: e.target.value as QueryOperator })
                        }
                        className="w-full h-8 px-2.5 pr-7 rounded-md border border-input bg-card text-foreground font-mono font-bold appearance-none focus:outline-hidden focus:ring-1 focus:ring-ring text-xs"
                      >
                        {(Object.keys(OPERATOR_LABELS) as QueryOperator[]).map((op) => (
                          <option key={op} value={op}>
                            {OPERATOR_LABELS[op]} ({op})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                    </div>

                    {/* Value Input */}
                    {item.operator !== "is_null" && (
                      <input
                        type="text"
                        value={item.value}
                        onChange={(e) => updateRule(item.id, { value: e.target.value })}
                        placeholder="Value..."
                        className="flex-1 min-w-[140px] h-8 px-2.5 rounded-md border border-input bg-card text-foreground text-xs font-mono focus:outline-hidden focus:ring-1 focus:ring-ring"
                      />
                    )}

                    {/* Remove Rule */}
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 rounded text-muted-foreground hover:text-rose-500 hover:bg-muted transition-colors shrink-0"
                      title="Delete condition"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )
              })
            )}
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-3xl rounded-xl border border-border bg-card shadow-sm p-4 sm:p-6 space-y-5 text-card-foreground text-xs",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-bold text-foreground">Visual Query Builder</h3>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono font-bold">
              Safe AST Builder
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopySQL}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
          >
            {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
            <span>{copied ? "Copied SQL" : "Copy SQL"}</span>
          </button>
        </div>

        {/* Query Builder Tree */}
        <div className="space-y-4">{renderGroup(query, true)}</div>

        {/* Structured Output Preview */}
        {showOutputPreview && (
          <div className="space-y-2 pt-2 border-t border-border font-mono text-xs">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground font-sans">
              <span className="font-semibold uppercase tracking-wider">Simulated SQL Query:</span>
            </div>
            <div className="p-3 rounded-lg bg-muted/40 border border-border text-foreground overflow-x-auto whitespace-pre-wrap leading-relaxed">
              <span className="text-primary font-bold">SELECT</span> * <span className="text-primary font-bold">FROM</span> users <span className="text-primary font-bold">WHERE</span> {sqlPreview}
            </div>
          </div>
        )}
      </div>
    )
  }
)

QueryBuilder.displayName = "QueryBuilder"
