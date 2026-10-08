# CLAUDE.md

`@greekfi/sdk`: the single source for what Greek is deployed on and how to reach it. The
frontend (`greekfi/protocol` core), `greekfi/market-maker`, and `greekfi/cadence` consume it as a
git dependency; anything here must not be duplicated in those repos.

## Layout

- `src/chains/<chain>.ts` — one file per chain with a live v2.0 deployment: id, explorer,
  RPCs (Alchemy network + public fallbacks), the deployment block, and every token we list.
- `src/deployments.ts` — v2.0 addresses (identical on every chain).
- `src/abi.ts` — generated v2.0 ABIs. Do not hand-edit.
- `src/data/cbStocks.json` — Coinbase tokenized-stock catalog for Base.
- `src/rpc.ts` — `rpcUrls(chain, alchemyKey)`: Alchemy first, public fallbacks after. Only the
  Alchemy key is secret; it comes from each app's environment, never this repo.

## Rules

- Tokens: match on address, never symbol. Only list tokens whose transfers are exact and
  balance-preserving (no fee-on-transfer, rebasing, or third-party burn rights).
- `yarn test` checks every address is valid hex and unique per chain. Run it after any edit.
- Consumers pin a commit or tag; bump the version in `package.json` when publishing a change.
