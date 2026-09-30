import * as React from "react"
import { cn } from "@/lib/utils"

export interface MarkdownPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string
}

const parseMarkdown = (text: string) => {
  // A very basic Markdown parser returning React nodes.
  // We use this because the environment lacks a full markdown library and we cannot execute arbitrary HTML safely.
  const blocks = text.split(/\n\n+/);
  
  return blocks.map((block, i) => {
    // Headers
    const headerMatch = block.match(/^(#{1,6})\s+(.+)$/);
    if (headerMatch) {
      const level = headerMatch[1].length;
      const content = headerMatch[2];
      const Tag = `h${level}` as keyof JSX.IntrinsicElements;
      const classes = [
        "text-3xl font-bold mt-6 mb-4",
        "text-2xl font-bold mt-5 mb-3",
        "text-xl font-bold mt-4 mb-2",
        "text-lg font-bold mt-4 mb-2",
        "text-base font-bold mt-3 mb-1",
        "text-sm font-bold mt-3 mb-1"
      ][level - 1];
      
      return <Tag key={i} className={classes}>{parseInline(content)}</Tag>;
    }

    // Blockquote
    if (block.startsWith('> ')) {
      const content = block.replace(/^>\s+/gm, '');
      return (
        <blockquote key={i} className="border-l-4 border-primary/30 pl-4 py-1 my-4 italic text-muted-foreground bg-muted/20 rounded-r">
          {parseInline(content)}
        </blockquote>
      )
    }

    // Lists (simplified)
    if (block.match(/^(?:-|\*|\d+\.)\s+/m)) {
      const items = block.split(/\n/);
      const isOrdered = /^\d+\./.test(items[0]);
      const ListTag = isOrdered ? 'ol' : 'ul';
      const listClass = isOrdered ? 'list-decimal list-inside my-4 space-y-1' : 'list-disc list-inside my-4 space-y-1';
      
      return (
        <ListTag key={i} className={listClass}>
          {items.map((item, j) => {
            const cleanItem = item.replace(/^(?:-|\*|\d+\.)\s+/, '');
            return <li key={j}>{parseInline(cleanItem)}</li>
          })}
        </ListTag>
      )
    }
    
    // Code block
    if (block.startsWith('```')) {
      const lines = block.split('\n');
      const lang = lines[0].replace('```', '').trim();
      const code = lines.slice(1, -1).join('\n'); // remove last ```
      return (
        <div key={i} className="my-4 rounded-md bg-slate-950 p-4 overflow-x-auto">
          {lang && <div className="text-xs text-slate-400 mb-2 font-mono">{lang}</div>}
          <pre className="text-sm font-mono text-slate-50"><code>{code}</code></pre>
        </div>
      )
    }

    // Default Paragraph
    return (
      <p key={i} className="my-2 leading-relaxed">
        {parseInline(block)}
      </p>
    )
  });
};

const parseInline = (text: string) => {
  // Simple bold, italic, code
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i} className="italic">{part.slice(1, -1)}</em>
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="bg-muted px-1.5 py-0.5 rounded-sm font-mono text-sm">{part.slice(1, -1)}</code>
    }
    const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
    if (linkMatch) {
      return <a key={i} href={linkMatch[2]} className="text-primary hover:underline underline-offset-4" target="_blank" rel="noopener noreferrer">{linkMatch[1]}</a>
    }
    return <React.Fragment key={i}>{part}</React.Fragment>
  });
};

export const MarkdownPreview = React.forwardRef<HTMLDivElement, MarkdownPreviewProps>(
  ({ className, content, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("text-foreground", className)} {...props}>
        {parseMarkdown(content)}
      </div>
    )
  }
)
MarkdownPreview.displayName = "MarkdownPreview"
