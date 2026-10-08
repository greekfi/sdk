import assert from "node:assert/strict";
import test from "node:test";
import { CHAINS, DEPLOYMENT_BLOCKS, rpcUrls } from "../src";

test("every token address is a valid, unique address on its chain", () => {
  for (const chain of CHAINS) {
    const seen = new Set<string>();
    for (const t of chain.tokens) {
      assert.match(t.address, /^0x[0-9a-fA-F]{40}$/, `${chain.key} ${t.symbol}`);
      assert.ok(!seen.has(t.address.toLowerCase()), `${chain.key} ${t.symbol} duplicated`);
      seen.add(t.address.toLowerCase());
      assert.ok(Number.isInteger(t.decimals) && t.decimals >= 0 && t.decimals <= 36, `${chain.key} ${t.symbol} decimals`);
    }
  }
});

test("Alchemy comes first when a key is given, then the public fallbacks", () => {
  const [base] = CHAINS;
  assert.deepEqual(rpcUrls(base), base.rpc.fallback);
  assert.deepEqual(rpcUrls(base, "k"), ["https://base-mainnet.g.alchemy.com/v2/k", ...base.rpc.fallback]);
});

test("every registered deployment has a chain file, and every chain file is registered", () => {
  assert.deepEqual(
    CHAINS.map(c => c.id).sort((a, b) => a - b),
    Object.keys(DEPLOYMENT_BLOCKS).map(Number).sort((a, b) => a - b),
  );
});
