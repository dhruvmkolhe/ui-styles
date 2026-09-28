import React from "react";

export function GradientModernPreview() {
  return (
    <div className="relative h-full overflow-hidden bg-[#0D0B18] p-4 text-white">
      <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-[#8B5CF6]/50 blur-2xl" />
      <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-[#EC4899]/50 blur-2xl" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-[#EC4899]">Mesh SaaS</span>
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[8px] backdrop-blur">PRO</span>
        </div>
        <div className="rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-lg">
          <p className="text-[10px] font-medium">Vibrant Gradients</p>
        </div>
        <div className="flex gap-2">
          <span className="rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] px-3 py-1 text-[9px]">Launch</span>
        </div>
      </div>
    </div>
  );
}

export default GradientModernPreview;
