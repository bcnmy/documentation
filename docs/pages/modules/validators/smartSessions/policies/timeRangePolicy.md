### Time Range Policy

The time range policy allows you to set temporal boundaries for session key permissions. This ensures that session keys can only be used within specific time windows, providing an additional layer of security through time-based access control.

⚠️ **Security Consideration**: Always set reasonable time bounds and consider your application's specific needs when determining session validity periods.

:::code-group

```ts twoslash [timeRange.ts] filename="timeRange.ts"
import { usersNexusClient } from "./client.ts";

const createSessionsResponse = await usersNexusClient.grantPermission({
  sessionRequestedInfo: [
    {
      sessionPublicKey,
      sessionValidAfter: 0, // Applies to all userOperations
      sessionValidUntil: Date.now() + (365 * 24 * 60 * 60 * 1000), // 1 year from now, applies to all userOperations
      actionPoliciesInfo: [
        {
          abi: DailyTaskAbi,
          contractAddress: "0x...",
          // Session valid for 7 days starting tomorrow
          validAfter: Date.now() + (1 * 24 * 60 * 60 * 1000), // Starts tomorrow
          validUntil: Date.now() + (7 * 24 * 60 * 60 * 1000), // Ends after 7 days
        }
      ]
    }
  ]
});
```

```ts twoslash [client.ts] filename="client.ts"
// @errors: 8010
import { Address, Hex, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { createSmartAccountClient, ActionPolicyInfo, CreateSessionDataParams, toSmartSessionsValidator, smartSessionCreateActions  } from "@biconomy/sdk";
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

## Common Use Cases

- **Business Hours Access**: Restrict session usage to working hours
- **Time-Limited Trials**: Grant temporary access for evaluation periods
- **Scheduled Maintenance**: Allow access only during maintenance windows
- **Periodic Tasks**: Enable automated actions at specific times

## Best Practices

1. Always set both `validAfter` and `validUntil` for bounded session lifetimes
2. Use daily time windows for recurring access patterns
3. Combine with other policies for comprehensive security
4. Consider timezone implications when setting time bounds
