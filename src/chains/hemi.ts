import type { Chain } from "../types";
import { V2 } from "../deployments";

export const hemi: Chain = {
  id: 43111,
  key: "hemi",
  name: "Hemi",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  explorer: "https://explorer.hemi.xyz",
  rpc: {
    alchemy: "hemi-mainnet",
    fallback: ["https://hemi.drpc.org","https://rpc.hemi.network/rpc"],
  },
  deployment: { ...V2, deploymentBlock: 5229320 },
  tokens: [
    { symbol: "WETH", name: "Wrapped Ether", decimals: 18, kind: "underlying", address: "0x4200000000000000000000000000000000000006" },
    { symbol: "WBTC", name: "Wrapped Bitcoin", decimals: 8, kind: "underlying", address: "0x03C7054BCB39f7b2e5B2c7AcB37583e32D70Cfa3" },
    { symbol: "hemiBTC", name: "Hemi Bitcoin", decimals: 8, kind: "underlying", address: "0xAA40c0c7644e0b2B224509571e10ad20d9C4ef28" },
    { symbol: "USDT", name: "Tether", decimals: 6, kind: "stable", address: "0xbB0D083fb1be0A9f6157ec484b6C79E0A4e31C2e" },
    { symbol: "USDC.e", name: "Bridged USDC", decimals: 6, kind: "stable", address: "0xad11a8BEb98bbf61dbb1aa0F6d6F2ECD87b35afA" },
    { symbol: "VUSD", name: "VUSD", decimals: 18, kind: "other", address: "0x7A06C4AeF988e7925575C50261297a946aD204A8" },
  ],
};
