import type { Abi } from "viem";
import { contracts } from "../src";

// Compile-time: each generated ABI must satisfy viem's Abi type, or consumers lose type inference.
contracts.Factory.abi satisfies Abi;
contracts.Option.abi satisfies Abi;
contracts.Receipt.abi satisfies Abi;
contracts.OptionUtils.abi satisfies Abi;
contracts.FactoryDeployer.abi satisfies Abi;
