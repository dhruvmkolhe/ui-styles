"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  FunctionSquare,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ChevronDown,
} from "lucide-react"

export interface FormulaFunctionDoc {
  name: string
  syntax: string
  description: string
  example: string
}

export interface FormulaEditorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  initialFormula?: string
  cellContext?: Record<string, number | string>
  onFormulaChange?: (formula: string, evaluatedResult: any) => void
  showHelperDocs?: boolean
}

export const FORMULA_DOCS: FormulaFunctionDoc[] = [
  {
    name: "SUM",
    syntax: "SUM(num1, num2, ...)",
    description: "Calculates the sum of all numerical arguments.",
    example: "SUM(10, 20, 30)",
  },
  {
    name: "AVG",
    syntax: "AVG(num1, num2, ...)",
    description: "Calculates the arithmetic mean of arguments.",
    example: "AVG(15, 25, 35)",
  },
  {
    name: "MIN",
    syntax: "MIN(num1, num2, ...)",
    description: "Returns the smallest numerical value in the arguments.",
    example: "MIN(5, 12, 3)",
  },
  {
    name: "MAX",
    syntax: "MAX(num1, num2, ...)",
    description: "Returns the largest numerical value in the arguments.",
    example: "MAX(100, 420, 50)",
  },
  {
    name: "IF",
    syntax: "IF(condition, value_if_true, value_if_false)",
    description: "Returns one value if condition is true, another if false.",
    example: "IF(A1 > 50, 'High', 'Normal')",
  },
  {
    name: "CONCAT",
    syntax: "CONCAT(text1, text2, ...)",
    description: "Joins two or more text strings into one string.",
    example: "CONCAT('User: ', 'Dhruv')",
  },
  {
    name: "ROUND",
    syntax: "ROUND(number, [decimals])",
    description: "Rounds a number to a specified number of digits.",
    example: "ROUND(3.14159, 2)",
  },
  {
    name: "ABS",
    syntax: "ABS(number)",
    description: "Returns the absolute value of a number.",
    example: "ABS(-42)",
  },
]

// Safe pure recursive descent evaluator (NO eval / NO Function)
export function evaluateSafeFormula(
  input: string,
  context: Record<string, number | string> = {}
): { result: any; error?: string } {
  const trimmed = input.trim()
  if (!trimmed) return { result: "" }

  const formula = trimmed.startsWith("=") ? trimmed.slice(1).trim() : trimmed

  try {
    // 1. Simple numeric literal
    if (!isNaN(Number(formula)) && !formula.includes("(")) {
      return { result: Number(formula) }
    }

    // 2. Tokenize function call: FUNCTION_NAME(...)
    const funcMatch = formula.match(/^([A-Z_]+)\s*\((.*)\)$/i)
    if (funcMatch) {
      const fnName = funcMatch[1].toUpperCase()
      const rawArgs = funcMatch[2]

      // Split arguments respecting commas inside parentheses or quotes
      const args: string[] = []
      let depth = 0
      let inQuote = false
      let current = ""

      for (let i = 0; i < rawArgs.length; i++) {
        const char = rawArgs[i]
        if (char === "'" || char === '"') inQuote = !inQuote
        if (!inQuote) {
          if (char === "(") depth++
          else if (char === ")") depth--
          else if (char === "," && depth === 0) {
            args.push(current.trim())
            current = ""
            continue
          }
        }
        current += char
      }
      if (current.trim()) args.push(current.trim())

      // Evaluate each argument
      const evaluatedArgs = args.map((arg) => {
        // Strip string quotes
        if ((arg.startsWith("'") && arg.endsWith("'")) || (arg.startsWith('"') && arg.endsWith('"'))) {
          return arg.slice(1, -1)
        }
        // Cell reference: e.g. A1, B2
        const upper = arg.toUpperCase()
        if (context[upper] !== undefined) {
          return context[upper]
        }
        if (!isNaN(Number(arg))) {
          return Number(arg)
        }
        // Sub-expression
        const sub = evaluateSafeFormula(arg, context)
        if (sub.error) throw new Error(sub.error)
        return sub.result
      })

      switch (fnName) {
        case "SUM": {
          const nums = evaluatedArgs.map(Number).filter((n) => !isNaN(n))
          return { result: nums.reduce((a, b) => a + b, 0) }
        }
        case "AVG":
        case "AVERAGE": {
          const nums = evaluatedArgs.map(Number).filter((n) => !isNaN(n))
          if (nums.length === 0) return { result: 0 }
          return { result: nums.reduce((a, b) => a + b, 0) / nums.length }
        }
        case "MIN": {
          const nums = evaluatedArgs.map(Number).filter((n) => !isNaN(n))
          return { result: nums.length ? Math.min(...nums) : 0 }
        }
        case "MAX": {
          const nums = evaluatedArgs.map(Number).filter((n) => !isNaN(n))
          return { result: nums.length ? Math.max(...nums) : 0 }
        }
        case "COUNT": {
          return { result: evaluatedArgs.length }
        }
        case "CONCAT": {
          return { result: evaluatedArgs.join("") }
        }
        case "ROUND": {
          const val = Number(evaluatedArgs[0] || 0)
          const dec = Number(evaluatedArgs[1] || 0)
          return { result: Number(val.toFixed(dec)) }
        }
        case "ABS": {
          return { result: Math.abs(Number(evaluatedArgs[0] || 0)) }
        }
        case "IF": {
          const cond = evaluatedArgs[0]
          return { result: cond ? evaluatedArgs[1] : evaluatedArgs[2] }
        }
        default:
          return { result: null, error: `Unsupported function: ${fnName}` }
      }
    }

    // 3. Simple binary arithmetic: a + b, a - b, a * b, a / b
    const mathMatch = formula.match(/^([A-Z0-9_.]+)\s*([\+\-\*\/])\s*([A-Z0-9_.]+)$/i)
    if (mathMatch) {
      const leftRaw = mathMatch[1].toUpperCase()
      const op = mathMatch[2]
      const rightRaw = mathMatch[3].toUpperCase()

      const left = context[leftRaw] !== undefined ? Number(context[leftRaw]) : Number(leftRaw)
      const right = context[rightRaw] !== undefined ? Number(context[rightRaw]) : Number(rightRaw)

      if (isNaN(left) || isNaN(right)) {
        return { result: null, error: "Invalid numeric operands in formula expression" }
      }

      if (op === "+") return { result: left + right }
      if (op === "-") return { result: left - right }
      if (op === "*") return { result: left * right }
      if (op === "/") {
        if (right === 0) return { result: null, error: "#DIV/0! Division by zero" }
        return { result: left / right }
      }
    }

    // 4. Single cell coordinate reference: A1
    const cellRef = formula.toUpperCase()
    if (context[cellRef] !== undefined) {
      return { result: context[cellRef] }
    }

    return { result: formula }
  } catch (err: any) {
    return { result: null, error: err?.message || "SyntaxError: Malformed formula" }
  }
}

