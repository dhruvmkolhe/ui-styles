import type { Metadata } from "next";
import { VaultBrowser } from "@/components/vault/vault-browser";
export const metadata: Metadata = { title: "Component Vault", description: "Advanced interactive UI effects and component kits with copy-ready Tailwind." };
export default function ComponentVaultPage() { return <VaultBrowser />; }
