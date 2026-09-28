import React from "react";

export function EditorialPreview() {
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

export default EditorialPreview;
