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

function NeobrutalistMini() {
  return (
    <div className="flex h-full flex-col justify-between bg-[#FFE500] p-4 text-black font-black">
      <div className="flex items-center justify-between border-4 border-black bg-white p-2 shadow-[3px_3px_0_#000]">
        <span className="text-xs font-mono uppercase">NEO/BRUTAL</span>
        <span className="bg-[#FF5C00] px-1.5 py-0.5 text-[8px] text-white">V2</span>
      </div>
      <div className="border-4 border-black bg-white p-3 shadow-[4px_4px_0_#000]">
        <p className="text-[10px] uppercase">Space Grotesk Impact</p>
        <span className="mt-1 inline-block bg-[#FF5C00] px-2 py-0.5 text-[8px] text-white border-2 border-black">HARD SHADOW</span>
      </div>
      <div className="flex gap-2">
        <span className="border-4 border-black bg-[#FF5C00] px-3 py-1 text-[9px] text-white shadow-[3px_3px_0_#000]">CLICK</span>
      </div>
    </div>
  );
}

function SwissMini() {
  return (
    <div className="flex h-full flex-col justify-between bg-white p-4 text-[#111111] font-sans">
      <div className="flex items-center justify-between border-b-2 border-[#111111] pb-2">
        <span className="text-xs font-bold uppercase tracking-tighter">HELVETICA 1957</span>
        <span className="h-2 w-2 bg-[#E30613]" />
      </div>
      <div className="grid grid-cols-2 gap-2 my-auto">
        <div className="border-l-2 border-[#E30613] pl-2">
          <p className="text-[9px] font-bold tracking-tight uppercase">GRID 12-COL</p>
          <p className="text-[7px] text-neutral-500">Objective clarity</p>
        </div>
        <div className="border-l border-neutral-300 pl-2">
          <p className="text-[9px] font-bold tracking-tight">01 // SWISS</p>
        </div>
      </div>
      <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest border-t border-neutral-200 pt-2">
        <span>ZÜRICH</span>
        <span className="bg-[#E30613] text-white px-2 py-0.5">EXHIBIT</span>
      </div>
    </div>
  );
}

function EditorialMini() {
  return (
    <div className="flex h-full flex-col justify-between bg-[#FAF7F2] p-4 text-[#1C1917] font-serif">
      <div className="border-b border-[#D6D3D1] pb-1.5 flex justify-between items-baseline">
        <span className="text-xs italic">The Gazette</span>
        <span className="text-[8px] font-sans text-[#78716C]">VOL. IV</span>
      </div>
      <div className="my-auto space-y-1">
        <p className="text-sm font-normal leading-tight italic">“Quiet typography speaks loudest.”</p>
        <div className="h-px w-12 bg-[#78716C]/40" />
      </div>
      <div className="flex justify-between items-center text-[9px] font-sans text-[#78716C]">
        <span>ESSAY 04</span>
        <span className="border-b border-[#1C1917] text-[#1C1917] font-serif italic">Read Article</span>
      </div>
    </div>
  );
}

function RetroFuturisticMini() {
  return (
    <div className="relative h-full overflow-hidden bg-black p-4 text-white font-mono">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A0033] via-black to-[#00F0FF]/20" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center justify-between border-b border-[#FF00AA]/50 pb-1">
          <span className="text-[10px] text-[#00F0FF] font-bold tracking-wider">CYBER//80S</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF00AA] shadow-[0_0_8px_#FF00AA]" />
        </div>
        <div className="rounded border border-[#FF00AA] bg-black/60 p-2 shadow-[0_0_12px_rgba(255,0,170,0.4)]">
          <p className="text-[10px] font-bold text-[#FF00AA]">SYNTHWAVE HORIZON</p>
          <p className="text-[8px] text-[#00F0FF]">Neon Chrome Grid</p>
        </div>
        <div className="flex justify-between items-center text-[8px]">
          <span className="border border-[#00F0FF] px-2 py-0.5 text-[#00F0FF] shadow-[0_0_6px_#00F0FF]">RUN</span>
          <span className="text-[#FF00AA]">1984.WAV</span>
        </div>
      </div>
    </div>
  );
}

function BauhausMini() {
  return (
    <div className="flex h-full flex-col justify-between bg-[#F1FAEE] p-4 text-[#1D3557] font-sans">
      <div className="flex items-center gap-2 border-b-2 border-[#1D3557] pb-2">
        <span className="h-3 w-3 rounded-full bg-[#E63946]" />
        <span className="h-3 w-3 bg-[#FFD60A]" />
        <span className="text-xs font-black tracking-widest uppercase">WEIMAR</span>
      </div>
      <div className="bg-[#1D3557] text-[#F1FAEE] p-3 rounded-none relative">
        <div className="absolute right-2 top-2 h-4 w-4 bg-[#FFD60A]" />
        <p className="text-[10px] font-bold uppercase">Form Follows Function</p>
      </div>
      <div className="flex gap-2">
        <span className="bg-[#E63946] px-3 py-1 text-[9px] font-bold text-white uppercase">1919</span>
        <span className="border border-[#1D3557] px-3 py-1 text-[9px] font-bold uppercase">DEAU</span>
      </div>
    </div>
  );
}

