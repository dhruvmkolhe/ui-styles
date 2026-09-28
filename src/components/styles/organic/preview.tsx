import React from "react";

export function OrganicPreview() {
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

export default OrganicPreview;
