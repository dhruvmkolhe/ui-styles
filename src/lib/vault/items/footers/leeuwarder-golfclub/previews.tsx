"use client";
import { EffectPreview } from "../../../effect-runtime";
import { metadata } from "./metadata";
import { effectTokens } from "./code";
import type { VaultMode } from "../../../tokens";
export function Preview({ mode }: { mode: VaultMode }) { return <EffectPreview item={metadata} tokens={effectTokens(mode)} />; }
export default Preview;
