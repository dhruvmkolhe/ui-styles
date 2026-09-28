import React from "react";

export function NeobrutalistPreview() {
  return (
    <div className="flex h-full flex-col justify-between bg-[#FFE500] p-4 text-black font-black">
      <div className="flex items-center justify-between border-4 border-black bg-white p-2 shadow-[3px_3px_0_#000]">
        <span className="text-xs font-mono uppercase">NEO/BRUTAL</span>
        <span className="bg-[#FF5C00] px-1.5 py-0.5 text-[8px] text-white">V2</span>
      </div>
      <div className="border-4 border-black bg-white p-3 shadow-[4px_4px_0_#000]">
        <p className="text-[10px] uppercase">Space Grotesk Impact</p>
        <span className="mt-1 inline-block bg-[#FF5C00] px-2 py-0.5 text-[8px] text-white border-2 border-black">HARD SHADOW</span>
      </div>
      <div className="flex gap-2">
        <span className="border-4 border-black bg-[#FF5C00] px-3 py-1 text-[9px] text-white shadow-[3px_3px_0_#000]">CLICK</span>
      </div>
    </div>
  );
}

export default NeobrutalistPreview;
