### Universal Action Policy

The universal action policy allows for controlled access to specific contract functions with optional parameter-based rules. Below is an example that restricts a function call to a specific parameter value.

⚠️ **Security Consideration**: Always set appropriate time bounds and carefully consider which contract functions to expose.

:::code-group

```ts twoslash [universalAction.ts] filename="universalAction.ts"
import { usersNexusClient } from "./client.ts";
import { parseUnits, toFunctionSelector } from "viem";

const createSessionsResponse = await usersNexusClient.grantPermission({
  sessionRequestedInfo: [
    {
      sessionPublicKey,
      actionPoliciesInfo: [
        {
          functionSelector: toFunctionSelector("transfer(address,uint256)"),
          contractAddress: USDC_ADDRESS,
          rules: [
            {
              condition: ParamCondition.EQUAL,
              offsetIndex: 0, // recipient parameter
              isLimited: false,
              ref: WHITELISTED_ADDRESS
            },
            {
              condition: ParamCondition.LESS_THAN,
              offsetIndex: 1, // amount parameter
              isLimited: true,
              ref: parseUnits("1000", 6), // 1000 USDC per tx
              usage: {
                limit: parseUnits("5000", 6), // 5000 USDC total
                used: 0n
              }
            }
          ],
        }
      ]
    }
  ]
});
```
```ts twoslash [client.ts] filename="client.ts"
import { OneOf, Address, Hex, http } from "viem"
import { ActionPolicyInfo, CreateSessionDataParams, toSmartSessionsValidator, smartSessionCreateActions } from "@biconomy/sdk-canary"
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

- **Token Allowances**: Set maximum spending limits for ERC20 tokens
- **Whitelisted Transfers**: Restrict transfers to approved addresses only
- **Budget Management**: Implement departmental spending controls
- **DeFi Risk Management**: Limit exposure in DeFi protocols
- **Automated Payments**: Control recurring token payments
- **Treasury Operations**: Manage organizational token distributions

## Best Practices

1. **Whitelist Recipients**: Always specify allowed recipient addresses
2. **Dual Limits**: Implement both per-transaction and cumulative limits
3. **Token Decimals**: Carefully account for token decimal places when setting limits
4. **Usage Tracking**: Monitor cumulative usage against total limits
5. **Multiple Tokens**: Set appropriate limits for each token type
6. **Regular Reviews**: Periodically audit spending patterns and adjust limits
7. **Combine Policies**: Use with time-based restrictions for enhanced security