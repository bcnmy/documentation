# Create Smart Sessions Actions

> **Important**: The k1Validator module must be the active nexus module for creating smart sessions. This is automatically handled when you extend your client with `smartSessionCreateActions`.

The Smart Sessions module provides two key actions when using `smartSessionCreateActions`: `grantPermission` and `trustAttesters`.

## grantPermission

Creates a new session with specified permissions and rules.

### Usage


:::code-group

```typescript twoslash [example.ts]
import { nexusClient } from "./nexusClient"
import { smartSessionCreateActions } from "@biconomy/sdk"

const response = await sessionNexusClient.grantPermission({
  sessionRequestedInfo: [{
    sessionPublicKey: "0x...",
    actionPoliciesInfo: [{
      contractAddress: "0x...",
      functionSelector: "0x...",
      rules: [{
        condition: ParamCondition.LESS_THAN,
        offsetIndex: 1,
        isLimited: true,
        ref: maxValue,
        usage: {
          limit: BigInt(maxValue),
          used: BigInt(0)
        }
      }]
    }]
  }]
});

```

```typescript twoslash [nexusClient.ts] filename="nexusClient.ts"
import { privateKeyToAccount } from "viem/accounts";
import { createNexusClient } from "@biconomy/sdk";
import { baseSepolia } from "viem/chains"; 
import { http } from "viem"; 

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`)
const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"; 

export const nexusClient = await createNexusClient({ 
    signer: account, 
    chain: baseSepolia,
    transport: http(), 
    bundlerTransport: http(bundlerUrl), 
});
```

:::

### Parameters

```typescript
import { type Address } from "viem"

enum ParamCondition {
  EQUAL = 0,
  GREATER_THAN = 1,
  LESS_THAN = 2,
  GREATER_THAN_OR_EQUAL = 3,
  LESS_THAN_OR_EQUAL = 4,
  NOT_EQUAL = 5
}

type Usage = {
  /** Maximum number of times this rule can be used */
  limit: bigint
  /** Current usage count (typically starts at 0) */
  used: bigint
}

type Rule = {
  /** Type of comparison to perform */
  condition: ParamCondition
  /** Position of parameter in calldata.
   *
   * Example: transferWithMessage(address to, uint256 amount, string message)...
   * 
   *   const rules = [
   *     { offsetIndex: 0, ... }, // 'to' parameter
   *     { offsetIndex: 1, ... }, // 'amount' parameter
   *     { offsetIndex: 2, ... }  // offset to message data
   *   ]
   */
  offsetIndex: number
  /** Whether to track usage count */
  isLimited: boolean
  /** Value to compare against */
  ref: string | number | bigint
  /** Usage tracking configuration (required if isLimited is true) */
  usage?: Usage
}

type ActionPolicy = {
  /** Target contract address */
  contractAddress: Address
  /** Function selector to allow */
  functionSelector: string
  /** Array of validation rules for the function parameters */
  rules: Rule[]
}

type SessionConfig = {
  /** Public key for the session */
  sessionPublicKey: string
  /** Array of permission policies */
  actionPoliciesInfo: ActionPolicy[]
}

type GrantPermissionParams = {
  /** Array of session configurations */
  sessionRequestedInfo: SessionConfig[]
}
```

### Response

Returns a promise that resolves to a transaction hash.

## trustAttesters

Adds trusted attesters for session validation.

### Usage


:::code-group

```typescript twoslash [example.ts]
import { nexusClient } from "./nexusClient"
import { smartSessionCreateActions } from "@biconomy/sdk"
import { MOCK_ATTESTER_ADDRESS, REGISTRY_ADDRESS } from "@rhinestone/module-sdk"
const sessionNexusClient = nexusClient.extend(
  smartSessionCreateActions(sessionsModule)
);

const response = await sessionNexusClient.trustAttesters({
  attesters: [MOCK_ATTESTER_ADDRESS],
  registryAddress: REGISTRY_ADDRESS
});
```

```typescript twoslash [nexusClient.ts] filename="nexusClient.ts"
import { privateKeyToAccount } from "viem/accounts";
import { createNexusClient } from "@biconomy/sdk";
import { baseSepolia } from "viem/chains"; 
import { http } from "viem"; 

const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`)
const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"; 

export const nexusClient = await createNexusClient({ 
    signer: account, 
    chain: baseSepolia,
    transport: http(), 
    bundlerTransport: http(bundlerUrl), 
});
```

:::

### Parameters

- `attesters`: Array of attester addresses to trust

### Response

Returns a promise that resolves to a transaction hash.


