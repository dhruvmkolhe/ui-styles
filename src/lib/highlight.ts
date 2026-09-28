/**
 * Tiny, dependency-free HTML/Tailwind syntax highlighter.
 * Returns an HTML string (fully escaped) to be used with dangerouslySetInnerHTML.
 */

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const C = {
  punct: "text-zinc-400",
  tag: "text-rose-400 font-medium",
  attr: "text-sky-300",
  str: "text-emerald-300",
  comment: "text-amber-400/80 italic",
};

function highlightTag(raw: string): string {
  // raw includes the leading < and trailing >
  let out = "";
  const re =
    /(<\/?)([a-zA-Z][a-zA-Z0-9-]*)|([a-zA-Z_:@\-.[\]()#%/\w]+)(=)("(?:[^"]*)"|'(?:[^'])*'|[^"'>\s]+)|("[^"]*")|(\/?>)|([^"'>=\s]+)/g;
  let m: RegExpExecArray | null;
  let lastIndex = 0;

  while ((m = re.exec(raw)) !== null) {
    if (m.index > lastIndex) {
      out += esc(raw.slice(lastIndex, m.index));
    }
    lastIndex = re.lastIndex;

    if (m[1] !== undefined) {
      out += `<span class="${C.punct}">${esc(m[1])}</span><span class="${C.tag}">${esc(m[2])}</span>`;
    } else if (m[3] !== undefined) {
      out += `<span class="${C.attr}">${esc(m[3])}</span><span class="${C.punct}">${esc(m[4])}</span><span class="${C.str}">${esc(m[5])}</span>`;
    } else if (m[6] !== undefined) {
      out += `<span class="${C.str}">${esc(m[6])}</span>`;
    } else if (m[7] !== undefined) {
      out += `<span class="${C.punct}">${esc(m[7])}</span>`;
    } else {
      out += esc(m[0]);
    }
  }

  if (lastIndex < raw.length) {
    out += esc(raw.slice(lastIndex));
  }

  return out;
}

export function highlightHtml(src: string): string {
  let out = "";
  let i = 0;
  while (i < src.length) {
    if (src.startsWith("<!--", i)) {
      const end = src.indexOf("-->", i);
      const j = end === -1 ? src.length : end + 3;
      out += `<span class="${C.comment}">${esc(src.slice(i, j))}</span>`;
      i = j;
    } else if (src[i] === "<") {
      let j = i + 1;
      let quote: string | null = null;
      while (j < src.length) {
        const ch = src[j];
        if (quote) {
          if (ch === quote) quote = null;
        } else if (ch === '"' || ch === "'") {
          quote = ch;
        } else if (ch === ">") {
          j++;
          break;
        }
        j++;
      }
      out += highlightTag(src.slice(i, j));
      i = j;
    } else {
      const next = src.indexOf("<", i);
      const j = next === -1 ? src.length : next;
      out += esc(src.slice(i, j));
      i = j;
    }
  }
  return out;
}
