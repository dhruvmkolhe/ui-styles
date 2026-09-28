import React from "react";

export function MetropolitanPreview() {
  return (
    <div className="flex h-full flex-col justify-between bg-[#0F172A] p-4 text-[#F8FAFC]">
      <div className="flex justify-between items-center border-b border-[#334155] pb-1.5">
        <span className="text-xs font-bold text-[#F59E0B]">NYC METRO</span>
        <span className="text-[8px] text-slate-400">ZONE 01</span>
      </div>
      <div className="rounded border border-[#334155] bg-[#1E293B] p-2.5">
        <p className="text-[10px] font-bold text-white">Urban Grid System</p>
        <p className="text-[8px] text-slate-400">Concrete &amp; Amber</p>
      </div>
      <div className="flex gap-2">
        <span className="rounded-sm bg-[#F59E0B] px-3 py-1 text-[9px] font-bold text-black">EXPRESS</span>
      </div>
    </div>
  );
}

export default MetropolitanPreview;
