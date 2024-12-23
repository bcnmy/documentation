## Getting Fee Quotes from the Token Paymaster with SDK ⚡️

Users need to know the fee amount before they can send a transaction. In this tutorial, we will guide you through the process of getting a fee quote from the Token Paymaster for USDC.
We will also show how to  enforce a custom approval amount equal to the fee amount for a transaction, instead of asking the user for a max approval amount.

::::steps

### Set up an owner account
First, we need to set up an Owner for the Smart Account which will be used to sign User Operations (transactions) for the Smart Account.

```typescript twoslash
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";

const privateKey = generatePrivateKey();
const account = privateKeyToAccount(`${privateKey}`);
```

### Set up Nexus client with paymaster
Login to the [Dashboard](https://dashboard.biconomy.io/) and setup a v2 paymaster. Let's configure a client for the Smart Account with a `paymasterUrl` to enable it. A `bundlerUrl` is required to submit transactions to the Network, which will initialize the Smart Account.

```typescript twoslash
import { createNexusClient, createBicoPaymasterClient, toBiconomyTokenPaymasterContext } from "@biconomy/sdk";
import { baseSepolia } from "viem/chains"; 
import { http, parseEther } from "viem";
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";

const privateKey = generatePrivateKey();
const account = privateKeyToAccount(`${privateKey}`);

const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";
const paymasterUrl = "https://paymaster.biconomy.io/api/v2/84532/F7wyL1clz.75a64804-3e97-41fa-ba1e-33e98c2cc703"; // [!code focus:16]
const baseSepoliaUSDC = "0x036cbd53842c5426634e7929541ec2318f3dcf7e"; 

const paymasterContext = toBiconomyTokenPaymasterContext({
    feeTokenAddress: baseSepoliaUSDC
})

const nexusClient = await createNexusClient({
    signer: account,
    chain: baseSepolia,
    transport: http(),
    bundlerTransport: http(bundlerUrl),
    paymaster: createBicoPaymasterClient({paymasterUrl}),
    paymasterContext
});
```

### Calculating the USDC fee amount and enforcing a custom approval amount
Next, we will prepare the user operation that we want to send using `prepareUserOperation` and get a fee quote for USDC from the Token Paymaster using `getTokenPaymasterQuotes`.
We will use the `maxGasFee` and `decimal` from the quote to calculate the fee amount in USDC and parse it using `parseUnits`.

```typescript twoslash

import { createNexusClient, createBicoPaymasterClient, toBiconomyTokenPaymasterContext } from "@biconomy/sdk";
import { baseSepolia } from "viem/chains"; 
import { http, parseEther, parseUnits } from "viem";
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";

const privateKey = generatePrivateKey();
const account = privateKeyToAccount(`${privateKey}`);

const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";
const paymasterUrl = "https://paymaster.biconomy.io/api/v2/84532/F7wyL1clz.75a64804-3e97-41fa-ba1e-33e98c2cc703";
const baseSepoliaUSDC = "0x036cbd53842c5426634e7929541ec2318f3dcf7e";

const paymasterContext = toBiconomyTokenPaymasterContext({
    feeTokenAddress: baseSepoliaUSDC
})

const nexusClient = await createNexusClient({
    signer: account,
    chain: baseSepolia,
    transport: http(),
    bundlerTransport: http(bundlerUrl),
    paymaster: createBicoPaymasterClient({paymasterUrl}),
    paymasterContext
}); // [!code focus:7]

const userOp = await nexusClient.prepareUserOperation({
    calls: [
        {
            to: recipientAddress,
            value: 1n,
            chain: baseSepolia
        }
    ]
})
const quote = await paymaster.getTokenPaymasterQuotes({ userOp, tokenList:[baseSepoliaUSDC] })
const usdcFeeAmount = parseUnits(
    quote.feeQuotes[0].maxGasFee.toString(),
    quote.feeQuotes[0].decimal
)
```

### Sending a transaction and paying the gas with USDC
```typescript twoslash
import { createNexusClient, createBicoPaymasterClient, toBiconomyTokenPaymasterContext } from "@biconomy/sdk";
import { baseSepolia } from "viem/chains"; 
import { http, parseEther, parseUnits } from "viem";
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";

const privateKey = generatePrivateKey();
const account = privateKeyToAccount(`${privateKey}`);

const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";
const paymasterUrl = "https://paymaster.biconomy.io/api/v2/84532/F7wyL1clz.75a64804-3e97-41fa-ba1e-33e98c2cc703";
const baseSepoliaUSDC = "0x036cbd53842c5426634e7929541ec2318f3dcf7e";

const paymasterContext = toBiconomyTokenPaymasterContext({
    feeTokenAddress: baseSepoliaUSDC
})

const nexusClient = await createNexusClient({
    signer: account,
    chain: baseSepolia,
    transport: http(),
    bundlerTransport: http(bundlerUrl),
    paymaster: createBicoPaymasterClient({paymasterUrl}),
    paymasterContext
}); // [!code focus:7]

const userOp = await nexusClient.prepareUserOperation({
    calls: [
        {
            to: recipientAddress,
            value: 1n,
            data: "0x",
        }
    ]
})
const quote = await paymaster.getTokenPaymasterQuotes({ userOp, tokenList:[baseSepoliaUSDC] })
const usdcFeeAmount = parseUnits(
    quote.feeQuotes[0].maxGasFee.toString(),
    quote.feeQuotes[0].decimal
)

const userOpHash = await nexusClient.sendTokenPaymasterUserOp({
    calls: [
        {
            to: recipientAddress,
            value: 1n,
            data: "0x"
        }
    ],
    feeTokenAddress: baseSepoliaUSDC,
    customApprovalAmount: usdcFeeAmount
})
const receipt = await nexusClient.waitForUserOperationReceipt({
    hash: userOpHash
})
```

For a complete list of supported ERC20 tokens that can be used for gas payment, check out our [supported tokens documentation](/contractsAndAudits#token-paymaster-supported-tokens).

By following these steps, you have successfully calculated the USDC fee amount and enforced a custom approval amount for a transaction using the SDK. For more advanced features and options, refer to the official documentation.

[See sendTransaction Docs](/nexus-client/methods#sendtransaction)
