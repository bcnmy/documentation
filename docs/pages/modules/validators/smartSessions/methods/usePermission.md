# Use Permission

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

### Parameters

- `calls`: Array of transaction calls to execute
  - `to`: `Address` - Target contract address
  - `data`: `Hex` - Encoded function call data
  - `value?`: `bigint` - Optional ETH value to send with the call

### Response

Returns a promise that resolves to a user operation hash. This hash can be used with `waitForUserOperationReceipt` to track the transaction status.