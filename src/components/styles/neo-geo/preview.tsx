import React from "react";

export function NeoGeoPreview() {
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

export default NeoGeoPreview;
