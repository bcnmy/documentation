 # prepareTokenPaymasterUserOp

This method prepares a user operation with token paymaster configuration, including ERC20 token approval. It handles:
1. Checking current token allowance of Smart Account
2. Creating an approval transaction for the token paymaster if needed
3. Preparing the user operation with the approval and user transactions

## Usage

:::code-group

```typescript twoslash [example.ts]
import { nexusClient } from "./nexusClient"

const userOp = await nexusClient.prepareTokenPaymasterUserOp({
  calls: [
    {
      to: recipientAddress,
      value: 1n,
      data: "0x"
    }
  ],
  feeTokenAddress: "0x...", // ERC20 token address
  customApprovalAmount: usdcFeeAmount // optional
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

- `calls` `{ to: Address, data: Hex, value: bigint }[]`: Array of transactions to be executed
- `feeTokenAddress` `Address`: Token address used for paying for the gas
- `customApprovalAmount` `bigint` (optional): Custom approval amount for the token paymaster. If not provided, max uint256 will be used

## Response

- `Promise<Omit<UserOperation<"0.7">, "signature">>`: Returns a prepared user operation without signature (will be signed by the Smart Account when sent)

## Error Handling

The method will throw an error if:
- Client account is not properly configured
- Paymaster context is not properly configured