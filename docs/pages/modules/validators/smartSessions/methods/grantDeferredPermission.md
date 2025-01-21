# Grant Permission (Deferred)

# grantDeferredPermission

This method is similar to `grantPermission`, but it allows you to create a session key with specific permissions that will only be activated on-chain at the moment they are first used. Unlike `grantPermission` which activates permissions immediately, `grantDeferredPermission` delays the on-chain activation until the exact moment the session key holder attempts to use it - providing a "just in time" permission grant.

## Key Benefits
- **Gas Efficiency**: No gas is spent until the permission is actually needed
- **Just-in-Time Activation**: Permissions are only activated on-chain when first used
- **Flexible Deployment**: Create session keys in advance without immediate blockchain costs

For example, you could create a session key for a future NFT mint, but the actual permission won't be registered on-chain until the user attempts to use it during the mint.

### Usage

:::code-group

```typescript twoslash [example.ts]
import { usersNexusClient } from "./client"
import { smartSessionCreateActions } from "@biconomy/sdk"

const moduleData = await nexusSessionClient.grantDeferredPermission({
  sessionRequestedInfo: [
    {
      sessionPublicKey, // Public key of the session
      // sessionValidUntil: number
      // sessionValidAfter: number
      // chainIds: bigint[]
      actionPoliciesInfo: [
        {
          abi: CounterAbi,
          contractAddress: testAddresses.Counter
          // validUntil?: number
          // validAfter?: number
          // valueLimit?: bigint
        }
      ]
    }
  ]
})

const sessionData = {
  granter: nexusClient.account.address,
  sessionPublicKey,
  description: `Permission to increment a counter for ${testAddresses.Counter}`,
  moduleData
}

// Zip the session data, and store it for later use by a dapp
const stringifiedSessionDatum = stringify(sessionData)

// Later the dapp wants to use the session, it can use the stringified session data to use the permission
```

```ts twoslash [client.ts] filename="client.ts"
import { OneOf, Address, Hex, http } from "viem"
import { privateKeyToAccount } from "viem/accounts";
import { createSmartAccountClient, ActionPolicyInfo, CreateSessionDataParams, toSmartSessionsValidator, smartSessionCreateActions } from "@biconomy/sdk";
import { baseSepolia } from "viem/chains"; 

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`)
const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"; 

const nexusClient = await createSmartAccountClient({
  signer: account, 
  chain: baseSepolia,
  transport: http(), 
  bundlerTransport: http(bundlerUrl), 
})

// ---cut---
const sessionsModule = toSmartSessionsValidator({
  account: nexusClient.account,
  signer: account
})

// Install the smart sessions module on the Nexus client's smart contract account
const hash = await nexusClient.installModule({
  module: sessionsModule.moduleInitData
})

const { success } = await nexusClient.waitForUserOperationReceipt({ hash })

// Extend the Nexus client with smart session creation actions
export const usersNexusClient = nexusClient.extend(
  smartSessionCreateActions(sessionsModule)
)
```

:::

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sessionPublicKey` | `Address` | Yes | The public key that will be authorized to use this session |
| `sessionValidUntil` | `number` | No | Timestamp when the session expires |
| `sessionValidAfter` | `number` | No | Timestamp when the session becomes valid |
| `chainIds` | `bigint[]` | No | Array of chain IDs where the session is valid |
| `actionPoliciesInfo` | `Array` | Yes | Contract permissions |

### Action Policies Info Structure

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `abi` | `Abi` | Yes | Contract ABI |
| `contractAddress` | `Address` | Yes | Contract address |
| `validUntil` | `number` | No | Timestamp when the permission expires |
| `validAfter` | `number` | No | Timestamp when the permission becomes valid |
| `valueLimit` | `bigint` | No | Maximum value that can be transferred |

## Response

Returns a `SessionData["moduleData"]` object containing:

| Field | Type | Description |
|-------|------|-------------|
| `permissionIds` | `string[]` | IDs of the granted permissions |
| `action` | `object` | Action configuration |
| `mode` | `SmartSessionMode` | Session mode (typically UNSAFE_ENABLE) |
| `sessions` | `Session[]` | Array of session configurations |
| `enableSessionData` | `object` | Session enablement data |