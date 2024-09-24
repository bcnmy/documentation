Creates a Nexus Client for interacting with the Nexus smart account system.

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

### transport

### bundlerTransport

### client (optional)

### paymaster (optional)

### paymasterContext (optional)

### userOperation (optional)

### holder 
Owner of the smart account

### index (optional)

you can pass the index in the config while creating the account. First smart account gets created with index 0 by default.

### activeModule (optional)

### executorModule (optional)

### factoryAddress (optional)

### k1ValidatorAddress (optional)

## Response
- `Promise<NexusClient>` : Nexus client


