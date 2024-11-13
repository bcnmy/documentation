# Methods

## keyGen()

Generates distributed key shares across the DAN network nodes.

### Usage

:::code-group

```typescript twoslash [index.ts]
// @filename: config.ts
import { type UnknownSigner } from "@biconomy/sdk"
import { type Chain } from "viem/chains"
export const account: UnknownSigner = {} as UnknownSigner
export const bundlerUrl = "" as string
export const chain: Chain = {} as Chain
// @filename: index.ts
// ---cut---
import { createNexusClient, danActions } from "@biconomy/sdk";
import { http } from "viem";
import { account, bundlerUrl, chain } from "./config";

const nexusClient = await createNexusClient({
  signer: account,
  chain,
  transport: http(),
  bundlerTransport: http(bundlerUrl)
});

const danNexusClient = nexusClient.extend(danActions());

// Generate distributed key shares
const keyGenData = await danNexusClient.keyGen();
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

### Parameters

```typescript
type KeyGenParameters = {
  /** Minimum number of nodes required for signing (M in M-of-N) */
  threshold?: number        // Default: 2
  /** Total number of nodes holding key shares (N in M-of-N) */
  partiesNumber?: number   // Default: 3
  /** Key validity period in seconds */
  duration?: number        // Default: 86400 (24 hours)
  /** Optional ephemeral secret key */
  ephSK?: `0x${string}`
}
```

### Response

```typescript
type KeyGenData = {
  /** Generated public key for the DAN network */
  publicKey: `0x${string}`
  /** Unique identifier for this key set */
  keyId: `0x${string}`
  /** Public key for the current session */
  sessionPublicKey: `0x${string}`
  /** Ephemeral secret key */
  ephSK: `0x${string}`
  /** Ephemeral key identifier */
  ephId: `0x${string}`
}
```

## sigGen()

Generates distributed signatures through MPC network validation.

### Usage

:::code-group

```typescript twoslash [index.ts]
// @filename: config.ts
import { type UnknownSigner } from "@biconomy/sdk"
import { type Chain } from "viem/chains"
export const account: UnknownSigner = {} as UnknownSigner
export const bundlerUrl = "" as string
export const chain: Chain = {} as Chain
// @filename: setup.ts
import { createNexusClient, danActions } from "@biconomy/sdk";
import { http } from "viem";
import { account, bundlerUrl, chain } from "./config";

const nexusClient = await createNexusClient({
  signer: account,
  chain,
  transport: http(),
  bundlerTransport: http(bundlerUrl)
});

const danNexusClient = nexusClient.extend(danActions());
export const keyGenData = await danNexusClient.keyGen();
// @filename: index.ts
// ---cut---
import { createNexusClient, danActions } from "@biconomy/sdk";
import { http, parseEther } from "viem";
import { account, bundlerUrl, chain } from "./config";
import { keyGenData } from "./setup";

const nexusClient = await createNexusClient({
  signer: account,
  chain,
  transport: http(),
  bundlerTransport: http(bundlerUrl)
});

const danNexusClient = nexusClient.extend(danActions());

const { signature, ...preparedUserOperation } = await danNexusClient.sigGen({
  keyGenData,
  calls: [{
    to: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    value: parseEther("0.1"),
    data: "0x"
  }]
});
```

```typescript twoslash [setup.ts]
// @filename: config.ts
import { type UnknownSigner } from "@biconomy/sdk"
import { type Chain } from "viem/chains"
export const account: UnknownSigner = {} as UnknownSigner
export const bundlerUrl = "" as string
export const chain: Chain = {} as Chain
// @filename: setup.ts
// ---cut---
import { createNexusClient, danActions } from "@biconomy/sdk";
import { http } from "viem";
import { account, bundlerUrl, chain } from "./config";

const nexusClient = await createNexusClient({
  signer: account,
  chain,
  transport: http(),
  bundlerTransport: http(bundlerUrl)
});

const danNexusClient = nexusClient.extend(danActions());
export const keyGenData = await danNexusClient.keyGen();
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

### Parameters

```typescript
type SigGenParameters = {
  /** Key generation data from keyGen() */
  keyGenData: KeyGenData
  /** Transaction calls to execute */
  calls: Array<{
    /** Target address for the transaction */
    to: `0x${string}`
    /** Transaction value in wei */
    value: bigint
    /** Optional call data for the transaction */
    data?: `0x${string}`
  }>
}

type KeyGenData = {
  /** Generated public key for the DAN network */
  publicKey: `0x${string}`
  /** Unique identifier for this key set */
  keyId: `0x${string}`
  /** Public key for the current session */
  sessionPublicKey: `0x${string}`
  /** Ephemeral secret key */
  ephSK: `0x${string}`
  /** Ephemeral key identifier */
  ephId: `0x${string}`
}
```

### Response

```typescript
type UserOperation = {
  /** Smart account address */
  sender: `0x${string}`
  /** Account nonce */
  nonce: bigint
  /** Account initialization code (empty if already deployed) */
  initCode: `0x${string}`
  /** Encoded call data */
  callData: `0x${string}`
  /** Gas limit for the main execution */
  callGasLimit: bigint
  /** Gas limit for the verification step */
  verificationGasLimit: bigint
  /** Gas required for pre-verification */
  preVerificationGas: bigint
  /** Maximum total fee per gas unit */
  maxFeePerGas: bigint
  /** Maximum priority fee per gas unit */
  maxPriorityFeePerGas: bigint
  /** Paymaster contract address and encoded data */
  paymasterAndData: `0x${string}`
  /** Operation signature */
  signature: `0x${string}`
}
```
