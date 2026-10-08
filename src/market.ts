import { encodeAbiParameters, keccak256, type Hex } from "viem";
import type { Address, Chain } from "./types";

/** Factory.createOption parameters. */
export interface MarketParams {
  collateral: Address;
  consideration: Address;
  expirationDate: number;
  strike: bigint;
  isPut: boolean;
  isEuro: boolean;
  windowSeconds: number;
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
