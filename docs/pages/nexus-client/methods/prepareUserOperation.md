# prepareUserOperation

This method prepares a User Operation for execution by filling in missing properties. It's useful when you want to construct a User Operation before sending it.

## Usage

:::code-group

```typescript [example.ts]
import { nexusClient } from "./nexusClient"
import { parseEther } from "viem"

// Prepare a user operation
const userOperation = await nexusClient.prepareUserOperation({
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }]
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

## Parameters

- `calls` `{ data?: Hex, to: Address, value?: bigint }[]`: Array of transactions to execute
- `callGasLimit` `bigint` (optional): Amount of gas to allocate for the main execution call
- `maxFeePerGas` `bigint` (optional): Maximum fee per gas for User Operation execution
- `maxPriorityFeePerGas` `bigint` (optional): Maximum priority fee per gas
- `nonce` `bigint` (optional): Nonce for the User Operation
- `paymaster` `Address | true | PaymasterClient` (optional): Paymaster configuration for gas sponsorship
- `paymasterData` `Hex` (optional): Call data to execute on the Paymaster contract
- `signature` `Hex` (optional): Signature for the User Operation
- `verificationGasLimit` `bigint` (optional): Gas to allocate for verification
- `preVerificationGas` `bigint` (optional): Extra gas to pay the Bundler

## Returns

Returns a prepared `UserOperation` object that can be used with `sendUserOperation`.

## Related Methods

- [sendUserOperation](/nexus-client/methods/sendUserOperation)
- [debugUserOperation](/nexus-client/methods/debugUserOperation) 