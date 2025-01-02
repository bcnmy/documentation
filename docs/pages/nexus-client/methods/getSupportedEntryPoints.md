# getSupportedEntryPoints

Returns an array of EntryPoint contract addresses that are supported by the bundler.

## Usage

:::code-group

```typescript [example.ts]
import { nexusClient } from "./nexusClient"

// Get supported entry points
const entryPoints = await nexusClient.getSupportedEntryPoints()
// Returns: ["0x0000000071727De22E5E9d8BAf0edAc6f37da032"]
```

```typescript [nexusClient.ts]
import { privateKeyToAccount } from "viem/accounts";
import { createSmartAccountClient } from "@biconomy/sdk";
import { baseSepolia } from "viem/chains"; 
import { http } from "viem"; 

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`)
const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"; 

const nexusClient = await createSmartAccountClient({
  signer: account, 
  chain: baseSepolia,
  transport: http(), 
  bundlerTransport: http(bundlerUrl), 
})
```

:::

## Returns

```typescript
readonly Address[]
```

Returns an array of EntryPoint contract addresses that the bundler supports. These addresses can be used when configuring your smart account client or when sending User Operations.

## Related Methods

- [sendUserOperation](/nexus-client/methods/sendUserOperation)
- [prepareUserOperation](/nexus-client/methods/prepareUserOperation)
- [getChainId](/nexus-client/methods/getChainId) 