function ArtDecoMini() {
  return (
    <div className="flex h-full flex-col justify-between bg-[#0A0A0A] p-4 text-[#C9A961] font-serif border-2 border-[#C9A961]/40">
      <div className="border-b border-[#C9A961]/60 pb-1 text-center">
        <span className="text-[10px] tracking-[0.3em] uppercase">GATSBY &amp; CO</span>
      </div>
      <div className="border border-double border-[#C9A961] p-2 text-center my-auto">
        <p className="text-[10px] font-bold uppercase tracking-widest">GOLDEN SYMMETRY</p>
      </div>
      <div className="flex justify-between items-center text-[8px] tracking-widest uppercase border-t border-[#C9A961]/60 pt-1">
        <span>EST. 1925</span>
        <span className="text-[#E5D2A0]">✦ LUXE ✦</span>
      </div>
    </div>
  );
}

function MaterialMini() {
  return (
    <div className="flex h-full flex-col justify-between bg-[#F5F5F5] p-4 text-[#121212] font-sans">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#6200EE]">Material UI</span>
        <span className="h-2 w-2 rounded-full bg-[#03DAC6]" />
      </div>
      <div className="rounded-xl bg-white p-3 shadow-md border border-neutral-100">
        <p className="text-[10px] font-semibold">Elevation Card</p>
        <p className="text-[8px] text-neutral-500 mt-0.5">Tactile paper surface</p>
      </div>
      <div className="flex gap-2">
        <span className="rounded-full bg-[#6200EE] px-3 py-1 text-[9px] text-white shadow">FAB</span>
      </div>
    </div>
  );
}

