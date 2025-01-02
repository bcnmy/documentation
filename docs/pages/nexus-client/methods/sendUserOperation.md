# sendUserOperation

Broadcasts a User Operation to the Bundler. This method allows you to execute one or more transactions through your Smart Account.

## Usage

:::code-group

```typescript twoslash [example.ts]
import { nexusClient } from "./nexusClient"
import { parseEther } from 'viem'

// Simple ETH transfer
const hash = await nexusClient.sendUserOperation({
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }]
})

// Multiple calls including contract interaction
const hash2 = await nexusClient.sendUserOperation({
  calls: [
    { 
      to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', 
      value: parseEther('1') 
    }, 
    { 
      abi: wagmiAbi, 
      functionName: 'mint', 
      to: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', 
    }
  ] 
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

export const nexusClient = await createSmartAccountClient({ 
    signer: account, 
    chain: baseSepolia,
    transport: http(), 
    bundlerTransport: http(bundlerUrl), 
});
```

:::

## Parameters

### Required Parameters
- `calls` `({ data?: Hex, to: Address, value?: bigint } | { abi: Abi, functionName: string, args: unknown[], to: Address, value?: bigint })[]`: Array of transactions to execute

### Optional Parameters
- `maxFeePerGas` `bigint`: Maximum fee per gas for User Operation execution
- `maxPriorityFeePerGas` `bigint`: Maximum priority fee per gas
- `callGasLimit` `bigint`: Amount of gas to allocate for the main execution call
- `verificationGasLimit` `bigint`: Amount of gas to allocate for the verification step
- `preVerificationGas` `bigint`: Extra gas to pay the Bundler
- `nonce` `bigint`: Nonce for the User Operation
- `paymaster` `Address | true | PaymasterClient | PaymasterAction`: Paymaster configuration for gas sponsorship
- `paymasterData` `Hex`: Call data to execute on the Paymaster contract (when paymaster is an address)
- `paymasterVerificationGasLimit` `bigint`: Gas limit for paymaster validation
- `paymasterPostOpGasLimit` `bigint`: Gas limit for paymaster post-operation code
- `signature` `Hex`: Custom signature for the User Operation

## Response

- `Promise<Hash>`: Returns the User Operation hash

## Paymaster Configuration

The `paymaster` parameter supports multiple configurations:

```typescript
// Using a Paymaster address
const hash = await nexusClient.sendUserOperation({
  calls: [...],
  paymaster: '0x942fD5017c0F60575930D8574Eaca13BEcD6e1bB',
  paymasterData: '0xdeadbeef'
})

// Using a Paymaster Client
const hash = await nexusClient.sendUserOperation({
  calls: [...],
  paymaster: paymasterClient,
  paymasterContext: {
    policyId: 'abc123'
  }
})
```

## Error Handling

The method will throw an error if:
- The client account is not properly configured
- User operation preparation fails
- Bundler rejects the operation
- Gas estimation fails

## Related Methods

- [waitForUserOperationReceipt](./waitForUserOperationReceipt.md) - Wait for operation confirmation
- [prepareUserOperation](./prepareUserOperation.md) - Prepare operation without sending 