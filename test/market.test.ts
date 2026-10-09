import assert from "node:assert/strict";
import test from "node:test";
import { base, decodeStrike, encodeStrike, setupMessage } from "../src";

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

test("calls store the 18-decimal price; puts store 1e36 / price", () => {
  assert.equal(encodeStrike(2380n * 10n ** 18n, false), 2380n * 10n ** 18n);
  assert.equal(encodeStrike(75n * 10n ** 15n, false), 75n * 10n ** 15n);
  assert.equal(encodeStrike(2380n * 10n ** 18n, true), 10n ** 36n / (2380n * 10n ** 18n));
  assert.equal(decodeStrike(2380n * 10n ** 18n, false), 2380n * 10n ** 18n);
  assert.equal(decodeStrike(0n, true), 0n);
  for (const price of [0n, -1n]) for (const isPut of [false, true]) assert.throws(() => encodeStrike(price, isPut), RangeError);
});

test("strikes round-trip", () => {
  const prices = [1n, 7n, 10n ** 15n, 55n * 10n ** 15n, 10n ** 18n, 2380n * 10n ** 18n, 80_000_370n * 10n ** 15n, 130_000n * 10n ** 18n];
  for (let i = 1n; i < 500n; i++) prices.push(i * 997n * 10n ** 15n, i * 250n * 10n ** 18n);
  for (const price of prices) {
    assert.equal(decodeStrike(encodeStrike(price, false), false), price);
    const put = encodeStrike(price, true);
    // Inversion floors, so the decoded put lands at or just above the price and re-encodes exactly.
    assert.ok(decodeStrike(put, true) >= price);
    if (price >= 10n ** 18n) {
      assert.equal(encodeStrike(decodeStrike(put, true), true), put);
      assert.ok((decodeStrike(put, true) - price) * 10n ** 12n < price);
    }
  }
});

test("real strikes from the indexer decode to their listed prices", () => {
  // [chain, option, isPut, on-chain strike, price it was listed at]
  const real: [number, string, boolean, bigint, bigint][] = [
    [8453, "0xF3eFeD9CDFCe825A0F2A486E7839BdD632f81FBA", true, 50000000000000000n, 20n * 10n ** 18n],
    [8453, "0xf1f6E5865baA02Ee0c31966170c90aD9e836C524", false, 158000000000000000000n, 158n * 10n ** 18n],
    [8453, "0xE99379dA6788866A0Ff27b603133481b8CaD0f01", true, 11111111111111111111n, 9n * 10n ** 16n],
    [8453, "0xE0EF2Fb0a473aDCcc41be5DB9B490cC4D64B053e", false, 90000000000000000n, 9n * 10n ** 16n],
    [8453, "0x0743fa279Df4372BB1dedD0a03A433dfdfcc8594", true, 12269938650306n, 81_500n * 10n ** 18n],
    [8453, "0xC9906b0DC281008d5d67B8D7127Ce770Fb404285", false, 81500000000000000000000n, 81_500n * 10n ** 18n],
    [1, "0xDE5B5974105Ab31Fb6E4337a0c324D02127bEf98", true, 16666666666666n, 60_000n * 10n ** 18n],
    [1, "0x84B7fc28B1A87cf51D9b8bAEA01a2b99c83497F4", false, 2500000000000000000000n, 2_500n * 10n ** 18n],
    [1, "0x620B261E53DBDC06A869640c2EAe89637016b6dF", true, 454545454545454n, 2_200n * 10n ** 18n],
    [1, "0xaDC245176DBE7FE5fDb9d7D7cDA42C9c2Dc37727", false, 82000000000000000000000n, 82_000n * 10n ** 18n],
  ];
  for (const [chain, option, isPut, strike, price] of real) {
    const at = `${chain} ${option}`;
    assert.equal(encodeStrike(price, isPut), strike, at);
    assert.equal(encodeStrike(decodeStrike(strike, isPut), isPut), strike, at);
    const decoded = decodeStrike(strike, isPut);
    assert.ok(decoded >= price && (decoded - price) * 10n ** 9n < price, at);
  }
});
