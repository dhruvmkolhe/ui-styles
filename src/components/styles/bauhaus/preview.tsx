import React from "react";

export function BauhausPreview() {
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

export default BauhausPreview;
