# Smart Sessions

Smart Sessions is a powerful module that enables secure, granular delegation of account permissions through session-based access control. It allows dApps to perform actions on behalf of users even when they're offline, while maintaining strict security boundaries.

## Overview

Smart Sessions provide:
- Granular permission control for specific contract functions
- Parameter-level validation rules
- Usage limits and time-based constraints

## Key Concepts

### Session Types

Basic Sessions provide:
- Direct session key management
- Suitable for simple delegation scenarios
- Perfect for recurring operations

### Permission Rules

Rules define the constraints for delegated actions. Each rule consists of:

```typescript
type Rule = {
  condition: ParamCondition;     // Comparison operation
  offsetIndex: number;           // Parameter position in calldata
  isLimited: boolean;           // Whether usage is tracked
  ref: AnyReferenceValue;       // Value to compare against
  usage: {                      // Usage tracking (if limited)
    limit: bigint;              // Maximum allowed uses
    used: bigint;               // Current use count
  }
}

enum ParamCondition {
  EQUAL = 0,
  GREATER_THAN = 1,
  LESS_THAN = 2,
  GREATER_THAN_OR_EQUAL = 3,
  LESS_THAN_OR_EQUAL = 4,
  NOT_EQUAL = 5
}
```


#### Understanding Offset Calculation

The `offsetIndex` in a rule determines which 32-byte word in the calldata to validate. 

1. **Static Parameters** (uint, address, bool, etc.):
```typescript
// For a function: transfer(address to, uint256 amount)
const rules = [
  {
    offsetIndex: 0,  // 'to' address parameter
    // ... other rule properties
  },
  {
    offsetIndex: 1,  // 'amount' parameter
    // ... other rule properties
  }
];
```

## Usage Examples

### Creating a Session

```typescript
import { type LocalAccount, type Address } from "viem";
import { type NexusClient } from "@biconomy/sdk";

// Initialize the smart sessions module
const sessionsModule = toSmartSessionsValidator({
  account: nexusClient.account,
  signer: eoaAccount
});

// Define session permissions
const sessionRequestedInfo = [{
  sessionPublicKey,
  actionPoliciesInfo: [{
    contractAddress: targetContract,
    functionSelector: "0x...", // Function selector
    rules: [
      {
        condition: ParamCondition.LESS_THAN,
        offsetIndex: 0,
        isLimited: true,
        ref: maxValue,
        usage: {
          limit: BigInt(maxValue),
          used: BigInt(0)
        }
      }
    ]
  }]
}];

// Grant permission
const createSessionsResponse = await nexusClient
  .extend(smartSessionCreateActions(sessionsModule))
  .grantPermission({ sessionRequestedInfo });
```

### Using a Session Permission

```typescript
import { type LocalAccount, type Address } from "viem";
import { type NexusClient } from "@biconomy/sdk";

// Initialize the module for using permissions
const usePermissionsModule = toSmartSessionsValidator({
  account: nexusClient.account,
  signer: sessionKey // The session key granted permission
});

// Extend the client with session usage capabilities
const sessionClient = nexusClient
  .extend(smartSessionUseActions(usePermissionsModule));

// Use the session to make a transaction
const userOpHash = await sessionClient.usePermission({
  calls: [{
    to: targetContract,
    data: encodeFunctionData({
      abi: contractABI,
      functionName: "transfer",
      args: [recipientAddress, amount]
    })
  }]
});

// Wait for the transaction to be mined
const receipt = await sessionClient.waitForUserOperationReceipt({ hash: userOpHash });
```

## Best Practices

1. **Rule Definition**
   - Set appropriate parameter validation rules
   - Use usage limits for sensitive operations
   - Consider time-based constraints when needed
   - Properly calculate offsets for dynamic parameters

2. **Security**
   - Regularly rotate session keys
   - Implement proper session key storage
   - Validate all parameters before session creation

3. **Error Handling**
   - Validate all parameters before creating sessions
   - Handle permission revocation gracefully
   - Monitor usage limits
   - Implement proper error recovery mechanisms

## Advanced Features

### Parameter Validation
Smart Sessions support complex parameter validation through rules:

```typescript
const rules: Rule[] = [
  {
    // Ensure parameter equals specific address
    condition: ParamCondition.EQUAL,
    offsetIndex: 0,
    isLimited: false,
    ref: targetAddress
  },
  {
    // Limit transaction value
    condition: ParamCondition.LESS_THAN,
    offsetIndex: 1,
    isLimited: true,
    ref: maxAmount,
    usage: {
      limit: BigInt(maxAmount),
      used: BigInt(0)
    }
  }
];
```

