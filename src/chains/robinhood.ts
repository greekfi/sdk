import type { Chain } from "../types";
import { DEPLOYMENT_BLOCKS, RELEASE } from "../generated/deployments";

export const robinhood: Chain = {
  id: 4663,
  key: "robinhood",
  name: "Robinhood Chain",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  explorer: "https://robinhoodchain.blockscout.com",
  rpc: {
    alchemy: "robinhood-mainnet",
    fallback: ["https://rpc.mainnet.chain.robinhood.com"],
  },
  deployment: { ...RELEASE, deploymentBlock: DEPLOYMENT_BLOCKS[4663] },
  quote: "USDG",
  tokens: [
    { symbol: "WETH", name: "Wrapped Ether", decimals: 18, kind: "underlying", address: "0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73" },
    { symbol: "VIRTUAL", name: "Virtuals Protocol", decimals: 18, kind: "underlying", address: "0xc6911796042b15d7Fa4F6CDe69e245DdCd3d9c31" },
    { symbol: "USDG", name: "Global Dollar", decimals: 6, kind: "stable", address: "0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168" },
    { symbol: "USDe", name: "Ethena USDe", decimals: 18, kind: "stable", address: "0x5d3a1Ff2b6BAb83b63cd9AD0787074081a52ef34" },
  ],
};
