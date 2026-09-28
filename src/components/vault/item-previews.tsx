"use client";

import type { VaultItem } from "@/lib/vault/registry";
import type { VaultMode } from "@/lib/vault/tokens";
import { EffectPreview } from "@/lib/vault/effect-runtime";
import { createEffectTokens } from "@/lib/vault/effect-tokens";

export function ItemPreview({ item, mode }: { item: VaultItem; mode: VaultMode }) {
  const tokens = createEffectTokens(item.slug, item.category, mode);
  return <EffectPreview item={item} tokens={tokens} />;
}
