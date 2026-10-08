import type { Chain } from "../types";
import { DEPLOYMENT_BLOCKS, RELEASE } from "../generated/deployments";

export const ethereum: Chain = {
  id: 1,
  key: "ethereum",
  name: "Ethereum",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  explorer: "https://etherscan.io",
  rpc: {
    alchemy: "eth-mainnet",
    fallback: ["https://ethereum-rpc.publicnode.com"],
  },
  deployment: { ...RELEASE, deploymentBlock: DEPLOYMENT_BLOCKS[1] },
  tokens: [
    { symbol: "WETH", name: "Wrapped Ether", decimals: 18, kind: "underlying", address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" },
    { symbol: "WBTC", name: "Wrapped Bitcoin", decimals: 8, kind: "underlying", address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599" },
    { symbol: "cbBTC", name: "Coinbase Wrapped BTC", decimals: 8, kind: "underlying", address: "0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf" },
    { symbol: "UNI", name: "Uniswap", decimals: 18, kind: "underlying", address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984" },
    { symbol: "USDC", name: "USD Coin", decimals: 6, kind: "stable", address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" },
    { symbol: "DAI", name: "Dai", decimals: 18, kind: "stable", address: "0x6B175474E89094C44Da98b954EedeAC495271d0F" },
    { symbol: "osETH", name: "StakeWise osETH", decimals: 18, kind: "other", address: "0xf1C9acDc66974dFB6dEcB12aA385b9cD01190E38" },
    { symbol: "PAXG", name: "PAX Gold", decimals: 18, kind: "other", address: "0x45804880De22913dAFE09f4980848ECE6EcbAf78" },
    { symbol: "XAUt", name: "Tether Gold", decimals: 6, kind: "other", address: "0x68749665FF8D2d112Fa859AA293F07A622782F38" },
    { symbol: "USDT", name: "Tether USD", decimals: 6, kind: "stable", address: "0xdAC17F958D2ee523a2206206994597C13D831ec7" },
  ],
};
