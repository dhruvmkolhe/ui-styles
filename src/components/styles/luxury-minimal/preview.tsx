import React from "react";

export function LuxuryMinimalPreview() {
  return (
    <div className="flex h-full flex-col justify-between bg-[#0A0A0A] p-4 text-white font-serif">
      <p className="text-[8px] tracking-[0.4em] uppercase text-[#B8935A]">HAUTE COUTURE</p>
      <div className="my-auto space-y-1 text-center">
        <p className="text-sm tracking-widest uppercase font-light">MAISON 01</p>
        <div className="h-px w-6 bg-[#B8935A] mx-auto" />
      </div>
      <div className="flex justify-between items-center text-[8px] font-sans tracking-widest text-neutral-400">
        <span>COLLECTION</span>
        <span className="text-[#B8935A]">2026</span>
      </div>
    </div>
  );
}

export default LuxuryMinimalPreview;
