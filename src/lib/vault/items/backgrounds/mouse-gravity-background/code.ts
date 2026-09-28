import { createEffectTokens, effectSnippet } from "../../../effect-tokens";
import { metadata } from "./metadata";
import type { VaultMode } from "../../../tokens";
export const effectTokens = (mode: VaultMode) => createEffectTokens(metadata.slug, metadata.category, mode);
export const code = (mode: VaultMode) => effectSnippet(metadata, effectTokens(mode));
export default code;
