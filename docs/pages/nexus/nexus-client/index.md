# Nexus client

The Nexus Client is an interface for interacting with Nexus smart accounts. It allows seamless management of smart accounts, enabling account creation, execution of transactions, and management of account modules (validation and execution). 

## Usage

```typescript twoslash
import { privateKeyToAccount } from "viem/accounts";
import { createNexusClient } from "@biconomy/sdk-canary";
import { baseSepolia } from "viem/chains"; 
import { http } from "viem"; 

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`)
const bundlerUrl = "https://sdk-relayer.staging.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"; 

const nexusClient = await createNexusClient({
  holder: account, 
  chain: baseSepolia,
  transport: http(), 
  bundlerTransport: http(bundlerUrl), 
})
```
## Parameters

### chain 
Type: `Chain`

The blockchain network (chain) for the client. It defines the specific network (e.g., Sepolia, Ethereum) the smart account will interact with.

### transport
Type: `transport`

The RPC transport.


### bundlerTransport

Type: `transport`

The transport of the Bundler Client.

### client (optional)

### paymaster (optional)

The optional paymaster responsible for sponsoring transaction fees on behalf of the smart account owner, enabling gasless transactions.

### paymasterContext (optional)

An optional context object containing additional data or metadata required by the paymaster for fee sponsorship operations.


### userOperation (optional)

An optional configuration that allows you to define and customize a specific user operation within the Nexus client, representing a transaction flow in the smart account system.


### holder 

The owner of the smart account, represented by an Account object, which holds the private key and serves as the controller for the smart account actions.


### index (optional)
Type `bigint`

The index of the smart account being created. By default, the first smart account is created with an index of 0. If multiple smart accounts are needed, you can specify the index here.


### activeModule (optional)

Type `BaseValidationModule`

The active validation module that governs how transactions from this smart account are validated (e.g., signature schemes, permissions).


### executorModule (optional)

Type `BaseExecutionModule`

The execution module that defines how transactions are executed, allowing for customization of execution flows and smart account behavior.


### factoryAddress (optional)

Type: `Address`

The address of the smart account factory contract, responsible for creating new smart accounts.


### k1ValidatorAddress (optional)

Type: `Address`

The address of the key (k1) validator, which ensures the owner module’s validation during transactions.


## Response
- `Promise<NexusClient>` : Nexus client


