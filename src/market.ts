import { type Address, encodeAbiParameters, keccak256, type Hex } from "viem";
import type { Chain } from "./types";

/** Factory.createOption parameters. Address is viem's, so it follows each app's abitype config. */
export interface MarketParams {
  collateral: Address;
  consideration: Address;
  expirationDate: number;
  strike: bigint;
  isPut: boolean;
  isEuro: boolean;
  windowSeconds: number;
}

/**
 * On-chain strike from a human strike. Both are 18-decimal consideration per collateral,
 * whatever the token decimals. Calls store the price; puts store `1e36 / price`.
 */
export function encodeStrike(price: bigint, isPut: boolean): bigint {
  if (price <= 0n) throw new RangeError("Strike must be positive");
  return isPut ? 10n ** 36n / price : price;
}

/** Human strike (18-decimal consideration per collateral) from an on-chain strike. */
export function decodeStrike(strike: bigint, isPut: boolean): bigint {
  return isPut && strike > 0n ? 10n ** 36n / strike : strike;
}

/** The Factory's key for a market (`optionFor(key)`). */
export function marketKey(p: MarketParams): Hex {
  return keccak256(
    encodeAbiParameters(
      [
        { type: "address" },
        { type: "address" },
        { type: "uint40" },
        { type: "uint256" },
        { type: "bool" },
        { type: "bool" },
        { type: "uint40" },
      ],
      [p.collateral, p.consideration, p.expirationDate, p.strike, p.isPut, p.isEuro, p.windowSeconds],
    ),
  );
}

/**
 * Text a taker signs to ask the maker to create a market on `chain`. The maker verifies the
 * signature against this exact text, so the frontend and maker must both build it here.
 */
export function setupMessage(chain: Chain, key: string, taker: string, amount: string, timestamp: number): string {
  return [
    "Greek trade setup",
    `Chain: ${chain.id}`,
    `Factory: ${chain.deployment.factory.toLowerCase()}`,
    `Terms: ${key}`,
    `Wallet: ${taker.toLowerCase()}`,
    `Amount: ${amount}`,
    `Requested at: ${timestamp}`,
    "The maker pays setup gas. This message does not authorize moving your assets.",
  ].join("\n");
}