export const FormulaEditor = React.forwardRef<HTMLDivElement, FormulaEditorProps>(
  (
    {
      className,
      initialFormula = "=SUM(A1, B2, 45)",
      cellContext = { A1: 120, B2: 80, C3: 25 },
      onFormulaChange,
      showHelperDocs = true,
      ...props
    },
    ref
  ) => {
    const [formula, setFormula] = React.useState(initialFormula)
    const [copied, setCopied] = React.useState(false)
    const [showDocs, setShowDocs] = React.useState(false)

    const evaluation = React.useMemo(() => {
      return evaluateSafeFormula(formula, cellContext)
    }, [formula, cellContext])

    const handleInputChange = (val: string) => {
      setFormula(val)
      const evaluated = evaluateSafeFormula(val, cellContext)
      onFormulaChange?.(val, evaluated.result)
    }

    const insertSample = (example: string) => {
      const next = `=${example}`
      setFormula(next)
      handleInputChange(next)
      setShowDocs(false)
    }

    const handleCopy = () => {
      navigator.clipboard.writeText(formula)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-2xl rounded-xl border border-border bg-card shadow-sm p-4 sm:p-5 space-y-4 text-card-foreground text-xs",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <FunctionSquare className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-bold text-foreground">Formula Bar &amp; Evaluator</h3>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono font-bold">
              Safe Tokenizer
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowDocs(!showDocs)}
              className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground font-semibold"
            >
              <HelpCircle className="h-3 w-3" />
              <span>Supported Functions</span>
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline font-semibold ml-2"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>

        {/* Formula Bar Input Box */}
        <div className="space-y-1.5">
          <div className="flex items-center rounded-lg border border-input bg-background px-3 focus-within:ring-1 focus-within:ring-ring font-mono text-xs">
            {/* fx symbol */}
            <span className="text-primary font-bold italic text-sm select-none mr-2">fx</span>
            <input
              type="text"
              value={formula}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="=SUM(A1, B2, 100)"
              className="flex-1 py-2 bg-transparent text-foreground outline-hidden font-mono text-xs font-semibold"
              spellCheck={false}
            />
          </div>

          {/* Cell context references indicator */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground font-mono pt-0.5">
            <span>Cell Values:</span>
            {Object.entries(cellContext).map(([k, v]) => (
              <span key={k} className="px-1.5 py-0.2 rounded bg-muted text-foreground font-bold">
                {k}: {v}
              </span>
            ))}
          </div>
        </div>

        {/* Evaluation Output Preview */}
        <div className="p-3.5 rounded-xl border border-border bg-muted/20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {evaluation.error ? (
              <AlertCircle className="h-4 w-4 text-rose-500 shrink-0" />
            ) : (
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            )}
            <div className="space-y-0.5">
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block font-sans">
                Evaluated Result:
              </span>
              {evaluation.error ? (
                <span className="text-rose-500 font-mono font-bold text-xs">{evaluation.error}</span>
              ) : (
                <span className="text-base font-bold font-mono text-foreground">
                  {String(evaluation.result)}
                </span>
              )}
            </div>
          </div>

          {!evaluation.error && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px] font-bold font-sans">
              Computed Valid
            </span>
          )}
        </div>

        {/* Dropdown / Collapsible Helper Docs */}
        {showDocs && (
          <div className="p-3 rounded-xl border border-border bg-background space-y-2 animate-in fade-in-50">
            <span className="text-xs font-bold text-foreground font-sans">
              Available Functions (Click to Insert)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs">
              {FORMULA_DOCS.map((doc) => (
                <button
                  key={doc.name}
                  type="button"
                  onClick={() => insertSample(doc.example)}
                  className="p-2 rounded-lg border border-border hover:bg-muted/50 text-left transition-colors flex flex-col gap-0.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary">{doc.name}</span>
                    <span className="text-[10px] text-muted-foreground">{doc.syntax}</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground font-sans">{doc.description}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
)

FormulaEditor.displayName = "FormulaEditor"
