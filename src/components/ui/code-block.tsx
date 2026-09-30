import * as React from "react"
import { cn } from "@/lib/utils"
import { Check, Copy } from "lucide-react"

export interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  code: string
  language?: string
}

export const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ className, code, language, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = () => {
      navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    return (
      <div className="relative group rounded-md overflow-hidden bg-slate-950 text-slate-50 border border-slate-800 my-4">
        {language && (
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 font-mono">
            <span>{language}</span>
          </div>
        )}
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 rounded-md bg-slate-800/50 hover:bg-slate-800 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Copy code"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </button>
        <pre
          ref={ref}
          className={cn("p-4 overflow-x-auto text-sm font-mono leading-relaxed", className)}
          {...props}
        >
          <code>{code}</code>
        </pre>
      </div>
    )
  }
)
CodeBlock.displayName = "CodeBlock"
