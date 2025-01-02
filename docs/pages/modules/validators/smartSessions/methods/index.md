# Smart Sessions Methods

Smart Sessions provide a secure way to delegate specific permissions to session keys. The following methods are available for managing and using smart sessions:

## Creating Sessions

- [grantPermission](/modules/validators/smartSessions/methods/grantPermission) - Create a new session with specific permissions and rules
- [grantDeferredPermission](/modules/validators/smartSessions/methods/grantDeferredPermission) - Create a deferred session that can be activated later in the moment it is needed (just in time)
- [trustAttesters](/modules/validators/smartSessions/methods/grantPermission#trustattesters) - Add trusted attesters for session validation

## Using Sessions

- [usePermission](./usePermission) - Execute transactions using granted session permissions

## Example Flow

1. First, grant permissions to create a session:
```typescript
const response = await client.grantPermission({
  sessionRequestedInfo: [{
    sessionPublicKey: "0x...",
    actionPoliciesInfo: [{
      contractAddress: "0x...",
      functionSelector: "0x...",
      sudo: true
    }]
  }]
});
```

2. Then use the session to execute transactions:
```typescript
const hash = await sessionClient.usePermission({
  calls: [{
    to: targetContract,
    data: encodeFunctionData({
      abi: contractABI,
      functionName: "transfer",
      args: [recipient, amount]
    })
  }]
});
```

For detailed information about configuring session policies and rules, see the [Smart Session Policies](../policies) documentation.
