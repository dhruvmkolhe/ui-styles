"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { highlightHtml } from "@/lib/highlight";
import { copyCode } from "@/lib/copy";
import { cn } from "@/lib/utils";

export function CodeBlock({
  code,
  filename,
  label,
  className,
}: {
  code: string;
  filename: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    const ok = await copyCode(code, label);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-[#0a0a0c] dark:bg-[#08080a]",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]/80" />
          <span className="ml-2 font-mono text-xs text-zinc-500">{filename}</span>
        </div>
        <button
          onClick={onCopy}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-mono text-[11px] transition-colors",
            copied
              ? "bg-emerald-500/15 text-emerald-400"
              : "text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-200"
          )}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre
        className="code-scroll max-h-[420px] overflow-auto p-4 text-[12.5px] leading-[1.7] text-zinc-100 font-mono"
        dangerouslySetInnerHTML={{ __html: highlightHtml(code) }}
      />
    </div>
  );
}
