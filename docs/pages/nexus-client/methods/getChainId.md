# getChainId

Returns the chain ID associated with the bundler.

## Usage

:::code-group

```typescript [example.ts]
import { nexusClient } from "./nexusClient"

// Get chain ID
const chainId = await nexusClient.getChainId()
// Returns: 84532 (for Base Sepolia)
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
number
```

Returns the current chain ID that the bundler is operating on.

## Related Methods

- [getSupportedEntryPoints](/nexus-client/methods/getSupportedEntryPoints)
- [sendUserOperation](/nexus-client/methods/sendUserOperation) 