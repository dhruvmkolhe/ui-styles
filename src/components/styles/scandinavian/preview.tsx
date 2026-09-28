import React from "react";

export function ScandinavianPreview() {
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

export default ScandinavianPreview;
