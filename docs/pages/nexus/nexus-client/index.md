Creates a Nexus Client for interacting with the Nexus smart account system.

## Usage

```typescript
import { createNexusClient } from '@biconomy/sdk'
import { http, privateKeyToAccount } from 'viem'
import { mainnet } from 'viem/chains'

const account = privateKeyToAccount(`0x${PRIVATE_KEY}`)

const nexusClient = await createNexusClient({
  chain: mainnet,
  transport: http('https://mainnet.infura.io/v3/YOUR-PROJECT-ID'),
  bundlerTransport: http('BUNDLER_URL'),
  holder: account,
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


