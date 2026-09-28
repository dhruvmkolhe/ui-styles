import React from "react";

export function MaterialPreview() {
  return (
    <div className="flex h-full flex-col justify-between bg-[#F5F5F5] p-4 text-[#121212] font-sans">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#6200EE]">Material UI</span>
        <span className="h-2 w-2 rounded-full bg-[#03DAC6]" />
      </div>
      <div className="rounded-xl bg-white p-3 shadow-md border border-neutral-100">
        <p className="text-[10px] font-semibold">Elevation Card</p>
        <p className="text-[8px] text-neutral-500 mt-0.5">Tactile paper surface</p>
      </div>
      <div className="flex gap-2">
        <span className="rounded-full bg-[#6200EE] px-3 py-1 text-[9px] text-white shadow">FAB</span>
      </div>
    </div>
  );
}

export default MaterialPreview;
