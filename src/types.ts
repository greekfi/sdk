export type Address = `0x${string}`;

/** "underlying": what options are written on. "stable": the quote asset. "other": mintable but not listed in the structured UIs. */
export type TokenKind = "underlying" | "stable" | "other";

export interface Token {
  symbol: string;
  name: string;
  decimals: number;
  kind: TokenKind;
  address: Address;
  /** Coinbase tokenized stock (Base). */
  cbStock?: true;
  iconUrl?: string;
}

export interface Deployment {
  release: string;
  factory: Address;
  optionTemplate: Address;
  receiptTemplate: Address;
  optionUtils: Address;
  factoryDeployer: Address;
  /** First block with the Factory; where OptionCreated scans start. */
  deploymentBlock: number;
}

export interface Chain {
  id: number;
  /** Filename-safe identifier. */
  key: string;
  name: string;
  nativeCurrency: { name: string; symbol: string; decimals: number };
  explorer: string;
  rpc: {
    /** Alchemy network name, e.g. "base-mainnet". */
    alchemy: string;
    /** Public RPCs tried after Alchemy. */
    fallback: string[];
  };
  deployment: Deployment;
  tokens: Token[];
}
