// Refresh the Coinbase tokenized-stock catalog for Base from the issuer API.
import { writeFile, readFile } from "node:fs/promises";

const response = await fetch("https://api.coinbase.com/v1/tokenized-stocks", { signal: AbortSignal.timeout(15_000) });
if (!response.ok) throw new Error(`Coinbase catalog: HTTP ${response.status}`);
const { tokens } = await response.json();
if (!Array.isArray(tokens) || !tokens.length) throw new Error("Empty Coinbase catalog");
const seen = new Set();
const catalog = tokens.map(t => {
  // Symbols are the ticker plus "c"; class shares keep their dot (BRK.Bc).
  if (!/^0x[0-9a-f]{40}$/i.test(t.contract_address) || !Number.isInteger(t.decimals) || t.decimals < 0 || t.decimals > 36 || !/^[A-Za-z0-9]+(\.[A-Za-z0-9]+)?$/.test(t.symbol)) throw new Error("Invalid Coinbase token");
  const address = t.contract_address.toLowerCase();
  if (seen.has(address)) throw new Error(`Duplicate token ${address}`);
  seen.add(address);
  return { address, symbol: t.symbol, name: t.name, decimals: t.decimals, iconUrl: t.icon_url };
}).sort((a, b) => a.symbol.localeCompare(b.symbol));
const content = JSON.stringify(catalog, null, 2) + "\n";
for (const path of ["src/data/cbStocks.json"]) {
  const url = new URL(`../${path}`, import.meta.url);
  if (process.argv.includes("--check")) {
    if (await readFile(url, "utf8") !== content) throw new Error(`Catalog changed: run node scripts/syncCbStocks.mjs (${path})`);
  } else await writeFile(url, content);
}
console.log(`${catalog.length} Coinbase stocks verified against the issuer API.`);
