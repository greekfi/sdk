import type { Address, Token } from "../types";
import catalog from "./cbStocks.json";

/** Coinbase tokenized stocks on Base, from the issuer's catalog (cbStocks.json). */
export const CB_STOCKS: Token[] = catalog.map(t => ({
  symbol: t.symbol,
  name: t.name,
  decimals: t.decimals,
  kind: "other",
  address: t.address as Address,
  cbStock: true,
  iconUrl: t.iconUrl,
}));
