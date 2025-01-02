# sendTransaction

This method is used to submit a User Operation object to the User Operation pool of the client. It signs the UserOperation using smart account owner and submits it to the bundler for on-chain processing.

## Usage

:::code-group

```typescript twoslash [example.ts]
import { nexusClient } from "./nexusClient"
import { contractABI } from "./abi"
import { parseEther } from "viem"; 

const hash = await nexusClient.sendTransaction({
  calls: [ 
    { 
      to: '0xf5715961C550FC497832063a98eA34673ad7C816', 
      value: parseEther('0.0001'), 
    }, 
    { 
      abi: contractABI, 
      functionName: 'mint', 
      to: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',   
    }
  ], 
}); 
```
```typescript twoslash [nexusClient.ts] filename="nexusClient.ts"
import { privateKeyToAccount } from "viem/accounts";
import { createSmartAccountClient } from "@biconomy/sdk";
import { baseSepolia } from "viem/chains"; 
import { http } from "viem"; 

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`)
const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"; 

export const nexusClient = await createSmartAccountClient({ 
    signer: account, 
    chain: baseSepolia,
    transport: http(), 
    bundlerTransport: http(bundlerUrl), 
});
```

:::

## Parameters
- calls `{ data: Hex, to: Address, value: bigint }[]` : The calls to execute in the User Operation.
- paymaster  `Address | true | PaymasterClient | PaymasterAction` (optional)

## Response
- `Promise<Hash>` The transaction hash. 