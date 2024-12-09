# Ownable (Multisig) Module

The Ownable module provides multi-signature functionality for smart contract accounts, allowing multiple owners to control an account with configurable signature thresholds.

## Actions

### addOwner

Adds a new owner to the smart contract account.

#### Usage

```typescript
import { nexusClient } from "./nexusClient"
import { toOwnableValidator, ownableActions } from "@biconomy/sdk"

const ownableModule = toOwnableValidator({
  account: nexusClient.account,
  signer: eoaAccount
});

const ownableNexusClient = nexusClient.extend(ownableActions(ownableModule));

const hash = await ownableNexusClient.addOwner({
  owner: "0x..."
});
```

#### Parameters

| Parameter | Type | Description | Required |
|-----------|------|-------------|-----------|
| account | ModularSmartAccount | The smart account to add the owner to. Uses client's account if not provided | No |
| owner | Hex | Address of the new owner | Yes |
| maxFeePerGas | bigint | Maximum fee per gas unit | No |
| maxPriorityFeePerGas | bigint | Maximum priority fee per gas unit | No |
| nonce | bigint | Transaction nonce. Auto-determined if not provided | No |

#### Response
Returns a promise that resolves to the transaction hash (`Hex`).

### removeOwner

Removes an existing owner from the smart contract account.

#### Usage

```typescript
const hash = await ownableNexusClient.removeOwner({
  owner: "0x..."
});
```

#### Parameters

| Parameter | Type | Description | Required |
|-----------|------|-------------|-----------|
| account | ModularSmartAccount | The smart account to remove the owner from. Uses client's account if not provided | No |
| owner | Hex | Address of the owner to remove | Yes |
| maxFeePerGas | bigint | Maximum fee per gas unit | No |
| maxPriorityFeePerGas | bigint | Maximum priority fee per gas unit | No |
| nonce | bigint | Transaction nonce. Auto-determined if not provided | No |

### getThreshold

Retrieves the current signature threshold for the account.

#### Usage

```typescript
const threshold = await ownableNexusClient.getThreshold();
```

#### Parameters

| Parameter | Type | Description | Required |
|-----------|------|-------------|-----------|
| account | ModularSmartAccount | The smart account to query. Uses client's account if not provided | No |

#### Response
Returns a promise that resolves to the current threshold value (`number`).

### setThreshold

Updates the signature threshold for the account.

#### Usage

```typescript
const hash = await ownableNexusClient.setThreshold({
  threshold: 2n
});
```

#### Parameters

| Parameter | Type | Description | Required |
|-----------|------|-------------|-----------|
| account | ModularSmartAccount | The smart account to update. Uses client's account if not provided | No |
| threshold | bigint | New threshold value | Yes |
| maxFeePerGas | bigint | Maximum fee per gas unit | No |
| maxPriorityFeePerGas | bigint | Maximum priority fee per gas unit | No |
| nonce | bigint | Transaction nonce. Auto-determined if not provided | No |

### prepareSignatures

Combines multiple signatures for a multi-sig transaction.

#### Usage

```typescript
const combinedSignature = await ownableNexusClient.prepareSignatures({
  signatures: ["0x...", "0x..."]
});
```

#### Parameters

| Parameter | Type | Description | Required |
|-----------|------|-------------|-----------|
| account | ModularSmartAccount | The smart account context. Uses client's account if not provided | No |
| signatures | Hex[] | Array of signatures to combine | Yes |

#### Response
Returns a promise that resolves to the combined signature (`Hex`).

## Complete Example

Here's a complete example showing how to set up and use a multi-signature configuration:

```typescript
import { nexusClient } from "./nexusClient"
import { toOwnableValidator, ownableActions } from "@biconomy/sdk"

// 1. Create and configure the ownable module
const ownableModule = toOwnableValidator({
  account: nexusClient.account,
  signer: eoaAccount,
  moduleInitArgs: {
    threshold: 2n,
    owners: [owner1.address, owner2.address]
  }
});

// 2. Install the module
const installHash = await nexusClient.installModule({
  module: ownableModule.moduleInitData
});
await nexusClient.waitForUserOperationReceipt({ hash: installHash });

// 3. Extend the client with ownable actions
const ownableNexusClient = nexusClient.extend(ownableActions(ownableModule));

// 4. Prepare a multi-sig transaction
const userOp = await ownableNexusClient.prepareUserOperation({
  calls: [{
    to: recipient,
    value: amount
  }]
});

// 5. Collect required signatures
const userOpHash = await nexusClient.account.getUserOpHash(userOp);
const signatures = await Promise.all([
  owner1.signMessage({ message: { raw: userOpHash } }),
  owner2.signMessage({ message: { raw: userOpHash } })
]);

// 6. Combine signatures and execute
userOp.signature = await ownableNexusClient.prepareSignatures({ signatures });
const uoHash = await nexusClient.sendUserOperation(userOp);
```
