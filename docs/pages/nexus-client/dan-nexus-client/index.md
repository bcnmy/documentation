# DAN Nexus Client

The DAN (Delegated Authorization Network) Nexus Client provides secure, distributed key management for AI agent authorization. By leveraging EigenLayer's economic security and Silent Shard's MPC network, it enables safe delegation of transaction signing while maintaining strict user-defined permissions.

## Usage

:::code-group

```typescript twoslash [index.ts]
// @filename: config.ts
import { type Account } from "viem"
import { type Chain } from "viem/chains"
import { UnknownSigner } from "@biconomy/sdk-canary"
export const account: UnknownSigner = {} as UnknownSigner
export const bundlerUrl = "" as string
export const chain: Chain = {} as Chain
// @filename: index.ts
// ---cut---
import { createNexusClient, danActions } from "@biconomy/sdk-canary";
import { http, parseEther } from "viem";
import { account, bundlerUrl, chain } from "./config";

const nexusClient = await createNexusClient({
  signer: account, 
  chain,
  transport: http(), 
  bundlerTransport: http(bundlerUrl), 
})

const danNexusClient = nexusClient.extend(danActions());

// Generate distributed keys
const keyGenData = await danNexusClient.keyGen();

// Send transaction using distributed signing
const txHash = await danNexusClient.sendTx({
  keyGenData,
  calls: [
    {
      to: "0x...",
      value: parseEther("0.1")
    }
  ]
});
```

```typescript twoslash [config.ts]
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";

const privateKey = "PRIVATE_KEY";
export const account = privateKeyToAccount(`0x${privateKey}`);
export const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";
export const chain = baseSepolia;
```

:::

