import type { VaultCategory, VaultItem } from "./registry";
import type { VaultMode } from "./tokens";

export const VAULT_MOTION = { fast: 0.22, reveal: 0.55, loop: 8, loopVariance: 5, stagger: 0.12, loader: 2.4, ease: "easeInOut", linear: "linear", spring: { stiffness: 180, damping: 18 } } as const;
export const VAULT_TAILWIND_MOTION = { fast: "duration-200", reveal: "duration-500", spin: "animate-spin" } as const;
const PALETTES = [
  { a: "#8b5cf6", b: "#22d3ee", c: "#f0abfc" }, { a: "#fb7185", b: "#fbbf24", c: "#a3e635" },
  { a: "#34d399", b: "#2dd4bf", c: "#60a5fa" }, { a: "#60a5fa", b: "#a78bfa", c: "#f472b6" },
  { a: "#f97316", b: "#ef4444", c: "#facc15" }, { a: "#e879f9", b: "#818cf8", c: "#38bdf8" },
];
export type EffectTokens = ReturnType<typeof createEffectTokens>;

/** One effect-specific token source feeds its preview and matching copy generator. */
export function createEffectTokens(slug: string, category: VaultCategory, mode: VaultMode) {
  const seed = slug.split("").reduce((sum, c) => sum + c.charCodeAt(0), 0);
  const palette = PALETTES[seed % PALETTES.length];
  const dark = mode === "dark";
  const ink = dark ? "#f8fafc" : "#111827";
  const bg = dark ? "#080b14" : "#f8fafc";
  const surface = dark ? "#111827" : "#ffffff";
  const accent = category === "Text Animations" ? palette.c : palette.a;
  return {
    slug, category, mode, seed, palette, ink, bg, surface, accent,
    canvasClass: "relative isolate overflow-hidden rounded-2xl border p-5 sm:p-8",
    canvasStyle: { color: ink, backgroundColor: bg, borderColor: dark ? "#ffffff1c" : "#dbe2ee", backgroundImage: category.includes("Background") ? `radial-gradient(ellipse at 20% 20%, ${palette.a}20, transparent 40%), radial-gradient(ellipse at 80% 70%, ${palette.b}1a, transparent 45%)` : undefined },
    cardStyle: { backgroundColor: surface, borderColor: dark ? "#ffffff24" : "#cbd5e1", color: ink },
    actionClass: `relative inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold shadow-lg transition ${VAULT_TAILWIND_MOTION.fast} motion-safe:hover:-translate-y-1 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`,
    motionDuration: VAULT_MOTION.reveal,
  };
}

