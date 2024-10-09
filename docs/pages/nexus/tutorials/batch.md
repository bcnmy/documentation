# Sending Batch Transactions with Nexus SDK ⚡️

Account abstraction enables the bundling of multiple transactions into a single transaction. This can be useful in various scenarios, such as executing multiple trades at once on a decentralized exchange or making batch payments. For instance, you can deploy an NFT contract, mint an NFT, and transfer it, all with a single user action and transaction.

We have created a quick start [template](https://github.com/bcnmy/examples/tree/main/quickstart) repository that you can use to get started. It comes set up with TypeScript, `viem`, and `@biconomy/sdk`.

::::steps

### 1. Set up an owner account
First, we need to set up an Owner for the Smart Account which will be used to sign User Operations (transactions) for the Smart Account.

```typescript twoslash
import { privateKeyToAccount } from "viem/accounts";

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`);
```

### 2. Set up Nexus client

A Smart Account needs access to the Network to query for information about its state (e.g., nonce, address, etc.). Let's configure a client for the Smart Account. A `bundlerUrl` is required to submit User Operations to the Network, which will initialize the Smart Account.

```typescript twoslash
import { createNexusClient } from "@biconomy/sdk-canary";
import { baseSepolia } from "viem/chains"; 
import { http } from "viem"; 
import { privateKeyToAccount } from "viem/accounts";

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`);

const bundlerUrl = "https://sdk-relayer.staging.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"; // [!code focus:10]

const nexusClient = await createNexusClient({ 
    signer: account, 
    chain: baseSepolia, 
    transport: http(), 
    bundlerTransport: http(bundlerUrl), 
});
```

### 3. Send batch transactions

Next, define the transactions you want to send in a batch. Each transaction should specify the necessary parameters. Use the `sendTransaction` method to send the batch of transactions.

```typescript twoslash
import { createNexusClient } from "@biconomy/sdk-canary";
import { baseSepolia } from "viem/chains"; 
import { http, parseEther } from "viem"; 
import { privateKeyToAccount } from "viem/accounts";

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`);

const bundlerUrl = "https://sdk-relayer.staging.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"; 

const nexusClient = await createNexusClient({ 
    signer: account, 
    chain: baseSepolia, 
    transport: http(), 
    bundlerTransport: http(bundlerUrl), 
});

const hash = await nexusClient.sendTransaction({ // [!code focus:11]
    calls: [ 
        {
            to: '0xf5715961C550FC497832063a98eA34673ad7C816', 
            value: parseEther('0.0001'), 
        },
        {
            to: '0xf5715961C550FC497832063a98eA34673ad7C816',
            value: parseEther('0.0002'), 
        },
    ], 
}); 
```
::::


You have successfully sent batch transactions using the Nexus SDK. For more advanced features and options, refer to the official documentation.

[See sendTransaction Docs](/nexus/nexus-client/methods#sendtransaction)

Use [waitfortransactionreceipt](https://viem.sh/docs/actions/public/waitForTransactionReceipt#waitfortransactionreceipt) method to get for the transaction receipt.

