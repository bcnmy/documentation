# sendTokenPaymasterUserOp

This method combines the preparation and sending of a user operation that uses token paymaster for gas payment. It handles the entire flow of:
1. Preparing the user operation with token paymaster configuration
2. Adding token approval if needed
3. Signing and sending the operation

## Usage

:::code-group

```typescript twoslash [example.ts]
import { createSmartAccountClient } from "./nexusClient"

const hash = await nexusClient.sendTokenPaymasterUserOp({
  calls: [
    {
      to: recipientAddress,
      value: 1n,
      data: "0x"
    }
  ],
  feeTokenAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC address
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
- `feeTokenAddress` `Address`: The ERC20 token address to be used for paying gas fees
- `customApprovalAmount` `bigint` (optional): Custom approval amount for the token paymaster
- `maxFeePerGas` `bigint` (optional): Maximum fee per gas unit
- `maxPriorityFeePerGas` `bigint` (optional): Maximum priority fee per gas unit

## Response

- `Promise<Hash>`: Returns the transaction hash of the submitted user operation

## Error Handling

The method will throw an error if:
- The client account is not properly configured
- The paymaster context is missing or invalid
- Token approval fails
- User operation submission fails

## Related Methods

- [prepareTokenPaymasterUserOp](./prepareTokenPaymasterUserOp.md) - If you need more control over the preparation step
- [sendTransaction](./sendTransaction.md) - For sending transactions without token paymaster 