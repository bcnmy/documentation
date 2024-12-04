# Smart Session Policies

Smart Sessions allow you to delegate specific permissions to session keys with fine-grained control. Here are some common policy configurations and their use cases.

> **Note**: For a detailed reference of all available configuration options and their types, see the [Smart Session Types](/modules/validators/smartSessions/types) documentation. This will help you understand how different parameters map to policies and how they can be combined.

## Best Practices

1. **Principle of Least Privilege**: Always grant the minimum permissions necessary.
2. **Time Constraints**: Consider adding time range policies to limit session duration.
3. **Combine Policies**: Use multiple policies together for enhanced security.

## Security Considerations

- 🚨 Sudo policies should be used sparingly and only when necessary
- ⏰ Always include time range policies for session expiration
- 📝 Maintain clear documentation of granted permissions

## Policy Types

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
          validUntil: BigInt(Date.now() + 86400000), // 24 hours from now
          validAfter: BigInt(Date.now())
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
import { createNexusClient } from "@biconomy/sdk";
import { baseSepolia } from "viem/chains"; 

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`)
const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"; 

const nexusClient = await createNexusClient({
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
import { ActionPolicyInfo, CreateSessionDataParams, toSmartSessionsValidator, smartSessionCreateActions } from "@biconomy/sdk-canary"
import { privateKeyToAccount } from "viem/accounts";
import { createNexusClient } from "@biconomy/sdk";
import { baseSepolia } from "viem/chains"; 

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`)
const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"; 

const nexusClient = await createNexusClient({
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


### Value Limit Policy

The value limit policy allows you to set maximum transaction value limits for native token (ETH) transfers. This provides granular control over how much ETH can be spent in a single transaction or across all transactions within the session.

⚠️ **Security Consideration**: While more restrictive than sudo, ensure limits are set appropriately for your use case to minimize potential losses.

:::code-group

```ts twoslash [valueLimit.ts] filename="valueLimit.ts"
import { usersNexusClient } from "./client.ts";
import { parseEther } from "viem";

const createSessionsResponse = await usersNexusClient.grantPermission({
  sessionRequestedInfo: [
    {
      sessionPublicKey,
      // sessionValidUntil: number
      // sessionValidAfter: number
      // chainIds: bigint[]
      actionPoliciesInfo: [
        {
          abi: PaymentAbi, // Using the full contract ABI will parse it to individual function selectors under the hood
          contractAddress: "0x...",
          valueLimit: parseEther("1.0") // 1 ETH limit per transaction
        }
      ]
    }
  ]
})
```
```ts twoslash [client.ts] filename="client.ts"

import { OneOf, Address, Hex, http } from "viem"
import { ActionPolicyInfo, CreateSessionDataParams, toSmartSessionsValidator, smartSessionCreateActions } from "@biconomy/sdk-canary"
import { privateKeyToAccount } from "viem/accounts";
import { createNexusClient } from "@biconomy/sdk";
import { baseSepolia } from "viem/chains"; 

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`)
const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"; 

const nexusClient = await createNexusClient({
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

### Spending Limits Policy

The spending limits policy provides fine-grained control over ERC20 token transfers, allowing you to set both per-transaction and cumulative spending limits, as well as restrict transfers to specific addresses.

⚠️ **Security Consideration**: Always whitelist recipient addresses and set conservative token limits to protect against unauthorized transfers.

:::code-group

```ts twoslash [spendingLimits.ts] filename="spendingLimits.ts"
import { usersNexusClient } from "./client.ts";
import { parseUnits, toFunctionSelector } from "viem";
import { ParamCondition } from "@biconomy/sdk-canary";

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
          tokenLimits: [
            {
              token: USDC_ADDRESS,
              limit: parseUnits("5000", 6) // 5000 USDC total limit
            }
          ]
        }
      ]
    }
  ]
})
```
```ts twoslash [client.ts] filename="client.ts"

import { OneOf, Address, Hex, http } from "viem"
import { ActionPolicyInfo, CreateSessionDataParams, toSmartSessionsValidator, smartSessionCreateActions } from "@biconomy/sdk-canary"
import { privateKeyToAccount } from "viem/accounts";
import { createNexusClient } from "@biconomy/sdk";
import { baseSepolia } from "viem/chains"; 

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`)
const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"; 

const nexusClient = await createNexusClient({
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

