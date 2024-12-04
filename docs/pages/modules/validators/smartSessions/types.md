# Smart Session Types

The following types are used to create a smart session. Using these parameters, you can create a smart session with the `grantPermission` method, enabling the relevant policies over the session key.

## Session Creation Parameters

```ts twoslash

import type { OneOf, Address, Hex } from "viem"

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

/**
 * Represents the data structure for an action policy.
 *
 * Get the universal action policy to use when creating a new session.
 * The universal action policy can be used to ensure that only actions where the calldata has certain parameters can be used.
 * For example, it could restrict swaps on Uniswap to be only under X amount of input token.
 */
type ActionPolicyInfo = {
  // Required: The smart contract address this policy applies to
  contractAddress: Address;
  
  // Optional: Timestamp (Unix timestamp)
  // Time-Range Policy: Sets expiration time for the session
  // The timeframe policy can be used to restrict a session to only be able to be used within a certain timeframe
  validUntil?: number;
  
  // Optional: Timestamp (Unix timestamp)
  // Time-Range Policy: Sets activation time for the session
  // The timeframe policy can be used to restrict a session to only be able to be used within a certain timeframe
  validAfter?: number;
  
  // Optional: Maximum amount of native tokens (ETH) that can be spent per transaction
  // Value Limit Policy: Restricts ETH transfer amount per transaction
  valueLimit?: bigint;
  
  // Optional: Array of ERC20 token spending limits
  // Token Limit Policy: Restricts ERC20 token spending per transaction
  // The spending limits policy can be used to ensure that only a certain amount of ERC-20 tokens can be spent. 
  // For native value spends, use the value limit policy
  tokenLimits?: Array<{
    token: Address;    // Token contract address
    limit: bigint;    // Maximum amount that can be spent
  }>;
  
  // Optional: Maximum number of times this policy can be used
  // Usage Limit Policy: Restricts the number of times a policy can be used
  // The usage limit policy can be used to enforce that only a certain amount of native value can be spent. 
  // For ERC-20 limits, use the spending limit policy.
  usageLimit?: bigint;
  
  // Optional: If true, grants unlimited permissions for the specified contract/function
  // Sudo Policy: Grants unlimited permissions for the specified contract/function
  // Should not be used in conjunction with rules
  sudo?: boolean;

  // Either specify a function selector + rules OR provide the full contract ABI, which is parsed to individual function selectors
} & OneOf<{
  functionSelector?: string;
  rules?: Rule[];
} | {
  abi: any; // Full contract ABI
}>


// ---cut---

type CreateSessionDataParams = {
  /** Public key for the session. Required for K1 algorithm validators. */
  sessionPublicKey: Hex

  /** Address of the session validator. */
  sessionValidatorAddress?: Address

  /** Type of the session validator. Usually "simple K1 validator". */
  sessionValidatorType?: string

  /** Optional salt for the session. */
  salt?: Hex

  /** Timestamp until which the session is valid. */
  sessionValidUntil?: number

  /** Timestamp after which the session becomes valid. */
  sessionValidAfter?: number

  /** Chain IDs where the session should be enabled. Useful for enable mode. */
  chainIds?: bigint[]

  /** Array of action policy data for the session. */
  actionPoliciesInfo: ActionPolicyInfo[]
}
```

## Action Policy Information

```ts twoslash

import type { OneOf, Address, Hex } from "viem"

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

// ---cut---

/**
 * Represents the data structure for an action policy.
 *
 * Get the universal action policy to use when creating a new session.
 * The universal action policy can be used to ensure that only actions where the calldata has certain parameters can be used.
 * For example, it could restrict swaps on Uniswap to be only under X amount of input token.
 */
type ActionPolicyInfo = {
  // Required: The smart contract address this policy applies to
  contractAddress: Address;
  
  // Optional: Timestamp (Unix timestamp)
  // Time-Range Policy: Sets expiration time for the session
  // The timeframe policy can be used to restrict a session to only be able to be used within a certain timeframe
  validUntil?: number;
  
  // Optional: Timestamp (Unix timestamp)
  // Time-Range Policy: Sets activation time for the session
  // The timeframe policy can be used to restrict a session to only be able to be used within a certain timeframe
  validAfter?: number;
  
  // Optional: Maximum amount of native tokens (ETH) that can be spent per transaction
  // Value Limit Policy: Restricts ETH transfer amount per transaction
  valueLimit?: bigint;
  
  // Optional: Array of ERC20 token spending limits
  // Token Limit Policy: Restricts ERC20 token spending per transaction
  // The spending limits policy can be used to ensure that only a certain amount of ERC-20 tokens can be spent. 
  // For native value spends, use the value limit policy
  tokenLimits?: Array<{
    token: Address;    // Token contract address
    limit: bigint;    // Maximum amount that can be spent
  }>;
  
  // Optional: Maximum number of times this policy can be used
  // Usage Limit Policy: Restricts the number of times a policy can be used
  // The usage limit policy can be used to enforce that only a certain amount of native value can be spent. 
  // For ERC-20 limits, use the spending limit policy.
  usageLimit?: bigint;
  
  // Optional: If true, grants unlimited permissions for the specified contract/function
  // Sudo Policy: Grants unlimited permissions for the specified contract/function
  // Should not be used in conjunction with rules
  sudo?: boolean;

  // Either specify a function selector + rules OR provide the full contract ABI, which is parsed to individual function selectors
} & OneOf<{
  functionSelector?: string;
  rules?: Rule[];
} | {
  abi: any; // Full contract ABI
}>
```

## Rule Types and Conditions

```ts twoslash
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
```