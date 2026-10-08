import type { Chain } from "./types";

export function alchemyUrl(chain: Chain, apiKey: string): string {
  return `https://${chain.rpc.alchemy}.g.alchemy.com/v2/${apiKey}`;
}

/** Alchemy first when a key is given, then the chain's public fallbacks. */
export function rpcUrls(chain: Chain, alchemyKey?: string): string[] {
  return alchemyKey ? [alchemyUrl(chain, alchemyKey), ...chain.rpc.fallback] : [...chain.rpc.fallback];
}
