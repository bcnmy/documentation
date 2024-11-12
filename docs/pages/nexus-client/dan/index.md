# DAN 

The DAN (Delegated Authorization Network) Nexus Client enhances the security of AI agent authorization by providing secure, distributed key management through a multi-signature module and the addition of a DAN signer. This approach prevents a single point of failure associated with traditional private keys, ensuring that the loss or compromise of any individual key does not jeopardize the overall system security.

**Note**: This can also be used as a means of storing session keys, which will be coming soon with our Smart Sessions module release.

## Usage

:::code-group

```typescript twoslash [index.ts]
// @filename: config.ts
import { type Account } from "viem"
import { type Chain } from "viem/chains"
import { UnknownSigner } from "@biconomy/sdk"
export const account: UnknownSigner = {} as UnknownSigner
export const bundlerUrl = "" as string
export const chain: Chain = {} as Chain
// @filename: index.ts
// ---cut---
import { createNexusClient, danActions, toOwnableValidator, ownableActions } from "@biconomy/sdk";
import { http, parseEther, type LocalAccount } from "viem";
import { account, bundlerUrl, chain } from "./config";

const recipient = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" // vitalik.eth

const nexusClient = await createNexusClient({
  signer: account, 
  chain,
  transport: http(), 
  bundlerTransport: http(bundlerUrl), 
})

const danNexusClient = nexusClient.extend(danActions());

// Generate distributed keys
const keyGenData = await danNexusClient.keyGen();

// Create an ownables module with the following configuration:
// - Threshold: 1 (requires 1 signature for approval)
// - Owners: danAccount
const ownableModule = toOwnableValidator({
  account: nexusClient.account,
  signer: account as LocalAccount,
  moduleInitArgs: {
    threshold: 1n,
    owners: [keyGenData.sessionPublicKey]
  }
})

// Install the ownables module on the Nexus client's smart contract account
const hash = await nexusClient.installModule({
  module: ownableModule.moduleInitData
})

// Extend the Nexus client with ownable-specific actions
// This allows the client to use the new module's functionality
const ownableDanClient = nexusClient
  .extend(ownableActions(ownableModule))
  .extend(danActions())

// Wait for the module installation transaction to be mined and check its success
await ownableDanClient.waitForUserOperationReceipt({ hash })

// Prepare a user operation to withdraw 1 wei to userTwo
// This demonstrates a simple transaction that requires multi-sig approval
// @ts-ignore
const withdrawalUserOp = await ownableDanClient.prepareUserOperation({
  calls: [
    {
      to: recipient, // vitalik.eth
      value: 1n
    }
  ]
})

// Collect signature
const { signature } = await ownableDanClient.sigGen({
  keyGenData,
  ...withdrawalUserOp
})

if (!signature) throw new Error("Missing signature")

// Send the user operation with the collected signatures
const userOpHash = await nexusClient.sendUserOperation({
  ...withdrawalUserOp,
  signature
})
```

```typescript twoslash [config.ts]
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";

const privateKey = "PRIVATE_KEY";
export const account = privateKeyToAccount(`0x${privateKey}`);
export const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";
export const chain = baseSepolia;
```

:::

