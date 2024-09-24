# Nexus client methods

## sendTransaction

This method is used to submit a User Operation object to the User Operation pool of the client. It signs the UserOperation using smart account owner and submits it to the bundler for on-chain processing.

### Usage

```typescript
const hash = await nexusClient.sendTransaction({ 
  calls: [ 
    { 
      to: '0xf5715961C550FC497832063a98eA34673ad7C816', 
      value: parseEther('0.0001'), 
    }, 
    { 
      abi: contractABI, 
      functionName: 'contractFunction', 
      to: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',   
    }
  ], 
}); 
```

### Parameters
- calls `{ data: Hex, to: Address, value: bigint }[]` : The calls to execute in the User Operation.
- paymaster  `Address | true | PaymasterClient | PaymasterAction` (optional)

### Response
- `Promise<Hash>` The User Operation hash.
 

## waitForUserOperationReceipt

Waits for the User Operation to be included on a Block (one confirmation), and then returns the User Operation receipt.

### Usage

```typescript
const receipt = await nexusClient.waitForUserOperationReceipt({ 
  hash: '0x315a882b82eb33250b919da6ebb2dd890df39ca0840e4026cbbad595b9a07e86'
})
```

## estimateUserOperationGas

Estimates the gas values for a User Operation to be executed successfully.

### Usage

```typescript
const gas = await nexusClient.estimateUserOperationGas({ 
  calls: [ 
    { 
      to: '0xf5715961C550FC497832063a98eA34673ad7C816', 
      value: parseEther('0.0001'), 
    }, 
    { 
      abi: contractABI, 
      functionName: 'contractFunction', 
      to: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',   
    }
  ], 
}); 
```

### Parameters
- calls `{ data: Hex, to: Address, value: bigint }[]` : The calls to execute in the User Operation.
- paymaster  `Address | true | PaymasterClient | PaymasterAction` (optional)

### Response
- `Promise<EstimateUserOperationGasReturnType>` The estimated gas values.

```typescript
{
  callGasLimit: bigint;
  preVerificationGas: bigint;
  verificationGasLimit: bigint;
  paymasterVerificationGasLimit: bigint | undefined;
  paymasterPostOpGasLimit: bigint | undefined;
}
```
 


### Parameters
- hash `'0x${string}'`: A User Operation hash.
- pollingInterval (optional) `number`: Polling frequency (in ms) 
- retryCount (optional) `number`: The number of times to retry. Default value is 6.
- timeout (optional) `number`: Optional timeout (in ms) to wait before stopping polling. Default value is 5000.

### Response
- receipt `Promise<UserOperationReceipt>`: The User Operation receipt.


## getUserOperation

Retrieves information about a User Operation given a hash.

### Usage

```typescript
const receipt = await nexusClient.getUserOperation({ 
  hash: '0x315a882b82eb33250b919da6ebb2dd890df39ca0840e4026cbbad595b9a07e86'
})
```

### Parameters
- hash `'0x${string}'`: A User Operation hash.

### Response
- userOperation `Promise<GetUserOperationReturnType>`: User Operation information.

```typescript

type GetUserOperationReturnType = {
  /** The block hash the User Operation was included on. */
  blockHash: Hash
  /** The block number the User Operation was included on. */
  blockNumber: bigint
  /** The EntryPoint which handled the User Operation. */
  entryPoint: Address
  /** The hash of the transaction which included the User Operation. */
  transactionHash: Hash
  /** The User Operation. */
  userOperation: UserOperation
}

```

## getUserOperationReceipt

Returns the User Operation Receipt given a User Operation hash.

### Usage

```typescript
const receipt = await nexusClient.getUserOperationReceipt({ 
  hash: '0x315a882b82eb33250b919da6ebb2dd890df39ca0840e4026cbbad595b9a07e86'
})
```

### Parameters
- hash `'0x${string}'`: A User Operation hash.

### Response
- receipt `Promise<UserOperationReceipt>`: User Operation receipt.


## getSupportedEntryPoints

Returns the EntryPoints that the nexus client supports.

### Usage

```typescript
const entrypointAddresses = await nexusClient.getSupportedEntryPoints()
```

### Response
- addresses `Promise<Address[]>`: The EntryPoints that the nexus client supports.



## getChainId

Returns the chain ID associated with the nexus client


### Usage

```typescript
const chainId = await nexusClient.getChainId() 
```

### Response
- chain Id `Promise<number>`: The current chain ID.















