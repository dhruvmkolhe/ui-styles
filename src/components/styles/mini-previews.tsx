import type { StyleSlug } from "@/lib/styles/types";

/**
 * Compact "mini UI" previews — each one is styled authentically
 * in its own aesthetic. Used on the landing grid, explore cards
 * and coming-soon pages. Pure presentational (server-safe).
 */

function JapandiMini() {
  return (
    <div className="flex h-full flex-col justify-between bg-[#F5F0E8] p-4 text-[#3D3529]">
      <div className="flex items-center justify-between">
        <span className="font-serif text-sm tracking-wide">Sabi&nbsp;&amp;&nbsp;Co</span>
        <span className="h-px w-10 bg-[#8B7355]/50" />
      </div>
      <div className="rounded-md border border-[#8B7355]/30 bg-[#FBF8F1] px-4 py-3">
        <p className="font-serif text-[11px]">Quiet objects, warm rooms</p>
        <p className="mt-1 text-[9px] tracking-wide text-[#6B5D4A]">
          Ceramics · Oak · Linen
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className="rounded-md bg-[#8B7355] px-3 py-1.5 text-[9px] tracking-wide text-[#F5F0E8]">
          Explore
        </span>
        <span className="rounded-md border border-[#8B7355]/40 px-3 py-1.5 text-[9px] tracking-wide">
          Details
        </span>
      </div>
    </div>
  );
}

function GlassMini() {
  return (
    <div className="relative h-full overflow-hidden bg-[#0b0a14] p-4 text-white">
      <div className="absolute -left-6 -top-8 h-28 w-28 rounded-full bg-violet-600/50 blur-2xl" />
      <div className="absolute -bottom-10 -right-4 h-28 w-28 rounded-full bg-cyan-500/40 blur-2xl" />
      <div className="absolute left-1/2 top-1/3 h-16 w-16 -translate-x-1/2 rounded-full bg-fuchsia-500/30 blur-xl" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" />
            Aurora
          </span>
          <span className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[8px] text-cyan-200 backdrop-blur-md">
            ✦ Beta
          </span>
        </div>
        <div className="rounded-xl border border-white/15 bg-white/10 px-3.5 py-3 shadow-[0_8px_24px_rgba(2,6,23,0.5)] backdrop-blur-md">
          <p className="text-[10px] font-medium">Frosted dashboard kit</p>
          <p className="mt-0.5 text-[8px] text-white/60">Blur · glow · depth</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-violet-300/30 bg-violet-500/70 px-3 py-1.5 text-[9px] shadow-[0_0_14px_rgba(139,92,246,0.6)] backdrop-blur-md">
            Get started
          </span>
          <span className="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-[9px] backdrop-blur-md">
            Docs
          </span>
        </div>
      </div>
    </div>
  );
}

function BrutalistMini() {
  return (
    <div className="flex h-full flex-col justify-between bg-white p-4 text-black">
      <div className="flex items-center justify-between border-b-4 border-black pb-2">
        <span className="font-impact text-sm uppercase">Raw/UI</span>
        <span className="font-impact text-xs uppercase">≡</span>
      </div>
      <div className="border-4 border-black bg-[#FFDE00] px-3 py-2 shadow-[5px_5px_0_#000]">
        <p className="font-impact text-[11px] uppercase leading-tight">No radius. No rules.</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="border-4 border-black bg-black px-3 py-1 font-impact text-[9px] uppercase text-white shadow-[3px_3px_0_#FFDE00]">
          Smash
        </span>
        <span className="border-4 border-black px-3 py-1 font-impact text-[9px] uppercase shadow-[3px_3px_0_#000]">
          More
        </span>
      </div>
    </div>
  );
}

function MinimalistMini() {
  return (
    <div className="flex h-full flex-col justify-between bg-white p-5 text-neutral-900">
      <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-400">Studio</p>
      <div>
        <p className="text-[13px] font-light tracking-tight">Less, but better.</p>
        <div className="mt-2 h-px w-8 bg-neutral-900" />
      </div>
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-neutral-900 px-3.5 py-1.5 text-[9px] text-white">
          Begin
        </span>
        <span className="text-[9px] text-neutral-400 underline decoration-neutral-300 underline-offset-4">
          Learn more
        </span>
      </div>
    </div>
  );
}

function NeomorphismMini() {
  return (
    <div className="flex h-full flex-col justify-between bg-[#e0e5ec] p-4 text-[#5a6781]">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold tracking-wide">soft.ui</span>
        <span className="h-6 w-6 rounded-full bg-[#e0e5ec] shadow-[3px_3px_6px_#b8bec7,-3px_-3px_6px_#ffffff]" />
      </div>
      <div className="rounded-2xl bg-[#e0e5ec] px-4 py-3 shadow-[6px_6px_12px_#b8bec7,-6px_-6px_12px_#ffffff]">
        <p className="text-[10px] font-medium">Pressed surfaces</p>
        <p className="mt-0.5 text-[8px] text-[#8a94a6]">Light + dark shadow pairs</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="rounded-xl bg-[#e0e5ec] px-3.5 py-1.5 text-[9px] font-medium text-[#6d7df2] shadow-[4px_4px_8px_#b8bec7,-4px_-4px_8px_#ffffff]">
          Tap me
        </span>
        <span className="h-7 w-12 rounded-full bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#b8bec7,inset_-3px_-3px_6px_#ffffff]" />
      </div>
    </div>
  );
}

