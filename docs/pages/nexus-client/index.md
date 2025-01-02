# Nexus client

The Nexus Client is an interface for interacting with Nexus smart accounts. It allows account creation, execution of transactions, and management of account modules (validation and execution). 

## Usage

```typescript twoslash
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
## Parameters

### module (optional)

Type: `ToValidationModuleReturnType`

Default: `k1ValidatorModule`

Possible values: k1ValidatorModule, ownableValidatorModule 

The active validation module that governs how transactions from this smart account are validated (e.g., signature schemes, permissions). For information on setting an active module, refer to the account section.


### bundlerTransport

Type: `transport`

This parameter specifies the transport for the Bundler Client. You can use the provided testnet URL in the example above or contact us for the mainnet URL.

### chain (optional)
Type: `Chain`

The blockchain network (chain) for the client. It defines the specific network (e.g., Sepolia, Ethereum) the smart account will interact with.

### factoryAddress (optional)

Type: `Address`

Default: `0x887Ca6FaFD62737D0E79A2b8Da41f0B15A864778`

This parameter specifies the address of the smart account factory contract, which is responsible for creating new smart accounts. By default, it uses the standard factory address, but you can also provide a custom factory address.

```typescript twoslash
import { baseSepolia } from "viem/chains"; 
import { http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { createSmartAccountClient } from "@biconomy/sdk"; // [!code focus] 

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`);
const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";

const nexusClient = await createSmartAccountClient({
    signer: account,
    chain: baseSepolia,
    transport: http(),
    bundlerTransport: http(bundlerUrl),
    factoryAddress: "0x887Ca6FaFD62737D0E79A2b8Da41f0B15A864778" // [!code focus] 
});
```

### signer 

Type: `UnknownHolder`

The owner of the smart account, represented by an Account object, which holds the private key and serves as the controller for the smart account actions.


### index (optional)

Type: `bigint`

The index of the smart account being created. By default, the first smart account is created with an index of 0. If multiple smart accounts are needed, you can specify the index here.


```typescript twoslash
import { baseSepolia } from "viem/chains"; 
import { http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { createSmartAccountClient } from "@biconomy/sdk"; // [!code focus] 

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`);
const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";

const nexusClient = await createSmartAccountClient({
    signer: account,
    chain: baseSepolia,
    transport: http(),
    bundlerTransport: http(bundlerUrl),
    index: 1n // [!code focus] 
});

```


### paymaster (optional)

Type: `BicoPaymasterClient`

The optional paymaster responsible for sponsoring transaction fees on behalf of the smart account owner, enabling gasless transactions.


```typescript twoslash
import { baseSepolia } from "viem/chains"; 
import { http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { createSmartAccountClient, createBicoPaymasterClient } from "@biconomy/sdk"; // [!code focus] 

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`);
const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";

const paymasterUrl = "";  // [!code focus] 
const nexusClient = await createSmartAccountClient({
    signer: account,
    chain: baseSepolia,
    transport: http(),
    bundlerTransport: http(bundlerUrl),
    paymaster: createBicoPaymasterClient({paymasterUrl}) // [!code focus] 
});

```


### paymasterContext (optional)
Type: `unknown`

Default: 

```typescript
const biconomyPaymasterContext = {
  mode: "SPONSORED",
  expiryDuration: 300,
  calculateGasLimits: true,
  sponsorshipInfo: {
    smartAccountInfo: {
      name: "BICONOMY",
      version: "2.0.0"
    }
  }
}
```

Paymaster context is an object containing additional metadata required to pass to `getPaymasterData` and `getPaymasterStubData` calls.

The Biconomy Paymaster context is automatically set as the default. If you're using other paymasters that require context, you can specify it using this field.

### pollingInterval (optional)

Type: `number`

Default: `4_000` (4 seconds)

This parameter specifies the frequency in milliseconds for polling enabled actions and events within the Nexus client. This includes tasks such as fetching the transaction receipt, which is essential for tracking the status of transactions. By adjusting this value, you can control how often the client checks for updates. 
A reduced interval can be beneficial for chains that produce blocks more rapidly.


### transport

Type: `transport`

This parameter defines the RPC URL to use. It is advisable to use a paid RPC URL to prevent errors.

### userOperation (optional)

This optional configuration enables the customization of a specific user operation within the Nexus client, encapsulating a transaction flow within the smart account system. It allows for the modification of function calls to accommodate unique use cases as required.

For example, to modify the maxFeePerGas and maxPriorityFeePerGas, you can obtain these fees and apply a multiplier as shown in the example below.

:::code-group

```typescript twoslash [example.ts]
import { baseSepolia } from "viem/chains"; 
import { http } from "viem";
import { createSmartAccountClient } from "@biconomy/sdk"; // [!code focus] 
import { publicClient } from "./publicClient";
import { safeMultiplier } from "./utils";

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`);
const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";

const nexusClient = await createSmartAccountClient({
    signer: account,
    chain: baseSepolia,
    transport: http(),
    bundlerTransport: http(bundlerUrl),
    userOperation: { // [!code focus:9] 
        estimateFeesPerGas: async (_) => { 
          const feeData = await publicClient.estimateFeesPerGas()
          return {
            maxFeePerGas: safeMultiplier( feeData.maxFeePerGas, 1.25),
            maxPriorityFeePerGas: safeMultiplier( feeData.maxPriorityFeePerGas, 1.25)
          }
        }
    } 
});

```

```typescript twoslash [publicClient.ts] filename="publicClient.ts"
import { http, createPublicClient } from "viem";
import { baseSepolia } from "viem/chains"; 
export const publicClient = createPublicClient({chain: baseSepolia, transport: http()}); 

```

```typescript twoslash [utils.ts] filename="utils.ts"
export const safeMultiplier = (bI: bigint, multiplier: number): bigint =>
  BigInt(Math.round(Number(bI) * multiplier))

```

:::

## Response
- `Promise<NexusClient>` : Nexus client

The Nexus client provides extensive information about the nexus smart account.
