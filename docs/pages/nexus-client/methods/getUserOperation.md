# getUserOperation

Retrieves information about a User Operation given a hash.

## Usage

:::code-group

```typescript [example.ts]
import { nexusClient } from "./nexusClient"

// Get user operation details
const userOp = await nexusClient.getUserOperation({
  hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d'
})
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
{
  blockHash: Hash,
  blockNumber: bigint,
  entryPoint: Address,
  transactionHash: Hash,
  userOperation: UserOperation
}
```

Returns an object containing:
- `blockHash`: Hash of the block containing the User Operation
- `blockNumber`: Block number where the User Operation was included
- `entryPoint`: Address of the EntryPoint contract used
- `transactionHash`: Hash of the transaction that included the User Operation
- `userOperation`: The full User Operation details

## Parameters

### hash

- **Type:** `'0x${string}'`
- **Required:** Yes

The User Operation hash to query.

```typescript
const result = await nexusClient.getUserOperation({
  hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d'
})
```

## Related Methods

- [sendUserOperation](/nexus-client/methods/sendUserOperation)
- [waitForUserOperationReceipt](/nexus-client/methods/waitForUserOperationReceipt) 