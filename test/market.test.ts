import assert from "node:assert/strict";
import test from "node:test";
import { base, setupMessage } from "../src";

test("setup message text is stable (the maker verifies signatures against it)", () => {
  assert.equal(
    setupMessage(base, "0xabc", "0xAbCd", "1000000", 1700000000),
    [
      "Greek trade setup",
      "Chain: 8453",
      "Factory: 0x9999999999995aa18a8944e311ce792a9b90a8b1",
      "Terms: 0xabc",
      "Wallet: 0xabcd",
      "Amount: 1000000",
      "Requested at: 1700000000",
      "The maker pays setup gas. This message does not authorize moving your assets.",
    ].join("\n"),
  );
});
