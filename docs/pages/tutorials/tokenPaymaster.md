## Paying Gas in ERC20 Tokens with SDK ⚡️

ERC20 tokens can be used to pay for gas fees. This is achieved through the use of a token paymaster. In this tutorial, we will guide you through the process of sending a user operation using an ERC20 token as the gas payment method.

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
import { createSmartAccountClient, createBicoPaymasterClient, toBiconomyTokenPaymasterContext } from "@biconomy/sdk";
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

const nexusClient = await createSmartAccountClient({
    signer: account,
    chain: baseSepolia,
    transport: http(),
    bundlerTransport: http(bundlerUrl),
    paymaster: createBicoPaymasterClient({paymasterUrl}),
    paymasterContext
});
```

### Sending a transaction and paying the gas with USDC
Next, define the transaction you want to send. Use the `sendTokenPaymasterUserOp` method to send the user operation using the Token Paymaster.

```typescript twoslash

import { createSmartAccountClient, createBicoPaymasterClient, toBiconomyTokenPaymasterContext } from "@biconomy/sdk";
import { baseSepolia } from "viem/chains"; 
import { http, parseEther } from "viem";
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";

const privateKey = generatePrivateKey();
const account = privateKeyToAccount(`${privateKey}`);

const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";
const paymasterUrl = "https://paymaster.biconomy.io/api/v2/84532/F7wyL1clz.75a64804-3e97-41fa-ba1e-33e98c2cc703";
const baseSepoliaUSDC = "0x036cbd53842c5426634e7929541ec2318f3dcf7e";
const recipientAddress = "0x0000000000000000000000000000000000000000";

const paymasterContext = toBiconomyTokenPaymasterContext({
    feeTokenAddress: baseSepoliaUSDC
})

const nexusClient = await createSmartAccountClient({
    signer: account,
    chain: baseSepolia,
    transport: http(),
    bundlerTransport: http(bundlerUrl),
    paymaster: createBicoPaymasterClient({paymasterUrl}),
    paymasterContext
}); // [!code focus:7]

const userOpHash = await nexusClient.sendTokenPaymasterUserOp({
    calls: [
        {
            to: recipientAddress,
            value: 1n,
            data: "0x"
        }
    ],
    feeTokenAddress: baseSepoliaUSDC
})

const receipt = await nexusClient.waitForUserOperationReceipt({ hash: userOpHash })
```

For a complete list of supported ERC20 tokens that can be used for gas payment, check out our [supported tokens documentation](/contractsAndAudits#token-paymaster-supported-tokens).

By following these steps, you have successfully sent a transaction and paid the gas with USDC token using the SDK. For more advanced features and options, refer to the official documentation.

[See sendTransaction Docs](/nexus-client/methods#sendtransaction)
