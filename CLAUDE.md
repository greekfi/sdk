# CLAUDE.md

`@greekfi/sdk`: the single source for what Greek is deployed on and how to reach it. The
frontend (`greekfi/protocol` core), `greekfi/market-maker`, and `greekfi/cadence` consume it as a
git dependency; nothing here should be duplicated in those repos.

## Layout

- `src/chains/<chain>.ts` — hand-curated, one file per chain with a live deployment: explorer,
  RPCs (Alchemy network first, public fallbacks), and every token we list.
- `src/generated/` — never hand-edit:
  - `abi.ts` from `scripts/generateAbi.mjs` (frozen contracts build)
  - `deployments.ts` from `scripts/registerDeployment.mjs` (release addresses, deploy blocks)
- `src/data/cbStocks.json` — Coinbase tokenized-stock catalog for Base.
- `deployments/`, `broadcast/` — release manifest, mining record, per-chain address maps, forge
  broadcast logs (`deployments/archive/` holds older releases).
- `foundry/` — SUBMODULE `greekfi/contracts`, pinned to the frozen source in
  `deployments/mining-inputs.json`. Advance it only for a new release.

Only the Alchemy key is secret; apps read it from their environment (`ALCHEMY_API_KEY`).

## Release flow

```bash
forge build --skip test --libraries foundry/contracts/OptionUtils.sol:OptionUtils:<optionUtils>
yarn generate:abi                     # src/generated/abi.ts
yarn register <chainId> <name>        # after a broadcast; or --all to rebuild
yarn check                            # ABI, registry, and tests in sync
```

A new chain also needs `src/chains/<chain>.ts` and an entry in `src/chains/index.ts`; the tests
fail until both sides agree. Bump `version` in `package.json`, then bump the commit in each
consumer.

## Rules

- Tokens: match on address, never symbol. Only list tokens whose transfers are exact and
  balance-preserving (no fee-on-transfer, rebasing, or third-party burn rights).