export function effectSnippet(item: VaultItem, t: EffectTokens) {
  const p = t.palette;
  const shell = `<div class="${t.canvasClass} min-h-[260px]" style="color:${t.ink};background-color:${t.bg};border-color:${t.mode === "dark" ? "#ffffff1c" : "#dbe2ee"};--vault-a:${p.a};--vault-b:${p.b};--vault-c:${p.c}">`;
  let body: string;
  if (item.category === "Text Animations") {
    body = `<h2 class="text-4xl font-black tracking-tight transition-all ${VAULT_TAILWIND_MOTION.reveal} motion-reduce:transition-none hover:tracking-widest" style="color:${t.accent}">${item.name}</h2>`;
  } else if (item.category === "Forms & Inputs") {
    if (item.slug.includes("otp")) body = `<div class="flex gap-2">${Array.from({length:6},(_,i)=>`<input aria-label="Digit ${i+1}" maxlength="1" class="h-10 w-10 rounded-lg border bg-transparent text-center" style="border-color:${t.accent}" />`).join("")}</div>`;
    else if (item.slug.includes("signature")) body = `<canvas aria-label="Signature pad" class="h-20 w-full rounded-lg border" style="border-color:${t.accent}"></canvas>`;
    else if (item.slug.includes("upload")) body = `<label class="block w-full cursor-pointer rounded-xl border border-dashed p-6 text-center text-sm" style="border-color:${t.accent}">Drop files here or browse<input type="file" multiple class="sr-only" /></label>`;
    else body = `<label class="block w-full max-w-sm text-sm">${item.name}<input type="password" class="mt-2 w-full rounded-lg border bg-transparent px-3 py-2" placeholder="Enter a secure password" style="border-color:${t.accent}"/><span class="mt-2 flex gap-1">${[1,2,3,4].map(()=>`<i class="h-1.5 flex-1 rounded-full" style="background:${t.accent}55"></i>`).join("")}</span></label>`;
  } else if (item.category === "Image Interaction") {
    body = item.slug.includes("compare")
      ? `<div class="relative h-40 w-full max-w-sm overflow-hidden rounded-xl" style="background:linear-gradient(135deg,${p.a},${p.b},${p.c})"><div class="absolute inset-y-0 left-0 w-1/2 border-r-2 border-white" style="background:linear-gradient(135deg,${p.c},${p.a})"></div><input aria-label="Image comparison slider" type="range" min="0" max="100" value="50" class="absolute inset-x-4 bottom-3 w-[calc(100%-2rem)]" /></div>`
      : `<figure class="relative h-40 w-full max-w-sm overflow-hidden rounded-2xl" style="background:linear-gradient(135deg,${p.a},${p.b} 55%,${p.c})"><div class="absolute inset-0 grid place-items-center text-5xl font-black text-white/30">UIH</div><figcaption class="absolute bottom-3 left-4 text-xs font-semibold text-white">${item.name}</figcaption></figure>`;
  } else if (item.category.includes("Background")) {
    body = `<div role="img" aria-label="${item.name}" class="h-40 w-full max-w-sm rounded-xl" style="background-color:${t.bg};background-image:radial-gradient(ellipse at 20% 20%,${p.a}55,transparent 45%),radial-gradient(ellipse at 80% 70%,${p.b}55,transparent 45%),linear-gradient(${p.a}22 1px,transparent 1px);background-size:auto,auto,24px 24px"></div>`;
  } else if (item.category === "Navbars") {
    body = `<nav aria-label="${item.name}" class="flex w-full max-w-xl items-center justify-between rounded-full border px-5 py-3" style="background:${t.surface};border-color:${t.accent}66"><strong>UI<span style="color:${t.accent}">HUB</span></strong><div class="flex gap-4 text-xs"><a href="#">Explore</a><a href="#">Components</a><a href="#">Pricing</a></div><button class="rounded-full px-3 py-1 text-xs text-white" style="background:${t.accent}">Menu</button></nav>`;
  } else if (item.category === "Footers") {
    body = `<footer class="w-full max-w-xl rounded-2xl border p-5" style="background:${t.surface};border-color:${t.accent}55"><strong class="text-lg">${item.name}</strong><p class="mt-3 text-xs opacity-60">Thoughtful digital experiences, built to last.</p><div class="mt-5 border-t pt-3 text-[10px] opacity-50">© UI Hub · 2026</div></footer>`;
  } else if (item.category === "Option Wheel Loaders") {
    body = `<div role="status" aria-label="${item.name}" class="h-20 w-20 ${VAULT_TAILWIND_MOTION.spin} motion-reduce:animate-none rounded-full border-[5px]" style="border-color:${t.accent}35;border-top-color:${t.accent}"><span class="sr-only">Loading</span></div>`;
  } else if (item.category === "Cursor Effects") {
    body = `<div class="grid h-40 w-64 place-items-center rounded-2xl border text-sm" style="background:radial-gradient(circle at 50% 50%,${t.accent}88,transparent 45%),${t.surface};border-color:${t.accent}">${item.name}</div>`;
  } else {
    body = `<button class="${t.actionClass}" style="background:linear-gradient(110deg,${p.a},${p.b});color:white">${item.name} <span aria-hidden="true">✦</span></button>`;
  }
  return `<!-- UI Hub Component Vault · ${item.name} -->\n<!-- Tailwind CSS required · scoped to this isolated canvas -->\n${shell}\n  <div class="relative flex min-h-[210px] items-center justify-center">\n    ${body}\n  </div>\n</div>`;
}
