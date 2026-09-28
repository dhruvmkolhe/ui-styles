import React from "react";

export function ModernistPreview() {
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

export default ModernistPreview;
