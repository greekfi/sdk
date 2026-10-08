import type { Chain, Token } from "../types";
import { base } from "./base";
import { bsc } from "./bsc";
import { ethereum } from "./ethereum";
import { hemi } from "./hemi";
import { robinhood } from "./robinhood";

/** Chains with a live v2.0 deployment. Base first: it is the default chain. */
export const CHAINS: Chain[] = [base, ethereum, bsc, robinhood, hemi];

export function getChain(chainId: number): Chain {
  const chain = CHAINS.find(c => c.id === chainId);
  if (!chain) throw new Error(`Unsupported chain ${chainId}`);
  return chain;
}

export function tokenBySymbol(chainId: number, symbol: string): Token | undefined {
  return getChain(chainId).tokens.find(t => t.symbol === symbol);
}

export function tokenByAddress(chainId: number, address: string): Token | undefined {
  const a = address.toLowerCase();
  return getChain(chainId).tokens.find(t => t.address.toLowerCase() === a);
}

export { base, bsc, ethereum, hemi, robinhood };