function MonochromaticMini() {
  return (
    <div className="flex h-full flex-col justify-between bg-[#EFF6FF] p-4 text-[#1E293B]">
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold text-[#2563EB]">Blue Shade</span>
        <span className="h-2 w-2 rounded bg-[#1E40AF]" />
      </div>
      <div className="rounded-lg bg-[#DBEAFE] border border-[#BFDBFE] p-3">
        <p className="text-[10px] font-semibold text-[#1E40AF]">Single Hue Palette</p>
        <p className="text-[8px] text-[#2563EB]">Harmonious Tints</p>
      </div>
      <div className="flex gap-2">
        <span className="rounded-md bg-[#2563EB] px-3 py-1 text-[9px] text-white">Action</span>
      </div>
    </div>
  );
}

function ScandinavianMini() {
  return (
    <div className="flex h-full flex-col justify-between bg-[#FDFBF7] p-4 text-[#334155]">
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-[#A8C0D6]">Hygge Living</span>
        <span className="text-[8px] text-[#8C7A6B]">PALE OAK</span>
      </div>
      <div className="rounded-xl border border-[#E8DCC8] bg-[#F5EFE6] p-3">
        <p className="text-[10px] font-medium text-[#334155]">Airy &amp; Warm</p>
        <p className="text-[8px] text-[#64748B]">Soft Sky Tones</p>
      </div>
      <div className="flex gap-2">
        <span className="rounded-lg bg-[#A8C0D6] px-3 py-1 text-[9px] text-white">Cozy</span>
      </div>
    </div>
  );
}

function ModernistMini() {
  return (
    <div className="flex h-full flex-col justify-between bg-[#F3F4F6] p-4 text-[#1F2937]">
      <div className="flex justify-between items-center border-b-2 border-[#1F2937] pb-1">
        <span className="text-xs font-bold">MID-CENTURY</span>
        <span className="h-3 w-3 bg-[#EF4444]" />
      </div>
      <div className="bg-white border border-[#E5E7EB] p-3 shadow-xs">
        <p className="text-[10px] font-bold">Structured Grid</p>
        <p className="text-[8px] text-neutral-500">Asymmetric Balance</p>
      </div>
      <div className="flex gap-2">
        <span className="bg-[#EF4444] px-3 py-1 text-[9px] font-bold text-white">POP</span>
      </div>
    </div>
  );
}

function OrganicMini() {
  return (
    <div className="flex h-full flex-col justify-between bg-[#F7F5F0] p-4 text-[#7F5539]">
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-[#A3B18A]">Earthy Flora</span>
        <span className="h-3 w-3 rounded-[40%] bg-[#DDB892]" />
      </div>
      <div className="rounded-[20px] bg-[#EAE5D9] p-3 border border-[#DDB892]/50">
        <p className="text-[10px] font-medium">Soft Blob Forms</p>
        <p className="text-[8px] text-[#A3B18A]">Hand-crafted Feel</p>
      </div>
      <div className="flex gap-2">
        <span className="rounded-[16px] bg-[#A3B18A] px-3.5 py-1 text-[9px] text-white">Nature</span>
      </div>
    </div>
  );
}

function LuxuryMinimalMini() {
  return (
    <div className="flex h-full flex-col justify-between bg-[#0A0A0A] p-4 text-white font-serif">
      <p className="text-[8px] tracking-[0.4em] uppercase text-[#B8935A]">HAUTE COUTURE</p>
      <div className="my-auto space-y-1 text-center">
        <p className="text-sm tracking-widest uppercase font-light">MAISON 01</p>
        <div className="h-px w-6 bg-[#B8935A] mx-auto" />
      </div>
      <div className="flex justify-between items-center text-[8px] font-sans tracking-widest text-neutral-400">
        <span>COLLECTION</span>
        <span className="text-[#B8935A]">2026</span>
      </div>
    </div>
  );
}

function NeoGeoMini() {
  return (
    <div className="relative h-full overflow-hidden bg-[#FFF9E6] p-4 text-[#111111]">
      <div className="flex justify-between items-center">
        <span className="text-xs font-black text-[#FF007A]">MEMPHIS 90S</span>
        <span className="h-3 w-3 bg-[#00E5D1] rotate-45" />
      </div>
      <div className="border-2 border-black bg-[#FFD600] p-2.5 -rotate-1 shadow-[3px_3px_0_#FF007A]">
        <p className="text-[10px] font-black uppercase">Playful Patterns</p>
      </div>
      <div className="flex gap-2">
        <span className="border-2 border-black bg-[#00E5D1] px-3 py-1 text-[9px] font-black shadow-[2px_2px_0_#000]">ZAP!</span>
      </div>
    </div>
  );
}

function KineticMini() {
  return (
    <div className="relative h-full overflow-hidden bg-[#0F0C20] p-4 text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF3366]/30 via-[#7000FF]/30 to-[#00F0FF]/30 animate-pulse" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex justify-between items-center">
          <span className="text-xs font-black tracking-tighter text-[#FF3366]">MOTION//UI</span>
          <span className="h-2 w-2 rounded-full bg-[#00F0FF] animate-ping" />
        </div>
        <div className="rounded-xl border border-[#7000FF] bg-black/40 p-2.5 backdrop-blur-md">
          <p className="text-[10px] font-bold text-white">High Energy Flow</p>
        </div>
        <div className="flex gap-2">
          <span className="rounded-lg bg-gradient-to-r from-[#FF3366] to-[#7000FF] px-3 py-1 text-[9px] font-bold">PULSE</span>
        </div>
      </div>
    </div>
  );
}

function GradientModernMini() {
  return (
    <div className="relative h-full overflow-hidden bg-[#0D0B18] p-4 text-white">
      <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-[#8B5CF6]/50 blur-2xl" />
      <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-[#EC4899]/50 blur-2xl" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-[#EC4899]">Mesh SaaS</span>
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[8px] backdrop-blur">PRO</span>
        </div>
        <div className="rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-lg">
          <p className="text-[10px] font-medium">Vibrant Gradients</p>
        </div>
        <div className="flex gap-2">
          <span className="rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] px-3 py-1 text-[9px]">Launch</span>
        </div>
      </div>
    </div>
  );
}

function TypographyFirstMini() {
  return (
    <div className="flex h-full flex-col justify-between bg-white p-4 text-black font-sans">
      <span className="text-[8px] font-bold tracking-widest uppercase text-neutral-400">01 // ESSAY</span>
      <div className="my-auto">
        <p className="text-2xl font-black tracking-tighter leading-none">TYPE IS ALL.</p>
      </div>
      <div className="flex justify-between items-center border-t-2 border-black pt-1">
        <span className="text-[9px] font-black">INTER DISPLAY</span>
        <span className="text-[9px] text-neutral-500">→</span>
      </div>
    </div>
  );
}

function MetropolitanMini() {
  return (
    <div className="flex h-full flex-col justify-between bg-[#0F172A] p-4 text-[#F8FAFC]">
      <div className="flex justify-between items-center border-b border-[#334155] pb-1.5">
        <span className="text-xs font-bold text-[#F59E0B]">NYC METRO</span>
        <span className="text-[8px] text-slate-400">ZONE 01</span>
      </div>
      <div className="rounded border border-[#334155] bg-[#1E293B] p-2.5">
        <p className="text-[10px] font-bold text-white">Urban Grid System</p>
        <p className="text-[8px] text-slate-400">Concrete &amp; Amber</p>
      </div>
      <div className="flex gap-2">
        <span className="rounded-sm bg-[#F59E0B] px-3 py-1 text-[9px] font-bold text-black">EXPRESS</span>
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
  neobrutalist: NeobrutalistMini,
  swiss: SwissMini,
  editorial: EditorialMini,
  "retro-futuristic": RetroFuturisticMini,
  bauhaus: BauhausMini,
  "art-deco": ArtDecoMini,
  material: MaterialMini,
  monochromatic: MonochromaticMini,
  scandinavian: ScandinavianMini,
  modernist: ModernistMini,
  organic: OrganicMini,
  "luxury-minimal": LuxuryMinimalMini,
  "neo-geo": NeoGeoMini,
  kinetic: KineticMini,
  "gradient-modern": GradientModernMini,
  "typography-first": TypographyFirstMini,
  metropolitan: MetropolitanMini,
};

export function StyleMiniPreview({ slug }: { slug: StyleSlug }) {
  const Mini = MINIS[slug];
  if (!Mini) return null;
  return <Mini />;
}
