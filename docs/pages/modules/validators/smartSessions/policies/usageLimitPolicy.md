### Usage Limit Policy

The usage limit policy allows you to restrict how many times a session key can be used. This provides a simple but effective way to limit the total number of operations a session can perform, regardless of the operation type.

⚠️ **Security Consideration**: Set conservative usage limits based on expected legitimate usage patterns to minimize potential abuse.

:::code-group

```ts twoslash [usageLimit.ts] filename="usageLimit.ts"
import { usersNexusClient } from "./client.ts";
import { parseEther } from "viem";

const createSessionsResponse = await usersNexusClient.grantPermission({
  sessionRequestedInfo: [
    {
      sessionPublicKey,
      actionPoliciesInfo: [
        {
          contractAddress: "0x123",
          functionSelector: "0x456",
          // Limit total usage to 100 transactions
          usageLimit: BigInt(100),
          // Optional: Combine with other policies
          validUntil: BigInt(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        }
      ]
    }
  ]
});
```

```ts twoslash [client.ts] filename="client.ts"
// @filename: types.d.ts
declare module "@biconomy/sdk-canary" {
  export function toSmartSessionsValidator(config: any): any;
  export function smartSessionCreateActions(module: any): any;
}

import { OneOf, Address, Hex, http } from "viem"
import { ActionPolicyInfo, CreateSessionDataParams, toSmartSessionsValidator, smartSessionCreateActions, createSmartAccountClient } from "@biconomy/sdk-canary"
import { privateKeyToAccount } from "viem/accounts";
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

- **Limited Trial Access**: Grant a fixed number of operations for evaluation purposes
- **Batch Operations**: Allow a specific number of automated transactions
- **Risk Management**: Cap total possible operations for security
- **Resource Control**: Limit API or service usage through smart contract calls

## Best Practices

1. **Set Reasonable Limits**: Choose usage limits that balance functionality with security
2. **Combine with Time Bounds**: Add time restrictions to prevent rapid consumption of usage quota
3. **Monitor Usage**: Track usage patterns to adjust limits appropriately
4. **Consider Operation Types**: Set different limits for different function calls based on risk 