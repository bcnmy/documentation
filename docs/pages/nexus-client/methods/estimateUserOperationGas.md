# estimateUserOperationGas

Estimates the gas values for a User Operation to be executed successfully.

## Usage

:::code-group

```typescript [example.ts]
import { nexusClient } from "./nexusClient"
import { parseEther } from "viem"

// Estimate gas for a user operation
const gas = await nexusClient.estimateUserOperationGas({
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

## Returns

```typescript
{
  callGasLimit: bigint;
  preVerificationGas: bigint;
  verificationGasLimit: bigint;
  paymasterVerificationGasLimit: bigint | undefined;
  paymasterPostOpGasLimit: bigint | undefined;
}
```

The estimated gas values for the User Operation.

## Parameters

### calls

- **Type:** `{ data?: Hex, to: Address, value?: bigint }[]`
- **Required:** Yes

The calls to execute in the User Operation.

```typescript
const gas = await nexusClient.estimateUserOperationGas({
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }]
})
```

### Contract Calls

The `calls` property also accepts Contract Calls using the `abi`, `functionName`, and `args` properties:

```typescript
const gas = await nexusClient.estimateUserOperationGas({
  calls: [{
    abi: wagmiAbi,
    functionName: 'mint',
    to: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  }]
})
```

### Optional Parameters

- `callGasLimit` `bigint`: Amount of gas to allocate for the main execution call
- `maxFeePerGas` `bigint`: Maximum fee per gas for User Operation execution
- `maxPriorityFeePerGas` `bigint`: Maximum priority fee per gas
- `nonce` `bigint`: Nonce for the User Operation
- `verificationGasLimit` `bigint`: Gas to allocate for verification
- `preVerificationGas` `bigint`: Extra gas to pay the Bundler

### Paymaster Configuration

You can configure a paymaster in several ways:

```typescript
// Using a paymaster address
const gas = await nexusClient.estimateUserOperationGas({
  calls: [{
    to: '0x...',
    value: parseEther('1')
  }],
  paymaster: '0x942fD5017c0F60575930D8574Eaca13BEcD6e1bB',
  paymasterData: '0xdeadbeef'
})

// Using a paymaster client
const gas = await nexusClient.estimateUserOperationGas({
  calls: [{
    to: '0x...',
    value: parseEther('1')
  }],
  paymaster: paymasterClient,
  paymasterContext: {
    policyId: 'abc123'
  }
})
```

## Related Methods

- [sendUserOperation](/nexus-client/methods/sendUserOperation)
- [prepareUserOperation](/nexus-client/methods/prepareUserOperation)