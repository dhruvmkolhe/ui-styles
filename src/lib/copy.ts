"use client";

import { toast } from "sonner";

/** Clipboard copy with graceful fallback + sonner success feedback. */
export async function copyCode(code: string, label?: string) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(code);
    } else {
      const ta = document.createElement("textarea");
      ta.value = code;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    toast.success(label ? `${label} copied` : "Code copied to clipboard", {
      description: "HTML + Tailwind — paste anywhere.",
    });
    return true;
  } catch {
    toast.error("Couldn't access the clipboard", {
      description: "Select the code manually and press ⌘/Ctrl+C.",
    });
    return false;
  }
}
