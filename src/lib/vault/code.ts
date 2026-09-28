import type { VaultItem } from "./registry";
import type { VaultMode } from "./tokens";
import { createEffectTokens } from "./effect-tokens";
import { getBespokeSnippet } from "./snippets";

export async function vaultCode(item: VaultItem, mode: VaultMode): Promise<string> {
  const tokens = createEffectTokens(item.slug, item.category, mode);
  return getBespokeSnippet(item, tokens);
}

export default vaultCode;
