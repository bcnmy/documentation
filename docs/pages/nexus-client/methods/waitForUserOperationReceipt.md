# waitForUserOperationReceipt

Waits for the User Operation to be included on a Block (one confirmation), and then returns the User Operation receipt.

## Usage

:::code-group

```typescript twoslash [example.ts]
import { nexusClient } from "./nexusClient"

const receipt = await nexusClient.waitForUserOperationReceipt({
  hash: '0x315a882b82eb33250b919da6ebb2dd890df39ca0840e4026cbbad595b9a07e86'
})
```
```typescript twoslash [nexusClient.ts] filename="nexusClient.ts"
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

## Parameters
- hash `'0x${string}'`: A Transaction hash.
- pollingInterval (optional) `number`: Polling frequency (in ms) 
- retryCount (optional) `number`: The number of times to retry. Default value is 6.
- timeout (optional) `number`: Optional timeout (in ms) to wait before stopping polling. Default value is 5000.

## Response
- receipt `Promise<UserOperationReceipt>`: The User Operation receipt. 