import type { Chain } from "../types";
import { DEPLOYMENT_BLOCKS, RELEASE } from "../generated/deployments";

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
  deployment: { ...RELEASE, deploymentBlock: DEPLOYMENT_BLOCKS[56] },
  tokens: [

  ],
};
