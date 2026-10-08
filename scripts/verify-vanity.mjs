import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { concatHex, getAddress, keccak256 } from "viem";
const inputs = JSON.parse(
  readFileSync(new URL("../deployments/mining-inputs.json", import.meta.url)),
);

function predict(salt) {
  assert.match(salt, /^0x[0-9a-fA-F]{64}$/);
  const effectiveSalt = keccak256(concatHex([inputs.owner, salt]));
  const hash = keccak256(
    concatHex(["0xff", inputs.deployer, effectiveSalt, inputs.initCodeHash]),
  );
  return getAddress(`0x${hash.slice(-40)}`);
}

// This vector was independently calculated with cast keccak.
assert.equal(
  predict(
    "0x18706695e2966efa6c565436e2d5a788ca3321d0123456780100000002000000",
  ).toLowerCase(),
  "0x16ec2c41ec296dbb5546bdbc7e1aff140fdb7462",
);

const [salt, candidate] = process.argv.slice(2);
if (salt) {
  const factory = predict(salt);
  assert.equal(factory.toLowerCase(), candidate?.toLowerCase());
  assert.ok(
    factory.toLowerCase().startsWith(`0x${"9".repeat(inputs.leadingNines)}`),
  );
  console.log(
    JSON.stringify(
      { salt, owner: inputs.owner, initCodeHash: inputs.initCodeHash, factory },
      null,
      2,
    ),
  );
} else {
  console.log("Owner-bound CREATE2 test vector passed.");
}