function RetroY2KMini() {
  return (
    <div className="relative h-full overflow-hidden bg-gradient-to-br from-[#FF2E93] via-[#7C4DFF] to-[#00E5FF] p-4 text-white">
      <span className="absolute right-3 top-2 text-sm text-[#B6FF00]">✦</span>
      <span className="absolute bottom-6 right-8 text-[10px] text-white/90">✧</span>
      <div className="flex h-full flex-col justify-between">
        <p className="font-y2k text-[11px] font-bold drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)]">
          ~*starKit*~
        </p>
        <div className="-rotate-2 rounded-2xl border-[3px] border-white bg-white/25 px-3 py-2 shadow-[4px_4px_0_#B6FF00] backdrop-blur-sm">
          <p className="font-y2k text-[10px] font-bold text-[#2b0a3d]">totally 2003 ♥</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rotate-1 rounded-full border-[3px] border-[#2b0a3d] bg-[#B6FF00] px-3 py-1 font-y2k text-[9px] font-bold text-[#2b0a3d] shadow-[3px_3px_0_#FF2E93]">
            GO!!
          </span>
          <span className="-rotate-1 rounded-full border-[3px] border-white bg-[#00E5FF] px-3 py-1 font-y2k text-[9px] font-bold text-[#2b0a3d]">
            xoxo
          </span>
        </div>
      </div>
    </div>
  );
}

function DarkTechMini() {
  return (
    <div className="relative h-full overflow-hidden bg-black p-4 font-terminal text-[#00FF41]">
      <div className="absolute inset-0 grid-lines-green" />
      <div className="relative flex h-full flex-col justify-between">
        <p className="text-[9px]">
          <span className="text-[#00FFFF]">root@hub</span>:~$ ./deploy
        </p>
        <div className="rounded border border-[#00FF41]/40 bg-[#00FF41]/5 px-3 py-2 shadow-[0_0_12px_rgba(0,255,65,0.25)]">
          <p className="text-[9px]">&gt; system.online</p>
          <p className="mt-1 text-[8px] text-[#00FF41]/60">[███████░░░] 72%</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-sm border border-[#00FFFF]/60 bg-[#00FFFF]/10 px-3 py-1 text-[8px] text-[#00FFFF] shadow-[0_0_10px_rgba(0,255,255,0.35)]">
            EXECUTE
          </span>
          <span className="text-[8px] text-[#00FF41]/70">▮▮▮</span>
        </div>
      </div>
    </div>
  );
}

function BentoMini() {
  return (
    <div className="h-full bg-[#0F1117] p-3 text-slate-200">
      <div className="grid h-full grid-cols-3 grid-rows-3 gap-2">
        <div className="col-span-2 rounded-lg border border-white/10 bg-white/[0.04] p-2.5">
          <p className="text-[9px] font-semibold">Editorial</p>
          <p className="mt-0.5 text-[7px] text-slate-400">2×2 feature cell</p>
          <div className="mt-2 h-1 w-10 rounded-full bg-indigo-400/70" />
        </div>
        <div className="row-span-2 rounded-lg border border-white/10 bg-gradient-to-b from-indigo-500/20 to-transparent p-2.5">
          <span className="block h-4 w-4 rounded-md bg-indigo-400/60" />
          <p className="mt-2 text-[8px] font-medium">1×2</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-center">
          <p className="text-[8px] font-semibold text-emerald-300">+18%</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-center">
          <p className="text-[8px] text-slate-400">1×1</p>
        </div>
        <div className="col-span-2 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-slate-500/60" />
            <span className="h-3 w-3 rounded-full bg-slate-500/40" />
            <span className="ml-auto h-1.5 w-12 rounded-full bg-white/15" />
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-center">
          <p className="text-[8px] text-slate-400">⌘</p>
        </div>
      </div>
    </div>
  );
}

const MINIS: Record<StyleSlug, () => JSX.Element> = {
  japandi: JapandiMini,
  glassmorphism: GlassMini,
  brutalist: BrutalistMini,
  minimalist: MinimalistMini,
  neomorphism: NeomorphismMini,
  "retro-y2k": RetroY2KMini,
  "dark-tech": DarkTechMini,
  "bento-grid": BentoMini,
};

export function StyleMiniPreview({ slug }: { slug: StyleSlug }) {
  const Mini = MINIS[slug];
  return <Mini />;
}
