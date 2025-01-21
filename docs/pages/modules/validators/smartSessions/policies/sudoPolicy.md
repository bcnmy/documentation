### Sudo Policy

The sudo policy grants unlimited permissions for specified contract addresses and function selectors. This is the most permissive policy and should be used with caution. It can be used when you need to grant complete access to specific contract functions, similar to admin privileges.

⚠️ **Security Consideration**: This provides the highest level of access and should only be used when necessary and there is a good deal of trust in the session key grantee.

:::code-group

```ts twoslash [sudo.ts] filename="sudo.ts"
import { usersNexusClient } from "./client.ts";

const createSessionsResponse = await usersNexusClient.grantPermission({
  sessionRequestedInfo: [
    {
      sessionPublicKey,
      // sessionValidUntil: number
      // sessionValidAfter: number
      // chainIds: bigint[]
      actionPoliciesInfo: [
        {
          abi: CounterAbi, // Providing the full contract ABI will parse it to individual function selectors under the hood
          contractAddress: "0x...",
          sudo: true
        }
      ]
    }
  ]
})
```
 
```ts twoslash [client.ts] filename="client.ts"

import { OneOf, Address, Hex, http } from "viem"
import { ActionPolicyInfo, CreateSessionDataParams, toSmartSessionsValidator, smartSessionCreateActions } from "@biconomy/sdk"
import { privateKeyToAccount } from "viem/accounts";
import { createSmartAccountClient } from "@biconomy/sdk";
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

- **Emergency Response**: Grant full access to trusted parties during incidents
- **Contract Administration**: Allow comprehensive management of protocol settings
- **System Maintenance**: Enable complete access for upgrades and maintenance
- **Development Testing**: Provide unrestricted access in test environments
- **Protocol Governance**: Enable execution of governance decisions
- **Multi-sig Operations**: Grant full access to trusted multi-sig participants

## Best Practices

1. **Time-Bound Access**: Always combine with time range policies to limit exposure
2. **Strict Monitoring**: Implement comprehensive logging for all sudo operations
3. **Limited Scope**: Restrict sudo access to specific contracts rather than global access
4. **Regular Audits**: Frequently review and rotate sudo permissions
5. **Emergency Revocation**: Maintain ability to quickly revoke sudo access if compromised
6. **Documentation**: Keep detailed records of why sudo access was granted
7. **Test Environment**: Validate sudo operations in test environment first

