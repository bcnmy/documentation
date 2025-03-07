### Transfer Ownership

This tutorial provides insights into how to transfer the ownership of a smart account.

:::caution
Transfer Ownership is performed within the framework of either the [ECDSA Ownership Module] or the [Multichain Validation Module]. If you are utilizing the [Session Key Manager], you will need to **recreate the smart account client with the new owner** (new signer). This involves specifying the smart account address and recreating the session. 
:::


```typescript
const newOwner = "0x..."
let smartAccount = await createSmartAccountClient({
    signer,
    paymasterUrl,
    bundlerUrl,
})
const smartAccountAddress = await smartAccount.getAccountAddress();

const response = await smartAccount.transferOwnership(newOwner, DEFAULT_ECDSA_OWNERSHIP_MODULE, {
    paymasterServiceData: { mode: PaymasterMode.SPONSORED }
})

const receipt = await response.wait()

// Recreate the smart account client with the new owner and specify the address of the smart account
smartAccount = await createSmartAccountClient({
    signer: newSigner,
    paymasterUrl,
    bundlerUrl,
    accountAddress: smartAccountAddress
})
```

:::caution
Failing to specify the **accountAddress** parameter after executing **transferOwnership()** may result in issues, such as using the wrong smart account. Smart account addresses are **counterfactual**, meaning that using a new signer will generate an entirely new address. Therefore, it's crucial to explicitly specify the desired address."
:::
