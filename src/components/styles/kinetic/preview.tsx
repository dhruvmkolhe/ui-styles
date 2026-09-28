import React from "react";

export function KineticPreview() {
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

export default KineticPreview;
