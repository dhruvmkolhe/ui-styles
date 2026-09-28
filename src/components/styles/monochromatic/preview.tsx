import React from "react";

export function MonochromaticPreview() {
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

export default MonochromaticPreview;
