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
  quote: "USDT",
  // Binance-Peg tokens use 18 decimals, including USDC and USDT. FDUSD is excluded: its issuer can
  // freeze and pause transfers, which could strand collateral mid-exercise.
  tokens: [
    { symbol: "WBNB", name: "Wrapped BNB", decimals: 18, kind: "underlying", address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" },
    { symbol: "BTCB", name: "Binance-Peg BTCB", decimals: 18, kind: "underlying", address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c" },
    { symbol: "ETH", name: "Binance-Peg Ethereum", decimals: 18, kind: "underlying", address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8" },
    { symbol: "USDC", name: "Binance-Peg USD Coin", decimals: 18, kind: "stable", address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d" },
    { symbol: "USDT", name: "Binance-Peg BSC-USD", decimals: 18, kind: "stable", address: "0x55d398326f99059fF775485246999027B3197955" },
    { symbol: "CAKE", name: "PancakeSwap", decimals: 18, kind: "other", address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82" },
    // Tokenized stocks (beacon proxies), listed by owner decision 2026-10-09 despite their pause
    // manager: transfers pass a compliance check, the issuer can pause them, and a UI multiplier
    // tracks corporate actions (1 token = multiplier/1e18 shares). No third-party burn.
    { symbol: "AAPLB", name: "Apple", decimals: 18, kind: "other", ticker: "AAPL", address: "0x431a3BEE82E2ca41e49895CbECE5bB0F76A89b7A" },
    { symbol: "SPYB", name: "SPY", decimals: 18, kind: "other", ticker: "SPY", address: "0x7138b48df7D98D7e3cc221BfE7192D0a178182D8" },
  ],
};
