import React from "react";

export function ArtDecoPreview() {
  return (
    <div className="flex h-full flex-col justify-between bg-[#0A0A0A] p-4 text-[#C9A961] font-serif border-2 border-[#C9A961]/40">
      <div className="border-b border-[#C9A961]/60 pb-1 text-center">
        <span className="text-[10px] tracking-[0.3em] uppercase">GATSBY &amp; CO</span>
      </div>
      <div className="border border-double border-[#C9A961] p-2 text-center my-auto">
        <p className="text-[10px] font-bold uppercase tracking-widest">GOLDEN SYMMETRY</p>
      </div>
      <div className="flex justify-between items-center text-[8px] tracking-widest uppercase border-t border-[#C9A961]/60 pt-1">
        <span>EST. 1925</span>
        <span className="text-[#E5D2A0]">✦ LUXE ✦</span>
      </div>
    </div>
  );
}

export default ArtDecoPreview;
