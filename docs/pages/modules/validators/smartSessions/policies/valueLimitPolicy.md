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

## Common Use Cases

- **DeFi Operations**: Limit maximum trade sizes or liquidity provisions
- **Recurring Payments**: Cap periodic payment amounts
- **Treasury Management**: Control spending limits for organizational funds
- **Gas Fee Management**: Set upper bounds for transaction fees
- **Automated Trading**: Implement safety limits for trading bots
- **Subscription Services**: Cap maximum payment amounts for subscriptions

## Best Practices

1. **Conservative Limits**: Start with lower limits and adjust based on usage patterns
2. **Multiple Tiers**: Implement different limits for different operation types
3. **Cumulative Tracking**: Consider both per-transaction and total session limits
4. **Market Volatility**: Account for potential price fluctuations when setting limits
5. **Regular Reviews**: Periodically assess and adjust limits based on needs
6. **Emergency Stops**: Include mechanisms to pause operations if unusual patterns detected
7. **Combine with Time Limits**: Use time-based restrictions to further control exposure