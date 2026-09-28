import React from "react";

export function SwissPreview() {
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

export default SwissPreview;
