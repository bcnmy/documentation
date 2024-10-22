# Sending Gasless Transactions with Nexus SDK ⚡️

Gasless transactions enable users to interact with the blockchain without paying for gas fees. This is achieved through the use of a paymaster, which sponsors the transaction fees on behalf of the user. In this tutorial, we will guide you through the process of sending gasless transactions using the Nexus SDK.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/bcnmy/examples/tree/main/nextjs-tutorial-gasless-transaction)

::::steps

### Set up an owner account
First, we need to set up an Owner for the Smart Account which will be used to sign User Operations (transactions) for the Smart Account.

```typescript twoslash
import { privateKeyToAccount } from "viem/accounts";

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`);
```

### Set up Nexus client with paymaster
Let's configure a client for the Smart Account with a `paymasterUrl` to enable gasless transactions. A `bundlerUrl` is required to submit User Operations to the Network, which will initialize the Smart Account.

```typescript twoslash
import { createNexusClient, createBicoPaymasterClient } from "@biconomy/sdk";
import { baseSepolia } from "viem/chains"; 
import { http, parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`);

const bundlerUrl = "https://sdk-relayer.staging.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";
const paymasterUrl = "https://paymaster-signing-service-573.staging.biconomy.io/api/v2/84532/B9WAdEWiO.33d618eb-de60-43ef-93b9-7e10d6fcd692";

const nexusClient = await createNexusClient({
    signer: account,
    chain: baseSepolia,
    transport: http(),
    bundlerTransport: http(bundlerUrl),
    paymaster: createBicoPaymasterClient({paymasterUrl})
});
```

### Send gasless transaction
Next, define the transaction you want to send. Use the `sendTransaction` method to send the transaction. Since we have a paymaster configured, this transaction will be gasless.

```typescript twoslash

import { createNexusClient, createBicoPaymasterClient } from "@biconomy/sdk";
import { baseSepolia } from "viem/chains"; 
import { http, parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`);

const bundlerUrl = "https://sdk-relayer.staging.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";
const paymasterUrl = "";

const nexusClient = await createNexusClient({
    signer: account,
    chain: baseSepolia,
    transport: http(),
    bundlerTransport: http(bundlerUrl),
    paymaster: createBicoPaymasterClient({paymasterUrl})
});

const hash = await nexusClient.sendTransaction({ calls: 
    [{to : '0xf5715961C550FC497832063a98eA34673ad7C816', value: parseEther('0.0001')}] },
);
console.log("Transaction hash: ", hash)
const receipt = await nexusClient.waitForTransactionReceipt({ hash }); // [!code focus]

```

By following these steps, you have successfully sent a gasless transaction using the Nexus SDK. For more advanced features and options, refer to the official documentation.

[See sendTransaction Docs](/nexus/nexus-client/methods#sendtransaction)

Use [waitfortransactionreceipt](https://viem.sh/docs/actions/public/waitForTransactionReceipt#waitfortransactionreceipt) method to get for the transaction receipt.
