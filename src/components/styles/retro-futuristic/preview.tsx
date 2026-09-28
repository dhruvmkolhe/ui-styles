import React from "react";

export function RetroFuturisticPreview() {
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

export default RetroFuturisticPreview;
