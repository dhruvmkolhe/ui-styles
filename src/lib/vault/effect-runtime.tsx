"use client";

import type { VaultItem } from "./registry";
import type { EffectTokens } from "./effect-tokens";
import { ButtonEffect } from "./components/button-effects";
import { TextEffect } from "./components/text-effects";
import { VisualEffect } from "./components/visual-effects";
import { ImageInteractionEffect } from "./components/image-effects";
import { Design3DEffect } from "./components/design-3d-effects";
import { BackgroundEffect } from "./components/background-effects";
import { InteractiveBgEffect } from "./components/interactive-bg-effects";
import { CursorEffect } from "./components/cursor-effects";
import { ScrollEffect } from "./components/scroll-effects";
import { LoaderEffect } from "./components/loader-effects";
import { NavbarEffect } from "./components/navbar-effects";
import { FooterEffect } from "./components/footer-effects";
import { FormEffect } from "./components/form-effects";

export function EffectPreview({ item, tokens: t }: { item: VaultItem; tokens: EffectTokens }) {
  const cat = item.category;
  const slug = item.slug;
  const mode = t.mode;

  let content: React.ReactNode;

  if (cat === "Buttons / Hover Effects") {
    content = <ButtonEffect slug={slug} mode={mode} />;
  } else if (cat === "Text Animations") {
    content = <TextEffect slug={slug} mode={mode} />;
  } else if (cat === "Visual Effects") {
    content = <VisualEffect slug={slug} mode={mode} />;
  } else if (cat === "Image Interaction") {
    content = <ImageInteractionEffect slug={slug} mode={mode} />;
  } else if (cat === "3D Design") {
    content = <Design3DEffect slug={slug} mode={mode} />;
  } else if (cat === "Backgrounds") {
    content = <BackgroundEffect slug={slug} mode={mode} />;
  } else if (cat === "Interactive Background") {
    content = <InteractiveBgEffect slug={slug} mode={mode} />;
  } else if (cat === "Cursor Effects") {
    content = <CursorEffect slug={slug} mode={mode} />;
  } else if (cat === "Scroll Animation") {
    content = <ScrollEffect slug={slug} mode={mode} />;
  } else if (cat === "Option Wheel Loaders") {
    content = <LoaderEffect slug={slug} mode={mode} />;
  } else if (cat === "Navbars") {
    content = <NavbarEffect slug={slug} mode={mode} />;
  } else if (cat === "Footers") {
    content = <FooterEffect slug={slug} mode={mode} />;
  } else if (cat === "Forms & Inputs") {
    content = <FormEffect slug={slug} mode={mode} />;
  } else {
    content = <div className="text-white font-bold">{item.name}</div>;
  }

  return (
    <div
      className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-[#07090e] p-6 sm:p-10 shadow-2xl flex flex-col items-center justify-center min-h-[300px]"
      data-vault-canvas={item.slug}
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.15), transparent 70%)`,
        }}
      />
      <div className="relative z-10 w-full flex items-center justify-center">
        {content}
      </div>
      <p className="relative mt-5 text-center text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
        ✦ Interactive Preview · {item.category} ✦
      </p>
    </div>
  );
}
