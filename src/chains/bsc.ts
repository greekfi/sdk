import type { Chain } from "../types";
import { V2 } from "../deployments";

export const bsc: Chain = {
  id: 56,
  key: "bsc",
  name: "BNB Smart Chain",
  nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
  explorer: "https://bscscan.com",
  rpc: {
    alchemy: "bnb-mainnet",
    fallback: ["https://bsc-dataseed.bnbchain.org"],
  },
  deployment: { ...V2, deploymentBlock: 120154298 },
  tokens: [

  ],
};
