# Nexus client

The Nexus Client is an interface for interacting with Nexus smart accounts. It allows account creation, execution of transactions, and management of account modules (validation and execution). 

## Usage

```typescript twoslash
import { privateKeyToAccount } from "viem/accounts";
import { createNexusClient } from "@biconomy/sdk";
import { baseSepolia } from "viem/chains"; 
import { http } from "viem"; 

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`)
const bundlerUrl = "https://sdk-relayer.staging.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"; 

const nexusClient = await createNexusClient({
  signer: account, 
  chain: baseSepolia,
  transport: http(), 
  bundlerTransport: http(bundlerUrl), 
})
```
## Parameters

### account (optional)

The Account to use for the Client. This will be used for Actions that require an account as an argument.

### activeModule (optional)

Type `BaseValidationModule`

The active validation module that governs how transactions from this smart account are validated (e.g., signature schemes, permissions).

### bundlerTransport

Type: `transport`

The transport of the Bundler Client.

### cacheTime (optional)

Type: `number`
Time (in ms) that cached data will remain in memory.
Default: `4_000`

### chain (optional)
Type: `Chain`

The blockchain network (chain) for the client. It defines the specific network (e.g., Sepolia, Ethereum) the smart account will interact with.

### client (optional)

Type: `Client`
Client that points to an Execution RPC URL.


### executorModule (optional)

Type `BaseExecutionModule`

The execution module that defines how transactions are executed, allowing for customization of execution flows and smart account behavior.

### factoryAddress (optional)

Type: `Address`

The address of the smart account factory contract, responsible for creating new smart accounts.

```typescript twoslash
import { baseSepolia } from "viem/chains"; 
import { http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { createNexusClient } from "@biconomy/sdk"; // [!code focus] 

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`);
const bundlerUrl = "https://sdk-relayer.staging.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";

const nexusClient = await createNexusClient({
    signer: account,
    chain: baseSepolia,
    transport: http(),
    bundlerTransport: http(bundlerUrl),
    factoryAddress: "0xabc...." // [!code focus] 
});
```

### signer 
Type: `UnknownHolder`

The owner of the smart account, represented by an Account object, which holds the private key and serves as the controller for the smart account actions.

### index (optional)
The index of the smart account being created. By default, the first smart account is created with an index of 0. If multiple smart accounts are needed, you can specify the index here.

**Type** `bigint`

```typescript twoslash
import { baseSepolia } from "viem/chains"; 
import { http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { createNexusClient } from "@biconomy/sdk"; // [!code focus] 

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`);
const bundlerUrl = "https://sdk-relayer.staging.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";

const nexusClient = await createNexusClient({
    signer: account,
    chain: baseSepolia,
    transport: http(),
    bundlerTransport: http(bundlerUrl),
    index: 1n // [!code focus] 
});

```

### k1ValidatorAddress (optional)

Type: `Address`

The address of the key (k1) validator, which ensures the owner module’s validation during transactions.


### key (optional)
Type: `string`
A key for the client.


### name (optional)
Type: `string`
A name for the client.


### paymaster (optional)

The optional paymaster responsible for sponsoring transaction fees on behalf of the smart account owner, enabling gasless transactions.

Type: `BicoPaymasterClient`

```typescript twoslash
import { baseSepolia } from "viem/chains"; 
import { http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { createNexusClient, createBicoPaymasterClient } from "@biconomy/sdk"; // [!code focus] 

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`);
const bundlerUrl = "https://sdk-relayer.staging.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";

const paymasterUrl = "";  // [!code focus] 
const nexusClient = await createNexusClient({
    signer: account,
    chain: baseSepolia,
    transport: http(),
    bundlerTransport: http(bundlerUrl),
    paymaster: createBicoPaymasterClient({paymasterUrl}) // [!code focus] 
});

```


### paymasterContext (optional)
Type: `unknown`

Paymaster context is an object containing additional metadata required to pass to `getPaymasterData` and `getPaymasterStubData` calls.


### pollingInterval (optional)

Type: `number`
Frequency (in ms) for polling enabled actions & events.
Default: `4_000`


### rpcSchema (optional)

Typed JSON-RPC schema for the client.


### transport
Type: `transport`

The RPC transport.


### userOperation (optional)

An optional configuration that allows you to define and customize a specific user operation within the Nexus client, representing a transaction flow in the smart account system.


## Response
- `Promise<NexusClient>` : Nexus client


