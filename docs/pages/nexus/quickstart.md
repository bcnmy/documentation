

## Installation

:::code-group
 
```bash [npm]
npm i @biconomy/sdk viem @rhinestone/module-sdk
```
 
```bash [pnpm]
pnpm i @biconomy/sdk viem @rhinestone/module-sdk
```
 
```bash [bun]
bun i @biconomy/sdk viem @rhinestone/module-sdk
```
 
:::

We have created a quick start [template](https://github.com/bcnmy/examples/tree/main/nextjs-quickstart) repository that you can use to get started. It comes set up with Typescript, `viem`, and `@biconomy/sdk`.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/bcnmy/examples/tree/main/nextjs-quickstart)

## Sending your first User Operation with Nexus SDK ⚡️

::::steps

### 1. Set up an owner account
First, we need to set up an Owner for the Smart Account which will be used to sign User Operations (transactions) for the Smart Account.

```typescript twoslash
import { privateKeyToAccount } from "viem/accounts";

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`)
```

### 2. Set up nexus client

A Smart Account needs access to the Network to query for information about its state (e.g. nonce, address, etc). Let's configure a client for the Smart Account.
A `bundlerUrl` is required to submit User Operations to the Network, which will initialize the Smart Account.

```typescript twoslash
import { privateKeyToAccount } from "viem/accounts";
import { createNexusClient } from "@biconomy/sdk"; // [!code focus]
import { baseSepolia } from "viem/chains"; // [!code focus]
import { http, parseEther } from "viem"; // [!code focus]

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`)
const bundlerUrl = "https://sdk-relayer.staging.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"; // [!code focus]

const nexusClient = await createNexusClient({ // [!code focus]
    signer: account, // [!code focus]
    chain: baseSepolia, // [!code focus]
    transport: http(), // [!code focus]
    bundlerTransport: http(bundlerUrl), // [!code focus]
});
const smartAccountAddress = await nexusClient.account.address; // [!code focus]
```

[See createNexusClient Docs](/nexus/nexus-client)

### 3. Send User Operation

Next, we'll send a User Operation to the Bundler. In the example below, 0.001 ETH will be transferred from the smart account to a random address. After sending the transaction, we'll use the `waitForTransactionReceipt` function to wait for the transaction to be mined and get its receipt. This function takes the transaction hash as a parameter and returns a promise that resolves to the transaction receipt once the transaction is confirmed on the blockchain.

:::tip
Ensure your smart account has sufficient funds to execute the transaction below. If not, please transfer funds to the `smartAccountAddress`
:::

```typescript twoslash
import { privateKeyToAccount } from "viem/accounts";
import { createNexusClient } from "@biconomy/sdk";
import { baseSepolia } from "viem/chains"; 
import { http, parseEther } from "viem"; 

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`)
const bundlerUrl = "https://sdk-relayer.staging.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"; 

const nexusClient = await createNexusClient({ 
    signer: account, 
    chain: baseSepolia,
    transport: http(), 
    bundlerTransport: http(bundlerUrl), 
});

const smartAccountAddress = await nexusClient.account.address; 
const hash = await nexusClient.sendTransaction({ // [!code focus]
  calls: [ // [!code focus]
    { // [!code focus]
      to: '0xf5715961C550FC497832063a98eA34673ad7C816', // [!code focus]
      value: parseEther('0.0001'), // [!code focus]
    }, // [!code focus]
  ], // [!code focus]
}); // [!code focus]
const receipt = await nexusClient.waitForTransactionReceipt({ hash }); // [!code focus]
```

You can now view the transaction on the Base Sepolia explorer. By submitting this user operation, you've:

- Deployed the counterfactual smart account contract.
- Executed a simple transaction using smart accounts.


[See sendTransaction Docs](/nexus/nexus-client/methods#sendtransaction)

### 4. Optional: Sponsor User Operation

By using a Paymaster, we can add sponsorship of gas fees. Checkout [sponsoring user operations](/nexus/tutorials/gasless) for more information.
