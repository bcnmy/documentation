# debugUserOperation

This method helps debug User Operations by providing detailed information about the operation, including packed format, RPC parameters, and optional Tenderly simulation links. Under the hood, it sends a user operation in the same way as sendUserOperation, but with additional debugging information.


## Usage

:::code-group

```typescript twoslash [example.ts]
import { nexusClient } from "./nexusClient"

// Debug a user operation
const debug = await nexusClient.debugUserOperation({
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('0.1'),
    data: '0x'
  }]
})
```

```typescript twoslash [nexusClient.ts] filename="nexusClient.ts"
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

## Parameters

The method accepts the same parameters as `sendUserOperation`, including:

- `calls` `{ data?: Hex, to: Address, value?: bigint }[]`: Array of transactions to execute
- `entryPointAddress` `Address` (optional): Override the default EntryPoint address
- All other standard User Operation parameters (gas limits, nonce, etc.)

## Response

The method provides detailed debug information in the console:
1. Packed User Operation format
2. RPC parameters sent to the bundler
3. Tenderly simulation URL (if environment variables are configured)
4. User Operation hash
5. Detailed error information if the operation fails

## Enhanced Error Handling

The debug output includes enhanced error information powered by the [aa-errors repository](https://github.com/bcnmy/aa-errors). When an error occurs, you'll receive:

- Error name and code
- Detailed description of the error
- Potential causes
- Suggested solutions

For example, if your smart account lacks funds, you might see:

```json
{
    "name": "SmartAccountInsufficientFundsError",
    "code": "aa21",
    "description": "You are not using a paymaster, and the sender address did not have enough native tokens to cover the gas costs associated with the user operation.",
    "causes": [
        "Your smart wallet does not have funds to send transaction."
    ],
    "solutions": [
        "If you are not using a paymaster, verify that the sender address has enough native tokens to cover the required prefund.",
        "Send some native tokens in your smart wallet to be able to resolve the error.",
        "If you are looking to use a paymaster to cover the gas fees, verify that the paymasterAndData field is set."
    ]
}
```

## Tenderly Integration

To enable Tenderly simulation links, set the following environment variables:
```bash
TENDERLY_API_KEY=your_api_key
TENDERLY_ACCOUNT_SLUG=your_account_slug
TENDERLY_PROJECT_SLUG=your_project_slug
```

When enabled, you'll get access to Tenderly's simulation interface:

![Tenderly simulation interface showing transaction parameters and state overrides](/tenderly-simulation.png). This is particularly useful for debugging and testing aa23 errors. 

## Related Methods

- [sendUserOperation](./sendUserOperation.md) - For production use
- [prepareUserOperation](./prepareUserOperation.md) - For preparing operations without sending 