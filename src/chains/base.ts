import type { Chain } from "../types";
import { DEPLOYMENT_BLOCKS, RELEASE } from "../generated/deployments";
import { CB_STOCKS } from "../data/cbStocks";

export const base: Chain = {
  id: 8453,
  key: "base",
  name: "Base",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  explorer: "https://basescan.org",
  rpc: {
    alchemy: "base-mainnet",
    fallback: ["https://mainnet.base.org","https://base-rpc.publicnode.com"],
  },
  deployment: { ...RELEASE, deploymentBlock: DEPLOYMENT_BLOCKS[8453] },
  tokens: [
    { symbol: "WETH", name: "Wrapped Ether", decimals: 18, kind: "underlying", address: "0x4200000000000000000000000000000000000006" },
    { symbol: "cbBTC", name: "Coinbase Wrapped BTC", decimals: 8, kind: "underlying", address: "0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf" },
    { symbol: "VVV", name: "Venice Token", decimals: 18, kind: "underlying", address: "0xacfE6019Ed1A7Dc6f7B508C02d1b04ec88cC21bf" },
    { symbol: "Basecat", name: "Basecat", decimals: 18, kind: "other", address: "0xB2000000000000000000004c27f6523082f41D01" },
    { symbol: "UNI", name: "Uniswap", decimals: 18, kind: "underlying", address: "0xfb3CB973B2a9e2E09746393C59e7FB0d5189d290" },
    { symbol: "USDC", name: "USD Coin", decimals: 6, kind: "stable", address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" },
    { symbol: "USDT", name: "Tether", decimals: 6, kind: "stable", address: "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2" },
    { symbol: "cbETH", name: "Coinbase Wrapped Staked ETH", decimals: 18, kind: "other", address: "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22" },
    { symbol: "wstETH", name: "Wrapped stETH", decimals: 18, kind: "other", address: "0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452" },
    { symbol: "weETH", name: "ether.fi Wrapped", decimals: 18, kind: "other", address: "0x04C0599Ae5A44757c0af6F9eC3b93da8976c150A" },
    { symbol: "ezETH", name: "Renzo Restaked ETH", decimals: 18, kind: "other", address: "0x2416092f143378750bb29b79eD961ab195CcEea5" },
    { symbol: "sUSDC", name: "Sky Savings USDC", decimals: 6, kind: "other", address: "0x3128a0F7f0ea68E7B7c9B00AFa7E41045828e858" },
    { symbol: "sUSDS", name: "Sky Savings USDS", decimals: 6, kind: "other", address: "0xa06b10db9f390990364a3984c04fadf1c13691b5" },
    { symbol: "USDS", name: "Sky USDS", decimals: 6, kind: "other", address: "0x5875eEE11Cf8398102FdAd704C9E96607675467a" },
    { symbol: "USDbC", name: "USD Base Coin (Bridged)", decimals: 6, kind: "other", address: "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA" },
    ...CB_STOCKS,
  ],
};
