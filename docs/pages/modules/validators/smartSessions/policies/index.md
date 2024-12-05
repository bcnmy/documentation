# Smart Session Policies

Smart Sessions provide a powerful way to delegate specific permissions to session keys with fine-grained control. These policies act as a security framework that allows you to precisely define what actions session keys can perform, under what conditions, and for how long.

## What are Smart Session Policies?

Smart Session policies are rules and constraints that govern:
- Which contract functions can be called
- What parameters are allowed
- How much value can be transferred
- When the permissions are valid
- Which blockchain networks are authorized

These policies enable secure delegation of account capabilities while maintaining strict control over potential risks.

## Key Benefits

- **🔐 Enhanced Security**: Grant minimal permissions required for specific operations
- **⚡ Better UX**: Enable seamless interactions without compromising security
- **🎯 Precise Control**: Define exact conditions under which operations can occur
- **⏱️ Time-Bound Access**: Automatically expire permissions after a set duration
- **🌐 Cross-Chain Safety**: Specify which networks permissions are valid on

## Policy Components

Each policy consists of several potential components:
- **Contract Address**: The target smart contract
- **Function Selectors**: Specific functions that can be called
- **Rules**: Parameter-level constraints
- **Time Bounds**: Valid duration for the permissions
- **Value Limits**: Maximum amounts that can be transferred
- **Network Restrictions**: Specific blockchain networks where the policy is valid

## Session Creation Parameters

### Session Creation Parameters
| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `sessionPublicKey` | `Hex` | Yes | Public key for the session (required for K1 algorithm validators) |
| `sessionValidatorAddress` | `Address` | No | Address of the session validator |
| `sessionValidatorType` | `string` | No | Type of the session validator (usually "simple K1 validator") |
| `salt` | `Hex` | No | Optional salt for the session |
| `sessionValidUntil` | `number` | No | Timestamp until which the session is valid |
| `sessionValidAfter` | `number` | No | Timestamp after which the session becomes valid |
| `chainIds` | `bigint[]` | No | Chain IDs where the session should be enabled |
| `actionPoliciesInfo` | `ActionPolicyInfo[]` | Yes | Array of action policy data for the session |

### Action Policy Configuration
| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `contractAddress` | `Address` | Yes | The smart contract address this policy applies to |
| `validUntil` | `number` | No | Timestamp when the session expires |
| `validAfter` | `number` | No | Timestamp when the session becomes active |
| `valueLimit` | `bigint` | No | Maximum amount of native tokens (ETH) per transaction |
| `tokenLimits` | `Array<TokenLimit>` | No | Array of ERC20 token spending limits |
| `usageLimit` | `bigint` | No | Maximum number of times this policy can be used |
| `sudo` | `boolean` | No | If true, grants unlimited permissions (not compatible with rules) |
| `functionSelector` | `string` | One of these required | Specific function to allow |
| `rules` | `Rule[]` | One of these required | Array of parameter rules |
| `abi` | `Abi` | One of these required | Full contract ABI |

### Parameter Conditions
| Condition | Value | Description |
|-----------|-------|-------------|
| `EQUAL` | 0 | Exact match comparison |
| `GREATER_THAN` | 1 | Value must be greater than reference |
| `LESS_THAN` | 2 | Value must be less than reference |
| `GREATER_THAN_OR_EQUAL` | 3 | Value must be greater than or equal to reference |
| `LESS_THAN_OR_EQUAL` | 4 | Value must be less than or equal to reference |
| `NOT_EQUAL` | 5 | Value must not match reference |

### Rule Configuration
| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `condition` | `ParamCondition` | Yes | Type of comparison to perform |
| `offsetIndex` | `number` | Yes | Position of parameter in calldata |
| `isLimited` | `boolean` | Yes | Whether to track usage count |
| `ref` | `string \| number \| bigint` | Yes | Value to compare against |
| `usage` | `Usage` | If `isLimited` is true | Usage tracking configuration |

### Usage Configuration
| Property | Type | Description |
|----------|------|-------------|
| `limit` | `bigint` | Maximum number of times this rule can be used |
| `used` | `bigint` | Current usage count (typically starts at 0) |


### Token Limit Structure
| Property | Type | Description |
|----------|------|-------------|
| `token` | `Address` | Token contract address |
| `limit` | `bigint` | Maximum amount that can be spent |


## Best Practices

1. **Principle of Least Privilege**: Always grant the minimum permissions necessary.
2. **Time Constraints**: Consider adding time range policies to limit session duration.
3. **Combine Policies**: Use multiple policies together for enhanced security.
