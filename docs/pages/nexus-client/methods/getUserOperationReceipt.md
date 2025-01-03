# Get User Operation Receipt

Returns the User Operation Receipt given a User Operation hash.

**Usage Example**

```typescript
const receipt = await smartAccount.getUserOperationReceipt({
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d'
});

// Example response
{
   blockHash: '0xaf1dadb8a98f1282e8f7b42cc3da8847bfa2cf4e227b8220403ae642e1173088',
   blockNumber: 15132008n,
   sender: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
   status: 'success',
   // ... other receipt details
}
```

**Parameters**

- hash (`0x${string}`, required): A User Operation hash.

**Returns**

- `Promise<UserOperationReceipt>`: The User Operation receipt containing details such as:
  - `blockHash`: The hash of the block where the operation was included
  - `blockNumber`: The number of the block where the operation was included
  - `sender`: The address that sent the operation
  - `status`: The status of the operation ('success' | 'reverted')

[Reference: Viem getUserOperationReceipt](https://viem.sh/account-abstraction/actions/bundler/getUserOperationReceipt) 