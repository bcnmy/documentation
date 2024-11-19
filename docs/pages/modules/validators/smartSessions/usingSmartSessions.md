# Using Smart Sessions Actions

> **Important**: The smartSessionValidation module must be the active nexus module for using smart sessions. This is automatically handled when you extend your client with `smartSessionUseActions`.

Once a session has been created, you can use it to execute transactions on behalf of the account that granted the permissions. The Smart Sessions module provides the `usePermission` action through `smartSessionUseActions`.

## usePermission

Executes a transaction using the granted session permissions.

### Usage

:::code-group

```typescript twoslash [example.ts]
import { nexusClient } from "./nexusClient"
import { smartSessionUseActions } from "@biconomy/sdk"
import { encodeFunctionData } from "viem"

// Initialize the module for using permissions
const usePermissionsModule = toSmartSessionsValidator({
  account: nexusClient.account,
  signer: sessionKey, // The session key granted permission
  moduleData: sessionData.moduleData // This is the module data returned from the createSessions step
});

// Extend the client with session usage capabilities
const sessionClient = nexusClient
  .extend(smartSessionUseActions(usePermissionsModule));

// Use the session to make a transaction
const userOpHash = await sessionClient.usePermission({
  calls: [{
    to: targetContract,
    data: encodeFunctionData({
      abi: contractABI,
      functionName: "transfer",
      args: [recipientAddress, amount]
    })
  }]
});

// Wait for the transaction to be mined
const receipt = await sessionClient.waitForUserOperationReceipt({ hash: userOpHash });
```

```typescript twoslash [nexusClient.ts] filename="nexusClient.ts"
import { privateKeyToAccount } from "viem/accounts";
import { createNexusClient } from "@biconomy/sdk";
import { baseSepolia } from "viem/chains"; 
import { http } from "viem"; 

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`)
const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"; 

export const nexusClient = await createNexusClient({ 
    signer: account, 
    chain: baseSepolia,
    transport: http(), 
    bundlerTransport: http(bundlerUrl), 
});
```

:::

### Parameters

- `calls`: Array of transaction calls to execute
  - `to`: `Address` - Target contract address
  - `data`: `Hex` - Encoded function call data
  - `value?`: `bigint` - Optional ETH value to send with the call

### Response

Returns a promise that resolves to a user operation hash. This hash can be used with `waitForUserOperationReceipt` to track the transaction status.

## useDistributedPermission

[After generating distributed key shares with DAN (see [Key Generation](/nexus-client/dan/methods#keygen)), you can use them to execute transactions through the smart session. This is done using the `useDistributedPermission` action.]

### Usage

:::code-group

```typescript twoslash [example.ts]
import { nexusClient } from "./nexusClient"
import { danActions, smartSessionUseActions } from "@biconomy/sdk"
import { parseEther } from "viem"

// Initialize the module for using permissions. The moduleData includes the keyGenData
const usePermissionsModule = toSmartSessionsValidator({
  account: nexusClient.account,
  signer: dappAccount,
  moduleData // This includes the keyGenData
})

// Extend client with DAN + SS actions
  const danSessionClient = nexusClient
    .extend(danActions())
    .extend(smartSessionUseActions(usePermissionsModule))

// Execute a transaction using distributed permissions
const userOpHash = await danNexusClient.useDistributedPermission({
  calls: [
    {
      to: "0x1234...",
      value: parseEther("0.1"),
      data: "0x..."
    }
  ],
  maxFeePerGas: 1000000000n
});

// Wait for the transaction to be mined
const receipt = await danNexusClient.waitForUserOperationReceipt({ 
  hash: userOpHash 
});
```

```typescript twoslash [nexusClient.ts]
import { privateKeyToAccount } from "viem/accounts";
import { createNexusClient } from "@biconomy/sdk";
import { baseSepolia } from "viem/chains"; 
import { http } from "viem"; 

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`)
const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"; 

export const nexusClient = await createNexusClient({ 
    signer: account, 
    chain: baseSepolia,
    transport: http(), 
    bundlerTransport: http(bundlerUrl), 
});
```

:::

### Parameters

```typescript
type UseDistributedPermissionParameters = {
  /** Array of executions to perform in the session. 
      Allows for batch transactions if the session is enabled for multiple actions. */
  calls: Array<{
    /** Target address for the transaction */
    to: `0x${string}`
    /** Transaction value in wei */
    value?: bigint
    /** Optional call data for the transaction */
    data?: `0x${string}`
  }>
  /** The maximum fee per gas unit the transaction is willing to pay */
  maxFeePerGas?: bigint
  /** The maximum priority fee per gas unit the transaction is willing to pay */
  maxPriorityFeePerGas?: bigint
  /** The nonce of the transaction. If not provided, it will be determined automatically */
  nonce?: bigint
  /** The modular smart account to use for the session. 
      If not provided, the client's account will be used */
  account?: ModularSmartAccount
  /** The signer to use for the session. Defaults to the signer of the client */
  signer?: Signer
}
```

### Response

Returns a promise that resolves to the hash of the sent user operation (`0x${string}`).
