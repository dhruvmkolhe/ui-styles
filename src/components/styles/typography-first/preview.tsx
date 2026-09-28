import React from "react";

export function TypographyFirstPreview() {
  return (
    <div className="flex h-full flex-col justify-between bg-white p-4 text-black font-sans">
      <span className="text-[8px] font-bold tracking-widest uppercase text-neutral-400">01 // ESSAY</span>
      <div className="my-auto">
        <p className="text-2xl font-black tracking-tighter leading-none">TYPE IS ALL.</p>
      </div>
      <div className="flex justify-between items-center border-t-2 border-black pt-1">
        <span className="text-[9px] font-black">INTER DISPLAY</span>
        <span className="text-[9px] text-neutral-500">→</span>
      </div>
    </div>
  );
}

export default TypographyFirstPreview;
