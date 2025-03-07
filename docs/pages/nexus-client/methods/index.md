# Base ERC-7579 Methods

The Nexus Client provides several methods for interacting with User Operations and the blockchain:

## `installModule`
Installs the module on the smart account.

**Usage Example**

```typescript
const userOpReceipt: UserOpReceipt = await smartAccount.installModule({
    moduleAddress: K1_VALIDATOR,
    type: 'validator',
    data: encodePacked(["address"], [await smartAccount.getAddress()])
})
```

**Parameters**

- moduleAddress (`Address`, required)
- type ([ModuleType](https://github.com/bcnmy/biconomy-client-sdk/blob/b66b611aa35af13da879995078892827aabf30e4/src/modules/utils/Types.ts#L232), required)
- data (`0x${string}` | undefined, optional)

**Returns**

- `Promise<UserOpReceipt>`: A promise of [UserOpReceipt](https://github.com/bcnmy/biconomy-client-sdk/blob/b3fe78f74ec366f50bbbb5ad8cf043e689df6bff/src/bundler/utils/Types.ts#L23) 

## `uninstallModule`
Uninstalls the module of the smart account.

**Usage Example**

```typescript
await smartAccount.uninstallModule(moduleAddress, ModuleType.Validation);
```

**Parameters**

- moduleAddress (`Address`, required)
- type ([ModuleType](https://github.com/bcnmy/biconomy-client-sdk/blob/b66b611aa35af13da879995078892827aabf30e4/src/modules/utils/Types.ts#L232), required)
- moduleSelector (`0x${string}` | undefined, optional) This will only be needed when uninstalling `Fallback` modules
- data (`0x${string}` | undefined, optional)

**Returns**

- `Promise<UserOpReceipt>`: A promise of [UserOpReceipt](https://github.com/bcnmy/biconomy-client-sdk/blob/b3fe78f74ec366f50bbbb5ad8cf043e689df6bff/src/bundler/utils/Types.ts#L23) 

## `isModuleInstalled`
Checks if a module is installed on the smart account.

**Usage Example**

```typescript
const isInstalled: boolean = await smartAccount.isModuleInstalled({
    type,
    moduleAddress
});
```

**Parameters**

- type ([ModuleType](https://github.com/bcnmy/biconomy-client-sdk/blob/b66b611aa35af13da879995078892827aabf30e4/src/modules/utils/Types.ts#L232), required)
- moduleAddress (`Address`, required)
- data (`0x${string}` | undefined, optional)

**Returns**

- `Promise<boolean>`: A promise of a boolean

## `getPreviousModule`
Gets the pointer to the previously installed module based on given `moduleAddress` and `type`

**Usage Example**

```typescript
const previousModule = await smartAccount.getPreviousModule({
    moduleAddress,
    type
});
```

**Parameters**

- moduleAddress (`Address`, required)
- type ([ModuleType](https://github.com/bcnmy/biconomy-client-sdk/blob/b66b611aa35af13da879995078892827aabf30e4/src/modules/utils/Types.ts#L232), required)

**Returns**

- `Promise<{moduleAddress: Address; type: ModuleType}>`: A promise of an object

## `getInstalledValidators`
Gets the installed validators 

**Usage Example**

```typescript
const validators = await smartAccount.getInstalledValidators();
```

**Returns**

- `Promise<Address[]>`: A promise of validator addresses

## `getInstalledExecutors`
Gets the installed executors 

**Usage Example**

```typescript
const executors = await smartAccount.getInstalledExecutors();
```

**Returns**

- `Promise<Address[]>`: A promise of executor addresses

## `getInstalledModules`
Gets all the installed modules

**Usage Example**

```typescript
const modules = await smartAccount.getInstalledModules();
```

**Returns**

- `Promise<Address[]>`: A promise of module addresses

## `getActiveHook`
Gets the active hook module

**Usage Example**

```typescript
const hook = await smartAccount.getActiveHook();
```

**Returns**

- `Promise<Address>`: A promise of a hook address

## `getFallbackBySelector`
Gets the fallback module by the selector

**Usage Example**

```typescript
const fallback = await smartAccount.getFallbackBySelector();
```

**Parameters**

- selector (`Hex`, optional) The fallback module selector, if not passed, the [GENERIC_FALLBACK_SELECTOR](https://github.com/bcnmy/biconomy-client-sdk/blob/b3fe78f74ec366f50bbbb5ad8cf043e689df6bff/src/account/utils/Constants.ts#L122) will be used

**Returns**

- `Promise<Address>`: A promise of a fallback module address

## `supportsModule`
Check if the smart account supports a module

**Usage Example**

```typescript
const isSupported = await smartAccount.supportsModule(ModuleType.Hook);
```

**Parameters**

- type ([ModuleType](https://github.com/bcnmy/biconomy-client-sdk/blob/b66b611aa35af13da879995078892827aabf30e4/src/modules/utils/Types.ts#L232), required)

**Returns**

- `Promise<boolean>`: A promise of a boolean

## `sendTransactionWithExecutor`
Sends a transaction using an active executor module.

**Usage Example**

```typescript
const userOpReceipt: UserOpReceipt = await smartAccount.sendTransactionWithExecutor(
    [transaction], 
    ownedAccountAddress
)
```

**Parameters**

- manyOrOneTransactions ([Transaction](https://github.com/bcnmy/biconomy-client-sdk/blob/b3fe78f74ec366f50bbbb5ad8cf043e689df6bff/src/account/utils/Types.ts#L346) | `Transaction[]`, required)
- ownedAccountAddress (`Address`, required) 

**Returns**

- `Promise<UserOpReceipt>`: A promise of [UserOpReceipt](https://github.com/bcnmy/biconomy-client-sdk/blob/b3fe78f74ec366f50bbbb5ad8cf043e689df6bff/src/bundler/utils/Types.ts#L23) 

## Transaction Methods
- [sendTransaction](/nexus-client/methods/sendTransaction) - Submit a User Operation to the pool
- [sendUserOperation](/nexus-client/methods/sendUserOperation) - Submit a customized User Operation
- [sendTokenPaymasterUserOp](/nexus-client/methods/sendTokenPaymasterUserOp) - Send a User Operation with token paymaster

## Preparation Methods
- [prepareTokenPaymasterUserOp](/nexus-client/methods/prepareTokenPaymasterUserOp) - Prepare a User Operation with token paymaster
- [prepareUserOperation](/nexus-client/methods/prepareUserOperation) - Prepare a User Operation without sending

## Status & Information Methods
- [waitForUserOperationReceipt](/nexus-client/methods/waitForUserOperationReceipt) - Wait for a User Operation to be included in a block
- [estimateUserOperationGas](/nexus-client/methods/estimateUserOperationGas) - Estimate gas values for a User Operation
- [getUserOperation](/nexus-client/methods/getUserOperation) - Get information about a User Operation
- [debugUserOperation](/nexus-client/methods/debugUserOperation) - Debug a User Operation with detailed information
- [getUserOperationReceipt](/nexus-client/methods/getUserOperationReceipt) - Get the User Operation Receipt given a User Operation hash

## Network Methods
- [getSupportedEntryPoints](/nexus-client/methods/getSupportedEntryPoints) - Get supported EntryPoints
- [getChainId](/nexus-client/methods/getChainId) - Get the current chain ID
